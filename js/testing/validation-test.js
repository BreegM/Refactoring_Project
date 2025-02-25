// Приклад: js/testing/validation-test.js
import { validateField } from '../modules/validator.js';
import { validationRules } from '../config/validation.js';

export function runValidationTests() {
    console.group('Validation Tests');

    // Тест для текстових полів
    testTextValidation();

    // Тест для номерів телефонів
    testPhoneValidation();

    // Тест для дат
    testDateValidation();

    console.groupEnd();
}

function testTextValidation() {
    console.group('Text Field Validation');

    const validTexts = ['Іванов', 'Петренко-Сидоренко', "Сидор'єнко"];
    const invalidTexts = ['Ivanov', '123', 'Іванов123'];

    validTexts.forEach(text => {
        const result = validateField('text', text, validationRules.text.basic);
        console.log(`Text "${text}" - ${result.valid ? 'VALID' : 'INVALID'}`);
    });

    invalidTexts.forEach(text => {
        const result = validateField('text', text, validationRules.text.basic);
        console.log(`Text "${text}" - ${result.valid ? 'VALID' : 'INVALID'}`);
    });

    console.groupEnd();
}

// Інші функції для тестування...