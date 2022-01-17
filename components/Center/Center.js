import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistState, playlistIdState } from '../../atoms/playlistAtom'
import useSpotify from '../../hooks/useSpotify'
import Songs from '../Songs'

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
    const spotifyApi = useSpotify()
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => { 
        setColor(shuffle(fromColors).pop())
    },[playlistId])

    useEffect(() => {
        console.log(playlistId)
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => {
            console.log('Something went wrong! >>> ',err)
        }
        )
    },[playlistId,spotifyApi])

    console.log(playlist)

    return (
        <div className=' flex-grow'>
            <h1>asflasafasffm</h1>
            <header className='absolute top-5 right-8'>
                <div 
                className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white'>
                    <img className="rounded-full w-10 h-10" src={session?.user.image??'https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png'} alt='profile' />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img src={playlist?.images?.[0]?.url} alt='playlist' className='w-40 h-40 shadow-2xl rounded-full' />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs/>
            </div>
        </div>
    )
}

export default Center
