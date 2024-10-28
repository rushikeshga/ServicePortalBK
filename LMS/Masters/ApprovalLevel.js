import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Select from 'react-select';
import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import { handleResponse } from '../../Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import Loader from '../../loader';

function ApprovalLevel() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [filteredDivision, setfilteredDivision] = useState("")
  const [filteredBranch, setfilteredBranch] = useState("")
  const [ASCwiseDivisions, setASCwiseDivisions] = useState([])
  const [Approval1List, setApproval1List] = useState([]);
  const [Approval2List, setApproval2List] = useState([]);
  const [Approval3List, setApproval3List] = useState([]);



  const [data, setdata] = useState([])
  // const [divisionName, setDivisionName] = useState('');
  // const [ticketTime, setTicketTime] = useState('');
  // const [remarks, setRemarks] = useState('');
  const [divisionData, setDivisionData] = useState([]);
  const [sapdivision, setSapAlldivision] = useState([]);
  const fetchApprovalList = (division, branch) =>{
    const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${division}&BranchCode=${branch}`;
    fetch(getAllUserList, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setApproval1List(result)
        // let aprovallevel2 = result?.filter(i => i?.userId != cell.row.original.level1ApproverCode)
        // let aprovallevel3 = result?.filter(i => (i?.userId != cell.row.original.level1ApproverCode || i?.userId != cell.row.original.level2ApproverCode))
        // setApproval2List(aprovallevel2)
        // setApproval3List(aprovallevel3)

      })
  }
  const handleClose = () => setShow(false);
  useEffect(() => {
    // console.log(data);

    fetch(`${process.env.REACT_APP_API_URL}Division/GetAllDivision`, {
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

const [divisions, setdivisions] = useState([]);
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
const [addApprovar, setaddApprovar] = useState({
    
    branchCode: "",
    approvalLevelId: 0,
    branchName: "",
    divisionCode: "",
    divisionName : "", 
    level1ApproverCode : "",
    level2ApproverCode : "",
    level3ApproverCode : "" 
  })

  const handleShow = () => {
    // const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${cell.row.original.divisionCode}&BranchCode=${cell.row.original.branchCode}`;
    // fetch(getAllUserList, {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result)
    //     setApproval1List(result)
    //     let aprovallevel2 = result?.filter(i => i?.userId != cell.row.original.level1ApproverCode)
    //     let aprovallevel3 = result?.filter(i => (i?.userId != cell.row.original.level1ApproverCode || i?.userId != cell.row.original.level2ApproverCode))
    //     setApproval2List(aprovallevel2)
    //     setApproval3List(aprovallevel3)

    //   })

      setaddApprovar((pre) =>{
        return {
          ...pre,
          branchCode: "",
          approvalLevelId: 0,
          branchName: "",
          divisionCode: "",
          divisionName : "", 
          level1ApproverCode : "",
          level2ApproverCode : "",
          level3ApproverCode : "" 
        }
      })

    setShow(true)
    


  }
    ;
  const handleModalShow = (cell) => {
    const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${cell.row.original.divisionCode}&BranchCode=${cell.row.original.branchCode}`;
    fetch(getAllUserList, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setApproval1List(result)
        let aprovallevel2 = result?.filter(i => i?.userId != cell.row.original.level1ApproverCode)
        let aprovallevel3 = result?.filter(i => (i?.userId != cell.row.original.level1ApproverCode || i?.userId != cell.row.original.level2ApproverCode))
        setApproval2List(aprovallevel2)
        setApproval3List(aprovallevel3)

      })
    setShowModal(true)
  };
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

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
  const [branchList, setBranchList] = useState([]);


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

  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevel`,

    );
    url.searchParams.set(
      'PageNumber',
      `${pagination.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${pagination.pageSize}`);
    if (filteredBranch) { url.searchParams.set('BranchCode', `${filteredBranch}`) }



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
  useEffect(() => {
    
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);

  useEffect(() => {
    const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;
    fetch(getAllBranches, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setBranchList(result)
      })

      ALLDivision();
  },[])


  const [columns, setColumns] = useState([

    // {
    //   accessorKey: "branchName",
    //   header: "Branch Name",
    //   size: "50"
    // },
    {
      accessorKey: "divisionName",
      header: "Division Name",
      size: "50"
    },
    {
      accessorKey: "level1Approver",
      header: "Approver (Level 1)",
      size: "50",
      // Cell:({cell}) =>{
      //   return (
      //     <>
      //     <Form.Group>         
      //         <Form.Select value={filteredBranch} onChange={(e) => {
      //             setfilteredBranch(e.target.value)
      //         }}>
      //             <option value=''>Select</option>
      //             {/* {
      //                 ASCwiseProductLines?.map((prodline, i) => {
      //                     return (
      //                         <>
      //                             <option value={prodline?.parameterTypeId}>{prodline?.parameterType}</option>
      //                         </>
      //                     )
      //                 })
      //             } */}
      //         </Form.Select>
      //     </Form.Group>
      //     </>
      //   )
      // }
    },
    {
      accessorKey: "level2Approver",
      header: "Approver (Level 2)",
      size: "50",
      // Cell:({cell}) =>{
      //   return (
      //     <>
      //     <Form.Group>         
      //         <Form.Select value={filteredBranch} onChange={(e) => {
      //             setfilteredBranch(e.target.value)
      //         }}>
      //             <option value=''>Select</option>
      //             {/* {
      //                 ASCwiseProductLines?.map((prodline, i) => {
      //                     return (
      //                         <>
      //                             <option value={prodline?.parameterTypeId}>{prodline?.parameterType}</option>
      //                         </>
      //                     )
      //                 })
      //             } */}
      //         </Form.Select>
      //     </Form.Group>
      //     </>
      //   )
      // }
    },
    {
      accessorKey: "level3Approver",
      header: "Approver (Level 3)",
      size: "50",
      // Cell:({cell}) =>{
      //   return (
      //     <>
      //     <Form.Group>         
      //         <Form.Select value={filteredBranch} onChange={(e) => {
      //             setfilteredBranch(e.target.value)
      //         }}>
      //             <option value=''>Select</option>
      //             {/* {
      //                 ASCwiseProductLines?.map((prodline, i) => {
      //                     return (
      //                         <>
      //                             <option value={prodline?.parameterTypeId}>{prodline?.parameterType}</option>
      //                         </>
      //                     )
      //                 })
      //             } */}
      //         </Form.Select>
      //     </Form.Group>
      //     </>
      //   )
      // }
    },
    {
      accessorKey: "isActive",
      header: "Actions",
      size: "20",
      Cell: ({ cell }) => {
        let data = cell.getValue()
        // console.log(cell.row.original);
        return (
          <>
            <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
              {
                cell.row.original.isActive == false ? "" :
                  Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      className="edit-btn"
                      onClick={() => {
                        console.log(cell.row.original.divisionId);
                        setUpdateApprovar((pre) =>{
                          return {
                            ...pre,
                            branchCode: cell.row.original.branchCode,
                            approvalLevelId: cell.row.original.approvalLevelId,
                            branchName: cell.row.original.branchName,
                            divisionCode: cell.row.original.divisionCode,
                            divisionName : cell.row.original.divisionName, 
                            level1ApproverCode : cell.row.original.level1ApproverCode,
                            level2ApproverCode : cell.row.original.level2ApproverCode,
                            level3ApproverCode : cell.row.original.level3ApproverCode 
                          }
                        })
                        handleModalShow(cell)
                        // SapDivision()

                      }}

                    >
                      <FaRegEdit color='#005bab' />
                    </IconButton>
                  </Tooltip> : ""
              }
              {/* {
                cell.row.original.isActive == false ? "" :
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setroleID(cell.row.original.roleId)
                        setisActive(cell.row.original.isActive)
                        handleShowDel()
                      }}


                    >
                      <HiOutlineTrash color='red' />
                    </IconButton>
                  </Tooltip>
              } */}


              


              {/* <Switch checked={data === true} onClick={(e) => {
                console.log(cell.row.original?.divisionId);
                setactiveID(cell.row.original?.divisionId)
                cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
              }} /> */}

            </Box>

          </>
        )
      }
    },
  ]);

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


  const SapDivision = () => {
    const sapAlldivision = `${process.env.REACT_APP_API_URL}Division/GetAllSAPDivision?Mode=1`;
    fetch(sapAlldivision, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSapAlldivision(result)
      })

  }






  const fetchAllDivisions = () => {
    const fetchdata = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevel`;

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
    // fetchAllDivisions()
  }, [])










  const [addBranch, setaddBranch] = useState({
    divisionId: 0,
    divisionCode: "",
    divisionName: "",
    longLastingTickitHour: "",
    // remarks: "",
    isActive: true
  })


  const handleChange = (e) => {
    const newdata = { ...addBranch };
    newdata[e.target.name] = e.target.value;
    setaddBranch(newdata);
    console.log(newdata);
  }

  const [editDivision, seteditDivision] = useState({
    divisionId: 0,
    divisionCode: "",
    divisionName: "",
    longLastingTickitHour: "",
    // remarks: "",
    isActive: true

  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editDivision };
    newdata[e.target.name] = e.target.value;
    seteditDivision(newdata);
    console.log(newdata);
  }


  const [divisionId, setdivisionID] = useState("")
  const [updateApprovar, setUpdateApprovar] = useState({
    branchCode:"",
    approvalLevelId: 0,
    branchCode: 0,
    branchName: "",
    divisionCode: 0,
    divisionName :"", 
    level1Approver : "",
    level2Approver : "",
    level3Approver :"" 
  })

  const getSingleBranch = `${process.env.REACT_APP_API_URL}Division/GetDivisionById?divisionId=${divisionId}`;

  useEffect(() => {
    if (divisionId) {
      fetch(getSingleBranch, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          seteditDivision((pre) => {
            return {
              ...pre,
              divisionId: result?.divisionId,
              divisionName: result?.divisionName,
              divisionCode: result?.divisionCode,
              longLastingTickitHour: result?.longLastingTickitHour,
            }
          })
        })
    }

  }, [divisionId])

  const handleModalClose = () => {
    setShowModal(false)
    fetch(getSingleBranch, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        seteditDivision((pre) => {
          return {
            ...pre,
            divisionId: result?.divisionId,
            divisionName: result?.divisionName,
            divisionCode: result?.divisionCode,
            longLastingTickitHour: result?.longLastingTickitHour,
          }
        })
      })


  }


  const handleOnSearch1 = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover1 = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect1 = (item) => {
    // the item selected
    console.log(item)
    setaddBranch((pre) => {
      return {
        ...pre,
        divisionName: item.divisionName,
        divisionCode: item.divisionCode
      }
    })
    // sessionStorage.setItem("collectionPatient",item.PatientID);

  }

  const handleOnFocus1 = () => {
    console.log('Focused')
  }

  const formatResult1 = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.divisionName}</span>
      </>
    )
  }


  const customHeaders = {
    divisionName: 'Division Name',
    divisionCode:'Division Code',
   

  }


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>



            <p className='pg-label m-0'>Approver Level Master</p>


            {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Approver Level</Button></Col></Row> : ""}
          </div>
          <hr />
          


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
                    

<Row style={{width:"100%"}}>

                        
<Col lg={2}>
    <Form.Group>
        <Form.Label>Branch Name </Form.Label>
        <Form.Select value={filteredBranch} onChange={(e) => {
            setfilteredBranch(e.target.value)
        }}>
            <option value=''>Select</option>
            {
                branchList?.map((prodline, i) => {
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
<Col >
    <div className='gap-2 d-flex mt-4'>
        <Button
            variant=""
            disabled={filteredBranch == ""}
            className="add-Btn"
            onClick={(e) => {
               


              fetchData()
            }}
        >
            Search
        </Button>
        {/* <Button
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
                // fetchData()
                // setShowSwitch(false);
                // setIsChecked(false);

                setfilteredDivision("")
                setfilteredBranch("")
                

                // setASCwiseProductLines([])
            }}

        >
            Reset
        </Button> */}
    </div>
</Col>


</Row>
                      {/* <Button variant=''
                      disabled={table.getPrePaginationRowModel().rows.length === 0}
                      onClick={() =>
                        handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                      }
  
                    >
                      <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />
  
  
                    </Button> */}
                    
                  </>

                )}


                positionActionsColumn="first"



              /> : ""
          }




          <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
          <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Approver Level</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <Row>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division Name  <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Select value={addApprovar?.divisionCode} onChange={(e) => {
                                   setaddApprovar((pre) => {
                                    return {
                                      ...pre,
                                      divisionCode: e.target.value
                                    }
                                   })
                                   setaddApprovar((pre)=>{
                                    return {
                                      ...pre,
                                      level1ApproverCode: "",
                                      level2ApproverCode: "",
                                      level3ApproverCode: ""
                                    }
                                  })
                                   fetchApprovalList(e.target.value, addApprovar?.branchCode)
                                }}>
                                    <option value="">Select</option>
                                    {
                                        divisions?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.divisionCode}>{prodline?.divisionName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Branch Name <span style={{ color: 'red' }}>*</span> </Form.Label>
                        <Form.Select value={addApprovar?.branchCode} onChange={(e) => {
                                   setaddApprovar((pre) => {
                                    return {
                                      ...pre,
                                      branchCode: e.target.value
                                    }
                                   })
                                   setaddApprovar((pre)=>{
                                    return {
                                      ...pre,
                                      level1ApproverCode: "",
                                      level2ApproverCode: "",
                                      level3ApproverCode: ""
                                    }
                                  })
                                   fetchApprovalList(addApprovar?.divisionCode, e.target.value)
                                }}>
                                    <option value="">Select</option>
                                    {
                                      branchList?.map((prodline, i) => {
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



                    {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Division Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='divisionName'
                      value={editDivision.divisionName}
                      onChange={handleChangeEdit}
                      placeholder='Enter Division Name'
                    />
                  </Form.Group>
                </Col> */}
                   

                    <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 1) <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Select value={addApprovar?.level1ApproverCode} onChange={(e) => {
                                  const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${addApprovar?.divisionCode}&BranchCode=${addApprovar?.branchCode}`;
                                  let aprevel1 = e.target.value;
                                  let aprevel2 = addApprovar?.level2ApproverCode;
                                  let aprevel3 = addApprovar?.level3ApproverCode;
                                  
                                  fetch(getAllUserList, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result)
                                      let aprovallevel2 = result?.filter(i => i?.userId != aprevel1)
                                      let aprovallevel3 = result?.filter(i => (i?.userId != aprevel1 && i?.userId != addApprovar?.level2ApproverCode))
                                      setApproval2List(aprovallevel2);
                                      // let isUser2Present = aprovallevel2?.filter(i => i?.userId != aprevel2);
                                      // if(isUser2Present.length == 0){
                                      //   aprevel2 = null;
                                      // }
                                      aprevel2 = "";
                                      // let isUser3Present = aprovallevel3?.filter(i => (i?.userId != aprevel3));
                                      // if(isUser3Present.length == 0){
                                      //   aprevel3 = null;
                                      // }
                                      aprevel3 = "";
                                      setApproval3List(aprovallevel3)
                                      
                                      setaddApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level1ApproverCode: aprevel1,
                                        level2ApproverCode: aprevel2,
                                        level3ApproverCode: aprevel3
                                      }
                                    })
                                    })  
                                    
                                    
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval1List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>

                     
                    
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 2) </Form.Label>
                                <Form.Select 
                                disabled = {addApprovar?.level1ApproverCode == null || addApprovar?.level1ApproverCode == ''}
                                value={addApprovar?.level2ApproverCode} onChange={(e) => {
                                    const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${addApprovar?.divisionCode}&BranchCode=${addApprovar?.branchCode}`;
                                  let aprevel2 = e.target.value;
                                  let aprevel3 = addApprovar?.level3ApproverCode;

                                  fetch(getAllUserList, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result)
                                      let aprovallevel3 = result?.filter(i => (i?.userId != aprevel2 && i?.userId != addApprovar?.level1ApproverCode))
                                      
                                      // let isUser3Present = aprovallevel3?.filter(i => (i?.userId != aprevel3));
                                      // if(isUser3Present.length == 0){
                                      //   aprevel3 = null;
                                      // }
                                      aprevel3 = "";
                                      setApproval3List(aprovallevel3)
                                      setaddApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level2ApproverCode: aprevel2,
                                        level3ApproverCode: aprevel3
                                      }
                                    })
                                    })  
                                    
                                    

                                    
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval2List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 3) </Form.Label>
                                <Form.Select 
                                disabled = {addApprovar?.level1ApproverCode == null || addApprovar?.level1ApproverCode == '' || addApprovar?.level2ApproverCode == null || addApprovar?.level2ApproverCode == ''}
                                value={addApprovar?.level3ApproverCode} onChange={(e) => {
                                  setaddApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level3ApproverCode: e.target.value
                                      }
                                    })
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval3List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                  </Row>
                )}


              {/* 
<Row className='mt-3'>
</Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>

              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editApproverUrl = `${process.env.REACT_APP_API_URL}ApprovalLevel/UpsertApprovalLevel`;
        
                const level1Approver = addApprovar.level1ApproverCode;
                let data = {
                  approvalLevelId : addApprovar?.approvalLevelId,
                  branchCode: addApprovar?.branchCode,
                  divisionCode: addApprovar?.divisionCode,
                  level1ApproverCode : addApprovar?.level1ApproverCode,
                  level2ApproverCode : addApprovar?.level2ApproverCode,
                  level3ApproverCode : addApprovar?.level3ApproverCode
                }
                if (!addApprovar?.divisionCode || addApprovar?.divisionCode == null) {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required."
                  });
                  return;
                }
                else if (!addApprovar?.branchCode || addApprovar?.branchCode == null) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch is required."
                  });
                  return;
                }
                else if (!level1Approver || level1Approver == null) {
                  Swal.fire({
                    icon: "error",
                    title: "Approver level is required."
                  });
                  return;
                }
                
                else {
                  
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(editApproverUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                      });

                      if (response.status === 200) {
                        const responseData = await response.text();
                        if (responseData === "ALEXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Approver Level already exists for given Division and Branch"
                          });
                          handleClose()
                          
                          setLoading(false)
                        } else {
                          Swal.fire({
                            icon: "success",
                            title: "Update successfully!"
                          });
                          handleClose()
                          fetchData();
                          // SapDivision();
                          // window.location.reload();
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
                        title: "An error occurred while saving data"
                      });
                      setLoading(false)

                    }
                  })();
                }


              }}>
                Add
              </Button>

            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Approver Level</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <Row>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division Name </Form.Label>
                        <Form.Control
                          type="text"
                          name='DivisionName'
                          value={updateApprovar.divisionName}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Branch Name </Form.Label>
                        <Form.Control
                          type="text"
                          name='BranchName'
                          value={updateApprovar.branchName}
                          readOnly
                        />
                      </Form.Group>
                    </Col>



                    {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Division Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='divisionName'
                      value={editDivision.divisionName}
                      onChange={handleChangeEdit}
                      placeholder='Enter Division Name'
                    />
                  </Form.Group>
                </Col> */}
                   

                    <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 1) <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Select value={updateApprovar?.level1ApproverCode} onChange={(e) => {
                                  const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${updateApprovar?.divisionCode}&BranchCode=${updateApprovar?.branchCode}`;
                                  let aprevel1 = e.target.value;
                                  let aprevel2 = updateApprovar?.level2ApproverCode;
                                  let aprevel3 = updateApprovar?.level3ApproverCode;
                                  
                                  fetch(getAllUserList, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result)
                                      let aprovallevel2 = result?.filter(i => i?.userId != aprevel1)
                                      let aprovallevel3 = result?.filter(i => (i?.userId != aprevel1 && i?.userId != updateApprovar?.level2ApproverCode))
                                      setApproval2List(aprovallevel2);
                                      // let isUser2Present = aprovallevel2?.filter(i => i?.userId != aprevel2);
                                      // if(isUser2Present.length == 0){
                                      //   aprevel2 = null;
                                      // }
                                      aprevel2 = "";
                                      // let isUser3Present = aprovallevel3?.filter(i => (i?.userId != aprevel3));
                                      // if(isUser3Present.length == 0){
                                      //   aprevel3 = null;
                                      // }
                                      aprevel3 = "";
                                      setApproval3List(aprovallevel3)
                                      
                                      setUpdateApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level1ApproverCode: aprevel1,
                                        level2ApproverCode: aprevel2,
                                        level3ApproverCode: aprevel3
                                      }
                                    })
                                    })  
                                    
                                    
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval1List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>

                     
                    
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 2) </Form.Label>
                                <Form.Select 
                                disabled = {updateApprovar?.level1ApproverCode == null || updateApprovar?.level1ApproverCode == ''}
                                value={updateApprovar?.level2ApproverCode} onChange={(e) => {
                                    const getAllUserList = `${process.env.REACT_APP_API_URL}ApprovalLevel/GetAllApprovalLevelUsers?DivisionCode=${updateApprovar?.divisionCode}&BranchCode=${updateApprovar?.branchCode}`;
                                  let aprevel2 = e.target.value;
                                  let aprevel3 = updateApprovar?.level3ApproverCode;

                                  fetch(getAllUserList, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result)
                                      let aprovallevel3 = result?.filter(i => (i?.userId != aprevel2 && i?.userId != updateApprovar?.level1ApproverCode))
                                      
                                      // let isUser3Present = aprovallevel3?.filter(i => (i?.userId != aprevel3));
                                      // if(isUser3Present.length == 0){
                                      //   aprevel3 = null;
                                      // }
                                      aprevel3 = "";
                                      setApproval3List(aprovallevel3)
                                      setUpdateApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level2ApproverCode: aprevel2,
                                        level3ApproverCode: aprevel3
                                      }
                                    })
                                    })  
                                    
                                    

                                    
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval2List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Approvar (Level 3) </Form.Label>
                                <Form.Select 
                                disabled = {updateApprovar?.level1ApproverCode == null || updateApprovar?.level1ApproverCode == '' || updateApprovar?.level2ApproverCode == null || updateApprovar?.level2ApproverCode == ''}
                                value={updateApprovar?.level3ApproverCode} onChange={(e) => {
                                    setUpdateApprovar((pre)=>{
                                      return {
                                        ...pre,
                                        level3ApproverCode: e.target.value
                                      }
                                    })
                                }}>
                                    <option value="">Select</option>
                                    {
                                        Approval3List?.map((prodline, i) => {
                                            return (
                                                <>
                                                    <option value={prodline?.userId}>{prodline?.userName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Col>
                  </Row>
                )}


              {/* 
<Row className='mt-3'>
</Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                Close
              </Button>

              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editApproverUrl = `${process.env.REACT_APP_API_URL}ApprovalLevel/UpsertApprovalLevel`;
        
                const level1Approver = updateApprovar.level1ApproverCode;
                let data = {
                  approvalLevelId : updateApprovar?.approvalLevelId,
                  branchCode: updateApprovar?.branchCode,
                  divisionCode: updateApprovar?.divisionCode,
                  level1ApproverCode : updateApprovar?.level1ApproverCode,
                  level2ApproverCode : updateApprovar?.level2ApproverCode,
                  level3ApproverCode : updateApprovar?.level3ApproverCode
                }
                if (!level1Approver) {
                  Swal.fire({
                    icon: "error",
                    title: "Approver level is required."
                  });
                  return;
                }
                else {
                  
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(editApproverUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                      });

                      if (response.status === 200) {
                        const responseData = await response.text();
                        if (responseData === "BREXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Division already exists!"
                          });
                        } else {
                          Swal.fire({
                            icon: "success",
                            title: "Update successfully!"
                          });
                          handleModalClose()
                          fetchData();
                          // SapDivision();
                          // window.location.reload();
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
                        title: "An error occurred while saving data"
                      });
                      setLoading(false)

                    }
                  })();
                }


              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>


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

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Division/DeleteDivision?divisionId=${divisionId}&isActive=${0}`;

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
                        fetchAllDivisions()

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
              <Modal.Title className='mdl-title'>Activate Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Division?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}Division/DeleteDivision?divisionId=${activeID}&isActive=${1}`;





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
                        fetchAllDivisions()

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
              <Modal.Title className='mdl-title'>De-activate Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Division?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}Division/DeleteDivision?divisionId=${activeID}&isActive=${0}`;





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
                      fetchAllDivisions()

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
                    //     fetchAllDivisions()

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

export default ApprovalLevel