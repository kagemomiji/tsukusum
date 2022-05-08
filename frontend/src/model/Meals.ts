import Food from './Food';
import RecipeStep, { RecipeStepProperties } from './RecipeStep';
import Tool from './Tool';
import Meal, { MealProperties } from './Meal';

export type MealsProperties = {
    _main: MealProperties[]
    _sub: MealProperties[]
    _tools: Tool[]
    _steps: RecipeStepProperties[]
    stepUrl: string;
}

export default class Meals {
    private _main: Meal[] = []
    private _sub: Meal[] = []
    private _tools: Tool[] = []
    private _steps: RecipeStep[] = []
    private _stepUrl: string

    constructor(properties: MealsProperties){
        this._main = properties._main.map(prop => new Meal(prop));
        this._sub = properties._sub.map(prop => new Meal(prop));
        this._tools = properties._tools;
        this._steps = properties._steps.map(prop => new RecipeStep(prop));
        this._stepUrl = properties.stepUrl;
    }
    
    public get main() {
        return this._main;
    }

    public get sub() {
        return this._sub;
    }
    public get tools(){
        return this._tools;
    }

    public get steps(){
        return this._steps;
    }

    public get stepUrl(){
        return this._stepUrl;
    }

    public all(): Meal[]{
        let all: Meal[] = [];
        this._main.forEach((meal: Meal) => all.push(meal));
        this._sub.forEach((meal: Meal) => all.push(meal));
        return all;
    }


    public getFoods = () : Food[] => {
        return this.all().flatMap(meal => meal.foods).sort((a, b) => (a.name.localeCompare(b.name)));
    }

    public getFoodUniqueNames = () : string[] => {
        return [...new Set(this.getFoods().map(food => food.name))];

    }

    public getFoodInfo = () : Food[] => {
        let foodNameList = this.getFoodUniqueNames();
        let foodInfo: Food[] = [];
        for (const foodName of foodNameList){
            let amount = this.getFoods().filter(food => food.name === foodName).map(food => {return `${food.amount}`}).join(" + ");
            foodInfo.push(new Food({
                _name: foodName ,
                _amount: amount,
                _alias: ""
            }));
        }
        return foodInfo;
    }
}