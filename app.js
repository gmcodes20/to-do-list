// Define UI variables 
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.getElementById('task');

// call a function to Load all even listenrs

loadEventListeners();


// create the function to load all event listeners
function loadEventListeners() {
  // / DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // add task event
  form.addEventListener('submit', addTask);

  // Remove Task event
  taskList.addEventListener('click', removeTask);

  // Clear task event
  clearBtn.addEventListener('click', clearTask);

  // filter task events
  filter.addEventListener('keyup', filterTask)

  // when task lose focus
  filter.addEventListener('blur', clearFilterTask)


}


// Function Get Task from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.forEach(function (task) {
    // Create an li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // createtexnode and append to the li
    li.appendChild(document.createTextNode(task));
    // Create a new link element 
    const link = document.createElement('a');
    // Add class to the link element 
    link.className = 'delete-item secondary-content'

    // Add the icon html 
    link.innerHTML = '<i class="fas fa-trash-alt"></i> ';

    // append link to li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li);
  })

}


// create a add task function 
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please type in a task to add to the list')
  } else {

    // Create an li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // createtexnode and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a new link element 
    const link = document.createElement('a');
    // Add class to the link element 
    link.className = 'delete-item secondary-content'

    // Add the icon html 
    link.innerHTML = '<i class="fas fa-trash-alt"></i> ';

    // append link to li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
  }
  // clear input
  taskInput.value = "";

  e.preventDefault()
}

// Function Store Task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Function Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure you want to delete?')) {
      e.target.parentElement.parentElement.remove()
      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// remove from local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      console.log(`1. ${taskItem.textContent}`)
      // tasks.splice(index, 1)
    } else {
      console.log(`2. ${taskItem.textContent}`)
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTask(e) {
  if (confirm('Do you Really wanna do this?')) {
    // taskList.innerHTML = "";
    // or
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearTaskFromLocalStorage()


  e.preventDefault()
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// console.log(taskInput.value)
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (tak) {
    const item = tak.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      tak.style.display = 'block';
    } else {
      tak.style.display = 'none';
    }
  })
  e.preventDefault()
}

function clearFilterTask(e) {
  // filter.value = ""
  e.preventDefault()
}

