import { LoadingService } from './../../../core/loader/loading.service';
import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location  } from '@angular/common';
import { Platform } from '@ionic/angular';

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
    private platform: Platform,
    private location: Location) { 
      this.platform.backButton.subscribe(()=>{
        this.location.back();
      });
    }


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
