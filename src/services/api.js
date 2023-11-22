import React, {useState} from 'react';

export const uploadPDF = (url, file_name, encodedPDF) =>
{
    const API_URL = `${url}upload`;
    return fetch(API_URL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type in the headers
            },
            body: JSON.stringify({
                'encoded_pdf': encodedPDF,
                'file_name': file_name
            })    
        })
        .then(response => {
            if(!response.ok){
                throw new Error('bad status code');
            }
            return response.json();
        })
        .then(data => {
            console.log("batch job was successfully submitted");
            return data.uuid
        })
        .catch(error => {
            console.error('upload pdf error:', error);
            throw error;
        });
};

export const getPDF = (url, uuid, retryDelay = 30000) => 
{
    const API_URL = `${url}upload/${uuid}`
    return fetch(API_URL)
        .then(response => {
            if(response.status === 200){
                return response.json();
            }
            else if(response.status === 202){
                return new Promise(resolve =>
                    setTimeout(()=> resolve(getPDF(url, uuid, retryDelay)), retryDelay)
                );
            }
            else{
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('get pdf error:', error);
            throw error;
        }); 
}

