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
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    otherName: [null],
    dateOfBirth: [null, Validators.required],
    gender: [null, Validators.required],
    phoneNo: [
      null,
      Validators.compose([Validators.minLength(11), Validators.maxLength(15)]),
    ],
    occupation: [null],
    address: [null],
    nationality: [null],
    countryOfResidence: [null],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ContactApiService
  ) {
    if (this.data) {
      this.contactForm.patchValue({
        firstName: this.data.record ? this.data.record.firstName : null,
        lastName: this.data.record ? this.data.record.lastName : null,
        otherName: this.data.record ? this.data.record.otherName : null,
        dateOfBirth: this.data.record ? this.data.record.dateOfBirth : null,
        gender: this.data.record ? this.data.record.gender : null,
        phoneNo: this.data.record ? this.data.record.phoneNo : null,
        occupation: this.data.record ? this.data.record.occupation : null,
        address: this.data.record ? this.data.record.address : null,
        nationality: this.data.record ? this.data.record.nationality : null,
        countryOfResidence: this.data.record ? this.data.record.countryOfResidence : null,
      });
    }
  }

  onSubmit(): void {
    if (this.data && this.data.record) {
      this.apiService
        .updateContact(this.contactForm.getRawValue(), this.data.record.id)
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
