import { Component, OnInit } from '@angular/core';
import { PointsService } from 'src/app/services/points.service';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css']
})
export class AddPointComponent implements OnInit {

  name : string
  npm : number

  constructor(private pointService : PointsService) { }

  ngOnInit(): void {
  }

  async savePoint(){
    const sure = confirm("Czy na pewno chcesz wykonać tą operację?")

    if(sure){
      const res = await this.pointService.addPoint(this.name, this.npm).toPromise()
      alert(res.message)
    }
  }

}
