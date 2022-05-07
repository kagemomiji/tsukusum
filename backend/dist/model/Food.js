"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Food {
    constructor(name, amount, meal) {
        this.toString = () => {
            return `${this._name}(${this._amount})`;
        };
        this._name = name.replace(/(◎|◯|●)/, "").replace(/（$/, "");
        this._alias = name.replace(this._name, "").replace(/（$/, "");
        this._amount = amount.replace(/[Ａ-Ｚａ-ｚ０-９／．]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        }).replace("約", "");
        if (meal !== undefined) {
            this._mealName = meal.name;
        }
    }
    get name() {
        return this._name;
    }
    get amount() {
        return this._amount;
    }
    get alias() {
        return this._alias;
    }
}
exports.default = Food;
