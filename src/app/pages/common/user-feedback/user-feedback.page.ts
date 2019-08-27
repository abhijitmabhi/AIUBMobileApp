
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
      value:1
    },
    {
      title:"BugReports",
      value:2
    },
    {
      title:"Questions",
      value:3
    }
];

  constructor(
    private dataService : DataService, 
    private alertController: AlertService, 
    private commonService: CommonService
    ) { }

  ngOnInit() {
  }

  Submit(){

    if(this.dataService.validateString(this.feedback.Description)) {
      this.alertController.alertError('Description Required');
      return;
    } 
    if(this.dataService.validateString(this.feedback.TypeID)) {
      this.alertController.alertError('Feedback Type is required'); 
      return;
    }
    this.commonService.saveUserFeedback(this.feedback).subscribe(res =>{
      this.alertController.Success("Feedback sent!");
      this.feedback.Description = null;
      this.Type = null;
      this.Type = [
        {
          title:"Suggestion",
          value:0
        },
        {
          title:"Comments",
          value:1
        },
        {
          title:"BugReports",
          value:2
        },
        {
          title:"Questions",
          value:3
        }
    ];
    });
  }

}
