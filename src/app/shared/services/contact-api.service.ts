import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap } from 'rxjs/operators';
import { IContactInfo } from 'src/app/components/contact/contact.component';
import { IApiResult } from 'src/app/interfaces/api-result.interface';
import { ApiService } from './api.service';

@Injectable()
export class ContactApiService {
  version: string | undefined;
  config = null;
  apiBaseURL: string | undefined;

  constructor(private apiService: ApiService) {}

  getAll(): Observable<any[]> {
    return this.apiService.read('registration/get').pipe(
      switchMap((res: IApiResult) => {
        if (res.Success && res.Results) {
          console.log(res.Results);
          return of(res.Results);
        } else {
          of([]);
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of([]);
      })
    );
  }

  createContact(data: IContactInfo): Observable<boolean> {
    return this.apiService.create('registration/create', data).pipe(
      switchMap((res: IApiResult) => {
        if (res.Success) {
          console.log(res.Results);
          return of(res.Success);
        } else {
          of(res.Success);
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  updateContact(data: IContactInfo, id: number): Observable<boolean> {
    return this.apiService.update(`registration/update/${id}`, data).pipe(
      switchMap((res: IApiResult) => {
        if (res.Success) {
          console.log(res.Results);
          return of(res.Success);
        } else {
          of(res.Success);
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  deleteContact(id: number): Observable<boolean> {
    return this.apiService.delete(`registration/update/${id}`).pipe(
      switchMap((res: IApiResult) => {
        if (res.Success) {
          console.log(res.Results);
          return of(res.Success);
        } else {
          of(false);
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
