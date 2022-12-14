importScripts('../../dist/dummy-pwa/ngsw-worker.js');

self.addEventListener('sync', (event) => {
    if (event.tag === 'post-data') {
        //call method
        event.waitUntil(addData());
    }
});

function addData() {
    //indexDb
    let obj = {
        name: 'PWABackgroundSync'
    };
    fetch('http://localhost:3000/data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    }).then(() => Promise.resolve()).catch(() => Promise.reject());
}

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      console.log('This page was restored from the bfcache.');
    } else {
      console.log('This page was loaded normally.');
    }
  });