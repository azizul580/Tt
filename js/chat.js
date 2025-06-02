// chat.js
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, onChildAdded } from "firebase/database";
import { auth, db } from './firebase-config.js';

const messagesRef = ref(db, 'messages');

// Send message functionality
document.getElementById('send-btn').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    const user = getAuth().currentUser;

    if (message && user) {
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            uid: user.uid,
            username: user.displayName,
            message: message,
            timestamp: new Date().toISOString()
        }).then(() => {
            document.getElementById('message-input').value = ''; // Clear input after sending
        });
    }
});

// Listen for new messages in real-time
onChildAdded(messagesRef, (snapshot) => {
    const messageData = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${messageData.username}</strong>: ${messageData.message}`;
    document.getElementById('messages').appendChild(messageDiv);
});