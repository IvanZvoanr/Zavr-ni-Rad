let stack = [];
let isInitialized = false; 

function initializeStack() {
    if (!isInitialized) {
        stack = [];
        isInitialized = true;

        createContentArea();

        alert("Stack initialized.");
        updateVisualization();
    } else {
        alert("Stack is already initialized!");
    }
}

function createContentArea() {
    let container = document.querySelector('.container');

    let mainContent = document.createElement('main');
    mainContent.className = 'content';

    let visualizationDiv = document.createElement('div');
    visualizationDiv.id = 'visualization';
    visualizationDiv.className = 'visualization';

    let stackDiv = document.createElement('div');
    stackDiv.id = 'stack';
    stackDiv.className = 'stack';

    visualizationDiv.appendChild(stackDiv);
    mainContent.appendChild(visualizationDiv);
    container.appendChild(mainContent);
}

function performPush() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }

    let value = prompt("Enter value to push:");
    if (value === null || value.trim() === "") {
        alert("Invalid input! Please enter a valid value.");
        return;
    }

    if (value !== null) {
        stack.push(value);
        updateVisualization();
    }
}

function performPop() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }

    if (stack.length > 0) {
        alert("Popped: " + stack.pop());
        updateVisualization();
    } else {
        alert("Stack is empty!");
    }
}

function performTop() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }

    if (stack.length > 0) {
        alert("Top element: " + stack[stack.length - 1]);
    } else {
        alert("Stack is empty!");
    }
}

function performIsEmpty() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }

    if (stack.length === 0) {
        alert("The stack is empty.");
    } else {
        alert("The stack is not empty.");
    }
}

function performSize() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }

    alert("The size of the stack is: " + stack.length);
}

function performClear() {
    if (!isInitialized) {
        alert("Stack is not initialized! Please initialize the stack first.");
        return;
    }
    if (stack.length === 0) {
        alert("The stack is empty.");
        return;
    }    
    stack = [];
    updateVisualization();
}

function updateVisualization() {
    let stackDiv = document.getElementById('stack');
    stackDiv.innerHTML = '';
    stack.forEach(item => {
        let div = document.createElement('div');
        div.className = 'stack-item';
        div.textContent = item;
        stackDiv.appendChild(div);
    });
}
