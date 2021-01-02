import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { odcinek, odcinekHR } from '../interfaces';

interface status {
  success : boolean,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  constructor(private http : HttpClient) { }

  addNewSegment(newSegment : odcinek){
    return this.http.post<status>('/api/segment/add', {newSegment})
  }

  searchForSegment(
    name : string,
    points : string,
    areaID : number = null,
    minPoints : number = null,
    maxPoints : number = null,
    minLen : number = null,
    maxLen : number = null){
      return this.http.post<Array<odcinekHR>>('/api/segments/search', {
        areaID : areaID,
        points : points,
        name : name,
        minPoints : minPoints,
        maxPoints : maxPoints,
        minLen : minLen,
        maxLen : maxLen
      })
    }

  editSegment(id: number, segmentData : odcinek){
    return this.http.post<status>(`/api/segment/${id}}`, segmentData)
  }

  deleteSegment(segmentID : number){
    return this.http.delete<status>(`/api/segment/${segmentID}`)
  }

}
