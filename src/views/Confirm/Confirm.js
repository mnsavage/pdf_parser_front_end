import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import pageOption from '../../utils/pageOption';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import PropTypes from 'prop-types';
import UnderlineHeader from '../../components/UnderlineHeader/UnderlineHeader';
import FileList from '../../components/FileList/FileList';
import './Confirm.css';

const Confirm = ({ setPage, uploadedFiles }) => {
const [url, setUrl] = useState('');
const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setUrl(URL.createObjectURL(uploadedFiles[selectedIndex]));
  }, [selectedIndex]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className='page-container'>
        <embed  
          src={url}
          className='pdf-viewer'>
        </embed>
        <div className='right-container'>
          <UnderlineHeader title='Uploaded Files'/>
          <div className='confirm-list-container'>
              <FileList selectedIndex={selectedIndex} names={uploadedFiles.map((file) => file.name)} handleListItemClick={handleListItemClick} />
          </div>
        </div>
      </div>
      <Box
        className='button-box'
      >
      <div className='back-button-container'>
        <Button
            variant='contained'
            className='back-button'
            color='secondary'
            onClick={() => {setPage(pageOption.Upload)}}
          >
          Back
        </Button>
        </div>
        <ContinueButton action={() => {setPage(pageOption.Inspect)}} />
      </Box>
    </>
  );
};

Confirm.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.array.isRequired,
};

export default Confirm;
