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
    }
};

export default RequirementsListMocks;
