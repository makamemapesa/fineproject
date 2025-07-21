import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddPersonnel } from '../../personnel/add-personnel/add-personnel';
import { Personel } from '../../../../services/personel';
import { Vehicles } from '../../../../services/vehicles';
import { Emergency } from '../../../../services/emergency';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-emergency',
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
export class ViewEmergency {

 
  EmergencyForm!: FormGroup;
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  constructor(
    private dialogRef: MatDialogRef<AddPersonnel>,
    private personnelService: Personel,
    private vehicleService: Vehicles,
    private EmergencyService: Emergency,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log('Data received in dialog:', this.data)
    this.configForm();
    this.getEmergencyById();
    if(this.data){
      this.EmergencyForm.patchValue(this.data);
    }
  }

  configForm() {
    this.EmergencyForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      status: new FormControl('ACTIVE'),
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(new Date().toLocaleTimeString(), [Validators.required]),

      licenseNumber: new FormControl('', [Validators.required]),
      plateNumber: new FormControl('', [Validators.required]),
    });
  }

  getEmergencyById() {
  if (!this.data?.id) {
    console.error('Missing ID in data');
    return;
  }

  this.EmergencyService.getEmergencyById(this.data.id).subscribe({
    next: (response) => {
      this.options = [response]; // wrap in array if options is array
      this.filteredOptions = this.EmergencyForm.get('vehicleId')!.valueChanges.pipe(
        // startWith(''),
        // map(value => this._filter(value || ''))
      );
    },
    error: (error) => {
      console.error('Error fetching emergency by ID:', error);
    }
  });
}



  // getEmergencies() {
  //   this.EmergencyService.getEmergencyById(this.data.id).subscribe(response => {
  //     this.options = response;
  //     this.filteredOptions = this.EmergencyForm.get('vehicleId')!.valueChanges.pipe(
  //     // startWith(''),
  //     // map(value => this._filter(value || '')),
  //   );
  //   }, error => {
  //     console.error('Error fetching vehicles', error);
  //   });
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.plateNumber.toLowerCase().includes(filterValue));
  // }

  // displayFn(car: any): string {
  //   return car && car.plateNumber ? car.plateNumber : '';
  // }

  // addDriver() {
  //   if (this.driverForm.valid) {
  //     this.driverForm.patchValue({
  //       carId: this.driverForm.get('carId')?.value.id
  //     });
  //     this.personnelService.addDriver(this.driverForm.value).subscribe(response=>{
  //       console.log('Driver added successfully', response);
  //       this.dialogRef.close(true); // Close the dialog and return true
  //     })
  //     this.driverForm.reset(); // Reset the form after submission
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

  update(){
    if (this.EmergencyForm.valid) {
      this.EmergencyForm.patchValue({
        carId: this.EmergencyForm.get('carId')?.value.id
      });
      this.personnelService.update(this.EmergencyForm.value,this.data.id).subscribe(response=>{
        console.log('Emergency updated successfully', response);
        this.dialogRef.close(true); // Close the dialog and return true
      })
      this.EmergencyForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is invalid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}


