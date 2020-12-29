import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { odznaka } from 'src/app/interfaces';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  loaded = false
  type : string
  badgeData : odznaka

  constructor(private route: ActivatedRoute, private badgeService: BadgeService) { 
    this.type = this.route.snapshot.paramMap.get('name');
    console.log(this.type)
  }

  async ngOnInit() {
    this.badgeData = await this.badgeService.getBadge(this.type).toPromise()
    this.badgeData = this.badgeData[0]
    console.log(this.badgeData)
    this.loaded = true
  }

}
