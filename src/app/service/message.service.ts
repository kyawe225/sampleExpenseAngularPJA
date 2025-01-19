import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private data = new BehaviorSubject("");
  constructor() { }

  next(value : string){
    this.data.next(value)
  }

  get currentData() {
    return this.data.getValue();
  }

}
