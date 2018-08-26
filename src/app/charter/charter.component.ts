import { Component, OnInit } from '@angular/core';
import { JobserviceService } from '../jobservice.service';
import { Job } from 'src/job';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Observable , interval } from 'rxjs';

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
  public timer = 300000;
  public display;
  // Doughnut
  public doughnutChartLabels: string[] = [ ] ;
  public doughnutChartData: number[]= [ 20,30,40,50 ] ;
  public doughnutChartType = 'doughnut';
  public barChartOptions: any = { legend: { position: 'right', labels: { 'fontSize': 10, 'fontStyle': 'bold' } } };

  apProcessing = 'AP Processing';
  assetAccounting = 'Asset Accounting';
  consolidation = 'Consolidation';
  treasury = 'Treaury';
  finExtract = 'Finance Extract';
  periodClose = 'Period Close';
  projectAccounting = 'Project Accounting';

  constructor(private jobService: JobserviceService ,
              private router:Router ,
              private messageservice:MessageService)  {
                const retrigger$ = interval(300000);
                const secondsTimer$ = interval(1000);
                const subscribe = retrigger$.subscribe(val => this.get_fresh_data());
                const timer = secondsTimer$.subscribe(val => this.add_counter());
              }
  ngOnInit() {
  this.jobService.getJobs().subscribe(jobs => this.countStatus(jobs) );
  }
  private get_fresh_data( ){
    this.messageservice.job_data = [];
    this.jobService.getJobs().subscribe(jobs => this.resetStatus(jobs) );
  }
  private add_counter(){
    this.timer = this.timer - 1000 ;
    this.display = this.timer / 1000 ;
    
  }

  // "jobname": " Z_SCM_R4C_ERROR_NOTIF",
  // "subarea": "ASSTMGMT",
  // "jobcount": "00000100",
  // "sdldate": "20180811",
  // "status": "R"
  public countStatus(xJobs:Job[]): void {
  //   this.messageservice.add_jobdata(xJobs);
    this.doughnutChartData = [];
    // this.doughnutChartLabels = [];

    this.released =  1;
    this.scheduled = 2;
    this.completed = 4;
    this.total = this.total + 1;
    this.doughnutChartData.push(this.released);
    this.doughnutChartData.push(this.scheduled);
    this.doughnutChartData.push(this.completed);
    this.doughnutChartData.push(this.completed);

    this.doughnutChartLabels.push('Released' );
    this.doughnutChartLabels.push('Scheduled');
    this.doughnutChartLabels.push('Completed');
    this.doughnutChartLabels.push('Delayed');

  }
  public resetStatus(xJobs:Job[]): void {
    //   this.messageservice.add_jobdata(xJobs);
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      this.released =  1;
      this.scheduled = 2 ;
      this.completed = 1 + this.completed;
      this.total = this.total + 1;
      this.doughnutChartData.push(this.released);
      this.doughnutChartData.push(this.scheduled);
      this.doughnutChartData.push(this.completed);
   
    }
  
  showChardata(e: any , charttype: string) {
    if ( e.active.length > 0 ) {
        switch (e.active[0]._chart.config.data.labels[e.active[0]._index]) {
          case 'Released':
          this.router.navigate( ['/table/' + charttype + '-Released'] );
          break;
          case 'Completed':
          this.router.navigate( ['/table/' + charttype + '-Completed'] );
          break;
          case 'Scheduled':
          this.router.navigate( ['/table/' + charttype + '-Scheduled' ] ) ;
          break;
          default:
          break;
        }
    }
  }

}



