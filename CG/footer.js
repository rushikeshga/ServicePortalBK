import React from 'react'
import logoCG from '../../Assets/logoCG.png'
import { Row } from 'react-bootstrap'
import '../CG/Navbar.css'



const Footer = () => {
    return (
        <>
            <footer className='mt-2'>

                {/* <div className='m-3 text-start px-4'>
                    <img src={logoCG} alt="CG-Global_logo" style={{
                        height: '40px'
                    }} />

                </div> */}



                <div style={{
                    //  boxShadow: "0px 0px 2px 2px gray" ,
                    // height: '100px',
                    position: "absolute",
                    backgroundColor: "#005aab",
                    padding: '30px',
                    //    bottom:"0px",
                    width: "100%"


                }} className="footer mt-5  d-flex justify-content-center align-items-center text-light">
                    <div  >
                        Copyright © 2024. CG Power & Industrial Solutions Ltd. All rights reserved.
                    </div>

                </div >
            </footer>

        </>
    )
}

export default Footer