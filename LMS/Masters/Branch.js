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
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../loader';

function Branch() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleClose = () => {
    setShow(false)
    setaddBranch({
      branchId: 0,
      branchCode: "",
      branchName: "",
      remarks: "",
      regionCode: "",
      branchAddress: "",
      countryId: 1,
      stateId: "",
      cityId: "",
      districtId: "",
      pinCode: "",
      phone: "",
      email: "",
      isActive: true
    })


  };
  const handleShow = () => {
    setShow(true)
    StateUrl()
    AllRegion()
    CountriesUrl()


  };

  const handleShow1 = () => setShow1(true);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  // const [show1, setShow1] = useState(false);

  // const handleClose1 = () => setShow1(false);
  // const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [isActive, setisActive] = useState("")

  let token = localStorage.getItem("UserToken")
  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  const [data, setdata] = useState([]);

  const fetchAllBranches = () => {
    const getAllBranches = `${process.env.REACT_APP_API_URL}Branch/GetAllBranch`;

    fetch(getAllBranches, {
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
    fetchAllBranches()
  }, [])



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

        `${process.env.REACT_APP_API_URL}Branch/GetAllBranch`,

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
  const [pinError, setpinError] = useState('')

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

    setaddBranch(prevState => ({
      ...prevState,
      pinCode: value
    }));
  };

  const EdithandlePinCodeChange = (e) => {
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

    seteditBranch(prevState => ({
      ...prevState,
      pinCode: value
    }));
  };




  const columns = useMemo(
    () => [

      {
        accessorKey: "regionName",
        header: "Region",
        size: "50"

      },
      {
        accessorKey: "branchCode",
        header: "Branch Code",
        size: "50"

      },
      {
        accessorKey: "branchName",
        header: "Branch Name",
        size: "50"
      },
      {
        accessorKey: "branchAddress",
        header: "Branch Address",
        size: "300"

      },
      // {
      //   accessorKey: "countryId",
      //   header: "Country",
      //   size: "50",
      //   Cell: ({ cell }) => (
      //     <p className='m-0'>{cell.getValue() == "1" ? "India" : ""}</p>
      //   ),

      // },
      {
        accessorKey: "stateName",
        header: "State",
        size: "50"

      },
      {
        accessorKey: "cityName",
        header: "City",
        size: "50"

      },
      {
        accessorKey: "pinCode",
        header: "PinCode",
        size: "50",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()}</p>
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
                          console.log(cell.row.original.branchId);
                          setbarnchID(cell.row.original.branchId)
                          handleShow1()
                          AllRegion()
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
                        console.log(cell.row.original.branchId);
                        setactiveID(cell.row.original.branchId);
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
                        console.log(cell.row.original.branchId);
                        setactiveID(cell.row.original.branchId);
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





  const [Regions, setRegions] = useState([]);

  const AllRegion = () => {
    const regionUrl = `${process.env.REACT_APP_API_URL}Region/GetAllRegions`;
    fetch(regionUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRegions(result)
      })

  }






  const [countries, setcountries] = useState([])
  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])


  const [stateId, setstateId] = useState("");
  const [countryId, setcountryId] = useState("");


  const CountriesUrl = () => {
    const commonUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=2&Id=0&Code=0`;
    fetch(commonUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setcountries(result)
      })

  }


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





  const [addBranch, setaddBranch] = useState({
    branchId: 0,
    branchCode: "",
    branchName: "",
    remarks: "",
    regionCode: "",
    branchAddress: "",
    countryId: 1,
    stateId: "",
    cityId: "",
    districtId: "",
    pinCode: "",
    phone: "",
    email: "",
    isActive: true
  })










  const handleChange = (e) => {
    const newdata = { ...addBranch };
    newdata[e.target.name] = e.target.value;
    setaddBranch(newdata);
    console.log(newdata);
  }


  // const handleSubmit=(e)=>{
  //   e.preventDefault();

  // }

  const [editBranch, seteditBranch] = useState({
    branchId: 0,
    branchCode: "",
    branchName: "",
    remarks: "",
    regionCode: "",
    branchAddress: "",
    countryId: 1,
    stateId: "",
    cityId: "",
    districtId: "",
    pinCode: "",
    phone: "",
    email: "",
    isActive: true
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editBranch };
    newdata[e.target.name] = e.target.value;
    seteditBranch(newdata);
    console.log(newdata);
  }


  const [barnchID, setbarnchID] = useState("")

  const getSingleBranch = `${process.env.REACT_APP_API_URL}Branch/GetBranchById?branchId=${barnchID}`;

  useEffect(() => {
    if (barnchID) {
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
              branchId: result?.branchId,
              branchCode: result?.branchCode,
              branchName: result?.branchName,
              remarks: result?.remarks,
              regionCode: result?.regionCode,
              branchAddress: result?.branchAddress,
              // countryId: result?.countryId,
              stateId: result?.stateId,
              cityId: result?.cityId,
              pinCode: result?.pinCode,
              phone: result?.phone,
              email: result?.email
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
  }, [barnchID])

  const handleClose1 = () => {
    setShow1(false)
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
            branchId: result?.branchId,
            branchCode: result?.branchCode,
            branchName: result?.branchName,
            remarks: result?.remarks,
            regionCode: result?.regionCode,
            branchAddress: result?.branchAddress,
            // countryId: result?.countryId,
            stateId: result?.stateId,
            cityId: result?.cityId,
            pinCode: result?.pinCode,
            phone: result?.phone,
            email: result?.email
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

  const customHeaders = {
    regionName: "Region",
    branchCode:'Branch Code',
    regionCode:'Region Code',
    stateName: 'State',
    cityName: "City",
    pinCode: 'PinCode',
    branchName: 'Branch Name',
    branchAddress: 'Branch Address',
    email:'Email',
    phone:'Phone Number'
  }




  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Branch Master</p>

            {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Branch</Button></Col></Row> : ""}

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
                renderRowActions={({ cell, row, table }) => (

                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="left" title="Edit">
                          <IconButton
                            className="edit-btn"
                            onClick={() => {
                              console.log(cell.row.original.branchId);
                              setbarnchID(cell.row.original.branchId)
                              handleShow1()
                            }}

                          >
                            <FaRegEdit color='#005bab' />
                          </IconButton>
                        </Tooltip>
                    }
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => {
                              setbarnchID(cell.row.original.branchId)
                              setisActive(cell.row.original.branchId)
                              handleShowDel()
                            }}


                          >
                            <HiOutlineTrash color='red' />
                          </IconButton>
                        </Tooltip>
                    }

                  </Box>
                )}

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
                              'branchId',
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

              /> : ""
          }




          <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (


                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Region <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example"

                          name='regionCode'
                          onChange={handleChange}>
                          <option>Select</option>
                          {Regions?.map((region, index) => {
                            return (
                              <>

                                <option value={region?.regionCode} key={index}>{region?.regionName}</option>
                              </>
                            )
                          })
                          }
                          {/* <option value="2">West</option>
      <option value="3">North</option>
      <option value="4">South</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Branch Code <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='branchCode'
                          onChange={handleChange}
                          placeholder=''
                          maxLength={20}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                    <Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Branch Name <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='branchName'
                            onChange={handleChange}
                            placeholder=''
                            maxLength={50}
                          />
                        </Form.Group>
                      </Col>


                      {/* <Col md={6}>
      <Form.Group>
        <Form.Label>Mobile No </Form.Label>
        <Form.Control
          type="tel"
          name='phone'
          onChange={handleChange}
          placeholder=''
        />
      </Form.Group>
    </Col> */}
                    </Row><Row className='mt-3'>
                      {/* <Col md={6}>
      <Form.Group>
        <Form.Label>Country <span className='req-t'>*</span></Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => {
          setcountryId(e.target.value)
          setaddBranch((pre) => {
            return {
              ...pre,
              countryId: e.target.value
            }
          })
        }}>
          <option>Select</option>
          {
            countries?.map((country, index) => {
              return (
                <>
                  <option value={country?.parameterTypeId}>{country?.parameterType}</option>

                </>
              )
            })
          }

        </Form.Select>
      </Form.Group>
    </Col> */}


                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Pin Code <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name='pinCode'
                            value={addBranch.pinCode}
                            onChange={(e) => {
                              handlePinCodeChange(e)
                              if (e.target.value && e.target.value?.length == 6) {
                                const pinCode = e.target.value;

                                setaddBranch(prevBranch => ({
                                  ...prevBranch,
                                  pinCode: pinCode
                                }));

                                fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${pinCode}&Code=0`, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    if (result && result.length > 0) {
                                      const stateId = result[0]?.parameterTypeId;
                                      const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${stateId}&Code=0`;

                                      setaddBranch(prevBranch => ({
                                        ...prevBranch,
                                        stateId: stateId
                                      }));

                                      fetch(cityUrl, {
                                        headers: {
                                          "Authorization": `Bearer ${token}`
                                        }
                                      })
                                        .then((res) => res.json())
                                        .then((citiesResult) => {
                                          setcities(citiesResult);
                                          if (Array.isArray(citiesResult)) {
                                            setcities(citiesResult);
                                            if (citiesResult.length > 0) {
                                              setaddBranch(prevBranch => ({
                                                ...prevBranch,
                                                // cityId: citiesResult[0]?.parameterTypeId
                                              }));
                                            }
                                          }
                                        });
                                    } else {
                                      // Reset state and cities if pin code doesn't match
                                      setaddBranch(prevBranch => ({
                                        ...prevBranch,
                                        stateId: 0,
                                        cityId: 0
                                      }));
                                      setcities('');
                                    }
                                  })
                                  .catch((error) => {
                                    console.error('Error fetching state data:', error);
                                  });

                                // Include the additional API call here
                                fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${pinCode}&Code=0`, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    if (Array.isArray(result)) {
                                      setcities(result);
                                      if (result.length > 0) {
                                        setaddBranch(prevBranch => ({
                                          ...prevBranch,
                                          cityId: result[0]?.parameterTypeId
                                        }));
                                      }
                                    }
                                    else {
                                      setcities([]);
                                    }
                                  })
                                  .catch((error) => {
                                    console.error('Error fetching city data:', error);
                                  });
                              }

                              else {
                                setaddBranch((pre) => {
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
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>State <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" value={addBranch?.stateId} onChange={(e) => {
                            setaddBranch((pre) => {
                              return {
                                ...pre,
                                stateId: e.target.value,
                                pinCode: ''
                              }
                            })
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
                            <option value="">Select</option>
                            {
                              states?.map((state, index) => {
                                return (
                                  <>
                                    <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                                  </>
                                );
                              })}

                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>City <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" disabled value={addBranch?.cityId} name='cityId'
                            onChange={(e) => {
                              setaddBranch((pre) => {
                                return {
                                  ...pre,
                                  cityId: e.target.value,
                                  pinCode: ''
                                };
                              });
                            }}
                          >
                            <option>Select</option>
                            {cities && cities?.map((city, index) => {
                              return (
                                <>
                                  <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                </>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>District <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" disabled value={addBranch?.cityId} name='districtId'
                            onChange={(e) => {
                              setaddBranch((pre) => {
                                return {
                                  ...pre,
                                  cityId: e.target.value,
                                  pinCode: ''

                                };
                              });
                            }}

                          >
                            <option>Select</option>
                            {cities && cities?.map((city, index) => {
                              return (
                                <>
                                  <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                </>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      {/* <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name='email'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </Form.Group>
                </Col> */}
                    </Row>
                    <Row className='mt-3'>
                      <Col>
                        <Form.Group>
                          <Form.Label>Address</Form.Label>
                          <Form.Control as="textarea" rows={2} name='branchAddress' maxLength={200} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
              {/* <Row className='mt-3'>
              
              </Row> */}

              {/* <Row className='mt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control as="textarea" name='remarks' onChange={handleChange} rows={2} />

                  </Form.Group>
                </Col>
              </Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn ' disabled={pinError} onClick={(e) => {
                e.preventDefault();

                const addBranchUrl = `${process.env.REACT_APP_API_URL}Branch/UpsertBranch`;

                let data = {
                  ...addBranch,
                  countryId: parseInt(addBranch.countryId),
                  stateId: parseInt(addBranch.stateId),
                  cityId: parseInt(addBranch.cityId),
                  pinCode: parseInt(addBranch.pinCode)
                }


                // if (addBranch.branchCode === "" || addBranch.branchName === "" || addBranch.remarks === "" || addBranch.regionCode === "" || addBranch.branchAddress === "" || addBranch.countryId === "" || addBranch.stateId === "" || addBranch.cityId === "" || addBranch.pinCode === "" || addBranch.phone === "" || addBranch.email === "") {
                //     Swal.fire({
                //       icon:"error",
                //       title:"Please fill all the fields marked with red *"
                //     })
                // }

                const regionCode = addBranch.regionCode;
                if (!regionCode || regionCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Region is required"
                  });
                  return;
                }

                const branchCode = addBranch.branchCode;
                if (!branchCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch code is required"
                  });
                  return;
                }

                const branchName = addBranch.branchName;
                if (!branchName) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch name is required"
                  });
                  return;
                }


                const pinCode = addBranch.pinCode;
                const pinCodeRegex = /^\d{6}$/;
                if (!pinCode || !pinCode.match(pinCodeRegex)) {
                  Swal.fire({
                    icon: "error",
                    title: "Please enter a valid PIN code consisting of 6 digits."
                  });
                  return;
                }







                const stateName = addBranch.stateId; // Assuming stateId actually represents the state name
                if (!stateName) {
                  Swal.fire({
                    icon: "error",
                    title: "state name is required"
                  });
                  return;
                }
                const cityName = addBranch.cityId; // Assuming stateId actually represents the state name
                if (!cityName) {
                  Swal.fire({
                    icon: "error",
                    title: "city name is required"
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

                        // const errorData = JSON.parse(r);
                        //     console.log('errorData-------------', errorData);
                        //     if (errorData && errorData.title === "One or more validation errors occurred.") {
                        //       // Construct error message from the error object
                        //       let errorMessage = "";
                        //       for (const key in errorData.errors) {
                        //         errorMessage += `${errorData.errors[key][0]}\n`;
                        //       }
                        //       Swal.fire({
                        //         icon: "error",
                        //         title: errorMessage
                        //       });
                        //     }



                        if (res.status == 200 && r != "BREXISTS" && r != 'INVALIDPINCODE') {
                          Swal.fire({
                            icon: "success",
                            title: "Saved successfully!"
                          })
                          handleClose()
                          fetchAllBranches()
                          setLoading(false)


                        }
                        if (res.status == 200 && r == "BREXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Branch already exists!"
                          });
                          setLoading(false)

                        } else if (res.status === 200 && r == 'INVALIDPINCODE') {
                          Swal.fire({
                            icon: "warning",
                            title: "InValid Pin Code"
                          });
                          setLoading(false)

                        }
                      })



                      // if(res"BREXISTS"){
                      //   alert("got it")
                      // }
                    })
                }

                // window.location.reload()
                // else if(res.body)
                // .then((result)=>{
                //   console.log(result);

                // })
              }}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>







          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (

                  <><Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Region <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='regionCode' value={editBranch.regionCode} onChange={handleChangeEdit}>
                          <option>Select</option>
                          {Regions?.map((region, index) => {
                            return (
                              <>

                                <option value={region?.regionCode} key={index}>{region?.regionName}</option>
                              </>
                            );
                          })}
                          {/* <option value="2">West</option>
<option value="3">North</option>
<option value="4">South</option> */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Branch Code <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name='branchCode'
                          value={editBranch.branchCode}
                          readOnly
                          // onChange={handleChangeEdit}
                          placeholder='' />
                      </Form.Group>
                    </Col>
                  </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Branch Name <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='branchName'
                            value={editBranch.branchName}
                            readOnly
                            placeholder='' />
                        </Form.Group>
                      </Col>


                      {/* <Col md={6}>
      <Form.Group>
        <Form.Label>Mobile No </Form.Label>
        <Form.Control
          type="tel"
          name='phone'
          value={editBranch.phone}
          onChange={handleChangeEdit}
          placeholder=''
        />
      </Form.Group>
    </Col> */}
                    </Row><Row className='mt-3'>
                      {/* <Col md={6}>
      <Form.Group>
        <Form.Label>Country <span className='req-t'>*</span></Form.Label>
        <Form.Select aria-label="Default select example" value={editBranch.countryId} onChange={(e) => {
          setcountryId(e.target.value)
          setaddBranch((pre) => {
            return {
              ...pre,
              countryId: e.target.value
            }
          })
        }}>
          <option>Select</option>
          {
            countries?.map((country, index) => {
              return (
                <>
                  <option value={country?.parameterTypeId}>{country?.parameterType}</option>

                </>
              )
            })
          }

                    </Form.Select>
                  </Form.Group>
                </Col> */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Pin Code <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name='pinCode'
                            value={editBranch.pinCode}
                            onChange={(e) => {
                              EdithandlePinCodeChange(e)
                              if (e.target.value && e.target.value?.length == 6) {
                                seteditBranch((pre) => {
                                  return {
                                    ...pre,
                                    pinCode: e.target.value
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
                                    seteditBranch((pre) => {
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
                                            seteditBranch(prevBranch => ({
                                              ...prevBranch,
                                              // cityId:result[0]?.parameterTypeId
                                            }));
                                          }
                                        }
                                        else {
                                          // Reset state and cities if pin code doesn't match
                                          seteditBranch(prevBranch => ({
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
                                        seteditBranch(prevBranch => ({
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
                                seteditBranch((pre) => {
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
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>State <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" value={editBranch.stateId} onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                stateId: e.target.value,
                                pinCode: ''
                              }
                            })
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
                            <option value="">Select</option>
                            {
                              states?.map((state, index) => {
                                return (
                                  <>
                                    <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                                  </>
                                );
                              })}

                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row><Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>City <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name='cityId' disabled value={editBranch.cityId}
                            onChange={(e) => {
                              seteditBranch((pre) => {
                                return {
                                  ...pre,
                                  cityId: e.target.value,
                                  pinCode: ''
                                };
                              });
                            }}

                          >
                            <option>Select</option>
                            {cities && cities?.map((city, index) => {
                              return (
                                <>
                                  <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                </>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>District <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" disabled name='districtId' value={editBranch.cityId}
                            onChange={(e) => {
                              seteditBranch((pre) => {
                                return {
                                  ...pre,
                                  cityId: e.target.value,
                                };
                              });
                            }}

                          >
                            <option>Select</option>
                            {cities && cities?.map((city, index) => {
                              return (
                                <>
                                  <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                </>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name='email'
          value={editBranch.email}
          onChange={handleChangeEdit}
          placeholder=''
        />
      </Form.Group>
    </Col> */}
                    </Row><Row className='mt-3'>
                      <Col>
                        <Form.Group>
                          <Form.Label>Address</Form.Label>
                          <Form.Control as="textarea" rows={2} name='branchAddress' value={editBranch.branchAddress} onChange={handleChangeEdit} />
                        </Form.Group>
                      </Col>
                    </Row></>

                )}


              {/* <Row className='mt-3'>
              
              </Row> */}

              {/* <Row className='mt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control as="textarea" name='remarks' value={editBranch.remarks} onChange={handleChangeEdit} rows={2} />

                  </Form.Group>
                </Col>
              </Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' disabled={pinError} onClick={(e) => {
                e.preventDefault();

                const editBranchUrl = `${process.env.REACT_APP_API_URL}Branch/UpsertBranch`;




                let data = {
                  ...editBranch,
                  countryId: parseInt(editBranch.countryId),
                  stateId: parseInt(editBranch.stateId),
                  cityId: parseInt(editBranch.cityId),
                  pinCode: parseInt(editBranch.pinCode)
                }


                // if (editBranch.branchCode === "" || editBranch.branchName === "" || editBranch.remarks === "" || editBranch.regionCode === "" || editBranch.countryId === "" || editBranch.stateId === "" || editBranch.cityId === "" || editBranch.pinCode === "" || editBranch.email === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }


                const regionCode = editBranch.regionCode;
                if (!regionCode || regionCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Region is required"
                  });
                  return;
                }

                const branchCode = editBranch.branchCode;
                if (!branchCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch code is required"
                  });
                  return;
                }

                const branchName = editBranch.branchName;
                if (!branchName) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch name is required"
                  });
                  return;
                }


                // const pinCode = editBranch.pinCode;
                // const pinCodeRegex = /^\d{6}$/;
                // if (!pinCode || !pinCode.match(pinCodeRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please enter a valid PIN code consisting of 6 digits."
                //   });
                //   return;
                // }

                const pinCode = editBranch.pinCode;
                if (!pinCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Pin Code is required"
                  });
                  return;
                }

                const pinCodeRegex = /^\d{6}$/;

                if (typeof pinCode !== 'number' && !pinCodeRegex.test(pinCode.toString())) {
                  console.error("Invalid PIN code:", pinCode);
                  Swal.fire({
                    icon: "error",
                    title: "Please enter a valid PIN code consisting of 6 digits."
                  });
                  return;
                }










                const stateName = editBranch.stateId; // Assuming stateId actually represents the state name
                if (!stateName) {
                  Swal.fire({
                    icon: "error",
                    title: "state name is required"
                  });
                  return;
                }
                const cityName = editBranch.cityId; // Assuming stateId actually represents the state name
                if (!cityName) {
                  Swal.fire({
                    icon: "error",
                    title: "city name is required"
                  });
                  return;
                }







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
                          handleClose1()
                          fetchAllBranches()
                          setLoading(false)


                        }
                        if (res.status == 200 && r == "BREXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Branch already exists!"
                          });
                          setLoading(false)

                        } else if (res.status === 200 && r == 'INVALIDPINCODE') {
                          Swal.fire({
                            icon: "warning",
                            title: "InValid Pin Code"
                          });
                          setLoading(false)

                        }
                      })



                      // if(res"BREXISTS"){
                      //   alert("got it")
                      // }
                    })
                }

                // window.location.reload()
                // else if(res.body)
                // .then((result)=>{
                //   console.log(result);

                // })
              }}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>





          {/* -------------------------Delete------------------ */}



          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this branch?


            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Branch/DeleteBranch?branchId=${barnchID}&isActive=${0}`;







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
                        fetchAllBranches()

                      }
                      else {
                        Swal.fire({
                          icon: "error",
                          title: "Something went wrong!"
                        })
                      }
                    })



                    // if(res"BREXISTS"){
                    //   alert("got it")
                    // }
                  })


                // window.location.reload()
                // else if(res.body)
                // .then((result)=>{
                //   console.log(result);

                // })
              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>



          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Branch?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Branch/DeleteBranch?branchId=${activeID}&isActive=${1}`;

                fetch(deleteBranchUrl, {
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
                        fetchAllBranches()



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
              <Modal.Title className='mdl-title'>De-activate Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Branch?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Branch/DeleteBranch?branchId=${activeID}&isActive=${0}`;

                fetch(deleteBranchUrl, {
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
                      fetchAllBranches()

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
                    //     fetchAllBranches()



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

export default Branch