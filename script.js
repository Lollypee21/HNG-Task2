/**
 * Profile Card Component - HNG Internship Task
 * Handles dynamic time updates, menu toggle, form validation, and analytics
 */

class ProfileCard {
    constructor() {
        this.timeElement = document.querySelector('[data-testid="test-user-time"]');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navList = document.querySelector('.nav-list');
        this.init();
    }

    init() {
        this.updateTime();
        this.startTimeUpdates();
        this.addEventListeners();
        this.validateTestIds();
    }

    updateTime() {
        if (!this.timeElement) return console.warn('Time element not found!');
        const currentTime = new Date();
        this.timeElement.textContent = currentTime.toLocaleString();
        this.timeElement.setAttribute('aria-live', 'polite');
    }

    startTimeUpdates() {
        setInterval(() => this.updateTime(), 1000);
    }

    addEventListeners() {
        // Hamburger menu toggle
        if (this.menuToggle && this.navList) {
            this.menuToggle.addEventListener('click', () => {
                this.navList.classList.toggle('show');
                console.log('Menu toggled');
            });
        } else {
            if (!this.menuToggle) console.warn('Menu toggle button not found!');
            if (!this.navList) console.warn('Navigation list not found!');
        }

        // Social links click tracking
        const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', e => this.trackSocialClick(e.currentTarget));
        });

        // Keyboard navigation enhancement
        document.addEventListener('keydown', e => this.handleKeyboardNavigation(e));
    }

    trackSocialClick(element) {
        const network = element.getAttribute('data-testid')?.replace('test-user-social-', '');
        if (network) console.log(`Social link clicked: ${network}`);
    }

    handleKeyboardNavigation(event) {
        const focusableElements = this.getFocusableElements();
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
            focusableElements[prevIndex].focus();
        }
    }

    getFocusableElements() {
        return document.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
    }

    validateTestIds() {
        const requiredTestIds = [
            'test-profile-card',
            'test-user-name',
            'test-user-bio',
            'test-user-time',
            'test-user-avatar',
            'test-user-social-links',
            'test-user-hobbies',
            'test-user-dislikes'
        ];

        requiredTestIds.forEach(testId => {
            if (!document.querySelector(`[data-testid="${testId}"]`)) {
                console.warn(`Missing required data-testid: ${testId}`);
            }
        });

        console.log('Profile card initialized successfully!');
    }
}

// Image handling utility
class ImageHandler {
    static handleAvatarError(imgElement) {
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiNFMkUzRTUiLz4KPHBhdGggZD0iTTQ1IDUwQzQ1IDUzLjg2NiA0OC4xMzQgNTcgNTIgNTdDNjUuODY2IDU3IDY5IDUzLjg2NiA2OSA1MEM2OSA0Ni4xMzQgNjUuODY2IDQzIDYyIDQzQzQ4LjEzNCA0MyA0NSA0Ni4xMzQgNDUgNTBaIiBmaWxsPSIjOUE5QTlBIi8+CjxwYXRoIGQ9Ik0zOSA3NkM0Mi44NjYgNzYgNDYgNzkuMTM0IDQ2IDgzVjk0QzQ2IDk3Ljg2NiA0Mi44NjYgMTAxIDM5IDEwMUMzNS4xMzQgMTAxIDMyIDk3Ljg2NiAzMiA5NFY4M0MzMiA3OS4xMzQgMzUuMTM0IDc2IDM5IDc2WiIgZmlsbD0iIzlBOUE5QSIvPgo8cGF0aCBkPSJNNzIgNzZDNzUuODY2IDc2IDc5IDc5LjEzNCA3OSA4M1Y5NEM3OSA5Ny44NjYgNzUuODY2IDEwMSA3MiAxMDFDNjguMTM0IDEwMSA2NSA5Ny44NjYgNjUgOTRWODNDNjUgNzkuMTM0IDY4LjEzNCA3NiA3MiA3NloiIGZpbGw9IiM5QTlBOUEiLz4KPC9zdmc+';
        imgElement.alt = 'Default profile avatar';
        console.warn('Profile image failed to load, using default avatar');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileCard = new ProfileCard();

    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
    if (avatar) {
        avatar.addEventListener('error', () => ImageHandler.handleAvatarError(avatar));
    }

    document.body.classList.add('loaded');

    if ('performance' in window) {
        const perfObserver = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => console.log(`${entry.name}: ${entry.duration}ms`));
        });
        perfObserver.observe({ entryTypes: ['navigation', 'paint'] });
    }

    // Contact form validation
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const subjectError = document.getElementById('subject-error');
            const messageError = document.getElementById('message-error');

            [nameError, emailError, subjectError, messageError].forEach(err => err.textContent = '');
            if (successMessage) successMessage.hidden = true;

            // Name validation
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Subject validation
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Please enter the subject.';
                isValid = false;
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters.';
                isValid = false;
            }

            if (isValid) {
                form.reset();
                if (successMessage) successMessage.hidden = false;
            }
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProfileCard, ImageHandler };
}
