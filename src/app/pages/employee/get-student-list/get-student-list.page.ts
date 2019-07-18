import { EmployeeSectionService } from './../../../services/employee/employee-section.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-get-student-list',
  templateUrl: './get-student-list.page.html',
  styleUrls: ['./get-student-list.page.scss'],
})
export class GetStudentListPage implements OnInit {
  
  sectionId:any;
  studentList:any = [];
  constructor(
    private route: ActivatedRoute,
    private sectionService: EmployeeSectionService,
    private loadingService: LoadingService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadingService.loadingStart();
      this.sectionId = params['sectionId'];
      this.sectionService.getStudentBySection(this.sectionId, 0 , 100).subscribe(res => {
        this.studentList = res.Data;
        this.loadingService.loadingDismiss();
      });
    });
  }

}
