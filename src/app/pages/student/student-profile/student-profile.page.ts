import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentProfileService } from 'src/app/services/student/student-profile.service';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { AlertService } from 'src/app/core/alert/alert.service';

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
    private router: Router,
    private profileService: StudentProfileService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.currentview = "office";
    this.getProfile();
    this.getUserProfileImage();
  }

  /* Navigation */

  showOfficeView() {
    this.currentview = "office";
  }

  showPersonalView() {
    this.currentview = "personal";
  }

  GoToHome(){
    this.router.navigate(['student-tab/tabs/studentHome']);
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
