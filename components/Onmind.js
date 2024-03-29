import { EditAttributesSharp, EmojiEmotionsOutlined, PublicOffOutlined, PublicOutlined, Videocam } from '@mui/icons-material'
import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { Calendar2, Clock, EmojiDizzy, Image, Info, Pencil } from 'react-bootstrap-icons'

function Onmind() {
  const router = useRouter()
  const { data: session } = useSession();
  return (
    <div className='onyourmind'>
     {!session?(<div onClick={() => router.push('/account')}>
        <div className='topcont'>
            <p>Share your opinion!</p>
            <Pencil/>
        </div>
        <div className='bottomha'>
<Image  color="orange"/>
<EmojiDizzy  color="tomato"/>
<PublicOutlined style={{color:"gray",fontSize:18}}/>
<Calendar2  color="orange"/>
<Videocam style={{color:"red",fontSize:18}}/>
<Info  color="green"/>
<Clock  color="teal"/>
        </div>  
        </div>):(<div onClick={() => router.push('/createpost')}>
        <div className='topcont'>
            <p>Share your opinion!</p>
            <Pencil/>
        </div>
        <div className='bottomha'>
<Image  color="orange"/>
<EmojiDizzy  color="tomato"/>
<PublicOutlined style={{color:"gray",fontSize:18}}/>
<Calendar2  color="orange"/>
<Videocam style={{color:"red",fontSize:18}}/>
<Info  color="green"/>
<Clock  color="teal"/>
        </div>  
        </div>)}
        </div>
  )
}

export default Onmind