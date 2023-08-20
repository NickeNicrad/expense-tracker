const createSubCategory = async ({name, category}) => {
    try {
        const response = await fetch('/api/categories/subcategories/new', {
            method: 'POST',
            body: JSON.stringify({
                name,
                category
            })
        })

        return response
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const updateSubCategory = async ({id, name}) => {
    try {
        const response = await fetch(`/api/categories/subcategories/${id}`, {
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

const deleteSubCategory = async ({id}) => {
    try {
        const response = await fetch(`/api/categories/subcategories/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getSubCategoryById = async ({id}) => {
    try {
        const response = await fetch(`/api/categories/subcategories/${id}`)

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error?.message)
        return error
    }
}

const getSubCategories = async () => {
    try {
        const response = await fetch('/api/categories/subcategories');

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

export default {
    getSubCategories,
    deleteSubCategory,
    updateSubCategory,
    createSubCategory,
    getSubCategoryById,
}