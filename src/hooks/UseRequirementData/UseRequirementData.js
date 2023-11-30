import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';
import InspectMocks from '../../views/Inspect/_test_/mocks';

const UseRequirementData = (files) => {
    const [requirementsList, setrequirementsList] = useState(files.map(() => {return {status: 'loading', response: null}}));
    const apiDomain = jsonData.apiURL;

    // create the URL for the request
    const createURL = (uuid=null) => {
        return (uuid == null) ? `${apiDomain}upload/`: `${apiDomain}upload/${uuid}`;
    };

    // update requirement list with new requirements
    const updateRequirementList = (newRequirements, updateIndex) => {
        setrequirementsList((oldRequirementList) => {
            return oldRequirementList.map((requirements, index) => {
                if (index == updateIndex) {
                    return newRequirements;
                } else {
                    return requirements;
                }
            });
        });
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
                getResponse(response.data.UUID, index);
            } else {
                updateRequirementList({status: 'api error', response: null}, index);
            }
        } catch (error) {
            updateRequirementList({status: 'api error', response: null}, index);
            console.error('Error posting file data from API:', error.response);
        }
    };

    // get information from posted files, returns if another call needs to be made
    const getFileInformation = async (uuid, index) => {
        try {
            const response = await axios.get(createURL(uuid));
            if (response.status == 200) { // completed
                updateRequirementList({status: 'success', response: JSON.parse(response.data.job_output)}, index);
            } else if (response.status == 202) { // in progress
                return false;
            } else if (response.status == 404) { //error
                updateRequirementList({status: 'error', response: JSON.parse(response.data.job_output)}, index);
            }
        } catch (error) {
            updateRequirementList({status: 'api error', response: null}, index);
            console.error('Error getting file data from API:', error.response);
        }
        return true;
    };

    // Check if the response is compleated
    const checkResponse = async (uuid, index, interval, timesRun) => {
            const completed = await getFileInformation(uuid, index);
            if (timesRun > 20 || completed) {
                clearInterval(interval);
                if (timesRun > 20) {
                    updateRequirementList({status: 'api error', response: null}, index);
                }
            }
    };

    // Do get responses until the response is completed
    const getResponse = async (uuid, index) => {
        const waitTime = 30000;
        await new Promise(r => setTimeout(r, waitTime));

        var timesRun = 0
        const interval = setInterval(() => {
            checkResponse(uuid, index, interval, timesRun);
            timesRun += 1;
        }, waitTime);
    };

    // send post for all files
    const postFiles = async () => {
        const waitTime = 30000 / files.length ;
        for (const index in files) {
            await new Promise(r => setTimeout(r, waitTime));
            postFile(files[index], index);
        }
    }

    // used for testing/ mocking call. Should delete before final revision
    const testFunction = async () => {
        const MINUTE_MS = 300;
        await new Promise(r => setTimeout(r, 300));
        updateRequirementList(InspectMocks.requirementsList[0], 0);
        await new Promise(r => setTimeout(r, 150));
        updateRequirementList(InspectMocks.requirementsList[1], 1);
        await new Promise(r => setTimeout(r, 70));
        updateRequirementList(InspectMocks.requirementsList[2], 2);
        await new Promise(r => setTimeout(r, 30));
        updateRequirementList(InspectMocks.requirementsList[3], 3);
        await new Promise(r => setTimeout(r, 20));
        updateRequirementList(InspectMocks.requirementsList[4], 4);
        await new Promise(r => setTimeout(r, 10));
        updateRequirementList(InspectMocks.requirementsList[5], 5);

    };

    useEffect(() => {
        // testFun();
        postFiles();
    }, [])

    return requirementsList;

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;