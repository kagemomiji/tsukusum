import cheerio from 'cheerio';
import Food from "./Food";
import axios from "axios";

export default class Meal{
    private _name: string
    private _url?: string
    private _foods: Food[] = [];
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
            this._extractFoods(res.data);
        }
    }

    private _extractFoods(body: string){
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
    }
}