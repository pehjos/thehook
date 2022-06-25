import React from 'react'

import { useRouter } from 'next/router'
import { Pencil } from 'react-bootstrap-icons'
import { useSession } from "next-auth/react";

function Quickac({ children, href }) {
    const { data: session } = useSession();
    const router = useRouter()


    return (
     
        <div className="quickac">

     
       {session?(<div onClick={() => router.push('/createpost')} className="quickac__add">
         <Pencil /> 
        </div>):(<div onClick={() => router.push('/account')} className="quickac__add">
         <Pencil /> 
        </div>)}
      
       
        

        </div>


    )
}

export default Quickac
