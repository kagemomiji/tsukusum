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
const axios_1 = __importDefault(require("axios"));
const PlantumlClient_1 = __importDefault(require("./common/PlantumlClient"));
const Meals_1 = __importDefault(require("./model/Meals"));
const ejs_1 = __importDefault(require("ejs"));
// tslint:disable-next-line:no-var-requires
const html_to_pdf = require('html-pdf-node');
const url = process.argv[2];
console.log(url);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(url, { timeout: 5000 });
        const meals = new Meals_1.default(res.data);
        yield meals.extractFoods();
        meals.main.forEach((v) => {
            console.log(v);
        });
        console.log("副菜");
        meals.sub.forEach((v) => {
            console.log(v);
        });
        console.log(meals.tools);
        console.log(meals.steps);
        console.log(meals.getFoods());
        console.log(meals.getFoodInfo());
        console.log(PlantumlClient_1.default.makePlantumlURL(meals.getStepUML(), 'svg'));
        let html = yield ejs_1.default.renderFile('./src/resource/index.ejs', { foods: meals.getFoodInfo(), recipeUrl: PlantumlClient_1.default.makePlantumlURL(meals.getStepUML(), 'svg') });
        let options = { format: "A3", path: "./output/tsukuoki.pdf", landscape: true };
        html_to_pdf.generatePdf({ content: html }, options).then((output) => {
            console.log("PDF Buffer:-", output);
        });
    }
    catch (e) {
        console.error(e);
    }
});
main();
