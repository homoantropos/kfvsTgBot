const {Telegraf} = require('telegraf');
const keys = require('./config/keys');
const Subscriber = require('./models/Subscriber');
const onMessage = require('./controllers/onMessage');
const onCallback = require('./controllers/onCallbackQuery');

class Bot {

    bot

    constructor() {
        this.bot = new Telegraf(keys.token);
    }

    onMessage() {
        this.bot.on('message', ctx => onMessage(ctx));
    }

    onCallback(ctx) {
        this.bot.on('callback_query', ctx => onCallback(ctx));
    }

    async sendMessageToAllSubscribers(text) {
        const subscribers = await Subscriber.scope('subs').findAll();
        subscribers.map(
            subscriber => {
                this.bot.telegram.sendMessage(subscriber.tgId, text);
            }
        )
    }

    sendMessageToSubscriber(text, tgId) {
        const promise = this.bot.telegram.sendMessage(tgId, text);
        const res = Promise.resolve();
        console.log(res);
    }

    listen() {
        this.bot.launch();
        this.onMessage();
        this.onCallback();
    }
}

module.exports = new Bot();
