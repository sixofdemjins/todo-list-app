const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-button'); // Assuming you have an Add button

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
        return;
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // This is the "×" character
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}

// Call showTask to load tasks from local storage on page load
showTask();

// Add event listener to the Add button
addButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});