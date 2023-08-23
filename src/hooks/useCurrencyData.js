import { useQueryClient, useQuery, useMutation } from "react-query"

import currencyApi from '../controllers/currency.controllers'

export const useGetCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: () => currencyApi.getCurrencies(),
        refetchOnReconnect: false
    })
}

export const useGetCurrencyById = ({id}) => {
    return useQuery({
        queryKey: ['currencies', id],
        queryFn: () => currencyApi.getCurrencyById({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useGetCurrencyRecords = ({id}) => {
    return useQuery({
        queryKey: ['currencies', 'records', id],
        queryFn: () => currencyApi.getCurrencyRecords({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useCreateCurrency = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(currencyApi.createCurrency, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['currencies']})
            queryClient.invalidateQueries({queryKey: ['currencies', id]})
        },
    })
}

export const useUpdateCurrency = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(currencyApi.updateCurrency, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['currencies']})
            queryClient.invalidateQueries({queryKey: ['currencies', id]})
        },
    })
}

export const useDeleteCurrency = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(currencyApi.deleteCurrency, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['currencies']})
            queryClient.invalidateQueries({queryKey: ['currencies', id]})
        },
    })
}