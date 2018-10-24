const request = require('request');
const mjml2html = require("mjml");
const Mustache = require('mustache');
const sgMail = require('@sendgrid/mail');


const MSI_KEY_VAULTURL = 'https://vault.azure.net';
const API_VER = '2017-09-01';
const S1 = 'AP Processing ';
const S2 = 'Asset Accounting';
const S3 = 'Consolidation';
const S4 = 'Treasury';
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

//variables
var sendAPIkey = '';
var dbConn = '';
var authToken = '';
var lv_finished = 0;
var lv_aborted = 0;
var lv_running = 0;
var lv_putactive = 0;
var lv_ready = 0;
var lv_released = 0;
var lv_scheduled = 0;
var lv_total = 0;
var lv_run = 0;
// var mailContent = require('./MailContent').htmlOutput;
var services = [];
var jobs = [];
//Parse the Mongo and update the variable.
var statusObject = {
  status: 'All good',
  color: 'green',
};
var service = {
  description: '',
  running: '',
  total: ''
};
services.push(service);
var job = {
  sno: '1',
  description: '',
  status: 'F',
}
var SummaryObject = {
  running: '',
  aborted: '',
  finished: '',
  putactive: '',
  released: '',
  ready: '',
  scheduled: '',
}
// Main object to render values
var view = {
  status: statusObject,
  summary: SummaryObject,
  byservice: services,
  criticaljobs: jobs
}
// Set the title for the email
function set_Title() {
  view.status.title = 'Core Platform Engineering - STATUS:  FY19 P2 Close - SAP FICO - 09/12/18 ';
}
// Set the subtitle for the email
function set_subTitle() {
  view.status.subtitle = 'Status Report FY19-P2 (8/26 to 9/11)';
}
// set the cumulated values
function set_cumulatedValues() {
  view.summary.finished = lv_finished;
  view.summary.aborted = lv_aborted;
  view.summary.running = lv_running;
  view.summary.putactive = lv_putactive;
  view.summary.ready = lv_ready;
  view.summary.released = lv_released;
  view.summary.scheduled = lv_scheduled;
  if (lv_aborted === 0) {
    view.status.color = 'limegreen';
    view.status.status = 'No failed jobs. status is GREEN'
  } else {
    view.status.color = 'red';
    view.status.status = 'Atleast one job failed. status is RED'

  }

}

function set_status(input) {
  // const A = 'Aborted';
  // const Y = 'Ready';
  // const P = 'Scheduled';
  // const S = 'Released';
  // const R = 'Running';
  // const F = 'Finished';
  // const Z = 'Putactive';
  // const X = 'Unknown State';  

  switch (input) {
    case 'A':
      return A;
      break;
    case 'Y':
      return Y;
      break;
    case 'P':
      return P;
      break;
    case 'S':
      return S;
      break;
    case 'R':
      return R;
      break;
    case 'F':
      return F;
      break;
    case 'Z':
      return Z;
      break;
    case 'X':
      return X;
      break;

    default:
      break;
  }
}
// *****************************************************************************************************
// Get the SendGrid Key.   
var options = {
  method: 'GET',
  url: `${process.env["MSI_ENDPOINT"]}/?resource=${MSI_KEY_VAULTURL}&api-version=${API_VER}`,
  headers: {
    'Secret': process.env["MSI_SECRET"]
  }
};
request(options, function (error, response, body) {
  authToken = ('Bearer ' + JSON.parse(body).access_token);
  var options = {
    method: 'GET',
    url: `https://fcmd.vault.azure.net/secrets/sendgridkey/c43bc362ef6043d8a0aafe8361d497e8?api-version=2016-10-01`,
    headers: {
      'Authorization': authToken
    }
  };
  request(options, function (error, response, body) {
    if (response.statusCode === 200) {
      sendAPIkey = JSON.parse(body).value;
    } else {
      console.log('No permission to view Secret');
      return;
    }
    getDBstring();
  });
});
//Return the cosmos DB string.
function getDBstring() {
  var options = {
    method: 'GET',
    url: `https://fcmd.vault.azure.net/secrets/mongo/4ab3b721223c4e12b9ce6bedb01a061c?api-version=2016-10-01`,
    headers: {
      'Authorization': authToken
    }
  };
  request(options, function (error, response, body) {
    if (response.statusCode === 200) {
      dbConn = JSON.parse(body).value;
      // If both the keys for retrieved , call the DB for data.
      options = {
        method: 'GET',
        url: `https://fcmd.azurewebsites.net/jobs`,
      };
      // Call SAP    
      request(options, function (error, response, body) {
        var sapContent = JSON.parse(body);
        var jobSummary = sapContent[0].job_summary;
        jobSummary.forEach(element => {
          lv_running = parseInt(element.running) + lv_running;
          lv_ready = parseInt(element.ready) + lv_ready;
          lv_scheduled = parseInt(element.scheduled) + lv_scheduled;
          lv_finished = parseInt(element.finished) + lv_finished;
          lv_aborted = parseInt(element.aborted) + lv_aborted;
          lv_putactive = parseInt(element.putactive) + lv_putactive;
          lv_released = parseInt(element.released) + lv_released;
        });
        //Set the cumulated values 
        set_cumulatedValues();
        //print the values.
        jobSummary.forEach(element => {
          lv_run = 0;
          lv_total = 0;
          lv_total = parseInt(element.running) + parseInt(element.ready) + parseInt(element.scheduled)
          parseInt(element.aborted) + parseInt(element.putactive) + parseInt(element.released);
          lv_run = parseInt(element.running);
          switch (element.subprocess) {
            case 'S1':
              services.push({
                description: S1,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S2':
              services.push({
                description: S2,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S3':
              services.push({
                description: S3,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S4':
              services.push({
                description: S4,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S5':
              services.push({
                description: S5,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S6':
              services.push({
                description: S6,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S7':
              services.push({
                description: S7,
                running: lv_run,
                total: lv_total
              });
              break;
            case 'S8':
            default:
              break;
          }
        });
        var sapJobs = sapContent[0].jobs;
        var lv_count = 0;
        sapJobs.forEach(element => {
          lv_count = lv_count + 1;
          jobs.push({
            sno: lv_count,
            description: element.jobname,
            status: set_status(element.status)
          });
        });
        var htmlOutput = mjml2html(`<mjml>
  <mj-head>
    <mj-attributes>
    <mj-section border="solid" ></mj-section>
   </mj-attributes>
  </mj-head>
  <mj-body background-color="white" width="1200px" border="solid">
    <mj-section>
      <mj-column>
        <mj-text color = "{{ status.color }}">
          <h3>{{ status.status }}</h3>
         </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column >
        <mj-table >
          <tr>
            <td style="padding: 0 15px 0 0;">Running</h3>
            </td>
            <td style="padding: 0 15px;">{{ summary.running }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Ready</td>
            <td style="padding: 0 15px;">{{ summary.ready }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Scheduled</td>
            <td style="padding: 0 15px;">{{ summary.scheduled }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Released</td>
            <td style="padding: 0 15px;">{{ summary.released }}</td>
          </tr>
        </mj-table>
      </mj-column>
      <mj-column>
        <mj-table>
          <tr>
            <td style="padding: 0 15px 0 0;">Finished</td>
            <td style="padding: 0 15px;">{{ summary.finished }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Aborted</td>
            <td style="padding: 0 15px;">{{ summary.aborted }}</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Putactive</td>
            <td style="padding: 0 15px;">{{ summary.putactive }}</td>
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
            <td style="padding: 0 15px;">Total</td>
            <td style="padding: 0 15px;">Pending</td>
          </tr>
          {{#byservice}}
          <tr>
            <td style="padding: 0 15px;">{{ description }}</td>
            <td style="padding: 0 15px;">{{ running }}</td>
            <td style="padding: 0 15px;">{{ total }}</td>
          </tr>
         {{/byservice}}
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
                        </mj-text>
                        </mj-column>

    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text align="left">
          <h4>FOLLOWING JOBS ARE MONITORED BY TRACKER </h4>
          <h5> **Tracker triggers email update every 4 hours</h5>
           </mj-text>
        <mj-table >
          {{#criticaljobs}} 
          <tr style="text-align:left">
            <td style="padding: 0 100px 0 0;">{{ sno }}</td>
            <td style="padding: 0 15px;">{{ description }}</td>
            <td style="padding: 0 15px;">{{ status }}</td>
          </tr>
          {{/criticaljobs}}
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
`, {
          validationLevel: 'skip',
          minify: true
        });

        var output = Mustache.render(htmlOutput.html, view);
        // send the email out for intented recipients.
        sgMail.setApiKey(sendAPIkey);
        var d1 = new Date();
        var year = d1.getFullYear();
        var month = d1.getMonth();
        var fiscal_year;
        var Q;
        var P;
        var fy = year;
        switch (month) {
          case 0:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q3', 'P1');
            break;
          case 1:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q3', 'P2');
            break;
          case 2:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q3', 'P3');
            break;
          case 3:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q4', 'P1');
            break;
          case 4:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q4', 'P2');
            break;
          case 5:
            fy = year;
            fiscal_year = Fiscal(fy, 'Q4', 'P3');
            break;
          case 6:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q1', 'P1');
            break;
          case 7:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q1', 'P2');
            break;
          case 8:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q1', 'P3');
            break;
          case 9:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q2', 'P1');
            break;
          case 10:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q2', 'P2');
            break;
          case 11:
            fy = year + 1;
            fiscal_year = Fiscal(fy, 'Q2', 'P3');
            break;
          default:
            break;
        }

        function Fiscal(fy, Q, P) {
          var date = new Date();
          return 'Fiscal Year  ' + fy + ' ' + Q + ' ' + P + ' Close' + ' [SAP FICO]' + ' ' + date.toString();
        }



        const emails = [{
            to: 'sapurana@microsoft.com',
            from: 'sasidharp@gmail.com',
            subject: fiscal_year,
            html: output,
          },
          {
            to: 'saradas@microsoft.com',
            from: 'sasidharp@gmail.com',
            subject: fiscal_year,
            html: output,
          },
          {
            to: 'vcheruk@microsoft.com',
            from: 'sasidharp@gmail.com',
            subject: fiscal_year,
            html: output,
          },
          {
            to: 'Satyavathi.VDSS@microsoft.com',
            from: 'sasidharp@gmail.com',
            subject: fiscal_year,
            html: output,
          },
          {
            to: 'Sameer.Singh@microsoft.com',
            from: 'sasidharp@gmail.com',
            subject: fiscal_year,
            html: output,
          },
        ];
        sgMail.send(emails);
      });
    } else {
      console.log('No permission to view Secret');
      return;
    }
  });
}
