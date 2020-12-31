import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { punkt } from 'src/app/interfaces';
import { PointsService } from 'src/app/services/points.service';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.component.html',
  styleUrls: ['./edit-point.component.css']
})
export class EditPointComponent implements OnInit {

  points = new MatTableDataSource([])
  displayedColumns = ['name', 'npm']
  npm : number
  newName = ""
  loaded = false
  selectedPoint : punkt
  pointSearch = ""

  constructor(private pointService: PointsService) { }

  ngOnInit(): void {
    this.loaded = true
  }

  async search(){
    this.loaded = false
    this.points.data = await this.pointService.searchForPoints(this.pointSearch).toPromise()
    this.loaded = true
  }

  async save(){
    const newPoint : punkt = {
      ID : this.selectedPoint.ID,
      Nazwa : this.newName,
      Pracownik_PTTK : null,
      Wysokosc_npm : this.npm
    }
    const sure = confirm("Czy na pewno chcesz wykonać tą akcję?")
    if(sure){
      const res = await this.pointService.editPoint(this.selectedPoint.ID, newPoint).toPromise()
      alert(res.message)
    }
  }

  async delete(){
    const sure = confirm("Czy na pewno chcesz wykonać tą akcję?")
    if(sure){
      const res = await this.pointService.deletePoint(this.selectedPoint.ID).toPromise()
      alert(res.message)
    }
  }

}
