import { useQueryClient, useInfiniteQuery, useMutation } from "react-query"

import accountApi from '../controllers/account.controllers'

export const useGetAccounts = (id) => {
    return useInfiniteQuery({
        queryKey: ['accounts', id],
        getNextPageParam: (_lastPage, _pages) => _lastPage.nextPage,
        queryFn: ({pageParam=0}) => accountApi.getAllAccounts({id, page: pageParam, size: 10}), 
        select: (response) => response.pages?.flatMap(page => page.status === 200 ? page?.data?.data : []),
        refetchOnReconnect: false
    })
}

export const useCreateAccount = (id) => {
    const queryClient = useQueryClient()

    return useMutation(accountApi.createAccount, {
        onMutate: async ({formData}) => {
            await queryClient.cancelQueries({queryKey: ['accounts', id]})

            const prevAccounts = queryClient.getQueryData(['accounts', id])

            queryClient.setQueryData(['accounts', id], (oldData) =>
                updateAccounts({oldData, formData: {...formData, optimistic: true}})
            )

            return { prevAccounts }
        },
        onError: (_error, _formData, context) => {
            queryClient.setQueryData(['accounts', id], context.prevAccounts)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['accounts', id]})
        }
    })
}

export const updateAccounts = ({oldData, formData}) => {
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