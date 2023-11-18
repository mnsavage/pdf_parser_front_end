const RequirementsListMocks = {
    pdfRequirementsMet: [
        {
            title: 'Page Formatting & Font',
            requirements: [
                {
                    title: 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                    met: true
                },
                {
                    title: 'No Blank pages in the documents',
                    met: false
                },
            ],
        },
        {
            'title': 'Page Order & Section Formatting',
            'requirements': [
                {
                    title: '2 double spaces beneath title',
                    met: true
                },
            ],
        },
    ],
    metConditionsInitial: {
        'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs': {
            met: true,
            edited: false
        },
        'No Blank pages in the documents': {
            met: false,
            edited: false
        },
        '2 double spaces beneath title': {
            met: true,
            edited: false
        }
    },
    metConditionsEdited: {
        'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs': {
            met: false,
            edited: true
        },
        'No Blank pages in the documents': {
            met: true,
            edited: true
        },
        '2 double spaces beneath title': {
            met: true,
            edited: false
        }
    },
    commentsInitial: {
        'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs': '',
        'No Blank pages in the documents': '',
        '2 double spaces beneath title': ''
    },
    commentsEdited: {
        'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs': 'Mock comment 1',
        'No Blank pages in the documents': 'Mock comment 2',
        '2 double spaces beneath title': ''
    }
};

export default RequirementsListMocks;
