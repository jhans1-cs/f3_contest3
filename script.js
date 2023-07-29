// Function to generate a random 16-byte string (access token)
function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  // Function to handle user signup
  function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Validate if all fields are filled
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      document.getElementById('signupMessage').textContent = 'Please fill all fields.';
      return;
    }

  // Validate if password and confirm password match
  if (password !== confirmPassword) {
    document.getElementById('signupMessage').textContent = 'Passwords do not match.'; // Error message
    return;
  }
  
    // Generate and store access token in local storage
    const accessToken = generateAccessToken();
    const user = {
      username,
      email,
      accessToken,
      password
    };
    localStorage.setItem('user', JSON.stringify(user));
  
    // Display success message and redirect to the Profile page
    document.getElementById('signupMessage').textContent = 'Signup successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 2000);
  }
  
  // Function to handle user logout
  function handleLogout() {
    console.log("inside handel")
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  }
  
  // Check if the user is logged in and redirect accordingly
  function checkLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
      // No user or access token found, redirect to Signup page
      window.location.href = 'index.html';
    } else {
      // User is logged in, display profile details
      document.getElementById('profileDetails').innerHTML = `
      
            <h2>User Profile</h2>
            <div class="img-box">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAMFBMVEXk5ueutLfo6uu1u76rsbTLz9He4eLT1tjY29zb3t/BxsjIzM6+w8W6v8Kxt7rP0tS2CkZnAAACjElEQVRoge2Z23KEIAxAIVwUBP3/vy1q125bC8mauNMZzku3Lz0NhGwISnU6nU6n0+l0Oh0FO3dLwzClnFN0o7pNDjBGbQtabz+M87eoYTGb8wurUxBXw2i+W3e1TdJRxxPtHvUgafZn4T7Uk6B3/ttbzFEqZl+xiprnhljIDJX9PcwLvxmmtreYPbs4YLxaG+6QwaC82g7M4hEXsNYzb8jYgNeQWc0eG7DWmVMMEe3VNjCK27XjSTwxhow8SzuGzwuOItZ8RQQSxWtHNrFCH6ZNzFiwCbnFml2tL+If8J1kQvno4otiklend2U1Y+dFO8eOTQyZJOarXLhG7xAzNnzv+nZSihIwZ1dP6kAYv5wITWZpMzm9CtAnmfEwbSzYkC2rtoT8poCVGpAhs18XIaNui6wp/Qkiv1h76oPQ9rJeXw6gtc2WtVjizWLedaxXXWcxbzH/PWGTyasntbNnaqvFx6ig4i+1nQXGTGfqydhDXj7k4a5ZOSi/xGQKOU3D+vttwDM3GUt/H4ZlijEVYpzcELySfZgofzssKa8bfOzx/nnOyY1CSw4QXJ5Pz9LjP8jTyB14sa4PL5W69ZAnzgwH7xDWQx6ZagmEhLZ+qjPDWBFCpml3t7moBk+M9kk9XlGXvX1Ju6njq29gEBCvEDXz/Np6E+eIp+r0ijdd9q5B0+/KF3b3m5qWY0Cc89TMlI2GdgstYw6k8RKf2ZOmSwiw+4y6npFA5TZttoQCd6cijDvwZkS3j736E83NxRZY6I3mKyvIeJujAqmA2yELaVtPjs1L/wXqI07SkxqR96x0I70kischrhQRuZxeqcxIaK+mVGpDoWttZYtK2cxGkFrjB6JUlrrT6XT+Ax+jLRx4g+DlIwAAAABJRU5ErkJggg==" alt="">
            </div>

            <p>Username:<span id="username">${user.username}</p>
            <p>Email:<span id="email">${user.email}</p>
            <p>Token:<span id="token">${user.accessToken}</span></p>
            <p>Password: <span id="password">${user.password}</span></p>
            <button id="logoutBtn">Logout</button>
        `;

    
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    }
  }
  

    if (!window.location.pathname.includes('profile.html')) {
        // checkLogin();
        document.getElementById('signupForm').addEventListener('submit', handleSignup);
    }
  
  // Check login status when the Profile page loads
  if (window.location.pathname.includes('profile.html')) {
    checkLogin();
  }

  console.log(window.location);