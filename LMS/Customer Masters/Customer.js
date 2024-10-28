import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Accordion, Form, Button, Spinner, Modal } from "react-bootstrap";
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
import Loader from '../../loader';



import { Box, IconButton, Tooltip, Switch } from '@mui/material';
function Customer() {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])
  const [showDel, setShowDel] = useState(false);
  const [loading, setLoading] = useState(false)





  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalShow = () => setShowModal(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [activeID, setactiveID] = useState(0)





  const [filteringState, setFilteringState] = useState(false)

  // -----------Pagination code------------------------

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

      `${process.env.REACT_APP_API_URL}Customer/GetAllCustomer`,

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
  useEffect(() => {
    
    // if(!filteringState){
      fetchData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // !filteringState
    // sorting,
  ]);

  // ------------------filter code----------------------//
  const [filterCustomerName, setFilterCustomerName] = useState('')
  const [filterMobileName, setFilterMobileName] = useState('')
  const [filterState, setFilterState] = useState('0')
  const [filterCity, setFilterCity] = useState('0')
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

    const url = new URL(

      `${process.env.REACT_APP_API_URL}Customer/GetAllCustomer`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterCustomerName || filterMobileName) {
      url.searchParams.set('CustName',`${filterCustomerName || filterMobileName}`);
        }
    if (filterState) {url.searchParams.set('StateId',`${filterState}`);}
    if (filterCity) {url.searchParams.set('CityId',`${filterCity}`);}


        
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


  
  







  const columns = useMemo(
    () => [

      // {
      //   accessorKey: "custAutoId",
      //   header: "Customer Code",
      // },
      {
        accessorKey: "custName",
        header: "Customer Name",
      },
      {
        accessorKey: "custPhone",
        header: "Customer Phone",
      },
      {
        accessorKey: "custPhone2",
        header: "Customer Phone2",
      },
      {
        accessorKey: "custEmail",
        header: "Customer Email",
      },
      {
        accessorKey: "custAddess",
        header: "Customer Addess",
      },
      {
        accessorKey: "stateName",
        header: "State",
      },
      {
        accessorKey: "cityName",
        header: "City",
      },
      // {
      //   accessorKey: "talukaName",
      //   header: "Taluka",
      // },
      // {
      //   accessorKey: "areaName",
      //   header: "Area",
      // },
      {
        accessorKey: "pinId",
        header: "Pin",
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
                          console.log(cell.row.original.custAutoId);
                          setcustomerID(cell.row.original.custAutoId);
                          handleModalShow()
                          StateUrl()


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
                        console.log(cell.row.original.custAutoId);
                        setactiveID(cell.row.original.custAutoId);
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
                        console.log(cell.row.original.custAutoId);
                        setactiveID(cell.row.original.custAutoId);
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
    onPaginationChange: setFilterPagination || setPagination,

    onSortingChange: setSorting,
    // rowCount=rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination:  filterPagination || pagination,
      // pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });







  const data1 = [
    {
      "Division": "LT Motor",
      "SerialNo": "LT0012",
      "InvoiceNo": "12",
      "InvoiceDate": "10 Jan 2024",
      "Quantity": "20",
      "InWarranty": "Yes",



    },
    {
      "Division": "FHP Motor",
      "SerialNo": "FHP8829",
      "InvoiceNo": "13",
      "InvoiceDate": "15 Feb 2024",
      "Quantity": "30",
      "InWarranty": "Yes",



    },



  ]

  const [mobileError, setMobileError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pinError, setpinError] = useState('')

  const handleMobileChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateMobile = (custPhone) => {
      // Basic mobile number validation regex
      const regex = /^[0-9]{10}$/;
      return regex.test(custPhone);
    };

    if (!validateMobile(value) && value !== "") {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }

    seteditCustomer(prevState => ({
      ...prevState,
      custPhone: value
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateEmail = (custEmail) => {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(custEmail);
    };

    if (!validateEmail(value) && value !== "") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    seteditCustomer(prevState => ({
      ...prevState,
      custEmail: value
    }));
  };
  const handlePinCodeChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validatePincode = (pincode) => {
      // Basic mobile number validation regex
      const regex = /^\d{6}$/;
      return regex.test(pincode);
    };

    if (!validatePincode(value) && value !== "") {
      setpinError('Invalid PinCode. It must be 6 digits only');
    } else {
      setpinError('');
    }

    seteditCustomer(prevState => ({
      ...prevState,
      pinId: value
    }));
  };



  const columns1 = useMemo(
    () => [
      {
        accessorKey: "Division",
        header: "Division",
        size: "50"
      },
      {
        accessorKey: "SerialNo",
        header: "Serial No",
        size: "50"

      },
      {
        accessorKey: "InvoiceNo",
        header: "Invoice No",
        size: "50",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
        ),

      },
      {
        accessorKey: "InvoiceDate",
        header: "Invoice Date",
        size: "300"

      },
      {
        accessorKey: "Quantity",
        header: "Quantity",
        size: "50",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
        ),

      },
      {
        accessorKey: "InWarranty",
        header: "In Warranty?",
        size: "50"

      },
      // {
      //     accessorKey: "AscAddress",
      //     header: "Asc Address",
      //     size:"50"

      //   },
      // {
      //     accessorKey: "PinId",
      //     header: "PinCode",
      //     size:"50",
      //     Cell: ({ cell }) => (
      //       <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
      //     ),

      //   },
      // {
      //     accessorKey: "DivisionCode",
      //     header: "Division",
      //     size:"50",
      //     Cell: ({ cell }) => (
      //       <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
      //     ),

      //   },
      // {
      //     accessorKey: "ProductLineCode",
      //     header: "Product Line",
      //     size:"180"

      //   },
      // {
      //     accessorKey: "AscPAN",
      //     header: "Asc PAN",
      //     size:"180"

      //   },
      // {
      //     accessorKey: "AscGST",
      //     header: "Asc GST",
      //     size:"180"

      //   },

    ]
  );
  let token = localStorage.getItem("UserToken")
  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const StateUrl = () => {
    const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=3&Id=0&Code=0`;
    fetch(stateUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result)
      })

  }
  useEffect(() => {
    StateUrl()
  }, [])




  const fetchAllCustomers = () => {
    const fetchCustomerOption = `${process.env.REACT_APP_API_URL}Customer/GetAllCustomer`;

    fetch(fetchCustomerOption, {
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
    fetchAllCustomers()
  }, [])

  const [editcustomer, seteditCustomer] = useState({
    custAutoId: 0,
    custName: "",
    custPhone: "",
    custPhone2: "",
    custEmail: "",
    custAddess: "",
    stateId: 0,
    cityId: 0,
    talukaId: 0,
    areaId: 0,
    pinId: 0,
    "isActive": true

  })


  const handleChangeEdit = (e) => {

    const newdata = { ...editcustomer };
    newdata[e.target.name] = e.target.value;
    seteditCustomer(newdata);
    console.log(newdata);
  }

  const [custAutoId, setcustomerID] = useState("")

  const getSingleCustomer = `${process.env.REACT_APP_API_URL}Customer/GetCustomerById?customerId=${custAutoId}`;
  useEffect(() => {
    if (custAutoId) {
      fetch(getSingleCustomer, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditCustomer((pre) => {
            return {
              ...pre,
              custAutoId: result?.custAutoId,
              custName: result?.custName,
              custPhone: result?.custPhone,
              custPhone2: result?.custPhone2,
              custEmail: result?.custEmail,
              custAddess: result?.custAddess,
              stateId: result?.stateId,
              cityId: result?.cityId,
              talukaId: result?.talukaId,
              areaId: result?.areaId,
              pinId: result?.pinId,

            }
          })

          if (result.status != 400) {

            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result.stateId}&Code=0`;
            fetch(cityUrl, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setcities(result)
              })
          }

        })
    }
  }, [custAutoId])

  const handleModalClose = () => {
    setShowModal(false)
    fetch(getSingleCustomer, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        seteditCustomer((pre) => {
          return {
            ...pre,
            custAutoId: result?.custAutoId,
            custName: result?.custName,
            custPhone: result?.custPhone,
            custPhone2: result?.custPhone2,
            custEmail: result?.custEmail,
            custAddess: result?.custAddess,
            stateId: result?.stateId,
            cityId: result?.cityId,
            talukaId: result?.talukaId,
            areaId: result?.areaId,
            pinId: result?.pinId,

          }
        })

        if (result.status != 400) {

          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result.stateId}&Code=0`;
          fetch(cityUrl, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setcities(result)
            })
        }
      })

  }


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      setFilterCustomerName(inputValue);
      setFilterMobileName(""); // Reset filterMobileName if filterCustomerName is being set
    } else {
      setFilterCustomerName("");
      setFilterMobileName(inputValue);
    }
  };




  const customHeaders = {
    custName: 'Customer Name',
    custPhone: "Customer Phone",
    custPhone2: "Customer Phone2",
    custEmail: 'Customer Email',
    custAddess: 'Customer Address',
    stateName: 'State',
    cityName: "City",
    pinId: 'Pin'
  }



  return (
    <>
      
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <p className='pg-label m-0'>Customer Master</p>
          <hr />

          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3" >
            <Col md={3} className='mt-3'>
              <Form.Group>
                <Form.Label>Customer Name/Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  value={filterCustomerName || filterMobileName}
                  onChange={handleInputChange}

                  maxLength={100}
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col md={3} className='mt-3'>
              <Form.Group>
                <Form.Label>State </Form.Label>
                <Form.Select aria-label="Default select example" value={filterState} onChange={(e) => {
                  setFilterState(e.target.value)
                  const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${e.target.value ? e.target.value : 0}&Code=0`;
                  fetch(cityUrl, {
                    headers: {
                      "Authorization": `Bearer ${token}`
                    }
                  })
                    .then((res) => res.json())
                    .then((result) => {
                      console.log(result);
                      setcities(result)
                    })
                }}>
                  <option value=''>Select</option>
                  {
                    states?.map((state, index) => {
                      return (
                        <>
                          <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                        </>
                      )
                    })
                  }

                </Form.Select>
              </Form.Group>

            </Col>
            <Col md={3} className='mt-3'>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Select aria-label="Default select example" value={filterCity} name='cityId'
                  onChange={(e) => {
                    setFilterCity(e.target.value)
                  }}
                >
                  <option value=''>Select</option>
                  {
                    cities && cities.map((city, index) => {
                      return (
                        <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>
                      );
                    })
                  }

                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <div className="pt-4">
                <Button
                  variant=""
                  className="add-Btn mt-3"

                  onClick={(e) => {
                    setFilterPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    setPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    fetchFilterPagination()
                    

                  }}

                >
                  Search
                </Button>
                <Button
                  variant=""
                  className="m-2 mt-4"
                  style={{
                    backgroundColor: "#005bab",
                    color: "white",
                    height: "fit-content",
                  }}
                  onClick={() => {
                    setFilterPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    setPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    fetchData()
                    setFilterCustomerName('')
                    setFilterMobileName('')
                    setFilterState('0')
                    setFilterCity('0')
                  }}
                >
                  Reset
                </Button>
              </div>
            </Col>








          </Row>




          {/* <Row className='mb-2'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Customer</Button></Col></Row> */}


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
                //       renderRowActions={({ cell, row, table }) => (

                // enableEditing
                // onEditingRowSave={handleSaveRowEdits}
                // onEditingRowCancel={handleCancelRowEdits}
                //       renderRowActions={({ cell, row, table }) => (

                //         <Box sx={{ display: "flex", gap: "1rem" }}>
                //           {/* <Tooltip arrow placement="left" title="View">
                //   <IconButton 
                //   className="edit-btn"
                //   // onClick={() => table.setEditingRow(row)}
                //   disabled
                //   >
                //     <FaEye color='green'/>
                //   </IconButton>
                // </Tooltip> */}
                //           {
                //             cell.row.original.isActive == false ? "" :
                //               <Tooltip arrow placement="left" title="Edit">
                //                 <IconButton
                //                   className="edit-btn"
                //                   onClick={() => {
                //                     console.log(cell.row.original.custAutoId);
                //                     setcustomerID(cell.row.original.custAutoId);
                //                     handleModalShow()
                //                   }}
                //         <Box sx={{ display: "flex", gap: "1rem" }}>
                //           {/* <Tooltip arrow placement="left" title="View">
                //   <IconButton 
                //   className="edit-btn"
                //   // onClick={() => table.setEditingRow(row)}
                //   disabled
                //   >
                //     <FaEye color='green'/>
                //   </IconButton>
                // </Tooltip> */}
                //           {
                //             cell.row.original.isActive == false ? "" :
                //               <Tooltip arrow placement="left" title="Edit">
                //                 <IconButton
                //                   className="edit-btn"
                //                   onClick={() => {
                //                     console.log(cell.row.original.custAutoId);
                //                     setcustomerID(cell.row.original.custAutoId);
                //                     handleModalShow()
                //                   }}

                //                 >
                //                   <FaRegEdit color='#005bab' />
                //                 </IconButton>
                //               </Tooltip>
                //           }
                //           {
                //             cell.row.original.isActive == false ? "" :
                //               <Tooltip arrow placement="right" title="Delete">
                //                 <IconButton
                //                   color="error"
                //                   onClick={() => {
                //                     console.log(cell.row.original.custAutoId);
                //                     setcustomerID(cell.row.original.custAutoId);
                //                     handleShowDel();
                //                   }}
                //                 >
                //                   <FaRegEdit color='#005bab' />
                //                 </IconButton>
                //               </Tooltip>
                //           }
                //           {
                //             cell.row.original.isActive == false ? "" :
                //               <Tooltip arrow placement="right" title="Delete">
                //                 <IconButton
                //                   color="error"
                //                   onClick={() => {
                //                     console.log(cell.row.original.custAutoId);
                //                     setcustomerID(cell.row.original.custAutoId);
                //                     handleShowDel();
                //                   }}


                //                 >
                //                   <HiOutlineTrash color='red' />
                //                 </IconButton>
                //               </Tooltip>
                //           }
                //         </Box>
                //       )}
                //                 >
                //                   <HiOutlineTrash color='red' />
                //                 </IconButton>
                //               </Tooltip>
                //           }
                //         </Box>
                //       )}

                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                // onPaginationChange={setPagination}
                onPaginationChange={setFilterPagination || setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                state={
                  {
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination:  filterPagination || pagination,
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
                              'custAutoId',
                              'talukaName',
                              'areaName',
                              'talukaId',
                              'areaId',
                              'totalRows',
                              'countryId',
                              'stateId',
                              'cityId',
                              'isActive',
                              'remarks'
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
              // positionActionsColumn="first"

              /> : ""
          }



          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Customer Asset Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <div className='m-4'>


                <MaterialReactTable
                  columns={columns1}
                  data={data1}

                  initialState={{ showColumnFilters: false }} //show filters by default

                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ cell, row, table }) => (

                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      {/* <Tooltip arrow placement="left" title="View">
          <IconButton 
          className="edit-btn"
          // onClick={() => table.setEditingRow(row)}
          disabled
          >
            <FaEye color='green'/>
          </IconButton>
        </Tooltip> */}
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton
                          className="edit-btn"
                          // onClick={() => table.setEditingRow(row)}
                          disabled
                        >
                          <FaRegEdit color='#005bab' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          // onClick={() => handleDeleteRow(row)}
                          disabled

                        >
                          <HiOutlineTrash color='red' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}

                  renderTopToolbarCustomActions={({ table }) => (
                    <>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '10px',
                        flexWrap: 'wrap',
                      }}>

                        <Button variant=''
                          disabled={table.getPrePaginationRowModel().rows.length === 0}
                          //export all rows, including from the next page, (still respects filtering and sorting)
                          onClick={() =>
                            handleExportRows(table.getPrePaginationRowModel().rows)
                          }
                        //   startIcon={}
                        >
                          <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                        </Button>
                        <Button variant=''
                          disabled={table.getPrePaginationRowModel().rows.length === 0}
                          //export all rows, including from the next page, (still respects filtering and sorting)
                          onClick={() =>
                            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                          }
                        //   startIcon={}
                        >
                          <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />


                        </Button>
                      </div>
                    </>

                  )}


                  positionActionsColumn="first"

                />

              </div>

            </Modal.Body>
            {/* <Modal.Footer>
<Button variant="" className='cncl-Btn' onClick={handleClose}>
Close
</Button>
<Button variant="" className='add-Btn' onClick={handleClose}>
Save 
</Button>
</Modal.Footer> */}
          </Modal>

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Accordion defaultActiveKey={0}>
                {
                  loading ? (<Loader />) : (
                    <Accordion.Item eventKey={0}>
                      <Accordion.Header>Customer details</Accordion.Header>
                      <Accordion.Body>
                        <Row className='text-start'>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Customer Name <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='custName'
                                value={editcustomer.custName}
                                onChange={handleChangeEdit}
                                maxLength={100}

                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Customer Mobile No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="tel"
                                name='custPhone'
                                value={editcustomer.custPhone}
                                onChange={handleMobileChange}
                                placeholder=''
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Secondary Contact No.</Form.Label>
                              <Form.Control
                                type="text"
                                name='custPhone2'
                                value={editcustomer.custPhone2}
                                onChange={handleChangeEdit}
                                placeholder=''
                                maxLength={15}
                              />
                            </Form.Group>

                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                as="textarea"
                                name='custAddess'
                                value={editcustomer.custAddess}
                                onChange={handleChangeEdit}
                                rows={1}
                                maxLength={500}

                                placeholder=''
                              />
                            </Form.Group>

                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='custEmail'
                                value={editcustomer.custEmail}
                                onChange={handleEmailChange}
                                placeholder=''
                                maxLength={100}
                              />
                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>

                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>

                              <Form.Label>PinCode  <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="number"
                                name='pinId '
                                value={editcustomer.pinId}
                                onChange={(e) => {
                                  handlePinCodeChange(e)
                                  if (e.target.value && e.target.value?.length == 6) {
                                    seteditCustomer((pre) => {
                                      return {
                                        ...pre,
                                        pinId: e.target.value
                                      }
                                    })
                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${e.target.value}&Code=0`, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {
                                        console.log(result[0]);
                                        seteditCustomer((pre) => {
                                          return {
                                            ...pre,
                                            stateId: result[0]?.parameterTypeId
                                          }
                                        })



                                        // if(result[0]?.parameterTypeId)




                                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
                                        fetch(cityUrl, {
                                          headers: {
                                            "Authorization": `Bearer ${token}`
                                          }
                                        })
                                          .then((res) => res.json())
                                          .then((result) => {
                                            setcities(result);
                                            if (Array.isArray(result)) {
                                              setcities(result);
                                              if (result.length > 0) {
                                                seteditCustomer(prevBranch => ({
                                                  ...prevBranch,
                                                  // cityId:result[0]?.parameterTypeId
                                                }));
                                              }
                                            }
                                            else {
                                              // Reset state and cities if pin code doesn't match
                                              seteditCustomer(prevBranch => ({
                                                ...prevBranch,
                                                stateId: 0,
                                                cityId: 0
                                              }));
                                              setcities('');
                                            }

                                            // setcities(result)
                                          })

                                      })



                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${e.target.value}&Code=0`, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {
                                        console.log(result[0]);
                                        if (Array.isArray(result)) {
                                          setcities(result);
                                          if (result.length > 0) {
                                            seteditCustomer(prevBranch => ({
                                              ...prevBranch,
                                              cityId: result[0]?.parameterTypeId
                                            }));
                                          }
                                        }
                                        else {
                                          setcities([]);
                                        }
                                      })
                                      



                                  }
                                  else {
                                    seteditCustomer((pre) => {
                                      return {
                                        ...pre,
                                        stateId: 0,
                                        cityId: 0
                                      }
                                    })
                                  }
                                }
                                }
                                placeholder=''
                              />
                              {pinError && <span style={{ color: 'red' }}>{pinError}</span>}


                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>State <span className='req-t'>*</span></Form.Label>
                              <Form.Select aria-label="Default select example" value={editcustomer.stateId} onChange={(e) => {
                                seteditCustomer((pre) => {
                                  return {
                                    ...pre,
                                    stateId: e.target.value,
                                    pinId: ''
                                  }
                                })
                                const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${e.target.value}&Code=0`;
                                fetch(cityUrl, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setcities(result)
                                  })
                              }}>
                                <option>Select</option>
                                {
                                  states?.map((state, index) => {
                                    return (
                                      <>
                                        <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                                      </>
                                    )
                                  })
                                }

                              </Form.Select>
                            </Form.Group>

                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>City <span className='req-t'>*</span></Form.Label>
                              <Form.Select aria-label="Default select example" name='cityId' value={editcustomer.cityId}
                                onChange={(e) => {
                                  seteditCustomer((pre) => {
                                    return {
                                      ...pre,
                                      cityId: e.target.value,
                                      pinId: ''

                                    }



                                  })
                                }}
                              >
                                <option>Select</option>
                                {
                                  cities && cities.map((city, index) => {
                                    return (
                                      <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>
                                    );
                                  })
                                }

                              </Form.Select>
                            </Form.Group>
                          </Col>

                        </Row>

                      </Accordion.Body>
                    </Accordion.Item>
                  )}



              </Accordion>



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
                const editCustUrl = `${process.env.REACT_APP_API_URL}Customer/UpsertCustomer`;
                let data = {
                  ...editcustomer
                }


                // if (editcustomer.custAutoId === "" || editcustomer.custName === "" || editcustomer.custPhone === "" || editcustomer.custPhone2 === "" || editcustomer.custAutoId === "" || editcustomer.custEmail === "" || editcustomer.custAddess === "" || editcustomer.stateId === "" || editcustomer.cityId === "" || editcustomer.pinId === 6) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }


                const custName = editcustomer.custName;
                if (!custName) {
                  Swal.fire({
                    icon: "error",
                    title: "Customer name is required "
                  });
                  return;
                }

                const mobileNo = editcustomer.custPhone;
                if (!mobileNo) {
                  Swal.fire({
                    icon: "error",
                    title: "Mobile number is required."
                  });
                  return;
                }

                // Regular expression to match exactly 10 digits
                // const mobileNoRegex = /^\d{10}$/;
                // // Check if mobileNo matches the regex pattern
                // if (!mobileNoRegex.test(mobileNo)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please enter Correct Mobile Number."
                //   });
                //   return;
                // }


                const custAddress = editcustomer.custAddess; // Assuming custAddess represents customer's address
                if (!custAddress) {
                  Swal.fire({
                    icon: "error",
                    title: "Customer address is required"
                  });
                  return;
                }

                const emailId = editcustomer.custEmail;
                if (!emailId) {
                  Swal.fire({
                    icon: "error",
                    title: "Email address is required."
                  });
                  return;
                }



                const pinCode = editcustomer.pinId;
                const pinCodeRegex = /^\d{6}$/;
                if (!pinCode || !pinCodeRegex.test(pinCode)) {
                  Swal.fire({
                    icon: "error",
                    title: "Please enter a valid PIN code consisting of 6 digits."
                  });
                  return;
                }




                const stateName = editcustomer.stateId; // Assuming stateId actually represents the state name

                if (!stateName) {
                  Swal.fire({
                    icon: "error",
                    title: "State name is required"
                  });
                  return;
                }

                const cityName = editcustomer.cityId; // Assuming stateId actually represents the state name
                if (!cityName) {
                  Swal.fire({
                    icon: "error",
                    title: "city name is required"
                  });
                  return;
                }
















                else {
                  try {
                    setLoading(true)
                    fetch(editCustUrl, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      },
                      body: JSON.stringify(data)
                    })
                      .then((res) => {
                        // Define res using let or const
                        let resp = res.text();
                        resp.then((r) => {
                          console.log(r, "---------,");
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

                          if (res.status === 200 && r !== "CUSTASSETEXISTS") {
                            Swal.fire({
                              icon: "success",
                              title: "Updated successfully!"
                            });
                            handleModalClose();
                            fetchAllCustomers();
                            setLoading(false)

                          } else if (res.status === 200 && r === "CUSTASSETEXISTS") {
                            Swal.fire({
                              icon: "warning",
                              title: "Customer already exists!"
                            });
                            setLoading(false)

                          }
                        });
                      });
                  } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                      icon: "error",
                      title: "An error occurred while updating the Customer."
                    });
                    setLoading(false)

                  }
                }

              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Customer?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteCustomerUrl = `${process.env.REACT_APP_API_URL}Customer/DeleteCustomer?customerId=${custAutoId}&isActive=${0}`;

                fetch(deleteCustomerUrl, {
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
                        handleCloseDel();
                        fetchAllCustomers()

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
              <Modal.Title className='mdl-title'>Activate Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Customer?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteCustomerUrl = `${process.env.REACT_APP_API_URL}Customer/DeleteCustomer?customerId=${activeID}&isActive=${1}`;

                fetch(deleteCustomerUrl, {
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
                        fetchAllCustomers()


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
              <Modal.Title className='mdl-title'>De-activate Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Customer?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const deleteCustomerUrl = `${process.env.REACT_APP_API_URL}Customer/DeleteCustomer?customerId=${activeID}&isActive=${0}`;

                fetch(deleteCustomerUrl, {
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
                      fetchAllCustomers()

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
                    //     fetchAllCustomers()


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

export default Customer