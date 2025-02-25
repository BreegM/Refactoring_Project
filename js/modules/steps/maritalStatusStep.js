// js/modules/steps/maritalStatusStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#maritalStatusStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 5: Сімейний стан</h5>';

    // Додаємо поле maritalStatus
    const maritalStatusField = createSelectField(fieldsConfig.maritalStatus);
    container.appendChild(maritalStatusField);

    // Додаємо групу для partnerName
    const partnerNameGroup = document.createElement('div');
    partnerNameGroup.id = 'partnerNameGroup';
    partnerNameGroup.className = 'mb-3 d-none';

    const partnerNameField = createTextField(fieldsConfig.partnerName);
    partnerNameGroup.appendChild(partnerNameField);

    container.appendChild(partnerNameGroup);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля maritalStatus
    const maritalStatusSelect = container.querySelector('#maritalStatus');
    if (maritalStatusSelect) {
        maritalStatusSelect.addEventListener('change', (e) => {
            const maritalStatus = e.target.value;
            formState.updateField('maritalStatus', maritalStatus);
            togglePartnerDetails(maritalStatus);
        });
    }

    // Обробник для поля partnerName
    const partnerNameInput = container.querySelector('#partnerName');
    if (partnerNameInput) {
        partnerNameInput.addEventListener('change', (e) => {
            formState.updateField('partnerName', e.target.value);
        });
    }
}

function togglePartnerDetails(maritalStatus) {
    const partnerNameGroup = document.getElementById('partnerNameGroup');
    const partnerNameInput = document.getElementById('partnerName');
    const partnerNameLabel = partnerNameGroup.querySelector('label');

    // Масив станів, де потрібен «Партнер»
    const partnerRequiredStatuses = ["Одружений", "Заміжня", "Громадянський шлюб"];

    if (partnerRequiredStatuses.includes(maritalStatus)) {
        // Показати поле
        partnerNameGroup.classList.remove("d-none");
        partnerNameInput.setAttribute("required", "required");

        // Міняємо текст підпису залежно від статі / статусу
        const gender = formState.getFieldValue('gender');

        if (maritalStatus === "Громадянський шлюб") {
            partnerNameLabel.textContent = "ПІБ партнера/партнерки";
        } else if (gender === "Чоловіча") {
            partnerNameLabel.textContent = "ПІБ дружини";
        } else if (gender === "Жіноча") {
            partnerNameLabel.textContent = "ПІБ чоловіка";
        }
    } else {
        // Ховаємо та очищуємо поле
        partnerNameGroup.classList.add("d-none");
        partnerNameInput.removeAttribute("required");
        partnerNameInput.value = "";
        partnerNameInput.classList.remove("is-invalid");
    }
}