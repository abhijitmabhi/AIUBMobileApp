import { EmployeeHomeService } from '../../../services/employee/employee-home.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { LoginService } from '../../../services/login/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from '../../../core/oneSignal/push-notification.service';
import { DatePipe } from '@angular/common';
import { LoadingService } from '../../../core/loader/loading.service';
import { CommonService } from '../../../services/common/common.service';
import { EmployeeProfileService } from '../../../services/employee/employee-profile.service';
import { ClassScheduleService } from '../../../services/employee/class-schedule.service';
import { ChartService } from '../../../services/employee/chart.service';
import { Chart } from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { from } from 'rxjs';
import { DataService } from 'src/app/core/dataService/data-service.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {
  //chart
  @ViewChild('horizontalBarChart', null) horizontalBarChart;
  @ViewChild('pieChart', null) pieChart;
  bars: any;

  public schedule: any;
  userInfo: any;
  userImage: string = null;
  appUserInfo: any;
  notificationCount: number;
  announcements: any;
  classSchedules: any;
  profileImageLoaded: boolean = false;
  semesterList: any;
  nrSelect: any;
  semesterData: any;
  oneWeekAttendanceData: any;
  leaveAllocationData: any;
  teacherFlag: any;


  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  noLeave:boolean = true;

  constructor(
    private router: Router,
    private profileService: EmployeeProfileService,
    private loginService: LoginService,
    private pushNotification: PushNotificationService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
    private classSceduleService: ClassScheduleService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private employeeHomeService: EmployeeHomeService,
    private chartService: ChartService,
    private dataService: DataService
  ) {
  }
  
  ngOnInit() {
    if(!this.dataService.isFirstTime){
      this.pushNotification.getPlayerID();
      this.pushNotification.oneSignalSubscription();
      this.getUserWarningList();
      this.getClassSchedule(); 
      this.getCurrentUserInfo();
      this.getUserProfileImage();
      this.getSemesterList();
    }
  }

  ionViewWillEnter() {
    if(this.dataService.isFirstTime){
      this.dataService.isFirstTime = false;
      this.ngOnInit();
    }
  }

  private currentDateTime = new Date();

  getClassSchedule() {
    let fromDateTime = this.datePipe.transform(this.currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS');
    let toDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate() + 1), 'yyyy-MM-dd HH:mm:ss.SSS');

    this.classSceduleService.getTeacherClassSchedule(fromDateTime, toDateTime).subscribe(response => {
      this.loadingService.loadingDismiss();
      let result = response;
      if (result.HasError) {
        console.log(result.Messages);
      } else {
        this.classSchedules = result.Data;
      }
    },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
      });
  }

  getChartData() {
    this.chartService.getOneWeekAttendanceData().subscribe(res => {
      let result = res;
      if (res.HasError) {
      } else {
        this.oneWeekAttendanceData = result.Data;
        this.createHorizontalBarChart();
      }
    });
    this.chartService.getLeaveAllocationData().subscribe(res => {
      let result = res;
      if (res.HasError) {
      } else {
        this.leaveAllocationData = result.Data;
        if (this.leaveAllocationData.TotalLeave == null) {
          this.noLeave = true;
        }
        else {
          this.noLeave = false;
          this.createPieChart();
        }
      }
    });
  }

  getCurrentUserInfo() {
    this.loginService.currentUserInfo().subscribe(res => {
      let result = res;
      if (result.HasError) {
      } else {
        localStorage.setItem('UserID', res.Data.User.ID);
        this.appUserInfo = result.Data;
        this.teacherFlag = this.appUserInfo.User.IsTeacher;
        if (this.appUserInfo.User.IsTeacher == false) {
          this.getChartData();
        }
        this.notificationCount = this.appUserInfo.UnReadNotificationCount;
      }
    })
  }

  getUserProfileImage() {
    this.commonService.getImage().subscribe(response => {
      this.profileImageLoaded = true;
      this.userImage = response;
    })
  }

  ShowProfile() {
    this.router.navigate(['/employee-profile']);
  }

  ShowClassSchedule() {
    this.router.navigate(['/employee-class-schedule']);
  }

  getUserWarningList() {
    this.commonService.getUserWarnings().subscribe(response => {
      if (response.HasError) {
        console.log(response.Messages);
      } else {
        this.announcements = response.Data;
      }
    },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
      });
  }

  /* Opne notification */

  openNotification() {
    this.notificationCount = 0;
    this.notificationService.seenAllNotifications().subscribe(res => {
    });
    this.router.navigate(['/notifications']);
  }

  /* Employee Course List */

  getSemesterList() {
    this.employeeHomeService.getEmployeeSemesterList().subscribe(semesterLists => {
      this.semesterList = semesterLists.Data.reverse();
      let currentSemesterId;
      let isCurrentSemesterEnrolled = false;
      // console.log(this.semesterList);
      if (this.semesterList.length != 0) {
        this.semesterList.forEach(semester => {
          if (semester.IsCurrent === true) {
            currentSemesterId = semester.ID;
            isCurrentSemesterEnrolled = true;
          }
        });
        if (isCurrentSemesterEnrolled) {
          this.nrSelect = currentSemesterId;
        } else {
          this.nrSelect = this.semesterList[0].ID;
        }
        this.onChangeSemester();
      }
    });
  }

  /* Student Registraton Semester List Dropdown */

  onChangeSemester() {
    this.semesterData = null;
    if (this.nrSelect !== null && this.nrSelect !== undefined && this.nrSelect !== "") {
      this.employeeHomeService.getEmployeeCourseList(this.nrSelect).subscribe(res => {
        this.semesterData = res.Data.Courses;
        // console.log(this.semesterData);
      });
    }
  }

  /* Get Student List */

  openStudentList(sectionId: number) {
    this.router.navigate(["/get-student-list", sectionId]);

  }

  /* Get Section Notice */

  openSectionNotice(sectionId: number) {
    this.router.navigate(['employee-notice', sectionId]);
  }

  /* Get Section Note */

  openSectionNote(sectionId: number) {
    this.router.navigate(['employee-notes', sectionId]);
  }

  //Chart Codes
  createHorizontalBarChart() {
    let hrzBarChart = this.horizontalBarChart.nativeElement;

    this.bars = new Chart(hrzBarChart, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: this.oneWeekAttendanceData.ChartLabels,
        datasets: [{
          label: 'Working Hours',
          data: this.oneWeekAttendanceData.ChartValues,
          backgroundColor: this.oneWeekAttendanceData.ChartColors,
          borderColor: 'rgb(237, 246, 255)',// array should have same number of elements as number of dataset
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          datalabels: {
            align: 'end',
            anchor: 'end',
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 15,
              stepSize: 5
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            barThickness: 'flex'
          }]
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          enabled: true
        },
        legend: {
          display: false
        },
        maintainAspectRatio: true,
        responsive: true
      }
    });
  }

  createPieChart() {
    this.bars = new Chart(this.pieChart.nativeElement, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: this.leaveAllocationData.AllocationChartData
        .ChartLabels,
        datasets: [{
          // label: 'Viewers in millions',
          data: this.leaveAllocationData.AllocationChartData
          .ChartValues,
          backgroundColor: this.leaveAllocationData.AllocationChartData
          .ChartColors,
          borderColor: 'rgb(237, 246, 255)',// array should have same number of elements as number of dataset
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          datalabels: {
            align: 'start',
            anchor: 'end',
            color: '#ffffff',
            display: function (context) {
              return context.dataset.data[context.dataIndex] !== "0"; // or >= 1 or ...
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        tooltips: {
          enabled: true
        },
        legend: {
          position: 'bottom',
        },
        maintainAspectRatio: true,
        responsive: true,
      }
    });
  }

  /* Refresh the whole page */

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }
}
