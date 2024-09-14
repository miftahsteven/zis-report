import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestGlAccount = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/gl-account-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataGL = (params = {}) => {
  return useQuery({
    queryKey: ['all-gl-account', params],
    queryFn: () => requestGlAccount(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataGL;