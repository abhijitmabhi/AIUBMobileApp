import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { DataService } from '../../core/dataService/data-service.service';
import { NoticeUploadService } from '../../services/employee/notice-upload.service';
import { AlertService } from '../../core/alert/alert.service';
import { isValid } from 'ionicons/dist/types/icon/utils';

@Component({
  selector: 'app-notice-details',
  templateUrl: './notice-upload.html',
  styleUrls: ['./notice-upload.scss'],
})
export class NoticeUpload implements OnInit {

  backButtonAction: any;
  notice = {
    Subject:'',
    Description:'',
    SectionID:''
  };

  constructor(
    private modalController:ModalController, 
    private navParams: NavParams,
    private dataService: DataService,
    private noticeService: NoticeUploadService,
    private alertService: AlertService,
    private platform: Platform 
    ) {
      this.backButtonAction    = this.platform.backButton.subscribeWithPriority(0, () => {
        this.cancel();
      });
    }

  ngOnInit() {
  }
  
  SaveNotice(){

    if(this.dataService.validateString(this.notice.Subject)) {
      this.alertService.alertError('Subject is required');
      return;
    } 
    if(this.dataService.validateString(this.notice.Description)) {
      this.alertService.alertError('Description is required'); 
      return;
    }

    this.notice.SectionID = this.dataService.serviceData;
    this.noticeService.saveNotice(this.notice).subscribe(res=>{
      if(res.HasError){
        this.alertService.alertError(res.Messages);
      }
      else{
        this.alertService.Success('Notice posted succesfully');
        this.notice.Description = null;
        this.notice.Subject = null;
      }
    });
  }

  cancel(){
    this.backButtonAction.unsubscribe();
    this.modalController.dismiss();
    this.dataService.isModalOn = false;
  }

}
