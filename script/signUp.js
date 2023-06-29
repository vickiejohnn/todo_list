// Variable declarations
const signUpBtn = document.getElementById('signUpBtn');
const fName = document.getElementById('firstName');
const lName = document.getElementById('lastName');
const em = document.getElementById('email');
const ps = document.getElementById('password');


// Button to trigger the signUp function
signUpBtn.addEventListener('click', ()=> {
    signUp()
});

// Function for user registration
const signUp = () => {
    const firstName = fName.value;
    const lastName = lName.value;
    const email = em.value;
    const password = ps.value;

    if (firstName === '' && lastName === '' && email === '' && password === '') {
        swal("Invalid Details!", "Kindly fill out the fields correctly!", "error");
        return;
    };
    
    // Get the information in the localStorage
    const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
    
    // Check if email already exists
    if (allUsers[email]) {
        swal('Email Already Exists!', 'Kindly another email address!', 'warning');
        return;
    };
    
    allUsers[email] = {
        firstName,
        lastName,
        password,
        allTodo: []
    };
    
    localStorage.setItem('localUsers', JSON.stringify(allUsers));
    
    // Set the input fields to empty
    fName.value = '';
    lName.value = '';
    em.value = '';
    ps.value = '';
    
    // Alert registration successful
    swal("Successful!", "You've registered successfully!", "success");
    
    // Redirect to sign in page after 1 second
    setTimeout(() => {
        window.location.href = 'signIn.html';
    }, 1000);
};