import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { stringToColor } from '../../helpers/textToColor.helper';
import { ToastService } from '../../services/toast.service';

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
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScroll', { static: false }) chatScroll: ElementRef | null = null;

  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _toastService = inject(ToastService);
  public visible: boolean = true;
  public currentUser: any;
  public newMessage: string = '';
  private chatSubscription!: Subscription;
  public messages: Array<MessageModel> = [];


  public ngOnInit(): void {
    this._auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        this.currentUser = loggedUser;
      }
    });

    const messagesCollection = collection(this._firestore, 'chatMessages');
    const obs = collectionData(messagesCollection);

    this.chatSubscription = obs.subscribe({
      next: (response) => {
        const castedResponse = response as Array<MessageModel>
        this.messages = castedResponse.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      error: (error) => {
        this._toastService.errorMessage('Ocurrio un error al cargar los mensajes');
        console.log(error);
      }
    })

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  get stringToColor() {
    return stringToColor;
  }

  private scrollToBottom() {
    if (this.chatScroll?.nativeElement) {
      const { nativeElement } = this.chatScroll;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }

  public handleSubmitMessage(event: any, iconPress?: boolean) {
    const newMessage = this.newMessage.trim();
    if (!newMessage) return;

    if (event.key === 'Enter' || iconPress) {
      const messageObject: MessageModel = {
        message: newMessage,
        date: new Date().toISOString(),
        createdBy: this.currentUser?.email,
        displayName: this.currentUser?.displayName
      }

      this.newMessage = '';
      const messagesCol = collection(this._firestore, 'chatMessages');
      addDoc(messagesCol, messageObject);
      this.scrollToBottom();
    }
  }
}

interface MessageModel {
  message: string,
  date: string,
  createdBy: string,
  displayName: string,
} 
