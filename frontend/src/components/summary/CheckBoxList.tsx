import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import List from '@mui/material/List'
import Food from '../../model/Food';

type Props = {
    foods: Food[];
}

const CheckBoxList = (prop: Props): JSX.Element => {

  const {foods} = prop;

  const [checked, setChecked] = useState([-1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
     <List sx={{ width: '100%', maxWidth: 480, maxHeight: 300, overflow: 'auto', position: 'relative', bgcolor: 'background.paper' }}>
      {foods.map((value: Food, index: number) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={`food-${index}`}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}` } secondary={`${value.amount}`} sx={{lineHeight:1, margin:0}}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckBoxList;
