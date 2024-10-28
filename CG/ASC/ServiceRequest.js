import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Card, Row, Col, Button, Form, Modal, Accordion, Table } from 'react-bootstrap'
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FaCirclePlus, FaUserXmark } from 'react-icons/fa6';
import { FaBan, FaCheckCircle, FaDownload, FaEdit, FaEye, FaPrint, FaRegEdit, FaUserCircle } from 'react-icons/fa';
import { IoCallOutline, IoClose, IoMail, IoSave } from 'react-icons/io5';
import { MdEdit, MdEditDocument, MdOutlineAssignmentInd } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';
import { HiDocumentAdd, HiThumbUp } from 'react-icons/hi';
import { HiDocumentPlus, HiHandThumbDown } from "react-icons/hi2";
import { BsInfoCircleFill, BsPersonFillAdd } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BiEdit, BiTask } from 'react-icons/bi';
import { usePathName } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import { TbEyeEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';
import moment from 'moment';
import JobSheet from '../JobSheets/JobSheet';
import PrintableComponent from '../JobSheets/PrintableComponent';
import ReactToPrint from 'react-to-print';
import AlternatorSheetEmpty from '../JobSheets/AlternatorSheetEmpty';
import FHPEmpty from '../JobSheets/FHPEmpty';
import EmptyJobSheet from '../JobSheets/EmptyJobSheet';
import DCJobsheetEmpty from '../JobSheets/DCJobsheetEmpty';
import ACJobSheetEmpty from '../JobSheets/ACJobSheetEmpty';
import AlternatorSheet from '../JobSheets/AlternatorSheet';
import FHP from '../JobSheets/FHP';
import DCJobsheet from '../JobSheets/DCJobsheet';
import ACJobSheet from '../JobSheets/ACJobSheet';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import LineString from 'ol/geom/LineString';
import OSM from 'ol/source/OSM';
import Stroke from 'ol/style/Stroke';
import Loader from '../../loader';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


const ServiceRequest = () => {
    const pathName = usePathName()
    const navigate = useNavigate();
    const componentRef = useRef();
    let token = localStorage.getItem("UserToken");
    let RoleName = localStorage.getItem("RoleName");
    let showActionCol;
    let showActionColl;
    const [sernNo, setSerNo] = useState("");
    const [productLineCode, setProductLineCode] = useState("")
    const [productCode, setProductCode] = useState("")
    const [divisionCode, setDivisionCode] = useState("");
    const [empty, seEmpty] = useState(true);
    const [job, setjob] = useState(false);
    const [showIsActive1, setIsActive1] = useState(false);
    const [serviceTicketNo, setServiceTicketNo] = useState("");
    // const [subStatusList, subStatusList] = useState([]);

    const [showDocuments, setShowDocuments] = useState(false);

    const handleCloseDocuments = () => setShowDocuments(false);
    const handleShowDocuments = () => setShowDocuments(true);





    const handleShowIsActive1 = (cell) => {

        fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketJobsheetInfo?ServiceTickeId=${cell.row.original?.serviceTicketId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.length >= 1) {
                    setCustData(result[0]);
                }
                else {
                    setCustData({
                        "serviceTicketId": null,
                        "serialNo": null,
                        "productCode": null,
                        "divisionCode": null,
                        "productGroupCode": null,
                        "productLineCode": null,
                        "productLineName": null,
                        "frame": null,
                        "kw": null,
                        "pole": null,
                        "kva": null,
                        "effe": null,
                        "flps": null,
                        "warrantyDateStatus": null,
                        "invoiceDateStatus": null,
                        "customerName": null,
                        "primaryMobileNo": null,
                        "siteAddress": null,
                        "ascName": null,
                        "ascMobileNo": null,
                        "asmName": null,
                        "asmMobileNo": null,
                        "defectDesc": null,
                        "serviceTicketNumber": null,
                        "ticketStateus": null,
                        "requestDate": null,
                        "totalRows": null,
                        "msgCode": "SAP101",
                        "msg": "Serial no / Division  not matching, please check with your product name plate.",
                        "batchStartDate": null,
                        "productGroupName": null,
                        "batchCode": null,
                        "productDescription": null,
                        "spareDetails": []
                    });
                }
                setIsActive1(true);


            })

    }
    const handleCloseIsActive1 = () => setIsActive1(false);
    if (RoleName == "Au5" || RoleName == "AS8") {
        showActionCol = true
        showActionColl = false
    }
    else {
        showActionCol = false
        showActionColl = true
    }

    // useEffect(()=>{
    //     console.log("ege")
    //     setjob(true)
    // },[sernNo])
    const [custData, setCustData] = useState({
        spareDetails: []
    });
    // useEffect(()=>{
    //     console.log("props");
    //     // console.log(props);
    //     setCustData({})
    //     fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${sernNo}&ProductCode=${productCode}&InvoiceDate=&DivisionCode=${divisionCode}`,{
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => res.json())
    //     .then((result)=>{
    //         setCustData(result[0]);
    //         setjob(true)

    //     })
    //   },[sernNo])

    const setCustDataFn = async (plCode, prodCode, divCode, serNo) => {
        console.log("props");
        // console.log(props);
        setCustData({})
        let data = await fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${serNo}&ProductCode=${prodCode}&InvoiceDate=&DivisionCode=${divCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await data.json();
        setCustData(result[0]);
        setjob(true);
        // fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${sernNo}&ProductCode=${productCode}&InvoiceDate=&DivisionCode=${divisionCode}`,{
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        // .then((res) => res.json())
        // .then((result)=>{
        //     setCustData(result[0]);
        //     setjob(true)

        // })
    }


    let asc = localStorage.getItem("UID")

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    let filterByDivision = localStorage.getItem("asmdashDivFilter");
    //   let filterByBranch = localStorage.getItem("dashBranchFilter");
    //   let filterByRegion = localStorage.getItem("dashRegionFilter");
    let filterByFromDate = localStorage.getItem("asmdashFromFilter");
    let filterByToDate = localStorage.getItem("asmdashToFilter");
    const [pagechange, setPageChange] = useState(false);


    let TechAssign = localStorage.getItem("WorkC");

    console.log(TechAssign);

    useEffect(() => {

        return () => {

            localStorage.removeItem("asmdashDivFilter");
            //   let filterByBranch = localStorage.getItem("dashBranchFilter");
            //   let filterByRegion = localStorage.getItem("dashRegionFilter");
            localStorage.removeItem("asmdashFromFilter");
            localStorage.removeItem("asmdashToFilter");

        }
    }, [])


    const [activeKey, setactiveKey] = useState('0')
    const [engineersList, setEngineersList] = useState([])
    const [showAcknowledgemnet, setShowAcknowledgemnet] = useState(false)
    const handleShowAcknowledgemnet = () => {
        setShowAcknowledgemnet(true)
    }
    const handleCloseAcknowledgemnet = () => {
        setShowAcknowledgemnet(false)
        setrequestforYes(false)
        setrequestforNo(false)
    }

    const [showOpenResolve, setShowOpenResolve] = useState(false)
    const [showOpenReject, setShowOpenReject] = useState(false)
    const [showOpenAssign, setShowOpenAssign] = useState(false)
    const [TechData, setTechData] = useState({
        serviceTicketId: 0,
        technicianId: 0,
        remark: "",
        assignDate: ''
    })
    const [ascData, setAscData] = useState({
        serviceTicketId: 0,
        ticketAssignedASCCode: 0,
        ticketAssignedASMCode: 0,
        remark: "",
        assignTo: 0,
        divisionCode: 0
    });

    const [cancellationData, setCancellationData] = useState({
        approvalStatus: 0,
        ascCustomerContactedId: 0,
        serviceTicketId: 0,
        approvedBy: "",
        approvedComments: "",
        approvedDate: "",
        remarks: "",
        ticketAssignedASCCode: 0
    })




    const [data, setdata] = useState([
        {
            productSerial: 'WC123456',
            serialRequest: '208978979',
            requestDate: '11/07/2024',
            location: 'Yashodha Nagar, Chennai',
            companyName: 'Rajesh',
            productLine: 'LT',
            status: 'OOW',
            natureOfComplaint: 'prventive',
            ageOfpendency: '1',
            distnace: '2',
            issueType: 'open',
            assignTech: 'No',
            acknowledgement: 'Acknowledged',



        },
        {
            productSerial: 'WC123456',
            serialRequest: '208978979',
            location: 'Shivaji Nagar, Pune',
            requestDate: '10/07/2024',
            companyName: 'Rajesh',
            productLine: 'LT',
            status: 'W',
            natureOfComplaint: 'Breakdown',
            ageOfpendency: '2',
            distnace: '2',
            issueType: 'delayed',
            assignTech: 'Yes',
            acknowledgement: 'Acknowledge',
        },])


    const [AllRequestsForFilter, setAllRequestsForFilter] = useState([])

    const [AllOpenRequests, setAllOpenRequests] = useState([])


    const [division, setdivision] = useState("")



    const [ASCwiseDivisions, setASCwiseDivisions] = useState([])

    const [ASCwiseProductLines, setASCwiseProductLines] = useState([])






    // const fetchAllRequests=()=>{
    //     fetch(`${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequest`,{
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //     })
    //     .then((res)=>res.json())
    //     .then((result)=>{
    //         console.log(result);
    //         setAllOpenRequests(result)
    //     })
    // }
    const [ticId, setTicId] = useState('')
    console.log(ticId)

    const fetchData = async () => {
        setIsLoading(true)
        let url = `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequest${filterByDivision ||
            filterByFromDate ||
            filterByToDate
            ? "?"
            : ""
            }`;
        if (filterByDivision !== "" && filterByDivision != null) {
            url += `DivisionCode=${filterByDivision}&`;
        }

        if (filterByFromDate !== "" && filterByFromDate != null) {
            url += `FromDate=${filterByFromDate}&`;
        }
        if (filterByToDate !== "" && filterByToDate != null) {
            url += `ToDate=${filterByToDate}&`;
        }
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let filteropenComplaints = result;
                // setTicId(result[0]?.serviceTicketId)
                if (localStorage.getItem("filterReq") == "OpenComplaints") {
                    filteropenComplaints = result?.filter((obj) => obj.issueStatus == "Open");

                }
                if (localStorage.getItem("filterReq") == "suspense") {
                    filteropenComplaints = result?.filter((obj) => (obj.ascName == "" || !obj.ascName));
                }
                if (localStorage.getItem("filterReq") == "techNotAssign") {
                    filteropenComplaints = result?.filter((obj) => (obj.technicianName == "" || !obj.technicianName));
                }
                if (localStorage.getItem("filterReq") == "closedComplaints") {
                    filteropenComplaints = result?.filter((obj) => obj.issueStatus == "Close");
                }
                if (localStorage.getItem("filterReq") == "cancelledComplaints") {
                    filteropenComplaints = result?.filter((obj) => obj.subStatusName == "Cancellation");
                }
                if (localStorage.getItem("filterReq") == "RejectedComplaints") {
                    filteropenComplaints = result?.filter((obj) => obj.subStatusName == "Rejected");
                }
                localStorage.removeItem("filterReq");


                setIsLoading(false)
                setAllOpenRequests(filteropenComplaints);



            })




        // if (!AllOpenRequests.length) {
        //     setIsLoading(true);
        // } else {
        //     setIsRefetching(true);
        // }

        // const url = new URL(

        //     `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequest`,

        // );
        // url.searchParams.set(
        //     'PageNumber',
        //     `${pagination.pageIndex}`,
        // );
        // url.searchParams.set('PageSize', `${pagination.pageSize}`);

        // const headers = new Headers();
        // headers.append('Authorization', `Bearer ${token}`);
        // try {
        //     const response = await fetch(url.href, {
        //         headers: headers
        //     });
        //     const json = await response?.json();
        //     console.log(json);
        //     setAllOpenRequests(json);
        //     setAllRequestsForFilter(json)
        //     setRowCount(json[0]?.totalRows);
        //     console.log(json[0]?.totalRows);
        // } catch (error) {
        //     setIsError(true);
        //     console.error(error);
        //     return;
        // }
        // setIsError(false);
        // setIsLoading(false);
        // setIsRefetching(false);
    };
    const [IssueStatusList, setIssueStatusList] = useState([])

    const fetchIssueStaus = () =>{
        fetch(`${process.env.REACT_APP_API_URL}STStatus/GetAllSTStatus`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let statusInSync = [];
                for(let i = 0;i < result.length ; i++){
                    let obj = result[i];
                    console.log(obj)
                    console.log("obj")
                    if(obj.stStatusName == "Open"){
                        // obj?.stStatusId = 1
                        statusInSync.push(obj) 
                    }
                }
                for(let i = 0; i <result.length ; i++){
                    let obj = result[i];
                    if(obj.stStatusName == "Worked Upon"){
                        statusInSync.push(obj) 
                    }
                }
                for(let i = 0;i < result.length ; i++){
                    let obj = result[i];
                    if(obj.stStatusName == "Closed"){
                        statusInSync.push(obj) 
                    }
                }
                setIssueStatusList(statusInSync)
            })
    }

    useEffect(() => {
        fetchData();
        fetchIssueStaus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // columnFilters,
        // globalFilter,
        // pagination?.pageIndex,
        // pagination?.pageSize,
        // sorting,
    ]);

    let serTicId = localStorage.getItem("ViewEditRequest");






    const [filteredDivision, setfilteredDivision] = useState("")
    const [filteredProductLine, setfilteredProductLine] = useState("")
    const [filteredWarrantyStatus, setfilteredWarrantyStatus] = useState("")
    const [filteredIssueStatus, setfilteredIssueStatus] = useState("")
    const [filteredServiceTicket, setfilteredServiceTicket] = useState("")
    const [filteredFromDate, setfilteredFromDate] = useState("")
    const [filteredToDate, setfilteredToDate] = useState("")




    const [filterPagination, setFilterPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const fetchFilterPagination = async (time, reasonEmptyCheck) => {
        if (!AllOpenRequests.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }

        const url = new URL(

            `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequest`,

        );
        url.searchParams.set(
            'PageNumber',
            `${filterPagination?.pageIndex}`,
        );
        url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);


        if (filteredDivision) { url.searchParams.set('DivisionCode', `${filteredDivision}`) }
        if (filteredProductLine) { url.searchParams.set('ProductLineCode', `${filteredProductLine}`) }
        if (filteredWarrantyStatus) { url.searchParams.set('WarrantyStatus', `${filteredWarrantyStatus}`) }
        if (filteredIssueStatus) { url.searchParams.set('IssueStatus', `${filteredIssueStatus}`) }
        if (filteredServiceTicket) { url.searchParams.set('ServiceTicketNo', `${filteredServiceTicket}`) }
        if (filteredFromDate) { url.searchParams.set('FromDate', `${filteredFromDate}`) }
        if (filteredToDate) { url.searchParams.set('ToDate', `${filteredToDate}`) }

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        try {
            const response = await fetch(url.href, {
                headers: headers
            });
            let json = await response?.json();
            console.log(json);
            console.log(json[0]?.totalRows);

            if (time == 'lessthan23') {
                json = json.filter(i => parseInt(i?.ageOfPendency.split(':')[0], 10) < 23);
            }
            if (time == '24to48') {
                json = json.filter(i => (parseInt(i?.ageOfPendency.split(':')[0], 10) >= 23 && parseInt(i?.ageOfPendency.split(':')[0], 10) <= 48));
            }
            if (time == 'morethan48') {
                json = json.filter(i => parseInt(i?.ageOfPendency.split(':')[0], 10) > 48);
            }
            // else if(time == 'Pendancy'){ 
            //         json = json.filter(i=>i?.ageOfPendency>72);

            // }
            // || isChecked
            if (reasonEmptyCheck) {
                json = json.filter(i => parseInt(i?.ageOfPendency.split(':')[0], 10) > 48 && (!parseInt(i?.ageOfPendency.split(':')[0], 10) || parseInt(i?.ageOfPendency.split(':')[0], 10) == ""));
            }
            setAllOpenRequests(json);
            setAllRequestsForFilter(json)
            setRowCount(json[0]?.totalRows);
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };

    // useEffect(() => {
    //     fetchFilterPagination();

    // }, [filterPagination?.pageIndex, filterPagination?.pageSize]);








    useEffect(() => {
        // console.log(data);

        fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscWiseDivision?ascCode=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setASCwiseDivisions(result)
            })

    }, [])












    // const data = [
    //     {
    //         productSerial: 'WC123456',
    //         serialRequest: '208978979',
    //         requestDate: '11/07/2024',
    //         location: 'Yashodha Nagar, Chennai',
    //         companyName: 'Rajesh',
    //         productLine: 'LT',
    //         status: 'OOW',
    //         natureOfComplaint: 'prventive',
    //         ageOfpendency: '1',
    //         distnace: '2',
    //         issueType: 'open',
    //         assignTech: 'No',
    //         acknowledgement: 'Acknowledged',



    //     },
    //     {
    //         productSerial: 'WC123456',
    //         serialRequest: '208978979',
    //         location: 'Shivaji Nagar, Pune',
    //         requestDate: '10/07/2024',
    //         companyName: 'Rajesh',
    //         productLine: 'LT',
    //         status: 'W',
    //         natureOfComplaint: 'Breakdown',
    //         ageOfpendency: '2',
    //         distnace: '2',
    //         issueType: 'delayed',
    //         assignTech: 'Yes',
    //         acknowledgement: 'Acknowledge',
    //     },
    //     // {
    //     //     productSerial: 'WC123456',
    //     //     location: 'Shivaji Nagar, Banglore',
    //     //     serialRequest: '208978979',
    //     //     requestDate: '12/07/2024',
    //     //     companyName: 'Rajesh',
    //     //     productLine: 'LT',
    //     //     status: 'OOW',
    //     //     natureOfComplaint: 'prventive',
    //     //     ageOfpendency: '4',
    //     //     distnace: '',
    //     //     issueType: 'open',
    //     //     assignTech: 'Yes',
    //     //     acknowledgement: 'Acknowledged',
    //     // },
    //     // {
    //     //     productSerial: 'WC123456',
    //     //     serialRequest: '208978979',
    //     //     location: 'Shivaji Nagar, Pune',
    //     //     requestDate: '10/07/2024',
    //     //     companyName: 'Rajesh',
    //     //     productLine: 'LT',
    //     //     status: 'W',
    //     //     natureOfComplaint: 'Breakdown',
    //     //     ageOfpendency: '2',
    //     //     distnace: '2',
    //     //     issueType: 'delayed',
    //     //     assignTech: 'Yes',
    //     //     acknowledgement: 'Acknowledged',
    //     // },
    //     // {
    //     //     productSerial: 'WC123456',
    //     //     serialRequest: '208978979',
    //     //     location: 'Shivaji Nagar, Pune',
    //     //     requestDate: '10/07/2024',
    //     //     companyName: 'Rajesh',
    //     //     productLine: 'LT',
    //     //     status: 'W',
    //     //     natureOfComplaint: 'Breakdown',
    //     //     ageOfpendency: '2',
    //     //     distnace: '2',
    //     //     issueType: 'delayed',
    //     //     assignTech: 'Yes',
    //     //     acknowledgement: 'Acknowledge',
    //     // },
    // ]


    const [showList, setShowList] = useState(false)

    const showUpdatedList = () => {
        setShowList(true)
    }

    const handleCloseUpdatedList = () => {
        setShowList(false)


    }


    const [ticketInfo, setticketInfo] = useState([])


    const [acknowledgeSerReqStatus, setacknowledgeSerReqStatus] = useState("")

    const [acknowledgementRemarks, setacknowledgementRemarks] = useState("")
    const [showEditClaim, setshowEditClaim] = useState(true)
    const handleShowAsc = (cellData) => {
        let pincode = cellData?.siteAddress;
        pincode = pincode.split(',');
        pincode = pincode[pincode.length - 1]
        fetch(
            `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllAscByTicketCountASM?DivCode=${cellData?.divisionCode}&ProLineCode=${cellData?.productLineCode}&PinCode=${pincode}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setASCNames(result);
            });
        setShowAsc(true);
    }
    const [ShowCancelAppr, setShowCancelAppr] = useState(false);
    const handleShowCancelAppr = () => {

        setShowCancelAppr(true);
    }
    const handleCloseCancelAppr = () => {
        setShowCancelAppr(false)
    }
    const [ASCWiseTecnicians, setASCWiseTecnicians] = useState([]);
    const [ASCNames, setASCNames] = useState([]);
    const [ShowAsc, setShowAsc] = useState(false);
    const [ShowPendancy, setShowPendancy] = useState(false);
    const [ShowRequestApproval, setShowRequestApproval] = useState(false);
    const [showTechnician, setShowTechnician] = useState(false);
    const [actualComplaints, setActualComplaints] = useState([]);
    const [pendingWithList, setPendingWithList] = useState([]);
    const [actionRequiredList, setActionRequiredList] = useState([]);


    const [pendancyData, setPendancyData] = useState({
        actualStatusOfComplaintId: 0,
        pendencyReasonId: 0,
        serviceTicketId: 0,
        pendingWithWhomId: 0,
        actionRequiredId: 0,
        pendencyRemarks: "",
        isActive: true
    });
    const [approvalData, setApprovalData] = useState({
        ServiceTicketNumber: 0,
        ServiceTicketId: 0,
        ApprovalAmount: 0,
        SpecialApprovalDescription: "",
        DocumentFile: []
    })
    const [specialApproval, setSpecialApproval] = useState({});
    const [pendancyList, setPendancyList] = useState([])
    const handleShowPendency = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=34&Code=0`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setActualComplaints(result);
            });

        setShowPendancy(true);
    }
    const handleAttachment = (cell) => {
        const getAllAttachmentList = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllSpecialApprovalClaimAttachmentList?serviceTicketId=${cell?.serviceTicketId}`;

        fetch(getAllAttachmentList, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result?.Key == 500) {
                    Swal.fire({
                        icon: "error",
                        title: result?.Message
                    })
                    return
                }
                //   sethandleAttachmentShow(true);
                setAttachmentList(result);
            })

        // setShowModal(true);
    };
    const [handleAttachmentShow, sethandleAttachmentShow] = useState(false);
    const [AttachmentList, setAttachmentList] = useState([]);
    const handleDownnloadClick = index => {
        try {


            let filepath = AttachmentList[index].filePath;
            const getfilePathUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${filepath}`;

            fetch(getfilePathUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    console.log("logging file response");
                    console.log(res);
                    const lastDotIndex = res.url.lastIndexOf(".");
                    const lastUnderscoreIndex = res.url.lastIndexOf("_");
                    const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                    // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                    console.log("File Name:", fileNameWithExt);
                    // console.log("Extension:", extension);
                    //    console.log(ext);
                    let resp = res.blob()
                    resp.then((r) => {
                        console.log(r);
                        if (r instanceof Blob) {
                            handleDownload(r, fileNameWithExt);
                        } else {
                            // Handle non-Blob responses
                            console.error('Response is not a Blob');
                        }

                    })
                    // sethandleAttachmentShow(true);
                    // setAttachmentList(result);
                })

        }
        catch (e) {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "Oops Something went wrong!",
            });
        }
    };
    const handleShowSpecialAppr = (cell) => {
        if (cell?.isSpecialApproval) {
            fetch(
                `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllASMSpecialApprovalByServiceTicketId?serviceTicketId=${cell?.serviceTicketId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setApprovalData((pre) => {
                        return {
                            ...pre,
                            ApprovalAmount: result[0]?.claimAmount,
                            SpecialApprovalDescription: result[0]?.remarks,
                            specialApprovalStatus: result[0]?.approvalStatus
                        }
                    })
                });
            handleAttachment(cell);
        }




        setShowRequestApproval(true);
    }
    const handleCloseRequestApproval = () => {
        setShowRequestApproval(false);
    }
    const handleClosePendancy = () => {
        setShowPendancy(false);
    }
    const handleShowTechnician = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}Technician/GetAscWiseTechnician?ascCode=${asc}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setASCWiseTecnicians(result);
            });

        setShowTechnician(true);
    }
    const [isChecked, setIsChecked] = useState(false)
    const handleSwitchChange = (e) => {
        console.log("setIsChecked" + e.target.checked);
        setIsChecked(e.target.checked);
        fetchFilterPagination('morethan48', e.target.checked);
        console.log();

    }
    const handleCloseTechnician = () => {
        setShowTechnician(false);
    }
    const handleCloseAsc = () => {
        setShowAsc(false);
    }



    const [documentTypeList, setdocumentTypeList] = useState([])

    const [uploadDocuments, setuploadDocuments] = useState({
        AscServiceTicketFIRId: 0,
        ServiceTicketId: 0,
        DocumentWithType: "",
        IsMandatory: 0,
        DocumentId: 0

    })


    const fetchAllDocuments = (serviceTicketId) => {
        fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllFIRDocumentListAsync?serviceTicketId=${serviceTicketId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                setAllDocuments(result)

            })

    }

    const [AllDocuments, setAllDocuments] = useState([])

    const [showEditInfo, setShowEditInfo] = useState(false);

    const [ticNumber, setTicNumber] = useState('')
    const handleSaveInfoProduct = () => {
        setShowEditInfo(true);
    }

    const handleCloseInfoProduct = () => {
        setShowEditInfo(false);
    }

    const [divisions, setdivisions] = useState([])
    const [prodctLines, setproductLines] = useState([])
    const [pinError1, setpinError1] = useState("");
    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);
    const [cities2, setcities2] = useState([]);
    const [emailError2, setEmailError2] = useState("");
    const [mobileError2, setMobileError2] = useState("");

    // const validatePincode = (pincode) => {
    //     const regex = /^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}/;
    //     return regex.test(pincode);
    // };
    const validatePincode = (pincode) => {
        const regex = /^[1-9][0-9]{5}$/;
        return regex.test(pincode);
    };

    const validateEmail = (emailId) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailId);
    }
    const handlePinCodeChange1 = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        e.target.value = value;
        setDataProduct((pre) => {
            return {
                ...pre,
                pinCode: e.target.value,
            };
        });
        if (!validatePincode(e.target.value) && e.target.value != "") {
            setpinError1("Invalid PinCode. It must be 6 digits only");
        } else {
            setpinError1("");
        }
    };

    const handleEmailChange2 = (e) => {
        const value = e.target.value;
        setDataProduct((pre) => {
            return {
                ...pre,
                emailId: value,
            };
        });
        if (!validateEmail(value) && value != "") {
            setEmailError2("Invalid email formate");
        } else {
            setEmailError2("");
        }
    };



    const [ticketSubmissionDetails, setticketSubmissionDetails] = useState([])
    const [showCustomer, setShowCustomer] = useState(false);
    const handleCloseCustomer = () => setShowCustomer(false);
    const handleShowCustomer = () => setShowCustomer(true);

    const [minInvoiceDate, setMinInvoiceDate] = useState('');

    const [callModes, setcallModes] = useState([])
    const [customerType, setcustomerType] = useState([]);
    const [defectsByPL, setdefectsByPL] = useState([]);









    const [dataProduct, setDataProduct] = useState({
        serviceTicketId: '',
        serialNo: "",
        divCode: "",
        divisionName: '',
        productLineName: '',
        productLineCode: "",
        ProductType: '',
        productCode: "",
        pinCode: "",
        cityId: '',
        stateId: '',
        emailId: "",
        address: "",
        invoiceNo: '',
        invoiceDate: "",
        mobileNo: "",
        frame: '',
        hp: '',
        kva: '',
        randomNo: '',
        userType: "",
        CallModeId: "",
        defectId: "",
        dealerCode: "",
        dealerName: '',
        OEMCode: "",





    });

    const customerProductChange = (e) => {
        const newdata = { ...dataProduct };
        newdata[e.target.name] = e.target.value;
        setDataProduct(newdata);


        console.log("-------------changing data----");

        console.log(newdata);
    };

    const handleSerailNoChange = (e) => {
        const value = e.target.value;

        // setSrNo(value);

        console.log(e.target.value)


        setDataProduct((pre) => {
            return {
                ...pre,
                serialNo: value
            }
        })








    };



    const [dealername, setDealername] = useState([])
    useEffect(() => {
        const getAllDealer = `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`;
        fetch(getAllDealer, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setDealername(result);
            });
    }, [token]);

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
        if (dataProduct?.userType == "136") {
            setDataProduct((pre) => {
                return {
                    ...pre,
                    dealerCode: item?.dealerCode,
                    dealerName: item?.dealerName
                }
            })
        }
        else if (dataProduct?.userType == "137") {
            setDataProduct((pre) => {
                return {
                    ...pre,
                    dealerCode: item.dealerCode,
                    dealerName: item?.dealerName
                }
            })
        }
        else {
            setDataProduct((pre) => {
                return {
                    ...pre,
                    dealerCode: item.dealerCode
                }
            })
        }
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };




    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=CustomerType`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setcustomerType(result);
            });

    }, [])



    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${dataProduct?.productLineCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);


                setdefectsByPL(result);

            });

    }, [dataProduct?.productLineCode])

    const ALLDivision = () => {
        const getAllDivisionsUrl = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;

        fetch(getAllDivisionsUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setdivisions(result)
            })


    }

    const validateMobile = (mobile) => {
        // Basic mobile number validation regex
        const regex = /^[5-9]{1}[0-9]{9}$/;
        return regex.test(mobile);
    };
    const handleMobileChange2 = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 10);
        if (value.startsWith('0')) {
            value = value.slice(1); // Remove the leading zero
        }
        e.target.value = value;
        setDataProduct((pre) => {
            return {
                ...pre,
                mobileNo: e.target.value,
            };
        });
        if (!validateMobile(e.target.value) && e.target.value != "") {
            setMobileError2("Invalid mobile number");
        } else {
            setMobileError2("");
        }
    };

    useEffect(() => {
        ALLDivision()
    }, [])

    const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=3&Id=0&Code=0`;

    useEffect(() => {
        fetch(stateUrl)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setstates(result);
            });




    }, []);

    function handleProdPinCodeChange(e) {
        handlePinCodeChange1(e);




        if (e.target.value.length == 6) {
            fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${e.target.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((resPin) => resPin.json())
                .then((response) => {
                    console.log("response");
                    console.log(response);
                    if (response.length != 0) {
                        setDataProduct((pre) => {
                            return {
                                ...pre,
                                NearestPinCode: response[0]?.pinCode,
                                NearestAscUserCode: response[0]?.userCode
                            }
                        })
                    }



                    // data.nearestAscUserCode =  resultingNearestASCs[0].userCode;
                    // data.nearestPinCode = resultingNearestASCs[0].pinCode;
                    if (response[0]?.pinCode == e.target.value) {
                        // data.distance = "10";
                        // console.log("distance" + data.distance);
                        setDataProduct((pre) => {
                            return {
                                ...pre,
                                distance: '10',
                                // NearestAscUserCode: response[0]?.userCode
                            }
                        })
                        // return data;
                    }
                    else {
                        calculateRoute(e.target.value, response[0]?.pinCode, data)
                    }
                    async function getCoordinates(address) {
                        try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
                            const data = await response.json();
                            if (data.length > 0) {
                                return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                            } else {
                                throw new Error(`No coordinates found for address: ${address}`);
                            }
                        } catch (error) {
                            console.error('Error in getCoordinates:', error.message);
                            //   setDistance(error.message)
                            throw new Error(`Error fetching coordinates for address: ${address}`);
                        }
                    }

                    async function calculateRoute(startAddress, endAddress, addData) {
                        try {
                            console.log("calculateRoute called with:", startAddress, endAddress);
                            const startCoords = await getCoordinates(startAddress);
                            const endCoords = await getCoordinates(endAddress);

                            console.log("Start Coordinates:", startCoords);
                            console.log("End Coordinates:", endCoords);

                            const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key
                            const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

                            console.log("Fetching route from URL:", url);

                            const response = await fetch(url);
                            const data = await response.json();

                            if (data.error) {
                                throw new Error(data.error.message);
                            }

                            const route = data.features[0];
                            const distanceInMeters = route.properties.summary.distance; // Distance in meters
                            let distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                            console.log("Distance in Kilometers:");
                            console.log(distanceInKilometers);
                            console.log("Distance in meters:");
                            console.log(distanceInMeters);
                            // addData.distance = distanceInKilometers.toString();
                            // stateId((pre) => {
                            //     return {
                            //         ...pre,
                            //         distance: distanceInKilometers.toString(),
                            //         // NearestAscUserCode: response[0]?.userCode
                            //     }
                            // })
                            // Assuming map is defined and configured
                            // map.getLayers().forEach(layer => {
                            //     if (layer instanceof VectorLayer) {
                            //         map.removeLayer(layer);
                            //     }
                            // });

                            const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
                            const routeFeature = new Feature({
                                geometry: new LineString(coordinates),
                            });
                            const routeLayer = new VectorLayer({
                                source: new VectorSource({
                                    features: [routeFeature],
                                }),
                                style: new Style({
                                    stroke: new Stroke({
                                        color: 'blue',
                                        width: 2,
                                    }),
                                }),
                            });
                            // map.addLayer(routeLayer);
                            // return addData;

                        } catch (error) {
                            console.error('Error calculating route:', error);
                            // addData.distance = "";
                            // return addData;
                        }
                    }



                })
        }

        if (e.target.value && e.target.value?.length == 6) {
            fetch(
                `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value ? e.target.value : '0'}&Code=0`
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result[0]);
                    setDataProduct((pre) => {
                        return {
                            ...pre,
                            stateId:
                                result[0]?.parameterTypeId,
                        };
                    });

                    // if(result[0]?.parameterTypeId)

                    if (result[0] != undefined) {
                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
                        fetch(cityUrl)
                            .then((res) => res.json())
                            .then((result) => {
                                console.log(result);
                                setcities2(result);
                            });
                    }
                });

            fetch(
                `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value ? e.target.value : "0"}&Code=0`
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result[0]);
                    setDataProduct((pre) => {
                        return {
                            ...pre,
                            cityId:
                                result[0]?.parameterTypeId,
                        };
                    });

                });
        }
        else {
            setDataProduct((pre) => {
                return {
                    ...pre,
                    stateId: 0,
                    cityId: 0,
                };
            });
        }






















    }

    const [productInformation, setProductInformation] = useState([])



    console.log(serTicId);

    console.log(dataProduct)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${serTicId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setDataProduct((pre) => {
                    return {
                        ...pre,
                        serviceTicketId: result[0]?.serviceTicketId,
                        serialNo: result[0]?.sernr,
                        divCode: result[0]?.divisionCode,
                        // divisionName: result[0]?.divisionName,
                        // productLineName: result[0]?.productLineName,
                        productLineCode: result[0]?.productLineCode,
                        // ProductType: result[0]?.divisionName,
                        productCode: result[0]?.matnr,
                        invoiceDate: result[0]?.invoiceDate ? result[0]?.invoiceDate : '',
                        invoiceNo: result[0]?.invoiceNo ? result[0]?.invoiceNo : '',
                        pinCode: result[0]?.pinCode,
                        cityId: result[0]?.cityId,
                        stateId: result[0]?.stateId,
                        emailId: result[0]?.spocEmailId ? result[0]?.spocEmailId : '',
                        address: result[0]?.address ? result[0]?.address : '',
                        mobileNo: result[0]?.spocMobileNo ? result[0]?.spocMobileNo : '',
                        frame: result[0]?.frame,
                        hp: result[0]?.hp,
                        kva: result[0]?.kva,
                        randomNo: result[0]?.randomNo,
                        userType: result[0]?.userType ? result[0]?.userType : '',
                        dealerCode: result[0]?.dealerCode ? result[0]?.dealerCode : "",
                        // dealerName:result[0]?.
                        CallModeId: result[0]?.callTypeId ? result[0]?.callTypeId : '0',
                        defectId: result[0]?.defectId ? result[0]?.defectId : ''

                    }

                })

                if (ticketInfo[0]?.divisionCode != 'M7') {
                    let a = result[0]?.batchStartDate;
                    a = moment(a).format("YYYY-MM-DD")
                    let d1 = new Date(a);
                    let d2 = new Date(dataProduct.invoiceDate);
                    // console.log(a, 'a---------')
                    setMinInvoiceDate(a);

                }

                // setProductInformation(result)


                const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result[0]?.divisionCode ? result[0]?.divisionCode : "0"}`;

                fetch(getAllProductLines, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        setproductLines(result);



                    })


                const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result[0]?.stateId ? result[0]?.stateId : "0"}&Code=0`;
                fetch(cityUrl, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        setcities2(result)
                    })


                fetch(
                    `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${result[0]?.productLineCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                )
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);


                        setdefectsByPL(result);

                    });


                fetch(
                    `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=TelecallerCallMode`, {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                )
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);


                        setcallModes(result);

                    }
                    )




                const getAllDealer = `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`;
                fetch(getAllDealer, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        setDealername(result);
                    });









            })



    }, [serTicId])






    const columns =
        useMemo(
            () => [

                {
                    accessorKey: "serialNo",
                    header: "Request Details",
                    size: "50",

                    Cell: ({ cell }) => {
                        let cellData = cell.row?.original;
                        // console.log("log column"+ cell.column.id);
                        return (
                            <>
                                <Row>
                                    <Col lg={3} md={4} sm={6}>

                                        <p className='ticketInfoLabelST'>Service Request Type: <span className='ticketInfoData'>{cellData?.serviceRequestTypeName ? cellData?.serviceRequestTypeName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Division: <span className='ticketInfoData'>{cellData?.divisionName ? cellData?.divisionName : "-"}</span></p>

                                        <p className='m-0 p-0 ml-2 ' style={{
                                            fontWeight: '700',
                                            fontSize: '11px',
                                            // marginLeft:'6px'


                                        }} >Branch: <span style={{
                                            fontWeight: '700',
                                            fontSize: '11px',
                                            backgroundColor: '#ffdd00c9',
                                            display: 'inline-block',
                                            borderRadius: '2px',
                                            padding: '2px'


                                        }} >{cellData?.branchName ? cellData?.branchName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>ASC: <span className='ticketInfoData'>{cellData?.ascName ? cellData?.ascName : "-"}{
                                            (RoleName == "AS8" && cellData?.subStatusName == "Acknowledgement pending") && <IconButton
                                                className="edit-btn"
                                                onClick={() => {
                                                    // console.log(cell.row.original.stStatusId);
                                                    let pincode = cellData?.siteAddress;
                                                    pincode = pincode.split(',');
                                                    pincode = pincode[pincode.length - 1]
                                                    setAscData((pre) => {
                                                        return {
                                                            ...pre,
                                                            serviceTicketId: cellData?.serviceTicketId,
                                                            ticketAssignedASCCode: 0,
                                                            remark: "",
                                                            divisionCode: cellData?.divisionCode,
                                                            productLine: cellData?.productLineCode,
                                                            productpinCode: pincode,
                                                            assignTo: 0
                                                        }
                                                    })
                                                    handleShowAsc(cellData)


                                                }}

                                            >
                                                <MdEdit fontSize={15} color='#004887'
                                                />
                                            </IconButton>}</span></p>
                                        <p className='ticketInfoLabelST'>Warranty (from batch): <span className={`m-0  ${cellData?.warrantyDateStatus == "Out Of Warranty"
                                            ? "OOWStatus"
                                            : cellData?.warrantyDateStatus == "In Warranty"
                                                ? "WStatus"
                                                : ""
                                            }`}>{cellData?.warrantyDateStatus ? cellData?.warrantyDateStatus : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Status remarks: <span className='ticketInfoData'>{cellData?.remarks ? cellData?.remarks : "-"}</span></p>


                                        {(RoleName == "AS8" || RoleName == "RS9") && <p className='ticketInfoLabelST'>Pendency Reason updated On: <span className='ticketInfoData'>
                                            {/* {cellData?.pendencyReasonUpdatedOn ? cellData?.pendencyReasonUpdatedOn : "-"} */}
                                            {(cellData?.pendencyReasonUpdatedOn) ? moment((cellData?.pendencyReasonUpdatedOn.trim()?.split(" ")[0])).format("DD-MM-YYYY") : "-"}
                                        </span></p>}




                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabelST'>Service Request No:<span className='ticketInfoData'>{cellData?.serviceTicketNumber ? cellData?.serviceTicketNumber : "-"}

                                            {(RoleName === "AS8" && RoleName === 'Ca31') || (cellData?.tabActive == '' && cellData?.tabActive != 'Tab1') && (
                                                <IconButton
                                                    className="edit-btn" arrow placement="left" title="Service request edit"
                                                    onClick={() => {
                                                        localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
                                                        handleSaveInfoProduct()
                                                        setTicNumber(cell.row.original?.serviceTicketNumber)
                                                    }}
                                                >
                                                    <MdEdit className='p-0' fontSize={15} color='#004887' />

                                                </IconButton>

                                            )
                                            }

                                            {(RoleName === "Au5") || (cellData?.tabActive == 'Tab1') && (
                                                <IconButton
                                                    className="edit-btn" arrow placement="left" title="Service request edit"
                                                    onClick={() => {
                                                        localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
                                                        handleSaveInfoProduct()
                                                        setTicNumber(cell.row.original?.serviceTicketNumber)
                                                    }}
                                                >
                                                    <MdEdit className='p-0' fontSize={15} color='#004887' />

                                                </IconButton>

                                            )
                                            }
                                        </span></p>
                                        <p className='ticketInfoLabelST'>Product Line: <span className='ticketInfoData'>{cellData?.productLineName ? cellData?.productLineName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Customer/Firm Name: <span className='ticketInfoData'>{cellData?.customerName ? cellData?.customerName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>
                                            Technician: <span className='ticketInfoData'>
                                                {cellData?.technicianName ? cellData?.technicianName : "-"}
                                                {cellData?.technicianName && RoleName === "Au5" && cellData?.subStatusName !== 'Work Completed' && cellData?.subStatusName !== 'Fir Generated' && cellData?.subStatusName !== 'Claim Generated' && (
                                                    <IconButton
                                                        className="edit-btn p-0"
                                                        onClick={() => {
                                                            setTechData((prev) => ({
                                                                ...prev,
                                                                serviceTicketId: cellData?.serviceTicketId,
                                                                technicianId: 0,
                                                                remark: ""
                                                            }));
                                                            handleShowTechnician();
                                                        }}
                                                    >
                                                        <MdEdit className='p-0' fontSize={15} color='#004887' />
                                                    </IconButton>
                                                )}
                                            </span>
                                        </p>

                                        <p className='ticketInfoLabelST'>Warranty (from invoice): <span className={`m-0  ${cellData?.invoiceDateStatus
                                            == "Out Of Warranty"
                                            ? "OOWStatus"
                                            : cellData?.invoiceDateStatus
                                                == "In Warranty"
                                                ? "WStatus"
                                                : ""
                                            }`}>{cellData?.invoiceDateStatus
                                                ? cellData?.invoiceDateStatus
                                                : "-"}</span></p>
                                        {/* <p className='ticketInfoLabelST'>Actual status of complaint: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p> */}
                                        <p className='ticketInfoLabelST'>Claim Status: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>
                                        {(RoleName == "AS8" && (
                                            (
                                                (cellData?.divisionCode == "DR" ||
                                                    cellData?.divisionCode == "M7") &&
                                                cellData?.ascName != null)
                                            ||

                                                (cellData?.divisionCode == "CP" || cellData?.divisionCode == "M4" || cellData?.divisionCode == "M3") 
                                            )
                                           ) 
                                                && <p className='ticketInfoLabelST'>Special approval: <span className='ticketInfoData'>
                                            {/* {cellData?.subStatusName ? cellData?.subStatusName : "-"} */}
                                            {
                                                cellData?.subStatusName != "Acknowledgement pending" &&
                                                <>
                                                    {(cellData?.issueStatus == "Worked Upon" || cellData?.issueStatus == "Open") ? 
                                                        <>
                                                            <IconButton
                                                                className="edit-btn"
                                                                onClick={() => {
                                                                    console.log(cell.row.original.stStatusId);

                                                                    setApprovalData((pre) => {
                                                                        return {
                                                                            ...pre,
                                                                            ServiceTicketNumber: cellData?.serviceTicketNumber,
                                                                            ServiceTicketId: cellData?.serviceTicketId,
                                                                            ApprovalAmount: "",
                                                                            SpecialApprovalDescription: "",
                                                                            isSpecialApproval: cellData?.isSpecialApproval,
                                                                            specialApprovalStatus: cellData?.specialApprovalStatus,
                                                                            DocumentFile: []
                                                                        }
                                                                    })

                                                                    handleShowSpecialAppr(cellData)


                                                                }}

                                                            >
                                                                {
                                                                    cellData?.isSpecialApproval == false ?
                                                                    <MdEdit fontSize={15} color='#004887'
                                                                    />
                                                                    :
                                                                    <>
                                                                    <FaEye color="#004887" fontSize={15} /> 
                                                                    </>
                                                                    
                                                                }
                                                                
                                                            </IconButton>
                                                        
                                                        </>
                                                        :
                                                        cellData?.isSpecialApproval ?
                                                            <>
                                                                <IconButton
                                                                    className="edit-btn"
                                                                    onClick={() => {
                                                                        console.log(cell.row.original.stStatusId);

                                                                        setApprovalData((pre) => {
                                                                            return {
                                                                                ...pre,
                                                                                ServiceTicketNumber: cellData?.serviceTicketNumber,
                                                                                ServiceTicketId: cellData?.serviceTicketId,
                                                                                ApprovalAmount: "",
                                                                                SpecialApprovalDescription: "",
                                                                                isSpecialApproval: cellData?.isSpecialApproval,
                                                                                specialApprovalStatus: cellData?.specialApprovalStatus,
                                                                                DocumentFile: []
                                                                            }
                                                                        })

                                                                        handleShowSpecialAppr(cellData)


                                                                    }}

                                                                >
                                                                    {
                                                                        
                                                                        <>
                                                                        <FaEye color="#004887" fontSize={15} /> 
                                                                        </>
                                                                        
                                                                    }
                                                                    
                                                                </IconButton>
                                                            
                                                            </>
                                                            :""     
                                                    }
                                                </>
                                            }
                                            
                                        </span></p>}
                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabelST'>Request Date: <span className='ticketInfoData'>{moment(cellData?.requestDate).format('DD-MM-YYYY')?.split(" ")[0] ? moment(cellData?.requestDate).format('DD-MM-YYYY')?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Serial No: <span className='ticketInfoData'>{cellData?.serialNo ? cellData?.serialNo : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Site Location: <span className='ticketInfoData'>{cellData?.siteAddress ? cellData?.siteAddress : "-"}</span></p>


                                        {/* <p className='ticketInfoLabelST'>Age of Pendency: <span className='ticketInfoData'>{cellData?.ageOfPendency ? cellData?.ageOfPendency+" hrs." : "-"}</span>
                                        </p> */}
                                        <p className='ticketInfoLabelST'>Distance (in Km One side): <span className='ticketInfoData'>{cellData?.distance ? cellData?.distance : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Complaint Status: <span className={`${cellData?.issueStatus == "Open" ? `issueColorOpen` : cellData?.issueStatus == "Close" ? `issueColorClose` : cellData?.issueStatus == "Work In Progress" ? `issueColorWIP` : ``}`}>{cellData?.issueStatus ? cellData?.issueStatus : "-"}</span></p>



                                        {/* <p className='ticketInfoLabelST'>Actual status of complaint: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p> */}
                                        {(RoleName == "AS8" || RoleName == "RS9") && <p className='ticketInfoLabelST'>Pending with whom: <span className='ticketInfoData'>{cellData?.pendingWithWhom ? cellData?.pendingWithWhom : "-"}</span></p>}
                                        {(RoleName == "AS8" || RoleName == "RS9") && <p className='ticketInfoLabelST'>Pendancy reason of ticket: <span className='ticketInfoData'>{cellData?.actualStatusOfComplaint ? cellData?.actualStatusOfComplaint : "-"}</span></p>}

                                    </Col>
                                    {/* <Col lg={3} md={4} sm={6}>

                                        <p className='ticketInfoLabelST'>Request Date: <span className='ticketInfoData'>{cellData?.requestDate?.split(" ")[0] ? moment(cellData?.requestDate?.split(" ")[0]).format("DD-MM-YYYY") : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Serial No: <span className='ticketInfoData'>{cellData?.serialNo ? cellData?.serialNo : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Location: <span className='ticketInfoData'>{cellData?.siteAddress ? cellData?.siteAddress : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Distance (in Km): <span className='ticketInfoData'>{cellData?.distance ? cellData?.distance : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Complaint Status: <span className={`${cellData?.issueStatus == "Open" ? `issueColorOpen` : cellData?.issueStatus == "Close" ? `issueColorClose` : cellData?.issueStatus == "Work In Progress" ? `issueColorWIP` : ``}`}>{cellData?.issueStatus ? cellData?.issueStatus : "-"}</span></p>







                                        {(RoleName == "AS8") && <p className='ticketInfoLabelST'>Pending with whom: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>}


                                    </Col> */}
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabelST'>Nature Of Complaint: <span className='ticketInfoData'>{cellData?.defectDesc ? cellData?.defectDesc : "-"}</span></p>
                                        <p className='pt-1'></p>

                                        <p className='ticketInfoLabelST'>Customer Contact No: <span className='ticketInfoData'>{cellData?.mobileNo ? cellData?.mobileNo : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Age of Pendency: <span className='ticketInfoData'>{cellData?.ageOfPendency ? cellData?.ageOfPendency + " hrs." : "-"}</span>
                                        </p>


                                        <p className='ticketInfoLabelST'>Complaint SubStatus: <span className='ticketInfoData'>{cellData?.subStatusName ? cellData?.subStatusName : "-"}
                                            {
                                                (RoleName == "AS8" && cellData?.subStatusName == "Cancellation") && <IconButton
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        console.log("hello", cellData?.serviceTicketId);

                                                        fetch(
                                                            `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetCancellationRemarks?serviceTicketId=${cellData?.serviceTicketId}`,
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                        )
                                                            .then((res) => res.json())
                                                            .then((result) => {
                                                                console.log(result);
                                                                if (result?.status == 400) {
                                                                    Swal.fire({
                                                                        icon: "error",
                                                                        title: "Oops Something went wrong!",
                                                                    });
                                                                    return
                                                                }
                                                                let currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format

                                                                setCancellationData({
                                                                    ascCustomerContactedId: result?.ascCustomerContactedId,
                                                                    serviceTicketId: cellData?.serviceTicketId,
                                                                    approvedBy: asc,
                                                                    approvedComments: "",
                                                                    approvedDate: currentDate,
                                                                    remarks: result?.remarks,
                                                                    approvalStatus: 0
                                                                });
                                                            });

                                                        // setAscData((pre)=>{
                                                        //     return {
                                                        //         ...pre,
                                                        //         serviceTicketId : cellData?.serviceTicketId,
                                                        //         ticketAssignedASCCode: 0,
                                                        //         remark:""
                                                        //     }
                                                        // })
                                                        handleShowCancelAppr()


                                                    }}

                                                >
                                                    <MdEdit fontSize={15} color='#004887'
                                                    />
                                                </IconButton>}</span></p>
                                        {(RoleName == "AS8" || RoleName == "RS9") && <p className='ticketInfoLabelST'>Complaint pendency Disposition: <span className='ticketInfoData'>{cellData?.actionRequired ? cellData?.actionRequired : "-"}</span></p>}
                                        {(RoleName == "AS8" || RoleName == "RS9") && <p className='ticketInfoLabelST'>Complaint Pendency Remark: <span className='ticketInfoData'>{cellData?.pendencyRemarks ? cellData?.pendencyRemarks : "-"}
                                            {
                                                cellData?.ageOfPendency > 48 &&
                                                <IconButton
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        console.log(cell.row.original.stStatusId);

                                                        setPendancyData({
                                                            actualStatusOfComplaintId: 0,
                                                            pendencyReasonId: 0,
                                                            serviceTicketId: cellData?.serviceTicketId,
                                                            pendingWithWhomId: 0,
                                                            actionRequiredId: 0,
                                                            pendencyRemarks: "",
                                                            isActive: true
                                                        });
                                                        fetch(
                                                            `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/GetAllServiceTicketPendencyReason?serviceTicketId=${cellData?.serviceTicketId}`,
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                        )
                                                            .then((res) => res.json())
                                                            .then((result) => {
                                                                console.log(result);
                                                                setPendancyList(result);
                                                            });
                                                        handleShowPendency()


                                                    }}

                                                >
                                                    <MdEdit fontSize={15} color='#004887'
                                                    />
                                                </IconButton>
                                            }
                                        </span></p>}




                                        {/* <p className='' style={{color:"green",fontSize:"10px",fontWeight:"500"}}><u><span className=''>{cellData?.isAcknowledgment=="1" ? "Acknowledged by ASC" : ""}</span></u></p> */}

                                    </Col>
                                </Row>
                            </>
                        )
                    }
                },



                // {
                //     accessorKey: "serialNo",
                //     header: "Product Sr No",
                // },
                // {
                //     accessorKey: "serviceTicketNumber",
                //     header: "Service Request No",
                // },
                // {
                //     accessorKey: "requestDate",
                //     header: "Request Date",
                //     Cell: ({ cell }) => {
                //         let value=cell.getValue()
                //         return(
                //             <>
                //             <p>{value?.split(" ")[0]}</p>
                //             </>
                //         )
                //     }

                // },
                // {
                //     accessorKey: "customerName",
                //     header: "Company Name",

                // },
                // {
                //     accessorKey: "siteAddress",
                //     header: "Location",

                // },
                // {
                //     accessorKey: "productLineName",
                //     header: "Product Line",
                //     size: '4'

                // },
                // {
                //     accessorKey: "warrantyStatus",
                //     header: "Warranty",
                //     size: '4',
                //     Cell: ({ cell }) => {
                //         let value = cell.getValue();
                //         return (
                //             <p
                //                 className={`text-center m-0 ${value == "Out Of Warranty"
                //                     ? "OOWStatus"
                //                     : value == "In Warranty"
                //                         ? "WStatus"
                //                         : ""
                //                     }`}
                //             >
                //                 {value}
                //             </p>
                //         );
                //     },
                // },
                // {
                //     accessorKey: "defectDesc",
                //     header: "Nature Of Complaint",

                // },
                // {
                //     accessorKey: "ageOfPendency",
                //     header: "Age of Pendency",


                // },
                // {
                //     accessorKey: "distance",
                //     header: "Distance (in Km)",

                // },
                // {
                //     accessorKey: "issueStatus",
                //     header: "Issue Status",

                // },
                // {
                //     accessorKey: "isAcknowledgment",
                //     header: "Acknowledgement",
                //     Cell: ({ cell }) => {
                //         let value = cell.getValue();
                //         return (
                //             <p className='m-auto p-2 text-center'
                //             // className={`text-center m-0 ${value == "Acknowledgement"
                //             //     ? "OOWStatus"
                //             //     : value == "Acknowledged"
                //             //         ? "WStatus"
                //             //         : ""
                //             //     }`}
                //             >
                //                 {value == "" ? <Button variant='' className='add-Btn' onClick={()=>{
                //                     handleShowAcknowledgemnet()
                //                     fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${cell.row.original?.serviceTicketId}`,{
                //                         headers: {
                //                             Authorization: `Bearer ${token}`,
                //                           },
                //                     })
                //                     .then((res)=>res.json())
                //                     .then((result)=>{
                //                         console.log(result);
                //                         setticketInfo(result)
                //                     })
                //                     }}>Acknowledge</Button> : value=="1"? <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button>:""}
                //             </p>
                //         );
                //     },

                // },


                {
                    accessorKey: "assignTechh",
                    header: "Actions",
                    // enableHiding: true,
                    // size: "50",
                    Cell: ({ cell }) => {
                        let data = cell.getValue()
                        // console.log(cell.row.original.divisionCode == 'DR');
                        return (
                            <>
                                {(RoleName == "Au5" || (RoleName == "AS8" && (cell.row.original.divisionCode == 'DR' || cell.row.original.divisionCode == 'M7') && cell.row.original.ascName == null)) &&
                                    <>
                                        <Box sx={{ display: "flex", alignItems: 'center' }}>

                                            {

                                                <>



                                                    {
                                                        cell.row.original.isAcknowledgment == '1' ? (
                                                            // Render a different icon when isActive is false
                                                            // <Tooltip arrow placement="left" title="editack">
                                                            //     <IconButton
                                                            //         className="edit-btn"
                                                            //         onClick={() => {
                                                            //             navigate(`${pathName}/assign-request`);
                                                            //             localStorage.setItem('viewTicket', "ViewTicket")
                                                            //         }}

                                                            //     >
                                                            //         <BiEdit fontSize={20} color='#005bab' />

                                                            //     </IconButton>
                                                            // </Tooltip>


                                                            cell.row.original?.isTicketCustomer !== 'ASM001' && (

                                                                <Tooltip arrow placement="left" title="View / Edit">
                                                                    <IconButton>
                                                                        <Button variant='' className='add-Btn m-auto    '
                                                                            onClick={() => {
                                                                                localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
                                                                                localStorage.setItem("currentDate", getCurrentDate())

                                                                                // navigate(`${pathName}/assign-request`);
                                                                                // localStorage.setItem('ticketInfoLabelST', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)

                                                                                localStorage.setItem("acknowledgementType", cell.row.original?.acknowledgmentStatusName)
                                                                                localStorage.setItem("requestDate", cell.row.original?.requestDate?.split(" ")[0])
                                                                                localStorage.setItem('TicketInfoLabel', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)
                                                                                  localStorage.setItem('SerTicNo', cell.row.original?.serviceTicketNumber)
                                                                            
                                                                                if (RoleName == "AS8") {
                                                                                    localStorage.setItem('isASMflow', true);
                                                                                }
                                                                                else {
                                                                                    localStorage.setItem('isASMflow', false)
                                                                                }
                                                                                navigate(`${pathName}/New-assign-req-int`);



                                                                            }}
                                                                        ><TbEyeEdit fontSize={20} /></Button></IconButton></Tooltip>
                                                            )) : ("")
                                                    }

                                                    {/* {cell.row.original?.isAcknowledgment == "1" ? (<Button variant='' className='add-Btn ' onClick={showUpdatedList}>Status update</Button>) : ""} */}


                                                    {cell.row.original?.isAcknowledgment == "" ? <Tooltip arrow placement="left" title="Acknowledge">
                                                        <IconButton> <Button variant='' className='add-Btn' onClick={() => {
                                                            handleShowAcknowledgemnet()
                                                            fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${cell.row.original?.serviceTicketId}`, {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            })
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log("ticket info");

                                                                    console.log(result);
                                                                    setticketInfo(result)

                                                                })

                                                            localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
                                                            localStorage.setItem("currentDate", getCurrentDate())


                                                            localStorage.setItem('TicketInfoLabel', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)
                                                            localStorage.setItem('SerTicNo', cell.row.original?.serviceTicketNumber)


                                                            localStorage.setItem("acknowledgementType", cell.row.original?.acknowledgmentStatusName)
                                                            localStorage.setItem("requestDate", cell.row.original?.requestDate?.split(" ")[0])
                                                        }}><BiTask color='white' fontSize={20} />
                                                        </Button></IconButton></Tooltip>


                                                        //  : cell.row.original?.isAcknowledgment == "1" ?
                                                        //  <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button> 
                                                        : ""}
                                                    <ReactToPrint
                                                        trigger={() =>
                                                            <Tooltip arrow placement="left" title="Print jobsheet">
                                                                <IconButton
                                                                    className="m-0 pt-0 mt-2"
                                                                    onClick={(e) => {
                                                                        console.log("ascs")
                                                                        setEmptyjob("NA")
                                                                        seEmpty(false);
                                                                        setProductLineCode(cell.row.original?.productLineCode);
                                                                        setProductCode(cell.row.original?.productCode);
                                                                        setDivisionCode(cell.row.original?.divisionCode);
                                                                        setSerNo(cell.row.original?.serialNo);
                                                                        setServiceTicketNo(cell.row.original?.serviceTicketNumber);

                                                                        handleShowIsActive1(cell);
                                                                        console.log("Asdasd")
                                                                    }}
                                                                >
                                                                    <Button variant='' className='add-Btn m-auto'>  <FaPrint fontSize={18} color="white" className='' /></Button>

                                                                </IconButton>
                                                            </Tooltip>



                                                        }
                                                        content={() => componentRef.current}
                                                        onBeforeGetContent={() => {
                                                            //  console.log("ascs");
                                                            //  setCustDataFn(cell.row.original?.productLineCode, cell.row.original?.productCode,
                                                            //     cell.row.original?.divisionCode,
                                                            //     cell.row.original?.serialNo
                                                            // )
                                                            // setEmptyjob("NA")
                                                            // seEmpty(false);
                                                            // setProductLineCode(cell.row.original?.productLineCode);
                                                            // setProductCode(cell.row.original?.productCode);
                                                            // setDivisionCode(cell.row.original?.divisionCode);
                                                            // setSerNo(cell.row.original?.serialNo);

                                                        }}
                                                    />





                                                    {(cell.row.original?.tabActive == "Tab3" || cell.row.original?.tabActive == "Tab4") ? <Tooltip arrow placement="left" title="Add Documents">
                                                        <IconButton > <Button variant='' className='add-Btn m-auto' onClick={(e) => {

                                                            setuploadDocuments((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    ServiceTicketId: cell.row.original?.serviceTicketId
                                                                }
                                                            })


                                                            fetchAllDocuments(cell.row?.original?.serviceTicketId)



                                                            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=39&Id=0&Code=${cell.row.original?.divisionCode}`, {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            })
                                                                .then((res) => res.json())
                                                                .then((resultingDocumentTypes) => {
                                                                    console.log(resultingDocumentTypes);

                                                                    setdocumentTypeList(resultingDocumentTypes)
                                                                })



                                                            handleShowDocuments()

                                                        }}><HiDocumentPlus color='white' fontSize={20} /></Button></IconButton></Tooltip> : ""}
                                                </>


                                            }







                                        </Box >
                                        <br />
                                    </>
                                }








                            </>
                        )
                    }
                },
                // {
                //     accessorKey: "assignTech",
                //     header: "Actions",
                //     // enableHiding: true,
                //     // size: "50",
                //     Cell: ({ cell }) => {
                //         let data = cell.getValue()
                //         let cellData = cell.row?.original;
                //         console.log(cellData);
                //         return (
                //             <>
                //                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

                //                     {

                //                         <>
                //                             {(RoleName === "AS8" || RoleName === 'Ca31') && (cellData?.tabActive == '') && (
                //                                 <IconButton
                //                                     className="edit-btn" arrow placement="left" title="Edit"
                //                                     onClick={() => {

                //                                         localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)

                //                                         handleSaveInfoProduct()


                //                                     }}

                //                                 >

                //                                     <FaEdit color='#005bab' />

                //                                 </IconButton>

                //                             )
                //                             }





                //                         </>


                //                     }







                //                 </Box >
                //                 <br />








                //             </>
                //         )
                //     }
                // },






            ]
        );


    const fixedColumnWidths = {
        serialNo: '100%',
        // assignTech: 'fit-content',

    };

    const [showComments, setShowComments] = useState(true);
    const [showReason, setShowReason] = useState(true);
    const [showAssign, setShowAssign] = useState(true);
    const [showSwitch, setShowSwitch] = useState(false)

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };




    const handleRadioChangeReason = (e) => {
        setShowReason(e.target.checked)
    };

    const handleCheckboxChange = (e) => {
        setShowComments(e.target.checked);
    };
    const handleChekboxAssign = (e) => {
        setShowAssign(e.target.checked)
    };

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;


    const [requestforYes, setrequestforYes] = useState(false)
    const [requestforNo, setrequestforNo] = useState(false)
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format


    // const handleRadioAckChange = (event) => {
    //     const { value } = event.target;

    //     if (value == 'Yes') {
    //         setrequestforYes(true);
    //         setrequestforNo(false);
    //     } else if (value == 'No') {
    //         setrequestforYes(false);
    //         setrequestforNo(true);
    //     } else {

    //     }
    // };
    const [showIsActive2, setIsActive2] = useState(false);
    const [productLineData, setproductLineData] = useState([]);
    const [productDivData, setproductDivData] = useState([]);
    const [jobsheetList, setJobshhetList] = useState([{
        jobshheName: "AC jobsheet",
        jobSheetKey: 1
    }])
    const [emptyjob, setEmptyjob] = useState("no");

    const handleShowIsActive2 = (cell) => {

        fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscWiseProductline?ascCode=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setEmptyjob("no")
                setproductLineData(result);
                let prodLineData = result;
                let joblistData = [{
                    jobshheName: "AC Motor jobsheet",
                    jobSheetKey: 1
                }]
                let findDC = result.filter((obj) => {
                    return obj.productLineCode == "DC"
                })
                if (findDC.length != 0) {
                    let obj = {
                        jobshheName: "Alternator jobsheet",
                        jobSheetKey: 2
                    }
                    joblistData.push(obj)
                }
                // let find4A = result.filter((obj) => {
                //     return obj.productLineCode == "4A"
                // })
                // if (find4A.length != 0) {
                //     let obj = {
                //         jobshheName: "FHP jobsheet",
                //         jobSheetKey: 3
                //     }
                //     joblistData.push(obj)
                // }

                fetch(`${process.env.REACT_APP_API_URL}Asc/GetUserWiseDivision?UserCode=${asc}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((divData) => {
                        setproductDivData(divData);
                        console.log(divData);
                        let findCP = divData.filter((obj) => {
                            return obj.divisionCode == "CP" || obj.divisionCode == "DR" || obj.divisionCode == "M7"
                        })
                        if (findCP.length != 0) {
                            let obj = {
                                jobshheName: "CPD jobsheet",
                                jobSheetKey: 4
                            }
                            joblistData.push(obj)
                        }
                        let findFHP = divData.filter((obj) => {
                            return obj.divisionCode == "M4"
                        })
                        if (findFHP.length != 0) {
                            let obj = {
                                jobshheName: "FHP jobsheet",
                                jobSheetKey: 3
                            }
                            joblistData.push(obj)
                        }

                        let findM3 = divData.filter((obj) => {
                            return obj.divisionCode == "M3"
                        })
                        let findDD = prodLineData.filter((obj) => {
                            return obj.productLineCode == "DD"
                        })
                        if (findM3.length != 0 && findDD.length != 0) {
                            let obj = {
                                jobshheName: "DC Motor jobsheet",
                                jobSheetKey: 5
                            }
                            joblistData.push(obj)
                        }
                        setJobshhetList(joblistData);

                        //   setIsActive2(true);

                    })
                //   console.log(result);
                //   ages.find(checkAge);


            })



        setIsActive2(true);

    }
    const handleCloseIsActive2 = () => {

        setIsActive2(false);

    }




    const handleDownload = (blob, fileNameWithExt) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;


        link.setAttribute('download', `${fileNameWithExt}`); // Specify the desired file name and extension
        // link.setAttribute('download',fileName); // omitting extension
        document.body.appendChild(link);
        link.click();
        // Clean up resources
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };
    return (
        <>
            <Card
                className="border-0 p-3"
                //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
                <div className='d-flex justify-content-between'>

                    <p className='pg-label m-0'>Open requests</p>

                    {RoleName == "Au5" &&

                        <Button variant='' className='add-Btn' onClick={handleShowIsActive2}>Print Blank jobsheet</Button>

                    }

                </div>
                <hr />

                <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }} className="m-1 p-3" >

                    <Row >

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Division </Form.Label>
                                <Form.Select value={filteredDivision} onChange={(e) => {

                                    setfilteredDivision(e.target.value)
                                    setfilteredProductLine("")

                                    fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscDivisionWiseProductline?ascCode=${asc}&divCode=${e.target.value}`, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    })
                                        .then((res) => res.json())
                                        .then((result) => {
                                            console.log(result);
                                            setASCwiseProductLines(result)
                                        })
                                }}>
                                    <option value=''>Select</option>
                                    {
                                        ASCwiseDivisions?.map((divs, i) => {
                                            return (
                                                <>
                                                    <option value={divs?.parameterTypeId}>{divs?.parameterType}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Product Line </Form.Label>
                                <Form.Select value={filteredProductLine} onChange={(e) => {
                                    setfilteredProductLine(e.target.value)
                                }}>
                                    <option value=''>Select</option>
                                    {
                                        ASCwiseProductLines?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.parameterTypeId}>{prodline?.parameterType}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                        {/* <Col md={2}>
                            <Form.Group>
                                <Form.Label>Ticket Created </Form.Label>
                                <Form.Select>
                                    <option value=''>Select</option>
                                </Form.Select>
                            </Form.Group>

                        </Col> */}
                        
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label> Complaint Status</Form.Label>
                                <Form.Select value={filteredIssueStatus} onChange={(e) => {
                                    setfilteredIssueStatus(e.target.value)
                                    // if(e.target.value == "Open"){
                                    //     subStatusList(["Acknowledgement pending", ])
                                    // }
                                }}>
                                    <option value=''>Select</option>
                                    {
                                        IssueStatusList?.map((divs, i) => {
                                            return (
                                                <>
                                                    <option value={divs?.stStatusId}>{divs?.stStatusName}</option>
                                                </>
                                            )
                                        })
                                    }
                                    

                                </Form.Select>
                            </Form.Group>

                        </Col>
                        {/* <Col md={2}>
                            <Form.Group>
                                <Form.Label> Complaint SubStatus</Form.Label>
                                <Form.Select value={filteredIssueStatus} onChange={(e) => {
                                    setfilteredIssueStatus(e.target.value)
                                }}>
                                    <option value=''>Select</option>
                                    <option value='Acknowledgement pending'>Acknowledgement pending</option>
                                    <option value='Technician assigned'>Technician assigned</option>
                                    <option value='Work Completed'>Work Completed</option>
                                    <option value='Fir Generated'>Fir Generated</option>
                                    <option value='Claim Generated'>Claim Generated</option>



                                </Form.Select>
                            </Form.Group>

                        </Col> */}
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label> Service Ticket Number</Form.Label>
                                <Form.Control
                                 value={filteredServiceTicket} 
                                 type = "text"
                                 onChange={(e) => {
                                    setfilteredServiceTicket(e.target.value)
                                }}>
                                    
                                    

                                </Form.Control>
                            </Form.Group>

                        </Col>
                        {/* </Row>
                        <Row> */}

                        <Col md={2} style={{
                            whiteSpace: 'nowrap'
                        }}>
                            <Form.Group >
                                <Form.Label> From Date</Form.Label>
                                <Form.Control type='date' value={filteredFromDate} onChange={(e) => {
                                    setfilteredFromDate(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label> To Date</Form.Label>
                                <Form.Control type='date' value={filteredToDate} onChange={(e) => {
                                    setfilteredToDate(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <div className='gap-2 d-flex mt-4'>
                                <Button
                                    variant=""
                                    className="add-Btn"
                                    onClick={(e) => {
                                        setShowSwitch(false);
                                        setIsChecked(false);


                                        fetchFilterPagination()
                                    }}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant=""
                                    className=""
                                    style={{
                                        backgroundColor: "#005bab",
                                        color: "white",
                                        fontSize: '11px',
                                        height: "fit-content",
                                    }}

                                    onClick={() => {

                                        // setFilterPagination({
                                        //     pageIndex: 0,
                                        //     pageSize: 10
                                        // })
                                        // setPagination({
                                        //     pageIndex: 0,
                                        //     pageSize: 10
                                        // })
                                        fetchData()
                                        setShowSwitch(false);
                                        setIsChecked(false);

                                            setfilteredDivision("")
                                            setfilteredProductLine("")
                                            setfilteredWarrantyStatus("")
                                            setfilteredServiceTicket("")
                                            setfilteredIssueStatus("")
                                            setfilteredFromDate("")
                                            setfilteredToDate("")

                                        setASCwiseProductLines([])
                                    }}

                                >
                                    Reset
                                </Button>
                            </div>
                        </Col>
                    </Row>


                </Row>

                <Row >
                    <Col>
                        <div style={{ backgroundColor: "#c4ffbd", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
                            await fetchFilterPagination('lessthan23');
                            setShowSwitch(false);
                            setIsChecked(false);
                            console.log("AllRequestsForFilter", AllRequestsForFilter)
                            // let green=AllRequestsForFilter?.filter(i=>{
                            //     console.log(i?.ageOfPendency);
                            //     return (i?.ageOfPendency<23)}

                            // );
                            // console.log("green", green);

                            // setRowCount(green?.length)
                            // setAllOpenRequests(green)
                        }}>{`less than 23 hrs.`}</div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: "#facd4f", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
                            await fetchFilterPagination('24to48');
                            setShowSwitch(false);
                            setIsChecked(false);
                            // let orange=AllRequestsForFilter?.filter(i=>(i?.ageOfPendency>=23 && i?.ageOfPendency<=48))
                            // setRowCount(orange?.length)

                            // setAllOpenRequests(orange)
                        }}>{`23 to 48 hrs.`}</div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: "#f9a8a8", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
                            await fetchFilterPagination('morethan48', false);
                            setShowSwitch(true);
                            // setShowSwitch(false);
                            // setIsChecked(false);
                            // let red=AllRequestsForFilter?.filter(i=>i?.ageOfPendency>48)
                            // setRowCount(red?.length)

                            // setAllOpenRequests(red)
                        }}>{`more than 48 hrs.`}</div>
                    </Col>
                    {false /*RoleName == "AS8"*/ &&
                        <Col>
                            <div style={{ backgroundColor: "#f57070", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
                                await fetchFilterPagination('Pendancy', false);

                                // setPendancyClicked(true);
                                // let red=AllRequestsForFilter?.filter(i=>i?.ageOfPendency>48)
                                // setRowCount(red?.length)

                                // setAllOpenRequests(red)
                            }}>{`Pendency.`}</div>
                        </Col>}


                </Row>
                {
                    isLoading ? <div className='d-felx justify-content-center align-items-center'>
                        <Loader />
                    </div> : (

                        <MaterialReactTable
                            columns={columns}
                            data={AllOpenRequests}

                            initialState={{
                                showColumnFilters: false, columnVisibility: {
                                    assignTechh: showActionCol,
                                    assignTech: showActionColl,
                                },
                            }}
                            //show filters by default

                            muiTableHeadCellFilterTextFieldProps={{
                                sx: { m: "0.5rem 0", width: "100%" },
                                variant: "outlined",
                            }}

                            muiTableBodyCellProps={({ cell }) => ({
                                style: {
                                    width: fixedColumnWidths[cell.column.id],
                                    minWidth: fixedColumnWidths[cell.column.id],
                                    maxWidth: fixedColumnWidths[cell.column.id],
                                    border: "1px solid black"

                                },
                            })}

                            muiTableBodyRowProps={({ row }) => ({
                                sx: {
                                    backgroundColor: (parseInt(row?.original?.ageOfPendency.split(':')[0], 10)) < 23 ? "#c4ffbd" : (parseInt(row?.original?.ageOfPendency.split(':')[0], 10) >= 23 && parseInt(row?.original?.ageOfPendency.split(':')[0], 10) <= 48) ? "#facd4f" : ((parseInt(row?.original?.ageOfPendency.split(':')[0], 10)) > 48) ? "#f9a8a8" : ""
                                    //   :(row?.original?.ageOfPendency) >= 72?"#f57070"
                                }
                            })}

                            // enableEditing
                            // onEditingRowSave={handleSaveRowEdits}
                            // onEditingRowCancel={handleCancelRowEdits}
                            //     renderRowActions={({ cell, row, table }) => (

                            //       <Box sx={{ display: "flex", gap: "1rem" }}>
                            //         {/* <Tooltip arrow placement="left" title="View">
                            //   <IconButton 
                            //   className="edit-btn"
                            //   // onClick={() => table.setEditingRow(row)}
                            //   disabled
                            //   >
                            //     <FaEye color='green'/>
                            //   </IconButton>
                            // </Tooltip> */}
                            //         {
                            //           cell.row.original.isActive == false ? "" :
                            //             <Tooltip arrow placement="left" title="Edit">
                            //               <IconButton
                            //                 className="edit-btn"
                            //                 onClick={() => {
                            //                   console.log(cell.row.original.divisionID);
                            //                   setdivisionID(cell.row.original.divisionId)
                            //                   handleModalShow()
                            //                 }}

                            //               // disabled
                            //               >

                            //                 <FaRegEdit color='#005bab' />
                            //               </IconButton>
                            //             </Tooltip>
                            //         }
                            //         {
                            //           cell.row.original.isActive == false ? "" :
                            //             <Tooltip arrow placement="right" title="Delete">
                            //               <IconButton
                            //                 color="error"
                            //                 onClick={() => {
                            //                   setdivisionID(cell.row.original.divisionId)
                            //                   console.log(cell.row.original.divisionId)
                            //                   handleShowDel()
                            //                 }}


                            //               // disabled
                            //               >
                            //                 {/* {divisionData.map(division => (
                            //               <div key={division.id}>
                            //                 <p>{division.name}</p>
                            //                 <button onClick={() => handleDelete(division.id)}>Delete</button>
                            //               </div>
                            //             ))} */}
                            //                 <HiOutlineTrash color='red' />
                            //               </IconButton>
                            //             </Tooltip>
                            //         }
                            //       </Box>
                            //     )}

                            // manualPagination={true}
                            muiToolbarAlertBannerProps={isError
                                ? {
                                    color: 'error',
                                    children: 'Error loading data',
                                }
                                : undefined}
                            enableGlobalFilter={false}
                            // enableFullScreenToggle={false}
                            // onColumnFiltersChange={setColumnFilters}
                            // onGlobalFilterChange={setGlobalFilter}
                            // onPaginationChange={ |setPagination}
                            // onSortingChange={setSorting}
                            // rowCount={rowCount}
                            // state={
                            //     {
                            //         columnFilters,
                            //         globalFilter,
                            //         isLoading,
                            //         pagination: filterPagination || pagination,
                            //         showAlertBanner: isError,
                            //         showProgressBars: isRefetching,
                            //         sorting,
                            //     }
                            // }

                            renderTopToolbarCustomActions={({ table }) => (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        paddingLeft: '15px',
                                        paddingTop: '10px',
                                        flexWrap: 'wrap',
                                    }}>
                                        {(RoleName == "AS8" || RoleName == "RS9") &&
                                            <Row style={{ width: "100%" }}>
                                                {showSwitch &&
                                                    <Col
                                                    // lg={4}
                                                    >
                                                        <Form>
                                                            <Form.Check // prettier-ignore

                                                                type="switch"
                                                                label="Show Tickets with no pendancy reason"
                                                                onChange={handleSwitchChange}
                                                                value={isChecked}
                                                            />
                                                        </Form>
                                                    </Col>
                                                }

                                                {/* <Col lg={showSwitch ?6:10}>
                                    <Form.Group className="text-start">
                                        <Row>
                                        <Col lg={6}>
                                            <Form.Label>
                                                Service Ticket Number/Mobile Number
                                            </Form.Label>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Control type="text"
                                                    
                                                name="SerialNumber" />
                                        </Col>
                                    </Row>
                                                                
                                    </Form.Group>
                                    

                                </Col>
                                <Col lg={2}>
                                <Button variant="" className='add-Btn'
                                    onClick={(e) => {
                                        





                                        

                                    }}

                                >
                                    Search
                                </Button>

                                </Col> */}
                                            </Row>
                                        }


                                        {/* {Permissions?.isDownload ? <Button variant=''
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        // onClick={() =>
                        //   handleExportRows(
                        //     table.getPrePaginationRowModel().rows,
                        //     customHeaders,
                        //     [

                        //       "divisionId",
                        //       "divisionRemarks",
                        //       "longLastingTickitHour",
                        //       "frameSizeOrHpReqOrNot",
                        //       "isActive",
                        //       "totalRows"


                            


                        //     ]
                        //   )
                        // }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button> : ""} */}

                                    </div>
                                </>

                            )}


                            positionActionsColumn="first"
                        />
                    )}

                <Modal show='' onHide='' backdrop="static" centered size="xl">
                    <Modal.Header closeButton>  <Modal.Title className='mdl-title'>Open Request</Modal.Title> </Modal.Header>
                    <Modal.Body>
                        {/* <p className="text-center" style={{ fontSize: "14px", fontWeight: "500" }}>Service Request Option</p> */}
                        <Accordion activeKey={activeKey}>

                            {(activeKey.includes("1") || activeKey.includes("2") || activeKey.includes("3")) ? <Accordion.Item eventKey="0">
                                <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                                >
                                    <p className='m-0'>Service Request</p><span> </span>

                                </div></Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <p className='pg-label m-0'>Serail Number </p>
                                            <p>1234</p>

                                        </Col>
                                        <Col>

                                            <p className='pg-label m-0'>Service Request No  </p>
                                            <p>XY45</p>

                                        </Col>
                                        <Col>

                                            <p className='pg-label m-0'>Company Name  </p>
                                            <p>CG</p>

                                        </Col>
                                        <Col>

                                            <p className='pg-label m-0'>Location  </p>
                                            <p>Mumbai, Mahashtra</p>

                                        </Col>
                                        {/* <Col>

                                            <p className='pg-label m-0'>Customer Contacted on </p>
                                            <p>12/08/2026, 12:02PM</p>
                                        </Col> */}






                                    </Row>



                                </Accordion.Body>
                            </Accordion.Item> : ""}

                            {activeKey.includes("1") ? <Accordion.Item eventKey="1">
                                <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                                >
                                    <p className='m-0'>Close/Resolved Ticket</p><span>
                                        <IoSave color='#7bc143' fontSize={20}
                                        /></span>

                                </div></Accordion.Header>
                                <Accordion.Body>

                                    <Row style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>

                                        <Col md={4}>
                                            {/* <Form.Check
                                                type='check'
                                                label="Complaint resolved during a call"
                                                // name="radioGroup"
                                                checked="customer"

                                                style={{
                                                    color: '#000',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '15px 15px 0px 0px',
                                                    cursor: 'pointer'
                                                }}
                                                onChange={handleRadioChange}
                                            /> */}
                                            <Form.Check
                                                type="checkbox"
                                                checked={showComments}
                                                onChange={handleCheckboxChange}
                                                label="Complaint resolved during a call"
                                                className='text-center'
                                            />

                                        </Col>
                                    </Row>
                                    {
                                        showComments &&



                                        <>
                                            <Row className='justify-content-center mt-3'>
                                                <Col md={3}>
                                                    <Form.Group className="text-start no-wrap">
                                                        <Form.Label> Customer connected date</Form.Label>
                                                        <Form.Control type='date' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Group className="text-start">
                                                        <Form.Label> Customer connected time</Form.Label>
                                                        <Form.Control type='time' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="text-start">
                                                        <Form.Label>
                                                            Comments <span className="req-t">*</span>
                                                        </Form.Label>
                                                        <Form.Control as="textarea"

                                                            rows={3} name="Remarks" />
                                                    </Form.Group>

                                                </Col>
                                            </Row>

                                        </>


                                    }


                                </Accordion.Body>
                            </Accordion.Item> : ""}


                            {activeKey.includes("2") ? <Accordion.Item eventKey="2">
                                <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                                >
                                    <p className='m-0'>Cancel Ticket</p><span> <IoSave color='#7bc143' fontSize={20} /></span>

                                </div></Accordion.Header>
                                <Accordion.Body>
                                    <Row style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>

                                        <Col md={4}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={showReason}
                                                onChange={handleRadioChangeReason}
                                                label="Complaint to be cancelled"
                                                className='text-center'
                                            />

                                        </Col>

                                    </Row>

                                    {showReason &&
                                        <>
                                            <Row className='justify-content-center mt-3'>
                                                <Col md={3}>
                                                    <Form.Group className="text-start">
                                                        <Form.Label> Customer connected date</Form.Label>
                                                        <Form.Control type='date' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Group className="text-start">
                                                        <Form.Label> Customer connected time</Form.Label>
                                                        <Form.Control type='time' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Group
                                                    >
                                                        <Form.Label className='text-start'>
                                                            Reason
                                                        </Form.Label>
                                                        <Form.Select
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Not a CG Product">Not a CG Product</option>
                                                            <option value="Problem not related to CG Product">Problem not related to CG Product</option>
                                                            <option value="Out Of Warranty-Customer not ready to pa">Out Of Warranty-Customer not ready to pay</option>


                                                        </Form.Select>

                                                    </Form.Group>

                                                </Col>
                                                <Col md={3}>
                                                    <Form.Group className="">
                                                        <Form.Label>
                                                            Remarks
                                                        </Form.Label>
                                                        <Form.Control as="textarea"

                                                            rows={3} name="Remarks" />
                                                    </Form.Group>

                                                </Col>
                                            </Row>

                                            {/* <Row className='justify-content-center align-items-center mt-3'>

                                            </Row> */}

                                        </>
                                    }


                                </Accordion.Body>
                            </Accordion.Item> : ""}

                            {activeKey.includes("3") ? <Accordion.Item eventKey="3">
                                <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                                >
                                    <p className='m-0'>Assign technician</p><span> <IoSave color='#7bc143' fontSize={20} /></span>

                                </div></Accordion.Header>
                                <Accordion.Body>
                                    <Row style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>




                                        <Col md={4}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={showAssign}
                                                onChange={handleChekboxAssign}
                                                label="Assign Technician"
                                                className='text-center'
                                            />
                                        </Col>

                                        {
                                            showAssign &&
                                            <>

                                                <Row className=' justify-content-center mt-3'>
                                                    <Col md={4}>
                                                        <Form.Group >
                                                            <Form.Label>Technician</Form.Label>
                                                            <Form.Select
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Not a CG Product">Not a CG Product</option>
                                                                <option value="Problem not related to CG Product">Problem not related to CG Product</option>
                                                                <option value="Out Of Warranty-Customer not ready to pa">Out Of Warranty-Customer not ready to pay</option>
                                                            </Form.Select>

                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="text-start">
                                                            <Form.Label> Customer connected date</Form.Label>
                                                            <Form.Control type='date' />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="text-start">
                                                            <Form.Label> Customer connected time</Form.Label>
                                                            <Form.Control type='time' />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* <Col md={3}>

                                                        <Form.Group >
                                                            <Form.Label>Date</Form.Label>
                                                            <Form.Control type='date' defaultValue={getCurrentDate()} />
                                                        </Form.Group>

                                                    </Col> */}

                                                </Row>
                                            </>
                                        }






                                    </Row>
                                    {/* <Row className='justify-content-center align-items-center mt-2'>
        <Col md={4}>
            <Form.Group
            >
                <Form.Label className='text-start'>
                    Reason
                </Form.Label>
                <Form.Select
                >
                    <option value="">Select</option>
                    <option value="Not a CG Product">Not a CG Product</option>
                    <option value="Problem not related to CG Product">Problem not related to CG Product</option>
                    <option value="Out Of Warranty-Customer not ready to pa">Out Of Warranty-Customer not ready to pay</option>












                </Form.Select>

            </Form.Group>

        </Col>

    </Row> */}


                                </Accordion.Body>
                            </Accordion.Item> : ""}




                        </Accordion>

                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="" className="add-Btn" onClick={handleCloseTicket}>Ok</Button>
                    </Modal.Footer> */}
                </Modal>


                <GenericModal show={showAcknowledgemnet} handleClose={handleCloseAcknowledgemnet} size='xl' backdrop="static" IsCentered='centered' className='mdl-title' title="Acknowledgement"
                    body={
                        <>

                            <Row>
                                {/* <Col lg={12} md={12} sm={12}>

                                    <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                                        <div
                                            style={{ backgroundColor: "white", borderRadius: "8px" }}
                                            className="p-3"
                                        >
                                            <div className='d-flex justify-content-between align-items-center flex-wrap'>

                                                <div  >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Product model
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.matnr}
                                                    </p>
                                                </div>
                                                <div  >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Product SN
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.sernr}
                                                    </p>
                                                </div>
                                                <div >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Product type
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.productLineName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Frame size
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.frame}
                                                    </p>
                                                </div>
                                                <div >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Pole
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >

                                                        {ticketInfo[0]?.pole}
                                                    </p>
                                                </div>
                                                <div  >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Voltage
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.kw} Kw
                                                    </p>
                                                </div>

                                                <div >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Date Created
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.requestDate?.split(" ")[0]}
                                                    </p>
                                                </div>
                                                <div >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Warranty Type
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        {ticketInfo[0]?.warrantyStatus}
                                                    </p>
                                                </div>
                                                <div >
                                                    <p className="m-0" style={{ fontSize: "11px" }}>
                                                        Service type
                                                    </p>
                                                    <p
                                                        className="mt-1"
                                                        style={{ fontWeight: "500", fontSize: "11px" }}
                                                    >
                                                        -
                                                    </p>
                                                </div>
                                            </div>
                                           

                                            <div style={{
                                                width: 'max-content',
                                                margin: 'auto',
                                                boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",
                                                borderRadius: '10px'
                                            }} className='d-flex align-items-center justify-content-center p-3'>
                                                <div>

                                                    <div className='d-flex align-items-center '  >

                                                        <div md={2}>
                                                            <FaUserCircle fontSize={50} />

                                                        </div>
                                                        <div className='ml-2'>
                                                            <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                            <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >{ticketInfo[0]?.customerName}</p>
                                                        </div>

                                                    </div>
                                                    <div className='mt-3'>
                                                        <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}>{ticketInfo[0]?.siteAddress} </p>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.emailId}</span> </p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                            fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.primaryMobileNo}</span> </p>


                                                    </div>

                                                </div>

                                            </div>



                                        </div>
                                    </Card>

                                </Col> */}
                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Service request type</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.serviceRequestTypeName}</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Service request no</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.serviceTicketNumber}</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Date created</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{moment(ticketInfo[0]?.requestDate?.split(" ")[0]).format('DD-MM-YYYY')}</p>
                                            </Col>

                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Nature of complaint</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.defectDesc}</p>
                                            </Col>

                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Division</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.divisionName}</p>
                                            </Col>

                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Product line</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.productLineName}</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Product Sr no</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.sernr}
                                                </p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Customer/Firm Name</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.customerName}
                                                </p>
                                            </Col>





                                        </Row>
                                        <Row>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Customer Contact No</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.primaryMobileNo}
                                                </p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Location</p>
                                                <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.siteAddress}
                                                </p>
                                            </Col>

                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from batch)</p>
                                                <p className={`mt-1 ${ticketInfo[0]?.warrantyDateStatus == "Out Of Warranty" ? `OOWStatus` : `WStatus`}`} style={{ fontWeight: "500", fontSize: "12px" }} >{ticketInfo[0]?.warrantyDateStatus}</p>
                                            </Col>
                                            <Col lg={3} md={6} sm={6}>
                                                <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from invoice)</p>
                                                <p className={`mt-1 ${ticketInfo[0]?.invoiceDateStatus == "Out Of Warranty" ? `OOWStatus` : `WStatus`}`} style={{ fontWeight: "500", fontSize: "12px", textAlign: 'left', display: 'inline' }} >{ticketInfo[0]?.invoiceDateStatus}</p>
                                            </Col>





                                        </Row>


                                    </Card>



                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12}>


                                    <Row className='justify-content-center text-center'>
                                        <p className='m-0'>Please Select Acknowledge</p>

                                        <Col lg={12} md={6} sm={12}>
                                            <Form.Check
                                                type='radio'
                                                label="Yes"
                                                name="radioGroup"
                                                value="Yes"
                                                style={{
                                                    color: '#000',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '5px 15px 0px 0px',
                                                    display: 'inline-block'
                                                }}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setrequestforYes(true)
                                                        setrequestforNo(false)

                                                    }

                                                }} />
                                            <Form.Check
                                                type='radio'
                                                label="No"
                                                name="radioGroup"
                                                value='No'
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setrequestforNo(true)
                                                        setrequestforYes(false)

                                                    }

                                                }}
                                                style={{
                                                    color: '#000',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    margin: '5px 15px 0px 0px',
                                                    display: 'inline-block'

                                                }} />
                                        </Col>

                                    </Row>
                                    {
                                        (requestforYes) && (
                                            <Row className='justify-content-center align-items-center'>
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label>Service request status</Form.Label>
                                                        <Form.Select onChange={(e) => {
                                                            setacknowledgeSerReqStatus(e.target.value)
                                                        }}>
                                                            <option value=''>Select</option>
                                                            <option value='Customer Contacted'>Customer Contact</option>
                                                            {(ticketInfo[0]?.divisionCode === 'DR' || ticketInfo[0]?.divisionCode === 'M7' || ticketInfo[0]?.productLineCode === 'C2' || ticketInfo[0]?.productLineCode === 'FD') ? "" : (
                                                                <option value='Product received at workshop'>
                                                                    Product received at workshop
                                                                </option>
                                                            )}
                                                            {/* <option value='Product received at workshop'>Product received at workshop</option> */}


                                                        </Form.Select>

                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                        )
                                    }
                                    {
                                        (requestforNo) && (
                                            <Row className=' m-0 p-0 align-items-center justify-content-center'>

                                                <Col>
                                                    <Form.Group className="">
                                                        <Form.Label>
                                                            Remarks
                                                        </Form.Label>
                                                        <Form.Control as="textarea"
                                                            rows={2} name="Remarks" onChange={(e) => {
                                                                setacknowledgementRemarks(e.target.value)
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )
                                    }





                                </Col>


                            </Row>

                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseAcknowledgemnet}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'
                            onClick={(e) => {
                                // if (requestforYes) {
                                //     setdata((pre) => {
                                //         return [
                                //             ...pre,
                                //             data[1].acknowledgement = "Acknowledged"]
                                //     })
                                // }

                                if (!requestforYes && !requestforNo) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please acknowledge whether Yes or No!"
                                    })
                                }
                                else if (requestforYes && !acknowledgeSerReqStatus) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select Service request status!"
                                    })
                                }
                                else if (requestforNo && !acknowledgementRemarks) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: "Please add remarks!"
                                    })
                                }
                                else {


                                    e.preventDefault()
                                    fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/UpdateAcknowledgmentServiceTicket?serviceTicketId=${ticketInfo[0]?.serviceTicketId}&isAcknowledgment=${requestforYes ? true : requestforNo ? false : ""}&StatusName=${acknowledgeSerReqStatus ? acknowledgeSerReqStatus : ""}&Remark=${acknowledgementRemarks ? acknowledgementRemarks : ""}`, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    })
                                        .then((res) => res.json())
                                        .then((result) => {
                                            console.log(result);
                                            fetchData()
                                            handleCloseAcknowledgemnet()
                                            localStorage.setItem("acknowledgementType", acknowledgeSerReqStatus)
                                            // localStorage.setItem("requestDate", ticketInfo[0]?.requestDate)
                                            // localStorage.setItem("requestDate", cell.row.original?.requestDate?.split(" ")[0])
                                            if (requestforYes) {
                                                if (RoleName == "AS8") {
                                                    localStorage.setItem('isASMflow', true);
                                                }
                                                else {
                                                    localStorage.setItem('isASMflow', false)
                                                }
                                                navigate(`${pathName}/New-assign-req-int`);

                                            }


                                        })

                                }



                            }}

                        >
                            Save
                        </Button>
                    </>} />


                <GenericModal show={showIsActive2} handleClose={handleCloseIsActive2} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Print jobsheet"
                    body={
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Print Blank jobsheets</Form.Label>
                                        <Form.Select
                                            value={emptyjob}
                                            onChange={(e) => {
                                                setEmptyjob(e.target.value);
                                                if (e.target.value != "no") {
                                                    seEmpty(true)
                                                }

                                                // settab1((pre) => {
                                                //     return {
                                                //         ...pre,
                                                //         serviceRequestSubStatusId: e.target.value,
                                                //         productRquestDate: ""
                                                //     }
                                                // })
                                                // if (e.target.value == "28") {
                                                //     settab1((pre) => {
                                                //         return {
                                                //             ...pre,
                                                //             complainType: "Workshop",

                                                //         }
                                                //     })
                                                // }
                                                // else if (e.target.value == "30") {
                                                //     settab1((pre) => {
                                                //         return {
                                                //             ...pre,
                                                //             complainType: "Field",


                                                //         }
                                                //     })
                                                // }




                                                // fetch(`${process.env.REACT_APP_API_URL}STSubStatus/ServiceTicketStatus?SubStatusid=${e.target.value}`, {
                                                //     headers: {
                                                //         Authorization: `Bearer ${token}`,
                                                //     },
                                                // })
                                                //     .then((res) => res.json())
                                                //     .then((result) => {
                                                //         console.log(result);
                                                //         setsubSubStatus(result)
                                                //     })






                                            }}
                                        >
                                            <option value='no'>select</option>
                                            {jobsheetList.map((division) => (
                                                <option key={division.jobSheetKey} value={division.jobSheetKey}>
                                                    {division.jobshheName}
                                                </option>
                                            ))}
                                        </Form.Select>



                                    </Form.Group>
                                </Col>

                            </Row>


                        </>
                    }
                    footer={<>
                        <ReactToPrint
                            trigger={() => <Button variant="" className='cncl-Btn' onClick={() => {
                                // handleSaveLogstic()
                                // handleCloseIsActive1()
                            }}>
                                Print
                            </Button>}
                            content={() => componentRef.current}
                        />

                        <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive2}>
                            Close
                        </Button>

                    </>} />

                <GenericModal show={showIsActive1} handleClose={handleCloseIsActive1} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Print jobsheet"
                    body={
                        <>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Service Ticket Number:  {serviceTicketNo}</Form.Label>




                                    </Form.Group>
                                </Col>

                            </Row>
                        </>
                    }
                    footer={<>
                        <ReactToPrint
                            trigger={() => <Button variant="" className='cncl-Btn' onClick={() => {
                                // handleSaveLogstic()
                                handleCloseIsActive1()
                            }}>
                                Print
                            </Button>}
                            content={() => componentRef.current}
                        />

                        <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                            Close
                        </Button>

                    </>} />

                <GenericModal show={ShowAsc} handleClose={handleCloseAsc} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Assign Agent"
                    body={
                        <>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>

                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Assign To<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name='assignTo'
                                                        onChange={(e) => {
                                                            setAscData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    assignTo: e.target.value
                                                                }
                                                            })
                                                            if (e.target.value == 0) {
                                                                fetch(
                                                                    `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllAscByTicketCountASM?DivCode=${ascData?.divisionCode}&ProLineCode=${ascData?.productLine}&PinCode=${ascData?.productpinCode}`,
                                                                    {
                                                                        headers: {
                                                                            Authorization: `Bearer ${token}`,
                                                                        },
                                                                    }
                                                                )
                                                                    .then((res) => res.json())
                                                                    .then((result) => {
                                                                        console.log(result);
                                                                        setASCNames(result);
                                                                    });
                                                            }
                                                            else if (e.target.value == 1) {
                                                                fetch(
                                                                    `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllInternalEngineerASMList?DivisionCode=${ascData?.divisionCode}`,
                                                                    {
                                                                        headers: {
                                                                            Authorization: `Bearer ${token}`,
                                                                        },
                                                                    }
                                                                )
                                                                    .then((res) => res.json())
                                                                    .then((result) => {
                                                                        console.log(result);
                                                                        setEngineersList(result);
                                                                    });
                                                            }
                                                            setAscData((pre) => {

                                                                return {
                                                                    ...pre,
                                                                    ticketAssignedASCCode: 0,
                                                                    ticketAssignedASMCode: 0
                                                                }
                                                            }
                                                            )
                                                        }}>
                                                        <option value={0}>External Asc</option>
                                                        {
                                                            (ascData?.divisionCode == "M7" || ascData?.divisionCode == "DR") &&
                                                            <option value={1}>Internal Engineer</option>
                                                        }

                                                        {/* {ASCNames.map((obj) => (
                                                        <option key={obj.ascCode} value={obj.ascCode}>
                                                            {obj.name}
                                                        </option>
                                                    ))}  */}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Assign Agent<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        // name='ticketAssignedASCCode'
                                                        onChange={(e) => {
                                                            setAscData((pre) => {
                                                                if (ascData.assignTo == 0) {
                                                                    return {
                                                                        ...pre,
                                                                        ticketAssignedASCCode: e.target.value
                                                                    }
                                                                }
                                                                if (ascData.assignTo == 1) {
                                                                    return {
                                                                        ...pre,
                                                                        ticketAssignedASMCode: e.target.value
                                                                    }
                                                                }


                                                            })
                                                        }}>
                                                        <option value={0}>Select</option>
                                                        {ascData.assignTo == "0" ? ASCNames.map((obj) => (
                                                            <option key={obj.ascCode} value={obj.ascCode}>
                                                                {obj.ascTicketCount}
                                                            </option>
                                                        )) :
                                                            ascData.assignTo == "1" ? engineersList.map((obj) => (
                                                                <option key={obj.userId} value={obj.userId}>
                                                                    {obj.userName}
                                                                </option>
                                                            )) :
                                                                ""}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remark'
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        //  value={addActivity.activityName}
                                                        onChange={(e) => {
                                                            setAscData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    remark: e.target.value
                                                                }
                                                            })
                                                        }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>





                                        </Row>



                                    </Card>



                                </Col>





                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseAsc}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(ascData)
                                if (ascData.assignTo == 0) {
                                    if (ascData.ticketAssignedASCCode == 0) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Please Select Agent",
                                        });
                                        return;

                                    }
                                }
                                if (ascData.assignTo == 1) {
                                    if (ascData.ticketAssignedASMCode == 0) {
                                        console.log(ascData.ticketAssignedASMCode)
                                        Swal.fire({
                                            icon: "error",
                                            title: "Please Select Agent",
                                        });
                                        return;

                                    }
                                }

                                if (!ascData.remark) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Remarks is required",
                                    });
                                    return;
                                }
                                // ascData.assignTo
                                if (ascData.assignTo == 0) {
                                    let inputParam = {
                                        serviceTicketId: ascData?.serviceTicketId,
                                        ticketAssignedASCCode: ascData?.ticketAssignedASCCode,
                                        remark: ascData?.remark
                                    }

                                    fetch(
                                        `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpdateAssignedASCService`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(inputParam)
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }


                                            console.log(result);
                                            fetchData();
                                            handleCloseAsc();
                                        });

                                }
                                if (ascData.assignTo == 1) {
                                    let inputParam = {
                                        serviceTicketId: ascData?.serviceTicketId,
                                        ticketAssignedASMCode: ascData?.ticketAssignedASMCode,
                                        remark: ascData?.remark
                                    }

                                    fetch(
                                        `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpdateAssignedASMService`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(inputParam)
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }


                                            console.log(result);
                                            fetchData();
                                            handleCloseAsc();
                                        });

                                }







                            }}

                        >
                            Save
                        </Button>
                    </>} />
                <GenericModal show={ShowCancelAppr} handleClose={handleCloseCancelAppr} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Cancellation approval"
                    body={
                        <>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>

                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Cancellation Approval<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name=''
                                                        onChange={(e) => {
                                                            setCancellationData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    approvalStatus: e.target.value
                                                                }
                                                            })
                                                        }}>
                                                        <option value={0}>Select</option>

                                                        <option key={1} value={1}>
                                                            Approve
                                                        </option>
                                                        <option key={2} value={2}>
                                                            Reject
                                                        </option>

                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remark'
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        //  value={addActivity.activityName}
                                                        onChange={(e) => {
                                                            setCancellationData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    approvedComments: e.target.value
                                                                }
                                                            })
                                                        }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>





                                        </Row>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>ASC Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remark'
                                                        readOnly
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        value={cancellationData?.remarks}
                                                        onChange={(e) => {
                                                            setCancellationData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    remarks: e.target.value
                                                                }
                                                            })
                                                        }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>





                                        </Row>



                                    </Card>



                                </Col>





                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseCancelAppr}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'
                            onClick={(e) => {
                                e.preventDefault();
                                if (cancellationData.approvalStatus == 0) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select Cancellation Approval status",
                                    });
                                    return;

                                }
                                if (!cancellationData.approvedComments || cancellationData.approvedComments == "") {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Remarks is required",
                                    });
                                    return;
                                }
                                let inputParam = {
                                    "ascCustomerContactedId": cancellationData?.ascCustomerContactedId,
                                    "serviceTicketId": cancellationData?.serviceTicketId,
                                    "approvedBy": cancellationData?.approvedBy,
                                    "approvedComments": cancellationData?.approvedComments,
                                    "approvedDate": cancellationData?.approvedDate
                                }
                                if (cancellationData?.approvalStatus == 1) {
                                    fetch(
                                        `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/UpdateAsmServiceTicketCancellationApproval`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(inputParam)
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }


                                            console.log(result);
                                            Swal.fire({
                                                icon: "success",
                                                title: "Updated successfully!"
                                            })
                                            fetchData();
                                            handleCloseCancelAppr();
                                        });
                                }
                                if (cancellationData?.approvalStatus == 2) {
                                    fetch(
                                        `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/UpdateAsmServiceTicketCancellationRejected`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(inputParam)
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }


                                            console.log(result);
                                            Swal.fire({
                                                icon: "success",
                                                title: "Updated successfully!"
                                            })
                                            fetchData();
                                            handleCloseCancelAppr();
                                        });
                                }









                            }}

                        >
                            Save
                        </Button>
                    </>} />
                <GenericModal show={ShowPendancy} handleClose={handleClosePendancy} size='lg' IsCentered='centered' backdrop="static" className='mdl-title' title="Update Complaint Pendacy Disposition"
                    body={
                        <>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>

                                            <Col lg={6} md={12} sm={12}>

                                                <Form.Group>
                                                    <Form.Label>Pendancy reason of ticket<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name='ticketAssignedASCCode'
                                                        onChange={(e) => {
                                                            setPendancyData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    actualStatusOfComplaintId: e.target.value
                                                                }
                                                            })
                                                            fetch(
                                                                `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/GetAllSTPendingWithWhomList?actualStatusOfComplaintId=${e.target.value}`,
                                                                {
                                                                    headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                    },
                                                                }
                                                            )
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log(result);
                                                                    setPendingWithList(result);
                                                                });

                                                        }}>
                                                        <option value={0}>Select</option>
                                                        {actualComplaints.map((obj) => (
                                                            <option key={obj.parameterTypeId} value={obj.parameterTypeId}>
                                                                {obj.parameterType}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Pending with whom<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name='ticketAssignedASCCode'
                                                        onChange={(e) => {
                                                            setPendancyData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    pendingWithWhomId: e.target.value
                                                                }
                                                            })
                                                            fetch(
                                                                `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/GetAllPendencyActionRequiredList?pendingWithWhomId=${e.target.value}`,
                                                                {
                                                                    headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                    },
                                                                }
                                                            )
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log(result);
                                                                    setActionRequiredList(result);
                                                                });
                                                        }}>
                                                        <option value={0}>Select</option>
                                                        {pendingWithList.map((obj) => (
                                                            <option key={obj.pendingWithWhomId} value={obj.pendingWithWhomId}>
                                                                {obj.pendingWithWhomName}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Actions required<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name='ticketAssignedASCCode'
                                                        onChange={(e) => {
                                                            setPendancyData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    actionRequiredId: e.target.value
                                                                }
                                                            })
                                                        }}>
                                                        <option value={0}>Select</option>
                                                        {actionRequiredList.map((obj) => (
                                                            <option key={obj.actionRequiredId} value={obj.actionRequiredId}>
                                                                {obj.actionRequired}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Pendacy Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remark'
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        //  value={addActivity.activityName}
                                                        onChange={(e) => {
                                                            setPendancyData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    pendencyRemarks: e.target.value
                                                                }
                                                            })
                                                        }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>






                                        </Row>
                                        <Table responsive bordered className="mt-2">
                                            <thead>
                                                <tr style={{
                                                    fontSize: '12px',
                                                    padding: '0px',
                                                    // textAlign: 'left'
                                                }}>
                                                    {/* <th className="p-2 py-2">Type of complaint</th> */}
                                                    <th className="p-2 py-2">Actual status of complaint</th>
                                                    <th className="p-2 py-2">Pending with whom</th>

                                                    <th className="p-2 py-2">Actions required</th>
                                                    {/* <th className="p-2 py-2">Assigned ASC</th> */}
                                                    <th className="p-2 py-2">Pendacy Remarks</th>
                                                    <th className="p-2 py-2">Pendency Reason updated On</th>

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {pendancyList.map((obj) =>

                                                    <tr >


                                                        <td>
                                                            {obj?.actualStatusOfComplaint}
                                                        </td>
                                                        <td>
                                                            {obj?.pendingWithWhom}
                                                        </td>


                                                        <td>
                                                            {obj?.actionRequired}
                                                        </td>

                                                        <td>
                                                            {obj?.pendencyRemarks}
                                                        </td>



                                                        <td>
                                                            {/* {obj?.pendencyReasonUpdatedOn} */}
                                                            {(obj?.pendencyReasonUpdatedOn) ? moment((obj?.pendencyReasonUpdatedOn.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""}
                                                        </td>

                                                    </tr>
                                                )
                                                }


                                            </tbody>
                                        </Table>



                                    </Card>



                                </Col>





                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleClosePendancy}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(pendancyData);
                                if (!pendancyData?.actualStatusOfComplaintId) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select Actual status of complaint",
                                    });
                                    return;

                                }
                                if (!pendancyData?.pendingWithWhomId) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select Pending with whom",
                                    });
                                    return;
                                }
                                if (!pendancyData?.actionRequiredId) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select Actions requireds",
                                    });
                                    return;

                                }
                                if (pendancyData?.pendencyRemarks == "") {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Remarks is required",
                                    });
                                    return;

                                }

                                let inputParam = {
                                    actualStatusOfComplaintId: pendancyData?.actualStatusOfComplaintId,
                                    pendencyReasonId: pendancyData?.pendencyReasonId,
                                    serviceTicketId: pendancyData?.serviceTicketId,
                                    pendingWithWhomId: pendancyData?.pendingWithWhomId,
                                    actionRequiredId: pendancyData?.actionRequiredId,
                                    pendencyRemarks: pendancyData?.pendencyRemarks,
                                    isActive: true
                                }
                                fetch(
                                    `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/InsertServiceTicketPendencyReason`,
                                    {
                                        method: "POST",
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(inputParam)
                                    }
                                )
                                    .then((res) => res.json())
                                    .then((result) => {
                                        if (result?.status == 400) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops Something went wrong!",
                                            });
                                            return
                                        }
                                        console.log(result);
                                        Swal.fire({
                                            icon: "success",
                                            title: "Updated successfully!"
                                        })


                                        console.log(result);
                                        fetchData();
                                        handleClosePendancy();
                                    });







                            }}

                        >
                            Save
                        </Button>
                    </>} />

                <GenericModal show={ShowRequestApproval} handleClose={handleCloseRequestApproval} size='lg' backdrop="static" IsCentered='centered' className='mdl-title' title="Create Approval Request"
                    body={
                        <>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        {approvalData?.isSpecialApproval &&
                                            <Row>

                                                <Col lg={6} md={12} sm={12}>
                                                    <p className='mt-4 Bold'
                                                        style={{
                                                            color: "rgb(0, 91, 171)",
                                                            fontWeight: "600"
                                                        }}>Status: {approvalData?.specialApprovalStatus} </p>
                                                </Col>
                                            </Row>
                                        }
                                        <Row>

                                            <Col lg={6} md={12} sm={12}>

                                                <Form.Group >
                                                    <Form.Label>Ticket Number<span className='req-t'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remark'
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        readOnly={true}
                                                        value={approvalData?.ServiceTicketNumber}

                                                        placeholder='Enter Ticket Number'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Description:</Form.Label>
                                                    <Form.Control

                                                        type="text"
                                                        name='remark'
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        readOnly={approvalData?.isSpecialApproval}

                                                        value={approvalData.SpecialApprovalDescription}
                                                        onChange={(e) => {
                                                            setApprovalData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    SpecialApprovalDescription: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    // placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {/* <Col lg={6} md={12} sm={12}>
                                        <Form.Group>
                                                <Form.Label>Product Division</Form.Label>
                                                <Form.Control
                                                readOnly
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setPendancyData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        pendencyRemarks : e.target.value
                                                    }
                                                })
                                             }}
                                            // placeholder='Enter Remarks'
                                          />
                                            </Form.Group>
                                        </Col> */}
                                        </Row>

                                        {/* <Row>
                                        <Col lg={6} md={12} sm={12}>
                                        <Form.Group>
                                                <Form.Label>Branch</Form.Label>
                                                <Form.Control
                                                readOnly
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setPendancyData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        pendencyRemarks : e.target.value
                                                    }
                                                })
                                             }}
                                            // placeholder='Enter Remarks'
                                          />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                        <Form.Group>
                                          <Form.Label>ASC</Form.Label>
                                          <Form.Control
                                                readOnly
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setPendancyData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        pendencyRemarks : e.target.value
                                                    }
                                                })
                                             }}
                                            // placeholder='Enter Remarks'
                                          />
                                        </Form.Group>
                                      </Col>
                                        </Row> */}
                                        <Row>
                                            {/* <Col lg={6} md={12} sm={12}>
                                        <Form.Group>
                                          <Form.Label>CG Engineer</Form.Label>
                                          <Form.Control
                                                readOnly
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setPendancyData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        pendencyRemarks : e.target.value
                                                    }
                                                })
                                             }}
                                            // placeholder='Enter Remarks'
                                          />
                                        </Form.Group>
                                      </Col> */}


                                        </Row>
                                        <Row>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Approval Amount<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control

                                                        type="Number"

                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        readOnly={approvalData?.isSpecialApproval}
                                                        value={approvalData?.ApprovalAmount}
                                                        onChange={(e) => {
                                                            setApprovalData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    ApprovalAmount: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    // placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {!approvalData?.isSpecialApproval ?
                                            <Col lg={6} md={12} sm={12}>
                                                
                                                <Form.Group>
                                                    <Form.Label>Attachment File<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept=".jpg, .jpeg, .png, .pdf" // Specify accepted file types
                                                        // multiple


                                                            // value={data?.InvoceFilePath}
                                                            onChange={(e) => {
                                                                if (e.target.files.length > 0) {
                                                                    const file = Array.from(e.target.files);
                                                                    if (file) {
                                                                        // Check if the file type is allowed
                                                                        console.log(file.length);
                                                                        const files = Array.from(e.target.files);
                                                                        const validFiles = files.filter(file =>
                                                                            /\.(pdf|doc|docx|jpg|jpeg)$/i.test(file.name)
                                                                        );

                                                                        if (validFiles.length > 0) {
                                                                            console.log(file)
                                                                            setApprovalData((prevData) => ({
                                                                                ...prevData,
                                                                                DocumentFile: validFiles,
                                                                            }));


                                                                        //   setUploadErrorMsg("")
                                                                        //   setFile(URL.createObjectURL(e.target.files[0]));
                                                                    } else {
                                                                        //   setUploadErrorMsg("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                        // Optionally clear the file input
                                                                        e.target.value = null;
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                setSpecialApproval((pre) => {
                                                                    return {
                                                                        ...pre,
                                                                        DocumentFile: ""
                                                                    }
                                                                })
                                                            }
                                                            // setdata((pre) => {
                                                            //   return {
                                                            //     ...pre,
                                                            //     InvoceFilePath: e.target.files[0],
                                                            //   };
                                                            // });
                                                        }}
                                                    />
                                                    <p className='px-2' style={{ fontSize: "12px" }}><b><u>Note: </u></b>  Only .jpeg, .png, .pdf file types are allowed.
                                                    </p>
                                                </Form.Group>
                                            </Col>
                                                :
                                                ""


                                            }
                                        </Row>
                                        {approvalData?.isSpecialApproval && <Row>
                                            <Col lg={6} md={12} sm={12}>
                                                <Row>
                                                    <Col >
                                                        <Table responsive bordered className='mt-3'>
                                                            <thead className='docTable'>
                                                                <tr>

                                                                    {/* <th>Parameter Type</th> */}
                                                                    {/* <th>Claim Type </th> */}

                                                                    <th className="small-font">Attachment</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>


                                                                {AttachmentList.map((x, i) => {
                                                                    return (
                                                                        <>
                                                                            <tr key={i}>


                                                                                <td width="30%">
                                                                                    <div className='hyperLink'
                                                                                        onClick={(e) => { handleDownnloadClick(i) }}>
                                                                                        {x?.filePath.split(/_(.+)/)[1]}
                                                                                    </div>

                                                                                </td>











                                                                            </tr>








                                                                        </>
                                                                    )

                                                                })}


                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        }
                                        {/* <Row>
                                    <Col lg={6} md={12} sm={12}>
                                        <Form.Group>
                                                <Form.Label>Attachment Listing</Form.Label>
                                                <Form.Control
                                                readOnly
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setPendancyData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        pendencyRemarks : e.target.value
                                                    }
                                                })
                                             }}
                                            // placeholder='Enter Remarks'
                                          />
                                            </Form.Group>
                                        </Col> 





                                    </Row> */}




                                    </Card>



                                </Col>





                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseRequestApproval}>
                            Close
                        </Button>
                        {!approvalData?.isSpecialApproval &&

                            <Button variant="" className='add-Btn'
                                disabled={approvalData?.isSpecialApproval}
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(approvalData);
                                    if (!approvalData?.ApprovalAmount) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Please Enter Approval Amount",
                                        });
                                        return;

                                    }
                                    if (approvalData.DocumentFile.length == 0) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Please Add Attachment file",
                                        });
                                        return;

                                    }
                                    // if (!approvalData?.DocumentFile.length == 0) {
                                    //     Swal.fire({
                                    //         icon: "error",
                                    //         title: "Please select Attachment File",
                                    //       });
                                    //       return;
                                    // }


                                    const formData = new FormData();
                                    formData.append("ClaimAmount", approvalData?.ApprovalAmount);
                                    formData.append("ServiceTicketId", approvalData?.ServiceTicketId);
                                    formData.append("Remarks", approvalData?.SpecialApprovalDescription);
                                    for (let i = 0; i < approvalData.DocumentFile.length; i++) {
                                        formData.append("documentFile", approvalData?.DocumentFile[i]);
                                    }

                                    fetch(
                                        `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/InsertAscSpecialApprovalClaim`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: formData
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }
                                            console.log(result);
                                            Swal.fire({
                                                icon: "success",
                                                title: "Special approval request submitted successfully!"
                                            })


                                            console.log(result);
                                            fetchData();
                                            handleCloseRequestApproval();
                                        });







                                }}

                            >
                                Save
                            </Button>
                        }

                    </>} />


                <GenericModal show={showTechnician} handleClose={handleCloseTechnician} size='l' backdrop="static" IsCentered='centered' className='mdl-title' title="Re-assign Technician"
                    body={
                        <>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Date <span className='req-t'>*</span></Form.Label>
                                                    <Form.Control type='date' value={TechData?.assignDate} min={currentDate} onChange={(e) => {
                                                        setTechData((pre) => {
                                                            return {
                                                                ...pre,
                                                                assignDate: e.target.value
                                                            }
                                                        })
                                                    }} />

                                                </Form.Group>
                                            </Col>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Re-assign Technician<span className='req-t'>*</span></Form.Label>
                                                    <Form.Select
                                                        name='technicianId'
                                                        // value = {TechData.technician}
                                                        onChange={(e) => {
                                                            setTechData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    technicianId: e.target.value
                                                                }
                                                            })
                                                        }}>
                                                        <option value={0}>Select</option>
                                                        {ASCWiseTecnicians.map((obj) => (
                                                            <option key={obj.technicianId} value={obj.technicianId}>
                                                                {obj.technicianName}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='remarks'
                                                        // value = {TechData.remarks}
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        //  value={addActivity.activityName}
                                                        onChange={(e) => {
                                                            setTechData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    remark: e.target.value
                                                                }
                                                            })
                                                        }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>





                                        </Row>



                                    </Card>



                                </Col>





                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseTechnician}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'
                            onClick={(e) => {
                                e.preventDefault()
                                if (TechData.assignDate == '') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Date is required",
                                    });
                                    return;

                                }
                                else if (TechData.technicianId == '') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Please Select technician",
                                    });
                                    return;

                                }
                                else if (TechData.remark == '') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Remarks is required",
                                    });
                                    return;
                                }

                                else {
                                    TechData.technicianId = parseInt(TechData.technicianId)

                                    console.log(TechData);

                                    fetch(
                                        `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpdateReassignedTechniciane?serviceTicketId=${TechData?.serviceTicketId}&TechnicianId=${TechData?.technicianId}&Remark=${TechData?.remark}&AssignDate=${TechData?.assignDate}`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((result) => {
                                            if (result?.status == 400) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops Something went wrong!",
                                                });
                                                return
                                            }

                                            else {

                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Assign technician successfully!'
                                                });

                                                fetchData()


                                                handleCloseTechnician();

                                            }
                                        });










                                }
                            }
                            }

                        >
                            Save
                        </Button>
                    </>} />







                <GenericModal show={showList} handleClose={handleCloseUpdatedList} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Request status"
                    body={
                        <>
                            <Row className=''>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Service request status</Form.Label>
                                        <Form.Select >
                                            <option value=''>Select</option>


                                        </Form.Select>

                                    </Form.Group>
                                </Col>


                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Service request sub status</Form.Label>
                                        <Form.Select >
                                            <option value=''>Select</option>

                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>




                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseUpdatedList}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn'


                        >
                            Save
                        </Button>
                    </>} />





                {/* -------------------------Add Documents------------------------------ */}



                <GenericModal show={showDocuments} handleClose={handleCloseDocuments} size="lg" title="Add Documents" IsCentered={true} backdrop="static" body={
                    <>
                        <Form id="DocumentsForm">

                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Document Type <span className='req-t'>*</span></Form.Label>
                                        <Form.Select onChange={(e) => {
                                            let selectedIndex = e.target.selectedIndex

                                            //  e.target.options[selectedIndex].getAttribute("code") 

                                            console.log(e.target.value);

                                            setuploadDocuments((pre) => {
                                                return {
                                                    ...pre,
                                                    DocumentId: e.target.value,
                                                    IsMandatory: e.target.options[selectedIndex].getAttribute("code")
                                                }
                                            })

                                            console.log(uploadDocuments);

                                        }}>
                                            <option value="0">Select</option>
                                            {
                                                documentTypeList?.map((type, i) => {
                                                    return (
                                                        <>
                                                            <option value={type?.parameterTypeId} code={type?.isRequired}><span>{(type?.parameterTypeId == "13" || type?.parameterTypeId == "14" || type?.parameterTypeId == "15") ? <span className='req-t'>*</span> : ""}</span> {type?.parameterType}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Document File <span className='req-t'>*</span></Form.Label>
                                        <Form.Control type='file' onChange={(e) => {
                                            setuploadDocuments((pre) => {
                                                return {
                                                    ...pre,
                                                    DocumentWithType: e.target.files[0]
                                                }
                                            })


                                            console.log(uploadDocuments);

                                        }} />

                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Button variant='' className='mt-4' onClick={(e) => {
                                        e.preventDefault();

                                        if (uploadDocuments?.DocumentId == "" || uploadDocuments?.DocumentId == "0") {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Document type is required!"
                                            })
                                        }
                                        else if (uploadDocuments?.DocumentWithType == "" || uploadDocuments?.DocumentWithType == undefined) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Document file is required!"
                                            })
                                        }
                                        else {

                                            let n = {
                                                ...uploadDocuments,
                                                IsMandatory: uploadDocuments?.IsMandatory == "True" ? true : false
                                            }

                                            const formData = new FormData();
                                            Object.keys(n).forEach(key => {
                                                if (key == 'DocumentWithType') {
                                                    formData.append(key, n[key]);
                                                } else {
                                                    formData.append(key, n[key]);
                                                }
                                            });
                                            fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/InsertAscServiceTicketFIRDocument`, {
                                                method: "POST",
                                                headers: {
                                                    // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                    "Authorization": `Bearer ${token}`
                                                },
                                                body: formData
                                            })
                                                .then((res) => {
                                                    let resp = res.text()
                                                    resp.then((r) => {
                                                        let digitregex = /^\d+$/;
                                                        if (r.match(digitregex)) {
                                                            console.log(r);

                                                            fetchAllDocuments(AllDocuments[0]?.serviceTicketId)


                                                            let docForm = document.getElementById("DocumentsForm");

                                                            docForm.reset();


                                                            setuploadDocuments((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    DocumentId: "",
                                                                    DocumentWithType: ""
                                                                }
                                                            }
                                                            )
                                                        }
                                                        else {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: "Error uploading document!"
                                                            })
                                                        }
                                                    })
                                                })
                                        }




                                    }}>  <FaCirclePlus
                                            color="green"
                                            fontSize={20}
                                        /></Button>
                                </Col>
                            </Row>
                        </Form>

                        <Row>
                            <Col>
                                {/* <p>Service ticket No. {AllDocuments[0]?.}</p> */}
                                <Table bordered>
                                    <thead className='docTable'>
                                        <tr style={{ textAlign: "center" }}>
                                            <th>Document Name</th>
                                            <th>File</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            AllDocuments?.map((document, i) => {
                                                const docPath = document?.docPath || '';
                                                const [firstPart, restOfString] = docPath.split(/_(.+)/);
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{document?.documentName}</td>
                                                            <td><p style={{ cursor: "pointer" }} onClick={(e) => {
                                                                e.preventDefault();



                                                                const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${document?.docPath}`;


                                                                fetch(downloadUrl, {
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        "Authorization": `Bearer ${token}`
                                                                    },

                                                                })
                                                                    .then((res) => {
                                                                        console.log("logging file response");
                                                                        console.log(res);
                                                                        const lastDotIndex = res.url.lastIndexOf(".");
                                                                        const lastUnderscoreIndex = res.url.lastIndexOf("_");
                                                                        const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                                                                        // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                                                                        console.log("File Name:", fileNameWithExt);
                                                                        // console.log("Extension:", extension);
                                                                        //    console.log(ext);
                                                                        let resp = res.blob()
                                                                        resp.then((r) => {
                                                                            console.log(r);
                                                                            if (r instanceof Blob) {
                                                                                handleDownload(r, fileNameWithExt);
                                                                            } else {
                                                                                // Handle non-Blob responses
                                                                                console.error('Response is not a Blob');
                                                                            }

                                                                        })
                                                                    })








                                                                // const link = document.createElement('a');
                                                                // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                                                // link.download = 'downloaded_image.jpeg';
                                                                // document.body.appendChild(link);
                                                                // link.click();
                                                                // document.body.removeChild(link);
                                                            }} ><u>{restOfString}</u></p></td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </Col>

                        </Row>
                    </>
                } />


                <GenericModal show={showEditInfo} handleClose={handleCloseInfoProduct} size='xl' IsCentered='centered' backdrop="static" className='mdl-title' title={`Service request edit / ${ticNumber}`}
                    body={
                        <>

                            <Row>

                                <Col md={2} >
                                    <Form.Group >
                                        <Form.Label className="text-start">Customer Type <span className="req-t">*</span></Form.Label>
                                        <Form.Select name="UserType" value={dataProduct?.userType}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setDataProduct((pre) => {
                                                    return {
                                                        ...pre,
                                                        userType: e.target.value,

                                                    }
                                                }
                                                )
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {customerType?.map((cType, i) => {
                                                return (
                                                    <>
                                                        <option value={cType?.parameterValId}>
                                                            {cType?.parameterText}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>


                                {
                                    (dataProduct?.userType == "136" || dataProduct?.userType == "137") && (
                                        <Col md={2} >
                                            <Form.Group>
                                                <Form.Label >
                                                    {dataProduct?.userType == "136" ? "OEM" : "Dealer"} Name<span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Select aria-label="Default select example" name='dealerCode' value={dataProduct?.dealerCode} onChange={(e) => {

                                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                                    const dealerCode = e.target.value;
                                                    const dealerName = selectedOption.text;
                                                    setDataProduct((pre) => {
                                                        return {
                                                            ...pre,
                                                            dealerCode,
                                                            dealerName,

                                                        };
                                                    });

                                                    fetch(
                                                        `${process.env.REACT_APP_API_URL}Dealer/GetDealerByCode?DealerCode=${dealerCode}`,
                                                        {
                                                            method: "GET",
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },

                                                        }
                                                    )
                                                        .then((res) => res.json())
                                                        .then((result) => {

                                                            console.log(result);
                                                            setDataProduct((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    pinCode: result?.pinCode.toString(),
                                                                    cityId: result?.cityId.toString(),
                                                                    stateId: result?.stateId.toString(),
                                                                    emailId: result?.dealerEmail ? result?.dealerEmail : '',
                                                                    address: result?.address ? result?.address : '',
                                                                    mobileNo: result?.mobileNo ? result?.mobileNo : '',
                                                                };
                                                            });

                                                            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.stateId ? result?.stateId : ""}&Code=0`;
                                                            fetch(cityUrl, {
                                                                headers: {
                                                                    "Authorization": `Bearer ${token}`
                                                                }
                                                            })
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log(result);
                                                                    setcities2(result)
                                                                })


                                                        });

                                                }}>
                                                    <option value=''>Select</option>
                                                    {dealername?.map((dName, index) => {
                                                        return (
                                                            <>

                                                                <option value={dName?.dealerCode} name={dName?.dealerName}>{dName?.dealerName}</option>
                                                            </>
                                                        );
                                                    })}

                                                </Form.Select>




                                            </Form.Group>

                                        </Col>
                                    )
                                }

                                <Col md={2}>
                                    <Form.Group className="">
                                        <Form.Label >
                                            Nature of Complaint{" "}
                                            <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Select
                                            name="defectId"
                                            value={dataProduct?.defectId}
                                            onChange={(e) => {

                                                customerProductChange(e)
                                                const selectedIndex = e.target.selectedIndex

                                                let a = e.target.options[selectedIndex].getAttribute("code");
                                                // setselectedNature(a)


                                                fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=TelecallerCallMode`, {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                    },
                                                })
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                        console.log(result);

                                                        if (dataProduct?.divCode == "DR" && a == "Commissioning or Installation") {
                                                            let filtered = result?.filter(i => i?.parameterValId != "146" && i?.parameterValId != "148")
                                                            console.log(filtered);
                                                            let sortedArray = filtered.sort((a, b) => a.parameterValId - b.parameterValId);

                                                            setcallModes(sortedArray)
                                                        }

                                                        else if (dataProduct?.productLineCode == "C1") {
                                                            let filtered = result?.filter(i => i?.parameterValId != "145")
                                                            console.log(filtered);


                                                            setcallModes(filtered)
                                                        }
                                                        else {
                                                            console.log(result);
                                                            setcallModes(result)

                                                        }







                                                    })
                                            }}

                                        >
                                            <option value="">Select</option>

                                            {defectsByPL?.map((issue, index) => {
                                                return (
                                                    <>
                                                        <option value={issue?.issueTypeId} code={issue?.issueTypeName}>
                                                            {issue?.issueTypeName}
                                                        </option>
                                                    </>
                                                );
                                            })}

                                            {/* <option value="0">Others</option> */}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>


                                {dataProduct?.userType == "136" || dataProduct?.userType == "137" ? '' :(
                                    <Col md={2} >
                                        <Form.Group>
                                            <Form.Label className="text-start">Call Type <span className="req-t">*</span></Form.Label>
                                            <Form.Select name="CallModeId" value={dataProduct?.CallModeId} onChange={customerProductChange}>
                                                <option value="">Select</option>

                                                {callModes?.map((modes, i) => {
                                                    return (
                                                        <>
                                                            <option value={modes?.parameterValId}>
                                                                {modes?.parameterText}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                )

                                }


                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                                        <Form.Select aria-label="Default select example" name='divisionName' disabled value={dataProduct?.divCode} onChange={(e) => {

                                            const selectedOption = e.target.options[e.target.selectedIndex];
                                            const divCode = e.target.value;
                                            const divisionCode = selectedOption.text;


                                            setDataProduct((pre) => {
                                                return {
                                                    ...pre,
                                                    divCode,
                                                    divisionCode,
                                                    productLineCode: ''
                                                };
                                            });



                                            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divCode ? divCode : 0}`, {
                                                headers: {
                                                    "Authorization": `Bearer ${token}`
                                                }
                                            })
                                                .then((res) => res.json())
                                                .then((result) => {
                                                    console.log(result);
                                                    setproductLines(result);
                                                });
                                        }}>
                                            <option value=''>Select</option>
                                            {divisions?.map((division, index) => {
                                                return (
                                                    <>

                                                        <option value={division?.divisionCode} name={division?.divisionName}>{division?.divisionName}</option>
                                                    </>
                                                );
                                            })}

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Product-Line <span className='req-t'>*</span></Form.Label>
                                        <Form.Select aria-label="Default select example" disabled name='productLineName' value={dataProduct?.productLineCode} onChange={(e) => {
                                            const selectedOption = e.target.options[e.target.selectedIndex];
                                            const productLineName = selectedOption.text;
                                            const productLineCode = e.target.value;
                                            setDataProduct((pre) => {
                                                return {
                                                    ...pre,
                                                    productLineName,
                                                    productLineCode

                                                }
                                            })


                                            const selectedIndex = e.target.selectedIndex;
                                            const selectedOptionCode = e.target.options[selectedIndex].getAttribute("isReq");


                                            console.log(selectedOptionCode);




                                        }}>
                                            <option>Select</option>
                                            {prodctLines?.map((productLine, index) => {
                                                return (
                                                    <>
                                                        <option value={productLine?.parameterTypeId} isReq={productLine?.isRequired}>{productLine?.parameterType}</option>

                                                    </>
                                                );
                                            })}

                                        </Form.Select>
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
                                            {/* {
                                                ticketInfo[0]?.divisionCode == 'M7' ? "" : (
                                                    <span className="req-t">*</span>
                                                )
                                            } */}
                                        </Form.Label>
                                        <Form.Control
                                            autoComplete="off"

                                            type="text"
                                            name="serialNo"
                                            value={dataProduct?.serialNo}
                                            onChange={(e) => {

                                                // value={dataProduct?.serialNo}
                                                // onChange={handleSerailNoChange}
                                                const selectedSerail = e.target.value
                                                handleSerailNoChange(e)
                                                fetch(
                                                    `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfoFIR?SerialNo=${selectedSerail ? selectedSerail : ""}&ProductCode=${dataProduct?.productCode ? dataProduct?.productCode : "0"}&InvoiceDate=${dataProduct?.invoiceDate ? dataProduct?.invoiceDate : ""}&DivisionCode=${dataProduct?.divCode} `,

                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    }
                                                )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                        setDataProduct((pre) => {
                                                            return {
                                                                ...pre,
                                                                invoiceDate: '',
                                                                productCode: result[0]?.productCode
                                                            }
                                                        }
                                                        )







                                                        if (ticketInfo[0]?.divisionCode != 'M7') {
                                                            let a = result[0]?.batchStartDate;
                                                            a = moment(a).format("YYYY-MM-DD")
                                                            let d1 = new Date(a);
                                                            let d2 = new Date(dataProduct.invoiceDate);
                                                            // console.log(a, 'a---------')
                                                            setMinInvoiceDate(a);

                                                        }

                                                    })








                                            }}

                                        // readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                        />
                                    </Form.Group>
                                </Col>
                                {/* <Col md={2}>
                                                                            <Form.Label>
                                                                                Product Code{" "}

                                                                                <span className="req-t">*</span>

                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                autoComplete="off"

                                                                                type="text"
                                                                                name="productCode"
                                                                                value={tab1?.productCode || ''}
                                                                                onChange={(e) => {
                                                                                    const selectedP = e.target.value



                                                                                    handleChange(e)
                                                                                    fetch(
                                                                                        `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${tab1?.serialNo ? tab1?.serialNo : ""}&ProductCode=${selectedP ? selectedP : "0"}&InvoiceDate=${tab1?.invoiceDate ? tab1?.invoiceDate : ""}&DivisionCode=${ticketInfo[0]?.divisionCode} `,

                                                                                        {
                                                                                            headers: {
                                                                                                Authorization: `Bearer ${token}`,
                                                                                            },
                                                                                        }
                                                                                    )
                                                                                        .then((res) => res.json())
                                                                                        .then((result) => {
                                                                                            // console.log(result[0]?.batchStartDate)





                                                                                            settab1((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    invoiceDate: '',
                                                                                                    // serialNo: ""
                                                                                                }
                                                                                            }
                                                                                            )





                                                                                            // console.log(a, '11111111111111')


                                                                                            if (ticketInfo[0]?.divisionCode != 'M7') {
                                                                                                let a = result[0]?.batchStartDate;
                                                                                                a = moment(a).format("YYYY-MM-DD")
                                                                                                let d1 = new Date(a);
                                                                                                let d2 = new Date(tab1.invoiceDate);
                                                                                                // console.log(a, 'a---------')
                                                                                                setMinInvoiceDate(a);
                                                                                                if (d1 > d2) {
                                                                                                    settab1((pre) => {
                                                                                                        return {
                                                                                                            ...pre,
                                                                                                            invoiceDate: ""
                                                                                                        }
                                                                                                    }
                                                                                                    )
                                                                                                }
                                                                                            }

                                                                                        })






                                                                                    setverifiedWarrantyStatus("")
                                                                                    setverifiedWarrantyFromInvoice("")

                                                                                }}

                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}


                                                                            />
                                                                        </Col> */}




                                {/* <Col md={2}>
                                    <Form.Group>
                                        <Form.Label className="text-start">Serial No </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={dataProduct?.serialNo}
                                            onChange={handleSerailNoChange}

                                        ></Form.Control>
                                    </Form.Group>


                                </Col> */}
                                <Col md={2}>
                                    <Form.Group style={{
                                        // marginTop: '10px'
                                    }}>
                                        <Form.Label
                                            style={{
                                                // fontSize: '14px',
                                                // color: '#fff',
                                                // fontWeight: '400'
                                            }}
                                        >
                                            Enter product code
                                            {/* <span className="req-t">*</span> */}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            // name="ProductCode"
                                            value={dataProduct.productCode}
                                            // readOnly={infolog?.length != 0}
                                            onChange={(e) => {
                                                const value = e.target.value;



                                                console.log(value)






                                                setDataProduct((pre) => {
                                                    return {
                                                        ...pre,
                                                        productCode: value
                                                    };
                                                });



                                            }} />

                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Invoice No <span className="req-t">*</span> </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="text"
                                            name="invoiceNo"

                                            value={dataProduct?.invoiceNo}
                                            onChange={customerProductChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Invoice Date <span className="req-t">*</span>  </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="date"
                                            name="invoiceDate"
                                            max={currentDate}
                                            min={minInvoiceDate}
                                            value={moment(dataProduct?.invoiceDate)?.format("YYYY-MM-DD")}
                                            onChange={customerProductChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            Mobile No <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="tel"
                                            name="mobileNo"
                                            value={dataProduct?.mobileNo}
                                            onChange={(e) => {
                                                handleMobileChange2(e)
                                            }}
                                        />

                                        {mobileError2 && (
                                            <span style={{ color: "red" }}>{mobileError2}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            Email id 
                                        </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="text"
                                            name="emailId"
                                            value={dataProduct?.emailId}
                                            onChange={handleEmailChange2}
                                        />

                                        {emailError2 && (
                                            <span style={{ color: "red" }}>{emailError2}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            Address <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="text"
                                            name="address"
                                            value={dataProduct?.address}
                                            onChange={customerProductChange}

                                        />
                                    </Form.Group>
                                </Col>




                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            PinCode <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            autoComplete="new-password"

                                            type="text"
                                            name="pinCode"

                                            value={dataProduct?.pinCode}
                                            onChange={(e) => {
                                                handleProdPinCodeChange(e);




                                            }}
                                        />
                                        {/* {loading ? <div className="d-flex mt-2"><p style={{ color: "blue" }} className="mt-1">Please wait </p><span className="mx-2">
                                            <Spinner />
                                        </span></div> : ""} */}
                                        {pinError1 && (
                                            <span style={{ color: "red" }}>{pinError1}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            State <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Select
                                            name="stateId"
                                            value={dataProduct?.stateId}
                                            disabled
                                            onChange={(e) => {
                                                setDataProduct((pre) => {
                                                    return {
                                                        ...pre,
                                                        stateId: e.target.value,
                                                    };
                                                });

                                                const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value ? e.target.value : '0'}&Code=0`;
                                                fetch(cityUrl)
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                        console.log(result);
                                                        setcities2(result);
                                                    });
                                            }}
                                        >
                                            {/* <option value={data?.state} >
                                            {data?.state}
                                        </option> */}

                                            <option value="">Select</option>
                                            {states?.map((state, index) => {
                                                return (
                                                    <>
                                                        <option value={state?.parameterTypeId} key={index}>
                                                            {state?.parameterType}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>
                                            City <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Select
                                            name="cityId"
                                            value={dataProduct?.cityId}
                                            disabled
                                        >

                                            <option value="">Select</option>
                                            {cities2 &&
                                                cities2?.map((city, index) => {
                                                    return (
                                                        <>
                                                            <option value={city?.parameterTypeId} key={index}>
                                                                {city?.parameterType}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>


                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseInfoProduct}>
                            Close
                        </Button>
                        <Button variant="" disabled={emailError2 || mobileError2 || pinError1} className='add-Btn'
                            onClick={() => {
                                console.log(dataProduct);

                                if (dataProduct?.divCode == '' ||  dataProduct?.userType ==
                                    '' || dataProduct?.invoiceNo == '' || dataProduct?.invoiceDate == '' || dataProduct?.mobileNo == '' || dataProduct?.pinCode ==''|| dataProduct?.address == ''
                                ) {

                                    Swal.fire({
                                        icon: "error",
                                        title: "Please fill all the fields marked with red *!"
                                    })
                                }

                                else {

                                    console.log(dataProduct);
                                    let n = {
                                        serviceTicketId: dataProduct?.serviceTicketId,
                                        serialNo: dataProduct?.serialNo,
                                        divCode: dataProduct?.divCode,
                                        productLineCode: dataProduct?.productLineCode,
                                        productCode: dataProduct?.productCode,
                                        invoiceDate: dataProduct?.invoiceDate,
                                        invoiceNo: dataProduct?.invoiceNo,
                                        pinCode: dataProduct?.pinCode,
                                        cityId: dataProduct?.cityId,
                                        stateId: dataProduct?.stateId,
                                        emailId: dataProduct?.emailId,
                                        address: dataProduct?.address,
                                        mobileNo: dataProduct?.mobileNo,
                                        frame: dataProduct?.frame,
                                        hp: dataProduct?.hp,
                                        kva: dataProduct?.kva,
                                        randomNo: dataProduct?.randomNo,
                                        userType: dataProduct?.userType,
                                        CallModeId: dataProduct?.CallModeId,
                                        defectId: dataProduct?.defectId,
                                        dealerCode: dataProduct?.dealerCode




                                    }

                                    console.log(n)
                                    fetch(
                                        `${process.env.REACT_APP_API_URL}ProdCustInfo/UpsertProductCustomerASMInfo`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(n)
                                        }
                                    )
                                        .then((res) => {
                                            let resp = res.text()
                                            resp.then((r) => {
                                                console.log(r);
                                                let regextest = /^[0-9]*$/;
                                                if (r.match(regextest)) {
                                                    let getDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketById?ServiceTickeId=${r}`;

                                                    fetch(getDetailUrl, {
                                                        headers: {

                                                            "Authorization": `Bearer ${token}`
                                                        },

                                                    })
                                                        .then((res) => res.json())
                                                        .then((result) => {
                                                            console.log(result);
                                                            setticketSubmissionDetails(result[0]);
                                                        });

                                                    handleShowCustomer();
                                                    handleCloseInfoProduct()

                                                }


                                                else {
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "Something went wrong!"
                                                    })
                                                }
                                            });


                                        })
                                        .catch(error => {
                                            console.error('Error:', error);  // Log any errors that occur
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Something went wrong!',
                                                text: 'An unexpected error occurred.'
                                            });
                                        });
                                }
                            }
                            }


                        >
                            Save
                        </Button>
                    </>} />

                <GenericModal show={showCustomer} handleClose={handleCloseCustomer} size='xl' IsCentered='centered' backdrop="static" className='mdl-title' title="Edit Product"
                    body={
                        <>

                            <Card
                                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                            >
                                <Row
                                    className='text-start p-2'>
                                    <Col className="mt-3" md={12}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}>Complaint has been registered with SR number :
                                            <span className="text-left pg-label-warranty " style={{
                                                fontStyle: '500'
                                            }}>
                                                {ticketSubmissionDetails?.serviceTicketNumber}</span>
                                        </h3>
                                        {/* <h3 style={{
                        fontSize: '16px'
                      }}>                         Complaint will be attended by our team shortly
                      </h3> */}
                                    </Col>
                                    <Col className="mt-3" md={12}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}> The complaint will be resolved by CG authorised service center: <span className="text-left pg-label-warranty " style={{
                                            fontStyle: '500'
                                        }}></span></h3>
                                    </Col>
                                    <Col className="mt-3" md={6}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}>ASC Name: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}> {ticketSubmissionDetails?.ascName}</span></h3>
                                    </Col>
                                    <Col className="mt-3" md={6}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}
                                        >ASC Contact Number: <span className="text-left pg-label-warranty " style={{
                                            // color:'gray',
                                            // fontSize:'18px',
                                            fontStyle: '500'
                                        }}> {ticketSubmissionDetails?.ascMobileNo}</span></h3>
                                    </Col>
                                    {/* <Col className="mt-3" md={6}>
                      <h3 style={{
                        fontSize: '16px'
                      }}
                      >Assigned ASC: <span className="text-left pg-label-warranty " style={{
                        color:'gray',
                        fontSize:'18px',
                        fontStyle: '500'
                      }}> {ticketSubmissionDetails?.ascMobileNo}</span></h3>
                    </Col> */}
                                    <Col className="mt-3" md={6}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}> CG’s ASM: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmName}</span></h3>
                                    </Col>
                                    <Col className="mt-3" md={6}>
                                        <h3 style={{
                                            fontSize: '16px'
                                        }}>  ASM email id: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmEmail}</span></h3>
                                    </Col>



                                </Row>
                            </Card>


                        </>
                    }
                    footer={<>
                        <Row style={{
                            width: '-webkit-fill-available'
                        }} className='text-center'>
                            <Col>
                                <Button variant="" className='add-Btn' onClick={() => {
                                    handleCloseCustomer()
                                    fetchData()

                                }}>
                                    Ok
                                </Button>
                            </Col>
                        </Row>

                    </>} />

























            </Card>
            {
                emptyjob != "no" &&
                <>
                    {<div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                        {empty ?

                            <PrintableComponent ref={componentRef} sheet={
                                emptyjob == 2 ? <AlternatorSheetEmpty /> :
                                    emptyjob == 3 ? <FHPEmpty /> :
                                        emptyjob == 4 ? <EmptyJobSheet /> :
                                            emptyjob == 5 ? <DCJobsheetEmpty /> :
                                                <ACJobSheetEmpty />


                            } /> :
                            <PrintableComponent ref={componentRef} sheet={
                                productLineCode == "DC" ? <AlternatorSheet sernNo={sernNo} prodCode={productCode} divCode={divisionCode} custData={custData} /> :
                                    divisionCode == "M4" ? <FHP sernNo={sernNo} prodCode={productCode} divCode={divisionCode} custData={custData} /> :
                                        divisionCode == "CP" || divisionCode == "DR" || divisionCode == "M7" ? <JobSheet sernNo={sernNo} prodCode={productCode} divCode={divisionCode} custData={custData} /> :
                                            divisionCode == "M3" && productLineCode == "DD" ? <DCJobsheet sernNo={sernNo} prodCode={productCode} divCode={divisionCode} custData={custData} /> :
                                                <ACJobSheet sernNo={sernNo} prodCode={productCode} divCode={divisionCode} custData={custData} />
                            } />

                        }
                    </div>}
                </>
            }


        </>
    )
}

export default ServiceRequest