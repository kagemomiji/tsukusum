export default class Meal{
    private _name: string
    private _url?: string
    constructor(name: string, url?: string){
        this._name = name;
        this._url = url;
    }

    get name(){
        return this._name;
    }

    get url(){
        return this._url;
    }
}