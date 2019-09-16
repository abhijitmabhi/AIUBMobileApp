import { ModalController } from '@ionic/angular';
import { EmployeeSectionService } from './../../../services/employee/employee-section.service';
import { DataService } from '../../../core/dataService/data-service.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentDetailsComponent } from 'src/app/modals/student-details/student-details.component';

@Component({
  selector: 'app-get-student-list',
  templateUrl: './get-student-list.page.html',
  styleUrls: ['./get-student-list.page.scss'],
})
export class GetStudentListPage implements OnInit {

  sectionId: any;
  studentList: any = [];
  studentCount: number = 0;
  constructor(
    private route: ActivatedRoute,
    private sectionService: EmployeeSectionService,
    private loadingService: LoadingService,
    private dataService: DataService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sectionId = params['sectionId'];
      this.sectionService.getStudentBySection(this.sectionId, 0, 100).subscribe(res => {
        this.studentList = res.Data;
        this.studentCount = res.Count;
        this.studentList.forEach(element => {
          this.sectionService.GetStudentPhoto(element.User.PictureLocation).subscribe(res => {
            element.User.PictureLocation = res;
          })
        });
      });
    });
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

   //MODAL
   viewStudentDetails(stdList: any) {
    this.dataService.isModalOn = true;
    console.log(stdList);
    this.modalController.create({
      component: StudentDetailsComponent,
      componentProps: {
        Name: stdList.User.FullName,
        ID: stdList.StudentID,
        Image: stdList.User.PictureLocation
      },
      cssClass: 'popup-modal-css',
      backdropDismiss: false,
    }).then((modal) => {
      modal.present();
    });
  }

}
