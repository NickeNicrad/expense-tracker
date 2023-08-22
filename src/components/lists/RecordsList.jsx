import EmptyList from './EmptyList'
import RecordCard from '../cards/RecordCard'

function RecordsList({data=[]}) {
    if (!data?.length > 0)
        return (
            <EmptyList
                title={'No items'}
                description={'No records are currently available.'}
            />
        )

    return (
        <>
            {data && data?.map((item) =>
                <RecordCard item={item} key={item?._id} />
            )}
        </>
    )
}

export default RecordsList