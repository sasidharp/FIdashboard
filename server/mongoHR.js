/**************************************************************************************
 *  import required                                                                   * 
 * ************************************************************************************/
const express = require('express');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
/**************************************************************************************
 *  MSI Params                                                                        * 
 * ************************************************************************************/
const MSI_KEY_VAULTURL = 'https://vault.azure.net';
const API_VER = '2017-09-01';
/**************************************************************************************
 *  SAP key and DB connection                                                          * 
 * ************************************************************************************/
var sapClientsecret = '';
var dbConn = '';
var itemData = '';
var authToken = '';
/**************************************************************************************
 *  Get SAP key using MSI                                                              * 
 * ************************************************************************************/
var options = {
  method: 'GET', url: `${process.env["MSI_ENDPOINT"]}/?resource=${MSI_KEY_VAULTURL}&api-version=${API_VER}`,
  headers: { 'Secret': process.env["MSI_SECRET"] }
};
request(options, function (error, response, body) {
  authToken = ('Bearer ' + JSON.parse(body).access_token);
  var options = {
    method: 'GET', url: `https://fcmd.vault.azure.net/secrets/mongo/4ab3b721223c4e12b9ce6bedb01a061c?api-version=2016-10-01`,
    headers: { 'Authorization': authToken }
  };
  request(options, function (error, response, body) {
    if (response.statusCode === 200) {
      dbConn = JSON.parse(body).value;
      console.log('Retrieved DBconn');
    } else {
      console.log('No permission to view Secret');
      return;
    }
    var options = {
      method: 'GET', url: `https://fcmd.vault.azure.net/secrets/sapkey/fe94d96a4e664176bf04474548eab006?api-version=2016-10-01`,
      headers: { 'Authorization': authToken }
    };
    request(options, function (error, response, body) {
      if (response.statusCode === 200) {
        sapClientsecret = JSON.parse(body).value;
        console.log('Retrieved SAP Key');

        options = {
          method: 'POST', url: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/token',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          // form: {
          //   client_id: '36dc8d43-ad4b-40bb-8d4d-b100b59c10ea', client_secret: sapClientsecret,
          //   resource: 'https://microsoft.onmicrosoft.com/dSAPWSAADApp', grant_type: 'client_credentials'
          // }
          form: {
            client_id: '36dc8d43-ad4b-40bb-8d4d-b100b59c10ea', client_secret: sapClientsecret,
            resource: 'https://tSAPWSAADApp', grant_type: 'client_credentials'
          }
        };
        request(options, function (error, response, body) {
          if (response.statusCode === 200) {
            authToken = ('Bearer ' + JSON.parse(body).access_token);
            console.log('Fetched AAD token - For SAP');
            var options = {
              method: 'POST', url: 'https://saptstws.trafficmanager.net/MSG/MSFIJobTelemetry/api/Sap/JobDetails',
              headers: {
                'Content-Type': 'application/json', 'X-CorrelationId': '724e8920-c5b8-4dcd-9585-ec211d89d6e3',
                'Ocp-Apim-Subscription-Key': 'c55ddee3fc0643eab5534af29776892c', 'Authorization': authToken
              },
              body: { PRCSAREA: 'HRD' },
              json: true
            };
            console.log('calling SAP');
            request(options, function (error, response, body) {
              if (response.statusCode === 200) {
                MongoClient.connect(dbConn, function (err, client) {
                  if (err != null) {
                    console.log('Could not connect. Exiting')
                  }
                  console.log("Connected successfully to server");
                  //Get the database name    
                  const db = client.db('sapjobs');
                  //Get the collections 'items' from database 'sapjobs'    
                  const collection = db.collection('hritems');
                  //Insert data
                  itemData = body.JOBDETAILS_JSON;
                  itemData = JSON.parse(itemData);
                  collection.insertOne(itemData, (error, result) => {
                    if (error === null ? console.log('Record inserted') : 'Failed');
                  });
                  client.close();
                });
              } else { console.log(body) }

            });
          }
        });
      }
    });
  });
});
