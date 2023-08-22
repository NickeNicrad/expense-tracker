'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

import Loader from './Loader'

function ProtectedClient({ children }) {
    const router = useRouter()
    const pathname = usePathname()

    const { status } = useSession()

    if (status === 'loading') {
        // Handle loading state
        return <Loader />
    }

    if (status === 'authenticated' && pathname.startsWith('/auth'))
      router.replace('/')

    if (status === 'unauthenticated' && !pathname.startsWith('/auth'))
      router.replace('/auth')

    return <>{children}</>
}

export default ProtectedClient
