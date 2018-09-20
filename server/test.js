const request = require('request');
const msi = require('./MSI');

//Get the DB string.
try {
  const dbConnectionString = msi.getDBstring();
} catch (error) {
console.log("Error");
}
