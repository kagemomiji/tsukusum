import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Tsukuoki } from "../common/const/Tsukuoki";




export default function Form(){
    const [doRedirect, setRedirect] = useState(false);
    const [tsukuokiId, setId] = useState("");
    const onClickHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let url = data.get('url')?.toString();
        if(url !== undefined){
            setRedirect(url.toString().includes(Tsukuoki.url));
            let id = url.match(/https:\/\/cookien.com\/tsukurioki\/(\d+)\//);
            if(id !== null){
                setId(id[1]);
            }

        }
        console.log({
          url: data.get('url')
        });
    }
    return (
        <>
            {doRedirect && <Navigate to={`/summary?id=${tsukuokiId}`}/>}
            <Typography component="h1" variant="h5">
                Tsukuoki Summarizer
            </Typography>
            <Box component="form" sx={{mt: 3, width: '75%'}} onSubmit={onClickHandler} textAlign='center'>
                <Grid spacing={2}>
                    <Grid xs={12}>
                        <TextField required id="url" name="url" label="tsukuoki-url" type="url" sx={{width: 1}}/> 
                    </Grid>
                </Grid>
                <Button type="submit" color="primary" size="large" variant="contained" sx={{mt:3,mb:2, width: '200px'}}>変換</Button>
            </Box>
        </>
    );
}
