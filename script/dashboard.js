const welcomeUser = document.querySelector('.welcome-user')

// Function to retrieve the user from the localStorage using the stored userIndex
const getUserFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('localUsers'))
    const userIndex = localStorage.getItem('userIndex');
    if (userIndex !== null) {
      const index = parseInt(userIndex, 10);
      if (!isNaN(index) && index >= 0 && index < users.length) {
        return users[index];
    }
}
return null;
}

// Trigger the getUserFromLocalStorage() function
const user = getUserFromLocalStorage();

if (user !== null) {
    console.log(user);
    welcomeUser.innerHTML = `<h5 class="fw-bold welcome-text">Welcome, ${user.FirstName}</h5>`
  } else {
    console.log('User not found.');
  }
  