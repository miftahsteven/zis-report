import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestProgram = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/program-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataProgram = (params = {}) => {
  return useQuery({
    queryKey: ['all-asnaf-type', params],
    queryFn: () => requestProgram(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataProgram;