'use client'

import Image from "next/image"

import { useSession } from "next-auth/react"
import Link from "next/link"

function AccountCard({item, handleTagClick, handleEdit, handleDelete}) {
  const {data: session} = useSession()

  return (
    <div className="prompt_card">
      <Link className="flex items-end justify-between rounded-lg" href={`/accounts/${item?._id}`}>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-gray-100 text-gray-600">
            <Image
              width={30}
              height={30}
              alt={item?.owner?.name}
              src={item?.owner?.image}
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold capitalize">
              {item?.name}
            </p>

            <p className="text-xl font-medium text-gray-900">
              {item?.balance} <span className="font-light text-sm">{item?.currency?.code}</span>
            </p>
          </div>
        </div>

        <div className="flex-center">
          {session?.user?.id === item?.owner?._id &&
            <button className="rounded-full bg-gray-100 p-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </button>
          }
          <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
            <span className="text-xs font-medium">
              {item?.type?.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AccountCard