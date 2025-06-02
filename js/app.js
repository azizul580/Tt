// Wait for the document to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Firebase config (you should already have this from your Firebase console)
    const firebaseConfig = {
        apiKey: "AIzaSyD0xMxwVOyqgZut57URSjtK6BAKckm-JY4",
        authDomain: "casino-572a1.firebaseapp.com",
        projectId: "casino-572a1",
        storageBucket: "casino-572a1.firebasestorage.app",
        messagingSenderId: "369051252878",
        appId: "1:369051252878:web:cc10207570fc8be91ef1df",
        measurementId: "G-N6DYRYB308"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Show Sign Up form and hide Login form
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('signup-error-message').style.display = 'none'; // Hide error message on switching to sign-up
    });

    // Show Login form and hide Sign Up form
    document.getElementById('show-login').addEventListener('click', () => {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('login-error-message').style.display = 'none'; // Hide error message on switching to login
    });

    // Signup functionality
    document.getElementById('signup-btn').addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simple form validation
        if (!email || !password) {
            document.getElementById('signup-error-message').textContent = "Please fill in all fields.";
            document.getElementById('signup-error-message').style.display = 'block';
            return;
        }

        // Create a new user with email and password
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log("Signed up successfully", userCredential.user);
                window.location.href = 'chat.html'; // Redirect to chat page after successful signup
            })
            .catch(error => {
                const errorMessage = error.message;
                document.getElementById('signup-error-message').textContent = errorMessage;
                document.getElementById('signup-error-message').style.display = 'block';
            });
    });

    // Login functionality
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simple form validation
        if (!email || !password) {
            document.getElementById('login-error-message').textContent = "Please fill in all fields.";
            document.getElementById('login-error-message').style.display = 'block';
            return;
        }

        // Sign in the user with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log("Logged in successfully", userCredential.user);
                window.location.href = 'chat.html'; // Redirect to chat page after successful login
            })
            .catch(error => {
                const errorMessage = error.message;
                document.getElementById('login-error-message').textContent = errorMessage;
                document.getElementById('login-error-message').style.display = 'block';
            });
    });
});
