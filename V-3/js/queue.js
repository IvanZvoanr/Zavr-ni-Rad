let queue = [];
let maxSize = 5; 

function performEnqueue() {
    if (queue.length >= maxSize) {
        alert("Queue is full!");
        return;
    }
    let value = prompt("Enter value to enqueue:");
    if (value !== null) {
        queue.push(value);
        updateVisualization();
    }
}

function performDequeue() {
    if (queue.length === 0) {
        alert("Queue is empty!");
        return;
    }
    alert("Dequeued: " + queue.shift());
    updateVisualization();
}

function performPeek() {
    if (queue.length === 0) {
        alert("Queue is empty!");
    } else {
        alert("Front of the queue: " + queue[0]);
    }
}

function performIsEmpty() {
    if (queue.length === 0) {
        alert("The queue is empty.");
    } else {
        alert("The queue is not empty.");
    }
}

function performIsFull() {
    if (queue.length >= maxSize) {
        alert("The queue is full.");
    } else {
        alert("The queue is not full.");
    }
}

function performSize() {
    alert("The size of the queue is: " + queue.length);
}

function performClear() {
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
