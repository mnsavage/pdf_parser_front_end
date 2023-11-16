import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import pageOption from '../../utils/pageOption';
import UnderlineHeader from '../../components/UnderlineHeader/UnderlineHeader';
import FileList from '../../components/FileList/FileList';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import Alert from '../../components/Alert/Alert';
import CreateSummary from './CreateSummary/CreateSummary';
import PropTypes from 'prop-types';
import RequirementsList from '../../components/RequirementsList/RequirementsList';
import './Inspect.css';

const Inspect = ({ setPage, uploadedFiles, setUploadedFiles, requirementsList }) => {
  const [metConditions, setMetConditions] = useState(
    requirementsList.map((file) => {
      var metArray = [];
      file.header.map((header) => {
        header.requirements.map((req) => {
          metArray[req.title] = {met: req.met, edited: false};
        })
      })
      return metArray;
    })
  );
  const [comments, setComments] = useState(
    requirementsList.map((file) => {
      var commentsArray = [];
      file.header.map((header) => {
        header.requirements.map((req) => {
          commentsArray[req.title] = '';
        })
      })
      return commentsArray;
    })
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMetConditions, setSelectedMetConditions] = useState(metConditions[selectedIndex]);
  const [selectedComments, setSelectedComments] = useState(comments[selectedIndex]);
  const [editing, setEditing] = useState(false);
  const [showUnmet, setShowUnmet] = useState(false);
  const [url, setUrl] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [editAlertOpen, setEditAlertOpen] = useState(false);

  useEffect(() => {
    setUrl(URL.createObjectURL(uploadedFiles[selectedIndex]));
    setSelectedMetConditions(metConditions[selectedIndex]);
    setSelectedComments(comments[selectedIndex])
  }, [selectedIndex]);

  // Check if any edits were made
  const checkEdits = () => {
    for (var key in selectedMetConditions) {
      if (selectedMetConditions[key].met != metConditions[selectedIndex][key].met) {
        return false;
      }
      if (selectedComments[key] != comments[selectedIndex][key]) {
        return false;
      }
    }
    return true;  
  };

  const handleEditClick = () => {
    // if done editing, update the met conditions and comments
    if (editing == true) {
      // update met conditions
      const newConditions = metConditions.map((conditon, index) => {
        if (index == selectedIndex) {
          return selectedMetConditions;
        } else {
          return conditon;
        }
      })
      setMetConditions(newConditions);

      // update met comments
      const newComments = comments.map((comment, index) => {
        if (index == selectedIndex) {
          return selectedComments;
        } else {
          return comment;
        }
      })
      setComments(newComments);
    }
    setEditing(!editing);   
  };

  const handleResetCondiditons = () => {
    // create new conditions array reseting edited elements
    // there is no way to do this with map since it is an object
    var newCond = [];
    for (var key in selectedMetConditions) {
      if (selectedMetConditions[key].edited) {
        newCond[key] = {met: !selectedMetConditions[key].met, edited: false};
      } else {
        newCond[key] = selectedMetConditions[key];
      }
    }
    setSelectedMetConditions(newCond);
  };

  const handleUnmetSwitch = () => {
    setShowUnmet(!showUnmet);   
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Alert 
        isOpen={alertOpen} 
        title='Are you sure you want to continue?' 
        desc='All data will be lost. Download summaries before continuing.' 
        continueAction={() => {
          setAlertOpen(false);
          setUploadedFiles(null);
          setPage(pageOption.Upload);
        }} 
        backAction={() => {
          setAlertOpen(false);
        }}
      />
      <Alert 
        isOpen={editAlertOpen} 
        title='Save changes?' 
        desc='Continue to save edits to the requirements.' 
        continueAction={() => {
          setEditAlertOpen(false);
          handleEditClick();
        }} 
        backAction={() => {
          setEditAlertOpen(false)
        }}
      />
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
            <RequirementsList 
              requirementsList={requirementsList[selectedIndex].header} 
              metConditions={selectedMetConditions} 
              setMetConditions={setSelectedMetConditions}
              comments={selectedComments} 
              setComments={setSelectedComments} 
              disabled={!editing} 
              showUnmet={showUnmet} 
            />
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
                onClick={handleResetCondiditons}
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
                  onClick={() => {CreateSummary(requirementsList, metConditions, comments);}}
                >
                  Download Summaries
              </Button>
            </div>
          </>
        )}
        <ContinueButton action={() => {
          if (editing) {
            if (checkEdits()) {
              setEditing(false);
            } else {
              setEditAlertOpen(true);
            }
          } else {
            setAlertOpen(true);
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
  requirementsList: PropTypes.array.isRequired
};

export default Inspect;
