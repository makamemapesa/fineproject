import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Emergency } from '../../../services/emergency';
import { MatDialog } from '@angular/material/dialog';
import { ViewEmergency } from './view-emergency/view-emergency';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-emergencies',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './emergencies.html',
  styleUrls: ['./emergencies.css']
})
export class EmergenciesComponent {
   emergencies: any;
  private sound: Howl;
  private initialLoad = true;
  private playingSound: number | undefined;

  constructor(
    private EmergencyService: Emergency,
    private dialog: MatDialog
  ) {
    this.sound = new Howl({
      src: ['assets/alarm.mp3'],
      autoplay: false,
    });
  }

  ngOnInit() {
    this.getEmergencies();
    setInterval(() => {
      this.getEmergencies();
    }, 5000);
  }

  getEmergencies() {
    this.EmergencyService.getAllEmergency().subscribe(response => {
      if (!this.initialLoad && response.length > this.emergencies.length) {
        this.playingSound = this.sound.play();
      }
      this.emergencies = response;
      this.initialLoad = false;
    });
  }

  viewEmergency(emergency: any) {
    if (this.playingSound) {
      this.sound.stop(this.playingSound);
      this.playingSound = undefined;
    }
    this.openEmergencyDialog(emergency);
  }

  openEmergencyDialog(emergency: any) {
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
