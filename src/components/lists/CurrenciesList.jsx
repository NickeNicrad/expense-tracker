import EmptyList from "./EmptyList"
import CurrencyCard from "../cards/CurrencyCard"

const CurrenciesList = ({data, handleEdit, handleDelete}) => {
    if (!data?.length > 0)
        return (
            <EmptyList
                title={'No items'}
                description={'No currencies are currently available.'}
            />
        )

    return (
        <div className='mt-10 prompt_layout'>
            {data && data?.map((item) =>
                <CurrencyCard
                    item={item}
                    key={item?._id}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default CurrenciesList