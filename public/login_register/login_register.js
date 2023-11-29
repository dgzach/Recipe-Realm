// Handle user signup
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;

    // Validate the input here (e.g., check if passwords match)
    if (password !== password2) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (response.status === 201) {
            location.reload();
        } else {
            return response.text(); // Get the actual error message
        }
    })
    .then(text => {
        if (text) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = text; // Display the error message from the server
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Error occurred during registration.';
    });
});

// Handle user login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            // Store access token and username in local storage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('username', data.username); // Assuming username is included in response
            window.location.href = '../home/home.html'; // Redirect to home page
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const container = document.getElementById('container');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
