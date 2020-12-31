import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { punkt, status } from '../interfaces';

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

  addPoint(name : string, npm : number){
    return this.http.post<status>('/api/point', {name : name, npm : npm})
  }

  editPoint(id: number, newPointData : punkt){
    return this.http.post<status>(`/api/point/${id}`, {newPointData})
  }

  deletePoint(id : number){
    return this.http.delete<status>(`/api/point/${id}`)
  }

  searchForPoints(name : string){
    return this.http.post<Array<punkt>>('/api/points/search', {name})
  }
}
