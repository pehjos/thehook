import React from 'react'

import { useRouter } from 'next/router'
import { Pencil } from 'react-bootstrap-icons'
function Quickac({ children, href }) {
    const router = useRouter()


    return (
     
        <div className="quickac">

     
        <div onClick={() => router.push('/createpost')} className="quickac__add">
         <Pencil /> 
        </div>
      
       
        

        </div>


    )
}

export default Quickac
