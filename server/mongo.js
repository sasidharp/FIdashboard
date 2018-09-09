/*************************************************************************************
 *  import required                                                                   * 
 * ************************************************************************************/
const url = 'mongodb://fidashboard:942tbRxzQHX22qZPfS8BJlvFiodMGIeYYRvDU8GwsbzH51txjCsgwU9ujmGdU7Qy79EjoaXUDjpY858kNBwMig%3D%3D@fidashboard.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
const body = '';
var itemData = '';
const express = require('express');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
var CronJob = require('cron').CronJob;
const job = new CronJob('0 */1 * * * *', function () {
  try {
    execute();
  } catch (error) {
    console.log(error);
  }
});

job.start();
function execute() {
  token = '';
  var options = {
    method: 'POST',
    url: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      client_id: '36dc8d43-ad4b-40bb-8d4d-b100b59c10ea',
      client_secret: '7phbN5mHpedAsYpd51o88eBw5OEspPB7w5xOo50LX3I=',
      resource: 'https://microsoft.onmicrosoft.com/dSAPWSAADApp',
      grant_type: 'client_credentials'
    }
  };
  // Call ADL
  console.log('Executing Request to Fetch AAD token');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    obj = JSON.parse(body);
    token = 'Bearer' + ' ' + obj.access_token;
    console.log('Fetched AAD token' + obj.access_token);
    var options = {
      method: 'POST',
      url: 'https://sapdevws.trafficmanager.net/MS1/MSFIJobTelemetry/api/Sap/JobDetails',
      headers: {
        'Content-Type': 'application/json',
        'X-CorrelationId': '724e8920-c5b8-4dcd-9585-ec211d89d6e3',
        'Ocp-Apim-Subscription-Key': '2c1196a6d5304fbfa0bb44206d641e2b',
        'Authorization': token
      },
      body: {
        PRCSAREA: 'FCMD'
      },
      json: true
    };
    console.log('Calling SAP');
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(response.statusCode);
      // update cosmos dB
      if (response.statusCode === 200) {
        console.log('Calling MongoDB');
        console.log(sapReturndata);
        /*  This code will get the entries from SAP and pushes into Mongo DB*/
        //Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {
          if (err != null) {
            console.log('Could not connect. Exiting')
          }
          console.log("Connected successfully to server");
          //Get the database name    
          const db = client.db('sapjobs');
          //Get the collections 'items' from database 'sapjobs'    
          const collection = db.collection('items');
          //Insert data
          collection.insertOne(itemData, (error, result) => {
            if (error === null ? log_message('inserted') : log_message(error));
          });
          client.close();
        });
      } else {
        console.log('HttpStatus--' + response.statusCode);
        console.log('SAP WS Failed');
      }
    });
  });
}
