const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');

const sequelize = require('./database/sequelize');

const bot = require('./bot');

const userRoutes = require('./routes/user_routes');
const subscriberRoutes = require('./routes/subscriber_routes');
const occasionRoutes = require('./routes/occasion_routes');

bot.listen();

upload = multer({dest: 'uploads/'});


app.use(require('cors')());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/occasions', occasionRoutes);

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err) => console.log(err)
);

module.exports = app
