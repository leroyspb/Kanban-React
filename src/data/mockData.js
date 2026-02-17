export const initialColumns = [
    {
        id: 'backlog',
        title: 'Backlog',
        icon: '📋',
        tasks: [
            {
                id: 'task-1',
                title: 'Login page – performance issues',
                description: 'Это был темный лес, издали казавшийся непроходимым. Там Пахапиль охотился, глушил рыбу, спал на еловых ветках. Короче – жил, пока русские не выгнали оккупантов. А когда немцы ушли, Пахапиль вернулся. Он появился в Раквере, где советский капитан наградил его медалью. Медаль была украшена четырьмя непонятными словами, фигурой и восклицательным знаком.',
                completed: false,
                priority: 'high',
                createdAt: '2026-02-10'
            },
            {
                id: 'task-2',
                title: 'Sprint bugfix',
                description: 'Исправление критических ошибок спринта',
                completed: false,
                priority: 'critical',
                createdAt: '2026-02-12'
            }
        ]
    },
    {
        id: 'ready',
        title: 'Ready',
        icon: '🎯',
        tasks: [
            {
                id: 'task-3',
                title: 'Shop page – performance issues',
                description: 'Оптимизация загрузки страницы магазина',
                completed: false,
                priority: 'high'
            },
            {
                id: 'task-4',
                title: 'Checkout bugfix',
                description: 'Исправление ошибок оформления заказа',
                completed: false,
                priority: 'high'
            },
            {
                id: 'task-5',
                title: 'Shop bug1',
                description: 'Исправление загрузки изображений товаров',
                completed: false,
                priority: 'medium'
            },
            {
                id: 'task-6',
                title: 'Shop bug2',
                description: 'Исправление расчета цен',
                completed: false,
                priority: 'medium'
            },
            {
                id: 'task-7',
                title: 'Shop bug3',
                description: 'Исправление кнопки добавления в корзину',
                completed: false,
                priority: 'high'
            },
            {
                id: 'task-8',
                title: 'Shop bug4',
                description: 'Исправление отображения остатков',
                completed: false,
                priority: 'low'
            },
            {
                id: 'task-9',
                title: 'Shop bug5',
                description: 'Исправление поиска',
                completed: false,
                priority: 'medium'
            },
            {
                id: 'task-10',
                title: 'Shop bug6',
                description: 'Исправление фильтрации по категориям',
                completed: false,
                priority: 'low'
            },
            {
                id: 'task-11',
                title: 'Shop page – performance issues',
                description: 'Дополнительная оптимизация производительности',
                completed: false,
                priority: 'high'
            }
        ]
    },
    {
        id: 'inProgress',
        title: 'In Progress',
        icon: '⚙️',
        tasks: [
            {
                id: 'task-12',
                title: 'User page – performance issues',
                description: 'Оптимизация загрузки страницы пользователя',
                completed: false,
                priority: 'high'
            },
            {
                id: 'task-13',
                title: 'Auth bugfix',
                description: 'Исправление обновления токена авторизации',
                completed: false,
                priority: 'critical'
            }
        ]
    },
    {
        id: 'finished',
        title: 'Finished',
        icon: '✅',
        tasks: [
            {
                id: 'task-14',
                title: 'Main page – performance issues',
                description: 'Это был темный лес, издали казавшийся непроходимым. Там Пахапиль охотился, глушил рыбу, спал на еловых ветках. Короче – жил, пока русские не выгнали оккупантов. А когда немцы ушли, Пахапиль вернулся. Он появился в Раквере, где советский капитан наградил его медалью. Медаль была украшена четырьмя непонятными словами, фигурой и восклицательным знаком.',
                completed: true,
                priority: 'high',
                createdAt: '2026-02-14'
            },
            {
                id: 'task-15',
                title: 'Main page bugfix',
                description: 'Исправление ошибок верстки главной страницы',
                completed: true,
                priority: 'medium',
                createdAt: '2026-02-13'
            }
        ]
    }
];