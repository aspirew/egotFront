import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teren } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  getAllAreas(){
    return this.http.get<Array<teren>>('/api/areas')
  }
}
