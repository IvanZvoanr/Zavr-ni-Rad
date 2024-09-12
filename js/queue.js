let queue = [];
let maxSize = 5;
let isInitialized = false;  

function initializeQueue() {
    if (!isInitialized) {
        queue = [];
        isInitialized = true;

        createContentArea();

        alert("Queue initialized.");
        updateVisualization();
    } else {
        alert("Queue is already initialized!");
    }
}

function createContentArea() {
    let container = document.querySelector('.container');

    let mainContent = document.createElement('main');
    mainContent.className = 'content';

    let visualizationDiv = document.createElement('div');
    visualizationDiv.id = 'visualization';
    visualizationDiv.className = 'visualization';

    let queueDiv = document.createElement('div');
    queueDiv.id = 'queue';
    queueDiv.className = 'queue';

    visualizationDiv.appendChild(queueDiv);
    mainContent.appendChild(visualizationDiv);
    container.appendChild(mainContent);
}

function performEnqueue() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    if (queue.length >= maxSize) {
        alert("Queue is full!");
        return;
    }
    let value = prompt("Enter value to enqueue:");
    if (value === null || value.trim() === "") {
        alert("Invalid input! Please enter a valid value.");
        return;
    }
    if (value !== null) {
        queue.push(value);
        updateVisualization();
    }
}

function performDequeue() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    if (queue.length === 0) {
        alert("Queue is empty!");
        return;
    }
    alert("Dequeued: " + queue.shift());
    updateVisualization();
}

function performFront() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    if (queue.length === 0) {
        alert("Queue is empty!");
    } else {
        alert("Front of the queue: " + queue[0]);
    }
}

function performIsEmpty() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    if (queue.length === 0) {
        alert("The queue is empty.");
    } else {
        alert("The queue is not empty.");
    }
}

function performIsFull() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    if (queue.length >= maxSize) {
        alert("The queue is full.");
    } else {
        alert("The queue is not full.");
    }
}

function performSize() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    alert("The size of the queue is: " + queue.length);
}

function performClear() {
    if (!isInitialized) {
        alert("Queue is not initialized! Please initialize the queue first.");
        return;
    }

    queue = []; 
    updateVisualization(); 
}

function updateVisualization() {
    let queueDiv = document.getElementById('queue');
    queueDiv.innerHTML = ''; 
    queue.forEach((item) => {
        let container = document.createElement('div');
        container.className = 'queue-item-container';

        let itemDiv = document.createElement('div');
        itemDiv.className = 'queue-item';
        itemDiv.textContent = item;

        container.appendChild(itemDiv);
        queueDiv.prepend(container);  
    });
}
