import { LoadingService } from './../../../core/loader/loading.service';
import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/dataService/data-service.service';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.page.html',
  styleUrls: ['./student-menu.page.scss'],
})
export class StudentMenuPage implements OnInit {

  private playerId:any;

  constructor(private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private dataService: DataService
    ) { }

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

}
