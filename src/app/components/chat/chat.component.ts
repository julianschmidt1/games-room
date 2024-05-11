import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  private _auth = inject(Auth);
  public visible: boolean = true;
  public currentUser: any;
  public newMessage: string = '';

  public ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
    console.log(this.currentUser);
  }

  public messages: Array<MessageModel> = [
    { message: 'Hola amigos como esytan maravilloso dia Hola amigos como esytan maravilloso diaHola amigos como esytan maravilloso dia', date: new Date().toString(), createdBy: 'julito' },
    { message: 'Yo le dije milei se la come pero nadie me creia jajaja', date: new Date().toString(), createdBy: 'julito2' },
    { message: '💀💀💀', date: new Date().toString(), createdBy: 'julito3' },
    { message: 'JAJJAJAJ', date: new Date().toString(), createdBy: 'julito4' },
  ];

  public handleSubmitMessage(event: any, iconPress?: boolean) {
    const newMessage = this.newMessage.trim();
    if (!newMessage) return;

    const chat = document.getElementById('chat-scroll');
    if (event.key === 'Enter' || iconPress) {
      this.messages = [
        ...this.messages,
        {
          message: newMessage,
          date: new Date().toString(),
          createdBy: this.currentUser?.email
        }
      ];
      this.newMessage = '';

      console.log(this.messages)

    }
  }
}

interface MessageModel {
  message: string,
  date: string,
  createdBy: string,
} 
