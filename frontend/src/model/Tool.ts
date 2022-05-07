export default class Tool {
    private _index: number
    private _name: string
    constructor(index: number, name: string) {
        this._index = index;
        this._name = name;
    }

    public get index(){
        return this._index;
    }

    public get name(){
        return this._name;
    }
}