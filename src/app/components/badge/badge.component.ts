import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { badgeWays, odznaka } from 'src/app/interfaces';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  loaded = false
  type : string
  badgeData
  badgeWays = new MatTableDataSource([])
  displayedColumns = ['date', 'acquired', 'pointsOverflow']
  required : number = 0
  sum : number = 0

  constructor(private route: ActivatedRoute, private badgeService: BadgeService) { 
    this.type = this.route.snapshot.paramMap.get('name');
  }

  async ngOnInit() {
    this.badgeData = await this.badgeService.getBadge(this.type).toPromise()
    this.badgeData = this.badgeData[0]
    this.badgeWays.data = await this.badgeService.getBadgeWays(this.badgeData.ID).toPromise()
    this.required = this.badgeData.Punkty_wymagane

    this.sumPoints()

    this.loaded = true

  }

  sumPoints(){
    this.badgeWays.data.forEach(d => {
      this.sum += parseInt(d.Przyznane)
    })
  }

  get parseZdobyta(){
    return this.badgeData.Zdobyta == true ? "Zrealizowana" : "Realizowana"
  }

  parseDate(date : Date){
    date = new Date(date)
    let weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

    let months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja',
      'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października',
      'Listopada', 'Grudnia']

    let weekDay = weekDays[date.getDay()]
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return weekDay + ' ' + day + ' ' + month + ' ' + year
  }

}
