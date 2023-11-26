import React from 'react'; 
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import UseRequirementData from '../UseRequirementData';

jest.mock('axios');

describe('UseRequirementData', () => {

  test('Should initially return a null array with the number of elements', () => {
    const { result } = renderHook(() => UseRequirementData([new File(['file1'], 'file1.pdf'), new File(['file2'], 'file2.pdf'), new File(['file3'], 'file3.pdf')]));
    const requirementsList = result.current;
    expect(requirementsList[0]).toBe(null);
    expect(requirementsList[1]).toBe(null);
    expect(requirementsList[2]).toBe(null);
  });

  test('Should return file information', async () => {
    axios.post.mockResolvedValueOnce(JSON.stringify({ uuid: '1234' }), { status: 200 });
    axios.post.mockResolvedValueOnce(JSON.stringify({ uuid: '5678' }), { status: 200 });
    axios.post.mockResolvedValueOnce(JSON.stringify({ uuid: '9012' }), { status: 200 });
    axios.get.mockResolvedValueOnce(JSON.stringify({ body: {job_output: 'output1'} }), { status: 200 });
    axios.get.mockResolvedValueOnce(JSON.stringify({ body: {job_output: 'output2'} }), { status: 200 });
    axios.get.mockResolvedValueOnce(JSON.stringify({ body: {job_output: 'output3'} }), { status: 200 });
    const { result } = renderHook(() => UseRequirementData([new File(['file1'], 'file1.pdf'), new File(['file2'], 'file2.pdf'), new File(['file3'], 'file3.pdf')]));
    const requirementsList = result.current;
    // axios.post.mockResolvedValueOnce({status: 200, data: {uuid: '1234'}});
    // axios.post.mockResolvedValueOnce({status: 200, data:{uuid: '5678'}});
    // axios.post.mockResolvedValueOnce({status: 200, data:{uuid: '9123'}});
    // axios.get.mockResolvedValueOnce({status: 200, data: {job_output: 'output1'}});
    // axios.get.mockResolvedValueOnce({status: 200, data: {job_output: 'output2'}});
    // axios.get.mockResolvedValueOnce({status: 200, data: {job_output: 'output3'}});
    await waitFor(expect(requirementsList[0]).toBe('output1'));
    await waitFor(expect(requirementsList[1]).toBe('output2'));
    await waitFor(expect(requirementsList[2]).toBe('output3'));
  });
  
});