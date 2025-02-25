// js/modules/steps/locationStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField, createTextField } from '../components/fields.js';
import formState from '../state.js';
import { loadRegionsData, loadZakarpattiaData } from '../../api/regions.js';

export async function initialize() {
    const container = getElement('#locationStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 3: Місце проживання</h5>';

    // Додаємо поле region
    const regionField = createSelectField(fieldsConfig.region);
    container.appendChild(regionField);

    // Додаємо поле locality
    const localityField = createTextField(fieldsConfig.locality);
    container.appendChild(localityField);

    // Додаємо групу для district (буде показана лише для Закарпатської області)
    const districtGroup = document.createElement('div');
    districtGroup.id = 'districtGroup';
    districtGroup.className = 'mb-3 d-none';
    districtGroup.innerHTML = `
    <label for="district" class="form-label">Район</label>
    <select id="district" class="form-select">
      <option value="" disabled selected>Будь ласка, оберіть район</option>
    </select>
    <div class="invalid-feedback">Будь ласка, оберіть район.</div>
  `;
    container.appendChild(districtGroup);

    // Додаємо групу для community
    const communityGroup = document.createElement('div');
    communityGroup.id = 'communityGroup';
    communityGroup.className = 'mb-3 d-none';
    communityGroup.innerHTML = `
    <label for="community" class="form-label">Громада</label>
    <select id="community" class="form-select">
      <option value="" disabled selected>Будь ласка, оберіть громаду</option>
    </select>
    <div class="invalid-feedback">Будь ласка, оберіть громаду.</div>
  `;
    container.appendChild(communityGroup);

    // Додаємо поля для адреси
    const streetField = createTextField(fieldsConfig.street);
    container.appendChild(streetField);

    const buildingField = createTextField(fieldsConfig.building);
    container.appendChild(buildingField);

    const corpusField = createTextField(fieldsConfig.corpus);
    container.appendChild(corpusField);

    // Додаємо кнопку для приватного будинку
    const privateHouseBtn = document.createElement('div');
    privateHouseBtn.className = 'mb-3';
    privateHouseBtn.innerHTML = `
    <button id="privateHouseBtn" type="button" class="btn btn-outline-secondary btn-private-house-inactive">Приватний будинок</button>
  `;
    container.appendChild(privateHouseBtn);

    // Додаємо поле apartment
    const apartmentField = createTextField(fieldsConfig.apartment);
    container.appendChild(apartmentField);

    // Завантажуємо дані про регіони та Закарпаття
    await Promise.all([loadRegionsData(), loadZakarpattiaData()]);

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для поля region
    const regionSelect = container.querySelector('#region');
    if (regionSelect) {
        regionSelect.addEventListener('change', handleRegionChange);
    }

    // Обробник для поля locality
    const localityInput = container.querySelector('#locality');
    if (localityInput) {
        localityInput.addEventListener('input', handleLocalityInput);
        localityInput.addEventListener('change', (e) => {
            formState.updateField('locality', e.target.value);
        });
    }

    // Обробники для district і community
    const districtSelect = container.querySelector('#district');
    if (districtSelect) {
        districtSelect.addEventListener('change', handleDistrictOrCommunityChange);
    }

    const communitySelect = container.querySelector('#community');
    if (communitySelect) {
        communitySelect.addEventListener('change', handleDistrictOrCommunityChange);
    }

    // Обробник для кнопки privateHouseBtn
    const privateHouseButton = container.querySelector('#privateHouseBtn');
    if (privateHouseButton) {
        privateHouseButton.addEventListener('click', togglePrivateHouse);
    }

    // Обробники для інших полів
    const textFields = container.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        field.addEventListener('change', (e) => {
            formState.updateField(e.target.id, e.target.value);
        });
    });
}

// Функції для обробки подій будуть імплементовані відповідно до логіки старого застосунку
function handleRegionChange() {
    // Логіка обробки зміни регіону
}

function handleLocalityInput() {
    // Логіка обробки вводу населеного пункту
}

function handleDistrictOrCommunityChange() {
    // Логіка обробки зміни району чи громади
}

function togglePrivateHouse() {
    // Логіка перемикання приватного будинку
}