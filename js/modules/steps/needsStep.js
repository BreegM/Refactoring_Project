// js/modules/steps/needsStep.js
import { getElement } from '../../utils/dom.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#needsStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 8: Потреби</h5>';

    // Додаємо розділ медичних потреб
    container.innerHTML += `
    <h6>Медичні потреби</h6>
    <div id="medicalNeedsButtons" class="mb-3">
      <button type="button" id="stationaryCareBtn" class="btn btn-outline-primary toggle-btn" data-value="Стаціонарне лікування" onclick="toggleButtonState(this)">Стаціонарне лікування</button>
      <button type="button" id="resortCareBtn" class="btn btn-outline-primary toggle-btn" data-value="Санаторно-курортне лікування" onclick="toggleButtonState(this)">Санаторно-курортне лікування</button>
      <button type="button" id="dentalCareBtn" class="btn btn-outline-primary toggle-btn" data-value="Стоматологічне протезування" onclick="toggleButtonState(this)">Стоматологічне протезування</button>
      <button type="button" id="gymBtn" class="btn btn-outline-primary toggle-btn" data-value="Спортзал" onclick="toggleButtonState(this)">Спортзал</button>
    </div>
  `;

    // Додаємо розділ побутових потреб
    container.innerHTML += `
    <h6>Побутові потреби</h6>
    <div class="mb-3">
      <button type="button" id="largeAppliancesBtn" class="btn btn-outline-secondary" onclick="toggleAppliancesOptions('largeAppliancesBtn', 'largeAppliancesSelect')">Велика побутова техніка</button>
      <select id="largeAppliancesSelect" class="form-select d-none mt-2">
        <option value="" selected>Будь ласка, оберіть</option>
        <option value="Холодильник">Холодильник</option>
        <option value="Пральна машинка">Пральна машинка</option>
        <option value="Бойлер">Бойлер</option>
      </select>
    </div>
    
    <div class="mb-3">
      <button type="button" id="smallAppliancesBtn" class="btn btn-outline-secondary" onclick="toggleAppliancesOptions('smallAppliancesBtn', 'smallAppliancesSelect')">Дрібна побутова техніка</button>
      <select id="smallAppliancesSelect" class="form-select d-none mt-2">
        <option value="" selected>Будь ласка, оберіть</option>
        <option value="Пилосос">Пилосос</option>
        <option value="Мікрохвильова піч">Мікрохвильова піч</option>
        <option value="Праска">Праска</option>
      </select>
    </div>
    
    <div class="mb-3" id="gasNeedsButtons">
      <button type="button" id="gasBoilerBtn" class="btn btn-outline-warning d-none" onclick="toggleButtonState(this)">Газовий котел</button>
      <button type="button" id="firewoodBtn" class="btn btn-outline-warning d-none" onclick="toggleButtonState(this)">Дрова</button>
    </div>
  `;

    // Додаємо розділ інших потреб
    container.innerHTML += `
    <h6>Інші потреби</h6>
    <div class="mb-3">
      <button type="button" id="repairHelpBtn" class="btn btn-outline-success" onclick="toggleButtonState(this)">Допомога з ремонтом</button>
      <button type="button" id="employmentBtn" class="btn btn-outline-success" onclick="toggleEmployment()">Працевлаштування</button>
      <a href="https://docs.google.com/document/d/1hHXa3TcauSeQ_hgj24edvCUcrsC0Y4oBuQ9m72_dTG0/edit?tab=t.0" id="employmentLink" class="d-none" target="_blank">Завантажити анкету для працевлаштування</a>
    </div>
    
    <div class="mb-3">
      <button type="button" id="childHealthBtn" class="btn btn-outline-success d-none" onclick="toggleButtonState(this)">Оздоровлення дітей</button>
      <button type="button" id="psychologicalHelpBtn" class="btn btn-outline-success" onclick="toggleButtonState(this)">Психологічна допомога</button>
      <button type="button" id="legalHelpBtn" class="btn btn-outline-success" onclick="toggleButtonState(this)">Юридична допомога</button>
      <button type="button" id="educationHelpBtn" class="btn btn-outline-success" onclick="toggleButtonState(this)">Навчання (тренінги, семінари, лекції)</button>
    </div>
  `;

    // Додаємо обробники подій
    setupEventListeners(container);

    // Оновлюємо відображення потреб залежно від інших даних
    updateNeedsSection();
}

function setupEventListeners(container) {
    // Обробники для кнопок медичних потреб
    const medicalButtons = container.querySelectorAll('#medicalNeedsButtons button');
    medicalButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtonState(button);
            formState.updateField(button.id.replace('Btn', ''), button.classList.contains('btn-primary'));
        });
    });

    // Обробники для великої побутової техніки
    const largeAppliancesBtn = container.querySelector('#largeAppliancesBtn');
    const largeAppliancesSelect = container.querySelector('#largeAppliancesSelect');
    if (largeAppliancesBtn && largeAppliancesSelect) {
        largeAppliancesBtn.addEventListener('click', () => {
            toggleAppliancesOptions(largeAppliancesBtn, largeAppliancesSelect);
        });
        largeAppliancesSelect.addEventListener('change', (e) => {
            formState.updateField('largeAppliances', e.target.value);
        });
    }

    // Обробники для дрібної побутової техніки
    const smallAppliancesBtn = container.querySelector('#smallAppliancesBtn');
    const smallAppliancesSelect = container.querySelector('#smallAppliancesSelect');
    if (smallAppliancesBtn && smallAppliancesSelect) {
        smallAppliancesBtn.addEventListener('click', () => {
            toggleAppliancesOptions(smallAppliancesBtn, smallAppliancesSelect);
        });
        smallAppliancesSelect.addEventListener('change', (e) => {
            formState.updateField('smallAppliances', e.target.value);
        });
    }

    // Обробники для газового котла та дров
    const gasBoilerBtn = container.querySelector('#gasBoilerBtn');
    const firewoodBtn = container.querySelector('#firewoodBtn');
    if (gasBoilerBtn) {
        gasBoilerBtn.addEventListener('click', () => {
            toggleButtonState(gasBoilerBtn);
            formState.updateField('gasBoiler', gasBoilerBtn.classList.contains('btn-warning'));
        });
    }
    if (firewoodBtn) {
        firewoodBtn.addEventListener('click', () => {
            toggleButtonState(firewoodBtn);
            formState.updateField('firewood', firewoodBtn.classList.contains('btn-warning'));
        });
    }

    // Обробники для інших кнопок
    const otherButtons = [
        { id: '#repairHelpBtn', field: 'repairHelp' },
        { id: '#psychologicalHelpBtn', field: 'psychologicalHelp' },
        { id: '#legalHelpBtn', field: 'legalHelp' },
        { id: '#educationHelpBtn', field: 'educationHelp' }
    ];

    otherButtons.forEach(({ id, field }) => {
        const button = container.querySelector(id);
        if (button) {
            button.addEventListener('click', () => {
                toggleButtonState(button);
                formState.updateField(field, button.classList.contains('btn-success'));
            });
        }
    });

    // Обробник для кнопки працевлаштування
    const employmentBtn = container.querySelector('#employmentBtn');
    const employmentLink = container.querySelector('#employmentLink');
    if (employmentBtn) {
        employmentBtn.addEventListener('click', () => {
            toggleEmployment(employmentBtn, employmentLink);
        });
    }

    // Обробник для кнопки оздоровлення дітей
    const childHealthBtn = container.querySelector('#childHealthBtn');
    if (childHealthBtn) {
        childHealthBtn.addEventListener('click', () => {
            toggleButtonState(childHealthBtn);
            formState.updateField('childHealth', childHealthBtn.classList.contains('btn-success'));
        });
    }
}

function toggleButtonState(button) {
    // Визначаємо базовий та активний класи залежно від типу кнопки
    let baseClass = '';
    let activeClass = '';

    if (button.classList.contains('btn-outline-primary') || button.classList.contains('btn-primary')) {
        baseClass = 'btn-outline-primary';
        activeClass = 'btn-primary';
    } else if (button.classList.contains('btn-outline-warning') || button.classList.contains('btn-warning')) {
        baseClass = 'btn-outline-warning';
        activeClass = 'btn-warning';
    } else if (button.classList.contains('btn-outline-success') || button.classList.contains('btn-success')) {
        baseClass = 'btn-outline-success';
        activeClass = 'btn-success';
    } else if (button.classList.contains('btn-outline-secondary') || button.classList.contains('btn-secondary')) {
        baseClass = 'btn-outline-secondary';
        activeClass = 'btn-secondary';
    }

    // Перемикаємо стан кнопки
    if (button.classList.contains(baseClass)) {
        button.classList.remove(baseClass);
        button.classList.add(activeClass);
    } else {
        button.classList.remove(activeClass);
        button.classList.add(baseClass);
    }
}

function toggleAppliancesOptions(button, select) {
    // Перемикаємо активний стан кнопки
    button.classList.toggle('btn-outline-secondary');
    button.classList.toggle('btn-secondary');

    // Показуємо або ховаємо випадаючий список
    select.classList.toggle('d-none');

    // Якщо випадаючий список ховається, очищуємо його значення
    if (select.classList.contains('d-none')) {
        select.value = '';
    }
}

function toggleEmployment(button, link) {
    // Змінюємо клас з outline на звичайний і навпаки
    button.classList.toggle('btn-outline-success');
    button.classList.toggle('btn-success');

    // Показуємо/ховаємо посилання
    link.classList.toggle('d-none');
}

function updateNeedsSection() {
    const isGasified = formState.getFieldValue('isGasified');
    const hasChildren = formState.getFieldValue('hasChildren');

    // 1. Газовий котел та Дрова
    const gasBoilerBtn = document.getElementById('gasBoilerBtn');
    const firewoodBtn = document.getElementById('firewoodBtn');

    if (isGasified === 'Так') {
        gasBoilerBtn.classList.remove('d-none');
        firewoodBtn.classList.add('d-none');
    } else if (isGasified === 'Ні') {
        firewoodBtn.classList.remove('d-none');
        gasBoilerBtn.classList.add('d-none');
    } else {
        // Якщо не вибрано, ховаємо обидві
        gasBoilerBtn.classList.add('d-none');
        firewoodBtn.classList.add('d-none');
    }

    // 2. Оздоровлення дітей
    const childHealthBtn = document.getElementById('childHealthBtn');
    if (hasChildren === 'Так') {
        childHealthBtn.classList.remove('d-none');
    } else {
        childHealthBtn.classList.add('d-none');
    }
}