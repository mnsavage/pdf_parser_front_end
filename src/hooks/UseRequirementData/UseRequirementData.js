import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    const [requirementsList, setrequirementsList] = useState(files.map(() => {return {status: 'loading', response: null}}));
    const apiDomain = jsonData.apiURL;

    // create the URL for the request
    const createURL = (uuid=null) => {
        return (uuid == null) ? `${apiDomain}upload/`: `${apiDomain}upload/${uuid}`;
    };

    const updateRequirementList = (newRequirements, updateIndex) => {
        console.log('updating requirements list');
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
                console.log('completed');
                console.log(`uuid: ${response.data.UUID}`);
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
        console.log(`getting info for file with uuid: ${uuid}`);
        try {
            const response = await axios.get(createURL(uuid));
            console.log(`status: ${response.status}`);
            if (response.status == 200) { // completed
                console.log('completed');
                console.log(`output: ${response.data.job_output}`);
                updateRequirementList({status: 'success', response: JSON.parse(response.data.job_output)}, index);
            } else if (response.status == 202) { // in progress
                console.log(`uuid ${uuid} in progress`);
                console.log('getFileInformation return false');
                return false;
            } else if (response.status == 404) { //error
                updateRequirementList({status: 'error', response: JSON.parse(response.data.job_output)}, index);
            }
        } catch (error) {
            updateRequirementList({status: 'api error', response: null}, index);
            console.log(`uuid ${uuid} returned error`);
            console.error('Error getting file data from API:', error.response);
        }
        console.log('getFileInformation return true');
        return true;
    };

    const checkResponse = async (uuid, index, interval, timesRun) => {
        console.log(`checking iteration ${timesRun} for uuid :${uuid}`);
            const completed = await getFileInformation(uuid, index);
            console.log('completed:');
            console.log(completed);
            if (timesRun > 20 || completed) {
                clearInterval(interval);
                console.log(`done getting response for:${uuid}`);
            }
    };

    const getResponse = async (uuid, index) => {
        console.log(`getting response for:${uuid}`);
        const waitTime = 30000;
        await new Promise(r => setTimeout(r, waitTime));

        var timesRun = 0
        const interval = setInterval(() => {
            checkResponse(uuid, index, interval, timesRun);
            timesRun += 1;
        }, waitTime);
    };

    const postFiles = async () => {
        const waitTime = 30000 / files.length ;
        for (const index in files) {
            await new Promise(r => setTimeout(r, waitTime));
            console.log(`index ${index}`);
            console.log(`begin sending info of file ${index}`);
            postFile(files[index], index);
            console.log(`done sending info of file ${index}`);
        }
    }

    // const testFun = async () => {
    //     const MINUTE_MS = 300;
    //     await new Promise(r => setTimeout(r, MINUTE_MS));
    //     updateRequirementList({status: 'error', response:null}, 0);

    // };

    useEffect(() => {
        console.log('this is run');

        // testFun();

        postFiles();

    }, [])

    return requirementsList;

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;