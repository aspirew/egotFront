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
      available : true,
      filename: 'popularna_alpha.png'
  },
     {
    name : 'brązowa',
    available : false,
    filename: 'brązowa_alpha.png'
  },
    
    { 
      name: 'srebrna',
      available : false,
      filename: 'srebrna_alpha.png'
    },
    {
      name : 'złota',
      available :  false,
      filename: 'złota_alpha.png'
    } 
  ]

  constructor(private badgeService: BadgeService) { }

  async ngOnInit() {
    this.availableBadges = await this.badgeService.getAvailableBadges()

    if(this.availableBadges[0] == undefined){
      alert("Jakimś sposobem nie masz żadnych odznak (albo wywaliło serwer). Spróbuj wejść na stronę główną i spróbować ponownie.")
    }

    const ranks = [] 

    for (const badge of this.availableBadges){
      ranks.push((await this.badgeService.getBadgeRank(badge.Stopien).toPromise())[0].Nazwa)
    }

    this.allBadges = this.allBadges.map(b => {
      if(ranks.includes(b.name)) return {name : b.name, available : true, filename: b.filename}
      else return {name : b.name, available : false, filename: b.filename}
    })

    this.loaded = true

  }
}
