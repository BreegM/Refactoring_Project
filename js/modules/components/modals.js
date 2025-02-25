// js/modules/components/modals.js
export function setupModals() {
    // Створення модального вікна підтвердження
    createConsentModal();

    // Створення модального вікна для фото
    createPhotoModal();
}

// Створення модального вікна підтвердження
function createConsentModal() {
    // Перевіряємо, чи вже існує модальне вікно
    if (document.getElementById('consentModal')) {
        return;
    }

    const modalHTML = `
      <div class="modal fade" id="consentModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Згода на використання персональних даних</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
            </div>
            <div class="modal-body">
              <p>
                Натискаючи "Підтверджую", ви даєте згоду на використання персональних даних відповідно до 
                <a href="https://zakon.rada.gov.ua/laws/show/2297-17" target="_blank">Закону України про використання персональних даних</a>.
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Відміна</button>
              <button type="button" class="btn btn-primary" id="confirmConsentBtn">Підтверджую</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Додаємо модальне вікно до DOM
    const modalsContainer = document.getElementById('modalsContainer') || document.body;
    modalsContainer.insertAdjacentHTML('beforeend', modalHTML);
}

// Створення модального вікна для фото
function createPhotoModal() {
    // Перевіряємо, чи вже існує модальне вікно
    if (document.getElementById('photoModal')) {
        return;
    }

    const modalHTML = `
      <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Додати фото</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-primary mb-3" id="uploadPhotoBtn">Завантажити з пристрою</button>
              <button type="button" class="btn btn-secondary" id="cameraPhotoBtn">Зробити фото з камери</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Додаємо модальне вікно до DOM
    const modalsContainer = document.getElementById('modalsContainer') || document.body;
    modalsContainer.insertAdjacentHTML('beforeend', modalHTML);

    // Додаємо обробники подій для кнопок
    setupPhotoModalEvents();
}

// Налаштування обробників подій для модального вікна фото
function setupPhotoModalEvents() {
    // Обробник для кнопки завантаження з пристрою
    document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
        document.getElementById('uploadInput').click();
        bootstrap.Modal.getInstance(document.getElementById('photoModal')).hide();
    });

    // Обробник для кнопки фото з камери
    document.getElementById('cameraPhotoBtn').addEventListener('click', () => {
        document.getElementById('cameraInput').click();
        bootstrap.Modal.getInstance(document.getElementById('photoModal')).hide();
    });
}

// Показ модального вікна підтвердження
export function showConfirmationModal(onConfirm) {
    const modal = document.getElementById('consentModal');

    if (!modal) {
        createConsentModal();
    }

    const confirmBtn = document.getElementById('confirmConsentBtn');

    // Видаляємо попередні обробники подій
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    // Додаємо новий обробник події
    newConfirmBtn.addEventListener('click', () => {
        bootstrap.Modal.getInstance(document.getElementById('consentModal')).hide();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    });

    // Показуємо модальне вікно
    const consentModal = new bootstrap.Modal(document.getElementById('consentModal'));
    consentModal.show();
}

// Показ модального вікна для фото
export function showPhotoModal() {
    const modal = document.getElementById('photoModal');

    if (!modal) {
        createPhotoModal();
    }

    // Показуємо модальне вікно
    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
    photoModal.show();
}