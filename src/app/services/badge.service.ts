import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { badgeWays, odznaka, stopien } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private http: HttpClient) { }

  getBadge(type: string){
    return this.http.get<odznaka>(`/api/badge/${type}`)
  }

  getOngoingBadge(){
    return this.http.get<odznaka>(`/api/ongoingBadge`)
  }

  getCompletedBadges(){
    return this.http.get<Array<odznaka>>(`/api/completedBadges`)
  }

  getBadgeRank(id : Number){
    return this.http.get<stopien>(`/api/rank/${id}`)
  }

  async getAvailableBadges() : Promise<Array<odznaka>> {
    const availableBadges = await this.getCompletedBadges().toPromise()
    availableBadges.push((await this.getOngoingBadge().toPromise())[0])
    return availableBadges
  }

  getBadgeWays(id : number) {
    return this.http.get<Array<badgeWays>>(`/api/badge/${id}/ways`)
  }
}
