const createCategory = async ({name}) => {
    try {
        const response = await fetch('/api/categories/new', {
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

const updateCategory = async ({id, name}) => {
    try {
        const response = await fetch(`/api/categories/${id}`, {
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

const deleteCategory = async ({id}) => {
    try {
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getCategoryById = async ({id}) => {
    try {
        const response = await fetch(`/api/categories/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getCategories = async () => {
    try {
        const response = await fetch('/api/categories');

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

const getCategorySubCategories = async ({id}) => {
    try {
        const response = await fetch(`/api/categories/${id}/subcategories`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

export default {
    getCategories,
    deleteCategory,
    updateCategory,
    createCategory,
    getCategoryById,
    getCategorySubCategories
}