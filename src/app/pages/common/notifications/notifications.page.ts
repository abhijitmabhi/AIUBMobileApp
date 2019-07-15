import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
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
    private platform: Platform,
    private alertController: AlertController
    ) {
      this.platform.backButton.subscribe(() => { 
        this.redirectToHome();
      });
  }

  ngOnInit() {
    // this.getNotifData();
    this.notificationByUser();
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
        Title: notification.Title? notification.Title: 'Error Titile',
        Message: notification.Message? notification.Message: 'Notification',
        Time: notification.Time? notification.Time: 'Error Time'
      },
      cssClass: 'popup-modal-css',
      backdropDismiss: false,
    });
    return await myModal.present();
  }

  // getNotifData() {
  //   let notifData = [
  //     {
  //       "ID": 1,
  //       "UserID": "16-31332-1",
  //       "Title": "Notification",
  //       "Message": "Notification 01",
  //       "Url": null,
  //       "StatusID": 0,
  //       "TypeID": 0,
  //       "Type": "Error",
  //       "ReadDate": null,
  //       "PostedDate": "2019-07-02T14:09:14.593",
  //       "IsRead": false,
  //       "PostDate": "02-Jul-19",
  //       "PostTime": "02:09:14 PM"
  //     }
  //   ];

  //   let data: any[] = [];
  //   notifData.forEach(notif => {
  //     data.push({
  //       Id: notif.ID,
  //       ContentCssClass: (notif.IsRead === true) ? "read" : "unread",
  //       HeaderCssClass: (notif.IsRead === true) ? "read-notif-content read-title" : "unread-notif-content unread-title",
  //       BodyCssClass: (notif.IsRead === true) ? "read-notif-content read-body" : 'unread-notif-content unread-body',
  //       TimeCssClass: (notif.IsRead === true) ? "read-notif-content read-time" : 'unread-notif-content unread-time',
  //       Title: notif.Title,
  //       Message: notif.Message,
  //       Time: `${notif.PostDate} ${notif.PostTime}`,
  //       TypeID: notif.TypeID,
  //       Type: notif.Type,
  //       IsRead: notif.IsRead
  //     });
  //   });

  //   this.notificationList = this.notificationList.concat(data);
  // }

  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Done');
  //     this.getNotifData();
  //     event.target.complete();
  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     // if (data.length == 1000) {
  //     //   event.target.disabled = true;
  //     // }
  //   }, 500);
  // }

  notificationByUser() {
    this.notificationService.getNotificationsByUser(0, 100).subscribe(res => {
      let data: any[] = [];
      if(res.Data) {
        res.Data.forEach(notif => {
          data.push({
            ID: notif.ID,
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
        let notificationId = JSON.parse(localStorage.getItem('notification'));
        if(notificationId){
          for (let i=0; i < this.notificationList.length; i++) {
           if(this.notificationList[i].ID == notificationId){
             this.openNotification(this.notificationList[i]);
           }
          }
        }
      }
    });
  }

  //Method for back button
  redirectToHome(){
    let user_type = localStorage.getItem('userType');
    if(user_type == "3" || user_type == "1") {
      this.router.navigateByUrl('/employee-tab/tabs/employeeHome');
    }
    if(user_type == "0" ) {
      this.router.navigateByUrl('/student-tab/tabs/studentHome');
    }
  }

  async Success(obj){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: obj ? obj  :'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
