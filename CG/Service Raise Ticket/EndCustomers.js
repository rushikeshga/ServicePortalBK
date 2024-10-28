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
import { usePathName } from "../../../constants";
import moment from "moment";
import Table from 'react-bootstrap/Table';


function EndCustomer() {
    const navigate = useNavigate();
    const pathName = usePathName();
    const [show, setShow] = useState(false);
    const [showEsclation, setShowEsclation] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showForm1, setShowForm1] = useState(false);
    const [serialNumber, setSeraialNu] = useState('')
    const [productCode, setProductCode] = useState('')

    const handleEsclationClose = () => setShowEsclation(false);
    const handleEsclationShow = () => setShowEsclation(true);

    const [showCustomer, setShowCustomer] = useState(false);
    const handleCloseCustomer = () => setShowCustomer(false);
    const handleShowCustomer = () => setShowCustomer(true);



    const handleRadioChange = () => {
        setShowForm(true);
        setShowForm1(false);
        setSeraialNu('')
        setProductCode('')
        localStorage.clear()

    };



    const handleRadio2Change = () => {
        setShowForm(false);
        setShowForm1(true);
        setSeraialNu('')
        setProductCode('')
        localStorage.clear()


    };


    // const handleChange = (event) => {
    //     const { value } = event.target;
    //     localStorage.setItem("RedirectedFrom", "value")
    //     // Regular expression to allow alphabets, digits, hyphen (-), and slash (/)
    //     const regex = /^[a-zA-Z0-9\-\/]*$/;
    //     if (regex.test(value) || value === "") {
    //         setSeraialNu(value);
    //         setErrorMessage("");
    //     } else {
    //         setErrorMessage(
    //             "Only alphabets, digits, hyphen (-), and slash (/) are allowed."
    //         );
    //     }
    // };

    const handleChange = (event) => {
        const { value } = event.target;
        localStorage.setItem("SrValue", value); // Set the actual value
        // Regular expression to allow alphabets, digits, hyphen (-), and slash (/)
        const regex = /^[a-zA-Z0-9\-\/]*$/;
        if (regex.test(value) || value === "") {
            setSeraialNu(value); // Assuming this is a typo and should be setSerialNu instead of setSeraialNu
            setErrorMessage("");
        } else {
            setErrorMessage(
                "Only alphabets, digits, hyphen (-), and slash (/) are allowed."
            );
        }
    };


    const handleChangeProductCode = (event) => {
        const { value } = event.target;
        localStorage.setItem("ProductValue", value); // Set the actual value
        // Regular expression to allow alphabets, digits, hyphen (-), and slash (/)
        const regex = /^[a-zA-Z0-9\-\_]*$/;

        if (regex.test(value) || value === "") {
            setProductCode(value);
            setErrorMessage1("");
        } else {
            setErrorMessage1(
                "Only alphabets, digits, hyphen (-), and Underscore (_) are allowed."
            );
        }
    };


    return (
        <>
            <NavBar />
            <Card

            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
            // style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >

                <Container fluid>
                    {/* <NavBar/> */}
                    <Row className="justify-content-start p-5 pt-0">
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



                        <Row className="justify-content-center"
                        // style={{
                        //     flexDirection: 'column',
                        //     alignItems: 'center'
                        // }}

                        >

                            <Col md={6}>
                                <p className="text-left pg-label-warranty pt-3">
                                    Please Enter Product Info
                                </p>

                                <Card className="p-4  add-style" style={{

                                    boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",

                                    borderRadius: '5px'
                                }}>
                                    <Row>
                                        <Col className="mt-3">
                                            <Form.Check // prettier-ignore
                                                type='radio'
                                                label="CG-Fans Pumps & Appliances"
                                                name="radioGroup"

                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '400',
                                                    fontSize: '12px',
                                                    textAlign: 'left'

                                                }}
                                                onClick={handleRadioChange}
                                            />

                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Check // prettier-ignore
                                                type='radio'
                                                label="LT FHP HT Motors "
                                                name="radioGroup"
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: '400',
                                                    fontSize: '12px',
                                                    textAlign: 'left'
                                                }}
                                                onClick={handleRadio2Change}
                                            />

                                        </Col>

                                    </Row>
                                    <Row className="text-start mt-3"
                                        style={{
                                            justifyContent: 'space-between'
                                            // flexDirection: 'column'
                                        }}
                                    >
                                        <Row style={{
                                            width: '50%'
                                        }} >
                                            <Col>
                                                <Form.Group style={{
                                                }}>
                                                    <Form.Label
                                                        style={{
                                                            color: '#fff',
                                                            fontWeight: '400'
                                                        }}
                                                    >
                                                        Enter Sr. No
                                                        <span className="req-t">*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        disabled={!showForm} // Conditionally disable based on radio button click

                                                        // value={serialNumber}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessage && (
                                                        <p style={{ color: "red" }}>{errorMessage}</p>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row style={{
                                            width: '50%',
                                            flexDirection: 'column',
                                            paddingLeft: '0px'
                                        }}>

                                            <Col >
                                                <Form.Group style={{
                                                }}>
                                                    <Form.Label
                                                        style={{
                                                            color: '#fff',
                                                            fontWeight: '400'
                                                        }}
                                                    >
                                                        Enter Sr. No
                                                        <span className="req-t">*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        disabled={!showForm1} // Conditionally disable based on radio button click
                                                        // value={serialNumber}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessage && (
                                                        <p style={{ color: "red" }}>{errorMessage}</p>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col >
                                                <Form.Group style={{
                                                }}>
                                                    <Form.Label
                                                        style={{
                                                            color: '#fff',
                                                            fontWeight: '400'
                                                        }}

                                                    >
                                                        Enter product code

                                                        <span className="req-t">*</span>

                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={productCode}
                                                        disabled={!showForm1}
                                                        onChange={handleChangeProductCode}
                                                    />
                                                    {errorMessage1 && (
                                                        <p style={{ color: "red" }}>{errorMessage1}</p>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                        </Row>







                                        <Row className="text-center mt-5 "
                                            style={{
                                                gap: '20px',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Col md={1}>
                                                <Button
                                                    variant=""
                                                    className="add-Btnn"
                                                    onClick={() => navigate(-1)}
                                                >
                                                    Back
                                                </Button>
                                            </Col>
                                            <Col md={1}>
                                                <Button
                                                    variant=""
                                                    className="add-Btnn"
                                                    onClick={() => {
                                                        if ((showForm && serialNumber === "") || (showForm1 && productCode === "")) {
                                                            Swal.fire({
                                                                icon: "error",
                                                                title:
                                                                    "Serial No. and Product Code are mandatory",
                                                            });
                                                        }
                                                        else {
                                                            if (serialNumber == "001" || productCode === '001') {
                                                                // handleShow()
                                                                handleShowCustomer()
                                                            }
                                                            else if (serialNumber == "002") {
                                                                navigate(`${pathName}/product-not-under-warranty`);
                                                            }
                                                        }
                                                        // else if (serialNumber == "003") {
                                                        //     navigate(`${pathName}/not-reg-for-warranty`);
                                                        // }

                                                    }}

                                                    disabled={errorMessage || errorMessage1}
                                                >
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Row>

                    <Modal show={show} onHide={handleClose} backdrop="static" size="xl" centered>
                        <Modal.Header>
                            <Modal.Title className='mdl-title'>Your existing open ticket details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Card
                                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                            >
                                <Row className="text-start">
                                    <Row className="mt-3">
                                        <Col
                                            className="br"
                                        >
                                            <h2 style={{
                                                fontSize: '16px',
                                                textAlign: 'center'
                                            }}>Customers Details</h2>
                                            <Col style={{
                                                gap: '20px',
                                                justifyContent: 'center'
                                            }} className="d-flex mt-3 p-0">
                                                <Form.Group
                                                >
                                                    <Form.Label>
                                                        Customer Name
                                                    </Form.Label>
                                                    <p
                                                        style={{
                                                            fontSize: '12px'
                                                        }}
                                                    >Parth</p>

                                                </Form.Group>
                                                <Form.Group
                                                >
                                                    <Form.Label>
                                                        Contact No
                                                    </Form.Label>
                                                    <p style={{
                                                        fontSize: '12px'
                                                    }}>7867875668</p>

                                                </Form.Group>
                                            </Col>
                                        </Col>

                                        <Col className="br">
                                            <h2 style={{
                                                fontSize: '16px',
                                                textAlign: 'center'
                                            }}>Assigned Service Center details</h2>
                                            <Col style={{
                                                gap: '20px',
                                                justifyContent: 'center'


                                            }} className="d-flex mt-3 p-0">
                                                <Form.Group

                                                >
                                                    <Form.Label>
                                                        ASC Name
                                                    </Form.Label>
                                                    <p style={{
                                                        fontSize: '12px'
                                                    }}>Editior ASC</p>
                                                    {/* <Form.Control className="border-0"
                                                        type="text"
                                                        value='Editior ASC'
                                                        disabled

                                                        maxLength={15}
                                                    /> */}
                                                </Form.Group>


                                                <Form.Group
                                                    style={{
                                                        width: "50%"
                                                    }}
                                                >
                                                    <Form.Label>
                                                        ASC Contact No
                                                    </Form.Label>
                                                    <p style={{
                                                        fontSize: '12px'
                                                    }}>5456765676</p>
                                                    {/* <Form.Control className="border-0"
                                                        type="text"
                                                        value='5456765676'
                                                        disabled

                                                        maxLength={15}
                                                    /> */}
                                                </Form.Group>
                                            </Col>
                                        </Col>
                                        <Col >
                                            <h2 style={{
                                                fontSize: '16px',
                                                textAlign: 'center'
                                            }}> CG Branch Area Service Manager</h2>
                                            <Col className="d-flex mt-3 "
                                                style={{
                                                    gap: '20px',
                                                    justifyContent: 'center'

                                                }}
                                            >
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        ASM  ticket
                                                    </Form.Label>
                                                    <p style={{
                                                        fontSize: '12px'
                                                    }}>GH23212</p>
                                                    {/* <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='GH23212'
                                                        disabled

                                                    /> */}
                                                </Form.Group>
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        Phone no the ASM
                                                    </Form.Label>
                                                    <p style={{
                                                        fontSize: '12px'
                                                    }}>908789786</p>
                                                    {/* <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='908789786'
                                                        disabled

                                                    /> */}
                                                </Form.Group>
                                            </Col>
                                        </Col>


                                    </Row>
                                    {/* <Row className="mt-3">
                                        <Col lg={6} className="">
                                            <h2 style={{
                                                fontSize: '16px',
                                                textAlign: 'center'
                                            }}> CG Branch Area Service Manager:</h2>
                                            <Col className="d-flex mt-3 "
                                                style={{
                                                    gap: '10px',
                                                }}
                                            >
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        ASM against the ticket
                                                    </Form.Label>
                                                    <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='GH23212'
                                                        disabled

                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        Phone number's the ASM
                                                    </Form.Label>
                                                    <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='908789786'
                                                        disabled

                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Col>




                                    </Row> */}
                                    <Row className="mt-3"
                                        style={{
                                            padding: '0px 0px 0px 20px'
                                        }}
                                    >
                                        <h2 style={{
                                            margin: '0px',
                                            fontSize: '16px',
                                            textAlign: 'left',
                                            textAlign: 'underline'
                                            // borderBottom:'1px solid'
                                        }}>Service Request</h2>
                                    </Row>

                                    <Row style={{
                                        padding: '0px 25px 0px 25px'
                                    }}>
                                        <Col className="mt-3">
                                            <Form.Group
                                                className="md:ml-2"

                                            >
                                                <Form.Label>
                                                    Service Request No
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>98YHTY</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    maxLength={15}
                                                    value='98YHTY'
                                                    disabled

                                                /> */}
                                            </Form.Group>

                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Group


                                            >
                                                <Form.Label>
                                                    Request date
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>17/05/2024</p>
                                                {/* <Form.Control className="border-0"
                                                    type="date"
                                                    value='17/05/2024'
                                                    disabled
                                                /> */}
                                            </Form.Group>

                                        </Col>


                                        <Col className="mt-3">
                                            <Form.Group

                                            >
                                                <Form.Label>
                                                    Issue type
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>None</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='None'
                                                    disabled
                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Group

                                            >
                                                <Form.Label>
                                                    Location
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>Mumbai</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='MUMBAI'
                                                    disabled

                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Group
                                                className="md:ml-2"


                                            >
                                                <Form.Label>
                                                    Product Type
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>Category</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='PLASTIC'
                                                    disabled

                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Group

                                            >
                                                <Form.Label>
                                                    Product Sr No
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>008</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='8767'
                                                    disabled

                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-3">
                                            <Form.Group

                                            >
                                                <Form.Label>
                                                    Warranty
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>In Warranty</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='In Warranty'
                                                    disabled



                                                /> */}
                                            </Form.Group>
                                        </Col>

                                        <Col className="mt-3">
                                            <Form.Group>
                                                <Form.Label>
                                                    Status
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>In Warranty</p>
                                                {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='In Warranty'
                                                    disabled

                                                /> */}
                                            </Form.Group>
                                        </Col>


                                    </Row>



                                </Row>


                            </Card>



                        </Modal.Body>
                        <Modal.Footer style={{
                            justifyContent: 'center'
                        }}>
                            <Button variant="" className='add-Btn' onClick={handleClose} >
                                OK
                            </Button>
                            <Button variant="" className='add-Btn' onClick={handleEsclationShow} >
                                ESCLATE
                            </Button>




                        </Modal.Footer>

                    </Modal>


                    <Modal show={showEsclation} onHide={handleEsclationClose} size="l" centered >
                        <Modal.Body>

                            Your request for escalation of service request has been received, we will get back to you soon.


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='add-Btn' onClick={handleEsclationClose} >
                                OK
                            </Button>


                        </Modal.Footer>

                    </Modal>

                    <Modal show={showCustomer} onHide={handleCloseCustomer} size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Complaint number & ASC contact details </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Card
                                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                            >
                            <Row
                                className='text-start p-2'>
                                <Col className="mt-3" md={12}>
                                    <h3 style={{
                                        fontSize: '16px'
                                    }}>Your complaint has been registered with Service Request number: <span className="text-left pg-label-warranty " style={{
                                        fontStyle: '500'
                                    }}>TY6565</span> </h3>
                                </Col>
                                <Col className="mt-3" md={12}>
                                    <h3 style={{
                                        fontSize: '16px'
                                    }}>Your complaint will be resolved by CG Authorised Service Contractor: <span className="text-left pg-label-warranty " style={{
                                        fontStyle: '500'
                                    }}>None</span></h3>
                                </Col>
                                <Col className="mt-3" md={12}>
                                    <h3 style={{
                                        fontSize: '16px'
                                    }}>ASC Name:<span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>None</span></h3>
                                </Col>
                                <Col className="mt-3" md={12}>
                                    <h3 style={{
                                        fontSize: '16px'
                                    }}
                                    >ASC Contact Number:<span className="text-left pg-label-warranty " style={{
                                        // color:'gray',
                                        // fontSize:'18px',
                                        fontStyle: '500'
                                    }}>9878678756</span></h3>
                                </Col>

                                <Col className="mt-3" style={{
                                        fontSize: '16px',
                                        fontWeight:'500'
                                        
                                    }}><p className="text-center  mt-3">Happy Code is sent to your registered mobile number, please share the same with our technician during closure of your complaint.</p></Col>


                            </Row>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>

                            <Row style={{
                                width: '-webkit-fill-available'
                            }} className='text-center'>
                                <Col>
                                    <Button variant="" className='add-Btn' onClick={() => {
                                        handleCloseCustomer()
                                    }}>
                                        Ok
                                    </Button>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>








                </Container>
            </Card>
        </>
    );
}

export default EndCustomer;
