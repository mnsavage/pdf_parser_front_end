import React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ isOpen, title, desc, continueAction, backAction }) => {
  return (
    <Dialog
        open={isOpen}
        className='dialog'
    >
        <div className='alert-title'>
            <DialogTitle>
                {title}
            </DialogTitle>
        </div>
        { desc &&
            <DialogContent>
                <hr className='alert-line'/>
                <DialogContentText>
                    {desc}
                </DialogContentText>
            </DialogContent>
        }
        <DialogActions className='action-box'>
            { backAction && 
                <Button 
                    variant='outlined'
                    className='alert-button' 
                    onClick={backAction}
                >
                    Back
                </Button>
            }
            <Button 
                variant='contained'
                onClick={continueAction}
                className='alert-button' 
                autoFocus
            >
                Continue
            </Button>
        </DialogActions>
    </Dialog>
  );
};

 Alert.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    continueAction: PropTypes.func.isRequired,
    backAction: PropTypes.func
};

export default Alert;
