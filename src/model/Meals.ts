import cheerio from 'cheerio';
import Meal from "./Meal";
import RecipeStep from './RecipeStep';
import Tool from './Tool';

const RECIPE_SPEC_TAG = 'h3';

export default class Meals {
    private _main: Meal[] = []
    private _sub: Meal[] = []
    private _tools: Tool[] = []
    private _steps: RecipeStep[] = [];
    private _content: cheerio.Cheerio
    constructor(body: string) {
        const $ = cheerio.load(body);
        // extrat meal
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
        // extract tools
        $('.tejun').children('thead').children().children().each((i: number, element: cheerio.Element) => {
            if (!$(element).text().includes("手順")){
                this._tools = this._tools.concat($(element).text().split('/').map(name => new Tool(i, name)));
            }
        });

        // extract step
        $('.tejun').children('tbody').children().each((_i: number, colElement: cheerio.Element) => {
            $(colElement).children().each((rowIndex: number, rowElement: cheerio.Element) => {
                let operation = $(rowElement).text();
                if (rowIndex > 0 && operation.length > 0){
                    let targetTools: Tool[] = this._tools.filter(tool => tool.index === rowIndex);
                    if (targetTools.length === 1){
                        this._steps.push(new RecipeStep(operation, targetTools[0].name));
                    } else {
                        let targetTool = targetTools.find( tool => operation.includes(tool.name));
                        if(targetTool){
                            let reg = new RegExp(`（${targetTool.name}）`);
                            this._steps.push(new RecipeStep(operation.replace(reg, ""), targetTool.name));
                        }
                    }

                }
            });
        });
    }

    public get main() {
        return this._main;
    }

    public get sub() {
        return this._sub;
    }
    public get tools(){
        return this._tools;
    }

    public get steps(){
        return this._steps;
    }

    public all(): Meal[]{
        let all: Meal[] = [];
        this._main.forEach((meal: Meal) => all.push(meal));
        this._sub.forEach((meal: Meal) => all.push(meal));
        return all;
    }

    public getFoods = async (): Promise<void> =>  {
        await Promise.allSettled(this.all().map((meal: Meal) => meal.setFoods()));
    }

    public html() : string | null {
        return this._content.parents('#page_recipe').html();
    }
}