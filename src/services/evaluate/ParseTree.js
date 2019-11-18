const Node = require('../evaluate/Node');

class ParseTree {
    constructor() {
        this.root = null;
    }
    insert(data) {
        if (this.root === null) {
            let newNode = new Node(data);
            this.root = newNode;
        }
    }
}

module.exports = ParseTree;