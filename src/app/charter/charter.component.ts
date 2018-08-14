import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charter',
  templateUrl: './charter.component.html',
  styleUrls: ['./charter.component.css']
})
export class CharterComponent implements OnInit {
  // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';
    public doughnutChartColors = [{backgroundColor: ['#e84351', '#434a54', '#3ebf9b', '#4d86dc', '#f3af37']}];
    constructor() { }
    // events
    public chartClicked(e: any): void {
      console.log(e);
    }
    public chartHovered(e: any): void {
      console.log(e);
    }
  ngOnInit() {
  }

}
