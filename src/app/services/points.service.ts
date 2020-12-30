import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { punkt } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http : HttpClient) { }

  getAllPoints(){
    return this.http.get<Array<punkt>>('/api/points')
  }

  getAllPointsInArea(areaID : number){
    return this.http.get<Array<punkt>>(`/api/area/${areaID}/points`)
  }

  getAllBoundPoints(id : number){
    return this.http.get<Array<punkt>>(`/api/point/${id}/bounds`)
  }
}
