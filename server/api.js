// var sendgrid = require("sendgrid")("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");
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
  to: 'sapurana@microsoft.com',
  from: 'sasidharp@gmail.com',
  subject: 'FCMD Dashboard - FY19 XX V12',
  html: '<!DOCTYPE html><html><head><style>table{font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td, th{border: 1px solid #dddddd; text-align: left; padding: 8px;}tr:nth-child(even){background-color: #dddddd;}</style></head><body><h2>HTML Table</h2><table> <tr> <th>Company</th> <th>Contact</th> <th>Country</th> </tr><tr> <td>Alfreds Futterkiste</td><td>Maria Anders</td><td>Germany</td></tr><tr> <td>Centro comercial Moctezuma</td><td>Francisco Chang</td><td>Mexico</td></tr><tr> <td>Ernst Handel</td><td>Roland Mendel</td><td>Austria</td></tr><tr> <td>Island Trading</td><td>Helen Bennett</td><td>UK</td></tr><tr> <td>Laughing Bacchus Winecellars</td><td>Yoshi Tannamuri</td><td>Canada</td></tr><tr> <td>Magazzini Alimentari Riuniti</td><td>Giovanni Rovelli</td><td>Italy</td></tr></table></body></html>',
};
sgMail.send(msg);

