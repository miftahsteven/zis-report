import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestAsnafType = async (params = {}) => {
  const { data } = await api.request({
    method: 'GET',
    url: '/ref/asnaf-type-report',
    params: {
      ...params,
    },
  });

  return data;
};

const useMutateDataAsnaf = (params = {}) => {
  return useQuery({
    queryKey: ['all-asnaf-type', params],
    queryFn: () => requestAsnafType(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataAsnaf;