'use client'

import Link from "next/link"
import Image from "next/image"

import Cookies from "js-cookie"

import { useEffect, useState } from "react"

import { usePathname } from "next/navigation"
import { signOut, useSession } from 'next-auth/react'

function Nav() {
  const pathName = usePathname()
  const { data: session } = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false)

  const checkIfLoggedIn = () => {
    if (session?.user?.email)
      return Cookies.set('loggedIn', true)
    else
      return Cookies.set('loggedIn', false)
  }

  useEffect(() => {
    checkIfLoggedIn()
  }, [session?.user?.email])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          alt="Expense Tracker Logo"
          className="object-contain"
          src={'/assets/images/logo.svg'}
        />
        <p className="logo_text">Expense Tracker</p>
      </Link>

      {session?.user.image && (
        <div
          className="flex flex-1 items-center justify-between gap-8 sm:justify-end"
        >
          <div className="flex gap-4">
            <Link
              href="/records/create"
              className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
            >
              <span className="sr-only">Plus</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
            <button
              className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
            >
              <span className="sr-only">Notifications</span>
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setToggleDropdown(prev => !prev)}
            className="group flex shrink-0 items-center rounded-lg transition"
          >
            <span className="sr-only">Menu</span>
            <Image
              width={30}
              height={30}
              alt="Profile Image"
              src={session?.user?.image}
              className="rounded-full object-cover"
            />

            <p className="ms-2 hidden text-left text-xs sm:block">
              <strong className="block font-medium">
                {session?.user?.name}
              </strong>

              <span className="text-gray-500">
                {session?.user?.email}
              </span>
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex relative">
        {session?.user ?
          <div className="flex">
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/accounts/create"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Account
                </Link>
                <button
                  className="mt-4 w-full black_btn"
                  onClick={() => {
                    signOut()
                    setToggleDropdown(false)
                    Cookies.set('loggedIn', false)
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div> :
          <>
            {pathName === '/auth/signup' && (
              <Link
                href={'/auth/signin'}
                className="black_btn">
                Sign In
              </Link>
            )}
            {pathName === '/auth/signin' && (
              <Link
                href={'/auth/signup'}
                className="black_btn">
                Sign Up
              </Link>
            )}
          </>
        }
      </div>
    </nav>
  )
}

export default Nav