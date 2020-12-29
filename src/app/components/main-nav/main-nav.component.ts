import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn = false
  isEmployee = false
  userName = ""
  cart = 0

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public router: Router
    ) { }

    ngOnInit(){}

    async checkLoginState(event){
      const user = await this.userService.getData().toPromise()

      console.log(user)

      if(user.isLoggedIn){
          this.userName = user.username
          this.isLoggedIn = true
          this.isEmployee = user.isEmployee
        }
        else{
          this.userName = ""
          this.isLoggedIn = false
          this.isEmployee = false
        }
    }

}
