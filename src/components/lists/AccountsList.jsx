import AccountCard from "../cards/AccountCard"
import EmptyList from "./EmptyList"

const AccountsList = ({data=[], handleEdit, handleDelete, handleTagClick}) => {
  if (!data?.length > 0)
    return (
      <EmptyList
        title={'No items'}
        description={'No accounts are currently available.'}
      />
    )

  return (
    <div className='mt-10 prompt_layout'>
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