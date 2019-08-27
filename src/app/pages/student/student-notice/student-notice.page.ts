import { Component, OnInit } from '@angular/core';
import { EmployeeSectionService } from '../../../services/employee/employee-section.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from '../../../core/loader/loading.service';
import { ModalController } from '@ionic/angular';
import { NoticeDetails } from '../../../modals/notice-details/notice-details';
import { DataService } from '../../../core/dataService/data-service.service';

@Component({
  selector: 'app-student-notice',
  templateUrl: './student-notice.page.html',
  styleUrls: ['./student-notice.page.scss'],
})
export class StudentNoticePage implements OnInit {

  sectionId:any;
  notices:any[] = [];
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
      this.loadingService.loadingStart();
      this.sectionId = params['sectionId'];
      this.employeeSectionService.getSectionNoticeBySectionId(this.sectionId).subscribe(data => {
        this.loadingService.loadingDismiss();
        if(data && !data.HasError){
          if(data.Data){
            let Data = data.Data;
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
      backdropDismiss:true
    });
    return await myModal.present();
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

}
