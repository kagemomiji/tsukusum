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
        const color = value.storeType === "冷蔵" ? blue[500] : deepPurple[500]; 

        return (
          <ListItem
            key={`meal-${index}`}
            disablePadding
            dense
          >
            
            <ListItemIcon>
              <Avatar sx={{bgcolor: color, color: 'white'}}>{`${value.storeLimit}`}</Avatar>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.name}` } secondary={`${value.storeType}:${value.storeLimit}`} sx={{lineHeight:1, margin:0}}/>
          </ListItem>
        );
      })}
    </List>
  );
}

export default MealList;
