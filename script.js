// Get HTML elements
const themeBtn = document.getElementById("themeBtn");
const sortTasks = document.getElementById("sortTasks");
const filterPriority = document.getElementById("filterPriority");
const searchTask = document.getElementById("searchTask");
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
function getStatus(date){

    const today = new Date();

    today.setHours(0,0,0,0);

    const due = new Date(date);

    due.setHours(0,0,0,0);

    if(due.getTime() === today.getTime()){
        return "🟡 Due Today";
    }

    if(due < today){
        return "🔴 Overdue";
    }

    return "🟢 Upcoming";

}
// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "No tasks yet.";
    updateDashboard();
    return;
}
    

    tasks.forEach(function(task){

        taskList.innerHTML += `
        <div class="task-item" data-id="${task.id}">

            <h3 class="${task.completed ? 'completed' : ''}">
                ${task.task}
            </h3>

           <p>
    Priority:
    <span class="priority ${task.priority.toLowerCase()}">
        ${task.priority}
    </span>
</p>

            <p><strong>Due Date:</strong> ${task.dueDate}</p>

<p class="${getStatusClass(task.dueDate)}">
    ${getStatus(task.dueDate)}
</p>

            <button class="completeBtn">
                ${task.completed ? "↩ Undo" : "✔ Complete"}
            </button>

            <button class="editBtn">✏ Edit</button>

            <button class="deleteBtn">🗑 Delete</button>

        </div>
        `;

    });


updateDashboard();
}

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
searchTask.addEventListener("keyup", function(){

    const value = searchTask.value.toLowerCase();

    const cards = document.querySelectorAll(".task-item");

    cards.forEach(function(card){

        const taskName =
        card.querySelector("h3").textContent.toLowerCase();

        if(taskName.includes(value)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

});
filterPriority.addEventListener("change", function(){

    const selected = filterPriority.value;

    const cards = document.querySelectorAll(".task-item");

    cards.forEach(function(card){

        const priorityText = card.querySelector("p").textContent;
        const priority = priorityText.replace("Priority:", "").trim();

        if(selected === "All" || priority === selected){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

    });

});
sortTasks.addEventListener("change", function(){

    if(sortTasks.value === "nearest"){

        tasks.sort(function(a,b){
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

    }

    else if(sortTasks.value === "farthest"){

        tasks.sort(function(a,b){
            return new Date(b.dueDate) - new Date(a.dueDate);
        });

    }

    displayTasks();
    saveTasks();

});
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeBtn.textContent="☀️ Light Mode";
    }else{
        localStorage.setItem("theme","light");
        themeBtn.textContent="🌙 Dark Mode";
    }

});
function getStatusClass(date){

    const today = new Date();

    today.setHours(0,0,0,0);

    const due = new Date(date);

    due.setHours(0,0,0,0);

    if(due.getTime() === today.getTime()){
        return "today";
    }

    if(due < today){
        return "overdue";
    }

    return "upcoming";

}