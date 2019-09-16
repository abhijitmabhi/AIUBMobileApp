import { EmployeeDepartmentLeaveCalendarService } from './../../../services/employee/employee-department-leave-calendar.service'
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { from } from 'rxjs';

@Component({
  selector: 'app-employee-department-leave-calendar',
  templateUrl: './employee-department-leave-calendar.page.html',
  styleUrls: ['./employee-department-leave-calendar.page.scss'],
})
export class EmployeeDepartmentLeaveCalendarPage implements OnInit {

  leaveMonths: any = [];
  minDate = new Date().toISOString();
  public eventSource = [];
  SwipeLock: any = true;
  viewTitle: any;
  selectedMonth: number = 0;
  event = {
    id: '',
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    duration: '',
    name: '',
    userId: '',
    color: '',
    allDay: false
  };
  leaveData = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;

  constructor(public employeeDepartmentLeaveCalendar: EmployeeDepartmentLeaveCalendarService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.loadData(null);
  }

  loadData(refresher){
    this.getleaveMonths(refresher);
  };

  //Leave Months from API
  getleaveMonths(refresher) {
    this.employeeDepartmentLeaveCalendar.GetDepartmentLeaveMonths().subscribe(res => {
      if (res.HasError) {
        console.log("Error While Getting LeaveMonths Data!");
      } else {
        if (res.Data !== null && res.Data !== undefined && res.Data !== "") {
          this.leaveMonths = res.Data.reverse();
          var index = this.leaveMonths.findIndex(month => month.IsCurrent === true);
          this.selectedMonth = this.leaveMonths[index].Id;
          this.getLeaves(refresher);
        } else {
          console.log("Empty Result for LeaveMonths Data!");
        }
      }
    });
  }

  //Leave Data from API
  getLeaves(refresher) {
    if(this.selectedMonth > 0){
      this.employeeDepartmentLeaveCalendar.GetDepartmentLeaves(this.selectedMonth).subscribe(res => {
        if (res.HasError) {
          console.log("Error while getting Leave Data!");
        }
        else {
          if (res.Data !== null && res.Data !== undefined && res.Data !== "") {
            this.leaveData = [];
            this.leaveData = res.Data;
            this.eventSource = [];
            this.eventSource = this.formatData();

            if (refresher != null) {
              /* setTimeout(()=>{
                refresher.target.complete();
              }, 3000); */
              refresher.target.complete();
            }
          } else {
            console.log("Empty Result for Leave Data!");
          }
        }
      });
    }
  }

  //leaveData & eventSource Properties Mapping
  formatData(): any {
    let events = [];
    if (this.leaveData !== null && this.leaveData !== undefined) {
      this.leaveData.forEach(element => {
        let leave = {
          id: element.Id,
          title: element.Title,
          desc: element.LeaveType,
          startTime: new Date(element.StartDate),
          endTime: new Date(element.EndDate),
          duration: element.Detail,
          name: element.Name,
          userId: element.UserId,
          color: element.Color,
          allDay: element.IsFullDay
        }
        events.push(leave);
      });
    } else {
      console.log("Empty Result for Leave Data. Can't Populate eventSource!");
    }
    return events;
  }

  //On change of dropdown months
  onChangePayroll() {
    var date = this.leaveMonths[this.leaveMonths.findIndex(month => month.Id === this.selectedMonth)].StartDate;
    this.calendar.currentDate = new Date(date);
    this.getLeaves(null);
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    let start = event.startTime.getDate() + "-" + (event.startTime.getMonth() + 1) + "-" + event.startTime.getFullYear();
    const alert = await this.alertCtrl.create({
      header: event.name,
      subHeader: event.userId,
      message: '<b>On ' + event.desc + '</b><br>Detail: ' + event.duration,
      buttons: ['OK'],
      cssClass: 'deptLeaveAlert'
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  //Refresh Page
  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

  pullToRefreshData(refresher) {
    this.loadData(refresher);
  }
}