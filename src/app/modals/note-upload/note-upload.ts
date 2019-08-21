import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-notification-details',
  templateUrl: './note-upload.html',
  styleUrls: ['./note-upload.scss'],
})
export class NoteUpload implements OnInit {
  private unregisterBackButtonAction: any;
  private title:string;
  private message:string;
  private time:string;
  constructor(private platform:Platform, private modalController:ModalController, private navParams: NavParams) {
    this.unregisterBackButtonAction = this.platform.backButton.subscribeWithPriority(0, () => {
      this.CloseModal();
    });
  }

  ngOnInit() {
    this.title = this.navParams.data.Title;
    this.message = this.navParams.data.Message;
    this.time = this.navParams.data.Time;
  }

  async CloseModal() {
    this.unregisterBackButtonAction.unsubscribe();
    this.modalController.dismiss();
  }

}
