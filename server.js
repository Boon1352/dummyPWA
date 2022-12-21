
const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

//your generated key pairs, 
const PUBLIC_VAPID = 'BHHL2x0m8LKxLadCBXalegN7mJAqmhEppBc58aXBpV5f_HVcTGpxYh0flNPkLp566eeGeBpmFB1R3K49E7L1enc';
const PRIVATE_VAPID = 'Rp3wfxN4felqrH3s3dgu-wOIVFnF8aQoMJAFaiY1Bqg';

const fakeDatabase = [];

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails(
    'mailto:yourname@domain.com', 
    PUBLIC_VAPID, 
    PRIVATE_VAPID
    );

app.post('/subscription', (req, res) => {
    const subscription = req.body;
    fakeDatabase.push(subscription);
    return res.sendStatus(200);
});

app.post('/data', (req, res) => {
    console.log('request came!');
    const userData = req.body;
    console.log(JSON.stringify(userData));
    res.send(userData);
});


//sends push notifications ,  call it thorugh postman
app.post('/sendNotification', (req, res) => {

    const notificationPayload = {
        notification: {
            title: 'New Notification',
            body: 'Angular Push Notification Body',
            icon: 'assets/icons/icon-512x512.png'
        }
    };

    const promises = [];
    fakeDatabase.forEach(subscription => {
        promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
    });
    Promise.all(promises).then(() => res.sendStatus(200).json({message: 'Notifications sent successfully.'})).catch(err => {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
    });
    
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});



