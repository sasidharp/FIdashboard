// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var mjml2html = require("mjml");
var Mustache = require('mustache');

var view = {
  title: "SAP Financial Close & Reporting",
  status: "red"
};
/*
  Compile an mjml string
*/

const htmlOutput = mjml2html(`
<mjml>

  <mj-head>
    <mj-attributes>
      <mj-text align="center" color="black"  font-family="Roboto" 	/>
    </mj-attributes>
  </mj-head>


  <mj-body background-color="white" width="1200px">
    <mj-section background-color="white" border="solid" >
      <mj-column>
      <mj-text>
        <h1>{{ title }} </h1>
      </mj-text>
 
      </mj-column>	
         </mj-section>

    <mj-section background-color="YellowGreen" border="solid">

      <mj-column>
        <mj-text align="left">
          <h2>187-Scheduled</h2>
          <h2>009-Completed</h2>
          <h2>012-Failed </h2>
        </mj-text>
      </mj-column>

      <mj-column>
        <mj-text>
          <h1>STATUS</h1>
          <h2>{{ status }}</h2>
          <h3>As of today</h3>
        </mj-text>
    
      </mj-column>
    </mj-section>
    <mj-section background-color="" border="solid" >
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white" href="https://fcmd.azurewebsites.net">		
          LIVE DASHBOARD 
         </mj-button>

    </mj-section>

    
    
    <mj-section background-color="white" border="solid">
      <mj-column>
        <mj-text align="left">
          <h3>COMPLETION STATUS</h3>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
          <h4>ASSET MANAGMENT 100% { 10/10 }</h4>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text align="right">
          <h4>Service Owners</h4>
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
    <mj-section border="solid">
      <mj-column>
        <mj-text align="left">
          <h4>STATUS OF 20 CRITICAL JOBS LISTED BELOW</h4>
        </mj-text>
<mj-table>
          <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
            <th style="padding: 0 15px 0 0;">Year</th>
            <th style="padding: 0 15px;">Language</th>
            <th style="padding: 0 0 0 15px;">Inspired from</th>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">1995</td>
            <td style="padding: 0 15px;">PHP</td>
            <td style="padding: 0 0 0 15px;">C, Shell Unix</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">1995</td>
            <td style="padding: 0 15px;">JavaScript</td>
            <td style="padding: 0 0 0 15px;">Scheme, Self</td>
          </tr>
        </mj-table>
      
      </mj-column>

    </mj-section>
<mj-section border="solid">

  <mj-column>
    <mj-text>
      To engage support operations please create a ticket through service now LINK .If support cannot resolve a urgent       issue in timely manner follow the escalation path below:
  		<h4>Third level</h4>
      SAP SAPFISO@microsoft.com          
  		<h4>Third level</h4>
      Vamsi Venkata Krishna(Redmond)(8AM - 8PM PST)   
      Sayan Saha (India)(8PM - 8AM PST)
			<h4>Third level</h4>
      Email Escl8now or
      Call +1 425-70
    </mj-text>
  </mj-column>

</mj-section>

  </mj-body>

</mjml>
`, { })
var preHtml = htmlOutput.html;
var output = Mustache.render(preHtml, view);

const sgMail = require('@sendgrid/mail');

const msg = {
  to: 'sapurana@microsoft.com',
  from: 'sasidharp@gmail.com',
  subject: 'FCMD Dashboard - FY19 XX V12',
  html: output,
};
sgMail.send(msg);
console.log("mail sent");
// Puranam_123