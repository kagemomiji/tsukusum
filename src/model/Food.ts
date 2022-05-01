export default class Food {
    private _name: string
    private _amount: string
    constructor(name: string, amount: string) {
        this._name = name;
        this._amount = amount;
    }

    get name(){
        return this._name;
    }

    get amount(){
        return this._amount;
    }
}