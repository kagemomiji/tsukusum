import request from 'request';
import Meals from './model/Meals';

const url = process.argv[2];
console.log(url);

request(url, (e: any, _response, body: string) => {
    if (e) {
        console.error(e)
    }
    try {
        const meals: Meals = new Meals(body);
       
        meals.main.forEach((v , _i) => {
            console.log(v);
        });
        console.log("副菜");
        meals.sub.forEach((v , i) => {
            console.log(v);
        });
        console.log(meals.html());
     } catch (e) {
         console.error(e)
     }
})