import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from 'src/app/interfaces';

interface status {
  success : boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  logUserIn() {
    return this.http.get<status>('/api/loginUser')
  }

  logEmployeeIn(){
    return this.http.get<status>('/api/loginEmployee')
  }

  getData(){
    return this.http.get<userData>('/api/getLoggedInData')
  }

}
