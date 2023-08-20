'use client'

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

const DataProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default DataProvider