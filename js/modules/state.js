// js/modules/state.js
class FormState {
    constructor() {
        this.scenario = 'standard'; // 'standard' або 'alternative'
        this.currentStep = 0;
        this.formData = {};
        this.errors = {};

        // Завантаження збереженого стану, якщо є
        this.loadState();
    }

    // Встановлення сценарію
    setScenario(scenarioId) {
        if (scenarioId === 'standard' || scenarioId === 'alternative') {
            this.scenario = scenarioId;
            this.saveState();
            return true;
        }
        return false;
    }

    // Перехід до наступного кроку
    nextStep() {
        const stepsCount = this.getStepsCount();
        if (this.currentStep < stepsCount - 1) {
            this.currentStep++;
            this.saveState();
            return true;
        }
        return false;
    }

    // Перехід до попереднього кроку
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.saveState();
            return true;
        }
        return false;
    }

    // Перехід до конкретного кроку
    goToStep(stepIndex) {
        const stepsCount = this.getStepsCount();
        if (stepIndex >= 0 && stepIndex < stepsCount) {
            this.currentStep = stepIndex;
            this.saveState();
            return true;
        }
        return false;
    }

    // Отримання ідентифікатора поточного кроку
    getCurrentStepId() {
        const steps = this.getSteps();
        return steps[this.currentStep]?.id || null;
    }

    // Отримання конфігурації поточного кроку
    getCurrentStepConfig() {
        const steps = this.getSteps();
        return steps[this.currentStep] || null;
    }

    // Отримання кількості кроків
    getStepsCount() {
        return this.getSteps().length;
    }

    // Отримання списку кроків для поточного сценарію
    getSteps() {
        // Цей метод буде використовувати конфігурацію кроків з файлу steps.js
        // Поки що повертаємо заглушку
        return window.stepsConfig?.scenarios?.[this.scenario] || [];
    }

    // Оновлення значення поля
    updateField(fieldId, value) {
        // Для вкладених полів, як 'messengers.viber'
        if (fieldId.includes('.')) {
            const parts = fieldId.split('.');
            let obj = this.formData;

            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!obj[part]) {
                    obj[part] = {};
                }
                obj = obj[part];
            }

            obj[parts[parts.length - 1]] = value;
        } else {
            this.formData[fieldId] = value;
        }

        // Зберігаємо стан після кожного оновлення
        this.saveState();

        // Перевіряємо залежності для цього поля
        this.checkDependencies(fieldId, value);

        return true;
    }

    // Отримання значення поля
    getFieldValue(fieldId) {
        // Для вкладених полів, як 'messengers.viber'
        if (fieldId.includes('.')) {
            const parts = fieldId.split('.');
            let value = this.formData;

            for (const part of parts) {
                if (value === undefined || value === null) {
                    return undefined;
                }
                value = value[part];
            }

            return value;
        }

        return this.formData[fieldId];
    }

    // Перевірка залежностей для поля
    checkDependencies(fieldId, value) {
        // Буде імплементовано пізніше з використанням файлу dependencies.js
        // Поки просто заглушка
        if (window.dependenciesConfig) {
            const dependencies = window.dependenciesConfig.filter(dep => dep.source === fieldId);

            dependencies.forEach(dep => {
                const shouldApply = dep.condition(value);

                if (dep.action === 'setScenario') {
                    if (shouldApply) {
                        this.setScenario(dep.target);
                    }
                } else if (dep.action === 'toggleField') {
                    // Тут буде логіка показу/приховування полів
                }
            });
        }
    }

    // Збір всіх даних форми для відправки
    collectFormData() {
        return { ...this.formData };
    }

    // Встановлення помилки для поля
    setError(fieldId, error) {
        this.errors[fieldId] = error;
    }

    // Очищення помилки для поля
    clearError(fieldId) {
        delete this.errors[fieldId];
    }

    // Перевірка наявності помилки для поля
    hasError(fieldId) {
        return !!this.errors[fieldId];
    }

    // Отримання помилки для поля
    getError(fieldId) {
        return this.errors[fieldId];
    }

    // Збереження стану в localStorage
    saveState() {
        try {
            const state = {
                scenario: this.scenario,
                currentStep: this.currentStep,
                formData: this.formData
            };

            localStorage.setItem('formState', JSON.stringify(state));
        } catch (error) {
            console.error('Помилка збереження стану:', error);
        }
    }

    // Завантаження стану з localStorage
    loadState() {
        try {
            const savedState = localStorage.getItem('formState');

            if (savedState) {
                const state = JSON.parse(savedState);
                this.scenario = state.scenario || 'standard';
                this.currentStep = state.currentStep || 0;
                this.formData = state.formData || {};
            }
        } catch (error) {
            console.error('Помилка завантаження стану:', error);
        }
    }

    // Скидання стану форми
    resetState() {
        this.scenario = 'standard';
        this.currentStep = 0;
        this.formData = {};
        this.errors = {};

        localStorage.removeItem('formState');
    }
}

// Експортуємо один екземпляр класу FormState
export default new FormState();