// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// LA MISMA configuración
firebase.initializeApp({
  apiKey: "AIzaSyC3CrHmaipg81dByP8rLEhfgtISHvqPAcU",
  authDomain: "beard-tracker-51dcd.firebaseapp.com",
  projectId: "beard-tracker-51dcd",
  messagingSenderId: "543376237533",
  appId: "1:543376237533:web:f33d3ee08f128219e40c34"
});

const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('Notificación en background:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192.png',
        badge: '/badge-72.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});