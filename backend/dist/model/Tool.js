"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tool {
    constructor(index, name) {
        this._index = index;
        this._name = name;
    }
    get index() {
        return this._index;
    }
    get name() {
        return this._name;
    }
}
exports.default = Tool;
