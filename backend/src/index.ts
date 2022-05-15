import axios from 'axios';
import express from 'express';
import path from 'path';
import { Tsukuoki } from './common/const/Tsukuoki';
import Meals from './model/Meals';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, "..", "public")));


app.listen(8080, () => {
    console.log("Start on port 8080.")
})


app.get('/api/tsukuoki/:id', async (req, res) => {
    try{
        const meals: Meals = await getSummary(req.params.id);
        res.status(200).json(meals);
    }catch(e){
        if(e instanceof Error){
            res.status(500).send({error: e.message})
        } else {
            res.status(500).send({});
        }
    }
})

/* GET home page. */
app.get('/', (_req, res, _next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


const getSummary = async (id: string): Promise<Meals> => {
    let url = `${Tsukuoki.url}${id}/`;
    const res = await axios.get(url, { timeout : 5000 });
    const meals: Meals = new Meals(res.data);

    await meals.extractFoods();
    return meals;
}

