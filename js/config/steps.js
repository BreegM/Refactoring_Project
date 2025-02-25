// js/config/steps.js
export const stepsConfig = {
    scenarios: {
        // Звичайний сценарій
        standard: [
            {
                id: 'statusStep',
                title: 'Крок 1: Статус',
                fields: ['status']
            },
            {
                id: 'personalInfoStep',
                title: 'Крок 2: Особиста інформація',
                fields: ['gender', 'lastName', 'firstName', 'middleName', 'dob']
            },
            {
                id: 'locationStep',
                title: 'Крок 3: Місце проживання',
                fields: ['region', 'locality', 'district', 'community', 'street', 'building', 'corpus', 'apartment']
            },
            {
                id: 'contactDetailsStep',
                title: 'Крок 4: Контактні дані',
                fields: ['phone', 'email']
            },
            {
                id: 'maritalStatusStep',
                title: 'Крок 5: Сімейний стан',
                fields: ['maritalStatus', 'partnerName']
            },
            {
                id: 'childrenStep',
                title: 'Крок 6: Діти',
                fields: ['hasChildren', 'childrenCount']
            },
            {
                id: 'additionalInfoStep',
                title: 'Крок 7: Додаткова інформація',
                fields: ['ownHouse', 'isRenting', 'housingType', 'otherHousingType', 'isGasified', 'specialCare', 'servedInMilitary', 'internallyDisplaced']
            },
            {
                id: 'needsStep',
                title: 'Крок 8: Потреби',
                fields: ['stationaryCare', 'resortCare', 'dentalCare', 'gym', 'largeAppliances', 'smallAppliances', 'gasBoiler', 'firewood', 'repairHelp', 'employment', 'childHealth', 'psychologicalHelp', 'legalHelp', 'educationHelp']
            },
            {
                id: 'extraContactDetailsStep',
                title: 'Крок 9: Додаткові контактні дані',
                fields: ['messengers.viber', 'messengers.telegram', 'messengers.whatsapp', 'messengers.signal']
            },
            {
                id: 'militaryServiceStep',
                title: 'Крок 10: Військова служба',
                fields: ['disability', 'removedFromMilitary', 'militaryStartDate', 'militaryEndDate', 'militaryRank', 'militaryUnit', 'battalion', 'position', 'combatCertificate', 'combatCertificateNumber', 'combatCertificateDate']
            },
            {
                id: 'ngoStep',
                title: 'Крок 11: Освіта та НГО',
                fields: ['educationLevel', 'educationInstitution', 'specialty', 'ngoMember', 'ngoDetails', 'politicalPreferences']
            },
            {
                id: 'photoStep',
                title: 'Крок 12: Додати фото',
                fields: ['photo']
            }
        ],

        // Альтернативний сценарій (для зниклих/загиблих/полонених)
        alternative: [
            {
                id: 'statusStep',
                title: 'Крок 1: Статус',
                fields: ['status']
            },
            {
                id: 'personalInfoStep',
                title: 'Крок 2: Особиста інформація',
                fields: ['gender', 'lastName', 'firstName', 'middleName', 'dob']
            },
            {
                id: 'locationStep',
                title: 'Крок 3: Місце проживання',
                fields: ['region', 'locality', 'district', 'community', 'street', 'building', 'corpus', 'apartment']
            },
            {
                id: 'contactDetailsStep',
                title: 'Крок 4: Контактні дані',
                fields: ['phone', 'email']
            },
            {
                id: 'relationshipStep',
                title: 'Крок 5: Зв\'язок',
                fields: ['relation', 'otherRelation', 'eventDate', 'circumstances', 'investigationStatus', 'otherInvestigation']
            },
            {
                id: 'childrenStep',
                title: 'Крок 6: Діти',
                fields: ['hasChildren', 'childrenCount']
            },
            {
                id: 'additionalInfoStep',
                title: 'Крок 7: Додаткова інформація',
                fields: ['ownHouse', 'isRenting', 'housingType', 'otherHousingType', 'isGasified', 'specialCare', 'servedInMilitary', 'internallyDisplaced']
            },
            {
                id: 'needsStep',
                title: 'Крок 8: Потреби',
                fields: ['stationaryCare', 'resortCare', 'dentalCare', 'gym', 'largeAppliances', 'smallAppliances', 'gasBoiler', 'firewood', 'repairHelp', 'employment', 'childHealth', 'psychologicalHelp', 'legalHelp', 'educationHelp']
            },
            {
                id: 'extraContactDetailsStep',
                title: 'Крок 9: Додаткові контактні дані',
                fields: ['messengers.viber', 'messengers.telegram', 'messengers.whatsapp', 'messengers.signal']
            },
            {
                id: 'militaryServiceStep',
                title: 'Крок 10: Військова служба',
                fields: ['disability', 'removedFromMilitary', 'militaryStartDate', 'militaryEndDate', 'militaryRank', 'militaryUnit', 'battalion', 'position', 'combatCertificate', 'combatCertificateNumber', 'combatCertificateDate']
            },
            {
                id: 'ngoStep',
                title: 'Крок 11: Освіта та НГО',
                fields: ['educationLevel', 'educationInstitution', 'specialty', 'ngoMember', 'ngoDetails', 'politicalPreferences']
            },
            {
                id: 'photoStep',
                title: 'Крок 12: Додати фото',
                fields: ['photo']
            }
        ]
    }
};

// Функція для отримання кроку за ID
export function getStepConfig(stepId) {
    // Шукаємо в обох сценаріях
    for (const scenarioKey in stepsConfig.scenarios) {
        const steps = stepsConfig.scenarios[scenarioKey];
        const step = steps.find(s => s.id === stepId);

        if (step) {
            return step;
        }
    }

    return null;
}

// Функція для отримання сусідніх кроків
export function getAdjacentSteps(scenarioId, currentStepIndex) {
    const steps = stepsConfig.scenarios[scenarioId] || [];

    return {
        prev: currentStepIndex > 0 ? steps[currentStepIndex - 1] : null,
        current: steps[currentStepIndex] || null,
        next: currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null
    };
}