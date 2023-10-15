import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import './RequirementsList.css';

const RequirementsList = ({ requirementsList, disabled, showUnmet }) => {
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState([]);

  // inits checkboxes
  useEffect(() => {
    setChecked([]);
    requirementsList.map((header) => {
      header.requirements.map((req) => {
        if (req.met) {
          setChecked(prevChecked => [...prevChecked, req.title]);
        }
      })
    })
  }, [requirementsList]);

  // when the user opens/ closes the drop down
  const handleOpen = (value) => () => {
    const currentIndex = open.indexOf(value);
    const newOpen = [...open];
    if (currentIndex === -1) {
        newOpen.push(value);
    } else {
        newOpen.splice(currentIndex, 1);
    }
    setOpen(newOpen);
  };

  // when the user checks/ unchecks a box
  const handleCheck = (value) => () => {
    if (disabled) {return;}
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
    <List key='list'>
      {requirementsList.map((value) => {
        return (
          <>
          <ListItemButton 
            style={{backgroundColor: '#9E1B32', color: 'white'}}
            key={`ListItemButton-${value.title}`}
            className='expandable-header'
            onClick={handleOpen(value.title)}
          >
            <ListItemText 
              key={`ListItemText-${value.title}`} 
              disableTypography='true' 
              className='header-title' 
              primary={
                <Typography 
                  key={`Typography-${value.title}`} 
                  variant='body2'
                >
                  {value.title}
                </Typography>} 
            />
            {
              (open.indexOf(value.title) !== -1) ? 
              <ExpandMore key={`ExpandMore-${value.title}`}/> : 
              <ExpandLess key={`ExpandLess-${value.title}`}/>
            }
          </ListItemButton>
          <Collapse 
            in={open.indexOf(value.title) == -1} 
            key={`Collapse-${value.title}`} 
            timeout='auto' 
            unmountOnExit
          >
            <List component='div' key={`List-${value.title}`}>
              {value.requirements.filter(value => !showUnmet || checked.indexOf(value.title) == -1 ).map((req => {
                return (
                <ListItem
                  key={`ListItem-${req.title}`}
                  className='list-requirement'
                >
                  <ListItemButton  
                    key={`ListItemButton-${req.title}`} 
                    role={undefined} 
                    onClick={handleCheck(req.title)}
                  >
                    <ListItemIcon key={`ListItemIcon-${req.title}`} >
                      <Checkbox
                        checked={checked.indexOf(req.title) !== -1}
                        tabIndex={-1}
                        key={`Checkbox-${req.title}`}
                        disableRipple
                        id={`Checkbox-${req.title}`}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      className='requirement-text' 
                      key={`ListItemText-${req.title}`} 
                      disabletypography='true' 
                      primary={
                        <Typography 
                          key={`Typography-${req.title}`}  
                          variant='body3'
                        >
                          {req.title}
                        </Typography>} 
                    />
                  </ListItemButton>
                </ListItem>);
              }))}
            </List>
          </Collapse>
          </>
        );
      })}
    </List>
  );
};

RequirementsList.propTypes = {
    requirementsList: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    showUnmet: PropTypes.bool.isRequired,
};

export default RequirementsList;
