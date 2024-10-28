import React, { useMemo, useState, useEffect } from 'react'
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import { handleExportRows } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaFileCsv, FaRegEdit } from "react-icons/fa";
import { FaEye, FaMinus, FaPlus, FaUserXmark, } from "react-icons/fa6";


import Swal from 'sweetalert2';

import { Box, IconButton, Tooltip } from '@mui/material';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import Loader from '../../loader';
import moment from 'moment';

function ViewClaimApprovalASM() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [activityList, setactivityList] = useState([]);
  

  const [data, setdata] = useState([])
  // const [divisionName, setDivisionName] = useState('');
  // const [ticketTime, setTicketTime] = useState('');
  // const [remarks, setRemarks] = useState('');
  
  const handleClose = () => setShow(false);
//   const handleShow = () => {
//     setShow(true)

//     setaddActivity({
//       stStatusId: 0,
//       stStatusName: "",
      
//       // remarks: "",
//       isActive: true
//     })


//   }
const [ASCNames, setASCNames] = useState([]);
let asc = localStorage.getItem("UID");
let RoleName = localStorage.getItem("RoleName");
const fetchFilterPagination = async (time, reasonEmptyCheck) => {
   

  const url = new URL(

      `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllASCServiceRequestClaimInfo`,

  );
  // url.searchParams.set(
  //     'PageNumber',
  //     `${filterPagination?.pageIndex}`,
  // );
  // url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);


  if (filteredDivision) { url.searchParams.set('DivisionCode', `${filteredDivision}`) }
  if (filteredProductLine) { url.searchParams.set('ProductLineCode', `${filteredProductLine}`) }
  if (filteredWarrantyStatus) { url.searchParams.set('ServiceTicketType', `${filteredWarrantyStatus}`) }
  if (filteredAscCode) { url.searchParams.set('AscCode', `${filteredAscCode}`) }
  if (filteredMonth) { url.searchParams.set('Month', `${filteredMonth}`) }
  // if (filteredToDate) { url.searchParams.set('ToDate', `${filteredToDate}`) }

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  try {
      const response = await fetch(url.href, {
          headers: headers
      });
      let json = await response?.json();
     
      // else if(time == 'Pendancy'){ 
      //         json = json.filter(i=>i?.ageOfPendency>72);

      // }
      // || isChecked
      
      setdata(json);
      // setAllRequestsForFilter(json)
      // setRowCount(json[0]?.totalRows);
  } catch (error) {
      setIsError(true);
      console.error(error);
      return;
  }
  setIsError(false);
  setIsLoading(false);
  setIsRefetching(false);
};

const handleShowAsc = () =>{
  fetch(
      `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllAscByTicketCount?UserId=${asc}`,
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
  // setShowAsc(true);
}
const getASCList = () => {
  const getASCListUrl = `${process.env.REACT_APP_API_URL}Asc/GetUserWiseAsc?UserCode=${asc}`;
  fetch(getASCListUrl, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  })
      .then((res) => res.json())
      .then((result) => {
          console.log(result);
          setAscList(result)
      })

}
useEffect(()=>{
  
  getASCList();
},[])
const [ascList, setAscList] = useState([]);



useEffect(()=>{
  handleShowAsc();
  AllDivision();
},[])
const fetchClaimDetails = (ASCCode) => {
  if (!ClaimDetailsData.length) {
    setIsLoading(true);
} else {
    setIsRefetching(true);
}
  setClaimDetailsData([])
  const fetchdata = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllASCServiceRequestClaimLineItems?AscCode=${ASCCode}`;

  fetch(fetchdata, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      // const table1Data = result.map((row) => ({
      //     ...row,
      //     uniqueId: `table1_${row.issueTypeId}`, // Add a unique prefix for table 1
      //   }));
      setIsLoading(false);
      setIsRefetching(false);

      setClaimDetailsData(result)
    })
}
const [ClaimDetailscolumns, setClaimDetailsColumns] = useState([
  // {
  //     accessorKey: 'checkbox', // custom column for checkboxes
  //     header: '',
  //     size: "50",
  //     Cell: ({ cell }) => (
  //       <Checkbox
  //          checked={cell.row.original?.isChecked? true : false}
  //          onChange={() => handleCheckboxChange(cell)}
  //       />
  //     ),
  //   },
  {
    accessorKey: "ticketNo",
    header: "Service Request Number",
    size: "50",
    Cell: ({ cell }) => (
      <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
    ),
    // grow: false
    //  minSize: "90%"
  },
  {
      accessorKey: "ticketCreateDate",
      header: "Ticket Creation Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{
              cell.row.original.ticketCreateDate ? moment((cell.row.original.ticketCreateDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
            }</p>
         
          </>
        )
      }
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "claimNo",
      header: "Claim No.",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "claimGenerationDate",
      header: "Claim Generation Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{
              cell.row.original.claimGenerationDate ? moment((cell.row.original.claimGenerationDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
            }</p>
         
          </>
        )
      }
      // grow: false
      //  minSize: "90%"

    },
    {
      accessorKey: "partnerName",
      header: "Partner Name",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "productCode",
      header: "Product",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "type",
      header: "Type",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "activityName",
      header: "Activity",
      size: "200",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "parameter",
      header: "Parameter",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "possibleValue",
      header: "Possible Value",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "qty",
      header: "Qty.",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "rate",
      header: "Rate",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-right m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount (INR)",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-right m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "claimRemarksByASC",
      header: "Claim Remark by ASC",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },{
      accessorKey: "invoiceNo",
      header: "Invoice No.",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "ticketClosedDate",
      header: "Ticket Closure Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{
              cell.row.original.ticketClosedDate ? moment((cell.row.original.ticketClosedDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
            }</p>
         
          </>
        )
      }

      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "ticketAge",
      header: "Ticket Age (Days)",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "asmStatus",
      header: "ASM Status",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "asmApprovedRemarks",
      header: "Remarks By ASM",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "rsmStatus",
      header: "RSM Status",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },{
      accessorKey: "rsmApprovedRemarks",
      header: "Remarks By RSM",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
   
    {
      accessorKey: "actionTakenBy",
      header: "Action Taken By",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "rsmClaimApprovedDate",
      header: "RSM Claim Approval Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{
              cell.row.original.rsmClaimApprovedDate ? moment((cell.row.original.rsmClaimApprovedDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
            }</p>
         
          </>
        )
      }
      
      // grow: false
      //  minSize: "90%"
    },{
      accessorKey: "eicClaimApprovalDate",
      header: "ASM Claim Approval Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{
              cell.row.original.eicClaimApprovalDate ? moment((cell.row.original.eicClaimApprovalDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
            }</p>
         
          </>
        )
      }
      // grow: false
      //  minSize: "90%"
    },{
      accessorKey: "claimDeletedOnDate",
      header: "Claim Deleted on Date",
      size: "50",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <p className={`text-center m-0`}>{cell.row.original.claimDeletedOnDate ? moment((cell.row.original.claimDeletedOnDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""}</p>
         
          </>
        )
      }
      // grow: false
      //  minSize: "90%"
    },
    // {
    //   accessorKey: "challan",
    //   header: "Challan No. (Date)",
    //   size: "50",
    //   // grow: false
    //   //  minSize: "90%"
    // },{
    //   accessorKey: "challanStatus",
    //   header: "Challan Status",
    //   size: "50",
    //   // grow: false
    //   //  minSize: "90%"
    // },
    {
      accessorKey: "ibn",
      header: "IBN No",
      size: "50",
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "ibnGenerationOn",
      header: "IBN Generation Date",
      size: "50",
      // grow: false
      //  minSize: "90%"
    }
  // {
  //   accessorKey: "isActive",
  //   header: "Actions",
  //   size: "50",
  //   // grow: false,
  //   // maxSize: "10",
  //   Cell: ({ cell }) => {
  //     let data = cell.getValue()
  //     // console.log(cell.row.original);
  //     return (
  //       <>
  //         <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
  //           {/* {
  //             cell.row.original.isActive == false ? "" :
  //               Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
  //                 <IconButton
  //                   className="edit-btn"
  //                   onClick={() => {
  //                     console.log(cell.row.original.stStatusId);
  //                     setEditActivity((pre)=>{
  //                       return {
  //                       ...pre,
  //                       activityId: cell.row.original.activityId,
  //                       activityType: cell.row.original.activityType,
  //                       divisionCode: cell.row.original.divisionCode,
  //                       productLineCode: cell.row.original.productLineCode,
  //                       activityTypeId: cell.row.original.activityTypeId,
  //                       activityName: cell.row.original.activityName}
  //                     })
           
  //                     handleModalShow(cell)
  //                     // SapDivision()

  //                   }}

  //                 >
  //                   <FaRegEdit color='#005bab' />
  //                 </IconButton>
  //               </Tooltip> : ""
  //           } */}
  //           {/* {
  //             cell.row.original.isActive == false ? "" :
  //               <Tooltip arrow placement="right" title="Delete">
  //                 <IconButton
  //                   color="error"
  //                   onClick={() => {
  //                     setroleID(cell.row.original.roleId)
  //                     setisActive(cell.row.original.isActive)
  //                     handleShowDel()
  //                   }}


  //                 >
  //                   <HiOutlineTrash color='red' />
  //                 </IconButton>
  //               </Tooltip>
  //           } */}


  //           {
  //             cell.row.original.isActive === false ? (
  //               // Render a different icon when isActive is false
  //               Permissions?.isDelete ? <Tooltip>
  //                 <IconButton className="user-btn" onClick={() => {
  //                   console.log(cell.row.original.activityId);
  //                   setactiveID(cell.row.original.activityId);
  //                   cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
  //                 }}>


  //                   <FaUserXmark

  //                     style={{ color: 'red' }} // Style for the new icon

  //                   />

  //                 </IconButton>
  //               </Tooltip> : ""
  //             ) : (
  //               Permissions?.isDelete ? <Tooltip>
  //                 <IconButton className="user-btn" onClick={() => {
  //                   console.log(cell.row.original.activityId);
  //                   setactiveID(cell.row.original.activityId);
  //                   cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
  //                 }}>


  //                   <FaUserCheck

  //                     style={{ color: 'blue' }}

  //                   />
  //                 </IconButton>
  //               </Tooltip> : ""
  //             )
  //           }


  //           {/* <Switch checked={data === true} onClick={(e) => {
  //             console.log(cell.row.original?.stStatusId);
  //             setactiveID(cell.row.original?.stStatusId)
  //             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
  //           }} /> */}

  //         </Box>

  //       </>
  //     )
  //   }
  // }
]);
  const handleModalShow = (cell) => {
    // AllDivision()
    // fetchActivityType();
    // const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${cell.row.original.divisionCode}`;

    // fetch(getAllProductLines, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })
    //     .then((res) => res.json())
    //     .then((result) => {
    //         console.log(result);
    //         setallproductLines(result);
    //     })
    setShowModal(true);
  };
  const handleCloseDel = () => setShowDel(false);
  let token = localStorage.getItem("UserToken")


  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [activeID, setactiveID] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filteredProductLine, setfilteredProductLine] = useState("")
  const [filteredIssueStatus, setfilteredIssueStatus] = useState("")
  const [filteredFromDate, setfilteredFromDate] = useState("")



  // -----------Pagination------------------------

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!data.length) {
  //       setIsLoading(true);
  //     } else {
  //       setIsRefetching(true);
  //     }

  //     const url = new URL(

  //       `${process.env.REACT_APP_API_URL}Division/GetAllDivision`,

  //     );
  //     url.searchParams.set(
  //       'PageNumber',
  //       `${pagination.pageIndex}`,
  //     );
  //     url.searchParams.set('PageSize', `${pagination.pageSize}`);

  //     const headers = new Headers();
  //     headers.append('Authorization', `Bearer ${token}`);
  //     try {
  //       const response = await fetch(url.href, {
  //         headers: headers
  //       });
  //       const json = await response?.json();
  //       console.log(json);
  //       setdata(json);
  //       setRowCount(json[0]?.totalRows);
  //       console.log(json[0]?.totalRows);
  //     } catch (error) {
  //       setIsError(true);
  //       console.error(error);
  //       return;
  //     }
  //     setIsError(false);
  //     setIsLoading(false);
  //     setIsRefetching(false);
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   // columnFilters,
  //   // globalFilter,
  //   pagination?.pageIndex,
  //   pagination?.pageSize,
  //   // sorting,
  // ]);


  const [columns, setColumns] = useState([

    {
      accessorKey: "regionName",
      header: "Region",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "branchName",
      header: "Branch",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // grow: false
      //  minSize: "90%"
    },
    // {
    //     accessorKey: "serviceEngineer",
    //     header: "Service Engineer",
    //     size: "50",
    //     // grow: false
    //     //  minSize: "90%"
    //   },
      {
        accessorKey: "ascName",
        header: "ASC Name",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
             <div className='hyperLink text-center' onClick={(e)=>{
                  fetchClaimDetails(cell.row.original.ascCode);
                  
                  handleModalShow(cell)
            }}>
              {cell.row.original.ascName?  cell.row.original.ascName: ""}
  
              </div>
             
            </>
          )
        }
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalCallClosed",
        header: "Total Call Closed",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalNoOfClaim",
        header: "Total No. of Claim",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "toBeApprovedClaimsEIC",
        header: "To be approved Claims(ASM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "approvedClaimsEIC",
        header: "Approved Claims (ASM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "rejectedClaimsEIC",
        header: "Rejected Claims (ASM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "toBeApprovedClaimsRSM",
        header: "To be approved Claims (RSM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "approvedClaimsRSM",
        header: "Approved Claims (RSM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "rejectedClaimsRSM",
        header: "Rejected Claims (RSM)",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalApprovedClaim",
        header: "Total approved claim",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalClaimPendingForIBNGeneration",
        header: "Total Material Claim pending for IBN generation",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalClaimIBNGenerated",
        header: "Total Material Claim where IBN is generated",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      
      
      
    // {
    //   accessorKey: "isActive",
    //   header: "Actions",
    //   size: "50",
    //   // grow: false,
    //   // maxSize: "10",
    //   Cell: ({ cell }) => {
    //     let data = cell.getValue()
    //     // console.log(cell.row.original);
    //     return (
    //       <>
    //         <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
    //           {
    //             cell.row.original.isActive == false ? "" :
    //               Permissions?.isEdit ? <Tooltip arrow placement="left" title="View ASC claim list">
    //                 <Button variant=''
    //                                 // disabled={table.getPrePaginationRowModel().rows.length === 0}
    //                                 onClick={() =>{
    //                                   fetchClaimDetails(cell.row.original.ascCode);
    //                                 // handleExportRows(
    //                                 //     table.getPrePaginationRowModel().rows,
    //                                 //     customHeaders,
    //                                 //     [
    //                                 //     "activityId", "isActive",
    //                                 //     "divisionCode",
    //                                 //     "productLineCode",
    //                                 //     "activityTypeId"

    //                                 //     ]
    //                                 // )
    //                                 handleModalShow(cell)

    //                               }
    //                                 }
    //                             >
    //                               <FaEye color="blue" fontSize={20} />
    //                                 {/* <LiaDownloadSolid fontSize={25} />  */}
    //                             </Button>
    //               </Tooltip> : ""
    //           }
    //           {/* {
    //             cell.row.original.isActive == false ? "" :
    //               <Tooltip arrow placement="right" title="Delete">
    //                 <IconButton
    //                   color="error"
    //                   onClick={() => {
    //                     setroleID(cell.row.original.roleId)
    //                     setisActive(cell.row.original.isActive)
    //                     handleShowDel()
    //                   }}


    //                 >
    //                   <HiOutlineTrash color='red' />
    //                 </IconButton>
    //               </Tooltip>
    //           } */}


    //           {/* {
    //             cell.row.original.isActive === false ? (
    //               // Render a different icon when isActive is false
    //               Permissions?.isDelete ? <Tooltip>
    //                 <IconButton className="user-btn" onClick={() => {
    //                   console.log(cell.row.original.activityId);
    //                   setactiveID(cell.row.original.activityId);
    //                   cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
    //                 }}>


    //                   <FaUserXmark

    //                     style={{ color: 'red' }} // Style for the new icon

    //                   />

    //                 </IconButton>
    //               </Tooltip> : ""
    //             ) : (
    //               Permissions?.isDelete ? <Tooltip>
    //                 <IconButton className="user-btn" onClick={() => {
    //                   console.log(cell.row.original.activityId);
    //                   setactiveID(cell.row.original.activityId);
    //                   cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
    //                 }}>


    //                   <FaUserCheck

    //                     style={{ color: 'blue' }}

    //                   />
    //                 </IconButton>
    //               </Tooltip> : ""
    //             )
    //           } */}


    //           {/* <Switch checked={data === true} onClick={(e) => {
    //             console.log(cell.row.original?.stStatusId);
    //             setactiveID(cell.row.original?.stStatusId)
    //             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
    //           }} /> */}

    //         </Box>

    //       </>
    //     )
    //   }
    // }
  ]);

  const [ClaimDetailsData, setClaimDetailsData] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelectionChange = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
    // return selectedRowIds;
  };
  const [showModal2, setShowModal2] = useState(false);

  const handleModalShow2 = (cell) => {
    // AllDivision()
    // fetchActivityType();
    // const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${cell.row.original.divisionCode}`;

    // fetch(getAllProductLines, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })
    //     .then((res) => res.json())
    //     .then((result) => {
    //         console.log(result);
    //         setallproductLines(result);
    //     })
    setShowModal2(true);
  };
  const [addRateMaster, setaddRateMaster] = useState({
    // activityID: '',
    // divisionCode: '',
    // productLineCode: '',
    // serviceGroupId: '',
    // rewindingGroupId: '',
    // isMinor: false

    claimRateId: 0,
    activityTypeId: 0,
    productDivCode: "",
    productLineCode: "",
    isMinor: false,
    serviceGroupId: 0,
    rewindingGroupId: 0,
    isActive: true,
    claimRateDetails: []



});

const handleRemoveClick = index => {
  const list = [...activityList];
  list.splice(index, 1);
  setactivityList(list);
  console.log(index);
  console.log(list);
};


  const [allDivisions, setallDivisions] = useState([]);
    const [allproductLines, setallproductLines] = useState([])
    const [activityType, setActivityType] = useState([])
  const AllDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Asc/GetUserWiseDivision?UserCode=${asc}`;
    fetch(getAllDivisions, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setASCwiseDivisions(result)
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
  const handleShow = () => {
    setShow(true)
    AllDivision()
    fetchActivityType();
    setaddActivity({
      activityId:0,
      divisionCode:"0",
      divisionName:"",
      productLineCode:"0",
      productLineName:"",
      activityTypeId:'0',
      activityTypeName:"",
      activityName:"",
      isActive: true
    });
    setactivityList([]);
}

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








  const [filteredDivision, setfilteredDivision] = useState("")
  const [filteredRegion, setfilteredRegion] = useState("")
  const [filteredWarrantyStatus, setfilteredWarrantyStatus] = useState("")
  const [filteredAscCode, setfilteredAscCode] = useState("")
  const [filteredMonth, setfilteredMonth] = useState("")
  const [filteredToDate, setfilteredToDate] = useState("")
  const [ASCwiseDivisions, setASCwiseDivisions] = useState([])
  const [ASCwiseProductLines, setASCwiseProductLines] = useState([])

  const fetchAllClaims = () => {
    const fetchdata = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllASCServiceRequestClaimInfo`;

    fetch(fetchdata, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata(result)
      })
  }


  useEffect(() => {
    fetchAllClaims()
  }, [])










  const [addActivity, setaddActivity] = useState({
    activityId:0,
    divisionCode:"",
    divisionName:"",
    productLineCode:"",
    productLineName:"",
    activityTypeId:0,
    activityTypeName:"",
    activityName:"",
    isActive: true
  });

  const [editActivity, setEditActivity] = useState({
    activityId:0,
    divisionCode:"",
    divisionName:"",
    productLineCode:"",
    productLineName:"",
    activityTypeId:0,
    activityTypeName:"",
    activityName:"",
    isActive: true
  });

  const handleAddClick = (e)=>{
    let addedData = {...addActivity};
    addedData.activityName = addedData.activityName.trim();
    if(addActivity.divisionCode =='0'){
      Swal.fire({
        icon: "error",
        title: "Select the Product Division Code"
    });
    return;
    }
    if(addActivity.productLineCode == '0'){
      Swal.fire({
        icon: "error",
        title: "Select the Product Line Code"
    });
    return;
    }
    if(addActivity.activityTypeId == '0'){
      Swal.fire({
        icon: "error",
        title: "Select the Type of Activity"
    });
    return;
    }
    if(addedData.activityName == ""){
      Swal.fire({
        icon: "error",
        title: "Activity Name is Required."
    });
    return;
    }
    let filterSameActivity = activityList.filter((obj)=>{
      return (obj.activityTypeId == addedData.activityTypeId && 
        obj.divisionCode == addedData.divisionCode && 
        obj.productLineCode == addedData.productLineCode &&  
        obj.activityName == addedData.activityName)
    });
   if(filterSameActivity.length >0){
    Swal.fire({
      icon: "error",
      title: "Activity of given scope is already added."
  });
  return;
   }
    setactivityList([...activityList, addedData]);
    let UpdateAddedData = {...addedData};
    UpdateAddedData.activityName = ""
    setaddActivity(UpdateAddedData);
  };
  const handleChange = (e) => {
    const newdata = { ...addActivity };
    newdata[e.target.name] = e.target.value;
    setaddActivity(newdata);
    console.log(newdata);
  }

  const [editStatusName, seteditStatusName] = useState({
    stStatusId: 0,
    stStatusName: "",
    // remarks: "",
    isActive: true

  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editStatusName };
    newdata[e.target.name] = e.target.value;
    seteditStatusName(newdata);
    console.log(newdata);
  }


  const [stStatusId, setstStatusId] = useState("")

  const getSingleBranch = `${process.env.REACT_APP_API_URL}Division/GetDivisionById?stStatusId=${stStatusId}`;

  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...activityList];
    list[index][name] = value;
    setactivityList(list);
    console.log(list);
};
  const handleModalClose = () => {
    setShowModal(false)
    // fetch(getSingleBranch, {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);

    //     seteditStatusName((pre) => {
    //       return {
    //         ...pre,
    //         stStatusId: result?.stStatusId,
    //         stStatusName: result?.stStatusName,
    //       }
    //     })
    //   })


  }


  const handleOnSearch1 = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  

  


  const customHeaders =    {
    ticketNo: "Service Request Number",
    ticketCreateDate: "Ticket Creation Date",
    claimNo: "Claim No.",
    claimGenerationDate:"Claim Generation Date",
    partnerName:"Partner Name",
    productCode:"Product",
    type:"Type",
    activityName:"Activity",
    parameter:"Parameter",
    possibleValue:"Possible Value",
    qty:"Qty.",
    asmStatus: "ASM Status",
    rsmStatus: "RSM Status",
    asmApprovedRemarks: "ASM Approved Remarks",
    rsmApprovedRemarks: "RSM Approved Remarks",
    rate: "Rate",
    totalAmount:"Total Amount (INR)",
    claimRemarksByASC:"Claim Remark by ASC",
    invoiceNo:"Invoice No.",
    ticketClosedDate:"Ticket Closure Date",
    ticketAge:"Ticket Age (Days)",
    claimStatus:"Claim Status",
    actionTakenBy:"Action Taken By",
    rsmClaimApprovedDate:"RSM Claim Approval Date",
    eicClaimApprovalDate:"ASM Claim Approval Date",
    claimDeletedOnDate:"Claim Deleted on Date",
    challan:"Challan No. (Date)",
    challanStatus:"Challan Status",
    ibn:"IBN No",
    ibnGenerationOn:"IBN Generation Date",
  }

  


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>



            <p className='pg-label m-0'>Manage Claim</p>


          </div>
          <hr />
          <Row >

<Col md={2}>
    <Form.Group>
        <Form.Label>Division </Form.Label>
        <Form.Select value={filteredDivision} onChange={(e) => {

            setfilteredDivision(e.target.value)
            setfilteredProductLine("")

            fetch(`${process.env.REACT_APP_API_URL}Asc/GetUserDivisionWiseProductLine?DivisionCode=${e.target.value}&UserCode=${asc}`, {
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
              ASCwiseDivisions?.map((divs, index) => {
                  return (
                      <>
                          <option key={index} value={divs?.divisionCode}>{divs?.divisionName}</option>
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
                            <option value={prodline?.productLineCode}>{prodline?.productLineName}</option>
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
        <Form.Label> Service Ticket type</Form.Label>
        {/* type (Warranty / OOW / AMC etc) */}
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
{ RoleName != "Au5" &&
<Col md={2}>
    <Form.Group>
        <Form.Label> ASC</Form.Label>
        <Form.Select value={filteredAscCode} onChange={(e) => {
            setfilteredAscCode(e.target.value)
        }}>
            <option value=''>Select</option>
            {
              ascList?.map((obj, i) => {
                  return (
                      <>
                          <option key={i} value={obj?.ascCode}>{obj?.name}</option>
                      </>
                  )
              })
          }


        </Form.Select>
    </Form.Group>

</Col>
}

<Col md={2} style={{
    whiteSpace: 'nowrap'
}}>
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

</Row>
<Row >
<Col md={3}>
    <div className='gap-2 d-flex mt-2'>
        <Button
            variant=""
            className="add-Btn"
            onClick={(e) => {
                

                
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


                setfilteredDivision("")
                setfilteredProductLine("")
                    setfilteredWarrantyStatus("")
                    setfilteredAscCode("")
                    setfilteredMonth("")
                    fetchAllClaims();
            }}

        >
            Reset
        </Button>
    </div>
</Col>

</Row>

          {
            Permissions?.isView ?

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
                //                   console.log(cell.row.original.stStatusId);
                //                   setstStatusId(cell.row.original.stStatusId)
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
                //                   setstStatusId(cell.row.original.stStatusId)
                //                   console.log(cell.row.original.stStatusId)
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
                // onColumnFiltersChange={setColumnFilters}
                // onGlobalFilterChange={setGlobalFilter}
                // onPaginationChange={setPagination}
                // onSortingChange={setSorting}
                // rowCount={rowCount}
                // state={
                //   {
                //     columnFilters,
                //     globalFilter,
                //     isLoading,
                //     pagination,
                //     showAlertBanner: isError,
                //     showProgressBars: isRefetching,
                //     sorting,
                //   }
                // }

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
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            customHeaders,
                            [
                              "activityId", "isActive",
                              "divisionCode",
                              "productLineCode",
                              "activityTypeId"

                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button> : ""} */}
                      {/* <Button variant=''
                      disabled={table.getPrePaginationRowModel().rows.length === 0}
                      onClick={() =>
                        handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                      }
  
                    >
                      <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />
  
  
                    </Button> */}
                    </div>
                  </>

                )}


                positionActionsColumn="first"



              /> : ""
          }




<Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Add New Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                loading ? (<Loader />) : (

                                    <><Row>
                                      <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Product Division Code<span className='req-t'>*</span></Form.Label>
                                                <Form.Select
                                                    name='divisionCode'
                                                    onChange={(e) => {
                                                        if(e.target.value != "0"){
                                                        let divisionName = allDivisions.filter(obj => obj.parameterTypeId == e.target.value);
                                                        setaddActivity((pre) => {
                                                            return {
                                                                ...pre,
                                                                divisionCode: e.target.value,
                                                                divisionName : divisionName[0].parameterType
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
                                                                let plCode = result.filter(obj => obj.parameterTypeId == addActivity.productLineCode)
                                                                if(plCode.length == 0){
                                                                  setaddActivity((pre) => {
                                                                    return {
                                                                        ...pre,
                                                                        productLineCode: '0',
                                                                        productLineName:""

                                                                    }
                                                                  })
                                                                }
                                                                
                                                            })
                                                          }
                                                          else{
                                                            setaddActivity((pre) => {
                                                              return {
                                                                  ...pre,
                                                                  divisionCode: '0',
                                                                  productLineCode: '0',
                                                                  divisionName : "",
                                                                  productLineName:""
                                                                  
                                                              }
                                                          })
                                                          }

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
                                                    value={addActivity.productLineCode}
                                                    onChange={(e) => {
                                                      if(e.target.value != "0"){
                                                        let productLineName = allproductLines.filter(obj=> obj.parameterTypeId == e.target.value);  
                                                        setaddActivity((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    productLineCode: e.target.value,
                                                                    productLineName:productLineName[0].parameterType
                                                                }
                                                            })
                                                      }
                                                      else{
                                                        setaddActivity((pre) => {
                                                            return {
                                                                ...pre,
                                                                productLineCode: '0',
                                                                productLineName: ""
                                                            }
                                                        })
                                                      }


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
                                                <Form.Select aria-label="Default select example" name='activityTypeId' value={addActivity.activityTypeId} 
                                                onChange={(e)=>{
                                                  if(e.target.value != "0"){
                                                  let activityTypeName = activityType.filter(obj=> obj.parameterValId == e.target.value);  
                                                  setaddActivity((pre) => {
                                                    return {
                                                        ...pre,
                                                        activityTypeId: e.target.value,
                                                        activityTypeName: activityTypeName[0].parameterText
                                                    }
                                                })
                                              }
                                                else{
                                                  setaddActivity((pre) => {
                                                    return {
                                                        ...pre,
                                                        activityTypeId: "0",
                                                        activityTypeName: ""
                                                    }
                                                })
                                                }
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
                                      <Col md={4}>
                                        <Form.Group>
                                          <Form.Label>Activity Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                          <Form.Control
                                            type="text"
                                            name='activityName'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                             value={addActivity.activityName}
                                            onChange={handleChange}
                                            placeholder='Enter Activity Name'
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={4}>
                                      <Button variant="" className="" style={{ color: "white", backgroundColor: "blue",marginTop:'27px' }} 
                                      //  disabled={activityList.some(item => !!item.error)} // Disable button if any field has an error
                                             onClick={handleAddClick}
                                            ><FaPlus />
                                        </Button>
                                      </Col>
                                        





                                    </Row><Row>
                                            
                                            

                                          
                                        </Row>
                                        <div style={{
                                                maxHeight: '200px', // Set the maximum height for the table container
                                                overflowY: 'auto', // Enable vertical scrolling
                                                scrollBehavior: 'smooth', // Smooth scrolling
                                            }}>
                                          <Table responsive bordered className='mt-3'>
                                              <thead>
                                                  <tr>
                                                      <th>#</th>
                                                      {/* <th>Parameter Type</th> */}
                                                      {/* <th>Claim Type </th> */}
                                                      
                                                      <th>Product Division Code <span className='req-t'>*</span></th>
                                                      <th>Product Line Code <span className='req-t'>*</span></th>
                                                      <th>Type of Activity <span className='req-t'>*</span></th>
                                                      <th>Activity Name <span className='req-t'>*</span></th>
                                                      <th>Actions</th>

                                                  </tr>
                                              </thead>
                                              <tbody>


                                                  {activityList.map((obj, i) => {
                                                      return (
                                                          <>
                                                              <tr key={i} >
                                                                  <td>{i+1}</td>
                                                                  

                                                                  <td>
                                                                  {obj.divisionName}
                                                                  </td>
                                                                  <td>
                                                                      {/* <Form.Group>
                                                                          <Form.Control
                                                                              type="text"
                                                                              name='paraDetail'
                                                                              value={x.paraDetail}
                                                                              onChange={(e) => handleInputChange(e, i)}
                                                                              placeholder=''
                                                                          />
                                                                      </Form.Group> */}
                                                                      {obj.productLineName}
                                                                  </td>
                                                                  <td>
                                                                      {/* <Form.Group>
                                                                          <Form.Control
                                                                              type="text"
                                                                              name='paraValue'
                                                                              value={x.paraValue}
                                                                              // onChange={(e) => handleNumberInput(e, i)}
                                                                              placeholder=''
                                                                              className='text-xxl-end'
                                                                          />
                                                                      </Form.Group>
                                                                      {x.error && <span style={{ color: 'red' }}>{x.error}</span>} */}

                                                                        {obj.activityTypeName}
                                                                  </td>
                                                                  

                                                                  <td>
                                                                  {obj.activityName}
                                                                  </td>
                                                                  



                                                                  <td>
                                                                      <button
                                                                          className="mr10"
                                                                          style={{ color: "red", backgroundColor: "transparent", border: "1px solid red", borderRadius: "3px" }}
                                                                          onClick={() => handleRemoveClick(i)}
                                                                          ><FaMinus /></button>
                                                                  </td>

                                                              </tr>








                                                          </>
                                                      )

                                                  })}


                                              </tbody>
                                          </Table>
                                        </div>




                                    </>
                                )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="" className='add-Btn' disabled={activityList.length == 0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const upsertActivityUrl = `${process.env.REACT_APP_API_URL}Activity/UpsertActivity`;
                                    //let n={};







                                   
                                        (async () => {
                                            try {
                                                setLoading(true)
                                                const response = await fetch(upsertActivityUrl, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": `Bearer ${token}`
                                                    },
                                                    body: JSON.stringify(activityList)
                                                });

                                                if (response.status === 200) {
                                                    const responseData = await response.text();
                                                    if (responseData === "BREXISTS") {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Activity already exists!"
                                                        });
                                                    } else {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "Save successfully!"
                                                        })
                                                        handleClose()
                                                        fetchAllClaims();
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
                                                    title: "Please fill all the fields marked with red *"
                                                });
                                                setLoading(false)

                                            }
                                        })();
                                    


                                }
                                }
                            >
                                Save
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Claim details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                loading ? (<Loader />) : (

                                    <><Row>
                                        <div style={{
                                                maxHeight: '450px', // Set the maximum height for the table container
                                                overflowY: 'auto', // Enable vertical scrolling
                                                scrollBehavior: 'smooth', // Smooth scrolling
                                            }}>
                                      <MaterialReactTable
                            columns={ClaimDetailscolumns}
                            data={ClaimDetailsData}
                            // state={{ rowSelection: selectedRows }}
                            // enableRowSelection= {true}
                            // onRowSelectionChange={handleRowSelectionChange}
                            // getRowId={(originalRow) => originalRow.uniqueId}
                            initialState={{ showColumnFilters: false }} //show filters by default
                            state={{ isLoading }}
                            muiTableHeadCellFilterTextFieldProps={{
                            sx: { m: "0.5rem 0", width: "100%" },
                            variant: "outlined",
                            }}
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
                            //                   console.log(cell.row.original.stStatusId);
                            //                   setstStatusId(cell.row.original.stStatusId)
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
                            //                   setstStatusId(cell.row.original.stStatusId)
                            //                   console.log(cell.row.original.stStatusId)
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
                            // onColumnFiltersChange={setColumnFilters}
                            // onGlobalFilterChange={setGlobalFilter}
                            // onPaginationChange={setPagination}
                            // onSortingChange={setSorting}
                            // rowCount={rowCount}
                            // state={
                            //   {
                            //     columnFilters,
                            //     globalFilter,
                            //     isLoading,
                            //     pagination,
                            //     showAlertBanner: isError,
                            //     showProgressBars: isRefetching,
                            //     sorting,
                            //   }
                            // }

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
                                        "serviceTicketClaimId",
                                        "serviceTicketId"
                                          
                                        ]
                                    )
                                    }
                                >
                                    <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                                </Button> : ""}
                                {/* <Button variant=''
                                disabled={table.getPrePaginationRowModel().rows.length === 0}
                                onClick={() =>
                                    handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                                }
            
                                >
                                <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />
            
            
                                </Button> */}
                                </div>
                            </>

                            )}
                            // renderBottomToolbarCustomActions={({table}) => (
                            //   <>
                            //      <Button
                            //   onClick={() => {
                            //     const rowSelection = table.getState().rowSelection; //read state
                            //     const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
                            //     console.log("selected rows");
                            //     console.log(selectedRows)
                            //   }}
                            // >
                            //   Download Selected Users
                            // </Button>
                            //   </>
                            // )}


                            positionActionsColumn="first"



                        />
                        </div>
                                      
                                        





                    </Row>
                    <Row>
                                            
                                            

                                          
                                        </Row>



                                    </>
                                )}
                        </Modal.Body>
                        <Modal.Footer>
                            
                            {/* <Button variant="" className='add-Btn' disabled={activityList.some(item => !!item.error)}
                                onClick={(e) => {
                                    
                                    const selectedRowsData = Object.keys(selectedRows).map((id,index) => {
                                      console.log(id)
                                      return (ClaimDetailsData[id])
                                    }
                                      
                                    );
                                    console.log('Selected Rows Data:', selectedRowsData);

                                    console.log('Selected Rows Data:', selectedRows);



                                }
                                }
                            >
                                Approve
                            </Button>
                            <Button variant="" className='add-Btn' disabled={activityList.some(item => !!item.error)}
                                onClick={(e) => {
                                    // e.preventDefault();
                                    // const upsertActivityUrl = `${process.env.REACT_APP_API_URL}Activity/UpsertActivity`;
                                    // //let n={};
                                    // let EditeddData = {...editActivity};
                                    // EditeddData.activityName = EditeddData.activityName.trim();
                                    // if(EditeddData.divisionCode == '0'){
                                    //   Swal.fire({
                                    //     icon: "error",
                                    //     title: "Select the Product Division Code"
                                    // });
                                    // return;
                                    // }
                                    // if(EditeddData.productLineCode == '0'){
                                    //   Swal.fire({
                                    //     icon: "error",
                                    //     title: "Select the Product Line Code"
                                    // });
                                    // return;
                                    // }
                                    // if(EditeddData.activityTypeId == '0'){
                                    //   Swal.fire({
                                    //     icon: "error",
                                    //     title: "Select the Type of Activity"
                                    // });
                                    // return;
                                    // }
                                    // if(EditeddData.activityName == ""){
                                    //   Swal.fire({
                                    //     icon: "error",
                                    //     title: "Activity Name is Required."
                                    // });
                                    // return;
                                    // }






                                   
                                    //     (async () => {
                                    //         try {
                                    //             setLoading(true)
                                    //             const response = await fetch(upsertActivityUrl, {
                                    //                 method: "POST",
                                    //                 headers: {
                                    //                     "Content-Type": "application/json",
                                    //                     "Authorization": `Bearer ${token}`
                                    //                 },
                                    //                 body: JSON.stringify([EditeddData])
                                    //             });

                                    //             if (response.status === 200) {
                                    //                 const responseData = await response.text();
                                    //                 if (responseData === "BREXISTS") {
                                    //                     Swal.fire({
                                    //                         icon: "warning",
                                    //                         title: "Activity already exists!"
                                    //                     });
                                    //                 } else {
                                    //                     Swal.fire({
                                    //                         icon: "success",
                                    //                         title: "Updated successfully!"
                                    //                     })
                                    //                     handleModalClose()
                                    //                     fetchAllClaims();
                                    //                     setLoading(false)



                                    //                 }
                                    //             }

                                    //             else {
                                    //                 const errorData = await response.json();
                                    //                 if (errorData && errorData.title === "One or more validation errors occurred.") {
                                    //                     // Construct error message from the error object
                                    //                     let errorMessage = "";
                                    //                     for (const key in errorData.errors) {
                                    //                         errorMessage += `${errorData.errors[key][0]}\n`;
                                    //                         Swal.fire({
                                    //                             icon: "error",
                                    //                             title: errorMessage
                                    //                         });
                                    //                     }
                                    //                 }
                                    //                 else {
                                    //                     throw new Error(`HTTP error! Status: ${response.status}`);
                                    //                 }
                                    //                 setLoading(false)

                                    //             }




                                    //         } catch (error) {
                                    //             console.error('Error:', error);
                                    //             Swal.fire({
                                    //                 icon: "error",
                                    //                 title: "Please fill all the fields marked with red *"
                                    //             });
                                    //             setLoading(false)

                                    //         }
                                    //     })();
                                    handleModalShow2();


                                }
                                }
                            >
                                Reject
                            </Button> */}
                            <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    

{/* <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Edit Activity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                loading ? (<Loader />) : (

                                    <><Row>
                                      <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Product Division Code<span className='req-t'>*</span></Form.Label>
                                                <Form.Select
                                                    name='divisionCode'
                                                    value={editActivity.divisionCode}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        if(e.target.value != "0"){
                                                            setEditActivity((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    divisionCode: e.target.value,
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
                                                                    let plCode = result.filter(obj => obj.parameterTypeId == editActivity.productLineCode)
                                                                    if(plCode.length == 0){
                                                                      setEditActivity((pre) => {
                                                                        return {
                                                                            ...pre,
                                                                            productLineCode: "0",
                                                                        }
                                                                      })
                                                                    }
                                                                })
                                                        }
                                                        else{
                                                          setEditActivity((pre) => {
                                                            return {
                                                                ...pre,
                                                                divisionCode: "0",
                                                                productLineCode: "0"
                                                            }
                                                        })
                                                        }

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
                                                    value={editActivity.productLineCode}
                                                    onChange={(e) => {
                                                      if(e.target.value != "0"){
                                                        setEditActivity((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    productLineCode: e.target.value,
                                                                }
                                                            })
                                                      }
                                                        else{
                                                          setEditActivity((pre) => {
                                                            return {
                                                                ...pre,
                                                                productLineCode: "0"
                                                            }
                                                        })
                                                        }


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
                                                <Form.Select aria-label="Default select example" name='activityTypeId' 
                                                value={editActivity.activityTypeId} 
                                                onChange={(e)=>{
                                                  if(e.target.value != "0"){
                                                      setEditActivity((pre) => {
                                                        return {
                                                            ...pre,
                                                            activityTypeId: e.target.value,
                                                        }

                                                      
                                                  })
                                                  }
                                                  else{
                                                    setEditActivity((pre) => {
                                                      return {
                                                          ...pre,
                                                          activityTypeId: "0",
                                                      }
                                                  })
                                                  }
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
                                      <Col md={4}>
                                        <Form.Group>
                                          <Form.Label>Activity Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                          <Form.Control
                                            type="text"
                                             autocomplete="new-password"
                                            autoComplete='off'
                                            name='activityName'
                                            value={editActivity.activityName}
                                            onChange={(e)=>{
                                              setEditActivity((pre) => {
                                                return {
                                                    ...pre,
                                                    activityName: e.target.value,
                                                }
                                            })
                                            }}
                                            placeholder='Enter Activity Name'
                                          />
                                        </Form.Group>
                                      </Col>
                                      
                                        





                                    </Row><Row>
                                            
                                            

                                          
                                        </Row>



                                    </>
                                )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                                Close
                            </Button>
                            <Button variant="" className='add-Btn' disabled={activityList.some(item => !!item.error)}
                                onClick={(e) => {
                                    // e.preventDefault();
                                    const upsertActivityUrl = `${process.env.REACT_APP_API_URL}Activity/UpsertActivity`;
                                    //let n={};
                                    let EditeddData = {...editActivity};
                                    EditeddData.activityName = EditeddData.activityName.trim();
                                    if(EditeddData.divisionCode == '0'){
                                      Swal.fire({
                                        icon: "error",
                                        title: "Select the Product Division Code"
                                    });
                                    return;
                                    }
                                    if(EditeddData.productLineCode == '0'){
                                      Swal.fire({
                                        icon: "error",
                                        title: "Select the Product Line Code"
                                    });
                                    return;
                                    }
                                    if(EditeddData.activityTypeId == '0'){
                                      Swal.fire({
                                        icon: "error",
                                        title: "Select the Type of Activity"
                                    });
                                    return;
                                    }
                                    if(EditeddData.activityName == ""){
                                      Swal.fire({
                                        icon: "error",
                                        title: "Activity Name is Required."
                                    });
                                    return;
                                    }






                                   
                                        (async () => {
                                            try {
                                                setLoading(true)
                                                const response = await fetch(upsertActivityUrl, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": `Bearer ${token}`
                                                    },
                                                    body: JSON.stringify([EditeddData])
                                                });

                                                if (response.status === 200) {
                                                    const responseData = await response.text();
                                                    if (responseData === "BREXISTS") {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Activity already exists!"
                                                        });
                                                    } else {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "Updated successfully!"
                                                        })
                                                        handleModalClose()
                                                        fetchAllClaims();
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
                                                    title: "Please fill all the fields marked with red *"
                                                });
                                                setLoading(false)

                                            }
                                        })();
                                    


                                }
                                }
                            >
                                Update
                            </Button>

                        </Modal.Footer>
                    </Modal> */}

                   


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Division?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Division/DeleteDivision?stStatusId=${stStatusId}&isActive=${0}`;

                fetch(deleteBranchUrl, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },

                })
                  .then((res) => {
                    // res.json()
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);
                      if (res.status == 200) {
                        Swal.fire({
                          icon: "success",
                          title: "Deleted successfully!"
                        })
                        handleCloseDel()
                        fetchAllClaims()

                      }
                      else {
                        Swal.fire({
                          icon: "error",
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







          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Activity?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}Activity/DeleteActivity?activityId=${activeID}&isActive=${1}`;





                fetch(deleteDivisionUrl, {
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
                        fetchAllClaims()

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
              <Modal.Title className='mdl-title'>De-activate Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Activity?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}Activity/DeleteActivity?activityId=${activeID}&isActive=${0}`;





                fetch(deleteDivisionUrl, {
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
                      fetchAllClaims()

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
                    //     fetchAllClaims()

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
    </>
  )
}

export default ViewClaimApprovalASM;