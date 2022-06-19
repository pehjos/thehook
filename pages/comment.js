import React,{useState} from 'react'
import { Send } from 'react-bootstrap-icons'
import { useSession } from "next-auth/react";
import { handlePostState } from "../atoms/postAtom";
function Comment(post) {
    const { data: session } = useSession();
const [temp,setTemp]= useState('')
const  [message, SetMessage] = useState("");
const handleSubmit = async (e) => {
e.preventDefault();

const response =  await fetch(`/api/posts/${post._id}`, {
method: "UPDATE",
body: JSON.stringify({
...message, 
img:session?.user.image,
time: new Date().toString(),
name: session.user.name,

}),
headers: {
    "Content-Type": "application/json",
},
});

const responseData = await response.json();
console.log(responseData);
console.log(session.user.image)
setHandlePost(true);

};



return (
<div className='comment'>
<div className='comment__user_comments'>
<p>hi</p>

</div>
<div className='comment__input'>
<input type="text" placeholder='add comment'value={message}
  onChange={event => SetMessage(event.target.value)}/>
<Send cl onClick={handleSubmit}/>
</div>
<div className='comment__input_imojis'>
<p onClick={() =>SetMessage((message + temp),setTemp("💖"))} >💖</p>
<p onClick={()=>likePost(setTemp("👍"))}>💖</p>
</div>
</div>
)
}

export default Comment