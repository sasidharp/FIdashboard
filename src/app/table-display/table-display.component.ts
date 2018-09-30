import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Jobdetails } from 'src/jobdetails';
import { JobserviceService } from '../jobservice.service';
import { MessageService } from '../message.service';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Dialogdata } from '../Dialogdata';


@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {
  // public dData = new Dialogdata();
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
  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private jobService: JobserviceService,
    public dialog: MatDialog) {
  }
  ngOnInit() {
    this.dataSource = this.messageService.get_jobsdata();
    // filer by params selected
    this.route.paramMap.subscribe(result => this.filter(result));
  }
  // Filter the dataSource.
  filter(params: ParamMap) {
    this.dataSource.forEach(element => {
      if (element.subarea === params.get('id').substr(0, 2) && element.status === params.get('id').substr(3, 1)) {
        this.dataSourceFiltered.push(element);
      }
    });
  }
  openDialog(e: any): void {
    let config = new MatDialogConfig();
    // this.dData.line1 = e.line1;
    // this.dData.line2 = e.line2;
    // this.dData.line3 = e.line3;
    // this.dData.line4 = e.line4;
    // this.dData.line5 = e.line5;
    // this.dData.line6 = e.line6;
    config = {
      position: {
        top: '100px',
        left: '300px'
      },
      height: '600px',
      width: '900px',
      // data: this.dData
      data: {
        line1: e.line1,
        line2: e.line2,
        line3: e.line3,
        line4: e.line4,
        line5: e.line5,
        line6: e.line6
      }
    };
    const dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

