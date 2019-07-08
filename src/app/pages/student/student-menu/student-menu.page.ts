import { LoadingService } from './../../../core/loader/loading.service';
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
    private loginService: LoginService,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  logout(){
    this.loadingService.loadingStart();
    this.loginService.logMeOut().subscribe(res => {
      localStorage.clear();
      this.loadingService.loadingDismiss();
      this.router.navigate(['']);
    });
  }

}
