// Variable for retrieved value of 'isLoggedIn' key
const isloggedIn = localStorage.getItem('isLoggedIn');

// Authenticate User
if (isloggedIn !== 'true') {
  console.log('User is not logged in');
  swal('Warning!', 'You\'re not logged in', 'warning');
  setTimeout(() => {
    window.location.href = 'signIn.html';
  }, 1000);
}

// Function to get current user's email
const getCurrentUser = () => {
  return localStorage.getItem('loggedInUser');
};

// Function to generate a timestamp-based ID for each to-do
const generateTodoId = () => {
  return Date.now().toString();
};

// Variables for dashboard displays
const welcomeUserSm = document.querySelector('.sm-welcome');
const welcomeUserLg = document.querySelector('.lg-welcome');
const noTask = document.querySelector('.no-task');
const taskImg = document.querySelector('.task-image');

// Variable for deleteAll button
const deleteAllBtn = document.getElementById('deleteAllBtn');

// Variables for todo input
const title = document.getElementById('title');
const category = document.getElementById('category');
const description = document.getElementById('description');
const time = document.getElementById('time');

// Function to display to-do
const displayTodo = () => {
  // Variables for user details
  const email = getCurrentUser();
  const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
  const user = allUsers[email];

  if (user) {
    welcomeUserSm.innerHTML = `<h5 class="welcome-text-sm">Welcome, ${(user.firstName).toUpperCase()}</h5>`;
    welcomeUserLg.innerHTML = `<h5 class="fw-bold welcome-text">Welcome, ${(user.firstName).toUpperCase()}</h5>`;

    const todoList = document.querySelector('.row.rounded.display-tasks');
    todoList.innerHTML = ''; // Clear the existing list

    if (user.allTodo.length === 0) {
      noTask.classList.remove('d-none');
      taskImg.classList.replace('d-md-block', 'd-md-none')
      todoList.classList.add('d-none');
      deleteAllBtn.classList.add('d-none');
    } else {
      noTask.classList.add('d-none');
      todoList.classList.remove('d-none');
      deleteAllBtn.classList.remove('d-none');

      user.allTodo.forEach((todo, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('border-bottom', 'py-2');

        // Capitalize to-do category
        const category = todo.todoCategory
        const firstLetter = category.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const restLetters = category.slice(1);
        const todoCategoryCap = firstLetterCap + restLetters;

        // Display results
        const todoContent = `
        <div class="col-12">
          <div class="text-light">
            <h4 class="text-warning">${index + 1}</h4>
            <h5><span class="text-warning">Title:</span> <span>${(todo.todoTitle).toUpperCase()}</span>  </h5>
            <p><span class="text-warning">Category:</span> <span>${(todoCategoryCap)}</span>  </p>
            <p><span class="text-warning">Description:</span> <span>${todo.todoDescription}</span>  </p>
            <i><span class="text-warning">Date-Time:</span> <span>${todo.todoTime}</span>  </i>
          </div>
        </div>
        <div class="col-12">
          <div class="row todo-btn">
              <div class="col-6">
                <button class="btn btn-warning" onclick="editTodo(${index})">Edit</button>
              </div>
              <div class="col-6">
                <button class="btn btn-danger float-end" onclick="deleteTodo(${index})">Delete</button>
              </div>
          </div>
        </div>
        `;

        listItem.innerHTML = todoContent;
        todoList.appendChild(listItem);
      });
    };
  };
};

// Function to add new item
const addTodo = () => {
  // Variables for todo input values
  const todoTitle = title.value;
  const todoCategory = category.value;
  const todoDescription = description.value;

  if (time.value === '') {
    const todoTime = ''
    const todoId = generateTodoId(); // Generate unique ID
  
    if (todoTitle !== '' || todoCategory !== '' || todoDescription !== '' || todoTime !== '') {
      // Variables for user details
      const email = getCurrentUser();
      const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
      const user = allUsers[email];
  
      if (user) {
        const todoSchema = {
          todoTitle,
          todoCategory,
          todoDescription,
          todoTime,
          todoId
        };
  
        user.allTodo.push(todoSchema);
        localStorage.setItem('localUsers', JSON.stringify(allUsers));
      };
    } else {
      swal('Invalid Details!', 'Kindly fill the fields correctly.', 'error');
    };
  } else {
    const initialTodoTime = time.value;
    // Convert date and time to a more readable format
    const dateTime = new Date(initialTodoTime);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    const todoTime = `${formattedDate} ${formattedTime}`|| {}; // Formatted date/time
    const todoId = generateTodoId(); // Generate unique ID
  
    if (todoTitle !== '' || todoCategory !== '' || todoDescription !== '' || todoTime !== '') {
      // Variables for user details
      const email = getCurrentUser();
      const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
      const user = allUsers[email];
  
      if (user) {
        const todoSchema = {
          todoTitle,
          todoCategory,
          todoDescription,
          todoTime,
          todoId
        };
  
        user.allTodo.push(todoSchema);
        localStorage.setItem('localUsers', JSON.stringify(allUsers));
      };
    } else {
      swal('Invalid Details!', 'Kindly fill the fields correctly.', 'error');
    };
  }
};

// Functions for addTodo event listener callbacks
const addTodoButtonClickHandler = () => {
  addTodo();
  window.location.href = 'dashboard.html';
};

const enterKeyPressHandler = (event) => {
  if (event.key === 'Enter') {
    addTodo();
    window.location.href = 'dashboard.html';
  }
};

// Variable for addTodo button
const addTodoBtn = document.getElementById('addTodoBtn');

// Add event listeners using the named functions
addTodoBtn.addEventListener('click', addTodoButtonClickHandler);
window.addEventListener('keydown', enterKeyPressHandler);

// Trigger the displayTodo function to initially display the items
displayTodo();

// Function for deleteAllTodo
const deleteAllTodo = () => {
  // Variables for user details
  const email = getCurrentUser();
  const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
  const user = allUsers[email];

  if (user) {
    // Confirm before delete
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your todo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          user.allTodo.splice(0);
          localStorage.setItem('localUsers', JSON.stringify(allUsers))
          window.location.href = 'dashboard.html'
          swal("Poof! Your todo has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your todo is safe!");
        };
      });
  };
};

// Trigger deleteAllTodo function with button
deleteAllBtn.addEventListener('click', () => {
  deleteAllTodo();
});

// Function to delete a to-do item
const deleteTodo = (index) => {
  // Variables for user details
  const email = getCurrentUser();
  const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
  const user = allUsers[email];
  const todoIndex = index;
    
  // Confirm and delete item
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover the item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      user.allTodo.splice(todoIndex, 1);
      localStorage.setItem('localUsers', JSON.stringify(allUsers));
      window.location.href = 'dashboard.html';
      swal("Poof! The item has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your item is safe!");
    };
  });
};

// Variable for to-do form heading
const formHeading = document.querySelector('.todo-form-heading');

// Function to edit a to-do item
const editTodo = (index) => {
  // Variables for user details
  const email = getCurrentUser();
  const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
  const user = allUsers[email];
  // Retrieve specific todo using the index
  const todo = user.allTodo[index];

  // Check if the todo has the least one of the required properties
  if (todo && (todo.todoTitle || todo.todoCategory || todo.todoDescription || todo.todoTime)) {
    // Edit to-do form displays
    formHeading.innerText = 'Edit Task';
    addTodoBtn.innerText = 'Update Todo';
    title.value = todo.todoTitle;
    category.value = todo.todoCategory;
    description.value = todo.todoDescription;

    if (!todo.todoTime) {
      // Set time input field to empty
      time.value = '';
  
      // Function to update edited todo
      const updateTodo = () => {
        // Update the todo object with the new values
        todo.todoTitle = title.value;
        todo.todoCategory = category.value;
        todo.todoDescription = description.value;

        if (time.value === '') {
          // Set time from the todo object to empty
          todo.todoTime = '';
      
          // Save the updated todo to localStorage
          localStorage.setItem('localUsers', JSON.stringify(allUsers));
      
          // Redirect to the dashboard or update the display as needed
          window.location.href = 'dashboard.html'

        } else {
          const initialTodoTime = time.value;
      
          // Convert date and time to a more readable format
          const dateTime = new Date(initialTodoTime);
          const formattedDate = dateTime.toLocaleDateString();
          const newFormattedTime = dateTime.toLocaleTimeString();
          todo.todoTime = `${formattedDate} ${newFormattedTime}`; // Formatted date/time

          // Save the updated todo to localStorage
          localStorage.setItem('localUsers', JSON.stringify(allUsers));
      
          // Redirect to the dashboard or update the display as needed
          window.location.href = 'dashboard.html'
        };
      };
  
      // Remove event listeners for addTodo functions
      addTodoBtn.removeEventListener('click', addTodoButtonClickHandler);
      window.removeEventListener('keydown', enterKeyPressHandler);
  
      // Functions for updateTodo event listener callbacks
      const updateTodoButtonClickHandler = () => {
        updateTodo();
      };
  
      const updateTodoEnterKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
          updateTodo();
        }
      };
  
      // Add event listeners using the named functions
      addTodoBtn.addEventListener('click', updateTodoButtonClickHandler);
      window.addEventListener('keydown', updateTodoEnterKeyPressHandler);
  
      return; // Exit this function if everything is successful

    } else {
      // Covert date and time back to the original format and display to the input
      const formattedTime = todo.todoTime;
      let originalTime = new Date(formattedTime);
      const newFormat = originalTime.toISOString().slice(0, 16);
      time.value = newFormat;
  
      // Function to update edited todo
      const updateTodo = () => {
        // Update the todo object with the new values
        todo.todoTitle = title.value;
        todo.todoCategory = category.value;
        todo.todoDescription = description.value;
        
        if (time.value === '') {
          // Set todo time to empty
          todo.todoTime = '';
      
          // Save the updated todo to localStorage
          localStorage.setItem('localUsers', JSON.stringify(allUsers));
      
          // Redirect to the dashboard or update the display as needed
          window.location.href = 'dashboard.html'

        } else {
          // Declaration for original time and date
          const initialTodoTime = time.value;
      
          // Convert date and time to a more readable format
          const dateTime = new Date(initialTodoTime);
          const formattedDate = dateTime.toLocaleDateString();
          const newFormattedTime = dateTime.toLocaleTimeString();
          todo.todoTime = `${formattedDate} ${newFormattedTime}`; // Formatted date/time

          // Save the updated todo to localStorage
          localStorage.setItem('localUsers', JSON.stringify(allUsers));
      
          // Redirect to the dashboard or update the display as needed
          window.location.href = 'dashboard.html'
        };
      };
  
      // Remove event listeners for addTodo functions
      addTodoBtn.removeEventListener('click', addTodoButtonClickHandler);
      window.removeEventListener('keydown', enterKeyPressHandler);
  
      // Functions for updateTodo event listener callbacks
      const updateTodoButtonClickHandler = () => {
        updateTodo();
      };
  
      const updateTodoEnterKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
          updateTodo();
        }
      };
  
      // Add event listeners using the named functions
      addTodoBtn.addEventListener('click', updateTodoButtonClickHandler);
      window.addEventListener('keydown', updateTodoEnterKeyPressHandler);
  
      return; // Exit this function if everything is successful
    };
  };
};