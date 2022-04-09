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
    const currentMonths = months.filter(month => months.indexOf(month) >= (new Date()).getMonth());
    let row = [];
    currentMonths.map(
        month => {
            row.push({text: `${month}`});
            if(row.length%4 === 0) {
                monthKeyboard.push(row.slice());
                row.splice(0);
            }
        }
    );
    return monthKeyboard;
}


