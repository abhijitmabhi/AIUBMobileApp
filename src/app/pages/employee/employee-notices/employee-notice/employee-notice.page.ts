import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeSectionService } from '../../../../services/employee/employee-section.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../../core/loader/loading.service';
import { DataService } from '../../../../core/dataService/data-service.service';
import { NoticeDetails } from 'src/app/modals/notice-details/notice-details';
import { NoticeUpload } from 'src/app/modals/notice-upload/notice-upload';

@Component({
  selector: 'app-employee-notice',
  templateUrl: './employee-notice.page.html',
  styleUrls: ['./employee-notice.page.scss'],
})
export class EmployeeNoticePage implements OnInit {
  sectionId:any;
  notices:any;
  extraData: any;
  flag:boolean=false;
  constructor(
    private employeeSectionService: EmployeeSectionService, 
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private modalController: ModalController,
    private dataService: DataService
    ) {}

  ngOnInit() {
    this.getSectionNoticesByID();
  }

  getSectionNoticesByID() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.sectionId = params['sectionId'];
      this.employeeSectionService.getSectionNoticeBySectionId(this.sectionId).subscribe(res => {
        this.extraData = res.ExtraData;
        if(res && !res.HasError){
          if(res.Data){
            if(res.Count == 0){
              this.flag = true;
            }
           
            let Data = res.Data;
            this.notices = Data.reverse();
          }
        }
      },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
      });
    })
  }

  async readNotice(notice:any){
    this.dataService.isModalOn = true;
    const myModal = await this.modalController.create({
      component: NoticeDetails,
      componentProps: { 
        Title: notice.Subject,
        Message: notice.Description,
        Time: notice.PostDate
      },
      cssClass: 'popup-modal-css',
      backdropDismiss:false,
    });
    return await myModal.present();
  }

  async Upload(){
    this.dataService.serviceData = this.sectionId;
    this.dataService.isModalOn = true;
    //  this.router.navigate(['employee-notice-upload']);
     const myModal = await this.modalController.create({
      component: NoticeUpload,
      // cssClass: 'popup-modal-css',
      backdropDismiss:false,
    });
    return await myModal.present();
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

}
