import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List'
import Meal from '../../model/Meal';
import { Avatar, ListItemIcon, ListItemText } from '@mui/material';
import { blue, deepPurple } from '@mui/material/colors';

type Props = {
    meals: Meal[]
}

const MealList = (prop: Props): JSX.Element => {

  const {meals} = prop;

  return (
     <List sx={{ width: '100%',  maxHeight: 300, overflow: 'auto', position: 'relative', bgcolor: 'background.paper' }}>
      {meals.map((value: Meal, index: number) => {
        const labelId = `checkbox-list-label-${index}`;
        const color = value.storeType === "冷凍" ? deepPurple[600] : blue[400]; 

        return (
          <ListItem
            key={`meal-${index}`}
            disablePadding
            dense
          >
            
            <ListItemIcon>
              <Avatar sx={{bgcolor: color, color: 'white'}}>{`${value.storeLimit?.substring(0,2) ?? "?"}`}</Avatar>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.name}` } secondary={`${value.storeType ?? "冷蔵"}:${value.storeLimit ?? "?"}`} sx={{lineHeight:1, margin:0}}/>
          </ListItem>
        );
      })}
    </List>
  );
}

export default MealList;
