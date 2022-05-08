export type FoodProperties = {
    _name: string
    _amount: string
    _alias: string
    _mealName?: string
}

export default class Food {
    private _name: string
    private _amount: string
    private _alias: string
    private _mealName?: string

    constructor(props: FoodProperties){
        this._name = props._name;
        this._amount = props._amount;
        this._alias = props._alias;
        this._mealName = props._mealName;
    }

    get name(){
        return this._name;
    }

    get amount(){
        return this._amount;
    }

    get alias(){
        return this._alias;
    }

    get mealName() {
        return this._mealName;
    }

    public toString = (): string => {
        return `${this._name}(${this._amount})`;
    }
}