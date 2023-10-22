import React, { render } from '@testing-library/react';
import { fetchUploadGetData } from '../api';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';

// mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'some data' }),
  })
);

// Mock component to use our hook
function MockComponent(props) {
  fetchUploadGetData(props.url);
  return null; // Render nothing
}

MockComponent.propTypes = {
  url: PropTypes.string.isRequired
};

export default MockComponent;

describe('fetchUploadGetData hook', () => {
  it('fetches data on mount', async () => {
    const mockURL = 'http://test-url.com/';

    // Reset fetch mock and setup the desired mock behavior
    fetch.mockClear();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'some data' }),
      })
    );

    await act(async () => {
      render(<MockComponent url={mockURL} />);
    });

    expect(fetch).toHaveBeenCalledWith(`${mockURL}upload`);
  });
});

