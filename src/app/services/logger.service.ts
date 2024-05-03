import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private firestore = inject(Firestore);

  createLog(username: string, collectionName: string): Promise<DocumentReference> {
    let logsCollection = collection(this.firestore, collectionName);
    const timestamp = new Date();

    return addDoc(logsCollection, { username, timestamp });
  }
}
