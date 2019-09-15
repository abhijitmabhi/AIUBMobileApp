import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DataService } from '../../core/dataService/data-service.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  Name: any;
  ID: any;
  backButtonAction: any;

  constructor(private modalController: ModalController, private navParams: NavParams, private platform: Platform, private dataService: DataService) {
    this.backButtonAction = this.platform.backButton.subscribeWithPriority(0, () => {
      this.CloseModal();
    });
  }

  ngOnInit() {
    this.Name = this.navParams.data.Name;
    this.ID = this.navParams.data.ID;
  }

  async CloseModal() {
    this.backButtonAction.unsubscribe();
    this.modalController.dismiss();
    this.dataService.isModalOn = false;
  }
}