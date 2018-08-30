const express = require('express')
const app = express()

// Create link to Angular build directory

var distDir = __dirname + "/dist/FIdashboard";
console.log(distDir);
app.use(express.static(distDir));

var server = app.listen( process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });