import { Component, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dummyPWA';

  buttonClicked(){
    console.log("Button Clicked!")
  }

  constructor(private readonly updates: SwUpdate) {
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
    if (confirm(header + "\n" + message)){
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