import { Component, OnInit } from '@angular/core';
import { JobserviceService } from '../jobservice.service';
import { Job } from 'src/job';
import { Jobdetails } from 'src/jobdetails';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Observable, interval } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
export enum label_strings {
  S1 = 'AP Processing ',
  S2 = 'Asset Accounting',
  S3 = 'Consolidation',
  S4 = 'Treaury',
  S5 = 'Finance Extract',
  S6 = 'Period Close',
  S7 = 'Project Accounting',
  S8 = 'Overall Status'
}

@Component({
  selector: 'app-charter',
  templateUrl: './charter.component.html',
  styleUrls: ['./charter.component.css']
})

export class CharterComponent implements OnInit {

  public S1 = label_strings.S1;
  public S2 = label_strings.S2;
  public S3 = label_strings.S3;
  public S4 = label_strings.S4;
  public S5 = label_strings.S5;
  public S6 = label_strings.S6;
  public S7 = label_strings.S7;
  public S8 = label_strings.S8;

  public return: any;
  public jobs: Job[];
  public summary_jobs: Job[];
  public jobs_details: Jobdetails[];
  public timestamp;
  public timer = 10000;
  public display;
  public show = true;
  public displayDate = false;

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
    this.jobService.getJobs('FI').subscribe(returnData => this.resetStatus(returnData));

  }

  private get_fresh_data() {
//  this.messageservice.invalidate_data(); // reset cache
    this.jobService.getJobs('FI').subscribe(returnData => this.resetStatus(returnData));
  }
  private add_counter() {
    this.timer = this.timer - 1000;
    this.display = this.timer / 1000;
    if (this.timer === 0) {
      this.timer = 100000;
    }
  }

  public resetStatus(xJobs: any): void {
    this.show = false;
    this.displayDate = true;
    // console.log(xJobs);
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

  // A = 'Aborted',
  // Y = 'Ready',
  // P = 'Scheduled',
  // S = 'Released',
  // R = 'Running',
  // F = 'Finished',
  // Z = 'Putactive',
  // X = 'Unknown State'

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



