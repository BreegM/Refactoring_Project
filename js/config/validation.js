// Приклад: js/config/validation.js
export const validationRules = {
    text: {
        basic: {
            pattern: /^[А-Яа-яІіЇїЄєҐґʼ'\-\s.,]+$/,
            message: "Дозволені символи: кирилиця, дефіси, апострофи, пробіли"
        },
        extended: {
            pattern: /^[А-Яа-яІіЇїЄєҐґʼ'\-\s.,0-9]+$/,
            message: "Дозволені символи: кирилиця, цифри, дефіси, апострофи, пробіли"
        }
    },
    phone: {
        pattern: /^\+380\d{9}$/,
        message: "Телефон має бути у форматі +380XXXXXXXXX"
    },
    // Інші правила...
};