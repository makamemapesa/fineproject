import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Personel {
  url = `http://localhost:8080/driver`
  constructor(private http: HttpClient) { }

  getAllDriver():Observable<any>{
    return this.http.get(this.url);
  }

  addDriver(body: any):Observable<any>{
    return this.http.post(this.url,body)
  }

  getDriverById(id: any):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  update(body: any,id: any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body);
  }

  deleteDriver(id: any):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
