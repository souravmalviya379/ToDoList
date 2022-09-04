(()=>{


let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');

async function fetchTodos() {
    //GET request
    // fetch("https://jsonplaceholder.typicode.com/todos")             //fetch is browser method to fetch the data from url, fetch function returns a Promise
    //     .then(function (response) {
    //         console.log(response);
    //         return response.json();
    //     }).then((data) => {
    //         console.log(data);
    //         tasks = data.slice(0, 10);
    //         renderList();
    //     })
    //     .catch((error) => console.log(error))

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderList();
    }catch(error){
        console.log(error)
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class = "custom-checkbox">
        <label for="${task.id}"> ${task.title} </label>
        <img src='images/delete.svg' class='delete' data-id='${task.id}' />
    `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(task => task.id === taskId);
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task toggled successfully !!');
        return;
    }
    showNotification('Could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    if (newTasks.length > 0) {
        console.log(newTasks)
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully !!!');
        return;
    }
    showNotification('Task cannot be deleted')
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        console.log(tasks);
        return;
    }

    showNotification('Task cannot be added');
}

function showNotification(title) {
    alert(title);
}

function handleInputKeyPress(e) {
    if (e.key == 'Enter') {
        const title = e.target.value;
        // console.log('title', title)
        if (!title) {
            showNotification('Task title cannot be empty');
            return;
        }

        const task = {
            title: title,
            id: Date.now(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(event){
    const target = event.target;
    if (target.className === 'delete') {
        const taskId = Number(target.dataset.id);           //fetching id from id of element
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = Number(target.id);           // fetching id from data-item attribute
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    fetchTodos()
    document.addEventListener('click', handleClickListener);
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
}

initializeApp();


})();