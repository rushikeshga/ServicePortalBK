import React, { useMemo, useState, useEffect, useRef } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaMinus, FaPlus, FaUserCheck, FaUserXmark, } from "react-icons/fa6";
import '../../../App.css';



import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Loader from '../../loader';
import ReactToPrint from 'react-to-print';
import IBNCopy from './IBNCopy';
import PrintableComponent from '../JobSheets/PrintableComponent';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { usePathName } from '../../../constants';
function IBNGeneration() {
    let navigate=useNavigate()
    let pathName=usePathName()
    let token = localStorage.getItem("UserToken")
    const componentRef = useRef();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [show1, setShow1] = useState(false);
    const [activeID, setactiveID] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    let asc = localStorage.getItem("UID");
    const [iBNData, setIBNData] = useState({
        Remarks:""
    })
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const customHeaders = {
        productDiv: "Product Division",
        productLine: 'Product Line',
        serviceClaimTypeName: 'Type of Activity',
        activityName: 'Activity Name',
        serviceName: 'Service Name',
        isMinor: "Is Minor"
    }
    const [addRateMaster, setaddRateMaster] = useState({
        // activityID: '',
        // productDivCode: '',
        // productLineCode: '',
        // serviceGroupId: '',
        // rewindingGroupId: '',
        // isMinor: false
        claimRateId: 0,
        serviceClaimTypeId: 0,
        activityId: 0,
        productDivCode: "",
        productLineCode: "",
        isMinor: false,
        serviceId: 0,
        isActive: true,



    })
    // const [claimRateId, setclaimRateId] = useState("")
    const [activityType, setActivityType] = useState([])
    const [activities, setActivities] = useState([]);
    const [serviceGroup, setServiceGroup] = useState([])
    const [rewindingGroup, setRewindingGroup] = useState([])
    const [complainType, setComplainType] = useState([])
    const [parameterTypeName, setParameterTypeName] = useState([])
    const [ASCwiseDivisions, setASCwiseDivisions] = useState([])
    const [paraUOM, setParaUOM] = useState([])
    const [numError, setnumError] = useState('')
    let IBNRemarks = useRef("")
    const [filterPagination, setfilterPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })



    const [rateinputList, setRateInputList] = useState([
        {
            claimRateId: 0,
            repairTypeId: 0,
            travelClaimId: 0,
            activityTypeId: 0,
            paraDetail: "",
            paraValue: "",
            paraCondition: "",
            paraUOMId: 0,
            fixedQty: true,
            fixedQtyValue: 0,
            maxAmount: true,
            maximumAmountValue: 0,
            claimRateName: "",
            repairTypeName: "",
            travelClaimName: "",
            activityTypeName: "",
            paraUOM: "",
            isUpdate: 0,
            claimRateDetailId: 0


        }]);
    const [editAddRateMaster, setEditAddRateMaster] = useState({
        claimRateId: 0,
        serviceClaimTypeId: 0,
        activityId: 0,
        productDivCode: "",
        productLineCode: "",
        isMinor: true,
        serviceId: 0,
        isActive: true,
        claimRateDetails: []
        // claimRateId: 0,
        //     repairTypeId: 0,
        //     travelClaimId: 0,
        //     activityTypeId: 0,
        //     paraDetail: "",
        //     paraValue: "",
        //     paraCondition: "",
        //     paraUOMId: 0,
        //     fixedQty: true,
        //     fixedQtyValue: 0,
        //     maxAmount: true,
        //     maximumAmountValue: 0,
        //     claimRateName: "",
        //     repairTypeName: "",
        //     travelClaimName: 0,
        //     activityTypeName: "",
        //     paraUOM: ""
    })
    const [EditrateinputList, setEditRateInputList] = useState([
        {
            claimRateId: 0,
            repairTypeId: 0,
            travelClaimId: 0,
            activityTypeId: 0,
            paraDetail: "",
            paraValue: "",
            paraCondition: "",
            paraUOMId: 0,
            fixedQty: true,
            fixedQtyValue: 0,
            maxAmount: true,
            maximumAmountValue: 0,
            claimRateName: "",
            repairTypeName: "",
            travelClaimName: "",
            activityTypeName: "",
            paraUOM: "",
            isUpdate: 0,
            claimRateDetailId: 0

        }]);
    const [allDivisions, setallDivisions] = useState([]);
    const [allproductLines, setallproductLines] = useState([]);
    const [repairTypes, setRepairTypes] = useState([]);
    const [travelClaims, setTravelClaims] = useState([]);
    let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


    const tableRef = useRef(null);
    const handleClose = () => {
        setShow(false)
        setaddRateMaster([])
        // setRateInputList([
        //     {
        //         claimRateId: 0,
        //         complainTypeId: 0,
        //         paraNameId: 0,
        //         paraDetail: "",
        //         paraValue: "",
        //         paraCondition: "",
        //         paraUOMId: 0,
        //         serviceId:0

        //     }]);
    }


    const handleShow = () => {
        setShow(true)
        

    };
    const handleModalShow = () => {
        setShowModal(true)
        AllDivision()
        fetchRepairTypes();
        fetchTavelClaims();
        fetchActivityType();

        // fetchServiceGroup()
        // fetchRewindingGroup()
        // fetchComplainType()
        // fetchParaTypeName()
        fetchParaUOM()
    }


    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = () => setShowDel(true);




    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [showIsActive, setIsActive] = useState(false);
    const handleCloseIsActive = () => setIsActive(false);
    const handleShowIsActive = () => setIsActive(true);
    const [showIsActive1, setIsActive1] = useState(false);
    const handleCloseIsActive1 = () => setIsActive1(false);
    const handleShowIsActive1 = () => setIsActive1(true);
    const [isActive, setisActive] = useState("")




    // -----------Pagination------------------------
    const fetchDataPagination = async (pageInfo) => {
        if (!data.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        const url = new URL(

            `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllAscIBNGeneratedList`,

        );
        url.searchParams.set(
            'PageNumber',
            `${pageInfo.pageIndex}`,
        );
        url.searchParams.set('PageSize', `${pageInfo.pageSize}`);

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        try {
            const response = await fetch(url.href, {
                headers: headers
            });
            const json = await response?.json();
            console.log(json);
            setdata(json);
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
    const [filteredDivision, setfilteredDivision] = useState("")
    const [filteredProductLine, setfilteredProductLine] = useState("")
    const [filteredWarrantyStatus, setfilteredWarrantyStatus] = useState("")
    const [filteredIssueStatus, setfilteredIssueStatus] = useState("")
    const [filteredFromDate, setfilteredFromDate] = useState("")
    const [filteredToDate, setfilteredToDate] = useState("")
    const [filteredMonth, setfilteredMonth] = useState("")


    useEffect(() => {

        fetchDataPagination(pagination);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // columnFilters,

        pagination?.pageIndex,
        pagination?.pageSize,
        // sorting,
    ]);


    useEffect(() => {

        fetchDataPagination(filterPagination);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // columnFilters,

        filterPagination?.pageIndex,
        filterPagination?.pageSize,
        // sorting,
    ]);


    const [IBNnumber, setIBNnumber] = useState("")




    const columns = useMemo(
        () => [

            {
                accessorKey: "month",
                header: "IBN for the Month",
            },
            {
                accessorKey: "year",
                header: "Year",
            },
            {
                accessorKey: "type",
                header: "Type",
                Cell: ({ cell }) => {
                    let data = cell.getValue()
                    // console.log(cell.row.original);
                    return (
                      <>
                        {"Service"}
                      </>
                    )
                }
            },
            {
                accessorKey: "ibnNumber",
                header: "Bill No.",
                Cell: ({ cell }) => {
                    let data = cell.getValue()
                    // console.log(cell.row.original);
                    return (
                      <>
                            {/* <ReactToPrint
                                trigger={() => 
                                    <div className='hyperLink' onClick={(e)=>{
                                        // localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
                                        
                                        // localStorage.setItem("acknowledgementType", cell.row.original?.acknowledgmentStatusName)
                                        // localStorage.setItem("requestDate", cell.row.original?.requestDate?.split(" ")[0])
                                        // localStorage.setItem('TicketInfoLabel', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)
                        
                        
                                       
                                        //  const packageJson = require('../../../../package.json');
                                        
                                        // navigate(`${packageJson?.homepage}/New-assign-req-int`);
                                        
                                  }}>
                                    {cell.row.original.ibnNumber ? cell.row.original.ibnNumber: ""}
                        
                                    </div>

                                        
                                        
                                    }
                                content={() => componentRef.current}
                                onBeforeGetContent={  ()=>{
                                    <IBNCopy ibnNumber={cell.row.original?.ibnNumber}/>
                                    setIBNnumber(cell.row.original?.ibnNumber)
                                        localStorage.setItem("IBNNumber", cell.row.original?.ibnNumber)

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
                        */}
<p style={{color:"blue",cursor:"pointer"}} onClick={()=>{
                                                               localStorage.setItem("IBNNumber", cell.row.original?.ibnNumber)

                                                        navigate(`${pathName}/ibn-copy`)       

}}> {cell.row.original.ibnNumber ? cell.row.original.ibnNumber: ""}</p>
                      </>
                    )
                  }
            },
            {
                accessorKey: "ascName",
                header: "Partner Name",
            },
            {
                accessorKey: "billGenerationDate",
                header: "Bill Generation Date",
                Cell: ({ cell }) => {
                    let value=cell?.getValue()?.split(" ")[0]
                    return(
                        <>
                        {moment(value)?.format("DD-MM-YYYY")}
                        </>
                    )
                }
            },

            {
                accessorKey: "divisionName",
                header: "Product Division",
                // Cell: ({ cell }) => (
                //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
                // ),
            },
            {
                accessorKey: "noOfServiceTickets",
                header: "No. of Ticket",
                // Cell: ({ cell }) => (
                //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
                // ),
            },
            {
                accessorKey: "countOfServiceClaims",
                header: "Count of Service Claim",
                // Cell: ({ cell }) => (
                //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
                // ),
            },
            {
                accessorKey: "amountOfServiceClaims",
                header: "Amount of Service Claim",
                // Cell: ({ cell }) => (
                //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
                // ),
            },
            // {
            //     accessorKey: "isActive2",
            //     header: "Count of Material Claim",
            //     // Cell: ({ cell }) => (
            //     //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
            //     // ),
            // },
            // {
            //     accessorKey: "isActive2",
            //     header: "Amount of Material Claim",
            //     // Cell: ({ cell }) => (
            //     //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
            //     // ),
            // },
            // {
            //     accessorKey: "isActive2",
            //     header: "Total Claim",
            //     // Cell: ({ cell }) => (
            //     //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
            //     // ),
            // },
            // {
            //     accessorKey: "isActive2",
            //     header: "Total Amount",
            //     // Cell: ({ cell }) => (
            //     //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
            //     // ),
            // },
           
            // {
            //     accessorKey: "isActive",
            //     header: "Actions",
            //     size: "20",
            //     Cell: ({ cell }) => {
            //         let data = cell.getValue()
            //         // console.log(cell.row.original);
            //         return (
            //             <>
            //                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
            //                     {
            //                         cell.row.original.isActive == false ? "" :
            //                             Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
            //                                 <IconButton
            //                                     className="edit-btn"
            //                                     onClick={() => {
            //                                         console.log(cell.row.original);
            //                                         // setclaimRateId(cell.row.original.claimRateId);
            //                                         setEditRateDetails(cell.row.original.claimRateId);

            //                                         handleModalShow()


            //                                     }}

            //                                 >
            //                                     <FaRegEdit color='#005bab' />
            //                                 </IconButton>
            //                             </Tooltip> : ""
            //                     }

            //                     {
            //                         cell.row.original.isActive === false ? (
            //                             // Render a different icon when isActive is false
            //                             Permissions?.isDelete ? <Tooltip>
            //                                 <IconButton>


            //                                     <FaUserXmark
            //                                         className="user-btn"
            //                                         style={{ color: 'red' }} // Style for the new icon
            //                                         onClick={() => {
            //                                             console.log(cell.row.original.claimRateId);
            //                                             setactiveID(cell.row.original.claimRateId);
            //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
            //                                         }}
            //                                     />
            //                                 </IconButton>
            //                             </Tooltip> : ""
            //                         ) : (
            //                             Permissions?.isDelete ? <Tooltip>
            //                                 <IconButton>
            //                                     <FaUserCheck
            //                                         className="user-btn"
            //                                         style={{ color: 'blue' }}
            //                                         onClick={() => {
            //                                             console.log(cell.row.original.claimRateId);
            //                                             setactiveID(cell.row.original.claimRateId);
            //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
            //                                         }}
            //                                     />
            //                                 </IconButton>
            //                             </Tooltip> : ""
            //                         )
            //                     }

            //                     {/* {
            //                         cell.row.original.isActive === false ? (
            //                             // Render a different icon when isActive is false
            //                             Permissions?.isDelete ? <Tooltip>
            //                                 <IconButton>


            //                                     <FaUserXmark
            //                                         className="user-btn"
            //                                         style={{ color: 'red' }} // Style for the new icon
            //                                         onClick={() => {
            //                                             console.log(cell.row.original.claimRateId);
            //                                             setactiveID(cell.row.original.claimRateId);
            //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
            //                                         }}
            //                                     />
            //                                 </IconButton>
            //                             </Tooltip> : ""
            //                         ) : (
            //                             Permissions?.isDelete ? <Tooltip>
            //                                 <IconButton>
            //                                     <FaUserCheck
            //                                         className="user-btn"
            //                                         style={{ color: 'blue' }}
            //                                         onClick={() => {
            //                                             console.log(cell.row.original.claimRateId);
            //                                             setactiveID(cell.row.original.claimRateId);
            //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
            //                                         }}
            //                                     />
            //                                 </IconButton>
            //                             </Tooltip> : ""
            //                         )
            //                     } */}


            //                     {/* <Switch checked={data === true} onClick={(e) => {
            //       console.log(cell.row.original?.divisionId);
            //       setactiveID(cell.row.original?.divisionId)
            //       cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
            //     }} /> */}

            //                 </Box>

            //             </>
            //         )
            //     }
            // },



        ]
    );

    const table = useMaterialReactTable({
        columns,
        data,
        // enableRowSelection: true,
        // getRowId: (row) => row.phoneNumber,
        initialState: { showColumnFilters: true },
        // manualFiltering: true,
        manualPagination: true,
        // manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        // rowCount=rowCount,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
    });



    const fetchClaimList = () => {
        const fetchClaimOption = `${process.env.REACT_APP_API_URL}ClaimRate/GetAllClaimRate`;
        fetch(fetchClaimOption, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setdata(result);
                setRowCount(result[0]?.totalRows)
            })
    }

    // useEffect(() => {
    //     fetchClaimList()
    // }, [])





    
    const handleRateChange = (e) => {
        const newdata = { ...addRateMaster };
        newdata[e.target.name] = e.target.value;
        setaddRateMaster(newdata);
        console.log('rate---------', newdata);
    }
    const handleRateChangeEdit = (e) => {
        const newdata = { ...editAddRateMaster };
        newdata[e.target.name] = e.target.value;
        setEditAddRateMaster(newdata);
        console.log('rate---------', newdata);
    }



    // useEffect(() => {
    //     if (claimRateId) {
    //         setLoading(true);
    //         fetch(getSingleRateID, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //             .then((res) => res.json())
    //             .then((result) => {
    //                 console.log(result);
    //                 setEditAddRateMaster((pre) => {
    //                     return {
    //                         ...pre,
    //                         claimRateId: result?.claimRateId,
    //                         serviceClaimTypeId: result?.serviceClaimTypeId,
    //                         activityId: result?.activityId,
    //                         serviceId: result?.serviceId,
    //                         isActive: true,
    //                         productDivCode: result?.productDivCode,
    //                         productLineCode: result?.productLineCode,
    //                         isMinor: result?.isMinor,
    //                         claimRateDetails: result?.claimRateDetails
    //                     }
    //                 })
    //                 console.log(EditrateinputList);
    //                 setEditRateInputList(result?.claimRateDetails);
    //                 setLoading(false);
    //                 const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.productDivCode}`;
    //                 fetch(getAllProductLines, {
    //                     headers: {
    //                         "Authorization": `Bearer ${token}`
    //                     }
    //                 })
    //                     .then((res) => res.json())
    //                     .then((result) => {
    //                         console.log(result);
    //                         setallproductLines(result);
    //                     }) 
    //                     const getAllServices = `${process.env.REACT_APP_API_URL}RewindingServices/GetAllRewindingServices?ServiceClaimTypeId=${result?.serviceClaimTypeId}`;
    //                     fetch(getAllServices, {
    //                         headers: {
    //                             "Authorization": `Bearer ${token}`
    //                         }
    //                     })
    //                         .then((res) => res.json())
    //                         .then((result) => {
    //                             console.log(result);
    //                             setServices(result);
    //                         })

    //                         const GetAllActivities = `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?activityTypeId=${result?.serviceClaimTypeId}`;

    //                     fetch(GetAllActivities, {
    //                         headers: {
    //                             "Authorization": `Bearer ${token}`
    //                         }
    //                     })
    //                         .then((res) => res.json())
    //                         .then((result) => {
    //                             console.log(result);
    //                             setActivities(result);
    //                         })
    //             })
    //     }

    // }, [claimRateId])

    const setEditRateDetails = (claimRateId) => {
        const getSingleRateID = `${process.env.REACT_APP_API_URL}ClaimRate/GetclaimRateById?ClaimRateId=${claimRateId}`;
        setLoading(true);
        fetch(getSingleRateID, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setEditAddRateMaster((pre) => {
                    return {
                        ...pre,
                        claimRateId: result?.claimRateId == null ? "" : result?.claimRateId,
                        serviceClaimTypeId: result?.serviceClaimTypeId == null ? "" : result?.serviceClaimTypeId,
                        activityId: result?.activityId == null ? "" : result?.activityId,
                        serviceId: result?.serviceId == null ? "" : result?.serviceId,
                        isActive: true,
                        productDivCode: result?.productDivCode == null ? "" : result?.productDivCode,
                        productLineCode: result?.productLineCode == null ? "" : result?.productLineCode,
                        isMinor: result?.isMinor == null ? "" : result?.isMinor,
                        claimRateDetails: result?.claimRateDetails == null ? "" : result?.claimRateDetails
                    }
                })
                console.log(EditrateinputList);
                setEditRateInputList(result?.claimRateDetails);
                setLoading(false);
                const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.productDivCode}`;
                fetch(getAllProductLines, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        setallproductLines(result);
                    })
                const getAllServices = `${process.env.REACT_APP_API_URL}RewindingServices/GetAllRewindingServices?ServiceClaimTypeId=${result?.serviceClaimTypeId}`;
                fetch(getAllServices, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        setServices(result);
                    })

                const GetAllActivities = `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?activityTypeId=${result?.serviceClaimTypeId}`;

                fetch(GetAllActivities, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        setActivities(result);
                    })
            })

    }

    const handleModalClose = () => {
        setShowModal(false);
        // fetch(getSingleRateID, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then((res) => res.json())
        //     .then((result) => {
        //         console.log(result);
        //         setEditAddRateMaster((pre) => {
        //             return {
        //                 ...pre,
        //                 claimRateId: result?.claimRateId,
        //                 serviceClaimTypeId: result?.serviceClaimTypeId,
        //                 productDivCode: result?.productDivCode,
        //                 productLineCode: result?.productLineCode,
        //                 isMinor: result?.isMinor,
        //                 serviceGroupId: result?.serviceGroupId,
        //                 rewindingGroupId: result?.rewindingGroupId,
        //                 claimRateDetails: result?.claimRateDetails
        //             }
        //         })
        //         const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.productDivCode}`;
        //         fetch(getAllProductLines, {
        //             headers: {
        //                 "Authorization": `Bearer ${token}`
        //             }
        //         })
        //             .then((res) => res.json())
        //             .then((result) => {
        //                 console.log(result);
        //                 setallproductLines(result);
        //             })
        //     })




    }














    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...rateinputList];
    //     list[index][name] = value;
    //     setRateInputList(list);
    //     console.log(list);


    // };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rateinputList];
        list[index][name] = value;
        setRateInputList(list);
        console.log(list);
    };
    const handleInputChangeEdit = (e, index) => {
        const { name, value } = e.target;
        const list = [...EditrateinputList];
        list[index][name] = value;
        setEditRateInputList(list);
        console.log(list);
    };

    const handleNumberInput = (e, i) => {
        const { name, value } = e.target;
        const list = [...rateinputList];

        if (isNaN(value)) {
            // Set error for the current input field
            list[i].error = 'Only numbers are allowed';
        } else {
            // Clear error for the current input field
            list[i].error = '';
        }


        // Update the input value
        list[i][name] = value;

        // Update the state with the modified list
        setRateInputList(list);
    };

    const handleNumberInputEdit = (e, i) => {
        const { name, value } = e.target;
        const list = [...EditrateinputList];

        if (isNaN(value)) {
            // Set error for the current input field
            list[i].error = 'Only numbers are allowed';
        } else {
            // Clear error for the current input field
            list[i].error = '';
        }


        // Update the input value
        list[i][name] = value;

        // Update the state with the modified list
        setEditRateInputList(list);
    };







    const handleAddClick = () => {
        const newItem = {
            claimRateId: 0,
            repairTypeId: 0,
            travelClaimId: 0,
            activityTypeId: 0,
            paraDetail: "",
            paraValue: "",
            paraCondition: "",
            paraUOMId: 0,
            fixedQty: false,
            fixedQtyValue: 0,
            maxAmount: false,
            maximumAmountValue: 0,
            claimRateName: "",
            repairTypeName: "",
            travelClaimName: "",
            activityTypeName: "",
            paraUOM: "",
            isUpdate: 0,
            claimRateDetailId: 0
        };

        if (validateNewItem(rateinputList)) {
            setRateInputList([...rateinputList, newItem]);
        }
    };


    const handleUpdateClick = () => {
        const newItem = {
            claimRateId: 0,
            repairTypeId: 0,
            travelClaimId: 0,
            activityTypeId: 0,
            paraDetail: "",
            paraValue: "",
            paraCondition: "",
            paraUOMId: 0,
            fixedQty: false,
            fixedQtyValue: 0,
            maxAmount: false,
            maximumAmountValue: 0,
            claimRateName: "",
            repairTypeName: "",
            travelClaimName: "",
            activityTypeName: "",
            paraUOM: "",
            isUpdate: 0,
            claimRateDetailId: 0
        };

        if (validateNewItem(EditrateinputList)) {
            setEditRateInputList([...EditrateinputList, newItem]);
        }
    };
    const validateNewItem = (inputList) => {
        const paraDetail = inputList[inputList.length - 1]?.paraDetail;
        if (paraDetail === '' || paraDetail == null) {
            Swal.fire({
                icon: "error",
                title: "Parameter Details is required"
            });
            return false;
        }
        // const paraValue = inputList[0]?.paraValue;
        // if (paraValue === '' || paraValue == null) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Parameter Value is Rqequired"
        //     });
        //     return false;
        // }
        const paraCondition = inputList[inputList.length - 1]?.paraCondition;
        if (paraCondition === '' || paraCondition == null) {
            Swal.fire({
                icon: "error",
                title: "Parameter Condition is Required"
            });
            return false;
        }
        const paraUOMId = inputList[inputList.length - 1]?.paraUOMId;
        if (paraUOMId == 0 || paraUOMId == null) {
            Swal.fire({
                icon: "error",
                title: "Select Parameter UOM"
            });
            return false;
        }
        // const claimRateName = inputList[0]?.claimRateName;
        // if (claimRateName === '' || claimRateName == null) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Claim RateName is Required"
        //     });
        //     return false;
        // }
        const repairTypeId = inputList[inputList.length - 1]?.repairTypeId;
        if (repairTypeId == 0 || repairTypeId == null) {
            Swal.fire({
                icon: "error",
                title: "Select Repair Type"
            });
            return false;
        }
        const travelClaimId = inputList[inputList.length - 1]?.travelClaimId;
        if (travelClaimId == 0 || travelClaimId == null) {
            Swal.fire({
                icon: "error",
                title: "Select travel Claim"
            });
            return false;
        }
        // const paraUOMID = inputList[inputList.length - 1]?.paraUOMId;
        // if (!paraUOMID || paraUOMID === 'Select') {
        //     Swal.fire({
        //         icon: "error",
        //         title: " Select Parameter UOM Id "
        //     });
        //     return false;
        // }


        return true
    };


    const validateAllItems = (inputList) => {
        for (let i = 0; i < inputList.length; i++) {
            // const paraDetail = inputList[i]?.paraDetail;
            if (inputList[i]?.paraDetail === '' || inputList[i]?.paraDetail === null ||
                //inputList[i]?.paraValue === '' || inputList[i]?.paraValue === null ||
                inputList[i]?.paraCondition === '' || inputList[i]?.paraCondition === null ||
                inputList[i]?.paraUOMId == 0 || inputList[i]?.paraUOMId === null ||
                // inputList[i]?.claimRateName === ''|| inputList[i]?.claimRateName == null ||
                inputList[i]?.repairTypeId == 0 || inputList[i]?.repairTypeId == null ||
                inputList[i]?.travelClaimId == 0 || inputList[i]?.travelClaimId == null
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Please fill all the fields marked with red *!"
                });
                return false;
            }
            // const paraValue = inputList[i]?.paraValue;
            // if (paraValue === '') {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Parameter Value is Rqequired"
            //     });
            //     return false;
            // }
            // const paraCondition = inputList[i]?.paraCondition;
            // if (paraCondition === '') {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Parameter Condition is Required"
            //     });
            //     return false;
            // }
            // const claimRateName = inputList[i]?.claimRateName;
            // if (claimRateName === '') {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Claim RateName is Required"
            //     });
            //     return false;
            // }
            // const repairTypeId = inputList[i]?.repairTypeId;
            // if (repairTypeId === '') {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Select Repair Type"
            //     });
            //     return false;
            // }
            // const travelClaimId = inputList[i]?.travelClaimId;
            // if (travelClaimId === '') {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Select travel Claim"
            //     });
            //     return false;
            // }
        }

        // const paraUOMID = inputList[i]?.paraUOMId;
        // if (!paraUOMID || paraUOMID === 'Select') {
        //     Swal.fire({
        //         icon: "error",
        //         title: " Select Parameter UOM Id "
        //     });
        //     return false;
        // }


        return true
    };





    const handleRemoveClick = index => {
        const list = [...rateinputList];
        list.splice(index, 1);
        setRateInputList(list);
        console.log(index);
        console.log(list);
    };
    const handleRemoveClickEdit = index => {
        const list = [...EditrateinputList];
        let claimId = list[index].claimRateDetailId;
        const deleteURL = `${process.env.REACT_APP_API_URL}ClaimRate/DeleteclaimRateDetails?ClaimRateDetailId=${claimId}`;
        fetch(deleteURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => {
                let resp = res.text()
                resp.then((r) => {
                    console.log(r);
                    if (res.status == 200) {
                        list.splice(index, 1);
                        setEditRateInputList(list);
                        console.log(index);
                        console.log(list);

                    }
                    else {
                        Swal.fire({
                            icon: "warning",
                            title: "Something went wrong!"
                        })

                    }
                })
            })

    };



    const handleEditRateChange = (e) => {
        const newdata = { ...editAddRateMaster };
        newdata[e.target.name] = e.target.value;
        setEditAddRateMaster(newdata);
        console.log('rate---------', newdata);
    }


    const handleEditInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...editAddRateMaster?.claimRateDetails];
        list[index][name] = value;
        setEditRateInputList(list);
        console.log(list);


    };
    const handleEditInputNumberChange = (e, i) => {
        const { name, value } = e.target;
        const list = [...editAddRateMaster?.claimRateDetails];
        if (isNaN(value)) {
            // Set error for the current input field
            list[i].error = 'Only numbers are allowed';
        } else {
            // Clear error for the current input field
            list[i].error = '';
        }

        list[i][name] = value;
        setEditRateInputList(list);
        console.log(list);


    };


    // const handleEditAddClick = () => {
    //     const newItem = {
    //         claimRateId: 0,
    //         complainTypeId: 0,
    //         paraNameId: 0,
    //         paraDetail: "",
    //         paraValue: "",
    //         paraCondition: "",
    //         paraUOMId: 0
    //     };
    //     if (validateNewItemm(newItem)) {
    //         setEditAddRateMaster(prevState => ({
    //             ...prevState,
    //             claimRateDetails: [...prevState.claimRateDetails, newItem],
    //         }));

    //     }

    // };



    const validateNewItemm = (newItem) => {
        const complainID = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.complainTypeId;
        if (!complainID || complainID === 'Select') {
            Swal.fire({
                icon: "error",
                title: "Select Complain Type"
            });
            return false;
        }
        const paraNameID = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.paraNameId;
        if (!paraNameID || paraNameID === 'Select') {
            Swal.fire({
                icon: "error",
                title: "Selct Parameter Type "
            });
            return false;
        }
        const paraD = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.paraDetail;
        if (!paraD) {
            Swal.fire({
                icon: "error",
                title: "Parameter Details is required"
            });
            return false;
        }
        const paraValue = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.paraValue;
        if (!paraValue) {
            Swal.fire({
                icon: "error",
                title: "Rate is required"
            });
            return false;
        }
        const paraCondition = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.paraCondition;
        if (!paraCondition) {
            Swal.fire({
                icon: "error",
                title: "Parameter Condition is required"
            });
            return false;
        }
        const paraUOMID = editAddRateMaster?.claimRateDetails[editAddRateMaster.claimRateDetails.length - 1]?.paraUOMId;

        if (!paraUOMID || paraUOMID === 'Select') {
            Swal.fire({
                icon: "error",
                title: " Select Parameter UOM Id "
            });
            return false;
        }


        return true
    };
















    const handleEditRemoveClick = index => {
        console.log(editAddRateMaster?.claimRateDetails);
        const newList = [...editAddRateMaster?.claimRateDetails]; // Create a copy of the array
        newList.splice(index, 1); // Remove the item at the specified index
        setEditAddRateMaster({ ...editAddRateMaster, claimRateDetails: newList }); // Update the state with the new array
        console.log(index);
        console.log(newList);
    };




    const AllDivision = () => {
        const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;
        fetch(getAllDivisions, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setallDivisions(result)
            })

    }
    const fetchRepairTypes = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=RepairType`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setRepairTypes(result)
            })
    }
    const fetchTavelClaims = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=TravelClaim`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTravelClaims(result)
            })
    }
    const fetchActivityType = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ServiceClaimType`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setActivityType(result)
            })
    }
    const fetchServiceGroup = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Service%20Group`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setServiceGroup(result)
            })
    }
    const fetchRewindingGroup = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=RewindingType`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setRewindingGroup(result)
            })
    }

    const fetchComplainType = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ComplainType`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setComplainType(result)
            })
    }
    const fetchParaTypeName = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ClaimParaName`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setParameterTypeName(result)
            })
    }

    const fetchParaUOM = () => {
        fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ClaimParaUOM`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setParaUOM(result)
            })
    }





    return (
        <>
            <Card
                className="border-0 p-3 m-4"
                //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
                <div className='d-flex justify-content-between'>

                    <p className='pg-label m-0'>IBN Management</p>

                    {<Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Generate IBN</Button></Col></Row> }
                </div>
                <hr />
                <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }} className="m-1 p-3" >

                    <Row >

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Division </Form.Label>
                                <Form.Select value={filteredDivision} onChange={(e) => {

                                    setfilteredDivision(e.target.value)
                                    // setfilteredProductLine("")

                                    // fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscDivisionWiseProductline?ascCode=${asc}&divCode=${e.target.value}`, {
                                    //     headers: {
                                    //         Authorization: `Bearer ${token}`,
                                    //     },
                                    // })
                                    //     .then((res) => res.json())
                                    //     .then((result) => {
                                    //         console.log(result);
                                    //         setASCwiseProductLines(result)
                                    //     })
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
                        <Form.Group >
            <Form.Label> Month</Form.Label>
            <Form.Select value={filteredMonth} onChange={(e) => {
                setfilteredMonth(e.target.value)
            }}>
                <option value=''>Select</option>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>


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
                        <Form.Group >
            <Form.Label> Year</Form.Label>
            <Form.Select value={filteredMonth} onChange={(e) => {
                setfilteredMonth(e.target.value)
            }}>
                <option value=''>Select</option>
                <option value={2021}>2021</option>
               


            </Form.Select>
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
                                        


                                        fetchDataPagination(pagination)
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
                                        
                                        fetchDataPagination(pagination)

                                        setfilteredDivision("")
                                        setfilteredProductLine("")
                                        setfilteredWarrantyStatus("")
                                        setfilteredIssueStatus("")
                                        setfilteredFromDate("")
                                        setfilteredToDate("")

                                    }}

                                >
                                    Reset
                                </Button>
                            </div>
                        </Col>

                    </Row>
                </Row>


                {
                    

                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            initialState={{ showColumnFilters: false }} //show filters by default
                            muiTableHeadCellFilterTextFieldProps={{
                                sx: { m: "0.5rem 0", width: "100%" },
                                variant: "outlined",
                            }}
                            // enableEditing
                            // onEditingRowSave={handleSaveRowEdits}
                            // onEditingRowCancel={handleCancelRowEdits}
                            // renderRowActions={({ cell, row, table }) => (

                            //   <Box sx={{ display: "flex", gap: "1rem" }}>
                            //     {/* <Tooltip arrow placement="left" title="View">
                            //             <IconButton 
                            //             className="edit-btn"
                            //             // onClick={() => table.setEditingRow(row)}
                            //             disabled
                            //             >
                            //               <FaEye color='green'/>
                            //             </IconButton>
                            //           </Tooltip> */}

                            //     {
                            //       cell.row.original.isActive == false ? "" :

                            //         <Tooltip arrow placement="left" title="Edit">
                            //           <IconButton
                            //             className="edit-btn"
                            //             onClick={() => {
                            //               setparaValID(cell.row.original.parameterValId)
                            //               console.log(cell.row.original.parameterValId)
                            //               handleModalShow()
                            //             }}
                            //           >
                            //             <FaRegEdit color='#005bab' />
                            //           </IconButton>
                            //         </Tooltip>
                            //     }
                            //     {
                            //       cell.row.original.isActive == false ? "" :
                            //         <Tooltip arrow placement="right" title="Delete">
                            //           <IconButton
                            //             color="error"
                            //             onClick={() => {
                            //               setparaValID(cell.row.original.parameterValId)
                            //               console.log(cell.row.original.parameterValId)
                            //               handleShowDel()

                            //             }}

                            //           >
                            //             <HiOutlineTrash color='red' />
                            //           </IconButton>
                            //         </Tooltip>
                            //     }
                            //   </Box>
                            // )}

//                             muiExpandButtonProps={({ row, table }) => ({
//                                 onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
//                                 sx: {
//                                     transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
//                                     transition: 'transform 0.2s',
//                                 },
//                             })}
//                             enableExpandAll={false}
//                             renderDetailPanel={({ row }) => {
//                                 // console.log('---row---',row.original.branchCode)
//                                 let list = row.original?.claimRateDetails;

//                                 // console.log(list1);

//                                 return (

//                                     (row.original.claimRateDetails) ? (
//                                         <Box
//                                         // sx={{
//                                         //   display: 'grid',
//                                         //   margin: 'auto',
//                                         //   gridTemplateColumns: '1fr 1fr',
//                                         //   width: '100%',
//                                         // }}
//                                         >
//                                             {/* <Typography>Address: {row.original.address}</Typography> */}
//                                             {/* <Row className='justify-content-end'>
//   <Col md={4} sm={4} xs={4}> */}


//                                             <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
//                                                 {list ?

//                                                     <div className='p-3' style={{ borderRight: "1px solid" }}>
//                                                         {/* <p style={{ fontSize: "16px", fontWeight: "600" }}>Branches</p> */}

//                                                         <Table bordered responsive>
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th>#</th>
//                                                                     <th>Parameter Details</th>
//                                                                     <th>Parameter UOM</th>
//                                                                     <th>Rate</th>
//                                                                     <th>Parameter Condition</th>
//                                                                     {/* <th>Claim Rate</th> */}
//                                                                     <th>Fixed Quantity</th>
//                                                                     <th>Maximum Amount</th>
//                                                                     <th>Repair Type</th>
//                                                                     <th>Travel Claim</th>
//                                                                 </tr>
//                                                             </thead>

//                                                             <tbody>
//                                                                 {
//                                                                     list?.map((pv, index) => {
//                                                                         return (
//                                                                             <>
//                                                                                 <tr>
//                                                                                     <td>{index + 1}</td>
//                                                                                     <td>{pv?.paraDetail}</td>
//                                                                                     <td>{pv?.paraUOM}</td>
//                                                                                     <td>{pv?.paraValue}</td>
//                                                                                     <td>{pv?.paraCondition}</td>
//                                                                                     {/* <td>{pv?.claimRateName}</td> */}
//                                                                                     <td>{pv?.fixedQty == true ? "Yes" : "No"}</td>
//                                                                                     <td>{pv?.maxAmount == true ? "Yes" : "No"}</td>
//                                                                                     <td>{pv?.repairTypeName}</td>
//                                                                                     <td>{pv?.travelClaimName}</td>

//                                                                                 </tr>


//                                                                             </>
//                                                                         )
//                                                                     })
//                                                                 }
//                                                             </tbody>
//                                                         </Table>




//                                                     </div> : ""
//                                                 }

//                                             </div>

//                                             {/* <Col>
//       </Col> */}

//                                             {/* </Col>
// </Row> */}
//                                         </Box>
//                                     ) : null
//                                 )

//                             }

//                             }

                            manualPagination={true}
                            muiToolbarAlertBannerProps={isError
                                ? {
                                    color: 'error',
                                    children: 'Error loading data',
                                }
                                : undefined}
                            onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            onPaginationChange={setfilterPagination || setPagination}
                            onSortingChange={setSorting}
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
                                        padding: '10px',
                                        flexWrap: 'wrap',
                                    }}>

                                        {Permissions?.isDownload ? <Button variant=''
                                            disabled={table.getPrePaginationRowModel().rows.length === 0}
                                            onClick={() =>
                                                handleExportRows(
                                                    table.getPrePaginationRowModel().rows,
                                                    customHeaders,
                                                    [

                                                        "productLineCode",
                                                        "productDivCode",
                                                        "serviceClaimTypeId",
                                                        "serviceId",
                                                        "isActive",
                                                        "activityId",
                                                        "claimRateDetails",
                                                        "noOfClaimRate",
                                                        "claimRateId"


                                                        // {
                                                        //     "parameterValId": 1,
                                                        //     "parameterTypeId": 0,
                                                        //     "parameterText": "Quotation copy",
                                                        //     "parameterCode": "Quotation copy",
                                                        //     "sequenceNo": 1,
                                                        //     "isActive": false,
                                                        //     "userId": null,
                                                        //     "totalRows": null
                                                        // },


                                                    ]
                                                )
                                            }
                                        >
                                            <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                                        </Button> : ""}

                                    </div>
                                </>

                            )}


                            positionActionsColumn="first"



                        />
                }
                {/* {loading ? <Loader/>: */}
                

                <Modal show={show} onHide={handleClose} backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className='mdl-title'>Generate IBN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <Form.Group>
                                                    <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        ref={IBNRemarks}
                                                        // value = {TechData.remarks}
                                                        autocomplete="new-password"
                                                        autoComplete='off'
                                                        //  value={addActivity.activityName}
                                                        // onChange={(e) => {
                                                        //     setIBNData((pre) => {
                                                        //         return {
                                                        //             ...pre,
                                                        //             Remarks: e.target.value
                                                        //         }
                                                        //     })
                                                        // }}
                                                        placeholder='Enter Remarks'
                                                    />
                                                </Form.Group>
                                            </Col>





                                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className='cncl-Btn' onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="" className='add-Btn' onClick={(e) => {
                            e.preventDefault();
                            let currentDate = new Date();
                            let previousMonthDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
                           previousMonthDate = currentDate.toISOString().split('T')[0];
                            // previousMonthDate = moment(previousMonthDate).format("DD-MM-YYYY");

                            const generateIBNUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/InsertAscIBNGeneration?AscCode=${asc}&IBNGenerationDate=${previousMonthDate}`;
                            if(IBNRemarks.current.value == ""){
                                Swal.fire({
                                    icon: "error",
                                    title: "Please enter Remarks"
                                  })
                                  return
                            }
                            fetch(generateIBNUrl, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                },
                            })
                            // .then(result => result.json())
                                .then((res) => {
                                    let resp = res.text()
                                    // console.log(resp);
                                    
                                    resp.then((r) => {
                                        // console.log(r);
                                            console.log(r)
                                            if(r == "No IBN to generate"){
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "No IBN to Generate"
                                                })
                                                handleClose()
                                            }
                                            else if(r == "IBN generated"){
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "IBN Generated successfully!"
                                                })
                                                fetchDataPagination(pagination)
                                                handleClose()
                                            }
                                        else {
                                            Swal.fire({
                                                icon: "warning",
                                                title: "Something went wrong!"
                                            })

                                        }
                                    })
                                })

                        }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* } */}

                {/* show handleClose*/}
                <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title className='mdl-title'>Edit Rate Master</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* {
                                loading ? (<Loader />) : ( */}

                        <><Row>

                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Product Division Code<span className='req-t'>*</span></Form.Label>
                                    <Form.Select
                                        name='productDivCode'
                                        disabled
                                        value={editAddRateMaster?.productDivCode}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            setEditAddRateMaster((pre) => {
                                                return {
                                                    ...pre,
                                                    productDivCode: e.target.value
                                                }
                                            })
                                            const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;

                                            fetch(getAllProductLines, {
                                                headers: {
                                                    "Authorization": `Bearer ${token}`
                                                }
                                            })
                                                .then((res) => res.json())
                                                .then((result) => {
                                                    console.log(result);
                                                    setallproductLines(result);
                                                    let plCode = result.filter(obj => obj.parameterTypeId == editAddRateMaster.productLineCode)
                                                    if (plCode.length == 0) {
                                                        setEditAddRateMaster((pre) => {
                                                            return {
                                                                ...pre,
                                                                productLineCode: '0',

                                                            }
                                                        })
                                                    }
                                                })

                                        }}>
                                        <option value='0'>Select</option>
                                        {allDivisions.map((division) => (
                                            <option key={division.parameterTypeId} value={division.parameterTypeId}>
                                                {division.parameterType}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Product Line Code<span className='req-t'>*</span></Form.Label>
                                    <Form.Select
                                        name='productLineCode'
                                        disabled
                                        value={editAddRateMaster?.productLineCode}
                                        onChange={(e) => {
                                            setEditAddRateMaster((pre) => {
                                                return {
                                                    ...pre,
                                                    productLineCode: e.target.value,
                                                }
                                            })


                                        }}>
                                        <option value='0'>Select</option>
                                        {allproductLines.map((productLine) => (
                                            <option value={productLine.parameterTypeId}>
                                                {productLine.parameterType}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Type of Activity<span className='req-t'>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" name='serviceClaimTypeId'
                                        disabled
                                        value={editAddRateMaster.serviceClaimTypeId}
                                        onChange={(e) => {

                                            console.log(e.target.value)
                                            // if(e.target.value == 0){

                                            // }
                                            setEditAddRateMaster((pre) => {
                                                return {
                                                    ...pre,
                                                    serviceClaimTypeId: e.target.value
                                                }
                                            })
                                            const getAllServices = `${process.env.REACT_APP_API_URL}RewindingServices/GetAllRewindingServices?ServiceClaimTypeId=${e.target.value}`;

                                            fetch(getAllServices, {
                                                headers: {
                                                    "Authorization": `Bearer ${token}`
                                                }
                                            })
                                                .then((res) => res.json())
                                                .then((result) => {
                                                    console.log(result);
                                                    setServices(result);
                                                    let list = result.filter(obj => obj.serviceId == editAddRateMaster.serviceId)
                                                    if (list.length == 0) {
                                                        setEditAddRateMaster((pre) => {
                                                            return {
                                                                ...pre,
                                                                serviceId: '0',

                                                            }
                                                        })
                                                    }
                                                })

                                            const GetAllActivities = `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?activityTypeId=${e.target.value}`;

                                            fetch(GetAllActivities, {
                                                headers: {
                                                    "Authorization": `Bearer ${token}`
                                                }
                                            })
                                                .then((res) => res.json())
                                                .then((result) => {
                                                    console.log(result);
                                                    setActivities(result);
                                                    let list = result.filter(obj => obj.activityId == editAddRateMaster.activityId)
                                                    if (list.length == 0) {
                                                        setEditAddRateMaster((pre) => {
                                                            return {
                                                                ...pre,
                                                                activityId: '0',

                                                            }
                                                        })
                                                    }
                                                })


                                        }}>
                                        <option value='0'>Select</option>
                                        {
                                            activityType?.map((activity, index) => {
                                                return (
                                                    <>
                                                        <option value={activity?.parameterValId}>{activity?.parameterText}</option>
                                                    </>
                                                )
                                            })
                                        }



                                    </Form.Select>
                                </Form.Group>
                            </Col>




                        </Row><Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Activity Name<span className='req-t'>*</span></Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            name='activityId'
                                            disabled
                                            value={editAddRateMaster.activityId} onChange={handleRateChangeEdit}>
                                            <option value='0'>Select</option>
                                            {
                                                activities?.map((activity, index) => {
                                                    return (
                                                        <>
                                                            <option value={activity?.activityId}>{activity?.activityName}</option>
                                                        </>
                                                    )
                                                })
                                            }



                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Service Name<span className='req-t'>*</span></Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name='serviceId'
                                            disabled
                                            value={editAddRateMaster.serviceId} onChange={handleRateChangeEdit}>
                                            <option value='0'>Select</option>
                                            {
                                                services?.map((activity, index) => {
                                                    return (
                                                        <>
                                                            <option value={activity?.serviceId}>{activity?.serviceName}</option>
                                                        </>
                                                    )
                                                })
                                            }



                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4} className='mt-3'>
                                    <Form.Group className='mt-4'>

                                        <Form.Check
                                            type='checkbox'
                                            label="is Minor"
                                            name='isMinor'
                                            disabled
                                            checked={editAddRateMaster?.isMinor}
                                            onChange={(e) => {
                                                setEditAddRateMaster((prev) => ({
                                                    ...prev,
                                                    isMinor: e.target.checked,
                                                }));
                                            }}
                                        />
                                    </Form.Group>
                                </Col>



                            </Row>
                            <Table responsive bordered className='mt-3'>
                                <thead>
                                    <tr>
                                        <th className="small-font">#</th>
                                        {/* <th>Parameter Type</th> */}
                                        {/* <th>Claim Type </th> */}

                                        <th className="small-font">Parameter Details <span className='req-t'>*</span></th>
                                        <th className="small-font">Parameter UOM <span className='req-t'>*</span></th>
                                        <th className="small-font">Rate</th>
                                        <th className="small-font">Parameter Condition <span className='req-t'>*</span></th>
                                        {/* <th className="small-font">Claim Rate<span className='req-t'>*</span></th> */}
                                        <th className="small-font">Fixed Quantity </th>
                                        <th className="small-font">Maximum Amount</th>
                                        <th className="small-font">Repair Type<span className='req-t'>*</span></th>
                                        <th className="small-font">Travel Claim<span className='req-t'>*</span></th>
                                        <th className="small-font">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>


                                    {EditrateinputList?.map((x, i) => {
                                        return (
                                            <>
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="text"
                                                                name='paraDetail'
                                                                value={x.paraDetail}
                                                                onChange={(e) => handleInputChangeEdit(e, i)}
                                                                placeholder=''
                                                            />
                                                        </Form.Group>

                                                    </td>


                                                    <td>
                                                        <Form.Group>
                                                            <Form.Select
                                                                name='paraUOMId'
                                                                value={x?.paraUOMId}
                                                                onChange={(e) => { handleInputChangeEdit(e, i) }}
                                                            //     setRateInputList((pre) => {
                                                            //         return {
                                                            //             ...pre,
                                                            //             repairTypeId: e.target.value,
                                                            //         }
                                                            //     })


                                                            // }}
                                                            >
                                                                <option value='0'>Select</option>
                                                                {paraUOM.map((obj) => (
                                                                    <option value={obj.parameterValId}>
                                                                        {obj.parameterText}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>


                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="text"
                                                                name='paraValue'
                                                                value={x.paraValue}
                                                                onChange={(e) => handleNumberInputEdit(e, i)}
                                                                placeholder=''
                                                                className='text-xxl-end'
                                                            />
                                                            {x.error && <span style={{ color: 'red' }}>{x.error}</span>}

                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="text"
                                                                name='paraCondition'
                                                                value={x.paraCondition}
                                                                onChange={(e) => handleInputChangeEdit(e, i)}
                                                                placeholder=''
                                                            />
                                                        </Form.Group>
                                                    </td>
                                                    {/* <td>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name='claimRateName'
                                                                            value={x.claimRateName}
                                                                            onChange={(e) => handleInputChangeEdit(e, i)}
                                                                            placeholder=''
                                                                        />
                                                                    </Form.Group>
                                                                </td> */}
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Check
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    // 7border: '2px solid #007bff'
                                                                }}
                                                                type='checkbox'
                                                                label=""
                                                                name='fixedQty'
                                                                checked={x?.fixedQty}
                                                                onChange={(e) => {
                                                                    let list = [...EditrateinputList];
                                                                    list[i][e.target.name] = e.target.checked;
                                                                    setEditRateInputList(list);

                                                                }}
                                                            />
                                                            {/* <Form.Check type="checkbox" id="myCheckbox" className="custom-checkbox" inline>
                                                                        <Form.Check.Input />
                                                                    </Form.Check> */}

                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Check
                                                                style={{
                                                                    marginLeft: "30px",
                                                                    // 7border: '2px solid #007bff'
                                                                }}
                                                                type='checkbox'
                                                                label=""
                                                                name='maxAmount'
                                                                checked={x?.maxAmount}
                                                                onChange={(e) => {
                                                                    let list = [...EditrateinputList];
                                                                    list[i][e.target.name] = e.target.checked;
                                                                    setEditRateInputList(list);

                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Form.Group>
                                                            <Form.Select
                                                                name='repairTypeId'
                                                                value={x?.repairTypeId}
                                                                onChange={(e) => { handleInputChangeEdit(e, i) }}
                                                            //     setRateInputList((pre) => {
                                                            //         return {
                                                            //             ...pre,
                                                            //             repairTypeId: e.target.value,
                                                            //         }
                                                            //     })


                                                            // }}
                                                            >
                                                                <option value='0'>Select</option>
                                                                {repairTypes.map((obj) => (
                                                                    <option value={obj.parameterValId}>
                                                                        {obj.parameterText}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Select
                                                                name='travelClaimId'
                                                                value={x?.travelClaimId}
                                                                onChange={(e) => { handleInputChangeEdit(e, i) }}
                                                            //     setRateInputList((pre) => {
                                                            //         return {
                                                            //             ...pre,
                                                            //             travelClaimId: e.target.value,
                                                            //         }
                                                            //     })


                                                            // }}
                                                            >
                                                                <option value='0'>Select</option>
                                                                {travelClaims.map((productLine) => (
                                                                    <option value={productLine.parameterValId}>
                                                                        {productLine.parameterText}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </td>



                                                    <td>
                                                        {EditrateinputList.length !== 1 && <button
                                                            className="mr10"
                                                            style={{ color: "red", backgroundColor: "transparent", border: "1px solid red", borderRadius: "3px" }}
                                                            onClick={() => handleRemoveClickEdit(i)}><FaMinus /></button>}
                                                    </td>

                                                </tr>








                                            </>
                                        )

                                    })}


                                </tbody>
                            </Table>
                            <Button variant="" className="" style={{ float: "right", color: "white", backgroundColor: "blue" }} disabled={rateinputList.some(item => !!item.error)} // Disable button if any field has an error
                                onClick={handleUpdateClick}><FaPlus />
                            </Button>





                        </>
                        {/* // )} */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="" className='add-Btn' disabled={rateinputList.some(item => !!item.error)}
                            onClick={(e) => {
                                e.preventDefault();
                                const claimRateMaster = `${process.env.REACT_APP_API_URL}ClaimRate/UpsertClaimRate`;





                                const productDivCode = editAddRateMaster.productDivCode;
                                if (!productDivCode || productDivCode == '0') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Select the Product Division Code"
                                    });
                                    return;
                                }

                                const productLineCode = editAddRateMaster.productLineCode;
                                if (!productLineCode || productLineCode == '0') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Select the  Product Line Code "
                                    });
                                    return;
                                }

                                const serviceClaimTypeId = editAddRateMaster.serviceClaimTypeId;
                                if (!serviceClaimTypeId || serviceClaimTypeId == '0') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Select the Type of Activity"
                                    });
                                    return;
                                }

                                const activityId = editAddRateMaster.activityId;
                                if (!activityId || activityId == '0') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Select the Activity Name"
                                    });
                                    return;
                                }

                                const serviceId = editAddRateMaster.serviceId;
                                if (!serviceId || serviceId == '0') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Select the Service Name"
                                    });
                                    return;
                                }
                                if (!validateAllItems(EditrateinputList)) {
                                    return
                                }








                                else {
                                    (async () => {
                                        try {
                                            setLoading(true)
                                            let n = {
                                                ...editAddRateMaster,
                                                claimRateDetails: EditrateinputList,
                                            }
                                            for (let i = 0; i < EditrateinputList.length; i++) {
                                                if (n.claimRateDetails[i].paraValue == "") {
                                                    n.claimRateDetails[i].paraValue = '0';
                                                }
                                            }

                                            const response = await fetch(claimRateMaster, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization": `Bearer ${token}`
                                                },
                                                body: JSON.stringify(n)
                                            });

                                            if (response.status === 200) {
                                                const responseData = await response.text();
                                                if (responseData === "CREXISTS") {
                                                    Swal.fire({
                                                        icon: "warning",
                                                        title: "Rate already exists!"
                                                    });
                                                } else {
                                                    Swal.fire({
                                                        icon: "success",
                                                        title: "Updated successfully!"
                                                    })
                                                    handleModalClose();
                                                    // setclaimRateId("")
                                                    fetchClaimList();
                                                    setLoading(false)



                                                }
                                            }

                                            else {
                                                const errorData = await response.json();
                                                if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                    // Construct error message from the error object
                                                    let errorMessage = "";
                                                    for (const key in errorData.errors) {
                                                        errorMessage += `${errorData.errors[key][0]}\n`;
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: errorMessage
                                                        });
                                                    }
                                                }
                                                else {
                                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                                }
                                                setLoading(false)

                                            }




                                        } catch (error) {
                                            console.error('Error:', error);
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops something went wrong"
                                            });
                                            setLoading(false)

                                        }
                                    })();
                                }


                            }
                            }
                        >
                            Update
                        </Button>

                    </Modal.Footer>
                </Modal>





                {/* ----------------------------------Active--------------------------------------- */}



                <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className='mdl-title'>Activate Rate Master</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to activate this Rate Master?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                            No
                        </Button>
                        <Button variant="" className='add-Btn' onClick={(e) => {
                            e.preventDefault();

                            const activeRatemaster = `${process.env.REACT_APP_API_URL}ClaimRate/DeleteClaimRate?ClaimRateId=${activeID}&isActive=${1}`;

                            fetch(activeRatemaster, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                            })
                                .then((res) => {
                                    let resp = res.text()
                                    resp.then((r) => {
                                        console.log(r);
                                        if (res.status == 200) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Activated successfully!"
                                            })
                                            handleCloseIsActive()
                                            fetchClaimList()

                                        }
                                        else {
                                            Swal.fire({
                                                icon: "warning",
                                                title: "Something went wrong!"
                                            })

                                        }
                                    })
                                })

                        }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>



                {/* ----------------------------------InActive--------------------------------------- */}



                <Modal show={showIsActive1} onHide={handleCloseIsActive1} backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className='mdl-title'>De-activate Rate Master</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to de-activate this Rate Master?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                            No
                        </Button>
                        <Button variant="" className='add-Btn' onClick={(e) => {
                            e.preventDefault();

                            const deactiveRatemaster = `${process.env.REACT_APP_API_URL}ClaimRate/DeleteClaimRate?ClaimRateId=${activeID}&isActive=${0}`;

                            fetch(deactiveRatemaster, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                            })
                                .then((res) => {

                                    let retResult = handleResponse(res);
                                    if (retResult) {
                                        handleCloseIsActive1()
                                        fetchClaimList()

                                    }



                                    // let resp = res.text()
                                    // resp.then((r) => {
                                    //   console.log(r);
                                    //   if (res.status == 200) {
                                    //     Swal.fire({
                                    //       icon: "success",
                                    //       title: "De-activated successfully!"
                                    //     })
                                    //     handleCloseIsActive1()
                                    //     fetchAllRegions()
                                    //   }
                                    //   else {
                                    //     Swal.fire({
                                    //       icon: "warning",
                                    //       title: "Something went wrong!"
                                    //     })

                                    //   }
                                    // })
                                })

                        }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>





            </Card>
            <>
                    {<div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}> 
                    {
                        <PrintableComponent ref={componentRef} sheet={<IBNCopy ibnNumber={IBNnumber}/>}/>
        
                        }            
        </div>}
                </>
        </>
    )
}

export default IBNGeneration