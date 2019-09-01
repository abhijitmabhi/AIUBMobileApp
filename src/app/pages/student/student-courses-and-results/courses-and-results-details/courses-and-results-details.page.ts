import { DataService } from './../../../../core/dataService/data-service.service';
import { LoadingService } from 'src/app/Core/loader/loading.service';
import { Component, OnInit } from '@angular/core';
import { CoursesResultsService } from 'src/app/services/student/courses-and-result.service';

@Component({
  selector: 'app-courses-and-results-details',
  templateUrl: './courses-and-results-details.page.html',
  styleUrls: ['./courses-and-results-details.page.scss'],
})
export class CoursesAndResultsDetailsPage implements OnInit {

  //Parameters
  course: any;
  midHideFlag = true;
  finalHideFlag = true;
  midtermResult = [];
  finaltermResult: any;
  finalGradeText: any;
  courseName: any;
  courseId: any;
  sectionId: any;
  teachers: any;
  numberOfTeachers: any;

  constructor(
    private coursesResultsService: CoursesResultsService,
    private loadingService: LoadingService,
    private dataService: DataService) { }

  ngOnInit() {
    this.onChangeCourse();

  }

  onChangeCourse() {

    this.loadingService.loadingStart();

    this.course = JSON.parse(localStorage.getItem('course'));
    this.course = this.dataService.serviceData;

    this.courseName = this.course.courseName;
    this.finalGradeText = this.course.finalTermGrade;
    this.courseId = this.course.courseId;
    this.sectionId = this.course.sectionId;

    this.coursesResultsService.getCoursesAndResults(this.sectionId, this.courseId).subscribe(res => {
      this.midtermResult = res.Data.Exams[0];
      this.finaltermResult = res.Data.Exams[1];
      this.teachers = res.Data.Section.Teachers;
      this.numberOfTeachers = this.teachers.length;
      // console.log(res);
    });

    this.loadingService.loadingDismiss();
  }

  isExpanded(numberOfTeachers:any){
    return numberOfTeachers == 0 || numberOfTeachers == 1 ? true : false;
  }
}
