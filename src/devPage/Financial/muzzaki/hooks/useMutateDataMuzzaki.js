import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestMuzzaki= async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/muzzaki-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataMuzzaki = (params = {}) => {
  return useQuery({
    queryKey: ['all-gl-account', params],
    queryFn: () => requestMuzzaki(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataMuzzaki;