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

        // Get the information in the localStorage if it exists and add userDetails to it
        if (localStorage.localUsers) {
            allUsers = JSON.parse(localStorage.getItem('localUsers'))
            allUsers.map((user) => {
                const userEmail = document.getElementById('email')
                if (userEmail.value == user.Email) {
                    swal('Email Already Exists!', 'Kindly another email address!', 'warning')
                    setTimeout(()=> {
                        window.location.href = 'signUp.html'
                    }, 1000)
                } else {
                    allUsers.push(userDetails)
                    localStorage.setItem('localUsers', JSON.stringify(allUsers))
        
                    // Set the input fields to empty
                    firstName.value = ''
                    lastName.value = ''
                    email.value = ''
                    password.value = ''
        
                    // Alert successful
                    swal("Successful!", "You've registered successfully!", "success")
        
                    // Redirect to sign in page after 3 seconds
                    setTimeout(() => {
                        window.location.href = 'signIn.html'
                    }, 2000);
                }
            })
        } else {
            allUsers.push(userDetails)
            localStorage.setItem('localUsers', JSON.stringify(allUsers))
            
            // Set the input fields to empty
            firstName.value = ''
            lastName.value = ''
            email.value = ''
            password.value = ''

            // Alert successful
            swal("Successful!", "You've registered successfully!", "success")

            // Redirect to sign in page after 3 seconds
            setTimeout(() => {
                window.location.href = 'signIn.html'
            }, 2000);
        }
    }
    else {
        swal("Invalid Details!", "Kindly fill out the fields correctly!", "error")
        setTimeout(()=> {
            window.location.href = 'signUp.html'
        }, 1000)
    }
}