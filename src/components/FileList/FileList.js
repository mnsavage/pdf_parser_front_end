import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import './FileList.css';

const FileList = ({ selectedIndex, files, handleListItemClick }) => {
  return (
    <List dense={false}>
        {[...files].map((value, index) => (
        <ListItemButton
            className='list-button'
            selected={selectedIndex == index}
            onClick={() => handleListItemClick(index)}
            key={index}
            disableGutters
        >
            <ListItemText primary={value.name} />
        </ListItemButton>
        ))}
    </List>
  );
  };

FileList.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    files: PropTypes.any.isRequired,
    handleListItemClick: PropTypes.func.isRequired
};

export default FileList;
