module.exports = (occasion, id) => {
    let subscribersIds = [];
    occasion.subscribers.map (
        subscriber => subscribersIds.push(subscriber.tgId)
    );
    return subscribersIds.includes(id)
}
