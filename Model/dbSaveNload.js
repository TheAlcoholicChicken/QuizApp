var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/quizDB";
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var port = 8080;

var DB_NAME = 'quizDB';
var COL_NAME = 'questions';

MongoClient.connect(dburl, (err, db)=>{
    if (err) throw err;
    console.log("created db at quizDB");
    let dbo = db.db(DB_NAME);
    dbo.createCollection(COL_NAME, (err, res)=> {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

app.listen(port, ()=>{console.log("on Port " + port)})

app.post('/save', (req, res)=>{
    save(req.body);
})

app.post('/load', (req, res)=>{
    all_record = load();
    res.send()
})

app.post('/delete', (req, res)=>{
    console.log(req.body)
    deleteOne(req.body['id']);
})

function save(question){
    MongoClient.connect(dburl, (err, db)=>{
        if(err) throw err;
        var dbo = db.db(DB_NAME);
        dbo.collection(COL_NAME).insertOne(question, (err, res)=>{
            if (err) throw err;
            // console.log(res);
            db.close();
        });
    });
};

function load(){
    MongoClient.connect(dburl, (err, db)=>{
        if(err) throw err;
        var dbo = db.db(DB_NAME);
        dbo.collection(COL_NAME).find({}).toArray((err, result)=>{
            if (err) throw err;
            db.close();
            return result;
        });
    });
};

function deleteOne(question){
    console.log("deleting "+question)
    MongoClient.connect(dburl, (err, db)=>{
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(COL_NAME).deleteMany({id: 0}, ()=>{});
        db.close();
    });
};

