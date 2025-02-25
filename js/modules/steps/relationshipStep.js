// js/modules/steps/relationshipStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField, createDateField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#relationshipStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 5: Зв\'язок</h5>';

    // Додаємо поле relation
    const relationField = createSelectField(fieldsConfig.relation);
    container.appendChild(relationField);

    // Додаємо групу для otherRelation
    const otherRelationGroup = document.createElement('div');
    otherRelationGroup.id = 'otherRelationGroup';
    otherRelationGroup.className = 'mb-3 d-none';

    const otherRelationField = createTextField(fieldsConfig.otherRelation);
    otherRelationGroup.appendChild(otherRelationField);

    container.appendChild(otherRelationGroup);

    // Додаємо поле eventDate
    const eventDateField = createDateField(fieldsConfig.eventDate);
    container.appendChild(eventDateField);

    // Додаємо поле circumstances
    const circumstancesField = createTextField(fieldsConfig.circumstances);
    container.appendChild(circumstancesField);

    // Додаємо поле investigationStatus
    const investigationStatusField = createSelectField(fieldsConfig.investigationStatus);
    container.appendChild(investigationStatusField);

    // Додаємо групу для otherInvestigation
    const otherInvestigationGroup = document.createElement('div');
    otherInvestigationGroup.id = 'otherInvestigationGroup';
    otherInvestigationGroup.className = 'mb-3 d-none';

    const otherInvestigationField = createTextField(fieldsConfig.otherInvestigation);
    otherInvestigationGroup.appendChild(otherInvestigationField);

    container.appendChild(otherInvestigationGroup);

    // Додаємо обробники подій
    setupEventListeners(container);

    // Оновлюємо мітки на основі статусу та статі
    updateRelationshipLabels();
}

function setupEventListeners(container) {
    // Обробник для поля relation
    const relationSelect = container.querySelector('#relation');
    if (relationSelect) {
        relationSelect.addEventListener('change', (e) => {
            formState.updateField('relation', e.target.value);
            toggleOtherRelationField(e.target.value);
        });
    }

    // Обробник для поля otherRelation
    const otherRelationInput = container.querySelector('#otherRelation');
    if (otherRelationInput) {
        otherRelationInput.addEventListener('change', (e) => {
            formState.updateField('otherRelation', e.target.value);
        });
    }

    // Обробник для поля eventDate
    const eventDateInput = container.querySelector('#eventDate');
    if (eventDateInput) {
        eventDateInput.addEventListener('change', (e) => {
            formState.updateField('eventDate', e.target.value);
        });
    }

    // Обробник для поля circumstances
    const circumstancesInput = container.querySelector('#circumstances');
    if (circumstancesInput) {
        circumstancesInput.addEventListener('change', (e) => {
            formState.updateField('circumstances', e.target.value);
        });
    }

    // Обробник для поля investigationStatus
    const investigationStatusSelect = container.querySelector('#investigationStatus');
    if (investigationStatusSelect) {
        investigationStatusSelect.addEventListener('change', (e) => {
            formState.updateField('investigationStatus', e.target.value);
            toggleOtherInvestigationField(e.target.value);
        });
    }

    // Обробник для поля otherInvestigation
    const otherInvestigationInput = container.querySelector('#otherInvestigation');
    if (otherInvestigationInput) {
        otherInvestigationInput.addEventListener('change', (e) => {
            formState.updateField('otherInvestigation', e.target.value);
        });
    }
}

function toggleOtherRelationField(relation) {
    const otherRelationGroup = document.getElementById('otherRelationGroup');
    const otherRelationInput = document.getElementById('otherRelation');

    if (relation === "Інше") {
        otherRelationGroup.classList.remove("d-none");
        otherRelationInput.setAttribute("required", "required");
    } else {
        otherRelationGroup.classList.add("d-none");
        otherRelationInput.removeAttribute("required");
        otherRelationInput.value = "";
        otherRelationInput.classList.remove("is-invalid");
    }
}

function toggleOtherInvestigationField(investigationStatus) {
    const otherInvestigationGroup = document.getElementById('otherInvestigationGroup');
    const otherInvestigationInput = document.getElementById('otherInvestigation');

    if (investigationStatus === "Інше") {
        otherInvestigationGroup.classList.remove("d-none");
        otherInvestigationInput.setAttribute("required", "required");
    } else {
        otherInvestigationGroup.classList.add("d-none");
        otherInvestigationInput.removeAttribute("required");
        otherInvestigationInput.value = "";
        otherInvestigationInput.classList.remove("is-invalid");
    }
}

function updateRelationshipLabels() {
    const statusValue = formState.getFieldValue('status');
    const genderValue = formState.getFieldValue('gender');

    const relationLabel = document.querySelector('label[for="relation"]');
    const eventDateLabel = document.querySelector('label[for="eventDate"]');
    const circumstancesLabel = document.querySelector('label[for="circumstances"]');

    if (statusValue === "В полоні") {
        relationLabel.textContent = `Ваш зв'язок із ${genderValue === "Жіноча" ? "полоненою" : "полоненим"}`;
        eventDateLabel.textContent = "Дата полону";
        circumstancesLabel.textContent = "Обставини полону";
    } else if (statusValue === "Зниклий безвісти") {
        relationLabel.textContent = `Ваш зв'язок із ${genderValue === "Жіноча" ? "зниклою" : "зниклим"}`;
        eventDateLabel.textContent = "Дата зникнення";
        circumstancesLabel.textContent = "Обставини зникнення";
    } else if (statusValue === "Загинув") {
        relationLabel.textContent = `Ваш зв'язок із ${genderValue === "Жіноча" ? "загиблою" : "загиблим"}`;
        eventDateLabel.textContent = "Дата загибелі";
        circumstancesLabel.textContent = "Обставини загибелі";
    } else {
        relationLabel.textContent = "Ваш зв'язок із ...";
        eventDateLabel.textContent = "Дата події";
        circumstancesLabel.textContent = "Обставини події";
    }
}