const app = require('./app');
const port = process.env.PORT || 3000
const express = require('express');
const router = express.Router();
const https = require('https');

app.listen(port, () => {
    console.log(`Server is running on ${port} port`)
});

setInterval(
    () => {
        reque = https.get('https://kfvstgbot.herokuapp.com/');
        console.log(reque);
    }, 10000
);

app.use(router.get('/'), (req, res) => {
    res.status(200).json({
        message: 'well come'
    })
})
