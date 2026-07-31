// Get HTML elements
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

function updateDashboard(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(function(task){
        return task.completed;
    }).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}
const taskInput = document.getElementById("task");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "No tasks yet.";
        return;
    }

    tasks.forEach(function(task){

        taskList.innerHTML += `
        <div class="task-item" data-id="${task.id}">

            <h3 class="${task.completed ? 'completed' : ''}">
                ${task.task}
            </h3>

            <p><strong>Priority:</strong> ${task.priority}</p>

            <p><strong>Due Date:</strong> ${task.dueDate}</p>

            <button class="completeBtn">
                ${task.completed ? "↩ Undo" : "✔ Complete"}
            </button>

            <button class="editBtn">✏ Edit</button>

            <button class="deleteBtn">🗑 Delete</button>

        </div>
        `;

    });

}
updateDashboard();

// Add / Update Task
addBtn.addEventListener("click", function(){

    if(taskInput.value === "" || dueDate.value === ""){
        alert("Please fill all fields!");
        return;
    }

    if(editId === null){

        tasks.push({

            id: Date.now(),
            task: taskInput.value,
            priority: priority.value,
            dueDate: dueDate.value,
            completed: false

        });

    }else{

        const task = tasks.find(function(item){
            return item.id === editId;
        });

        task.task = taskInput.value;
        task.priority = priority.value;
        task.dueDate = dueDate.value;

        editId = null;
        addBtn.textContent = "Add Task";
    }

    saveTasks();
    displayTasks();

    taskInput.value = "";
    priority.selectedIndex = 0;
    dueDate.value = "";

});

// Complete / Edit / Delete
taskList.addEventListener("click", function(e){

    const card = e.target.closest(".task-item");

    if(!card) return;

    const id = Number(card.dataset.id);

    // Complete
    if(e.target.classList.contains("completeBtn")){

        const task = tasks.find(function(item){
            return item.id === id;
        });

        task.completed = !task.completed;

        saveTasks();
        displayTasks();

        return;
    }

    // Edit
    if(e.target.classList.contains("editBtn")){

        const task = tasks.find(function(item){
            return item.id === id;
        });

        taskInput.value = task.task;
        priority.value = task.priority;
        dueDate.value = task.dueDate;

        editId = id;

        addBtn.textContent = "Update Task";

        return;
    }

    // Delete
    if(e.target.classList.contains("deleteBtn")){

        tasks = tasks.filter(function(item){
            return item.id !== id;
        });

        saveTasks();
        displayTasks();

    }

});

// Show tasks when page loads
displayTasks();