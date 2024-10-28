import React, { useState, useMemo, useEffect } from 'react'
import { Card, Row, Col, Button, Form, Modal, Accordion, Table } from 'react-bootstrap'
import { MaterialReactTable } from 'material-react-table';
import { Box, Tooltip } from '@mui/material';
import { FaUserXmark } from 'react-icons/fa6';
import { FaBan, FaCheckCircle, FaEdit, FaRegEdit, FaUserCircle } from 'react-icons/fa';
import { IoCallOutline, IoClose, IoMail, IoSave } from 'react-icons/io5';
import { MdEdit, MdOutlineAssignmentInd } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';
import { HiThumbUp } from 'react-icons/hi';
import { HiHandThumbDown } from "react-icons/hi2";
import { BsPersonFillAdd } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import { usePathName } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import { TbEyeEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';



const ServiceRequestReport = () => {
    const pathName = usePathName()
    const navigate = useNavigate();
    let token = localStorage.getItem("UserToken");
    let RoleName = localStorage.getItem("RoleName");
    let showActionCol;
    if(RoleName == "Au5"){
       showActionCol = true 
    }
    else{
        showActionCol = false
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

    const [activeKey, setactiveKey] = useState('0')

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
        serviceTicketId:0,
        technicianId: 0,
        remark:""
    })
    const [ascData, setAscData] = useState({
        serviceTicketId: 0,
        ticketAssignedASCCode: 0,
        remark:""
    });

    const [cancellationData, setCancellationData] = useState({
        approvalStatus:0,
        ascCustomerContactedId: 0,
        serviceTicketId: 0,
        approvedBy: "",
        approvedComments: "",
        approvedDate: "",
        remarks:""
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


    const fetchData = async () => {
        if (!AllOpenRequests.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }

        const url = new URL(

            `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequestView`,

        );
        url.searchParams.set(
            'PageNumber',
            `${pagination.pageIndex}`,
        );
        url.searchParams.set('PageSize', `${pagination.pageSize}`);

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        try {
            const response = await fetch(url.href, {
                headers: headers
            });
            const json = await response?.json();
            console.log(json);
            setAllOpenRequests(json);
            setAllRequestsForFilter(json)
            setRowCount(json[0]?.totalRows);
            console.log(json[0]?.totalRows);
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);


        // fetch(`${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequestView`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        // })
        // .then((res)=>res.json())
        // .then((result)=>{
        //     console.log(result);
        //     setRowCount(result[0]?.totalRows);
        //     let filteropenComplaints = result;
        //     if(localStorage.getItem("filterReq") == "OpenComplaints"){
        //       filteropenComplaints =  result?.filter((obj)=>obj.issueStatus == "Open");
              
        //     }
        //     if(localStorage.getItem("filterReq") == "suspense"){
        //         filteropenComplaints =  result?.filter((obj)=>(obj.ascName == "" || !obj.ascName));
        //     }
        //     if(localStorage.getItem("filterReq") == "techNotAssign"){
        //         filteropenComplaints =  result?.filter((obj)=>(obj.technicianName == "" || !obj.technicianName));
        //     }
        //     if(localStorage.getItem("filterReq") == "closedComplaints"){
        //         filteropenComplaints =  result?.filter((obj)=>obj.issueStatus == "Close");
        //     }
        //     if(localStorage.getItem("filterReq") == "cancelledComplaints"){
        //         filteropenComplaints =  result?.filter((obj)=>obj.subStatusName == "Cancellation");
        //     }
        //     if(localStorage.getItem("filterReq") == "RejectedComplaints"){
        //         filteropenComplaints =  result?.filter((obj)=>obj.subStatusName == "Rejected");
        //     }
        //     localStorage.removeItem("filterReq");
            
            
        //     setAllOpenRequests(filteropenComplaints);

            
        // })




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


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // columnFilters,
        // globalFilter,
        pagination?.pageIndex,
        pagination?.pageSize,
        // sorting,
    ]);





    const [filteredDivision, setfilteredDivision] = useState("")
    const [filteredProductLine, setfilteredProductLine] = useState("")
    const [filteredWarrantyStatus, setfilteredWarrantyStatus] = useState("")
    const [filterSerNumber, setFilterredSerNumber] = useState("")
    const [filteredIssueStatus, setfilteredIssueStatus] = useState("")
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

            `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASCServiceRequestView`,

        );
        url.searchParams.set(
            'PageNumber',
            `${filterPagination?.pageIndex}`,
        );
        console.log("filterPagination");
        console.log(filterPagination);
        url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);


        if (filteredDivision) { url.searchParams.set('DivisionCode', `${filteredDivision}`) }
        if (filteredProductLine) { url.searchParams.set('ProductLineCode', `${filteredProductLine}`) }
        if (filteredWarrantyStatus) { url.searchParams.set('WarrantyStatus', `${filteredWarrantyStatus}`) }
        if (filteredIssueStatus) { url.searchParams.set('IssueStatus', `${filteredIssueStatus}`) }
        if (filteredFromDate) { url.searchParams.set('FromDate', `${filteredFromDate}`) }
        if (filteredToDate) { url.searchParams.set('ToDate', `${filteredToDate}`) }
        if (filterSerNumber) { url.searchParams.set('PhoneOrServiceTicketNo', `${filterSerNumber}`) }


        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        try {
            const response = await fetch(url.href, {
                headers: headers
            });
            let json = await response?.json();
            console.log(json);
            console.log(json[0]?.totalRows);

            if(time == 'lessthan23'){
                json = json.filter(i=>i?.ageOfPendency<23);
            }
            if(time == '24to48'){
                json = json.filter(i=>(i?.ageOfPendency>=23 && i?.ageOfPendency<=48));
            }
            if(time == 'morethan48'){
                json = json.filter(i=>i?.ageOfPendency>48);
            }
            // else if(time == 'Pendancy'){ 
            //         json = json.filter(i=>i?.ageOfPendency>72);
   
            // }
            if(reasonEmptyCheck || isChecked){
                json = json.filter(i=>i?.ageOfPendency>48 && (!i?.pendencyRemarks || i?.pendencyRemarks == ""));
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

    useEffect(() => {
        console.log('fetchFilterPagination()')
        fetchFilterPagination();

    }, [filterPagination?.pageIndex, filterPagination?.pageSize]);








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
const handleShowAsc = () =>{
    fetch(
        `${process.env.REACT_APP_API_URL}Asc/GetAllAscList`,
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
const handleShowCancelAppr = () =>{
    
    setShowCancelAppr(true);
}
const handleCloseCancelAppr = ()=>{
    setShowCancelAppr(false)
}
const [ASCWiseTecnicians, setASCWiseTecnicians] = useState([]);
const [ASCNames, setASCNames] = useState([]);
const [ShowAsc, setShowAsc] = useState(false);
const [ShowPendancy, setShowPendancy] = useState(false);
const [showTechnician, setShowTechnician] = useState(false);
const handleShowPendency = () =>{
    // fetch(
    //     `${process.env.REACT_APP_API_URL}Asc/GetAllAscList`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result);
    //       setASCNames(result);
    //     });
    setShowPendancy(true);
}
const handleClosePendancy = ()=>{
    setShowPendancy(false);
}
const handleShowTechnician = () =>{
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
const handleSwitchChange = (e) =>{
    // setIsChecked(e.target.checked);
    fetchFilterPagination();
    console.log();

}
const handleCloseTechnician = () =>{
    setShowTechnician(false);
}
const handleCloseAsc = () =>{
    setShowAsc(false);
}


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

                                        <p className='ticketInfoLabelST'>Service Request Type: <span className='ticketInfoData'>{cellData?.serviceTicketType ? cellData?.serviceTicketType : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Division: <span className='ticketInfoData'>{cellData?.divisionName ? cellData?.divisionName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Company Name: <span className='ticketInfoData'>{cellData?.customerName ? cellData?.customerName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Technician: <span className='ticketInfoData'>{cellData?.technicianName ? cellData?.technicianName : "-"} {
                                            (cellData?.technicianName && RoleName == "Au5") 
                                            }  </span></p>
                                        <p className='ticketInfoLabelST'>Claim Status: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>
                                        {(RoleName == "AS8") && <p className='ticketInfoLabelST'>Pendency Reason updated On: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>}
                                        {(RoleName == "AS8") &&<p className='ticketInfoLabelST'>Complaint Pendency Remark: <span className='ticketInfoData'>{cellData?.subStatusName ? cellData?.subStatusName : "-"}
                                            { 
                                            // cellData?.ageOfPendency > 48 &&
                                                
                                            }
                                             </span></p>}



                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    <p className='ticketInfoLabelST'>Service Request No: <span className='ticketInfoData'>{cellData?.serviceTicketNumber ? cellData?.serviceTicketNumber : "-"}</span></p>
                                    <p className='ticketInfoLabelST'>Product Line: <span className='ticketInfoData'>{cellData?.productLineName ? cellData?.productLineName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Location: <span className='ticketInfoData'>{cellData?.siteAddress ? cellData?.siteAddress : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>ASC: <span className='ticketInfoData'>{cellData?.ascName ? cellData?.ascName : "-"}{
                                            (!cellData?.ascName &&  RoleName == "AS8")
                                            }</span></p>
                                        <p className='ticketInfoLabelST'>Remarks: <span className='ticketInfoData'>{cellData?.remarks ? cellData?.remarks : "-"}</span></p>
                                        {/* <p className='ticketInfoLabelST'>Actual status of complaint: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p> */}
                                        {(RoleName == "AS8") && <p className='ticketInfoLabelST'>Actual status of complaint: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>}

                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabelST'>Request Date: <span className='ticketInfoData'>{cellData?.requestDate?.split(" ")[0] ? cellData?.requestDate?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Serial No: <span className='ticketInfoData'>{cellData?.serialNo ? cellData?.serialNo : "-"}</span></p>

                                      
                                        <p className='ticketInfoLabelST'>Age of Pendency: <span className='ticketInfoData'>{cellData?.ageOfPendency ? cellData?.ageOfPendency+" hrs." : "-"}</span>
                                        </p>
                                        <p className='ticketInfoLabelST'>Distance (in Km): <span className='ticketInfoData'>{cellData?.distance ? cellData?.distance : "-"}</span></p>
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
                                        {(RoleName == "AS8") &&<p className='ticketInfoLabelST'>Pending with whom: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>}


                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    <p className='ticketInfoLabelST'>Nature Of Complaint: <span className='ticketInfoData'>{cellData?.defectDesc ? cellData?.defectDesc : "-"}</span></p>
                                    <p className='ticketInfoLabelST'>Warranty (from batch): <span className={`m-0  ${cellData?.warrantyDateStatus == "Out Of Warranty"
                                            ? "OOWStatus"
                                            : cellData?.warrantyDateStatus == "In Warranty"
                                                ? "WStatus"
                                                : ""
                                            }`}>{cellData?.warrantyDateStatus ? cellData?.warrantyDateStatus : "-"}</span></p>

                                        <p className='ticketInfoLabelST'>Branch: <span className='ticketInfoData'>{cellData?.branchName ? cellData?.branchName : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Complaint Status: <span className={`${cellData?.issueStatus=="Open"?`issueColorOpen`:cellData?.issueStatus=="Close"?`issueColorClose`:cellData?.issueStatus=="Work In Progress"?`issueColorWIP`:``}`}>{cellData?.issueStatus ? cellData?.issueStatus : "-"}</span></p>
                                        <p className='ticketInfoLabelST'>Complaint SubStatus: <span className='ticketInfoData'>{cellData?.subStatusName ? cellData?.subStatusName : "-"}
                                        {
                                            (RoleName == "AS8" && cellData?.subStatusName== "Cancellation")
                                            }</span></p>
                                                {(RoleName == "AS8") && <p className='ticketInfoLabelST'>Complaint pendency Disposition: <span className='ticketInfoData'>{cellData?.claimStatus ? cellData?.claimStatus : "-"}</span></p>}

                                                
                                        
                                        
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


//                 {
//                     accessorKey: "assignTech",
//                     header: "Actions",
//                     // enableHiding: true,
//                     // size: "50",
//                     Cell: ({ cell }) => {
//                         let data = cell.getValue()
//                         // console.log(cell.row.original);
//                         return (
//                             <>
//                                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

//                                     {

//                                         <>

//                                             {
//                                                 cell.row.original.isAcknowledgment == '1' ? (
//                                                     // Render a different icon when isActive is false
//                                                     // <Tooltip arrow placement="left" title="editack">
//                                                     //     <IconButton
//                                                     //         className="edit-btn"
//                                                     //         onClick={() => {
//                                                     //             navigate(`${pathName}/assign-request`);
//                                                     //             localStorage.setItem('viewTicket', "ViewTicket")
//                                                     //         }}

//                                                     //     >
//                                                     //         <BiEdit fontSize={20} color='#005bab' />

//                                                     //     </IconButton>
//                                                     // </Tooltip>
//                                                     <Button variant='' className='add-Btn m-auto    '
//                                                         onClick={() => {
//                                                             localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
//                                                             // navigate(`${pathName}/assign-request`);
//                                                             navigate(`${pathName}/New-assign-req-int`);
//                                                             localStorage.setItem('ticketInfoLabelST', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)

//                                                             localStorage.setItem("acknowledgementType",cell.row.original?.acknowledgmentStatusName)
//                                                         }}
//                                                     ><TbEyeEdit fontSize={20}/></Button>
//                                                 ) : ("")
//                                             }

// {cell.row.original?.isAcknowledgment == "1" ? (<Button variant='' className='add-Btn ' onClick={showUpdatedList}>Status update</Button>) : ""}


//                                             {cell.row.original?.isAcknowledgment == "" ? <Button variant='' className='add-Btn' onClick={() => {
//                                                 handleShowAcknowledgemnet()
//                                                 fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${cell.row.original?.serviceTicketId}`, {
//                                                     headers: {
//                                                         Authorization: `Bearer ${token}`,
//                                                     },
//                                                 })
//                                                     .then((res) => res.json())
//                                                     .then((result) => {
//                                                         console.log("ticket info");
                                                        
//                                                         console.log(result);
//                                                         setticketInfo(result)
//                                                     })
//                                             }}>Acknowledge</Button>
//                                                 //  : cell.row.original?.isAcknowledgment == "1" ?
//                                                 //  <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button> 
//                                                 : ""}
//                                         </>


//                                     }







//                                 </Box >
//                             </>
//                         )
//                     }
//                 },






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
        const date = new Date().toISOString().substr(0, 10);
        return date;
    };

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;


    const [requestforYes, setrequestforYes] = useState(false)
    const [requestforNo, setrequestforNo] = useState(false)

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



    return (
        <>
            <Card
                className="border-0 p-3"
                //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
                <div className='d-flex justify-content-between'>

                    <p className='pg-label m-0'>Open requests</p>

                    {/* {Permissions?.isAdd ? <Row className=''><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Technician</Button></Col></Row> : ""} */}

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
                                <Form.Label> Warranty Status</Form.Label>
                                <Form.Select value={filteredWarrantyStatus} onChange={(e) => {
                                    setfilteredWarrantyStatus(e.target.value)
                                }}>
                                    <option value=''>Select</option>

                                    <option value='In Warranty'>In Warranty</option>
                                    <option value='Out of Warranty'>Out of Warranty</option>
                                    {/* <option value='Both'>Both</option> */}
                                </Form.Select>
                            </Form.Group>

                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label> Issue Status</Form.Label>
                                <Form.Select value={filteredIssueStatus} onChange={(e) => {
                                    setfilteredIssueStatus(e.target.value)
                                }}>
                                    <option value=''>Select</option>
                                    <option value='Open'>Open</option>
                                    <option value='Close'>Close</option>


                                </Form.Select>
                            </Form.Group>

                        </Col>

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
                    </Row>
                    <Row >
                        <Col md={3}>
                            <div className='gap-2 d-flex mt-2'>
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

                                        setFilterPagination({
                                            pageIndex: 0,
                                            pageSize: 10
                                        })
                                        setPagination({
                                            pageIndex: 0,
                                            pageSize: 10
                                        })
                                        fetchData()
                                        setShowSwitch(false);
                                        setIsChecked(false);

                                        setfilteredDivision("")
                                        setfilteredProductLine("")
                                        setfilteredWarrantyStatus("")
                                        setfilteredIssueStatus("")
                                        setfilteredFromDate("")
                                        setfilteredToDate("")
                                        setFilterredSerNumber("")
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
    <div style={{backgroundColor:"#9edf96",height:"fit-content",fontSize:"12px",textAlign:"center",borderRadius:"10px",cursor:'pointer'}} onClick={async (e)=>{
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
    <div style={{backgroundColor:"#facd4f",height:"fit-content",fontSize:"12px",textAlign:"center",borderRadius:"10px",cursor:'pointer'}} onClick={async (e)=>{
        await fetchFilterPagination('24to48');
        setShowSwitch(false);
        setIsChecked(false);
                // let orange=AllRequestsForFilter?.filter(i=>(i?.ageOfPendency>=23 && i?.ageOfPendency<=48))
        //  setRowCount(orange?.length)

        // setAllOpenRequests(orange)
    }}>{`23 to 48 hrs.`}</div>
    </Col>
    <Col>
    <div style={{backgroundColor:"#f9a8a8",height:"fit-content",fontSize:"12px",textAlign:"center",borderRadius:"10px",cursor:'pointer'}} onClick={async (e)=>{
        await fetchData();

        let red=AllRequestsForFilter?.filter(i=>i?.ageOfPendency>48)
        setRowCount(red?.length)

        setAllOpenRequests(red)
        // setShowSwitch(true);
        // setShowSwitch(false);
        // setIsChecked(false);
        // let red=AllRequestsForFilter?.filter(i=>i?.ageOfPendency>48)
        //  setRowCount(red?.length)

        // setAllOpenRequests(red)
    }}>{`more than 48 hrs.`}</div>
    </Col>
    {false /*RoleName == "AS8"*/ &&
    <Col>
    <div style={{backgroundColor:"#f57070",height:"fit-content",fontSize:"12px",textAlign:"center",borderRadius:"10px",cursor:'pointer'}} onClick={async (e)=>{
        await fetchFilterPagination('Pendancy',false);
        
        // setPendancyClicked(true);
        // let red=AllRequestsForFilter?.filter(i=>i?.ageOfPendency>48)
        //  setRowCount(red?.length)

        // setAllOpenRequests(red)
    }}>{`Pendency.`}</div>
    </Col>}
    
    
</Row>
                <MaterialReactTable
                    columns={columns}
                    data={AllOpenRequests}

                    initialState={{ showColumnFilters: false , "columnVisibility": { "assignTech": showActionCol }}} //show filters by default
                    muiTableHeadCellFilterTextFieldProps={{
                        sx: { m: "0.5rem 0", width: "100%" },
                        variant: "outlined",
                    }}

                    muiTableBodyCellProps={({ cell }) => ({
                        style: {
                            width: fixedColumnWidths[cell.column.id],
                            minWidth: fixedColumnWidths[cell.column.id],
                            maxWidth: fixedColumnWidths[cell.column.id],
                            border:"1px solid black"

                        },
                    })}

                    muiTableBodyRowProps={({row})=>({
                        sx:{
                          backgroundColor:(row?.original?.ageOfPendency)<23?"#9edf96":(row?.original?.ageOfPendency>=23 && row?.original?.ageOfPendency<=48)?"#facd4f":((row?.original?.ageOfPendency) > 48 )?"#f9a8a8":""
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

                     manualPagination={true}
                    muiToolbarAlertBannerProps={isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined}
                    // onColumnFiltersChange={setColumnFilters}
                    // onGlobalFilterChange={setGlobalFilter}
                     onPaginationChange={setFilterPagination ||setPagination}
                    // onSortingChange={setSorting}
                    rowCount={rowCount}
                    state={
                        {
                            columnFilters,
                            globalFilter,
                            isLoading,
                            pagination: filterPagination || pagination,
                            showAlertBanner: isError,
                            showProgressBars: isRefetching,
                            sorting,
                        }
                    }

                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                paddingLeft: '15px',
                                paddingTop: '10px',
                                flexWrap: 'wrap',
                            }}>
                                { (RoleName == "AS8") &&
                                <Row style={{width:"100%"}}>
                                    {showSwitch &&
                                        <Col 
                                         lg={4}
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

                                <Col lg={showSwitch ?6:10}>
                                    <Form.Group className="text-start">
                                        <Row>
                                        <Col lg={6}>
                                            <Form.Label>
                                                Service Ticket Number/Mobile Number
                                            </Form.Label>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Control type="text"
                                            value={filterSerNumber}
                                                  onChange={(e)=>setFilterredSerNumber(e.target.value)}  
                                                name="SerialNumber" />
                                        </Col>
                                    </Row>
                                                                
                                    </Form.Group>
                                    

                                </Col>
                                <Col lg={2}>
                                <Button variant="" className='add-Btn'
                                    onClick={(e) => {
                                        fetchFilterPagination();





                                        

                                    }}

                                >
                                    Search
                                </Button>

                                </Col>
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


                <GenericModal show={showAcknowledgemnet} handleClose={handleCloseAcknowledgemnet} size='md' IsCentered='centered' className='mdl-title' title="Acknowledgement"
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
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Service request no</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.serviceTicketNumber}</p>
                                        </Col>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Date created</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.requestDate?.split(" ")[0]}</p>
                                        </Col>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px" }}>Nature of complaint</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.defectDesc}</p>
                                        </Col>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Division</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>LT-Motor</p>
                                        </Col>

                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Product line</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.productLineName}</p>
                                        </Col>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px" }}>Product Sr no</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.sernr}
                                            </p>
                                        </Col>





                                    </Row>
                                    <Row>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from batch)</p>
                                            <Button variant='' className={`mt-1 ${ticketInfo[0]?.warrantyDateStatus=="Out Of Warranty"?`OOWStatus`:`WStatus`}`} style={{ fontWeight: "500", fontSize: "12px" }} >{ticketInfo[0]?.warrantyDateStatus}</Button>
                                        </Col>
                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from invoice)</p>
                                            <Button variant='' className={`mt-1 ${ticketInfo[0]?.invoiceDateStatus=="Out Of Warranty"?`OOWStatus`:`WStatus`}`} style={{ fontWeight: "500", fontSize: "12px" }} >{ticketInfo[0]?.invoiceDateStatus}</Button>
                                        </Col>


                                        <Col lg={4} md={6} sm={6}>
                                            <p className='m-0' style={{ fontSize: "12px" }}>Service request type</p>
                                            <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>In warranty</p>
                                        </Col>


                                    </Row>
                                    <hr />

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
                                        <div className='mt-1'>
                                            <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                            <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> {ticketInfo[0]?.siteAddress} </p>
                                        </div>
                                        <div className='mt-1'>
                                            <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.emailId}</span> </p>
                                            <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.primaryMobileNo}</span> </p>


                                        </div>

                                    </div>


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


                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Service request status</Form.Label>
                                                    <Form.Select onChange={(e)=>{
                                                        setacknowledgeSerReqStatus(e.target.value)
                                                    }}>
                                                        <option value=''>Select</option>
                                                        <option value='Customer Contacted'>Customer Contacted</option>
                                                        <option value='Product received at workshop'>Product received at workshop</option>
                                                      

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
                                                            rows={2} name="Remarks" onChange={(e)=>{
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

                                if(!requestforYes && !requestforNo ){
                                    Swal.fire({
                                        icon:"error",
                                        title:"Please acknowledge whether Yes or No!"
                                    })
                                }
                                else if(requestforYes && !acknowledgeSerReqStatus){
                                    Swal.fire({
                                        icon:"error",
                                        title:"Please Select Service request status!"
                                    })
                                }
                                else if(requestforNo && !acknowledgementRemarks){
                                    Swal.fire({
                                        icon:'error',
                                        title:"Please add remarks!"
                                    })
                                }
                                else{


                                e.preventDefault()
                                fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/UpdateAcknowledgmentServiceTicket?serviceTicketId=${ticketInfo[0]?.serviceTicketId}&isAcknowledgment=${requestforYes ? true : requestforNo ? false : ""}&StatusName=${acknowledgeSerReqStatus?acknowledgeSerReqStatus:""}&Remark=${acknowledgementRemarks?acknowledgementRemarks:""}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                })
                                    .then((res) => res.json())
                                    .then((result) => {
                                        console.log(result);
                                        fetchData()
                                        handleCloseAcknowledgemnet()
                                        localStorage.setItem("acknowledgementType",acknowledgeSerReqStatus)
                                        navigate(`${pathName}/New-assign-req-int`);

                                    })

                                }



                            }}

                        >
                            Save
                        </Button>
                    </>} />
                    <GenericModal show={ShowAsc} handleClose={handleCloseAsc} size='l' IsCentered='centered' className='mdl-title' title="Assign ASC"
                body={
                    <>

                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                    <Row>
                                        
                                        <Col lg={12} md={12} sm={12}>
                                        <Form.Group>
                                                <Form.Label>Assign ASC<span className='req-t'>*</span></Form.Label>
                                                <Form.Select
                                                    name='ticketAssignedASCCode'
                                                    onChange={(e) => {
                                                        setAscData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                ticketAssignedASCCode : e.target.value
                                                            }
                                                        })
                                                    }}>
                                                    <option value={0}>Select</option>
                                                    {ASCNames.map((obj) => (
                                                        <option key={obj.ascCode} value={obj.ascCode}>
                                                            {obj.name}
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
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                setAscData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        remark : e.target.value
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
                            if (ascData.ticketAssignedASCCode == 0) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Please Select ASC",
                                  });
                                  return;
  
                            }
                            if (!ascData.remark) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Remarks is required",
                                  });
                                  return;
                            }
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
                                    if(result?.status == 400){
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





                            

                        }}

                    >
                        Save
                    </Button>
                </>} />
                <GenericModal show={ShowCancelAppr} handleClose={handleCloseCancelAppr} size='l' IsCentered='centered' className='mdl-title' title="Cancellation approval"
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
                                                        setCancellationData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                approvalStatus : e.target.value
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
                                             onChange={(e)=>{
                                                setCancellationData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                approvedComments : e.target.value
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
                                             onChange={(e)=>{
                                                setCancellationData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        remarks : e.target.value
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
                            if(cancellationData?.approvalStatus == 1){
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
                                        if(result?.status == 400){
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
                            if(cancellationData?.approvalStatus == 2){
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
                                        if(result?.status == 400){
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
                <GenericModal show={ShowPendancy} handleClose={handleClosePendancy} size='lg' IsCentered='centered' className='mdl-title' title="Update Complaint Pendacy Disposition"
                body={
                    <>

                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                <Row>
                                        
                                        <Col lg={6} md={12} sm={12}>
                                        
                                        <Form.Group>
                                                 <Form.Label>Actual status of complaint<span className='req-t'>*</span></Form.Label>
                                                <Form.Select
                                                    name='ticketAssignedASCCode'
                                                    onChange={(e) => {
                                                        setAscData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                ticketAssignedASCCode : e.target.value
                                                            }
                                                        })
                                                    }}>
                                                    <option value={0}>Select</option>
                                                    {ASCNames.map((obj) => (
                                                        <option key={obj.ascCode} value={obj.ascCode}>
                                                            {obj.name}
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
                                                        setAscData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                ticketAssignedASCCode : e.target.value
                                                            }
                                                        })
                                                    }}>
                                                    <option value={0}>Select</option>
                                                    {ASCNames.map((obj) => (
                                                        <option key={obj.ascCode} value={obj.ascCode}>
                                                            {obj.name}
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
                                                        setAscData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                ticketAssignedASCCode : e.target.value
                                                            }
                                                        })
                                                    }}>
                                                    <option value={0}>Select</option>
                                                    {ASCNames.map((obj) => (
                                                        <option key={obj.ascCode} value={obj.ascCode}>
                                                            {obj.name}
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
                                             onChange={(e)=>{
                                                setAscData((pre)=>{
                                                    return {
                                                        ...pre,
                                                        remark : e.target.value
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
                                                    {/* {dealerRaisedTicketDetails.map((obj) => { */}
                                                         <tr >
                                                            {/* <td><Form.Group className="mt-2">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="Companyname"
                                                                    value={obj.productLineName}
                                                                    readOnly
                                                                // onChange={handleChange}
                                                                />
                                                            </Form.Group></td> */}

                                                            <td>
                                                                1
                                                            </td>
                                                            <td>2
                                                                
                                                            </td>
                                                            

                                                            <td>3
                                                                
                                                            </td>

                                                            <td>4
                                                                
                                                            </td>



                                                            <td>5
                                                               
                                                            </td>
                                                            
                                                        </tr>
                                                   

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
                            if (ascData.ticketAssignedASCCode == 0) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Please Select ASC",
                                  });
                                  return;
  
                            }
                            if (!ascData.remark) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Remarks is required",
                                  });
                                  return;
                            }
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
                                    if(result?.status == 400){
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





                            

                        }}

                    >
                        Save
                    </Button>
                </>} />
                

                    <GenericModal show={showTechnician} handleClose={handleCloseTechnician} size='l' IsCentered='centered' className='mdl-title' title="Re-assign Technician"
                body={
                    <>

                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                    <Row>
                                        
                                        <Col lg={12} md={12} sm={12}>
                                        <Form.Group>
                                                <Form.Label>Re-assign Technician<span className='req-t'>*</span></Form.Label>
                                                <Form.Select
                                                    name='technicianId'
                                                    // value = {TechData.technician}
                                                    onChange={(e) => {
                                                        setTechData((pre)=>{
                                                            return {
                                                                ...pre,
                                                                technicianId : e.target.value
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
                                             onChange={(e)=>{
                                                setTechData((pre)=>{
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
                            if (!TechData.technicianId) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Please Select technician",
                                  });
                                  return;
  
                            }
                            if (!TechData.remark) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Remarks is required",
                                  });
                                  return;
                            }
                            TechData.technicianId = parseInt(TechData.technicianId)
                            
                            console.log(TechData);
                            fetch(
                                `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpdateReassignedTechniciane?serviceTicketId=${TechData?.serviceTicketId}&TechnicianId=${TechData?.technicianId}&Remark=${TechData?.remark}`,
                                {
                                method: "POST",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                                .then((res) => res.json())
                                .then((result) => {
                                    if(result?.status == 400){
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops Something went wrong!",
                                          });
                                          return
                                    }
                                  console.log(result);
                                  fetchData();
                                  handleCloseTechnician();
                                });
                            
                            





                            

                        }}

                    >
                        Save
                    </Button>
                </>} />


                
                



                    <GenericModal show={showList} handleClose={handleCloseUpdatedList} size='l' IsCentered='centered' className='mdl-title' title="Request status"
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
































            </Card>
        </>
    )
}

export default ServiceRequestReport