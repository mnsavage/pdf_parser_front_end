import React, { useEffect } from "react";
import pageOption from '../../utils/pageOption';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ContinueButton from "../../components/ContinueButton/ContinueButton";
import PropTypes from 'prop-types';
import UnderlineHeader from "../../components/UnderlineHeader/UnderlineHeader";

const Confirm = ({ setPage, uploadedFiles }) => {
  const [url, setUrl] = React.useState('');
  const [file, setFile] = React.useState(0);

  useEffect(() => {
    setUrl(setUrl(URL.createObjectURL(uploadedFiles[file])))
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  return (
    <>
      <UnderlineHeader title="Uploaded Files"/>
      <div className='list-container'>
          <List dense={false}>
          {[...uploadedFiles].map((value) => (
            <ListItem
              key={value.name}
              disableGutters
            >
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
          </List>
        </div>
      <ContinueButton action={() => {setPage(pageOption.Inspect)}} />
    </>
  );
};

Confirm.propTypes = {
  setPage: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.any.isRequired
};

export default Confirm;
