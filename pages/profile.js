import { ArrowBackIos } from '@mui/icons-material'
import { Avatar, Divider } from '@mui/material'
import React from 'react'
import { Calendar2, Dot } from 'react-bootstrap-icons'
import { useRouter } from 'next/router'
function profile() {
    const router = useRouter()
  return (
    <div className='profile'>
        <div style={{backgroundImage:""}}>
  <div className='profile_bar'onClick={() => router.push('/')}>
<ArrowBackIos/>
<p>Phejos</p>
</div>
<div className='profile_content'>
<div className='profile_content_left'>
<Avatar style={{width:90,height:90}}/>
<h3>Pehjos</h3>
<p>@Pehjos</p>
<div className='time-date'>
<Calendar2/>
<p>join since may 2022</p>
</div>

</div>

<div className='profile_content_right'onClick={() => router.push('/edit')}>
<p>Edit profile</p>
</div>
</div>
<div className='followers'>
 <h3>0</h3> 
 <Dot />
 <p>yaks</p> 
 <h3>1</h3> 
 <Dot />
 <p>followers</p>
 <h3>7</h3> 
 <Dot />
 <p>following</p> 
</div>
<Divider/>
</div>
<div className='profile_follow'>
<p>bio</p>
<p>links</p>
</div>
<div className='profile_timeline'>
<p>Cardpost</p>
</div>
    </div>
  )
}

export default profile