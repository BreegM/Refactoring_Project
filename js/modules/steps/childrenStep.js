// js/modules/steps/childrenStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField, createDateField, createNumberField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#childrenStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 6: Діти</h5>';

    // Додаємо поле hasChildren
    const hasChildrenField = createSelectField(fieldsConfig.hasChildren);
    container.appendChild(hasChildrenField);

    // Додаємо групу для childrenCount
    const childrenCountGroup = document.createElement('div');
    childrenCountGroup.id = 'childrenCountGroup';
    childrenCountGroup.className = 'mb-3 d-none';

    const childrenCountField = createNumberField(fieldsConfig.childrenCount);
    childrenCountGroup.appendChild(childrenCountField);

    container.appendChild(childrenCountGroup);

    // Додаємо контейнер для динамічного створення полів для дітей
    const childrenDetails = document.createElement('div');
    childrenDetails.id = 'childrenDetails';
    container.appendChild(childrenDetails);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля hasChildren
    const hasChildrenSelect = container.querySelector('#hasChildren');
    if (hasChildrenSelect) {
        hasChildrenSelect.addEventListener('change', (e) => {
            formState.updateField('hasChildren', e.target.value);
            toggleChildrenFields(e.target.value);
        });
    }

    // Обробник для поля childrenCount
    const childrenCountInput = container.querySelector('#childrenCount');
    if (childrenCountInput) {
        childrenCountInput.addEventListener('change', (e) => {
            const childrenCount = parseInt(e.target.value) || 0;
            formState.updateField('childrenCount', childrenCount);
            generateChildrenFields(childrenCount);
        });
    }
}

function toggleChildrenFields(hasChildren) {
    const childrenCountGroup = document.getElementById('childrenCountGroup');
    const childrenCount = document.getElementById('childrenCount');
    const childrenDetails = document.getElementById('childrenDetails');

    if (hasChildren === "Так") {
        // Показуємо блок із кількістю
        childrenCountGroup.classList.remove("d-none");
        childrenCount.setAttribute("required", "required");
    } else if (hasChildren === "Ні") {
        // Приховуємо, і очищаємо
        childrenCountGroup.classList.add("d-none");
        childrenCount.removeAttribute("required");
        childrenCount.value = "";
        childrenDetails.innerHTML = ""; // видаляємо поля дітей

        // Оновлюємо стан
        formState.updateField('childrenCount', '');
        formState.updateField('childrenDetails', []);
    }
}

function generateChildrenFields(count) {
    const childrenDetails = document.getElementById('childrenDetails');
    const parentDob = formState.getFieldValue('dob');
    const today = new Date().toISOString().split('T')[0];

    // Очищаємо попередні поля
    childrenDetails.innerHTML = "";

    // Створюємо масив для зберігання даних про дітей
    const childrenData = [];

    if (count > 0 && count <= 10) {
        for (let i = 1; i <= count; i++) {
            const childBlock = document.createElement('div');
            childBlock.className = "mb-3 border p-3 rounded";

            childBlock.innerHTML = `
        <h6>Дитина ${i}</h6>
        <div class="mb-3">
          <label for="childName${i}" class="form-label">Ім'я дитини</label>
          <input type="text" id="childName${i}" class="form-control" required 
                 pattern="^[А-Яа-яІіЇїЄєҐґ''ʼ\\-\\s.,]+$" 
                 placeholder="Введіть ім'я дитини">
          <div class="invalid-feedback">Будь ласка, введіть коректне ім'я українською мовою.</div>
        </div>
        
        <div class="mb-3">
          <label for="childDob${i}" class="form-label">Дата народження дитини</label>
          <input type="date" id="childDob${i}" class="form-control" required>
          <div class="invalid-feedback">
            Дата народження дитини не може бути раніше дати народження батьків або пізніше поточної дати.
          </div>
        </div>
      `;

            childrenDetails.appendChild(childBlock);

            // Створюємо об'єкт для даних дитини
            childrenData.push({
                name: '',
                dob: ''
            });

            // Додаємо обробники подій після додавання до DOM
            const childNameInput = document.getElementById(`childName${i}`);
            const childDobInput = document.getElementById(`childDob${i}`);

            if (childNameInput) {
                childNameInput.addEventListener('change', (e) => {
                    childrenData[i - 1].name = e.target.value;
                    formState.updateField('childrenDetails', childrenData);
                });
            }

            if (childDobInput) {
                childDobInput.addEventListener('change', (e) => {
                    childrenData[i - 1].dob = e.target.value;
                    formState.updateField('childrenDetails', childrenData);
                    validateChildDob(childDobInput, parentDob);
                });
            }
        }
    }

    // Оновлюємо стан
    formState.updateField('childrenDetails', childrenData);
}

function validateChildDob(childDobInput, parentDob) {
    const childDob = new Date(childDobInput.value);
    const parentDate = new Date(parentDob);
    const today = new Date();

    if (childDob <= parentDate) {
        childDobInput.setCustomValidity('Дата народження дитини не може бути раніше дати народження батьків');
        childDobInput.classList.add('is-invalid');
        return false;
    } else if (childDob > today) {
        childDobInput.setCustomValidity('Дата народження дитини не може бути пізніше поточної дати');
        childDobInput.classList.add('is-invalid');
        return false;
    } else {
        childDobInput.setCustomValidity('');
        childDobInput.classList.remove('is-invalid');
        return true;
    }
}