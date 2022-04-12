module.exports = (occasion, option, value) => {
    let subscribersIds = [];
    occasion.subscribers.map (
        subscriber => subscribersIds.push(subscriber[option])
    );
    return subscribersIds.includes(value);
}
