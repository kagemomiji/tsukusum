import { Box, Grid, Typography } from "@mui/material";
import Meals from "../../model/Meals";
import CheckBoxList from "./CheckBoxList";

type Props = {
    meals: Meals;
}

const SummaryContent: React.FC<Props> = ({meals}): JSX.Element => {
  console.log(meals);
    return (
      <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} >
          <Typography component="h1" variant="h5">
                  食材
          </Typography>
          <CheckBoxList foods={meals.getFoodInfo()} />
        </Grid>
        <Grid item xs={12} md={9} zeroMinWidth>
          <Typography component="h1" variant="h5">
                  レシピ
          </Typography>
          <Box sx={{ width: '100%', maxHeight: 600, overflow: 'auto', position: 'relative', bgcolor: 'background.paper' }}>
          <img src={meals.stepUrl} alt="plantuml"/>
          </Box>
        </Grid>
      </Grid>
      </>
    );
}
export default SummaryContent