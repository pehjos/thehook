import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import React ,{useState,useEffect} from 'react'
import { handleUserState, } from "../atoms/userAtom";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
function Edit() {
const [realtimeuser, setRealtimeuser] = useState([]);
const router = useRouter()
const [input1, setInput1] = useState("");
const [input2, setInput2] = useState("");
const [input3, setInput3] = useState("");
const [input4, setInput4] = useState("");
const [input5, setInput5] = useState("");
const { data: session } = useSession();
const [id,setid]=useState("")
const [handleuser, setHandleuser] = useRecoilState(handleUserState );
const [handleUsersState, sethandleUsersState] = useRecoilState(handleUserState);

const uploadPrev=()=>{

const oFreader=new  FileReader()
oFreader.readAsDataURL(document.getElementById('btnImg').files[0]);
oFreader.onload=function(oFREvent){
document.getElementById("prev").src=oFREvent.target.result;
console.log(oFREvent.target.result)
setInput2(oFREvent.target.result)
}
}
const uploadPrevP=()=>{

const oFreader=new  FileReader()
oFreader.readAsDataURL(document.getElementById('btnImgp').files[0]);
oFreader.onload=function(oFREvent){
document.getElementById("prevp").src=oFREvent.target.result;
console.log(oFREvent.target.result)
setInput1(oFREvent.target.result)
}
}
// BTN CLICK
const choseImg=()=>{
document.getElementById('btnImg').click()
}
const choseImgP=()=>{
document.getElementById('btnImgp').click()
}

useEffect(() => {
const fetchPosts = async () => {
const response = await fetch("/api/user/", {
method: "GET",
headers: { "Content-Type": "application/json" },
});

const responseData= await response.json();
setRealtimeuser(responseData)
setHandleuser(false);

};

fetchPosts();
}, [handleuser]);
console.log(realtimeuser,"its me bawumia") 
// SUBMIT DATA



const handleSubmit = async (e) => {

const response = await fetch(`/api/user/${id}`, {
method: "PUT",
body: JSON.stringify({
input1,
input2,
input3,
input4,
input5
}),
headers: {
"Content-Type": "application/json",
},
})
const responseData = await response.json();
console.log(responseData);
sethandleUsersState(true);
setid("")
}


return (
<div className='edit'>
{realtimeuser?.map(({ link, username, bio, profile, cover, _id }) => ( 
<div key={_id} className='edit_main'>
<div className='edit_top'>
<p>Profile update</p>
<button onClick={handleSubmit}>save</button>
</div>
<div className='edit_cover'>
<input  accept="image/*" type="file" id="btnImg" 
onChange={ uploadPrev}
/> 
<AddPhotoAlternateOutlined onClick={()=>choseImg(setid(_id))}/>
<img accept="image/*" id="prev" src={profile}/>
</div>
<div className='edit_profile_img'>
<input  accept="image/*" type="file" id="btnImgp" 
onChange={ uploadPrevP}
/> 
<AddPhotoAlternateOutlined onClick={()=>choseImgP(setid(_id))}/>
<img accept="image/*" id="prevp" src={cover}/>
</div>
<div className='edit_inputs'>
<label>Display Name</label>
<input
value={input3}
onChange={(e) => setInput3(e.target.value)}
onClick={()=>(setid(_id))}
placeholder={username} type="text"/>
<label>Bio</label>
<input 
value={input4}
onChange={(e) => setInput4(e.target.value)}
onClick={()=>(setid(_id))}
placeholder={bio} type="text"/>
<label>Link</label>
<input
value={input5==""?link:input5}
onChange={(e) => setInput5(e.target.value)}
onClick={()=>(setid(_id))}
placeholder={link} type="text"/>
</div>

</div>))}
</div>
)
}

export default Edit