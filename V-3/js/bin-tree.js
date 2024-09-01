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
        this.queue = []; 
    }

    insert(data) {
        if (this.nodeCount >= 31) { 
            alert("Tree has reached its maximum depth of 5 levels.");
            return;
        }

        const newNode = new TreeNode(data, this.nodeCount++); 
        if (this.root === null) {
            this.root = newNode;
            this.queue.push(this.root);
        } else {
            let currentNode = this.queue[0];

            if (currentNode.left === null) {
                currentNode.left = newNode;
                this.queue.push(currentNode.left);
            } else if (currentNode.right === null) {
                currentNode.right = newNode;
                this.queue.push(currentNode.right);
                this.queue.shift();
            }
        }
        updateVisualization();
    }

    clear() {
        this.root = null;
        this.nodeCount = 0; 
        this.queue = []; 
        updateVisualization();
    }

    deleteNodeByIndex(index) {
        if (!this.root) return null;

        let parentNode = null;
        let currentNode = this.root;

        const queue = [this.root];
        let nodeToDelete = null;
        let lastNode = null;
        let lastParentNode = null;

        while (queue.length > 0) {
            const node = queue.shift();
            if (node.index === index) {
                nodeToDelete = node;
            }
            if (node.left) {
                lastParentNode = node;
                queue.push(node.left);
            }
            if (node.right) {
                lastParentNode = node;
                queue.push(node.right);
            }
            lastNode = node;
        }

        if (nodeToDelete) {
            nodeToDelete.data = lastNode.data;
            if (lastParentNode.right === lastNode) {
                lastParentNode.right = null;
            } else if (lastParentNode.left === lastNode) {
                lastParentNode.left = null;
            }

            this.reindexNodes();
            updateVisualization();
        } else {
            alert("Node with the given index not found.");
        }
    }

    reindexNodes() {
        let newIndex = 0;
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
                node.index = newIndex++; 
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
    }

    changeValueByIndex(index, newValue) {
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
    const maxDepth = 5;  
    const baseHorizontalSpacing = 300; 

    function drawNode(node, x, y, level) {
        if (node === null || level >= maxDepth) return;

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
            let lineDiv = document.createElement('div');
            lineDiv.className = 'tree-line vertical';
            lineDiv.style.top = `${y + nodeSize}px`;
            lineDiv.style.left = `${x + nodeSize / 2 - 1}px`;
            lineDiv.style.height = `${verticalSpacing / 2}px`;

            let horizontalLineDiv = document.createElement('div');
            horizontalLineDiv.className = 'tree-line horizontal';
            horizontalLineDiv.style.top = `${y + nodeSize + verticalSpacing / 2}px`;
            horizontalLineDiv.style.left = `${leftX + nodeSize / 2}px`;
            horizontalLineDiv.style.width = `${Math.abs(leftX - x) - nodeSize / 2}px`;

            treeDiv.appendChild(lineDiv);
            treeDiv.appendChild(horizontalLineDiv);

            drawNode(node.left, leftX, childY, level + 1);
        }

        if (node.right) {
            let rightX = x + horizontalSpacing;
            let lineDiv = document.createElement('div');
            lineDiv.className = 'tree-line vertical';
            lineDiv.style.top = `${y + nodeSize}px`;
            lineDiv.style.left = `${x + nodeSize / 2 - 1}px`;
            lineDiv.style.height = `${verticalSpacing / 2}px`;

            let horizontalLineDiv = document.createElement('div');
            horizontalLineDiv.className = 'tree-line horizontal';
            horizontalLineDiv.style.top = `${y + nodeSize + verticalSpacing / 2}px`;
            horizontalLineDiv.style.left = `${x + nodeSize / 2}px`;
            horizontalLineDiv.style.width = `${Math.abs(rightX - x) - nodeSize / 2}px`;

            treeDiv.appendChild(lineDiv);
            treeDiv.appendChild(horizontalLineDiv);

            drawNode(node.right, rightX, childY, level + 1);
        }
    }

    drawNode(tree.root, treeDiv.offsetWidth / 2, 20, 0);
}
