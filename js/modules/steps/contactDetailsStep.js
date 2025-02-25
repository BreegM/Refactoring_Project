// js/modules/steps/contactDetailsStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createTextField } from '../components/fields.js';
import formState from '../state.js';
import { formatPhoneNumber } from '../../utils/common.js';

export function initialize() {
    const container = getElement('#contactDetailsStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 4: Контактні дані</h5>';

    // Додаємо поле phone
    const phoneField = createTextField(fieldsConfig.phone);
    container.appendChild(phoneField);

    // Додаємо поле email
    const emailField = createTextField(fieldsConfig.email);
    container.appendChild(emailField);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля phone
    const phoneInput = container.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Валідуємо і форматуємо номер телефону під час вводу
            const formattedPhone = formatPhoneNumber(e.target.value);
            if (formattedPhone !== e.target.value) {
                e.target.value = formattedPhone;
            }
        });

        phoneInput.addEventListener('change', (e) => {
            formState.updateField('phone', e.target.value);
        });
    }

    // Обробник для поля email
    const emailInput = container.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('change', (e) => {
            formState.updateField('email', e.target.value);
        });
    }
}