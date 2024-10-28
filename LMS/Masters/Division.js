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
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import Loader from '../../loader';

function Division() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);


  const [data, setdata] = useState([])
  // const [divisionName, setDivisionName] = useState('');
  // const [ticketTime, setTicketTime] = useState('');
  // const [remarks, setRemarks] = useState('');
  const [divisionData, setDivisionData] = useState([]);
  const [sapdivision, setSapAlldivision] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    SapDivision()

    setaddBranch({
      divisionId: 0,
      divisionCode: "",
      divisionName: "",
      longLastingTickitHour: "",
      // remarks: "",
      isActive: true
    })


  }
    ;
  const handleModalShow = () => setShowModal(true);
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

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(

        `${process.env.REACT_APP_API_URL}Division/GetAllDivision`,

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
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);


  const [columns, setColumns] = useState([

    {
      accessorKey: "divisionCode",
      header: "Division Code",
      size: "50"
    },
    {
      accessorKey: "divisionName",
      header: "Division Name",
      size: "50"
    },
    {
      accessorKey: "longLastingTickitHour",
      header: "Maximum ticket time to resolve(In hours)",
      size: "50",
      Cell: ({ cell }) => (
        <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Is Active",
      Cell: ({ cell }) => (
        <p>{cell.getValue() === true ? "Yes" : "No"}</p>
      ),
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
                        setdivisionID(cell.row.original.divisionId)
                        handleModalShow()
                        SapDivision()

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
                      console.log(cell.row.original.divisionId);
                      setactiveID(cell.row.original.divisionId);
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
                      console.log(cell.row.original.divisionId);
                      setactiveID(cell.row.original.divisionId);
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
    const fetchdata = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;

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
    fetchAllDivisions()
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



            <p className='pg-label m-0'>Division Master</p>


            {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Division</Button></Col></Row> : ""}
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
                // enableGlobalFilter = {false}
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

                              "divisionId",
                              "divisionRemarks",
                              "longLastingTickitHour",
                              "frameSizeOrHpReqOrNot",
                              "isActive",
                              "totalRows"


                            


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
              <Modal.Title className='mdl-title'>Add New Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (



                  <Row>
                    <Col md={6} >
                      <Form.Group>
                        <Form.Label>SAP Division Name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Select
                          aria-labelledby="aria-label"
                          inputId="aria-example-input"
                          name="divisionName"
                          onChange={(e) => {
                            setaddBranch((pre) => {
                              return {
                                ...pre,
                                divisionCode: e.value,
                                divisionName: e.label
                              }
                            })
                            console.log(e.value);
                          }}
                          options={sapdivision.map(option => ({ value: option.divisionCode, label: option.divisionName }))}
                        />

                      </Form.Group>
                    </Col>
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
                        <Form.Label>Maximum ticket time to resolve<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          maxLength={5}
                          name='longLastingTickitHour'
                          onChange={handleChange}
                          placeholder='Enter Ticket Hour'
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
                const addBranchUrl = `${process.env.REACT_APP_API_URL}Division/UpsertDivision`;

                let data = {
                  ...addBranch
                }


                // if (addBranch.divisionName === "", addBranch.longLastingTickitHour === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }



                const sapdivision = addBranch.divisionName;
                if (!sapdivision) {
                  Swal.fire({
                    icon: "error",
                    title: "Sap Division is required"
                  });
                  return;
                }

                const longLastingTickitHour = addBranch.longLastingTickitHour;

                if (!longLastingTickitHour) {
                  console.error("Validation failed. longLastingTickitHour is empty");
                  Swal.fire({
                    icon: "error",
                    title: "Max Ticket Hour is required"
                  });
                  return;
                }
                if (typeof longLastingTickitHour !== 'number' && !/^[0-9]+$/.test(longLastingTickitHour.toString())) {
                  console.error("longLastingTickitHour:", longLastingTickitHour);
                  Swal.fire({
                    icon: "error",
                    title: "Max Ticket Hour Require only digiit number"
                  });
                  return;
                }







                else {
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(addBranchUrl, {
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
                          fetchAllDivisions();
                          SapDivision();
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
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Division</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <Row>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>SAP Division Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='divisionCode'
                          value={editDivision.divisionName}
                          onChange={handleChangeEdit}
                          placeholder='SAP Division Code'
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
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Maximum ticket time to resolve <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          maxLength={5}
                          name='longLastingTickitHour'
                          value={editDivision.longLastingTickitHour}
                          onChange={handleChangeEdit}
                          placeholder='Enter TickitHour'
                        />

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
                const editDivisionUrl = `${process.env.REACT_APP_API_URL}Division/UpsertDivision`;
                let data = {
                  ...editDivision
                }


                const divisionName = editDivision.divisionName;
                if (!divisionName) {
                  Swal.fire({
                    icon: "error",
                    title: "Sap DivisionName is required"
                  });
                  return;
                }



                const longLastingTickitHour = editDivision.longLastingTickitHour;

                // Check if longLastingTickitHour is empty
                if (!longLastingTickitHour) {
                  console.error("Validation failed. longLastingTickitHour is empty");
                  Swal.fire({
                    icon: "error",
                    title: "Max Ticket Hour is required"
                  });
                  return;
                }
                // Check if longLastingTickitHour is not a number or contains spaces within the number
                if (typeof longLastingTickitHour !== 'number' && !/^[0-9\s]+$/.test(longLastingTickitHour.toString())) {
                  console.error("longLastingTickitHour:", longLastingTickitHour);
                  Swal.fire({
                    icon: "error",
                    title: "Max Ticket Hour Require only digiit number"
                  });
                  return;
                }



                else {
                  (async () => {
                    try {
                      setLoading(true)
                      const response = await fetch(editDivisionUrl, {
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
                          fetchAllDivisions();
                          SapDivision();
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

export default Division