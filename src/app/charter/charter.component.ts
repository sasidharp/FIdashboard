import { Component, OnInit } from '@angular/core';
import { JobserviceService } from '../jobservice.service';
import { Job } from 'src/job';

@Component({
  selector: 'app-charter',
  templateUrl: './charter.component.html',
  styleUrls: ['./charter.component.css']
})
export class CharterComponent implements OnInit {
  // Jobs
  public jobs: Job[];
  public total = 0;
  public released = 0;
  public completed = 0;
  public scheduled = 0;
  // Doughnut
  public doughnutChartLabels: string[] = [ ] ;
  public doughnutChartData: number[]= [ 20,30,40 ] ;
  public doughnutChartType = 'doughnut';
  public barChartOptions: any = { legend: { position: 'right', labels: { 'fontSize': 10, 'fontStyle': 'bold' } } };

  apProcessing = 'AP Processing';
  assetAccounting = 'Asset Accounting';
  consolidation = 'Consolidation';
  treasury = 'Treaury';
  finExtract = 'Finance Extract';
  periodClose = 'Period Close';
  projectAccounting = 'Project Accounting';

  constructor(private jobService: JobserviceService) { }
  ngOnInit() {
     this.jobService.getJobs().subscribe(jobs => this.countStatus(jobs) );
    // this.jobService.getJobs().subscribe(jobs => this.jobs = jobs );
  }

  // "jobname": " Z_SCM_R4C_ERROR_NOTIF",
  // "subarea": "ASSTMGMT",
  // "jobcount": "00000100",
  // "sdldate": "20180811",
  // "status": "R"
  public countStatus(xJobs:Job[]): void {
    this.doughnutChartData = [];
    for (let jobx of xJobs) {
      if (jobx.subarea = 'ASSTMGMT') {
      switch (jobx.status) {
        case 'R':
        this.released = this.released + 1;
        break;
        case 'Y':
        this.scheduled = this.scheduled + 1;
        break;
        case 'S':
        this.completed = this.completed + 1;
        break;
        case 'A':
        case 'F':
        case 'Z':
        case 'X':
          break;
        default:
          break;
      }

    }

      this.total = this.total + 1;
    }
    this.doughnutChartData.push(this.released);
    this.doughnutChartData.push(this.scheduled);
    this.doughnutChartData.push(this.completed);


    this.doughnutChartLabels.push('Released');
    this.doughnutChartLabels.push('Scheduled');
    this.doughnutChartLabels.push('Completed');

  }

}
