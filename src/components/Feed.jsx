'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

import AccountsList from './lists/AccountsList';

import userControllers from '@/controllers/user.controllers';

function Feed() {
  const {data: session} = useSession();
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    const data = await userControllers.getUserAccounts({ id: session?.user?.id })

    setAccounts(data)
  }

  useEffect(() => {
    if (session?.user) fetchAccounts()
  }, [session?.user])

  return (
    <section className='feed'>
      <AccountsList
        data={accounts}
      />
    </section>
  )
}

export default Feed