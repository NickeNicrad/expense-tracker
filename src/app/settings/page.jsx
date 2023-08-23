import Link from 'next/link'
import React from 'react'

function Settings() {
    return (
        <section className='feed'>
            <ul role="list" class="divide-y divide-gray-100">
                <Link href={'/dashboard'} class="flex justify-between items-center gap-x-6 py-5">
                    <div className='block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </div>
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Dashboard</p>
                    </div>
                </Link>
                <Link href={'/currencies'} class="flex justify-between items-center gap-x-6 py-5">
                    <div className='block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </div>
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Currencies</p>
                    </div>
                </Link>
                <Link href={'/categories'} class="flex justify-between items-center gap-x-6 py-5">
                    <div className='block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </div>
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Categories</p>
                    </div>
                </Link>
                <Link href={'/notifications'} class="flex justify-between items-center gap-x-6 py-5">
                    <div className='block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </div>
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Notifications</p>
                    </div>
                </Link>
            </ul>
        </section>
    )
}

export default Settings