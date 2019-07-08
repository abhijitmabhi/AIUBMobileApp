import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.page.html',
  styleUrls: ['./student-menu.page.scss'],
})
export class StudentMenuPage implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.loginService.logMeOut();
    this.router.navigate(['']);
  }

}
