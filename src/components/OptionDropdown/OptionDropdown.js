import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Settings from '@mui/icons-material/Settings';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import UnderlineHeader from '../UnderlineHeader/UnderlineHeader'
import './OptionDropdown.css';
import PropTypes from 'prop-types';
  
  const OptionDropdown = ({setFilterFunction, setResetConditionsAlertOpen, setResetCommentsAlertOpen, disabled}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [showUnmet, setShowUnmet] = useState(false);
    const [showMet, setShowMet] = useState(false);
    const [automatedSwitch, setAutomatedSwitch] = useState(false);
    const [notAutomatedSwitch, setNotAutomatedSwitch] = useState(false);

    // update filter function on change of a toggle
    useEffect(() => {
      setFilterFunction(() => (value, metConditions) => {
        return (!showUnmet || metConditions[value['title']]['met']) &&
          (!showMet || !metConditions[value['title']]['met']) &&
          (!automatedSwitch || metConditions[value['title']]['automated']) &&
          (!notAutomatedSwitch || !metConditions[value['title']]['automated']);
      });
    }, [showUnmet, showMet, automatedSwitch, notAutomatedSwitch])
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    const handleUnmetSwitch = () => {
      if (!showUnmet) {
        setShowMet(false);  
      }
      setShowUnmet(!showUnmet);
    };
  
    const handleMetSwitch = () => {
      if (!showMet) {
        setShowUnmet(false);  
      }
      setShowMet(!showMet);
    };
  
    const handleAutomatedSwitch = () => {
      if (!automatedSwitch) {
        setNotAutomatedSwitch(false);  
      }
      setAutomatedSwitch(!automatedSwitch);
    };
  
    const handleNotAutomatedSwitch = () => {
      if (!notAutomatedSwitch) {
        setAutomatedSwitch(false);  
      }
      setNotAutomatedSwitch(!notAutomatedSwitch);
    };

    const resetConditions = () => {
      setResetConditionsAlertOpen(true);
    };

    const clearComments = () => {
      setResetCommentsAlertOpen(true);
    };

  return (
    <div className='box'>
        <Button
          data-testid='settings-button'
          onClick={handleToggle}
        >
          <Settings 
            style={{'width': '35px', 'height': '35px'}}
          />
        </Button>
      <Popper
        sx={{
          zIndex: 5,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{'top': '265px', 'right': '100px', 'left':'unset'}}
        className='dropdown'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
            <UnderlineHeader title='Options' />
              <ClickAwayListener onClickAway={handleClose}>
                <List id="split-button-menu" >
                    <ListItem key='item1'>
                       <FormControlLabel control={<Switch checked={showUnmet} onChange={handleUnmetSwitch}/>} label='Show only unmet requirements' />
                    </ListItem>
                    <ListItem key='item2'>
                       <FormControlLabel control={<Switch checked={showMet} onChange={handleMetSwitch}/>} label='Show only met requirements' />
                    </ListItem>
                    <hr className='line'/>
                    <ListItem key='item3'>
                       <FormControlLabel control={<Switch checked={automatedSwitch} onChange={handleAutomatedSwitch}/>} label='Show only automated requirements' />
                    </ListItem>
                    <ListItem key='item4'>
                       <FormControlLabel control={<Switch checked={notAutomatedSwitch} onChange={handleNotAutomatedSwitch}/>} label='Show only not automated requirements' />
                    </ListItem>
                    <ListItem key='item5'>
                        <Button className='botton' variant='contained' onClick={resetConditions} disabled={disabled}>Reset automated conditions to original</Button>
                    </ListItem>
                    <ListItem key='item6'>
                        <Button className='botton' variant='contained' onClick={clearComments} disabled={disabled}>Clear all comments</Button>
                    </ListItem>
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

OptionDropdown.propTypes = {
  setFilterFunction: PropTypes.func.isRequired,
  setResetConditionsAlertOpen: PropTypes.func.isRequired,
  setResetCommentsAlertOpen: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};
  
export default OptionDropdown;