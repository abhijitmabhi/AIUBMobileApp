import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeSectionService } from '../../../../services/employee/employee-section.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../../core/loader/loading.service';
import { NoticeDetails } from '../../../../core/components/pop-up/notice-details/notice-details';
import { DataService } from '../../../../core/dataService/data-service.service';
import { NoticeUpload } from '../../../../modals/notice-upload/notice-upload';

@Component({
  selector: 'app-employee-notice',
  templateUrl: './employee-notice.page.html',
  styleUrls: ['./employee-notice.page.scss'],
})
export class EmployeeNoticePage implements OnInit {
  sectionId:any;
  notices:any[] = [];
  constructor(
    private employeeSectionService: EmployeeSectionService, 
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private modalController: ModalController,
    private dataService: DataService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getSectionNoticesByID();
  }

  getSectionNoticesByID() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadingService.loadingStart();
      this.sectionId = params['sectionId'];
      this.employeeSectionService.getSectionNoticeBySectionId(this.sectionId).subscribe(data => {
        this.loadingService.loadingDismiss();
        // console.log(data);
        if(data && !data.HasError){
          if(data.Data){
            this.notices = data.Data;
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

}
