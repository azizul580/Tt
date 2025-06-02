// notifications.js
import { getDatabase, ref, onChildAdded } from "firebase/database";
import { db } from './firebase-config.js';

const notificationsRef = ref(db, 'notifications');

// Listen for new notifications in real-time
onChildAdded(notificationsRef, (snapshot) => {
    const notificationData = snapshot.val();
    const notificationDiv = document.createElement('div');
    notificationDiv.classList.add('notification');
    notificationDiv.innerHTML = `<strong>${notificationData.username}</strong>: ${notificationData.message}`;
    document.getElementById('notifications').appendChild(notificationDiv);
});