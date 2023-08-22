import EmptyList from "./EmptyList"
import CategoryCard from "../cards/CategoryCard"

const CategoriesList = ({data=[], handleEdit, handleDelete}) => {
    if (!data?.length > 0)
        return (
            <EmptyList
                title={'No items'}
                description={'No categories are currently available.'}
            />
        )

    return (
        <div className='mt-10 prompt_layout'>
            {data && data?.map((item) =>
                <CategoryCard
                    item={item}
                    key={item?._id}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default CategoriesList