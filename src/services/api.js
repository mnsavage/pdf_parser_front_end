import React from 'react';

export const fetchUploadGetData = async (url) => {
  const API_URL = `${url}upload`;
  console.log(`upload API url: ${API_URL}`);
  
  try {
      const response = await fetch(API_URL);

      if (!response.ok) { 
          throw new Error(`HTTP error, status = ${response.status}`);
      }
      return await response.json();

  } catch (error) {
      console.error('Error fetching get data from API:', error);
      throw error;  // re-throw the error so the calling code can handle it or see that there was an error
  }
}