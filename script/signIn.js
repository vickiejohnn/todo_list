const signInBtn = document.getElementById('signInBtn')
const allUsers = JSON.parse(localStorage.getItem('localUsers'))

signInBtn.addEventListener('click', ()=> {
    
    // Function to check if the provided email and password match a user in the array
    const signIn = (email, password) => {
        // The array.find() line to search for a user with the provided email
        const user = allUsers.find(user => user.Email == email)
    
        // If a user is found and the password matches, return true
        if (user && user.Password == password) {
            return true;
        }
    
        // If the user is not found or the password is incorrect, return false
        return false;
    }
    
    const email = userEmail.value
    const myPassword = userPassword.value

    if (signIn(email, myPassword)) {
        console.log('Sign-in successful!');
        swal('Verified', 'You\'re successfully signed in!', 'success')
        setTimeout(()=> {
            window.location.href = 'dashboard.html'
        }, 3000)
    } else {
        console.log('Invalid username or password.');
        swal('Invalid Email/Password!', 'Unable to sign in, kindly fill out the fields correctly!', 'error')
        setTimeout(()=> {
            window.location.href = 'signIn.html'
        }, 3000)
    }
})  