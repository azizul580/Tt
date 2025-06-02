// profile.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from './firebase-config.js';

// Update profile function
const updateProfile = (username, picUrl) => {
    const user = getAuth().currentUser;
    if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        set(userRef, {
            username: username,
            email: user.email,
            profilePic: picUrl
        }).then(() => {
            console.log("Profile Updated Successfully!");
        }).catch((error) => {
            console.error("Error updating profile: ", error);
        });
};

// Upload profile picture function
const uploadProfilePic = (file) => {
    const user = getAuth().currentUser;
    const fileRef = storageRef(storage, 'profile_pics/' + user.uid);

    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a file!');

        // Get file download URL after upload
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // Save the profile picture URL
            updateProfile(user.displayName, downloadURL);
        });
    }).catch((error) => {
        console.error("Error uploading profile picture: ", error);
    });
};

// Profile picture update button
document.getElementById('update-pic-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('upload-pic');
    const file = fileInput.files[0];
    if (file) {
        uploadProfilePic(file);
    }
});

// Save profile information
document.getElementById('save-profile-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        updateProfile(username, null); // If picture is not updated, only update name
    }
});

// Load profile information on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Fetch user profile data
        get(ref(db, 'users/' + user.uid)).then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('username').value = data.username || '';
                if (data.profilePic) {
                    document.getElementById('profile-pic').src = data.profilePic;
                }
            }
        });
    }
});