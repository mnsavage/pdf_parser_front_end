import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    const [requirementsList, setrequirementsList] = useState(files.map(() => null));
    const apiDomain = jsonData.apiURL
    var requestArray = files.map(() => {return {state: 'not started'}});

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
    const postFile = async (file, index) => {
        try {
            const base64Content = await fileToBase64(file);
            const response = await axios.post(createURL(), {
                method: 'post',
                headers: {
                    Accept: 'application/json'
                },
                body: base64Content
            })
            if (response.status == 200) {
                console.log('completed');
                console.log(`uuid: ${response.data.uuid}`);
                requestArray[index] = {uuid: response.data.uuid, state: 'in progress'};
            }
        } catch (error) {
            requestArray[index] = {state: 'error'};
            console.error('Error posting file data from API:', error.response);
        }
    };

    // get information from posted files, returns if another call needs to be made
    const getFileInformation = async (uuid, index) => {
        try {
            const response = await axios.get(createURL(uuid))
            if (response.status == 200) { // completed
                console.log('completed')
                console.log(`output: ${response.data.job_output}`);
                requestArray[index] = {state: 'completed'};
                updateRequirementList(response.data.job_output, index);
            }
            else if (response.status == 202) { // in progress
                console.log(`uuid ${uuid} in progress`);
                return true;
            }
        } catch (error) {
            requestArray[index] = {state: 'error'};
            console.error('Error getting file data from API:', error.response);
        }
        return false
    };

    const checkFileRequests = async () => {
        var completed = true;
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
            console.log(`begin sending info of file ${index}`)
            postFile(files[index], index);
            console.log(`done sending info of file ${index}`)
        }

        const MINUTE_MS = 30000;

        var timesRun = 0
        const interval = setInterval(() => {
            console.log(`checking iteration`)
            const completed = checkFileRequests();
            console.log(completed)
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