import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  constructor() { }
  add_messages(message: string): void {
    this.messages.push(message);
  }
  clear_messages(): void {
    this.messages = [];
  }
}
