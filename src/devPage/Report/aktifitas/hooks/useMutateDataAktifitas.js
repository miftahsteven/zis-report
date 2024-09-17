import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestAktifitas = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/aktifitas-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataAktifitas = (params = {}) => {
  return useQuery({
    queryKey: ['all-aktifitas', params],
    queryFn: () => requestAktifitas(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataAktifitas;