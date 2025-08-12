import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Personel } from '../../../../services/personel';
import { Emergency } from '../../../../services/emergency';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-emergency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './view-emergency.html',
  styleUrl: './view-emergency.css'
})
export class ViewEmergency {
  emergencyDetails: any;
  editingAssignment = false;

  driverControl = new FormControl();
  drivers: any[] = [];
  filteredDrivers$!: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<ViewEmergency>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emergencyService: Emergency,
    private personelService: Personel,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmergencyDetails();
    this.loadDrivers();
  }

  loadEmergencyDetails() {
    this.emergencyService.getEmergencyById(this.data.id).subscribe(response => {
      this.emergencyDetails = response;

      if (response.driver) {
        this.driverControl.setValue(response.driver);
      }
    });
  }

  loadDrivers() {
    this.personelService.getAllDriver().subscribe(drivers => {
      this.drivers = drivers;
      this.filteredDrivers$ = this.driverControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const search = typeof value === 'string'
            ? value.toLowerCase()
            : `${value?.firstName || ''} ${value?.middleName || ''} ${value?.lastName || ''}`.toLowerCase();
          return this.drivers.filter(driver =>
            `${driver.firstName} ${driver.middleName} ${driver.lastName}`.toLowerCase().includes(search)
          );
        })
      );
    });
  }

  displayDriverFn(driver: any): string {
    return driver ? `${driver.firstName} ${driver.middleName} ${driver.lastName}` : '';
  }

  startEditAssignment() {
    this.editingAssignment = true;
  }

  assignDriver() {
    const selected = this.driverControl.value;
    if (selected && selected.id) {
      this.emergencyService.assignDriverToEmergency(this.data.id, selected.id).subscribe({
        next: () => {
          this.editingAssignment = false;
          this.loadEmergencyDetails();
        },
        error: err => console.error('Error assigning driver:', err)
      });
    }
  }

  viewOnMap() {
    this.router.navigate(['/dashboard/location'], {
      queryParams: {
        latitude: this.emergencyDetails.latitude,
        longitude: this.emergencyDetails.longitude
      }
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
