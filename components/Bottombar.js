import React from 'react'
// its using the css fro top bar style

import { Flower1,Calendar3,PlusCircleDotted
    ,Bell,PersonPlus, Newspaper, Wallet2, SpeakerFill, Award, Compass
    } from 'react-bootstrap-icons';
function Bottombar() {
  return (
    <div className="bottom">
 <div className="bottom-icons">
     <Newspaper size={19}   className="ml-6"/>
     <Flower1 size={19}   className="ml-6"/>
     <Award size={19} color="orange"   className="ml-6"/>
    <Compass size={19}   className="ml-6"/>  
     <Bell size={19}   className="ml-6"/>

 </div>
    </div>
  )
}

export default Bottombar