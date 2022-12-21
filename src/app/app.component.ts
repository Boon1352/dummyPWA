import { Component } from '@angular/core';
import { SwPush, SwRegistrationOptions, SwUpdate } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { PushNotificationService } from './services/push-notification.service';

const PUBLIC_VAPID_KEY_OF_SERVER = "BHHL2x0m8LKxLadCBXalegN7mJAqmhEppBc58aXBpV5f_HVcTGpxYh0flNPkLp566eeGeBpmFB1R3K49E7L1enc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dummyPWA';

  buttonClicked() {
    console.log("Button Clicked!")
  }

  constructor(
    private readonly updates: SwUpdate,
    private swPush: SwPush,
    private pushNotification: PushNotificationService,
    private http: HttpClient
  ) {
    this.updates.versionUpdates.subscribe(event => {
      this.showAppUpdateAlert();
    });

    if (swPush.isEnabled) {

      swPush.requestSubscription({
        serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER
      })
        .then(subscription => {

          //send subsription to server
          this.pushNotification.SendSubsriptionToServer(subscription).subscribe();
        })
        .catch(console.error);
    }

  }

  showAppUpdateAlert() {
    const header = 'App Update available';
    const message = 'Choose Ok to update';
    const action = this.doAppUpdate;
    const caller = this;
    // Use MatDialog or ionicframework's AlertController or similar
    if (confirm(header + "\n" + message)) {
      console.log("Confirmation IF condition")
      action;
    }
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  showNotification() {
    console.log('Clicked!!!!');
    this.pushNotification.ShowNotificationPayloadToUser();
  }

  // postSync() {
  //   let obj = {
  //     name: 'PWABackgroundSync'
  //   };
  //   //api call
  //   this.http.post('http://localhost:3000/data/', obj).subscribe(res => {
  //     console.log(res);
  //   }, err => {
  //     this.backgroundSync();
  //   })
  // }

  // backgroundSync() {
  //   navigator.serviceWorker.ready.then((swRegistration) =>
  //   swRegistration.sync.register('post-data')).catch(console.log);
  // }

  // interface SyncManager {
  //   getTags(): Promise<string[]>;
  //   register(tag: string): Promise<void>;
  // }
  
  // declare global {
  //   interface ServiceWorkerRegistration {
  //     readonly sync: SyncManager;
  //   }
  
  //   interface SyncEvent extends ExtendableEvent {
  //     readonly lastChance: boolean;
  //     readonly tag: string;
  //   }
  
  //   interface ServiceWorkerGlobalScopeEventMap {
  //     sync: SyncEvent;
  //   }
  
  

  // constructor (private readonly swUpdate: SwUpdate){
  //   if (this.swUpdate.available){
  //     this.swUpdate.available.subscribe(() => {
  //       if (confirm('New version is available, update now?')){
  //         console.log("Confirmation IF condition")
  //         window.location.reload();
  //       }
  //     })
  //   }
  // }

  // subscribeToNotification() {
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.PUBLIC_VAPID_KEY_OF_SERVER
  //   })
  //     .then(sub => {
  //       console.log('Notification Subscription: ', sub);

  //     })
  //     .catch(err => console.error('Could not subscribe due to:', err));
  // }

}

// @Injectable({
//   providedIn: 'root'
// })
// export class AppUpdateService {
// constructor(private readonly updates: SwUpdate) {
//   this.updates.available.subscribe(event => {
//     this.showAppUpdateAlert();
//   });
// }
// showAppUpdateAlert() {
//   const header = 'App Update available';
//   const message = 'Choose Ok to update';
//   const action = this.doAppUpdate;
//   const caller = this;
//   // Use MatDialog or ionicframework's AlertController or similar
//   if (confirm(header + "\n" + message)){
//     console.log("Confirmation IF condition")
//     this.action;
//   }
// }
// doAppUpdate() {
//     this.updates.activateUpdate().then(() => document.location.reload());
//   }
// }