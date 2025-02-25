// js/modules/steps/additionalInfoStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#additionalInfoStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 7: Додаткова інформація</h5>';

    // Додаємо поле ownHouse
    const ownHouseField = createSelectField(fieldsConfig.ownHouse);
    container.appendChild(ownHouseField);

    // Додаємо групу для isRenting
    const isRentingGroup = document.createElement('div');
    isRentingGroup.id = 'isRentingGroup';
    isRentingGroup.className = 'mb-3 d-none';

    const isRentingField = createSelectField(fieldsConfig.isRenting);
    isRentingGroup.appendChild(isRentingField);

    container.appendChild(isRentingGroup);

    // Додаємо групу для housingType
    const housingTypeGroup = document.createElement('div');
    housingTypeGroup.id = 'housingTypeGroup';
    housingTypeGroup.className = 'mb-3 d-none';

    const housingTypeField = createSelectField(fieldsConfig.housingType);
    housingTypeGroup.appendChild(housingTypeField);

    container.appendChild(housingTypeGroup);

    // Додаємо групу для otherHousingType
    const otherHousingTypeGroup = document.createElement('div');
    otherHousingTypeGroup.id = 'otherHousingTypeGroup';
    otherHousingTypeGroup.className = 'mb-3 d-none';

    const otherHousingTypeField = createTextField(fieldsConfig.otherHousingType);
    otherHousingTypeGroup.appendChild(otherHousingTypeField);

    container.appendChild(otherHousingTypeGroup);

    // Додаємо групу для isGasified
    const isGasifiedGroup = document.createElement('div');
    isGasifiedGroup.id = 'isGasifiedGroup';
    isGasifiedGroup.className = 'mb-3 d-none';

    const isGasifiedField = createSelectField(fieldsConfig.isGasified);
    isGasifiedGroup.appendChild(isGasifiedField);

    container.appendChild(isGasifiedGroup);

    // js/modules/steps/additionalInfoStep.js (продовження)
    // Додаємо поле specialCare
    const specialCareField = createSelectField(fieldsConfig.specialCare);
    container.appendChild(specialCareField);

    // Додаємо поле servedInMilitary
    const servedInMilitaryField = createSelectField(fieldsConfig.servedInMilitary);
    container.appendChild(servedInMilitaryField);

    // Додаємо поле internallyDisplaced
    const internallyDisplacedField = createSelectField(fieldsConfig.internallyDisplaced);
    container.appendChild(internallyDisplacedField);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля ownHouse
    const ownHouseSelect = container.querySelector('#ownHouse');
    if (ownHouseSelect) {
        ownHouseSelect.addEventListener('change', (e) => {
            formState.updateField('ownHouse', e.target.value);
            toggleHousingFields(e.target.value);
        });
    }

    // Обробник для поля isRenting
    const isRentingSelect = container.querySelector('#isRenting');
    if (isRentingSelect) {
        isRentingSelect.addEventListener('change', (e) => {
            formState.updateField('isRenting', e.target.value);
            toggleRentingFields(e.target.value);
        });
    }

    // Обробник для поля housingType
    const housingTypeSelect = container.querySelector('#housingType');
    if (housingTypeSelect) {
        housingTypeSelect.addEventListener('change', (e) => {
            formState.updateField('housingType', e.target.value);
            toggleOtherHousingField(e.target.value);
        });
    }

    // Обробник для поля otherHousingType
    const otherHousingTypeInput = container.querySelector('#otherHousingType');
    if (otherHousingTypeInput) {
        otherHousingTypeInput.addEventListener('change', (e) => {
            formState.updateField('otherHousingType', e.target.value);
        });
    }

    // Обробник для поля isGasified
    const isGasifiedSelect = container.querySelector('#isGasified');
    if (isGasifiedSelect) {
        isGasifiedSelect.addEventListener('change', (e) => {
            formState.updateField('isGasified', e.target.value);
        });
    }

    // Обробники для інших полів
    const otherSelects = container.querySelectorAll('select:not(#ownHouse):not(#isRenting):not(#housingType):not(#isGasified)');
    otherSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            formState.updateField(e.target.id, e.target.value);
        });
    });
}

function toggleHousingFields(ownHouse) {
    const isRentingGroup = document.getElementById('isRentingGroup');
    const isGasifiedGroup = document.getElementById('isGasifiedGroup');
    const housingTypeGroup = document.getElementById('housingTypeGroup');
    const otherHousingTypeGroup = document.getElementById('otherHousingTypeGroup');

    // Скидання (ховаємо всі поля та чистимо їх значення)
    resetFields([isRentingGroup, isGasifiedGroup, housingTypeGroup, otherHousingTypeGroup]);

    // Логіка:
    if (ownHouse === "Так") {
        // Має власне житло => показуємо поле "Чи газифіковане?"
        isGasifiedGroup.classList.remove("d-none");
    } else if (ownHouse === "Ні") {
        // Немає власного => показуємо "Чи знімаєте ви житло?"
        isRentingGroup.classList.remove("d-none");
    }
}

function toggleRentingFields(isRenting) {
    const housingTypeGroup = document.getElementById('housingTypeGroup');
    const isGasifiedGroup = document.getElementById('isGasifiedGroup');

    // Спочатку сховаємо все
    resetFields([housingTypeGroup, isGasifiedGroup]);

    if (isRenting === "Так") {
        // Якщо орендує => показуємо "Чи газифіковане?"
        isGasifiedGroup.classList.remove("d-none");
    } else if (isRenting === "Ні") {
        // Якщо не орендує => показуємо "Тип житла"
        housingTypeGroup.classList.remove("d-none");
    }
}

function toggleOtherHousingField(housingType) {
    const otherHousingTypeGroup = document.getElementById('otherHousingTypeGroup');
    const isGasifiedGroup = document.getElementById('isGasifiedGroup');

    // Ховаємо "Інше" та чистимо інпут
    resetFields([otherHousingTypeGroup, isGasifiedGroup]);

    if (housingType === "Інше") {
        otherHousingTypeGroup.classList.remove("d-none");
        // Якщо треба, робимо input required:
        document.getElementById("otherHousingType").setAttribute("required", "required");
    } else {
        // Інакше знімаємо required
        document.getElementById("otherHousingType").removeAttribute("required");
    }

    // В будь-якому випадку після вибору типу житла знову показуємо "Чи газифіковане?"
    isGasifiedGroup.classList.remove("d-none");
}

function resetFields(fields) {
    fields.forEach((field) => {
        // field — це, наприклад, isRentingGroup. Приховуємо його
        field.classList.add("d-none");

        // Знаходимо всі input/ select/ textarea всередині поля:
        const inputs = field.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
            // Скидаємо value
            input.value = "";
            // Знімаємо required (якщо було)
            input.removeAttribute("required");
        });
    });
}