import React from 'react'
import { Compass,ChatDots,Search,
PersonCircle
} from 'react-bootstrap-icons';
function Appbar() {
  return (
    <div className="topbar">
    <div className="topbar-child" >
        <div className="icon">
      <Compass size={19} color="#333"  className="ml-4"/>  
      <ChatDots size={19} color="#333"  className="ml-4"/>
      </div>
      <p>hookwall</p>
      <div className="icon">
      <Search size={19} color="#333"   className="ml-4"/>
<PersonCircle size={24} color="grey"  className="ml-4"/>
</div>
    </div>   
    </div>
  )
}

export default Appbar
// this is the first topbat that you see on top component