// Select the table and form elements
const taskTable = document.getElementById('task-table');
const taskForm = document.getElementById('task-form');

// I want the stored tasks to be displayed in the table when the page is loaded
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
storedTasks.forEach(function (task) {
    // Create a new row
    const newRow = taskTable.insertRow();
    newRow.classList.add('align-middle'); // Add the align-middle class to the row

    // Insert cells and populate them with the task details
    const titleCell = newRow.insertCell(0);
    const descriptionCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const timeCell = newRow.insertCell(3);
    const priorityCell = newRow.insertCell(4);
    const statusCell = newRow.insertCell(5);

    titleCell.textContent = task.title;
    descriptionCell.textContent = task.description;
    dateCell.textContent = task.date;
    timeCell.textContent = task.time || 'N/A'; // Default to 'N/A' if no time is provided
    priorityCell.textContent = task.priority;

    // Add a class to the priority cell based on the priority level
    switch (task.priority) {
        case 'High':
            priorityCell.classList.add('bg-danger', 'text-white');
            break;
        case 'Medium':
            priorityCell.classList.add('bg-warning');
            break;
        case 'Low':
            priorityCell.classList.add('bg-secondary', 'text-white');
            break;
    }

    // Modify status cell to be a dropdown
    const statusSelect = document.createElement('select');
    const statuses = ['Pending', 'Ongoing', 'Completed', 'Delayed'];
    statusSelect.classList.add('form-select');
    // Add a class to the status dropdown based on the status level
    switch (task.status) {
        case 'Pending':
            statusSelect.classList.add('bg-info', 'text-white');
            break;
        case 'Ongoing':
            statusSelect.classList.add('bg-primary', 'text-white');
            break;
        case 'Completed':
            statusSelect.classList.add('bg-success', 'text-white');
            break;
        case 'Delayed':
            statusSelect.classList.add('bg-warning');
            break;
    }
    statuses.forEach(function (status) {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        if (status === task.status) {
            option.selected = true;
        }
        statusSelect.appendChild(option);
    });

    statusCell.innerHTML = ''; // Clear the cell before appending the select element
    statusCell.appendChild(statusSelect);
    statusSelect.addEventListener('change', function () {
        statusSelect.classList.remove('bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'text-white');
        // Update the status cell to reflect the selected value
        task.status = statusSelect.value;
        statusSelect.value = task.status; // Update the task status variable
        console.log(task.status);
        console.log(statusSelect.value);
        switch (statusSelect.value) {
            case 'Pending':
                statusSelect.classList.add('bg-info', 'text-white');
                break;
            case 'Ongoing':
                statusSelect.classList.add('bg-primary', 'text-white');
                break;
            case 'Completed':
                statusSelect.classList.add('bg-success', 'text-white');
                break;
            case 'Delayed':
                statusSelect.classList.add('bg-warning');
                break;
        }
        // Update the tasks in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(t => t.title === task.title && t.description === task.description);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = task.status;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    );

    // Add a delete button to each row
    const deleteCell = newRow.insertCell(6);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-outline-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        taskTable.deleteRow(newRow.rowIndex);
        // Remove the task from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(tasks.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    deleteCell.appendChild(deleteButton);
});

// Add event listener to the form --------------------------------------------------------------------------------------------------------
taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the task input values
    const taskTitle = document.getElementById('task-title').value.trim();
    const taskDescription = document.getElementById('task-description').value.trim();
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;
    var taskStatus = document.getElementById('task-status').value;

    // Ensure all fields are filled
    if (taskTitle && taskDescription && taskDate && taskPriority && taskStatus) {
        // Create a new row
        const newRow = taskTable.insertRow();
        newRow.classList.add('align-middle'); // Add the align-middle class to the row

        // Insert cells and populate them with the task details
        const titleCell = newRow.insertCell(0);
        const descriptionCell = newRow.insertCell(1);
        const dateCell = newRow.insertCell(2);
        const timeCell = newRow.insertCell(3);
        const priorityCell = newRow.insertCell(4);
        const statusCell = newRow.insertCell(5);

        titleCell.textContent = taskTitle;
        descriptionCell.textContent = taskDescription;
        dateCell.textContent = taskDate;
        timeCell.textContent = taskTime || 'N/A'; // Default to 'N/A' if no time is provided
        priorityCell.textContent = taskPriority;

        // Add a class to the priority cell based on the priority level
        switch (taskPriority) {
            case 'High':
                priorityCell.classList.add('bg-danger', 'text-white');
                break;
            case 'Medium':
                priorityCell.classList.add('bg-warning');
                break;
            case 'Low':
                priorityCell.classList.add('bg-secondary', 'text-white');
                break;
        }

        // Modify status cell to be a dropdown
        const statusSelect = document.createElement('select');
        statusSelect.classList.add('form-select');
        const statuses = ['Pending', 'Ongoing', 'Completed', 'Delayed'];
        statuses.forEach(function (status) {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === taskStatus) {
                option.selected = true; // Set the selected value of the dropdown
            }
            statusSelect.appendChild(option);
        });
        statusCell.innerHTML = ''; // Clear the cell before appending the select element
        statusCell.appendChild(statusSelect);

        // Apply the initial background styling based on the selected status
        statusSelect.classList.remove('bg-primary', 'bg-success', 'bg-warning', 'text-white');
        switch (taskStatus) {
            case 'Pending':
                statusSelect.classList.add('bg-info', 'text-white');
                break;
            case 'Ongoing':
                statusSelect.classList.add('bg-primary', 'text-white');
                break;
            case 'Completed':
                statusSelect.classList.add('bg-success', 'text-white');
                break;
            case 'Delayed':
                statusSelect.classList.add('bg-warning');
                break;
        }

        // Add a delete button to each row
        const deleteCell = newRow.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-outline-danger');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskTable.deleteRow(newRow.rowIndex);
        });
        deleteCell.appendChild(deleteButton);

        // Store the task in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({
            title: taskTitle,
            description: taskDescription,
            date: taskDate,
            time: taskTime,
            priority: taskPriority,
            status: taskStatus
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Update the status cell to reflect the new selected value
        // Add event listener to update the class when the dropdown value changes
        statusSelect.addEventListener('change', function () {
            statusSelect.classList.remove('bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'text-white');
            taskStatus = statusSelect.value; // Update the taskStatus variable
            switch (statusSelect.value) {
                case 'Pending':
                    statusSelect.classList.add('bg-info', 'text-white');
                    break;
                case 'Ongoing':
                    statusSelect.classList.add('bg-primary', 'text-white');
                    break;
                case 'Completed':
                    statusSelect.classList.add('bg-success', 'text-white');
                    break;
                case 'Delayed':
                    statusSelect.classList.add('bg-warning');
                    break;
            }
        });
        statusSelect.addEventListener('change', function () {
            // Update the status cell to reflect the selected value
            taskStatus = statusSelect.value;
            // Update the tasks in local storage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskIndex = tasks.findIndex(t => t.title === taskTitle && t.description === taskDescription);
            if (taskIndex !== -1) {
                tasks[taskIndex].status = taskStatus;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        // Clear the input fields
        taskForm.reset();
    } else {
        alert('Please fill out all fields.');
    }

});