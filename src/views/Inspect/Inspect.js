import React from 'react';
import pageOption from '../../utils/pageOption';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import PropTypes from 'prop-types';

const Inspect = ({ setPage, uploadedFiles, setUploadedFiles }) => {
  return (
    <>
      <h1>Inspect</h1>
      <ContinueButton action={() => {
        setUploadedFiles(null);
        setPage(pageOption.Upload);
        }} 
      />
    </>
  );
};

Inspect.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.any.isRequired,
  setUploadedFiles: PropTypes.func.isRequired
};

export default Inspect;