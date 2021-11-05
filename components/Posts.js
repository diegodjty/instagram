import Post from "./Post"

function Posts() {

    const data = [
        {
            id:'123',
            username: 'diego',
            img: 'https://links.papareact.com/3ke',
            userImg: 'https://links.papareact.com/3ke',
            caption: 'THIS IS A TEST CAPTION'

        },
        {
            id:'12',
            username: 'diego',
            img: 'https://links.papareact.com/3ke',
            userImg: 'https://links.papareact.com/3ke',
            caption: 'THIS IS A TEST CAPTION'

        },
        {
            id:'1243',
            username: 'diego',
            img: 'https://links.papareact.com/3ke',
            userImg: 'https://links.papareact.com/3ke',
            caption: 'THIS IS A TEST CAPTION'

        }
    ]
    return (
        <div>
            {data.map((post)=>(
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    caption={post.caption}
                    img={post.img}
                />
            ))}
        </div>
    )
}

export default Posts
