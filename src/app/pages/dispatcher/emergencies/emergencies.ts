// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-emergencies',
//   imports: [RouterModule],
//   templateUrl: './emergencies.html',
//   styleUrl: './emergencies.css'
// })
// export class Emergencies {

// }
// emergency.component.ts
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Emergency {
  id: number;
  description: string;
  status: string;
  latitude: number;
  longitude: number;
  locationDescription?: string;
  reportedAt: string;
  respondedAt?: string;
  completedAt?: string;
  driverId?: number;
  dispatcher?: number;
  reporter: {
    name: string;
    email: string;
  };
  driver?: {
    name: string;
  };
}

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './emergencies.html',
  styleUrls: ['./emergencies.css']
})
export class Emergencies {
  emergencies: Emergency[] = [
    {
      id: 1,
      description: 'Fire at school dormitory',
      status: 'PENDING',
      latitude: -6.1659,
      longitude: 39.2026,
      locationDescription: 'Dorm B, Floor 2',
      reportedAt: new Date().toISOString(),
      reporter: { name: 'Ali Musa', email: 'ali@gmail.com' },
      driver: { name: 'John Mushi' }
    },
    {
      id: 2,
      description: 'Market fire emergency',
      status: 'ACTIVE',
      latitude: -6.1700,
      longitude: 39.2100,
      reportedAt: new Date().toISOString(),
      reporter: { name: 'Zuwena Rashid', email: 'zuwena@gmail.com' },
      driver: { name: 'Fatma Abdalla' }
    },
    {
      id: 3,
      description: 'Completed bush fire case',
      status: 'COMPLETED',
      latitude: -6.1720,
      longitude: 39.2000,
      reportedAt: new Date().toISOString(),
      reporter: { name: 'Mohamed Salum', email: 'moha@gmail.com' },
      driver: { name: 'Salum Juma' },
      completedAt: new Date().toISOString()
    }
  ];

  filteredStatus = 'ALL';
  selectedEmergency: Emergency | null = null;

  get filteredEmergencies(): Emergency[] {
    if (this.filteredStatus === 'ALL') return this.emergencies;
    return this.emergencies.filter(e => e.status === this.filteredStatus);
  }

  setStatusFilter(status: string) {
    this.filteredStatus = status;
    this.selectedEmergency = null;
  }

  viewDetails(emergency: Emergency) {
    this.selectedEmergency = emergency;
  }

  closeDetails() {
    this.selectedEmergency = null;
  }
}