import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.page.html',
  styleUrls: ['./employee-menu.page.scss'],
})
export class EmployeeMenuPage implements OnInit {

  constructor(private router:Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.loginService.logMeOut();
    this.router.navigate(['']);
  }

}
