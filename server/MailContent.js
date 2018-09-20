 const mjml2html = require("mjml");
 const Mustache = require('mustache');
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
module.exports = { htmlOutput }