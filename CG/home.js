import NavBar from "./Navbar"
import Industrial from '../../Assets/Industrial.png'
import { FaEye, FaInfoCircle } from "react-icons/fa";
import { BsArrowRightCircleFill, BsEye } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { TbCarCrane } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { usePathName } from "../../constants";
import { useEffect, useState } from "react";
import WarrantyVerification from "./Deviation/WarrantyVerification";
import { Button, Container, Dropdown } from "react-bootstrap";
import GenericModal from "./GenericModal";
import { Card, Col, Row, Accordion, Form, Spinner, Modal } from "react-bootstrap";
import product_icon from '../../Assets/icon_product_48.svg'
import repair_icon from '../../Assets/icon_repair_48.svg'
import { GoPlusCircle } from "react-icons/go";
import { FaWrench } from "react-icons/fa";
import { CgTrack } from "react-icons/cg";
import Footer from "./footer";
import CG_BG from '../../Assets/cgbg.png'








function Home() {
    const navigate = useNavigate();
    const pathName = usePathName();

    const [showModal, setshowModal] = useState(false)


    const handleShow = () => setshowModal(true)
    const handleClose = () => setshowModal(false)
    // .dropdownRaise {
    //     position: relative;
    //     display: inline-block;
    //   }

    //   .dropdownRaise-content {
    //     display: none;
    //     position: absolute;
    //     background-color: #f9f9f9;
    //     min-width: 160px;
    //     box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    //     padding: 12px 16px;
    //     z-index: 1;
    //   }

    //   .dropdownRaise:hover .dropdownRaise-content {
    //     display: block;
    //   }
    //   </style>

    //   <div class="dropdown">
    //     <span>Mouse over me</span>
    //     <div class="dropdown-content">
    //       <p>Hello World!</p>
    //     </div>
    //   </div>





    return (
        <>
            <NavBar />



            {/* <div className="d-flex flex-wrap  warranty-screen p-4 pt-2">
                <div>
                    <p style={{ fontSize: "18px", fontWeight: "500" }}>Problem With your asset?</p>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <button onClick={() => {
                        navigate(`${pathName}/add-customer`);
                        // setNatureFlag(false)
                        localStorage.setItem("RedirectedFrom", "RegisterProduct")
                        localStorage.setItem("UserTypeTicket","Customer")

                    }} className="register">Register Product Warranty</button>
                    <div
                        // onClick={handleButtonClick}
                        // onClick={() => {
                        //     navigate(`${pathName}/raise-request`);
                        //     localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                        // }}
                        className="register dropdownRaise">Raise service request
                        <div class="dropdownRaise-content mt-2">
                            <p style={{
                                color: '#000'
                            }} onClick={() => {
                                navigate(`${pathName}/reg-prod-Warranty`)
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                                localStorage.setItem("RedirectedName", "EndCustomer")
                                    localStorage.setItem("UserTypeTicket","Customer")

                                // navigate(`${pathName}/end-customer`);
                            }}>EndCustomer</p>

                            <p style={{
                                color: '#000'
                            }} onClick={() => {
                                navigate(`${pathName}/dealer-oem`);
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                                localStorage.setItem("RedirectedName", "DealerName")
                                localStorage.setItem("RedirectedField", "DealerField")
                                    localStorage.setItem("UserTypeTicket","Dealer")



                                // navigate(`${pathName}/end-customer`);


                            }}>Dealer/OEM</p>

                            <p style={{
                                color: '#000'
                            }} onClick={() => {
                                navigate(`${pathName}/retailer`);
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                                localStorage.setItem("RedirectedName", "RetailerName")
                                localStorage.setItem("RedirectedField", "RetailerField")
                                    localStorage.setItem("UserTypeTicket","Retailer")






                            }}>Retailer</p>



                        </div>


                    </div>

                    <button className="register">Track service request status</button>
                </div>

                        </div> */}




            <Container fluid className="p-5">



                <h3 className="text-start">Need support with your asset</h3>
                <Row className="mt-5" >

                    <Col md={4} className="product"
                    >

                        <Card className="add-style zoom-Hover"
                            // style={{
                            //     background: '#e6e1d6',
                            //     borderRadius: "15px"

                            // }}
                            onClick={() => {
                                navigate(`${pathName}/add-customer`);
                                // setNatureFlag(false)
                                localStorage.removeItem("otpVerified");
                                localStorage.removeItem("otp");
                                localStorage.removeItem("allProducts");
                                localStorage.setItem("RedirectedFrom", "RegisterProduct")

                            }}
                        >
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p style={{
                                            color: '#fff'
                                        }}>Register Product Warranty</p>
                                    </div>
                                    {/* <div> */}
                                    {/* <img style={{
                                        color:'#fff',
                                        background:'#fff'
                                    }} src={product_icon} alt="Product_icon" /> */}
                                    <GoPlusCircle fontSize='50' color="#fff" />

                                    {/* </div> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">

                                    <p className="text-start arrow_icon text-light m-0"><BsArrowRightCircleFill className="icon" /></p>
                                    {/* <span className="text-light reg-info">Registering your product will help you get faster support.</span> */}
                                </div>
                            </div>

                        </Card>







                    </Col>
                    <Col md={4} className=""
                    >

                        <Card className="add-style zoom-Hover"
                            onClick={() => {
                                navigate(`${pathName}/raise-request`);
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                            }}>
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p className="text-light">Raise Service request</p>
                                    </div>
                                    {/* <div> */}
                                    <FaWrench fontSize='50' color="#fff" />

                                    {/* </div> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowRightCircleFill className="icon" /></p>
                                    {/* <span className="text-light reg-info">Request repair service conveniently online</span> */}
                                </div>
                            </div>

                        </Card>







                    </Col>
                    <Col md={4} className=""
                    >

                        <Card className="add-style zoom-Hover" 
                        onClick={() => {
                            navigate(`${pathName}/track-request`);
                        }}>
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p className="text-light">Track service request status </p>
                                    </div>
                                    {/* <div> */}
                                    <CgTrack fontSize='50' color="#fff" />

                                    {/* </div> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowRightCircleFill className="icon" /></p>
                                    {/* <span className="text-light reg-info">Request repair service conveniently online</span> */}
                                </div>
                            </div>

                        </Card>







                    </Col>




                </Row>



            </Container>

            <Footer />

            {/* <Button variant="" onClick={handleShow}>open</Button> */}


            {/* <GenericModal show={showModal} handleClose={handleClose} title="Test Title"
                body={
                    <>
                        <Row>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Hello Pavan</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Hello Pavan</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Hello Pavan</Form.Label>
                                    <Form.Control type="submit" />
                                </Form.Group>

                            </Col>

                        </Row>
                    </>
                }
                footer={<>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </>} /> */}


        </>



    )

}
export default Home