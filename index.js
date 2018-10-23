const express = require('express');
const mongoose = require('mongoose');
const bodyParder = require('body-parser');

const app = express();

const User = require('./models/User');
const port = 3000;

app.set('view engine', 'pug');

app.use(bodyParder.urlencoded({
    extended: false
}));

mongoose
    .connect('mongodb://mongo:27017/docker-node-mongo-simple', {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    User.find()
        .then(users => res.render('index', {
            users
        }))
        .catch(err => res.status(404).json({
            msg: err
        }));
});

app.post('/user/add', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname
    });
    
    newUser.save().then(user => res.redirect('/'));
});

app.listen(port, () => console.log("Server running port : " + port ));