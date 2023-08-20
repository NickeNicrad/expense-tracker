const createAccount = async ({
    name,
    type,
    owner,
    balance,
    currency
}) => {
    try {
        const response = await fetch('/api/accounts/new', {
            method: 'POST',
            body: JSON.stringify({
                name,
                type,
                owner,
                balance,
                currency
            })
        })

        return response
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const updateAccount = async ({
    id,
    name,
    type,
    owner,
    balance,
    currency
}) => {
    try {
        const response = await fetch(`/api/accounts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                type,
                owner,
                balance,
                currency
            })
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const deleteAccount = async ({id}) => {
    try {
        const response = await fetch(`/api/accounts/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getAccountById = async ({id}) => {
    try {
        const response = await fetch(`/api/accounts/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getAccounts = async () => {
    try {
        const response = await fetch('/api/accounts')

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

export default {
    getAccounts,
    deleteAccount,
    updateAccount,
    createAccount,
    getAccountById,
}