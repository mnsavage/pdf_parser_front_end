import React from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import { postPDF, getPDF } from '../api';

enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();
});

global.fetch = require('jest-fetch-mock');

test('successful upload returns uuid', () => {
  const mockUUID = '12345';
  fetch.mockResponseOnce(JSON.stringify({ uuid: mockUUID }), { status: 200 });

  return postPDF('https://example.com/' , 'file_name.pdf','pdf-data' )
      .then(uuid => {
          expect(uuid).toBe(mockUUID);
      });
});

test('unsuccessful upload throws an error', async () => {
  fetch.mockResponseOnce(null, { status: 500 });

  await expect(postPDF('https://example.com/', 'pdf-data'))
    .rejects.toThrow('bad status code');
});

test('successful response returns json', () => {
  const mockResponse = { body: 'pdf-data' };
  fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

  return getPDF('https://example.com/', 'uuid').then(response => {
      expect(response).toEqual(mockResponse);
  });
});

test('retries on 202 response', async () => {
    fetch.mockResponses(
        [null, { status: 202 }],
        [JSON.stringify({ data: 'pdf-data' }), { status: 200 }]
    );

    const response = await getPDF('https://example.com/', 'uuid', 10);
    expect(response).toEqual({ data: 'pdf-data' }); // Make sure to compare with the object, not a JSON string
});

test('throws error on non-200/202 response', () => {
  fetch.mockResponseOnce(null, { status: 500 });

  expect(getPDF('https://example.com/', 'uuid')).rejects.toThrow('HTTP error! Status: 500');
});

