import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DataService } from '../../core/dataService/data-service.service';

@Component({
  selector: 'app-notice-details',
  templateUrl: './notice-details.html',
  styleUrls: ['./notice-details.scss'],
})
export class NoticeDetails implements OnInit {
  title:string;
  message:string;
  time:string;
  backButtonAction: any;

  constructor(private modalController:ModalController, private navParams: NavParams, private dataService: DataService,private platform: Platform ) {
    this.backButtonAction = this.platform.backButton.subscribeWithPriority(0, () => {
    
    });
  }

  ngOnInit() {
    this.title = this.navParams.data.Title;
    this.message = this.navParams.data.Message;
    this.time = this.navParams.data.Time;
  }

  async CloseModal() {
    this.backButtonAction.unsubscribe();
    this.modalController.dismiss();
    this.dataService.isModalOn = false;
  }

}
