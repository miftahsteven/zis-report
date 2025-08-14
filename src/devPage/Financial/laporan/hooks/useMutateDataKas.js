import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query"
import api from "lib/axios"

const requestEndBalance = async (params = {}) => {
  const { data } = await api.request({
    method: "GET",
    url: "/report/eb-bank",
    params: {
      ...params,
    },
  })

  return data
}

const useMutateDataKas = (params = {}) => {
  return useQuery({
    queryKey: ["end-balance-data", params],
    queryFn: () => requestEndBalance(params),
    // placeholderData: keepPreviousData,
  })
}

export default useMutateDataKas
