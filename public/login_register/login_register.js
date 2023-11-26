function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

function login() {
    // Implement login functionality
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    // API call to login endpoint

    // On success: redirect to homepage
    // On failure: show error
    document.getElementById('loginError').textContent = 'Incorrect username or password.';
}

function register() {
    // Implement registration functionality
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    // API call to register endpoint

    // On success: redirect to login page
    // On failure: show error
    document.getElementById('registerError').textContent = 'Error registering user.';
}
