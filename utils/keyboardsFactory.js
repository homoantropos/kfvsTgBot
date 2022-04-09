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
    const currentMonths = months.filter(month => month >= today.getMonth());
    let row = [];
    currentMonths.map(
        month => {
            row.push(
                {
                    text: `${month}`,
                    callback_data: `${month}`
                }
            );
            if(row.length === 3) {
                monthKeyboard.push(row);
                row = row.splice(0);
            }
        }
    )
    return monthKeyboard;
}


