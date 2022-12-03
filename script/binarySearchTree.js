const n = require('./node');

const Tree = (arr) => {
    const removeDuplicates = (arr) => {
        const recurse = (arr, filter = null) => {
            if(arr.length === 0) {
                return [];
            }
            else if(arr[0] == filter) {
                arr.splice(0,1);
                return [].concat(recurse(arr, filter));
            }
            else {
                let val = arr[0];
                arr.splice(0,1);
                return [val].concat(recurse(arr, val));
            }
        }

        return recurse(arr);
    }

    // IN > OUT: Num-Array, Num, Num > Node
    // arr.sort();
    // removeDuplicates(arr);
    // recurseBuildTree(arr, 0, arr.length - 1);
        // If start > end
            // return null
        // mid = arr.length / 2
        // node = n.Node(arr[mid])
        // node.leftNode = buildTree(arr.splice(start, mid), start, mid);
        // node.rightNode = buildTree(arr.splice(mid, end), mid, end);
    const buildTree = (arr) => {
        arr.sort();
        arr = removeDuplicates(arr);

        const recurse = (arr, start, end) => {
            if(start > end) {
                return null;
            }

            let mid = parseInt((start + end) / 2);

            // console.log("Mid:", arr[mid]);
            let node = n.Node(arr[mid]);

            node.leftNode = recurse(arr, start, mid - 1);
            // console.log("Left:", arr.slice(start, mid));

            node.rightNode = recurse(arr, mid + 1, end);
            // console.log("right:", arr.slice(mid+1, end));

            return node;
        }

        return recurse(arr, 0, arr.length - 1);
    };

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.rightNode !== null) {
          prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.leftNode !== null) {
          prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };

    const insertValue = (val) => {
        const rec = (node) => {
            if(node == null) {
                node = n.Node(val);
                return node;
            }

            if(val < node.value) {
                node.leftNode = rec(node.leftNode);
            }
            else {
                node.rightNode = rec(node.rightNode);
            }

            return node;
        };
        root = rec(root);
    }

    // If node == null (base case)
        // return node

    // If value < node.value
        // node.leftNode = deleteRec(node.leftNode, value);
    // else If value > node.value
        // node.rightNode = deleteRec(node.rightNode, value);
    // Else
        // If node.left == null
            // return node.right;
        // If node.right == null
            // return node.left;

        // node.value = minValue(node.right);

        // node.right = deleteRec(node.right, node.value)

    // return node;

    const deleteValue = (value) => {
        const deleteRec = (value, node) => {
            if(node == null) {
                return node;
            }  
    
            if(value < node.value) {
                node.leftNode = deleteRec(value, node.leftNode);
            }
            else if(value > node.value) {
                node.rightNode = deleteRec(value, node.rightNode);
            }
            else {
                if(node.leftNode == null) {
                    return node.rightNode;
                }   
                else if(node.rightNode == null) {
                    return node.leftNode;
                }
    
                node.value = minValue(node.rightNode);
    
                node.rightNode = deleteRec(node.value, node.rightNode);
            }
    
            return node;
        };

        root = deleteRec(value, root);
    };

    const minValue = (node) => {
        let minv = node.value;
        while(node.leftNode != null) {
            minv = node.leftNode.value;
            node = node.leftNode;
        }
        return minv;
    };

    // if node == null
        // return null

    // if value < node.value
        // rec(value, node.left)
    // else if value > node.value
        // rec(value, node.right)
    
    // return node
    const find = (value) => {
        const rec = (root) => {
            if(root == null) {
                return null
            }

            if(value < root.value) {
                return rec(root.leftNode);
            }
            else if(value > root.value) {
                return rec(root.rightNode);
            } else {
                return root;
            }
        }

        return rec(root);
    };

    const levelOrder = (func = (x) => x) => {
        const queue = [root];
        const result = [];
        
        // In > Out : Node > Array
        const rec = () => {
            if(queue.length == 0) {
                return;
            }
            else if(queue[0] == null) {
                queue.shift();
                rec();
            }
            else {
                let currentNode = queue.shift();

                result.push(func(currentNode.value));
                queue.push(currentNode.leftNode);
                queue.push(currentNode.rightNode);

                rec();
            }
        };

        rec();

        return result;
    };

    const inorder = (func = (x) => x) => {
        let result = [];

        const rec = (root) => {
            if(root == null) {
                return;
            }
            rec(root.leftNode);
            result.push(func(root.value));
            rec(root.rightNode);
        }
        rec(root)
        return result;
    };

    const preorder = (func = (x) => x) => {
        let result = [];

        const rec = (root) => {
            if(root == null) {
                return;
            }
            result.push(func(root.value));
            rec(root.leftNode);
            rec(root.rightNode);
        }
        rec(root)
        return result;
    };

    const postorder = (func = (x) => x) => {
        let result = [];

        const rec = (root) => {
            if(root == null) {
                return;
            }
            rec(root.leftNode);
            rec(root.rightNode);
            result.push(func(root.value));
        }
        rec(root)
        return result;
    };

    const height = node => {};

    const depth = node => {};

    const isBalanced = () => {};

    const rebalance = () => {};

    let root = buildTree(arr, 0, arr.length - 1);

    return {
        root,
        buildTree,
        removeDuplicates,
        prettyPrint,
        insertValue,
        deleteValue,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
    };
}

// let b = Tree([1,2,3]);

let b = Tree([1,1,2,3,4,5]);

b.prettyPrint(b.root);

b.insertValue(30);
// b.prettyPrint(b.root);

b.insertValue(31);
// b.prettyPrint(b.root);

b.insertValue(14);
// b.prettyPrint(b.root);

b.insertValue(17);
// b.prettyPrint(b.root);

b.deleteValue(17);
// b.prettyPrint(b.root);

b.deleteValue(3);
// b.prettyPrint(b.root);

// b.prettyPrint(b.root);
// b.prettyPrint(b.find(4));

b.prettyPrint(b.root);
console.log("Level Order Traversal: ", b.levelOrder());

console.log("Inorder Traversal: ", b.inorder());

console.log("Preorder Traversal: ", b.preorder());

console.log("Postorder Traversal: ", b.postorder());