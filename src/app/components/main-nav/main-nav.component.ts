import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @HostBinding('class') className = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn = false
  isEmployee = false
  userName = ""
  cart = 0

  toggleControl = new FormControl(false);

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public router: Router,
    private overlay: OverlayContainer,
    private _snackBar : MatSnackBar
    ) { }

    ngOnInit(){
      this.toggleControl.valueChanges.subscribe((darkMode) => {
        const darkClassName = 'darkMode';
        this.className = darkMode ? darkClassName : '';
        if (darkMode) {
          this.overlay.getContainerElement().classList.add(darkClassName);
        } else {
          this.overlay.getContainerElement().classList.remove(darkClassName);
        }
      });
    }

    async checkLoginState(event){

      let user
      try{
        user = await this.userService.getData().toPromise()
      }
      catch {
        this._snackBar.open("Błąd połączenia z serwerem - dla poprawnego działania należy odświeżyć stronę", "Zamknij", {
          duration: 2000,
        })
      }

      if(user.isLoggedIn){
          this.userName = user.name
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
