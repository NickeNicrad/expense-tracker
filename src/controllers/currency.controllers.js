const createCurrency = async ({code, name}) => {
    try {
        const response = await fetch('/api/currencies/new', {
            method: 'POST',
            body: JSON.stringify({
                code,
                name
            })
        })

        return response
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const updateCurrency = async ({id, code, name}) => {
    try {
        const response = await fetch(`/api/currencies/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                code,
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

const deleteCurrency = async ({id}) => {
    try {
        const response = await fetch(`/api/currencies/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getCurrencyById = async ({id}) => {
    try {
        const response = await fetch(`/api/currencies/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getCurrencies = async () => {
    try {
        const response = await fetch('/api/currencies');

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

export default {
    getCurrencies,
    deleteCurrency,
    updateCurrency,
    createCurrency,
    getCurrencyById,
}