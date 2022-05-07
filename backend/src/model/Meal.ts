import cheerio from 'cheerio';
import Food from "./Food";
import axios from "axios";
import { AllStoreType, StoreType } from '../common/StoreType';

export default class Meal{
    private _name: string
    private _url?: string
    private _foods: Food[] = [];
    private _steps: string[] = [];
    private _storeLimit?: string = undefined;
    private _storeType?: StoreType
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

    get storeLimit(){
        return this._storeLimit;
    }

    get storeType(){
        return this._storeType;
    }

    get foods(){
        return this._foods;
    }

    get steps(){
        return this._steps;
    }

    public setFoods = async (): Promise<void>  => {
        if(this._url !== undefined){
            const res = await  axios.get(this._url, { timeout : 5000 });
            this.extractFromBody(res.data);
        }
    }

    private extractFromBody(body: string){

        const $ = cheerio.load(body);
        // extract limit content string
        let limitContent: string = $('#clock_reizouko').children('span').filter((_i: number ,element: cheerio.Element) => $(element).text().includes("日持ち")).text();
        //remove `日持ち：`
        limitContent = limitContent.substring(limitContent.indexOf("："));
        //extract store type
        for (const storeType of AllStoreType){
            if (limitContent.includes(storeType)){
                this._storeType = storeType;
                break;
            }
        }

        //extract store limit
        let ret = limitContent.match(/\d+(日|週間)/);
        if ( ret !== null) {
            this._storeLimit = ret[0];
        }

        // set foods
        let foods : Food[] = [];
        $('#r_contents').children('p').each((_i:number, element: cheerio.Element) => {
            let foodInfo = $(element);
            let amount: string;
            let name: string;
            //○<a href=xxxx> name</a> .... <span> amount </a>
            if(['◎', '◯', '●'].includes(foodInfo.contents().first().text())){
                name = foodInfo.contents().first().text() + foodInfo.contents().first().next('a').text();
                amount = foodInfo.children('span').first().text();
            } else if(foodInfo.contents().first().is('a')){
                amount = foodInfo.children('span').first().text();
                name = foodInfo.children('a').first().text();
            } else {
                amount = foodInfo.children('span').first().text();
                name = foodInfo.contents().first().text();
            }
            if (amount.length > 0){
                foods.push(new Food(name, amount, this));
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