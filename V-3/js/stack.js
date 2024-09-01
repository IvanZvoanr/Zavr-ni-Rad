let stack = [];

function performPush() {
    let value = prompt("Enter value to push:");
    if (value !== null) {
        stack.push(value);
        updateVisualization();
    }
}

function performPop() {
    if (stack.length > 0) {
        alert("Popped: " + stack.pop());
        updateVisualization();
    } else {
        alert("Stack is empty!");
    }
}

function performPeek() {
    if (stack.length > 0) {
        alert("Top element: " + stack[stack.length - 1]);
    } else {
        alert("Stack is empty!");
    }
}

function performIsEmpty() {
    if (stack.length === 0) {
        alert("The stack is empty.");
    } else {
        alert("The stack is not empty.");
    }
}

function performSize() {
    alert("The size of the stack is: " + stack.length);
}

function performClear() {
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
