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
    console.log(user);
    welcomeUserSm.innerHTML = `<h5 class="welcome-text-sm">Welcome, ${user.firstName}</h5>`;
    welcomeUserLg.innerHTML = `<h5 class="fw-bold welcome-text">Welcome, ${user.firstName}</h5>`;
    
    const todoList = document.querySelector('.row.rounded.display-tasks');
    todoList.innerHTML = ''; // Clear the existing list

    if (user.allTodo.length === 0) {
      noTask.classList.remove('d-none');
      taskImg.classList.replace('d-md-block', 'd-md-none')
      todoList.classList.add('d-none');
    } else {
      noTask.classList.add('d-none');
      todoList.classList.remove('d-none');

      user.allTodo.forEach((todo, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('border-bottom', 'py-2');
        const todoContent = `
        <div class="col-12">
          <div class="text-light">
                <h4 class="text-warning">${index + 1}</h4>
                <h5><span class="text-warning">Title:</span> <span>${todo.todoTitle}</span>  </h5>
                <p><span class="text-warning">Category:</span> <span>${todo.todoCategory}</span>  </p>
                <p><span class="text-warning">Description:</span> <span>${todo.todoDescription}</span>  </p>
                <i><span class="text-warning">Time:</span> <span>${todo.todoTime}</span>  </i>
          </div>
        </div>
        <div class="col-12">
          <div class="row todo-btn">
                <div class="col-6">
                <button class="btn btn-warning">Edit</button>
                </div>
                <div class="col-6">
                <button class="btn btn-danger float-end">Delete</button>
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
  const todoTime = time.value;
  const todoId = generateTodoId(); // Generate unique ID

  if (todoTitle !== '' && todoCategory !== '' && todoDescription !== '' && todoTime !== '') {
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
    }
  } else {
    swal('Invalid Details!', 'Kindly fill all fields correctly.', 'error');
  }
};

// Variable for addTodo button
const addTodoBtn = document.getElementById('addTodoBtn');

// Button to trigger addTodo function
addTodoBtn.addEventListener('click', () => {
  addTodo();
  window.location.href = 'dashboard.html';
});

// Trigger the displayTodo function to initially display the items
displayTodo();