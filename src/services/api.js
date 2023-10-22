import React, { useEffect } from 'react';

export const fetchUploadGetData = async (url) => {
  useEffect(() => {
    // Extract the API URL from the imported JSON file
    const API_URL = `${url}upload`;
    console.log(`upload API url: ${API_URL}`);

    // Use the Fetch API to make the GET request
    fetch(API_URL)
      .then((response) => {
        if(!response.ok){ // check status code
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.log('Error fetching get data from API:', error));
  }, []);
}
