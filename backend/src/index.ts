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
    console.log(url);
    const res = await axios.get(url, { timeout : 5000 });
    const meals: Meals = new Meals(res.data);

    await meals.extractFoods();
    return meals;
    
    /*
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
    */
}

