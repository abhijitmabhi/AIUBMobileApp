import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NotificationDetails } from 'src/app/core/components/pop-up/notification-details/notification-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  private notificationList: any = [];
  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService,
    private router: Router,
    private platform: Platform) {
      this.platform.backButton.subscribe(() => { 
        let user_type = localStorage.getItem('userType');
        if(user_type == "3" || user_type == "1") {
          this.router.navigateByUrl('/employee-tab/tabs/employeeHome');
        }
        if(user_type == "0" ) {
          this.router.navigateByUrl('/student-tab/tabs/studentHome');
        }
      });
  }

  ngOnInit() {
    this.getNotifData();
    let notification = JSON.parse(localStorage.getItem('notification'));
    this.ShowNotificationDetails(notification);
  }

  async openNotification(notification: any) {
    this.readNotification(notification);
    await this.ShowNotificationDetails(notification);
  }

  readNotification(notification: any) {
    var index = this.notificationList.findIndex(x => x.Id === notification.Id);
    notification.HeaderCssClass = 'read-notif-content read-title';
    notification.BodyCssClass = 'read-notif-content read-body';
    notification.TimeCssClass = 'read-notif-content read-time';
    notification.ContentCssClass = 'read';
    notification.IsRead = true;
    this.notificationList.slice(index, 1, { notification });

    this.notificationService.changeStatusById(notification).subscribe(res => {
      // console.log(res);
    })
  };

  unreadNotification(notification: any) {
    var index = this.notificationList.findIndex(x => x.Id === notification.Id);
    notification.HeaderCssClass = 'unread-notif-content unread-title';
    notification.BodyCssClass = 'unread-notif-content unread-body';
    notification.TimeCssClass = 'unread-notif-content unread-time';
    notification.ContentCssClass = 'unread';
    notification.IsRead = false;
    this.notificationList.slice(index, 1, { notification });
  };

  async ShowNotificationDetails(notification: any) {
    const myModal = await this.modalController.create({
      component: NotificationDetails,
      componentProps: {
        Title: notification.Title,
        Message: notification.Message? notification.Message: 'Notification',
        Time: notification.Time
      },
      cssClass: 'popup-modal-css',
      backdropDismiss: false,
    });
    return await myModal.present();
  }

  getNotifData() {
    let notifData = [
      {
        "ID": 1,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 01",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T14:09:14.593",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "02:09:14 PM"
      },
      {
        "ID": 2,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 02",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T14:09:14.593",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "02:09:14 PM"
      },
      {
        "ID": 3,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 03",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T14:05:29.723",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "02:05:29 PM"
      },
      {
        "ID": 4,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 04",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T13:31:23.927",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "01:31:23 PM"
      },
      {
        "ID": 5,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 05",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T13:31:02.503",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "01:31:02 PM"
      },
      {
        "ID": 6,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 06",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T13:30:50.89",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "01:30:50 PM"
      },
      {
        "ID": 7,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 07",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T13:30:31.96",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "01:30:31 PM"
      },
      {
        "ID": 8,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 08",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-07-02T13:29:34.02",
        "IsRead": false,
        "PostDate": "02-Jul-19",
        "PostTime": "01:29:34 PM"
      },
      {
        "ID": 9,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 09",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-06-30T17:22:38.413",
        "IsRead": false,
        "PostDate": "30-Jun-19",
        "PostTime": "05:22:38 PM"
      },
      {
        "ID": 10,
        "UserID": "16-31332-1",
        "Title": "Notification",
        "Message": "Notification 10",
        "Url": null,
        "StatusID": 0,
        "TypeID": 0,
        "Type": "Error",
        "ReadDate": null,
        "PostedDate": "2019-06-30T17:22:37.663",
        "IsRead": false,
        "PostDate": "30-Jun-19",
        "PostTime": "05:22:37 PM"
      }
    ];

    let data: any[] = [];
    notifData.forEach(notif => {
      data.push({
        Id: notif.ID,
        ContentCssClass: (notif.IsRead === true) ? "read" : "unread",
        HeaderCssClass: (notif.IsRead === true) ? "read-notif-content read-title" : "unread-notif-content unread-title",
        BodyCssClass: (notif.IsRead === true) ? "read-notif-content read-body" : 'unread-notif-content unread-body',
        TimeCssClass: (notif.IsRead === true) ? "read-notif-content read-time" : 'unread-notif-content unread-time',
        Title: notif.Title,
        Message: notif.Message,
        Time: `${notif.PostDate} ${notif.PostTime}`,
        TypeID: notif.TypeID,
        Type: notif.Type,
        IsRead: notif.IsRead
      });
    });

    this.notificationList = this.notificationList.concat(data);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.getNotifData();
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  notificationByUser() {
    this.notificationService.getNotificationsByUser(0, 10).subscribe(res => {
      // console.log(res);
      let data: any[] = [];


      res.Data.forEach(notif => {
        data.push({
          Id: notif.ID,
          ContentCssClass: (notif.IsRead === true) ? "read" : "unread",
          HeaderCssClass: (notif.IsRead === true) ? "read-notif-content read-title" : "unread-notif-content unread-title",
          BodyCssClass: (notif.IsRead === true) ? "read-notif-content read-body" : 'unread-notif-content unread-body',
          TimeCssClass: (notif.IsRead === true) ? "read-notif-content read-time" : 'unread-notif-content unread-time',
          Title: notif.Title,
          Message: notif.Message,
          Time: `${notif.PostDate} ${notif.PostTime}`,
          TypeID: notif.TypeID,
          Type: notif.Type,
          IsRead: notif.IsRead
        });
      });

      this.notificationList = this.notificationList.concat(data);
    })
  }
}
