import { signOut, signIn, useSession } from 'next-auth/client';

function MiniProfile() {

    const session = useSession();

    return (
        <div className='flex items-center justify-between mt-14 ml-10'>
            <img src={session.data?.user.image}
                 className='rounded-full border p-[2px] w-16 h-16'
                 alt="" 
            />
            
            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{session.data?.user.name}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>

            <button onClick={signOut} className='text-blue-400 text-sm font-semibold'>Sign out</button>
        </div>
    )
}

export default MiniProfile
