import { ToastService } from 'src/app/core/toast/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './core/network/network.service';
import { debounceTime } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { DataService } from './core/dataService/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  isAppResume:boolean = false;
  isConnected:any;
  flag=true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private networkService : NetworkService,
    private toast: ToastService,
    public network: Network,
    public dataService: DataService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.networkSubscriber();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.platform.resume.subscribe((res) => {
        this.isAppResume = true;
      });
      //Hardware backbutton event
      this.isPressedHardwareBackButton();
      // this.statusBar.styleDefault(); 
      setTimeout(()=>{
        this.splashScreen.hide();  
      },1000);
      //Navigate to home page if logged in
      this.navigateToHomePage();
      
      this.statusBar.styleLightContent();
    });
  }

  networkSubscriber(): void {
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
          this.isConnected = connected;

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
      });
  }

  isPressedHardwareBackButton(){
    this.platform.backButton.subscribe(()=>{

      // let user_type = localStorage.getItem('userType');
      let user_type = this.dataService.getUserType();

      if(!user_type){
        navigator['app'].exitApp();
      }
      
      if(!this.dataService.isModalOn){
        if(user_type == "3" || user_type == "1") {
          if(this.router.url !== "/employee-tab/tabs/employeeHome"){
            this.router.navigate(['/employee-tab/tabs/employeeHome']);
          }
          else{
            navigator['app'].exitApp();
          }
        }
        if(user_type == "0" ) {
          if(this.router.url !== "/student-tab/tabs/studentHome"){
            this.router.navigate(['/student-tab/tabs/studentHome']);
          }
          else{
            navigator['app'].exitApp();
          }
        }
     }
      
    });
  }

  navigateToHomePage(){
    if (this.dataService.isToken()) {
      let user_type = this.dataService.getUserType();
      if(user_type == "3" || user_type == "1") {
        this.router.navigateByUrl('/employee-tab/tabs/employeeHome');
      }
      if(user_type == "0" ) {
        this.router.navigateByUrl('/student-tab/tabs/studentHome');
      }
    }
  }
}
