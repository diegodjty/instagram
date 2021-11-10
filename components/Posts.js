import Post from "./Post"
import { useState, useEffect } from 'react';
import { onSnapshot, orderBy, query,collection } from "@firebase/firestore";
import { db } from "../firebase";

function Posts() {


    const [post, setPost] = useState([])

    useEffect(()=>{
        return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot=>{
            setPost(snapshot.docs)
        })
    
    },[db])

    return (
        <div>
            {post.map((post)=>(
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profileImg}
                    caption={post.data().caption}
                    img={post.data().image}
                />
            ))}
        </div>
    )
}

export default Posts
