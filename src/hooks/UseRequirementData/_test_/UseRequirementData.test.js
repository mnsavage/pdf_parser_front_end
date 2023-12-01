import React from 'react'; 
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import UseRequirementData from '../UseRequirementData';

jest.mock('axios');

describe('UseRequirementData', () => {

  test('Should initially return an array with status loading with the number of elements', async () => {
    const { result } = renderHook(() => UseRequirementData([new File(['file1'], 'file1.pdf'), new File(['file2'], 'file2.pdf'), new File(['file3'], 'file3.pdf')]));
    const requirementsList = result.current;
    expect(requirementsList[0]['status']).toBe('loading');
    expect(requirementsList[1]['status']).toBe('loading');
    expect(requirementsList[2]['status']).toBe('loading');
  });
});