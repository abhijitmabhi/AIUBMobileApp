import { ComponentsModule } from 'src/app/core/components/components.module';
import { Network } from '@ionic-native/network/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/interceptor/intercept.service';
import { BrowserModule } from '@angular/platform-browser';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { NetworkService } from './core/network/network.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    Network,
    NetworkService,
    StatusBar,
    SplashScreen,
    OneSignal,
    File,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
