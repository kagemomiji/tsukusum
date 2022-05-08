import { Typography } from "@mui/material";
import Meals from "../../model/Meals";
import CheckBoxList from "./CheckBoxList";

type Props = {
    meals: Meals;
}
const SummaryContent: React.FC<Props> = ({meals}): JSX.Element => {
  console.log(meals);
    return (
      <>
        <Typography component="h1" variant="h5">
                食材
        </Typography>
        <CheckBoxList foods={meals.getFoodInfo()}/>
      </>
    );
}
export default SummaryContent