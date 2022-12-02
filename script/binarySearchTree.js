const n = require('./node');

const Tree = (arr) => {
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
    const buildTree = (arr, start, end) => {
        return null;
    };

    let root = buildTree(arr, 0, arr.length - 1);

    const removeDuplicates = (arr) => {
        const recurse = (arr, filter = null) => {
            if(arr.length === 0) {
                return []
            }
            else if(arr[0] == filter) {
                arr.splice(0,1)
                return [].concat(recurse(arr, filter));
            }
            else {
                let val = arr[0];
                arr.splice(0,1)
                return [val].concat(recurse(arr, val));
            }
        }
        // let currentFilter;
        
        // arr.forEach((element, index) => {
        //     if(currentFilter == element) {
        //         arr.splice(index, index);
        //     }      
        //     else {
        //         currentFilter = element;
        //     }      
        // });

        return recurse(arr);
    }

    return {
        root,
        buildTree,
        removeDuplicates,
    };
}

let b = Tree([]);

console.log(b.removeDuplicates([1,2,3,4,5]));
console.log(b.removeDuplicates([1,1,1,1,2,2,2,3,4,4,4,4,4,5]));