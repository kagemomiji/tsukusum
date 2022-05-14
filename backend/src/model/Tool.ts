export default class Tool {
    private _tableIndex: number
    private _rowIndex: number
    private _name: string
    constructor(tableIndex: number, rowIndex: number, name: string) {
        this._tableIndex = tableIndex;
        this._rowIndex = rowIndex;
        this._name = name;
    }

    public get rowIndex(){
        return this._rowIndex;
    }

    public get name(){
        return this._name;
    }

    public get tableIndex(){
        return this._tableIndex;
    }
}