// js/config/fields.js
export const fieldsConfig = {
    // Крок 1: Статус
    status: {
        id: 'status',
        type: 'select',
        label: 'Статус',
        required: true,
        options: [
            { value: '', text: 'Будь ласка, оберіть статус', disabled: true, selected: true },
            { value: 'Діючий військовослужбовець', text: 'Діючий військовослужбовець' },
            { value: 'Ветеран (звільнений)', text: 'Ветеран (звільнений)' },
            { value: 'Особа з інвалідністю внаслідок війни', text: 'Особа з інвалідністю внаслідок війни' },
            { value: 'В полоні', text: 'В полоні' },
            { value: 'Зниклий безвісти', text: 'Зниклий безвісти' },
            { value: 'Загинув', text: 'Загинув' }
        ],
        validation: {
            required: 'Будь ласка, оберіть статус'
        }
    },

    // Крок 2: Особиста інформація
    gender: {
        id: 'gender',
        type: 'select',
        label: 'Стать',
        required: true,
        options: [
            { value: '', text: 'Будь ласка, оберіть стать', disabled: true, selected: true },
            { value: 'Чоловіча', text: 'Чоловіча' },
            { value: 'Жіноча', text: 'Жіноча' }
        ],
        validation: {
            required: 'Будь ласка, оберіть стать'
        }
    },

    lastName: {
        id: 'lastName',
        type: 'text',
        label: 'Прізвище',
        required: true,
        pattern: '^[А-Яа-яІіЇїЄєҐґ\'\'ʼ\\-\\s.,]+$',
        placeholder: 'Введіть прізвище',
        validation: {
            required: 'Будь ласка, введіть прізвище',
            pattern: 'Введіть прізвище українською мовою'
        }
    },

    firstName: {
        id: 'firstName',
        type: 'text',
        label: 'Ім\'я',
        required: true,
        pattern: '^[А-Яа-яІіЇїЄєҐґ\'\'ʼ\\-\\s.,]+$',
        placeholder: 'Введіть ім\'я',
        validation: {
            required: 'Будь ласка, введіть ім\'я',
            pattern: 'Введіть ім\'я українською мовою'
        }
    },

    middleName: {
        id: 'middleName',
        type: 'text',
        label: 'По-батькові',
        required: true,
        pattern: '^[А-Яа-яІіЇїЄєҐґ\'\'ʼ\\-\\s.,]+$',
        placeholder: 'Введіть по-батькові',
        validation: {
            required: 'Будь ласка, введіть по-батькові',
            pattern: 'Введіть по-батькові українською мовою'
        }
    },

    dob: {
        id: 'dob',
        type: 'date',
        label: 'Дата народження',
        required: true,
        min: '1948-01-01',
        max: function () {
            const today = new Date();
            const eighteenYearsAgo = new Date(today);
            eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
            return eighteenYearsAgo.toISOString().split('T')[0];
        },
        validation: {
            required: 'Будь ласка, вкажіть дату народження',
            min: 'Дата народження не може бути раніше 1948 року',
            max: 'Вік має бути не менше 18 років'
        }
    },

    // Крок 3: Місце проживання
    region: {
        id: 'region',
        type: 'select',
        label: 'Область',
        required: true,
        options: [], // Буде заповнено динамічно
        validation: {
            required: 'Будь ласка, оберіть область'
        }
    },

    // Додайте інші поля за тим же принципом...
};

// Функція для отримання конфігурації поля
export function getFieldConfig(fieldId) {
    return fieldsConfig[fieldId];
}

// Функція для отримання полів для конкретного кроку
export function getFieldsForStep(stepId) {
    // Ця функція буде залежати від конфігурації кроків
    // Буде реалізована після створення steps.js
    return [];
}