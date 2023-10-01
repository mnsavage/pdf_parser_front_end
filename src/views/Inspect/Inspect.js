import React from "react";
import pageOption from '../../utils/pageOption';
import ContinueButton from "../../components/ContinueButton/ContinueButton";
import PropTypes from 'prop-types';

const Inspect = ({ setPage, uploadedFiles }) => {
  return (
    <>
      <h1>Inspect</h1>
      <ContinueButton action={() => {setPage(pageOption.Upload)}} />
    </>
  );
};

Inspect.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.any.isRequired
};

export default Inspect;