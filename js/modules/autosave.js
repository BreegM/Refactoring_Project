// Приклад: js/modules/autosave.js
import formState from './state.js';

const AUTOSAVE_KEY = 'form_autosave_data';
const AUTOSAVE_INTERVAL = 10000; // 10 секунд

let autosaveTimer = null;

export function enableAutosave() {
    // Запускаємо таймер для автозбереження
    autosaveTimer = setInterval(() => {
        saveFormState();
    }, AUTOSAVE_INTERVAL);

    // Також зберігаємо перед закриттям вкладки
    window.addEventListener('beforeunload', saveFormState);
}

export function disableAutosave() {
    clearInterval(autosaveTimer);
    window.removeEventListener('beforeunload', saveFormState);
}

export function saveFormState() {
    const formData = formState.collectFormData();
    const saveData = {
        scenario: formState.scenario,
        currentStep: formState.currentStep,
        formData,
        timestamp: Date.now()
    };

    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(saveData));
}

export function loadFormState() {
    try {
        const savedData = JSON.parse(localStorage.getItem(AUTOSAVE_KEY));

        if (savedData && isValid(savedData)) {
            formState.setScenario(savedData.scenario);
            formState.currentStep = savedData.currentStep;
            formState.formData = savedData.formData;
            return true;
        }
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }

    return false;
}

export function clearSavedState() {
    localStorage.removeItem(AUTOSAVE_KEY);
}

function isValid(savedData) {
    // Перевірка валідності збережених даних
    return (
        savedData.scenario &&
        typeof savedData.currentStep === 'number' &&
        savedData.formData &&
        Date.now() - savedData.timestamp < 86400000 // Не старіше 24 годин
    );
}