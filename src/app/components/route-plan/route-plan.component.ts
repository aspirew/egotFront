import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { odcinekHR, punkt, simplePrzejscieOdcinka, simplePrzejscieOdcinkaExtended } from 'src/app/interfaces';
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
  points = new MatTableDataSource<punkt>([])
  loaded = false
  displayedColumnsPoints = ['name', 'npm']
  displayedColumnsSegments = ['name', 'begin', 'end', 'area', 'points', 'length']
  displayedColumnsPickedSegments = ['name', 'begin', 'end', 'direction', 'area', 'points', 'length']
  sum = 0
  possibleSegments = new MatTableDataSource<odcinekHR>([])
  currentSegments = new MatTableDataSource<simplePrzejscieOdcinkaExtended>([])
  routeName = ""

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private pointsService : PointsService, private segmentService : SegmentService,
    private routeService : RouteService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.points.data = await this.pointsService.getAllPoints().toPromise()
    this.loaded = true;
  }

  ngAfterViewInit() {
    this.points.paginator = this.paginator.toArray()[0];
    this.possibleSegments.paginator = this.paginator.toArray()[1];
    this.currentSegments.paginator = this.paginator.toArray()[2];
  }

  async selectInitialPoint(row : punkt){
    this.loaded = false;
    this.initialPoint = row
    this.currentPointName = row.Nazwa
    this.possibleSegments.data = await this.segmentService.searchForSegment("", this.initialPoint.Nazwa).toPromise()
    this.loaded = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    })
  }

  reset(){
    this.initialPoint = null
    this.possibleSegments.data = []
    this.currentSegments.data = []
    this.sum = 0
  }

  async selectSegment(row : odcinekHR){
    this.loaded = false

    if(this.currentSegments.data?.filter(e => e.Odcinek.ID == row.ID && e.Od_konca == (this.currentPointName == row.PPNazwa))?.length < 1)
       this.sum += this.currentPointName == row.PPNazwa ? row.Punktacja : row.PunktacjaOdKonca

    this.currentSegments.data.push({Odcinek : row, Od_konca : this.currentPointName == row.PPNazwa})

    this.currentPointName = this.currentPointName == row.PPNazwa ? row.PKNazwa : row.PPNazwa

    setTimeout(() =>{
      this.currentSegments.paginator = this.paginator.toArray()[2];
    })

    this.possibleSegments.data = await this.segmentService.searchForSegment("", this.currentPointName).toPromise()

    this.loaded = true
  }

  save(){
    this.routeService.saveRoute(
      this.currentSegments.data.map(a => JSON.parse(`{"Odcinek" : ${a.Odcinek.ID}, "Od_konca": ${!a.Od_konca}}`)),
      this.routeName,
      this.initialPoint.ID).subscribe(res => {
        this.openSnackBar(res.message, "Zamknij")
        this.reset()
    })
  }

  async deleteMostRecent(){

    this.loaded = false

    const deleted = this.currentSegments.data.pop()

    this.sum -= deleted.Od_konca ? deleted.Odcinek.Punktacja : deleted.Odcinek.PunktacjaOdKonca
    this.currentPointName = deleted.Od_konca ? deleted.Odcinek.PPNazwa : deleted.Odcinek.PKNazwa

    setTimeout(() =>{
      this.currentSegments.paginator = this.paginator.toArray()[2];
    })

    this.possibleSegments.data = await this.segmentService.searchForSegment(this.currentPointName, "").toPromise()

    this.loaded = true

  }

}
