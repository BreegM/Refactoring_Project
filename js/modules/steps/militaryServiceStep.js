// js/modules/steps/militaryServiceStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField, createDateField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#militaryServiceStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 10: Військова служба</h5>';

    // Додаємо поле disability
    const disabilityField = createSelectField(fieldsConfig.disability);
    container.appendChild(disabilityField);

    // Додаємо групу для removedFromMilitary
    const removedFromMilitaryGroup = document.createElement('div');
    removedFromMilitaryGroup.id = 'removedFromMilitaryGroup';
    removedFromMilitaryGroup.className = 'mb-3 d-none';

    const removedFromMilitaryField = createSelectField(fieldsConfig.removedFromMilitary);
    removedFromMilitaryGroup.appendChild(removedFromMilitaryField);

    container.appendChild(removedFromMilitaryGroup);

    // Додаємо поле militaryStartDate
    const militaryStartDateField = createDateField(fieldsConfig.militaryStartDate);
    container.appendChild(militaryStartDateField);

    // Додаємо групу для militaryEndDate
    const militaryEndDateGroup = document.createElement('div');
    militaryEndDateGroup.id = 'militaryEndDateGroup';
    militaryEndDateGroup.className = 'mb-3 d-none';

    const militaryEndDateField = createDateField(fieldsConfig.militaryEndDate);
    militaryEndDateGroup.appendChild(militaryEndDateField);

    container.appendChild(militaryEndDateGroup);

    // Додаємо поле militaryRank
    const militaryRankField = createTextField(fieldsConfig.militaryRank);
    container.appendChild(militaryRankField);

    // Додаємо поле militaryUnit
    const militaryUnitField = createTextField(fieldsConfig.militaryUnit);
    container.appendChild(militaryUnitField);

    // Додаємо поле battalion
    const battalionField = createTextField(fieldsConfig.battalion);
    container.appendChild(battalionField);

    // Додаємо поле position
    const positionField = createTextField(fieldsConfig.position);
    container.appendChild(positionField);

    // Додаємо поле combatCertificate
    const combatCertificateField = createSelectField(fieldsConfig.combatCertificate);
    container.appendChild(combatCertificateField);

    // Додаємо групу для combatCertificateNumber
    const combatCertificateNumberGroup = document.createElement('div');
    combatCertificateNumberGroup.id = 'combatCertificateNumberGroup';
    combatCertificateNumberGroup.className = 'mb-3 d-none';

    const combatCertificateNumberField = createTextField(fieldsConfig.combatCertificateNumber);
    combatCertificateNumberGroup.appendChild(combatCertificateNumberField);

    container.appendChild(combatCertificateNumberGroup);

    // Додаємо групу для combatCertificateDate
    const combatCertificateDateGroup = document.createElement('div');
    combatCertificateDateGroup.id = 'combatCertificateDateGroup';
    combatCertificateDateGroup.className = 'mb-3 d-none';

    const combatCertificateDateField = createDateField(fieldsConfig.combatCertificateDate);
    combatCertificateDateGroup.appendChild(combatCertificateDateField);

    container.appendChild(combatCertificateDateGroup);

    // Додаємо обробники подій
    setupEventListeners(container);

    // Оновлюємо мітки полів залежно від статусу
    updateMilitaryLabels();
}

function setupEventListeners(container) {
    // Обробник для поля disability
    const disabilitySelect = container.querySelector('#disability');
    if (disabilitySelect) {
        disabilitySelect.addEventListener('change', (e) => {
            formState.updateField('disability', e.target.value);
            toggleMilitaryFields();
        });
    }

    // Обробник для поля removedFromMilitary
    const removedFromMilitarySelect = container.querySelector('#removedFromMilitary');
    if (removedFromMilitarySelect) {
        removedFromMilitarySelect.addEventListener('change', (e) => {
            formState.updateField('removedFromMilitary', e.target.value);
            toggleEndDateField();
        });
    }

    // Обробник для поля militaryStartDate
    const militaryStartDateInput = container.querySelector('#militaryStartDate');
    if (militaryStartDateInput) {
        militaryStartDateInput.addEventListener('change', (e) => {
            formState.updateField('militaryStartDate', e.target.value);
        });
    }

    // Обробник для поля militaryEndDate
    const militaryEndDateInput = container.querySelector('#militaryEndDate');
    if (militaryEndDateInput) {
        militaryEndDateInput.addEventListener('change', (e) => {
            formState.updateField('militaryEndDate', e.target.value);
        });
    }

    // Обробники для текстових полів
    const textFields = container.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        field.addEventListener('change', (e) => {
            formState.updateField(e.target.id, e.target.value);
        });
    });

    // Обробник для поля combatCertificate
    const combatCertificateSelect = container.querySelector('#combatCertificate');
    if (combatCertificateSelect) {
        combatCertificateSelect.addEventListener('change', (e) => {
            formState.updateField('combatCertificate', e.target.value);
            toggleCombatCertificateFields(e.target.value);
        });
    }

    // Обробник для поля combatCertificateNumber
    const combatCertificateNumberInput = container.querySelector('#combatCertificateNumber');
    if (combatCertificateNumberInput) {
        combatCertificateNumberInput.addEventListener('input', (e) => {
            // Автоматична капіталізація номера
            e.target.value = e.target.value.toUpperCase();
        });

        combatCertificateNumberInput.addEventListener('change', (e) => {
            formState.updateField('combatCertificateNumber', e.target.value);
        });
    }

    // Обробник для поля combatCertificateDate
    const combatCertificateDateInput = container.querySelector('#combatCertificateDate');
    if (combatCertificateDateInput) {
        combatCertificateDateInput.addEventListener('change', (e) => {
            formState.updateField('combatCertificateDate', e.target.value);
        });
    }
}

function toggleMilitaryFields() {
    const disability = document.getElementById('disability').value;
    const removedFromMilitaryGroup = document.getElementById('removedFromMilitaryGroup');

    if (["group1", "group2", "group3"].includes(disability)) {
        removedFromMilitaryGroup.classList.remove("d-none");
        document.getElementById("removedFromMilitary").setAttribute("required", "required");
    } else {
        removedFromMilitaryGroup.classList.add("d-none");
        document.getElementById("removedFromMilitary").removeAttribute("required");
        document.getElementById("removedFromMilitary").value = "";
    }

    // Оновлюємо поле дати закінчення служби
    toggleEndDateField();
}

function toggleEndDateField() {
    const status = formState.getFieldValue('status');
    const disability = document.getElementById('disability').value;
    const removedFromMilitary = document.getElementById('removedFromMilitary')?.value;
    const militaryEndDateGroup = document.getElementById('militaryEndDateGroup');
    const militaryEndDate = document.getElementById('militaryEndDate');

    // Перевіряємо умови для показу поля
    const shouldShow = (
        // Статус "Ветеран" або "Особа з інвалідністю"
        ["Ветеран (звільнений)", "Особа з інвалідністю внаслідок війни"].includes(status) ||
        // АБО має інвалідність і знятий з обліку
        (disability !== "none" && removedFromMilitary === "yes")
    );

    if (shouldShow) {
        militaryEndDateGroup.classList.remove("d-none");
        // Встановлюємо required тільки якщо поле видиме
        militaryEndDate.setAttribute("required", "required");
    } else {
        militaryEndDateGroup.classList.add("d-none");
        // Знімаємо required і очищуємо значення при приховуванні
        militaryEndDate.removeAttribute("required");
        militaryEndDate.value = "";
    }

    // Додаткова перевірка: якщо поле приховане, знімаємо required в будь-якому випадку
    if (militaryEndDateGroup.classList.contains("d-none")) {
        militaryEndDate.removeAttribute("required");
    }
}

function toggleCombatCertificateFields(value) {
    const combatCertificateNumberGroup = document.getElementById('combatCertificateNumberGroup');
    const combatCertificateNumber = document.getElementById('combatCertificateNumber');
    const combatCertificateDateGroup = document.getElementById('combatCertificateDateGroup');
    const combatCertificateDate = document.getElementById('combatCertificateDate');

    if (value === "yes") {
        combatCertificateNumberGroup.classList.remove("d-none");
        combatCertificateNumber.setAttribute("required", "required");

        combatCertificateDateGroup.classList.remove("d-none");
        combatCertificateDate.setAttribute("required", "required");
    } else {
        combatCertificateNumberGroup.classList.add("d-none");
        combatCertificateNumber.removeAttribute("required");
        combatCertificateNumber.value = "";

        combatCertificateDateGroup.classList.add("d-none");
        combatCertificateDate.removeAttribute("required");
        combatCertificateDate.value = "";
    }
}

function updateMilitaryLabels() {
    const status = formState.getFieldValue('status');
    const gender = formState.getFieldValue('gender');

    const militaryRankLabel = document.querySelector('label[for="militaryRank"]');
    const combatCertificateLabel = document.querySelector('label[for="combatCertificate"]');

    if (["В полоні", "Зниклий безвісти", "Загинув"].includes(status)) {
        // Оновлюємо мітки відповідно до статусу та статі
        if (status === "В полоні") {
            militaryRankLabel.textContent = `Звання на момент полону`;
            combatCertificateLabel.textContent = `Чи є у полоненого посвідчення бойових дій?`;
        } else if (status === "Зниклий безвісти") {
            militaryRankLabel.textContent = `Звання на момент зникнення`;
            combatCertificateLabel.textContent = `Чи є у зниклого посвідчення бойових дій?`;
        } else if (status === "Загинув") {
            militaryRankLabel.textContent = `Звання на момент загибелі`;
            combatCertificateLabel.textContent = `Чи є у загиблого посвідчення бойових дій?`;
        }
    } else {
        // Відновлюємо стандартні мітки
        militaryRankLabel.textContent = `Звання на момент проходження/звільнення`;
        combatCertificateLabel.textContent = `Чи є у вас посвідчення бойових дій?`;
    }
}