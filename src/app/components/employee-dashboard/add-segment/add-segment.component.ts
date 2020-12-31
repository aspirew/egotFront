import { Component, OnInit } from '@angular/core';
import { odcinek, punkt, teren } from 'src/app/interfaces';
import { AreasService } from 'src/app/services/areas.service';
import { PointsService } from 'src/app/services/points.service';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})
export class AddSegmentComponent implements OnInit {

  constructor(private pointsService : PointsService, 
    private areaService : AreasService, 
    private segmentService : SegmentService) { }

  loaded = false
  name = ""
  allPoints : Array<punkt> = []
  boundPoints : Array<punkt> = []
  allAreas : Array<teren> = []
  initialPoint : punkt
  boundPoint : punkt
  selectedArea : teren
  length : number
  points1 : number
  points2 : number

  async ngOnInit() {
    this.allPoints = await this.pointsService.getAllPoints().toPromise()
    this.allAreas = await this.areaService.getAllAreas().toPromise()
    if(Object.keys(this.allAreas).length === 0 && this.allAreas.constructor === Object) alert("Błąd połączenia z bazą danych")
    this.loaded = true
  }

  async changeOfInitialPoint(event){
    this.boundPoints = []
    this.boundPoint = null
    this.boundPoints = this.allPoints.filter(e => e != this.initialPoint)
  }

  async saveSegment(){
    if(this.name == "" || 
    this.initialPoint == null || 
    this.boundPoint == null || 
    this.selectedArea == null || 
    this.length == undefined || 
    this.points1 == undefined ||
    this.points2 == undefined){
      alert("Niektóre pola nie są wypełnione")
      return
    }

    const sure = confirm("Czy jesteś pewien?")

    if(sure){

      const newSegment : odcinek = {
        ID : null,
        Nazwa : this.name,
        PunktPoczatkowy : this.initialPoint.ID,
        PunktKoncowy : this.boundPoint.ID,
        Teren : this.selectedArea.ID,
        Dlugosc : this.length,
        Punktacja : this.points1,
        PunktacjaOdKonca : this.points2
      }  

      const add = await this.segmentService.addNewSegment(newSegment).toPromise()
      alert(add.message)

  }

  }

}
