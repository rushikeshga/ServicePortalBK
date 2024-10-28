import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, Accordion, Form, InputGroup, Table } from 'react-bootstrap';
import { CgArrowsExchange, CgFileDocument } from 'react-icons/cg';
import { FaCircle, FaDownload, FaEye, FaUserCircle } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus, FaCirclePlus, FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosArrowRoundBack, IoIosDownload, IoMdSave } from 'react-icons/io';
import { IoArrowUpOutline, IoCallOutline, IoMail, IoSave, IoSyncOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import { MdVerifiedUser } from 'react-icons/md';
import { Input } from 'antd';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { BsInfoCircleFill } from 'react-icons/bs';
import { IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import moment from 'moment';
import { MultiSelect } from 'react-multi-select-component';

const NewAssignRequest = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();

    const [active, setactive] = useState(null)
    const [activeKeyEdit, setactiveKeyEdit] = useState('0')
    const ViewTic = localStorage.getItem('viewTicket')
    const [saved, setSaved] = useState(false);
    const [requestForSiteVisit, setRequestForSiteVisit] = useState(false);
    const [requestForProduct, setRequestForProduct] = useState(false);
    const [warrantyAccordion, setWarrantyAccodrion] = useState(false)
    const [warrantyDecision, setwarrantyDecision] = useState(false)
    const [activity, setActivity] = useState(false)
    const [claim, setClaim] = useState(false)


    const [serviceTasks, setServiceTasks] = useState(false)
    const [requestForyesWarranty, setRequestForYesWarranty] = useState(false)
    const [requestFornoWarranty, setRequestForNoWarranty] = useState(false)
    const [requestForCGInvoice, setRequestForCGInvoice] = useState(false)
    const [requestForSubmit, setRequestForSubmit] = useState(false)
    const [customerData, setCustomerData] = useState(false)
    const [serialNo, setserialNo] = useState('')
    const [selectedValueTicket, setSelectedValueTicket] = useState('');

    const CustomerConnected = {
        Contactdate: '',
        ConnectTime: '',
        Commment: "",
        ticketReject: '',
        Comment_two: ""
    }


    const [dateshow, setDateshow] = useState(false)

    const [showProductInfo, setProductInfo] = useState(false)

    const handleShowProductInfo = () => {
        setProductInfo(true)
    }
    const handleCloseProductinfo = () => {
        setProductInfo(false)

    }










    useEffect(() => {
        setactive(null)

    }, [])
    const handleSaveData = () => {
        setSaved(true);
        setactiveKeyEdit('2')

    }

    const [customerConnected, setcustomerConnected] = useState(false)
    const [alreadyWorkshoop, setalreadyWorkshoop] = useState(false)

    const [workshopremarks, setworkshopremarks] = useState('')

    const handleRadioCustomerChange = (event) => {
        const { value } = event.target;

        if (value === 'customer') {
            setcustomerConnected(true);
            setalreadyWorkshoop(false);
            setserialNo('')
            setVerifiedProduct(false)
        } else if (value === 'workshop') {
            setcustomerConnected(false);
            setalreadyWorkshoop(true);
            setserialNo('')
            setVerifiedProduct(false)
        } else {
        }
    };

    const handleRadioChange = (event) => {
        const { value } = event.target;

        if (value === 'site') {
            setRequestForSiteVisit(true);
            setRequestForProduct(false);
            setDateshow(false)

        } else if (value === 'Product') {
            setRequestForSiteVisit(false);
            setRequestForProduct(true);
            setVerifiedWork(false)



        } else {
        }
    };
    const handleRadioYesChange = (event) => {
        const { value } = event.target;
        if (value === 'yes') {
            setRequestForYesWarranty(true);
            setRequestForNoWarranty(false);
        } else if (value === 'no') {
            setRequestForNoWarranty(false);
            setRequestForYesWarranty(true);
        } else {
        }
    };
    const handleRadioInvoiceChange = (event) => {
        const { value } = event.target;

        if (value === 'yes') {
            setRequestForCGInvoice(true);
            setRequestForSubmit(false);
        } else if (value === 'no') {
            setRequestForSubmit(false);
            setRequestForCGInvoice(true);
        } else {
        }
    };
    const [workShop, setworkShop] = useState(false)
    const [closeTic, setcloseTic] = useState(false)
    const handleRadioWorkshopChange = (event) => {
        const { value } = event.target;

        if (value === 'recevied') {
            setworkShop(true);
            setcloseTic(false);
        } else if (value === 'close') {
            setworkShop(false);
            setcloseTic(true);
        } else {
        }
    };

    const getCurrentDate = () => {
        const date = new Date().toISOString().substr(0, 10);
        return date;
    };
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedDateSite, setSelectedDateSite] = useState(getCurrentDate());
    const [selectedDateContact, setSelectedDateContact] = useState(getCurrentDate());
    const [selectedTime, setSelectedTime] = useState('');

    const [selectedDateWorkShop, setSelectedDateWorkShop] = useState(getCurrentDate());
    const [selectedTypeWorkDone, setSelectedTypeWorkDone] = useState('')
    const [selectedClousureStatus, setSelectedClousureStatus] = useState('')






    const [workCompleted, setworkCompleted] = useState(false)
    const [productWork, setproductWork] = useState(false)
    const [showRadioButtons, setShowRadioButtons] = useState(false); // State to control visibility of radio buttons

    const handleRadioWorkChange = (event) => {
        const { value } = event.target;
        if (value === 'Work Completed') {
            setworkCompleted(true);
            // setproductWork(false);

        } else if (value === 'ProductWork ') {
            setworkCompleted(false);
            // setproductWork(true);



        } else {
        }
    };


    const productInfo = [
        {
            contactDate: '12/02/2024',
            serialNumber: '123',
            InvoiceNo: 'CG6757',
            InvoiceDate: '2024-06-19',
            uploadInvoice: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf',
            serviceRequestStatus: 'Not A CG Product',
            warranty: 'Out of warranty',
            remarks: ''

        },
        {
            contactDate: '13/06/2024',
            serialNumber: '321',
            InvoiceNo: 'CG6757',
            InvoiceDate: '2024-06-18',
            uploadInvoice: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf',
            serviceRequestStatus: 'Problem not related to CG product',
            warranty: 'In Warranty',
            remarks: ''

        }
    ]

    const [addContacted, setAddContacted] = useState({
        contactDate: selectedDateContact,
        ConnectTime: '',
        Commment: '',
        ticketReject: '',
        Comment_two: ""
    })
    const [tab2Data, settab2Data] = useState({
        ServiceDate: "",
        AssignTechician: "",
        ProductReceivedDate: "",
        ProductReceviedASCDate: "",
        ProductReceviedType: "",
        Remarks: "",
        RemarksR: "",

    });
    const [addSaveContacted, setAddSaveContacted] = useState({
        contactDate: "",
        serialNumber: '',
        InvoiceDate: '',
        InvoiceNo: '',
        uploadInvoice: null,
        serviceRequestStatus: '',
        warranty: '',
        remarks: ''

    })
    const [verifiedProduct, setVerifiedProduct] = useState(false);
    const [verifiedWork, setVerifiedWork] = useState(false);


    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

    const customerhandleChange = (e) => {
        const { name, value } = e.target;
        setAddContacted(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Assuming single file selection
        setAddContacted(prevState => ({
            ...prevState,
            uploadInvoice: file
        }));
    };




    const handleVerify = () => {
        if (addContacted?.contactDate === '' || addContacted?.ConnectTime == '' || addContacted?.Commment === '') {
            Swal.fire({
                icon: "error",
                title:
                    "Please fill all the fields marked with red *!",
            });
        }
        else {
            // setVerifiedProduct(true)
            setCustomerData(true);
            setactiveKeyEdit('1');
        }
    };

    const calculateDateAfterAddDays = () => {
        const selected = new Date(selectedDate);
        selected.setDate(selected.getDate() + 5);

        const year = selected.getFullYear();
        let month = (selected.getMonth() + 1).toString();
        let day = selected.getDate().toString();

        if (month.length === 1) {
            month = '0' + month;
        }

        if (day.length === 1) {
            day = '0' + day;
        }
        return `${day}/${month}/${year}`;
    };

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
    const getFileNameFromURL = (url) => {
        const path = url.split('/'); // Split URL by '/'
        return path[path.length - 1]; // Get the last part of the URL as filename
    };

    const [selectedRequest, setSelectedRequest] = useState('');
    const [serviceRequestFirst, setServiceRequestFirst] = useState('');
    const [serviceRequestSecond, setServiceRequestSecond] = useState('');
    const [serviceRequestThird, setServiceRequestThird] = useState('');





    // const ServiceRequest = {
    //     Close: "Close",
    //     Cancelled: 'Cancelled',
    //     CUSTOMER_NEGLIGENCE: "CUSTOMER NEGLIGENCE",
    // }

    const ServiceRequest = {
        ressign: "Ressigned to CG",
        Close: "Close with phone assistance",
        Not_in_my_territory: "Not in my territory",
        Cancel_sr: "Cancel service request",

    };
    const [selectedServiceRequest, setSelectedServiceRequest] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('')

    const handleServiceRequestChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedServiceRequest(selectedValue);
    };


    // Get current date in ISO format (YYYY-MM-DD)
    // const currentDate = new Date().toISOString().split('T')[0];

    // Get current time in HH:mm format
    const getCurrentTime = () => {
        const today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        // Pad hours and minutes with leading zeros if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    };

    const currentTime = getCurrentTime();

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionYes, setSelectedOptionYes] = useState('');
    const [selectedOptionYES, setSelectedOptionYES] = useState(''); // State to track selected option
    // State to track selected option
    // State to track selected option
    const [submitVisible, setSubmitVisible] = useState(false);

    const [invoiceNumber, setInvoiceNumber] = useState('');   // State to manage invoice number
    const [invoiceDate, setInvoiceDate] = useState('');       // State to manage invoice date
    const [invoiceFile, setInvoiceFile] = useState('')

    // State to track which submit button to show

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        if (option === 'yes') {
            setSubmitVisible(true); // Show "Submit" button
        } else if (option === 'no') {
            setSubmitVisible(false); // Show "Submit for CG Approval" button
        }
    };
    const handleOptionClickYes = (option) => {
        setSelectedOptionYes(option);
        if (option === 'yes') {
            // Set default values for invoice number and date
            setInvoiceNumber('202411004-1425');
            setInvoiceDate(getTodayDate()); // Set today's date as default

            setInvoiceFile(''); // Reset invoice file field
        } else {
            // Reset invoice number, date, and file
            setInvoiceNumber('');
            setInvoiceDate('');
            setInvoiceFile(''); // Initialize invoice file field
        }
    };
    const handleOptionClickYES = (option) => {
        setSelectedOptionYES(option);
        if (option === 'yes') {

        } else {

        }
    };
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return `${year}-${month}-${day}`;
    };

    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => label).join(", ")
            : "Select...";
    };
    const options = [
        { label: "Only site visit", value: "Only site visit" },
        { label: "Site visit & repair done", value: "Site visit & repair done" },
        { label: "Repair at ASC", value: "Repair at ASC" },
        { label: "Bearing replacement at site", value: "Bearing replacement at site" },
        { label: "Bearing replacement at ASC", value: "Bearing replacement at ASC" },
        { label: "Other repair at ASC", value: "Other repair at ASC" },
        { label: "First level repair", value: "First level repair" },
        { label: "Second level repair", value: "Second level repair" },
    ];


    // const myJSON = JSON.stringify(obj);

    const [typeOfWorkdown, setTypeofWorkdown] = useState([]);
    const TaskStatus = {
        Pending_work: "Pending work",
        Product_at_ASC: "Product at ASC",
        Spares_pending: "Spares pending",
        Revisit_pending: "Revisit pending ",
        Work_completed: "Work completed ",
        Work_void: "Work void ",


    };




    const [addActivityIten, setaddActivityIten] = useState([])
    const [addActivity, setAddActivity] = useState({
        typeOfActivity: []
    });




    useEffect(() => {
        if (addActivity?.typeOfActivity.length > 0) {
            console.log(addActivity?.typeOfActivity.map(item => item.value));
        } else {
            console.log('No items selected');
        }
    }, [addActivity?.typeOfActivity]);

    const [addDefectCategoryOption, setAddDefectCategoryOption] = useState({
        defectCategoryItem: "",
        defectItem: "",
    });
    const [defectList, setDefectList] = useState([]);

    const handleAddDefect = () => {
        if (
            addDefectCategoryOption.defectCategoryItem &&
            addDefectCategoryOption.defectItem
        ) {
            setDefectList([...defectList, addDefectCategoryOption]);

            setAddDefectCategoryOption({
                defectCategoryItem: "",
                defectItem: "",
            });
        }
        console.log(defectList);
    };
    const handleRemoveButtonClick = (index) => {
        const updatedData = [...defectList];
        updatedData.splice(index, 1);
        setDefectList(updatedData);
    };

    useEffect(() => {
        console.log(addActivityIten); // Log updated addActivityIten whenever it changes
    }, [addActivityIten]);

    const handleAddActivityItem = () => {
        if (addActivity?.activityStartDate === '' || addActivity?.typeOfActivity === '' || addActivity?.taskStatus === '' || addActivity?.activityEndDate === '') {
            Swal.fire({
                icon: "error",
                title:
                    "Please fill all the fields marked with red *!",
            });
        }
        else {
            const startDateExists = addActivityIten.some(item => item.activityStartDate === addActivity.activityStartDate);

            if (startDateExists) {
                alert('Start date already exists. Please choose a different start date.');
                return;
            }
            setaddActivityIten([...addActivityIten, addActivity]);
            if (addActivity?.activityStartDate && addActivity?.activityEndDate) {
                const diff = calculateDateDifference(addActivity.activityStartDate, addActivity.activityEndDate);
                setDateDifference(diff);
            }
            setAddActivity({
                activityStartDate: '',
                typeOfActivity: [],
                taskStatus: '',
                activityEndDate: ""




            })
            // setAddActivity(initialActivityState); // Reset addActivity to initial state
            if (addActivity.taskStatus === 'Work_completed') {
                setSubmitEnabled(true);
            } else {
                setSubmitEnabled(false);
            }

        }
    }
    // console.log(addActivityIten);F

    // const handleRemoveButtonClick = (index) => {
    //     const updatedData = [...defectList];
    //     updatedData.splice(index, 1);
    //     setDefectList(updatedData);
    // };

    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [dateDifference, setDateDifference] = useState(null);

    const calculateDateDifference = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 1200 * 24));

        return differenceInDays;
    };

    // useEffect(() => {
    //     if (addActivity?.activityStartDate && addActivity?.activityEndDate) {
    //         const diff = calculateDateDifference(addActivity.activityStartDate, addActivity.activityEndDate);
    //         setDateDifference(diff);
    //     }
    // }, [addActivity.activityStartDate, addActivity.activityEndDate]);










    return (
        <>
            <Row>
                <Col>
                    <Card
                        className="border-0 pt-0 px-2"
                        //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                        style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                    >
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='m-0 mdl-title' style={{
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}><CgFileDocument fontSize={14} color='#000' className='mr-2' />
                                    Breakdown/CRN12345678</p>

                                {/* <span style={{
                                    fontSize: '18px',
                                    fontWeight: '600'
                                }} className="text-start  m-0">
                                    Open Request
                                </span> */}
                            </div>
                            <div className='d-flex gap-1'>
                                {/* <Button variant='' className='add-Btn' onClick={handleShowProductInfo}>
                                </Button> */}
                                <Tooltip arrow placement="left" title="back">
                                    <IconButton
                                        className=" m-0 p-0 "
                                        onClick={() => {
                                            navigate(-1)
                                        }}
                                    >
                                        <IoIosArrowRoundBack
                                            style={{ cursor: "pointer" }}
                                            fontSize={30}
                                            color="#005bab"

                                        />

                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="left" title="view product info">
                                    <IconButton
                                        className=" m-0 p-0 "
                                        onClick={handleShowProductInfo}
                                    >
                                        <BsInfoCircleFill fontSize={20} color='#005bab' />

                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="left" title="mail">
                                    <IconButton
                                        className=" m-0 p-0 "
                                    >
                                        <IoMail fontSize={20} color='#005bab' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="left" title="refresh">
                                    <IconButton
                                        className=" m-0 p-0 "
                                    >
                                        <IoSyncOutline fontSize={20} color='#005bab' />
                                    </IconButton>
                                </Tooltip>
                            </div>


                        </div>
                        {/* <hr /> */}



                        <Row className="justify-content-start pt-0">

                            <Row className="">
                                {/* <Col lg={4} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>
                                            <Col lg={3} md={6} sm={6}>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s" width={40} height={40} alt="" srcset="" />
                                            </Col>
                                            <Col lg={4} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Product model</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>Mini-Marshal</p>
                                            </Col>
                                            <Col lg={4} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Product SN</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>123XX</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Product type</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>LT Motor</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Frame size</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>8</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Pole</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>4</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Voltage</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>9 kw</p>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg={4} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Date created</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>12/04/2024</p>
                                            </Col>
                                            <Col lg={4} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Warranty type</p>
                                                <Button variant='' className='mt-1 add-Btn' style={{ fontWeight: "500", fontSize: "12px" }} >W</Button>
                                            </Col>
                                            <Col lg={4} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Service type</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>Breakdown</p>
                                            </Col>


                                        </Row>

                                        <div>

                                            <div className='d-flex align-items-center '  >

                                                <div md={2}>
                                                    <FaUserCircle fontSize={50} />

                                                </div>
                                                <div className='ml-2'>
                                                    <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                    <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Rajesh</p>
                                                </div>

                                            </div>
                                            <div className='mt-1'>
                                                <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> Shiwaji Nagar Pune </p>
                                            </div>
                                            <div className='mt-1'>
                                                <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>rajesh@gmail.com</span> </p>
                                                <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                    fontSize={18} /> <span className='ml-2'>9878988789</span> </p>


                                            </div>

                                        </div>


                                    </Card>



                                </Col> */}


                                <Col lg={12} md={12} sm={12}>

                                    <>
                                        <div className='customAccordion'>

                                            <Accordion activeKey={activeKeyEdit}>
                                                <Accordion.Item className='breakdowan-accor' eventKey="0">
                                                    <Accordion.Header >
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>
                                                                {
                                                                    customerData || activeKeyEdit === '1'

                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>1</strong>

                                                                }

                                                                Customer Contacted</p><span>
                                                                {/* <Button disabled={!verifiedProduct} variant='' style={{
                                                                    outline: 'none',
                                                                    border: 'none'
                                                                }}>
                                                                    <IoMdSave color='#7bc143'
                                                                        onClick={() => {


                                                                            setCustomerData(true);
                                                                            // setSaved(true); // Ensure saved is false when workCompleted is true
                                                                            setactiveKeyEdit('1');




                                                                        }}
                                                                        fontSize={20} />


                                                                </Button> */}
                                                            </span>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='accordion-btn pt-0 pb-1'>
                                                        <Row>
                                                            <Col >

                                                                {/* <Row className='justify-content-center text-center'>
                                                                    <Col lg={12} md={6} sm={12}>
                                                                        <Form.Check
                                                                            type='radio'
                                                                            label="Customer Contacted"
                                                                            name="radioGroup"
                                                                            value="customer"
                                                                            style={{
                                                                                color: '#000',
                                                                                fontWeight: '400',
                                                                                fontSize: '12px',
                                                                                textAlign: 'left',
                                                                                margin: '15px 15px 0px 0px',
                                                                                display: 'inline-block'
                                                                            }}
                                                                            onChange={handleRadioCustomerChange} />

                                                                    </Col>

                                                                </Row> */}

                                                                <>
                                                                    <Row className=' mt-1 align-items-center justofy-content-center  '>
                                                                        <Col md={3} style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>Contact date <span className="req-t">*</span></Form.Label>
                                                                                <Form.Control type='date'
                                                                                    name='contactDate'
                                                                                    value={moment(
                                                                                        addContacted?.contactDate
                                                                                    )?.format("YYYY-MM-DD")}
                                                                                    onChange={(e) => {

                                                                                        setAddContacted((pre) => {
                                                                                            return {
                                                                                                ...pre,
                                                                                                contactDate: e.target.value,
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                    max={currentDate}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>

                                                                        <Col md={3} style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>Contact time <span className="req-t">*</span></Form.Label>
                                                                                <Form.Control type='time' name='ConnectTime' value={addContacted?.ConnectTime} onChange={customerhandleChange} min={currentTime}
                                                                                />
                                                                            </Form.Group>


                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>Comments <span className="req-t">*</span></Form.Label>
                                                                                <Form.Control as="textarea"
                                                                                    rows={2}
                                                                                    name='Commment'
                                                                                    value={addContacted?.Commment}
                                                                                    onChange={customerhandleChange}

                                                                                />
                                                                            </Form.Group>
                                                                        </Col>



                                                                    </Row>
                                                                    <Row>
                                                                        <Col md={3}>
                                                                            <Form.Group>
                                                                                <Form.Label>Reason of rejection</Form.Label>
                                                                                <Form.Select onChange={handleServiceRequestChange}>
                                                                                    <option value=''>Select</option>
                                                                                    {Object.keys(ServiceRequest).map(key => (
                                                                                        <option key={key} value={key}>{ServiceRequest[key]}</option>
                                                                                    ))}
                                                                                    <option value='Other'>Other</option>


                                                                                </Form.Select>

                                                                            </Form.Group>
                                                                        </Col>
                                                                        {
                                                                            selectedServiceRequest === 'Other' && (

                                                                                <Col md={6} >
                                                                                    <Form.Group className="">
                                                                                        <Form.Label>
                                                                                            Comments
                                                                                        </Form.Label>
                                                                                        <Form.Control as="textarea"
                                                                                            value={addContacted?.Comment_two}
                                                                                            name='Comment_two'
                                                                                            onChange={customerhandleChange}

                                                                                            rows={2} />
                                                                                    </Form.Group>

                                                                                </Col>)
                                                                        }
                                                                        <Col md={2} style={{
                                                                            marginTop: '28px'
                                                                        }}>
                                                                            <Button variant='' onClick={handleVerify} className='add-Btn'>
                                                                                {/* <MdVerifiedUser fontSize={20} /> */}
                                                                                Submit
                                                                            </Button>
                                                                        </Col>


                                                                    </Row>


                                                                </>




                                                            </Col>

                                                        </Row>



                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>
                                                                {
                                                                    saved
                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>2</strong>

                                                                }

                                                                Site Visit or Product to be received at workshop </p><span>
                                                                {/* <Button variant='' style={{
                                                                    outline: 'none',
                                                                    border: 'none'
                                                                }}>

                                                                    <IoMdSave
                                                                        color='#7bc143'
                                                                        onClick={() => {

                                                                            // Check if any required fields for site visit are empty
                                                                            // if (
                                                                            //     tab2Data?.ServiceDate === "" ||
                                                                            //     tab2Data?.AssignTechician === "" ||
                                                                            //     tab2Data?.Remarks === ""
                                                                            // ) {
                                                                            //     Swal.fire({
                                                                            //         icon: "error",
                                                                            //         title:
                                                                            //             "Please fill all the fields marked with red *!",
                                                                            //     });
                                                                            //     // Display an alert or handle the error condition as needed
                                                                            //     return; // Exit function early if fields are not filled
                                                                            // }


                                                                            // if (requestForProduct) {
                                                                            //     // Check if any required fields for product are empty
                                                                            //     if (
                                                                            //         tab2Data?.ProductReceivedDate === "" ||
                                                                            //         tab2Data?.RemarksR === ""
                                                                            //     ) {
                                                                            //         Swal.fire({
                                                                            //             icon: "error",
                                                                            //             title:
                                                                            //                 "Please fill all the fields marked with red *!",
                                                                            //         });
                                                                            //         // Display an alert or handle the error condition as needed
                                                                            //         return; // Exit function early if fields are not filled
                                                                            //     }
                                                                            // }

                                                                            // If all required fields are filled, proceed with saving and updating state
                                                                            setSaved(true);
                                                                            setServiceTasks(true);
                                                                            setactiveKeyEdit('2');
                                                                        }}
                                                                        fontSize={20}
                                                                    />



                                                                </Button> */}
                                                                <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant='' > <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        setactiveKeyEdit('0')
                                                                    }} /></Button>

                                                                </span>
                                                            </span>

                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>
                                                        <Row>
                                                            <Col >

                                                                <Row className=' justify-content-center text-center'>
                                                                    <Col lg={12} md={6} sm={12}>


                                                                        <Form.Check
                                                                            type='radio'
                                                                            label="Site Visit"
                                                                            name="radioGroup"
                                                                            value="site"
                                                                            // disabled={verifiedWork}
                                                                            style={{
                                                                                color: '#000',
                                                                                fontWeight: '400',
                                                                                fontSize: '12px',
                                                                                textAlign: 'left',
                                                                                margin: '15px 15px 0px 0px',
                                                                                display: 'inline-block'
                                                                            }}
                                                                            onChange={handleRadioChange} />

                                                                        {
                                                                            !verifiedWork ?
                                                                                (<Form.Check
                                                                                    type='radio'
                                                                                    label="Product  received at workshop"
                                                                                    name="radioGroup"
                                                                                    value='Product'
                                                                                    // disabled={dateshow}
                                                                                    onChange={handleRadioChange}
                                                                                    style={{
                                                                                        color: '#000',
                                                                                        fontWeight: '400',
                                                                                        fontSize: '12px',
                                                                                        textAlign: 'left',
                                                                                        margin: '15px 15px 0px 0px',
                                                                                        display: 'inline-block'

                                                                                    }} />) : ''
                                                                        }


                                                                    </Col>

                                                                </Row>
                                                                {
                                                                    requestForSiteVisit && (
                                                                        <>
                                                                            <Row className=' mt-2 justify-content-start'>
                                                                                <Col md={3}>
                                                                                    <Form.Group className="text-start">
                                                                                        <Form.Label> Select date</Form.Label>
                                                                                        <Form.Control type='date'
                                                                                            // disabled={verifiedWork} 
                                                                                            name='selectedDate'
                                                                                            value={moment(
                                                                                                tab2Data?.selectedDate
                                                                                            )?.format("YYYY-MM-DD")}
                                                                                            onChange={(e) => {
                                                                                                settab2Data((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        selectedDate: e.target.value,
                                                                                                    };
                                                                                                });
                                                                                            }}
                                                                                            max={currentDate}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                    <Form.Group
                                                                                    >
                                                                                        <Form.Label className='text-start'>
                                                                                            Assign technician  <span className="req-t">*</span>
                                                                                        </Form.Label>
                                                                                        <Form.Select
                                                                                            value={tab2Data?.AssignTechician}
                                                                                            // disabled={verifiedWork}
                                                                                            name='AssignTechician'
                                                                                            onChange={(e) => {
                                                                                                settab2Data((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        AssignTechician:
                                                                                                            e.target.value,
                                                                                                    };
                                                                                                });

                                                                                                console.log(tab2Data);
                                                                                            }}
                                                                                        // disabled={verifiedWork}
                                                                                        >
                                                                                            <option value="">Select</option>
                                                                                            <option value="Tech 1">Tech 1</option>

                                                                                        </Form.Select>

                                                                                    </Form.Group>

                                                                                </Col>
                                                                                <Col md={4}>
                                                                                    <Form.Group className="">
                                                                                        <Form.Label>
                                                                                            Remarks  <span className="req-t">*</span>
                                                                                        </Form.Label>
                                                                                        <Form.Control as="textarea"
                                                                                            value={tab2Data?.Remarks}
                                                                                            name="Remarks"
                                                                                            onChange={(e) => {
                                                                                                settab2Data((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        Remarks: e.target.value,
                                                                                                    };
                                                                                                });

                                                                                                console.log(tab2Data);
                                                                                            }}


                                                                                            rows={1}
                                                                                        // disabled={verifiedWork}
                                                                                        />
                                                                                    </Form.Group>

                                                                                </Col>
                                                                                <Col md={2} style={{
                                                                                    marginTop: '28px'
                                                                                }}><Button variant='' className='add-Btn' onClick={() => {
                                                                                    setSaved(true);
                                                                                    setServiceTasks(true);
                                                                                    setactiveKeyEdit('2');
                                                                                }}>Submit</Button></Col>

                                                                            </Row>




                                                                        </>

                                                                    )
                                                                }
                                                                {
                                                                    requestForProduct && (
                                                                        <>
                                                                            <Row className='   mt-2'>
                                                                                <Col md={3}>
                                                                                    <Form.Group className="text-start">
                                                                                        <Form.Label> Product received date                                                                                                     {/* <span className="req-t">*</span> */}
                                                                                        </Form.Label><span className="req-t">*</span>
                                                                                        <Form.Control type='date'
                                                                                            min={currentDate}
                                                                                            name='ProductReceivedDate'
                                                                                            value={moment(
                                                                                                tab2Data?.ProductReceivedDate
                                                                                            )?.format("YYYY-MM-DD")}
                                                                                            onChange={(e) => {
                                                                                                // setSelectedDateWorkShop(e.target.value)

                                                                                                settab2Data((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        ProductReceivedDate:
                                                                                                            e.target.value,
                                                                                                    };
                                                                                                });
                                                                                            }}

                                                                                        />

                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <Form.Group className="">
                                                                                        <Form.Label>
                                                                                            Remarks
                                                                                        </Form.Label>
                                                                                        <span className="req-t">*</span>



                                                                                        <Form.Control as="textarea"
                                                                                            value={tab2Data?.RemarksR}
                                                                                            name="RemarksR"
                                                                                            onChange={(e) => {
                                                                                                settab2Data((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        RemarksR: e.target.value,
                                                                                                    };
                                                                                                });

                                                                                                console.log(tab2Data);
                                                                                            }}


                                                                                            rows={1} />
                                                                                    </Form.Group>

                                                                                </Col>
                                                                                <Col md={2} style={{
                                                                                    marginTop: '28px'
                                                                                }}><Button variant='' className='add-Btn' onClick={() => {
                                                                                    setSaved(true);
                                                                                    setServiceTasks(true);
                                                                                    setactiveKeyEdit('2');
                                                                                }}>Submit</Button></Col>


                                                                                {/* <Col md={2} className='mt-4'>
                                                                                <Button variant='' disabled={dateshow} onClick={() => {

                                                                                    // setDateshow(true)

                                                                                }} className='add-Btn'>
                                                                                    <MdVerifiedUser fontSize={20} />
                                                                                    Update
                                                                                </Button>
                                                                            </Col> */}


                                                                            </Row>
                                                                            {
                                                                                dateshow &&
                                                                                <>
                                                                                    <Row className='mt-1      '>
                                                                                        <p className='m-0' style={{
                                                                                            color: 'red',
                                                                                            fontSize: '11px'
                                                                                        }}>Product Should be received by ASC within 5 days - {calculateDateAfterAddDays()} </p>
                                                                                    </Row>
                                                                                    <Row className=' text-left '>
                                                                                        <Col lg={12} md={6} sm={12}>
                                                                                            <Form.Check
                                                                                                type='radio'
                                                                                                label="Product recevied at workshop"
                                                                                                name="radioGroup"
                                                                                                value="recevied"
                                                                                                // disabled={verifiedWork}
                                                                                                style={{
                                                                                                    color: '#000',
                                                                                                    fontWeight: '400',
                                                                                                    fontSize: '12px',
                                                                                                    textAlign: 'left',
                                                                                                    margin: '2px 15px 0px 0px',
                                                                                                    display: 'inline-block'
                                                                                                }}
                                                                                                onChange={handleRadioWorkshopChange} />

                                                                                            <Form.Check
                                                                                                type='radio'
                                                                                                label="Product not  received at workshop (Ticket to be closed)"
                                                                                                name="radioGroup"
                                                                                                value='close'
                                                                                                onChange={handleRadioWorkshopChange}
                                                                                                style={{
                                                                                                    color: '#000',
                                                                                                    fontWeight: '400',
                                                                                                    fontSize: '12px',
                                                                                                    textAlign: 'left',
                                                                                                    margin: '2px 15px 0px 0px',
                                                                                                    display: 'inline-block'

                                                                                                }} />
                                                                                        </Col>


                                                                                        {
                                                                                            workShop && (
                                                                                                <>

                                                                                                    <Col md={3}>
                                                                                                        <Form.Group className="text-start">
                                                                                                            <Form.Label> Select date</Form.Label>
                                                                                                            <Form.Control type='date' value={selectedDateWorkShop} onChange={(e) => {
                                                                                                                setSelectedDateWorkShop(e.target.value)

                                                                                                            }} />

                                                                                                        </Form.Group>
                                                                                                    </Col>

                                                                                                </>

                                                                                            )
                                                                                        }




                                                                                    </Row>

                                                                                </>

                                                                            }

                                                                        </>

                                                                    )
                                                                }












                                                            </Col>

                                                        </Row>

                                                    </Accordion.Body>
                                                </Accordion.Item>

                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>
                                                                {
                                                                    serviceTasks
                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>3</strong>

                                                                }
                                                                Warranty Verification
                                                            </p>
                                                            <span>
                                                                <Button disabled={!serviceTasks} variant=''
                                                                    style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }}>

                                                                    {/* <IoMdSave onClick={() => {
                                                                        setServiceTasks(true)
                                                                        setactiveKeyEdit('3')
                                                                    }} color='#7bc143' fontSize={20} /> */}
                                                                </Button>
                                                                <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant=''> <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        // setactiveKeyEdit('1')
                                                                        if (alreadyWorkshoop) {
                                                                            setactiveKeyEdit('0')
                                                                        }
                                                                        else {
                                                                            setactiveKeyEdit('1')

                                                                        }
                                                                    }} /></Button>

                                                                </span>
                                                            </span>

                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>
                                                        <>
                                                            <Row className='mt-1'>
                                                                <p style={{ fontSize: '12px' }}>
                                                                    System Warranty : {' '}
                                                                    <Button variant='' disabled={selectedOptionYes === 'yes'} className={`add-Btn ${selectedOptionYes === 'yes' ? '' : ''}`} onClick={() => handleOptionClickYes('yes')}>
                                                                        Yes
                                                                    </Button>
                                                                    <Button variant='' disabled={selectedOptionYes === 'no'} className={`OOWStatuss ${selectedOptionYes === 'no' ? '' : ''}`} onClick={() => handleOptionClickYes('no')}>
                                                                        No
                                                                    </Button>

                                                                    {/* <Button variant='' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)", fontSize: '12px', marginLeft: '6px' }}>
                                                                        Warranty void job (TBC)
                                                                    </Button> */}
                                                                </p>



                                                            </Row>
                                                            <Row>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label>Invoice Number</Form.Label>
                                                                        <Form.Control type='text' value={invoiceNumber} readOnly={selectedOptionYes !== 'no'} />

                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label>Invoice date</Form.Label>
                                                                        <Form.Control type='date' value={invoiceDate} readOnly={selectedOptionYes !== 'no'} />

                                                                    </Form.Group>
                                                                </Col>

                                                                {selectedOptionYes === 'no' && (
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Invoice copy</Form.Label>
                                                                            <Form.Control type='file' />


                                                                        </Form.Group>
                                                                    </Col>)
                                                                }
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label>Warranty as per invoice date</Form.Label>
                                                                        <div className=' d-flex gap-2' >
                                                                            <Button variant="" disabled={selectedOption === 'yes'} className={`add-Btn ${selectedOption === 'yes' ? '' : ''}`} onClick={() => handleOptionClick('yes')}>
                                                                                Yes
                                                                            </Button>
                                                                            <Button variant="" disabled={selectedOption === 'no'} className={`OOWStatuss ${selectedOption === 'no' ? '' : ''}`} onClick={() => handleOptionClick('no')}>
                                                                                No
                                                                            </Button>
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>

                                                            </Row>
                                                            <Row className='justify-content-center mt-2 align-items-center'>
                                                                <Col md={2}>
                                                                    {submitVisible ? (
                                                                        <Button variant="" className="add-Btn" onClick={() => {
                                                                            setServiceTasks(true)
                                                                            setactiveKeyEdit('3')
                                                                        }} >
                                                                            Submit
                                                                        </Button>
                                                                    ) : (
                                                                        <Button variant="" className="add-Btn" onClick={() => {
                                                                            setServiceTasks(true)
                                                                            setactiveKeyEdit('3')
                                                                        }} >
                                                                            Submit for CG Approval
                                                                        </Button>
                                                                    )}

                                                                </Col>
                                                            </Row>
                                                        </>



                                                    </Accordion.Body>
                                                </Accordion.Item>

                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>   {
                                                                warrantyDecision
                                                                    ?
                                                                    <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                    : <strong className='mr-2'>4</strong>

                                                            }
                                                                Warranty decision
                                                            </p>
                                                            <span>
                                                                {/* <Button disabled={!serviceTasks} variant=''
                                                                    style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }}>

                                                                    <IoMdSave onClick={() => {
                                                                        setwarrantyDecision(true)
                                                                        setactiveKeyEdit('4')
                                                                    }} color='#7bc143' fontSize={20} />
                                                                </Button> */}
                                                                <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant=''> <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        setactiveKeyEdit('2')

                                                                    }} /></Button>

                                                                </span>
                                                            </span>


                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>
                                                        <>
                                                            <Row className='mt-1'>
                                                                <div style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: '500'
                                                                }}>
                                                                    CG approval :
                                                                    <Button variant="" className={`add-Btn  ml-2  ${selectedOptionYES === 'yes' ? '' : ''}`} onClick={() => handleOptionClickYES('yes')}>
                                                                        Yes
                                                                    </Button>
                                                                    <Button variant="" className={`OOWStatuss ${selectedOptionYES === 'no' ? '' : ''}`} onClick={() => handleOptionClickYES('no')}>
                                                                        No
                                                                    </Button>
                                                                </div>


                                                            </Row>
                                                            {
                                                                selectedOptionYES === 'no' && (

                                                                    <Row className='justify-content-center text-left m-0 p-0'>
                                                                        <p className='m-0 p-0 ' style={{
                                                                            fontSize: '12px'
                                                                        }}>Do you want to pick work as chargeable ?</p>

                                                                        <Col lg={12} md={6} sm={12}>
                                                                            <Form.Check
                                                                                type='radio'
                                                                                label="Yes"
                                                                                name="radioGroup"
                                                                                value="Yes"
                                                                                style={{
                                                                                    color: '#000',
                                                                                    fontWeight: '400',
                                                                                    fontSize: '12px',
                                                                                    textAlign: 'left',
                                                                                    margin: '5px 15px 0px 0px',
                                                                                    display: 'inline-block'
                                                                                }}
                                                                            />
                                                                            <Form.Check
                                                                                type='radio'
                                                                                label="No"
                                                                                name="radioGroup"
                                                                                value='No'

                                                                                style={{
                                                                                    color: '#000',
                                                                                    fontWeight: '400',
                                                                                    fontSize: '12px',
                                                                                    textAlign: 'left',
                                                                                    margin: '5px 15px 0px 0px',
                                                                                    display: 'inline-block'

                                                                                }} />
                                                                        </Col>

                                                                    </Row>
                                                                )

                                                            }
                                                            <Row className='m-0 p-0'><Col md={2} style={{
                                                                marginTop: '28px'
                                                            }}><Button variant='' className='add-Btn' onClick={() => {
                                                                setwarrantyDecision(true)
                                                                setactiveKeyEdit('4')
                                                            }}>Submit</Button></Col></Row>
                                                        </>


                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>
                                                                {
                                                                    activity
                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>5</strong>
                                                                }
                                                                Activity


                                                            </p>
                                                            <span>
                                                                {/* <Button disabled={!submitEnabled} variant=''
                                                                    style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }}>

                                                                    <IoMdSave onClick={() => {
                                                                        {


                                                                            setActivity(true)
                                                                            setactiveKeyEdit('5')

                                                                        }

                                                                    }} color='#7bc143' fontSize={20} />
                                                                </Button> */}
                                                                <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant=''> <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        setactiveKeyEdit('3')

                                                                    }} /></Button>

                                                                </span>
                                                            </span>

                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>

                                                        <Row>
                                                            <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Activity start date <span className="req-t">*</span></Form.Label>
                                                                    <Form.Control type='date'
                                                                        name='activityStartDate'
                                                                        disabled={submitEnabled}
                                                                        value={addActivity?.activityStartDate}
                                                                        onChange={(e) => setAddActivity(prev => ({ ...prev, activityStartDate: e.target.value }))}
                                                                    // max={currentDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label> Type of activity <span className="req-t">*</span></Form.Label>
                                                                    <MultiSelect
                                                                        options={options}
                                                                        disabled={submitEnabled}


                                                                        value={addActivity?.typeOfActivity}
                                                                        onChange={function noRefCheck(e) {
                                                                            setAddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                        }}
                                                                        valueRenderer={customValueRenderer}


                                                                        labelledBy="Select" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Activity end date <span className="req-t">*</span></Form.Label>
                                                                    <Form.Control type='date'
                                                                        disabled={submitEnabled}
                                                                        name='activityDate'
                                                                        value={addActivity?.activityEndDate}
                                                                        onChange={(e) => setAddActivity(prev => ({ ...prev, activityEndDate: e.target.value }))}



                                                                    // max={currentDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Status <span className="req-t">*</span></Form.Label>
                                                                    <Form.Select value={addActivity?.taskStatus}
                                                                        disabled={submitEnabled}


                                                                        onChange={(e) => {
                                                                            const selectedStatus = e.target.value;
                                                                            setAddActivity(prev => ({ ...prev, taskStatus: selectedStatus }));
                                                                            // Enable submit button if 'Work completed' is selected
                                                                            if (selectedStatus === 'Work completed') {
                                                                                setSubmitEnabled(true);
                                                                            } else {
                                                                                setSubmitEnabled(false);
                                                                            }
                                                                        }}

                                                                    >
                                                                        <option value=''>Select</option>
                                                                        {Object.keys(TaskStatus).map(key => (
                                                                            <option key={key} value={key}>{TaskStatus[key]}</option>
                                                                        ))}
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col style={{
                                                                marginTop: '28px'
                                                            }} md={1}><Button variant='' className='add-Btn' onClick={handleAddActivityItem}>Add</Button></Col>


                                                        </Row>

                                                        <Row>
                                                            {addActivityIten.length == 0 ? (
                                                                ""
                                                            ) : (
                                                                <Table responsive bordered className="mt-1">
                                                                    <thead>
                                                                        <tr
                                                                            style={{
                                                                                fontSize: "12px",
                                                                            }}
                                                                        >
                                                                            <th className='m-0 pl-1 py-1 align-content-center'> Start date</th>
                                                                            <th className='m-0 pl-1 py-1 align-content-center'>Type of activity</th>
                                                                            <th className='m-0 pl-1 py-1 align-content-center'>End date</th>
                                                                            <th className='m-0 pl-1 py-1 align-content-center'>Status</th>
                                                                            {/* <th></th> */}


                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {addActivityIten?.map((add, index) => {
                                                                            return (
                                                                                <tr
                                                                                    style={{
                                                                                        fontSize: "12px",
                                                                                    }}
                                                                                    key={index}
                                                                                >
                                                                                    <td className='m-0 pl-1 py-1 align-content-center'>{add?.activityStartDate}</td>
                                                                                    <td className='m-0 pl-1 py-1 align-content-center'>{add.typeOfActivity.map(item => item.value).toString()}
                                                                                    </td>
                                                                                    <td className='m-0 pl-1 py-1 align-content-center'>{add?.activityEndDate}</td>
                                                                                    <td className='m-0 pl-1 py-1 align-content-center'>{TaskStatus[add.taskStatus]}</td>





                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            )}
                                                        </Row>
                                                        <Row className='p-0 m-0'>
                                                            {
                                                                dateDifference > 3 && (
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Actual days</Form.Label>
                                                                            <Form.Control type='text' />

                                                                        </Form.Group>
                                                                    </Col>

                                                                )
                                                            }
                                                            <Col>
                                                                <Button disabled={!submitEnabled} style={{
                                                                    marginTop: '29px'
                                                                }} variant='' className='add-Btn' onClick={() => {
                                                                    {


                                                                        setActivity(true)
                                                                        setactiveKeyEdit('5')

                                                                    }

                                                                }} >Submit</Button>
                                                            </Col>
                                                        </Row>




                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="5">
                                                    <Accordion.Header>
                                                        <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                        >
                                                            <p className='m-0'>
                                                                {
                                                                    claim
                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>6</strong>
                                                                }
                                                                Claim submission


                                                            </p>
                                                            <span>
                                                                {/* <Button variant=''
                                                                    style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }}>

                                                                    <IoMdSave onClick={() => {
                                                                        setClaim(true)
                                                                        setactiveKeyEdit('6')
                                                                    }} color='#7bc143' fontSize={20} />
                                                                </Button> */}
                                                                <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant=''> <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        setactiveKeyEdit('4')

                                                                    }} /></Button>

                                                                </span>
                                                            </span>

                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>
                                                        <Row>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Product Serial No</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="SerialNo"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Division</Form.Label>
                                                                    <Form.Select
                                                                        name="DivCode"

                                                                    >
                                                                        <option value="">Select</option>


                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Product Line</Form.Label>
                                                                    <Form.Select
                                                                        name="ProductType"

                                                                    >
                                                                        <option value="">Select</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Product Group</Form.Label>
                                                                    <Form.Select name="ProductCode" >
                                                                        <option value="">Select</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Product Code</Form.Label>


                                                                    <Form.Control type="text"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Product Description</Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}

                                                                        readOnly
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3} >
                                                                <Form.Group>
                                                                    <Form.Label>Batch No</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="batchNo"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Invoice Date</Form.Label>
                                                                    <Form.Control
                                                                        type="date"
                                                                        name="InvoiceDate"

                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Upload Invoice Copy</Form.Label>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="InvoceFilePath"

                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>
                                                        <Row className="mt-1">
                                                            {/* <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Purchased from</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="PurchaseFrom"

                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Invoice No</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="InvoiceNo"

                                                                    />
                                                                </Form.Group>
                                                            </Col> */}


                                                        </Row>
                                                        {/* <Row className="mt-1">
                                                            <Col md={3} className="mt-4">
                                                                <Form.Label>Complaint type</Form.Label>
                                                                <Form.Select
                                                                    name="ComplaintType"
                                                                >
                                                                    <option value="">Select</option>

                                                                </Form.Select>
                                                            </Col>

                                                        </Row> */}

                                                        <Row>
                                                            {/* <p className="pg-label mt-2">Defect </p> */}
                                                            <Col md={6} className="m-0">
                                                                <Row>
                                                                    {/* <Col md={4}>
                                                                        <Form.Group>
                                                                            <Form.Label>Defect Category</Form.Label>
                                                                            <Form.Select
                                                                                value={
                                                                                    addDefectCategoryOption?.defectCategoryItem
                                                                                }
                                                                                onChange={(e) =>
                                                                                    setAddDefectCategoryOption({
                                                                                        ...addDefectCategoryOption,
                                                                                        defectCategoryItem: e.target.value,
                                                                                    })
                                                                                }
                                                                            >
                                                                                <option value="">Select</option>
                                                                                <option value="A">A</option>
                                                                                <option value="B">B</option>
                                                                                <option value="C">C</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col> */}
                                                                    {/* <Col md={4}>
                                                                        <Form.Group>
                                                                            <Form.Label>Defect </Form.Label>
                                                                            <Form.Select
                                                                                value={
                                                                                    addDefectCategoryOption?.defectItem
                                                                                }
                                                                                onChange={(e) =>
                                                                                    setAddDefectCategoryOption({
                                                                                        ...addDefectCategoryOption,
                                                                                        defectItem: e.target.value,
                                                                                    })
                                                                                }
                                                                            >
                                                                                <option value="">Select</option>
                                                                                <option value="X">X</option>
                                                                                <option value="Y">Y</option>
                                                                                <option value="Z">Z</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col> */}
                                                                    {/* <Col md={4} className="mt-4">
                                                                        <Tooltip
                                                                            arrow
                                                                            placement="right"
                                                                            title="add"
                                                                        >
                                                                            <IconButton
                                                                                className="edit-btn"
                                                                                onClick={handleAddDefect}
                                                                            >
                                                                                <FaCirclePlus
                                                                                    color="green"
                                                                                    fontSize={25}
                                                                                />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Col> */}
                                                                </Row>
                                                            </Col>
                                                            {/* <Col>
                                                                {defectList.length == 0 ? (
                                                                    ""
                                                                ) : (
                                                                    <Table responsive bordered className="mt-1">
                                                                        <thead>
                                                                            <tr
                                                                                style={{
                                                                                    fontSize: "12px",
                                                                                }}
                                                                            >
                                                                                <th>Defect Category</th>
                                                                                <th>Defect</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {defectList?.map((add, index) => {
                                                                                return (
                                                                                    <tr
                                                                                        style={{
                                                                                            fontSize: "12px",
                                                                                        }}
                                                                                        key={index}
                                                                                    >
                                                                                        <td>{add?.defectCategoryItem}</td>
                                                                                        <td>{add?.defectItem}</td>
                                                                                        <td>
                                                                                            {" "}
                                                                                            <Tooltip
                                                                                                arrow
                                                                                                placement="right"
                                                                                                title="remove"
                                                                                            >
                                                                                                <IconButton
                                                                                                    className="edit-btn"
                                                                                                    onClick={() =>
                                                                                                        handleRemoveButtonClick(
                                                                                                            index
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    <FaCircleMinus
                                                                                                        color="red"
                                                                                                        fontSize={20}
                                                                                                    />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </Table>
                                                                )}
                                                            </Col> */}
                                                        </Row>
                                                        <Row>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Defect Category</Form.Label>
                                                                    <Form.Select
                                                                        value={
                                                                            addDefectCategoryOption?.defectCategoryItem
                                                                        }
                                                                        onChange={(e) =>
                                                                            setAddDefectCategoryOption({
                                                                                ...addDefectCategoryOption,
                                                                                defectCategoryItem: e.target.value,
                                                                            })
                                                                        }

                                                                    >

                                                                        <option value=''>Select</option>
                                                                        <option value='High Vibration '>High Vibration	</option>
                                                                        <option value='Wrong Connection	'>Wrong Connection	</option>
                                                                        <option value='Paint Issue	'>Paint Issue</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Sub defect </Form.Label>
                                                                    <Form.Select
                                                                        value={
                                                                            addDefectCategoryOption?.defectItem
                                                                        }
                                                                        onChange={(e) =>
                                                                            setAddDefectCategoryOption({
                                                                                ...addDefectCategoryOption,
                                                                                defectItem: e.target.value,
                                                                            })
                                                                        }

                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="43 at TB">43 at TB</option>
                                                                        <option value="25( specify)">25( specify)
                                                                        </option>
                                                                        <option value="Failed due to overload	">Failed due to overload
                                                                        </option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="mt-4">
                                                                <Tooltip
                                                                    arrow
                                                                    placement="right"
                                                                    title="add"
                                                                >
                                                                    <IconButton
                                                                        className="edit-btn"
                                                                        onClick={handleAddDefect}
                                                                    >
                                                                        <FaCirclePlus
                                                                            color="green"
                                                                            fontSize={25}
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {/* <Button variant='' className='add-Btn' onClick={handleAddDefect}>Add</Button> */}
                                                            </Col>
                                                            <Col>
                                                                {defectList.length == 0 ? (
                                                                    ""
                                                                ) : (
                                                                    <Table responsive bordered className="mt-3">
                                                                        <thead>
                                                                            <tr
                                                                                style={{
                                                                                    fontSize: "12px",
                                                                                }}
                                                                            >
                                                                                <th>Defect Category</th>
                                                                                <th>Defect</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {defectList?.map((add, index) => {
                                                                                return (
                                                                                    <tr
                                                                                        style={{
                                                                                            fontSize: "12px",
                                                                                        }}
                                                                                        key={index}
                                                                                    >
                                                                                        <td>{add?.defectCategoryItem}</td>
                                                                                        <td>{add?.defectItem}</td>
                                                                                        <td>
                                                                                            {" "}
                                                                                            <Tooltip
                                                                                                arrow
                                                                                                placement="right"
                                                                                                title="remove"
                                                                                            >
                                                                                                <IconButton
                                                                                                    className="edit-btn"
                                                                                                    onClick={() =>
                                                                                                        handleRemoveButtonClick(
                                                                                                            index
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    <FaCircleMinus
                                                                                                        color="red"
                                                                                                        fontSize={20}
                                                                                                    />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </Table>
                                                                )}
                                                            </Col>
                                                        </Row>

                                                        <Row className='mt-1'>
                                                            {/* <Col md={3} >
                                                                <Form.Label>Complaint type</Form.Label>
                                                                <Form.Select
                                                                    name="ComplaintType"
                                                                >
                                                                    <option value="">Select</option>

                                                                </Form.Select>
                                                            </Col> */}
                                                            {/* <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Type of industry</Form.Label>
                                                                    <Form.Control type='text' />
                                                                </Form.Group>
                                                            </Col> */}
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Type of application</Form.Label>
                                                                    <Form.Select>
                                                                        <option value=''>Select</option>
                                                                        <option value='Aircurtain'>Aircurtain</option>
                                                                        <option value='ATM Machine'>ATM Machine</option>
                                                                        <option value='Atta Chakki'>Atta Chakki</option>
                                                                        <option value='Biotoilet'>Biotoilet</option>


                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Total no of hours run </Form.Label>
                                                                    <Form.Control type='number' />
                                                                </Form.Group>
                                                            </Col>



                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Failure observation</Form.Label>
                                                                    <Form.Control type='text' />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Closure Status</Form.Label>
                                                                    <Form.Select value={selectedClousureStatus} onChange={(e) => {
                                                                        setSelectedClousureStatus(e.target.value)
                                                                    }}>
                                                                        <option value=''>Select</option>
                                                                        <option value='Replacement from dealer'>Replacement from dealer</option>


                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            {
                                                                selectedClousureStatus === "Replacement from dealer" && (
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Replacement tag applied</Form.Label>
                                                                            <Form.Control type='text' />

                                                                        </Form.Group>
                                                                    </Col>
                                                                )
                                                            }
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Details of work done</Form.Label>
                                                                    <Form.Control type='text' />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Type of work done</Form.Label>
                                                                    {/* <Form.Select value={selectedTypeWorkDone} onChange={(e) => {
                                                                        setSelectedTypeWorkDone(e.target.value)
                                                                    }} >
                                                                        <option value=''>Select</option>
                                                                        <option value='Only site visit'>Only site visit</option>
                                                                        <option value='Site visit & repair done'>Site visit & repair done</option>
                                                                        <option value='Repair at ASC'>Repair at ASC</option>
                                                                        <option value='Bearing replacement at site'>Bearing replacement at site</option>
                                                                        <option value='Bearing replacement at ASC'>Bearing replacement at ASC</option>
                                                                        <option value='Other repair at ASC'>Other repair at ASC</option>

                                                                    </Form.Select> */}
                                                                    <MultiSelect
                                                                        options={options}
                                                                        value={addActivity?.typeOfActivity}
                                                                        onChange={function noRefCheck(e) {
                                                                            setAddActivity(prev => ({ ...prev, typeOfActivity: e }));
                                                                        }}

                                                                        valueRenderer={customValueRenderer}
                                                                        labelledBy={"Select"}
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            {addActivity?.typeOfActivity.some(item => item.value === "Bearing replacement at site") && (
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label>Bearing make & serial Number</Form.Label>
                                                                        <Form.Control type='text' />

                                                                    </Form.Group>
                                                                </Col>
                                                            )
                                                            }
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label>Photos Upload</Form.Label>
                                                                    <Form.Select
                                                                        value={selectedDivision}
                                                                        onChange={((e) => {
                                                                            setSelectedDivision(e.target.value)
                                                                        })}

                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="Serial Number label">Serial Number label</option>
                                                                        <option value="Installation condition">Installation condition</option>
                                                                        <option value="Electrical condition">Electrical condition</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            {
                                                                (selectedDivision === 'M3' || selectedDivision === 'CP') && (

                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Photos upload</Form.Label>
                                                                            <Form.Control type='file' />
                                                                        </Form.Group>
                                                                    </Col>
                                                                )
                                                            }
                                                            <Col>
                                                                <Button style={{
                                                                    marginTop: '29px'
                                                                }} variant='' className='add-Btn' onClick={() => {
                                                                    setClaim(true)
                                                                    setactiveKeyEdit('6')
                                                                }} >Submit</Button>
                                                            </Col>

                                                        </Row>







                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>


                                    </>





                                </Col>


                            </Row>

                        </Row>










                    </Card >
                </Col >

                <GenericModal show={showProductInfo} handleClose={handleCloseProductinfo} size='l' IsCentered='centered' className='mdl-title' title="Product Info"
                    body={
                        <>
                            <Card className="p-3">
                                <Row>
                                    <Col lg={12} md={12} sm={12}>

                                        <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                                            <div
                                                style={{ backgroundColor: "white", borderRadius: "8px" }}
                                                className="p-3"
                                            >

                                                <Row>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                                                            width={40}
                                                            height={40}
                                                            alt=""
                                                            srcset=""
                                                        />
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product model
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            Mini-Marshall
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product SN
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            0.55KNE4
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            LT Product
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Frame size
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            80
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Pole
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >

                                                            2P
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Voltage
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            5 Kw
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>

                                                    <Col lg={4} md={6} sm={6}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Date Created
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            12/06/2024
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Warranty Type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            W
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Service type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            Breakdown
                                                        </p>
                                                    </Col>

                                                </Row>

                                                <Card style={{
                                                    width: 'max-content',
                                                    background: 'white',
                                                    boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)"
                                                }} className="p-2 m-0">
                                                    <Row className='align-items-center'>

                                                        <Col md={2}>
                                                            <FaUserCircle fontSize={50} />

                                                        </Col>
                                                        <Col className='ml-2'>
                                                            <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                            <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Rajesh</p>
                                                        </Col>

                                                    </Row>
                                                    <Row className='mt-1'>
                                                        <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}>shivaji Nagar, Near School, Pune -400215 </p>
                                                    </Row>
                                                    <Row className='mt-1'>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>Rajesh@gmail.com</span> </p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                            fontSize={18} /> <span className='ml-2'>+91 91,0909,8989</span> </p>


                                                    </Row>
                                                </Card>
                                            </div>
                                        </Card>

                                    </Col>
                                </Row>
                            </Card>
                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseProductinfo}>
                            Close
                        </Button>

                    </>} />
            </Row >



        </>
    )
}

export default NewAssignRequest