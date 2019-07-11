import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationDetails } from 'src/app/core/components/pop-up/notification-details/notification-details';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  private notificationList:any = [];
  constructor(
    private modalController:ModalController,
    private notificationService:NotificationService) {
  }

  ngOnInit() {
    this.notificationByUser();
  }

  async openNotification(notification : any) {
    this.readNotification(notification);
    await this.ShowNotificationDetails(notification);
  }

  readNotification(notification : any) {
    var index = this.notificationList.findIndex(x => x.Id === notification.Id);
    notification.HeaderCssClass ='read-notif-content read-title';
    notification.BodyCssClass = 'read-notif-content read-body';
    notification.TimeCssClass = 'read-notif-content read-time';
    notification.ContentCssClass = 'read';
    notification.IsRead = true;
    this.notificationList.slice(index,1, {notification});
  };
    
  unreadNotification(notification : any) {
    var index = this.notificationList.findIndex(x => x.Id === notification.Id);
    notification.HeaderCssClass ='unread-notif-content unread-title';
    notification.BodyCssClass = 'unread-notif-content unread-body';
    notification.TimeCssClass = 'unread-notif-content unread-time';
    notification.ContentCssClass = 'unread';
    notification.IsRead = false;
    this.notificationList.slice(index,1, {notification});
  };

  async ShowNotificationDetails(notification: any) {
    const myModal = await this.modalController.create({
      component: NotificationDetails,
      componentProps: { 
        Title: notification.Title,
        Message: notification.Message,
        Time: notification.Time
      },
      cssClass: 'popup-modal-css',
      backdropDismiss:false,
    });
    return await myModal.present();
  }

  getNotifData(){
    let notifData = [
      {
          "ID": 15,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 14,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 13,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 12,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 11,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 10,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 9,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 8,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
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
          "ID": 7,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
          "Url": null,
          "StatusID": 0,
          "TypeID": 0,
          "Type": "Error",
          "ReadDate": null,
          "PostedDate": "2019-06-30T17:22:37.663",
          "IsRead": false,
          "PostDate": "30-Jun-19",
          "PostTime": "05:22:37 PM"
      },
      {
          "ID": 6,
          "UserID": "1306-1448-3",
          "Title": "Notification",
          "Message": "Hi, Jahid Vaiya",
          "Url": null,
          "StatusID": 0,
          "TypeID": 0,
          "Type": "Error",
          "ReadDate": null,
          "PostedDate": "2019-06-30T17:22:36.77",
          "IsRead": false,
          "PostDate": "30-Jun-19",
          "PostTime": "05:22:36 PM"
      }
    ];
    
    let data:any[] = [];
    notifData.forEach(notif => {
      data.push({
        Id : notif.ID,
        ContentCssClass : (notif.IsRead === true) ? "read" : "unread",
        HeaderCssClass : (notif.IsRead === true) ? "read-notif-content read-title" : "unread-notif-content unread-title",
        BodyCssClass : (notif.IsRead === true) ? "read-notif-content read-body" : 'unread-notif-content unread-body',
        TimeCssClass : (notif.IsRead === true) ? "read-notif-content read-time" : 'unread-notif-content unread-time',
        Title : notif.Title,
        Message : notif.Message,
        Time : `${notif.PostDate} ${notif.PostTime}`,
        TypeID : notif.TypeID,
        Type : notif.Type,
        IsRead : notif.IsRead
      });
    });

    this.notificationList = this.notificationList.concat(data);
  }

  notificationByUser(){
    this.notificationService.getNotificationsByUser(0,10).subscribe( res => {
      let data:any[] = [];
      res.Data.forEach(notif => {
      data.push({
        Id : notif.ID,
        ContentCssClass : (notif.IsRead === true) ? "read" : "unread",
        HeaderCssClass : (notif.IsRead === true) ? "read-notif-content read-title" : "unread-notif-content unread-title",
        BodyCssClass : (notif.IsRead === true) ? "read-notif-content read-body" : 'unread-notif-content unread-body',
        TimeCssClass : (notif.IsRead === true) ? "read-notif-content read-time" : 'unread-notif-content unread-time',
        Title : notif.Title,
        Message : notif.Message,
        Time : `${notif.PostDate} ${notif.PostTime}`,
        TypeID : notif.TypeID,
        Type : notif.Type,
        IsRead : notif.IsRead
      });
    });

    this.notificationList = this.notificationList.concat(data);
    });
  }
}
