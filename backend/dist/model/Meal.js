"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const Food_1 = __importDefault(require("./Food"));
const axios_1 = __importDefault(require("axios"));
const StoreType_1 = require("../common/StoreType");
class Meal {
    constructor(name, url) {
        this._foods = [];
        this._steps = [];
        this._storeLimit = undefined;
        this.setFoods = () => __awaiter(this, void 0, void 0, function* () {
            if (this._url !== undefined) {
                const res = yield axios_1.default.get(this._url, { timeout: 5000 });
                this.extractFromBody(res.data);
            }
        });
        this.getFoodsByAlias = (alias) => {
            return this._foods.filter((v) => v.alias === alias);
        };
        this.getAliasList = () => {
            let result = this._foods.map((v) => (v.alias)).filter((v) => (v.length > 0));
            return [...new Set(result)];
        };
        this._name = name;
        this._url = url;
    }
    get name() {
        return this._name;
    }
    get url() {
        return this._url;
    }
    get storeLimit() {
        return this._storeLimit;
    }
    get storeType() {
        return this._storeType;
    }
    get foods() {
        return this._foods;
    }
    get steps() {
        return this._steps;
    }
    extractFromBody(body) {
        const $ = cheerio_1.default.load(body);
        // extract limit content string
        let limitContent = $('#clock_reizouko').children('span').filter((_i, element) => $(element).text().includes("日持ち")).text();
        //remove `日持ち：`
        limitContent = limitContent.substring(limitContent.indexOf("："));
        //extract store type
        for (const storeType of StoreType_1.AllStoreType) {
            if (limitContent.includes(storeType)) {
                this._storeType = storeType;
                break;
            }
        }
        //extract store limit
        let ret = limitContent.match(/\d+(日|週間)/);
        if (ret !== null) {
            this._storeLimit = ret[0];
        }
        // set foods
        let foods = [];
        $('#r_contents').children('p').each((_i, element) => {
            let foodInfo = $(element);
            let amount;
            let name;
            //○<a href=xxxx> name</a> .... <span> amount </a>
            if (['◎', '◯', '●'].includes(foodInfo.contents().first().text())) {
                name = foodInfo.contents().first().text() + foodInfo.contents().first().next('a').text();
                amount = foodInfo.children('span').first().text();
            }
            else if (foodInfo.contents().first().is('a')) {
                amount = foodInfo.children('span').first().text();
                name = foodInfo.children('a').first().text();
            }
            else {
                amount = foodInfo.children('span').first().text();
                name = foodInfo.contents().first().text();
            }
            if (amount.length > 0) {
                foods.push(new Food_1.default(name, amount, this));
            }
        });
        this._foods = foods;
        // set steps
        let steps = [];
        let aliasList = this.getAliasList();
        $('#ins_contents').children('div').each((_i, element) => {
            let content = $(element).children('.ins_des');
            content.find('a').remove();
            content.children('.maru').each((_i, element) => {
                let maruContent = $(element).children('span').attr('data-text');
                if (maruContent !== undefined) {
                    $(element).replaceWith(maruContent.split(/\r?\n/).map(v => {
                        let splitedContent = v.split(/\s/);
                        if (splitedContent.length > 1) {
                            return `${splitedContent[0]}(${splitedContent[1]})`;
                        }
                        else {
                            return v;
                        }
                    }).join("と"));
                }
            });
            let step = content.text().replace(/(（|）)/g, "");
            // old content does not have .maru content
            for (const alias of aliasList) {
                if (step.includes(alias)) {
                    let replaceContent = this.getFoodsByAlias(alias).map((v) => v.toString()).join("と");
                    step = step.replace(alias, replaceContent);
                }
            }
            steps.push(step);
        });
        this._steps = steps;
    }
}
exports.default = Meal;
