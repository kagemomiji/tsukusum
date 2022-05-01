import cheerio from 'cheerio';
import Meal from "./Meal";

const RECIPE_SPEC_TAG = 'h3';

export default class Meals {
    private _main: Meal[] = []
    private _sub: Meal[] = []
    private _content: cheerio.Cheerio
    constructor(body: string) {
        const $ = cheerio.load(body);
        let isSubMeal: boolean = false;
        this._content = $('section').has('#step1').children('#page_recipe').children().children();
        this._content.children().each( (_i: number, element: cheerio.Element) => {
            if (element.type === "tag" &&  element.name === RECIPE_SPEC_TAG && $(element).text() === "副菜"){
                isSubMeal = true;
            }
            if (element.type === "tag" && element.name !== RECIPE_SPEC_TAG){
                let meal = new Meal($(element).text(), $(element).find('a').attr('href'))
                if (isSubMeal) this._sub.push(meal);
                else this._main.push(meal);
            }
        });
    }

    public get main() {
        return this._main;
    }

    public get sub() {
        return this._sub;
    }

    public all(): Meal[]{
        let all: Meal[] = [];
        this._main.forEach((meal: Meal, _i) => all.push(meal));
        this._sub.forEach((meal: Meal, _i) => all.push(meal));
        return all;
    }

    public html() : string | null {
        return this._content.parents('#page_recipe').html();
    }
}