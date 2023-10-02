import React from 'react';
import Button from '@mui/material/Button'
import PropTypes from 'prop-types';
import './ContinueButton.css';

const ContinueButton = ({ action }) => {
  return (
      <Button
        variant='contained'
        className='continue-button'
        onClick={action}
      >
      Continue
      </Button>
  );
  };

  ContinueButton.propTypes = {
    action: PropTypes.func.isRequired
  };

export default ContinueButton;
