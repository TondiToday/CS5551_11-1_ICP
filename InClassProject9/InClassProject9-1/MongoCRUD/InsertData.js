/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://root:dbpassword1@ds137003.mlab.com:37003/ase5551icp';

var insertDocument = function(db, callback) {
    db.collection('ICP9').insertOne( {
        "ClassID" : "21",
        "StudentName" : "Tonderai Kambarami",
        "CourseOfStudy": "Advanced Software Engineering",
        "Major": "Computer Science",
        "Minor": "None"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the test collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});