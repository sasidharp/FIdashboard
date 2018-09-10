import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MessageService } from '../message.service';
import { Job } from 'src/job';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-charter-table-view',
  templateUrl: './charter-table-view.component.html',
  styleUrls: ['./charter-table-view.component.css']
})
export class CharterTableViewComponent implements OnInit {
  public dataSource: Job[] = [];
  public displayedColumns: string[] = ['subprocess', 'running', 'ready', 'scheduled', 'released', 'aborted', 'finished', 'putactive'];
  constructor( private messageService: MessageService) {
  }
  ngOnInit() {
    this.dataSource = this.messageService.get_jobsummarydata();
    console.log('tabular view ');
    console.log(this.dataSource);
  }

}
