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
   emergencies: any;

  constructor(
    private EmergencyService: Emergency,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmergencies();
  }

  getEmergencies() {
    this.EmergencyService.getAllEmergency().subscribe(response => {
      this.emergencies = response;
    });
  }

  viewEmergency(emergency: any) {
    const dialogRef = this.dialog.open(ViewEmergency, {
      width: '800px',
      data: { id: emergency.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmergencies();
      }
    });
  }

  deleteEmergency(emergency: any) {
    this.EmergencyService.deleteEmergency(emergency.id).subscribe(() => {
      this.getEmergencies();
    });
  }

  }