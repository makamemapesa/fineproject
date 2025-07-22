import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Personel } from '../../../../services/personel';
import { Vehicles } from '../../../../services/vehicles';
import { Emergency } from '../../../../services/emergency';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-emergency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './view-emergency.html',
  styleUrl: './view-emergency.css'
})
export class ViewEmergency  {
emergencyDetails: any;

  constructor(
    private dialogRef: MatDialogRef<ViewEmergency>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emergencyService: Emergency
  ) {}

  ngOnInit(): void {
    this.emergencyService.getEmergencyById(this.data.id).subscribe(response => {
      this.emergencyDetails = response;
    });
  }

  close() {
    this.dialogRef.close();
  }


 }
