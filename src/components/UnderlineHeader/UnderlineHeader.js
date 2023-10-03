import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import './UnderlineHeader.css';

const UnderlineHeader = ({ title }) => {
  return (
    <>
    <Typography className='title' variant='h2' 
        component='div'>
        {title}
    </Typography>
    <hr className='line'/>
    </>
  );
  };

  UnderlineHeader.propTypes = {
    title: PropTypes.node.isRequired,
  };

export default UnderlineHeader;
