import axios from 'axios';
import express from 'express';
import { Tsukuoki } from './common/const/Tsukuoki';
import Meals from './model/Meals';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(8080, () => {
    console.log("Start on port 8080.")
})


app.get('/:id', async (req, res) => {
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

const getSummary = async (id: string): Promise<Meals> => {
    let url = `${Tsukuoki.url}${id}/`;
    const res = await axios.get(url, { timeout : 5000 });
    const meals: Meals = new Meals(res.data);

    await meals.extractFoods();
    return meals;
}

