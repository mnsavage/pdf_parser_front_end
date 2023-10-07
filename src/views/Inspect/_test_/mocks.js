const pdfRequirementsMet = {
    message: 'retrive PDF requirements succesfully',
    files: [
        {
            name: 'file1.pdf',
            header: [
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
            ]
        },
        {
            name: 'file2.pdf',
            header: [
                {
                    title: 'Page Formatting & Font',
                    requirements: [
                        {
                            title: 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                            met: false
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
            ]
        },
        {
            name: 'file3.pdf',
            header: [
                {
                    title: 'Page Formatting & Font',
                    requirements: [
                        {
                            title: 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs',
                            met: true
                        },
                        {
                            title: 'No Blank pages in the documents',
                            met: true
                        },
                    ],
                },
                {
                    'title': 'Page Order & Section Formatting',
                    'requirements': [
                        {
                            title: '2 double spaces beneath title',
                            met: false
                        },
                    ],
                },
            ]
        }
    ]
};

export default pdfRequirementsMet;
