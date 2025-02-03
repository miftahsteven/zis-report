import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from '../lib/axios';

const requestGraphPerprogram = async (params = {}) => {
    // const { page = 1 } = params || {};
    const { data } = await api.request({
        method: 'GET',
        url: '/dashboard/data-perprogram',
        params: {
            // page,
            ...params,
        },
    });

    return data;
};

// const useMutateDataMustahiq = (params = {}) => {
//     return useQuery({
//         queryKey: ['all-dashboard-mustahiq', params],
//         queryFn: () => request(params),
//         //placeholderData: keepPreviousData,
//     });
// };

const useMutatGraphPerprogram = () => {
  const queryClient = useQueryClient();
  return useMutation(requestGraphPerprogram, { 
    mutationKey: 'all-graph-perprogram',       
    onSuccess: (data) => {            
      //console.log("---->>>>>respdash",JSON.stringify(data));      
      queryClient.setQueryData(['all-graph-perprogram', { data: JSON.stringify(data) }], JSON.stringify(data))
      
      return JSON.stringify(data);      
    },
    onError: (error) => {
      //console.log("---->>>>>",error);      
      return queryClient.setQueryData(['all-graph-perprogram', { data: error?.response.data.message }], error?.response.data.message)
      //const err = error            
      const errorMessage = error?.response?.data?.message                  
      //return error;
     
    },
  });
};

export default useMutatGraphPerprogram;
