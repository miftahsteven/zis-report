import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestWakaf = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/wakaf-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataWakaf = (params = {}) => {
  return useQuery({
    queryKey: ['all-wakaf', params],
    queryFn: () => requestWakaf(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataWakaf;