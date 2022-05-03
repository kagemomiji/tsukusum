import axios from 'axios';
import Meal from './model/Meal';
import Meals from './model/Meals';

const url = process.argv[2];
console.log(url);

const main = async () => {
    try {
        const res = await axios.get(url, { timeout : 5000 });
        const meals: Meals = new Meals(res.data);

        await meals.getFoods();
    
        meals.main.forEach((v) => {
            console.log(v);
        });
        console.log("副菜");
        meals.sub.forEach((v) => {
            console.log(v);
        });
        console.log(meals.tools);
        console.log(meals.steps);
    } catch(e){
        console.error(e);
    }
}

main();
