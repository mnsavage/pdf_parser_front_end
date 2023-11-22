import React, { useState, useEffect } from 'react';
// import InspectMocks from '../../views/Inspect/_test_/mocks';
// import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    // const [requirementsList, setrequirementsList] = useState(InspectMocks.requirementsList);
    const [requirementsList, setrequirementsList] = useState(files.map(() => null));
    const apiDomain = jsonData.apiURL
    var requestArray = files.map(() => {return {state: 'not started'}});

    // create the URL for the request
    const createURL = (uuid=null) => {
        return (uuid === null) ? `${apiDomain}upload/`: `${apiDomain}upload/${uuid}`
    }

    const updateRequirementList = (newRequirements, updateIndex) => {
        const newRequirementList = requirementsList.map((requirements, index) => {
            if (index == updateIndex) {
                return newRequirements;
            } else {
                return requirements;
            }
        })
        setrequirementsList(newRequirementList);
    }

    // convert file to a base 64 encoded string
    const fileToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1]; // extract the Base64 content
                resolve(base64String);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
    
            reader.readAsDataURL(file);
        });
    };
    
    // post given file
    // const postFile = async (file, index) => {
    //     try {
    //         const base64Content = await fileToBase64(file);
    //         const response = await axios.post(createURL(), {
    //             headers: {
    //                 Accept: 'application/json'
    //             },
    //             body: base64Content
    //         })
    //         if (response.status == 200) {
    //             requestArray[index] = {uuid: response.data.uuid, state: 'in progress'}
    //         }
    //     } catch (error) {
    //         requestArray[index] = {state: 'error'}
    //         console.error('Error posting file data from API:', error.response);
    //     }
    // };

    const postPDF = (file, index) => {
        return fetch(createURL(), 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type in the headers
                },
                body: JSON.stringify({
                    'encoded_pdf': fileToBase64(file),
                    'file_name': file.name
                })    
            })
            .then(response => {
                if(!response.ok){
                    requestArray[index] = {state: 'error'}
                    throw new Error('bad status code');
                }
                return response.json();
            })
            .then(data => {
                console.log("batch job was successfully submitted");
                requestArray[index] = {uuid: data.uuid, state: 'in progress'}
                return data.uuid
            })
            .catch(error => {
                requestArray[index] = {state: 'error'}
                console.error('upload pdf error:', error);
                throw error;
            });
    };

    // get information from posted files, returns if another call needs to be made
    // const getFileInformation = async (uuid, index) => {
    //     try {
    //         const response = await axios.get(createURL(uuid))
    //         if (response.status == 200) { // completed
    //             requestArray[index] = {state: 'completed'}
    //             updateRequirementList(response.data.job_output, index)
    //         }
    //         else if (response.status == 202) { // in progress
    //             return true
    //         }
    //     } catch (error) {
    //         requestArray[index] = {state: 'error'}
    //         console.error('Error getting file data from API:', error.response);
    //     }
    //     return false
    // };

    const getPDF = (uuid, index, retryDelay = 30000) => {
        return fetch(createURL(uuid))
            .then(response => {
                if(response.status === 200){
                    requestArray[index] = {state: 'completed'}
                    updateRequirementList(response.data.job_output, index)
                }
                else if(response.status === 202){
                    return new Promise(resolve =>
                        setTimeout(()=> resolve(getPDF(url, uuid, retryDelay)), retryDelay)
                    );
                }
                else{
                    requestArray[index] = {state: 'error'}
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .catch(error => {
                requestArray[index] = {state: 'error'}
                console.error('get pdf error:', error);
                throw error;
            }); 
    }

    // const checkFileRequests = async () => {
    //     var notCompleted = false
    //     await new Promise(r => setTimeout(r, 30000)); // wait 30 sec
    //     requestArray.map((request, index) => {
    //         if (request.state == 'in progress') {
    //             if (getFileInformation(request.uuid, index)) {
    //                 notCompleted = true
    //             }
    //         }

    //     })
    //     return notCompleted
    // }

    useEffect(() => {
        for (const index in files) {
            postPDF(files[index], index)
        }

        requestArray.map((request, index) => {
            if (request.state == 'in progress') {
                getPDF(request.uuid, index);
            }
        });
        // update to show time out error if needed
    }, [])

    return {requirementsList}

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;