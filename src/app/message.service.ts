import { Injectable } from '@angular/core';
import { Jobdetails } from '../jobdetails';
import { Job } from '../job';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: string[] = [];
  private job_data: Jobdetails[] = [];
  private summaryData: Job[] = [];

  constructor(private sessionStorage: SessionStorageService) {
  }

  // Add messages
  add_messages(message: string): void {
    this.messages.push(message);
  }
  // clear messagges
  clear_messages(): void {
    this.messages = [];
  }
  // Add job summary data
  add_jobsummarydata(jobs: Job[]): void {
    this.summaryData = [];
    this.summaryData = this.summaryData.concat(jobs);
    this.save_local_storage( 'jobsummary' , this.summaryData  );
  }
  // Add the job related data
  add_jobdata(jobs: Jobdetails[]): void {
    this.job_data = [];
    this.job_data = this.job_data.concat(jobs);
    this.save_local_storage( 'jobdetails' , this.job_data );
  }
  // Return job data
  get_jobsdata(): Jobdetails[] {
    return JSON.parse (this.sessionStorage.retrieve('jobdetails'));
  }
  // Return summary data
  get_jobsummarydata(): Job[] {
    return JSON.parse (this.sessionStorage.retrieve('jobsummary'));
  }
  invalidate_data(): void {
    this.sessionStorage.clear('jobsummary');
    this.sessionStorage.clear('jobdetails');
    }
 save_local_storage(keyName , tobeStored) {
    this.sessionStorage.store( keyName , JSON.stringify(tobeStored));
  }
}
