import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { odcinek } from '../interfaces';

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

  searchForSegment(searchPoints: string, searchName: string){
    return this.http.post<Array<odcinek>>('/api/segments/search', {points : searchPoints, names : searchName})
  }

  editSegment(segmentData : odcinek){
    return this.http.post<status>(`/api/segment/${segmentData.ID}`, segmentData)
  }

  deleteSegment(segmentID : number){
    return this.http.delete<status>(`/api/segment/${segmentID}`)
  }

}
