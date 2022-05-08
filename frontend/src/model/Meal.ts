import Food, { FoodProperties } from "./Food";
import { StoreType } from '../common/StoreType';

export type MealProperties = {
    _name: string
    _url?: string
    _foods: FoodProperties[] 
    _steps: string[]
    _storeLimit?: string
    _storeType?: StoreType
}

export default class Meal{
    private _name: string
    private _url?: string
    private _foods: Food[] = [];
    private _steps: string[] = [];
    private _storeLimit?: string = undefined;
    private _storeType?: StoreType
    constructor(props: MealProperties){
        this._name = props._name;
        this._url = props._url;
        this._foods = props._foods.map(prop => new Food(prop));
        this._steps = props._steps;
        this._storeLimit = props._storeLimit;
        this._storeType = props._storeType;
    }

    get name(){
        return this._name;
    }

    get url(){
        return this._url;
    }

    get storeLimit(){
        return this._storeLimit;
    }

    get storeType(){
        return this._storeType;
    }

    get foods(){
        return this._foods;
    }

    get steps(){
        return this._steps;
    }
}