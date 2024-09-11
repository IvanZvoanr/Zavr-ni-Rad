class TreeNode {
    constructor(data, index) {
        this.data = data;
        this.index = index;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
        this.availableIndices = []; 
        this.queue = [];
    }

    createRoot(data) {
        if (this.root === null) {
            const newNode = new TreeNode(data, this.nodeCount++);
            this.root = newNode;
            this.queue.push(this.root);
            updateVisualization();
        } else {
            alert("Root already exists.");
        }
    }

    insert(data) {
        if (this.root === null) {
            alert("Root does not exist. Please create the root first.");
            return; 
        }
        if (data === null || data === "") {
            alert("Invalid input. Please enter a valid value.");
            return; 
        }
    

        if (this.nodeCount >= 31) {
            alert("Tree has reached its maximum depth of 5 levels.");
            return;
        }

        const newIndex = this.availableIndices.length > 0 ? this.availableIndices.shift() : this.nodeCount++;
        const newNode = new TreeNode(data, newIndex);

        let positionFound = false;
        let currentNode = this.queue[0];

        while (!positionFound) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
                this.queue.push(currentNode.left);
                positionFound = true;
            } else if (currentNode.right === null) {
                currentNode.right = newNode;
                this.queue.push(currentNode.right);
                this.queue.shift();
                positionFound = true;
            } else {
                this.queue.shift();
                currentNode = this.queue[0];
            }
        }

        updateVisualization();
    }

    clear() {
        this.root = null;
        this.nodeCount = 0;
        this.availableIndices = [];
        this.queue = [];
        updateVisualization();
    }

    deleteNodeByIndex(index) {
        if (!this.root) {
            alert("The tree is empty. There is nothing to delete.");
            return null; 
        }
        if (this.root.index === index) {
            const confirmDelete = confirm(`Are you sure you want to delete the root node and its subtree?`);
            if (confirmDelete) {
                this.clear(); 
                return;
            }
        }
    
        const queue = [this.root];
        let nodeToDelete = null;
        let parentNode = null;
    
        while (queue.length > 0) {
            const node = queue.shift();
            if (node.left) {
                if (node.left.index === index) {
                    parentNode = node;
                    nodeToDelete = node.left;
                    break;
                }
                queue.push(node.left);
            }
            if (node.right) {
                if (node.right.index === index) {
                    parentNode = node;
                    nodeToDelete = node.right;
                    break;
                }
                queue.push(node.right);
            }
        }
    
        if (nodeToDelete) {
            const confirmDelete = confirm(`Are you sure you want to delete node with index ${index} and its subtree?`);
            if (confirmDelete) {
                if (parentNode.left === nodeToDelete) {
                    parentNode.left = null;
                } else if (parentNode.right === nodeToDelete) {
                    parentNode.right = null;
                }
    
                this.removeSubtree(nodeToDelete);
                this.availableIndices.push(nodeToDelete.index); 
                updateVisualization();
            }
        } else {
            alert("Node with the given index not found.");
        }
    }
    

    removeSubtree(node) {
        if (node.left) {
            this.removeSubtree(node.left);
        }
        if (node.right) {
            this.removeSubtree(node.right);
        }
        node.left = null;
        node.right = null;
        node.data = null;
    }

    changeValueByIndex(index, newValue) {
        if (!this.root) {
            alert("The tree is empty. There is no node to change.");
            return;  
        }
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            if (node.index === index) {
                node.data = newValue;
                updateVisualization();
                return;
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        alert("Node with the given index not found.");
    }
}

const tree = new BinaryTree();

function performCreateRoot() {
    let value = prompt("Enter value for root:");
    if (value !== null) {
        tree.createRoot(value);
    } else {
        alert("Invalid input. Please enter a value.");
    }
}

function performInsert() {
    let value = prompt("Enter value to insert:");
    if (value !== null) {
        tree.insert(value);
    } else {
        alert("Invalid input. Please enter a value.");
    }
}

function performDelete() {
    let index = parseInt(prompt("Enter the index of the node to delete:"), 10);
    if (!isNaN(index)) {
        tree.deleteNodeByIndex(index);
    } else {
        alert("Invalid input. Please enter a valid index.");
    }
}

function performChangeValue() {
    let index = parseInt(prompt("Enter the index of the node to change:"), 10);
    if (!isNaN(index)) {
        let newValue = prompt("Enter the new value:");
        if (newValue !== null) {
            tree.changeValueByIndex(index, newValue);
        } else {
            alert("Invalid input. Please enter a value.");
        }
    } else {
        alert("Invalid input. Please enter a valid index.");
    }
}

function performClear() {
    tree.clear();
}

function updateVisualization() {
    let treeDiv = document.getElementById('tree');
    treeDiv.innerHTML = '';

    const nodeSize = 60;
    const verticalSpacing = 100;
    const baseHorizontalSpacing = 300;

    function drawNode(node, x, y, level) {
        if (node === null || node.data === null) return;

        let nodeDiv = document.createElement('div');
        nodeDiv.className = 'tree-node';
        nodeDiv.style.top = `${y}px`;
        nodeDiv.style.left = `${x}px`;
        nodeDiv.innerHTML = `<div class="index">${node.index}</div>${node.data}`;

        treeDiv.appendChild(nodeDiv);

        let childY = y + verticalSpacing;
        let horizontalSpacing = baseHorizontalSpacing / Math.pow(2, level);

        if (node.left) {
            let leftX = x - horizontalSpacing;
            drawLine(x, y, leftX, childY);
            drawNode(node.left, leftX, childY, level + 1);
        }

        if (node.right) {
            let rightX = x + horizontalSpacing;
            drawLine(x, y, rightX, childY);
            drawNode(node.right, rightX, childY, level + 1);
        }
    }

    function drawLine(x1, y1, x2, y2) {
        let lineDiv = document.createElement('div');
        lineDiv.className = 'tree-line vertical';
        lineDiv.style.top = `${y1 + nodeSize}px`;
        lineDiv.style.left = `${x1 + nodeSize / 2 - 1}px`;
        lineDiv.style.height = `${(y2 - y1) / 2}px`;

        let horizontalLineDiv = document.createElement('div');
        horizontalLineDiv.className = 'tree-line horizontal';
        horizontalLineDiv.style.top = `${y1 + nodeSize + (y2 - y1) / 2}px`;
        horizontalLineDiv.style.left = `${Math.min(x1, x2) + nodeSize / 2}px`;
        horizontalLineDiv.style.width = `${Math.abs(x2 - x1) - nodeSize / 2}px`;

        treeDiv.appendChild(lineDiv);
        treeDiv.appendChild(horizontalLineDiv);
    }

    drawNode(tree.root, treeDiv.offsetWidth / 2 - nodeSize / 2, 20, 0);
}
