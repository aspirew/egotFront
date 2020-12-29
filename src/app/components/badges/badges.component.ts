import { Component, OnInit } from '@angular/core';
import { odznaka } from 'src/app/interfaces';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  loaded = false
  availableBadges : Array<odznaka>
  allBadges = [
    {
      name : 'popularna',
      available : true
  },
     {name : 'brązowa',
    available : false},
    { 
      name: 'srebrna',
      available : false
    },
    {
      name : 'złota',
      available :  false
    } 
  ]

  constructor(private badgeService: BadgeService) { }

  async ngOnInit() {
    this.availableBadges = await this.badgeService.getAvailableBadges()

    const ranks = [] 

    for (const badge of this.availableBadges){
      console.log(badge)
      ranks.push((await this.badgeService.getBadgeRank(badge.Stopien).toPromise())[0].Nazwa)
    }

    this.allBadges = this.allBadges.map(b => {
      if(ranks.includes(b.name)) return {name : b.name, available : true}
      else return {name : b.name, available : false}
    })

    this.loaded = true

  }
}
