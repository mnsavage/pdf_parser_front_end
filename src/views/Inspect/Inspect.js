import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import pageOption from '../../utils/pageOption';
import UnderlineHeader from '../../components/UnderlineHeader/UnderlineHeader';
import FileList from '../../components/FileList/FileList';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import Alert from '../../components/Alert/Alert';
import CreateSummary from './CreateSummary/CreateSummary';
import PropTypes from 'prop-types';
import RequirementsList from '../../components/RequirementsList/RequirementsList';
import UseRequirementData from '../../hooks/UseRequirementData/UseRequirementData';
import OptionDropdown from '../../components/OptionDropdown/OptionDropdown';
import './Inspect.css';

const Inspect = ({ setPage, uploadedFiles, setUploadedFiles, testingRequirementsList }) => {

  // list of fetched requirements for all PDFs
  // if a testingRequirementsList is provided, that is used
  const requirementsList = (testingRequirementsList == null)? UseRequirementData(uploadedFiles) : testingRequirementsList;

  // tracks what conditions are met
  const [metConditions, setMetConditions] = useState(
    (testingRequirementsList == null)? (
      uploadedFiles.map(() => null)
    ) : (
      requirementsList.map((file) => {
        if (file['response'] == null) {
          return null;
        };
        var metArray = [];
        file['response']['header'].map((header) => {
          header['requirements'].map((req) => {
            metArray[req['title']] = (req.met == null) ?
              {met: false, automated: false, edited: false} :
              {met: req['met'], automated: true, edited: false};
          })
        });
        return metArray;
      })
    )
  );

  // tracks comments
  const [comments, setComments] = useState(
    (testingRequirementsList == null)? (
      uploadedFiles.map(() => null)
    ) : (
      requirementsList.map((file) => {
        if (file['response'] == null) {
          return null;
        }
        var commentsArray = [];
        file['response']['header'].map((header) => {
          header['requirements'].map((req) => {
            commentsArray[req['title']] = '';
          })
        })
        return commentsArray;
      })
    )
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMetConditions, setSelectedMetConditions] = useState(metConditions[selectedIndex]);
  const [selectedComments, setSelectedComments] = useState(comments[selectedIndex]);
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [filterFunction, setFilterFunction] = useState(() => (value, metConditions) => {return value});
  const [resetConditionsAlertOpen, setResetConditionsAlertOpen] = useState(false);
  const [resetCommentsAlertOpen, setResetCommentsAlertOpen] = useState(false);

  // when the requirements list is updated, call to update metConditions and comments accordingly
  useEffect(() => {
    // update met conditions
    setMetConditions((oldConditions) => {
      return oldConditions.map((conditon, index) => {
        if (requirementsList[index]['response'] != null && conditon == null) {
          var metArray = [];
          requirementsList[index]['response']['header'].map((header) => {
            header['requirements'].map((req) => {
              metArray[req['title']] = (req['met'] == null) ?
                {met: false, automated: false, edited: false} :
                {met: req['met'], automated: true, edited: false}
            })
          })
          return metArray;
        } else {
          return conditon;
        }
      });
    });

    // update comments
    setComments((oldComments) => {
      return oldComments.map((comment, index) => {
        if (requirementsList[index]['response'] != null && comment == null) {
          var commentsArray = [];
          requirementsList[index]['response']['header'].map((header) => {
            header['requirements'].map((req) => {
              commentsArray[req['title']] = '';
            })
          })
          return commentsArray;
        } else {
          return comment;
        }
      });
    });
  }, [requirementsList]);

  // set selected metConditions and comments when they are updated
  useEffect(() => {
    setUrl(URL.createObjectURL(uploadedFiles[selectedIndex]));
    setSelectedMetConditions(metConditions[selectedIndex]);
    setSelectedComments(comments[selectedIndex]);
  }, [selectedIndex, metConditions, comments]);

  // Check if any edits were made
  const checkEdits = () => {
    for (var key in selectedMetConditions) {
      if (selectedMetConditions[key].met != metConditions[selectedIndex][key].met) {
        return false;
      };
      if (selectedComments[key] != comments[selectedIndex][key]) {
        return false;
      };
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
        };
      });
      setMetConditions(newConditions);

      // update met comments
      const newComments = comments.map((comment, index) => {
        if (index == selectedIndex) {
          return selectedComments;
        } else {
          return comment;
        };
      });
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
        newCond[key] = {met: !selectedMetConditions[key].met, automated: true, edited: false};
      } else {
        newCond[key] = selectedMetConditions[key];
      };
    };
    setSelectedMetConditions(newCond);
  };

  const handleResetComments = () => {
    // create new comment array reseting edited elements
    // there is no way to do this with map since it is an object
    var newComments = [];
    for (var key in selectedComments) {
      newComments[key] = '';
    };
    setSelectedComments(newComments);
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
      <Alert 
        isOpen={resetConditionsAlertOpen} 
        title='Discard changes?' 
        desc='Continue to reset automated conditions to their original.' 
        continueAction={() => {
          setResetConditionsAlertOpen(false);
          handleResetCondiditons();
        }} 
        backAction={() => {
          setResetConditionsAlertOpen(false)
        }}
      />
      <Alert 
        isOpen={resetCommentsAlertOpen} 
        title='Discard changes?' 
        desc='Continue to delete all comments in this file.' 
        continueAction={() => {
          setResetCommentsAlertOpen(false);
          handleResetComments();
        }} 
        backAction={() => {
          setResetCommentsAlertOpen(false)
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
              <FileList
                selectedIndex={selectedIndex}
                names={requirementsList.map((element, index) => (element['response'] == null || element['response']['newName'] == null) ? uploadedFiles[index].name : element['response']['newName'])} 
                status={requirementsList.map((element) => element['status'])}
                handleListItemClick={handleListItemClick}
              />
            </div>
          </div>
        )}
        <div className='vl'></div>
        <div className='right-list-container'>
          {(requirementsList[selectedIndex]['response'] != null) ? (
            <>
              {(requirementsList[selectedIndex]['status'] == 'error') ? (
                <Typography variant='body3' className='automated-label'>* Requirements were unable to be automated</Typography>
              ) : (
                <Typography variant='body3' className='automated-label-outlined'>* Automated requirements are outlined</Typography>
              )}
              <OptionDropdown 
                setFilterFunction={setFilterFunction}
                setResetConditionsAlertOpen={setResetConditionsAlertOpen}
                setResetCommentsAlertOpen={setResetCommentsAlertOpen}
                disabled={!editing}
              />
            </>
          ) : (<div />)
          }
          <div className='requirements-list-container'>
            <RequirementsList 
              requirementsList={(requirementsList[selectedIndex]['response'] == null) ? null : requirementsList[selectedIndex]['response']['header']} 
              metConditions={selectedMetConditions} 
              setMetConditions={setSelectedMetConditions}
              comments={selectedComments} 
              setComments={setSelectedComments}
              error={requirementsList[selectedIndex]['status'] == 'api error'} 
              disabled={!editing} 
              filterFunction={filterFunction} 
            />
          </div>
        </div>
      </div>
      <Box
        className='button-box'
      >
      {editing ? (
        <div />
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
            };
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
  testingRequirementsList: PropTypes.array
};

export default Inspect;
