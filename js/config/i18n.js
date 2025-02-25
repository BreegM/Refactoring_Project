// Приклад: js/config/i18n.js
export const translations = {
    uk: {
        common: {
            next: 'Далі',
            previous: 'Назад',
            submit: 'Відправити',
            cancel: 'Відміна',
            confirm: 'Підтверджую',
            error: 'Помилка',
            success: 'Успішно',
            required: 'Це поле обов\'язкове'
        },
        steps: {
            status: {
                title: 'Крок 1: Статус',
                fields: {
                    status: {
                        label: 'Статус',
                        placeholder: 'Будь ласка, оберіть статус',
                        options: {
                            active: 'Діючий військовослужбовець',
                            veteran: 'Ветеран (звільнений)',
                            disabled: 'Особа з інвалідністю внаслідок війни',
                            captive: 'В полоні',
                            missing: 'Зниклий безвісти',
                            deceased: 'Загинув'
                        }
                    }
                }
            },
            // Інші кроки...
        },
        // Інші розділи перекладів...
    },
    // Інші мови...
};

let currentLanguage = 'uk';

export function setLanguage(language) {
    if (translations[language]) {
        currentLanguage = language;
        return true;
    }
    return false;
}

export function getCurrentLanguage() {
    return currentLanguage;
}

export function translate(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];

    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return key;
        }
    }

    return translation;
}

export function translateWithParams(key, params) {
    let translation = translate(key);

    if (params) {
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
    }

    return translation;
}