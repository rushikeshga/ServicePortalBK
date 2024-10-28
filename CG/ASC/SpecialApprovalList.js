import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import { handleExportRows } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaFileCsv, FaRegEdit } from "react-icons/fa";
import { FaMinus, FaPlus, FaUserXmark, } from "react-icons/fa6";


import Swal from 'sweetalert2';

import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import Loader from '../../loader';
import { useNavigate } from 'react-router-dom';
import { usePathName } from '../../../constants';
import moment from 'moment';
import { Descriptions } from 'antd';

function SpecialApprovalList() {
  const pathName = usePathName();
  let approvalRemarks = useRef("");
  let Justication = useRef("");
   let AmountRef = useRef("");
  const Username = localStorage.getItem("UserName");
  let showActionCol;

  let RoleName = localStorage.getItem("RoleName");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [activityList, setactivityList] = useState([]);
  const [editASMAmount, setEditASMAmount] = useState()
  const [Amount, setAmount] = useState("")
  // const [approvalRemarks, setApprovalRemarks] = useState("")
  const [approvalServiceTicketId, setApprovaltServiceTicketId] = useState("")
  const [SpecialApprovalId, setSpecialApprovalId] = useState("")
  const [data, setdata] = useState([])
  // const [divisionName, setDivisionName] = useState('');
  // const [ticketTime, setTicketTime] = useState('');
  // const [remarks, setRemarks] = useState('');
  const [filteredDivision, setfilteredDivision] = useState("")
  const [filteredWarrantyStatus, setfilteredWarrantyStatus] = useState("")
  const [filteredAscCode, setfilteredAscCode] = useState("")
  const [filteredMonth, setfilteredMonth] = useState("")
  const [filterFromDate, setfilterFromDate] = useState("");
  const [filterToDate, setfilterToDate] = useState("");
  const [filterSerNumber, setFilterredSerNumber] = useState("");
  // const [filteredToDate, setfilteredToDate] = useState("")
  const [ASCwiseProductLines, setASCwiseProductLines] = useState([])
    const [updateRSMRequest, setUpdateRSMRequest] = useState({})
  const handleClaimStatus = (e)=>{
    setFilteredClaimStatus(e.target.value)
    if(e.target.value == ""){
      setfilteraASMApproved("")
      setfilterASMRejected("")
      setfilterRSMApproved("")
      setfilterRSMRejected("")
      setfilterAcceptRejection("")
      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
    }
    else if(e.target.value == "ASM Approved"){
      setfilterASMRejected("")
      setfilterRSMApproved("")
      setfilterRSMRejected("")
      setfilterAcceptRejection("")
      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
      setfilteraASMApproved("1")
    }
    else if(e.target.value == "ASM Rejected"){
      setfilteraASMApproved("")

      setfilterRSMApproved("")
      setfilterRSMRejected("")
      setfilterAcceptRejection("")
      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
      setfilterASMRejected("0")
    }
    else if(e.target.value == "RSM Approved"){
      setfilteraASMApproved("")
      setfilterASMRejected("")

      setfilterRSMRejected("")
      setfilterAcceptRejection("")
      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
      setfilterRSMApproved("1")
    }
    else if(e.target.value == "RSM Rejected"){
      setfilteraASMApproved("")
      setfilterASMRejected("")
      setfilterRSMApproved("")

      setfilterAcceptRejection("")
      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
      setfilterRSMRejected("0")
    }
    else if(e.target.value == "Accept Rejection"){
      setfilteraASMApproved("")
      setfilterASMRejected("")
      setfilterRSMApproved("")
      setfilterRSMRejected("")

      setfilterASMUnapproved("")
      setfilterRSMUnapproved("")
      setfilterAcceptRejection("1")
    }
    else if(e.target.value == "ASM UnApproved"){
      setfilteraASMApproved("")
      setfilterASMRejected("")
      setfilterRSMApproved("")
      setfilterRSMRejected("")
      setfilterAcceptRejection("")

      setfilterRSMUnapproved("")
      setfilterASMUnapproved("1")
    }
    else if(e.target.value == "RSM UnApproved"){
      setfilteraASMApproved("")
      setfilterASMRejected("")
      setfilterRSMApproved("")
      setfilterRSMRejected("")
      setfilterAcceptRejection("")
      setfilterASMUnapproved("")

      setfilterRSMUnapproved("1")
    }
  }
  const [ascList, setAscList] = useState([]);
  const handleSelection = (row) => (RoleName == "Au5" && (row.original.asmStatus == "Rejected" || row.original.rsmStatus == "Rejected")) || row.original.status == "Unapproved"
  
  if (RoleName == "Au5") {
    showActionCol = true
  }
  else {
      showActionCol = false
  }

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
const [claimParameter, setClaimParameter] = useState("")
const [selectedRows, setSelectedRows] = useState([]);
const [updateClaim, setupdateClaim] = useState("")
const handleRowSelectionChange = (selectedRowIds) => {
  setSelectedRows(selectedRowIds);
  // return selectedRowIds;
};
const handleRowSelectionChangeOuter = (selectedRowIds) => {
  setSelectedRowsOuter(selectedRowIds);
  // return selectedRowIds;
};
const [handleAttachmentShow, sethandleAttachmentShow] = useState(false);
const [handleInfoShow, sethandleInfoShow] = useState(false);
const handleCloseInfo= ()=> sethandleInfoShow(false);
const [infodata, setInfodata] = useState([])

const handleUpsertClaimHistory = (claimStatus, remarks, serviceTicketId, ApprovalId, amtBefore, amtAfter) =>{
  let currentDate = new Date();
  let MonthDate = currentDate.toISOString().split('T')[0];
  
  //  let claimStatus = "Approved by RSM"
    
    let historyMap = [{
        "claimApprovalHistoryId": 0,
        "serviceTicketId":parseInt(serviceTicketId),
        "specialApprovalId":parseInt(ApprovalId),
        "claimStatus": claimStatus,
        "approvedBy": asc,
        "approvedOn": MonthDate,
        "amountBefore": amtBefore,
        "amountAfter":  amtAfter,
        "remarks": remarks
      }
    ]
   
    
    let historyClaimUrl = `${process.env.REACT_APP_API_URL}ClaimApprovalHistory/UpsertSpecialApprovalHistory`;

    fetch(historyClaimUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(historyMap)
    })
    .then((res) => {
      let resp = res.text()
      resp.then((r) => {
        console.log(r);
        if (res.status != 200) {
          Swal.fire({
            icon: "warning",
            title: "Something went wrong!"
          })
      
        }
        
      })
    })
}
const handleShowInfo= (cell)=> {
  const getAllInfoListURL = `${process.env.REACT_APP_API_URL}ClaimApprovalHistory/GetAllSpecialApprovalHistory?specialApprovalId=${cell.row.original.specialApprovalId}`;
  setInfodata([])
    fetch(getAllInfoListURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if(result?.Key == 500){
                Swal.fire({
                  icon: "error",
                  title: result?.Message
              })
              return
            }
            setInfodata(result);
        })
  sethandleInfoShow(true);

}

const [AttachmentList, setAttachmentList] = useState([]);
const handleCloseAttachment= ()=> sethandleAttachmentShow(false);
const handleDownnloadClick = index => {
  try{

  
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
        const fileNameWithExt = res.url.slice(lastUnderscoreIndex+1);
        // const extension = res.url.slice(lastDotIndex + 1);//to get ext
        
        console.log("File Name:", fileNameWithExt);
        // console.log("Extension:", extension);
    //    console.log(ext);
      let resp = res.blob()
      resp.then((r) => {
        console.log(r);
        if (r instanceof Blob) {
            handleDownload(r,fileNameWithExt);
          } else {
            // Handle non-Blob responses
            console.error('Response is not a Blob');
          }

      })
            // sethandleAttachmentShow(true);
            // setAttachmentList(result);
        })

  }
  catch(e){
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Oops Something went wrong!",
    });
  }
};
const [isClaimDetail, setisClaimDetail] = useState("")

const handleDownload = (blob,fileNameWithExt) => {
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

const handleAttachment = (cell) => {
  const getAllAttachmentList = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllSpecialApprovalClaimAttachmentList?specialApprovalId=${cell.row.original.specialApprovalId}`;

    fetch(getAllAttachmentList, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if(result?.Key == 500){
                Swal.fire({
                  icon: "error",
                  title: result?.Message
              })
              return
            }
            sethandleAttachmentShow(true);
            setAttachmentList(result);
        })
  
  // setShowModal(true);
};

  const handleModalShow = (cell) => {
   
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
  const handleCloseDel = () => setShowDel(false);
  let token = localStorage.getItem("UserToken");
  const [claimServceTicketNo, setClaimServceTicketNo] = useState("");
  const [claimProductCode, setClaimProductCode] = useState("")
  const [resetAmount, setResetAmount] = useState("")


  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const [showIsActive, setIsActive] = useState(false);
  const [showUpdateClaim, setShowUpdateClaim] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleCloseUpdateClaim = () => setShowUpdateClaim(false);
  const handleShowIsActive = () => setIsActive(true);
  const handleShowUpdateClaim = () => setShowUpdateClaim(true);

  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [activeID, setactiveID] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [selectedRows, setSelectedRowss] = useState({});



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

  const [a, seta] = useState("");
  
  useEffect(() => {
    console.log("selectedRows after render/update:");
    console.log(selectedRows);
  }, [selectedRows]);

  
  const handleCheckboxChange = (cell) => {
    const index = cell.index; // Assuming index is the unique key

    // Update selectedRows state immutably
    const updatedSelectedRows = {
      ...selectedRows,
      [index]: !selectedRows[index], // Toggle selection
    };
  
    console.log("Updated selectedRows:");
    console.log(updatedSelectedRows);
    setClaimDetailsData((pre) => {
      let updateData = [...pre];
      for(let i=0;i<updateData.length;i++){
        let obj = updateData[i];
        if(obj.issueTypeId == cell.row.original.issueTypeId){
          obj.isChecked = !cell.row.original?.isChecked;
          break;
        }
      }
      return updateData;
    });
    // Set the updated state
    // setSelectedRowss(updatedSelectedRows);
    
    //  setClaimDetailsData((preData=>{

    //  })ClaimDetailsData)
    // console.log(selectedRows)

    
  };
  const columns = useMemo(
    ()=>[
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
    //               Permissions?.isEdit ? <Tooltip arrow placement="left" title="Details">
    //                 <IconButton
    //                   className="edit-btn"
    //                   onClick={() => {
    //                     fetchClaimDetails(cell.row.original.serviceTicketId, false);
    //                     setApprovaltServiceTicketId(cell.row.original.serviceTicketId);
    //                     setareMultipleTickets(false)
    //                     setSelectedRows([]);
                        
    //                     // setEditascClaim((pre)=>{
    //                     //   return {
    //                     //   ...pre,
    //                     //   activityId: cell.row.original.activityId,
    //                     //   activityType: cell.row.original.activityType,
    //                     //   divisionCode: cell.row.original.divisionCode,
    //                     //   productLineCode: cell.row.original.productLineCode,
    //                     //   activityTypeId: cell.row.original.activityTypeId,
    //                     //   activityName: cell.row.original.activityName}
    //                     // })
             
    //                     handleModalShow(cell)
    //                     // SapDivision()

    //                   }}

    //                 >
    //                   <FaRegEdit color='#005bab' />
    //                 </IconButton>
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


    //           {/* {RoleName != 'Au5' &&
    //              (
    //               // Render a different icon when isActive is false
                  
    //               <Tooltip>
    //                 <IconButton className="user-btn" onClick={() => {
    //                   console.log(cell.row.original.serviceTicketId);
    //                   setApprovaltServiceTicketId(cell.row.original.serviceTicketId);
    //                   // setApprovalRemarks("")
    //                   // approvalRemarks.current.value = '';
    //                   setisClaimDetail("")
    //                   handleShowIsActive();
    //                 }}>


    //                   <FaUserCheck

    //                     style={{ color: 'blue' }} // Style for the new icon

    //                   />

    //                 </IconButton>
    //               </Tooltip> 
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
    // },
    {
        accessorKey: "isActive",
        header: "Actions",
        size: "50",
        // grow: false,
        // maxSize: "10",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
              <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
                {/* {
                  cell.row.original.isActive == false ? "" :
                    Permissions?.isEdit ? <Tooltip arrow placement="left" title="Details">
                      <IconButton
                        className="edit-btn"
                        onClick={() => {
                          fetchClaimDetails(cell.row.original.serviceTicketId, false);
                          setApprovaltServiceTicketId(cell.row.original.serviceTicketId);
                          setareMultipleTickets(false)
                          setSelectedRows([]);
                          
                          // setEditascClaim((pre)=>{
                          //   return {
                          //   ...pre,
                          //   activityId: cell.row.original.activityId,
                          //   activityType: cell.row.original.activityType,
                          //   divisionCode: cell.row.original.divisionCode,
                          //   productLineCode: cell.row.original.productLineCode,
                          //   activityTypeId: cell.row.original.activityTypeId,
                          //   activityName: cell.row.original.activityName}
                          // })
               
                          handleModalShow(cell)
                          // SapDivision()
  
                        }}
  
                      >
                        <FaRegEdit color='#005bab' />
                      </IconButton>
                    </Tooltip> : ""
                } */}
                
  
  
                {
                  // (RoleName == 'RS9' || (RoleName == 'AS8' && cell.row.original.rsmStatus == "Rejected By RSM")) &&
                   (
                    // Render a different icon when isActive is false
                    
                    <Tooltip>
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.serviceTicketId);
                        setApprovaltServiceTicketId(cell.row.original.serviceTicketId);
                        setSpecialApprovalId(cell.row.original.specialApprovalId)
                        // setApprovalRemarks("")
                        // approvalRemarks.current.value = '';
                        setisClaimDetail("")
                        if(RoleName == 'AS8'){
                          setUpdateRSMRequest((pre)=>{
                              return {
                              ...pre,
                              Description: cell.row.original.remarks,
                              Amount: cell.row.original.claimAmount,
                              asmName:cell.row.original.createdBy,
                              ascName:cell.row.original.ascName,
                              branchName:cell.row.original.branchName,
                              
                            }
                            })
                          setAmount(cell.row.original.claimAmount)
                          setResetAmount(cell.row.original.claimAmount)
                          handleShowUpdateClaim();
                      }
                      else{
                            setUpdateRSMRequest((pre)=>{
                                return {
                                ...pre,
                                Description: cell.row.original.remarks,
                                Amount: cell.row.original.claimAmount,
                                asmName:cell.row.original.createdBy,
                                ascName:cell.row.original.ascName,
                                branchName:cell.row.original.branchName,
                                
                              }
                              })
                            handleShowIsActive();
                        }
                        
                      }}>
  
  
  <FaRegEdit color='#005bab' />
  
                      </IconButton>
                    </Tooltip> 
                  ) 
                }
  
  
                {/* <Switch checked={data === true} onClick={(e) => {
                  console.log(cell.row.original?.stStatusId);
                  setactiveID(cell.row.original?.stStatusId)
                  cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
                }} /> */}
  
              </Box>
  
            </>
          )
        }
      },
    {
      accessorKey: "serviceTicketNo",
      header: "Ticket Number",
      size: "50",
      Cell: ({ cell }) => (
        <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
      ),
      // Cell: ({ cell }) => {
      //   let data = cell.getValue()
      //   // console.log(cell.row.original);
      //   return (
      //     <>
      //      <div className='hyperLink' onClick={(e)=>{
      //           localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
      //           // navigate(`${pathName}/assign-request`);
      //           // localStorage.setItem('ticketInfoLabelST', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)

      //           localStorage.setItem("acknowledgementType", cell.row.original?.acknowledgmentStatusName)
      //           localStorage.setItem("requestDate", cell.row.original?.requestDate?.split(" ")[0])
      //           localStorage.setItem('TicketInfoLabel', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)


      //           // localStorage.setItem("ViewEditRequest", cell.row.original?.serviceTicketId)
      //           // navigate(`${pathName}/assign-request`);
      //           // console.log("pathName");
      //           // console.log(pathName);
      //            const packageJson = require('../../../../package.json');
                
      //           navigate(`${packageJson?.homepage}/New-assign-req-int`);
      //           // localStorage.setItem('ticketInfoLabelST', cell.row.original?.defectDesc + "/" + cell.row.original?.serviceTicketNumber)
      //           // localStorage.setItem("acknowledgementType",cell.row.original?.acknowledgmentStatusName)
    
      //     }}>
      //       {cell.row.original.serviceTicketNumber?.split(" ")[0] ? cell.row.original.serviceTicketNumber?.split(" ")[0]: ""}

      //       </div>
           
      //     </>
      //   )
      // }
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
        accessorKey: "approvalStatus",
        header: "Status",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        
      },
      {
        accessorKey: "approvalRemarks",
        header: "Remarks",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        
      },
    // {

    //   accessorKey: "type",
    //   header: "Complaint Type",
    //   size: "50",
    //   Cell: ({ cell }) => (
    //     <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
    //   ),
    //   // grow: false
    //   //  minSize: "90%"
    // },
  
//     {
//       accessorKey: "activityName",
//       header: "Activity",
//       size: "50",
//       Cell: ({ cell }) => (
//         <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
//       ),
// //       Cell: ({ cell }) => {
// //       let data = cell.getValue()
// //       // console.log(cell.row.original);
// //       return (
// //         <>
// // {
// //             moment((cell.row.original.ticketCreateDate?.trim()?.split(" ")[0])).format("DD-MM-YYYY")
// //             // cell.row.original.ticketCreateDate?.split(" ")[0] ? cell.row.original.ticketCreateDate?.split(" ")[0]: ""
// //             }           
// //         </>
// //       )
// //     }
    
//     },
//     {
//       accessorKey: "parameter",
//       header: "Parameter",
//       size: "50",
//       Cell: ({ cell }) => (
//         <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
//       ),
//       // grow: false
//       //  minSize: "90%"
//     },
//     {
//       accessorKey: "possibleValue",
//       header: "Possible value",
//       size: "50",
//       Cell: ({ cell }) => (
//         <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
//       ),
//       // grow: false
//       //  minSize: "90%"
//     },
//     {
//       accessorKey: "qty",
//       header: "Quantity",
//       size: "50",
//       Cell: ({ cell }) => (
//         <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
//       ),
//       // Cell: ({ cell }) => {
//       //   let data = cell.getValue()
//       //   // console.log(cell.row.original);
//       //   return (
//       //     <>
//       //       <div className='hyperLink' onClick={(e)=>{
//       //         console.log("hello")
//       //       }}>
//       //         hello
//       //       </div>
//       //     </>
//       //   )
//       //   return (
//       //     <>
//       //       <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
//       //         {
//       //           cell.row.original.isActive == false ? "" :
//       //             Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
//       //               <IconButton
//       //                 className="edit-btn"
//       //                 onClick={() => {
//       //                   console.log(cell.row.original.stStatusId);
//       //                   fetchClaimDetails();
//       //                   setEditascClaim((pre)=>{
//       //                     return {
//       //                     ...pre,
//       //                     activityId: cell.row.original.activityId,
//       //                     activityType: cell.row.original.activityType,
//       //                     divisionCode: cell.row.original.divisionCode,
//       //                     productLineCode: cell.row.original.productLineCode,
//       //                     activityTypeId: cell.row.original.activityTypeId,
//       //                     activityName: cell.row.original.activityName}
//       //                   })
             
//       //                   handleModalShow(cell)
//       //                   // SapDivision()

//       //                 }}

//       //               >
//       //                 <FaRegEdit color='#005bab' />
//       //               </IconButton>
//       //             </Tooltip> : ""
//       //         }
//       //         {/* {
//       //           cell.row.original.isActive == false ? "" :
//       //             <Tooltip arrow placement="right" title="Delete">
//       //               <IconButton
//       //                 color="error"
//       //                 onClick={() => {
//       //                   setroleID(cell.row.original.roleId)
//       //                   setisActive(cell.row.original.isActive)
//       //                   handleShowDel()
//       //                 }}


//       //               >
//       //                 <HiOutlineTrash color='red' />
//       //               </IconButton>
//       //             </Tooltip>
//       //         } */}


//       //         {
//       //           cell.row.original.isActive === false ? (
//       //             // Render a different icon when isActive is false
//       //             Permissions?.isDelete ? <Tooltip>
//       //               <IconButton className="user-btn" onClick={() => {
//       //                 console.log(cell.row.original.activityId);
//       //                 setactiveID(cell.row.original.activityId);
//       //                 cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
//       //               }}>


//       //                 <FaUserXmark

//       //                   style={{ color: 'red' }} // Style for the new icon

//       //                 />

//       //               </IconButton>
//       //             </Tooltip> : ""
//       //           ) : (
//       //             Permissions?.isDelete ? <Tooltip>
//       //               <IconButton className="user-btn" onClick={() => {
//       //                 console.log(cell.row.original.activityId);
//       //                 setactiveID(cell.row.original.activityId);
//       //                 cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
//       //               }}>


//       //                 <FaUserCheck

//       //                   style={{ color: 'blue' }}

//       //                 />
//       //               </IconButton>
//       //             </Tooltip> : ""
//       //           )
//       //         }


//       //         {/* <Switch checked={data === true} onClick={(e) => {
//       //           console.log(cell.row.original?.stStatusId);
//       //           setactiveID(cell.row.original?.stStatusId)
//       //           cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
//       //         }} /> */}

//       //       </Box>

//       //     </>
//       //   )
//       // }
//       // grow: false
//       //  minSize: "90%"
//     },
    
      
      
{
    accessorKey: "createdBy",
    header: "ASM Name",
    size: "50",
    Cell: ({ cell }) => (
      <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
    ),
    // grow: false
    //  minSize: "90%"
  },
  {
    accessorKey: "ascName",
    header: "ASC Name",
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
      
      {
        accessorKey: "remarks",
        header: "Description",
        size: "300",
        Cell: ({ cell }) => (
          <p className={`text-left m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "claimAmount",
        header: "Approval Amount",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-right m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
    
    
      // {
      //   accessorKey: "asmResubmitRemarks",
      //   header: "ASM Remarks",
      //   size: "50",
      //   Cell: ({ cell }) => (
      //     <p className={`text-left m-0`}>{cell.getValue()?.toLocaleString()}</p>
      //   ),
      //   // grow: false
      //   //  minSize: "90%"
      // },
      {
        accessorKey: "approvalRemarks",
        header: "Approval Remarks",
        size: "50",
        Cell: ({ cell }) => (
          <p className={`text-left m-0`}>{cell.getValue()?.toLocaleString()}</p>
        ),
        // grow: false
        //  minSize: "90%"
      },
      
      {
        accessorKey: "info",
        header: "Info",
        
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
             <div className='hyperLink text-center m-0' onClick={(e)=>{
                  
                    handleShowInfo(cell)
                    // Amount.current = cell.row.original.totalAmount;
                  
                  
            }}>
              info
  
              </div>
             
            </>
          )
        }
        // grow: false
        //  minSize: "90%"
      },
      // {
      //   accessorKey: "rsmApprovalRemarks",
      //   header: "RSM Remarks",
      //   size: "50",
      //   Cell: ({ cell }) => (
      //     <p className={`text-left m-0`}>{cell.getValue()?.toLocaleString()}</p>
      //   ),
      //   // grow: false
      //   //  minSize: "90%"
      // },
      {
        accessorKey: "attachmentCount",
        header: "Attachment",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
            
             <div className='hyperLink text-center m-0' onClick={(e)=>{
                  
                  handleAttachment(cell);
                 
            }}>
              {/* {cell.row.original.attachment} */}
              {cell.getValue()?.toLocaleString()}
              </div>
             
            </>
          )
        }
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "specialApprovalCreatedOn",
        header: "Request Created Date",
        size: "50",
        Cell: ({ cell }) => {
            let data = cell.getValue()
            // console.log(cell.row.original);
            return (
              <>
                <p className={`text-center m-0`}>{
                  cell.row.original.specialApprovalCreatedOn ? moment((cell.row.original.specialApprovalCreatedOn?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
                }</p>
            
              </>
            )
          }
        // grow: false
        //  minSize: "90%"
      },
    //   {
    //     accessorKey: "info",
    //     header: "Info",
    //     size: "50",
    //     Cell: ({ cell }) => {
    //       let data = cell.getValue()
    //       // console.log(cell.row.original);
    //       return (
    //         <>
    //          <div className='hyperLink text-center m-0' onClick={(e)=>{
                  
                    
    //                 handleShowInfo(cell)
    //                 // Amount.current = cell.row.original.totalAmount;
                  
                  
    //         }}>
    //           info
  
    //           </div>
             
    //         </>
    //       )
    //     }
    //     // grow: false
    //     //  minSize: "90%"
    //   },
      // {
      //   accessorKey: "spare",
      //   header: "Spare",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "spareDesc",
      //   header: "Spare Description",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
    //   {
    //     accessorKey: "asmApprovedOn",
    //     header: "ASM Approved on",
    //     size: "50",
    //     Cell: ({ cell }) => {
    //             let data = cell.getValue()
    //             // console.log(cell.row.original);
    //             return (
    //               <>
    //                 <p className={`text-center m-0`}>{
    //                   cell.row.original.asmApprovedOn ? moment((cell.row.original.asmApprovedOn?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
    //                 }</p>
                
    //               </>
    //             )
    //           }
    //   },
      // {
      //   accessorKey: "activityName19",
      //   header: "Action",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
    //   {
    //     accessorKey: "rsmApprovedOn",
    //     header: "RSM Approved on",
    //     size: "50",
    //     Cell: ({ cell }) => {
    //       let data = cell.getValue()
    //       // console.log(cell.row.original);
    //       return (
    //         <>
    //                 <p className={`text-center m-0`}>{
    //                   cell.row.original.rsmApprovedOn ? moment((cell.row.original.rsmApprovedOn?.trim()?.split(" ")[0])).format("DD-MM-YYYY") : ""
    //                 }</p>
                
    //               </>
    //       )
    //     }
    //     // grow: false
    //     //  minSize: "90%"
    //   },
    //   {
    //     accessorKey: "ibn",
    //     header: "IBN No.",
    //     size: "50",
    //     Cell: ({ cell }) => (
    //       <p className={`text-center m-0`}>{cell.getValue()?.toLocaleString()}</p>
    //     ),
    //     // grow: false
    //     //  minSize: "90%"
    //   },
      // {
      //   accessorKey: "ibn",
      //   header: "Repetitive Complaint",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
     
    
  ]);
  const [showEditClaim, setshowEditClaim] = useState(true)

  const [showASCclaimWindow, setshowASCclaimWindow] = useState(false);
  useEffect(()=>{
    // AmountRef.current = parseInt(Amount)
  },[showEditClaim])
  const handleModalASCClaimShow = () =>{
    setupdateClaim("")
    setshowASCclaimWindow(true);
  }
  const handleModalASCClaimClose = () =>{
    setshowASCclaimWindow(false);
  }
  const [showASMEditWindow, setshowASMEditWindow] = useState(false);
  const handleModalASMEditShow = () =>{
    // setupdateClaim("")
    setshowASMEditWindow(true);
  }
  const handleModalASMEditClose = () =>{
    setupdateClaim("")
    setshowASMEditWindow(false);
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
      accessorKey: "claimNo",
      header: "Claim No.",
      size: "50",
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "claimTicketNumber",
      header: "Claim Ticket Number",
      size: "50",
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "productCode",
      header: "Product",
      size: "50",
      // grow: false
      //  minSize: "90%"
    },
      {
        accessorKey: "type",
        header: "Complaint Type",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      
      {
        accessorKey: "activityName",
        header: "Activity",
        size: "200",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "parameter",
        header: "Parameter",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "possibleValue",
        header: "Possible Value",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "qty",
        header: "Qty.",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount (INR)",
        size: "50",
        // Cell: ({ cell }) => {
        //   let data = cell.getValue()
        //   // console.log(cell.row.original);
        //   return (
        //     <>
        //      <div className={((RoleName == 'Au5' && (cell.row.original.rsmStatus == "Rejected" || cell.row.original.asmStatus == "Rejected")) || 
        //                 (RoleName == 'AS8' && ((cell.row.original.status == "Unapproved" ))))?'hyperLink':''} onClick={(e)=>{
        //           if(RoleName == 'Au5' && (cell.row.original.rsmStatus == "Rejected" || cell.row.original.asmStatus == "Rejected")){
        //             console.log(cell.row.original.stStatusId);
        //             setEditascClaim((pre)=>{
        //               return {
        //               ...pre,
        //               serviceTicketId: cell.row.original.serviceTicketId,
        //               serviceTicketClaimId: cell.row.original.serviceTicketClaimId,
        //               asmIsRejected: cell.row.original.asmStatus == "Rejected" ? true: false,
        //               rsmIsRejected: cell.row.original.rsmStatus == "Rejected" ? true: false
        //             }
        //             })
        //             Justication.current = "";

        //             handleModalASCClaimShow(cell)
        //             //  Amount.current.value = cell.row.original.totalAmount;
        //               setClaimParameter(cell.row.original.parameter)
        //              setAmount(cell.row.original.totalAmount)
        //           }
        //           if(RoleName == 'AS8' && (cell.row.original.status == "Unapproved" )){
        //             // console.log(cell.row.original.stStatusId);
        //             setEditASMAmount((pre)=>{
        //               return {
        //               ...pre,
        //               serviceTicketId: cell.row.original.serviceTicketId,
        //               serviceTicketClaimId: cell.row.original.serviceTicketClaimId,
        //               Amount: cell.row.original.totalAmount
        //             }
        //             })
        //             Justication.current = "";

        //             handleModalASMEditShow(cell)
        //             //  Amount.current.value = cell.row.original.totalAmount;
        //               setClaimParameter(cell.row.original.parameter)
        //              setAmount(cell.row.original.totalAmount)
        //           }
                  
        //     }}>
        //       {cell.row.original.totalAmount ? cell.row.original.totalAmount: ""}
  
        //       </div>
             
        //     </>
        //   )
        // }
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "claimRemarksByASC",
        header: "Claim Remarks By ASC",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "ascJustification",
        header: "Justification By ASC",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      
      // {
      //   accessorKey: "invoiceNo",
      //   header: "Invoice No.",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "invoiceAttachment",
      //   header: "Invoice Attachment",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      {
        accessorKey: "approvalStatus",
        header: "Status",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      // {
      //   accessorKey: "asmStatus",
      //   header: "ASM Status",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "rsmStatus",
      //   header: "RSM Status",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "rsmApprovedRemarks",
      //   header: "Remarks By RSM",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "asmApprovedRemarks",
      //   header: "Remarks By ASM",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      {
        accessorKey: "approvalRemarks",
        header: "Remarks",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "info",
        header: "Info",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
             <div className='hyperLink' onClick={(e)=>{
                  
                    // console.log(cell.row.original.stStatusId);
                    // setEditascClaim((pre)=>{
                    //   return {
                    //   ...pre,
                    //   serviceTicketId: cell.row.original.serviceTicketId,
                    //   serviceTicketClaimId: cell.row.original.serviceTicketClaimId,
                    //   asmIsRejected: cell.row.original.asmStatus == "Rejected" ? true: false,
                    //   rsmIsRejected: cell.row.original.rsmStatus == "Rejected" ? true: false,
                    //   // claimAmount: 600,
                    //   // ascJustification: ""
                    // }
                    // })
                    // Justication.current = "";
                    handleShowInfo(cell)
                    // Amount.current = cell.row.original.totalAmount;
                  
                  
            }}>
              info
  
              </div>
             
            </>
          )
        }
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "spare",
        header: "Spare",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "spareDesc",
        header: "Spare Desc",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      {
        accessorKey: "approvedOn",
        header: "Approved On",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          // console.log(cell.row.original);
          return (
            <>
              {
                moment((cell.row.original.approvedOn?.trim()?.split(" ")[0])).format("DD-MM-YYYY")

              
              }
             
            </>
          )
        }
        // grow: false
        //  minSize: "90%"
      },
      // {
      //   accessorKey: "challan",
      //   header: "Challan",
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
        header: "IBN",
        size: "50",
        // grow: false
        //  minSize: "90%"
      },
      // {
      //   accessorKey: "ibnGenerationOn",
      //   header: "IBN Generation On",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "actionTakenBy",
      //   header: "Action Taken By",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
      // {
      //   accessorKey: "claimSource",
      //   header: "ClaimSource",
      //   size: "50",
      //   // grow: false
      //   //  minSize: "90%"
      // },
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
    //             <Tooltip arrow placement="left" title="Edit">
    //                 <IconButton
    //                   className="edit-btn"
    //                   onClick={() => {
    //                     console.log(cell.row.original.stStatusId);
    //                     setEditascClaim((pre)=>{
    //                       return {
    //                       ...pre,
    //                       serviceTicketId: cell.row.original.serviceTicketId,
    //                       serviceTicketClaimId: cell.row.original.serviceTicketClaimId,
    //                       asmIsRejected: cell.row.original.asmStatus == "Rejected" ? true: false,
    //                       rsmIsRejected: cell.row.original.rsmStatus == "Rejected" ? true: false
    //                     }
    //                     })
             
    //                     handleModalASCClaimShow(cell)
    //                     // SapDivision()

    //                   }}

    //                 >
    //                   <FaRegEdit color='#005bab' />
    //                 </IconButton>
    //               </Tooltip> 
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
            setallDivisions(result)
        })

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
  AllDivision();
  getASCList();
},[])
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
const [ClaimDetailsData, setClaimDetailsData] = useState([])
const [areMultipleTickets, setareMultipleTickets] = useState(false)
const fetchClaimDetails = (serviceTicketId, areMultipleTickets) => {
  if (!ClaimDetailsData.length) {
    setIsLoading(true);
} else {
    setIsRefetching(true);
}
// if(areMultipleTickets == true){
//   setareMultipleTickets(true)
// }
// else{
//   setareMultipleTickets(false)
// }
    if(RoleName == 'Au5'){
      const fetchdata = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllASCServiceRequestClaimManageApproval?${areMultipleTickets==true ? `serviceTicketIds`:`serviceTicketId`}=${serviceTicketId}`;

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
          
          let filterResults = result.filter((obj)=>{
            return obj.isAcceptRejection == false
          })
          if(filterResults.length !=0){
            setClaimServceTicketNo(filterResults[0]?.claimTicketNumber +"/"+filterResults[0]?.productCode);
          }
          setIsLoading(false);
          setIsRefetching(false);
          setClaimDetailsData(filterResults)
          // setClaimProductCode();

          
        })
    }
    else{
      const fetchdata = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetAllServiceRequestClaimLineItems?${areMultipleTickets==true ? `serviceTicketIds`:`serviceTicketId`}=${serviceTicketId}`;

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
          if(result.length !=0){
            setClaimServceTicketNo(result[0]?.claimTicketNumber +"/"+result[0]?.productCode);
          }
         // setClaimProductCode();

          setIsLoading(false);
          setIsRefetching(false);
          setClaimDetailsData(result)
        })
    }
    
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







  const [disableAtions, setdisableActions] = useState(true);
  const [disableAtionsApprove, setdisableActionsApprove] = useState(true);
  const [disableView, setdisableView] = useState(false);

  const [selectedRowsOuter, setSelectedRowsOuter] = useState([]);

  useEffect(()=>{
    if(Object.keys(selectedRows).length == 0){
      
        setdisableActions(true);
        setdisableActionsApprove(true);
      
    }
    else{
      if(RoleName == "RS9"){
        console.log(ClaimDetailsData);
        let ClaimDetailsDatabyFilter = ClaimDetailsData.filter((obj)=>obj.status == "Rejected");
        console.log(ClaimDetailsDatabyFilter);
        if(ClaimDetailsDatabyFilter.length > 0){
          setdisableActionsApprove(true);
        }
        else{
          if(Object.keys(selectedRows).length == ClaimDetailsData.length){
            setdisableActionsApprove(false);
          }
          else{
            setdisableActionsApprove(true);
          }
        }
      }
      else{
        setdisableActionsApprove(false);
      }
      setdisableActions(false)
    }
  },[selectedRows])

  useEffect(()=>{
    if(Object.keys(selectedRowsOuter).length == 0){
      setdisableView(true)
    }
    else{
      setdisableView(false)
    }
  },[selectedRowsOuter])
  let asc = localStorage.getItem("UID")











  // ----------------------------------------



  








  const fetchAllClaims = async () => {



    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }
    let urlRoleWise;
    
    if(RoleName == "AS8"){
        urlRoleWise = 'ASMServiceTicketClaimApproval/GetAllASMSpecialApproval';
    }
   else{
      urlRoleWise = 'ASMServiceTicketClaimApproval/GetAllRSMSpecialApproval';
  }
    const url = new URL(

      `${process.env.REACT_APP_API_URL}${urlRoleWise}`,

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








  }
  useEffect(() => {
    fetchAllClaims()
  }, [
    pagination?.pageIndex,
    pagination?.pageSize,

  ])


const [filterAll, setfilterAll] = useState("")
const [filteraASMApproved, setfilteraASMApproved] = useState("")
const [filterASMRejected, setfilterASMRejected] = useState("")
const [filterRSMApproved, setfilterRSMApproved] = useState("")
const [filterRSMRejected, setfilterRSMRejected] = useState("")
const [filterAcceptRejection, setfilterAcceptRejection] = useState("")
const [filterASMUnapproved, setfilterASMUnapproved] = useState("")
const [filterRSMUnapproved, setfilterRSMUnapproved] = useState("")
const [filteredProductLine, setfilteredProductLine] = useState("")
const [filteredClaimStatus, setFilteredClaimStatus] = useState("")



  const [filterPagination, setFilterPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchFilterPagination = async () => {
   

    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    let urlRoleWise;
    
    if(RoleName == "AS8"){
        urlRoleWise = 'ASMServiceTicketClaimApproval/GetAllASMSpecialApproval';
    }
    else{
      urlRoleWise = 'ASMServiceTicketClaimApproval/GetAllRSMSpecialApproval';
    }
    const url = new URL(

      `${process.env.REACT_APP_API_URL}${urlRoleWise}`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
   
    if (filteraASMApproved) { url.searchParams.set('ASMIsApproved', `${filteraASMApproved}`) }
    if (filterASMRejected) { url.searchParams.set('ASMIsApproved', `${filterASMRejected}`) }
    if (filterRSMApproved) { url.searchParams.set('RSMIsApproved', `${filterRSMApproved}`) }
    if (filterRSMRejected) { url.searchParams.set('RSMIsApproved', `${filterRSMRejected}`) }
    if (filterAcceptRejection) { url.searchParams.set('IsAcceptRejection', `${filterAcceptRejection}`) }
    if (filterASMUnapproved) { url.searchParams.set('IsASMUnApproved', `${filterASMUnapproved}`) }
    if (filterRSMUnapproved) { url.searchParams.set('IsRSMUnApproved', `${filterRSMUnapproved}`) }
    if (filterSerNumber) { url.searchParams.set('ServiceTicketNo', `${filterSerNumber}`) }
    if (filteredAscCode) { url.searchParams.set('AscCode', `${filteredAscCode}`) }

    if (filteredDivision) { url.searchParams.set('DivCode', `${filteredDivision}`) }

    if (filteredProductLine) { url.searchParams.set('ProductLineCode', `${filteredProductLine}`) }

    if (filterFromDate) { url.searchParams.set('FromDate', `${filterFromDate}`) }
    if (filterToDate) { url.searchParams.set('ToDate', `${filterToDate}`) }
    

    

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    try {
      const response = await fetch(url.href, {
        headers: headers
      });
      const json = await response?.json();
      console.log(json);
      console.log(json[0]?.totalRows);
      setdata(json);
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

}, [filterPagination?.pageIndex, filterPagination?.pageSize])









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

  const [editAscClaim, setEditascClaim] = useState({
    "serviceTicketId": 0,
    "serviceTicketClaimId": 0,
    "asmIsRejected": true,
    "rsmIsRejected": true
  });

  
  

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
  const handleModalClose2 = () => {
    setShowModal2(false)
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
      divisionName: "Product Division Code",
      productLineName: "Product Line Code",
      activityType: "Type of Activity",
      activityName:"Activity Name"
  }

  


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>



            <p className='pg-label m-0'>Manage Special Approval</p>


          </div>
          <hr />

          <Row >

{/* <Col md={2}>
    <Form.Group>
        <Form.Label>Division </Form.Label>
        <Form.Select value={filteredDivision} onChange={(e) => {

            setfilteredDivision(e.target.value)
            // setfilteredRegion("")

            fetch(`${process.env.REACT_APP_API_URL}Asc/GetDivisionWiseProductLine?DivisionCode=${e.target.value}&UserCode=${asc}`, {
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
                allDivisions?.map((divs, index) => {
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

</Col> */}
{/* <Col md={2}>
    <Form.Group>
        <Form.Label>Ticket Created </Form.Label>
        <Form.Select>
            <option value=''>Select</option>
        </Form.Select>
    </Form.Group>

</Col> */}
{ RoleName != "Au5" &&
  <Col md={2}>
  <Form.Group>
      <Form.Label> ASC </Form.Label>
      {/* type (Warranty / OOW / AMC etc) */}
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


<Col md={2}>
  <Form.Group  controlId="exampleForm.ControlInput1">
    <Form.Label>From</Form.Label>
    <Form.Control type="date" value={filterFromDate} placeholder="" onChange={e => setfilterFromDate(e.target.value)} />
  </Form.Group>
</Col>
  <Col md={2}>
    <Form.Group  controlId="exampleForm.ControlInput1">
      <Form.Label>To</Form.Label>
      <Form.Control type="date" value={filterToDate} placeholder="" onChange={e => setfilterToDate(e.target.value)} />
    </Form.Group>
  </Col>

  <Col md={2}>
    <Form.Group>
        <Form.Label>Service Request Number </Form.Label>
        <Form.Control type="text"
        value={filterSerNumber}
        onChange={(e)=>setFilterredSerNumber(e.target.value)}  
        />
    </Form.Group>

</Col>
<Col md={3}>
    <div className='gap-2 d-flex mt-4'>
        <Button
            variant=""
            className="add-Btn"
            onClick={(e) => {
                // setShowSwitch(false);
                // setIsChecked(false);

                
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
                setfilteredAscCode("")

                setfilteraASMApproved("")
                setfilterASMRejected("")
                setfilterRSMApproved("")
                setfilterRSMRejected("")
                setfilterAcceptRejection("")
                setfilterASMUnapproved("")
                setfilterRSMUnapproved("")

                setfilterFromDate("")
                setfilterToDate("")
                setFilterredSerNumber("")
                fetchAllClaims();
               
            }}

        >
            Reset
        </Button>
    </div>
</Col>

{/* <Col md={2}>
    <Form.Group>
        <Form.Label> To Date</Form.Label>
        <Form.Control type='date' value={filteredToDate} onChange={(e) => {
            setfilteredToDate(e.target.value)
        }} />
    </Form.Group>
</Col> */}
</Row>
<Row >


</Row>
          {/* <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }} className="m-1 p-3" >

<Row >

    <Col md={2}>
        <Form.Group>
            <Form.Label>Status </Form.Label>
            <Form.Select value={SetStatus} onChange={(e) => {

setSetStatus(e.target.value)
                // setfilteredRegion("")

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
                <option value='0'>Select</option>
             
            </Form.Select>
        </Form.Group>

    </Col>
    <Col md={3}>
        <div className='gap-2 d-flex mt-4 pt-2'>
            <Button
                variant=""
                className="add-Btn"
                onClick={(e) => {
                    // setShowSwitch(false);
                    // setIsChecked(false);

                    
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

                   

                    setSetStatus("")
                     fetchAllClaims();
                   
                }}

            >
                Reset
            </Button>
        </div>
    </Col>
   
</Row>

</Row> */}
          {
            

              <MaterialReactTable
                columns={columns}
                data={data}
                // positionToolbarAlertBanner= 'hide'
                initialState={{ showColumnFilters: false, "columnVisibility":{
                    createdBy : RoleName=="RS9"
                } }} //show filters by default
                muiTableHeadCellFilterTextFieldProps={{
                  sx: { m: "0.5rem 0", width: "100%" },
                  variant: "outlined",
                }}
                // state={{ rowSelection: selectedRowsOuter }}
                // enableRowSelection= {true}
                // onRowSelectionChange={handleRowSelectionChangeOuter}
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
                    pagination: filterPagination || pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting,
                  }
                }
                // muiToolbarAlertBannerProps={isError
                //   ? {
                //     color: 'error',
                //     children: 'Error loading data',
                //   }
                //   : undefined}
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

                      {/* { <Button variant='' className="add-Btn"
                        disabled={disableView}
                        onClick={() =>{
                          console.log(data);
                          let selectedServiceTicketIds= Object.keys(selectedRowsOuter).map((id,index) => {
                            console.log(id)
                            return data[id].serviceTicketId
                          }
                        );
                        console.log(selectedServiceTicketIds);
                          fetchClaimDetails(selectedServiceTicketIds.toString(), true);
                          setareMultipleTickets(true)
                          setApprovaltServiceTicketId(selectedServiceTicketIds.toString());
                          handleModalShow()
                          setSelectedRowsOuter([])
                        } 
                        }
                      >
                        View Details
                      </Button>} */}






      
              
                    </div>
                  </>

                )}


                positionActionsColumn="first"



              /> 
          }






                    

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
                            positionToolbarAlertBanner= 'hide'
                            state={{isLoading }}
                            // enableRowSelection= {RoleName== 'Au5' ? false: handleSelection}
                            //  enableRowSelection= {true}
                            // onRowSelectionChange={handleRowSelectionChange}
                            // getRowId={(originalRow) => originalRow.uniqueId}
                            initialState={{ showColumnFilters: false, "columnVisibility": { 
                              "status": !showActionCol, 
                              "ascJustification": !showActionCol,
                              "rsmApprovedRemarks":showActionCol,
                              "asmApprovedRemarks":showActionCol,
                              "asmStatus":showActionCol,
                              "rsmStatus":showActionCol,
                              "claimTicketNumber": areMultipleTickets,
                              "productCode": areMultipleTickets
                             } }} //show filters by default
                            muiTableHeadCellFilterTextFieldProps={{
                            sx: { m: "0.5rem 0", width: "100%" },
                            variant: "outlined",
                            }}
                            muiTableBodyRowProps={({ row }) => ({
                              sx: {
                                  backgroundColor: (row?.original?.isClaimResubmission) == true ? "#c4ffbd" :  ""
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
                                color: "rgb(0, 91, 171)",
                                fontSize: "200"
                                }}>

                               {areMultipleTickets? "": claimServceTicketNo}
                                
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
                            
                            
                            <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    


          







          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={handleAttachmentShow} onHide={handleCloseAttachment} backdrop="static" centered >
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Attachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Ticket Number: {AttachmentList[0]?.serviceTicketNumber}
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
                                                                       onClick={(e)=>{handleDownnloadClick(i)}}>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseAttachment}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
          <Modal show={handleInfoShow} onHide={handleCloseInfo} backdrop="static" centered size="xl">
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
              <Col >
              <div style={{
                                                maxHeight: '450px', // Set the maximum height for the table container
                                                overflowY: 'auto', // Enable vertical scrolling
                                                scrollBehavior: 'smooth', // Smooth scrolling
                                            }}>
                <Table responsive bordered className='mt-3'>
                                                  <thead className='docTable'>
                                                      <tr>
                                                          
                                                          {/* <th>Parameter Type</th> */}
                                                          {/* <th>Claim Type </th> */}
                                                          
                                                          <th className="small-font">Claim Number</th>
                                                          <th className="small-font">Quantity</th>
                                                          <th className="small-font">Amount Before</th>
                                                          <th className="small-font">Amount After</th>
                  
                                                          <th className="small-font">Activity</th>
                                                          <th className="small-font">ActivityOn</th>
                                                          <th className="small-font">Done By</th>
                                                          <th className="small-font">Remarks</th>
                                                          
                                                      </tr>
                                                  </thead>
                                                  <tbody>


                                                      {infodata.map((x, i) => {
                                                          return (
                                                              <>
                                                                  <tr key={i}>
                                                                      
                                                                      <td>
                                                                      <p className={`text-center m-0`}>{x?.claimNo?.toLocaleString()}</p>
                                                                      

                                                                      </td>

                                                                      
                                                                      <td>
                                                                      <p className={`text-center m-0`}>{x?.qty?.toLocaleString()}</p>

                                                                     


                                                                      </td>
                                                                      <td>
                                                                      <p className={`text-right m-0`}>{x?.claimAmountBefore?.toLocaleString()}</p>

                                                                     
                                                                    
                                                                      </td>
                                                                      <td>
                                                                      <p className={`text-right m-0`}>{x?.claimAmountAfter?.toLocaleString()}</p>

                                                                     


                                                                      </td>

                                                                      

                                                                      <td>
                                                                      <p className={`text-center m-0`}>{x?.activity?.toLocaleString()}</p>

                                                                     


                                                                      </td>
                                                                      <td>
                                                                      <p className={`text-center m-0`}>
                                                                      {x?.activityOn && moment(x?.activityOn.split(" ")[0]).format("DD-MM-YYYY")}
                                                                      </p>



                                                                      </td>
                                                                      <td>
                                                                      <p className={`text-center m-0`}>{x?.doneBy}</p>

                                                                      


                                                                      </td>
                                                                      <td>
                                                                      <p className={`text-center m-0`}>{x?.remarks}</p>

                                                                      


                                                                      </td>
                                                                      
                                                                      

                                                                      
                                                                      
                                                                      



                                                                      

                                                                  </tr>








                                                              </>
                                                          )

                                                      })}


                                                  </tbody>
                                              </Table>
                                      
                                            </div>
              </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseInfo}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>

          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Update Claim</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          ASM Name
                      </Form.Label>
                      <Form.Control 
                      readOnly
                      value = {updateRSMRequest?.asmName}
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          ASC Name
                      </Form.Label>
                      <Form.Control 
                      readOnly
                    //   ref={approvalRemarks}
                    value = {updateRSMRequest?.ascName}

                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Description
                      </Form.Label>
                      <Form.Control 
                      readOnly
                      value = {updateRSMRequest?.Description}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Approval Amount
                      </Form.Label>
                      <Form.Control 
                      value={updateRSMRequest?.Amount}
                      readOnly
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Branch
                      </Form.Label>
                      <Form.Control 
                      value={updateRSMRequest?.branchName}
                      readOnly
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
                </Row>
              <Row>
              <Col >
                  <Form.Group className="">
                      <Form.Label>
                          Remarks<span className="req-t">*</span>
                      </Form.Label>
                      <Form.Control as="textarea"
                      ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const ApproveClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateRSMSpecialApproval`;
                if(isClaimDetail == "")
                {
                    if(approvalRemarks.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Remarks"
                      })
                      return
                    }
                    let inputParam = {
                        "serviceTicketId": parseInt(approvalServiceTicketId),
                        "specialApprovalId": parseInt(SpecialApprovalId),
                        "approvalRemarks": approvalRemarks.current.value,
                        "isApproved": 1
                      }
                    

                    fetch(ApproveClaimUrl, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(inputParam)
                    })
                      .then((res) => {
                        let resp = res.text()
                        resp.then((r) => {
                          console.log(r);
                          if (res.status == 200) {
                            Swal.fire({
                              icon: "success",
                              title: "Approved successfully!"
                            })
                            handleCloseIsActive()
                            fetchAllClaims()
                            let HistoryStatus = "Approved"
                            handleUpsertClaimHistory(HistoryStatus,
                               approvalRemarks.current.value, 
                               approvalServiceTicketId, 
                               SpecialApprovalId,
                              updateRSMRequest?.Amount,
                              updateRSMRequest?.Amount
                            );
                            

                          }
                          else {
                            Swal.fire({
                              icon: "warning",
                              title: "Something went wrong!"
                            })

                          }
                        })
                      })
                }
                
                


              }}>
                {isClaimDetail == "Reject" ? "Reject":RoleName == "Au5"?"Reclaim":"Approve"}
              </Button>
              {isClaimDetail == "" && <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const ApproveClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateRSMSpecialApproval`;
                
                    if(approvalRemarks.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Remarks"
                      })
                      return
                    }
                    let inputParam = {
                        "serviceTicketId": parseInt(approvalServiceTicketId),
                        "specialApprovalId": parseInt(SpecialApprovalId),
                        "approvalRemarks": approvalRemarks.current.value,
                        "isApproved": 0
                      }
                    

                    fetch(ApproveClaimUrl, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(inputParam)
                    })
                      .then((res) => {
                        let resp = res.text()
                        resp.then((r) => {
                          console.log(r);
                          if (res.status == 200) {
                            Swal.fire({
                              icon: "success",
                              title: "Rejected successfully!"
                            })
                            handleCloseIsActive()
                            fetchAllClaims()
                            let HistoryStatus = "Rejected"
                            handleUpsertClaimHistory(HistoryStatus,
                              approvalRemarks.current.value, 
                              approvalServiceTicketId, 
                              SpecialApprovalId,
                             updateRSMRequest?.Amount,
                             updateRSMRequest?.Amount
                           );
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
                Reject
              </Button>}
            </Modal.Footer>
          </Modal>

          <Modal show={showUpdateClaim} onHide={handleCloseUpdateClaim} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Update Claim</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
               

              
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          ASC Name
                      </Form.Label>
                      <Form.Control 
                      readOnly
                    //   ref={approvalRemarks}
                    value = {updateRSMRequest?.ascName}

                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Description
                      </Form.Label>
                      <Form.Control 
                      readOnly
                      value = {updateRSMRequest?.Description}
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
              {/* <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Approval Amount
                      </Form.Label>
                      <Form.Control 
                      value={Amount}
                      readOnly
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            setAmount(e.target.value)
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col> */}
              <Col lg={6} md={6} sm={12}>
                  <Form.Group className="">
                      <Form.Label>
                          Branch
                      </Form.Label>
                      <Form.Control 
                      value={updateRSMRequest?.branchName}
                      readOnly
                    //   ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                            />
                  </Form.Group>

              </Col>
                </Row>
              <Row>
              <Col md={6}>
                <Form.Group>
                    <Form.Label> update Claim<span className="req-t">*</span></Form.Label>
                    {/* type (Warranty / OOW / AMC etc) */}
                    <Form.Select onChange={(e) => {
                        if(e.target.value == "Reclaim"){
                          setshowEditClaim(true);
                          // if(showDistanceField){
                          //   setEditASMAmount((pre)=>{
                          //       return {
                          //       ...pre,
                          //       // serviceTicketId: cell.row.original.serviceTicketId,
                          //       // serviceTicketClaimId: cell.row.original.serviceTicketClaimId,
                          //       // Amount: cell.row.original.totalAmount,
                          //       distance: cell.row.original.currentDistance
                          //     }
                          //   })
                          // }
                          
                        }
                        if(e.target.value == "Accept"){
                          setshowEditClaim(false);
                          
                          
                          setAmount(resetAmount)
                          
                           
                        //    Justication.current.value = "";
                        }
                        setupdateClaim(e.target.value)
                    }}>
                        <option value=''>Select</option>

                        <option value='Reclaim'>Re-Submit</option>
                        <option value='Accept'>Accept Rejection</option>
                        {/* <option value='Both'>Both</option> */}
                    </Form.Select>
                </Form.Group>

            </Col>
            <Col md={6}>
                      <Form.Group className="">
                        <Form.Label>
                            Amount<span className="req-t">*</span>
                        </Form.Label>
                        <Form.Control 
                        type='number'
                        // ref={AmountRef}
                        value = {Amount}
                        readOnly={!showEditClaim}
                        
                            onChange={(e)=>{
                              setAmount(e.target.value)
                              // approvalRemarks.current.value = e.target.value;
                              // setAmount(e.target.value)

                            }}
                            rows={2}  />
                    </Form.Group>
                  </Col>
              <Col >
                  <Form.Group className="">
                      <Form.Label>
                          Remarks<span className="req-t">*</span>
                      </Form.Label>
                      <Form.Control as="textarea"
                      ref={approvalRemarks}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseUpdateClaim}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                 e.preventDefault();
                 const ReSubmitClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateASMAcceptRejectionResubmission`;
                 console.log(updateClaim)
                 let currentDate = new Date();
                              let previousMonthDate = currentDate.toISOString().split('T')[0];
                            // previousMonthDate = moment(previousMonthDate).format("DD-MM-YYYY");
                             let claimStatus = "";
                 if(updateClaim == "Reclaim")
                 {
                   
                   
                     if(AmountRef.current.value == ""){
                       Swal.fire({
                         icon: "error",
                         title: "Please enter Amount"
                       })
                       return
                     }
                   
                   
                     
                     if(Justication.current.value == ""){
                       Swal.fire({
                         icon: "error",
                         title: "Please enter Remarks"
                       })
                       return
                     }
                     let inputParam = {
                        "isAccpetRejection": false,
                        "isClaimResubmission": true,
                        "specialApprovalId": parseInt(SpecialApprovalId),
                        "asmResubmitRemarks": approvalRemarks.current.value,
                        "claimAmount": Amount
                        
                       }
                     
 
                     fetch(ReSubmitClaimUrl, {
                       method: "POST",
                       headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json"
                       },
                       body: JSON.stringify(inputParam)
                     })
                       .then((res) => {
                         let resp = res.text()
                         resp.then((r) => {
                           console.log(r);
                           if (res.status == 200) {
                             Swal.fire({
                               icon: "success",
                               title: "Updated successfully!"
                             })
                             handleCloseUpdateClaim()
 
                             
                             handleModalASCClaimClose()
                             fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                             fetchAllClaims();
                             let HistoryStatus = "Re-Submitted"
                             handleUpsertClaimHistory(HistoryStatus,
                              approvalRemarks.current.value, 
                              approvalServiceTicketId, 
                              SpecialApprovalId,
                             resetAmount,
                             Amount
                           );
                           }
                           else {
                             Swal.fire({
                               icon: "warning",
                               title: "Something went wrong!"
                             })
 
                           }
                         })
                       })
                 }
                 else if(updateClaim == "Accept"){
                   const AcceptRejecttionClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateASMAcceptRejectionResubmission`;
                   if(Justication.current.value == ""){
                     Swal.fire({
                       icon: "error",
                       title: "Please enter Justication"
                     })
                     return
                   }
                   let inputParam = {
                    "isAccpetRejection": true,
                    "isClaimResubmission": false,
                    "specialApprovalId": parseInt(SpecialApprovalId),
                    "asmResubmitRemarks": approvalRemarks.current.value,
                    "claimAmount": Amount
                    
                   }
                   fetch(AcceptRejecttionClaimUrl, {
                     method: "POST",
                     headers: {
                       "Authorization": `Bearer ${token}`,
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify(inputParam)
                     
                   })
                     .then((res) => {
                       let resp = res.text()
                       resp.then((r) => {
                         console.log(r);
                         if (res.status == 200) {
                           Swal.fire({
                             icon: "success",
                             title: "Updated successfully!"
                           })
                           handleCloseUpdateClaim()
 
                           
                        //    let currentDate = new Date();
                        //    let previousMonthDate = currentDate.toISOString().split('T')[0];
                        //  // previousMonthDate = moment(previousMonthDate).format("DD-MM-YYYY");
                        //   let claimStatus = "";
                        //     claimStatus = "Accept Rejection"
                           
                           
                        //     let HistoryinputParam = [
                        //       {
                        //         "claimApprovalHistoryId": 0,
                        //         "serviceTicketId":parseInt(editAscClaim?.serviceTicketId),
                        //         "serviceTicketClaimId":parseInt(editAscClaim?.serviceTicketClaimId),
                        //         "claimStatus": claimStatus,
                        //         "approvedBy": asc,
                        //         "approvedOn": previousMonthDate,
                        //         "amountBefore":(parseInt(editAscClaim?.resetTotalAmount)).toFixed(2).toLocaleString(),
                        //          "amountAfter":(parseInt(editAscClaim?.resetTotalAmount)).toFixed(2).toLocaleString(),
                        //          "distanceBefore":(parseInt(editAscClaim?.resetdistance)).toFixed(2).toLocaleString() ,
                        //          "distanceAfter":(parseInt(editAscClaim?.resetdistance)).toFixed(2).toLocaleString(),
                        //          "remarks": Justication.current.value
                        //       }
                        //     ]
                        //     let historyClaimUrl = `${process.env.REACT_APP_API_URL}ClaimApprovalHistory/UpsertClaimApprovalHistory`;
 
                        //     fetch(historyClaimUrl, {
                        //       method: "POST",
                        //       headers: {
                        //         "Authorization": `Bearer ${token}`,
                        //         "Content-Type": "application/json"
                        //       },
                        //       body: JSON.stringify(HistoryinputParam)
                        //     })
                        //     .then((res) => {
                        //       let resp = res.text()
                        //       resp.then((r) => {
                        //         console.log(r);
                        //         if (res.status != 200) {
                        //           Swal.fire({
                        //             icon: "warning",
                        //             title: "Something went wrong!"
                        //           })
                              
                        //         }
                                
                        //       })
                        //     })
 
                           handleModalASCClaimClose()
                           fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                           fetchAllClaims()
                           let HistoryStatus = "Rejection accepted"
                           handleUpsertClaimHistory(HistoryStatus,
                            approvalRemarks.current.value, 
                            approvalServiceTicketId, 
                            SpecialApprovalId,
                           resetAmount,
                           updateRSMRequest?.Amount
                         );
                           // setSelectedRows([])
 
                         }
                         else {
                           Swal.fire({
                             icon: "warning",
                             title: "Something went wrong!"
                           })
 
                         }
                       })
                     })
                  
                 }
                 else if(updateClaim == ""){
                   Swal.fire({
                     icon: "error",
                     title: "Please select update claim"
                   })
                   return
 
                   
                                   
 
                 }
                
                


              }}>
                Submit
              </Button>
              
            </Modal.Footer>
          </Modal>

          <Modal show={showASCclaimWindow} onHide={handleModalASCClaimClose} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Update Claim</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
              <Col md={6}>
                <Form.Group>
                    <Form.Label> update Claim<span className="req-t">*</span></Form.Label>
                    {/* type (Warranty / OOW / AMC etc) */}
                    <Form.Select onChange={(e) => {
                        if(e.target.value == "Reclaim"){
                          setshowEditClaim(true);
                          AmountRef.current.value =Amount
                        }
                        if(e.target.value == "Accept"){
                          setshowEditClaim(false);
                           AmountRef.current.value = Amount;
                           Justication.current.value = "";
                        }
                        setupdateClaim(e.target.value)
                    }}>
                        <option value=''>Select</option>

                        <option value='Reclaim'>Re-Submit</option>
                        <option value='Accept'>Accept Rejection</option>
                        {/* <option value='Both'>Both</option> */}
                    </Form.Select>
                </Form.Group>

            </Col>
            {<Col >
                  <Form.Group className="">
                      <Form.Label>
                          Amount<span className="req-t">*</span>
                      </Form.Label>
                      <Form.Control 
                      type='number'
                       ref={AmountRef}
                      // value = {Amount}
                      readOnly={!showEditClaim}
                      afterRender = {(e)=>{
                        console.log("after render")
                      }}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                            // setAmount(e.target.value)

                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>}
            
              </Row>
              {
              <Row>
              <Col >
                  <Form.Group className="">
                      <Form.Label>
                          Justication<span className="req-t">*</span>
                      </Form.Label>
                      <Form.Control as="textarea"
                      ref={Justication}
                      // readOnly={!showEditClaim}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>
              <Col >
                  <Form.Group className="">
                      <Form.Label>
                          Parameter
                      </Form.Label>
                      <Form.Control as="textarea"
                      value={claimParameter}
                      readOnly={true}
                          onChange={(e)=>{
                            // setApprovalRemarks(e.target.value)
                            // approvalRemarks.current.value = e.target.value;
                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>
              
              </Row>} 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalASCClaimClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const ReSubmitClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateAscServiceTicketClaimReApproval`;
                console.log(updateClaim)
                if(updateClaim == "Reclaim")
                {
                    if(AmountRef.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Amount"
                      })
                      return
                    }
                    if(Justication.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Justication"
                      })
                      return
                    }
                    let inputParam = {
                        "serviceTicketId": parseInt(editAscClaim?.serviceTicketId),
                        "serviceTicketClaimId": parseInt(editAscClaim?.serviceTicketClaimId),
                        "ascJustification": Justication.current.value,
                        "asmIsRejected": editAscClaim?.asmIsRejected,
                        "rsmIsRejected": editAscClaim?.rsmIsRejected,
                        "claimAmount":AmountRef.current.value
                      }
                    

                    fetch(ReSubmitClaimUrl, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(inputParam)
                    })
                      .then((res) => {
                        let resp = res.text()
                        resp.then((r) => {
                          console.log(r);
                          if (res.status == 200) {
                            Swal.fire({
                              icon: "success",
                              title: "Updated successfully!"
                            })
                            handleModalASCClaimClose()
                            fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                            fetchAllClaims();
                          }
                          else {
                            Swal.fire({
                              icon: "warning",
                              title: "Something went wrong!"
                            })

                          }
                        })
                      })
                }
                else if(updateClaim == "Accept"){
                  const AcceptRejecttionClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateAscServiceTicketAcceptRejection?serviceTicketId=${editAscClaim?.serviceTicketId}&serviceTicketClaimId=${editAscClaim?.serviceTicketClaimId}&IsAcceptRejection=true`;

                  
                  fetch(AcceptRejecttionClaimUrl, {
                    method: "POST",
                    headers: {
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
                            title: "Updated successfully!"
                          })
                          handleModalASCClaimClose()
                          fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                          fetchAllClaims()
                          // setSelectedRows([])

                        }
                        else {
                          Swal.fire({
                            icon: "warning",
                            title: "Something went wrong!"
                          })

                        }
                      })
                    })
                 
                }
                else if(updateClaim == ""){
                  Swal.fire({
                    icon: "error",
                    title: "Please select update claim"
                  })
                  return

                  
                                  

                }
                


              }}>
               Update
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showASMEditWindow} onHide={handleModalASMEditClose} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Update Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
              
            {<Col lg={6}>
                  <Form.Group className="">
                      <Form.Label>
                          Amount<span className="req-t">*</span>
                      </Form.Label>
                      <Form.Control 
                      type='number'
                       
                       value = {editASMAmount?.Amount}
                      // readOnly={!showEditClaim}
                      afterRender = {(e)=>{
                        console.log("after render")
                      }}
                          onChange={(e)=>{
                            setEditASMAmount((pre)=>{
                              return {
                              ...pre,
                              Amount: e.target.value
                            }
                            })
                          }}
                          rows={2}  />
                  </Form.Group>

              </Col>}
            
              </Row>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalASMEditClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const ReSubmitClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateAscServiceTicketClaimReApproval`;
                console.log(updateClaim)
                if(updateClaim == "Reclaim")
                {
                    if(AmountRef.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Amount"
                      })
                      return
                    }
                    if(Justication.current.value == ""){
                      Swal.fire({
                        icon: "error",
                        title: "Please enter Justication"
                      })
                      return
                    }
                    let inputParam = {
                        "serviceTicketId": parseInt(editAscClaim?.serviceTicketId),
                        "serviceTicketClaimId": parseInt(editAscClaim?.serviceTicketClaimId),
                        "ascJustification": Justication.current.value,
                        "asmIsRejected": editAscClaim?.asmIsRejected,
                        "rsmIsRejected": editAscClaim?.rsmIsRejected,
                        "claimAmount":AmountRef.current.value
                      }
                    

                    fetch(ReSubmitClaimUrl, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(inputParam)
                    })
                      .then((res) => {
                        let resp = res.text()
                        resp.then((r) => {
                          console.log(r);
                          if (res.status == 200) {
                            Swal.fire({
                              icon: "success",
                              title: "Updated successfully!"
                            })
                            handleModalASCClaimClose()
                            fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                            fetchAllClaims();
                          }
                          else {
                            Swal.fire({
                              icon: "warning",
                              title: "Something went wrong!"
                            })

                          }
                        })
                      })
                }
                else if(updateClaim == "Accept"){
                  const AcceptRejecttionClaimUrl = `${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/UpdateAscServiceTicketAcceptRejection?serviceTicketId=${editAscClaim?.serviceTicketId}&serviceTicketClaimId=${editAscClaim?.serviceTicketClaimId}&IsAcceptRejection=true`;

                  
                  fetch(AcceptRejecttionClaimUrl, {
                    method: "POST",
                    headers: {
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
                            title: "Updated successfully!"
                          })
                          handleModalASCClaimClose()
                          fetchClaimDetails(approvalServiceTicketId, areMultipleTickets);
                          fetchAllClaims()
                          // setSelectedRows([])

                        }
                        else {
                          Swal.fire({
                            icon: "warning",
                            title: "Something went wrong!"
                          })

                        }
                      })
                    })
                 
                }
                else if(updateClaim == ""){
                  Swal.fire({
                    icon: "error",
                    title: "Please select update claim"
                  })
                  return

                  
                                  

                }
                


              }}>
               Update
              </Button>
            </Modal.Footer>
          </Modal>






          {/* ----------------------------------InActive--------------------------------------- */}



          <Modal show={showIsActive1} onHide={handleCloseIsActive1} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Approve/Reject Claim</Modal.Title>
              
            </Modal.Header>
            <Modal.Body>
              {/* Do you want to Approve/Reject this claim? */}
              <Row>
              <Col md={6}>
                                        <Form.Group>
                                          <Form.Label>Approval status<span style={{ color: 'red' }}>*</span></Form.Label>
                                          <Form.Select
                                                    name=''
                                                    onChange={(e) => {
                                                        // setCancellationData((pre)=>{
                                                        //     return {
                                                        //         ...pre,
                                                        //         approvalStatus : e.target.value
                                                        //     }
                                                        // })
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
                                      <Col md={6}>
                                        <Form.Group>
                                          <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                          <Form.Control
                                            type="text"
                                            name='remark'
                                             autocomplete="new-password"
                                             autoComplete='off'
                                            //  value={addActivity.activityName}
                                             onChange={(e)=>{
                                                // setCancellationData((pre)=>{
                                                //             return {
                                                //                 ...pre,
                                                //                 approvedComments : e.target.value
                                                //             }
                                                //         })
                                             }}
                                            placeholder='Enter Remarks'
                                          />
                                        </Form.Group>
                                      </Col>
              </Row>
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

export default SpecialApprovalList;