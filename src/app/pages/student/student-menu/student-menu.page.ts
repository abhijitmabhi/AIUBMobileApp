import { LoadingService } from './../../../core/loader/loading.service';
import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from 'src/app/core/oneSignal/push-notification.service';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.page.html',
  styleUrls: ['./student-menu.page.scss'],
})
export class StudentMenuPage implements OnInit {

  private playerId:any;

  constructor(private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.playerId = localStorage.getItem('playerId');
  }

  logout(){
    this.loadingService.loadingStart();
    this.loginService.logMeOut(this.playerId).subscribe(res => {
      localStorage.clear();
      this.loadingService.loadingDismiss();
      this.router.navigate(['']);
    });
  }

}
