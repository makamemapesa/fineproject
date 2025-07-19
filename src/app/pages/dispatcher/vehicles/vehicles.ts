import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddVehicles } from './add-vehicles/add-vehicles';    
import { Vehicles } from '../../../services/vehicles';


@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class VehiclesComponent implements OnInit {
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

}
