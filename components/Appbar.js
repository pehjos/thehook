import React from 'react'
import Image from 'next/image';
import { transition } from "./transition";
import { Badge, IconButton, Dialog, Avatar, Divider, AvatarGroup } from "@mui/material";
import useToggle from "./useToggle";
import Switch from './Switch'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useSession, signOut } from "next-auth/react";
import { Compass,ChatDots,Search,
PersonCircle,
Gear
} from 'react-bootstrap-icons';
import { BookmarkAddedOutlined, Close, ExitToApp, ExitToAppTwoTone, ExpandMore, Help, HelpOutline, ReadMore, Settings } from '@mui/icons-material';
import { height } from '@mui/system';
function Appbar() {
  const router = useRouter()
const { value, toggleValue } = useToggle(false);
const { data: session } = useSession();
const { theme, setTheme } = useTheme()
return (
<div className="topbar">
<div className="topbar-child" >
<h2>hook</h2>
<div className="icon">
<ChatDots size={36}   className="ml-4"/>
<Search size={36}    className="ml-4"/>
{session?(<img onClick={toggleValue}  className="ml-4" style={{width:36,height:36}} src={session?.user?.image}/>):(<PersonCircle   onClick={toggleValue} size={36}   className="ml-4"/>)}
</div>
</div>
<Dialog  
fullScreen
open={value}
onClose={toggleValue}
TransitionComponent={transition}
>
  <div className='dialogcard'>
  <div className='drawer_top'>

<IconButton
  edge="end"
  color="inherit"
  aria-label="close"
  style={{ marginRight: "5px" }}
  onClick={toggleValue}
>
  <Close className="closename" />
</IconButton> 
<Switch />
</div>
<div className='profileview'>
  <IconButton onClick={() => router.push('/profile')}>
<div className='profileview_left'>
<Avatar src={session?.user?.image}/>
<h5>{session?.user?.name}</h5>
</div>
</IconButton>
<div className='profileview_right'>
<ExpandMore />
</div>

</div>
<div className='menus_'>
<div className='menus_child'>
<BookmarkAddedOutlined/>
<p>saved</p>

</div>
<div className='menus_child'>
<Settings/>
<p>settings</p>

</div>
<div className='menus_child'>
<HelpOutline/>
<p>help && feedback</p>
</div>
<div onClick={()=>signOut()} className='menus_child'>
  <ExitToApp/>
<p>signOut</p>
</div>
</div>
<Divider/>
</div>
</Dialog>  
</div>
)
}

export default Appbar
// this is the first topbat that you see on top component