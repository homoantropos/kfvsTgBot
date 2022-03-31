exports.start = [
    [
        {
            text: 'Фізична культура'
        },
        {
            text: 'Спорт'
        }
    ],
    [
        {
          text: 'Семінари'
        },
        {
            text: 'Контакти'
        }
    ],
    [
        {
            text: 'Завершити роботу'
        }
    ]
];

exports.physical_culture = [
    [
        {
            text: 'Заняття вдома'
        },
        {
            text: 'Уроки'
        }
    ],
    [
        {
            text: 'Cool Games'
        },
        {
            text: 'Cool Race',
            callback_data: 'Функція в розробці'
        },
        {
            text: 'Заняття на природі'
        },
        {
            text: 'Турніки'
        }
    ],
    [
        {
            text: '/start'
        },
        {
            text: 'Завершити роботу'
        }
    ]
]

exports.cool_games = [
    [
        {
            text: 'Правила Cool Games',
            url: 'https://youtu.be/NOWW6OUmmmU'
        }
    ],
    [
        {
            text: 'Естафети Cool Games',
            url: 'https://youtu.be/NPfYAt-74tw'
        }
    ],
    [
        {
            text: 'Використання Cool Games на уроках фізичної культури',
            url: 'https://youtu.be/wzYyl6BjPAc'
        }
    ],
    [
        {
            text: 'Назад',
            callback_data: 'Фізична культура'
        }
    ]
]

exports.home = [
    [
        {
            text: 'Відео підбірка',
            url: 'http://sportmon.org/fizychne-vyhovannya-onlajn/'
        }
    ],
    [
        {
            text: 'Назад',
            callback_data: 'Фізична культура'
        }
    ]
]

exports.lessons = [
    [{
        text: 'Модельна навчальна програма «Фізична культура. 5-6 класи»',
        url: 'https://drive.google.com/drive/u/2/folders/1KB2WRyGBgNwcETclvsBVbuRCpl-g2OKs'
    }],
    [{
        text: 'Назад',
        callback_data: 'Фізична культура'
    }]
]

exports.seminars = [
    [{
        text: 'Використання інструментів Google для організації' +
            'та проведення спортивно-масових та спортивних заходів серед учнівської та студентської молоді',
        url: 'https://www.youtube.com/watch?v=UCneUoF4lPc&list=PL5mJysZpAYRYqSPmRTOPDhC2xKS1vo2Ze'
    }],
    [{
        text: 'Планування та організація проведення заходів',
        url: 'https://youtube.com/playlist?list=PL5mJysZpAYRapEDqABQtSGqfhEsBZljrE'
    }],
    [{
        text: 'Назад',
        callback_data: '/start'
    }]
]
