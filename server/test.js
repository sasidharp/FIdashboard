const rp = require('request');
token = '';
resource = 'https://fcmd.vault.azure.net/secrets/mongo/4ab3b721223c4e12b9ce6bedb01a061c';
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
    console.log(error);
    console.log(response);
    console.body(body)
    
});
