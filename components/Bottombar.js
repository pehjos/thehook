import React from 'react'
// its using the css fro top bar style

import { Flower1,Calendar3,PlusCircleDotted
    ,Bell,PersonPlus, Newspaper, Wallet2, SpeakerFill, Award
    } from 'react-bootstrap-icons';
function Bottombar() {
  return (
    <div className="bottom">
 <div className="bottom-icons">
     <Newspaper size={19} color="#333"  className="ml-4"/>
     <Flower1 size={19} color="#333"  className="ml-4"/>
     <Award size={19} color="orange"   className="ml-6"/>
     <Bell size={19} color="#333"  className="ml-4"/>
     <Wallet2 size={19} color="#333"  className="ml-4"/>
 </div>
    </div>
  )
}

export default Bottombar