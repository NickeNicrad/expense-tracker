import Loader from "../Loader"
import EmptyList from "./EmptyList"
import NotificationCard from "../cards/NotificationCard"

const NotificationsList = ({data=[], isLoading, handleDelete}) => {
    if (isLoading)
        return <Loader />

    if (!data?.length > 0)
        return (
            <EmptyList
                title={'No items'}
                description={'No notifications are currently available.'}
            />
        )

    return (
        <div className="p-4">
            {data.length > 0 && data?.map((item) =>
                <NotificationCard
                    item={item}
                    key={item?._id}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default NotificationsList