'use client'

import { useSession } from 'next-auth/react';

import AccountsList from './lists/AccountsList';

import Breadcrumb from './Breadcrumb';
import { useGetUserAccounts } from '@/hooks/useUserData';

function Feed() {
  const {data: session} = useSession();

  const {data: accounts, isLoading} = useGetUserAccounts({id: session?.user?.id})

  return (
    <section className='feed'>
      <Breadcrumb title={'Create Account'} url={'/accounts/create'} type={'create'} />
      <AccountsList
        data={accounts}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Feed