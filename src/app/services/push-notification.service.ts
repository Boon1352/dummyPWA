
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { lastValueFrom } from 'rxjs';

const subscribeURL = 'http://localhost:3000/subscription/';
const notificationURL = 'http://localhost:3000/sendNotification/';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor( private _httpService : Http) { }

  SendSubsriptionToServer( subscription : PushSubscription){
    return this._httpService.post( subscribeURL , subscription  );
  }

  ShowNotificationPayloadToUser(){
    return lastValueFrom(
      this._httpService.post(notificationURL, "")
    );
  }
}
