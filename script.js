document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;

    // Load tasks from local storage
    loadTasks();
});

const todoForm = document.querySelector('form');
const inputField = document.getElementById("todo-input");
const listData = document.getElementById("todo-list");

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = inputField.value.trim();

    if (taskText) {
        addTask(taskText);
        saveTask(taskText);
        inputField.value = ""; // Clear input field
    } else {
        alert("Please enter a valid task!");
    }
});

function addTask(taskText) {
    const createData = document.createElement("li");
    createData.classList.add("todo");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox";
    checkbox.addEventListener('change', updateTasks); // Update local storage on checkbox toggle

    // Label
    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
        deleteTask(taskText, createData);
    });

    // Append elements
    createData.appendChild(checkbox);
    createData.appendChild(taskLabel);
    createData.appendChild(deleteButton);
    listData.appendChild(createData);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const listItems = listData.querySelectorAll('li');
            const lastItem = listItems[listItems.length - 1];
            lastItem.querySelector('.custom-checkbox').checked = true;
        }
    });
}

function updateTasks() {
    const tasks = [];
    const listItems = listData.querySelectorAll('li');
    listItems.forEach(item => {
        const text = item.querySelector('label').textContent;
        const completed = item.querySelector('.custom-checkbox').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText, listItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    listItem.remove(); // Remove the task from the UI
}
