import React, { useMemo, useState, useEffect, useRef } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";



import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Loader from '../../loader';
function Region() {
  let token = localStorage.getItem("UserToken")
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(false)
  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const tableRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalShow = () => setShowModal(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);


  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [isActive, setisActive] = useState("")


  const [activeID, setactiveID] = useState(0)

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

        `${process.env.REACT_APP_API_URL}Region/GetAllRegions`,

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
    globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);





  const columns = useMemo(
    () => [

      // {
      //   accessorKey: "regionCode",
      //   header: "Region Code",
      // },
      {
        accessorKey: "regionName",
        header: "Region Name",
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
                          console.log(cell.row.original.regionId);
                          setregionID(cell.row.original.regionId)
                          handleModalShow()


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
                      <IconButton>


                        <FaUserXmark
                          className="user-btn"
                          style={{ color: 'red' }} // Style for the new icon
                          onClick={() => {
                            console.log(cell.row.original.regionId);
                            setactiveID(cell.row.original.regionId);
                            cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                          }}
                        />
                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton>


                        <FaUserCheck
                          className="user-btn"
                          style={{ color: 'blue' }}
                          onClick={() => {
                            console.log(cell.row.original.regionId);
                            setactiveID(cell.row.original.regionId);
                            cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                          }}
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



  const fetchAllRegions = () => {
    const fetchRegionOption = `${process.env.REACT_APP_API_URL}Region/GetAllRegions`;

    fetch(fetchRegionOption, {
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
    fetchAllRegions()
  }, [])


  // const validateForm = (regionCode, regionName) => {
  //   let errors = {};
  //   let isValid = true;

  //   if (!regionCode) {
  //     errors.regionCode = "Region Code is required";
  //     isValid = false;
  //   }

  //   //   else if (!/^\d{5}$/.test(regionCode)) {
  //   //     errors.regionCode = "Region Code must be exactly 5 digits";
  //   //     isValid = false;
  //   // }

  //   if (!regionName) {
  //     errors.regionName = "Region Name is required";
  //     isValid = false;
  //   }
  //   else if (!/^[a-zA-Z]+$/.test(regionName)) {
  //     errors.regionName = "Region Name must contain only alphabet letters";
  //     isValid = false;
  //   }
  //   return { isValid, errors };
  // };


  const [addRegion, setaddRegion] = useState({
    regionId: 0,
    regionName: '',
    remarks: "",
    regionCode: "",
    isActive: true
  })


  const handleChange = (e) => {
    const newdata = { ...addRegion };
    newdata[e.target.name] = e.target.value;
    setaddRegion(newdata);
    console.log(newdata);
  }

  const [editRegion, seteditRegion] = useState({
    regionId: 0,
    regionName: '',
    remarks: "",
    regionCode: "",
    isActive: true

  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editRegion };
    newdata[e.target.name] = e.target.value;
    seteditRegion(newdata);
    console.log(newdata);
  }
  const [regionId, setregionID] = useState("")

  const getSingleBranch = `${process.env.REACT_APP_API_URL}Region/GetRegionById?regionId=${regionId}`;
  useEffect(() => {
    if (regionId) {
      fetch(getSingleBranch, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditRegion((pre) => {
            return {
              ...pre,
              regionId: result?.regionId,
              regionName: result?.regionName,
              regionCode: result?.regionCode,
              remarks: result?.remarks,
            }
          })
        })
    }

  }, [regionId])

  const handleModalClose = () => {
    setShowModal(false);
    fetch(getSingleBranch, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        seteditRegion((pre) => {
          return {
            ...pre,
            regionId: result?.regionId,
            regionName: result?.regionName,
            regionCode: result?.regionCode,
            remarks: result?.remarks,
          }
        })
      })

  }

  const customHeaders = {
    regionName: 'Region Name'

  }


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Region Master</p>

            {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Region</Button></Col></Row> : ""}
          </div>
          <hr />


          {
            Permissions?.isView ?

              <MaterialReactTable
                columns={columns}
                data={data}
                ref={tableRef}
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
                //     {
                //       cell.row.original.isActive == false ? "" :
                //         <Tooltip arrow placement="left" title="Edit">
                //           <IconButton
                //             className="edit-btn"
                //             onClick={() => {
                //               console.log(cell.row.original.regionId);
                //               setregionID(cell.row.original.regionId)
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
                //               setregionID(cell.row.original.regionId)
                //               setisActive(cell.row.original.regionId)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}

                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                state={
                  {
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination,
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
                              "regionId",
                              "regionCode",
                              "remarks",
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


              // positionActionsColumn="first"

              /> : ""
          }

          <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (

                  <Row>
                    {/* <Col md={6}>
                  <Form.Group>
                    <Form.Label>Region Code<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name='regionCode'
                      onChange={handleChange}
                      placeholder=''
                    />

                  </Form.Group>
                </Col> */}
                    <Col>
                      <Form.Group>
                        <Form.Label>Region Name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='regionName'
                          onChange={handleChange}
                          placeholder=''
                        />

                      </Form.Group>
                    </Col>
                    {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control as="textarea"
                      name='remarks'
                      onChange={handleChange}
                      rows={1} />
                  </Form.Group>
                </Col> */}

                  </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const addBranchUrl = `${process.env.REACT_APP_API_URL}Region/UpsertRegion`;
                let data = {
                  ...addRegion
                }
                // if (addRegion.regionCode === "" || addRegion.regionName === "" || addRegion.regionCode === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill in all required fields"
                //   });
                // } 



                const regionName = addRegion.regionName;
                if (!regionName) {
                  Swal.fire({
                    icon: "error",
                    title: "Region Name is required."
                  });
                  return;
                }
                // const regionNameRegex = /^[a-zA-Z\s]+$/;
                // if (!regionName.match(regionNameRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Region Name only require alphabet."
                //   });   
                //   return;
                // }





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
                          title: "Region already exists!"
                        });
                        setLoading(false)

                      } else {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"

                        });
                        setLoading(false)

                        handleClose();
                        fetchAllRegions();
                      }
                    } else {
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
                        setLoading(false)

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



              }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <Row>

                    {/* <Col md={6}>
                  <Form.Group>
                    <Form.Label>Region Code</Form.Label>
                    <Form.Control
                      type="text"
                      name='regionCode'
                      value={editRegion.regionCode}
                      onChange={handleChangeEdit}
                      placeholder='Region Code'
                      readOnly
                    />
                  </Form.Group>
                </Col> */}
                    <Col>
                      <Form.Group>
                        <Form.Label>Region Name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='regionName'
                          value={editRegion.regionName}
                          onChange={handleChangeEdit}
                          placeholder='Enter Region Name'
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
                const editBranchUrl = `${process.env.REACT_APP_API_URL}Region/UpsertRegion`;
                let data = {
                  ...editRegion
                }


                // if (editRegion.regionCode === "" || editRegion.regionName === "" || editRegion.remarks === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }


                const regionCode = editRegion.regionCode;
                if (!regionCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Region Code is required."
                  });
                  return;
                }
                //  const regionCodeRegex = /^[a-zA-Z0-9]{3,6}$/;
                //   if (!regionCode.match(regionCodeRegex)) {
                //     Swal.fire({
                //       icon: "error",
                //       title: "Region Code must contain  between 3 to 6 characters long."
                //     });   
                //     return;
                //   }

                const regionName = editRegion.regionName;
                if (!regionName) {
                  Swal.fire({
                    icon: "error",
                    title: "Region Name is required."
                  });
                  return;
                }
                // const regionNameRegex = /^[a-zA-Z\s]+$/;
                // if (!regionName.match(regionNameRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Region Name only require alphabet."
                //   });   
                //   return;
                // }

                else {
                  setLoading(true)
                  fetch(editBranchUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                  })
                    .then((res) => {
                      // res.json()
                      let resp = res.text()
                      resp.then((r) => {
                        console.log(r);
                        let regextest = /^[a-zA-Z0-9]+$/;
                        if (!r.match(regextest)) {
                          const errorData = JSON.parse(r);
                          console.log('errorData-------------', errorData);
                          if (errorData && errorData.title === "One or more validation errors occurred.") {
                            // Construct error message from the error object
                            let errorMessage = "";
                            for (const key in errorData.errors) {
                              errorMessage += `${errorData.errors[key][0]}\n`;
                            }
                            Swal.fire({
                              icon: "error",
                              title: errorMessage
                            });
                            setLoading(false)

                          }
                        }

                        if (res.status == 200 && r != "BREXISTS") {
                          Swal.fire({
                            icon: "success",
                            title: "Updated successfully!"
                          })
                          handleModalClose()
                          fetchAllRegions()
                          setLoading(false)


                        }

                        else if (res.status == 200 && r == "BREXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Branch already exists!"
                          })
                          setLoading(false)


                        }

                      })
                    })
                }

              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Region?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Region/DeleteRegion?regionId=${regionId}&isActive=${0}`;

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
                        fetchAllRegions()
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
              <Modal.Title className='mdl-title'>Activate Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Region?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteRegionUrl = `${process.env.REACT_APP_API_URL}Region/DeleteRegion?regionId=${activeID}&isActive=${1}`;

                fetch(deleteRegionUrl, {
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
                        fetchAllRegions()

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
              <Modal.Title className='mdl-title'>De-activate Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Region?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteRegionUrl = `${process.env.REACT_APP_API_URL}Region/DeleteRegion?regionId=${activeID}&isActive=${0}`;

                fetch(deleteRegionUrl, {
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
                      fetchAllRegions()

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
    </>
  )
}

export default Region