import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import pageOption from '../../utils/pageOption';
import UnderlineHeader from '../../components/UnderlineHeader/UnderlineHeader';
import FileList from '../../components/FileList/FileList';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import PropTypes from 'prop-types';
import RequirementsList from '../../components/RequirementsList/RequirementsList';
import './Inspect.css';

const Inspect = ({ setPage, uploadedFiles, setUploadedFiles, requirementsList }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [editing, setEditing] = React.useState(false);
  const [showUnmet, setShowUnmet] = React.useState(false);
  const [url, setUrl] = React.useState('');

  useEffect(() => {
    setUrl(URL.createObjectURL(uploadedFiles[selectedIndex]));
  }, [selectedIndex]);

  const handleEditClick = () => {
    setEditing(!editing);   
  };

  const handleUnmetSwitch = () => {
    setShowUnmet(!showUnmet);   
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className='inspect-page-container'>
        {editing ? (
          <embed
            src={url}
            className='pdf-viewer'>
          </embed>
        ) : (
          <div className='left-container'>
            <UnderlineHeader title='Uploaded Files' />
            <div className='confirm-list-container'>
              <FileList selectedIndex={selectedIndex} files={uploadedFiles} handleListItemClick={handleListItemClick} />
            </div>
          </div>
        )}
        <div className='vl'></div>
        <div className='right-list-container'>
          <FormControlLabel control={<Switch onChange={handleUnmetSwitch} />} label='Show only unmet conditons' className='switch' />
          <div className='requirements-list-container'>
            <RequirementsList requirementsList={requirementsList[selectedIndex].header} disabled={!editing} showUnmet={showUnmet} />
          </div>
        </div>
      </div>
      <Box
        className='button-box'
      >
      {editing ? (
        <div className='back-button-container'>
              <Button
                variant='contained'
                className='secondary-button'
                color='secondary'
              >
                Reset All Conditions
              </Button>
            </div>
        ) : (
          <>
            <div className='back-button-container'>
              <Button
                variant='contained'
                className='secondary-button'
                color='secondary'
                onClick={handleEditClick}
              >
                Edit/ View Selected File
              </Button>
            </div>
            <div className='back-button-container'>
                <Button
                  variant='contained'
                  className='secondary-button'
                  color='secondary'
                >
                  Download Summaries
              </Button>
            </div>
          </>
        )}
        <ContinueButton action={() => {
          if (editing) {
            handleEditClick();
          } else {
            setUploadedFiles(null);
            setPage(pageOption.Upload);
          }
          }} 
        />
      </Box>
    </>
  );
};

Inspect.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.array.isRequired,
  setUploadedFiles: PropTypes.func.isRequired,
  requirementsList: PropTypes.object.isRequired
};

export default Inspect;
