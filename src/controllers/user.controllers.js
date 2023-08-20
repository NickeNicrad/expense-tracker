const updateUser = async ({
    id,
    name,
    type,
    owner,
    balance,
    currency
}) => {
    try {
        const response = await fetch(`/api/users/${id}`, {
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

const deleteUser = async ({id}) => {
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getUserById = async ({id}) => {
    try {
        const response = await fetch(`/api/users/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getUsers = async () => {
    try {
        const response = await fetch('/api/users')

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getUserAccounts = async ({id}) => {
    try {
        const response = await fetch(`/api/users/${id}/accounts`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

export default {
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    getUserAccounts
}