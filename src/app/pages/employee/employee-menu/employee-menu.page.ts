import { LoginService } from '../../../services/login/login.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/localNotification/notification.service';
import { DataService } from '../../../core/dataService/data-service.service';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.page.html',
  styleUrls: ['./employee-menu.page.scss'],
})
export class EmployeeMenuPage implements OnInit {

  private playerId:any;

  constructor(private router:Router,
    private loginService: LoginService,
    private dataService:DataService,
    private loadingService: LoadingService,
    private localNotification: NotificationService) {}


  ngOnInit() {
    this.playerId = this.dataService.getPlayerId();
  }

  logout(){
    this.loginService.logMeOut(this.playerId).subscribe(res => {
      localStorage.clear();
      this.router.navigate(['']);
    },err =>{
      localStorage.clear();
      this.router.navigate(['']);
    });
  }

  redirectToFeedback(){
    this.router.navigate(['user-feedback']);
  }

  goToDepartmentLeaveCalendar(){
    this.router.navigate(["/employee-department-leave-calendar"]);
  }
}
