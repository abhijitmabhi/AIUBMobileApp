import { ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeSectionService } from './../../../services/employee/employee-section.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { NoticeDetails } from 'src/app/core/components/pop-up/notice-details/notice-details';

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
    private platform: Platform,
    private router: Router
    ) { 
      this.platform.backButton.subscribe(()=>{
        this.router.navigate(['/employee-tab/tabs/employeeHome']);
      });
    }

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

}
