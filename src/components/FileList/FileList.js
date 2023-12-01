import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import './FileList.css';

const FileList = ({ selectedIndex, names, status, handleListItemClick }) => {
  
  // status, an array to display the status of each file name can be optionally passed in
  // on loading, will show a loading skelton, on error will show an error icon
  const createFileContents = (value, index) => {
    if (status != null && status[index] == 'loading') {
      return (
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
      );
    } else if (status != null && (status[index] == 'error' || status[index] == 'api error')) {
      return (
        <>
          <ErrorOutline 
            color='primary'
            data-testid = 'error-icon'
          />
          <ListItemText className='error-text' primary={value} />
        </>
      );
    } else { 
      return (<ListItemText primary={value} />);
    }
  };

  return (
    <List dense={false}>
      {names.map((value, index) => (
        <ListItemButton
            className='list-button'
            selected={selectedIndex == index}
            onClick={() => handleListItemClick(index)}
            key={index}
        >
        {createFileContents(value, index)}
        </ListItemButton>
      ))}
    </List>
  );
  };

FileList.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    names: PropTypes.array.isRequired,
    status: PropTypes.array,
    handleListItemClick: PropTypes.func.isRequired
};

export default FileList;
