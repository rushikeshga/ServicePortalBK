import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";


import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Loader from '../../loader';
function ProductGroup() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)

    setproductGroupInsert({
      productGroupId: 0,
      productLineCode: "",
      divisionCode: "",
      productGroupCode: "",
      productGroupName: "",
      productGroupDesc: "",
      isActive: true
    })



  }
    ;
  const handleShow = () => {
    setShow(true)
    ALLDivision()
  };
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  let token = localStorage.getItem("UserToken");

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const [productGroupInsert, setproductGroupInsert] = useState({
    productGroupId: 0,
    productLineCode: "",
    divisionCode: "",
    productGroupCode: "",
    productGroupName: "",
    productGroupDesc: "",
    isActive: true
  })

  const [divisions, setdivisions] = useState([])
  const [prodctLines, setproductLines] = useState([])
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllProductLinesUrl = `${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine/${productGroupInsert?.divisionCode}`;
  const getAllProductGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/GetAllProductGroup`;

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

  // useEffect(()=>{
  //   fetch(getAllProductLinesUrl,{
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //   .then((res)=>res.json())
  //   .then((result)=>{
  //     console.log(result);
  //     setproductLines(result)
  //   })
  // },[])




  const fetchAllProductdata = () => {
    fetch(getAllProductGroupUrl, {
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
    fetchAllProductdata()
  }, [])






  const handleChange = (e) => {
    const newdata = { ...productGroupInsert };
    newdata[e.target.name] = e.target.value;
    setproductGroupInsert(newdata);
    console.log(newdata);
  }

  const [pGroupId, setpGroupId] = useState("");


  const [editProductGroupInsert, seteditProductGroupInsert] = useState({
    productGroupId: 0,
    productLineCode: "",
    divisionCode: "",
    productGroupCode: "",
    productGroupName: "",
    productGroupDesc: "",
    isActive: true
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editProductGroupInsert };
    newdata[e.target.name] = e.target.value;
    seteditProductGroupInsert(newdata);
    console.log(newdata);
  }


  useEffect(() => {
    const editpGroup = `${process.env.REACT_APP_API_URL}ProductGroup/GetProductGroupById?productGroupId=${pGroupId}`;
    if (pGroupId) {
      fetch(editpGroup, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditProductGroupInsert((pre) => {
            return {
              ...pre,
              productGroupId: result?.productGroupId,
              productGroupCode: result?.productGroupCode,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productGroupName: result?.productGroupName,
              productGroupDesc: result?.productGroupDesc
            }
          })

          if (result?.productLineCode) {
            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result?.divisionCode}`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setproductLines(result)
              })
          }
        })


    }
  }, [pGroupId])


  const handleClose1 = () => {
    setShow1(false)
    const editpGroup = `${process.env.REACT_APP_API_URL}ProductGroup/GetProductGroupById?productGroupId=${pGroupId}`;
    if (pGroupId) {
      fetch(editpGroup, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditProductGroupInsert((pre) => {
            return {
              ...pre,
              productGroupId: result?.productGroupId,
              productGroupCode: result?.productGroupCode,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productGroupName: result?.productGroupName,
              productGroupDesc: result?.productGroupDesc
            }
          })


        })
    }



  }







  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);


  const [showIsActive1, setIsActive1] = useState(false);

  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
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

        `${process.env.REACT_APP_API_URL}ProductGroup/GetAllProductGroup`,

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


  const columns = useMemo(
    () => [

      {
        accessorKey: "productGroupCode",
        header: "Product-Group Code",
      },
      {
        accessorKey: "productGroupName",
        header: "Product-Group Name",
      },
      {
        accessorKey: "divisionName",
        header: "Division",
      },
      {
        accessorKey: "productLineName",
        header: "Product-Line",
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
                          console.log(cell.row.original.productGroupId);
                          setpGroupId(cell.row.original.productGroupId)
                          handleShow1()
                          ALLDivision()

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
                        console.log(cell.row.original.productGroupId);
                        setactiveID(cell.row.original.productGroupId);
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
                        console.log(cell.row.original.productGroupId);
                        setactiveID(cell.row.original.productGroupId);
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



  const [isProdGroupReq, setisProdGroupReq] = useState("")

  const customHeaders = {
    productGroupName: 'Product Group Name',
    divisionName: 'Division',
    productLineName: 'Product-Line ',
    divisionCode:'Division Code',
    productLineCode:'Product Line Code',
    productGroupCode:'Product Group Code',


  }
  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
                    <div className='d-flex justify-content-between'>

          <p className='pg-label m-0'>Product-Group Master</p>


          {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Product-Group</Button></Col></Row> : ""}
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
                //                   console.log(cell.row.original.productGroupId);
                //                   setpGroupId(cell.row.original.productGroupId);
                //                   handleShow1();
                //                 }}

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
                //                   console.log(cell.row.original.productGroupId);
                //                   setpGroupId(cell.row.original.productGroupId);
                //                   handleShowDel();
                //                 }}


                //               >
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


                              "totalRows",
                              "productGroupId",
                              
                              "productGroupDesc",
                              "isActive"
                          





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
              <Modal.Title className='mdl-title'>Add New Product-Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (


                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='divisionCode' onChange={(e) => {
                          setproductGroupInsert((pre) => {
                            return {
                              ...pre,
                              divisionCode: e.target.value,
                              productLineCode:''
                            };
                          });

                          

                          fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value ? e.target.value : 0}`, {
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

                                <option value={division?.divisionCode}>{division?.divisionName}</option>
                              </>
                            );
                          })}
                          {/* <option value="3">Three</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Product-Line <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='productLineCode' value={productGroupInsert?.productLineCode} onChange={(e)=>{
                        setproductGroupInsert((pre)=>{
                          return{
                            ...pre,
                            productLineCode:e.target.value
                          }
                        })


                            const selectedIndex = e.target.selectedIndex;
                                                        const selectedOptionCode = e.target.options[selectedIndex].getAttribute("isReq");
                            

                                                        console.log(selectedOptionCode);


                                                        setisProdGroupReq(selectedOptionCode)
                          
                          }}>
                          <option>Select</option>
                          {prodctLines?.map((productLine, index) => {
                            return (
                              <>
                                <option value={productLine?.parameterTypeId} isReq={productLine?.isRequired}>{productLine?.parameterType}</option>

                              </>
                            );
                          })}
                          {/* <option value="3">Three</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>SAP Product Group Code <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='productGroupCode'
                            placeholder=''
                            onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Product Group Name <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='productGroupName'
                            onChange={handleChange}
                            placeholder='' />
                        </Form.Group>
                      </Col>


                    </Row><Row className='mt-3'>
                      <Col>
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" name='productGroupDesc' onChange={handleChange} rows={2} />

                        </Form.Group>
                      </Col>
                    </Row></>
                )}

            </Modal.Body>
            <Modal.Footer>

              {isProdGroupReq=="False"?<p className='req-t'>Selected product line doesn't require product group!</p>:""}
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const addPRoductGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/UpsertProductGroup`;


                // if(productGroupInsert?.divisionCode==="" || productGroupInsert?.productLineCode==="" || productGroupInsert?.productGroupCode==="" || productGroupInsert?.productGroupName===""){
                //   Swal.fire({
                //     icon:"error",
                //     title:"Please fill all the fields marked with red *!"
                //   })
                // }


                const divisionName = productGroupInsert.divisionCode;
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }


                const productLineCode = productGroupInsert.productLineCode;
                if (!productLineCode || productLineCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product line is required"
                  });
                  return;
                }

                const productGroupCode = productGroupInsert.productGroupCode;
                if (!productGroupCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Product group is required"
                  });
                  return;
                }
                const groupName = productGroupInsert.productGroupName;
                if (!groupName) {
                  Swal.fire({
                    icon: "error",
                    title: "Group Name is required "
                  });
                  return;
                }




                setLoading(true)
                fetch(addPRoductGroupUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(productGroupInsert)
                })
                  .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);

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

                      if (res.status == 200 && r != "PRODGROUPEXISTS") {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"
                        })
                        handleClose()
                        fetchAllProductdata()
                        setLoading(false)


                      }
                      else if (res.status == 200 && r == "PRODGROUPEXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Product group already exists!"
                        })
                        setLoading(false)

                      }
                    })
                  })

              }} disabled={isProdGroupReq=="False"}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>



          {/* -----------------edit-------------------- */}


          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Product Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {
                loading ? (<Loader />) : (

                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" disabled name='divisionCode' value={editProductGroupInsert?.divisionCode} onChange={(e) => {
                          seteditProductGroupInsert((pre) => {
                            return {
                              ...pre,
                              divisionCode: e.target.value
                            };
                          });

                          fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`, {
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
                          {divisions?.map((division, index) => {
                            return (
                              <>
                                <option>Select</option>

                                <option value={division?.divisionCode}>{division?.divisionName}</option>
                              </>
                            );
                          })}
                          {/* <option value="3">Three</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Product-Line <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" disabled name='productLineCode' value={editProductGroupInsert?.productLineCode} onChange={handleChangeEdit}>
                          <option>Select</option>
                          {prodctLines?.map((productLine, index) => {
                            return (
                              <>
                                <option value={productLine?.parameterTypeId}>{productLine?.parameterType}</option>

                              </>
                            );
                          })}
                          {/* <option value="3">Three</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>SAP Product Group Code <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='productGroupCode'
                            readOnly
                            value={editProductGroupInsert?.productGroupCode}
                            placeholder=''
                            onChange={handleChangeEdit} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Product Group Name <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='productGroupName'
                            readOnly
                            value={editProductGroupInsert?.productGroupName}
                            onChange={handleChangeEdit}
                            placeholder='' />
                        </Form.Group>
                      </Col>


                    </Row><Row className='mt-3'>
                      <Col>
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" name='productGroupDesc' value={editProductGroupInsert?.productGroupDesc} onChange={handleChangeEdit} rows={2} />

                        </Form.Group>
                      </Col>
                    </Row></>

                )}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const editPRoductGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/UpsertProductGroup`;

                // if (editProductGroupInsert?.divisionCode === "" || editProductGroupInsert?.productLineCode === "" || editProductGroupInsert?.productGroupCode === "" || editProductGroupInsert?.productGroupName === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *!"
                //   })
                // }


                const divisionName = editProductGroupInsert.divisionCode;
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }


                const productLineCode = editProductGroupInsert.productLineCode;
                if (!productLineCode || productLineCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product line is required"
                  });
                  return;
                }

                const productGroupCode = editProductGroupInsert.productGroupCode;
                if (!productGroupCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Product group is required"
                  });
                  return;
                }
                const groupName = editProductGroupInsert.productGroupName;
                if (!groupName) {
                  Swal.fire({
                    icon: "error",
                    title: "Group Name is required "
                  });
                  return;
                }






                setLoading(true)
                fetch(editPRoductGroupUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(editProductGroupInsert)
                })
                  .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);

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
                      if (res.status == 200 && r != "PRODGROUPEXISTS") {
                        Swal.fire({
                          icon: "success",
                          title: "Updated successfully!"
                        })
                        handleClose1()
                        fetchAllProductdata()
                        setLoading(false)


                      }
                      else if (res.status == 200 && r == "PRODGROUPEXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Product group already exists!"
                        })
                        setLoading(false)


                      }
                    })
                  })

              }}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>





          {/* --------------------------------delete------------------- */}



          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Product Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              Are you sure, you want to delete this Product Group?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePRoductGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/DeleteProductGroup?productGroupId=${pGroupId}&isActive=${0}`;

                fetch(deletePRoductGroupUrl, {
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
                          title: "Deleted successfully!"
                        })
                        handleCloseDel()
                        fetchAllProductdata()

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
              <Modal.Title className='mdl-title'>Activate Product Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Product Group?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/DeleteProductGroup?productGroupId=${activeID}&isActive=${1}`;





                fetch(deletePGroupUrl, {
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
                        fetchAllProductdata()

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
              <Modal.Title className='mdl-title'>De-activate Product Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Product Group?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePGroupUrl = `${process.env.REACT_APP_API_URL}ProductGroup/DeleteProductGroup?productGroupId=${activeID}&isActive=${0}`;





                fetch(deletePGroupUrl, {
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
                      fetchAllProductdata()


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
                    //     fetchAllProductdata()

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

export default ProductGroup