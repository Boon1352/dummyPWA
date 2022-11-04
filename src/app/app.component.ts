import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dummyPWA';
  private readonly PUBLIC_VAPID_KEY_OF_SERVER = "BA-6TpMiTPp3zwWDNwDxF3KTUQ8nTjOfToDc1xa4VkrIlk41lMVl4850iOypw-g6TFYYN-Q768Ee_6KpAWliU-I";

  buttonClicked() {
    console.log("Button Clicked!")
  }

  constructor(
    private readonly updates: SwUpdate,
    private swPush: SwPush,
    private newsletterService: NewsletterService) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
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

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_VAPID_KEY_OF_SERVER
    })
      .then(sub => {
        console.log('Notification Subscription: ', sub);
        this.newsletterService.addPushSubscriber(sub).subscribe();
      })
      .catch(err => console.error('Could not subscribe due to:', err));
  }

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