// js/api/regions.js
import { togglePreloader } from '../modules/preloader.js';

// Змінні для зберігання даних про регіони та Закарпаття
let regionsData = [];
let zakarpattiaData = {};

// Завантаження списку всіх областей
export async function loadRegionsData() {
    if (regionsData.length > 0) {
        return regionsData; // Повертаємо кешовані дані, якщо вони вже завантажені
    }

    togglePreloader(true);

    try {
        // Отримуємо список областей з Google Apps Script
        regionsData = await new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .getRegions();
        });

        // Сортуємо області, щоб Закарпатська була першою
        regionsData.sort((a, b) => a === "Закарпатська" ? -1 : b === "Закарпатська" ? 1 : a.localeCompare(b));

        // Оновлюємо випадаючий список областей
        updateRegionDropdown(regionsData);

        return regionsData;
    } catch (error) {
        console.error('Помилка завантаження регіонів:', error);
        return [];
    } finally {
        togglePreloader(false);
    }
}

// Завантаження даних для Закарпатської області
export async function loadZakarpattiaData() {
    if (Object.keys(zakarpattiaData).length > 0) {
        return zakarpattiaData; // Повертаємо кешовані дані, якщо вони вже завантажені
    }

    togglePreloader(true);

    try {
        // Отримуємо дані про Закарпаття з Google Apps Script
        zakarpattiaData = await new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .getZakarpattiaData();
        });

        return zakarpattiaData;
    } catch (error) {
        console.error('Помилка завантаження даних про Закарпаття:', error);
        return {};
    } finally {
        togglePreloader(false);
    }
}

// Оновлення випадаючого списку областей
function updateRegionDropdown(regions) {
    const regionSelect = document.getElementById('region');
    if (!regionSelect) return;

    // Очищаємо список
    regionSelect.innerHTML = '<option value="" disabled selected>Будь ласка, оберіть область</option>';

    // Додаємо опції для кожної області
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

// Отримання списку регіонів
export function getRegions() {
    return regionsData;
}

// Отримання даних про Закарпаття
export function getZakarpattiaData() {
    return zakarpattiaData;
}