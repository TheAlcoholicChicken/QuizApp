var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/quizDB";
var http = require('http');
var url = require('url');

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

http.createServer((req, res)=>{
    var urlPart = url.parse(req.url);
    if (urlPart.pathname.startsWith('/load')) {
        console.log("Loading Function");
        load()
    } else if (urlPart.pathname.startsWith('/save')) {
        console.log("Saving Function");
        save({'te':'iojfwj'});
    } else if (urlPart.pathname.startsWith('/delete')) {
        console.log("Deleting Function");
        deleteOne({'test':'test'})
    }
}).listen(8080, ()=>{
    console.log("on port 8080");
});

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
            // console.log(result);
            db.close();
        });
    });
};

function deleteOne(question){
    MongoClient.connect(dburl, (err, db)=>{
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").deleteOne(question, (err, obj)=>{
          if (err) throw err;
        //   console.log(obj);
          db.close();
        });
    });
};

