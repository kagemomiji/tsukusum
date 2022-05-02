import cheerio from 'cheerio';
import Food from "./Food";
import axios from "axios";

export default class Meal{
    private _name: string
    private _url?: string
    private _foods: Food[] = [];
    private _steps: string[] = [];
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

    public setFoods = async (): Promise<void>  => {
        if(this._url !== undefined){
            const res = await axios.get(this._url);
            this.extractFromBody(res.data);
        }
    }

    private extractFromBody(body: string){
        // set foods
        let foods : Food[] = [];
        const $ = cheerio.load(body);
        $('#r_contents').children('p').each((_i:number, element: cheerio.Element) => {
            let foodInfo = $(element);
            if(foodInfo.contents().first().is('a')){
                let amount = foodInfo.children('span').first().text();
                let name = foodInfo.children('a').first().text();
                foods.push(new Food(name, amount));
            } else {
                let amount = foodInfo.children('span').first().text();
                let name = foodInfo.contents().first().text();
                foods.push(new Food(name, amount));
            }
        });
        this._foods = foods;

        // set steps
        let steps: string[] = [];
        let aliasList: string[] = this.getAliasList();
        $('#ins_contents').children('div').each((_i:number, element: cheerio.Element) => {
            let content = $(element).children('.ins_des');
            content.find('a').remove();
            content.children('.maru').each((_i: Number, element: cheerio.Element) => {
                let maruContent = $(element).children('span').attr('data-text');
                if (maruContent !== undefined){
                    $(element).replaceWith(maruContent.split(/\r?\n/).map(v => {
                        let splitedContent = v.split(/\s/);
                        if(splitedContent.length > 1){
                            return `${splitedContent[0]}(${splitedContent[1]})`;
                        } else {
                            return v;
                        }
                    }).join("と"));
                }
            });
            let step: string = content.text().replace(/(（|）)/g,"");

            // old content does not have .maru content
            for (const alias of aliasList){
                if (step.includes(alias)){
                    let replaceContent = this.getFoodsByAlias(alias).map((v: Food) => v.toString()).join("と");
                    step = step.replace(alias, replaceContent);
                }
            }
            steps.push(step);
        });
        this._steps = steps;
    }

    private getFoodsByAlias = (alias: string): Food[] => {
        return this._foods.filter( (v: Food) => v.alias === alias);
    }

    private getAliasList = (): string[] => {
        let result = this._foods.map((v: Food) => (v.alias)).filter((v: string) => (v.length > 0));
        return [... new Set(result)];

    }
}