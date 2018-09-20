// This script has logic to check for SAP status using API and sending out the same in HTML fomat
// Author Sasidhar Puranam.
const mjml2html = require("mjml");
const Mustache = require('mustache');
const express = require('express');
const request = require('request');
const sgMail = require('@sendgrid/mail');
const msi = require('./MSI');
const sapServiceURL = 'http://localhost:3000/jobs';
const secret = '';

var lv_running = 0;
var lv_aborted = 0;
var lv_finished = 0;
var lv_aborted = 0;
var lv_putactive = 0;
var lv_released = 0;
var lv_ready = 0;
var lv_scheduled = 0;
var lv_s1_r = 0;
var lv_s1_c = 0;
var lv_s2_r = 0;
var lv_s2_c = 0;
var lv_s3_r = 0;
var lv_s3_c = 0;
var lv_s4_r = 0;
var lv_s4_c = 0;
var lv_s5_r = 0;
var lv_s5_c = 0;
var lv_s6_r = 0;
var lv_s6_c = 0;
var lv_s7_r = 0;
var lv_s7_c = 0;

const S1 = 'AP Processing ';
const S2 = 'Asset Accounting';
const S3 = 'Consolidation';
const S4 = 'Treaury';
const S5 = 'Finance Extract';
const S6 = 'Period Close';
const S7 = 'Project Accounting';
const S8 = 'Overall Status';
const A = 'Aborted';
const Y = 'Ready';
const P = 'Scheduled';
const S = 'Released';
const R = 'Running';
const F = 'Finished';
const Z = 'Putactive';
const X = 'Unknown State';

//Get the secrets from MSI.
try {
    var secrets = msi.getSecrets();
} catch (error) {
    console.log('Error retrieving secrets from KV . Exiting');
    return;    
}
//wait for 5 seconds for process to finsh. 
setTimeout(5000, function () {
  //check if secrets are available , else exit.
  if (secrets.length === 0) {
    return;
  } else {
    //call the Mongo and start processing.
    var options = {
      method: 'GET',
      url: sapServiceURL,
      headers: {
        'content-type': 'application/json'
      }
    };
    // call API
    request(options, function (error, response, body) {
      // Process response and build eamail content.
      var result = JSON.parse(body);
      job_summary = result[0].job_summary;
      jobs = result[0].jobs;
      job_summary.forEach(element => {
        lv_running = parseInt(element.running) + lv_running;
        lv_ready = parseInt(element.ready) + lv_ready;
        lv_scheduled = parseInt(element.scheduled) + lv_scheduled;
        lv_finished = parseInt(element.finished) + lv_finished;
        lv_aborted = parseInt(element.aborted) + lv_aborted;
        lv_putactive = parseInt(element.putactive) + lv_putactive;
        lv_released = parseInt(element.released) + lv_released;
      });
      console.log(result);
    });
  }
});
