import React from 'react'
import Image from 'next/image';
import { transition } from "./transition";
import { Badge, IconButton, Dialog, Avatar, Divider } from "@mui/material";
import useToggle from "./useToggle";
import Switch from './Switch'
import { useTheme } from 'next-themes'
import { useSession, signOut } from "next-auth/react";
import { Compass,ChatDots,Search,
PersonCircle,
Gear
} from 'react-bootstrap-icons';
import { BookmarkAddedOutlined, Close, ExitToApp, ExitToAppTwoTone, ExpandMore, Help, HelpOutline, ReadMore, Settings } from '@mui/icons-material';
function Appbar() {
const { value, toggleValue } = useToggle(false);
const { data: session } = useSession();
const { theme, setTheme } = useTheme()
return (
<div className="topbar">
<div className="topbar-child" >
<h2>yak</h2>
<div className="icon">
<ChatDots size={36}   className="ml-4"/>
<Search size={36}    className="ml-4"/>
<PersonCircle   onClick={toggleValue} size={36}   className="ml-4"/>
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
<div className='profileview_left'>
<Avatar src={session?.user?.image}/>
<h5>Pehjos</h5>
</div>
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
<div className='menus_child'>
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