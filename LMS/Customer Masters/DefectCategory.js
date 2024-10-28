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
import { Box, IconButton, Tooltip, Switch } from '@mui/material';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import Loader from '../../loader';
function DefectCategory() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [loading, setLoading] = useState(false)

  const [data, setdata] = useState([])
  const [categoryName, setCategoryName] = useState('');

  const handleShow = () => {
    setShow(true)
    AllDivision()
    fetchAllDefectCategories()
  }
  const handleClose = () => {
    setShow(false)
    setaddBranch({
      defectCategoryId: 0,
      defectCategoryName: '',
      divisionCode: "",
      productLineCode: "",
      productGroupCode: "",
      isActive: true
    })

  }
  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


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

        `${process.env.REACT_APP_API_URL}DefectCategory/GetAllDefectCategory`,

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
        header: "Division Name",
      },
      {
        accessorKey: "productLineName",
        header: "Product Line Name",
      },
      {
        accessorKey: "productGroupName",
        header: "Product Group Name",
      },

      {
        accessorKey: "defectCategoryName",
        header: "Category Name",
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
                          console.log(cell.row.original.defectCategoryId);
                          setdefectCategoryID(cell.row.original.defectCategoryId)
                          handleModalShow()
                          AllDivision()
                          fetchAllDefectCategories()


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
                        console.log(cell.row.original.defectCategoryId);
                        setactiveID(cell.row.original.defectCategoryId);
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
                        console.log(cell.row.original.defectCategoryId);
                        setactiveID(cell.row.original.defectCategoryId);
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




  const validateForm = () => {
    let errors = {};
    let isValid = true;
    if (!categoryName) {
      errors.categoryName = "Category Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(categoryName)) {
      errors.categoryName = "Category Name must contain only alphabet letters";
      isValid = false;
    }

    return { isValid, errors };
  };

  const handlesave = () => {
    const { isValid, errors } = validateForm();
    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: Object.values(errors).join("\n"),
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Form submitted successfully!',
    });
    setCategoryName("")
  };


  let token = localStorage.getItem("UserToken")


  const fetchAllDefectCategories = () => {
    const fetchDefectCategoryOptions = `${process.env.REACT_APP_API_URL}DefectCategory/GetAllDefectCategory`;
    fetch(fetchDefectCategoryOptions, {
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




  const [addBranch, setaddBranch] = useState({
    defectCategoryId: 0,
    defectCategoryName: '',
    divisionCode: "",
    productLineCode: "",
    productGroupCode: "",
    isActive: true
  })


  const handleChange = (e) => {
    const newdata = { ...addBranch };
    newdata[e.target.name] = e.target.value;
    setaddBranch(newdata);
    console.log(newdata);
  }

  const [editBranch, seteditBranch] = useState({
    defectCategoryId: 0,
    defectCategoryName: '',
    divisionCode: "",
    productLineCode: "",
    productGroupCode: "",
    isActive: true

  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editBranch };
    newdata[e.target.name] = e.target.value;
    seteditBranch(newdata);
    console.log(newdata);
  }
  const [defectCategoryId, setdefectCategoryID] = useState("")

  const getSingleBranch = `${process.env.REACT_APP_API_URL}DefectCategory/GetDefectCategoryById?defectCategoryId=${defectCategoryId}`;


  useEffect(() => {
    if (defectCategoryId) {
      fetch(getSingleBranch, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          seteditBranch((pre) => {
            return {
              ...pre,
              defectCategoryId: result?.defectCategoryId,
              defectCategoryName: result?.defectCategoryName,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productGroupCode: result?.productGroupCode
            }
          })

          const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.divisionCode}`;
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

          const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${result.productLineCode}`;
          fetch(productGroupURl, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallproductGroup(result);
              // Set default productLineCode if result is not empty

            });



        })
    }
  }, [defectCategoryId])

  const [allDivisions, setallDivisions] = useState([]);
  const [allproductLines, setallproductLines] = useState([])
  const [allproductGroup, setallproductGroup] = useState([])

  const AllDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;
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

        seteditBranch((pre) => {
          return {
            ...pre,
            defectCategoryId: result?.defectCategoryId,
            defectCategoryName: result?.defectCategoryName,
            divisionCode: result?.divisionCode,
            productLineCode: result?.productLineCode,
            productGroupCode: result?.productGroupCode
          }
        })

        const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.divisionCode}`;
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

        const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${result.productLineCode}`;
        fetch(productGroupURl, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setallproductGroup(result);
            // Set default productLineCode if result is not empty

          });
      })

  }

  const customHeaders = {
    divisionName: 'Division',
    productLineName: 'Product Line',
    productGroupName: 'Product Group',
    defectCategoryName: 'Defect Category',
    defectDesc: "Defect Description",
    divisionCode: 'Division Code',
    productLineCode: 'Product Line Code',
    productGroupCode: 'Product Group Code',





  }




  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Defect Category Master</p>
            {Permissions?.isAdd ? <Row className=''><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Defect Category</Button></Col></Row> : ""}

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
                // renderRowActions={({ cell, row, table }) => (

                //   <Box sx={{ display: "flex", gap: "1rem" }}>
                //     {
                //       cell.row.original.isActive == false ? "" :
                //         <Tooltip arrow placement="left" title="Edit">
                //           <IconButton
                //             className="edit-btn"
                //             onClick={() => {
                //               console.log(cell.row.original.defectCategoryId);
                //               setdefectCategoryID(cell.row.original.defectCategoryId)
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
                //               setdefectCategoryID(cell.row.original.defectCategoryId)
                //               setisActive(cell.row.original.defectCategoryId)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}

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
                              "defectCategoryId",
                              "isActive",

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



          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Defect Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (

                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='divisionCode'
                          onChange={(e) => {
                            if (e.target.value === '0') {
                              setaddBranch((pre) => {
                                return {
                                  ...pre,
                                  productLineCode: '',
                                  productGroupCode: ''
                                }
                              })

                            }
                            setaddBranch((pre) => {
                              return {
                                ...pre,
                                divisionCode: e.target.value
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
                              })
                            const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                            fetch(productGroupURl, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setallproductGroup(result);
                                // Set default productLineCode if result is not empty

                              });

                          }}>
                          <option value='0'>Select</option>
                          {allDivisions.map((division) => (
                            <option key={division.divisionCode} value={division.divisionCode}>
                              {division.divisionName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productLineCode'
                          onChange={(e) => {
                            setaddBranch((pre) => {
                              return {
                                ...pre,
                                productLineCode: e.target.value,
                                productGroupCode: ''

                              }
                            })

                            const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                            fetch(productGroupURl, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setallproductGroup(result);
                                // Set default productLineCode if result is not empty

                              });
                          }}>
                          <option value=''>Select</option>
                          {allproductLines.map((productLine) => (
                            <option value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Product Group <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productGroupCode'
                          onChange={(e) => {
                            setaddBranch((pre) => {
                              return {
                                ...pre,
                                productGroupCode: e.target.value
                              }
                            })
                          }}>
                          <option value=''>Select</option>
                          {allproductGroup.map((productLine) => (
                            <option key={productLine.productGroupCode} value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Category Name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='defectCategoryName'
                          onChange={handleChange}
                          placeholder='Enter Category Name'
                        />
                      </Form.Group>
                    </Col>

                  </Row>
                )}



            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const addBranchUrl = `${process.env.REACT_APP_API_URL}DefectCategory/UpsertDefectCategory`;

                let data = {
                  ...addBranch
                }


                const divisionName = addBranch.divisionCode;
                // Check if roleCode is empty or not provided
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }
                const productLineName = addBranch.productLineCode;
                if (!productLineName || productLineName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Line is required"
                  });
                  return;
                }



                const productGroupCode = addBranch.productGroupCode;
                if (!productGroupCode || productGroupCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Group is required"
                  });
                  return;
                }

                const defectCategory = addBranch.defectCategoryName;
                if (!defectCategory) {
                  Swal.fire({
                    icon: "error",
                    title: " Category Name is required "
                  });
                  return;
                }



                else {
                  setLoading(true)
                  fetch(addBranchUrl, {
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



                        if (res.status == 200 && r != "DEFECTCATEXISTS") {
                          Swal.fire({
                            icon: "success",
                            title: "Saved successfully!"
                          })
                          handleClose()
                          fetchAllDefectCategories()
                          setLoading(false)

                        }
                        else if (res.status == 200 && r == "DEFECTCATEXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Defect Category already exists!"
                          })
                          setLoading(false)


                        }
                      })
                    })
                }
              }}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Defect Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              {
                loading ? (<Loader />) : (

                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='divisionCode'
                          value={editBranch?.divisionCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                divisionCode: e.target.value
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



                              })

                          }}>
                          <option>Select</option>
                          {allDivisions.map((division) => (
                            <option key={division.divisionCode} value={division.divisionCode}>
                              {division.divisionName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productLineCode'
                          value={editBranch.productLineCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                productLineCode: e.target.value,

                              }
                            })

                            const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                            fetch(productGroupURl, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setallproductGroup(result);
                                // Set default productLineCode if result is not empty

                              });
                          }}>
                          <option>Select</option>
                          {allproductLines.map((productLine) => (
                            <option value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Product Group <span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productGroupCode'
                          value={editBranch.productGroupCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                productGroupCode: e.target.value
                              }
                            })
                          }}>
                          <option>Select</option>
                          {allproductGroup.map((productLine) => (
                            <option value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Category Name <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='defectCategoryName'
                          value={editBranch.defectCategoryName}
                          onChange={handleChangeEdit}
                          placeholder='Defect Category Name'
                          maxLength={100}

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
                const editBranchUrl = `${process.env.REACT_APP_API_URL}DefectCategory/UpsertDefectCategory`;
                let data = {
                  ...editBranch
                }
                const divisionName = data.divisionCode;
                // Check if roleCode is empty or not provided
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }
                const productLineName = data.productLineCode;
                if (!productLineName || productLineName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Line is required"
                  });
                  return;
                }



                const productGroupCode = data.productGroupCode;
                if (!productGroupCode || productGroupCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Group is required"
                  });
                  return;
                }

                const defectCategory = data.defectCategoryName;
                if (!defectCategory) {
                  Swal.fire({
                    icon: "error",
                    title: " Category Name is required "
                  });
                  return;
                }




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

                      if (res.status == 200 && r != "DEFECTCATEXISTS ") {
                        Swal.fire({
                          icon: "success",
                          title: "Updated successfully!"
                        })
                        handleModalClose()
                        fetchAllDefectCategories()
                        setLoading(false)


                      }
                      else if (res.status == 200 && r == "DEFECTCATEXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Defect Category already exists!"
                        })
                        setLoading(false)


                      }
                    })
                  })
              }


              }>
                Update
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Defect category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Defect category?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}DefectCategory/DeleteDefectCategory?defectCategoryId=${defectCategoryId}&isActive=${0}`;

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
                        fetchAllDefectCategories()

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
              <Modal.Title className='mdl-title'>Activate Defect Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Defect Category?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDefectCategoryUrl = `${process.env.REACT_APP_API_URL}DefectCategory/DeleteDefectCategory?defectCategoryId=${activeID}&isActive=${1}`;

                fetch(deleteDefectCategoryUrl, {
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
                        fetchAllDefectCategories()



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
              <Modal.Title className='mdl-title'>De-activate DefectCategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this DefectCategory?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDefectCategoryUrl = `${process.env.REACT_APP_API_URL}DefectCategory/DeleteDefectCategory?defectCategoryId=${activeID}&isActive=${0}`;

                fetch(deleteDefectCategoryUrl, {
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
                      fetchAllDefectCategories()

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
                    //     fetchAllDefectCategories()

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

export default DefectCategory