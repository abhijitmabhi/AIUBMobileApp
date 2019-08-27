import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../../core/dataService/data-service.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './note-upload.html',
  styleUrls: ['./note-upload.scss'],
})
export class NoteUpload implements OnInit {
  private unregisterBackButtonAction: any;
  constructor(
    private platform:Platform, 
    private modalController:ModalController,
    private dataService: DataService
    ) {
    this.unregisterBackButtonAction = this.platform.backButton.subscribeWithPriority(0, () => {
      this.CloseModal();
    });
  }

  ngOnInit() {
  }

  async CloseModal() {
    this.unregisterBackButtonAction.unsubscribe();
    this.modalController.dismiss();
  }

}
