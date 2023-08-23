import { useQueryClient, useQuery, useMutation } from "react-query"

import accountTypeApi from '../controllers/account.type.controllers'

export const useGetAccountTypes = () => {
    return useQuery({
        queryKey: ['accounts', 'types'],
        queryFn: () => accountTypeApi.getAccountTypes(),
        refetchOnReconnect: false
    })
}

export const useGetAccountTypeById = ({id}) => {
    return useQuery({
        queryKey: ['accounts', 'types', id],
        queryFn: () => accountTypeApi.getAccountTypeById({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useCreateAccountType = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountTypeApi.createAccountType, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts', 'types']})
            queryClient.invalidateQueries({queryKey: ['accounts', 'types', id]})
        },
    })
}

export const useUpdateAccountType = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountTypeApi.updateAccountType, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts', 'types']})
            queryClient.invalidateQueries({queryKey: ['accounts', 'types', id]})
        },
    })
}

export const useDeleteAccountType = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(accountTypeApi.deleteAccountType, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts', 'types']})
            queryClient.invalidateQueries({queryKey: ['accounts', 'types', id]})
        },
    })
}