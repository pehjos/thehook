import React, { useState,useRef } from 'react'
import Linkify from 'react-linkify';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import optionalimage from './logo.jpg'
import Moment from 'react-moment';
import moment from "moment-twitter"
import {Avatar} from '@mui/material'
import useVideoPlayer from './VideoPlayer';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useRouter } from 'next/router'
import ReactImageFallback from "react-image-fallback";
import {
NewReleasesRounded,
Close,
Timeline,MoreHoriz,
Photo,
DeleteTwoTone,
EditAttributesOutlined,
PlayCircleOutline,
ArrowBackIosNewOutlined
} from '@mui/icons-material'
import { ArrowRepeat,Share,Send, ChatSquareDots, HandThumbsUp, Link, Dot, Award, ClipboardX, AwardFill, PlayCircle, HandIndexThumbFill } from 'react-bootstrap-icons';


function Card({ post})

{
  const router = useRouter()
const { data: session } = useSession();
const [handlePost, setHandlePost] = useRecoilState(handlePostState);
const [count, setCount] = useState(0);
// PLAY VIDEO


const [statebody, setStatebody] = useState(false)
const ShowWatchbody=()=>{
if(statebody){
setStatebody(false)
}
else{
setStatebody(true)
}
}
// Like button
const [statedcomment, setStatedcoment] = useState(false)
const ShowWatch7=()=>{
if(statedcomment){
  setStatedcoment(false)
}
else{
  setStatedcoment(true)
}
}
const [message, SetMessage] = useState('');
const [temp,setTemp]= useState('')
const [emoji ,setImoji]=useState("")
const [comments, setComments] = useState(post?.likes);
const handleComment = async () => {
const newComments = await dispatch(likePost(`${userId}: ${message}`, post._id));

SetMessage('');
setComments(newComments);
console.log(message)
//   commentsRef.current.scrollIntoView({ behavior: 'smooth',top:500 });
};
const [playstate, setplaytState] = useState(true);

const videoRef = useRef(null)
const {
isMuted,
isPlaying,
speed,
progress,
toggleMute,
togglePlay,
handleTimeUpdate,
handleVideoSpeed,
handleVideoProgress,
timeplay,cur
} = useVideoPlayer(videoRef);
const [postData, setPostData] = useState({   provider:'',
reposter:'',
title:'',
message:'',
tags:'',
image:'',
comments:[],
likes:[],
likeId:[],
video:'',
email:"",
createdAt:"",
accountType:'',
description:'',});


const [isVideoplaying, setisVideoplaying]=useState(false)
const Videoref=useRef(null)
const Playvideo=()=>{
if(isVideoplaying){
//stop
Videoref.current.pause()
setisVideoplaying(false)

}else{
//play
Videoref.current.play()
setisVideoplaying(true)

}

}

const truncate = (string, n) =>
string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

const deletePost = async () => {
const response = await fetch(`/api/posts/${post._id}`, {
method: "DELETE",
headers: { "Content-Type": "application/json" },
});

setHandlePost(true);

};

const likePost = async (e) => {

const response = await fetch(`/api/posts/${post._id}`, {
method: "PUT",
body: JSON.stringify({
temp
}),
headers: { "Content-Type": "application/json" },
});

setHandlePost(true);


};
const userId=session?.user?.email;
const likedAlready=post.likeId.findIndex((like)=>like.userId===userId)

console.log(likedAlready)
const likePostwithId = async (e) => {
if(likedAlready==-1){
const response = await fetch(`/api/posts/${post._id}`, {
method: "PATCH",
body: JSON.stringify({
userId
}),
headers: { "Content-Type": "application/json" },
});
likedAlready=0;
setHandlePost(true);
}else{

const response = await fetch(`/api/posts/${post._id}`, {
method: "POST",
body: JSON.stringify({
userId
        }),
headers: { "Content-Type": "application/json" },
});

setHandlePost(true);
}  

};

const handleSubmit = async (e) => {
  e.preventDefault();
const response = await fetch("/api/posts", {
  method: "POST",
  body: JSON.stringify({
  image:post.image,
  video:post.video, 
  name: post.name,
  email:post.email,
  userImg:post.userImg,
  reposter:session?.user.name,
  title:post.title,
  comments:[],
  likes:[],
  likeId:[],
  description:post.description,
  createdAt: new Date().toString(),
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

const [temp1,setTemp1]= useState('')
const  [message1, SetMessage1] = useState("");
const handleSubmit1 = async (e) => {
e.preventDefault();

const response =  await fetch(`/api/post/${post._id}`, {
method: "POST",
body: JSON.stringify({
message1, 
img:session?.user.image,
time: new Date().toString(),
name: session?.user.name,

}),
headers: {
    "Content-Type": "application/json",
},
});

const responseData = await response.json();
console.log(responseData);
console.log(session.user.image)
setHandlePost(true);
SetMessage1("")
};

const deleteComment=async (e) => {
  e.preventDefault();

  const response = await fetch(`/api/post/${post._id}`, {
    method: "PUT",
    body: JSON.stringify({
   userId
            }),
    headers: { "Content-Type": "application/json" },
    });
    
    setHandlePost(true);


}

const url=`/post/${post._id}`
const title=post.title
const tag=post.tag
const shareDetails = { url, tag, title};

const handleSharing = async () => {
if (navigator.share) {
try {
await navigator
.share(shareDetails)
.then(() =>
console.log("Hooray! Your content was shared to tha world")
);
} catch (error) {
console.log(`Oops! I couldn't share to the world because: ${error}`);
}
} else {
// fallback code
console.log(
"Web share is currently not supported on this browser. Please provide a callback"
);
}
};


// comment component
const [stated, setStated] = useState(false)
const ShowWatch=()=>{
if(stated){
setStated(false)


}
else{
setStated(true)


}
}


// imoji likecom
const [stated1, setStated1] = useState(false)
const ShowWatch1=()=>{
if(stated1){
setStated1(false)



}
else{
setStated1(true)


}
}
moment(moment() + (864e5 * 6)).twitterShort()
// imoji likecom
const [stated2, setStated2] = useState(false)
const ShowWatch2=()=>{
if(stated2){
setStated2(false)



}
else{
setStated2(true)


}
}

return (
<div className ="overRallCard" id="overall">



<div className="cardmain" id="cards" onContextMenu="return false" onselectstart="return false"onCut="return false"onPaste="return false" onCopy="return false">
{post.reposter==""?"":(<div className='repost'>
  <p>{post.reposter}</p>
  <Dot color='tomato'/>
<ArrowRepeat color='#2196f3'/>
<Dot color='tomato'/>
<p>rehook</p>
  </div>)}
<div className="card__header">

<div className="card__headerleft">
<div className="imgfoot">
{/* <h4>{tag}</h4> */}
<Avatar src={post.userImg} style={{width:30,height:30,}}/>



</div>



<h3>{post.name}</h3>
<NewReleasesRounded/>
<Dot color="#2196f3"/>

</div>
<p>{moment(moment(post.createdAt)).twitterShort()}</p>
<p  style={{color: '#2196f3'}}>@{post.name}</p>
<div   className="card__headerright">

{stated2?(<CloseTwoToneIcon onClick={ShowWatch2}/>):(<MoreHoriz onClick={ShowWatch2}/>)}
{stated2?(<div className="card_hori">
<div onClick={addNote} className="horis_section">
<BookmarkTwoToneIcon style={{color:"orange"}}/>
<p>Save for later</p>
</div>
<div onClick={handleSharing} className="horis_sections">
<ShareTwoToneIcon/>
<p>Share</p>
</div>
<div onClick={openPost} className="horis_sections">
<LibraryBooksTwoToneIcon style={{color:"#2196f3"}}/>
<p>Full coverage</p>
</div>
<div onClick={openProfile} className="horis_sections">
<LinkTwoToneIcon/>
<p>The publisher</p>
</div>
<div onClick={Block} className="horis_sections">
<BlockTwoToneIcon/>
<p>Hide from source</p>
</div>
<div onClick={Like} className="horis_sections">
<ThumbUpAltTwoToneIcon style={{color:"#2196f3"}}/>
<p>More stories like this</p>
</div>
{user.result.user?.uid==post.user?(<div  onClick={() => dispatch(deletePost(post._id))} className="horis_sections">
<DeleteTwoTone style={{color:"red"}}/>
<p>Delete</p>
</div>):""}
</div>
):""}
</div>
</div>


<div className="card__contentdescription">
{statebody?(<h6><Linkify>{articlebody}</Linkify></h6>):(<p ><Linkify>{post.description}</Linkify></p>)  }
{/* {statebody?(<Close onClick={ShowWatchbody}/>):(<h5 onClick={ShowWatchbody}>{seeMore}</h5>)} */}
</div>
<div className="img__card">
<div  className="card__image">
<div className="image_icon">
{post.image!==""?"":
isVideoplaying?"":(
(<PlayCircleOutline  onClick={Playvideo}/>)
)}
</div>
{!post.image==""?(<ReactImageFallback 
src={post.image}
fallbackImage={optionalimage}
alt="Loading... "

/>):(
<video src={post.video} onClick={Playvideo} ref={Videoref}  />
)

}

</div>
<div className="card__content">
<div className="card__contenttitle">
<h5>{post.title}</h5>

</div>

<div className="link_card">
<Link size={20} color="#2196f3"/>
<p>hook.com</p>
<div className="imgfoot">

{post.likes?.map((c, i) => (
i<56&&(
<div key={i} className="icolike">
<p>{c?.temp}</p> 
</div>

) ))}

<h3>{temp}</h3>        

</div>   
</div>
</div>
</div>
<div className="card__footer">
<div className="footer_card_all"> 
<div className="footer_card_icon">


{stated1?(<div className="card__emojis" >
<p onClick={() =>(setTemp('💖'))} >💖</p>
<p onClick={()=>likePost(setTemp("👍"))}>💖</p>
{/* 
<p onClick={() => dispatch(likePost( post._id ,"💘",setTemp('💘'),setCount(count + 1)))}  >💘</p>
<p onClick={() => dispatch(likePost( post._id ,"👍",setTemp('👍'),setCount(count + 1)))}  >👍</p>
<p onClick={() => dispatch(likePost( post._id ,"😜",setTemp('😜'),setCount(count + 1)))}  >😜</p>
<p onClick={() => dispatch(likePost( post._id ,"😁",setTemp('😁'),setCount(count + 1)))}  >😁</p>
<p onClick={() => dispatch(likePost( post._id ,"👌",setTemp('👌'),setCount(count + 1)))}  >👌</p>
<p onClick={() => dispatch(likePost( post._id ,"😭",setTemp('😭'),setCount(count + 1)))}  >😭</p>
<p onClick={() => dispatch(likePost( post._id ,"🔥",setTemp('🔥'),setCount(count + 1)))}  >🔥</p>
<p onClick={() => dispatch(likePost( post._id ,"🚀",setTemp('🚀'),setCount(count + 1)))}  >🚀</p>
<p onClick={() => dispatch(likePost( post._id ,"🤐",setTemp('🤐'),setCount(count + 1)))}  >🤐</p>
<p onClick={() => dispatch(likePost( post._id ,"🤦‍♀️",setTemp('🤦‍♀️'),setCount(count + 1)))}  >🤦‍♀️</p>
<p onClick={() => dispatch(likePost( post._id ,"🤩",setTemp('🤩'),setCount(count + 1)))}  >🤩</p>
<p onClick={() => dispatch(likePost( post._id ,"👏",setTemp('👏'),setCount(count + 1)))}  >👏</p>
<p onClick={() => dispatch(likePost( post._id ,"😅",setTemp('😅'),setCount(count + 1)))}  >😅</p>
<p onClick={() => dispatch(likePost( post._id ,"🤣",setTemp('🤣'),setCount(count + 1)))}  >🤣</p> */}
{temp==""?"":(<Send onClick={()=>likePost(setStated1(false))}/>)}
</div>):(!session?(<AddReactionOutlinedIcon id="chatbuble" />):
(<AddReactionOutlinedIcon id="chatbuble" onClick={ShowWatch1}/>))}
{post.likes.length>0?(<p>{(post.likes.length)+(count)}</p>):""}  
</div>


<div className="footer_card_icon">
<ChatSquareDots onClick={ShowWatch7} color="grey"/>
{comments.length>0?(<p>{comments.length}</p>):""}  
{statedcomment?(<div className='comment'>
  <Close onClick={ShowWatch7} />
  <div className='loop_comment'>
  {post.comments.map((comment)=>(

<div key={comment.name} className='comment__user_comments'>
  
<div className='avatar_comment'>
<Avatar style={{width:25,height:25,}}  src={comment.img}/>
</div>
<div className='avatar_comment1'>
  <div className='time_name'>
 <p>{comment.name}</p> 
 <p>{moment(moment(comment.time)).twitterShort()}</p>
 </div>
 <p>{comment.message1}</p>
 
</div>
</div>))}
</div>
<div className='comment__input'>
<input type="text" placeholder='add comment'value={message1}
  onChange={event => SetMessage1(event.target.value)}/>
<Send size={40} color="#2196f3" className='send' onClick={handleSubmit1}/>
</div>
<div className='comment__input_imojis'>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
<p onClick={() =>SetMessage1((message1 + temp1),setTemp1("💖"))} >💖</p>
</div>
</div>):""} 
</div>
<div className="footer_card_icon">
{likedAlready==-1?(<HandThumbsUp onClick={likePostwithId} color="grey"/>):
(<HandThumbsUp onClick={likePostwithId} color="red"/>)
}
{post.likeId?.length>0?(<p>{post.likeId?.length}</p>):"" } 
</div> 
<div className="footer_card_icon" >
<ArrowRepeat onClick={handleSubmit}  color="grey"/>
<p></p>   
</div> 
<div className="footer_card_icon">
<Share onClick={handleSharing} color="grey"/>

</div> 


</div>

{

}


</div>



</div>
{stated?(<Close onClick={ShowWatch} className="close"/>):""}

</div>
)
}

export default Card
