import React, { useState, useEffect } from 'react';
import InspectMocks from '../../views/Inspect/_test_/mocks'
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    // const [requirementsList, setrequirementsList] = useState(InspectMocks.requirementsList);
    const [requirementsList, setrequirementsList] = useState(uploadedFiles.map(() => null));
    const apiDomain = jsonData.apiURL
    var requestArray = uploadedFiles.map(() => {return {state: 'not started'}});

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
    const postFile = async (file, index) => {
        try {
            const base64Content = await fileToBase64(file);
            const response = await axios.post(createURL(), {
                headers: {
                    Accept: 'application/json'
                },
                body: base64Content
            })
            if (response.status == 200) {
                requestArray[index] = {uuid: response.data.uuid, state: 'in progress'}
            }
        } catch (error) {
            requestArray[index] = {state: 'error'}
            console.error('Error posting file data from API:', error.response);
        }
    };

    // get information from posted files, returns if another call needs to be made
    const getFileInformation = async (uuid, index) => {
        try {
            const response = await axios.get(createURL(uuid))
            if (response.status == 200) { // completed
                requestArray[index] = {state: 'completed'}
                updateRequirementList(response.data.job_output, index)
            }
            else if (response.status == 202) { // in progress
                return true
            }
        } catch (error) {
            requestArray[index] = {state: 'error'}
            console.error('Error getting file data from API:', error.response);
        }
        return false
    };

    const checkFileRequests = async () => {
        var notCompleted = false
        await new Promise(r => setTimeout(r, 30000)); // wait 30 sec
        requestArray.map((request, index) => {
            if (request.state == 'in progress') {
                if (getFileInformation(request.uuid, index)) {
                    notCompleted = true
                }
            }

        })
        return notCompleted
    }

    useEffect(() => {
        console.log('this is run')

        for (const index in files) {
            postFile(files[index], index)
        }

        notcompleted = true
        var count = 0
        while (count < 20 && notcompleted) { // wait up to 20 min
            notcompleted = checkFileRequests()
        }
        // update to show time out error if needed
    }, [])

    return {requirementsList}

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;