import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { NotesService } from 'src/app/services/common/notes.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ToastService } from 'src/app/core/toast/toast.service';
import { base64StringToBlob } from 'blob-util';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-employee-notes',
  templateUrl: './employee-notes.page.html',
  styleUrls: ['./employee-notes.page.scss'],
})
export class EmployeeNotesPage implements OnInit {
  sectionId:any;
  noteList:any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private notesService : NotesService,
    private file: File,
    private alert: AlertService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getSectionNoticesByID();
  }

  getSectionNoticesByID() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadingService.loadingStart();
      this.sectionId = params['sectionId'];
      this.notesService.getNotesBySection(this.sectionId,0,100).subscribe(res => {
        this.loadingService.loadingDismiss();
        if(res && !res.HasError){
          if(res.Data){
            this.noteList = res.Data;
            console.log(this.noteList);
          }
        }
      },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
      });
    })
   
  }

  getImageSource(extention: string) {
    let iconPath = "assets/icon/file/";
    if(extention){
      switch(extention) { 
        case "txt": { 
          iconPath =  iconPath + "txt.png";
          break; 
        } 
        case "zip": { 
          iconPath =  iconPath + "zip.png";
          break; 
        }
        case "pdf": { 
          iconPath =  iconPath + "pdf.png";
          break; 
        }
        case "png": { 
          iconPath =  iconPath + "png.png";
          break; 
        }
        case "jpg": { 
          iconPath =  iconPath + "jpg.png";
          break; 
        }
        case "xls": { 
          iconPath =  iconPath + "xls.png";
          break; 
        }
        case "xlsx": { 
          iconPath =  iconPath + "xls.png";
          break; 
        }
        case "doc": { 
          iconPath =  iconPath + "doc.png";
          break; 
        }
        case "docx": { 
          iconPath =  iconPath + "doc.png";
          break; 
        }
        case "ppt": { 
          iconPath =  iconPath + "ppt.png";
          break; 
        }
        case "pptx": { 
          iconPath =  iconPath + "ppt.png";
          break; 
        }
        default: { 
           //statements; 
           break; 
        } 
     } 
    }else{
      iconPath =  iconPath + "file.png";
    }
    
    return iconPath;
  }

  downloadFile(id){
    this.notesService.getNoteByNoteId(id).subscribe(res =>{
      
      if(!res.HasError){
        this.toastService.presentToast('Download started');
        let file = res.Data;
        //convert base64 into blob
        const blob = base64StringToBlob(file.ByteContent, file.ContentType);
        //setting downloaded file directory to Downlaods
        let path = this.file.externalRootDirectory + '/Download/';
        //Downloading the file
        this.file.writeFile(path, file.FileName, blob, { replace: true }).then(() => {
          this.toastService.presentToast('Download Completed');
        }, 
        err => {
          this.alert.Success("Sorry. An error occurred downloading the file: " + err);
        }
        );
      }
      else{
        this.alert.Success('File Not Found');
      }
    });
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }


}
