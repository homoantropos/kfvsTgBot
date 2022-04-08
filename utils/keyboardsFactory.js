exports.provide = (option) => {
    return [
        [
            {
                text: `${option}`,
                callback_data: `${option}`
            }
        ],
        [
            {
                text: `${option}`,
                callback_data: `${option}`
            },
            {
                text: `${option}`,
                callback_data: `${option}`
            }
        ]
    ]
}
