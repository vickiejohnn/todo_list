// Variable for signIn button
const signInBtn = document.getElementById('signInBtn')

signInBtn.addEventListener('click', ()=> {
    // Variables for email and password input
    const em = document.getElementById('userEmail')
    const ps = document.getElementById('userPassword')
    
    // Function for user login
    const loginUser = () => {
        // Variables for email and password input values
        const email = em.value;
        const password = ps.value;
    
        const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
        const user = allUsers[email];
    
        if (user && user.password === password) {
            localStorage.setItem('loggedInUser', email);
            localStorage.setItem('isLoggedIn', 'true');
            return true; // Login successful
        }
    
        return false; // Login failed
    }
    
    if (loginUser()) {
        console.log('Sign-in successful!');
        swal('Verified', 'You\'re successfully signed in!', 'success')
        setTimeout(()=> {
            window.location.href = 'dashboard.html'
        }, 1000)
    } else {
        console.log('Invalid username or password.');
        swal('Invalid Email/Password!', 'Unable to sign in, kindly fill out the fields correctly!', 'error')
        setTimeout(()=> {
            window.location.href = 'signIn.html'
        }, 1000)
    }
})