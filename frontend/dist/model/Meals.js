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
const Meal_1 = __importDefault(require("./Meal"));
const RecipeStep_1 = __importDefault(require("./RecipeStep"));
const Tool_1 = __importDefault(require("./Tool"));
const PlantUml_1 = require("../common/const/PlantUml");
const RECIPE_SPEC_TAG = 'h3';
class Meals {
    constructor(body) {
        this._main = [];
        this._sub = [];
        this._tools = [];
        this._steps = [];
        this.extractFoods = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.allSettled(this.all().map((meal) => meal.setFoods()));
        });
        this.getFoods = () => {
            return this.all().flatMap(meal => meal.foods).sort((a, b) => (a.name.localeCompare(b.name)));
        };
        this.getFoodUniqueNames = () => {
            return [...new Set(this.getFoods().map(food => food.name))];
        };
        this.getFoodInfo = () => {
            let foodNameList = this.getFoodUniqueNames();
            let foodInfo = [];
            for (const foodName of foodNameList) {
                let amount = this.getFoods().filter(food => food.name === foodName).map(food => { return `${food.amount}`; }).join(" + ");
                foodInfo.push(new Food_1.default(foodName, amount));
            }
            return foodInfo;
        };
        this.getStepUML = () => {
            let umlContent = this._steps.map(v => {
                return v.getUML();
            }).join("\n");
            return `${PlantUml_1.PLANT_UML.START_UML}
        ${umlContent}
        ${PlantUml_1.PLANT_UML.END_UML}
        `;
        };
        const $ = cheerio_1.default.load(body);
        // extrat meal
        let isSubMeal = false;
        this._content = $('section').has('#step1').children('#page_recipe').children().find('p,h3');
        this._content.each((_i, element) => {
            if (element.type === "tag" && element.name === RECIPE_SPEC_TAG && $(element).text() === "副菜") {
                isSubMeal = true;
            }
            if (element.type === "tag" && element.name !== RECIPE_SPEC_TAG) {
                let url = $(element).find('a').attr('href');
                let meal = new Meal_1.default($(element).text(), url);
                if (isSubMeal)
                    this._sub.push(meal);
                else
                    this._main.push(meal);
            }
        });
        // extract tools
        $('.tejun').children('thead').children().children().each((i, element) => {
            if (!$(element).text().includes("手順")) {
                this._tools = this._tools.concat($(element).text().split('/').map(name => new Tool_1.default(i, name.split(/\d/)[0])));
            }
        });
        // extract step
        $('.tejun').children('tbody').children().each((_i, colElement) => {
            $(colElement).children().each((rowIndex, rowElement) => {
                //iconc-checkmarkを洗浄に置き換える
                $(rowElement).has('.icon-checkmark').children('span').replaceWith("洗浄");
                //stepsを探して代入していく
                let operation = $(rowElement).text();
                if (rowIndex > 0 && operation.length > 0) {
                    let url = $(rowElement).find('a').attr('href');
                    let targetTools = this._tools.filter(tool => tool.index === rowIndex);
                    let meal = url === undefined ? undefined : this.all().find(meal => meal.url === url);
                    if (meal === undefined) {
                        meal = this.all().find(meal => operation.includes(meal.name));
                    }
                    if (targetTools.length === 1) {
                        this._steps.push(new RecipeStep_1.default(operation, targetTools[0].name, meal));
                    }
                    else {
                        let targetTool = targetTools.find(tool => operation.includes(tool.name));
                        if (targetTool) {
                            // tool名を削除する
                            let reg = new RegExp(`（${targetTool.name}）`);
                            this._steps.push(new RecipeStep_1.default(operation.replace(reg, ""), targetTool.name, meal));
                        }
                        else if (rowIndex === 1) {
                            this._steps.push(new RecipeStep_1.default(operation, targetTools[0].name, meal));
                        }
                    }
                }
            });
        });
    }
    get main() {
        return this._main;
    }
    get sub() {
        return this._sub;
    }
    get tools() {
        return this._tools;
    }
    get steps() {
        return this._steps;
    }
    all() {
        let all = [];
        this._main.forEach((meal) => all.push(meal));
        this._sub.forEach((meal) => all.push(meal));
        return all;
    }
    html() {
        return this._content.parents('#page_recipe').html();
    }
}
exports.default = Meals;
