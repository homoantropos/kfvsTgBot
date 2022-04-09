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
    const today = new Date();
    let monthKeyboard = [];
    const currentMonths = this.months.filter(month => months.indexOf(month) >= today.getMonth());
    let row = [];
    currentMonths.map(
        month => {
            row.push({text: `${month}`});
            if(row.length%3 === 0) {
                monthKeyboard.push(row.slice());
                row.splice(0);
            }
        }
    );
    return monthKeyboard;
}


