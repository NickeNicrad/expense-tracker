'use client'

import { useState, useEffect } from "react";

import AccountsList from "@/components/lists/AccountsList";

import accountControllers from "@/controllers/account.controllers";

function Accounts() {
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = async () => {
        const data = await accountControllers.getAccounts();

        setAccounts(data);
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <section className='feed'>
            <AccountsList
                data={accounts}
            />
        </section>
    )
}

export default Accounts