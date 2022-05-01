import axios from 'axios';
import Meal from './model/Meal';
import Meals from './model/Meals';

const url = process.argv[2];
console.log(url);

const main = async () => {
    const res = await axios.get(url);
    const meals: Meals = new Meals(res.data);

    await meals.getFoods();
    
    meals.main.forEach((v , _i) => {
        console.log(v);
    });
    console.log("副菜");
    meals.sub.forEach((v , i) => {
        console.log(v);
    });
    console.log(meals.html());
}

main();
