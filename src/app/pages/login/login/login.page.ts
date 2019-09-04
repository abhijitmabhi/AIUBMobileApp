import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { DatePipe } from '@angular/common/src/common';
import { LoadingService } from '../../../core/loader/loading.service';
import { MenuController, IonInput, AlertController } from '@ionic/angular';
import { UserModel, CredModel } from './loginModel';
import { PushNotificationService } from '../../../core/oneSignal/push-notification.service';
import { AlertService } from '../../../core/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('password', { read: ElementRef }) private password: ElementRef;
  @ViewChild('Username') private username: IonInput;

  User: any;
  visible: boolean = false;
  Cred: any;
  userType: any;
  isShowLoginPage: any;

  constructor(
    private loginService: LoginService,
    private menuCtrl: MenuController,
    private router: Router,
    public alertCtrl: AlertController,
    private loadingService: LoadingService,
    private pushNotification: PushNotificationService,
    private alert: AlertService
  ) {
    this.menuCtrl.enable(false);
    this.User = UserModel;
    this.Cred = CredModel;

    // this.User.password = '243866';
    // this.User.username = '16-31332-1';
    // this.User.password = '26103588';
    // this.User.username = '1801-1848-3';
  }

  ngOnInit() {
  
  }

  async Login() {

    if (this.User.username == '' || this.User.username == undefined || this.User.username == null ) {
      await this.alert.alertErrorLogin('Warning', 'Username is requried!');
      return;
    }

    if ((/^[0-9]{2}-[0-9]{5}-[1-3]$/i.test(this.User.username.trim())) == false && (/^[0-9]{4}-[0-9]{3,4}-[1-3]$/i.test(this.User.username.trim())) == false) {
      await this.alert.alertErrorLogin('Error', 'Invalid Username!');
      return;
    }

    if (this.User.password == '' || this.User.password == undefined || this.User.password == null) {
      await this.alert.alertErrorLogin('Warning', 'Password is requried!');
      return;
    }

    this.loadingService.loadingStart();
    this.loginService.login(this.User).subscribe(res => {
      this.Cred = res;
      this.User.password = null;
      this.User.username = null;
      //Detect User Type
      localStorage.setItem('userType', this.Cred.UserTypeID);
      //Save Token into local torage
      localStorage.setItem('token', this.Cred.access_token);
      //Save playerId and userId into database
      this.subscribeOneSignal();
    }, err => {
      this.loadingService.loadingDismiss();
      this.alert.alertError(err.error.error_description);
    });
  }

  async subscribeOneSignal() {
    //Subscribing to onesignal & retrive player id
    this.pushNotification.oneSignalSubscription();
    //Loader dismissing
    this.loadingService.loadingDismiss();
    this.redirect();
  }

  redirect() {
    let user_type = localStorage.getItem('userType');
    if (user_type == "0") {
      this.router.navigate(['/student-tab/tabs/studentHome']);
    }
    if (user_type == "3" || user_type == "1") {
      this.router.navigate(['/employee-tab/tabs/employeeHome']);
    }
  }

  GoTOAiubWebSite() {
    window.open('https://www.aiub.edu/', '_system');
  }

  showPassword() {
    if (this.visible) {
      this.visible = false;
      this.password.nativeElement.setAttribute('type', 'password');
    } else {
      this.visible = true;
      this.password.nativeElement.setAttribute('type', 'text');
    }
  }

}
