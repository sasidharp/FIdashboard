const request = require('request');
const express = require('express')
const app = express()
var path = require('path');
// Create link to Angular build directory
/**************************************************************************************
 *  SAP key and DB connection                                                          * 
 * ************************************************************************************/
var dbConn = '';
var itemData = '';
var authToken = '';
/**************************************************************************************
 *  MSI Params                                                                        * 
 * ************************************************************************************/
const MSI_KEY_VAULTURL = 'https://vault.azure.net';
const API_VER = '2017-09-01';

xJobs = [];
var distDir = __dirname + "/dist/FIdashboard";

app.use(express.static(distDir));
const MongoClient = require('mongodb').MongoClient;
//fetch the latest data .
app.get('/fijobs', function (err, res) {

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
                /*  This code will get the entries from SAP and pushes into Mongo DB*/
                //Use connect method to connect to the server
                MongoClient.connect(dbConn, function (err, client) {
                    if (err != null) { return 'Could not connect. Exiting' };
                    //Get the database name    
                    const db = client.db('sapjobs');
                    //Get the collections 'items' from database 'sapjobs'    
                    const collection = db.collection('items');
                    //Insert data
                    collection.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, results) {
                        res.send(results);
                        client.close();
                    });
                });
            } else {
                res.send(500, 'Internal error. Problem with MongoString');
                console.log('No permission to view Secret');
                return;
            }
        });
    })
});
//fetch the latest data .
//fetch the latest data .
app.get('/fijobs', function (err, res) {

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
                /*  This code will get the entries from SAP and pushes into Mongo DB*/
                //Use connect method to connect to the server
                MongoClient.connect(dbConn, function (err, client) {
                    if (err != null) { return 'Could not connect. Exiting' };
                    //Get the database name    
                    const db = client.db('sapjobs');
                    //Get the collections 'items' from database 'sapjobs'    
                    const collection = db.collection('hritems');
                    //Insert data
                    collection.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, results) {
                        res.send(results);
                        client.close();
                    });
                });
            } else {
                res.send(500, 'Internal error. Problem with MongoString');
                console.log('No permission to view Secret');
                return;
            }
        });
    })
});

// redo
app.get('/*', function (req, res) {
    console.log(distDir);
    res.sendFile(path.join(distDir + '/index.html'))
})

var server = app.listen(process.env.PORT , function (req, res) {
    var port = server.address().port;
    console.log('App running on 3000');
});
