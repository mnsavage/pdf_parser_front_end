import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    const [requirementsList, setrequirementsList] = useState(files.map(() => null));
    const apiDomain = jsonData.apiURL
    const [requestArray, setRequestArray] = useState(files.map(() => {return {state: 'not started'}}));

    // create the URL for the request
    const createURL = (uuid=null) => {
        return (uuid === null) ? `${apiDomain}upload/`: `${apiDomain}upload/${uuid}`;
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
    };

    const updateRequestArray = (newRequest, updateIndex) => {
        const newRequestArray = requestArray.map((request, index) => {
            if (index == updateIndex) {
                return newRequest;
            } else {
                return request;
            }
        })
        setRequestArray(newRequestArray);
    };

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
    const postFile = async (file, index) => {
        console.log(requestArray);
        try {
            const base64Content = await fileToBase64(file);
            const body = JSON.stringify({
                'encoded_pdf': base64Content,
                'file_name': file.name
            });
            const response = await axios.post(createURL(), body,{
                method: 'post',
                headers: {
                    Accept: 'application/json'
                } 
            })
            if (response.status == 200) {
                console.log('completed');
                console.log(`uuid: ${response.data.UUID}`);
                await updateRequestArray({uuid: response.data.UUID, state: 'in progress'}, index);
            }
        } catch (error) {
            await updateRequestArray({state: 'error'}, index);
            console.error('Error posting file data from API:', error.response);
        }
    };

    // get information from posted files, returns if another call needs to be made
    const getFileInformation = async (uuid, index) => {
        console.log(`getting info for file with uuid: ${uuid}`);
        try {
            const response = await axios.get(createURL(uuid))
            console.log(`status: ${response.status}`);
            if (response.status == 200) { // completed
                console.log('completed');
                console.log(`output: ${response.data.job_output}`);
                await updateRequestArray({state: 'completed'}, index);
                updateRequirementList(response.data.job_output, index);
            }
            else if (response.status == 202) { // in progress
                console.log(`uuid ${uuid} in progress`);
                console.log('getFileInformation return true');
                return true;
            }
        } catch (error) {
            await updateRequestArray({state: 'error'}, index);
            console.error('Error getting file data from API:', error.response);
        }
        console.log('getFileInformation return false');
        return false;
    };

    const checkFileRequests = async () => {
        var completed = true;
        console.log(`requestArray: ${requestArray}`);
        requestArray.map((request, index) => {
            if (request.state == 'in progress') {
                console.log(`checking request of ${request}`)
                if (getFileInformation(request.uuid, index)) {
                    completed = false;
                    console.log(`not completed`);
                }
                console.log(`done checking request of ${request}`)
            }

        })
        return completed
    }

    useEffect(() => {
        console.log('this is run')

        for (const index in files) {
            console.log(`begin sending info of file ${index}`);
            postFile(files[index], index);
            console.log(`done sending info of file ${index}`);
        }

        const MINUTE_MS = 30000;

        console.log(`requestArray: ${requestArray}`);

        var timesRun = 0
        const interval = setInterval(() => {
            console.log(`checking iteration`)
            const completed = checkFileRequests();
            console.log(`completed: ${completed}`);
            timesRun += 1;
            if (timesRun > 20 || completed) {
                clearInterval(interval);
            }
        }, MINUTE_MS);
    }, [])

    return requirementsList;

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;