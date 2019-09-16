import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeProfileService } from '../../../services/employee/employee-profile.service';
import { LoadingService } from '../../../core/loader/loading.service';
import { AlertService } from '../../../core/alert/alert.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {

  public employeeProfile: any;
  public errorMsg: any;
  public userImage: string = null;
  public currentview: string;
  dd: any;

  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  
  constructor(
    private router: Router,
    private profileService: EmployeeProfileService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private commonService: CommonService
  ) {
   }

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

  // GoToHome(){
  //   this.router.navigate(['employee-tab/tabs/employeeHome']);
  // }

  viewChanged(segmentEvent) {
    let event = JSON.stringify(segmentEvent);
    this.currentview = "personal";
  }

  getProfile() {
    this.profileService.getEmployeeProfile().subscribe(res => {
      this.employeeProfile = res.Data;
    },
      error => {
        this.alertService.alertError("Something went wrong");
      });
  }

  getUserProfileImage() {
    this.commonService.getImage().subscribe(res => {
      this.userImage = res;
    })
  }

  doRefresh(event){
    this.getProfile();
    this.getUserProfileImage();
    event.target.complete();
  }


}
