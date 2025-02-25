// Приклад: js/modules/components/customFields.js
export function createRangeField(config) {
    const { id, label, min, max, step, value, required } = config;

    const fieldHtml = `
      <div class="mb-3 field-container" id="${id}-container">
        <label for="${id}" class="form-label">${label}${required ? ' *' : ''}</label>
        <div class="d-flex align-items-center">
          <input 
            type="range" 
            id="${id}" 
            class="form-range me-2" 
            min="${min || 0}" 
            max="${max || 100}" 
            step="${step || 1}" 
            ${value ? `value="${value}"` : ''} 
            ${required ? 'required' : ''}
          >
          <span class="range-value" id="${id}-value">${value || min || 0}</span>
        </div>
      </div>
    `;

    const element = document.createRange().createContextualFragment(fieldHtml);

    // Додаємо обробник для оновлення значення
    element.querySelector(`#${id}`).addEventListener('input', (e) => {
        element.querySelector(`#${id}-value`).textContent = e.target.value;
    });

    return element;
}

export function createColorPickerField(config) {
    const { id, label, value, required } = config;

    const fieldHtml = `
      <div class="mb-3 field-container" id="${id}-container">
        <label for="${id}" class="form-label">${label}${required ? ' *' : ''}</label>
        <div class="d-flex align-items-center">
          <input 
            type="color" 
            id="${id}" 
            class="form-control form-control-color me-2" 
            ${value ? `value="${value}"` : 'value="#000000"'} 
            ${required ? 'required' : ''}
          >
          <span class="color-value" id="${id}-value">${value || '#000000'}</span>
        </div>
      </div>
    `;

    const element = document.createRange().createContextualFragment(fieldHtml);

    // Додаємо обробник для оновлення значення
    element.querySelector(`#${id}`).addEventListener('input', (e) => {
        element.querySelector(`#${id}-value`).textContent = e.target.value;
    });

    return element;
}