import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { DatePipe } from '@angular/common/src/common';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { MenuController, IonInput, AlertController } from '@ionic/angular';
import { UserModel, CredModel } from './loginModel';
import { PushNotificationService } from 'src/app/core/oneSignal/push-notification.service';
import { AlertService } from 'src/app/core/alert/alert.service';

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
    private alertService: AlertService
  ) {
    this.menuCtrl.enable(false);
    this.User = UserModel;
    this.Cred = CredModel;

    // this.User.password = '243866';
    this.User.username = '16-31332-1';
    // this.User.username = '1801-1848-3';
    this.User.password = '26103588';
    // this.User.username = '1801-1848-3';
    // this.User.password = '58389796';
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isShowLoginPage = true;
      this.redirect();
    }
    else {
      this.isShowLoginPage = false;
    }
  }

  async Login() {

    if (this.User.username) {
      if ((/^[0-9]{2}-[0-9]{5}-[1-3]$/i.test(this.User.username))
        || (/^[0-9]{4}-[0-9]{3,4}-[1-3]$/i.test(this.User.username))) {
        // if ((/^[0-9]{2}-[0-9]{5}-[1-3]$/i.test(this.User.username))) {
        //   await this.showAlert('Warning', 'Student version is coming soon!');
        //   return;
        // }
      } else {
        await this.showAlert('Error', 'Invalid Username!');
        return;
      }
    } else {
      await this.showAlert('Warning', 'Username is requried!');
      return;
    }
    if (this.User.password) {
      // await this.showAlert('Info', this.User.password);
    } else {
      await this.showAlert('Warning', 'Password is requried!');
      return;
    }
    if (this.User.isRemember) {
      // await this.showAlert('Info', 'Store User Info');
    } else {
      // await this.showAlert('Info', 'Clear User Info');
    }

    this.loadingService.loadingStart();
    this.loginService.login(this.User).subscribe(res => {
      this.Cred = res;
      this.User.password = null;
      // console.log(this.Cred);
      //Detect User Type
      localStorage.setItem('userType', this.Cred.UserTypeID);
      //Save Token into local torage
      localStorage.setItem('token', this.Cred.access_token);
      //Save playerId and userId into database
      this.subscribeOneSignal();
    }, err => {
      this.loadingService.loadingDismiss();
      this.alertService.alertError("Something went wrong");
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
      // this.menuCtrl.enable(true, "student");
      this.router.navigate(['/student-tab/tabs/studentHome']);
    }
    if (user_type == "3" || user_type == "1") {
      // this.menuCtrl.enable(true, "employee");
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

  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
