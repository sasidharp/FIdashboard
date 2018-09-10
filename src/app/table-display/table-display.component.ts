import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Jobdetails } from 'src/jobdetails';
import { JobserviceService } from '../jobservice.service';
import { MessageService } from '../message.service';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {

  animal: string;
  name: string;

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
  public DialogData;
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
      if (element.subarea === params.get('id').substr(0, 2)) {
        this.dataSourceFiltered.push(element);
      }
    });
  }
  openDialog(e: any): void {
    let config = new MatDialogConfig();
    config = {
      position: {
        top: '100px',
        left: '300px'
      },
      height: '100px',
      width: '500px',
    };
    const dialogRef = this.dialog.open(DialogComponent, config );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getRecord(element: any) {
    console.log(element);
  }
}

