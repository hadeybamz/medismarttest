import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from './contact-form/contact-form.component';

export interface IContactInfo {
  FirstName: string;
  LastName: string;
  OtherName: string;
  DateOfBirth: string;
  Gender: string;
  PhoneNo: string;
  Occupation: string;
  Address: string;
  Nationality: string;
  CountryOfResidence: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data: IContactInfo): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      // width: '250px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

  onAddButtonClick() {
    this.openDialog(null);
  }

  onEditIconClick(data: IContactInfo) {
    this.openDialog(data);
  }

  onDeleteIconClick(id: number) {
    // this.openDialog(null);
    console.log('delete item with id: ', id);
  }

  onRefreshButtonClick() {
    console.log('referesh');
  }
}
