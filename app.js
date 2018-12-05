var express = require('express');
var bodyParser = require('body-parser');
const config = require('./config.js');
const path = require('path');
const port = process.env.PORT || 3000;
var http = require('http').Server(app);
var app = express();
const PRODUCTION = true;
var request = require('request');
// db stuff
const mongoose = require('mongoose');
const uriString = PRODUCTION
    ? 'mongodb://webintro:Webintro12345678@ds129796.mlab.com:29796'
    : 'mongodb://localhost:27017';
const dbName = PRODUCTION ? 'heroku_z646rqgn' : 'QuizApp';
const __TOKEN = 'nOqpLX3j6efeXeNobOkcFsRQBSNV3DLzbothSetMRZ4';
const __AUTH_TOKEN = 'DF48284D34E4371DB6B3B0EB25B22446';

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
                badge_text: 'User has score ' + user.data.score
            });
        } else {
            res.json({ Error: "User doesn't exist" });
        }
        res.end();
    });
});

app.get('/', (req, res) => {
    console.log('main');

    return res.sendFile(__dirname + '/login.html');
});

app.get('/user', (req, res) => {
    console.log('user');

    return res.sendFile(__dirname + '/user.html');
});

app.get('/admin', (req, res) => {
    return res.sendFile(__dirname + '/admin.html');
});

app.post('/blogin', function(req, res) {
    var db = req.db;
    var myJSONObject = { user_email: req.body.email, password: req.body.password, token: __TOKEN };

    request(
        {
            url: 'https://management-system-api.herokuapp.com/user/login',
            method: 'POST',
            json: true,
            body: myJSONObject
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);

                isUser = false;
              
                console.log(body);

                User.findOne({
                    user_name: myJSONObject.user_email,
                    core_app_id: body.user_id
                }, (err, u) => {
                    if (err) res.status(400).json({});

                    if (u == null) {
                        User.create(
                            {
                                user_name: myJSONObject.user_email,
                                core_app_id: body.user_id,
                                data: {
                                    score: Math.floor(Math.random() * 100)
                                }
                            },
                            err => {
                                if (err) res.status(400).json({});

                                res.status(200).json({});
                            }
                        );
                    }
                });
            } else {
                res.status(400).json({});
            }
        }
    );
});

app.use(express.static(path.join(__dirname, '/Control')));
app.use(express.static(path.join(__dirname, '/Model')));
app.use(express.static(path.join(__dirname, '/View')));

app.listen(port, () => {
    console.log('Listening on *:' + port);
});
