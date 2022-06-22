import React from 'react'
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { Compass,ChatDots,Search,
PersonCircle
} from 'react-bootstrap-icons';
function Appbar() {
  const { data: session } = useSession();
  return (
    <div className="topbar">
    <div className="topbar-child" >
        <div className="icon">
      <Compass size={19} color="#333"  className="ml-4"/>  
      <ChatDots size={19} color="#333"  className="ml-4"/>
      </div>
     <Image
     src="/lg.png"
     width={80}
     height={40}
    className="logo"
    alt="latest news"
     />
      <div className="icon">
      <Search size={19} color="#333"   className="ml-4"/>
<PersonCircle   onClick={() => signOut()} size={24} color="grey"  className="ml-4"/>
</div>
    </div>   
    </div>
  )
}

export default Appbar
// this is the first topbat that you see on top component