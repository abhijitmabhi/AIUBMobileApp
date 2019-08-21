import { NoteUpload } from '../modals/note-upload/note-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticeUpload } from '../modals/notice-upload/notice-upload';
import { MaterialModule } from '../core/modules/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [NoteUpload, NoticeUpload],
  exports: [NoteUpload, NoticeUpload]
})
export class ModalsModule { }
