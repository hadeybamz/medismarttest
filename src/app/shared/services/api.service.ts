import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { IApiResult } from 'src/app/interfaces/api-result.interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  version: string | undefined;
  config = null;
  apiBaseURL: string | undefined;

  constructor(private http: HttpClient) {}

  create(endpointUrl: string, body: any): Observable<IApiResult> {
    return this.http.post<IApiResult>(`${this.apiBaseURL}${endpointUrl}`, body);
  }

  read(endpointUrl: string): Observable<IApiResult> {
    return this.http.get<IApiResult>(`${this.apiBaseURL}${endpointUrl}`);
  }

  update(endpointUrl: string, body: any): Observable<IApiResult> {
    return this.http.put<IApiResult>(`${this.apiBaseURL}${endpointUrl}`, body);
  }

  delete(endpointUrl: string): Observable<IApiResult> {
    return this.http.delete<IApiResult>(`${this.apiBaseURL}${endpointUrl}`);
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
