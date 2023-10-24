import React, { useState } from 'react'; 
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/Header'
import Title from './components/Title/Title'
import Confirm from './views/Confirm/Confirm';
import Upload from './views/Upload/Upload';
import Inspect from './views/Inspect/Inspect';
import theme from './utils/theme';
import pageOption from './utils/pageOption';
import pdfRequirementsMet from './views/Inspect/_test_/mocks';
import {fetchUploadGetData} from './services/api'
import jsonData from './config.json';

const App = () => {
  const [page, setPage] = useState(pageOption.Upload);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  // being mocked rn, but this should send a post and retrieve if the requirements are met data for each PDF
  const [requirementsList, setRequirementsList] = useState(pdfRequirementsMet.files);
  // fetch get data from upload API
  const apiDomain = jsonData.apiURL
  console.log(`API domain: ${apiDomain}`);

  const getUploadData = fetchUploadGetData(apiDomain);
  console.log(getUploadData);

  const update = (next) => {
    setPage(next);
  };

  const determinePage = () => {
    return page == pageOption.Upload ? <Upload setPage={update} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
    : page == pageOption.Confirm ? <Confirm setPage={update} uploadedFiles={uploadedFiles} />
    : <Inspect setPage={update} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} requirementsList={requirementsList} />
  };

  return (
    <ThemeProvider theme={theme}>
    <Header />
    <Title />
    {determinePage()}
    </ThemeProvider>
  );
}

export default App;
