// ✅ First, define the interface (NO @Injectable here)
export interface EmergencyResponse {
  // emergency: {
  //   id: number;
  //   description: string;
  //   status: string;
  //   latitude: number;
  //   longitude: number;
  //   locationDescription?: string;
  //   reportedAt: string;
  //   respondedAt?: string;
  //   completedAt?: string;
  // };
  // reporter?: {
  //   name: string;
  //   email: string;
  // };
  // driver?: {
  //   name: string;
  // };
  // car?: {
  //   plateNumber: string;
  // };

  emergency: {
    id: number;
    description: string;
    status: string;
    latitude: number;
    longitude: number;
    locationDescription?: string;
    reportedAt: string;
    respondedAt?: string;
    completedAt?: string;
  };
  reporter?: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
  };
  driver?: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
  };
  car?: {
    plateNumber: string;
  };


}

// ✅ Then define the service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personel } from './personel';

@Injectable({
  providedIn: 'root'
})
export class Emergency {
  private url = `http://localhost:8080/emergencies`;

  constructor(private http: HttpClient, private PersonelService: Personel) {}

  getAllEmergency(): Observable<EmergencyResponse[]> {
    return this.http.get<EmergencyResponse[]>(this.url);
  }

  addEmergency(body: any): Observable<any> {
    return this.http.post(this.url, body);
  }

  getEmergencyById(id: any): Observable<EmergencyResponse> {
    return this.http.get<EmergencyResponse>(`${this.url}/${id}`);
  }

  update(body: any, id: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, body);
  }

//   updateEmergency(id: number, data: any): Observable<any> {
//   return this.http.put(`${this.url}/${id}`, data);
// }

  deleteEmergency(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  assignDriverToEmergency(emergencyId: number, driverId: number): Observable<any> {
  return this.http.put(`${this.url}/${emergencyId}/assign/${driverId}`, {});
}
getAvailableDrivers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/drivers/available`);
}

// assignDriverToEmergency(emergencyId: number, driverId: number, dispatcherId: number): Observable<any> {
//   return this.http.post(`${this.url}/${emergencyId}/assign/${driverId}/${dispatcherId}`, {});
// }

respondToEmergency(emergencyId: number, driverId: number, accepted: boolean): Observable<any> {
  return this.http.post(`${this.url}/${emergencyId}/driver-response/${driverId}?accepted=${accepted}`, {});
}


}
