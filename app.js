// DOM Elements
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#form');
const toDoInput = document.querySelector('#toDoInput');
const deadlineInput = document.querySelector('#deadlineInput');
const locationInput = document.querySelector('#locationInput');
const notesBody = document.querySelector('#notesBody');
const addBtn = document.querySelector('#addBtn');
const clearBtn = document.querySelector('#clearBtn');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideButton();
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    while (notesBody.firstChild) {
        notesBody.firstChild.remove()
    }
    clearBtn.classList.add('hide');
    localStorage.clear();
});

const createToDo = ({ toDo, deadline, locations, toDoID }) => {
    // Notes
    const note = document.createElement('li');
    const deadlineTime = document.createElement('span');
    const locationArea = document.createElement('span');

    note.textContent = `${toDo}.` + " ";
    note.classList.add('note');
    note.id = toDoID;
    deadlineTime.textContent = `Complete by: ${deadline}.` + " ";
    locationArea.textContent = `${locations}.` + " ";

    clearBtn.classList.remove('hide');

    notesBody.appendChild(note); //ul to li
    note.append(deadlineTime, locationArea);
};

const hideButton = () => {
    if (form.classList.contains('hide')) {
        form.classList.remove('hide');
        addBtn.textContent = "New To Do";
    } else if (!form.classList.contains('hide')) {
        form.classList.add('hide');
        addBtn.textContent = "+ Add To Do";
    }
};

const clearForms = () => {
    const forms = document.querySelectorAll('input');
    forms.forEach((form) => {
        form.value = "";
    })
};

// Local Storage 
const toDos = JSON.parse(localStorage.getItem("toDos")) || []; //local storage retrieves a string, which is then parsed

const addToDo = (toDo, deadline, locations, toDoID) => {
    toDos.push({
        toDo,
        deadline,
        locations,
        toDoID
    });

    localStorage.setItem("toDos", JSON.stringify(toDos)); // sets local storage array, then converted to JSON

    return { toDo, deadline, locations, toDoID };
};

toDos.forEach(createToDo);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Input Values
    const toDoValue = toDoInput.value;
    const deadlineValue = deadlineInput.value;
    const locationValue = locationInput.value;
    const randomID = Math.random() * 10;

    const newToDo = addToDo(toDoValue, deadlineValue, locationValue, randomID);
    createToDo(newToDo);
    clearForms();
    hideButton();
});

const lis = document.querySelectorAll('li');
lis.forEach((li) => {
    li.addEventListener('click', (e) => {
        e.preventDefault();

        let targetElement = e.currentTarget;
        let targetElementID = e.currentTarget.id;
        let getLocalStorage = JSON.parse(localStorage.getItem("toDos"));

        const index = getLocalStorage.findIndex(key => key.toDoID == targetElementID);
        const deletedToDo = getLocalStorage.splice(index, 1);
        const newStorage =  getLocalStorage.filter(item => item !== deletedToDo);
        localStorage.setItem('toDos', JSON.stringify(newStorage));
        targetElement.remove();
    })
});