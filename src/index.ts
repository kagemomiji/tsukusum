import request from 'request';
import cheerio from 'cheerio';
import Meals from './model/Meals';
import Meal from './model/Meal';

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
        
        meals.main.forEach((v , _i) => {
            console.log(v);
        });
        console.log("副菜");
        meals.sub.forEach((v , i) => {
            console.log(v);
        });
     } catch (e) {
         console.error(e)
     }
})


const extractRecipeLinks = (body: string) => {
    const $ = cheerio.load(body);
    let isSubMeal: boolean = false;
    let mainMeals: Meal[] = [];
    let subMeals: Meal[] = [];
    $('#page_recipe > div > div').children().each( (_i: number, element: cheerio.Element) => {
        if (element.type === "tag" &&  element.name === RECIPE_SPEC_TAG && $(element).text() === "副菜"){
            isSubMeal = true;
        }
        if (element.type === "tag" && element.name !== RECIPE_SPEC_TAG){
            let meal = new Meal($(element).text(), $(element).find('a').attr('href'))
            if (isSubMeal) subMeals.push(meal);
            else mainMeals.push(meal);
        }
    });
    return new Meals(mainMeals, subMeals);
}