import Meals from "../model/Meals";

type Props = {
    meals: Meals;
}
const SummaryContent: React.FC<Props> = ({meals}): JSX.Element => {
    return (
        <ul>
          {meals.getFoodInfo().map((data) => {
            return <li>{data.toString()}</li>;
          })}
        </ul>
    );
}
export default SummaryContent