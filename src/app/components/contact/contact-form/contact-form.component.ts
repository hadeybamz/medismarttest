import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ContactApiService } from 'src/app/shared/services/contact-api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ContactApiService],
})
export class ContactFormComponent {
  contactForm = this.fb.group({
    FirstName: [null, Validators.required],
    LastName: [null, Validators.required],
    OtherName: [null],
    DateOfBirth: [null, Validators.required],
    Gender: [null, Validators.required],
    PhoneNo: [
      null,
      Validators.compose([Validators.minLength(11), Validators.maxLength(15)]),
    ],
    Occupation: [null],
    Address: [null],
    Nationality: [null],
    CountryOfResidence: [null],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ContactApiService
  ) {
    if (this.data) {
      this.contactForm.patchValue({
        FirstName: this.data.FirstName,
        LastName: this.data.LastName,
        OtherName: this.data.OtherName,
        DateOfBirth: this.data.DateOfBirth,
        Gender: this.data.Gender,
        PhoneNo: this.data.PhoneNo,
        Occupation: this.data.Occupation,
        Address: this.data.Address,
        Nationality: this.data.Nationality,
        CountryOfResidence: this.data.CountryOfResidence,
      });
    }
  }

  onSubmit(): void {
    if (this.data) {
      this.apiService
        .updateContact(this.contactForm.getRawValue(), this.data.Id)
        .pipe(take(1))
        .subscribe((res) => {
          if (res) {
            this.dialogRef.close({ saveSuccess: true });
          }
        });
    } else {
      this.apiService
        .createContact(this.contactForm.getRawValue())
        .pipe(take(1))
        .subscribe((res) => {
          if (res) {
            this.dialogRef.close({ saveSuccess: true });
          }
        });
    }
  }

  onResetClick(): void {
    this.contactForm.reset();
  }
}
