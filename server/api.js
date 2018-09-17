// This script has logic to check for SAP status using API and sending out the same in HTML fomat
// Author Sasidhar Puranam.
const mjml2html = require("mjml");
const Mustache = require('mustache');
const express = require('express');
const request = require('request');
const sgMail = require('@sendgrid/mail');
const secret = '';
//*****************************GET secret from MSI ******************************************************************** */
token = '';
resource = 'https://vault.azure.net';
apiver = '2017-09-01';
var options = {
  method: 'GET',
  url: `${process.env["MSI_ENDPOINT"]}/?resource=${resource}&api-version=${apiver}`,
  headers: {  'Secret': process.env["MSI_SECRET"]  }
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
    var responseBody = JSON.parse(body);
    sectret = responseBody.value;


    //***************************************************************************************************************** */
    //***************************************************************************************************************** */
    //URL to get the latest job status from Mongo.
    const sapServiceURL = 'http://localhost:3000/jobs';
    // Get the latest status from Mongo.
    var options = {
      method: 'GET',
      url: sapServiceURL,
      headers: {
        'content-type': 'application/json'
      }
    };
    request(options, function (error, response, body) {
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

      var result = JSON.parse(body);
      job_summary = result[0].job_summary;
      jobs = result[0].jobs;
      jobs = jobs.concat(jobs);
      jobs = jobs.concat(jobs);

      // Parse the Mongo and update the variable.
      var view = {

        title: "SAP Financial Close & Reporting",
        statuscolor: "",
        status: "",
        S1: S1,
        S2: S2,
        S3: S3,
        S4: S4,
        S5: S5,
        S6: S6,
        S7: S7,
        S1_R: lv_s1_r,
        S1_C: lv_s1_c,
        S2_R: lv_s2_r,
        S2_C: lv_s2_c,
        S3_R: lv_s3_r,
        S3_C: lv_s3_c,
        S4_R: lv_s4_r,
        S4_C: lv_s4_c,
        S5_R: lv_s5_r,
        S5_C: lv_s5_c,
        S6_R: lv_s6_r,
        S6_C: lv_s6_c,
        S7_R: lv_s7_r,
        S7_C: lv_s7_c,
        running: lv_running,
        ready: lv_ready,
        scheduled: lv_scheduled,
        released: lv_released,
        finished: lv_finished,
        aborted: lv_aborted,
        putactive: lv_putactive,
        v1: "0",
        jb1: jobs[0].jobname,
        js1: job_status(jobs[0].status),
        v2: "1",
        jb2: jobs[1].jobname,
        js2: job_status(jobs[1].status),
        v3: "2",
        jb3: jobs[2].jobname,
        js3: job_status(jobs[2].status),
        v4: "3",
        jb4: jobs[3].jobname,
        js4: job_status(jobs[3].status),
        v5: "4",
        jb5: jobs[4].jobname,
        js5: job_status(jobs[4].status),
        v6: "5",
        jb6: jobs[5].jobname,
        js6: job_status(jobs[5].status),
        v7: "6",
        jb7: jobs[6].jobname,
        js7: job_status(jobs[6].status),
        v8: "7",
        jb8: jobs[7].jobname,
        js8: job_status(jobs[7].status),
        v9: "8",
        jb9: jobs[8].jobname,
        js9: job_status(jobs[8].status),
        v10: "9",
        jb10: jobs[9].jobname,
        js10: job_status(jobs[9].status),
        v11: "10",
        jb11: jobs[10].jobname,
        js11: job_status(jobs[10].status),
        v12: "11",
        jb12: jobs[1].jobname,
        js12: job_status(jobs[11].status),
        v13: "12",
        jb13: jobs[12].jobname,
        js13: job_status(jobs[12].status),
        v14: "13",
        jb14: jobs[13].jobname,
        js14: job_status(jobs[13].status),
        v15: "14",
        jb15: jobs[14].jobname,
        js15: job_status(jobs[14].status),
        v16: "15",
        jb16: jobs[15].jobname,
        js16: job_status(jobs[15].status),
        v17: "16",
        jb17: jobs[16].jobname,
        js17: job_status(jobs[16].status),
        v18: "17",
        jb18: jobs[17].jobname,
        js18: job_status(jobs[17].status),
        v19: "18",
        jb19: jobs[18].jobname,
        js19: job_status(jobs[18].status),
        v20: "19",
        jb20: jobs[19].jobname,
        js20: job_status(jobs[19].status),
      };
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      job_summary.forEach(element => {
        lv_running = parseInt(element.running) + lv_running;
        lv_ready = parseInt(element.ready) + lv_ready;
        lv_scheduled = parseInt(element.scheduled) + lv_scheduled;
        lv_finished = parseInt(element.finished) + lv_finished;
        lv_aborted = parseInt(element.aborted) + lv_aborted;
        lv_putactive = parseInt(element.putactive) + lv_putactive;
        lv_released = parseInt(element.released) + lv_released;
      });
      view.running = lv_running;
      view.ready = lv_ready;
      view.scheduled = lv_scheduled;
      view.finished = lv_finished;
      view.aborted = lv_aborted;
      view.putactive = lv_putactive;
      view.released = lv_released;
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      job_summary.forEach(element => {
        lv_xx_pending = 0;
        lv_xx_finished = 0;
        lv_xx_pending = sum(parseInt(element.running),
          parseInt(element.ready),
          parseInt(element.scheduled),
          parseInt(element.aborted),
          parseInt(element.putactive),
          parseInt(element.released));
        lv_xx_finished = parseInt(element.finished);
        switch (element.subprocess) {
          case 'S1':
            assign_variable('S1');
            view.S1 = S1;
            view.S1_C = lv_s1_c;
            view.S1_R = lv_s1_r;
            break;
          case 'S2':
            assign_variable('S2');
            view.S2 = S2;
            view.S2_C = lv_s2_c;
            view.S2_R = lv_s2_r;
            break;
          case 'S3':
            assign_variable('S3');
            view.S3 = S3;
            view.S3_C = lv_s3_c;
            view.S3_R = lv_s3_r;
            break;
          case 'S4':
            assign_variable('S4');
            view.S4 = S4;
            view.S4_C = lv_s4_c;
            view.S4_R = lv_s4_r;
            break;
          case 'S5':
            assign_variable('S5');
            view.S5 = S5;
            view.S5_C = lv_s5_c;
            view.S5_R = lv_s5_r;
            break;
          case 'S6':
            assign_variable('S6');

            view.S6 = S6;
            view.S6_C = lv_s6_c;
            view.S6_R = lv_s6_r;
            break;
          case 'S7':
            assign_variable('S7');

            view.S7 = S7;
            view.S7_C = lv_s7_c;
            view.S7_R = lv_s7_r;
            break;
          case 'S8':
          default:
            break;
        }
      });
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function sum(running, ready, scheduled, aborted, putactive, released) {
        return running + ready + scheduled + aborted + putactive + released;
      }
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function status_color() {
        if (lv_aborted != 0) {
          view.statuscolor = "red";
        } else {
          view.statuscolor = "limegreen";
        }
      }
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function assign_variable(x) {
        switch (x) {
          case 'S1':
            lv_s1_c = lv_xx_finished;
            lv_s1_r = lv_xx_pending;
            break;
          case 'S2':
            lv_s2_c = lv_xx_finished;
            lv_s2_r = lv_xx_pending;
            break;
          case 'S3':
            lv_s3_c = lv_xx_finished;
            lv_s3_r = lv_xx_pending;
            break;
          case 'S4':
            lv_s4_c = lv_xx_finished;
            lv_s4_r = lv_xx_pending;
            break;
          case 'S5':
            lv_s5_c = lv_xx_finished;
            lv_s5_r = lv_xx_pending;
            break;
          case 'S6':
            lv_s6_c = lv_xx_finished;
            lv_s6_r = lv_xx_pending;
            break;
          case 'S7':
            lv_s7_c = lv_xx_finished;
            lv_s7_r = lv_xx_pending;
            break;
          default:
            break;
        }
      }
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function job_status(x) {
        // const A = 'Aborted',
        // const Y = 'Ready',
        // const P = 'Scheduled',
        // const S = 'Released',
        // const R = 'Running',
        // const F = 'Finished',
        // const Z = 'Putactive',
        // const X = 'Unknown State'
        switch (x) {
          case 'R':
            return R;
          case 'Y':
            return Y;
          case 'P':
            return P;
          case 'S':
            return S;
          case 'A':
            return A;
          case 'F':
            return F;
          case 'Z':
            return Z;
          case 'X':
            return X;
          default:
            break;
        }
      }
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function status() {
        if (lv_aborted != 0) {
          view.status = "Atleast one job Failed. Need urgent attention !"
        } else {
          view.status = "No failed jobs. Overall status is good !";
        }
        if ((lv_running + lv_ready + lv_scheduled + lv_aborted + lv_putactive + lv_released) === 0) {
          view.status = "All Jobs completed (̿▀̿‿ ̿▀̿ ̿) !!";
        }
      }
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      function format(text1, finished, completed) {
        var textString = text1 + "[" + finished + "  Finished/Out of  " + (completed + finished) + "]";
        return textString;
      }
      status();
      status_color();
      //  Compile an mjml string
      const htmlOutput = mjml2html(`<mjml>

  <mj-head>
    <mj-attributes>
    <mj-section border="solid" ></mj-section>
   </mj-attributes>
  </mj-head>


  <mj-body background-color="white" width="1200px" border="solid">
    <mj-section>
      <mj-column>
        <mj-text color = "{{ statuscolor }} ">
          <h3>{{ status }}</h3>
          <h3> {{ date }}</h3>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column >
        <mj-table >
          <tr>
            <td style="padding: 0 15px 0 0;">Running</h3>
            </td>
            <td style="padding: 0 15px;">{{ running }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Ready</td>
            <td style="padding: 0 15px;">{{ ready }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Scheduled</td>
            <td style="padding: 0 15px;">{{ scheduled }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Released</td>
            <td style="padding: 0 15px;">{{ released }}</td>
          </tr>
        </mj-table>
      </mj-column>
      <mj-column>
        <mj-table>
          <tr>
            <td style="padding: 0 15px 0 0;">Finished</td>
            <td style="padding: 0 15px;">{{ finished }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Aborted</td>
            <td style="padding: 0 15px;">{{ aborted }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Putactive</td>
            <td style="padding: 0 15px;">{{ putactive }}</td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>

    <mj-section background-color="">
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white" href="https://fcmd.azurewebsites.net">
          LIVE DASHBOARD
        </mj-button>
      </mj-column>

    </mj-section>
    <mj-section background-color="white">
      <mj-column>
        <mj-text align="left">
          <h4>STATUS BY VERTICALS</h4>
        </mj-text>
        <mj-table>
          <tr>
            <td style="padding: 0 15px;">Name</td>
            <td style="padding: 0 15px;">Pendng</td>
            <td style="padding: 0 15px;">Finished</td>
          </tr>
         <tr>
            <td style="padding: 0 15px;">{{ S1 }}</td>
            <td style="padding: 0 15px;">{{ S1_R }}</td>
            <td style="padding: 0 15px;">{{ S1_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S2 }}</td>
            <td style="padding: 0 15px;">{{ S2_R }}</td>
            <td style="padding: 0 15px;">{{ S2_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S3 }}</td>
            <td style="padding: 0 15px;">{{ S3_R }}</td>
            <td style="padding: 0 15px;">{{ S3_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S4 }}</td>
            <td style="padding: 0 15px;">{{ S4_R }}</td>
            <td style="padding: 0 15px;">{{ S4_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S5 }}</td>
            <td style="padding: 0 15px;">{{ S5_R }}</td>
            <td style="padding: 0 15px;">{{ S5_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S6 }}</td>
            <td style="padding: 0 15px;">{{ S6_R }}</td>
            <td style="padding: 0 15px;">{{ S6_C }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px;">{{ S7 }}</td>
            <td style="padding: 0 15px;">{{ S7_R }}</td>
            <td style="padding: 0 15px;">{{ S7_C }}</td>
          </tr>
        </mj-table>
      </mj-column>
      <mj-column>
        <mj-text align="right">
          <h4>SERVICE OWNERS</h4>
          <h5>Jeremy Harlan (Redmond)</h4>
            <h5>Gopi Achanta (India)</h4>
              <h4>Service Manager</h4>
              <h5>Tom Fanelli</h4>
                <h4>Service Operations</h4>
                <h5>Tom Fanelli (Redmond)</h4>
                  <h5>Saiprasad Cherukuri (India)</h4>
                    <h4>Infosys Service Ops</h4>
                    <h5>Vamsi Venkata Krishna Kante (Redmond)</h4>
                      <h5>Sayan Saha (India )</h4>
                        <mj-text>
                        </mj-text>mj-column>

    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text align="left">
          <h4>STATUS OF 20 CRITICAL JOBS LISTED BELOW</h4>
        </mj-text>
        <mj-table >
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v1}}</td>
            <td style="padding: 0 15px;">{{jb1}}</td>
            <td style="padding: 0 15px;">{{js1}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v2}}</td>
            <td style="padding: 0 15px;">{{jb2}}</td>
            <td style="padding: 0 15px;">{{js2}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v3}}</td>
            <td style="padding: 0 15px;">{{jb3}}</td>
            <td style="padding: 0 15px;">{{js3}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v4}}</td>
            <td style="padding: 0 15px;">{{jb4}}</td>
            <td style="padding: 0 15px;">{{js4}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v5}}</td>
            <td style="padding: 0 15px;">{{jb5}}</td>
            <td style="padding: 0 15px;">{{js5}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v6}}</td>
            <td style="padding: 0 15px;">{{jb6}}</td>
            <td style="padding: 0 15px;">{{js6}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v7}}</td>
            <td style="padding: 0 15px;">{{jb7}}</td>
            <td style="padding: 0 15px;">{{js7}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v8}}</td>
            <td style="padding: 0 15px;">{{jb8}}</td>
            <td style="padding: 0 15px;">{{js8}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v9}}</td>
            <td style="padding: 0 15px;">{{jb9}}</td>
            <td style="padding: 0 15px;">{{js9}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v10}}</td>
            <td style="padding: 0 15px;">{{jb10}}</td>
            <td style="padding: 0 15px;">{{js10}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v11}}</td>
            <td style="padding: 0 15px;">{{jb11}}</td>
            <td style="padding: 0 15px;">{{js11}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v12}}</td>
            <td style="padding: 0 15px;">{{jb12}}</td>
            <td style="padding: 0 15px;">{{js12}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v13}}</td>
            <td style="padding: 0 15px;">{{jb13}}</td>
            <td style="padding: 0 15px;">{{js13}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v14}}</td>
            <td style="padding: 0 15px;">{{jb14}}</td>
            <td style="padding: 0 15px;">{{js14}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v15}}</td>
            <td style="padding: 0 15px;">{{jb15}}</td>
            <td style="padding: 0 15px;">{{js15}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v16}}</td>
            <td style="padding: 0 15px;">{{jb16}}</td>
            <td style="padding: 0 15px;">{{js16}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v17}}</td>
            <td style="padding: 0 15px;">{{jb17}}</td>
            <td style="padding: 0 15px;">{{js17}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v18}}</td>
            <td style="padding: 0 15px;">{{jb18}}</td>
            <td style="padding: 0 15px;">{{js18}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{v19}}</td>
            <td style="padding: 0 15px;">{{jb19}}</td>
            <td style="padding: 0 15px;">{{js19}}</td>
          </tr>
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{v20}}</td>
            <td style="padding: 0 15px;">{jb20}}</td>
            <td style="padding: 0 15px;">{js20}}</td>
          </tr>

        </mj-table>

      </mj-column>

    </mj-section>
    <mj-section>

      <mj-column>
        <mj-text>
          To engage support operations please create a ticket through service now LINK .If support cannot resolve a urgent issue in timely manner follow the escalation path below:
          <h4>Third level</h4>
          SAP SAPFISO@microsoft.com
          <h4>Third level</h4>
          Vamsi Venkata Krishna(Redmond)(8AM - 8PM PST) Sayan Saha (India)(8PM - 8AM PST)
          <h4>Third level</h4>
          Email Escl8now or Call +1 425-70
        </mj-text>
      </mj-column>


    </mj-section>

  </mj-body>


</mjml>
`, {})
      //***************************************************************************************************************** */
      //***************************************************************************************************************** */
      console.log(view);
      // //Get  the preHTML
      var preHtml = htmlOutput.html;
      // //Render the output - replacing the placeholder values.
      var output = Mustache.render(preHtml, view);
      // //Set the key for API

      // //Set the message content and email id.
      var msg = {
        to: 'sapurana@microsoft.com',
        from: 'sasidharp@gmail.com',
        subject: 'Core Platform Engineering - STATUS:  FY19 P2 Close - SAP FICO - 09/12/18',
        html: output,
      };
      console.log(secret);
      // //Send the email.
      sgMail.setApiKey(secret);
      sgMail.send(msg);
      msg.to = 'saradas@microsoft';
      sgMail.send(msg);
      // //Print the log.
      console.log("mail sent");
      // // Puranam_123
    });
    //***************************************************************************************************************** */
    //***************************************************************************************************************** */
  });
});
