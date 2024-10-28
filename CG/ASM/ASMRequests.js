import React, { useState, useMemo, useEffect } from 'react'
import { Card, Row, Col, Button, Form, Modal, Accordion } from 'react-bootstrap'
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FaUserXmark } from 'react-icons/fa6';
import { FaBan, FaCheckCircle, FaRegEdit, FaUserCircle } from 'react-icons/fa';
import { IoCallOutline, IoClose, IoMail, IoSave } from 'react-icons/io5';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';
import { HiThumbUp } from 'react-icons/hi';
import { HiHandThumbDown } from "react-icons/hi2";
import { BsPersonFillAdd } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import { usePathName } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import Swal from 'sweetalert2';


function ASMRequests() {
    const pathName = usePathName()
    const navigate = useNavigate();
    let token = localStorage.getItem("UserToken");


    let asc=localStorage.getItem("UID")

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
        
              `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASMServiceRequest`,
        
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
          const [filteredIssueStatus, setfilteredIssueStatus] = useState("")
          const [filteredFromDate, setfilteredFromDate] = useState("")
          const [filteredToDate, setfilteredToDate] = useState("")

          


          const [filterPagination, setFilterPagination] = useState({
            pageIndex: 0,
            pageSize: 10
          })

          const fetchFilterPagination = async () => {
            if (!AllOpenRequests.length) {
              setIsLoading(true);
            } else {
              setIsRefetching(true);
            }
        
            const url = new URL(
        
              `${process.env.REACT_APP_API_URL}ASCServiceRequest/GetAllASMServiceRequest`,
        
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
            if (filteredFromDate) { url.searchParams.set('FromDate', `${filteredFromDate}`) }
            if (filteredToDate) { url.searchParams.set('ToDate', `${filteredToDate}`) }
        
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            try {
              const response = await fetch(url.href, {
                headers: headers
              });
              const json = await response?.json();
              console.log(json);
              console.log(json[0]?.totalRows);
              setAllOpenRequests(json);
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
            fetchFilterPagination();
        
          }, [filterPagination?.pageIndex, filterPagination?.pageSize]);








    useEffect(() => {
        // console.log(data);

    




        // fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscWiseDivision?ascCode=${asc}`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        // })
        // .then((res)=>res.json())
        // .then((result)=>{
        //     console.log(result);
        //     setASCwiseDivisions(result)
        // })







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


    const [ticketInfo, setticketInfo] = useState([])

    const columns =
        useMemo(
            () => [
                {
                    accessorKey: "serialNo",
                        header: "Request Details",
                    size: "50",

                        Cell: ({ cell }) => {
                            let cellData=cell.row?.original;
                            // console.log("log column"+ cell.column.id);
                            return(
                                <>
                                <Row>
                                    <Col lg={3} md={4} sm={6}>
                                   
                                        <p className='ticketInfoLabel'>Serial No: <span className='ticketInfoData'>{cellData?.serialNo?cellData?.serialNo:"-"}</span></p>
                                        <p className='ticketInfoLabel'>Service Request No: <span className='ticketInfoData'>{cellData?.serviceTicketNumber?cellData?.serviceTicketNumber:"-"}</span></p>
                                        
                                        <p className='ticketInfoLabel'>Request Date: <span className='ticketInfoData'>{cellData?.requestDate?.split(" ")[0]?cellData?.requestDate?.split(" ")[0]:"-"}</span></p>
                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    
                                        <p className='ticketInfoLabel'>Company Name: <span className='ticketInfoData'>{cellData?.customerName?cellData?.customerName:"-"}</span></p>
                                        <p className='ticketInfoLabel'>Location: <span className='ticketInfoData'>{cellData?.siteAddress?cellData?.siteAddress:"-"}</span></p>
                                    
                                    <p className='ticketInfoLabel'>Product Line: <span className='ticketInfoData'>{cellData?.productLineName?cellData?.productLineName:"-"}</span></p>
                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                  
                                    <p className='ticketInfoLabel'>Nature Of Complaint: <span className='ticketInfoData'>{cellData?.defectDesc?cellData?.defectDesc:"-"}</span></p>
                                    
                                    <p className='ticketInfoLabel'>Age of Pendency: <span className='ticketInfoData'>{cellData?.ageOfPendency?cellData?.ageOfPendency:"-"}</span></p>
                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    <p className='ticketInfoLabel'>Issue Status: <span className='ticketInfoData'>{cellData?.issueStatus?cellData?.issueStatus:"-"}</span></p>
                                    <p className='ticketInfoLabel'>Warranty: <span className={`m-0  ${cellData?.warrantyStatus == "Out Of Warranty"
                                    ? "OOWStatus"
                                    : cellData?.warrantyStatus == "In Warranty"
                                        ? "WStatus"
                                        : ""
                                    }`}>{cellData?.warrantyStatus?cellData?.warrantyStatus:"-"}</span></p>
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
                // // {
                // //     accessorKey: "distance",
                // //     header: "Distance (in Km)",

                // // },
                // {
                //     accessorKey: "issueStatus",
                //     header: "Issue Status",

                // },
                {
                    accessorKey: "isAcknowledgment",
                    header: "Action",
                    Cell: ({ cell }) => {
                        let value = cell.getValue();
                        return (
                            <p className='m-auto p-2 text-center'
                            // className={`text-center m-0 ${value == "Acknowledgement"
                            //     ? "OOWStatus"
                            //     : value == "Acknowledged"
                            //         ? "WStatus"
                            //         : ""
                            //     }`}
                            >
                              {cell.row.original?.ticketAssignedASCCode==""?  <Button variant='' className='add-Btn' onClick={()=>{
                                    handleShowAcknowledgemnet()
                                    fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${cell.row.original?.serviceTicketId}`,{
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                    })
                                    .then((res)=>res.json())
                                    .then((result)=>{
                                        console.log(result);
                                        setticketInfo(result)
                                    })
                                    }}>Action</Button>:""}
                            </p>
                        );
                    },

                },


                // {
                //     accessorKey: "assignTech",
                //     header: "Actions",
                //     size: "20",
                //     Cell: ({ cell }) => {
                //         let data = cell.getValue()
                //         // console.log(cell.row.original);
                //         return (
                //             <>
                //                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

                //                     {

                //                         <>

                //                             {
                //                                 cell.row.original.isAcknowledgment == '1' ? (
                //                                     // Render a different icon when isActive is false
                //                                     // <Tooltip arrow placement="left" title="editack">
                //                                     //     <IconButton
                //                                     //         className="edit-btn"
                //                                     //         onClick={() => {
                //                                     //             navigate(`${pathName}/assign-request`);
                //                                     //             localStorage.setItem('viewTicket', "ViewTicket")
                //                                     //         }}

                //                                     //     >
                //                                     //         <BiEdit fontSize={20} color='#005bab' />

                //                                     //     </IconButton>
                //                                     // </Tooltip>
                //                                     <Button variant='' className='add-Btn'
                //                                         onClick={() => {
                //                                             localStorage.setItem("ViewEditRequest",cell.row.original?.serviceTicketId)
                //                                             navigate(`${pathName}/assign-request`);
                //                                             localStorage.setItem('TicketInfoLabel', cell.row.original?.defectDesc+"/"+cell.row.original?.serviceTicketNumber)
                //                                         }}
                //                                     >view/edit</Button>
                //                                 ) : ("")
                //                             }


                //                         </>

                //                     }







                //                 </Box >
                //             </>
                //         )
                //     }
                // },






            ]
        );


        const fixedColumnWidths = {
            serialNo: '100%',
            // assignTech: '100px',
            
          };


    const [showComments, setShowComments] = useState(true);
    const [showReason, setShowReason] = useState(true);
    const [showAssign, setShowAssign] = useState(true);




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

const [actionTaken, setactionTaken] = useState("")

const [actionValueClose, setactionValueClose] = useState("")
const [CloseComments, setCloseComments] = useState("")

const [actionValueReAssign, setactionValueReAssign] = useState("")

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
                                <Form.Select value={filteredDivision} onChange={(e)=>{

                                    setfilteredDivision(e.target.value)
                                    setfilteredProductLine("")
                                    
        fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscDivisionWiseProductline?ascCode=${asc}&divCode=${e.target.value}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            setASCwiseProductLines(result)
        })
                                }}>
                                    <option value=''>Select</option>
                                    {
                                        ASCwiseDivisions?.map((divs,i)=>{
                                            return(
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
                                <Form.Select value={filteredProductLine} onChange={(e)=>{
                                    setfilteredProductLine(e.target.value)
                                }}>
                                    <option value=''>Select</option>
                                    {
                                        ASCwiseProductLines?.map((prodline,i)=>{
                                            return(
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
                                <Form.Select value={filteredWarrantyStatus} onChange={(e)=>{
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
                                <Form.Select value={filteredIssueStatus} onChange={(e)=>{
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
                                <Form.Control type='date' value={filteredFromDate} onChange={(e)=>{
                                    setfilteredFromDate(e.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label> To Date</Form.Label>
                                <Form.Control type='date' value={filteredToDate} onChange={(e)=>{
                                    setfilteredToDate(e.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={3}>
                            <div  className='gap-2 d-flex mt-2'>
                                <Button
                                    variant=""
                                    className="add-Btn"
                                    onClick={(e) => {
                                        setFilterPagination({
                                          pageIndex: 0,
                                          pageSize: 10
                                        })
                                        setPagination({
                                          pageIndex: 0,
                                          pageSize: 10
                                        })
                  
                  
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

                                    onClick={()=>{

                                        setFilterPagination({
                                            pageIndex: 0,
                                            pageSize: 10
                                          })
                                          setPagination({
                                            pageIndex: 0,
                                            pageSize: 10
                                          })
                                          fetchData()

                                        setfilteredDivision("")
                                        setfilteredProductLine("")
                                        setfilteredWarrantyStatus("")
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


                <MaterialReactTable
                    columns={columns}
                    data={AllOpenRequests}
                    initialState={{ showColumnFilters: false }} //show filters by default
                    muiTableHeadCellFilterTextFieldProps={{
                        sx: { m: "0.5rem 0", width: "100%" },
                        variant: "outlined",
                    }}
                    
                    muiTableBodyCellProps={({ cell }) => ({
                        style: {
                          width: fixedColumnWidths[cell.column.id],
                          minWidth: fixedColumnWidths[cell.column.id],
                          maxWidth: fixedColumnWidths[cell.column.id],
                        },
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
                    onColumnFiltersChange={setColumnFilters}
                    onGlobalFilterChange={setGlobalFilter}
                    onPaginationChange={setFilterPagination || setPagination}
                    onSortingChange={setSorting}
                    rowCount={rowCount}
                    state={
                      {
                        columnFilters,
                        globalFilter,
                        isLoading,
                        pagination:filterPagination || pagination,
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
                                padding: '10px',
                                flexWrap: 'wrap',
                            }}>

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
                                    <p className='m-0'>Close/Resolved Ticket</p><span> <IoSave color='#7bc143' fontSize={20}
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


                <GenericModal show={showAcknowledgemnet} handleClose={handleCloseAcknowledgemnet} size='xl' IsCentered='centered' className='mdl-title' title="Acknowledgement"
                    body={
                        <>

                            <Row>
                                <Col lg={12} md={12} sm={12}>

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
                                            {/* <Row>

                                                        <Col >
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
                                                        <Col>
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
                                                        <Col  style={{
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
                                                    </Row> */}
                                            {/* <div>

                                                        <div  >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Voltage
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                5 Kw
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
                                                                24/04/2024
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
                                                                W
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
                                                                Breakdown
                                                            </p>
                                                        </div>
                                                    </div> */}

                                           <Row className='justify-content-center'>
                                            <Col lg={5} md={5} sm={12}>
                                                <div className='d-flex justify-content-between'>
                                                   <div> <Form.Check type='radio' name='actions' label="Re-assign request" onChange={(e)=>{
                                                    if(e.target.checked){
                                                        setactionTaken("Re-assign request")
                                                    }
                                                    else{
                                                        setactionTaken("")
                                                    }
                                                   }}/>

                                              {actionTaken=="Re-assign request"?  <Form.Group>
                                                   
                                                   <Form.Select onChange={(e)=>{
                                                    setactionValueReAssign(e.target.value)
                                                   }}>
                                                    <option value="">Select ASC</option>
                                                    <option value="Aone Electrical">Aone Electrical</option>
                                                    <option value="NK Electrical">NK Electrical</option>
                                                   </Form.Select>
                                                </Form.Group>:""}
                                                   </div>
                                                   <div> <Form.Check type='radio' name='actions' label="Close request" onChange={(e)=>{
                                                    if(e.target.checked){
                                                        setactionTaken("Close request")
                                                    }
                                                    else{
                                                        setactionTaken("")
                                                    }
                                                   }}/>
                                                 {actionTaken=="Close request"?  <Form.Group>
                                                   
                                                   <Form.Select onChange={(e)=>{
                                                    setactionValueClose(e.target.value)
                                                   }}>
                                                    <option value="">Reason</option>
                                                    <option value="reason 1">test reason1</option>
                                                    <option value="reason 2">test reason2</option>
                                                   </Form.Select>
                                                </Form.Group>:""}
                                                   </div>
                                                </div>

                                                {(actionTaken=="Close request" && actionValueClose)?<Form.Group>
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control as="textarea" rows={2} onChange={(e)=>{
                                                        setCloseComments(e.target.value)
                                                    }}/>
                                                </Form.Group>:""}
                                            </Col>
                                           </Row>



                                        </div>
                                    </Card>

                                </Col>

{/* 
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
                                                onChange={(e)=>{
                                                    if(e.target.checked){
                                                        setrequestforYes(true)
                                                        setrequestforNo(false)

                                                    }
                                                   
                                                }} />
                                            <Form.Check
                                                type='radio'
                                                label="No"
                                                name="radioGroup"
                                                value='No'
                                                onChange={(e)=>{
                                                    if(e.target.checked){
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
                                        (requestforNo) && (
                                            <Row className=' m-0 p-0 align-items-center justify-content-center'>

                                                <Col md={6}>
                                                    <Form.Group className="">
                                                        <Form.Label>
                                                            Remarks
                                                        </Form.Label>
                                                        <Form.Control as="textarea"
                                                            rows={2} name="Remarks"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )
                                    }





                                </Col> */}


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

                                e.preventDefault()
                                // fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/UpdateAcknowledgmentServiceTicket?serviceTicketId=${ticketInfo[0]?.serviceTicketId}&isAcknowledgment=${requestforYes?true:requestforNo?false:""}`,{
                                //     headers: {
                                //         Authorization: `Bearer ${token}`,
                                //       },
                                // })
                                // .then((res)=>res.json())
                                // .then((result)=>{
                                //     console.log(result);
                                //     fetchData()
                                //     handleCloseAcknowledgemnet()
                                // })


                                if(actionValueClose && CloseComments){
                                    handleCloseAcknowledgemnet()
                                    Swal.fire({
                                        icon:"question",
                                        title:"Are you sure you want to close the request?",
                                        confirmButtonText:"Confirm",
                                        confirmButtonColor:"#7bc143",
                                       
                                        
                                        showCancelButton:true,
                                        denyButtonText:"Cancel",
                                        backdrop:false,
                                        
                                        preDeny:()=>{{
                                            handleCloseAcknowledgemnet()

                                        }},
                                        preConfirm:()=>{

                                        }
                                    })
                                }

                            }}

                        >
                            Save
                        </Button>
                    </>} />




































            </Card>
   </>
  )
}

export default ASMRequests