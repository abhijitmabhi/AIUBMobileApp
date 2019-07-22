import { ToastService } from 'src/app/core/toast/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './core/network/network.service';
import { debounceTime } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  
  isConnected:any;
  flag=true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private networkService : NetworkService,
    private toast: ToastService,
    public network: Network
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.networkSubscriber();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.getItem('token')) {
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

  networkSubscriber(): void {
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
          this.isConnected = connected;
          console.log('Status', this.isConnected);

          let msg = "";
          if(!this.isConnected && this.flag){
            this.flag = false;
            msg = "No internet connection";
          }

          if(!this.flag && this.isConnected){
            msg = "You are back online";
            this.flag = true;
          }

          if(msg != ""){
            this.toast.presentToast(msg);
          }

          console.log(navigator);
          // this.router.events.subscribe((res) => { 
          //   console.log(this.router.url,"Current URL");
          // });

      });
  }
}
