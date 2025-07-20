import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddVehicles } from './add-vehicles/add-vehicles';    
import { Vehicles } from '../../../services/vehicles';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class VehiclesComponent  {
  cars: any;
    constructor(
      private vehiclesService: Vehicles,
      private dialog: MatDialog
    ){
    }
  
    ngOnInit(): void{
      this.getCars();
    }

    getCars(){
      this.vehiclesService.getAllCar().subscribe(response=>{
        this.cars = response;
      })
    }
  
    addCar() {
      const dialogRef = this.dialog.open(AddVehicles, {
        width: '400px',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getCars(); // Refresh the car list after adding a new car
        }
      });
    }

    updatecar(car: any) {
        const dialogRef = this.dialog.open(AddVehicles, {
          width: '800px',
          data: car
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.getCars(); // Refresh the driver list after adding a new driver
          }
        });
      }
    
      // deleteCar(car: any) {
      //   this.vehiclesService.deleteCar(car.id).subscribe(response => {
      //     this.getCars(); // Refresh the driver list after deletion
      //   });

}

