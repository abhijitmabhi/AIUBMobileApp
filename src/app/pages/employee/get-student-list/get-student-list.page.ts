import { EmployeeSectionService } from './../../../services/employee/employee-section.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-get-student-list',
  templateUrl: './get-student-list.page.html',
  styleUrls: ['./get-student-list.page.scss'],
})
export class GetStudentListPage implements OnInit {
  
  sectionId:any;
  studentList:any = [];
  studentCount: number = 0;
  constructor(
    private route: ActivatedRoute,
    private sectionService: EmployeeSectionService,
    private loadingService: LoadingService,
    private platform: Platform,
    private router: Router
    ) {
      this.platform.backButton.subscribe(()=>{
        if(this.router.url == "/employee-tab/tabs/employeeHome"){
          navigator['app'].exitApp();
        }
      });
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadingService.loadingStart();
      this.sectionId = params['sectionId'];
      this.sectionService.getStudentBySection(this.sectionId, 0 , 100).subscribe(res => {
        this.studentList = res.Data;
        this.studentCount = res.Count;
        console.log(this.studentList);
        this.loadingService.loadingDismiss();
      });
    });
  }

}
