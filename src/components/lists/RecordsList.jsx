import Loader from '../Loader'
import EmptyList from './EmptyList'
import RecordCard from '../cards/RecordCard'

function RecordsList({data=[], isLoading}) {
    if (isLoading)
        return <Loader />

    if (!data?.length > 0)
        return (
            <EmptyList
                title={'No items'}
                description={'No records are currently available.'}
            />
        )

    return (
        <div id='record-history-id'>
            <h3 className='text-gray-700 text-lg border-b border-gray-200 pb-2'>
                Records history
            </h3>

            {data && data?.map((item) =>
                <RecordCard item={item} key={item?._id} />
            )}
        </div>
    )
}

export default RecordsList