// js/modules/steps/extraContactDetailsStep.js
import { getElement } from '../../utils/dom.js';
import formState from '../state.js';
import { formatPhoneNumber } from '../../utils/common.js';

export function initialize() {
    const container = getElement('#extraContactDetailsStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 9: Додаткові контактні дані</h5>';

    // Додаємо розділ месенджерів
    container.innerHTML += `
    <h6>Виберіть ваші месенджери</h6>
    <div class="mb-3">
      <button type="button" id="viberBtn" class="btn btn-outline-secondary toggle-btn" onclick="toggleMessenger('viber')">Viber</button>
      <button type="button" id="telegramBtn" class="btn btn-outline-secondary toggle-btn" onclick="toggleMessenger('telegram')">Telegram</button>
      <button type="button" id="whatsappBtn" class="btn btn-outline-secondary toggle-btn" onclick="toggleMessenger('whatsapp')">WhatsApp</button>
      <button type="button" id="signalBtn" class="btn btn-outline-secondary toggle-btn" onclick="toggleMessenger('signal')">Signal</button>
    </div>
  `;

    // Додаємо контейнер для опцій месенджерів
    container.innerHTML += `
    <div id="messengerOptions" class="d-none">
      <!-- Viber -->
      <div id="viberOptions" class="mb-3 d-none">
        <label for="viberNumber" class="form-label">Номер для Viber</label>
        <select id="viberNumber" class="form-select" onchange="toggleOtherNumberField('viber')">
          <option value="" disabled selected>Будь ласка, оберіть варіант</option>
          <option value="main">Основний номер</option>
          <option value="other">Інший номер</option>
        </select>
        <div id="viberOtherNumberField" class="d-none mt-2">
          <input type="tel" id="viberOtherNumber" class="form-control" placeholder="+380XXXXXXXXX" title="Формат: +380XXXXXXXXX" pattern="^\\+380\\d{9}$">
          <div id="viberOtherNumberError" class="invalid-feedback">Номер має бути у форматі +380XXXXXXXXX.</div>
        </div>
      </div>
      
      <!-- Telegram -->
      <div id="telegramOptions" class="mb-3 d-none">
        <label for="telegramNumber" class="form-label">Номер для Telegram</label>
        <select id="telegramNumber" class="form-select" onchange="toggleOtherNumberField('telegram')">
          <option value="" disabled selected>Будь ласка, оберіть варіант</option>
          <option value="main">Основний номер</option>
          <option value="other">Інший номер</option>
        </select>
        <div id="telegramOtherNumberField" class="d-none mt-2">
          <input type="tel" id="telegramOtherNumber" class="form-control" placeholder="+380XXXXXXXXX" title="Формат: +380XXXXXXXXX" pattern="^\\+380\\d{9}$">
          <div id="telegramOtherNumberError" class="invalid-feedback">Номер має бути у форматі +380XXXXXXXXX.</div>
        </div>
      </div>
      
      <!-- WhatsApp -->
      <div id="whatsappOptions" class="mb-3 d-none">
        <label for="whatsappNumber" class="form-label">Номер для WhatsApp</label>
        <select id="whatsappNumber" class="form-select" onchange="toggleOtherNumberField('whatsapp')">
          <option value="" disabled selected>Будь ласка, оберіть варіант</option>
          <option value="main">Основний номер</option>
          <option value="other">Інший номер</option>
        </select>
        <div id="whatsappOtherNumberField" class="d-none mt-2">
          <input type="tel" id="whatsappOtherNumber" class="form-control" placeholder="+380XXXXXXXXX" title="Формат: +380XXXXXXXXX" pattern="^\\+380\\d{9}$">
          <div id="whatsappOtherNumberError" class="invalid-feedback">Номер має бути у форматі +380XXXXXXXXX.</div>
        </div>
      </div>
      
      <!-- Signal -->
      <div id="signalOptions" class="mb-3 d-none">
        <label for="signalNumber" class="form-label">Номер для Signal</label>
        <select id="signalNumber" class="form-select" onchange="toggleOtherNumberField('signal')">
          <option value="" disabled selected>Будь ласка, оберіть варіант</option>
          <option value="main">Основний номер</option>
          <option value="other">Інший номер</option>
        </select>
        <div id="signalOtherNumberField" class="d-none mt-2">
          <input type="tel" id="signalOtherNumber" class="form-control" placeholder="+380XXXXXXXXX" title="Формат: +380XXXXXXXXX" pattern="^\\+380\\d{9}$">
          <div id="signalOtherNumberError" class="invalid-feedback">Номер має бути у форматі +380XXXXXXXXX.</div>
        </div>
      </div>
    </div>
  `;

    // Додаємо обробники подій
    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Обробники для кнопок месенджерів
    const messengerButtons = container.querySelectorAll('button[id$="Btn"]');
    messengerButtons.forEach(button => {
        const messenger = button.id.replace('Btn', '');
        button.addEventListener('click', () => {
            toggleMessenger(button, messenger);
        });
    });
}

function toggleMessenger(button, messenger) {
    const options = document.getElementById(`${messenger}Options`);
    const select = document.getElementById(`${messenger}Number`);
    const messengerOptions = document.getElementById('messengerOptions');

    // Перемикаємо класи кнопки
    button.classList.toggle('btn-outline-secondary');
    button.classList.toggle('btn-warning');

    // Якщо кнопка активна, показуємо опції
    if (button.classList.contains('btn-warning')) {
        options.classList.remove('d-none');
        select.setAttribute('required', 'required');
        messengerOptions.classList.remove('d-none');
    } else {
        // Якщо кнопка неактивна, приховуємо опції та очищуємо значення
        options.classList.add('d-none');
        select.removeAttribute('required');
        select.value = ''; // Скидання вибору

        const otherNumberField = document.getElementById(`${messenger}OtherNumberField`);
        const otherNumberInput = document.getElementById(`${messenger}OtherNumber`);

        if (otherNumberField && otherNumberInput) {
            otherNumberInput.value = '';
            otherNumberInput.classList.remove('is-invalid');
            otherNumberField.classList.add('d-none');
        }

        // Оновлюємо стан форми
        formState.updateField(`messengers.${messenger}`, '');

        // Перевіряємо, чи є ще активні месенджери
        const activeMessengers = Array.from(document.querySelectorAll('button[id$="Btn"]'))
            .filter(btn => btn.classList.contains('btn-warning'));

        if (activeMessengers.length === 0) {
            messengerOptions.classList.add('d-none');
        }
    }
}

function toggleOtherNumberField(messenger) {
    const select = document.getElementById(`${messenger}Number`);
    const otherNumberField = document.getElementById(`${messenger}OtherNumberField`);
    const otherNumberInput = document.getElementById(`${messenger}OtherNumber`);
    const mainPhone = formState.getFieldValue('phone');

    if (select.value === 'other') {
        otherNumberField.classList.remove('d-none');
        otherNumberInput.setAttribute('required', 'required');
        // Очищаємо значення
        formState.updateField(`messengers.${messenger}`, '');
    } else if (select.value === 'main') {
        otherNumberField.classList.add('d-none');
        otherNumberInput.removeAttribute('required');
        otherNumberInput.value = '';
        otherNumberInput.classList.remove('is-invalid');
        // Встановлюємо значення основного телефону
        formState.updateField(`messengers.${messenger}`, mainPhone);
    } else {
        otherNumberField.classList.add('d-none');
        otherNumberInput.removeAttribute('required');
        otherNumberInput.value = '';
        otherNumberInput.classList.remove('is-invalid');
        // Очищаємо значення
        formState.updateField(`messengers.${messenger}`, '');
    }
}

// Обробник для поля з номером телефону
function handleOtherNumberInput(messenger) {
    const otherNumberInput = document.getElementById(`${messenger}OtherNumber`);
    if (otherNumberInput) {
        // Форматуємо номер телефону
        const formattedNumber = formatPhoneNumber(otherNumberInput.value);
        otherNumberInput.value = formattedNumber;

        // Валідуємо номер
        const pattern = /^\+380\d{9}$/;
        if (pattern.test(formattedNumber)) {
            otherNumberInput.classList.remove('is-invalid');
            formState.updateField(`messengers.${messenger}`, formattedNumber);
        } else {
            otherNumberInput.classList.add('is-invalid');
            formState.updateField(`messengers.${messenger}`, '');
        }
    }
}