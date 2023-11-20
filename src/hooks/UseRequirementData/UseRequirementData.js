import React, { useState, useEffect } from 'react';
import InspectMocks from '../../views/Inspect/_test_/mocks'
import PropTypes from 'prop-types';

const UseRequirementData = (files) => {

    // const [requirementsList, setrequirementsList] = useState(files.forEach(null));
    const [requirementsList, setrequirementsList] = useState(InspectMocks.requirementsList);

    // send out post request with file data
    // get a return response with an id
    // send a get request every 5 sec
    // when recieve data, display it

    return requirementsList

};

UseRequirementData.propTypes = {
    files: PropTypes.array.isRequired,
};

export default UseRequirementData;