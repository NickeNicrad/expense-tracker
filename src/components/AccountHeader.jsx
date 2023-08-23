import Link from "next/link"

import { useParams } from "next/navigation"

function AccountHeader({account}) {
    const params = useParams()

    const onPrint = () => {
        const page = document.querySelector('#record-history-id').innerHTML
        const body = document.body.innerHTML
        document.body.innerHTML = page

        try {
            window.print()
            document.body.innerHTML = body
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="rounded-md p-4 glassmorphism my-4">
            <div className="flex justify-between">
                <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-600">
                        {account?.name}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onPrint}
                        className="rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                        </svg>
                    </button>
                    
                    <Link
                        href={`/accounts/${params?.id}/update`}
                        className="rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                    >
                        <span className="sr-only">Edit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Link>
                </div>
            </div>
            <p className="text-lg text-gray-500 semibold">
                {account?.type?.name}
            </p>
            <p className="line-clamp-3 text-2xl/relaxed font-medium text-gray-600">
                {account?.balance ? Number(account?.balance).toFixed(2) : 0} <span className="text-sm">{account?.currency?.code}</span>
            </p>
        </div>
    )
}

export default AccountHeader