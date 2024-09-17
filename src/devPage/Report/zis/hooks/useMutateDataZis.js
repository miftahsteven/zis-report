import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestZis = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/zis-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataZis = (params = {}) => {
  return useQuery({
    queryKey: ['all-zis', params],
    queryFn: () => requestZis(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataZis;