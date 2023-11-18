import React from 'react';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, ExternalHyperlink, WidthType, CheckBox, ShadingType } from 'docx';
import { saveAs } from 'file-saver'

const CreateSummary = (requirementsList, metConditions, comments) => {

    const getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    };
    
    const createRow = (headerData, index) => {
        return new TableRow({
            children: [
                new TableCell({
                width: {
                    size: 66,
                    type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                      style: 'tableHead',
                      children: [
                          new TextRun({
                              text: headerData.title,
                              bold: true,
                          }),
                      ],
                  }),
                  ].concat(headerData.requirements.map((requirement) => {
                    return new Paragraph({
                        style: 'tableBody',
                        children: [
                            new CheckBox({ checked: metConditions[index][requirement.title].met }),
                            new TextRun({
                                text: `  ${requirement.title}`,
                            }),
                        ],
                    });
                  })),
                }),
                new TableCell({
                    width: {
                        size: 33,
                        type: WidthType.PERCENTAGE,
                    },
                  children: [
                    new Paragraph({
                      style: 'tableHead',
                        children: [
                            new TextRun({
                                text: 'Comments',
                                bold: true,
                            }),
                        ],
                    }),
                    ].concat(headerData.requirements
                        .filter((requirement) => {
                            return comments[index][requirement.title] !== ''
                        })
                        .map((requirement) => {
                        return new Paragraph({
                            style: 'tableBody',
                            text: `${comments[index][requirement.title]}`,
                            bullet: {
                                level: 0
                            }
                        });
                      })),
                  }),
            ],
        });
    };

    const createDoc = (file, index) => {
        const doc = new Document({
            title: file.newName,
            styles: {
                paragraphStyles: [
                    {
                        id: "header",
                        name: "header",
                        basedOn: "Normal",
                        quickFormat: true,
                        paragraph: {
                            alignment: AlignmentType.CENTER,
                        },
                    },
                    {
                        id: "tableHead",
                        name: "table head",
                        basedOn: "Normal",
                        quickFormat: true,
                        paragraph: {
                            indent: {
                                start: 200,
                            },
                            spacing: { line: 276, before: 20 * 72 * 0.05, after: 20 * 72 * 0.05 },
                        },
                    },
                    {
                        id: "tableBody",
                        name: "table body",
                        basedOn: "Normal",
                        quickFormat: true,
                        paragraph: {
                            indent: {
                                start: 1000,
                                hanging: 350,
                            },
                            spacing: { line: 276, after: 10 * 72 * 0.05 },
                        },
                    },
                ],
            },
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 713,
                                right: 713,
                                bottom: 713,
                                left: 713,
                            },
                        },
                    },
                    children: [
                        new Paragraph({
                            style: "header",
                            children: [
                                new TextRun({
                                    text: 'Electronic Theses & Dissertations (ETDs) Corrections Sheet',
                                    bold: true,
                                }),
                                new TextRun({ break: 1 }),
                                new TextRun({
                                    text: 'A filled-in square indicates an item that needs your attention.',
                                }),
                                new TextRun({ break: 2 }),
                                new TextRun({
                                    text: 'For detailed guidance on proper formatting, refer to the information provided here:',
                                }),
                                new TextRun({ break: 2 }),
                                new ExternalHyperlink({
                                    children: [
                                        new TextRun({
                                            text: "https://graduate.ua.edu/current-students/thesis-and-dissertations/",
                                            style: "Hyperlink",
                                        }),
                                    ],
                                    link: "https://graduate.ua.edu/current-students/thesis-and-dissertations/",
                                }),
                                new TextRun({ break: 2 }),
                                new TextRun({
                                    text: 'Email ',
                                }),
                                new ExternalHyperlink({
                                    children: [
                                        new TextRun({
                                            text: "grad.etd@ua.edu",
                                            style: "Hyperlink",
                                        }),
                                    ],
                                    link: "grad.etd@ua.edu",
                                }),
                                new TextRun({
                                    text: ' for any questions',
                                }),
                                new TextRun({ break: 1 }),
                            ],
                        }),
                        new Table({
                            width: {
                                size: 100,
                                type: WidthType.PERCENTAGE,
                            },
                            rows: [
                                new TableRow({
                                  children: [
                                      new TableCell({
                                        shading: {
                                            type: ShadingType.PERCENT_20,
                                        },
                                      children: [
                                        new Paragraph({
                                            style: 'tableHead',
                                            children: [
                                                new TextRun({
                                                    text: 'Student Name: ',
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `${file.fname} ${file.lname}`,
                                                }),
                                            ],
                                        }),
                                        ],
                                      }),
                                      new TableCell({
                                        shading: {
                                            type: ShadingType.PERCENT_20,
                                        },
                                        children: [
                                          new Paragraph({
                                            style: 'tableHead',
                                              children: [
                                                  new TextRun({
                                                      text: 'Date: ',
                                                      bold: true,
                                                  }),
                                                  new TextRun({
                                                      text: getDate(),
                                                  }),
                                              ],
                                          }),
                                          ],
                                        }),
                                  ],
                              }),
                            ].concat(file.header.map((header) => createRow(header, index))),
                        }),
                    ],
                },
            ],
        });
        
        // Used to export the file into a .docx file
        Packer.toBlob(doc).then((blob) => {
          // saveAs from FileSaver will download the file
          saveAs(blob, `${file.newName}.docx`);
      });
    }

    requirementsList.map((file, index) => {
        createDoc(file, index);
    })

};

export default CreateSummary;
