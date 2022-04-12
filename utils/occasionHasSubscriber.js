exports.occasionHasSubscriber = (occasion, id) => {
    let subscribersIds = [];
    occasion.subscribers.map (
        subscriber => subscribersIds.push(subscriber.id)
    );
    return subscribersIds.includes(id)
}
