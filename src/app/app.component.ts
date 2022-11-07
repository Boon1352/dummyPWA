import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from './services/push-notification.service';

const PUBLIC_VAPID_KEY_OF_SERVER = "BPcPhBbx_r5n2QSNYOIE1WlAobzURzA3BRCwletCI7I06g9RuTpymyVDiGwrXF-ML1DvRNbHp9RuY4jnhk905iU";

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
    private pushNotification : PushNotificationService,
    ) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });

    if( swPush.isEnabled){

      swPush.requestSubscription({
        serverPublicKey :  PUBLIC_VAPID_KEY_OF_SERVER
      })
      .then( subscription => {
        
        //send subsription to server
        this.pushNotification.SendSubsriptionToServer(subscription).subscribe() ;
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

  showNotification(){
    console.log('Clicked!!!!');
    this.pushNotification.ShowNotificationPayloadToUser();
  }

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