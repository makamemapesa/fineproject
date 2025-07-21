import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personel } from '../../../../services/personel';
import { Vehicles } from '../../../../services/vehicles';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-personnel',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  templateUrl: './add-personnel.html',
  styleUrl: './add-personnel.css'
})
export class AddPersonnel {
  driverForm!: FormGroup;
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  constructor(
    private dialogRef: MatDialogRef<AddPersonnel>,
    private personnelService: Personel,
    private vehicleService: Vehicles,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log('Data received in dialog:', this.data)
    this.configForm();
    this.getVehicles();
    if(this.data){
      this.driverForm.patchValue(this.data);
    }
  }

  configForm() {
    this.driverForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      carId: new FormControl('', [Validators.required]),
      status: new FormControl('ACTIVE'),
    });
  }

  getVehicles() {
    this.vehicleService.getAllCar().subscribe(response => {
      this.options = response;
      this.filteredOptions = this.driverForm.get('carId')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    }, error => {
      console.error('Error fetching vehicles', error);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.plateNumber.toLowerCase().includes(filterValue));
  }

  displayFn(car: any): string {
    return car && car.plateNumber ? car.plateNumber : '';
  }

  addDriver() {
    if (this.driverForm.valid) {
      this.driverForm.patchValue({
        carId: this.driverForm.get('carId')?.value.id
      });
      this.personnelService.addDriver(this.driverForm.value).subscribe(response=>{
        console.log('Driver added successfully', response);
        this.dialogRef.close(true); // Close the dialog and return true
      })
      this.driverForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is invalid');
    }
  }

  updateDriver(){
    if (this.driverForm.valid) {
      this.driverForm.patchValue({
        carId: this.driverForm.get('carId')?.value.id
      });
      this.personnelService.update(this.driverForm.value,this.data.id).subscribe(response=>{
        console.log('Driver updated successfully', response);
        this.dialogRef.close(true); // Close the dialog and return true
      })
      this.driverForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is invalid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
