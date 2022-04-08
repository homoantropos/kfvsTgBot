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
