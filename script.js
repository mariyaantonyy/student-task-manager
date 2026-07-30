let tasks = [];
let editId = null;
const task = document.getElementById("task");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function(){

    if(task.value === "" || dueDate.value === ""){
        alert("Please fill all fields!");
        return;
    }

    tasks.push({

        id: Date.now(),

        task: task.value,

        priority: priority.value,

        dueDate: dueDate.value,

        completed: false

    });

    displayTasks();

    task.value = "";
    priority.selectedIndex = 0;
    dueDate.value = "";

});
function displayTasks(){

    taskList.innerHTML = "";

    if(tasks.length === 0){
        taskList.innerHTML = "No tasks yet.";
        return;
    }

    tasks.forEach(function(task){

        taskList.innerHTML += `
        <div class="task-item" data-id="${task.id}">

            <h3>${task.task}</h3>

            <p><strong>Priority:</strong> ${task.priority}</p>

            <p><strong>Due Date:</strong> ${task.dueDate}</p>

        </div>
        `;

    });

}