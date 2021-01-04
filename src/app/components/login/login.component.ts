import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user : UserService, private router : Router) { 
    user.logUserIn().subscribe(res => {
      if(res.success)
        router.navigate(['/'])
      else
        alert("Błąd połączenia z serwerem, spróbuj ponownie")
    })
  }

  ngOnInit(): void {
  }

}
