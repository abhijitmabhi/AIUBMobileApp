import { DataService } from './../../../core/dataService/data-service.service';
import { CommonService } from '../../../services/common/common.service';
import { LoadingService } from '../../../core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { CoursesResultsService } from '../../../services/student/courses-and-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses-and-results',
  templateUrl: './student-courses-and-results.page.html',
  styleUrls: ['./student-courses-and-results.page.scss'],
})
export class StudentCoursesAndResultsPage implements OnInit {

  midHideFlag  = true;
  finalHideFlag = true;

  semesterList:any;
  courseList:any;
  nrSelect: any;
  nrSelect1: any;
  midtermResult= [];
  finaltermResult:any;
  courseName:any;
  finalGradeText:any;

  //New Design Code variables
  summeryList = [];

  constructor(
    private coursesResultsService : CoursesResultsService,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private router: Router,
    private dataService: DataService
  ) { }

  onMidTerm = ()=>{
    this.midHideFlag = !this.midHideFlag;
  };

  onFinalTerm = ()=>{
    this.finalHideFlag = !this.finalHideFlag;
  };
  
  ngOnInit() {
    this.getCoursesResults();
  }

  getCoursesResults(){
    this.commonService.semesterList().subscribe(semesterLists => {

      //get all semesters
      this.semesterList = semesterLists.Data;

      //get current semester if exist
      this.commonService.currentSemester().subscribe(currentSemester => {
        let currentSemesterId = currentSemester.Data.ID;
        let isCurrentSemesterEnrolled = false;
        this.semesterList.forEach(semester => {
          if(semester.ID === currentSemesterId){
            isCurrentSemesterEnrolled = true;
          }
        });

        if(isCurrentSemesterEnrolled){
          this.nrSelect = currentSemesterId;
        }else {
          this.nrSelect = this.semesterList[0].ID;
        }
      });
    });
  }

  onChangeSemester(){
      this.commonService.registeredCoursesBySemester(this.nrSelect).subscribe(res => {
        this.courseList = res.Data;

        let course = this.courseList.map((obj)=>{
          if(obj.MidtermResult == null)
            obj.MidtermResult = "Pending";
          if(obj.FinaltermResult == null)
            obj.FinaltermResult = "Pending";
          if(obj.Result == null)
            obj.Result = "Pending";
          return obj;
        });
        this.courseList = course;
      });
    }

  details(courseId, courseName, finalGrade, mark, bonus){

    let finalString = "";
    if(finalGrade){
      if(mark && bonus){
        if(bonus == "0"){
          finalString = `${finalGrade} (${mark})`;
        }else{
          finalString = `${finalGrade} (${mark}/+${bonus})`;
        }
      }else if(mark && !bonus){
        finalString = `${finalGrade} (${mark})`;
      }
    }else{
      finalString = "-(-)";
    }
    

    this.dataService.serviceData = {
      courseId:courseId,
      sectionId: this.nrSelect,
      courseName:courseName,
      finalTermGrade:finalString
    };
    this.router.navigate(['courses-and-results-details']);
  }
}

