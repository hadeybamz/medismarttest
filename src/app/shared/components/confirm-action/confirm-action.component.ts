import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
})
export class ConfirmActionComponent implements OnInit {
  @Input() title: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.dialogRef.close({ confirmed: true });
  }
}
