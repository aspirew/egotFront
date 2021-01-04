import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private pointService: PointsService, private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.loaded = true
  }

  async search(){
    this.loaded = false
    this.points.data = await this.pointService.searchForPoints(this.pointSearch).toPromise()
    console.log(this.points.data)
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
      this._snackBar.open(res.message, "Zamknij", {
        duration: 2000,
      })
      this.search()
    }
  }

  async delete(){
    const sure = confirm("Czy na pewno chcesz wykonać tą akcję?")
    if(sure){
      const res = await this.pointService.deletePoint(this.selectedPoint.ID).toPromise()
      alert(res.message)
      this.search()
    }
  }

  select(row: punkt){
    if(this.selectedPoint != row)
      this.selectedPoint = row       
    else
      this.selectedPoint = null

    this.newName = this.selectedPoint?.Nazwa
    this.npm = this.selectedPoint?.Wysokosc_npm
  }

}
