import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Emergency } from '../../../services/emergency';
import { MatDialog } from '@angular/material/dialog';
import { ViewEmergency } from './view-emergency/view-emergency';

@Component({
  selector: 'app-emergencies',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './emergencies.html',
  styleUrls: ['./emergencies.css']
})
export class EmergenciesComponent {
   drivers: any;
   emergencies: any; // Add this line to declare the emergencies property

    constructor(
      private EmergencyService: Emergency,
      private dialog: MatDialog
    ){}
  
    ngOnInit(){
      this.getEmergencies();
    }

    getEmergencies(){
      this.EmergencyService.getAllEmergency().subscribe(response=>{
        this.emergencies = response;
      })
    }


  
    // addEmergency() {
    //   const dialogRef = this.dialog.open(AddEmergency, {
    //     width: '800px',
    //     data: null
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.getEmergencies(); // Refresh the emergency list after adding a new emergency
    //     }
    //   });
    // }

    updateEmergency(emergency: any) {
      const dialogRef = this.dialog.open(ViewEmergency, {
        width: '800px',
        data: emergency
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getEmergencies(); // Refresh the emergency list after adding a new emergency
        }
      });
     }

    deleteEmergency(emergency: any) {
      this.EmergencyService.deleteEmergency(emergency.id).subscribe(response => {
        this.getEmergencies(); // Refresh the emergency list after deletion
      });
    }

  }