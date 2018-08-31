const express = require('express')
const app = express()

// Create link to Angular build directory

var distDir = __dirname + "/dist/FIdashboard";
console.log(distDir);
app.use(express.static(distDir));

var server = app.listen( process.env.PORT , function (req,res) {
    var port = server.address().port;
    // app.get('/', function(req, res){
    //   res.send({'hello':'world'});
    // })
    // console.log("App now running on port", port);
  });
