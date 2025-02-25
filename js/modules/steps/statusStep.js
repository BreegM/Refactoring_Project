// Приклад: js/modules/steps/statusStep.js
import { getElement } from '../../utils/dom.js';
import { fieldsConfig } from '../../config/fields.js';
import { createSelectField } from '../components/fields.js';
import formState from '../state.js';

export function initialize() {
    const container = getElement('#statusStep');

    // Додаємо заголовок
    container.innerHTML = '<h5>Крок 1: Статус</h5>';

    // Додаємо поле статусу
    const statusField = createSelectField(fieldsConfig.status);
    container.appendChild(statusField);

    // Додаємо обробник події зміни статусу
    const selectElement = container.querySelector('select');
    selectElement.addEventListener('change', (e) => {
        const status = e.target.value;
        formState.updateField('status', status);

        // Перевіряємо необхідність зміни сценарію
        if (['В полоні', 'Зниклий безвісти', 'Загинув'].includes(status)) {
            formState.setScenario('alternative');
        } else {
            formState.setScenario('standard');
        }
    });
}