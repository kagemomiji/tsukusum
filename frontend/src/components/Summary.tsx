import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { useState } from "react";
import { Tsukuoki } from "../common/const/Tsukuoki";
import axios from "axios";
import Meal from "../model/Meal";
import Meals from "../model/Meals";
import "../common/setting";

const Summary = (): JSX.Element => {
    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);
    const id = query.get("id");
    const [isLoading, setLoading] = useState(id !== null && id.toString().length > 1);
    const [meals, setMeals] = useState<Meals>();
    const url = query.get("id") === undefined ? "" : Tsukuoki.url + id;
    console.log(url);

    const getMeals = () => {
        if(url.length > 0){
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.get(url, { timeout : 5000 }).then(value => {
                let _meals = new Meals(value.data);
                _meals.extractFoods().then(() => {
                    setLoading(false);
                    setMeals(_meals);
                });
            });
        }
    }

    getMeals();
    return (
        <>
        <Typography component="h1" variant="h5">
                Tsukuoki Summary
        </Typography>
        {isLoading ? 
            <SpinnerDotted />  : "test"
        }
        <Link to="/">Topへもどる</Link>
        </>
    );

}

export default Summary;
