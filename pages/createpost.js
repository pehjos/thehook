import React, { useState,useRef,useCallback,useEffect } from 'react'
import swal from 'sweetalert2'
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState } from "../atoms/postAtom";
import { useRouter } from 'next/router'



import {

Close,Check,  ExpandLess, ExpandMore, InsertPhoto,Videocam

} from '@mui/icons-material'
import {Avatar} from '@mui/material'

function Form() {
 
  const router = useRouter()
  const { data: session } = useSession();
  
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

// error handler
const [tags ,setTags]=useState(false)
const choseImg=()=>{
document.getElementById('btnImg').click()
setVideoImg(true)
setState(false)
document.getElementById('confirm').style.opacity="1"

}
// Trial upload onClick



const closeItems=()=>{
setState(true)
document.getElementById('video').style.pointerEvents="initial"
document.getElementById('photo').style.pointerEvents="initial"
// setBaseImage("")
setImage('')
setVid('')
}

const [image, setImage ] = useState("");
const [ url, setUrl ] = useState("");
const uploadImage = () => {
let timerInterval
swal.fire({
title: 'Please Wait!',
html: 'Loading... <b></b> milliseconds.',
timer: 10000,
timerProgressBar: true,
didOpen: () => {
swal.showLoading()
const b = swal.getHtmlContainer().querySelector('b')
timerInterval = setInterval(() => {
b.textContent = swal.getTimerLeft()
}, 100)
},
willClose: () => {
clearInterval(timerInterval)
}
}).then((result) => {
/* Read more about handling dismissals below */
if (result.dismiss === swal.DismissReason.timer) {
console.log('I was closed by the timer')
}
})
const data = new FormData()
data.append("file", image)
data.append("upload_preset", "spkpypwc")
data.append("cloud_name","pehjos-inc")
fetch(" https://api.cloudinary.com/v1_1/pehjos-inc/image/upload",{
method:"post",
body: data, 
mode:'cors'
})
.then(resp => resp.json())
.then(data => {
setUrl(data.secure_url)
console.log(data.secure_url)
document.getElementById('confirm').style.opacity="0"
document.getElementById('prev').style.opacity="1"
swal.fire( 'Good job!', 'Image uploaded successfully!', 'success' )
})
.catch((err) =>{ 

swal.fire({ icon: 'error', 
title: 'Oops...', text: 'Something went wrong!',
})
closeItems()
}
)

}
// CLOUDINARY

const [vid, setVid ] = useState("");
const [ urlVid, setUrlVid ] = useState("");
const uploadVid = () => {
let timerInterval
swal.fire({
title: 'Please Wait !',
html: 'Loading... <b></b> milliseconds.',
timer: 10000,
timerProgressBar: true,
didOpen: () => {
swal.showLoading()
const b = swal.getHtmlContainer().querySelector('b')
timerInterval = setInterval(() => {
  b.textContent = swal.getTimerLeft()
}, 100)
},
willClose: () => {
clearInterval(timerInterval)
}
}).then((result) => {
/* Read more about handling dismissals below */
if (result.dismiss === swal.DismissReason.timer) {
console.log('I was closed by the timer')
}
})
const data = new FormData()
data.append("file", vid)
data.append("upload_preset", "ovmsdxlb")
data.append("cloud_name","dailynews")
fetch("https://api.cloudinary.com/v1_1/dailynews/video/upload",{
method:"post",
body: data,
mode:'cors'
})
.then(resp => resp.json())
.then(data => {
document.getElementById('confirm').style.opacity="0"
document.getElementById('prevvideo').style.opacity="1"
setUrlVid(data.secure_url)
console.log(data.secure_url)
swal.fire( 'Good job!', 'Video uploaded successfully', 'success' )

}).catch((err) =>{ 

swal.fire({ icon: 'error', 
title: 'Oops...', text: 'Something went wrong!',
})
closeItems()
}

)
}
//function


const [videos,setVideo]=useState([])

const [videoImg ,setVideoImg]=useState(true)
const [isVideoplaying, setisVideoplaying]=useState(false)
const [state ,setState]=useState(true)
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




const chosevideo=()=>{
document.getElementById('btnvideo').click()
setVideoImg(false)
setState(false)
document.getElementById('confirm').style.opacity="1"
}





const handleEmtyInput=({target})=>{
setUrl('')
setUrlVid('')

const files=target.files
target.value=''
}

const Tagss=()=>{
if (tags){
setTags(false)


}
else{
setTags(true)
}
}
// submit

// CLOUDINARY



const [postData, setPostData] = useState({   provider:'',
title:'',
message:'',
tags:'',
image:'',
comments:[],
likes:[],
likeId:[],
video:'',
email:"",
reposter:"",
createdAt:"",
accountType:'',
description:'',});

const clear = () => {
setPostData({   userImg:'',
title:'',
message:'',
tags:'',
image:'',
video:'',
accountType:'',
description:'', });
};


// SUBMIT DATA
const handleSubmit = async (e) => {
e.preventDefault();
if(url=="" && urlVid=="" ){
  swal.fire({
    title: 'Please Upload  image or video',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

}

const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
     ...postData,
    image:url,
    video:urlVid, 
    name: session.user.name,
    email: session.user.email,
    userImg: session.user.image,
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





const uploadPrev=()=>{

const oFreader=new  FileReader()
oFreader.readAsDataURL(document.getElementById('btnImg').files[0]);
oFreader.onload=function(oFREvent){
document.getElementById("prev").src=oFREvent.target.result;
console.log(oFREvent.target.result)
document.getElementById('photo').style.pointerEvents="none"
document.getElementById('photo').style.opacity="0.9"
setImage(oFREvent.target.result)

}
}

// video states
const [VideoData, setVideoData] = useState({   provider:'',
title:'',
message:'',
tags:'',
image:'',
date:'',
video:'',
accountType:'',
description:'',});
const uploadprevvideo=()=>{
const ofFreader=new  FileReader()
ofFreader.readAsDataURL(document.getElementById('btnvideo').files[0]);
ofFreader.onload=function(ofFREvent){
document.getElementById("prevvideo").src=ofFREvent.target.result;
console.log(ofFREvent.target.result)
document.getElementById('video').style.pointerEvents="none"
document.getElementById('video').style.opacity="0.9"
console.log(ofFREvent.target.result,"video")
setPostData({...postData, video:ofFREvent.target.result})
setVideo(ofFREvent.target.result)
setVid(ofFREvent.target.result)


}
}
// getvideos to faunadb 


// onclick function
function HandleDeatailsChange(event) {
console.log(event.target.value)
setVideo(event.target.value)

}

return (

<div className="main__post">
{/* <p onClick={SubmitData}>TRIAL VIDEO:</p> */}
<form    onSubmit={handleSubmit}  >
<div className="main__posthead">
<Close onClick={() => router.push('/')}/>
<button   type="submit">hook</button>
</div>
<div className="profileImgItems">
<div className="profileImg">
<Avatar  src={session?.user?.image} />    
</div>
<div className="tags">
<p>Tags</p>
{tags?(<ExpandLess onClick={Tagss}/>):(<ExpandMore onClick={Tagss}/>)}
{tags?(<div className="tags__elements">

<input type="radio" id="Local" name="gender" value="local"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}
/>
<label for="Local">Local </label><br/>
<input type="radio" id="male" name="gender" value="world"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}
/>
<label for="male">World  </label><br/>
<input type="radio" id="male" name="gender" value="science"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Sceince </label><br/>
<input type="radio" id="male" name="gender" value="technology"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Technology</label><br/>
<input type="radio" id="male" name="gender" value="sports"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Sports</label><br/>
<input type="radio" id="male" name="gender" value="EntertainmenNews"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Entertainment</label><br/>
<input type="radio" id="male" name="gender" value="gallery"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Gallery</label><br/>
<input type="radio" id="male" name="gender" value="discovery"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Discovery</label><br/>
<input type="radio" id="male" name="gender" value="top"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Top Stories</label><br/>
<input type="radio" id="male" name="gender" value="trend"
onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
<label for="male">Trending</label><br/>
</div>
):""
}
</div>
</div>
<div className="title__textArea">
<textarea name="creator" id="input" placeholder="Add Your Article Title ..." value={postData.title}
onChange={(e)=>setPostData({...postData, title:e.target.value})}
required
/>

</div>
<div className="media___section">
{/* {state?"kksd":( <p onClick={uploadImage}>Confirm image</p>)} */}
{state?(<p id="default"></p>):(
<div id="imgSection" className="media___sectionImageSelected">
{videoImg?(<img accept="image/*" id="prev"/>   ):(
<video  onClick={Playvideo} ref={Videoref}  id="prevvideo" accept="video/*"/> )}

<Close onClick={closeItems} className="closeup"/>

{/* {videoImg?(<Crop  className="crop"/>):(<p>hello</p>)} */}

</div>
)
}

<input type="file"id="btnImg"  onClick={handleEmtyInput} onChange={uploadPrev} accept="image/*" ></input>
<input onChange={uploadprevvideo} onClick={handleEmtyInput} accept="video/* " type="file" id="btnvideo"/> 
<div className="media___sectionImageOption">

<InsertPhoto id="photo"  onClick={choseImg}/>
<Videocam id="video" onClick={chosevideo}/>
<a target="_self" href="https://forecastmall.com"><img src="https://lh6.googleusercontent.com/-7_kmLfjMX0w/AAAAAAAAAAI/AAAAAAAAAAA/ZnOCWZoPC90/s60-c-k-mo/photo.jpg"/></a>
<a target="_self" href="https://forecastmall.com"><img src="https://assets.swappie.com/iphone11provihreaCC88.jpg"/></a>
<a target="_self" href="https://forecastmall.com"><img src="https://i1.wp.com/www.euroscientist.com/wp-content/uploads/2020/04/chelsea-WvusC5M-TM8-unsplash-scaled.jpg?fit=2560%2C1920&ssl=1"/></a>
<a target="_self" href="https://forecastmall.com"><img src="https://cdn2.vectorstock.com/i/1000x1000/73/31/black-and-red-business-card-template-vector-14297331.jpg"/></a>
</div>
</div>
<div className="desc__textAREA">
<textarea required name="description" placeholder="Article Description..."value={postData.description}
onChange={(e)=>setPostData({...postData, description:e.target.value})}


/>
</div>
<div className="confirm" id="confirm">
{image?(<p id="acceptImg" onClick={uploadImage}>Upload <Check/></p>):""}
{vid?(<p id="acceptVid" onClick={uploadVid}>Upload <Check/></p>):""}
</div>
</form>
</div>
)
}
export default Form


