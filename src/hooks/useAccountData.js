import { useQueryClient, useQuery, useMutation } from "react-query"

import accountApi from '../controllers/account.controllers'

export const useGetAccounts = () => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: () => accountApi.getAccounts(),
        refetchOnReconnect: false
    })
}

export const useGetAccountById = ({id}) => {
    return useQuery({
        queryKey: ['accounts', id],
        queryFn: () => accountApi.getAccountById({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useGetAccountRecords = ({id}) => {
    return useQuery({
        queryKey: ['accounts', 'records', id],
        queryFn: () => accountApi.getAccountRecords({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useCreateAccount = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountApi.createAccount, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']})
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
        },
    })
}

export const useUpdateAccount = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountApi.updateAccount, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']})
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
        },
    })
}

export const useDeleteAccount = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountApi.deleteAccount, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']})
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
        },
    })
}