// js/modules/steps/personalInfoStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField, createDateField } from '../components/fields.js';
import formState from '../state.js';
import { autoCapitalize } from '../../utils/common.js';

export function initialize() {
    const container = getElement('#personalInfoStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 2: Особиста інформація</h5>';

    // Додаємо поле gender
    const genderField = createSelectField(fieldsConfig.gender);
    container.appendChild(genderField);

    // Додаємо поле lastName
    const lastNameField = createTextField(fieldsConfig.lastName);
    container.appendChild(lastNameField);

    // Додаємо поле firstName
    const firstNameField = createTextField(fieldsConfig.firstName);
    container.appendChild(firstNameField);

    // Додаємо поле middleName
    const middleNameField = createTextField(fieldsConfig.middleName);
    container.appendChild(middleNameField);

    // Додаємо поле dob
    const dobField = createDateField(fieldsConfig.dob);
    container.appendChild(dobField);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля gender
    const genderSelect = container.querySelector('#gender');
    if (genderSelect) {
        genderSelect.addEventListener('change', (e) => {
            formState.updateField('gender', e.target.value);
        });
    }

    // Додаємо автокапіталізацію для текстових полів
    const textFields = container.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        field.addEventListener('input', autoCapitalize);
        field.addEventListener('change', (e) => {
            formState.updateField(e.target.id, e.target.value);
        });
    });

    // Обробник для поля dob
    const dobInput = container.querySelector('#dob');
    if (dobInput) {
        dobInput.addEventListener('change', (e) => {
            formState.updateField('dob', e.target.value);
        });
    }
}