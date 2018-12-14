/*
 * Created by mnpw3d on 20/10/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://root:dbpassword1@ds137003.mlab.com:37003/ase5551icp';
var findUser = function(db, callback) {
    var cursor =db.collection('ICP9').find({"major":"Computer Science"});
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc.StudentName);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('ICP9').find({"major":"Computer Science"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("Name:" + doc.StudentName);
            console.log("Major:" + doc.major);
        }
    });
}
var findUserwithUniversity = function(db, callback) {
    var cursor = db.collection('test').find({"education.university":"UMKC"});
    cursor.each(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
           console.log("First Name:" + doc.fname);
           console.log("University:" + doc.education.university);
           console.log("Degree:" + doc.education.degree);
           console.log("Major:" + doc.education.major);
           console.log("mail:" + doc.mail);
       }
    });
}
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findUserwithName(db, function() {
        db.close();
    });
});