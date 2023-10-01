import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'
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

const Upload = ({ setPage, setUploadedFiles }) => {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const continueAction = () => {
    if (!files) {
      alert('Please select files to upload');
      return;
    }
    setUploadedFiles(files);
    setPage(pageOption.Confirm);
  };

  const removeFile = (name) => {
     setFiles([...files].filter(item => item.name !== name));
   };

   //Something like this will be used to upload info to back end maybe?
  const upload = () => {
    if (!files) {
      console.log("No file selected");
      return;
    }
    const fd = new FormData();
    for (let i=0; i<files.length; i++) {
      fd.append(`file${i+1}`, files[i]);
    }

    setMsg('Uploading...');
    setProgress(prevState => {
      return {...prevState, started: true}
    })

    axios.post('backend', fd, {
      onUploadProgress: (progressEvent) => { 
        setProgress(prevState => {
          return { ...prevState, pc: progressEvent.progress * 100 }
        })
      },
      headers: {
        'Custom-Header' : 'value'
      }
    })
    .then(res => {
      setMsg('Upload successful')
      console.log(res.data)
    })
    .catch(err => {
      setMsg('Upload failed')
      console.error(err)
    });
  }

  return (
    <>
      <UnderlineHeader title="Upload Theses or Dissertations as PDFs"/>
      <div className='outside'>
        <Button
          variant="contained"
          className='local-files-button'
          color='secondary'
        >
        Browse Local Files
        <input 
          className='hidden-input'
          type="file" 
          accept="application/pdf"
          onChange={ (e) => {
            setFiles(e.target.files);
          } }
          multiple
        />
        </Button>
      </div>
      {files && (
        <>
        <UnderlineHeader title="Attached Files" />
        <div className='list-container'>
          <List dense={false}>
          {[...files].map((value) => (
            <ListItem
              key={value.name}
              disableGutters
            >
              <IconButton 
              aria-label="delete"
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
      { progress.started && <progress max='100' value={progress.pc}></progress>}
      { msg && <span>{msg}</span>}
      <ContinueButton action={continueAction} />
    </>
  );
};

Upload.propTypes = {
  setPage: PropTypes.func.isRequired,
  setUploadedFiles: PropTypes.func.isRequired
};

export default Upload;
