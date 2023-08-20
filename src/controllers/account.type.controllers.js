const createAccountType = async ({name}) => {
    try {
        const response = await fetch('/api/accounts/types/new', {
            method: 'POST',
            body: JSON.stringify({
                name
            })
        })

        return response
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const updateAccountType = async ({id,name}) => {
    try {
        const response = await fetch(`/api/accounts/types/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name
            })
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const deleteAccountType = async ({id}) => {
    try {
        const response = await fetch(`/api/accounts/types/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getAccountTypeById = async ({id}) => {
    try {
        const response = await fetch(`/api/accounts/types/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getAccountTypes = async () => {
    try {
        const response = await fetch('/api/accounts/types')

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

export default {
    getAccountTypes,
    deleteAccountType,
    updateAccountType,
    createAccountType,
    getAccountTypeById,
}