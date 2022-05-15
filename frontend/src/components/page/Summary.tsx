import { useLocation } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Meals, { MealsProperties } from "../../model/Meals";
import SummaryContent from "../summary/SummaryContent";

const Summary = (): JSX.Element => {
    // query parameter 
    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);
    const id = query.get("id");
    
    // backend server

    // state
    const [isLoading, setLoading] = useState(id !== null && id.toString().length > 1);
    const [meals, setMeals] = useState<Meals>();
    const [message, setMessage] = useState("")
    const baseUrl = process.env.REACT_APP_BACKEND_URL ?? window.location.origin;
    let url = id === null ? "" : new URL(`/api/tsukuoki/${id}`, baseUrl).toString();

    useEffect(() => {
        if(url.length > 0){
            axios.get(url, { timeout : 8000 }).then(res => {
                let properties = JSON.parse(JSON.stringify(res.data)) as MealsProperties;
                console.log(new Meals(properties));
                setMeals(new Meals(properties));
            }).catch(
                (_reason) => setMessage("server access failed")
            )
            .finally(
                () => setLoading(false)
            );
        }
   }, [url]) 

    return (
        <>
        {isLoading ? 
            <SpinnerDotted />  : (meals === undefined ? message : <SummaryContent meals={meals}/>)
        }
        </>
    );

}

export default Summary;
