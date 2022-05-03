export default class RecipeStep {
    private _operation: string
    private _tool: string
    constructor(operation: string, tool: string) {
        this._operation = operation;
        this._tool = tool;
    }

    public get operation() {
        return this._operation;

    }

    public get tool(){
        return this._tool;
    }
}