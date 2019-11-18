class Stack {
    constructor() {
        this.s = [];
    }
    push(data) {
        this.s.push(data);
    }
    pop() {
        if (this.s.length !== 0) return this.s.pop();
        else return undefined;
    }
    isEmpty() {
        if (this.s.length === 0) return true;
        else return false;
    }
    top() {
        if (this.s.length !== 0) {
            return this.s[this.s.length - 1];
        }
        else return undefined;
    }
}

module.exports = Stack;