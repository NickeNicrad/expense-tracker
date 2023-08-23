import { useQueryClient, useQuery, useMutation } from "react-query"

import recordApi from '../controllers/record.controllers'

export const useGetRecords = () => {
    return useQuery({
        queryKey: ['records'],
        queryFn: () => recordApi.getRecords(),
        refetchOnReconnect: false
    })
}

export const useGetRecordById = ({id}) => {
    return useQuery({
        queryKey: ['records', id],
        queryFn: () => recordApi.getRecordById({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useCreateRecord = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(recordApi.createRecord, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['records']})
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
            queryClient.invalidateQueries({queryKey: ['accounts', 'records', id]})
            queryClient.invalidateQueries({queryKey: ['users', 'notifications', id]})
        },
    })
}

export const useDeleteRecord = ({id}) => {
    const queryClient = useQueryClient()

    return useMutation(recordApi.deleteRecord, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['records']})
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
            queryClient.invalidateQueries({queryKey: ['accounts', 'records', id]})
        },
    })
}