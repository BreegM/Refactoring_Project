// js/api/api.js
import { togglePreloader } from '../modules/preloader.js';

// Відправка даних форми
export async function sendFormData(formData) {
    togglePreloader(true);

    try {
        // Тут використовуємо Google Apps Script для відправки даних
        const response = await new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .processFormSubmission(formData);
        });

        return response;
    } catch (error) {
        console.error('Помилка при відправці даних:', error);
        return {
            status: 'error',
            message: error.message || 'Помилка при відправці даних'
        };
    } finally {
        togglePreloader(false);
    }
}