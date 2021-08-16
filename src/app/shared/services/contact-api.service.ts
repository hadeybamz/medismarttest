import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IContactInfo } from 'src/app/components/contact/contact.component';
import { IApiResult } from 'src/app/interfaces/api-result.interface';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONTACT_API_URL } from 'src/app/constants/api-urls.constant';

@Injectable()
export class ContactApiService {
  version: string | undefined;
  config = null;
  apiBaseURL: string | undefined;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) {}

  getAll(): Observable<any[]> {
    return this.apiService.read(CONTACT_API_URL.getAll).pipe(
      switchMap((res: IApiResult) => {
        if (res.success && res.results) {
          this.openSnackBar('records loaded successfully');
          return of(res.results);
        } else {
          this.openSnackBar(
            res.errorMessage ? res.errorMessage : 'Data could not be loaded.'
          );
          return of([]);
        }
      }),
      catchError((error: any) => {
        this.openSnackBar('Something went wrong, data could not be loaded.');
        return of([]);
      })
    );
  }

  createContact(data: IContactInfo): Observable<boolean> {
    return this.apiService.create(CONTACT_API_URL.create, data).pipe(
      switchMap((res: IApiResult) => {
        if (res.success) {
          this.openSnackBar('Record created successfully');
          return of(res.success);
        } else {
          this.openSnackBar(
            res.errorMessage ? res.errorMessage : 'Record could not be created'
          );
          of(res.success);
        }
      }),
      catchError((error: any) => {
        this.openSnackBar('Something went wrong, record could not be created.');
        return of(false);
      })
    );
  }

  updateContact(data: IContactInfo, id: number): Observable<boolean> {
    return this.apiService.update(`${CONTACT_API_URL.update}/${id}`, data).pipe(
      switchMap((res: IApiResult) => {
        if (res.success) {
          this.openSnackBar('Record updated successfully');
          return of(res.success);
        } else {
          this.openSnackBar(
            res.errorMessage ? res.errorMessage : 'Record could not be created.'
          );
          of(res.success);
        }
      }),
      catchError((error: any) => {
        this.openSnackBar('Something went wrong, record could not be updated.');
        return of(false);
      })
    );
  }

  deleteContact(id: number): Observable<boolean> {
    return this.apiService.delete(`${CONTACT_API_URL.delete}/${id}`).pipe(
      switchMap((res: IApiResult) => {
        if (res.success) {
          this.openSnackBar('Record deleted successfully');
          return of(res.success);
        } else {
          this.openSnackBar(
            res.errorMessage ? res.errorMessage : 'Record could not be deleted.'
          );
          of(false);
        }
      }),
      catchError((error: any) => {
        this.openSnackBar('Something went wrong, record could not be deleted.');
        return of(false);
      })
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
    });
  }
}
