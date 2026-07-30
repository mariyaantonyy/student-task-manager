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

    if(taskList.textContent === "No tasks yet."){
        taskList.innerHTML = "";
    }

    taskList.innerHTML += `
        <div class="task-item">
            <h3>${task.value}</h3>
            <p>Priority: ${priority.value}</p>
            <p>Due: ${dueDate.value}</p>
        </div>
    `;

    task.value = "";
    priority.selectedIndex = 0;
    dueDate.value = "";

});