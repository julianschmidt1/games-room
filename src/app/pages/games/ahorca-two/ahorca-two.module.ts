import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AhorcaTwoComponent } from './ahorca-two.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ChatComponent } from '../../../components/chat/chat.component';

@NgModule({
  declarations: [
    AhorcaTwoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AhorcaTwoComponent  }
    ]),
    SidebarComponent,
    ChatComponent
  ],
})
export class AhorcaTwoModule { }
