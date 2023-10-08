const pdfRequirementsMet = {
    message: 'retrive PDF requirements succesfully',
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
};

export default pdfRequirementsMet;
