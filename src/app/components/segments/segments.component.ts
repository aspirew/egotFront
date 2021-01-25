import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { teren } from 'src/app/interfaces';
import { AreasService } from 'src/app/services/areas.service';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css']
})
export class SegmentsComponent implements OnInit {

  name = ""
  areas : Array<teren> = [undefined]
  selectedArea : teren
  points = ""
  pointsMin : number
  pointsMax : number
  lengthMin : number
  lengthMax : number
  segments = new MatTableDataSource([])
  displayedColumns = ['name', 'begin', 'end', 'area', 'points', 'length']
  loaded = false

  constructor(private areaService : AreasService, private segmentService : SegmentService) { }

  async ngOnInit() {
    this.areas.push(...await this.areaService.getAllAreas().toPromise())
    this.loaded = true
  }

  async search(){
    this.loaded = false;
    this.segments.data = await this.segmentService.searchForSegment(this.name, this.points, this.selectedArea?.ID, this.pointsMin,
      this.pointsMax, this.lengthMin, this.lengthMax).toPromise()
    this.loaded = true;
  }

}
