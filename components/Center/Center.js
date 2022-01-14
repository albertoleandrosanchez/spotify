import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

const fromColors = [
    'from-indigo-500',
    'from-purple-500',
    'from-pink-500',
    'from-red-500',
    'from-orange-500',
    'from-yellow-500',
    'from-green-500',
    'from-teal-500',
    'from-blue-500',
    
]

function Center() {
    const { data: session, status } = useSession()
    const [color, setColor] = useState(null)
    useEffect(() => { 
        setColor(shuffle(fromColors).pop())
    },[])


    return (
        <div className=' flex-grow  '>
            <h1>asflasafasffm</h1>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>

                    <img className="rounded-full w-10 h-10" src={session?.user.image??'https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png'} alt='profile' />

                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>

            </section>
        </div>
    )
}

export default Center
