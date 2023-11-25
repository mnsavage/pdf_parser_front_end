import React, { useState, useEffect } from 'react';
// import InspectMocks from '../../views/Inspect/_test_/mocks';
import axios from 'axios';
import jsonData from '../../config.json';
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {
    // const [requirementsList, setrequirementsList] = useState(InspectMocks.requirementsList);
    const [requirementsList, setrequirementsList] = useState(files.map(() => null));
    const apiDomain = jsonData.apiURL
    var requestArray = files.map(() => {return {state: 'not started'}});

    // create the URL for the request
    const createURL = (uuid=null) => {
        // return (uuid === null) ? `${apiDomain}upload/`: `${apiDomain}upload/${uuid}`
        return (uuid === null) ? `https://j2fvtjt45i.execute-api.us-east-1.amazonaws.com/Prod/api/upload`: `https://j2fvtjt45i.execute-api.us-east-1.amazonaws.com/Prod/api/upload/${uuid}`
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

    // const postPDF = (file) => {
    //     return fetch(createURL(), 
    //         {
    //             mode: 'no-cors',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json' // Specify the content type in the headers
    //             },
    //             body: JSON.stringify({
    //                 'encoded_pdf': fileToBase64(file),
    //                 'file_name': file.name
    //             })    
    //         })
    //         .then(response => {
    //             if(!response.ok){
    //                 console.error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return {status: 'error'};
    //         })
    //         .then(data => {
    //             console.log("batch job was successfully submitted");
    //             console.log(data);
    //             console.log(data.uuid);
    //             return {status: 'ok', uuid: data.uuid}
    //         })
    //         .catch(error => {
    //             console.error('upload pdf error:', error);
    //             return {status: 'error'};
    //         });
    // };

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

    // const getPDF = (uuid, retryDelay=30000, maxRetry=20) => {
    //     return fetch(createURL(uuid))
    //         .then(response => {
    //             if(response.status === 200){
    //                 return {status: 'ok', response: response.json()};
    //             }
    //             else if(response.status === 202){
    //                 if (maxRetry == 1) {
    //                     return {status: 'timeout'};
    //                 }
    //                 return new Promise(resolve =>
    //                     setTimeout(()=> resolve(getPDF(uuid, retryDelay, maxRetry-1)), retryDelay)
    //                 );
    //             }
    //             else{
    //                 console.error(`HTTP error! Status: ${response.status}`);
    //                 return {status: 'error'};
    //             }
    //         })
    //         .catch(error => {
    //             console.error('get pdf error:', error);
    //             return {status: 'error'};
    //         }); 
    // };

    const checkFileRequests = async () => {
        var completed = true;
        // await new Promise(r => setTimeout(r, 30000)); // wait 30 sec
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
        // for (const index in files) {
        //     const response = postPDF(files[index]);
        //     if (response.status === 'error') {
        //         requestArray[index] = {state: 'error'};
        //     } else {
        //         requestArray[index] = {uuid: response.uuid, state: 'in progress'}
        //     }
        // }

        // requestArray.map((request, index) => {
        //     if (request.state == 'in progress') {
        //         const response = getPDF(request.uuid);
        //         if (response.status === 'error') {
        //             requestArray[index] = {state: 'error'};
        //         } else if (response.status === 'timeout') {
        //             requestArray[index] = {state: 'timeout'};
        //         } else {
        //             requestArray[index] = {state: 'completed'}
        //             updateRequirementList(response.data.job_output, index);
        //         }
        //     }
        // });
        // console.log('this is run')

        // for (const index in files) {
        //     console.log(`begin sending info of file ${index}`)
        //     postFile(files[index], index);
        //     console.log(`done sending info of file ${index}`)
        // }

        // var notcompleted = true
        // var count = 0
        // while (count < 20 && notcompleted) { // wait up to 20 min
        //     console.log(`checking count ${count}`)
        //     notcompleted = checkFileRequests();
        //     count += 1;
        // }
        // update to show time out error if needed
    }, [])

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