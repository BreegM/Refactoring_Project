// js/modules/formRenderer.js
import formState from './state.js';
import validator from './validator.js';

class FormRenderer {
    constructor() {
        this.stepsContainer = null;
        this.progressBar = null;
        this.prevButton = null;
        this.nextButton = null;
        this.submitButton = null;
    }

    // Ініціалізація рендерера
    initialize() {
        this.stepsContainer = document.getElementById('stepsContainer');
        this.progressBar = document.getElementById('progressBar');
        this.prevButton = document.getElementById('prevButton');
        this.nextButton = document.getElementById('nextButton');
        this.submitButton = document.getElementById('submitButton');

        if (!this.stepsContainer || !this.progressBar) {
            console.error('Необхідні елементи форми не знайдені');
            return false;
        }

        return true;
    }

    // Рендерінг форми
    renderForm() {
        this.renderProgressBar();
        this.renderCurrentStep();
        this.updateNavigationButtons();
    }

    // Рендерінг поточного кроку
    renderCurrentStep() {
        const currentStepId = formState.getCurrentStepId();
        if (!currentStepId) return;

        // Приховуємо всі кроки
        const allSteps = this.stepsContainer.querySelectorAll('.step-page');
        allSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('d-none');
        });

        // Показуємо поточний крок
        const currentStep = document.getElementById(currentStepId);
        if (currentStep) {
            currentStep.classList.add('active');
            currentStep.classList.remove('d-none');
        }
    }

    // Рендерінг прогрес-бару
    renderProgressBar() {
        const totalSteps = formState.getStepsCount();
        const currentStep = formState.currentStep;

        // Очищаємо прогрес-бар
        this.progressBar.innerHTML = '';

        // Визначаємо, чи використовуємо мобільну версію
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.renderMobileProgressBar(currentStep, totalSteps);
        } else {
            this.renderDesktopProgressBar(currentStep, totalSteps);
        }
    }

    // Рендерінг мобільного прогрес-бару
    renderMobileProgressBar(currentStep, totalSteps) {
        // Для мобільної версії показуємо тільки поточний крок і сусідні
        let stepsToShow = [];

        if (currentStep > 0) {
            stepsToShow.push(currentStep - 1); // Попередній
        }

        stepsToShow.push(currentStep); // Поточний

        if (currentStep < totalSteps - 1) {
            stepsToShow.push(currentStep + 1); // Наступний
        }

        stepsToShow.forEach(stepIndex => {
            const step = document.createElement('div');
            step.className = `step ${stepIndex === currentStep ? 'active' : ''}`;
            step.textContent = stepIndex + 1;

            this.progressBar.appendChild(step);
        });
    }

    // Рендерінг десктопного прогрес-бару
    renderDesktopProgressBar(currentStep, totalSteps) {
        for (let i = 0; i < totalSteps; i++) {
            // Створюємо крок
            const step = document.createElement('div');
            step.className = `step ${i <= currentStep ? 'active' : ''}`;
            step.textContent = i + 1;

            this.progressBar.appendChild(step);

            // Додаємо лінію між кроками (крім останнього)
            if (i < totalSteps - 1) {
                const line = document.createElement('div');
                line.className = `stepper-line ${i < currentStep ? 'active' : ''}`;

                this.progressBar.appendChild(line);
            }
        }
    }

    // Оновлення кнопок навігації
    updateNavigationButtons() {
        const currentStep = formState.currentStep;
        const totalSteps = formState.getStepsCount();

        // Кнопка "Назад" - прихована на першому кроці
        if (this.prevButton) {
            this.prevButton.classList.toggle('d-none', currentStep === 0);
        }

        // Кнопка "Далі" - прихована на останньому кроці
        if (this.nextButton) {
            this.nextButton.classList.toggle('d-none', currentStep === totalSteps - 1);
        }

        // Кнопка "Відправити" - показана тільки на останньому кроці
        if (this.submitButton) {
            this.submitButton.classList.toggle('d-none', currentStep !== totalSteps - 1);
        }
    }

    // Показ помилок на поточному кроці
    showErrors() {
        const currentStepId = formState.getCurrentStepId();
        if (!currentStepId) return;

        const container = document.getElementById(currentStepId);
        if (!container) return;

        // Знаходимо всі поля на поточному кроці
        const fields = container.querySelectorAll('input, select, textarea');

        fields.forEach(field => {
            // Перевіряємо, чи є помилка для цього поля
            if (field.id && formState.hasError(field.id)) {
                // Показуємо помилку
                field.classList.add('is-invalid');

                // Знаходимо елемент для виведення помилки
                let feedbackElement = field.nextElementSibling;
                if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement = document.createElement('div');
                    feedbackElement.className = 'invalid-feedback';
                    field.parentNode.insertBefore(feedbackElement, field.nextSibling);
                }

                feedbackElement.textContent = formState.getError(field.id);
            }
        });
    }

    // Прокрутка до першої помилки
    scrollToFirstError() {
        const currentStepId = formState.getCurrentStepId();
        if (!currentStepId) return;

        const container = document.getElementById(currentStepId);
        if (!container) return;

        const firstInvalidField = container.querySelector('.is-invalid');

        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Експортуємо один екземпляр класу FormRenderer
export default new FormRenderer();