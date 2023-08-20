const createRecord = async ({
    name,
    type,
    owner,
    balance,
    currency
}) => {
    try {
        const response = await fetch('/api/records/new', {
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

const updateRecord = async ({
    id,
    name,
    type,
    owner,
    balance,
    currency
}) => {
    try {
        const response = await fetch(`/api/records/${id}`, {
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

const deleteRecord = async ({id}) => {
    try {
        const response = await fetch(`/api/records/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getRecordById = async ({id}) => {
    try {
        const response = await fetch(`/api/records/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getRecords = async () => {
    try {
        const response = await fetch('/api/records')

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

export default {
    getRecords,
    deleteRecord,
    updateRecord,
    createRecord,
    getRecordById,
}