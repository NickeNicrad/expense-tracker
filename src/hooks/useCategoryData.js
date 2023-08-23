import { useQueryClient, useQuery, useMutation } from "react-query"

import categoryApi from '../controllers/category.controllers'

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories(),
        refetchOnReconnect: false
    })
}

export const useGetCategoryById = ({id}) => {
    return useQuery({
        queryKey: ['categories', id],
        queryFn: () => categoryApi.getCategoryById({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
}

export const useGetCategorySubcategories = ({id}) => {
    return useQuery({
        queryKey: ['categories', 'subcategories', id],
        queryFn: () => categoryApi.getCategorySubCategories({id}),
        refetchOnReconnect: false,
        refetchOnMount: false,
        enabled: id ? true : false
    })
}

export const useCreateCategory = (id) => {
    const queryClient = useQueryClient()

    return useMutation(categoryApi.createCategory, {
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: ['categories', id]})

            const prevCategorys = queryClient.getQueryData(['categories', id])

            return { prevCategorys }
        },
        onError: (_error, _formData, context) => {
            queryClient.setQueryData(['categories', id], context.prevCategorys)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['categories', id]})
        }
    })
}