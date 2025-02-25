// js/modules/validator.js
import formState from './state.js';

class FormValidator {
    constructor() {
        // Базові патерни для валідації
        this.patterns = {
            text: /^[А-Яа-яІіЇїЄєҐґʼ'\-\s.,]+$/,
            textExtended: /^[А-Яа-яІіЇїЄєҐґʼ'\-\s.,0-9()]+$/,
            phone: /^\+380\d{9}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        };
    }

    // Валідація поточного кроку
    validateStep() {
        const stepId = formState.getCurrentStepId();
        if (!stepId) return false;

        const container = document.getElementById(stepId);
        if (!container) return false;

        const fields = container.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            // Пропускаємо приховані поля
            if (field.closest('.d-none')) return;

            // Пропускаємо поля без id
            if (!field.id) return;

            if (!this.validateField(field)) {
                isValid = false;

                // Додаємо помилку в стан
                formState.setError(field.id, field.validationMessage || 'Некоректне значення');
            } else {
                // Очищуємо помилку зі стану
                formState.clearError(field.id);
            }
        });

        return isValid;
    }

    // Валідація окремого поля
    validateField(field) {
        // Якщо поле приховане або disabled, пропускаємо валідацію
        if (field.closest('.d-none') || field.disabled) {
            return true;
        }

        // Перевіряємо обов'язкові поля
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field, 'Це поле обов\'язкове');
            return false;
        }

        // Валідація відповідно до типу поля
        if (field.tagName === 'INPUT') {
            switch (field.type) {
                case 'text':
                    return this.validateTextField(field);
                case 'email':
                    return this.validateEmailField(field);
                case 'tel':
                    return this.validatePhoneField(field);
                case 'date':
                    return this.validateDateField(field);
                case 'number':
                    return this.validateNumberField(field);
                default:
                    // Для інших типів використовуємо вбудовану HTML5 валідацію
                    if (!field.checkValidity()) {
                        this.showError(field, field.validationMessage);
                        return false;
                    }
                    break;
            }
        }

        // Очищаємо помилку
        this.clearError(field);
        return true;
    }

    // Валідація текстового поля
    validateTextField(field) {
        if (!field.value.trim()) return true; // Пусте значення валідне для необов'язкових полів

        // Використовуємо патерн з атрибуту pattern, якщо є
        if (field.pattern) {
            const pattern = new RegExp(field.pattern);
            if (!pattern.test(field.value)) {
                this.showError(field, field.title || 'Некоректний формат');
                return false;
            }
        } else {
            // Використовуємо базовий патерн для текстових полів
            if (!this.patterns.text.test(field.value)) {
                this.showError(field, 'Дозволені символи: українські літери, дефіси, апострофи, пробіли');
                return false;
            }
        }

        return true;
    }

    // Валідація поля email
    validateEmailField(field) {
        if (!field.value.trim()) return true; // Пусте значення валідне для необов'язкових полів

        if (!this.patterns.email.test(field.value)) {
            this.showError(field, 'Введіть коректну електронну адресу');
            return false;
        }

        return true;
    }

    // Валідація поля телефону
    validatePhoneField(field) {
        if (!field.value.trim()) return true; // Пусте значення валідне для необов'язкових полів

        if (!this.patterns.phone.test(field.value)) {
            this.showError(field, 'Телефон має бути у форматі +380XXXXXXXXX');
            return false;
        }

        return true;
    }

    // Валідація поля дати
    validateDateField(field) {
        if (!field.value.trim()) return true; // Пусте значення валідне для необов'язкових полів

        const dateValue = new Date(field.value);

        // Перевірка на коректність дати
        if (isNaN(dateValue.getTime())) {
            this.showError(field, 'Введіть коректну дату');
            return false;
        }

        // Перевірка мінімальної і максимальної дати
        if (field.min && new Date(field.value) < new Date(field.min)) {
            this.showError(field, `Дата не може бути раніше ${field.min}`);
            return false;
        }

        if (field.max && new Date(field.value) > new Date(field.max)) {
            this.showError(field, `Дата не може бути пізніше ${field.max}`);
            return false;
        }

        return true;
    }

    // Валідація числового поля
    validateNumberField(field) {
        if (!field.value.trim()) return true; // Пусте значення валідне для необов'язкових полів

        const value = parseFloat(field.value);

        if (isNaN(value)) {
            this.showError(field, 'Введіть число');
            return false;
        }

        if (field.min !== undefined && value < parseFloat(field.min)) {
            this.showError(field, `Значення не може бути менше ${field.min}`);
            return false;
        }

        if (field.max !== undefined && value > parseFloat(field.max)) {
            this.showError(field, `Значення не може бути більше ${field.max}`);
            return false;
        }

        return true;
    }

    // Показ помилки валідації
    showError(field, message) {
        field.classList.add('is-invalid');

        // Знаходимо або створюємо елемент з повідомленням про помилку
        let feedbackElement = field.nextElementSibling;
        if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
            feedbackElement = document.createElement('div');
            feedbackElement.className = 'invalid-feedback';
            field.parentNode.insertBefore(feedbackElement, field.nextSibling);
        }

        feedbackElement.textContent = message;
    }

    // Очищення помилки
    clearError(field) {
        field.classList.remove('is-invalid');
    }

    // Валідація конкретних полів

    // Валідація дати народження
    validateDOB(dateString) {
        if (!dateString) return false;

        const dob = new Date(dateString);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 75, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        return dob >= minDate && dob <= maxDate;
    }

    // Валідація дати народження дитини
    validateChildDOB(childDateString, parentDateString) {
        if (!childDateString || !parentDateString) return false;

        const childDob = new Date(childDateString);
        const parentDob = new Date(parentDateString);
        const today = new Date();

        return childDob > parentDob && childDob <= today;
    }
}

// Експортуємо один екземпляр класу FormValidator
export default new FormValidator();