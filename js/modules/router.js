// Приклад: js/modules/router.js
import formState from './state.js';
import { stepsConfig } from '../config/steps.js';

export function navigateToStep(stepIndex) {
    const totalSteps = formState.getTotalSteps();

    if (stepIndex >= 0 && stepIndex < totalSteps) {
        formState.currentStep = stepIndex;
        renderCurrentStep();
        updateUrl(stepIndex);
        return true;
    }

    return false;
}

export function handlePopState(event) {
    if (event.state && event.state.step !== undefined) {
        formState.currentStep = event.state.step;
        renderCurrentStep();
    }
}

function updateUrl(stepIndex) {
    // Оновлюємо URL (опціонально)
    const url = new URL(window.location);
    url.searchParams.set('step', stepIndex);
    window.history.pushState({ step: stepIndex }, '', url);
}

function renderCurrentStep() {
    // Відображення поточного кроку (код перенесено в main.js)
}

// Ініціалізація маршрутизації
export function initializeRouter() {
    // Перевіряємо URL на наявність параметра step
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');

    if (stepParam !== null) {
        const stepIndex = parseInt(stepParam);
        if (!isNaN(stepIndex)) {
            formState.currentStep = stepIndex;
        }
    }

    // Додаємо обробник для кнопки "назад" браузера
    window.addEventListener('popstate', handlePopState);
}