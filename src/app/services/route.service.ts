import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { odcinekHR, simplePrzejscieOdcinka, status } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http : HttpClient) { }

  saveRoute(route : Array<simplePrzejscieOdcinka>, routeName : string, initialPoint : number){
    console.log(route)
    console.log(routeName)
    console.log(initialPoint)
    return this.http.post<status>('/api/route/save', {route, routeName, initialPoint})
  }

}
