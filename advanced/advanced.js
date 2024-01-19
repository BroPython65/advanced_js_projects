addEventListener('DOMcontentloaded', showall())

function showall(){
    local = JSON.parse(localStorage.getItem('names')) || []
    if (local == []){
        console.log('Nothing to do here')
    }
    else{
        document.getElementById('tasklist').innerHTML = ''
        local.forEach(element => {
            var listItem = document.createElement('li');
            listItem.textContent = element.task;
            listItem.classList.add('list');

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
            // Remove the parent li element when the delete button is clicked
            listItem.remove();
            removeFromLocalStorage(element.task)
        }
            
            // Append the list item and delete button to the task list
            document.getElementById('tasklist').appendChild(listItem);
            listItem.appendChild(deleteButton);
        })
    }
}


function create() {
    // Get the input value
    var input = document.getElementById('taskinput').value;

    // Check if the input is too short
    if (input.length <= 2) {
        alert('Input is too short!');
        document.getElementById('taskinput').value = ''
    } else {
        // Create a new list item and delete button
        var listItem = document.createElement('li');
        listItem.textContent = input;
        listItem.classList.add('list');

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            // Remove the parent li element when the delete button is clicked
            listItem.remove();
            removeFromLocalStorage(input)
        };

        // Append the list item and delete button to the task list
        document.getElementById('tasklist').appendChild(listItem);
        listItem.appendChild(deleteButton);
        document.getElementById('taskinput').value = ''
        savetolocal(input)
    }
}

function savetolocal(input){
    existingData = JSON.parse(localStorage.getItem('names')) || []
    existingData.push({'task':input});
    localStorage.setItem('names', JSON.stringify(existingData))
}

function removeFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('names')) || []
    const updatedTasks = tasks.filter(task => task.task != taskText);
    localStorage.setItem('names', JSON.stringify(updatedTasks));
}