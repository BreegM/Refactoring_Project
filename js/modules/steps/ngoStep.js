// js/modules/steps/ngoStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#ngoStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 11: Освіта та НГО</h5>';

    // Додаємо контейнер для блоків освіти
    const educationBlocks = document.createElement('div');
    educationBlocks.id = 'educationBlocks';
    container.appendChild(educationBlocks);

    // Додаємо перший (основний) блок освіти
    addEducationBlock(1, educationBlocks, true);

    // Додаємо кнопки управління освітою
    const educationButtons = document.createElement('div');
    educationButtons.className = 'mb-4';
    educationButtons.innerHTML = `
    <button type="button" id="addEducationBtn" class="btn btn-primary">
      Додати освіту
    </button>
  `;
    container.appendChild(educationButtons);

    // Додаємо поле ngoMember
    const ngoMemberField = createSelectField(fieldsConfig.ngoMember);
    container.appendChild(ngoMemberField);

    // Додаємо групу для ngoDetails
    const ngoDetailsGroup = document.createElement('div');
    ngoDetailsGroup.id = 'ngoDetailsField';
    ngoDetailsGroup.className = 'mb-3 d-none';

    const ngoDetailsField = createTextField(fieldsConfig.ngoDetails);
    ngoDetailsGroup.appendChild(ngoDetailsField);

    container.appendChild(ngoDetailsGroup);

    // Додаємо поле politicalPreferences
    const politicalPreferencesField = createTextField(fieldsConfig.politicalPreferences);
    container.appendChild(politicalPreferencesField);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для кнопки додавання освіти
    const addEducationBtn = container.querySelector('#addEducationBtn');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', () => {
            const educationBlocks = document.getElementById('educationBlocks');
            const blocks = educationBlocks.querySelectorAll('.education-block');

            if (blocks.length < 5) { // Максимум 5 блоків освіти
                addEducationBlock(blocks.length + 1, educationBlocks);
            } else {
                alert('Максимальна кількість блоків освіти - 5');
            }
        });
    }

    // Обробник для поля ngoMember
    const ngoMemberSelect = container.querySelector('#ngoMember');
    if (ngoMemberSelect) {
        ngoMemberSelect.addEventListener('change', (e) => {
            formState.updateField('ngoMember', e.target.value);
            toggleNGOFields(e.target.value);
        });
    }

    // Обробник для поля ngoDetails
    const ngoDetailsInput = container.querySelector('#ngoDetails');
    if (ngoDetailsInput) {
        ngoDetailsInput.addEventListener('change', (e) => {
            formState.updateField('ngoDetails', e.target.value);
        });
    }

    // Обробник для поля politicalPreferences
    const politicalPreferencesInput = container.querySelector('#politicalPreferences');
    if (politicalPreferencesInput) {
        politicalPreferencesInput.addEventListener('change', (e) => {
            formState.updateField('politicalPreferences', e.target.value);
        });
    }
}

function addEducationBlock(blockId, container, isMain = false) {
    const educationBlock = document.createElement('div');
    educationBlock.className = 'education-block mb-4 border p-3 rounded';
    educationBlock.dataset.blockId = blockId;

    // Додаємо HTML для блоку освіти
    let blockHTML = `<h6>Освіта ${blockId}</h6>`;

    // Додаємо кнопку видалення для додаткових блоків
    if (!isMain) {
        blockHTML += `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6>Освіта ${blockId}</h6>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeEducationBlock(${blockId})">
          Видалити освіту
        </button>
      </div>
    `;
    }

    // Додаємо поля освіти
    blockHTML += `
    <div class="mb-3">
      <label for="educationLevel_${blockId}" class="form-label">Рівень освіти ${isMain ? '*' : ''}</label>
      <select id="educationLevel_${blockId}" class="form-select education-level ${isMain ? 'main-education' : 'additional-education'}" ${isMain ? 'required' : ''} onchange="toggleSpecialtyField(${blockId})">
        <option value="" disabled selected>Будь ласка, оберіть</option>
        <option value="Середня освіта">Середня освіта</option>
        <option value="Середньо спеціальна освіта">Середньо спеціальна освіта</option>
        <option value="Вища освіта">Вища освіта</option>
        <option value="Післядипломна освіта">Післядипломна освіта</option>
      </select>
      <div class="invalid-feedback">Будь ласка, оберіть рівень освіти.</div>
    </div>

    <div class="mb-3">
      <label for="educationInstitution_${blockId}" class="form-label">Назва навчального закладу ${isMain ? '*' : ''}</label>
      <input type="text" id="educationInstitution_${blockId}" class="form-control education-institution ${isMain ? 'main-education' : 'additional-education'}" ${isMain ? 'required' : ''}>
      <div class="invalid-feedback">Будь ласка, введіть назву навчального закладу.</div>
    </div>

    <div id="specialtyField_${blockId}" class="mb-3 d-none">
      <label for="specialty_${blockId}" class="form-label">Спеціальність</label>
      <input type="text" id="specialty_${blockId}" class="form-control specialty" placeholder="Введіть спеціальність" 
             pattern="[А-Яа-яІіЇїЄєҐґʼ'\\-\\s.,0-9()]{2,100}">
      <div class="invalid-feedback">Будь ласка, введіть коректну спеціальність (українською, 2-100 символів).</div>
    </div>
  `;

    educationBlock.innerHTML = blockHTML;
    container.appendChild(educationBlock);

    // Додаємо обробники подій для полів
    setupEducationBlockEvents(blockId);
}

function setupEducationBlockEvents(blockId) {
    // Обробник для рівня освіти
    const educationLevelSelect = document.getElementById(`educationLevel_${blockId}`);
    if (educationLevelSelect) {
        educationLevelSelect.addEventListener('change', (e) => {
            toggleSpecialtyField(blockId);

            // Оновлюємо стан форми
            const levels = formState.getFieldValue('educationLevels') || [];
            levels[blockId - 1] = e.target.value;
            formState.updateField('educationLevels', levels);
        });
    }

    // Обробник для навчального закладу
    const educationInstitutionInput = document.getElementById(`educationInstitution_${blockId}`);
    if (educationInstitutionInput) {
        educationInstitutionInput.addEventListener('change', (e) => {
            const institutions = formState.getFieldValue('educationInstitutions') || [];
            institutions[blockId - 1] = e.target.value;
            formState.updateField('educationInstitutions', institutions);
        });
    }

    // Обробник для спеціальності
    const specialtyInput = document.getElementById(`specialty_${blockId}`);
    if (specialtyInput) {
        specialtyInput.addEventListener('change', (e) => {
            const specialties = formState.getFieldValue('specialties') || [];
            specialties[blockId - 1] = e.target.value;
            formState.updateField('specialties', specialties);
        });
    }
}

function toggleSpecialtyField(blockId) {
    const educationLevel = document.getElementById(`educationLevel_${blockId}`);
    const specialtyField = document.getElementById(`specialtyField_${blockId}`);
    const specialtyInput = document.getElementById(`specialty_${blockId}`);

    if (educationLevel.value && educationLevel.value !== "Середня освіта") {
        specialtyField.classList.remove('d-none');
        specialtyInput.setAttribute('required', 'required');
    } else {
        specialtyField.classList.add('d-none');
        specialtyInput.removeAttribute('required');
        specialtyInput.value = '';
    }
}

function removeEducationBlock(blockId) {
    const block = document.querySelector(`[data-block-id="${blockId}"]`);
    if (block) {
        // Видаляємо блок з DOM
        block.remove();

        // Оновлюємо нумерацію блоків
        const blocks = document.querySelectorAll('.education-block');
        blocks.forEach((block, index) => {
            const id = index + 1;
            block.dataset.blockId = id;
            block.querySelector('h6').textContent = `Освіта ${id}`;

            // Оновлюємо ID полів
            const fields = block.querySelectorAll('[id]');
            fields.forEach(field => {
                const oldId = field.id;
                const baseName = oldId.split('_')[0];
                field.id = `${baseName}_${id}`;
            });

            // Оновлюємо атрибути for у міток
            const labels = block.querySelectorAll('label');
            labels.forEach(label => {
                const forAttr = label.getAttribute('for');
                if (forAttr) {
                    const baseName = forAttr.split('_')[0];
                    label.setAttribute('for', `${baseName}_${id}`);
                }
            });
        });

        // Оновлюємо стан форми
        const levels = formState.getFieldValue('educationLevels') || [];
        const institutions = formState.getFieldValue('educationInstitutions') || [];
        const specialties = formState.getFieldValue('specialties') || [];

        // Видаляємо дані про освіту з видаленого блоку
        levels.splice(blockId - 1, 1);
        institutions.splice(blockId - 1, 1);
        specialties.splice(blockId - 1, 1);

        formState.updateField('educationLevels', levels);
        formState.updateField('educationInstitutions', institutions);
        formState.updateField('specialties', specialties);
    }
}

function toggleNGOFields(ngoMember) {
    const ngoDetailsField = document.getElementById('ngoDetailsField');
    const ngoDetailsInput = document.getElementById('ngoDetails');

    if (ngoMember === "Так") {
        // Показуємо поле та робимо його обов'язковим
        ngoDetailsField.classList.remove("d-none");
        ngoDetailsInput.setAttribute("required", "required");
    } else {
        // Приховуємо поле та робимо його необов'язковим
        ngoDetailsField.classList.add("d-none");
        ngoDetailsInput.removeAttribute("required");
        ngoDetailsInput.value = "";
        ngoDetailsInput.classList.remove("is-invalid");
    }
}