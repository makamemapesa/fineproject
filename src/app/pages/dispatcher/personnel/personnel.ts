import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Personel } from '../../../services/personel';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonnel } from './add-personnel/add-personnel';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './personnel.html',
  styleUrls: ['./personnel.css']
})
export class PersonnelComponent {
  drivers: any;
  constructor(
    private pasonnelService: Personel,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.getDriver();
  }

  getDriver(){
    this.pasonnelService.getAllDriver().subscribe(response=>{
      this.drivers = response;
    })
  }

  addDriver() {
    const dialogRef = this.dialog.open(AddPersonnel, {
      width: '800px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDriver(); // Refresh the driver list after adding a new driver
      }
    });
  }

  updateDriver(personnel: any) {
    const dialogRef = this.dialog.open(AddPersonnel, {
      width: '800px',
      data: personnel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDriver(); // Refresh the driver list after adding a new driver
      }
    });
  }

  deleteDriver(personnel: any) {
    this.pasonnelService.deleteDriver(personnel.id).subscribe(response => {
      this.getDriver(); // Refresh the driver list after deletion
    });
  }
}
