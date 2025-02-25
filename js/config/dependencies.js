// js/config/dependencies.js
export const dependenciesConfig = [
    // Зміна сценарію залежно від статусу
    {
        source: 'status',
        action: 'setScenario',
        condition: (value) => ['В полоні', 'Зниклий безвісти', 'Загинув'].includes(value),
        target: 'alternative'
    },

    // Показувати поле партнера залежно від сімейного стану
    {
        source: 'maritalStatus',
        action: 'toggleField',
        condition: (value) => ['Одружений', 'Заміжня', 'Громадянський шлюб'].includes(value),
        target: 'partnerName',
        show: true
    },

    // Показувати поле "Інше" для зв'язку
    {
        source: 'relation',
        action: 'toggleField',
        condition: (value) => value === 'Інше',
        target: 'otherRelation',
        show: true
    },

    // Показувати кількість дітей, якщо є діти
    {
        source: 'hasChildren',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'childrenCount',
        show: true
    },

    // Показувати поле "Чи знімаєте ви житло?", якщо немає власного житла
    {
        source: 'ownHouse',
        action: 'toggleField',
        condition: (value) => value === 'Ні',
        target: 'isRenting',
        show: true
    },

    // Показувати тип житла, якщо немає власного і не знімає
    {
        source: 'isRenting',
        action: 'toggleField',
        condition: (value, formData) => formData.ownHouse === 'Ні' && value === 'Ні',
        target: 'housingType',
        show: true
    },

    // Показувати інший тип житла, якщо вибрано "Інше"
    {
        source: 'housingType',
        action: 'toggleField',
        condition: (value) => value === 'Інше',
        target: 'otherHousingType',
        show: true
    },

    // Показувати поле газифікації залежно від житлових умов
    {
        source: 'ownHouse',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'isGasified',
        show: true
    },

    {
        source: 'isRenting',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'isGasified',
        show: true
    },

    {
        source: 'housingType',
        action: 'toggleField',
        condition: (value) => value !== '',
        target: 'isGasified',
        show: true
    },

    // Показувати газовий котел, якщо житло газифіковане
    {
        source: 'isGasified',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'gasBoilerBtn',
        show: true
    },

    // Показувати дрова, якщо житло не газифіковане
    {
        source: 'isGasified',
        action: 'toggleField',
        condition: (value) => value === 'Ні',
        target: 'firewoodBtn',
        show: true
    },

    // Показувати оздоровлення дітей, якщо є діти
    {
        source: 'hasChildren',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'childHealthBtn',
        show: true
    },

    // Показувати поле "Знятий з військового обліку", якщо є інвалідність
    {
        source: 'disability',
        action: 'toggleField',
        condition: (value) => ['group1', 'group2', 'group3'].includes(value),
        target: 'removedFromMilitary',
        show: true
    },

    // Показувати дату закінчення служби за певних умов
    {
        source: 'status',
        action: 'toggleField',
        condition: (value) => ['Ветеран (звільнений)', 'Особа з інвалідністю внаслідок війни', 'Загинув', 'Зниклий безвісти', 'В полоні'].includes(value),
        target: 'militaryEndDate',
        show: true
    },

    {
        source: 'removedFromMilitary',
        action: 'toggleField',
        condition: (value) => value === 'yes',
        target: 'militaryEndDate',
        show: true
    },

    // Показувати поля для посвідчення учасника бойових дій
    {
        source: 'combatCertificate',
        action: 'toggleField',
        condition: (value) => value === 'yes',
        target: 'combatCertificateNumber',
        show: true
    },

    {
        source: 'combatCertificate',
        action: 'toggleField',
        condition: (value) => value === 'yes',
        target: 'combatCertificateDate',
        show: true
    },

    // Показувати поле спеціальності залежно від освіти
    {
        source: 'educationLevel',
        action: 'toggleField',
        condition: (value) => value !== 'Середня освіта' && value !== '',
        target: 'specialty',
        show: true
    },

    // Показувати поле для НГО
    {
        source: 'ngoMember',
        action: 'toggleField',
        condition: (value) => value === 'Так',
        target: 'ngoDetails',
        show: true
    }
];

// Функція для отримання залежностей для конкретного поля
export function getDependenciesForField(fieldId) {
    return dependenciesConfig.filter(dep => dep.source === fieldId);
}

// Функція для застосування залежностей
export function applyDependency(dependency, value, formData) {
    if (dependency.condition(value, formData)) {
        if (dependency.action === 'setScenario') {
            return {
                action: 'setScenario',
                value: dependency.target
            };
        } else if (dependency.action === 'toggleField') {
            return {
                action: 'toggleField',
                fieldId: dependency.target,
                show: dependency.show
            };
        }
    } else if (dependency.action === 'toggleField') {
        return {
            action: 'toggleField',
            fieldId: dependency.target,
            show: !dependency.show
        };
    }

    return null;
}