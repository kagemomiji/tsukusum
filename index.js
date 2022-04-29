const request = require('request');
const cheerio = require('cheerio');
const { each } = require('cheerio/lib/api/traversing');

const url = process.argv[2];
console.log(url);

const RECIPE_SPEC_TAG = 'h3';

request(url, (e, response, body) => {
    if (e) {
        console.error(e)
    }
    try {
        const {main, sub} = extractRecipeLinks(body);
        console.log("メイン");
        main.forEach((v , i) => {
            console.log(v.html());
        });
        console.log("副菜");
        sub.forEach((v , i) => {
            console.log(v.html());
        });
     } catch (e) {
         console.error(e)
     }
})

const extractRecipeLinks = (body) => {
    try {
        const $ = cheerio.load(body);
        let isSubMeal = false;
        let mainMeals = [];
        let subMeals = [];
        $('#page_recipe > div > div').children().each( (i, element) => {
            if (element.name === RECIPE_SPEC_TAG && $(element).text() === "副菜"){
                isSubMeal = true;
            }
            if (element.name !== RECIPE_SPEC_TAG){
                if (isSubMeal) subMeals.push($(element));
                else mainMeals.push($(element));
            }
        });
        return {
            main: mainMeals,
            sub: subMeals
        };
     } catch (e) {
         console.error(e)
    }
}
