import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Params } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Job } from 'src/job';
import { JobserviceService } from '../jobservice.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {
  lv_dataSource:Job[] = [];
  dataSource:Job[] = [];
  displayedColumns: string[] = ['jobname', 'status', 'jobcount' , 'subarea'];
  params:Params;
  lv_value: string;
  lv_subarea = '';
  lv_status = ' ';
  splitValues: any;
  xJobs: any;
  constructor(private messageService: MessageService , private route: ActivatedRoute) {
    this.lv_dataSource = this.messageService.job_data;
    this.route.params.subscribe(params => this.params = params);
    this.lv_value = this.params['id'];
    console.log(this.lv_value.split('-', 2));
    this.splitValues = this.lv_value.split('-', 2);
    this.lv_subarea = this.splitValues[0];
    this.lv_status = this.splitValues[1];
    console.log(this.lv_subarea, this.lv_status);
    this.xJobs = this.lv_dataSource[0];
    this.xJobs.jobdetails.forEach(element => {
      if ( element.status === this.lv_status && element.subarea === this.lv_subarea ) {
        this.dataSource.push(element);
      }
    });
  }
  ngOnInit() {
  }

}
