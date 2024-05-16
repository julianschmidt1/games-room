import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MajorMinorComponent } from './major-minor.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ChatComponent } from '../../../components/chat/chat.component';

@NgModule({
  declarations: [
    MajorMinorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MajorMinorComponent }
    ]),
    SidebarComponent,
    ChatComponent
  ]
})
export class MajorMinorModule { }
