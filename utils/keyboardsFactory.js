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
    console.log(months);
    const currentMonths = months.filter(month => month.index >= today.getDate());
    console.log(monthKeyboard);
    let row = [];
    currentMonths.map(
        month => {
            row.push(
                {
                    text: `${month}`
                }
            );
            if(row.length === 3) {
                monthKeyboard.push(row);
                row = row.splice(0);
            }
        }
    );
    return monthKeyboard;
}


