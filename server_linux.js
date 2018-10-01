const express = require('express')
const app = express()
const url = 'mongodb://fidashboard:942tbRxzQHX22qZPfS8BJlvFiodMGIeYYRvDU8GwsbzH51txjCsgwU9ujmGdU7Qy79EjoaXUDjpY858kNBwMig%3D%3D@fidashboard.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
var path = require('path');
// Create link to Angular build directory
xJobs = [];
var distDir = __dirname + "/dist/FIdashboard";

app.use(express.static(distDir));
const MongoClient = require('mongodb').MongoClient;
//fetch the latest data .
app.get('/fijobs',function(err,res){
    /*  This code will get the entries from SAP and pushes into Mongo DB*/
    //Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {  
        if (err != null ) { return 'Could not connect. Exiting'};
    //Get the database name    
        const db = client.db('sapjobs');
    //Get the collections 'items' from database 'sapjobs'    
        const collection = db.collection('items');
    //Insert data
         collection.find({}).sort({_id:-1}).limit(1).toArray(function(err, results) {
          res.send(results);
          client.close( );
          });
      
    });
  })
  app.get('/hrjobs',function(err,res){
      /*  This code will get the entries from SAP and pushes into Mongo DB*/
      //Use connect method to connect to the server
      MongoClient.connect(url, function(err, client) {  
          if (err != null ) { return 'Could not connect. Exiting'};
      //Get the database name    
          const db = client.db('sapjobs');
      //Get the collections 'items' from database 'sapjobs'    
          const collection = db.collection('hritems');
      //Insert data
           collection.find({}).sort({_id:-1}).limit(1).toArray(function(err, results) {
            res.send(results);
            client.close( );
            });
        
      });
    })
// redo
app.get('/*',function( req ,res ){
    console.log(distDir);
    res.sendFile(path.join( distDir + '/index.html'))
})

var server = app.listen( process.env.PORT | 3000 , function (req,res) {
    var port = server.address().port;
    console.log('App running on 3000');
});
