var express = require('express');
var bodyParser = require('body-parser');
const config = require('./config.js');
const path = require('path');
const port = process.env.PORT || 3000;
var http = require('http').Server(app);
var app = express();
const PRODUCTION = true;
// db stuff
const mongoose = require('mongoose');
if (PRODUCTION){
    const uriString = 'https://www.mlab.com/databases';
    const dbName = 'heroku_z646rqgn';
}else{
    const uriString = 'mongodb://localhost:27017';
    const dbName = 'QuizApp';
}

let UserSchema = new mongoose.Schema({
    user_name: String,
    core_app_id: String, // Filled out when user signs in with core app's credentials.
    data: {}
});

let User = mongoose.model('user', UserSchema);

mongoose.connect(
    uriString + '/' + dbName,
    { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function authToken(req, res, next) {
    let token = req.body.token;

    if (!token) res.status(401).send({ error: 'Token Missing' });

    if (token === config.token) {
        next();
    } else {
        res.status(401).send({ error: 'Invalid Token' });
    }
}

function connect(callback) {
    mongoose.connection
        .once('open', () => {
            console.log('Connected successfully to MongoDB server!');
            callback();
        })
        .on('error', error => {
            console.log('Connection error:', error);
        });
}

app.post('/user/get_badge_message', authToken, (req, res) => {
    res.status(200);
    let user_id = req.body.user_id;

    User.findOne({ core_app_id: user_id }, (err, user) => {
        if (user) {
            res.json({
                userid: user_id,
                msg: 'User has score ' + user.data.score
            });
        } else {
            res.json({ Error: "User doesn't exist" });
        }
        res.end();
    });
});

app.get(['/', '/user'], (req, res) => {
    console.log('user');

    return res.sendFile(__dirname + '/user.html');
});

app.get('/admin', (req, res) => {
    return res.sendFile(__dirname + '/admin.html');
});

app.use(express.static(path.join(__dirname, '/Control')));
app.use(express.static(path.join(__dirname, '/Model')));
app.use(express.static(path.join(__dirname, '/View')));

app.listen(port, () => {
    console.log('Listening on *:' + port);
});
