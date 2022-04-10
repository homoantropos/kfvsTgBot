const months = require('../config/months');

exports.provide = (option) => {
    return [
        [
            {
                text: `${option}`,
                callback_data: `${option}`
            }
        ]
    ]
}

exports.schedule = () => {
    let monthKeyboard = [];
    const currentMonths = months.filter(month => months.indexOf(month) >= 9);
    const rowsCount = Math.ceil((currentMonths.length/3));
    let row = [];
    currentMonths.map(
        month => {
            row.push({text: `${month}`});
            if(row.length%rowsCount === 0) {
                monthKeyboard.push(row.slice());
                row.splice(0);
            }
        }
    );
    if(row.length > 0) {
        monthKeyboard.push(row.slice());
        row.splice(0);
    }
    monthKeyboard.push([{text: '/start'}, {text: `${(new Date()).getFullYear()}`}]);
    return monthKeyboard;
}


