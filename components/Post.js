import {
    BookmarkIcon,
    ChatIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import {HeartIcon as HearIconFilled} from '@heroicons/react/solid' 
import { useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { orderBy } from '@firebase/firestore';
import Moment from 'react-moment';
import { async } from '@firebase/util';
function Post({id,username,userImg,img,caption}) {

    const session = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([])
    const [hasliked, setHasliked] = useState(false);


    useEffect(()=>{
        return onSnapshot(query(collection(db,'post',id,'comments'),
        orderBy('timestamp','desc')),
        snapshot => setComments(snapshot.docs))
    },[db, id])


    useEffect(()=>{
        return onSnapshot(collection(db,'post',id,'likes'),
        (snapshot)=>(setLikes(snapshot.docs)))
    },[db, id])

    useEffect(()=>{
        return setHasliked(likes.findIndex((like) => like.id === session.data?.user?.uid) !== -1)
    },[likes])

    const sendComment = async (e) =>{
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db,'post',id, 'comments'),{
            comment: commentToSend,
            username: session.data.user.username,
            userImg: session.data.user.image,
            timestamp: serverTimestamp()
        })
    }

    const likePost = async() =>{
        if(hasliked){
            await deleteDoc(doc(db,'post',id,'likes',session.data.user.uid))
        }else{
            await setDoc(doc(db, 'post',id,'likes',session.data.user.uid),{
                username: session.data.user.username,
            })

        }
    }

    return (
        <div className='bg-white my-7 border rounded-sm'>
            <div className='flex items-center p-5'>
                <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3 " src={userImg} alt="" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>

            <img src={img} alt="" className='object-cover w-full' />

            {session.data && (
                <div className='flex justify-between px-4 pt-4'> 
                    <div className='flex space-x-4'>

                        {hasliked ?
                            <HearIconFilled className='btn text-red-500' onClick={likePost}  />
                        :
                        
                            <HeartIcon className='btn' onClick={likePost} />
                        }
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>
                    <BookmarkIcon  className='btn'/>
                </div>

            )}

        <p className='p-5 truncate'>
            {likes.length > 0 &&(
                <p className='font-bold mb-1 '>{likes.length} Likes</p>
            )}
            <span className='font-bold mr-1'>{username} </span>
            {caption}
        </p>


        {comments.length > 0 &&(
            <div className='ml-10 h-20 overflow-y-scrool scrollbar-thumb-black scrollbar-thin'>
                {comments.map((comment)=>(
                    <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                        <img 
                            src={comment.data().userImg} 
                            alt=""
                            className='h-7 rounded-full' 
                        />
                        <p className='text-sm flex-1'> <span className='font-bold'>{comment.data().username}</span> {comment.data().comment}</p>
                        <Moment fromNow className='pr-5 text-xs'>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
            </div>
        )}

        {session.data &&(
            <form className='flex items-center p-4'>
                <EmojiHappyIcon className='h-7 ' />

                <input 
                    type="text" 
                    placeholder='Add a comment...' 
                    className='border-none flex-1 focus:ring-0 outline-none' 
                    value={comment}
                    onChange={e=> setComment(e.target.value)}
                />

                <button 
                    type='submit' 
                    disabled={!comment.trim()} 
                    className='font-semibold text-blue-400'
                    onClick={sendComment}
                >Post
                </button>
            </form>
        )}

        </div>


    )
}

export default Post
