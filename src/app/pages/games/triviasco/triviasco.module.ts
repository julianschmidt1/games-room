import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TriviascoComponent } from './triviasco.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ChatComponent } from '../../../components/chat/chat.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    TriviascoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TriviascoComponent }
    ]),
    SidebarComponent,
    ChatComponent,
    ToastModule
  ]
})
export class TriviascoModule { }
