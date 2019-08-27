import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationDetails } from '../../../modals/notification-details/notification-details';
import { DataService } from '../../../core/dataService/data-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationList: any = [];
  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService,
    private dataService: DataService
    ) {}

  ngOnInit() {
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
    this.dataService.isModalOn = true;
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
             localStorage.setItem('notification', null);
           }
          }
        }

      }
    });
  }

}
