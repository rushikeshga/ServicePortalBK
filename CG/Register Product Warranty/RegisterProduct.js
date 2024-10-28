import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Modal,
    Row
} from "react-bootstrap";
import { Tooltip } from "@mui/material";
import NavBar from "../Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEdit, FaEye } from "react-icons/fa";
import { usePathName } from "../../../constants";
import moment from "moment";
import { IoAlertCircle } from "react-icons/io5";
import Loader from "../../loader";
import Footer from "../footer";
import { event } from "jquery";

function RegisterProduct() {
    const navigate = useNavigate();
    const pathName = usePathName();
    const [division, setdivision] = useState("");

    let RedirectionRoute = localStorage.getItem("RedirectedFrom");

    let RedirectionRouteName = localStorage.getItem("RedirectedName");


    const [srNo, setSrNo] = useState("");


    const [productCode, setproductCode] = useState("");


    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
    const [productTypes, setProductTypes] = useState([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const [minInvoiceDate, setMinInvoiceDate] = useState();

    const [prevSrNoOnBlur, setPrevSrNoOnBlur] = useState("");
    const [prevProductCodeOnBlur, setPrevProductCodeOnBlur] = useState("");

    const [SrNoOnBlur, setSrNoOnBlur] = useState("");
    const [ProductCodeOnBlur, setProductCodeOnBlur] = useState("");
    const [disableInvoiceDate, setDisableInvoiceDate] = useState(true);
    const [file, setFile] = useState();
    const [previewfile, setPreviewfile] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "Division/GetAllProductType")
            .then(res => res.json())
            .then(result => {
                setProductTypes(result);
                console.log(result)
            });
    }, []);








    useEffect(() => {
        localStorage.removeItem("ProductDataProdRegAutoId")
    }, [])

    // const isInitialMount = useRef(true);
    // const handlePopStateRef = useRef();

    // const removeOtpKeys = () => {
    //   console.log('Back button clicked');
    // //   localStorage.removeItem('otpVerified');
    // //   localStorage.removeItem('otp');
    // //   localStorage.removeItem('allProducts');
    // };

    // // Store the popstate handler in a ref to maintain a consistent reference
    // handlePopStateRef.current = () => {

    //     removeOtpKeys();

    // };

    // useEffect(() => {
    //   // Function to be used as the event handler
    //   const handlePopState = () => handlePopStateRef.current();

    //   if (isInitialMount.current) {
    //     window.addEventListener('popstate', handlePopState);
    //     isInitialMount.current = false;
    //   }

    //   // Cleanup the event listener on unmount
    //   return () => {
    //     window.removeEventListener('popstate', handlePopState);
    //   };
    // }, []);

    // const clearHistory = () => {
    //     const currentPath = window.location.pathname;
    //     window.history.pushState(null, '', currentPath);
    //   };

    //   useEffect(()=>{
    //     clearHistory();
    //   },[])

    useEffect(() => {
        setPrevSrNoOnBlur(srNo);
        setPrevProductCodeOnBlur(productCode);
    }, [SrNoOnBlur, ProductCodeOnBlur]);

    const handleBlur = (e) => {
        if (e.target.name == "srNo") {
            setMinimumInvoiceDate(true, false, false, e.target.value);
            setSrNoOnBlur(e.target.value);
        }
        else if (e.target.name == "productCode") {
            setMinimumInvoiceDate(false, true, false, e.target.value);
            setProductCodeOnBlur(e.target.value);
        }
        else {
            setMinimumInvoiceDate(false, false, true, e.target.value);
        }
        //console.log(event.target.value);
    };

    function useDebounce(callback, delay) {
        const [timeoutId, setTimeoutId] = useState(null);

        return function debouncedCallback(...args) {
            clearTimeout(timeoutId);
            const id = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimeoutId(id);
        };
    }

    //   const handleBlur = useDebounce((e, productType) => {
    //     // console.log(event.target.value);
    //     if(e.target.name == "srNo"){
    //         setMinimumInvoiceDate(true, false ,false, e.target.value);
    //         setSrNoOnBlur( e.target.value);
    //     }
    //     else if(e.target.name == "productCode"){
    //         setMinimumInvoiceDate(false, true, false, e.target.value); 
    //         setProductCodeOnBlur(e.target.value);
    //     }
    //     else{
    //         setMinimumInvoiceDate(false, false, true, e.target.value); 
    //     }
    //     //setfilterVendorName(event.target.value);
    //     // Your logic here
    //   }, 500)

    const setDisabledSubmit = () => {
        if (warranty == "Out of warranty" || warranty == "") {
            return false;
        }
        else {
            return disableInvoiceDate;
        }
    }
    const setMinimumInvoiceDate = (isSrNo, isProductCode, isProductType, value) => {
        let productType = selectedOption;
        if (isSrNo && prevSrNoOnBlur == value) {
            return;
        }
        else if (isProductCode && prevProductCodeOnBlur == value) {
            return;
        }
        else if (isProductType) {
            productType = value;
        }
        if (srNo.length != "" && productCode.length != "" && productType != "") {
            setDisableInvoiceDate(true);
            const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdSerialNo?ProductSerialNo=${srNo}&${(productCode && productCode != 0) ? `ProductCode=${productCode}` : ""}&DivisionCode=${productType}`;
            fetch(getProdDetailUrl)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    //setsrNoDetails(result)



                    // if (result?.msgCode == "SP001") {
                    //     navigate(`${pathName}/not-reg-for-warranty`);
                    // }
                    // else
                    if (result.status == 404) {
                        Swal.fire({
                            icon: 'error',
                            title: result?.title
                        })
                    }
                    else if (result?.msgCode == "SAP404") {
                        Swal.fire({
                            icon: "error",
                            title: result?.msg
                        })
                        setloading(false)
                        setDisableInvoiceDate(false)

                    }
                    else {
                        let a = result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate;
                        if (result?.msgCode == "SP200") {
                            a = moment(a).format("YYYY-MM-DD")
                        }
                        let d1 = new Date(a);
                        let d2 = new Date(inWarrantyDetails.customerInvDate);
                        setMinInvoiceDate(a);
                        setDisableInvoiceDate(false);
                        if (d1 > d2) {
                            setinWarrantyDetails((pre) => {
                                return {
                                    ...pre,
                                    customerInvDate: ""
                                }
                            }
                            )
                        }
                    }
                    // else {

                    //     Swal.fire({
                    //         icon: "error",
                    //         title: result?.Message
                    //     })
                    // }


                    // else if(result?.msgCode=="SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="Out Of Warranty"){
                    //   // navigate(`${pathName}/not-reg-for-warranty`);

                    // }
                    // // else if(result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="0"){

                    // }
                })
        }
    }
    const handleChange = (event) => {
        const { value } = event.target;
        localStorage.setItem("SrValue", value);
        // Regular expression to allow alphabets, digits, hyphen (-), and slash (/)
        const regex = /^[a-zA-Z0-9\-\/]*$/;
        if (regex.test(value) || value === "") {
            setSrNo(value);
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
        const regex = /^[a-zA-Z0-9\-\_\.]*$/;

        if (regex.test(value) || value === "") {
            setproductCode(value);
            setErrorMessage1("");
        } else {
            setErrorMessage1(
                "Only alphabets, digits, hyphen (-), and Underscore (_) are allowed."
            );
        }
    };

    const [show, setShow] = useState(false);
    const [showEsclation, setShowEsclation] = useState(false);
    const [showRegistered, setShowRegistered] = useState(false);
    const [showExistingTicket, setshowExistingTicket] = useState(false);
    const [ticketDetails, setTicketDetails] = useState({});

    const [showWarrantyRequest, setshowWarrantyRequest] = useState(false);

    const handleShowWarrantyRequest = () => setshowWarrantyRequest(true);
    const handleCloseWarrantyRequest = () => setshowWarrantyRequest(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRegisteredClose = () => setShowRegistered(false);
    const handleRegisteredShow = () => setShowRegistered(true);
    const handleEsclationShow = () => {
        setShowEsclation(true);
    };
    const handleShowExistingTicket = (msgCode) => {
        const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketByIdUnauthorize?ServiceTickeId=${msgCode}`;
        fetch(getProdDetailUrl)
            .then((res) => res.json())
            .then((result) => {

                //localStorage.setItem("ticketDetails", JSON.stringify(result));
                let filterTicketBySerNo = result.filter((obj) => obj.sernr == srNo);
                setTicketDetails(filterTicketBySerNo[0]);
                console.log(result);
            });
        setshowExistingTicket(true);

    };
    const handleCloseExistingTicket = () => setshowExistingTicket(false);
    const handleEsclationClose = () => setShowEsclation(false);




    const [showAlreadyReg, setShowAlreadyReg] = useState(false);

    const handleCloseAlreadyReg = () => setShowAlreadyReg(false);
    const handleShowAlreadyReg = () => setShowAlreadyReg(true);




    const [productDetails, setproductDetails] = useState([])


    const [showForm, setShowForm] = useState(false);
    const [showForm1, setShowForm1] = useState(false);
    const handleRadioChange = () => {
        setShowForm(true);
        setShowForm1(false);
        setproductCode('')
        setSrNo('')
        // localStorage.removeItem("SrValue");
        // localStorage.removeItem("ProductValue");
    };



    const handleRadio2Change = () => {
        setShowForm(false);
        setShowForm1(true);
        setSrNo('');
        //localStorage.removeItem("SrValue");
    };



    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);

        console.log(selectedOption);
        setShowForm(value !== ''); // Show the form field if an option is selected
        handleBlur(event)
    };
    const dealername = localStorage.getItem('DealerOrOEMName')
    const dealerAdd = localStorage.getItem('DealerOrOEMAdd')


    const [warranty, setwarranty] = useState("")


    const [srNoDetails, setsrNoDetails] = useState([])

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = reject
        })
    }

    const [productType, setproductType] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}Division/GetAllProductType`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setproductType(result)
            })
    }, [])



    const [inWarrantyDetails, setinWarrantyDetails] = useState({
        purchaseFrom: "",
        customerInvNo: "",
        customerInvDate: "",
        customerInvFile: "",

    })


    const [loading, setloading] = useState(false)

    // setTimeout(() => {
    //     setloading(false)

    // }, 2000);



    const [Dealers, setDealers] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerUnauthorize`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setDealers(result)
            })
    }, [])



    const [prodType, setprodType] = useState("")

    return (
        <>
            <NavBar />





            <Card
                className="border-0  p-2  mt-0 mx-3"
                //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
                {/* <NavBar/> */}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <p style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }} className="text-start  m-0">
                            {RedirectionRoute == "RaiseServiceTicket" ? "Book your service request" : "Register Product warranty"}
                        </p>

                    </div>

                    {RedirectionRoute === "RaiseServiceTicket" && (
                        <div style={{ maxWidth: "300px" }}>
                            <>
                                <h4 style={{
                                    fontSize: '18px',
                                }}>
                                    {RedirectionRouteName === "DealerName"
                                        ? dealername
                                        : RedirectionRouteName === "RetailerName"
                                            ? ''
                                            : ""}
                                </h4>
                                <h4 style={{
                                    fontSize: '12px',
                                    // width: '400px'
                                }}>
                                    {RedirectionRouteName === "DealerName"
                                        ? dealerAdd
                                        : RedirectionRouteName === "RetailerName"
                                            ? ''
                                            : ""}
                                </h4>

                                {/* <h4>{RedirectionRouteName == "DealerName" ? dealername : "CustomerName"}
                                    </h4> */}
                                {/* <h4 style={{
                                        fontSize: '12px',
                                        width: '400px'
                                    }} >                                     {dealerAdd}
                                    </h4> */}



                            </>


                        </div>
                    )}

                </div>
                <hr />

                <Row className="justify-content-center text-left">
                    <Col md={8}>
                        <Row className="mt-3"><p> <strong>Note:</strong> Please select your product type and enter corresponding details </p></Row>



                        <Card className="p-4	add-style" >

                            {/* <Row className="justify-content-center">
                                <Col md={10}>

                                    <div className="d-flex justify-content-between" style={{ color: "white" }}>

                                        <Form.Check type="radio" name="productType" label="CG Fans, Pumps & Appliances" value="CG Fans, Pumps & Appliances" onChange={(e) => {
                                            setSrNo("")
                                            setprodType(e.target.value)
                                        }} />

                                        <Form.Check type="radio" name="productType" label="FHP Motor 1Ph, LT-3Ph, HT, DC Motor, EV Motors, Alternator, Drives" value="FHP Motor 1Ph, LT-3Ph, HT, DC Motor, EV Motors, Alternator, Drives" onChange={(e) => {
                                            setSrNo("")

                                            setprodType(e.target.value)
                                        }} />


                                    </div>

                                    {prodType ? <Row className="justify-content-center mt-3">
                                        <Col md={prodType == "CG Fans, Pumps & Appliances" ? 4 : 8}>

                                            <Row>
                                                <Col>

                                                    <Form.Group style={{}}>
                                                        <Form.Label style={{
                                                            color: '#fff',
                                                            fontWeight: '400'
                                                        }}>
                                                            Enter Sr. No
                                                            <span className="req-t">*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            readOnly={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                                                            // value={srNo}
                                                            name="srNo"
                                                            value={srNo}
                                                            onChange={handleChange}
                                                        // onBlur={handleBlur}
                                                        />
                                                        {errorMessage && (
                                                            <p style={{ color: "red" }}>{errorMessage}</p>
                                                        )}

                                                    </Form.Group>
                                                </Col>
                                                {prodType == "FHP Motor 1Ph, LT-3Ph, HT, DC Motor, EV Motors, Alternator, Drives" ? <Col>

                                                    <Form.Group style={{
                                                        // marginTop: '10px'
                                                    }}>
                                                        <Form.Label
                                                            style={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                fontWeight: '400'
                                                            }}
                                                        >
                                                            Enter {selectedOption == "CP" || selectedOption == "CP" || selectedOption == "CP" ? "model No." : "product code"}
                                                            <span className="req-t">*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            readOnly={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                                                            name="productCode"
                                                            value={productCode}
                                                            onChange={handleChangeProductCode}
                                                        // onBlur={handleBlur} 
                                                        />
                                                        {errorMessage1 && (
                                                            <p style={{ color: "red" }}>{errorMessage1}</p>
                                                        )}
                                                    </Form.Group>


                                                </Col> : ""}
                                            </Row>
                                        </Col>
                                    </Row> : ""}




                                </Col>
                            </Row> */}


                            <Row className="justify-content-center text-left   "
                            // style={{
                            //     // flexDirection: 'column',
                            //     alignItems: 'center'
                            // }}

                            >

                                <Col className="" lg={4} sm={12} md={4}>
                                    <Form.Group className="mt-2">
                                        <Form.Label style={{
                                            color: '#fff',
                                            fontWeight: '500'

                                        }}>

                                            Product type
                                        </Form.Label><span className="req-t">*</span>
                                        <Form.Select
                                            disabled={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">Select</option>
                                            {
                                                productType?.map((ptype, i) => {
                                                    return (
                                                        <>
                                                            <option value={ptype?.divisionCode}>{ptype?.productLineName}</option>

                                                        </>
                                                    )
                                                })
                                            }

                                        </Form.Select>
                                    </Form.Group>
                                </Col>




                            </Row>


                            {showForm && (
                                <>
                                    <Row className={` justify-content-center align-items-center ${(RedirectionRoute == "RegisterProduct" || !RedirectionRoute) ? `justify-content-center align-items-center` : ``} text-left mt-3`}>
                                        <Col md={8} >
                                            <Row className="justify-content-center m-0 p-0  ">

                                                <Col md={4} className="mt-1">
                                                    <Form.Group style={{}}>
                                                        <Form.Label style={{
                                                            color: '#fff',
                                                            fontWeight: '400'
                                                        }}>
                                                            Enter Sr. No
                                                            {/* <span className="req-t">*</span> */}
                                                        </Form.Label>
                                                        <Form.Control
                                                            autoComplete="off"
                                                            type="text"
                                                            readOnly={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                                                            // value={srNo}
                                                            name="srNo"
                                                            value={srNo}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {errorMessage && (
                                                            <p style={{ color: "red" }}>{errorMessage}</p>
                                                        )}

                                                    </Form.Group>
                                                </Col>

                                                <Col md={4} className="mt-1">
                                                    <Form.Group style={{

                                                    }}>
                                                        <Form.Label
                                                            style={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                fontWeight: '400'
                                                            }}
                                                        >
                                                            Enter {selectedOption == "CP" || selectedOption == "CP" || selectedOption == "CP" ? "model No." : "product code"}
                                                            {/* <span className="req-t">*</span> */}
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            autoComplete="off"
                                                            
                                                            readOnly={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                                                            name="productCode"
                                                            value={productCode}
                                                            onChange={handleChangeProductCode}
                                                            onBlur={handleBlur} />
                                                        {errorMessage1 && (
                                                            <p style={{ color: "red" }}>{errorMessage1}</p>
                                                        )}
                                                    </Form.Group>

                                                </Col>
                                            </Row>
                                        </Col>



                                        {/* {(RedirectionRoute == "RegisterProduct" || !RedirectionRoute) ? "" :
                                                <Col md={4} className="mt-3">
                                                    <Form.Group style={{
                                                        // marginTop: '10px'
                                                    }}>
                                                        <Form.Label
                                                            style={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                fontWeight: '400'
                                                            }}
                                                        >
                                                            warranty Status
                                                            <span className="req-t">*</span>
                                                        </Form.Label>
                                                        <Form.Select

                                                            // disabled={!showForm1}
                                                            // value={productCode}
                                                            onChange={(e) => {
                                                                setwarranty(e.target.value)

                                                            }}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="In-warranty">In-warranty</option>
                                                            <option value="Out of warranty">Out of warranty</option>
                                                        </Form.Select>

                                                    </Form.Group>

                                                </Col>} */}





                                    </Row>



                                </>

                            )}
                            <Row className="text-start mt-3"
                                style={{
                                    justifyContent: 'center'
                                }}
                            >
                                <Row className="text-center mt-5 "
                                    style={{
                                        gap: '10px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Col style={{
                                        display: 'contents'
                                    }} md={1}>
                                        <Button
                                            variant=""
                                            className="add-Btnn"

                                            onClick={() => {
                                                if (localStorage.getItem("RedirectedFrom") == "RegisterProduct") {
                                                    navigate(`${pathName}/add-customer`);
                                                }
                                                else {
                                                    navigate(`${pathName}/raise-request`);
                                                    //navigate(-1);
                                                }
                                            }}


                                        >



                                            Back

                                        </Button>
                                    </Col>


                                    {
                                        showForm && (
                                            <Col style={{
                                                display: 'contents'
                                            }} md={1}>
                                                {/* {((RedirectionRoute == "RegisterProduct" || !RedirectionRoute) && srNoDetails?.msgCode == "SP001") ? "" :  */}
                                                <Button
                                                    variant=""
                                                    className="add-Btnn"
                                                    // disabled={(showForm && errorMessage) || (showForm1 && (!srNo || !productCode))}
                                                    disabled={errorMessage || errorMessage1 || setDisabledSubmit()}
                                                    onClick={(e) => {
                                                        // if (srNo == "") {
                                                        //     Swal.fire({
                                                        //         icon: "error",
                                                        //         title: "Please fill all the fields makred with red *!",
                                                        //     });
                                                        // }
                                                        // if (srNo === "003" || productCode === '003') {
                                                        //     navigate(`${pathName}/product-not-under-warranty`);

                                                        // }

                                                       
                                                            if (localStorage.getItem("RedirectedFrom") == "RegisterProduct" || !RedirectionRoute) {

                                                                setloading(true)

                                                                // const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdSerialNo?ProductSerialNo=${srNo}&ProductCode=${prodType == "CG Fans, Pumps & Appliances" ? 0 : productCode}&DivisionCode=${""}`;
                                                                const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdSerialNo?ProductSerialNo=${srNo}&ProductCode=${productCode ? productCode : 0}&DivisionCode=${selectedOption}`
                                                                fetch(getProdDetailUrl)
                                                                    .then((res) => res.json())
                                                                    .then((result) => {
                                                                        console.log(result);
                                                                        setsrNoDetails(result)
                                                                        if (result?.prodSerialNoWarrantyList) {
                                                                            setproductDetails(result?.prodSerialNoWarrantyList)
                                                                            localStorage.setItem("productDetails", JSON.stringify(result?.prodSerialNoWarrantyList));
                                                                            setloading(false)

                                                                        }
                                                                        if (result?.msg && result?.msgCode) {
                                                                            var ProductWarrentyStatuMsgsobj = {
                                                                                msg: result?.msg,
                                                                                msgCode: result?.msgCode
                                                                            }
                                                                            localStorage.setItem("ProductWarrentyMsg", JSON.stringify(ProductWarrentyStatuMsgsobj));
                                                                            // setloading(false)

                                                                        }


                                                                        if (result?.msgCode == "SP001") {
                                                                            navigate(`${pathName}/not-reg-for-warranty`);
                                                                        }
                                                                        // else
                                                                        else if (result?.msgCode == "SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus == "In Warranty") {
                                                                            handleShow();
                                                                            // setloading(false)

                                                                        }
                                                                        else if (result?.msgCode == "SP200" && result?.msg == "Already Register in System") {
                                                                            handleRegisteredShow()
                                                                            setloading(false)

                                                                        }
                                                                        else if (result?.msgCode == "SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus == "In progress") {
                                                                            navigate(`${pathName}/warranty-verification`);
                                                                            setloading(false)


                                                                        }
                                                                        else if (result?.msgCode == "SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus == "Out Of Warranty") {
                                                                            handleShowWarrantyRequest();
                                                                            setloading(false)

                                                                        }
                                                                        else if (result?.msgCode == "SAP404") {
                                                                            Swal.fire({
                                                                                icon: "error",
                                                                                title: result?.msg
                                                                            })
                                                                            setloading(false)


                                                                        }
                                                                        // else {

                                                                        //     Swal.fire({
                                                                        //         icon: "error",
                                                                        //         title: result?.Message
                                                                        //     })
                                                                        // }


                                                                        if (showForm) {
                                                                            localStorage.removeItem("ProductValue");

                                                                        }
                                                                        // else if(result?.msgCode=="SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="Out Of Warranty"){
                                                                        //   // navigate(`${pathName}/not-reg-for-warranty`);

                                                                        // }
                                                                        // // else if(result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="0"){

                                                                        // }
                                                                    })
                                                            }
                                                            else if (localStorage.getItem("RedirectedFrom") == "RaiseServiceTicket") {
                                                                // if (warranty == "") {
                                                                //     Swal.fire({
                                                                //         icon: "error",
                                                                //         title: "Please select warranty status!"
                                                                //     })
                                                                // }
                                                                // else if (warranty == "In-warranty" && (inWarrantyDetails?.purchaseFrom == "" || inWarrantyDetails?.customerInvNo == "" || inWarrantyDetails?.customerInvDate == "" || inWarrantyDetails?.customerInvFile == "")) {
                                                                //     Swal.fire({
                                                                //         icon: 'error',
                                                                //         title: "Please fill all the fields marked with red *!"
                                                                //     })
                                                                // }


                                                                // const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetServiceTicketProdSerialNo?ProductSerialNo=${srNo}&ProductCode=${prodType == "CG Fans, Pumps & Appliances" ? 0 : productCode}&DivisionCode=${""}`;
                                                                // setloading(true)
                                                                const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetServiceTicketProdSerialNo?ProductSerialNo=${srNo}&ProductCode=${productCode ? productCode : 0}&DivisionCode=${selectedOption}`
                                                                // const getProdDetailUrl = `${process.env.REACT_APP_API_URL}TelecallerServiceTicket/GetServiceTicketTelecallerProdSerialNoUnauthorized?ProductSerialNo=${srNo? srNo : ''}&ProductCode=${productCode ? productCode : 0}&productLineCode=${0}&DivisionCode=${selectedOption}`
                                                                fetch(getProdDetailUrl)
                                                                    .then((res) => res.json())
                                                                    .then((result) => {
                                                                        console.log(result);
                                                                        if (result?.prodSerialNoWarrantyList) {
                                                                            setproductDetails(result?.prodSerialNoWarrantyList)
                                                                            localStorage.setItem("productDetails", JSON.stringify(result?.prodSerialNoWarrantyList));
                                                                            // setloading(false)


                                                                        }
                                                                        if (result?.msg && result?.msgCode) {
                                                                            var ProductWarrentyStatuMsgsobj = {
                                                                                msg: result?.msg,
                                                                                msgCode: result?.msgCode
                                                                            }
                                                                            localStorage.setItem("ProductWarrentyMsg", JSON.stringify(ProductWarrentyStatuMsgsobj));
                                                                            // setloading(false)

                                                                        }

                                                                        if (result?.msg == "Service Ticket Available") {


                                                                            handleShowExistingTicket(result?.msgCode);
                                                                            // setloading(false)

                                                                        }

                                                                        else if (result?.prodSerialNoWarrantyList && (result?.prodSerialNoWarrantyList[0]?.warrantyStatus === "Out Of Warranty" ||
                                                                            result?.prodSerialNoWarrantyList[0]?.warrantyStatus === "In progress")
                                                                        ) {
                                                                            navigate(`${pathName}/product-not-under-warranty`);
                                                                            // setloading(false)

                                                                        }



                                                                        else if (result?.msgCode == "SP001") {
                                                                            // setTimeout(() => {
                                                                            //     setloading(false)

                                                                            // }, 4000);
                                                                            localStorage.removeItem('ProductDataProdRegAutoId');
                                                                            navigate(`${pathName}/not-reg-for-warranty`);


                                                                        }

                                                                        else if (result?.msg == "Already Register in System" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus == "In Warranty") {
                                                                            // setTimeout(() => {
                                                                            //     setloading(false)

                                                                            // }, 4000);
                                                                            localStorage.removeItem('ProductDataProdRegAutoId');
                                                                            navigate(`${pathName}/not-reg-for-warranty`);


                                                                        }
                                                                        else if (result?.msgCode == "SAP404") {
                                                                            Swal.fire({
                                                                                icon: "error",
                                                                                title: result?.msg
                                                                            })
                                                                            setloading(false)


                                                                        }
                                                                        else {

                                                                            Swal.fire({
                                                                                icon: "error",
                                                                                title: result?.Message
                                                                            })
                                                                            // setloading(false)

                                                                        }

                                                                        if (showForm) {
                                                                            localStorage.removeItem("ProductValue");
                                                                        }

                                                                        // // else if(result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="0"){

                                                                        // }
                                                                    })


                                                            }
                                                            // Swal.fire({
                                                            //     icon:"error",
                                                            //     title:"Serial No. is mandatory"
                                                            // })
                                                        
                                                        // else if (srNo == "11111111" && productCode == "InW") {
                                                        //   handleShow();
                                                        // } else if(srNo == "22222222" && productCode == "OW") {
                                                        //   navigate(`${pathName}/not-reg-for-warranty`);
                                                        // }
                                                        // else if(srNo == "33333333" && productCode == "Reg"){
                                                        //   handleShowAlreadyReg()
                                                        // }
                                                        // console.log(srNoDetails.prodSerialNoWarrantyList);
                                                    }}

                                                >
                                                    {/* {(RedirectionRoute == "RegisterProduct" || !RedirectionRoute) ? "Verify" : */}
                                                    Submit
                                                    {/* //  } */}
                                                </Button>
                                                {/* } */}
                                                {/* {((RedirectionRoute == "RegisterProduct" || !RedirectionRoute) && srNoDetails?.msgCode == "SP001") ? 
                            <Button variant="" 
                                className="add-Btnn" 
                                
                                onClick={() => {

                                    if(inWarrantyDetails?.purchaseFrom=="" || inWarrantyDetails?.customerInvNo=="" || inWarrantyDetails?.customerInvDate=="" || inWarrantyDetails?.customerInvFile==""){
                                        Swal.fire({
                                            icon:"error",
                                            title:"Please fill all the fields marked with red *!"
                                        })
                                    }
                                    else{


                                    localStorage.removeItem('ProductDataProdRegAutoId');
                                }


                            }}>Submit</Button> : ""} */}
                                            </Col>

                                        )
                                    }




                                </Row>

                            </Row>



                        </Card>

                    </Col>
                </Row>






                <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        {/* <Row className="text-end">
                                    <Col>
                                        <Button
                                            variant=""
                                            className="add-Btn"
                                            onClick={() => {
                                                setSrNo("");
                                                setproductCode("");
                                                handleClose();
                                            }}
                                        >
                                            Add another product
                                        </Button>
                                    </Col>
                                </Row>
                                <hr /> */}
                        <Row className="mt-3">
                            <Col xl={4} lg={4} sm={12}>
                                <Card
                                    className="p-2"
                                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                                >
                                    <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                                        <div
                                            style={{ backgroundColor: "white", borderRadius: "8px" }}
                                            className="p-3"
                                        >
                                            {/* <Row className='text-end m-0'>
  <Col>
  <Button variant=''><FaEdit/></Button>
  </Col>
</Row> */}
                                            <Row>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Product model
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.matnr}
                                                    </p>
                                                </Col>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Product SN
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.sernr}
                                                    </p>
                                                </Col>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Product type
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.productLineName}
                                                    </p>
                                                </Col>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Frame size
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.frame}
                                                    </p>
                                                </Col>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Pole
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.pole}
                                                    </p>
                                                </Col>
                                                <Col md={4} sm={4}>
                                                    <p className="m-0" style={{ fontSize: "14px" }}>
                                                        Voltage
                                                    </p>
                                                    <p className="mt-1" style={{ fontWeight: "500" }}>
                                                        {productDetails[0]?.kw} kw
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Card>
                            </Col>
                            <Col xl={8} lg={8} sm={12}>
                                <Card
                                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                                    className="p-5"
                                >
                                    <p
                                        className="text-center"
                                        style={{ fontSize: "16px", fontWeight: "700" }}
                                    >
                                        Welcome to the CG family and thank you for being a valuable
                                        customer
                                    </p>
                                    <hr />

                                    <p
                                        className="text-center mt-2"
                                        style={{ fontSize: "14px", fontWeight: "500" }}
                                    >
                                        Your product warranty is valid upto <u>{moment((productDetails[0]?.warrantyEndBatch?.split(" ")[0])).format("DD-MM-YYYY")}</u> , Click
                                        below to get List of Service offering CGPISL.
                                    </p>

                                    <Row className="text-center">
                                        <Col>
                                            <Button variant="" className="add-Btn">
                                                <a
                                                    href="https://somcg.mzservices.net/landingpage/landingpage"
                                                    target="_blank"
                                                >
                                                    Click here
                                                </a>
                                            </Button>
                                        </Col>
                                    </Row>

                                    <p
                                        className="text-center mt-5"
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: "red",
                                        }}
                                    >
                                        For any assistance required for your CG product, please call
                                        our customer care number 1800 267 0505 OR CLICK below to
                                        raise a Service Request.
                                    </p>

                                    <Row className="text-center">
                                        <Col>
                                            <Button variant="" className="add-Btn" onClick={() => {
                                                navigate(`${pathName}/raise-request`);
                                                localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")

                                            }} >
                                                Click here
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    {/* <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
                </Modal>

                <Modal show={showWarrantyRequest} onHide={handleCloseWarrantyRequest} size="xl" centered>
                    {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <Row className="text-center">
                            <Col>
                                <FaCheckCircle color="green" fontSize={30} />
                            </Col>
                        </Row>
                        <p className="text-center mt-3" style={{ fontWeight: "500" }}>
                            Your warranty request is registered successfully. You will get
                            notification by SMS once verification will be completed by CGPISL
                            team. Please bear with us.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="text-center">
                            <Col>
                                <Button
                                    variant=""
                                    className="add-Btn"
                                    onClick={() => {
                                        navigate(`${pathName}/add-customer`);
                                    }}
                                >
                                    Continue
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>


                <Modal show={showAlreadyReg} onHide={handleCloseAlreadyReg} backdrop="static" centered size="lg">
                    <Modal.Body>
                        <p className="text-center" style={{ fontSize: "14px", fontWeight: "500" }}>Your product’s warranty registration request is under process; we will get back to you soon!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className="add-Btn" onClick={handleCloseAlreadyReg}>Ok</Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={showExistingTicket} onHide={handleCloseExistingTicket} backdrop="static" size="xl" centered>
                    <Modal.Header>
                        <Modal.Title className='mdl-title' style={{
                            fontSize: '20px'
                        }}>Your existing open Service Request:
                            <p className="m-0" style={{ fontSize: '16px', color: '#000' }}> Please contact our ASC / ASM for further assistance </p></Modal.Title>
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
                                                    Company Name
                                                </Form.Label>
                                                <p
                                                    style={{
                                                        fontSize: '12px'
                                                    }}
                                                >{ticketDetails.customerName}</p>

                                            </Form.Group>
                                            <Form.Group
                                            >
                                                <Form.Label>
                                                    Contact No
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>{ticketDetails.primaryMobileNo}</p>

                                            </Form.Group>
                                        </Col>
                                    </Col>
                                    {/* {ticketDetails.ascName != "" || ticketDetails.ascMobileNo != "" ? */}
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
                                                }}>{ticketDetails.ascName}</p>
                                                {/* <Form.Control className="border-0"
                                                            type="text"
                                                            value='Editior ASC'
                                                            disabled

                                                            maxLength={15}
                                                        /> */}
                                            </Form.Group>


                                            <Form.Group
                                            // style={{
                                            //     width: "50%"
                                            // }}
                                            >
                                                <Form.Label>
                                                    Contact No
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>{ticketDetails.ascMobileNo}</p>
                                                {/* <Form.Control className="border-0"
                                                            type="text"
                                                            value='5456765676'
                                                            disabled

                                                            maxLength={15}
                                                        /> */}
                                            </Form.Group>
                                        </Col>
                                    </Col>
                                    {/* <></> */}
                                    {/* } */}

                                    {/* {ticketDetails.asmName != "" || ticketDetails.asmMobileNo != "" ? */}
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
                                            // style={{
                                            //     width: '50%'
                                            // }}
                                            >
                                                <Form.Label>
                                                    ASM  Name
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>{ticketDetails.asmName}</p>
                                                {/* <Form.Control className="border-0"
                                                            type="text"
                                                            maxLength={15}
                                                            value='GH23212'
                                                            disabled

                                                        /> */}
                                            </Form.Group>
                                            <Form.Group
                                            // style={{
                                            //     width: '50%'
                                            // }}
                                            >
                                                <Form.Label>
                                                    ASM email id
                                                </Form.Label>
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>{""}</p>
                                                {/* <Form.Control className="border-0"
                                                            type="text"
                                                            maxLength={15}
                                                            value='908789786'
                                                            disabled

                                                        /> */}
                                            </Form.Group>
                                        </Col>
                                    </Col>
                                    {/* <></> */}
                                    {/* } */}



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
                                            }}>{ticketDetails.serviceTicketNumber}</p>
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
                                            }}>{moment((ticketDetails.RequestDate?.split(" ")[0])).format("YYYY-MM-DD")}</p>
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
                                            }}>{ticketDetails.defectDesc}</p>
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
                                            }}>{ticketDetails.siteAddress}</p>
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
                                            }}>{ticketDetails.productLineName}</p>
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
                                            }}>{ticketDetails.sernr}</p>
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
                                                Warranty Status
                                            </Form.Label>
                                            <p style={{
                                                fontSize: '12px'
                                            }}>{ticketDetails.warrantyDateStatus}</p>
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
                                            }}>{ticketDetails.ticketStateus}</p>
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
                        <Button variant="" className='add-Btn' onClick={() => {
                            handleCloseExistingTicket()
                            navigate(`${pathName}/home`)
                        }} >
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




                {/* ------------------------Already registered-------------------------- */}


                <Modal show={showRegistered} onHide={handleRegisteredClose} size="md" centered >
                    <Modal.Body>
                        <p className="text-center"><IoAlertCircle color="orange" fontSize={22} /></p>
                        <p className="text-center">Your product is already registered in system.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className="add-Btn" onClick={handleRegisteredClose}>Continue</Button>
                    </Modal.Footer>
                </Modal>
            </Card>

            <Footer />
        </>
    );
}

export default RegisterProduct;
