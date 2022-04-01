const app = require('./app');
const port = process.env.PORT || 3000
const express = require('express');
const router = express.Router();

app.listen(port, () => {
    console.log(`Server is running on ${port} port`)
});

setTimeout(
    () => router.get('https://kfvstgbot.herokuapp.com/'), 1000*60*10
);

app.use(router.get('/'), (req, res) => {
    res.status(200).json({
        message: 'well come'
    })
})
