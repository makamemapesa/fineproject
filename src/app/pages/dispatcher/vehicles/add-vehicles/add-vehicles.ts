import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Vehicles } from '../../../../services/vehicles';

@Component({
  selector: 'app-add-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,       // ✅ add this
    MatIconModule,       // ✅ add this
    MatButtonModule      // ✅ add this
  ],
  templateUrl: './add-vehicles.html',
  styleUrls: ['./add-vehicles.css']
})
export class AddVehicles {
  carForm!: FormGroup;
  cars: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddVehicles>,
    private vehicleService: Vehicles,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('Data received in dialog:', this.data);
    this.configForm();
    this.getVehicles();

    if (this.data) {
      this.carForm.patchValue(this.data);
    }
  }

  configForm() {
    this.carForm = new FormGroup({
      id: new FormControl(''),
      plateNumber: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      status: new FormControl('ACTIVE'),
    });
  }

  getVehicles() {
    this.vehicleService.getAllCar().subscribe((response: any[]) => {
      this.cars = response;
    }, error => {
      console.error('Error fetching vehicles', error);
    });
  }

  addCar() {
    if (this.carForm && this.carForm.valid) {
      this.vehicleService.addCar(this.carForm.value).subscribe(
        (response: any) => {
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.error('Error adding car', error);
        }
      );
      this.carForm.reset();
    }
  }

  updateCar() {
    if (this.carForm && this.carForm.valid) {
      this.vehicleService.update(this.carForm.value, this.data.id).subscribe(
        (response: any) => {
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.error('Error updating car', error);
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
