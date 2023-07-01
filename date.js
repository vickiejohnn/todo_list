function editTodo(index) {
  // Retrieve the user's todos from localStorage
  const allUsers = JSON.parse(localStorage.getItem('localUsers')) || {};
  const email = getCurrentUser();
  const user = allUsers[email];

  // Check if the user and todos exist
  if (user && user.allTodo && index < user.allTodo.length) {
    // Retrieve the specific todo using the index
    const todo = user.allTodo[index];

    // Check if the todo has all the required properties
    if (todo && todo.todoTitle && todo.todoCategory && todo.todoDescription && todo.todoTime) {
      // Use the retrieved todo to populate the form fields for editing
      title.value = todo.todoTitle;
      category.value = todo.todoCategory;
      description.value = todo.todoDescription;
      time.value = todo.todoTime;

      // Update the addTodoBtn event listener to handle the edit functionality
      addTodoBtn.removeEventListener('click', displayTodo);
      addTodoBtn.addEventListener('click', () => {
        // Update the todo object with the new values
        todo.todoTitle = title.value;
        todo.todoCategory = category.value;
        todo.todoDescription = description.value;
        todo.todoTime = time.value;

        // Save the updated todos to localStorage
        localStorage.setItem('localUsers', JSON.stringify(allUsers));

        // Redirect to the dashboard or update the view as needed
        window.location.href = 'dashboard.html';
      });

      return; // Exit the function here if everything is successful
    }
  }

  // Display an error message or handle the error condition
  console.error('Unable to edit the todo item at index:', index);
  // Additional error handling code goes here
}
