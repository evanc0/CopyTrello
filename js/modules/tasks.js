import { returnColumn, wrapButtonAddTask } from '../main.js';

export const addTask = (value, id, columnList) => {
    console.log("Value: " + value + "/ В таком вот id: " + id);
    console.log(columnList)
    columnList = columnList.map(function(item) {
        if(item.id == id) {
            const tasksEl = document.getElementById(`${id}`).querySelector('.tasks');

            item.tasks.push({
                name: value,
                id: Date.now(),
            })
            tasksEl.innerHTML = renderTask(item.tasks)

        }
    }); 
    wrapButtonAddTask(id)
}

export const renderTask = (tasks) => {
    let tasksHtml = "";
    tasks.forEach(function(task) {
        // console.log("СУпер мега ТЕСТ !!!!!!!!!!!!!!!!!!" + task.name)
        tasksHtml +=`
        <div class="task" id="${task.id}">
            <span class="task_text">${task.name}</span>
            <button class="task_button" id="${task.id}">
                <img src="img/delete.png" class="delete-task_img" alt="">
            </button>
        </div>
        `
    })
    // console.log(tasksHtml)
return tasksHtml
}


export const deleteTask = (columnId, taskId, columnList) => {
   
    columnList = columnList.map(function(item) {
        if (item.id == columnId) {
            const tasksEl = document.getElementById(`${columnId}`).querySelector('.tasks');
            // console.log ("Столбец с айди: " + item.id + " нам подходит, удаляем задачу из массива");
            const taskIndex = item.tasks.findIndex(task => task.id == taskId);
            // console.log (taskIndex + " taskIndex значение ")
            item.tasks.splice(taskIndex, 1);
            tasksEl.innerHTML = renderTask(item.tasks)
            
        } 
    });
    
}