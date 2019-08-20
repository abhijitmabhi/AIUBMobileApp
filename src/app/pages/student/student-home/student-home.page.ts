import { NotificationService } from './../../../services/notification/notification.service';
import { CommonService } from './../../../services/common/common.service';
import { StudentClassScheduleService } from './../../../services/student/student-class-schedule.service';
import { AlertService } from './../../../core/alert/alert.service';
import { PushNotificationService } from './../../../core/oneSignal/push-notification.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, Platform, AlertController } from '@ionic/angular';
import { StudentProfileService } from '../../../services/student/student-profile.service';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  
  panelOpenState = false;
  public isCollapsed = false;
  activeId = ['static-1', 'static-2'];

  RegistrationHideFlag = true;
  ScheduleHideFlag = true;s

  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;

  public schedule: any;
  playerID: any;
  semesterList: any;
  semesterData: any;

  nrSelect: any;
  invalidUserMessage: any;

   userImage: string = null;
   appUserInfo: any;
   notificationCount: number;
   classSchedules: any;
  profileImageLoaded: boolean = false;

   currentDateTime = new Date();
  subscription: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private datePipe: DatePipe,
    private pushNotification: PushNotificationService,
    private alertService: AlertService,
    private studentProfileService: StudentProfileService,
    private studentClassSceduleService: StudentClassScheduleService,
    private router: Router,
    private platform: Platform,
    private alertController: AlertController,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.pushNotification.getPlayerID();
    this.pushNotification.oneSignalSubscription();
    this.getSemesterList();
    this.getClassSchedule();
    this.getCurrentUserInfo();
    this.getUserProfileImage();
  }

  /* Student Profile Picture */

  getUserProfileImage() {
    this.studentProfileService.getImage().subscribe(response => {
      this.profileImageLoaded = true;
      this.userImage = response;
    })
  }

  /* Student Current Info */

  getCurrentUserInfo() {
    this.commonService.currentUserInfo().subscribe(res => {
      let result = res;
      if(result.HasError){
      }else{
        this.appUserInfo = result.Data;
        this.notificationCount = this.appUserInfo.UnReadNotificationCount;
      }
    })
  }

  /* Student Class Schedule */

  getClassSchedule() {
    let fromDateTime = this.datePipe.transform(this.currentDateTime,'yyyy-MM-dd HH:mm:ss.SSS');
    let toDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate()+1),'yyyy-MM-dd HH:mm:ss.SSS');
    // this.loadingService.loadingStart();
    this.studentClassSceduleService.getStudentClassSchedule(fromDateTime, toDateTime).subscribe(response => {
      // this.loadingService.loadingDismiss();
      let result = response;
      if(result.HasError){
        console.log(result.Messages);
      }else{
        this.classSchedules = result.Data;
      }
    },
      error => {
        // this.loadingService.loadingDismiss();
        let errorResponse = error;
        console.log(errorResponse.error.Message);
    });
  }

  /* Full Class Schedule */

  ShowClassSchedule(){
    this.router.navigate(['/student-class-schedule']);
  }

  /* Student Registration */
  
  getSemesterList(){
    this.commonService.semesterList().subscribe(semesterLists => {
      this.semesterList = semesterLists.Data;
      this.commonService.currentSemester().subscribe(currentSemester => {
        let currentSemesterId = currentSemester.Data.ID;
        let isCurrentSemesterEnrolled = false;
        this.semesterList.forEach(semester => {
          if(semester.ID === currentSemesterId){
            isCurrentSemesterEnrolled = true;
          }
        });
        if(isCurrentSemesterEnrolled){
          this.nrSelect = currentSemesterId;
        }else {
          this.nrSelect = this.semesterList[0].ID;
        }
        this.onChangeSemester();
      })
    });
    
  }

  /* Student Registraton Semester List Dropdown */

  onChangeSemester(){
    this.semesterData = null;
    if (this.nrSelect !== null && this.nrSelect !== undefined && this.nrSelect !== ""){
      this.commonService.registeredCoursesBySemester(this.nrSelect).subscribe(res => {
        this.semesterData = res.Data;
        console.log(this.semesterData);
      });
    }
  }

  /* Opne notification */

  openNotification() {
    this.notificationCount = 0;
    this.notificationService.seenAllNotifications().subscribe( res => {
    });
    this.router.navigate(['/notifications']);
  }

  /* Get Notes */

  openSectionNotes(sectionId: number){
    this.router.navigate(['student-notes', sectionId]);
  }

  /* Get Section Notice */

   openSectionNotice(sectionId: number){
    this.router.navigate(['student-notice', sectionId]);
  }

  ShowProfile(){}
  
}
