import { keepPreviousData, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import api from '../lib/axios';

const requestDashboarMustahiq = async (params = {}) => {
    // const { page = 1 } = params || {};
    const { data } = await api.request({
        method: 'GET',
        url: '/dashboard/total-mustahiq',
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

const useMutateDataMustahiq = () => {
  const queryClient = useQueryClient();
  return useMutation(requestDashboarMustahiq, { 
    mutationKey: 'all-dashboard-mustahiq',       
    onSuccess: (data) => {            
      //console.log("---->>>>>respdash",JSON.stringify(dt));      
      queryClient.setQueryData(['all-dashboard-mustahiq', { data: JSON.stringify(data) }], JSON.stringify(data))
      
      return JSON.stringify(data);      
    },
    onError: (error) => {
      //console.log("---->>>>>",error);      
      return queryClient.setQueryData(['all-dashboard-mustahiq', { data: error?.response.data.message }], error?.response.data.message)
      //const err = error            
      const errorMessage = error?.response?.data?.message                  
      //return error;
     
    },
  });
};

export default useMutateDataMustahiq;
