// js/modules/preloader.js
// Показати прелоадер
export function showPreloader() {
    const preloader = document.getElementById('preloaderContainer');

    if (preloader) {
        preloader.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Приховати прелоадер
export function hidePreloader() {
    const preloader = document.getElementById('preloaderContainer');

    if (preloader) {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Перемикач прелоадера
export function togglePreloader(show = true) {
    if (show) {
        showPreloader();
    } else {
        hidePreloader();
    }
}