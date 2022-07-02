import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import React,{useState,useEffect} from 'react'
import { handleUserState } from "../atoms/userAtom";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
function Preauth(user) {
const router = useRouter()
const { data: session } = useSession();
const [handleuser, setHandleuser] = useRecoilState(handleUserState );

const [handleUsersState, sethandleUsersState] = useRecoilState(handleUserState);
const [postData, setPostData] = useState({  
following:[],
followers:[],
hooks:[],
cover:'',
profile:'',
link:"",
bio:"",
username:"",
});

useEffect(() => {
const fetchPosts = async () => {
const response = await fetch("/api/user/", {
method: "GET",
headers: { "Content-Type": "application/json" },
});

const responseData = await response.json();
console.log(responseData)
setHandleuser(false);

};

fetchPosts();
}, [handleuser]);

// SUBMIT DATA
const handleSubmit = async (e) => {
e.preventDefault();
const response = await fetch(`/api/user/`, {
method: "POST",
body: JSON.stringify({
...postData,
cover:session?.user?.image,
profile:session?.user?.image,
email:session?.user?.email,
originalname:session?.user?.name,
createdAt: new Date().toString(),
}),
headers: {
"Content-Type": "application/json",
},
})
const responseData = await response.json();
console.log(responseData);
console.log(session.user.image)
sethandleUsersState(true);

}
return (
<div className='edit'>
<button onClick={handleSubmit}>CONTINUE</button>
</div>
)
}

export default Preauth