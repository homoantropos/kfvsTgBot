const express = require('express');
const app = express();
const bot = require('./bot');

bot.on('message', (msg) => {
    const {chat: {id}} = msg;
    const {from: {first_name}} = msg;
    let resMessage;
    if (msg.text.toLowerCase().includes('start')) {
        resMessage =
            `
            Привіт, ${first_name}!
Обери з меню потрібне: 
            `;
    }
    bot.sendMessage(id, resMessage);
})

module.exports = app
