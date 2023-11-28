const InspectMocks = {
    requirementsList: [
        {
            'name': 'file1.pdf',
            'newName': 'lname1.fname1.dissertation',
            'fname': 'fname1',
            'lname': 'lname1',
            'header': [
                {
                    'title': 'Page Formatting & Font',
                    'requirements': [
                        {
                            'title': 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                            'met': true
                        },
                        {
                            'title': 'No Blank pages in the documents',
                            'met': false
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
                        {
                            title: 'requirement none',
                            met: null
                        },
                    ],
                },
            ]
        },
        {
            'name': 'file2.pdf',
            'newName': 'lname2.fname2.thesis',
            'fname': 'fname2',
            'lname': 'lname2',
            'header': [
                {
                    'title': 'Page Formatting & Font',
                    'requirements': [
                        {
                            'title': 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                            'met': false
                        },
                        {
                            'title': 'No Blank pages in the documents',
                            'met': false
                        },
                    ],
                },
                {
                    'title': 'Page Order & Section Formatting',
                    'requirements': [
                        {
                            'title': '2 double spaces beneath title',
                            'met': true
                        },
                        {
                            'title': 'requirement none',
                            'met': null
                        },
                    ],
                },
            ]
        },
        {
            'name': 'file3.pdf',
            'newName': 'lname3.fname3.dissertation',
            'fname': 'fname3',
            'lname': 'lname3',
            'header': [
                {
                    'title': 'Page Formatting & Font',
                    'requirements': [
                        {
                            'title': 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                            'met': true
                        },
                        {
                            'title': 'No Blank pages in the documents',
                            'met': true
                        },
                    ],
                },
                {
                    'title': 'Page Order & Section Formatting',
                    'requirements': [
                        {
                            'title': '2 double spaces beneath title',
                            'met': false
                        },
                        {
                            'title': 'requirement none',
                            'met': null
                        },
                    ],
                },
            ]
        },
        null
    ]
};

export default InspectMocks;
