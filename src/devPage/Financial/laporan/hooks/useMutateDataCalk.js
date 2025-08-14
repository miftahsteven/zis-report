import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from 'lib/axios';

const requestCalk= async (params = {}) => {
  const { data } = await api.request({
    method: "GET",
    url: "/report/get-posting",
    params: {
      ...params,
    },
  })

  return data;
};

const useMutateDataCalk = (params = {}) => {
  return useQuery({
    queryKey: ['all-calk-data', params],
    queryFn: () => requestCalk(params),
    // placeholderData: keepPreviousData,
  });
};

export default useMutateDataCalk;