export default class Food {
    private _name: string
    private _amount: string
    constructor(name: string, amount: string) {
        
        this._name = name.replace(/(◎|○|◯)/,"");
        this._amount = amount.replace(/[Ａ-Ｚａ-ｚ０-９／]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        }).replace("約","");
    }

    get name(){
        return this._name;
    }

    get amount(){
        return this._amount;
    }
}