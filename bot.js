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

    async sendMessageToAllSubscribers(req, res) {
        try {
            let subscribers = await Subscriber.scope('subs').findAll();
            req.body.tgIds.map(
                tgId => {
                    subscribers = subscribers.filter(
                        subscriber => subscriber.tgId === tgId
                    );
                    console.log(subscribers);
                }
            );
            subscribers.map(
                subscriber => {
                    const bot = new Telegraf(keys.token);
                    bot.launch();
                    bot.telegram.sendMessage(subscriber.tgId, req.body.text);
                    bot.stop();
                }
            );
            res.status(200).json({
                message: 'Повідомлення успішно відправлено'
            })
        } catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    listen() {
        this.bot.launch();
        this.onMessage();
        this.onCallback();
    }
}

module.exports = new Bot();
