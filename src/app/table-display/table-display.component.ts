import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Jobdetails } from 'src/jobdetails';
import { JobserviceService } from '../jobservice.service';
import { MessageService } from '../message.service';
import { filter } from 'rxjs/operators';
// items: string;
// subarea: string;
// jobname: string;
// jobcount: string;
// sdlstrdt: string;
// sdlstrttm: string;
// strtdate: string;
// strttime: string;
// enddate: string;
// endtime: string;
// sdldate: string;
// sdltime: string;
// status: string;
// line1: string;
// line2: string;
// line3: string;
// line4: string;
// line5: string;
// line6: string;
@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {
  public dataSource: Jobdetails[] = [];
  public dataSourceFiltered: Jobdetails[] = [];
  public displayedColumns: string[] = ['subarea',
    'jobname',
    'jobcount',
    'sdlstrdt',
    'sdlstrttm',
    'strtdate',
    'strttime',
    'enddate',
    'endtime',
    'sdldate',
    'sdltime',
    'status',
  ];
  constructor(private messageService: MessageService, private route: ActivatedRoute, private jobService: JobserviceService) {
  }
  ngOnInit() {
    this.dataSource = this.messageService.get_jobsdata();
  // filer by params selected
    this.route.paramMap.subscribe(result => this.filter(result));
  }
  // Filter the dataSource.
  filter(params: ParamMap) {
    this.dataSource.forEach(element => {
      if ( element.subarea === params.get('id').substr(0, 2)) {
        this.dataSourceFiltered.push(element);
      }
    });
  }
  getRecord(element: any) {
    console.log(element);
  }
}
