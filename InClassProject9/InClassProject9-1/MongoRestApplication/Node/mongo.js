/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:dbpassword1@ds137003.mlab.com:37003/ase5551icp';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
app.get('/read', function(req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
            console.log("error connecting")
        }
        readDocument(db, req.body, function () {
            res.write("Successfully read");
            res.end();
        });
    });
})
var insertDocument = function(db, data, callback) {
    db.collection('ICP9').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the ICP9 collection.");
        callback();
    });
};
var readDocument = function(db, data, callback) {
    var cursor = db.collection('ICP9').find({"major":data});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("Name:" + doc.StudentName);
            console.log("Major:" + doc.major);
        }
    });
}
var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})