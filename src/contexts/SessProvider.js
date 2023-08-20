'use client'

import { SessionProvider } from 'next-auth/react'

function SessProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default SessProvider