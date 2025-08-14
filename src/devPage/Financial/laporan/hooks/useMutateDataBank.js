import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query"
import api from "lib/axios"

const requestEndBalanceBank = async (params = {}) => {
  const { data } = await api.request({
    method: "GET",
    url: "/report/eb-justbank",
    params: {
      ...params,
    },
  })

  return data
}

const useMutateDataBank = (params = {}) => {
  return useQuery({
    queryKey: ["end-balance-bank-data", params],
    queryFn: () => requestEndBalanceBank(params),
    // placeholderData: keepPreviousData,
  })
}

export default useMutateDataBank
