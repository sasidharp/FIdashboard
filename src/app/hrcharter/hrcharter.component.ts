import { Component, OnInit } from '@angular/core';
import { JobserviceService } from '../jobservice.service';
import { Job } from 'src/job';
import { Jobdetails } from 'src/jobdetails';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Observable, interval } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
export enum hrlabel_strings {
  S1 = 'Payroll-U1-Day1 ',
  S2 = 'Payroll-U1-Day2',
  S3 = 'Payroll-U1-Day3',
  S4 = 'Payroll-U3-Day1',
  S5 = 'Payroll-U3-Day2',
  S6 = 'Payroll-U3-Day3',
  S7 = 'HR critical jobs',
  S8 = 'Overall Status'
}

@Component({
  selector: 'app-hrcharter',
  templateUrl: './hrcharter.component.html',
  styleUrls: ['./hrcharter.component.css']
})

export class HRcharterComponent implements OnInit {

  public S1 = hrlabel_strings.S1;
  public S2 = hrlabel_strings.S2;
  public S3 = hrlabel_strings.S3;
  public S4 = hrlabel_strings.S4;
  public S5 = hrlabel_strings.S5;
  public S6 = hrlabel_strings.S6;
  public S7 = hrlabel_strings.S7;
  public S8 = hrlabel_strings.S8;

  public return: any;
  public jobs: Job[];
  public summary_jobs: Job[];
  public jobs_details: Jobdetails[];
  public timestamp;
  public timer = 10000;
  public display;

  public doughnutChartLabels: string[] = [];
  public doughnutChartType = 'doughnut';
  public barChartOptions: any = { legend: { position: 'right', labels: { 'fontSize': 10, 'fontStyle': 'bold' } } };

  public doughnutChartData_s1: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s2: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s3: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s4: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s5: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s6: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s7: number[] = [1, 1, 1, 1, 1, 1, 1];
  public doughnutChartData_s8: number[] = [1, 1, 1, 1, 1, 1, 1];
  public dataSource: Job[] = [];
  public d1 = new Date(0);
  public progress;


  constructor(private jobService: JobserviceService,
    private router: Router,
    private messageservice: MessageService,
    private sessionStorage: SessionStorageService) {
    const retrigger$ = interval(60000);
    const secondsTimer$ = interval(60000);
    const subscribe = retrigger$.subscribe(val => this.get_fresh_data());
    const timer = secondsTimer$.subscribe(val => this.add_counter());

  }

  ngOnInit() {
    //  Set the labels
    this.doughnutChartLabels.push('Running');
    this.doughnutChartLabels.push('Scheduled');
    this.doughnutChartLabels.push('Released');
    this.doughnutChartLabels.push('Ready');
    this.doughnutChartLabels.push('PutActive');
    this.doughnutChartLabels.push('Finished');
    this.doughnutChartLabels.push('Aborted');
//  this.messageservice.invalidate_data(); // reset cache
    this.jobService.getJobs('HR').subscribe(returnData => this.resetStatus(returnData));

  }

  private get_fresh_data() {
//  this.messageservice.invalidate_data(); // reset cache
    this.jobService.getJobs('HR').subscribe(returnData => this.resetStatus(returnData));
  }
  private add_counter() {
    this.timer = this.timer - 1000;
    this.display = this.timer / 1000;
    if (this.timer === 0) {
      this.timer = 100000;
    }
  }

  public resetStatus(xJobs: any): void {
    console.log(xJobs);
    this.jobs = xJobs[0].job_summary;
    // this.jobs = JSON.parse(xJobs[0]).job_summary;
    //     store the date for the table display later
    this.messageservice.add_jobdata(xJobs[0].jobs);
    this.messageservice.add_jobsummarydata(this.jobs);
    this.dataSource = this.jobs;
    //  Set the data right as per the Webserive
    this.jobs.forEach(element => {
      switch (element.subprocess) {
        case 'S1':
          this.doughnutChartData_s1 = [];
          this.doughnutChartData_s1.push(parseInt(element.running, 10));
          this.doughnutChartData_s1.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s1.push(parseInt(element.released, 10));
          this.doughnutChartData_s1.push(parseInt(element.ready, 10));
          this.doughnutChartData_s1.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s1.push(parseInt(element.finished, 10));
          this.doughnutChartData_s1.push(parseInt(element.aborted, 10));
          this.d1 = new Date(0);
          this.d1.setUTCSeconds(parseInt(element.timestamp, 0));
          break;
        case 'S2':
          this.doughnutChartData_s2 = [];
          this.doughnutChartData_s2.push(parseInt(element.running, 10));
          this.doughnutChartData_s2.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s2.push(parseInt(element.released, 10));
          this.doughnutChartData_s2.push(parseInt(element.ready, 10));
          this.doughnutChartData_s2.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s2.push(parseInt(element.finished, 10));
          this.doughnutChartData_s2.push(parseInt(element.aborted, 10));
          break;
        case 'S3':
          this.doughnutChartData_s3 = [];
          this.doughnutChartData_s3.push(parseInt(element.running, 10));
          this.doughnutChartData_s3.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s3.push(parseInt(element.released, 10));
          this.doughnutChartData_s3.push(parseInt(element.ready, 10));
          this.doughnutChartData_s3.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s3.push(parseInt(element.finished, 10));
          this.doughnutChartData_s3.push(parseInt(element.aborted, 10));
          break;
        case 'S4':
          this.doughnutChartData_s4 = [];
          this.doughnutChartData_s4.push(parseInt(element.running, 10));
          this.doughnutChartData_s4.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s4.push(parseInt(element.released, 10));
          this.doughnutChartData_s4.push(parseInt(element.ready, 10));
          this.doughnutChartData_s4.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s4.push(parseInt(element.finished, 10));
          this.doughnutChartData_s4.push(parseInt(element.aborted, 10));
          break;
        case 'S5':
          this.doughnutChartData_s5 = [];
          this.doughnutChartData_s5.push(parseInt(element.running, 10));
          this.doughnutChartData_s5.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s5.push(parseInt(element.released, 10));
          this.doughnutChartData_s5.push(parseInt(element.ready, 10));
          this.doughnutChartData_s5.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s5.push(parseInt(element.finished, 10));
          this.doughnutChartData_s5.push(parseInt(element.aborted, 10));

          break;

        case 'S6':
          this.doughnutChartData_s6 = [];
          this.doughnutChartData_s6.push(parseInt(element.running, 10));
          this.doughnutChartData_s6.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s6.push(parseInt(element.released, 10));
          this.doughnutChartData_s6.push(parseInt(element.ready, 10));
          this.doughnutChartData_s6.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s6.push(parseInt(element.finished, 10));
          this.doughnutChartData_s6.push(parseInt(element.aborted, 10));

          break;
        case 'S7':
          this.doughnutChartData_s7 = [];
          this.doughnutChartData_s7.push(parseInt(element.running, 10));
          this.doughnutChartData_s7.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s7.push(parseInt(element.released, 10));
          this.doughnutChartData_s7.push(parseInt(element.ready, 10));
          this.doughnutChartData_s7.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s7.push(parseInt(element.finished, 10));
          this.doughnutChartData_s7.push(parseInt(element.aborted, 10));

          break;
        case 'S8':
          this.doughnutChartData_s8 = [];
          this.doughnutChartData_s8.push(parseInt(element.running, 10));
          this.doughnutChartData_s8.push(parseInt(element.scheduled, 10));
          this.doughnutChartData_s8.push(parseInt(element.released, 10));
          this.doughnutChartData_s8.push(parseInt(element.ready, 10));
          this.doughnutChartData_s8.push(parseInt(element.putactive, 10));
          this.doughnutChartData_s8.push(parseInt(element.finished, 10));
          this.doughnutChartData_s8.push(parseInt(element.aborted, 10));

          break;
      }
    });
    this.progress = 30;
  }

  showChardata(e: any, charttype: string) {
    if (e.active.length > 0) {
      console.log(e.active[0]._chart.config.data.labels[e.active[0]._index]);
      switch (e.active[0]._chart.config.data.labels[e.active[0]._index]) {
        case 'Running':
        this.router.navigate(['/table/' + charttype + '-R']);
        break;
      case 'Ready':
        this.router.navigate(['/table/' + charttype + '-Y']);
        break;
      case 'Scheduled':
        this.router.navigate(['/table/' + charttype + '-P']);
        break;
      case 'Released':
        this.router.navigate(['/table/' + charttype + '-S']);
        break;
      case 'Aborted':
        this.router.navigate(['/table/' + charttype + '-A']);
        break;
      case 'Finished':
        this.router.navigate(['/table/' + charttype + '-F']);
        break;
      case 'Putactive':
        this.router.navigate(['/table/' + charttype + '-Z']);
        break;
      default:
        break;
      }
    }
  }
  chartHovered(e: any) {

  }



}



