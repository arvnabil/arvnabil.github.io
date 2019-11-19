// Simulasi PUSH menggunakan Cara dari diskusi Akademi
// link : https://www.dicoding.com/academies/74/discussions/16909
var webPush = require('web-push');

const vapidKeys = {
    // publicKey dan privateKey diambil dari terminal : web-push generate-vapid-keys --json
    "publicKey":"BGl5kHmS-U1Xy0SZ-ymXVDXfCLQXf6cHj-0cGUp1qKpkAkVmHanDcK7Lq_rxLyrSezz-4CKD5YkNIVM7DcuXT1M",
    "privateKey":"zAMayhaA8lSr3hi-KU9CEfL9oZEj6PJqQP9DTrw2H_8"
};
// Server Key firebase console : AAAAWS50PW4:APA91bFGHAwIrAsT9zBKOwyYLo5rMMh2XyKt4wWG-V9j6L7jBQHMB1dgdAZ9RfEe5R43cgk_SSI5-8Wu25Xk0Wi4oWpfi1mkocrJf36F0BT4PIUBfCA8AIicKwdP9q7lJet4Jow_bLkI
webPush.setGCMAPIKey('AAAAWS50PW4:APA91bFGHAwIrAsT9zBKOwyYLo5rMMh2XyKt4wWG-V9j6L7jBQHMB1dgdAZ9RfEe5R43cgk_SSI5-8Wu25Xk0Wi4oWpfi1mkocrJf36F0BT4PIUBfCA8AIicKwdP9q7lJet4Jow_bLkI');
webPush.setVapidDetails(
    'mailto:example@yourdomain.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    // diambil dari console
    endpoint: 'https://fcm.googleapis.com/fcm/send/e3Vm0JWpIuY:APA91bG5RiDaRXPUfrGawZmNjSF6bLkozG4tSrHxTKnAXLV8GzA5e0oKDfEH_8xTE2JtXTFSW5yORK-hGEocQFbVj-ySPlqk3wp3QsYDqIQGyc0K5FLYFnNLYspyTDe9ZoHqlTVwFP3m',
    keys: {
        auth: '95Ou3mCrrr36_uWcDuBc6w',
        p256dh: 'BBvuIiuJRYAbu3ZfEjzdIU4-ilfTD7YYHK7Cut2Gr2Ejt6-hrflXj7FBBpr7T58rolKFv6YbgYnMtrwfSJQMIOs'
    }
};

// test lewat terminal : node push.js
webPush.sendNotification(pushSubscription, 'Notifikasi NBola.net');