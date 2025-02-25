// js/main.js
import formState from './modules/state.js';
import formRenderer from './modules/formRenderer.js';
import validator from './modules/validator.js';
import { setupModals } from './modules/components/modals.js';
import { sendFormData } from './api/api.js';
import { loadRegionsData, loadZakarpattiaData } from './api/regions.js';
import { togglePreloader } from './modules/preloader.js';

// Імпорт модулів для кожного кроку
import * as statusStep from './modules/steps/statusStep.js';
import * as personalInfoStep from './modules/steps/personalInfoStep.js';
import * as locationStep from './modules/steps/locationStep.js';
import * as contactDetailsStep from './modules/steps/contactDetailsStep.js';
import * as maritalStatusStep from './modules/steps/maritalStatusStep.js';
import * as relationshipStep from './modules/steps/relationshipStep.js';
import * as childrenStep from './modules/steps/childrenStep.js';
import * as additionalInfoStep from './modules/steps/additionalInfoStep.js';
import * as needsStep from './modules/steps/needsStep.js';
import * as extraContactDetailsStep from './modules/steps/extraContactDetailsStep.js';
import * as militaryServiceStep from './modules/steps/militaryServiceStep.js';
import * as ngoStep from './modules/steps/ngoStep.js';
import * as photoStep from './modules/steps/photoStep.js';

// Зробимо деякі конфігурації доступними глобально для модулів
import { stepsConfig } from './config/steps.js';
import { fieldsConfig } from './config/fields.js';
import { dependenciesConfig } from './config/dependencies.js';

window.stepsConfig = stepsConfig;
window.fieldsConfig = fieldsConfig;
window.dependenciesConfig = dependenciesConfig;

// Ініціалізація застосунку
async function initializeApp() {
    console.log('Ініціалізація застосунку...');

    // Показуємо прелоадер під час ініціалізації
    togglePreloader(true);

    try {
        // Ініціалізуємо рендерер форми
        if (!formRenderer.initialize()) {
            console.error('Помилка ініціалізації рендерера форми');
            return;
        }

        // Завантажуємо дані про регіони та Закарпаття
        await Promise.all([
            loadRegionsData(),
            loadZakarpattiaData()
        ]);

        // Ініціалізуємо модальні вікна
        setupModals();

        // Ініціалізуємо всі кроки форми
        initializeSteps();

        // Налаштовуємо обробники подій
        setupEventListeners();

        // Рендеримо форму
        formRenderer.renderForm();

        console.log('Застосунок успішно ініціалізовано');
    } catch (error) {
        console.error('Помилка ініціалізації застосунку:', error);
    } finally {
        // Ховаємо прелоадер
        togglePreloader(false);
    }
}

// Ініціалізація всіх кроків форми
function initializeSteps() {
    statusStep.initialize();
    personalInfoStep.initialize();
    locationStep.initialize();
    contactDetailsStep.initialize();
    maritalStatusStep.initialize();
    relationshipStep.initialize();
    childrenStep.initialize();
    additionalInfoStep.initialize();
    needsStep.initialize();
    extraContactDetailsStep.initialize();
    militaryServiceStep.initialize();
    ngoStep.initialize();
    photoStep.initialize();
}

// Налаштування обробників подій
function setupEventListeners() {
    // Обробник для кнопки "Назад"
    document.getElementById('prevButton').addEventListener('click', handlePrevStep);

    // Обробник для кнопки "Далі"
    document.getElementById('nextButton').addEventListener('click', handleNextStep);

    // Обробник для кнопки "Відправити"
    document.getElementById('submitButton').addEventListener('click', handleSubmit);

    // Обробник зміни розміру вікна для оновлення прогрес-бару
    window.addEventListener('resize', () => {
        formRenderer.renderProgressBar();
    });

    // Обробник для клавіші Enter
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();

            // Якщо це останній крок, імітуємо натискання "Відправити"
            if (formState.currentStep === formState.getStepsCount() - 1) {
                handleSubmit();
            } else {
                // Інакше імітуємо натискання "Далі"
                handleNextStep();
            }
        }
    });
}

// Обробник для кнопки "Назад"
function handlePrevStep() {
    formState.prevStep();
    formRenderer.renderForm();
}

// Обробник для кнопки "Далі"
function handleNextStep() {
    // Валідуємо поточний крок
    if (validator.validateStep()) {
        formState.nextStep();
        formRenderer.renderForm();
    } else {
        // Показуємо помилки
        formRenderer.showErrors();
        formRenderer.scrollToFirstError();
    }
}

// Обробник для кнопки "Відправити"
function handleSubmit() {
    // Валідуємо останній крок
    if (validator.validateStep()) {
        // Збираємо всі дані форми
        const formData = formState.collectFormData();

        // Показуємо модальне вікно підтвердження
        const confirmModal = new bootstrap.Modal(document.getElementById('consentModal'));
        confirmModal.show();

        // Обробник для кнопки підтвердження
        document.getElementById('confirmConsentBtn').addEventListener('click', async () => {
            confirmModal.hide();

            // Показуємо прелоадер під час відправки
            togglePreloader(true);

            try {
                // Відправляємо дані на сервер
                const response = await sendFormData(formData);

                if (response.status === 'success') {
                    // Показуємо повідомлення про успіх
                    showSuccessMessage(response.formNumber);

                    // Скидаємо форму
                    resetForm();
                } else {
                    throw new Error(response.message || 'Помилка при відправці форми');
                }
            } catch (error) {
                // Показуємо повідомлення про помилку
                showErrorMessage(error.message);
            } finally {
                // Ховаємо прелоадер
                togglePreloader(false);
            }
        });
    } else {
        // Показуємо помилки
        formRenderer.showErrors();
        formRenderer.scrollToFirstError();
    }
}

// Показ повідомлення про успішну відправку
function showSuccessMessage(formNumber) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
    <div class="modal fade show" style="display: block;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Успішно!</h5>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <i class="fas fa-check-circle text-success" style="font-size: 48px;"></i>
              <p class="mt-3">Анкету успішно відправлено</p>
              <p class="mt-2"><strong>Номер вашої анкети: ${formNumber}</strong></p>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary px-4" onclick="location.reload()">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  `;

    document.body.appendChild(message);
}

// Показ повідомлення про помилку
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger alert-dismissible fade show';
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas fa-exclamation-triangle me-2"></i>
      <div>
        <strong>Помилка!</strong> ${message}
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

    const container = document.querySelector('.container');
    container.insertBefore(errorMessage, container.firstChild);

    // Автоматично ховаємо повідомлення через 5 секунд
    setTimeout(() => {
        errorMessage.classList.remove('show');
        setTimeout(() => errorMessage.remove(), 150);
    }, 5000);
}

// Скидання форми
function resetForm() {
    formState.resetState();
    formRenderer.renderForm();
}

// Запускаємо ініціалізацію застосунку після завантаження DOM
document.addEventListener('DOMContentLoaded', initializeApp);