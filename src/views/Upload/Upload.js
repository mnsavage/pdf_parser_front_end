import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import pageOption from '../../utils/pageOption';
import UnderlineHeader from '../../components/UnderlineHeader/UnderlineHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import PropTypes from 'prop-types';
import './Upload.css';

const Upload = ({ setPage, uploadedFiles, setUploadedFiles }) => {
  const [files, setFiles] = useState(uploadedFiles);

  const continueAction = () => {
    if (!files || [...files].length == 0) {
      alert('Please select files to upload');
      return;
    }
    setUploadedFiles(files);
    setPage(pageOption.Confirm);
  };

  const removeFile = (name) => {
     setFiles([...files].filter(item => item.name !== name));
  };

  return (
    <>
      <UnderlineHeader title='Upload Theses or Dissertations as PDFs'/>
      <div className='outside'>
        <Button
          variant='contained'
          className='local-files-button'
          color='secondary'
        >
        Browse Local Files
          <input 
            className='hidden-input'
            type='file' 
            accept='application/pdf'
            onChange={ (e) => {
              setFiles(prevFiles => [...prevFiles, ...e.target.files]);
            } }
            onClick={ (e) => {
              e.target.value = null;
            } }
            multiple
          />
        </Button>
      </div>
      {files && [...files].length > 0 && (
        <>
        <UnderlineHeader title='Attached Files' />
        <div className='upload-list-container'>
          <List dense={false}>
          {[...files].map((value) => (
            <ListItem
              key={value.name}
              disableGutters
            >
              <IconButton 
              aria-label='delete'
              onClick={() => {removeFile(value.name)}}
              >
                <DeleteIcon />
              </IconButton>
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
          </List>
        </div>
        </>
      )}
      <Box
        className='button-box'
      >
        <ContinueButton action={continueAction} />
      </Box>
    </>
  );
};

Upload.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.any,
  setUploadedFiles: PropTypes.func.isRequired
};

export default Upload;
