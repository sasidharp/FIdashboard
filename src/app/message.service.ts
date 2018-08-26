import { Injectable } from '@angular/core';
import { Job } from '../job';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  job_data:Job[] = [];
  constructor() { }
  add_messages(message: string): void {
    this.messages.push(message);
  }
  clear_messages(): void {
    this.messages = [];
  }
  add_jobdata(jobs:Job[]): void {
    this.job_data = [];
    this.job_data = this.job_data.concat(jobs);
  }
}
