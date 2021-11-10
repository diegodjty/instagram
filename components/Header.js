import Image from 'next/image'
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon

} from '@heroicons/react/outline'
import {HomeIcon} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';
import { useRecoilState } from 'recoil';
import { modalState } from './../atoms/modalAtom';

function Header() {

    const session = useSession();
    const router = useRouter();
    const [isOpen, setOpen] = useRecoilState(modalState)

    return (
        <div className='shadow-sm border-b-1 static top-0 z-50'>
            <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
                <div onClick={()=>router.push('/')} className='hidden relative w-24  lg:inline-grid  cursor-pointer'>
                    <Image 
                        src='https://links.papareact.com/ocw'
                        layout="fill"
                        objectFit="contain"
                     />
                </div>
                <div onClick={()=>router.push('/')} className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
                    <Image 
                        src='https://links.papareact.com/jjm'
                        layout="fill"
                        objectFit="contain"
                     />
                </div>
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center
                        pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-400' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 
                        sm:text-sm border-gray-300 focus:ring-black focus:border-black
                        rounded-md ' 
                        type="text" placeholder="Search" />
                    </div>
                </div>

                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={()=>router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />
                    
                    {session.data ?(
                        <>
                        <div className='relative navBtn'>
                            <PaperAirplaneIcon className='navBtn' />
                            <div className='absolute -top-2 -right-1 text-xs w-5 h-5
                            bg-red-500 rounded-full flex items-center justify-center
                            animate-pulse text-white'>3</div>
                        </div>
                        <PlusCircleIcon onClick={()=>setOpen(true)} className='navBtn' />
                        <UserGroupIcon  className='navBtn'/>
                        <HeartIcon className='navBtn' />
                        <img 
                            src={session.data.user.image}
                            alt="profile picture"
                            className='h-10 w-10 rounded-full cursor-pointer'
                            onClick={signOut}
                        />
                    </>
                    ):(
                        <button onClick={signIn}>Sign in</button>
                    
                    )}
                    
                </div>
            </div>

        </div>
        
    )
}

export default Header
