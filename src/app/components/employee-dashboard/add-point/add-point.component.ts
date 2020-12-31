import { Component, OnInit } from '@angular/core';
import { PointsService } from 'src/app/services/points.service';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css']
})
export class AddPointComponent implements OnInit {

  name = ""
  npm = ""

  constructor(private pointService : PointsService) { }

  ngOnInit(): void {
  }

}