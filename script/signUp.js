// Variable Declaration
// An empty array is created for all users' details
const signUpBtn = document.getElementById('signUpBtn')
let allUsers = []

// This button triggers the signUp function
signUpBtn.addEventListener('click', ()=> {
    signUp()
})

// This signUp function is triggered at the click of the button
const signUp = ()=> {
    if (firstName.value != '' && lastName.value != '' && email.value != '' && password.value != '') {
        let userDetails = {
            FirstName: firstName.value,
            LastName: lastName.value,
            Email: email.value,
            Password: password.value
        }
        allUsers.push(userDetails)
        localStorage.setItem('localUsers', JSON.stringify(allUsers))
        swal("Successful!", "You've registered successfully!", "success")
        console.log('Registration successful!');
        setTimeout(() => {
            window.location.href = 'signIn.html'
        }, 3000);
    }
    else {
        swal("Invalid Details!", "Kindly fill out the fields correctly!", "error")
        console.log('Invalid Details!');
    }
}