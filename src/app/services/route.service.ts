import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { odcinekHR } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http : HttpClient) { }

  saveRoute(route : Array<odcinekHR>){
    return this.http.post('/api/route/save', {route})
  }

}
