var request = require("request");
token = '';
var options = { method: 'POST',
  url: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/token',
  headers: 
   { 'content-type': 'application/x-www-form-urlencoded' },
 form: 
   { client_id: '06229ce7-4019-4eff-8b9e-d3872a739b2b',
     client_secret: 'RbJkMH8CzEAgtWG/tCxapvDkSamaDLgyzxhvwCWWZ2E=',
     resource: 'https://microsoft.onmicrosoft.com/dSAPWSAADApp',
     grant_type: 'client_credentials' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
  token = 'Bearer'+ ' ' + obj.access_token;
});


var options = { method: 'POST',
  url: 'https://sapdevws.trafficmanager.net/MS1/MSFIJobTelemetry/api/Sap/JobDetails',
  headers: 
   { 
     'Content-Type': 'application/json',
     'X-CorrelationId': '724e8920-c5b8-4dcd-9585-ec211d89d6e3',
     'Ocp-Apim-Subscription-Key': '2c1196a6d5304fbfa0bb44206d641e2b',
      'Authorization': token },
  body: { PRCSAREA: 'sample string 1' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
