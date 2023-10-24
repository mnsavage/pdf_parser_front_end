import React, { useState } from 'react';
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

const RequirementsList = ({ requirementsList, metConditions, setMetConditions, disabled, showUnmet }) => {
  const [open, setOpen] = useState([]);

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
    if (disabled) {return}
    var newCond = [];
    for (var key in metConditions) {
      if (key == value) {
        newCond[key] = {met: !metConditions[value].met, edited: !metConditions[value].edited};
      } else {
        newCond[key] = metConditions[key];
      }
    }
    setMetConditions(newCond);
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
              {value.requirements.filter(value => !showUnmet || metConditions[value.title].met ).map((req => {
                return (
                  <ListItemButton
                    key={`ListItemButton-${req.title}`}
                    role={undefined}
                    onClick={handleCheck(req.title)}
                  >
                    <List key={`List-${req.title}`} className='sublist'>
                      <ListItem key={`outerListItem-${req.title}`}>
                        <ListItemIcon key={`ListItemIcon-${req.title}`}>
                          <Checkbox
                            checked={metConditions[req.title].met}
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
                            </Typography>
                          }
                        />
                      </ListItem>
                      {metConditions[req.title].edited && 
                        <Typography
                        key={`Typography-edited-${req.title}`}
                        className='edited-symbol'
                        variant='body4'
                        >
                          edited
                        </Typography>
                      }
                    </List>
                  </ListItemButton>
                );
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
    metConditions: PropTypes.array.isRequired,
    setMetConditions: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    showUnmet: PropTypes.bool.isRequired,
};

export default RequirementsList;
