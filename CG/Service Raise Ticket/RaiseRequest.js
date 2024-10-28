import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
} from "react-bootstrap";
import NavBar from "../Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { BsArrowDownCircleFill, BsArrowRightCircleFill, BsEye } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { TbCarCrane } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa";
import { usePathName } from "../../../constants/index";
import { GoPlusCircle } from "react-icons/go";
import { FaWrench } from "react-icons/fa";

import { CgTrack } from "react-icons/cg";
import Footer from "../footer";



function RaiseRequest() {
    const navigate = useNavigate();
    const pathName = usePathName();

    const [requestForCustomer, setRequestForCustomer] = useState(false);
    const [requestFordealer, setRequestFordealer] = useState(false);
    const [radioSelected, setRadioSelected] = useState(false);
    const [requestForretailer, setRequestForRetailer] = useState(false);


    const handleRadioChange = (event) => {
        const { value } = event.target;
        setRadioSelected(true);

        if (value === 'customer') {
            setRequestForCustomer(true);
            setRequestFordealer(false);
            setRequestForRetailer(false)
        }
        if (value === 'dealer') {
            setRequestForCustomer(false);
            setRequestForRetailer(false);
            setRequestFordealer(true)
        }
        else if (value === 'retailer') {
            setRequestForCustomer(false);
            setRequestFordealer(false)
            setRequestForRetailer(true);
        }
    };

    const handleNextButtonClick = () => {


        if (requestForCustomer) {
            navigate(`${pathName}/reg-prod-Warranty`);
            localStorage.setItem("RedirectedName", "EndCustomer")
        } if (requestFordealer) {
            navigate(`${pathName}/dealer-oem`);
            localStorage.setItem("RedirectedName", "DealerName")
            localStorage.setItem("RedirectedField", "DealerField")
        }
        if (requestForretailer) {
            navigate(`${pathName}/retailer`);
            localStorage.setItem("RedirectedName", "RetailerName")
            localStorage.setItem("RedirectedField", "RetailerField")
        }
    };




    return (
        <>
            <NavBar />
            <Card
                className="border-0 p-2  mt-0 mx-3"
                //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >

                <Row>
                    {/* <Col>
                        <p className="m-0 text-start">
                            <IoIosArrowRoundBack
                                className="me-3"
                                style={{ cursor: "pointer" }}
                                fontSize={35}
                                color="#005bab"
                                onClick={() => navigate(-1)}
                            />
                            Back
                        </p>
                    </Col> */}

                    <p style={{
                        fontSize: '18px',
                        fontWeight: '600'
                    }} className="text-start  m-0 p-2">
                        {/* Raise Service Request */}
                        Book your service request
                    </p>






                </Row>


                {/* <Row className="justify-content-center m-0" >
                    <Col md={6}>
                    
                        <Row className="justify-content-center ">
                        <p className="text-start  pt-0"
                        style={{
                            fontSize: '14px',
                            fontWeight: '600'
                        }}
                    >
                        Please Confirm
                    </p>

                            <Card className="p-4 add-style">
                                <Col md={12} >
                                    <Row className="justify-content-center" style={{
                                        display: 'inline-block'
                                    }} >
                                        <Col lg={12} md={12} sm={12}>
                                            <Form.Check
                                                type='radio'
                                                label="End Customers "
                                                name="radioGroup"
                                                value="customer"
                                                onChange={handleRadioChange}
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '15px 15px 0px 0px'
                                                }}
                                            />

                                            <Form.Check
                                                type='radio'
                                                label="Dealer/OEM"
                                                name="radioGroup"
                                                value='dealer'
                                                onChange={handleRadioChange}
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '15px 15px 0px 0px'
                                                }}

                                            />
                                            <Form.Check
                                                type='radio'
                                                label="Retailer"
                                                name="radioGroup"
                                                value='retailer'
                                                onChange={handleRadioChange}
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '15px 15px 0px 0px'
                                                }}

                                            />
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center mt-4">
                                        <Col style={{
                                            display: 'contents'
                                        }}>
                                            <Button
                                                variant=""
                                                className="add-Btnn"
                                                onClick={handleNextButtonClick}
                                                disabled={!radioSelected}
                                            >
                                                Next
                                            </Button>
                                        </Col>
                                    </Row>

                                </Col>
                            </Card>
                        </Row>
                    </Col>
                </Row> */}






                {/* <Row style={{
                    gap: '12px'
                }}>
                    <Col onClick={() => {
                        navigate(`${pathName}/reg-prod-Warranty`);
                        localStorage.setItem("RedirectedName", "EndCustomer")

                        // navigate(`${pathName}/end-customer`);
                    }}
                        className="raise-req-col" md={2}>
                        <p

                        >End Customers</p>
                        <div className="Eye-log">
                            <CgProfile className="eye" />

                        </div>


                    </Col>
                    <Col onClick={() => {
                        navigate(`${pathName}/dealer-oem`);
                        localStorage.setItem("RedirectedName", "DealerName")
                        localStorage.setItem("RedirectedField", "DealerField")



                        // navigate(`${pathName}/end-customer`);


                    }} className="raise-req-col" md={2}>
                        <p>Dealer/OEM</p>

                        <div className="Eye-log">
                            <FaHandshake className="eye" />

                        </div>


                    </Col>
                    <Col className="raise-req-col" md={2}
                        onClick={() => {
                            navigate(`${pathName}/retailer`);
                            localStorage.setItem("RedirectedName", "RetailerName")
                            localStorage.setItem("RedirectedField", "RetailerField")



                            // navigate(`${pathName}/end-customer`);


                        }}>
                        <p>Retailer</p>
                        <div className="Eye-log">
                            <TbCarCrane className="eye" />

                        </div>


                    </Col>

                </Row> */}


                {/* <Row>
                    <Col md={4}>
                        <Card className="add-style"
                           >
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p className="text-light">Raise Service request</p>
                                    </div>
                                    <FaWrench fontSize='50' color="#fff" />

                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowDownCircleFill color="#7bc143" fontSize={50} /></p>
                                    <span className="text-light ">Request repair service conveniently online</span>
                                </div>
                            </div>

                        </Card>
                    </Col>
                </Row> */}


                <Row className="" >

                    <Col md={4} className="product"
                    >

                        <Card className="add-style zoom-Hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="100"
                            // style={{
                            //     background: '#e6e1d6',
                            //     borderRadius: "15px"

                            // }}
                            onClick={() => {
                                navigate(`${pathName}/reg-prod-Warranty`)
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                                localStorage.setItem("RedirectedName", "EndCustomer")

                                // navigate(`${pathName}/end-customer`);
                            }}
                        >
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p style={{
                                            color: '#fff'
                                        }}>Direct Customer </p>
                                    </div>
                                    <CgProfile fontSize={40} color="#fff" />


                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowRightCircleFill className="icon" /></p>
                                    <span className="text-light reg-info">Customer</span>
                                </div>
                            </div>

                        </Card>







                    </Col>
                    <Col md={4} className=""
                    >

                        <Card className="add-style zoom-Hover" data-aos="fade-right" data-aos-once="true" data-aos-delay="200"
                            onClick={() => {
                                navigate(`${pathName}/dealer-oem`);
                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                                localStorage.setItem("RedirectedName", "DealerName")
                                localStorage.setItem("RedirectedField", "DealerField")





                            }}>
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p className="text-light">Partner</p>
                                    </div>
                                    {/* <div> */}
                                    {/* <FaWrench fontSize='50' color="#fff" /> */}
                                    <FaHandshake fontSize='40' color="#fff" />


                                    {/* </div> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowRightCircleFill className="icon" /></p>
                                    <span className="text-light reg-info">Dealer</span>
                                </div>
                            </div>

                        </Card>







                    </Col>
                    <Col md={4} className=""
                    >

                        <Card data-aos="fade-right" data-aos-once="true" data-aos-delay="300" onClick={() => {
                            navigate(`${pathName}/retailer`);
                            localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                            localStorage.setItem("RedirectedName", "RetailerName")
                            localStorage.setItem("RedirectedField", "RetailerField")






                        }} className="add-style zoom-Hover">
                            <div className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center p-3 pt-1">
                                    <div className="text-Start">
                                        <p className="text-light">Retailer </p>
                                    </div>
                                    {/* <div> */}
                                    {/* <CgTrack fontSize='50' color="#fff" /> */}
                                    <TbCarCrane fontSize='40' color="#fff" />


                                    {/* </div> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 px-3 ">
                                    <p className="text-start m-0 "><BsArrowRightCircleFill className="icon"/></p>
                                    <span className="text-light reg-info">Retailer</span>
                                </div>
                            </div>

                        </Card>







                    </Col>




                </Row>







            </Card>

            <Footer />

        </>
    );
}

export default RaiseRequest;
