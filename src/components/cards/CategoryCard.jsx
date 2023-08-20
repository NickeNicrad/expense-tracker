import Link from "next/link"

function CategoryCard({item, handleEdit, handleDelete}) {
    return (
        <div className='prompt_card'>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    <Link href={`/categories/${item?._id}/subcategories`} className="rounded-full bg-blue-100 p-3 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </Link>
                    <span className="text-sm font-medium">
                        {item?.name}
                    </span>

                    {item?.subcategories?.length > 0 && (
                        <span
                            className="shrink-0 transition duration-300 group-open:-rotate-180"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    )}
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                    {item?.subcategories?.map(el => (
                        <li key={el?._id} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {el?.name}
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    )
}

export default CategoryCard