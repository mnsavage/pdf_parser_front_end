import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import './FileList.css';

const FileList = ({ selectedIndex, names, handleListItemClick }) => {
  return (
    <List dense={false}>
      {names.map((value, index) => (
        <ListItemButton
            className='list-button'
            selected={selectedIndex == index}
            onClick={() => handleListItemClick(index)}
            key={index}
        >
        {
          (value === null) ? 
          <>
            <List
              className='skeleton-list'
              data-testid='skeleton-list'
              dense
            >
              <Skeleton className='skeleton' />
              <Skeleton className='skeleton' />
            </List>
            </>
            :
            <ListItemText primary={value} />
        }
        </ListItemButton>
      ))}
    </List>
  );
  };

FileList.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    names: PropTypes.array.isRequired,
    handleListItemClick: PropTypes.func.isRequired
};

export default FileList;
