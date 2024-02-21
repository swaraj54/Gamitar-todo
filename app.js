const addTaskForm = document.getElementById('addTaskForm');
const todoList = document.getElementById('todoList');
const doingList = document.getElementById('doingList');
const doneList = document.getElementById('doneList');

const tasks = [];

function renderTasks() {
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'mb-2', 'p-2', 'border', 'rounded');

        const status = task.status.toLowerCase();
        taskElement.innerHTML = `
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <p>End Date: ${task.endDate}</p>
            <p>Priority: ${task.priority}</p>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
            <button class="btn btn-success btn-sm" onclick="completeTask(${task.id})">Complete</button>
            ${status === 'todo' ? `<button class="btn btn-primary btn-sm" onclick="startTask(${task.id})">Start</button>` : ''}
        `;

        if (status === 'todo') {
            todoList.appendChild(taskElement);
        } else if (status === 'doing') {
            doingList.appendChild(taskElement);
        } else if (status === 'done') {
            doneList.appendChild(taskElement);
        }
    });
}

function addTask(title, description, endDate, priority) {
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        endDate,
        priority,
        status: 'ToDo'
    };

    tasks.push(newTask);
    renderTasks();
}

function deleteTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    const updatedTitle = prompt('Enter updated title:', tasks[index].title);
    const updatedDescription = prompt('Enter updated description:', tasks[index].description);
    const updatedEndDate = prompt('Enter updated end date:', tasks[index].endDate);
    const updatedPriority = prompt('Enter updated priority:', tasks[index].priority);

    tasks[index] = {
        ...tasks[index],
        title: updatedTitle,
        description: updatedDescription,
        endDate: updatedEndDate,
        priority: updatedPriority
    };

    renderTasks();
}

function completeTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].status = 'Done';
    renderTasks();
}

function startTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].status = 'Doing';
    renderTasks();
}

addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = document.getElementById('priority').value;

    addTask(title, description, endDate, priority);

    addTaskForm.reset();
});

renderTasks();
