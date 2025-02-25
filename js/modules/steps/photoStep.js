// js/modules/steps/photoStep.js
import { getElement } from '../../utils/dom.js';
import formState from '../state.js';
import { showPhotoModal } from '../components/modals.js';
import { optimizeImage } from '../components/photo.js';

export function initialize() {
    const container = getElement('#photoStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 12: Додати фото</h5>';

    // Додаємо елементи для завантаження фото
    container.innerHTML += `
    <div class="mb-3">
      <label for="photoUpload" class="form-label">Додайте фото:</label>
      <button type="button" class="btn btn-primary" id="addPhotoBtn">Додати фото</button>
      <div id="photoPreviewContainer" class="mt-3">
        <img id="photoPreview" src="" alt="Попередній перегляд фото" style="display: none; max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 5px;">
      </div>
      <input type="hidden" id="photoData" name="photoData">
      <input type="file" id="uploadInput" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display: none;">
    </div>
  `;

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробник для кнопки додавання фото
    const addPhotoBtn = container.querySelector('#addPhotoBtn');
    if (addPhotoBtn) {
        addPhotoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showPhotoModal();
        });
    }

    // Обробник для завантаження фото
    const uploadInput = document.getElementById('uploadInput');
    if (uploadInput) {
        uploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                handlePhotoUpload(file);
            }
        });
    }

    // Обробник для фото з камери
    const cameraInput = document.getElementById('cameraInput');
    if (cameraInput) {
        cameraInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                handlePhotoUpload(file);
            }
        });
    }
}

async function handlePhotoUpload(file) {
    if (!file) return;

    // Перевірка типу файлу
    if (!file.type.startsWith('image/')) {
        alert('Будь ласка, завантажуйте лише зображення.');
        return;
    }

    // Перевірка розміру файлу (макс. 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('Розмір файлу перевищує 5MB.');
        return;
    }

    try {
        // Оптимізуємо зображення
        const optimizedImage = await optimizeImage(file);

        // Оновлюємо превью
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = optimizedImage;
        photoPreview.style.display = 'block';

        // Зберігаємо дані фото
        document.getElementById('photoData').value = optimizedImage;

        // Оновлюємо стан форми
        formState.updateField('photo', optimizedImage);

    } catch (error) {
        console.error('Помилка обробки фото:', error);
        alert('Помилка при обробці фото');
    }
}