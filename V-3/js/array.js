let array = [];

function performPrint() {
    if (array.length === 0) {
        alert("Array is empty!");
    } else {
        alert("Array elements: " + array.join(", "));
    }
}

function performInsert() {
    let index = prompt("Enter index to insert at:");
    let value = prompt("Enter value to insert:");
    if (index !== null && value !== null && !isNaN(index) && index >= 0 && index <= array.length) {
        array.splice(index, 0, value);
        updateVisualization();
    } else {
        alert("Invalid index!");
    }
}

function performDelete() {
    let index = prompt("Enter index to delete:");
    if (index !== null && !isNaN(index) && index >= 0 && index < array.length) {
        alert("Deleted: " + array.splice(index, 1));
        updateVisualization();
    } else {
        alert("Invalid index!");
    }
}

function performSearch() {
    let searchType = prompt("Search by (1) Index or (2) Value?");
    if (searchType === "1") {
        let index = prompt("Enter index to search:");
        if (index !== null && !isNaN(index) && index >= 0 && index < array.length) {
            alert("Value at index " + index + ": " + array[index]);
        } else {
            alert("Invalid index!");
        }
    } else if (searchType === "2") {
        let value = prompt("Enter value to search:");
        let index = array.indexOf(value);
        if (index !== -1) {
            alert("Value found at index: " + index);
        } else {
            alert("Value not found!");
        }
    } else {
        alert("Invalid selection!");
    }
}

function performUpdate() {
    let index = prompt("Enter index to update:");
    let value = prompt("Enter new value:");
    if (index !== null && value !== null && !isNaN(index) && index >= 0 && index < array.length) {
        array[index] = value;
        updateVisualization();
    } else {
        alert("Invalid index!");
    }
}

function performClear() {
    array = [];
    updateVisualization(); 
}

function updateVisualization() {
    let arrayDiv = document.getElementById('array');
    arrayDiv.innerHTML = '';  
    array.forEach((item, index) => {
        let container = document.createElement('div');
        container.className = 'array-item-container';

        let itemDiv = document.createElement('div');
        itemDiv.className = 'array-item';
        itemDiv.textContent = item;

        let indexDiv = document.createElement('div');
        indexDiv.className = 'array-index';
        indexDiv.textContent = index; 

        container.appendChild(itemDiv);
        container.appendChild(indexDiv); 
        arrayDiv.appendChild(container);
    });
}
