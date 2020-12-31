import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { odcinek } from 'src/app/interfaces';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-edit-segment',
  templateUrl: './edit-segment.component.html',
  styleUrls: ['./edit-segment.component.css']
})
export class EditSegmentComponent implements OnInit {

  segments = new MatTableDataSource([])
  displayedColumns = ['name', 'begin', 'end', 'area', 'points', 'length']
  pointSearch = ""
  segmentSearch = ""
  loaded = true
  selectedSegment : odcinek = null
  name = ""
  p1 : number
  p2 : number


  constructor(private segmentService : SegmentService) { }

  ngOnInit() { }

  async search(){
    this.loaded = false
    this.segments.data = await this.segmentService.searchForSegment(this.pointSearch, this.segmentSearch).toPromise()
    this.loaded = true
  }

  
  select(row: odcinek){
    if(this.selectedSegment != row)
      this.selectedSegment = row
    else
      this.selectedSegment = null
  }

  async save(){
    const newSegment : odcinek = {
      ID : null,
      Nazwa : this.name,
      PunktPoczatkowy : null,
      PunktKoncowy : null,
      Teren : null,
      Dlugosc : null,
      Punktacja : this.p1,
      PunktacjaOdKonca : this.p2
    }
    const sure = confirm("Czy na pewno chcesz wykonać tą akcję?")
    if(sure){
      const res = await this.segmentService.editSegment(newSegment).toPromise()
      alert(res.message)
    }
  }

  async delete(){
    const sure = confirm("Czy na pewno chcesz wykonać tą akcję?")
    if(sure){
      const res = await this.segmentService.deleteSegment(this.selectedSegment.ID).toPromise()
      alert(res.message)
    }
  }

}
