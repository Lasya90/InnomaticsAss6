document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage
    loadTasks();

    // Add task button event listener
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
});

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

// Add a new task
// Add a new task
function addTask() {
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value; // Get selected category

    if (!taskName || !dueDate || !category) {
        alert("Please fill out all fields.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        category: category,
        completed: false
    };

    // Save to localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Display task
    displayTask(task);

    // Clear input fields
    document.getElementById('taskName').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('category').value = ''; // Clear category selection
}

// Display task on the page
function displayTask(task) {
    const taskList = document.getElementById('taskList');

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) taskItem.classList.add('completed');
    taskItem.setAttribute('data-id', task.id);

    // Task details
    taskItem.innerHTML = `
        <span class="${task.priority.toLowerCase()}-priority">${task.name} (Due: ${task.dueDate}, Category: ${task.category})</span>
        <div>
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

// Toggle task completion
function toggleTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Delete a task
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Refresh the task list
function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list
    loadTasks(); // Reload tasks from localStorage
}

// Filter tasks based on status
function filterTasks(status) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach(task => {
        if (status === 'all' || (status === 'completed' && task.completed) || (status === 'pending' && !task.completed)) {
            displayTask(task);
        }
    });
}
