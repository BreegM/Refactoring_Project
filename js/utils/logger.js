// Приклад: js/utils/logger.js
const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

// Рівень логування (DEBUG в розробці, ERROR в продакшн)
let currentLogLevel = LOG_LEVELS.DEBUG;

export function setLogLevel(level) {
    if (LOG_LEVELS[level] !== undefined) {
        currentLogLevel = LOG_LEVELS[level];
    }
}

export function debug(message, data) {
    if (currentLogLevel <= LOG_LEVELS.DEBUG) {
        console.debug(`[DEBUG] ${message}`, data);
    }
}

export function info(message, data) {
    if (currentLogLevel <= LOG_LEVELS.INFO) {
        console.info(`[INFO] ${message}`, data);
    }
}

export function warn(message, data) {
    if (currentLogLevel <= LOG_LEVELS.WARN) {
        console.warn(`[WARN] ${message}`, data);
    }
}

export function error(message, data) {
    if (currentLogLevel <= LOG_LEVELS.ERROR) {
        console.error(`[ERROR] ${message}`, data);
    }
}