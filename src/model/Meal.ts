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
            this._extractFromBody(res.data);
        }
    }

    private _extractFromBody(body: string){
        // set foods
        let feed : Food[] = [];
        const $ = cheerio.load(body);
        $('#r_contents').children('p').each((_i:number, element: cheerio.Element) => {
            let foodInfo = $(element);
            if(foodInfo.contents().first().is('a')){
                let amount = foodInfo.children('span').first().text();
                let name = foodInfo.children('a').first().text();
                feed.push(new Food(name, amount));
            } else {
                let amount = foodInfo.children('span').first().text();
                let name = foodInfo.contents().first().text();
                feed.push(new Food(name, amount));
            }
        });
        this._foods = feed;

        // set steps
        let steps: string[] = [];
        $('#ins_contents').children('div').each((_i:number, element: cheerio.Element) => {
           steps.push($(element).children('.ins_des').contents().first().text().replace(/（$/,""));
        });
        this._steps = steps;
    }
}