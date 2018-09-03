/*************************************************************************************
*  import required                                                                   * 
* ************************************************************************************/
const url = 'mongodb://fidashboard:942tbRxzQHX22qZPfS8BJlvFiodMGIeYYRvDU8GwsbzH51txjCsgwU9ujmGdU7Qy79EjoaXUDjpY858kNBwMig%3D%3D@fidashboard.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
const body='';
var itemData ='';
const express = require('express');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
var CronJob = require('cron').CronJob;
// const job = new CronJob('0 */1 * * * *', function() {

//     mongo.execute();
//  });
//  job.start();
execute();

 //DB connection string
function execute(){
/*************************************************************************************
*  Get the data from the sap josb                                                    * 
* ************************************************************************************/
request(' http://demo1320059.mockable.io/sapjobs', { json : true , }, (err, res, body) => {
   if (err) { return log_message(err) }
   itemData =  body;
   Httpstatus = res.statusCode;
});

//wait for 10 seconds .
setTimeout(() => { updateCosmos();}, 10000);
//update data in cosmos.
function updateCosmos(){
 if (Httpstatus != '200' ){ return log_message('WS Failed');}   
/*  This code will get the entries from SAP and pushes into Mongo DB*/
//Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {  
    if (err != null ){ console.log('Could not connect. Exiting')}
    console.log("Connected successfully to server");  
//Get the database name    
    const db = client.db('sapjobs');
//Get the collections 'items' from database 'sapjobs'    
    const collection = db.collection('items');
//Insert data
    collection.insertOne(itemData,(error , result)=>{ 
        if (error === null ? log_message('inserted'):log_message(error));
     });
  client.close( );
});
}
//function to log message
function log_message(message) {
    var d = new Date();
    console.log( d.toDateString() + '->'+ message);
    
}
}
