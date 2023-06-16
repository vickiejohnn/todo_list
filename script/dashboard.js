// =================== User/Todo Information ================== //

const welcomeUserSm = document.querySelector('.sm-welcome')
const welcomeUserLg = document.querySelector('.lg-welcome')

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
    welcomeUserSm.innerHTML = `<h5 class="fw-bold welcome-text-sm">Welcome, ${user.FirstName}</h5>`
    welcomeUserLg.innerHTML = `<h5 class="fw-bold welcome-text">Welcome, ${user.FirstName}</h5>`
} else {
  console.log('User not found.');
  window.location.href = 'signIn.html'
}


// ==================== Todo Schema ===================== //

// Variable Declarations
const addTodoBtn = document.getElementById('addTodoBtn')
let allTodo = []

// Function to add todo and set to localStorage
const addTodo = () => {
  let todoSchema = {
    todoTitle: title.value,
    todoCategory: category.value,
    todoDescription: description.value,
    todoTime: time.value
  }

  if (localStorage.userTodo) {
    allTodo = JSON.parse(localStorage.getItem('userTodo'))
    allTodo.push(todoSchema)
    localStorage.setItem('userTodo', JSON.stringify(allTodo))
    console.log('Tasks Added');
    window.location.href = 'dashboard.html'
  } else {
    allTodo.push(todoSchema)
    localStorage.setItem('userTodo', JSON.stringify(allTodo))
    console.log('Tasks Added');
    window.location.href = 'dashboard.html'
  }
}

// Button to trigger addTodo() function
addTodoBtn.addEventListener('click', () => {
  if (title.value != '' && category.value != '' && description.value != '' && time.value != '' && isNaN(title.value) && isNaN(category.value) && isNaN(description.value)) {
    addTodo();
  } else {
    console.log('Enter Valid details');
  }
})

// ============ Display Tasks ============ //

const tasks = JSON.parse(localStorage.getItem('userTodo'))
const noTask = document.querySelector('.no-task')
const taskImg = document.querySelector('.task-image')

if (tasks != null) {
  console.log(tasks);
  noTask.classList.add('d-none')
  tasks.map((task, index) => {
    displayTasks.innerHTML += `
    <div class="border-bottom py-2">
      <div class="col-12">
        <div class="text-light">
          <h4 class="text-warning">${index + 1}</h4
          <h5 id="displayTitle">Title: ${task.todoTitle}</h5>
          <p id="displayCategory">Category: ${task.todoCategory}</p>
          <p id="displayDescription">Description: ${task.todoDescription}</p>
          <i id="displayTime">Date/Time: ${task.todoTime}</i>
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
    </div>
    `
  })
} else {
  taskImg.classList.remove('d-md-block')
}