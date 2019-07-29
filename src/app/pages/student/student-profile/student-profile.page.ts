import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StudentProfileService } from 'src/app/services/student/student-profile.service';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  public studentProfile: any;
  public errorMsg: any;
  public userImage: string = null;
  public currentview: string;

  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  
  constructor(
    private profileService: StudentProfileService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.backButton.subscribe(()=>{
      if(this.router.url == "/student-tab/tabs/studentHome"){
        navigator['app'].exitApp();
      }
    });
   }

  ngOnInit() {
    this.currentview = "academic";
    this.getProfile();
    this.getUserProfileImage();
  }

  /* Navigation */
  showAcademicView() {
    this.currentview = "academic";
  }

  showPersonalView() {
    this.currentview = "personal";
  }

  viewChanged(segmentEvent) {
    let event = JSON.stringify(segmentEvent);
    this.currentview = "personal";
  }

  getProfile() {
    this.loadingService.loadingStart();
    this.profileService.getEmployeeProfile().subscribe(res => {
      this.loadingService.loadingDismiss();
      this.studentProfile = res.Data;
    },
      error => {
        this.loadingService.loadingDismiss();
        this.alertService.alertError("Something went wrong");
      });
  }

  getUserProfileImage() {
    this.profileService.getImage().subscribe(res => {
      this.userImage = res;
    })
  }

  doRefresh(event){
    this.getProfile();
    this.getUserProfileImage();
    event.target.complete();
  }

}
