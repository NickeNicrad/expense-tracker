'use client'

import AccountsList from "@/components/lists/AccountsList";

import { useGetAccounts } from "@/hooks/useAccountData";

function Accounts() {
    const { data: accounts, isLoading } = useGetAccounts();

    return (
        <section className='feed'>
            <AccountsList
                data={accounts}
                isLoading={isLoading}
            />
        </section>
    )
}

export default Accounts