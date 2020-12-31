import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(public router : Router, private user : UserService) {
    this.user.logEmployeeIn().subscribe(res => {
      if(res.success)
        this.router.navigate(['/dashboard'])
      else
        alert("couldnt log in")
    })
  }

  async ngOnInit() {}

}
