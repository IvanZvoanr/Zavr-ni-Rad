let list = [];
let nextAddress = 0;

function performAppend() {
    let value = prompt("Enter value to append:");
    if (value !== null) {
        list.push({ address: nextAddress++, value: value });
        updateVisualization();
    }
}

function performInsert() {
    let value = prompt("Enter value to insert:");
    let position = parseInt(prompt("Enter position to insert at (0-based index):"), 10);

    if (value !== null && !isNaN(position) && position >= 0 && position <= list.length) {
        list.splice(position, 0, { address: nextAddress++, value: value });
        updateVisualization();
    } else {
        alert("Invalid position!");
    }
}

function performRemove() {
    let value = prompt("Enter value to remove:");
    let index = list.findIndex(item => item.value === value);

    if (index !== -1) {
        list.splice(index, 1);
        updateVisualization();
    } else {
        alert("Value not found!");
    }
}

function performSearch() {
    let value = prompt("Enter value to search:");
    let index = list.findIndex(item => item.value === value);

    if (index !== -1) {
        alert("Value found at index: " + index + ", Address: " + list[index].address);
    } else {
        alert("Value not found!");
    }
}

function performCount() {
    let value = prompt("Enter value to count:");
    let count = list.filter(item => item.value === value).length;

    alert("Value appears " + count + " times in the list.");
}

function performClear() {
    list = [];
    nextAddress = 0;
    updateVisualization();
}

function performUpdate() {
    let position = parseInt(prompt("Enter index of the element to update (0-based index):"), 10);
    let newValue = prompt("Enter the new value:");

    if (!isNaN(position) && position >= 0 && position < list.length && newValue !== null) {
        list[position].value = newValue;
        updateVisualization();
    } else {
        alert("Invalid position or value!");
    }
}

function updateVisualization() {
    let listDiv = document.getElementById('list');
    listDiv.innerHTML = ''; 

    list.forEach((item, index) => {
        let container = document.createElement('div');
        container.className = 'list-item-container';

        let itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';

        let addressDiv = document.createElement('div');
        addressDiv.className = 'address';
        addressDiv.textContent = item.address;

        let valueDiv = document.createElement('div');
        valueDiv.className = 'value';
        valueDiv.textContent = item.value;

        let nextAddressDiv = document.createElement('div');
        nextAddressDiv.className = 'address';
        nextAddressDiv.textContent = index < list.length - 1 ? list[index + 1].address : 'null';

        itemDiv.appendChild(addressDiv);
        itemDiv.appendChild(valueDiv);
        itemDiv.appendChild(nextAddressDiv);

        container.appendChild(itemDiv);

        if (index < list.length - 1) {
            let arrow = document.createElement('div');
            arrow.className = 'arrow';
            container.appendChild(arrow);
        }

        listDiv.appendChild(container);
    });
}
