import { Injectable } from '@angular/core';
import { Job } from '../job';
import { Observable, of, pipe } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobserviceService {
  private sapServiceURL = '/jobs';
  public jobs: Job[];

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getJobs(): Observable<Job[]> {

    return this.http.get<Job[]>(this.sapServiceURL).pipe(share(),
      tap(jobs => console.log('Fetched Jobs')),
      catchError(this.handleError<Job[]>('SAP Service', [])
      )
    );
  }

  private log(message: string) {
    this.messageService.add_messages('SAP Service:' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
