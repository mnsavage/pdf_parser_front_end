import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Comment from '@mui/icons-material/Comment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types';
import './RequirementsList.css';

const RequirementsList = ({ requirementsList, metConditions, setMetConditions, comments, setComments, disabled, showUnmet }) => {
  const [open, setOpen] = useState([]);
  const [openComment, setOpenComment] = useState('');

  // when a new paper is selected, make sure all comments are closed
  useEffect(() => {
    setOpenComment('')
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

  // when the user opens/ closes the drop down
  const handleOpenComment = (value) => () => {
    if (value == openComment) {
      setOpenComment('');
    } else if (!disabled || comments[value] !== '') {
      setOpenComment(value);
    }
  };

  // when the user checks/ unchecks a box
  const handleCheck = (value) => () => {
    if (disabled) {return}
    var newCond = [];
    for (var key in metConditions) {
      if (key == value) {
        newCond[key] = (metConditions[value].automated) ? 
          {met: !metConditions[value].met, automated: true, edited: !metConditions[value].edited} :
          {met: !metConditions[value].met, automated: false, edited: false}
      } else {
        newCond[key] = metConditions[key];
      }
    }
    setMetConditions(newCond);
  };

  // when the user updates a comment
  const updateComment = (condition, value) => {
    if (disabled) {return}
    var newComments = [];
    for (var key in metConditions) {
      if (key == condition) {
        newComments[key] = value
      } else {
        newComments[key] = comments[key];
      }
    }
    setComments(newComments);
  };

  if (requirementsList === null || metConditions === null || comments === null) {
    return (
      <div className='loading-div'>
        <CircularProgress 
          className='loading-spinner' 
          color='primary'
          data-testid = 'loading-spinner'
        />
      </div>
    )
  }

  return (
    <List key='list'>
      {requirementsList.map((value) => {
        return (
          <>
            <ListItemButton 
              style={{backgroundColor: '#9E1B32', color: 'white'}}
              key={`ListItemButton-${value['title']}`}
              className='expandable-header'
              onClick={handleOpen(value['title'])}
            >
              <ListItemText 
                key={`ListItemText-${value['title']}`} 
                disableTypography="true"
                className='header-title' 
                primary={
                  <Typography 
                    key={`Typography-${value['title']}`} 
                    variant='body2'
                  >
                    {value.title}
                  </Typography>} 
              />
              {
                (open.indexOf(value.title) !== -1) ? 
                <ExpandMore key={`ExpandMore-${value['title']}`}/> : 
                <ExpandLess key={`ExpandLess-${value['title']}`}/>
              }
            </ListItemButton>
            <Collapse 
              in={open.indexOf(value['title']) == -1} 
              key={`Collapse-${value['title']}`} 
              timeout='auto' 
              unmountOnExit
            >
              <List key={`Lists-${value['title']}`}>
                {value['requirements'].filter(value => !showUnmet || metConditions[value['title']]['met'] ).map((req => {
                  return (
                    <>
                    <ListItem
                      key={`ListItemButton-${req['title']}`}
                      role={undefined}
                      
                      className={`requirement-item-${metConditions[req['title']].automated ? 'automated' : 'not-automated'}`}
                      dense
                    >
                      <List key={`List-${req['title']}`} className='sublist'>
                        <ListItem key={`outerListItem-${req['title']}`}>
                          <ListItemIcon
                            key={`ListItemIcon-${req['title']}`}
                            data-testid='checkbox'
                            onClick={handleCheck(req['title'])}
                          >
                            <Checkbox
                              checked={metConditions[req['title']]['met']}
                              tabIndex={-1}
                              key={`Checkbox-${req['title']}`}
                              disableRipple
                              id={`Checkbox-${req['title']}`} />
                          </ListItemIcon>
                          <ListItemText
                            className='requirement-text'
                            key={`ListItemText-${req['title']}`}
                            disabletypography="true"
                            primary={<Typography
                              key={`Typography-${req['title']}`}
                              variant='body3'
                            >
                              {req['title']}
                            </Typography>} />
                        </ListItem>
                        {metConditions[req['title']].edited &&
                          <Typography
                            key={`Typography-edited-${req['title']}`}
                            className='edited-symbol'
                            variant='body4'
                          >
                            edited
                          </Typography>}
                      </List>
                      <ListItemButton
                          key={`ListItemButtonComment-${req['title']}`}
                          role={undefined}
                          className='comment-button'
                          data-testid='comment-button'
                          onClick={handleOpenComment(req['title'])}
                          disableRipple
                      >
                        <ListItemIcon key={`ListItemIconComment-${req['title']}`}>
                          <Comment
                            className='comment'
                            key={`CommentIcon-${req['title']}`}
                          />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={openComment == req['title']}
                      key={`CollapseComment-${req['title']}`}
                      timeout='auto'
                      unmountOnExit
                    >
                      <List component='div' key={`ListComment-${req['title']}`}>
                        <TextField
                          key={`CommentTextArea-${req['title']}`}
                          className='comment-text-area'
                          disabled={disabled}
                          label="Comment"
                          placeholder="Add comment here"
                          inputProps={{style: {fontSize: 15, lineHeight: 1.2}}}
                          value={comments[req['title']]}
                          onChange={(event) => {
                            updateComment(req['title'], event.target.value);
                          }}
                          multiline
                          focused
                        />
                      </List>
                    </Collapse>
                  </>
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
    requirementsList: PropTypes.array,
    metConditions: PropTypes.array,
    setMetConditions: PropTypes.func.isRequired,
    comments: PropTypes.array,
    setComments: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    showUnmet: PropTypes.bool.isRequired,
};

export default RequirementsList;
