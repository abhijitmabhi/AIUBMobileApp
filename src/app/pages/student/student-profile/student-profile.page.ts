import { Component, OnInit } from '@angular/core';
import { StudentProfileService } from '../../../services/student/student-profile.service';
import { LoadingService } from '../../../core/loader/loading.service';
import { AlertService } from '../../../core/alert/alert.service';

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
    private alertService: AlertService
  ) {}

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
