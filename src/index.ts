import request = require('request');
import cheerio = require('cheerio');
import Meals from './model/Meals';

const url = process.argv[2];
console.log(url);

const RECIPE_SPEC_TAG = 'h3';

request(url, (e: any, _response, body: string) => {
    if (e) {
        console.error(e)
    }
    try {
        const meals: Meals = extractRecipeLinks(body);
        console.log("メイン");
        
        meals.main.forEach((v , i) => {
            console.log(v.html());
        });
        console.log("副菜");
        meals.sub.forEach((v , i) => {
            console.log(v.html());
        });
     } catch (e) {
         console.error(e)
     }
})


/**
 * 
 * @param body 
 * @returns 
 */
const extractRecipeLinks = (body: string) => {
    const $ = cheerio.load(body);
    let isSubMeal: boolean = false;
    let mainMeals: cheerio.Cheerio[] = [];
    let subMeals: cheerio.Cheerio[] = [];
    $('#page_recipe > div > div').children().each( (_i: number, element: cheerio.Element) => {
        if (element.type === "tag" &&  element.name === RECIPE_SPEC_TAG && $(element).text() === "副菜"){
            isSubMeal = true;
        }
        if (element.type === "tag" && element.name !== RECIPE_SPEC_TAG){
            if (isSubMeal) subMeals.push($(element));
            else mainMeals.push($(element));
        }
    });
    return new Meals(mainMeals, subMeals);
}