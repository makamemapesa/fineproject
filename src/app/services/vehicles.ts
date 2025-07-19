import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Vehicles {

  url = `http://localhost:8080/car`
  constructor(private http: HttpClient) { }

  getAllCar():Observable<any>{
    return this.http.get(this.url);
  }

  addCar(body: any):Observable<any>{
    return this.http.post(this.url,body)
  }

  getCarById(id: any):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  update(body: any,id: any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body);
  }

  deleteCarById(id: any):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
