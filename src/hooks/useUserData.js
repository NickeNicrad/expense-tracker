import { useQueryClient, useMutation, useQuery } from "react-query"

import userApi from '../controllers/user.controllers'

export const useGetUserAccounts = ({id}) => {
    return useQuery({
        queryKey: ['users', 'accounts', id],
        queryFn: () => userApi.getUserAccounts({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
        enabled: id ? true : false
    })
}

export const useGetUserNotifications = ({id}) => {
    return useQuery({
        queryKey: ['users', 'notifications', id],
        queryFn: () => userApi.getUserNotifications({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
        enabled: id ? true : false
    })
}

export const useGetUserById = ({id}) => {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => userApi.getUserUsers({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
        enabled: id ? true : false
    })
}

export const useCreateUser = (id) => {
    const queryClient = useQueryClient()

    return useMutation(userApi.createUser, {
        onMutate: async ({formData}) => {
            await queryClient.cancelQueries({queryKey: ['users', id]})

            const prevUsers = queryClient.getQueryData(['users', id])

            queryClient.setQueryData(['users', id], (oldData) =>
                updateUsers({oldData, formData: {...formData, optimistic: true}})
            )

            return { prevUsers }
        },
        onError: (_error, _formData, context) => {
            queryClient.setQueryData(['users', id], context.prevUsers)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['users', id]})
        }
    })
}

export const updateUsers = ({oldData, formData}) => {
    return {
        ...oldData,
        pages: oldData?.pages?.map(page => {
            return {
                ...page,
                data: {
                    ...page.data,
                    data: createOrUpdate(page?.data?.data, formData)
                }
            }
        })
    }
}

const createOrUpdate = (array=[], item) => {
    const index = array.findIndex(obj => obj.optimistic === true)

    if (index !== -1) {
        array.splice(index, 1, item)
    } else {
        array.push(item)
    }

    return array
}