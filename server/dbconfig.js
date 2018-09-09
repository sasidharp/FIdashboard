var request = require("request");
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

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
  token = 'Bearer' + ' ' + obj.access_token;

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

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
});