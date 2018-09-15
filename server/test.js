const request = require('request');
token = '';
resource = 'https://vault.azure.net';
apiver = '2017-09-01';
var options = {
  method: 'GET',
  url: `${process.env["MSI_ENDPOINT"]}/?resource=${resource}&api-version=${apiver}`,
  headers: {
    'Secret': process.env["MSI_SECRET"]
  }
};
// Call ADL
console.log('Executing Request to Fetch AAD token');
request(options, function (error, response, body) {
  console.log('calling key valut');
  body = JSON.parse(body);
  token = 'Bearer ' + body.access_token;
  console.log(token);
  var options = {
    method: 'GET',
    url: `https://fcmd.vault.azure.net/secrets/sendgridkey/c43bc362ef6043d8a0aafe8361d497e8?api-version=2016-10-01`,
    headers: {
      'Authorization': token
    }
  };
  request(options, function (error, response, body) {
    console.log(JSON.parse(body));
  });
});
