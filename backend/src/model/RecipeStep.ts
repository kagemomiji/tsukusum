import Meal from "./Meal";

export default class RecipeStep {
    public date: string
    public operation: string
    public tool: string
    public meal?: Meal

    constructor(date: string, operation: string, tool: string, meal?: Meal) {
        this.date = date;
        this.operation = operation;
        this.tool = tool;
        this.meal = meal;
    }


    public getUML = (header?: string, preFooter?: string): string => {
        if(this.meal === undefined || this.meal.steps.length === 0){
            return `${preFooter ?? ""}
            |${this.tool}|
            ${header ?? ""}
            :${this.operation};`
        } else {
            return `${preFooter ?? ""}
            |${this.tool}|
            ${header ?? ""}
            partition ${this.operation} \{
                note 
                ${this.meal.foods.map(food => {return food.toString()}).join('\n')}
                end note
                ${this.meal.steps.map(step => {return `:${step.match(/.{1,20}/g)?.join('\\n')};`}).join('\n')}
            \}`.replace(/  +/g, '')
        }

    }
}