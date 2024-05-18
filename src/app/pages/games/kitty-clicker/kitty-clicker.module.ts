import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KittyClickerComponent } from './kitty-clicker.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ChatComponent } from '../../../components/chat/chat.component';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    KittyClickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: KittyClickerComponent }
    ]),
    SidebarComponent,
    ChatComponent,
    ToastModule,
    TooltipModule
  ]
})
export class KittyClickerModule { }
