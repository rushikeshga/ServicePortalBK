import React from 'react'
import {Spinner as SpinComp} from "react-bootstrap"
import Loader from '../loader'
function Spinner() {
  return (
    <>
    <div className='spinCont'>
        <Loader/>
    </div>
    </>
  )
}

export default Spinner