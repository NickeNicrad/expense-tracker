function NotificationCard({item}) {
    return (
        <div className="group relative flex gap-x-6 rounded-lg text-sm leading-6 hover:bg-gray-50">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
            </div>
            <div className="flex-auto">
                <div className="flex justify-between">
                    <p className="block font-semibold text-gray-900">
                        {item?.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {new Date(item?.createdAt).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </p>
                </div>
                <p className="text-gray-600">
                    {item?.description}
                </p>
            </div>
        </div>
    )
}

export default NotificationCard