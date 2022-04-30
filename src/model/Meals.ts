import Meal from "./Meal";

export default class Meals {
    private _main: Meal[]
    private _sub: Meal[]
    constructor(main: Meal[], sub: Meal[]) {
        this._main = main;
        this._sub = sub;
    }

    public get main() {
        return this._main;
    }

    public get sub() {
        return this._sub;
    }
}