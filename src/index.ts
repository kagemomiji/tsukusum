import axios from 'axios';
import PlantumlClient from './common/PlantumlClient';
import Meals from './model/Meals';
import ejs from 'ejs';
// tslint:disable-next-line:no-var-requires
const html_to_pdf = require('html-pdf-node');

const url = process.argv[2];
console.log(url);

const main = async () => {
    try {
        const res = await axios.get(url, { timeout : 5000 });
        const meals: Meals = new Meals(res.data);

        await meals.extractFoods();
    
        meals.main.forEach((v) => {
            console.log(v);
        });
        console.log("副菜");
        meals.sub.forEach((v) => {
            console.log(v);
        });
        console.log(meals.tools);
        console.log(meals.steps);
        console.log(meals.getFoods())
        console.log(meals.getFoodInfo())
        console.log(PlantumlClient.makePlantumlURL(meals.getStepUML(),'svg'));
        let html = await ejs.renderFile('./src/resource/index.ejs',{foods: meals.getFoodInfo(), recipeUrl: PlantumlClient.makePlantumlURL(meals.getStepUML(),'svg')});
        let options =  { format: "A3", path: "./output/tsukuoki.pdf", landscape: true };

        html_to_pdf.generatePdf({content: html}, options). then((output: any) => {
            console.log("PDF Buffer:-", output);
        });
    } catch(e){
        console.error(e);
    }
}

main();
