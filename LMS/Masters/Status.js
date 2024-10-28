import React, { useMemo, useState, useEffect } from 'react'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import { handleExportRows } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaFileCsv, FaRegEdit } from "react-icons/fa";

import Swal from 'sweetalert2';

import { Box, IconButton, Tooltip } from '@mui/material';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import Loader from '../../loader';

function Status() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);


  const [data, setdata] = useState([])
  // const [divisionName, setDivisionName] = useState('');
  // const [ticketTime, setTicketTime] = useState('');
  // const [remarks, setRemarks] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)

    setaddStatus({
      stStatusId: 0,
      stStatusName: "",
      
      // remarks: "",
      isActive: true
    })


  }
    ;
  const handleModalShow = () => setShowModal(true);
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
      accessorKey: "stStatusName",
      header: "Service Ticket Status",
      size: "700",
      // grow: false
      //  minSize: "90%"
    },
    {
      accessorKey: "isActive",
      header: "Actions",
      size: "10%",
      // grow: false,
      // maxSize: "10",
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
                        console.log(cell.row.original.stStatusId);
                        seteditStatusName((pre)=>{
                          return {
                          ...pre,
                          stStatusId: cell.row.original.stStatusId,
                          stStatusName: cell.row.original.stStatusName}
                        })
                        handleModalShow()
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


              {
                cell.row.original.isActive === false ? (
                  // Render a different icon when isActive is false
                  Permissions?.isDelete ? <Tooltip>
                    <IconButton className="user-btn" onClick={() => {
                      console.log(cell.row.original.stStatusId);
                      setactiveID(cell.row.original.stStatusId);
                      cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                    }}>


                      <FaUserXmark

                        style={{ color: 'red' }} // Style for the new icon

                      />

                    </IconButton>
                  </Tooltip> : ""
                ) : (
                  Permissions?.isDelete ? <Tooltip>
                    <IconButton className="user-btn" onClick={() => {
                      console.log(cell.row.original.stStatusId);
                      setactiveID(cell.row.original.stStatusId);
                      cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                    }}>


                      <FaUserCheck

                        style={{ color: 'blue' }}

                      />
                    </IconButton>
                  </Tooltip> : ""
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
    }
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









  const fetchAllStatus = () => {
    const fetchdata = `${process.env.REACT_APP_API_URL}STStatus/GetAllSTStatus`;

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
    fetchAllStatus()
  }, [])










  const [addStatus, setaddStatus] = useState({
    stStatusName: "",
    
    // remarks: "",
    isActive: true
  })


  const handleChange = (e) => {
    const newdata = { ...addStatus };
    newdata[e.target.name] = e.target.value;
    setaddStatus(newdata);
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

  

  


  const customHeaders = {
    
    stStatusName:'Service Ticket Status',
   

  }


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>



            <p className='pg-label m-0'>Status Master</p>


            {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Service Ticket Status</Button></Col></Row> : ""}
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
                              "stStatusId", "isActive"

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


                positionActionsColumn="first"



              /> : ""
          }




          <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Service Ticket Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (



                  <Row>
                    {/* <Col md={6} >
                      <Form.Group>
                        <Form.Label>SAP Division Name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Select
                          aria-labelledby="aria-label"
                          inputId="aria-example-input"
                          name="divisionName"
                          onChange={(e) => {
                            setaddStatus((pre) => {
                              return {
                                ...pre,
                                stStatusName: e.value,
                                divisionName: e.label
                              }
                            })
                            console.log(e.value);
                          }}
                          options={sapdivision.map(option => ({ value: option.stStatusName, label: option.divisionName }))}
                        />

                      </Form.Group>
                    </Col> */}
                    {/* <Col md={4}>
                <Form.Group>
                    <Form.Label>Division Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='divisionName'
                      // value={editBranch.divisionName}
                      onChange={handleChange}
                      placeholder='Enter Division Name'
                    />
                  </Form.Group>
                </Col> */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Service Ticket Status<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          
                          name='stStatusName'
                          onChange={handleChange}
                          placeholder='Enter Service Ticket Status'
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

              {/* <Row className='mt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name='remarks'
                      onChange={handleChange}
                      placeholder='Enter Remarks'
                    />

                  </Form.Group>
                </Col>
              </Row> */}

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
                const addStatusUrl = `${process.env.REACT_APP_API_URL}STStatus/UpsertSTStatus`;

                let data = {
                  ...addStatus
                }


                // if (addStatus.divisionName === "", addStatus.longLastingTickitHour === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }



                const stStatusName = addStatus.stStatusName;
                if (!stStatusName) {
                  Swal.fire({
                    icon: "error",
                    title: "Service Ticket Status is required"
                  });
                  return;
                }

                else {
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(addStatusUrl, {
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
                            title: "Branch already exists!"
                          });
                        } else {
                          Swal.fire({
                            icon: "success",
                            title: "Saved successfully!"
                          })
                          handleClose()
                          fetchAllStatus();
                          setLoading(false)



                        }
                      }

                      else {
                        const errorData = await response.json();
                        
                        throw new Error(`HTTP error! Status: ${response.status}`);
                        
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
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Service Ticket Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <Row>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Service Ticket Status <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='stStatusName'
                          value={editStatusName.stStatusName}
                          onChange={handleChangeEdit}
                          placeholder='Enter Service Ticket Status'
                          
                        />
                      </Form.Group>
                    </Col>



                    {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Division Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='divisionName'
                      value={editStatusName.divisionName}
                      onChange={handleChangeEdit}
                      placeholder='Enter Division Name'
                    />
                  </Form.Group>
                </Col> */}
                    {/* <Col md={6}>
                      <Form.Group>
                        <Form.Label>Maximum ticket time to resolve <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          maxLength={5}
                          name='longLastingTickitHour'
                          value={editStatusName.longLastingTickitHour}
                          onChange={handleChangeEdit}
                          placeholder='Enter TickitHour'
                        />

                      </Form.Group>
                    </Col> */}
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
                const editStatusNameUrl = `${process.env.REACT_APP_API_URL}STStatus/UpsertSTStatus`;
                let data = {
                  ...editStatusName
                }


                const stStatusName = editStatusName.stStatusName;
                if (!stStatusName) {
                  Swal.fire({
                    icon: "error",
                    title: "Service Ticket Status is required."
                  });
                  return;
                }



                else {
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(editStatusNameUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                      });

                      if (response.status === 200) {
                        const responseData = await response.text();
                        
                          Swal.fire({
                            icon: "success",
                            title: "Update successfully!"
                          });
                          handleModalClose()
                          fetchAllStatus();
                          // window.location.reload();
                          setLoading(false)

                      }
                      else {
                        const errorData = await response.json();
                        
                        throw new Error(`HTTP error! Status: ${response.status}`);
                        
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
                        fetchAllStatus()

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
              <Modal.Title className='mdl-title'>Activate Service Ticket Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Service Ticket Status?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}STStatus/DeleteSTStatus?stStatusId=${activeID}&isActive=${1}`;





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
                        fetchAllStatus()

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
              <Modal.Title className='mdl-title'>De-activate Service Ticket Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Service Ticket Status?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDivisionUrl = `${process.env.REACT_APP_API_URL}STStatus/DeleteSTStatus?stStatusId=${activeID}&isActive=${0}`;





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
                      fetchAllStatus()

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
                    //     fetchAllStatus()

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

export default Status