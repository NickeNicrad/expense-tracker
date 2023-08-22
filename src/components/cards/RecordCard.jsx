import React from 'react'

function RecordCard({item}) {
    return (
        <article className="flex items-end justify-between rounded-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
                <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </span>

                <div>
                    <p className="text-lg text-gray-600">
                        {item?.subcategory?.name} ({item?.category?.name})
                    </p>
                    <p className={`text-xl font-medium text-${item?.amount < 0 ? 'red' : 'green'}-500`}>
                        {item?.amount > 0 && '+'}{item?.amount} <span className='text-sm'>USD</span>
                    </p>
                </div>
            </div>

            <div className="">
                <p className="text-xs font-medium">
                    {new Date(item?.createdAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <p className="text-xs font-medium">
                    {new Date(item?.createdAt).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })}
                </p>
            </div>
        </article>
    )
}

export default RecordCard