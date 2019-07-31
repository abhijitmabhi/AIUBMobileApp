import { LoginService } from 'src/app/services/login/login.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/localNotification/notification.service';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.page.html',
  styleUrls: ['./employee-menu.page.scss'],
})
export class EmployeeMenuPage implements OnInit {

  private playerId:any;

  constructor(private router:Router,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private localNotification: NotificationService) {}


  ngOnInit() {
    this.playerId = localStorage.getItem('playerId');
  }

  logout(){
    // this.loadingService.loadingStart();
    this.loginService.logMeOut(this.playerId).subscribe(res => {
      localStorage.clear();
      // this.loadingService.loadingDismiss();
      this.router.navigate(['']);
    });
  }

  // showNotification(){
  //   this.localNotification.showNotification();
  // }

  // redirectToFeedback(){
  //   this.router.navigate(['user-feedback']);
  // }

}
