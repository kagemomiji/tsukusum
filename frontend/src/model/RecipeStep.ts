import Meal from "./Meal";

export default class RecipeStep {
    private _operation: string
    private _tool: string
    private _meal?: Meal

    constructor(operation: string, tool: string, meal?: Meal) {
        this._operation = operation;
        this._tool = tool;
        this._meal = meal;
    }

    public get operation() {
        return this._operation;

    }

    public get tool(){
        return this._tool;
    }

    public get meal(){
        return this._meal;
    }

    public getUML = (): string => {
        if(this.meal === undefined || this.meal.steps.length === 0){
            return `|${this._tool}|
            :${this._operation};`
        } else {
            return `|${this._tool}|
            partition ${this._operation} \{
                note 
                ${this.meal.foods.map(food => {return food.toString()}).join('\n')}
                end note
                ${this.meal.steps.map(step => {return `:${step.match(/.{1,20}/g)?.join('\\n')};`}).join('\n')}
            \}`.replace(/  +/g, '')
        }

    }
}