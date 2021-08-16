import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmActionComponent } from 'src/app/shared/components/confirm-action/confirm-action.component';
import { ContactApiService } from 'src/app/shared/services/contact-api.service';
import { ContactFormComponent } from './contact-form/contact-form.component';

export interface IContactInfo {
  firstName: string;
  lastName: string;
  otherName: string;
  dateOfBirth: string;
  gender: string;
  phoneNo: string;
  occupation: string;
  address: string;
  nationality: string;
  countryOfResidence: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactApiService],
})
export class ContactComponent implements OnInit {
  contacts$: Observable<IContactInfo[]>;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNo',
    'occupation',
    'Actions',
  ];

  dataSource: MatTableDataSource<IContactInfo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public apiService: ContactApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService
      .getAll()
      .pipe(take(1))
      .subscribe((v) => {
        this.dataSource = new MatTableDataSource(v);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  openDialog(data: IContactInfo, view: boolean): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { record: data, view },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.saveSuccess) {
        this.loadData();
      }
    });
  }

  openConfirmDialog(description: string, actionText: string): void {
    const dialogRef = this.dialog.open(ConfirmActionComponent, {
      data: { description, actionText },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

  onAddButtonClick() {
    this.openDialog(null, false);
  }

  onEditIconClick(data: IContactInfo) {
    this.openDialog(data, false);
  }

  onViewIconClick(data: IContactInfo) {
    this.openDialog(data, true);
  }

  onDeleteIconClick(id: number) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, {
      data: {
        description: 'Are you sure you want to delete this item?',
        actionText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.apiService
          .deleteContact(id)
          .pipe(take(1))
          .subscribe((res) => {
            if (res) {
              console.log('delete item with id: ', id);
            }
          });
      }
    });
  }

  onRefreshButtonClick() {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
