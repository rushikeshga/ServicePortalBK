import NavBar from "../Navbar"
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePathName } from "../../../constants";
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from 'sweetalert2';
import Footer from "../footer";

import { ReactSearchAutocomplete } from "react-search-autocomplete";








function DealerAndOem() {
    const navigate = useNavigate();
    const pathName = usePathName();
    const [showDealerCode, setShowDealerCode] = useState(false);
    const [showFirstDealerCode, setShowFirstDealerCode] = useState(true);
    const [dealerCode, setDealerCode] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [requestForCustomer, setRequestForCustomer] = useState(false);
    const [requestForOEM, setRequestForOEM] = useState(false);
    const [radioSelected, setRadioSelected] = useState(false);
    const [requestForSelf, setRequestForSelf] = useState(false);

    const [yourName, setYourName] = useState('')
    const [yourContactDetails, setYourCntactDetails] = useState('')
    const [mobileError, setMobileError] = useState('');

    const validateMobile = (mobile) => {
        // Basic mobile number validation regex
        const regex = /^[5-9]{1}[0-9]{9}$/;
        return regex.test(mobile);
    };


    const handleMobileChange = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 10);

        // const value = e.target.value;
        if (value.startsWith('0')) {
            value = value.slice(1); // Remove the leading zero
        }
        e.target.value = value;

        setYourCntactDetails(e.target.value)
        if ((!validateMobile(e.target.value) && e.target.value != "") || parseInt(e.target.value).toString().length < 10) {
            setMobileError("Invalid mobile number");
        } else {
            setMobileError("");
        }

    };

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setRadioSelected(true);

        if (value === 'customer') {
            setRequestForCustomer(true);
            setRequestForOEM(false);
        }
        if (value === 'Self') {
            setRequestForCustomer(false);
            setRequestForOEM(false);
            setRequestForSelf(true)
        }
        else if (value === 'oem') {
            setRequestForCustomer(false);
            setRequestForSelf(false)
            setRequestForOEM(true);
        }
    };


    // const handleSubmit = () => {

    //     setShowDealerCode(true);
    //     setShowFirstDealerCode(false)

    // };
    const [showError, setShowError] = useState(false);



    const [DealerOrOEMInfo, setDealerOrOEMInfo] = useState([])

    const [dealername, setDealername] = useState([])
    // useEffect(() => {


    //     fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerUnauthorize`)
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log(result);
    //             setDealername(result)
    //         })
    // }, []);

    const formatResult = (item) => (
        <span style={{ display: 'block', textAlign: 'left' }}>{item.dealerName}</span>
    );

    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        console.log(item);
        // setSelectedSpare(item);
        setDealerCode(item.dealerCode);
        setShowError(false);

    };

    const handleOnFocus = () => {
        console.log('Focused');
    };



    const handleSubmit = () => {
        if (dealerCode.trim() === '') {
            setShowError('Please fill the field');
            setShowDealerCode(false);

        } else {

            fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerByCode?DealerCode=${dealerCode}`)
                .then((res) => res.json())
                .then((result) => {
                    localStorage.setItem("DealerOrOEMCode", dealerCode)
                    localStorage.setItem("DealerOrOEMName", result?.dealerName)
                    localStorage.setItem("DealerOrOEMAdd", result?.address)
                    localStorage.setItem("DealerDetails", JSON.stringify(result));

                    console.log(result);
                    if (result?.msg === 'NOTEXISTS') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Dealer code does not exists!'
                        })


                    }

                    else if (result.status != 404) {
                        setShowDealerCode(true);
                        setShowFirstDealerCode(false)
                        setShowError(false);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: result?.title
                        })
                    }
                    setDealerOrOEMInfo(result)
                })

        }
    };



    const handleDealerCodeChange = (e) => {
        setDealerCode(e.target.value);
        setShowError(false);

        // setDealerCode('')

    };


    const handleNextButtonClick = () => {
        if (!yourName.trim()) {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            });
            return;
        }
        if (!yourContactDetails.trim()) {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            });
            return;
        }
        localStorage.setItem("TicketCreateName", yourName);
        localStorage.setItem("TicketCreateNumber", yourContactDetails);
        if (requestForCustomer) {
            navigate(`${pathName}/reg-prod-Warranty`);
        } else if (requestForSelf) {
            navigate(`${pathName}/dealer-self-stock`);
        }
    };






    return (
        <>
            <NavBar />





            <Card className="border-0 p-2  mt-0 mx-3"
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }} >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <p style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            display: 'block'
                        }} className="text-start m-0">
                            {/* Raise Service Request */}
                            Book your service request
                        </p>

                    </div>

                    <div>
                        {showDealerCode &&
                            <>


                                <h4 >  {DealerOrOEMInfo?.dealerName} </h4>
                                <h4 style={{
                                    fontSize: '12px',
                                    width: '400px'
                                }} >  {DealerOrOEMInfo?.address} </h4>



                            </>
                        }

                    </div>

                </div>
                <Row>




                </Row>




                <hr />
                <Row className="justify-content-center m-0" >

                    {showFirstDealerCode && (

                        < Col md={6}>
                            {/* <p className="text-left pg-label-warranty pt-3">
                                        Fill Out service request Dealer/OEM
                                    </p> */}
                            <Row className="mt-3 text-start"><p>
                                Please enter Dealer/OEM code provided by CG to you. </p></Row>






                            <Card className="p-4 add-style">

                                <Row className="justify-content-center text-left ">

                                    {/* <Col lg={6} sm={12} md={6} >
                                        <Form.Group style={{
                                            textAlign: 'left'
                                        }}>
                                            <Form.Label
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '500'

                                                }}


                                            >
                                                Enter Partner code
                                                <span className="req-t">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dealerCode}
                                                onChange={handleDealerCodeChange}
                                            />

                                        </Form.Group>
                                        {showError && (
                                            <p style={{ color: "red", textAlign: 'left' }}>{showError}</p>
                                        )}
                                    </Col> */}


                                    <Col lg={6} sm={12} md={6} >
                                        <Form.Group>
                                            <Form.Label style={{
                                                color: '#fff',
                                                fontWeight: '500'

                                            }} >
                                                Enter Partner code

                                            </Form.Label>

                                            <Form.Control
                                                type="text"
                                                value={dealerCode}
                                                // readOnly
                                                onChange={handleDealerCodeChange} />
                                       

                                        {/* <ReactSearchAutocomplete
                                                items={dealername}
                                                value={dealerCode}
                                                onSearch={handleOnSearch}
                                                // onClear={handleClear}
                                                onHover={handleOnHover}
                                                onSelect={handleOnSelect}
                                                onFocus={handleOnFocus}
                                                formatResult={formatResult}
                                                fuseOptions={{ keys: ["dealerName"] }}
                                                resultStringKeyName="dealerName" /> */}







                                    </Form.Group>

                                </Col>

















                                <Row className="text-center mt-5 "
                                    style={{
                                        gap: '10px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Col style={{
                                        display: 'contents'
                                    }} >
                                        <Button
                                            variant=""
                                            className="cncl-Btn"
                                            onClick={() => navigate(-1)}
                                            style={{
                                                color: '#fff',
                                                fontWeight: '500',
                                                borderColor: '#fff'

                                            }}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                    <Col style={{
                                        display: 'contents'
                                    }} >
                                        <Button
                                            variant=""
                                            className="add-Btnn"
                                            onClick={handleSubmit}


                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>

                            </Row>

                        </Card>






                        </Col>
                    )}


                {showDealerCode && (
                    <>
                        {/* <Row>
                                        <Col>
                                            <Form.Group style={{
                                                textAlign: 'center'
                                            }}>
                                                <Form.Label

                                                >

                                                </Form.Label>
                                                <h4 > Welcome {DealerOrOEMInfo?.dealerName} </h4>
                                                <h4 style={{
                                                    fontSize: '12px'
                                                }} >  {DealerOrOEMInfo?.address} </h4>


                                            </Form.Group>
                                        </Col>
                                    </Row> */}



                        <Col lg={6}>
                            {/* <p className="text-left pg-label-warranty pt-3">
                                            Fill Out service request Dealer/OEM
                                        </p> */}
                            <Row className="mt-3 text-start"><p>Please select applicable option to proceed with complaint registration.</p></Row>
                            <Card className=" p-4 add-style" >

                                <Row>

                                    {/* <Col lg={6} md={6} sm={12}>
                                        <Form.Group style={{
                                            textAlign: 'left'
                                        }}>
                                            <Col>
                                            </Col> <Form.Label
                                            >
                                                Enter Dealer/OEM code
                                                <span className="req-t">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dealerCode}
                                                readOnly
                                                onChange={handleDealerCodeChange} />
                                        </Form.Group>
                                    </Col> */}
                                    <Col lg={12} md={6} sm={12}>
                                        <Form.Check
                                            type='radio'
                                            label="Placing service request for Self  stock"
                                            name="radioGroup"
                                            value='Self'
                                            onChange={handleRadioChange}
                                            style={{
                                                color: '#fff',
                                                fontWeight: '400',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '15px 15px 0px 0px'
                                            }} />
                                        <Form.Check
                                            type='radio'
                                            label="Placing service request on behalf of customer"
                                            name="radioGroup"
                                            value="customer"
                                            style={{
                                                color: '#fff',
                                                fontWeight: '400',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '15px 15px 0px 0px'
                                            }}
                                            onChange={handleRadioChange} />
                                        {/* <Form.Check
                                            type='radio'
                                            label="Placing request for OEM customer"
                                            name="radioGroup"
                                            value="oem"
                                            style={{
                                                // color: '#fff',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '15px 15px 0px 0px'
                                            }}
                                            onChange={handleRadioChange} /> */}

                                    </Col>
                                </Row>

                                <Row className="mt-3 text-left">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label style={{
                                                color: '#fff',
                                                fontWeight: '400'
                                            }}>Your Name <span className='req-t'>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name='yourName'
                                                autocomplete="new-password"
                                                onChange={(e) => {
                                                    setYourName(e.target.value);
                                                }}
                                                placeholder=''

                                            />
                                        </Form.Group>


                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label style={{
                                                color: '#fff',
                                                fontWeight: '400'
                                            }}>Your mobile no <span className='req-t'>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name='yourcontactName'
                                                autocomplete="new-password"
                                                onChange={(e) => {
                                                    handleMobileChange(e);
                                                }}
                                                placeholder=''

                                            />
                                            {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}
                                        </Form.Group>


                                    </Col>
                                </Row>
                                <Row className="text-center mt-5 "
                                    style={{
                                        gap: '10px',
                                        justifyContent: 'center'
                                    }}


                                >
                                    <Col style={{
                                        display: 'contents'
                                    }} >
                                        <Button
                                            variant=""
                                            className="add-Btnn"
                                            onClick={() => {
                                                setShowFirstDealerCode(true)
                                                setShowDealerCode(false)

                                            }}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                    <Col style={{
                                        display: 'contents'
                                    }}>
                                        <Button
                                            variant=""
                                            className="add-Btnn"
                                            onClick={handleNextButtonClick}
                                            disabled={!radioSelected || mobileError}
                                        >
                                            Next
                                        </Button>
                                    </Col>

                                </Row>
                            </Card>









                        </Col>
                    </>
                )}
            </Row>
        </Card >






            <Footer />




        </>



    )
}

export default DealerAndOem