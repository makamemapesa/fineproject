// ✅ First, define the interface (NO @Injectable here)
export interface EmergencyResponse {
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
    name: string;
    email: string;
  };
  driver?: {
    name: string;
  };
  car?: {
    plateNumber: string;
  };
}

// ✅ Then define the service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Emergency {
  private url = `http://localhost:8080/emergencies`;

  constructor(private http: HttpClient) {}

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

  deleteEmergency(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
