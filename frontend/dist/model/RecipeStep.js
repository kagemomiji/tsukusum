"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeStep {
    constructor(operation, tool, meal) {
        this.getUML = () => {
            if (this.meal === undefined || this.meal.steps.length === 0) {
                return `|${this._tool}|
            :${this._operation};`;
            }
            else {
                return `|${this._tool}|
            partition ${this._operation} \{
                note 
                ${this.meal.foods.map(food => { return food.toString(); }).join('\n')}
                end note
                ${this.meal.steps.map(step => { var _a; return `:${(_a = step.match(/.{1,20}/g)) === null || _a === void 0 ? void 0 : _a.join('\\n')};`; }).join('\n')}
            \}`.replace(/  +/g, '');
            }
        };
        this._operation = operation;
        this._tool = tool;
        this._meal = meal;
    }
    get operation() {
        return this._operation;
    }
    get tool() {
        return this._tool;
    }
    get meal() {
        return this._meal;
    }
}
exports.default = RecipeStep;
