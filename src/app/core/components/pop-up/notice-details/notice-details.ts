import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-notice-details',
  templateUrl: './notice-details.html',
  styleUrls: ['./notice-details.scss'],
})
export class NoticeDetails implements OnInit {
  title:string;
  message:string;
  time:string;
  constructor(private modalController:ModalController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.title = this.navParams.data.Title;
    this.message = this.navParams.data.Message;
    this.time = this.navParams.data.Time;
  }

  async CloseModal() {
    this.modalController.dismiss();
  }

}
