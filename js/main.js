import { addTask, renderTask, deleteTask } from './modules/tasks.js';
import { handleSettings, handleSettingsClose, columnDelete } from './modules/modals.js';

const columns = document.querySelector('.columns');
const addColumns = document.querySelector('.add-columns-btn');


let data = [];

if (localStorage.getItem('trello')) {
    data = JSON.parse(localStorage.getItem('trello'));
}

const observer = {
    set(target, key, value) {
        target[key] = value;
        localStorage.setItem('trello', JSON.stringify(target));
        return true;
    },
    get(target, prop, receiver) {
        if (prop === 'map') {
            return function (callback, thisArg) {
                const result = target.map((item, index, array) => {
                    const newItem = callback.call(thisArg, item, index, array);

                    return Object.assign({}, item, newItem);
                });
                localStorage.setItem('trello', JSON.stringify(result));
                return new Proxy(result, observer);
            };
        }
        return Reflect.get(target, prop, receiver);
    },
};

let proxy = new Proxy(data, observer);

const columnList = proxy




// localStorage.setItem('trello', JSON.stringify(myArray));


function creatFormNewColumn(event) {
    // console.log("функция creatFormNewColumn")
    if (event.target.innerHTML == '✖') {
        const nameColumn = `
            <div class="add_column">+ Добавить список</div>
        `;
        addColumns.innerHTML = nameColumn;
        return
    }
    if (event.target.innerHTML == '+ Добавить список') {
        wrapButtonAddColumns()
    }
};



function wrapButtonAddColumns() {
    // console.log("функция wrapButtonAddColumns")
    let test = `
    </div>
        <div class="add_column-option">
            <div class="name_column-wrapper">
                <textarea wrap="off" name="" id="myTextarea" cols="20" rows="1" class="name_column" placeholder="Введите заголовок списка"></textarea>
            </div>
            <div class="column-option__down">
                <button class="add_column-button" id="addButton">Добавить список</button>
                <div class="close_button">✖</div>
            </div>
        </div>
    </div>
`;

    addColumns.innerHTML = test
}


function returnButtonAddColumns() {
    const test = '<div class="add_column">+ Добавить список</div>'
    addColumns.innerHTML = test
}


document.addEventListener('click', function (event) {
    const clickArr = event.composedPath().includes(addColumns);
    const buttonDeleteTask = event.target.closest('.task_button');
    const columnId = event.target.closest('.column');
    const settingColumn = event.target.closest('.column_seting');
    const modalSetting = event.target.closest('.modalSetting');
    const columnDeleteButton = event.target.closest('.modalSetting-delete');

// console.log(event)

    if (!modalSetting) {
        handleSettingsClose()
    }

    if (settingColumn) {
        handleSettings(event, columnId.id)
    } 

    if (columnDeleteButton) {
        columnDelete(columnDeleteButton.id, proxy)
    }
    
    if (buttonDeleteTask) {
        deleteTask(columnId.id, buttonDeleteTask.id, proxy)
    }

    if (!clickArr) {
        returnButtonAddColumns()
    }
    
    
});

document.addEventListener('mouseup', function (event) {
    const taxtareaTask = document.querySelector('.task_input');

    if (!event.target.classList.contains('task_input') && taxtareaTask != null && !event.target.classList.contains('addTask')) {
        returnColumn()
    }
});




document.addEventListener('mousedown', function (event) {

    const nameColumnTextarea = document.querySelector('.name_column-edit');
   

    if (nameColumnTextarea != event.target && nameColumnTextarea != null) {
        console.log("Ты молодец!")

        const nameColumn = document.querySelector('.name_column-edit');
        const nameColumnValue = nameColumn.value;
        console.log("Значение value: " + nameColumnValue + " в текстарее с таким вот айди = " + nameColumn.id)
            // Пример 1
        if(nameColumnValue.trim() !== ''){
            saveNewNameColumn(nameColumnValue, nameColumn.id)
            renderColumns()
        } else {
            saveNewNameColumn(columnList.find(column => column.id === +nameColumn.id).name, nameColumn.id)
            renderColumns()
        }
    }
});

function renderColumns () {
 // console.log("функция redrerColumns")
 let column = "";
 proxy.forEach(function (item) {
         column += `
         <div class="column" id="${item.id}">
             <div class="column_up">
                 <div class="column_name" id="${item.id}">${item.name}</div>
                 <div class="column_seting" id="${item.id}"></div>
             </div>
             <div class="tasks">
             ${renderTask(item.tasks)}
             </div>
             <div class="column_down">
                 <button class="column_button" id="${item.id}">+ Добавить карточку</button>
                 <div class="column_sample">
                     <img src="img/sample_icon.png" alt="">
                 </div>
             </div>
         </div>
         `;
 });
 columns.innerHTML = column;
}


// function saveNewNameColumn(newName, id) {
//     // console.log("функция saveNewNameColumn")
//    proxy = proxy.map(function (item) {
//         if (item.id == id) {
//             item.name = newName
//         }
//     });
// }

function saveNewNameColumn(newName, id) {
    // console.log("функция saveNewNameColumn")
   proxy = proxy.map(item => {
        if (item.id == id) {
            item.name = newName
        }
        return
   });
}





const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map(function(item) {
   return item * 2
});

console.log(map1);
// Expected output: Array [2, 8, 18, 32]







addColumns.addEventListener('click', function (event) {
    creatFormNewColumn(event)
    // console.log("слушаетель блока добавления столбца")
    if (event.target && event.target.matches('#addButton')) {
        const textarea = document.querySelector('#myTextarea');
        const textareaValue = textarea.value;
        let newColumn = {
            name: textareaValue,
            id: Date.now(),
            tasks: [],
        };
        columnList.push(newColumn);
        createNewColumn()
        returnButtonAddColumns()
    }
});



function createNewColumn() {
    // console.log("функция createNewColumn")

    let column = "";
    columnList.forEach(function (item) {
        column += `
        <div class="column" id="${item.id}">
            <div class="column_up">
                <div class="column_name" id="${item.id}">${item.name}</div>
                <div class="column_seting" id="${item.id}"></div>
            </div>
            <div class="tasks">
            ${renderTask(item.tasks)}
            </div>
            <div class="column_down">
                <button class="column_button" id="${item.id}">+ Добавить карточку</button>
                <div class="column_sample">
                    <img src="img/sample_icon.png" alt="">
                </div>
            </div>
        </div>
        `;
    });
    columns.innerHTML = column;
};


export const returnColumn = () => {
    console.log("функция returnColumn")
    // console.log(columnList)

    let column = "";
    columnList.forEach(function (item) {
        // console.log(item)
        column += `
        <div class="column" id="${item.id}">
            <div class="column_up">
                <div class="column_name" id="${item.id}">${item.name}</div>
                <div class="column_seting" id="${item.id}"></div>
            </div>
            <div class="tasks">
            ${renderTask(item.tasks)}
            </div>
            <div class="column_down">
                <button class="column_button " id="${item.id}">+ Добавить карточку</button>
                <div class="column_sample">
                    <img src="img/sample_icon.png" alt="">
                </div>
            </div>
        </div>
        `;
    });
    columns.innerHTML = column;
}
returnColumn();

columns.addEventListener('click', function (event) {
    // тут необходимо запихнуть функцию editNameColumn (event.target.id) в if с условием, чтобы она заходил туда, только тогда, когда нажимаешь именно на имя, а не на текстареа, потому что при клике на текстареа, он возвращает обратно 
    // console.log("слушатель для изменения колонки")

    if (event.target.classList.contains('column_name')) {
        editNameColumn(event.target.id)
    }
    if (event.target.classList.contains('column_button')) {
        console.log(event.target.id)
        wrapButtonAddTask(event.target.id)
    }
    if (event.target.classList.contains('addTask')) {
        const taskValue = document.querySelector('.task_input')
        console.log(event.target.id)
        addTask(taskValue.value, event.target.id, proxy)
    }
});

function editNameColumn(id) {
    // console.log("функция editNameColumn")
    let column = "";
    // console.log(columnList)
    columnList.forEach(function (item) {
        // const renderTasksHtml = renderTasks()
        if (item.id == id) {
            console.log('зашло в жопу', item)

            column += `
            <div class="column" id="${item.id}">
                <div class="column_up">
                    <textarea cols="20" rows="1" class="name_column-edit" id="${item.id}">${item.name}</textarea>
                    <div class="column_seting" id="${item.id}"></div>
                </div>
                <div class="tasks">
                ${renderTask(item.tasks)}
                </div>
                <div class="column_down">
                    <button class="column_button" id="${item.id}">+ Добавить карточку</button>
                    <div class="column_sample">
                        <img src="img/sample_icon.png" alt="">
                    </div>
                </div>
            </div>
            `

            console.log('редачу кнопкку')
        } else {
            column += `
            <div class="column" id="${item.id}">
                <div class="column_up">
                    <div class="column_name" id="${item.id}">${item.name}</div>
                    <div class="column_seting" id="${item.id}"></div>
                </div>
                <div class="tasks">
                ${renderTask(item.tasks)}
                </div>
                <div class="column_down">
                    <button class="column_button" id="${item.id}">+ Добавить карточку</button>
                    <div class="column_sample">
                        <img src="img/sample_icon.png" alt="">
                    </div>
                </div>
            </div>
            `;
            console.log('продолжаю выполнение')
        }
    });
    console.log(column)
    columns.innerHTML = column;
}




export const wrapButtonAddTask = (id) => {
    console.log("функция wrapButtonAddTask")
    let column = "";
    // console.log(id)
    columnList.forEach(function (item) {
        if (item.id == id) {
            column += `
            <div class="column" id="${item.id}">
                        <div class="column_up">
                            <div class="column_name" id="${item.id}">${item.name}</div>
                            <div class="column_seting" id="${item.id}"></div>
                        </div>
                        <div class="tasks">
                        ${renderTask(item.tasks)}
                        </div>
                        <div class="column_down-wrapper">
                            <div class="value_task">
                                <textarea placeholder="Ввести заголовок для этой карточки" class="task_input" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div class="column_down">
                                <div class="column_down-left">
                                    <button class="add_column-button addTask" id="${item.id}">Добавить карточку</button>
                                    <div class="close_button">✖</div>
                                </div>
                                <div class="column_down-right">
                                    <div class="column_sample">
                                    <img src="img/sample_icon.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
            console.log('редачу кнопкку')
        } else {
            column += `
            <div class="column" id="${item.id}">
                <div class="column_up">
                    <div class="column_name" id="${item.id}">${item.name}</div>
                    <div class="column_seting" id="${item.id}"></div>
                </div>
                <div class="tasks">
                ${renderTask(item.tasks)}
                </div>
                <div class="column_down">
                    <button class="column_button" id="${item.id}">+ Добавить карточку</button>
                    <div class="column_sample">
                        <img src="img/sample_icon.png" alt="">
                    </div>
                </div>
            </div>
            `;
        }
    });
    // console.log(column)
    columns.innerHTML = column;

    // console.log('1')
}


