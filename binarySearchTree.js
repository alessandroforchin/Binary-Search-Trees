import Node from "./node";

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        if (!arr.length) return null;

        let mid = Math.floor(arr.length / 2);
        let node = new Node(arr[mid]);

        node.left = buildTree(arr.slice(0, mid));
        node.right = buildTree(arr.slice(mid + 1));
        return node;
    }

    insert(root = this.root, key) {
        let node = new Node(key);
        if (!root) {
            root = node;
            return;
        }

        let prev = null;
        let temp = root;
        while (temp) {
            if(temp.value > key) {
                prev = temp;
                temp = temp.left;
            } else if (temp.value < key) {
                prev = temp;
                temp = temp.right;
            }
        }

        if (prev.value > key) {
            prev.left = node;
        } else {
            prev.right = node;
        }
    }

    deleteNode(root = this.root, key) {
        if (root.value = key) {
            root = null;
            return;
        }

        if (root.value > key) {
            root.left = deleteNode(root.left, key);
            return root;
        } else if (root.value < key) {
            root.right = deleteNode(root.right, key);
            return root;
        }

        // if one of the children is empty
        if (root.left == null) {
            let temp = root.right;
            return temp;
        } else if (root.right == null) {
            let temp = root.left;
            return temp;
        }
        // if both children exist
        else {
            let succParent = root;

            let succ = root.right;

            while (succ.left != null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent != root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            //Copy successor data to root
            root.value = succ.value;
            return root;
        }
    }

    find(root = this.root, key) {
        if (root === null) {
            return null;
        } else if (key < root.value) {
            return this.find(root.left, key);
        } else if (key > root.right) {
            return this.find(root.right, key);
        } else 
            return root;
    }

    levelOrder(arr = [], queue = [], root = this.root) {
        if (root === null) return;
        queue.push(root);

        while (queue.length !== 0) {
            root = queue[0];
            arr.push(root.value);

            if (root.left !== 0) queue.push(root.left);
            if (root.right !== 0) queue.push(root.right);
            queue.shift();
        }
        return arr;
    }

    inOrder(arr, root = this.root) {
        if (root === null) return;
        if (root.left !== null) this.inOrder(arr, root.left);
        arr.push(root.value);
        if (root.right !== null) this.inOrder(arr, root.right);
        return arr;
    }

    preOrder(arr, root = this.root) {
        if (root === null) return;
        arr.push(root.value);
        if (root.left !== null) this.preOrder(arr, root.left);
        if (root.right !== null) this.preOrder(arr, root.right);
        return arr;
    }

    postOrder(arr, root = this.root) {
        if (root === null) return;
        if (root.left !== null) this.postOrder(arr, root.left);
        if (root.right !== null) this.postOrder(arr, root.right);
        arr.push(root.value);
        return arr;
    }

    treeHeight(root = this.root, height = 0) {
        if (root == null) return -1;

        let leftHeight = this.treeHeight(root.left, height);
        let rightHeight = this.treeHeight(root.right, height);

        height = Math.max(leftHeight, rightHeight) + 1;
        return height;
    }

    nodeHeight(data) {
        if (this.find(data) === null) return 'Not a valid node';
        return this.treeHeight() - this.nodeDepth(data);
    }

    nodeDepth(data, root = this.root, depth = 0) {
        if (root.value === data) {
            return depth;
        }

        if (root === null) return 'No Node found.'
        if (root.value < data) {
            depth++;
            return this.nodeDepth(data, root.right, depth);
        }
        if (root.value > data) {
            depth++;
            return this.nodeDepth(data, root.left, depth);
        }
    }

    isBalanced(root = this.root, difference = 0) {
        if (root === null) return -1;

        let leftHeight = this.treeHeight(root.left, difference);
        let rightHeight = this.treeHeight(root.right, difference);

        difference = Math.abs(leftHeight - rightHeight);
        if (difference > 1) return false;
        return true;
    }

    rebalance(root = this.root) {
        let newArr = this.inOrder();
        root = this.buildTree(newArr);
        return root;
    }

    prettyPrint(root = this.root, prefix = '', isLeft = true)  {
        if (root.right !== null) {
            prettyPrint(root.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.data}`);
        if (root.left !== null) {
            prettyPrint(root.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

let arr = [16, 2, 3, 8, 14, 11, 5, 9, 1, 7, 21];

let binaryTree = new Tree(arr);

// Tests for the tree methods
prettyPrint(binaryTree.root);
console.log(`The tree is balanced: ${binaryTree.isBalanced()}`);
console.log('Logging tree in level, pre, post and in order:');
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());

// Adding some elements > 100 to unbalance the tree
binaryTree.insert(100);
binaryTree.insert(148);
binaryTree.insert(112);
binaryTree.insert(161);
prettyPrint(binaryTree.root);
console.log(`The tree is still balanced: ${binaryTree.isBalanced()}`);

// Rebalance the tree
console.log('Now rebalance the tree:');
binaryTree.rebalance();
prettyPrint(binaryTree.root);
console.log(`The tree is balanced: ${binaryTree.isBalanced()}`);
console.log(binaryTree.levelOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inOrder());