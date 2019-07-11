import { AlertService } from './core/alert/alert.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotificationService } from './core/oneSignal/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private noti : PushNotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      if (localStorage.getItem('token')) {
        this.splashScreen.hide();

        let user_type = localStorage.getItem('userType');
        if(user_type == "3" || user_type == "1") {
          this.router.navigateByUrl('/employee-tab/tabs/employeeHome');
        }
        if(user_type == "0" ) {
          this.router.navigateByUrl('/student-tab/tabs/studentHome');
        }
      }
      this.statusBar.styleLightContent();
      
    });
  }
}
