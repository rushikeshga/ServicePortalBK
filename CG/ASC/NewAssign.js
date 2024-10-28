import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, Accordion, Form, InputGroup, Table } from 'react-bootstrap';
import { CgArrowsExchange, CgFileDocument } from 'react-icons/cg';
import { FaCircle, FaDownload, FaEye, FaFileDownload, FaUserCircle } from 'react-icons/fa';
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
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import useMessage from 'antd/es/message/useMessage';


const NewAssign = () => {
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

    const [showLogistic, setShowLogistic] = useState(false)
    const handleLogstic = () => {
        setShowLogistic(true)
    }
    const handleLogsticClose = () => {
        setShowLogistic(false)
    }

    const [showDistance, setShowDistance] = useState(false)
    const handleDistance = () => {
        setShowDistance(true)
    }
    const handleDistanceClose = () => {
        setShowDistance(false)
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

    const [currentProduct, setCurrentProduct] = useState([]);

    useEffect(() => {
        // Set static data to state (simulate fetch from API)
        const staticProductInfo = {
            productSerial: 'WCBM10134',
            pCode: '132TEFC',
            Pdescrription: '10.45kW 6POLE TEFC SCR MOTOR (MCP-RLY) (10.45KZ6-MCP) ',
            Batchno: '2',
            serialRequest: '208978979',
            InvoiceNo: '310759246',
            invoiceDate: '12/12/2023',
            requestDate: '11/07/2024',
            location: 'Yashodha Nagar, Chennai',
            companyName: 'Reliance Industry',
            divisionName: 'LT Motors',
            productLine: 'M3-DC Machines (DD)',
            productGroup: 'DC MACHINES',
            status: 'In Warranty',
            natureOfComplaint: 'Breakdown',
            ageOfpendency: '1',
            distnace: '2',
            issueType: 'open',
            assignTech: 'No',
            ascName: 'Patil Electric Works',
            branch: 'Mumbai',
        }

        // Set product info to state
        setProductInfo(staticProductInfo);

        // Optionally set a default product (for demonstration purposes)
        setCurrentProduct(staticProductInfo);

        // Set current date for date max value

    }, []);

    // const [addContacted, setAddContacted] = useState({
    //     contactDate: selectedDateContact,
    //     ConnectTime: '',
    //     Commment: '',
    //     ticketReject: '',
    //     Comment_two: ""
    // })
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
        setCurrentProduct(prev => ({
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

    const [addContacted, setAddContacted] = useState({
        AscCustomerContactedId: 0,
        ServiceTicketId: "",
        TypeService: "",
        ContactDate: '',
        SerialNo: "",
        ProductCode: "",
        InvoiceDate: "",
        InvoiceNo: "",
        Remarks: "",
        ServiceRequestStatusId: "",
        ServiceRequestSubStatusId: "",
        InvoiceDocFile: "",
        ServiceTicketStatus: "",
        AscActivitiesName: [],
    });





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

    const [selectedCancelRequest, setSelectedCancelRequest] = useState('');
    const [selectedCloseRequest, setSelectedCloseRequest] = useState('');
    const [selectedCustomerRequest, setSelectedCustomerRequest] = useState('');
    const [selectedProductRequest, setSelectedProductRequest] = useState('');
    const [selectedAssignRequest, setSelectedAssignRequest] = useState('')
    const [techList, setTechList] = useState('')


    const [addFirdata, setAddFirData] = useState({
        productSrNumber: '',
        division: '',
        productLine: "",
        productGroup: "",
        productCode: '',
        productDescription: "",
        batchNo: "",
        invoiceNo: '',
        invoiceDate: '',
        warrantyDate: '',
        invoiceCopy: "",
        typeofApplication: "",
        totalNoHours: '',
        failureObservation: "",
        defectCategory: '',
        subDefect: '',
        serialNumberSticker: '',
        installtionCondition: "",
        electricalCondition: '',
        clousurStatus: '',
        replaceTag: "",
        detailsWorkDone: '',
        typeOfworkDone: [],
        spare: '',
        repairASC: ''
    })
    const handleChangeFir = (e) => {
        const newdata = { ...addFirdata };
        newdata[e.target.name] = e.target.value;
        setAddFirData(newdata);
        console.log(newdata);
    };


    // const ServiceRequest = {
    //     Close: "Close",
    //     Cancelled: 'Cancelled',
    //     CUSTOMER_NEGLIGENCE: "CUSTOMER NEGLIGENCE",
    // }

    const ServiceRequest = {
        Cancelled: "Cancelled",
        Close: "Closed at intial stage",
        Customer: "Customer carelessness",
        Reject: 'Rejected',

        Product: "Product required at workshop",
        site: 'Site visit planned'

    };
    const ServiceRequest2 = {
        Cancelled: "Cancelled",
        Close: "Closed at intial stage",
        Customer: "Customer negligence",
        Product: "Product required at workshop",
        // site: 'Site visit planned'

    };
    const Cancelled = {
        not: "Not a CG product",
        Cancelled: 'Out of warranty – customer not ready to pay',
        CUSTOMER_NEGLIGENCE: "Problem not related to CG product",
        tech_not_allowed: 'Technician not available'


    }
    const reject = {
        notMy: 'Not My Area',
        NotProduct: 'Not My Product'
    }
    const Closed = {
        Resolved: "Resolved on phone call",

    }

    const Customer = {
        Customer_not: "Closed by Customer (not ready to pay)",
        Customer: "Product in warranty - Paid service",

    }
    const product = {
        product: "Product to be received at workshop",

    }
    const assignTech = {
        Tech: "Assign technician",

    }
    const assignTechList = {
        Tech1: "Ajay",
        Tech1: "Vijay",


    }
    const [selectedServiceRequest, setSelectedServiceRequest] = useState('');
    // const [selectedDivision, setSelectedDivision] = useState('')

    const handleServiceRequestChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedServiceRequest(selectedValue);
    };
    const handleServiceCancelChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCancelRequest(selectedValue);

        console.log(selectedValue, '-------------')
    };
    const handleServiceCloseChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCloseRequest(selectedValue);
        console.log(selectedValue, '-------------')
    };
    const handleServiceCustomerChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCustomerRequest(selectedValue);
        console.log(selectedValue, '-------------')
    };
    const handleServiceProductChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedProductRequest(selectedValue);
        console.log(selectedValue, '-------------')
    };
    const handleServiceAssignChange = (event) => {
        const selectedValue = event.target.value;
        setTechList(selectedValue);
        console.log(selectedValue, '-------------')
    };
    const handleServiceAssignListChange = (event) => {
        const selectedValue = event.target.value;
        // setTechList(selectedValue);
        console.log(selectedValue, '-------------')
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
    // const options = [
    //     { label: "Only site visit", value: "Only site visit" },
    //     { label: "Site visit & repair done", value: "Site visit & repair done" },
    //     { label: "Repair at ASC", value: "Repair at ASC" },
    //     { label: "Bearing replacement at site", value: "Bearing replacement at site" },
    //     { label: "Bearing replacement at ASC", value: "Bearing replacement at ASC" },
    //     { label: "Other repair at ASC", value: "Other repair at ASC" },
    //     { label: "First level repair", value: "First level repair" },
    //     { label: "Second level repair", value: "Second level repair" },
    // ];


    // const myJSON = JSON.stringify(obj);

    const [typeOfWorkdown, setTypeofWorkdown] = useState([]);
    const TaskStatus = {
        Work_completed: "Work completed ",

        Product: "Product Needs to be Replaced",

        Product_at_ASC: "Product required at ASC",
        Spares_pending: "Product received at ASC",
        Revisit_pending: "Product not received at ASC",
        Work_void: "Work void ",


    };
    const TaskStatuss = {
        visit: 'Visit done (Inspection)',
        rewinding: 'Rewinding',
        first_level: 'First level repair',
        second_level: 'Second level repair',
        Visit_done: 'Visit Done, Product to be picked up.'



    };




    const [addActivityIten, setaddActivityIten] = useState([])
    const [addActivity, setaddActivity] = useState({
        typeOfActivity: [],
        Units: 'KW',
        chaargesUnit: 'KWW'
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


    const handleRemoveButtonClick = (index) => {
        const updatedData = [...defectList];
        updatedData.splice(index, 1);
        setDefectList(updatedData);
    };

    useEffect(() => {
        console.log(addActivityIten); // Log updated addActivityIten whenever it changes
    }, [addActivityIten]);

    const handleAddActivityItem = () => {
        if (addActivity?.activityStartDate === '' || addActivity?.taskStatus === '') {
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
            setaddActivity({
                activityStartDate: '',
                typeOfActivity: [],
                taskStatus: '',
                activityEndDate: ""




            })
            // setaddActivity(initialActivityState); // Reset addActivity to initial state
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


    const handleVerify = (e) => {
        e.preventDefault();
        setVerifiedProduct(true);





    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

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
    //   const handleRemoveButtonClick = (index) => {
    //     const updatedData = [...defectList];
    //     updatedData.splice(index, 1);
    //     setDefectList(updatedData);
    //   };

    //   const customValueRenderer = (selected, _options) => {
    //     return selected.length
    //       ? selected.map(({ label }) => label).join(", ")
    //       : "Select...";
    //   };
    const options = [

        // {
        //     label: "Visit at Site",
        //     value: "Visit at Site",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''



        // },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '900Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Compensation for Carrying out Repair Job at ASC Workshop", value: "Compensation for Carrying out Repair Job at ASC Workshop",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },
        {
            label: "Compensation for Carrying out Repair Job at ASC Workshop",
            value: "Compensation for Carrying out Repair Job at ASC Workshop",
            parameter: 'Painting & Finishing',
            possibleValue: 'Painting B48',
            rate: '100',
            claimRate: '100',
            TicketNum: 'CGPISL123',
            ComplainType: 'WorkShop'
        },
        {
            label: "Rewinding ",
            value: "Rewinding",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '1200Rs',
            Reason: ''
        },

    ];
    const optionsSite = [

        {
            label: "Visit at Site",
            value: "Visit at Site",
            parameter: 'Includes Minor Repairs, Inspection & Testing. ',
            possibleValue: 'Up to 160 Frame.',
            rate: '650',
            claimRate: 'NO',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'





        },
        {
            label: "Repair Charges at Site-Bearing Replacement.",
            value: "Repair Charges at Site-Bearing Replacement.",
            value: "Visit at Site",
            parameter: 'Includes Minor Repairs, Inspection & Testing. ',
            possibleValue: 'Up to 160 Frame.',
            rate: '650',
            claimRate: 'NO',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'

        },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Compensation for Carrying out Repair Job at ASC Workshop-Alternators ", value: "Compensation for Carrying out Repair Job at ASC Workshop-Alternators ",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },
        // { label: "Compensation for Carrying out Repair Job at ASC Workshop --Motors", value: "Compensation for Carrying out Repair Job at ASC Workshop --Motors" },
        // {
        //     label: "Rewinding ",
        //     value: "Rewinding",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },

    ];

    const optionsypeWorkDone = [
        {
            label: "Spare consumption",
            value: "Spare consumption",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '1200Rs',
            Deviation: '1800',
            Reason: ''
        },
        {
            label: "Repair at ASC",
            value: "Repair at ASC",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '1200Rs',
            Deviation: '1800',
            Reason: ''
        },
        // {label:,value:}
        {
            label: "Painting & finishing (B48 & B42 frame)",
            value: "Painting Charges (B48 & B42 frame)"
        },

    ];

    const initialDocuments = [
        { label: 'Product name plate', file: '' },
        { label: 'Product photo prior to repairing', file: '' },
        { label: 'Product photos after repairing/correction', file: '' }
    ];

    // State for document files
    const [documentUpload, setDocuments] = useState(initialDocuments);

    const [uploadPhoto, setUploadPhoto] = useState({
        label: '',
        filee: ""
    });
    const handleFileChangeUpload = (index) => (e) => {
        const file = e.target.files[0];
        if (file && /\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
            const updatedDocuments = [...documentUpload];
            updatedDocuments[index] = { ...updatedDocuments[index], file: URL.createObjectURL(file) };
            setDocuments(updatedDocuments);
            console.log(documentUpload)
        } else {
            alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
            e.target.value = null;
        }
    };

    // Handler to preview file
    const handlePreview = (fileUrl) => () => {
        if (fileUrl) {
            window.open(fileUrl, '_blank');
        }
    };

    const [fileInputs, setfileInputs] = useState([]);

    const [typeSelected, setTypeSelected] = useState('')


    const addFileInput = () => {
        setfileInputs([...fileInputs, uploadPhoto]);
        console.log(...fileInputs, uploadPhoto, '----------add')

    };
    const handleRemovefile = (index) => {
        const updatedfile = [...fileInputs];
        updatedfile.splice(index, 1);
        setfileInputs(updatedfile);
        console.log(index)
    };
    const [spareList, setSpareList] = useState([]);
    const [typeSelectedSpare, setTypeSelectedSpare] = useState('')


    const handleRemoveSpare = (index) => {
        const updatedSpare = [...spareList];
        updatedSpare.splice(index, 1);
        setSpareList(updatedSpare);
        console.log(index)
    };

    const [activityList, setActivityList] = useState([]);
    const [activityUpload, setActiviityUpload] = useState([{
        desc: '',
        qun: "",
        activity: ''
    }]);
    const activityAdd = () => {
        if (typeSelected) {
            setActivityList([
                ...activityList,
                { type: typeSelected, desc: '', quantity: 1 }
            ]);
            setTypeSelected(''); // Clear selection after adding
        } else {
            alert('Please select an activity type');
        }
    };


    const handleRemoveActivity = (index) => {
        const updatedActivity = [...activityList];
        updatedActivity.splice(index, 1);
        setActivityList(updatedActivity);
        console.log(index)
    };

    // const [file, setFile] = useState();
    const handleFIRSubmit = () => {
        if (addFirdata?.productSrNumber === '' || addFirdata?.division === '' || addFirdata?.productLine == '' || addFirdata?.productGroup == '' || addFirdata?.productCode == '' || addFirdata?.productDescription == '' || addFirdata?.batchNo == '' || addFirdata?.invoiceNo == '' || addFirdata?.invoiceDate == '' || addFirdata?.warrantyDate == '' || addFirdata?.typeofApplication == '' || addFirdata?.totalNoHours == '' || addFirdata?.failureObservation == '' || addFirdata?.serialNumberSticker == '' || addFirdata?.installtionCondition == '' || addFirdata?.electricalCondition == '' || addFirdata?.clousurStatus == '' || addFirdata?.detailsWorkDone == '' || addFirdata?.typeOfworkDone == '') {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            })
        }
        else if (defectList.length == 0) {
            Swal.fire({
                icon: "error",
                title: "Please add defect   "
            })

        }
        else {
            alert('data saved suceefull')



        }
    }


    //   const handleChange2 = (e) => {
    //     const newdata = { ...addFirdata };
    //     newdata[e.target.name] = e.target.value;
    //     setAddFirData(newdata);
    //     console.log(newdata);
    //   };
    // const [addFirdata, setAddFirData] = useState({
    //     productSrNumber: '',
    //     division: '',
    //     productLine: "",
    //     productGroup: "",
    //     productCode: '',
    //     productDescription: "",
    //     batchNo: "",
    //     invoiceNo: '',
    //     invoiceDate: '',
    //     warrantyDate: '',
    //     invoiceCopy: "",
    //     typeofApplication: "",
    //     totalNoHours: '',
    //     failureObservation: "",
    //     defectCategory: '',
    //     subDefect: '',
    //     serialNumberSticker: '',
    //     installtionCondition: "",
    //     electricalCondition: '',
    //     clousurStatus: '',
    //     replaceTag: "",
    //     detailsWorkDone: '',
    //     typeOfworkDone: [],
    //     spare: '',
    //     repairASC: ''
    //   })
    let token = localStorage.getItem("UserToken")

    const [spareListDivision, setSpareListDivision] = useState([])
    useEffect(() => {
        const getAllSpareListDivisionWise = `${process.env.REACT_APP_API_URL}Spare/GetAllSpare?DivisionCode=M3`;

        fetch(getAllSpareListDivisionWise, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setSpareListDivision(result)

            })
    }, [])





    const initialActivities = [
        { id: 0, name: '130021029W	FAN M/CED CI D/E 112-147C Q652 OLD', desc: 'FAN M/CED CI D/E 112-147C Q652 OLD' },
        { id: 1, name: '130021401W	BRG. COVER M/CED C112-140', desc: '' },
        { id: 2, name: '130021502W	STATOR M/CED E112M-122,HW2403', desc: '' },
        { id: 3, name: '130041582	KEY OER EN8 10X8X60 MM', desc: '' },
        { id: 4, name: '130121017	BEARING BALL 6210-2Z C3', desc: 'BEARING BALL 6210-2Z C3' }
    ];
    const [selectedSpare, setSelectedSpare] = useState([]);
    console.log(spareListDivision, '--------------sp')


    const formatResult = (item) => {
        // console.log(item,'item----------------')
        return (
            <>

                <span style={{ display: 'block', textAlign: 'left' }}>{item.spareCode + '' + item.spareDescription}</span>
            </>
        )
    }
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setSelectedSpare(item);
        console.log(item, 'item----')

    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    // const [spareList, setSpareList] = useState([]);

    const spareAdd = () => {
        console.log(selectedSpare, 'selected')
        if (selectedSpare) {
            setSpareList([
                ...spareList,
                { type: selectedSpare?.spareCode, desc: selectedSpare?.spareDescription, quantity: 1 }
            ]);

            console.log(spareListDivision, '0900')

            // setSelectedSpare(null); // Clear selection after adding
        } else {
            alert('Please select an spare type');
        }
    };
    let serialNumberShow = spareList?.map((add, index) => {
        return add?.desc?.includes('BEARING')
    })
    console.log(serialNumberShow)

    const [verifyFristStepFir, setVerifyFristStepFir] = useState(false)
    const [verifyFristSecondFir, setVerifyFristSecondFir] = useState(false)


    const [showDetails, setShowDetails] = useState(false);
    const [showDetailsLogistic, setShowDetailsLogistic] = useState(false)

    // Toggle the state when checkbox is clicked
    const handleCheckboxChange = (event) => {
        setShowDetails(event.target.checked);
    };
    const handleCheckboxChangeLogistic = (event) => {
        setShowDetailsLogistic(event.target.checked);
        setShowDetails(false)
    };

    const [selectedOptionradio, setSelectedOptionradio] = useState('');

    // Handle radio button change
    const handleRadioChangeradio = (event) => {
        setSelectedOptionradio(event.target.value);
    };


    const [isCheckedDeviation, setIsCheckedDeviation] = useState(false);
    const [isCheckedOther, setIsCheckedOther] = useState(false);
    const handleOtherCheckBox = (e) => {
        setIsCheckedOther(e.target.checked)


    }


    const handleCheckboxDeviation = (event, index) => {
        setIsCheckedDeviation(prevState => ({
            ...prevState,
            [index]: event.target.checked
        }));
    };

    const [serialNumbers, setSerialNumbers] = useState({});
    const [quantities, setQuantities] = useState({});



    const handleQuantityChange = (index, value) => {
        setQuantities(prev => {
            const updated = { ...prev, [index]: value };
            // Ensure serialNumbers state is updated to match new quantity
            if (updated[index] > (serialNumbers[index]?.length || 0)) {
                // Add new serial number fields
                setSerialNumbers(prevSerials => ({
                    ...prevSerials,
                    [index]: [...(prevSerials[index] || []), ...Array(updated[index] - (prevSerials[index]?.length || 0)).fill('')]
                }));
            } else {
                // Remove extra serial number fields
                setSerialNumbers(prevSerials => ({
                    ...prevSerials,
                    [index]: (prevSerials[index] || []).slice(0, updated[index])
                }));
            }
            return updated;
        });
    };
    const handleSerialNumberChange = (index, serialIndex, value) => {
        setSerialNumbers(prev => {
            const updated = { ...prev };
            if (!updated[index]) updated[index] = [];
            updated[index][serialIndex] = value;
            return updated;
        });
    };

    const [logsticValue, setLogticValue] = useState('')

    const DeviationClaim = [
        {
            type: 'Early Morning(7:30Am)',
            value: 'Early Morning(7:30Am)',
            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'

            // parameter: 'Includes Minor Repairs, Inspection & Testing. ',
            // possibleValue: 'Up to 160 Frame.',
            // rate: '650',
            // claimRate: 'NO',
            // TicketNum: 'CGPISL123',
        },
        {
            type: 'Logstic',
            value: 'Logstic',

            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'




        },

        {
            type: 'distance',
            value: 'distance',
            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'


        }



    ]

    const [selectedType, setSelectedType] = useState('');
    const [formData, setFormData] = useState([]);
    const activy = addFirdata?.typeOfworkDone


    console.log(activy, 'hello')
    const CliamList = addActivityIten?.map((val) => val.typeOfActivity)
    let flattened = CliamList?.flat()
    const [combined, setCombined] = useState([])
    let arrayCombine = [...flattened, ...activy];
    console.log(arrayCombine, '---------------')

    console.log(combined, 'combinedddddd')
    // let combined = [...flattened, ...activy];







    console.log(combined, '-----------pavan')

    const handleTypeChange = (e) => {
        const type = e.target.value
        setSelectedType(type)
        console.log(type, 'type--------------')
        console.log(DeviationClaim, 'ddddddd')
        const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
        setFormData(ClaimRequest)
        console.log(formData)
        console.log(ClaimRequest, 'rrr------------')

        if (type === 'Logistic Charges') {
            handleLogstic()
            const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
            setFormData(ClaimRequest)

        }
        if (type === 'Changes in distance') {
            handleDistance()
            const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
            setFormData(ClaimRequest)

        }


    }

    const handleAddRow = () => {

        setCombined((prev) => [
            ...prev, ...formData

        ]);
        setFormData([]);
        setSelectedType('')
    };

    const handleSaveLogstic = () => {
        // Update the rate in formData
        const updatedFormData = DeviationClaim.filter(item =>
            item.type === 'Logistic Charges'
                ? { ...item, rate: logsticValue } // Update the rate for 'Logistic Charges'
                : item
        );
        console.log(updatedFormData, 'update')

        // Add updated formData to combined
        setFormData((prev) => [
            ...prev,
            ...updatedFormData
        ]);

        console.log(formData, 'newcom')

        // Clear formData
        setFormData([]);
    };

    const [distance, setDistance] = useState('');
    const [selectedOptionradiodistance, setSelectedOptionradiodistance] = useState('');

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    };

    const handleRadioChangeradioDistance = (e) => {
        setSelectedOptionradio(e.target.value);
    };

    const isDistanceAbove30 = Number(distance) > 30;



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
                                    // onClick={handleShowProductInfo}
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

                                                                {/* <Row className="justify-content-center text-center">
                                                                            <Col lg={12} md={6} sm={12}>
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Customer Contacted"
                                                                                    name="radioGroup"
                                                                                    value="customer"
                                                                                    checked={
                                                                                        addContacted?.TypeService ==
                                                                                        "Customer Contacted"
                                                                                    }
                                                                                    style={{
                                                                                        color: "#000",
                                                                                        fontWeight: "400",
                                                                                        fontSize: "12px",
                                                                                        textAlign: "left",
                                                                                        margin: "15px 15px 0px 0px",
                                                                                        display: "inline-block",
                                                                                    }}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.checked) {
                                                                                            setAddContacted((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    TypeService:
                                                                                                        "Customer Contacted",
                                                                                                };
                                                                                            });
                                                                                        } else {
                                                                                            setAddContacted((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    TypeService: "",
                                                                                                    contactDate: ''
                                                                                                };
                                                                                            });
                                                                                        }

                                                                                        setAddContacted((pre) => {
                                                                                            return {
                                                                                                ...pre,
                                                                                                ServiceRequestStatusId: "",
                                                                                                contactDate: ''
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Product already received at workshop"
                                                                                    name="radioGroup"
                                                                                    checked={
                                                                                        addContacted?.TypeService ==
                                                                                        "Product already received at workshop"
                                                                                    }
                                                                                    value="workshop"
                                                                                    onChange={(e) => {
                                                                                        if (e.target.checked) {
                                                                                            setAddContacted((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    TypeService:
                                                                                                        "Product already received at workshop",
                                                                                                    contactDate: ""
                                                                                                };
                                                                                            });
                                                                                        } else {
                                                                                            setAddContacted((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    TypeService: "",
                                                                                                    contactDate: ''
                                                                                                };
                                                                                            });
                                                                                        }
                                                                                        setAddContacted((pre) => {
                                                                                            return {
                                                                                                ...pre,
                                                                                                ServiceRequestStatusId: "",
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                    style={{
                                                                                        color: "#000",
                                                                                        fontWeight: "400",
                                                                                        fontSize: "12px",
                                                                                        textAlign: "left",
                                                                                        margin: "15px 15px 0px 0px",
                                                                                        display: "inline-block",
                                                                                    }}
                                                                                />
                                                                            </Col>
                                                                        </Row> */}



                                                                <>
                                                                    <Row className=' mt-1 align-items-center justofy-content-center  '>
                                                                        <Col md={2} style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>Contact date<span className="req-t">*</span></Form.Label>
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
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group>
                                                                                <Form.Label className="text-start">
                                                                                    Serial No{" "}
                                                                                    <span className="req-t">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="productSerial"
                                                                                    value={currentProduct?.productSerial || ''}
                                                                                    onChange={customerhandleChange}


                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                            <Form.Label>
                                                                                Product Code{" "}
                                                                                <span className="req-t">*</span>
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="pCode"
                                                                                value={currentProduct?.pCode || ''}
                                                                                onChange={customerhandleChange}



                                                                            />
                                                                        </Col>
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group>
                                                                                <Form.Label className="text-start">
                                                                                    Invoice No{" "}
                                                                                    <span className="req-t">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="InvoiceNo"
                                                                                    value={currentProduct?.InvoiceNo || ''}
                                                                                    onChange={customerhandleChange}



                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>
                                                                                    Invoice date{" "}
                                                                                    <span className="req-t">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    type="date"
                                                                                    max={currentDate}
                                                                                    onChange={handleChange}
                                                                                // value={currentProduct?.invoiceDate || ''}




                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={1} className='m-0 p-0' style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group>
                                                                                <Form.Label>Download invoice </Form.Label>
                                                                                <p className='m-0 p-0 text-center'>  <FaDownload
                                                                                    fontSize={20} color='#7bc143' className='mx-4 pointer' />
                                                                                </p>
                                                                            </Form.Group>

                                                                        </Col>
                                                                        {
                                                                            verifiedProduct ? (
                                                                                "") : (
                                                                                <Col md={1} style={{
                                                                                    display: 'flex',
                                                                                    flexDirection: 'row-reverse'
                                                                                }} className='mt-4 '>

                                                                                    <Button
                                                                                        variant=""
                                                                                        // disabled={verifiedProduct}
                                                                                        onClick={handleVerify}
                                                                                        className="add-Btn"
                                                                                    >
                                                                                        <MdVerifiedUser fontSize={20} />
                                                                                    </Button>
                                                                                </Col>
                                                                            )
                                                                        }


                                                                    </Row>
                                                                    {
                                                                        verifiedProduct && (

                                                                            <><Row className='mt-2'>

                                                                                <Col md={2}>

                                                                                    <Form.Label>
                                                                                        Warranty Status :
                                                                                    </Form.Label>

                                                                                    <Button variant='' className="m-0 add-Btn">



                                                                                        In warranty

                                                                                    </Button>
                                                                                </Col>




                                                                            </Row><Row className=''>
                                                                                    <Col md={2}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Service request status</Form.Label>
                                                                                            <Form.Select onChange={handleServiceRequestChange}>
                                                                                                <option value=''>Select</option>
                                                                                                {Object.keys(ServiceRequest).map(key => (
                                                                                                    <option key={key} value={key}>{ServiceRequest[key]}</option>
                                                                                                ))}

                                                                                            </Form.Select>

                                                                                        </Form.Group>
                                                                                    </Col>



                                                                                    {selectedServiceRequest === 'Cancelled' && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCancelChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(Cancelled).map(key => (
                                                                                                        <option key={key} value={key}>{Cancelled[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'Close') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCloseChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(Closed).map(key => (
                                                                                                        <option key={key} value={key}>{Closed[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'Customer') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCustomerChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(Customer).map(key => (
                                                                                                        <option key={key} value={key}>{Customer[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'Reject') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCustomerChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(reject).map(key => (
                                                                                                        <option key={key} value={key}>{reject[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'Product') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Product recevied date</Form.Label>
                                                                                                <Form.Control type='date' min={currentDate} />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'site') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Site visit date</Form.Label>
                                                                                                <Form.Control type='date' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'site') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Assign tech</Form.Label>
                                                                                                <Form.Select onChange={handleServiceAssignListChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(assignTechList).map(key => (
                                                                                                        <option key={key} value={key}>{assignTechList[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}

                                                                                    {(selectedServiceRequest === 'Product') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Complain type</Form.Label>
                                                                                                <Form.Control type='text' readOnly value='Workshop' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}
                                                                                    {(selectedServiceRequest === 'site') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Complain type</Form.Label>
                                                                                                <Form.Control type='text' readOnly value='Field' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}


                                                                                    {(selectedServiceRequest === 'Cancelled' || selectedServiceRequest === 'Close' || selectedServiceRequest === 'Customer' || selectedServiceRequest === 'site' || selectedServiceRequest === 'Product' || selectedServiceRequest === 'Reject') && (
                                                                                        <Col md={4}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Remarks</Form.Label>
                                                                                                <Form.Control as='textarea' rows='2' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )}


                                                                                </Row>
                                                                                <Row className='justify-content-center align-items-center mt-2'>
                                                                                    <Col md={1} >
                                                                                        <Button
                                                                                            variant=""
                                                                                            // disabled={verifiedProduct}
                                                                                            onClick={() => {
                                                                                                setCustomerData(true);
                                                                                                setactiveKeyEdit('1');
                                                                                            }}
                                                                                            className="add-Btn"
                                                                                        >
                                                                                            Submit
                                                                                        </Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </>

                                                                        )
                                                                    }



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
                                                                    activity
                                                                        ?
                                                                        <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                        : <strong className='mr-2'>2</strong>
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
                                                                        setactiveKeyEdit('0')

                                                                    }} /></Button>

                                                                </span>
                                                            </span>

                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='pt-0 pb-1'>

                                                        <Row>
                                                            {(selectedServiceRequest === 'Product') && (
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label>Complain type</Form.Label>
                                                                        <Form.Control type='text' readOnly value='Workshop' />
                                                                    </Form.Group>
                                                                </Col>
                                                            )}
                                                            {(selectedServiceRequest === 'site') && (
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label>Complain type</Form.Label>
                                                                        <Form.Control type='text' readOnly value='Field' />
                                                                    </Form.Group>
                                                                </Col>
                                                            )}
                                                            <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Date<span className="req-t">*</span></Form.Label>
                                                                    <Form.Control type='date'
                                                                        name='activityStartDate'
                                                                        disabled={submitEnabled}
                                                                        value={addActivity?.activityStartDate}
                                                                        onChange={(e) => setaddActivity(prev => ({ ...prev, activityStartDate: e.target.value }))}
                                                                        min={currentDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            {(selectedServiceRequest === 'Product') && (

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
                                                                                setaddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                            }}
                                                                            hasSelectAll={false}
                                                                            valueRenderer={customValueRenderer}


                                                                        // labelledBy="Select" 
                                                                        />
                                                                        {/* <Form.Select value={addActivity?.typeOfActivity}
                                                                                disabled={submitEnabled}

                                                                                onChange={(e) => {
                                                                                    const selectedStatus = e.target.value;
                                                                                    setaddActivity(prev => ({ ...prev, typeOfActivity: selectedStatus }));
                                                                                    // Enable submit button if 'Work completed' is selected

                                                                                }}

                                                                            >
                                                                                <option value=''>Select</option>
                                                                                {Object.keys(TaskStatuss).map(key => (
                                                                                    <option key={key} value={key}>{TaskStatuss[key]}</option>
                                                                                ))}
                                                                            </Form.Select> */}
                                                                    </Form.Group>
                                                                </Col>
                                                            )
                                                            }
                                                            {(selectedServiceRequest === 'site') && (

                                                                <Col md={3} style={{
                                                                    whiteSpace: 'nowrap'
                                                                }}>
                                                                    <Form.Group className="text-start">
                                                                        <Form.Label> Type of activity <span className="req-t">*</span></Form.Label>
                                                                        <MultiSelect
                                                                            options={optionsSite}
                                                                            disabled={submitEnabled}


                                                                            value={addActivity?.typeOfActivity}
                                                                            onChange={function noRefCheck(e) {
                                                                                setaddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                            }}
                                                                            hasSelectAll={false}
                                                                            valueRenderer={customValueRenderer}


                                                                        // labelledBy="Select" 
                                                                        />
                                                                        {/* <Form.Select value={addActivity?.typeOfActivity}
                            disabled={submitEnabled}

                            onChange={(e) => {
                            const selectedStatus = e.target.value;
                            setaddActivity(prev => ({ ...prev, typeOfActivity: selectedStatus }));
                            // Enable submit button if 'Work completed' is selected

                            }}

                            >
                            <option value=''>Select</option>
                            {Object.keys(TaskStatuss).map(key => (
                            <option key={key} value={key}>{TaskStatuss[key]}</option>
                            ))}
                            </Form.Select> */}
                                                                    </Form.Group>
                                                                </Col>
                                                            )
                                                            }





                                                            <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Status <span className="req-t">*</span></Form.Label>
                                                                    <Form.Select value={addActivity?.taskStatus}
                                                                        disabled={submitEnabled}


                                                                        onChange={(e) => {
                                                                            const selectedStatus = e.target.value;
                                                                            setaddActivity(prev => ({ ...prev, taskStatus: selectedStatus }));
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

                                                            {/* <Col style={{
                                                                        marginTop: '28px'
                                                                    }} md={1}><Button variant='' className='add-Btn' onClick={handleAddActivityItem}>Add</Button></Col> */}
                                                            <Col md={1} style={{
                                                                marginTop: '26px'
                                                            }}>
                                                                <Tooltip
                                                                    arrow
                                                                    placement="right"
                                                                    title="add "
                                                                >
                                                                    <IconButton
                                                                        className="edit-btn"
                                                                        onClick={handleAddActivityItem}
                                                                    >
                                                                        <FaCirclePlus
                                                                            color="green"
                                                                            fontSize={25}
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Col>



                                                        </Row>

                                                        <Row>
                                                            {addActivityIten.length == 0 ? (
                                                                ""
                                                            ) : (
                                                                <Col md={9}>

                                                                    <Table responsive bordered className="mt-1">
                                                                        <thead>
                                                                            <tr
                                                                                style={{
                                                                                    fontSize: "12px",
                                                                                }}
                                                                            >
                                                                                <th className='m-0 pl-1 py-1 align-content-center'> Date</th>
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Type of activity</th>
                                                                                {/* <th className='m-0 pl-1 py-1 align-content-center'>End date</th> */}
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
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add.typeOfActivity.map(item => item.value).toString()}</td>

                                                                                        {/* <td className='m-0 pl-1 py-1 align-content-center'>{add?.activityEndDate}</td> */}
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{TaskStatus[add.taskStatus]}</td>





                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </Table>
                                                                </Col>
                                                            )}
                                                        </Row>

                                                        <Row className='p-0 mt-2 justify-content-center align-items-center'>
                                                            <Col md={2}>
                                                                <Button disabled={!submitEnabled} variant='' className='add-Btn' onClick={() => {
                                                                    {
                                                                        setActivity(true)
                                                                        setactiveKeyEdit('2')

                                                                    }

                                                                }} >Submit</Button>
                                                            </Col>

                                                        </Row>




                                                    </Accordion.Body>

                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                                                            <p className="m-0">
                                                                {serviceTasks ? (
                                                                    <FaCircleCheck
                                                                        color="#58a718"
                                                                        fontSize={20}
                                                                        className="mr-2"
                                                                    />
                                                                ) : (
                                                                    <strong className="mr-2">3</strong>
                                                                )}
                                                                Service activity/field information report
                                                            </p>
                                                            <span>
                                                                {/* <Button
                                                                            disabled={!serviceTasks}
                                                                            variant=""
                                                                            style={{
                                                                                outline: "none",
                                                                                border: "none",
                                                                            }}
                                                                        >
                                                                            <IoMdSave
                                                                                onClick={() => {
                                                                                    setServiceTasks(true);
                                                                                    setactiveKeyEdit("5");
                                                                                }}
                                                                                color="#7bc143"
                                                                                fontSize={20}
                                                                            />
                                                                        </Button> */}
                                                                <span>
                                                                    <Button
                                                                        style={{
                                                                            outline: "none",
                                                                            border: "none",
                                                                        }}
                                                                        variant=""
                                                                    >
                                                                        {" "}
                                                                        <IoArrowUpOutline
                                                                            fontSize={15}
                                                                            color="#fff"
                                                                            onClick={() => {
                                                                                // setactiveKeyEdit('1')
                                                                                if (alreadyWorkshoop) {
                                                                                    setactiveKeyEdit("0");
                                                                                } else {
                                                                                    setactiveKeyEdit("1");
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="pt-0 pb-1">
                                                        <Row>
                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Product Serial No</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="productSerial"
                                                                        disabled={verifyFristStepFir}

                                                                        value={currentProduct?.productSerial || ''}
                                                                        onChange={customerhandleChange}
                                                                    // value={tab3Data?.SerialNo}


                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Product Code</Form.Label>


                                                                    <Form.Control
                                                                        type="text"
                                                                        disabled={verifyFristStepFir}

                                                                        value={currentProduct?.pCode || ''}
                                                                        onChange={handleChangeFir}
                                                                    // value={tab3Data?.ProductCode}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Division</Form.Label>
                                                                    <Form.Control type='text' value={currentProduct?.divisionName || ''}
                                                                        onChange={handleChange} readOnly />


                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Product Line</Form.Label>
                                                                    <Form.Control type='text' readOnly value={currentProduct?.productLine || ''}
                                                                        onChange={handleChange} />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Product Group</Form.Label>
                                                                    <Form.Control type='text' readOnly value={currentProduct?.productGroup || ''}
                                                                        onChange={handleChange} />

                                                                </Form.Group>
                                                            </Col>

                                                            <Col md={2} className="mt-3">
                                                                <Form.Group>
                                                                    <Form.Label>Product Description</Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        value={currentProduct?.Pdescrription || ''}
                                                                        onChange={handleChange}
                                                                        // value={tab3Data?.ProductDescription}
                                                                        readOnly
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-2">
                                                            <Col md={2} >
                                                                <Form.Group>
                                                                    <Form.Label>Batch no</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={currentProduct?.Batchno || ''}
                                                                        onChange={handleChange}
                                                                        // value={tab3Data?.ProductDescription}
                                                                        readOnly
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Invoice Date <span className="req-t">*</span></Form.Label>
                                                                    <Form.Control
                                                                        type="date"
                                                                        name='invoiceDate'
                                                                        value={addFirdata?.invoiceDate}
                                                                        onChange={(e) => {
                                                                            setAddFirData((pre) => {
                                                                                return {
                                                                                    ...pre,
                                                                                    invoiceDate: e.target.value
                                                                                }
                                                                            })
                                                                        }}

                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Warranty Date</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="warrantyDate"
                                                                        readOnly

                                                                        value='12/10/2024'
                                                                        onChange={handleChange}

                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            {/* <Col md={3} style={{
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Form.Group className="text-start">
                                                                    <Form.Label>Frame repaired <span className="req-t">*</span></Form.Label>
                                                                    <Form.Select value={addActivity?.taskStatus}
                                                                        


                                                                      

                                                                    >
                                                                        <option value=''>Select</option>
                                                                        {Object.keys(TaskStatus).map(key => (
                                                                            <option key={key} value={key}>{TaskStatus[key]}</option>
                                                                        ))}
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col> */}
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Download invoice </Form.Label>
                                                                    <p className='m-0 p-0'>  <FaFileDownload fontSize={20} color='green' className='mx-4 pointer' />
                                                                    </p>
                                                                </Form.Group>

                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Type of application <span className="req-t">*</span></Form.Label>
                                                                    <Form.Select
                                                                        name="typeofApplication"
                                                                        disabled={verifyFristStepFir}

                                                                    // value={addFirdata?.typeofApplication}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        <option value=''>Select</option>
                                                                        <option value='Aircurtain'>Aircurtain</option>
                                                                        <option value='ATM Machine'>ATM Machine</option>
                                                                        <option value='Atta Chakki'>Atta Chakki</option>
                                                                        <option value='Biotoilet'>Biotoilet</option>


                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Total no of hours run <span className="req-t">*</span> </Form.Label>
                                                                    <Form.Control type='number'
                                                                        name="totalNoHours"
                                                                        disabled={verifyFristStepFir}
                                                                    // value={addFirdata?.totalNoHours}
                                                                    // onChange={handleChange}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-2 align-items-center">

                                                            {
                                                                !verifyFristStepFir && (

                                                                    <Col>
                                                                        {/* <Button variant='' className='add-Btn' onClick={(e) => {
                                                                            setVerifyFristStepFir(true)
                                                                        </Button> */}
                                                                        <Tooltip
                                                                            arrow
                                                                            placement="right"
                                                                            title="verify product"
                                                                        >
                                                                            <Button
                                                                                variant=''
                                                                                className="add-Btn"
                                                                                onClick={(e) => {
                                                                                    setVerifyFristStepFir(true)
                                                                                }}
                                                                            >
                                                                                <MdVerifiedUser fontSize={20} />


                                                                            </Button>
                                                                        </Tooltip>
                                                                    </Col>
                                                                )
                                                            }
                                                        </Row>



                                                        {
                                                            verifyFristStepFir && (
                                                                <Row className="gap-3 mt-3 mb-3 " >

                                                                    <Col md={5} sm={12} style={{
                                                                        boxShadow: "0px 0px 3px 3px #d4d4d4"

                                                                    }} >
                                                                        <p className="m-0 p-0 pg-label pl-2">Defect </p>
                                                                        <Row className="mb-2" style={{
                                                                            flexWrap: 'wrap'
                                                                        }}>
                                                                            <Col md={5}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Defect Category <span className="req-t">*</span></Form.Label>
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
                                                                                        <option value='Paint Issue '>Paint Issue</option>
                                                                                        <option value='Winding Burnt-Main Stator	'>Winding Burnt-Main Stator	</option>
                                                                                        <option value='TB Broken	'>TB Broken	</option>

                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                            </Col>

                                                                            <Col md={5}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Sub defect <span className="req-t">*</span> </Form.Label>
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
                                                                                        <option value="Paint damage">Paint damage</option>
                                                                                        <option value="Failed due to overload">Failed due to overload
                                                                                        </option>
                                                                                        <option value="terminal board broken">Terminal board broken
                                                                                        </option>
                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                            </Col>

                                                                            <Col md={1} className="mt-4">
                                                                                <Tooltip
                                                                                    arrow
                                                                                    placement="right"
                                                                                    title="add defect"
                                                                                >
                                                                                    <IconButton
                                                                                        className="edit-btn"
                                                                                        disabled={verifyFristSecondFir}

                                                                                        onClick={handleAddDefect}
                                                                                    >
                                                                                        <FaCirclePlus
                                                                                            color="green"
                                                                                            fontSize={20}
                                                                                        />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </Col>
                                                                            {defectList.length == 0 ? (
                                                                                ""
                                                                            ) : (
                                                                                <div style={{
                                                                                    maxHeight: '200px',
                                                                                    overflowY: 'scroll'
                                                                                }}>

                                                                                    <Row className='m-0 p-0 align-items-end'>
                                                                                        <Col md={12} className='m-0 p-0'>
                                                                                            <Table responsive bordered className="mt-1 m-0 p-0">
                                                                                                <thead>
                                                                                                    <tr
                                                                                                        style={{
                                                                                                            fontSize: "12px",
                                                                                                        }}
                                                                                                    >
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Defect category</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Sub defect</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Actions</th>
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
                                                                                                                <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectCategoryItem}</td>
                                                                                                                <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectItem}</td>
                                                                                                                <td className='m-0 pl-1 py-0 align-content-center'>
                                                                                                                    {" "}
                                                                                                                    <Tooltip
                                                                                                                        arrow
                                                                                                                        placement="right"
                                                                                                                        title="remove"
                                                                                                                    >
                                                                                                                        <IconButton
                                                                                                                            disabled={verifyFristSecondFir}

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
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            )}

                                                                        </Row>
                                                                        <Row className='mb-2' >
                                                                            <Col md={12}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Failure observation <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Control as='textarea' rows={3}
                                                                                        name="failureObservation"

                                                                                    />
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>

                                                                    </Col>


                                                                    <Col md={6} style={{
                                                                        boxShadow: "0px 0px 3px 3px #d4d4d4",
                                                                        // maxWidth: '50%'

                                                                    }}>
                                                                        <Row className="mr-1">
                                                                            <Col md={11} className='m-0 p-0'>
                                                                                <p className="m-0 mt-2 p-0 pg-label pl-2">Photo upload </p>

                                                                                <Table responsive bordered className="m-0 mt-1 ">
                                                                                    <thead>
                                                                                        <tr
                                                                                            style={{
                                                                                                fontSize: "12px",
                                                                                            }}
                                                                                        >
                                                                                            <th className='m-0 pl-1 py-1 align-content-center'>Document label</th>
                                                                                            <th className='m-0 pl-1 py-1 align-content-center'>Upoad photo</th>
                                                                                            {/* <th >Actions</th> */}
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className='p-0 m-0'>

                                                                                        {documentUpload?.map((add, index) => {

                                                                                            return (
                                                                                                <tr
                                                                                                    style={{
                                                                                                        fontSize: "12px",
                                                                                                    }}
                                                                                                    key={index}
                                                                                                >
                                                                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.label}</td>
                                                                                                    <td className='m-0 pl-1 py-0 align-content-center'>
                                                                                                        <Form.Group>
                                                                                                            <InputGroup >
                                                                                                                <Form.Control
                                                                                                                    type="file"
                                                                                                                    // accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types

                                                                                                                    onChange={handleFileChangeUpload(index)}
                                                                                                                />
                                                                                                                {add.file && (
                                                                                                                    <InputGroup.Text onClick={handlePreview(add.file)}>
                                                                                                                        <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                                                                                    </InputGroup.Text>)

                                                                                                                }
                                                                                                            </InputGroup>

                                                                                                        </Form.Group>
                                                                                                    </td>

                                                                                                </tr>
                                                                                            );
                                                                                        })}








                                                                                        {fileInputs?.map((add, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <tr
                                                                                                        style={{
                                                                                                            fontSize: "12px"
                                                                                                        }}
                                                                                                        key={index}
                                                                                                    >
                                                                                                        <td style={{ fontSize: '12px ' }}
                                                                                                            onChange={(e) => {
                                                                                                                console.log('Current value:', e.target.value);
                                                                                                                setUploadPhoto({ label: e.target.value });
                                                                                                            }} className='m-0 py-0 pl-1 p-0  align-content-center'>

                                                                                                            <Form.Control type='text' className='m-0   p-0  align-content-center' style={{
                                                                                                                border: 'none',
                                                                                                                color: '#005bab',
                                                                                                                fontSize: '11px',
                                                                                                                fontWeight: '700'


                                                                                                            }} />

                                                                                                        </td>
                                                                                                        <td className='m-0 p-0  align-content-center'>
                                                                                                            <Form.Group>
                                                                                                                <InputGroup className='p-0 m-0'>
                                                                                                                    <Form.Control
                                                                                                                        type="file"
                                                                                                                        accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                                                                                        onChange={(e) => {
                                                                                                                            if (e.target.files.length > 0) {
                                                                                                                                const file = e.target.files[0];
                                                                                                                                if (file) {
                                                                                                                                    // Check if the file type is allowed
                                                                                                                                    if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                                                                                        setUploadPhoto(prev => ({ ...prev, filee: file })
                                                                                                                                        );
                                                                                                                                        setFile(URL.createObjectURL(e.target.files[0]));
                                                                                                                                    } else {
                                                                                                                                        alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                                                                                        setUploadPhoto({ label: '', filee: '' });

                                                                                                                                        e.target.value = null;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                setUploadPhoto({
                                                                                                                                    label: '',
                                                                                                                                    filee: ''
                                                                                                                                })
                                                                                                                            }

                                                                                                                        }}
                                                                                                                    />
                                                                                                                    {uploadPhoto?.filee != "" ?
                                                                                                                        <InputGroup.Text onClick={(e) => {
                                                                                                                            //setPreviewfile(!previewfile);
                                                                                                                            if (file) {
                                                                                                                                window.open(file, '_blank');
                                                                                                                            }
                                                                                                                            console.log("helo")
                                                                                                                        }}>
                                                                                                                            <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                                                                                        </InputGroup.Text> : ""

                                                                                                                    }
                                                                                                                    <InputGroup.Text className='p-0 m-0'>
                                                                                                                        <Tooltip
                                                                                                                            arrow
                                                                                                                            placement="right"
                                                                                                                            title="remove"
                                                                                                                        >
                                                                                                                            <IconButton
                                                                                                                                disabled={verifyFristSecondFir}

                                                                                                                                className="edit-btn"
                                                                                                                                onClick={() =>
                                                                                                                                    handleRemovefile(
                                                                                                                                        index
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <FaCircleMinus
                                                                                                                                    color="red"
                                                                                                                                    fontSize={15}
                                                                                                                                />
                                                                                                                            </IconButton>
                                                                                                                        </Tooltip>

                                                                                                                    </InputGroup.Text>
                                                                                                                </InputGroup>
                                                                                                            </Form.Group>
                                                                                                        </td>


                                                                                                    </tr >


                                                                                                </>
                                                                                            );
                                                                                        })}

                                                                                    </tbody>
                                                                                </Table>
                                                                            </Col>

                                                                            <Col className='m-0 p-0 d-flex  ' style={{
                                                                                flexDirection: 'column-reverse'
                                                                            }}> <Tooltip
                                                                                arrow
                                                                                placement="right"
                                                                                title="Upload other documents"
                                                                            >
                                                                                    <IconButton
                                                                                        className="edit-btn"
                                                                                        onClick={addFileInput}
                                                                                    >
                                                                                        <FaCirclePlus
                                                                                            color="green"
                                                                                            fontSize={20}
                                                                                        />
                                                                                    </IconButton>
                                                                                </Tooltip></Col>



                                                                        </Row>

                                                                    </Col>
                                                                    {
                                                                        !verifyFristSecondFir && (


                                                                            <Col className='m-0 p-0  ' style={{
                                                                                flexDirection: 'column-reverse',
                                                                                display: 'flex'
                                                                            }}>
                                                                                {/* <Button variant='' className='add-Btn' onClick={(e) => {
                                                                                    setVerifyFristSecondFir(true)
                                                                                }}>Verify defect</Button> */}
                                                                                <Tooltip
                                                                                    arrow
                                                                                    placement="right"
                                                                                    title="verify defect"
                                                                                >
                                                                                    <Button
                                                                                        variant=''
                                                                                        className="add-Btn"
                                                                                        onClick={(e) => {
                                                                                            setVerifyFristSecondFir(true)
                                                                                        }}
                                                                                    >
                                                                                        <MdVerifiedUser fontSize={20} />


                                                                                    </Button>
                                                                                </Tooltip>

                                                                            </Col>
                                                                        )

                                                                    }






                                                                </Row>

                                                            )
                                                        }







                                                        {
                                                            verifyFristSecondFir && (

                                                                <Row className='gap-3 mt-3 ' style={{
                                                                    flexWrap: 'wrap'


                                                                }}>

                                                                    <div style={{
                                                                        boxShadow: "0px 0px 3px 3px #d4d4d4",
                                                                        maxWidth: '100%'

                                                                    }}>
                                                                        <Row className='mt-1 mb-2 '>
                                                                            <p className='pg-label p-0 m-0 pl-2'>Closure</p>
                                                                            <Col md={4}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Closure Status <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Select
                                                                                        name="clousurStatus"
                                                                                        value={addFirdata?.clousurStatus}
                                                                                        onChange={handleChangeFir}
                                                                                    >
                                                                                        <option value=''>Select</option>
                                                                                        <option value='Replacement from dealer'>Replacement from dealer</option>
                                                                                        <option value='Complaint resolved and completed'>Complaint resolved and completed</option>
                                                                                        <option value='Resolving by programming_Drives'>Resolving by programming_Drives</option>
                                                                                        <option value='Resolved by repair with replacement of spare'>Resolved by repair with replacement of spare</option>
                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                            </Col>
                                                                            {
                                                                                addFirdata?.clousurStatus === "Replacement from dealer" && (
                                                                                    <Col md={4}>
                                                                                        <Form.Group>
                                                                                            <Form.Label style={{
                                                                                                whiteSpace: 'nowrap'
                                                                                            }}>Replacement tag applied <span className="req-t">*</span></Form.Label>
                                                                                            <Form.Control type='text' />

                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                )
                                                                            }

                                                                            { }
                                                                            <Col md={4}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Type of work done <span className="req-t">*</span></Form.Label>
                                                                                    <MultiSelect
                                                                                        options={optionsypeWorkDone}
                                                                                        value={addFirdata?.typeOfworkDone}
                                                                                        onChange={function noRefCheck(e) {
                                                                                            setAddFirData(prev => ({ ...prev, typeOfworkDone: e }));
                                                                                        }}

                                                                                        valueRenderer={customValueRenderer}
                                                                                        labelledBy={"Select"}
                                                                                    />
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Details of work done <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Control as='textarea' rows='2' name="detailsWorkDone"
                                                                                        value={addFirdata?.detailsWorkDone}
                                                                                        onChange={handleChangeFir} />
                                                                                </Form.Group>
                                                                            </Col>
                                                                            {addFirdata?.typeOfworkDone.some(item => item.value === "Spare consumption") && (
                                                                                <Row>
                                                                                    <Col md={12}>
                                                                                        <Row>
                                                                                            <Col md={3}>
                                                                                                <Form.Group>
                                                                                                    <Form.Label>Spare  <span className="req-t">*</span> </Form.Label>

                                                                                                    <ReactSearchAutocomplete
                                                                                                        items={spareListDivision}
                                                                                                        onSearch={handleOnSearch}
                                                                                                        onHover={handleOnHover}
                                                                                                        onSelect={handleOnSelect}
                                                                                                        onFocus={handleOnFocus}
                                                                                                        autoFocus
                                                                                                        formatResult={formatResult}
                                                                                                        fuseOptions={{ keys: ["spareCode"] }}
                                                                                                        resultStringKeyName="spareCode"
                                                                                                    />

                                                                                                </Form.Group>

                                                                                            </Col>
                                                                                            <Col md={1} className='m-0 p-0 d-flex  ' style={{
                                                                                                flexDirection: 'column-reverse'
                                                                                            }}> <Tooltip
                                                                                                arrow
                                                                                                placement="right"
                                                                                                title="spare add"
                                                                                            >
                                                                                                    <IconButton
                                                                                                        className="edit-btn"
                                                                                                        onClick={spareAdd}
                                                                                                    >
                                                                                                        <FaCirclePlus
                                                                                                            color="green"
                                                                                                            fontSize={15}
                                                                                                        />
                                                                                                    </IconButton>
                                                                                                </Tooltip></Col>
                                                                                           
                                                                                        </Row>



                                                                                        {spareList.length == 0 ? (
                                                                                            ""
                                                                                        ) : (
                                                                                            <div style={{
                                                                                                maxHeight: '200px',
                                                                                                overflowY: 'scroll'
                                                                                            }}>

                                                                                                <Row className='m-0 p-0'>
                                                                                                    <Col md={12} className='m-0 p-0'>
                                                                                                        <Table responsive bordered className="m-0 mt-1 ">
                                                                                                            <thead>
                                                                                                                <tr
                                                                                                                    style={{
                                                                                                                        fontSize: "12px",
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Spare</th>
                                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Spare desc</th>
                                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Quantity</th>
                                                                                                                    {
                                                                                                                        serialNumberShow && (
                                                                                                                            <th className='m-0 pl-1 py-1 align-content-center'>SerialNo</th>

                                                                                                                        )

                                                                                                                    }
                                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Action</th>


                                                                                                                </tr>
                                                                                                            </thead>
                                                                                                            <tbody className='p-0 m-0'>

                                                                                                                {spareList?.map((add, index) => {
                                                                                                                    const quantity = quantities[index] || add?.quantity || 0;

                                                                                                                    return (
                                                                                                                        <>
                                                                                                                            <tr
                                                                                                                                style={{
                                                                                                                                    fontSize: "12px"
                                                                                                                                }}
                                                                                                                                key={index}
                                                                                                                            >
                                                                                                                                <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control value={add?.type + "" + add?.desc} type="text" /></Form.Group></td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="text" value={add?.desc} /></Form.Group></td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="number"
                                                                                                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} /></Form.Group></td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0  align-content-center'>
                                                                                                                                    {add?.desc?.includes("BEARING") && (

                                                                                                                                        <div >

                                                                                                                                            {quantity > 0 && Array.from({ length: quantity }, (_, serialIndex) => (
                                                                                                                                                <Form.Group key={serialIndex} className="mb-1">
                                                                                                                                                    <Form.Control
                                                                                                                                                        type="text"
                                                                                                                                                        placeholder='Enter serial number'
                                                                                                                                                        value={serialNumbers[index]?.[serialIndex] || ''}
                                                                                                                                                        onChange={(e) => handleSerialNumberChange(index, serialIndex, e.target.value)}
                                                                                                                                                    />
                                                                                                                                                </Form.Group>
                                                                                                                                            ))}
                                                                                                                                        </div>

                                                                                                                                    )}
                                                                                                                                </td>

                                                                                                                                <td className='m-0 pl-1 py-0 align-content-center'>
                                                                                                                                    {" "}
                                                                                                                                    <Tooltip
                                                                                                                                        arrow
                                                                                                                                        placement="right"
                                                                                                                                        title="remove"
                                                                                                                                    >
                                                                                                                                        <IconButton
                                                                                                                                            className="edit-btn"
                                                                                                                                            onClick={() =>
                                                                                                                                                handleRemoveSpare(
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


                                                                                                                        </>
                                                                                                                    );
                                                                                                                })}

                                                                                                            </tbody>
                                                                                                        </Table>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </div>
                                                                                        )}
                                                                                    </Col>
                                                                                </Row>
                                                                            )
                                                                            }

                                                                            {/* {addFirdata?.typeOfworkDone.some(item => item.value === "Bearing replacement at Site / ASC") ? (
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Bearing make & serial Number</Form.Label>
                                        <Form.Control type='text' />

                                    </Form.Group>
                                </Col>) : ''

                            } */}

                                                                        </Row>
                                                                        {/* <Row style={{
                                                                                    alignContent: 'flex-start'
                                                                                }}>
                                                                                    <p className='m-0 p-0 pg-label ml-2'>Devition cliam request</p>
                                                                                    <Col md={3}>
                                                                                        <Form.Group className='mt-4'>
                                                                                            <Form.Check type='checkbox' label="Early travel (before 7:30 AM)"

                                                                                                placeholder=''
                                                                                            />
                                                                                        </Form.Group>

                                                                                    </Col>
                                                                                    <Col md={3}>
                                                                                        <Form.Group className='mt-4'>
                                                                                            <Form.Check type='checkbox' label="Logistic charges"
                                                                                                onChange={handleCheckboxChangeLogistic}



                                                                                                placeholder=''
                                                                                            />
                                                                                        </Form.Group>

                                                                                    </Col>
                                                                                    <Col md={3}>
                                                                                        <Form.Group className='mt-4'>
                                                                                            <Form.Check type='checkbox' label="Chnages in distance"
                                                                                                onChange={handleCheckboxChange}

                                                                                                placeholder=''
                                                                                            />
                                                                                        </Form.Group>

                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className='mb-2'>
                                                                                    {showDetails && (

                                                                                        <>
                                                                                            <Row>


                                                                                                <Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Distance:</Form.Label>
                                                                                                        <Form.Control type='text' />

                                                                                                    </Form.Group>
                                                                                                </Col><Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Current distance</Form.Label>
                                                                                                        <Form.Control type='text' readOnly />

                                                                                                    </Form.Group>
                                                                                                </Col><Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Remarks:</Form.Label>
                                                                                                        <Form.Control as='textarea' rows='2' />

                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <Row className="justify-content-center text-center">
                                                                                                <Col lg={12} md={6} sm={12}>
                                                                                                    <Form.Check
                                                                                                        type="radio"
                                                                                                        label="Same day"
                                                                                                        name="radioGroup"
                                                                                                        value="sameday"

                                                                                                        checked={selectedOptionradio === 'sameday'}
                                                                                                        onChange={handleRadioChangeradio}

                                                                                                        style={{
                                                                                                            color: "#000",
                                                                                                            fontWeight: "400",
                                                                                                            fontSize: "12px",
                                                                                                            textAlign: "left",
                                                                                                            margin: "15px 15px 0px 0px",
                                                                                                            display: "inline-block",
                                                                                                        }}

                                                                                                    />
                                                                                                    <Form.Check
                                                                                                        type="radio"
                                                                                                        label="Overnight Stay"
                                                                                                        name="radioGroup"
                                                                                                        value="overnight"
                                                                                                        checked={selectedOptionradio === 'overnight'}
                                                                                                        onChange={handleRadioChangeradio}



                                                                                                        style={{
                                                                                                            color: "#000",
                                                                                                            fontWeight: "400",
                                                                                                            fontSize: "12px",
                                                                                                            textAlign: "left",
                                                                                                            margin: "15px 15px 0px 0px",
                                                                                                            display: "inline-block",
                                                                                                        }}
                                                                                                    />
                                                                                                </Col>

                                                                                                {selectedOptionradio === 'sameday' && (
                                                                                                    <Row className=' text-start justify-content-center align-items-center mb-2'>
                                                                                                        <Col md={4}>
                                                                                                            <Form.Group>
                                                                                                                <Form.Label>Model of Travel <span className="req-t">*</span></Form.Label>
                                                                                                                <Form.Select


                                                                                                                >
                                                                                                                    <option value=''>Select</option>
                                                                                                                    <option value='Bike'>Bike</option>
                                                                                                                    <option value='car'>Car</option>


                                                                                                                </Form.Select>
                                                                                                            </Form.Group>
                                                                                                        </Col>
                                                                                                    </Row>


                                                                                                )}

                                                                                            </Row>

                                                                                        </>

                                                                                    )}
                                                                                    {
                                                                                        showDetailsLogistic && (
                                                                                            <><Col md={3}>
                                                                                                <Form.Group>
                                                                                                    <Form.Label>Logistic charge</Form.Label>
                                                                                                    <Form.Control type='text' />
                                                                                                </Form.Group>
                                                                                            </Col>
                                                                                                <Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Attachment type</Form.Label>
                                                                                                        <Form.Select><option value='Attachment'>Logistic Approval</option></Form.Select>
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                                <Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Attachment Name</Form.Label>
                                                                                                        <Form.Control type='text' />
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                                <Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Attachment file</Form.Label>
                                                                                                        <Form.Control type='file' />
                                                                                                    </Form.Group>
                                                                                                </Col>

                                                                                            </>

                                                                                        )
                                                                                    }
                                                                                </Row> */}

                                                                    </div>
                                                                    <Row className='align-items-center justify-content-center'>
                                                                        <Col md={1}><Button variant='' onClick={(e) => {
                                                                            setCombined(arrayCombine)
                                                                            setactiveKeyEdit('3')
                                                                        }} className='add-Btn'>Submit</Button></Col>
                                                                    </Row>





                                                                </Row>
                                                            )
                                                        }





                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                                                            <p className="m-0">
                                                                {claim ? (
                                                                    <FaCircleCheck
                                                                        color="#58a718"
                                                                        fontSize={20}
                                                                        className="mr-2"
                                                                    />
                                                                ) : (
                                                                    <strong className="mr-2">4</strong>
                                                                )}
                                                                Claim
                                                            </p>
                                                            <span>

                                                                <span>
                                                                    <Button
                                                                        style={{
                                                                            outline: "none",
                                                                            border: "none",
                                                                        }}
                                                                        variant=""
                                                                    >
                                                                        {" "}
                                                                        <IoArrowUpOutline
                                                                            fontSize={15}
                                                                            color="#fff"
                                                                            onClick={() => {
                                                                                // setactiveKeyEdit('1')
                                                                                if (alreadyWorkshoop) {
                                                                                    setactiveKeyEdit("0");
                                                                                } else {
                                                                                    setactiveKeyEdit("2 ");
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="pt-0 pb-1">
                                                        <Row>
                                                            {addActivityIten.length == 0 ? (
                                                                ""
                                                            ) : (
                                                                <><Col md={12}>

                                                                    <Table responsive bordered className="mt-1">
                                                                        <thead>
                                                                            <tr
                                                                                style={{
                                                                                    fontSize: "12px",
                                                                                }}
                                                                            >
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Service request no</th>

                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Type</th>
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Activity</th>
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Parameter</th>
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Possible Value</th>
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Rate</th>
                                                                                {/* <th className='m-0 pl-1 py-1 align-content-center'>Remarks</th> */}
                                                                                {/* <th className='m-0 pl-1 py-1 align-content-center'>Deviation</th> */}
                                                                                <th className='m-0 pl-1 py-1 align-content-center'>Claim amount</th>
                                                                                {/* <th className='m-0 pl-1 py-1 align-content-center'>Service request no</th> */}

                                                                                {/* <th className='m-0 pl-1 py-1 align-content-center'>Reason</th> */}





                                                                                {/* <th></th> */}


                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {combined.map((add, index) => {
                                                                                const isChecked = isCheckedDeviation[index] || false;

                                                                                return (
                                                                                    <tr
                                                                                        style={{
                                                                                            fontSize: "12px",
                                                                                        }}
                                                                                        key={index}
                                                                                    >
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add?.TicketNum}</td>

                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add?.ComplainType}</td>

                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add.value}</td>
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add.parameter}</td>
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add.possibleValue}</td>
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>
                                                                                            {add?.rate}
                                                                                        </td>
                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{add?.claimRate}</td>


                                                                                        <td className='m-0 pl-1 py-1 align-content-center'> {add.value === 'Spare consumption' && (
                                                                                            <Tooltip
                                                                                                arrow
                                                                                                placement="right"
                                                                                                title="add spare"
                                                                                            >
                                                                                                <IconButton
                                                                                                    className="edit-btn"
                                                                                                // onClick={handleAddActivityItem}
                                                                                                >
                                                                                                    <FaCirclePlus
                                                                                                        color="green"
                                                                                                        fontSize={25}
                                                                                                    />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        )}</td>

                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                            <tr style={{
                                                                                fontSize: "12px",
                                                                            }}>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.TicketNum)}</td>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.ComplainType)}</td>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>
                                                                                    <Form.Group>
                                                                                        <Form.Select onChange={handleTypeChange} value={selectedType}>
                                                                                            <option>Other jobs</option>
                                                                                            <option>Early Morning(7:30Am)</option>
                                                                                            <option>Logistic Charges </option>
                                                                                            <option>Changes in distance</option>
                                                                                        </Form.Select>
                                                                                    </Form.Group>

                                                                                </td>
                                                                                {/* <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.activity)}</td> */}
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.parameter)}</td>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.possibleValue)}</td>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.rate)}</td>

                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data?.claimRate)}</td>
                                                                                <td className='m-0 pl-1 py-1 align-content-center'>
                                                                                    <Tooltip
                                                                                        arrow
                                                                                        placement="right"
                                                                                        title="add spare"
                                                                                    >
                                                                                        <IconButton
                                                                                            className="edit-btn"
                                                                                            onClick={handleAddRow}
                                                                                        >
                                                                                            <FaCirclePlus
                                                                                                color="green"
                                                                                                fontSize={25} />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </td>







                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>






                                                                </Col>
                                                                </>
                                                            )}

                                                        </Row>
                                                        <Row className='justify-content-center align-items-center'>
                                                            <Col md={2}><Button variant='' className='add-Btn'>Submit</Button></Col>
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
                <GenericModal show={showLogistic} handleClose={handleLogsticClose} size='l' IsCentered='centered' className='mdl-title' title="Logstic"
                    body={
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Logistic charge</Form.Label>
                                        <Form.Control type='text' value={logsticValue} onChange={(e) => {
                                            setLogticValue(e.target.value)
                                        }} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Attachment type</Form.Label>
                                        <Form.Select><option value='Attachment'>Logistic Approval</option></Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Attachment Name</Form.Label>
                                        <Form.Control type='text' />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Attachment file</Form.Label>
                                        <Form.Control type='file' />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={() => {
                            handleSaveLogstic()
                            handleLogsticClose()
                        }}>
                            Save
                        </Button>
                        <Button variant="" className='cncl-Btn' onClick={handleLogsticClose}>
                            Close
                        </Button>

                    </>} />
                <GenericModal show={showDistance} handleClose={handleDistanceClose} size='l' IsCentered='centered' className='mdl-title' title="Distance"
                    body={
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Current distance</Form.Label>
                                        <Form.Control type='text' readOnly />

                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Distance:</Form.Label>
                                        <Form.Control type='text' value={distance}
                                            onChange={handleDistanceChange} />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Remarks:</Form.Label>
                                        <Form.Control as='textarea' rows='2' />

                                    </Form.Group>
                                </Col>
                            </Row>
                            {isDistanceAbove30 && (
                                <Row className="justify-content-center text-center">
                                    <Col lg={12} md={6} sm={12}>
                                        <Form.Check
                                            type="radio"
                                            label="Same day"
                                            name="radioGroup"
                                            value="sameday"

                                            checked={selectedOptionradio === 'sameday'}
                                            onChange={handleRadioChangeradio}

                                            style={{
                                                color: "#000",
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                textAlign: "left",
                                                margin: "15px 15px 0px 0px",
                                                display: "inline-block",
                                            }}

                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Overnight Stay"
                                            name="radioGroup"
                                            value="overnight"
                                            checked={selectedOptionradio === 'overnight'}
                                            onChange={handleRadioChangeradio}



                                            style={{
                                                color: "#000",
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                textAlign: "left",
                                                margin: "15px 15px 0px 0px",
                                                display: "inline-block",
                                            }}
                                        />
                                    </Col>

                                    {selectedOptionradio === 'sameday' && (
                                        <Row className=' text-start justify-content-center align-items-center mb-2'>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>Model of Travel <span className="req-t">*</span></Form.Label>
                                                    <Form.Select


                                                    >
                                                        <option value=''>Select</option>
                                                        <option value='Bike'>Bike</option>
                                                        <option value='car'>Car</option>


                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                    )}

                                </Row>

                            )}




                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={() => {

                            handleDistanceClose()
                        }}>
                            Save
                        </Button>
                        <Button variant="" className='cncl-Btn' onClick={handleDistanceClose}>
                            Close
                        </Button>

                    </>} />

                {/* <GenericModal show={showProductInfo} handleClose={handleCloseProductinfo} size='l' IsCentered='centered' className='mdl-title' title="Product Info"
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

                            </>} /> */}
            </Row >



        </>
    )
}

export default NewAssign