import React, { useMemo, useState, useEffect, useRef } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Select from 'react-select';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";


import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Loader from '../../loader';



function ProductLine() {
  const [show, setShow] = useState(false);

  let sapPlRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    AllDivision()

    setproductline({
      productLineID: 0,
      divisionCode: "",
      productLineCode: "",
      productLineName: "",
      productLineRemarks: "",
      IsProductGroupRequired: false,
      isActive: true
    })



  };
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(false)


  const [show1, setShow1] = useState(false);



  const handleShow1 = () => setShow1(true);



  const [showDel, setShowDel] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);


  const [productlineCode, setproductlineCode] = useState("");

  let token = localStorage.getItem("UserToken");

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const [divisions, setdivisions] = useState([])

  const getdataUrl = `${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine`;

  const AllDivision = () => {
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





  const fetchdata = () => {
    fetch(getdataUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('--hhhhhhh--------', result);
        setdata(result)
      })
  }
  useEffect(() => {
    fetchdata()
  }, [])



  const [productline, setproductline] = useState({
    productLineID: 0,
    divisionCode: "",
    productLineCode: "",
    productLineName: "",
    productLineRemarks: "",
    IsProductGroupRequired: false,
    isActive: true
  })


  const handleChange = (e) => {
    const newdata = { ...productline };
    newdata[e.target.name] = e.target.value;
    setproductline(newdata);
    console.log(newdata);
  }



  const [editproductline, seteditproductline] = useState({
    productLineID: 0,
    divisionCode: "",
    productLineCode: "",
    productLineName: "",
    productLineRemarks: "",
    IsProductGroupRequired: false,

    isActive: true
  })



  const handleChangeEdit = (e) => {
    const newdata = { ...editproductline };
    newdata[e.target.name] = e.target.value;
    seteditproductline(newdata);
    console.log(newdata);
  }



  useEffect(() => {
    const getproductlineById = `${process.env.REACT_APP_API_URL}ProductLine/GetProductLineById?productLineID=${productlineCode}`;
    if (productlineCode) {
      fetch(getproductlineById, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("----------------------------pppppppppppp---------------------");
          console.log(result);


          seteditproductline((pre) => {
            return {
              ...pre,
              productLineID: result?.productLineID,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productLineName: result?.productLineName,
              productLineRemarks: result?.productLineRemarks,
              IsProductGroupRequired: result?.isProductGroupRequired
            }
          })
        })
    }
  }, [productlineCode])

  const handleClose1 = () => {
    setShow1(false)
    const getproductlineById = `${process.env.REACT_APP_API_URL}ProductLine/GetProductLineById?productLineID=${productlineCode}`;
    if (productlineCode) {
      fetch(getproductlineById, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("----------------------------pppppppppppp---------------------");
          console.log(result);

          seteditproductline((pre) => {
            return {
              ...pre,
              productLineID: result?.productLineID,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productLineName: result?.productLineName,
              productLineRemarks: result?.productLineRemarks,
              IsProductGroupRequired: result?.isProductGroupRequired
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

        `${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine`,

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
        accessorKey: "divisionName",
        header: "Division",
      },
      {
        accessorKey: "productLineCode",
        header: "SAP Product-Line Code",
      },
      {
        accessorKey: "productLineName",
        header: "Product-Line Name",
      },
      {
        accessorKey: "isProductGroupRequired",
        header: "Product Group Required",
        Cell: ({ cell }) => (
          <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        )
      },
      {
        accessorKey: "isActive",
        header: "Active",
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
                          console.log(cell.row.original.productLineID);
                          setproductlineCode(cell.row.original.productLineID)
                          handleShow1()
                          AllDivision()

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
                        console.log(cell.row.original.productLineID);
                        setactiveID(cell.row.original.productLineID);
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
                        console.log(cell.row.original.productLineID);
                        setactiveID(cell.row.original.productLineID);
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


  const [sapProductLineCode, setsapProductLineCode] = useState([])
  useEffect(() => {
    if (productline && productline.divisionCode) {
      const sapAllProductLineCodeUrl = `${process.env.REACT_APP_API_URL}SAP/GetAllSAPData?Mode=4&Name=${productline.divisionCode}`;

      fetch(sapAllProductLineCodeUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setsapProductLineCode(result.map((sap) => ({ value: sap.sapCode, label: sap.sapName })))
        });
    }
  }, [productline?.divisionCode]);

  const customHeaders = {
    divisionName: 'Division',
    productLineName: 'Product-Line Name',
    divisionCode:'Division Code',
    productLineCode:'Product Line Code',
    isProductGroupRequired: 'Product Group Required'

  }

  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Product-Line Master</p>


            {Permissions?.isAdd ? <Row ><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Product-Line</Button></Col></Row> : ""}

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
                //                   console.log(cell.row.original.productLineID);
                //                   setproductlineCode(cell.row.original.productLineID)
                //                   handleShow1()
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
                //                   console.log(cell.row.original.productLineID);
                //                   setproductlineCode(cell.row.original.productLineID)
                //                   handleShowDel()
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
                              "productLineID",
                              
                              "productLineRemarks",
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
              <Modal.Title className='mdl-title'>Add New Product-Line</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (


                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='divisionCode'


                          onChange={(e) => {
                            console.log("---------------", e.target.value);
                            let sapE = e.target.value;
                            if (e.target.value == "") {
                              setproductline((pre) => {
                                return {
                                  ...pre,
                                  productLineCode: "",
                                  productLineName: "",
                                };
                              });

                            }

                            setproductline((pre) => {
                              return {
                                ...pre,
                                productLineCode: e.value,
                                productLineName: e.label,
                                divisionCode: e.target.value
                              };
                            });

                            // let sapPLine = sapE?.map(sap => sap.sapCode);
                            // console.log("divString", sapPLine);
                            // const getAllProductLines = `${process.env.REACT_APP_API_URL}SAP/GetAllSAPData?Mode=4&Name=${productline?.divisionCode}`;
                            // fetch(getAllProductLines, {
                            //   headers: {
                            //     "Authorization": `Bearer ${token}`
                            //   }
                            // })
                            //   .then((res) => res.json())
                            //   .then((result) => {
                            //     console.log("-----p----", result)
                            // let prodLines = result.map(division => ({ value: division.sapCode, label: division.sapName }));
                            // console.log("-----p----", prodLines)
                            // console.log("------addvendor----", prodLines)
                            // let filteredProdLineCodes = productline.productLineCode.filter((singleCode) => {
                            //   console.log("------filter-------", singleCode)
                            //   console.log("---productl------", prodLines.find((pl) => pl.value === singleCode.value))
                            //   if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                            // })
                            //
                            // })
                          }}






                        >
                          <option value="">Select</option>
                          {divisions?.map((division, index) => {
                            return (
                              <>

                                <option value={division?.divisionCode}>{division?.divisionName}</option>
                              </>
                            );
                          })}
                          {/* <option value="3"></option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>SAP Product Line Code <span className='req-t'>*</span></Form.Label>
                        <Select
                          aria-labelledby="aria-label"
                          inputId="aria-example-input"
                          name=""
                          ref={sapPlRef}
                          value={{ value: productline?.productLineCode, label: productline?.productLineName }}
                          onChange={(e) => {
                            setproductline((pre) => {
                              return {
                                ...pre,
                                productLineCode: e.value,
                                productLineName: e.label
                              };
                            });
                          }}
                          options={sapProductLineCode} />
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>
                      {/* <Col md={6}>
<Form.Group>
<Form.Label>Product Line Name <span className='req-t'>*</span></Form.Label>
<Form.Control
type="text"
onChange={handleChange}
name='productLineName'
placeholder=''
/>
</Form.Group>
</Col> */}

                      <Col md={6}>
                        {/* <Form.Group>
<Form.Label>Remarks</Form.Label>
<Form.Control as="textarea" name='productLineRemarks' onChange={handleChange} rows={1} />

</Form.Group> */}
                        <Form.Group className='mt-4 pt-1'>

                          <Form.Check type='checkbox' name='IsProductGroupRequired' onChange={(e) => {
                            setproductline((pre) => {
                              return {
                                ...pre,
                                IsProductGroupRequired: e.target.checked
                              };
                            });
                          }} label="Is Product Group Required?" />
                        </Form.Group>
                      </Col>
                    </Row></>
                )}


              {/* <Row className='mt-3'>

</Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                e.preventDefault();

                const addProductLineUrl = `${process.env.REACT_APP_API_URL}ProductLine/UpsertProductLine`;


                // if (productline?.divisionCode === "" || productline?.productLineCode === "" || productline?.productLineName === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *!"
                //   })
                // }

                const divisionName = productline.divisionCode;
                // Check if roleCode is empty or not provided
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Sap Division Name is Required"
                  });
                  return;
                }

                const productLineName = productline.productLineName;
                // const productLineNameRegex = /^[a-zA-Z0-9\s]+$/;
                if (!productLineName) {
                  Swal.fire({
                    icon: "error",
                    title: "Sap product Line Code is required"
                  });
                  return;
                }







                setLoading(true)
                fetch(addProductLineUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(productline)
                })
                  .then((res) => {
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
                        }
                      }




                      if (res.status == 200 && r != "PRODLINEEXISTS") {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"
                        })
                        // window.location.reload()
                        handleClose()
                        fetchdata()
                        setLoading(false)

                      }
                      else if (res.status == 200 && r == "PRODLINEEXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Product line already exists!"
                        })
                        setLoading(false)


                      }
                    })
                  })

              }}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>


          {/* ------------------------edit------------------------- */}
          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Product Line</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              {
                loading ? (<Loader />) : (

                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='divisionCode' disabled value={editproductline?.divisionCode} readonly onChange={handleChangeEdit}>
                          <option>Select</option>
                          {divisions?.map((division, index) => {
                            return (
                              <>

                                <option value={division?.divisionCode}>{division?.divisionName}</option>
                              </>
                            );
                          })}
                          {/* <option value="3"></option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>SAP Product Line Code <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          value={editproductline?.productLineCode}
                          name='productLineCode'
                          readOnly
                          onChange={handleChangeEdit}
                          placeholder='' />
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Product Line Name <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={handleChangeEdit}
                            readOnly
                            value={editproductline?.productLineName}
                            name='productLineName'
                            placeholder='' />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className='mt-4 pt-1'>

                          <Form.Check type='checkbox' checked={editproductline?.IsProductGroupRequired === true} name='IsProductGroupRequired' onChange={(e) => {
                            seteditproductline((pre) => {
                              return {
                                ...pre,
                                IsProductGroupRequired: e.target.checked
                              };
                            });
                          }} label="Is Product Group Required?" />
                        </Form.Group>
                      </Col>
                    </Row></>
                )}


              {/* <Row className='mt-3'>

</Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                e.preventDefault();

                const editProductLineUrl = `${process.env.REACT_APP_API_URL}ProductLine/UpsertProductLine`;


                // if (editproductline?.productLineCode === "" || editproductline?.divisionCode === "" || editproductline?.productLineName === "" || editproductline?.productLineRemarks === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill the fields marked with red *!"
                //   })
                // }

                const divisionName = editproductline.divisionCode;
                // Check if roleCode is empty or not provided
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Sap Division Name is Required"
                  });
                  return;
                }

                const productLineName = editproductline.productLineName;
                // const productLineNameRegex = /^[a-zA-Z0-9\s]+$/;
                if (!productLineName) {
                  Swal.fire({
                    icon: "error",
                    title: "Sap product Line Code is required"
                  });
                  return;
                }










                else {

                  setLoading(true)
                  fetch(editProductLineUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(editproductline)
                  })
                    .then((res) => {
                      let resp = res.text()
                      resp.then((r) => {
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
                          }
                        }
                        if (res.status == 200 && r != "PRODLINEEXISTS") {
                          Swal.fire({
                            icon: "success",
                            title: "Updated successfully!"
                          })
                          handleClose1()
                          fetchdata()
                          setLoading(false)

                        }
                        else if (res.status == 200 && r == "PRODLINEEXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Product line already exists!"
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



          {/* ---------------------delete--------- */}


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Product Line</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Product Line?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePLIneUrl = `${process.env.REACT_APP_API_URL}ProductLine/DeleteProductLine?productLineId=${productlineCode}&isActive=${0}`;





                fetch(deletePLIneUrl, {
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
                        fetchdata()

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











          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Product Line</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Product Line?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePLineUrl = `${process.env.REACT_APP_API_URL}ProductLine/DeleteProductLine?productLineId=${activeID}&isActive=${1}`;





                fetch(deletePLineUrl, {
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
                        fetchdata()

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
              <Modal.Title className='mdl-title'>De-activate Product Line</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Product Line?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePLineUrl = `${process.env.REACT_APP_API_URL}ProductLine/DeleteProductLine?productLineId=${activeID}&isActive=${0}`;





                fetch(deletePLineUrl, {
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
                      fetchdata()

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
                    //     fetchdata()

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

export default ProductLine