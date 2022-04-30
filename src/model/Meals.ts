export default class Meals {
    private _main: cheerio.Cheerio[]
    private _sub: cheerio.Cheerio[]
    constructor(main: cheerio.Cheerio[], sub: cheerio.Cheerio[]) {
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