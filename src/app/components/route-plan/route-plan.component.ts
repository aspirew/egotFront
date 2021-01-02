import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { odcinek, odcinekHR, punkt } from 'src/app/interfaces';
import { PointsService } from 'src/app/services/points.service';
import { RouteService } from 'src/app/services/route.service';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-route-plan',
  templateUrl: './route-plan.component.html',
  styleUrls: ['./route-plan.component.css']
})
export class RoutePlanComponent implements OnInit {

  initialPoint : punkt
  currentPointName : string
  points = new MatTableDataSource([])
  loaded = false
  displayedColumnsPoints = ['name', 'npm']
  displayedColumnsSegments = ['name', 'begin', 'end', 'area', 'points', 'length']
  sum = 0
  possibleSegments = new MatTableDataSource([])
  currentSegments = new MatTableDataSource([])

  constructor(private pointsService : PointsService, private segmentService : SegmentService,
    private routeService : RouteService) { }

  async ngOnInit() {
    this.points.data = await this.pointsService.getAllPoints().toPromise()
    this.loaded = true;
  }

  async selectInitialPoint(row : punkt){
    this.loaded = false;
    this.initialPoint = row
    this.currentPointName = row.Nazwa
    this.possibleSegments.data = await this.segmentService.searchForSegment(this.initialPoint.Nazwa, null).toPromise()
    this.loaded = true;
  }

  reset(){
    this.initialPoint = null
    this.possibleSegments.data = null
    this.currentSegments.data = null
  }

  async selectSegment(row : odcinekHR){
    this.loaded = false
    this.currentSegments.data.push(row)

    this.currentPointName = this.currentPointName == row.PPNazwa ? row.PKNazwa : row.PPNazwa
    console.log(this.currentPointName)
    this.possibleSegments.data = null
    this.possibleSegments.data = await this.segmentService.searchForSegment(this.currentPointName, null).toPromise()
    


    this.loaded = true
  }

  save(){
    this.routeService.saveRoute(this.currentSegments.data).subscribe(res => {
      
    })
  }

}
