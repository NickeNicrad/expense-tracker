import Loader from "../Loader"
import EmptyList from "./EmptyList"
import AccountCard from "../cards/AccountCard"

const AccountsList = ({data=[], isLoading, handleEdit, handleDelete, handleTagClick}) => {
  if (isLoading)
    return <Loader />

  if (!data?.length > 0)
    return (
      <EmptyList
        title={'No items'}
        description={'No accounts are currently available.'}
      />
    )

  return (
    <div className='prompt_layout'>
      {data.length > 0 && data?.map((item) =>
        <AccountCard
          item={item}
          key={item?._id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
        />
      )}
    </div>
  )
}

export default AccountsList