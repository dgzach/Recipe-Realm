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
            window.location.href = 'login_register.html'; // Redirect to login page
        } else if (response.status === 409) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'User already exists.';
        } else {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Something went wrong.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Error occurred during registration.';
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
