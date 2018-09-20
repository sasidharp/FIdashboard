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
  return 'Fiscal Year  ' + fy + ' ' + Q +' ' + P + ' Close' + ' [SAP FICO]' + ' ' + d1.toString();
}
console.log(fiscal_year);
