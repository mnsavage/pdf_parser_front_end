import React from 'react';
import Button from '@mui/material/Button'
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import './ContinueButton.css';

const ContinueButton = ({ action }) => {
  return (
    <Box
      className='button-box'
    >
      <Button
        variant="contained"
        className='continue-button'
        onClick={action}
      >
      Continue
      </Button>
    </Box>
  );
  };

  ContinueButton.propTypes = {
    action: PropTypes.func.isRequired
  };

export default ContinueButton;