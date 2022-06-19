import React from 'react'
import NavigateNext from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
function Quickac({ children, href }) {
    const router = useRouter()


    return (
     
        <div className="quickac">

     
        <div onClick={() => router.push('/createpost')} className="quickac__add">
         <NavigateNext  className="Add"/> 
        </div>
      
       
        

        </div>


    )
}

export default Quickac
