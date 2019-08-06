
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/dataService/data-service.service';
import { AlertService } from '../../../core/alert/alert.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.page.html',
  styleUrls: ['./user-feedback.page.scss'],
})
export class UserFeedbackPage implements OnInit {

  feedback = {
    Description:"",
    TypeID:"",
  };

  Type = [
    {
      title:"Suggestion",
      value:0
    },
    {
      title:"Comments",
      value:0
    },
    {
      title:"BugReports",
      value:0
    },
    {
      title:"Questions",
      value:0
    }
];

  constructor(private dataService : DataService, private alertController: AlertService, private commonService: CommonService) { }

  ngOnInit() {
  }

  getFeedbackType(){
  }

  Submit(){
    this.commonService.saveUserFeedback(this.feedback).subscribe(res =>{
      console.log(res);
    });
  }

}
