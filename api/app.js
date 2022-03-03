'use strict';

const express = require('express');
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongodb:27017/";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "message": "Hello World" });
});

app.get('/messages', async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("messages").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ "messages": result })
            db.close();
        });
    });
});

app.post('/messages', async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { message: req.body.message, date: req.body.date };
        dbo.collection("messages").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    res.json({ "message": "success" });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);