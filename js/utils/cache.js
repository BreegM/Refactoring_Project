// Приклад: js/utils/cache.js
const CACHE_PREFIX = 'form_cache_';
const DEFAULT_TTL = 3600000; // 1 година в мілісекундах

export function setCache(key, data, ttl = DEFAULT_TTL) {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cacheData = {
        data,
        expiry: Date.now() + ttl
    };

    try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        return true;
    } catch (error) {
        console.error('Failed to cache data:', error);
        return false;
    }
}

export function getCache(key) {
    const cacheKey = `${CACHE_PREFIX}${key}`;

    try {
        const cacheData = JSON.parse(localStorage.getItem(cacheKey));

        if (!cacheData) {
            return null;
        }

        if (Date.now() > cacheData.expiry) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        return cacheData.data;
    } catch (error) {
        console.error('Failed to get cached data:', error);
        return null;
    }
}

export function clearCache(key) {
    if (key) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } else {
        // Очистити всі елементи кешу
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    }
}