import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal, Accordion } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Multiselect from 'multiselect-react-dropdown';
import { MultiSelect } from 'react-multi-select-component';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import { handleResponse } from '../../../Components/Generic/utility';



import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Select from "react-select"
import Loader from '../../loader';
function Vendor() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)


  const [panError, setpanError] = useState("")


  const [gstError, setgstError] = useState("")

  const handleShow = () => {
    setShow(true)
    StateURL()
    ALLDivision()
  }


  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);

  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);
  let token = localStorage.getItem("UserToken")

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  const [data, setdata] = useState([])

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };



  const fetchdata = () => {
    const allVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/GetAllVendor`;

    fetch(allVendorUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, '00---------------');
        setdata(result)
      })
  }
  useEffect(() => {
    fetchdata()
  }, [])


  const [addvendor, setaddvendor] = useState({
    vendorId: 0,
    SAPvendorCode: "",
    vendorCode: "",
    vendorName: "",
    initialBatch: "a",
    mobileNo: "",
    emailId: "",
    panNo: "",
    isGstApplicable: false,
    gstNo: "",
    isMSME: false,
    msmeCode: "",
    vendorAddress: "",
    divisionCode: [],
    productLineCode: [],
    productGroupCode: [],
    stateId: 0,
    cityId: 0,
    pinId: 0,
    isActive: true


  })

  const handleClose = () => {
    setShow(false)
    setaddvendor({
      vendorId: 0,
      SAPvendorCode: "",
      vendorCode: "",
      vendorName: "",
      initialBatch: "a",
      mobileNo: "",
      emailId: "",
      panNo: "",
      isGstApplicable: false,
      gstNo: "",
      isMSME: false,
      msmeCode: "",
      vendorAddress: "",
      divisionCode: [],
      productLineCode: [],
      productGroupCode: [],
      stateId: 0,
      cityId: 0,
      pinId: 0,
      isActive: true

    })

  }




  const handleChange = (e) => {
    const newdata = { ...addvendor };
    newdata[e.target.name] = e.target.value;
    setaddvendor(newdata);
    console.log(newdata);
  }
  const handleVendorCodeChange = (e) => {
    const newdata = { ...addvendor };
    newdata[e.target.name] = e.target.value;
    setaddvendor(newdata);
    if(newdata.vendorCode.length < 2 && newdata.vendorCode.length != 0){
      setVendorError("Vendor Code should not be less than 2 characters")
    }
    else{
      setVendorError("")
    }
    console.log(newdata);
  }

  const [mobileNo, setmobileNo] = useState("")



  const [editVendor, seteditVendor] = useState({
    vendorId: 0,
    SAPvendorCode: "",
    vendorCode: "",
    vendorName: "",
    initialBatch: "a",
    mobileNo: "",
    emailId: "",
    panNo: "",
    isGstApplicable: false,
    gstNo: "",
    isMSME: false,
    msmeCode: "",
    vendorAddress: "",
    divisionCode: [],
    productLineCode: [],
    productGroupCode: [],
    stateId: 0,
    cityId: 0,
    pinId: 0,
    isActive: true
  })




  const handleChangeEdit = (e) => {
    const newdata = { ...editVendor };
    newdata[e.target.name] = e.target.value;
    seteditVendor(newdata);
    console.log(newdata);
  }


  const [showIsActive, setIsActive] = useState(false);

  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);


  const [showIsActive1, setIsActive1] = useState(false);

  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [activeID, setactiveID] = useState(0)







  const [filteringState, setfilteringState] = useState(false)

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

      `${process.env.REACT_APP_API_URL}Vendor/GetAllVendor`,

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

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);


  const [AllStates, setAllStates] = useState([])


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=3&Id=0&Code=0`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllStates(result)
      })
  }, [])

  const [filterVendorName, setfilterVendorName] = useState("");
  const [filterVendorState, setfilterVendorState] = useState(0);

  const [filterPagination, setfilterPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })


  const fetchDataFiltered = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}Vendor/GetAllVendor`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination.pageSize}`);
    if (filterVendorName) { url.searchParams.set('VendorName', `${filterVendorName}`) }
    if (filterVendorState) { url.searchParams.set('StateId', `${parseInt(filterVendorState)}`) }

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

    fetchDataFiltered();

  }, [filterPagination?.pageIndex, filterPagination?.pageSize])




















  const [mobileError, setMobileError] = useState('')
  const [vendorError, setVendorError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pinError, setpinError] = useState('')


  const handleMobileChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateMobile = (mobile) => {
      // Basic mobile number validation regex
      const regex = /^[0-9]{10}$/;
      return regex.test(mobile);
    };

    if (!validateMobile(value) && value !== "") {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }

    setaddvendor(prevState => ({
      ...prevState,
      mobileNo: value
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateEmail = (email) => {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(value) && value !== "") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    setaddvendor(prevState => ({
      ...prevState,
      emailId: value
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

    setaddvendor(prevState => ({
      ...prevState,
      pinId: value
    }));
  };

  const EdithandleMobileChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateMobile = (mobile) => {
      // Basic mobile number validation regex
      const regex = /^[0-9]{10}$/;
      return regex.test(mobile);
    };

    if (!validateMobile(value) && value !== "") {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }

    seteditVendor(prevState => ({
      ...prevState,
      mobileNo: value
    }));
  };

  const EdithandleEmailChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateEmail = (email) => {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(value) && value !== "") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    seteditVendor(prevState => ({
      ...prevState,
      emailId: value
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

    seteditVendor(prevState => ({
      ...prevState,
      pinId: value
    }));
  };




  const columns = useMemo(
    () => [

      {
        accessorKey: "vendorCode",
        header: "Vendor Code",
      },
      {
        accessorKey: "vendorName",
        header: "Vendor Name",
      },
      {
        accessorKey: "noOfDivision",
        header: "No. Of Division",
      },
      {
        accessorKey: "noOfProductLine",
        header: "No. Of Product Line",
      },
      {
        accessorKey: "vendorAddress",
        header: "Vendor Address",
      },
      {
        accessorKey: "stateName",
        header: "State",
      },
      {
        accessorKey: "cityName",
        header: "City",
      },
      {
        accessorKey: "pinId",
        header: "Pin Code",
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
                          console.log(cell.row.original.vendorId);
                          setVendorId(cell.row.original?.vendorId);
                          handleShow1()
                          StateURL()
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
                        console.log(cell.row.original.vendorId);
                        setactiveID(cell.row.original.vendorId);
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
                        console.log(cell.row.original.vendorId);
                        setactiveID(cell.row.original.vendorId);
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





  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])
  const [stateId, setstateId] = useState("");

  const StateURL = () => {
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






  const [allDivisions, setallDivisions] = useState([]);


  const [allproductLines, setallproductLines] = useState([])


  const [allProductGroups, setallProductGroups] = useState([])

  const ALLDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;
    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result.map(division => ({ value: division.parameterTypeId, label: division.parameterType })))
      })

  }


  // console.log(allDivisions.map(division => ({ value: division.parameterTypeId, label: division.parameterType })))





  const [VendorId, setVendorId] = useState(0);



  const [selectedDivisionArray, setselectedDivisionArray] = useState([]);

  const [selectedProductLineArray, setselectedProductLineArray] = useState([]);

  const [selectedProductGroupArray, setselectedProductGroupArray] = useState([]);





  const [selectedDivString, setselectedDivString] = useState("")


  const [selectedProductLineString, setselectedProductLineString] = useState("")

  const [selectedProductGroupString, setselectedProductGroupString] = useState("")




  // useEffect(()=>{

  // },[])








  useEffect(() => {

    if (VendorId) {

      fetch(`${process.env.REACT_APP_API_URL}Vendor/GetVendorById?vendorId=${VendorId ? VendorId : VendorId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          seteditVendor((pre) => {
            return {
              ...pre,
              vendorId: result?.vendorId,
              SAPvendorCode: result?.sapVendorCode,
              vendorCode: result?.vendorCode,
              vendorName: result?.vendorName,
              mobileNo: result?.mobileNo,
              emailId: result?.emailId,
              panNo: result?.panNo,
              isGstApplicable: result?.isGstApplicable,
              gstNo: result?.gstNo,
              isMSME: result?.isMSME,
              msmeCode: result?.msmeCode,
              vendorAddress: result?.vendorAddress,
              pinId: result?.pinId,
              stateId: result?.stateId,
              cityId: result?.cityId,
              divisionCode: result?.divisionCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
              productLineCode: result?.productLineCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
              productGroupCode: result?.productGroupCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType }))

            }
          })



          const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

          fetch(getAllDivisions, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallDivisions(result.map(division => ({ value: division.parameterTypeId, label: division.parameterType })))
            })


          let divisionCodes = result?.divisionCodeList?.map(item => item?.parameterTypeId).toString();

          console.log(divisionCodes);




          let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodes ? divisionCodes : 0}`;

          fetch(getAllProductLines1, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallproductLines(result.map(division => ({ value: division.parameterTypeId, label: division.parameterType })))



            })

          let productLineCodes = result?.productLineCodeList?.map(item => item?.parameterTypeId).toString();

          console.log(divisionCodes);


          const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineCodes ? productLineCodes : 0}`;

          fetch(getAllProductGroup, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallProductGroups(result.map(division => ({ value: division.parameterTypeId, label: division.parameterType })))

            })




          if (result.status != 400) {

            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.stateId ? result?.stateId : 0}&Code=0`;
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

  }, [VendorId])


  const handleClose1 = () => {
    setShow1(false)
    fetch(`${process.env.REACT_APP_API_URL}Vendor/GetVendorById?vendorId=${VendorId ? VendorId : VendorId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        seteditVendor((pre) => {
          return {
            ...pre,
            vendorId: result?.vendorId,
            SAPvendorCode: result?.sapVendorCode,
            vendorCode: result?.vendorCode,
            vendorName: result?.vendorName,
            mobileNo: result?.mobileNo,
            emailId: result?.emailId,
            panNo: result?.panNo,
            isGstApplicable: result?.isGstApplicable,
            gstNo: result?.gstNo,
            isMSME: result?.isMSME,
            msmeCode: result?.msmeCode,
            vendorAddress: result?.vendorAddress,
            pinId: result?.pinId,

            stateId: result?.stateId,
            cityId: result?.cityId,
            divisionCode: result?.divisionCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
            productLineCode: result?.productLineCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
            productGroupCode: result?.productGroupCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType }))

          }
        })

        if (result.status != 400) {

          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.stateId ? result?.stateId : 0}&Code=0`;
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

  const [divisionCode, setDivisionCode] = useState([]);

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];
















  function useDebounce(callback, delay) {
    const [timeoutId, setTimeoutId] = useState(null);

    return function debouncedCallback(...args) {
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(id);
    };
  }

  const handleInputChange = useDebounce((event) => {
    // console.log(event.target.value);
    setfilterVendorName(event.target.value);
    // Your logic here
  }, 500); // Adjust delay as needed


  const customHeaders = {
    vendorName: 'Vendor Name',
    vendorAddress: 'Vendor Address',
    stateName: 'State',
    cityName: 'City',
    pinId: 'Pin Code',
    divisionCode: 'Division Code',
    productLineCode: 'Product Line Code',
    productGroupCode: 'Product Group Code',
    vendorCode:'Vendor Code',
    sapVendorCode:'SAP Vendor Code',
    gstNo:'GST Number'

  }


  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>
            <p className='pg-label m-0'>Vendor Master</p>
            {Permissions?.isAdd ? <Row className='text-end'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Vendor</Button></Col></Row> : ""}

          </div>
          <hr />


          <Form>



            <Row
              style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
              className="m-3 p-3"
            >

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control type='text' onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Select value={filterVendorState} onChange={(e) => setfilterVendorState(e.target.value)}>
                    <option value="">Select</option>
                    {
                      AllStates?.map((state, index) => {
                        return (
                          <>
                            <option value={state?.parameterTypeId}>{state?.parameterType}</option>
                          </>
                        )
                      })
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* <Col md={2}>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Select>
          <option value="">Select</option>
          
        </Form.Select>
      </Form.Group>
    </Col>
     
    <Col md={2}>
      <Form.Group>
        <Form.Label>PinCode</Form.Label>
        <Form.Control type='text'/>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group>
        <Form.Label>Is Active</Form.Label>
        <Form.Select>
          <option value="">Select</option>

        </Form.Select>
      </Form.Group>
    </Col> */}
              <Col md={2}>
                <div className="pt-2">
                  <Button
                    variant=""
                    className="add-Btn mt-3"
                    onClick={() => {

                      setfilterPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      setPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      fetchDataFiltered()
                    }}
                  // onClick={(e) => {
                  //   e.preventDefault();

                  //   let url = `${process.env.REACT_APP_API_URL}Lead/GetAllLead${
                  //     filterDivision ||
                  //     filterBranch ||
                  //     filterRegion ||
                  //     filterFromDate ||
                  //     filterToDate ||
                  //     filterStatus
                  //       ? "?"
                  //       : ""
                  //   }`;

                  //   if (filterDivision !== "") {
                  //     url += `DivisionCode=${filterDivision}&`;
                  //   }
                  //   if (filterBranch !== "") {
                  //     url += `BranchCode=${filterBranch}&`;
                  //   }

                  //   if (filterRegion !== "") {
                  //     url += `RegionCode=${filterRegion}&`;
                  //   }
                  //   if (filterFromDate !== "") {
                  //     url += `FromDate=${filterFromDate}&`;
                  //   }
                  //   if (filterToDate !== "") {
                  //     url += `ToDate=${filterToDate}&`;
                  //   }
                  //   if (filterStatus !== "") {
                  //     url += `StatusId=${filterStatus}&`;
                  //   }

                  //   fetch(url, {
                  //     headers: {
                  //       Authorization: `Bearer ${token}`,
                  //     },
                  //   })
                  //     .then((res) => res.json())
                  //     .then((result) => {
                  //       console.log(result);
                  //       setAllLeads(result);
                  //     });
                  // }}

                  >
                    Search
                  </Button>
                  <Button
                    variant=""
                    type='reset'
                    className="m-2 mt-4"
                    style={{
                      backgroundColor: "#005bab",
                      color: "white",
                      height: "fit-content",
                    }}
                    onClick={() => {

                      setfilterPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      setPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      fetchData()
                      setfilterVendorName("")
                      setfilterVendorState("")
                      // fetchAllLeads();

                      // setfilterDivision("");
                      // setfilterBranch("");
                      // setfilterRegion("");
                      // setfilterFromDate("");
                      // setfilterToDate("");
                      // setfilterStatus("");
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>


          {
            Permissions?.isView ?

              <MaterialReactTable
                columns={columns}
                data={data}

                muiDetailPanelProps={() => ({
                  sx: (theme) => ({
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,210,244,0.1)'
                        : 'rgba(0,0,0,0.1)',
                  }),
                })}
                muiExpandButtonProps={({ row, table }) => ({
                  onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
                  sx: {
                    transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s',
                  },
                })}
                enableExpandAll={false}
                renderDetailPanel={({ row }) => {
                  let list1 = row.original.divisionCode?.split(",")
                  let list2 = row.original.productLineCode?.split(",")

                  // console.log(list1);

                  return (

                    (row.original.divisionCode || row.original.productLineCode) ? (
                      <Box

                      >



                        <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
                          {list1 ?

                            <div className='p-3' style={{ borderRight: "1px solid" }}>
                              <p style={{ fontSize: "16px", fontWeight: "600" }}>Division</p>
                              <ul>


                                {
                                  list1?.map((divisionCode, index) => {
                                    return (
                                      <>
                                        <li>{divisionCode}</li>

                                      </>
                                    )
                                  })
                                }

                              </ul>
                            </div> : ""
                          }
                          {
                            list2 ?
                              <div className='p-3' style={{ borderRight: "1px solid" }}>
                                <p style={{ fontSize: "16px", fontWeight: "600" }}>Product Line</p>
                                <ul>
                                  {
                                    list2?.map((productLineCode, index) => {
                                      return (

                                        <li>{productLineCode}</li>
                                      )
                                    })
                                  }
                                </ul>
                              </div> : ""
                          }

                        </div>

                      </Box>
                    ) : null
                  )

                }
                }




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
                              console.log(cell.row.original?.vendorId);
                              setVendorId(cell.row.original?.vendorId);
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
                              console.log(cell.row.original.vendorId);
                              setVendorId(cell.row.original?.vendorId);
                              handleShowDel();
                            }}


                          >
                            <HiOutlineTrash color='red' />
                          </IconButton>
                        </Tooltip>
                    }
                  </Box>
                )}

                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setfilterPagination || setPagination}
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
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            customHeaders,
                            [


                              "pinCode",
                              "noOfDivision",
                              "noOfProductLine",
                              "totalRows",
                              "divisionCodeList",
                              "productLineCodeList",
                              "productGroupCodeList",
                              "vendorId",
                              "initialBatch",
                              "mobileNo",
                              "emailId",
                              "panNo",
                              "isGstApplicable",
                              "isMSME",
                              "msmeCode",

                              "stateId",
                              "cityId",
                              "isActive"





                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button>
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




          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>



              <Accordion defaultActiveKey={0}>
                {
                  loading ? (<Loader />) : (
                    <>
                      <Accordion.Item eventKey={0}>
                        <Accordion.Header>Vendor Information</Accordion.Header>
                        <Accordion.Body>

                          <Row>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>SAP Vendor Code </Form.Label>
                                <Form.Control type='text' name='SAPvendorCode' onChange={handleChange} />

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Initial Vendor Code <span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' maxLength={3} name='vendorCode' onChange={handleVendorCodeChange} />
                                {vendorError && <span style={{ color: 'red' }}>{vendorError}</span>}
                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Vendor Name <span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' name='vendorName' maxLength={100} onChange={handleChange} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control type='tel' name='mobileNo' maxLength={15} onChange={handleMobileChange} />
                                {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Email <span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='email' name='emailId' onChange={handleEmailChange} />
                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>PAN No.</Form.Label>
                                <Form.Control type='text' name='panNo' maxLength={10} onChange={(e)=>{
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;


const value = e.target.value.toUpperCase();

// Restrict input to 10 characters
if (value.length <= 10) {
  setaddvendor((pre)=>{
    return{
      ...pre,
      panNo:value
    }
  })
    // Validate the PAN using the regex
  }
  
  if ((e.target.value !="" && e.target.value.length<10) || (value.length === 10 && !panRegex.test(value))) {
      setpanError("Invalid PAN format");
  } else {
      setpanError("");
  }



                                  


                                }} />
                                 {panError && <p style={{ color: "red" }}>{panError}</p>}

                              </Form.Group>
                            </Col>
                            <Col md={4} >
                              <Form.Group className='mt-5'>
                                {/* <Form.Label>PAN No.</Form.Label> */}
                                <Form.Check type='checkbox' label="Is GST Applicable" onChange={(e) => {
                                  console.log(e.target.checked);
                                  setaddvendor((pre) => {
                                    return {
                                      ...pre,
                                      isGstApplicable: e.target.checked
                                    }
                                  })
                                }} />
                              </Form.Group>
                            </Col>
                            {addvendor?.isGstApplicable == true ? <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>GST No.<span className='req-t'>*</span></Form.Label>
                                <Form.Control type='text' name='gstNo' maxLength={15} onChange={(e)=>{
                                      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{2}[A-Z0-9]{1}$/;


                                      const value = e.target.value
                                      // Restrict input to 15 characters
                                      if (value.length == 15) {
                                        setaddvendor((pre) => {
                                          return {
                                            ...pre,
                                            gstNo: value.toUpperCase()
                                          }
                                        })
                              
                                          // Validate the GST using the regex
                                        }
                                        if ((e.target.value !="" && e.target.value.length<15) || (value.length == 15 && !gstRegex.test(value))) {
                                            setgstError("Invalid GST format");
                                        } else {
                                            setgstError("");
                                        }
                                }} />
                                 {gstError && <p style={{ color: "red" }}>{gstError}</p>}

                              </Form.Group>
                            </Col> : ""}
                            <Col md={4} className=''>
                              <Form.Group className='mt-5'>
                                {/* <Form.Label>PAN No.</Form.Label> */}
                                <Form.Check type='checkbox' label="Is MSME" onChange={(e) => {
                                  console.log(e.target.checked);
                                  setaddvendor((pre) => {
                                    return {
                                      ...pre,
                                      isMSME: e.target.checked
                                    }
                                  })
                                }} />
                              </Form.Group>
                            </Col>
                            {addvendor?.isMSME == true ? <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>MSME No.<span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' name='msmeCode' onChange={handleChange} />
                              </Form.Group>
                            </Col> : ""}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey={1}>
                        <Accordion.Header>Vendor Address</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Address </Form.Label>
                                <Form.Control as="textarea" rows={1} name='vendorAddress' onChange={handleChange} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                  type="number"
                                  name='pinId '
                                  onChange={(e) => {
                                    handlePinCodeChange(e)
                                    if (e.target.value && e.target.value?.length == 6) {
                                      const pinId = e.target.value;

                                      setaddvendor(prevBranch => ({
                                        ...prevBranch,
                                        pinId: pinId
                                      }));

                                      fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${pinId}&Code=0`, {
                                        headers: {
                                          "Authorization": `Bearer ${token}`
                                        }
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          if (result && result.length > 0) {
                                            const stateId = result[0]?.parameterTypeId;
                                            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${stateId}&Code=0`;

                                            setaddvendor(prevBranch => ({
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
                                                    setaddvendor(prevBranch => ({
                                                      ...prevBranch,
                                                      // cityId: citiesResult[0]?.parameterTypeId
                                                    }));
                                                  }
                                                }
                                              });
                                          } else {
                                            // Reset state and cities if pin code doesn't match
                                            setaddvendor(prevBranch => ({
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
                                      fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${pinId}&Code=0`, {
                                        headers: {
                                          "Authorization": `Bearer ${token}`
                                        }
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          if (Array.isArray(result)) {
                                            setcities(result);
                                            if (result.length > 0) {
                                              setaddvendor(prevBranch => ({
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
                                setaddvendor((pre) => {
                                  return {
                                    ...pre,
                                    pinId: 0,
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
                                <Form.Label>State </Form.Label>
                                <Form.Select name='stateId' value={addvendor?.stateId} onChange={(e) => {
                                  setaddvendor((pre) => {
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
                                  <option value="0">Select</option>
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
                                <Form.Label>City </Form.Label>
                                <Form.Select name='cityId' value={addvendor?.cityId}
                                  onChange={(e) => {
                                    setaddvendor((pre) => {
                                      return {
                                        ...pre,
                                        cityId: e.target.value,
                                        pinId: ''

                                      }
                                    })
                                  }}
                                >
                                  <option value="0">Select</option>
                                  {
                                    cities && cities?.map((city, index) => {
                                      return (
                                        <>
                                          <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                        </>
                                      )
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                            </Col>

                          </Row>

                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey={2}>
                        <Accordion.Header>Vendor Mapping</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            {/* <Col md={4}>
                        <Form.Group>
                          <Form.Label>Division</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  divisionCode: e

                                }
                              })

                              console.log(e);
                              let divisionCodeString = e?.map(division => division.parameterTypeId)?.join(',');
                              console.log("divString", divisionCodeString);
                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

                              fetch(getAllProductLines, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log("divstring result", result);
                                  setallproductLines(result)
                                })
                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  divisionCode: e
                                }
                              })

                              console.log(e);

                              let divisionCodeString = e?.map(division => division.parameterTypeId)?.join(',');
                              console.log("divString", divisionCodeString);
                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

                              fetch(getAllProductLines, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setallproductLines(result)
                                })
                            }}
                            options={allDivisions}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col> */}

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allDivisions}
                                  value={addvendor.divisionCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);

                                    if (e.length === 0) {
                                      setallProductGroups([])
                                      setaddvendor((pre) => {
                                        return {
                                          ...pre,
                                          productLineCode: [],
                                          productGroupCode: []
                                        }
                                      })

                                    }

                                    // setaddvendor((pre) => {
                                    //   return {
                                    //     ...pre,
                                    //     divisionCode: e
                                    //   }
                                    // })

                                    console.log("onchange e ", e);

                                    let divisionCodeString = e?.map(division => division.value)?.join(',');
                                    console.log("divString", divisionCodeString);
                                    const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

                                    fetch(getAllProductLines, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {

                                        let prodLines = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));
                                        console.log("-----p----", prodLines)
                                        console.log("------addvendor----", addvendor.productLineCode)

                                        let filteredProdLineCodes = addvendor.productLineCode.filter((singleCode) => {
                                          console.log("------filter-------", singleCode)
                                          console.log("---productl------", prodLines.find((pl) => pl.value === singleCode.value))
                                          if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                        })

                                        console.log(filteredProdLineCodes, "0----------------------")
                                        if (filteredProdLineCodes.length > 0) {

                                          let productLineString = filteredProdLineCodes.map(productLine => productLine.value)?.join(',');
                                          console.log("PLString", productLineString);

                                          const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                                          fetch(getAllProductGroup, {
                                            headers: {
                                              "Authorization": `Bearer ${token}`
                                            }
                                          })
                                            .then((res) => res.json())
                                            .then((result) => {

                                              console.log("result p group-----------", result)

                                              let productGroup = result.map(pgroup => ({ value: pgroup.parameterTypeId, label: pgroup.parameterType }))

                                              setallProductGroups(productGroup)

                                              let filteredProdGroupCodes = addvendor.productGroupCode.filter((singleCode) => {
                                                console.log("------filter-------", singleCode)
                                                // console.log("---productl------",prodLines.find({value:singleCode.value}))
                                                if (productGroup.find((pl) => pl.value === singleCode.value)) { return true }
                                              })
                                              setaddvendor((pre) => {
                                                return {
                                                  ...pre,
                                                  divisionCode: e,
                                                  productLineCode: filteredProdLineCodes,
                                                  productGroupCode: filteredProdGroupCodes
                                                }
                                              })



                                            })




                                        }
                                        else {
                                          setaddvendor((pre) => {
                                            return {
                                              ...pre,
                                              divisionCode: e,
                                              productLineCode: filteredProdLineCodes
                                            }
                                          })
                                        }



                                        setallproductLines(prodLines)





                                      })
                                  }}
                                  labelledBy={"Select"}
                                  isCreatable={true}
                                  valueRenderer={customValueRenderer}
                                />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allproductLines}
                                  value={addvendor.productLineCode}

                                  onChange={function noRefCheck(e) {
                                    console.log(e);



                                    let productLineString = e?.map(productLine => productLine.value)?.join(',');
                                    console.log("PLString", productLineString);


                                    const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                                    fetch(getAllProductGroup, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {
                                        console.log(result);
                                        let produGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }))

                                        let filteredProdGroupCodes = addvendor.productGroupCode.filter((singleCode) => {
                                          console.log("------filter-------", singleCode)
                                          if (produGroup.find((pl) => pl.value === singleCode.value)) { return true }
                                        })


                                        setallProductGroups(produGroup)
                                        setaddvendor((pre) => {
                                          return {
                                            ...pre,
                                            productLineCode: e,
                                            productGroupCode: filteredProdGroupCodes
                                          }
                                        })

                                      })
                                  }}
                                  valueRenderer={customValueRenderer}



                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Group <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allProductGroups}
                                  value={addvendor.productGroupCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);
                                    setaddvendor((pre) => {
                                      return {
                                        ...pre,
                                        productGroupCode: e
                                      }
                                    })
                                  }}
                                  valueRenderer={customValueRenderer}

                                />
                              </Form.Group>
                            </Col>
                            {/* <Col md={4}>
                        <Form.Group>
                          <Form.Label>Product Line</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  productLineCode: e
                                }
                              })

                              let productLineString = e?.map(productLine => productLine.parameterTypeId)?.join(',');
                              console.log("PLString", productLineString);


                              const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                              fetch(getAllProductGroup, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setallProductGroups(result)
                                })
                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  productLineCode: e
                                }
                              })


                              let productLineString = e?.map(productLine => productLine.parameterTypeId)?.join(',');
                              console.log("PLString", productLineString);


                              const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                              fetch(getAllProductGroup, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setallProductGroups(result)
                                })
                            }}


                            options={allproductLines}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Product Group</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  productGroupCode: e
                                }
                              })
                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              console.log(e);
                              setaddvendor((pre) => {
                                return {
                                  ...pre,
                                  productGroupCode: e
                                }
                              })
                            }}
                            options={allProductGroups}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col> */}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}

              </Accordion>

              {/* <Row>
 

  <Col md={4}>
    <Form.Group>
  <Form.Label>Division</Form.Label>
  <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
      {
          cat: 'Group 1',
          key: 'LT Motor'
        },
        {
            cat: 'Group 1',
            key: 'FHP Motor'
        },
    //     {
    //         cat: 'Group 1',
    //         key: 'LT Motor'
    // },
   
]}
showCheckbox
/>
</Form.Group>
    </Col>

 
  </Row>
  <Row className='mt-3'>
    

  <Col md={4}>
    <Form.Group>
  <Form.Label>Product Line</Form.Label>
  <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
      {
          cat: 'Group 1',
          key: 'DC Machines'
        },
        {
            cat: 'Group 1',
            key: 'LT AC  Motor'
        },
        {
            cat: 'Group 1',
            key: 'M3 Alternator'
    },
   
]}
showCheckbox
/>
</Form.Group>
    </Col>

  <Col md={4}>
  <Form.Group>
  <Form.Label>Vendor Address</Form.Label>
  <Form.Control as="textarea" rows={1}/>
</Form.Group>
  </Col>

  <Col md={4}>
  <Form.Group>
    <Form.Label>State</Form.Label>
  <Form.Select>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
  </Form.Select>
</Form.Group>
  </Col>
</Row>

<Row className='mt-3'>
  <Col md={4}>
  <Form.Group>
    <Form.Label>City</Form.Label>
  <Form.Select>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
  </Form.Select>
</Form.Group>
  </Col>

<Col md={4}>
  <Form.Group>
    <Form.Label>Pin</Form.Label>
 <Form.Control type='text'/>
</Form.Group>
  </Col>
<Col md={4}>
  <Form.Group>
    <Form.Label>Is Active</Form.Label>
 <Form.Check type='checkbox'/>
</Form.Group>
  </Col>
   
</Row>

<Row className='mt-3'>
  <Col md={4}>
  <Form.Group >
  <Form.Label>Initial Batch</Form.Label>
  <Form.Control type='text' style={{border:"1px solid red"}}/>
</Form.Group>
  </Col>

</Row> */}



            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' disabled={emailError || mobileError || pinError || panError || gstError || vendorError} onClick={(e) => {
                e.preventDefault();

                const addVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/UpsertVendor`;

                const divisionCodeString = addvendor?.divisionCode?.map(division => division.value).join(',');
                const prodLineCodeString = addvendor?.productLineCode?.map(Pl => Pl.value).join(',');
                const prodGrpCodeString = addvendor?.productGroupCode?.map(pg => pg.value).join(',');


                let n = {
                  ...addvendor,
                  divisionCode: divisionCodeString,
                  productLineCode: prodLineCodeString,
                  productGroupCode: prodGrpCodeString
                };

                console.log(n);


                // const vendorCode = addvendor.vendorCode;
                // const vendorCodeRegex = /^[a-zA-Z0-9\s]+$/;
                // if (!vendorCode || !vendorCode.match(vendorCodeRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Sap vendor Code is required and must contain only alphabets & number!"
                //   });
                //   return;
                // }

                const InitialVendorCode = addvendor.vendorCode;
                if (!InitialVendorCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Initial code is required"
                  });
                  return;
                }

                const vendorName = addvendor.vendorName;
                if (!vendorName) {
                  Swal.fire({
                    icon: "error",
                    title: "Vendor name is required"
                  });
                  return;
                }

                // const mobileNo = addvendor.mobileNo;

                // // Check if mobileNo is provided and not empty
                // if (mobileNo && mobileNo.trim().length > 0) {
                //   const mobileNoRegex = /^\d{10}$/;
                //   if (!mobileNoRegex.test(mobileNo)) {
                //     Swal.fire({
                //       icon: "error",
                //       title: "Please enter a correct 10-digit mobile number."
                //     });
                //     return;
                //   }
                // }















                const emailId = addvendor.emailId;

                // Check if emailId is provided
                if (!emailId) {
                  Swal.fire({
                    icon: "error",
                    title: "Email address is required."
                  });
                  return;
                }

                // // Check if emailId matches the regex pattern
                // if (!emailId.match(emailIdRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Invalid email address"
                //   });
                //   return;
                // }




                // const panNumber = addvendor.panNo;
                // const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                // if (!panNumber || !panNumber.match(panRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "PAN number is required and enter a valid PAN number"
                //   });
                //   return;
                // }




                const panNumber = addvendor.aadharNo;
                const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                // Assuming aadharNumber is the variable containing Aadhar card number input value
                if (panNumber && !panNumber.match(panRegex)) {
                  Swal.fire({
                    icon: "error",
                    title: "Please enter a Valid Aadhar card number consisting of 12 digits."
                  });
                  return;
                }







                const isValidationRequired = addvendor.isGstApplicable; // Assuming checkboxState indicates whether validation is required
                const gstNumber = addvendor.gstNo;
                const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

                // Check if validation is required
                if (isValidationRequired) {
                  // Perform validation only if checkbox is checked
                  if (!gstNumber || !gstNumber.match(gstRegex)) {
                    Swal.fire({
                      icon: "error",
                      title: "GST number is required and enter a valid GST number."
                    });
                    return;
                  }
                }
                const msmeCodeRequired = addvendor.isMSME; // Assuming checkboxState indicates whether validation is required
                const msmeCode = addvendor.msmeCode;
                const msmeRegex = /^[A-Z\d]{15}$/;
                if (msmeCodeRequired) {
                  // Perform validation only if checkbox is checked
                  if (!msmeCode || !msmeCode.match(msmeRegex)) {
                    Swal.fire({
                      icon: "error",
                      title: "MSME is required and enter a valid MSME number."
                    });
                    return;
                  }
                }

                // const vendorAddress = addvendor.vendorAddress;
                // const vendorAddressRegex = /^[a-zA-Z\s]+$/;
                // if (!vendorAddress || !vendorAddress.match(vendorAddressRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Vendor address is required and must contain only alphabets!"
                //   });
                //   return;
                // }

                // const stateName = addvendor.stateId;
                // if (!stateName) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "State name is required"
                //   });
                //   return;
                // }

                // const cityName = addvendor.cityId;
                // if (!cityName) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "City name is required"
                //   });
                //   return;
                // }

                // const pinId  = addvendor.pinId;
                // const pinId Regex = /^\d{6}$/;
                // if (!pinId  || !pinId .match(pinId Regex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please enter a valid PIN code consisting of 6 digits."
                //   });
                //   return;
                // }
                const divisionCodes = n.divisionCode;
                if (!divisionCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  })
                  return;
                }

                const productLineCodes = n.productLineCode;
                if (!productLineCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Product line is required"
                  });
                  return;
                }
                const productGroupCode = n.productGroupCode;
                if (!productGroupCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Product Group is required"
                  });
                  return;
                }


                setLoading(true)

                fetch(addVendorUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(n)
                })
                  .then((res) => {
                    let resp = res.text();
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

                      if (res.status == 200 && r != "VENDOREXISTS" && r != 'INVALIDPINCODE') {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"
                        });
                        handleClose();
                        fetchdata();
                        setLoading(false)

                      }
                      if (res.status == 200 && r == "VENDOREXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Vendor already exists!"
                        });
                        setLoading(false)

                      } else if (res.status === 200 && r == 'INVALIDPINCODE') {
                        Swal.fire({
                          icon: "warning",
                          title: "InValid Pin Code"
                        });
                        setLoading(false)

                      }
                    });
                  });

              }} >
                Save
              </Button>

            </Modal.Footer>
          </Modal>









          {/* ------------------------------------------------------------edit-------------------------------------------------------------- */}






          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Accordion defaultActiveKey={0}>

                {
                  loading ? (<Loader />) : (
                    <>
                      <Accordion.Item eventKey={0}>
                        <Accordion.Header>Vendor Information</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>SAP Vendor Code </Form.Label>
                                <Form.Control type='text' readonly name='SAPvendorCode' disabled value={editVendor?.SAPvendorCode} onChange={handleChangeEdit} />

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Vendor Name <span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' name='vendorName' value={editVendor?.vendorName} onChange={handleChangeEdit} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Mobile No. </Form.Label>
                                <Form.Control type='tel' name='mobileNo' value={editVendor?.mobileNo} onChange={EdithandleMobileChange} />
                                {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Email <span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='email' name='emailId' value={editVendor?.emailId} onChange={EdithandleEmailChange} />
                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>PAN No.</Form.Label>
                                <Form.Control type='text' name='panNo' value={editVendor?.panNo} onChange={handleChangeEdit} />
                              </Form.Group>
                            </Col>
                            <Col md={4} >
                              <Form.Group className='mt-5'>
                                {/* <Form.Label>PAN No.</Form.Label> */}
                                <Form.Check type='checkbox' label="Is GST Applicable" checked={editVendor?.isGstApplicable == true} onChange={(e) => {
                                  console.log(e.target.checked);
                                  seteditVendor((pre) => {
                                    return {
                                      ...pre,
                                      isGstApplicable: e.target.checked,
                                      gstNo: e.target.checked ? pre.gstNo : '' // Clear gstNo if isGSTApplicable is false

                                    }
                                  })
                                }} />
                              </Form.Group>
                            </Col>
                            {editVendor?.isGstApplicable == true ? <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>GST No.<span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' name='gstNo' value={editVendor?.gstNo} onChange={handleChangeEdit} />
                              </Form.Group>
                            </Col> : ""}
                            <Col md={4} className=''>
                              <Form.Group className='mt-5'>
                                {/* <Form.Label>PAN No.</Form.Label> */}
                                <Form.Check type='checkbox' label="Is MSME" checked={editVendor?.isMSME == true} onChange={(e) => {
                                  console.log(e.target.checked);
                                  seteditVendor((pre) => {
                                    return {
                                      ...pre,
                                      isMSME: e.target.checked,
                                      msmeCode: e.target.checked ? pre.msmeCode : ''

                                    }
                                  })
                                }} />
                              </Form.Group>
                            </Col>
                            {editVendor?.isMSME == true ? <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>MSME No.<span className='req-t'>*</span> </Form.Label>
                                <Form.Control type='text' name='msmeCode' value={editVendor?.msmeCode} onChange={handleChangeEdit} />
                              </Form.Group>
                            </Col> : ""}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey={1}>
                        <Accordion.Header>Vendor Address</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Address </Form.Label>
                                <Form.Control as="textarea" rows={1} name='vendorAddress' value={editVendor?.vendorAddress} onChange={handleChangeEdit} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                  type="number"
                                  name='pinId '
                                  value={editVendor.pinId}
                                  onChange={(e) => {
                                    EdithandlePinCodeChange(e)
                                    if (e.target.value && e.target.value?.length == 6) {
                                      seteditVendor((pre) => {
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
                                          if (result[0]?.parameterTypeId) {
                                            seteditVendor((pre) => {
                                              return {
                                                ...pre,
                                                stateId: result[0]?.parameterTypeId
                                              }
                                            })

                                          }
                                          else {
                                            seteditVendor((pre) => {
                                              return {
                                                ...pre,
                                                stateId: 0
                                              }
                                            })

                                          }




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
                                                  seteditVendor(prevBranch => ({
                                                    ...prevBranch,
                                                    // cityId:result[0]?.parameterTypeId
                                                  }));
                                                }
                                              }
                                              else {
                                                // Reset state and cities if pin code doesn't match
                                                seteditVendor(prevBranch => ({
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
                                              seteditVendor(prevBranch => ({
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
                                      seteditVendor((pre) => {
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
                                <Form.Label>State </Form.Label>
                                <Form.Select name='stateId' value={editVendor?.stateId} onChange={(e) => {
                                  seteditVendor((pre) => {
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
                                  <option value="">Select</option>
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
                                <Form.Label>City </Form.Label>
                                <Form.Select name='cityId' value={editVendor?.cityId}
                                  onChange={(e) => {
                                    seteditVendor((pre) => {
                                      return {
                                        ...pre,
                                        cityId: e.target.value,
                                        pinId: ''

                                      }
                                    })
                                  }}
                                >
                                  <option value="">Select</option>
                                  {
                                    cities && cities?.map((city, index) => {
                                      return (
                                        <>
                                          <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                        </>
                                      )
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                            </Col>

                          </Row>

                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey={2}>
                        <Accordion.Header>Vendor Mapping</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            {/* <Col md={3}>
                        <Form.Group>
                          <Form.Label>Division</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            selectedValues={editVendor?.divisionCode}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(editVendor.divisionCode);
                              console.log(editVendor.divisionCode.parameterTypeId, "-----------------ps-------------------------")

                              seteditVendor((pre) => ({
                                ...pre,
                                divisionCode: e
                              }));


                              let divisionCodeString = e?.map(division => division.parameterTypeId)?.join(',');
                              console.log("divString", divisionCodeString);


                              // let divisionCodeString = e?.map(division => division.divisionCode)?.join(',');
                              // console.log("divString", divisionCodeString);

                              // console.log("set", selectedDivString);
                              // let divisionCodeString = e?.map(division => division.divisionCode)?.join(',');

                              // if (selectedDivString && selectedDivString.includes(e.divisionCode)) {
                              //   divisionCodeString += ',' + selectedDivString;
                              // } else {
                              //   divisionCodeString = selectedDivString ? selectedDivString + ',' + divisionCodeString : divisionCodeString;
                              // }

                              // console.log("divString", divisionCodeString);


                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;


                              if (divisionCodeString) {

                                fetch(getAllProductLines, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setallproductLines(result)
                                  })
                              }

                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {

                              console.log("below is division");
                              console.log(e);

                              seteditVendor((prev) => ({
                                ...prev,
                                divisionCode: e
                              }));





                              let divisionCodeString = e?.map(division => division.parameterTypeId)?.join(',');
                              console.log("divString", divisionCodeString);
                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;


                              if (divisionCodeString) {

                                fetch(getAllProductLines, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setallproductLines(result)
                                  })

                              }

                            }}
                            options={allDivisions}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col> */}

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allDivisions}
                                  value={editVendor.divisionCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);

                                    if (e.length === 0) {
                                      setallProductGroups([])
                                      seteditVendor((prev) => {
                                        return {
                                          ...prev,
                                          productLineCode: [],
                                          productGroupCode: []
                                        }

                                      })

                                    }


                                    console.log("onchange e ", e);

                                    let divisionCodeString = e?.map(division => division.value)?.join(',');
                                    console.log("divString", divisionCodeString);
                                    const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

                                    fetch(getAllProductLines, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {

                                        let prodLines = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));
                                        console.log("-----p----", prodLines)
                                        console.log("------editVendor----", editVendor.productLineCode)

                                        let filteredProdLineCodes = editVendor.productLineCode.filter((singleCode) => {
                                          console.log("------filter-------", singleCode)
                                          console.log("---productl------", prodLines.find((pl) => pl.value === singleCode.value))
                                          if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                        })


                                        if (filteredProdLineCodes.length > 0) {

                                          let productLineString = filteredProdLineCodes.map(productLine => productLine.value)?.join(',');
                                          console.log("PLString", productLineString);


                                          const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                                          fetch(getAllProductGroup, {
                                            headers: {
                                              "Authorization": `Bearer ${token}`
                                            }
                                          })
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result);

                                              let editProductGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }))

                                              setallProductGroups(editProductGroup)

                                              let filterEditProductGroup = editVendor.productGroupCode.filter((singleCode) => {
                                                if (editProductGroup.find((PL) => PL.value == singleCode.value)) {
                                                  return true
                                                }

                                              })
                                              seteditVendor((pre) => {
                                                return {
                                                  ...pre,
                                                  divisionCode: e,
                                                  productLineCode: filteredProdLineCodes,
                                                  productGroupCode: filterEditProductGroup
                                                }
                                              })



                                            })

                                        }
                                        else {
                                          seteditVendor((pre) => {
                                            return {
                                              ...pre,
                                              divisionCode: e,
                                              productLineCode: filteredProdLineCodes,
                                            }
                                          })

                                        }
                                        setallproductLines(prodLines)



                                      })
                                  }}
                                  labelledBy={"Select"}
                                  isCreatable={true}
                                  valueRenderer={customValueRenderer}
                                />
                              </Form.Group>
                            </Col>


                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allproductLines}
                                  value={editVendor.productLineCode}

                                  onChange={function noRefCheck(e) {
                                    console.log(e);


                                    let productLineString = e?.map(productLine => productLine.value)?.join(',');
                                    console.log("PLString", productLineString);


                                    const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                                    fetch(getAllProductGroup, {
                                      headers: {
                                        "Authorization": `Bearer ${token}`
                                      }
                                    })
                                      .then((res) => res.json())
                                      .then((result) => {
                                        console.log(result);

                                        let EditpGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }))

                                        let EditfilterPgroup = editVendor.productGroupCode.filter((singleCode) => {
                                          if (EditpGroup.find((PL) => PL.value === singleCode.value)) {
                                            return true
                                          }

                                        })

                                        setallProductGroups(EditpGroup)
                                        seteditVendor((pre) => {
                                          return {
                                            ...pre,
                                            productLineCode: e,
                                            productGroupCode: EditfilterPgroup
                                          }
                                        })


                                      })
                                  }}
                                  valueRenderer={customValueRenderer}



                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Group <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allProductGroups}
                                  value={editVendor.productGroupCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);
                                    seteditVendor((pre) => {
                                      return {
                                        ...pre,
                                        productGroupCode: e
                                      }
                                    })
                                  }}
                                  valueRenderer={customValueRenderer}

                                />
                              </Form.Group>
                            </Col>
                            {/* <Col md={3}>
                        <Form.Group>
                          <Form.Label>Product Line</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            selectedValues={editVendor?.productLineCode}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);
                              seteditVendor((pre) => ({
                                ...pre,
                                productLineCode: e
                              }));


                              let productLineString = e?.map(productLine => productLine.parameterTypeId)?.join(',');
                              console.log("divString", productLineString);


                              // let divisionCodeString = e?.map(division => division.divisionCode)?.join(',');
                              // console.log("divString", divisionCodeString);

                              // console.log("set", selectedDivString);
                              // let divisionCodeString = e?.map(division => division.divisionCode)?.join(',');

                              // if (selectedDivString && selectedDivString.includes(e.divisionCode)) {
                              //   divisionCodeString += ',' + selectedDivString;
                              // } else {
                              //   divisionCodeString = selectedDivString ? selectedDivString + ',' + divisionCodeString : divisionCodeString;
                              // }

                              // console.log("divString", divisionCodeString);


                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${productLineString ? productLineString : 0}`;


                              if (productLineString) {

                                fetch(getAllProductLines, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setallProductGroups(result)
                                  })
                              }
                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              console.log("below is division");
                              console.log(e);
                              seteditVendor((prev) => ({
                                ...prev,
                                productLineCode: e
                              }));





                              let productLineCodeString = e?.map(productLine => productLine.parameterTypeId)?.join(',');
                              console.log("productLineString", productLineCodeString);
                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${productLineCodeString ? productLineCodeString : 0}`;


                              if (productLineCodeString) {

                                fetch(getAllProductLines, {
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  }
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setallProductGroups(result)
                                  })

                              }
                            }}


                            options={allproductLines}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Product Group</Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            selectedValues={editVendor?.productGroupCode}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);
                              seteditVendor((pre) => {
                                return {
                                  ...pre,
                                  productGroupCode: e
                                }
                              })
                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              console.log(e);
                              seteditVendor((pre) => {
                                return {
                                  ...pre,
                                  productGroupCode: e
                                }
                              })
                            }}
                            options={allProductGroups}
                            showCheckbox
                          />
                        </Form.Group>
                      </Col> */}
                            {editVendor.divisionCode.some(item => item.value === "CP") ?
                              <Col md={3} className='mt-3'>
                                <Form.Group>
                                  <Form.Label>Initial Vendor Code </Form.Label>
                                  <Form.Control
                                    type='text'
                                    readOnly
                                    name='vendorCode'
                                    maxLength={3}
                                    value={editVendor?.vendorCode}
                                    onChange={handleChangeEdit}
                                  />
                                </Form.Group>
                              </Col>
                              : ""}

                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>

                    </>
                  )}

              </Accordion>

              {/* <Row>
 

  <Col md={4}>
    <Form.Group>
  <Form.Label>Division</Form.Label>
  <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
      {
          cat: 'Group 1',
          key: 'LT Motor'
        },
        {
            cat: 'Group 1',
            key: 'FHP Motor'
        },
    //     {
    //         cat: 'Group 1',
    //         key: 'LT Motor'
    // },
   
]}
showCheckbox
/>
</Form.Group>
    </Col>

 
  </Row>
  <Row className='mt-3'>
    

  <Col md={4}>
    <Form.Group>
  <Form.Label>Product Line</Form.Label>
  <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
      {
          cat: 'Group 1',
          key: 'DC Machines'
        },
        {
            cat: 'Group 1',
            key: 'LT AC  Motor'
        },
        {
            cat: 'Group 1',
            key: 'M3 Alternator'
    },
   
]}
showCheckbox
/>
</Form.Group>
    </Col>

  <Col md={4}>
  <Form.Group>
  <Form.Label>Vendor Address</Form.Label>
  <Form.Control as="textarea" rows={1}/>
</Form.Group>
  </Col>

  <Col md={4}>
  <Form.Group>
    <Form.Label>State</Form.Label>
  <Form.Select>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
  </Form.Select>
</Form.Group>
  </Col>
</Row>

<Row className='mt-3'>
  <Col md={4}>
  <Form.Group>
    <Form.Label>City</Form.Label>
  <Form.Select>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
  </Form.Select>
</Form.Group>
  </Col>

<Col md={4}>
  <Form.Group>
    <Form.Label>Pin</Form.Label>
 <Form.Control type='text'/>
</Form.Group>
  </Col>
<Col md={4}>
  <Form.Group>
    <Form.Label>Is Active</Form.Label>
 <Form.Check type='checkbox'/>
</Form.Group>
  </Col>
   
</Row>

<Row className='mt-3'>
  <Col md={4}>
  <Form.Group >
  <Form.Label>Initial Batch</Form.Label>
  <Form.Control type='text' style={{border:"1px solid red"}}/>
</Form.Group>
  </Col>

</Row> */}



            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' disabled={emailError || mobileError || pinError} onClick={(e) => {
                e.preventDefault();

                const addVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/UpsertVendor`;

                // const divisionCodeString = addvendor?.divisionCode?.map(division => division.divisionCode).join(',');
                // const prodLineCodeString = addvendor?.productLineCode?.map(Pl => Pl.parameterTypeId).join(',');







                // console.log(selectedDivisionArray);
                // console.log(selectedProductLineArray);
                // console.log(selectedProductGroupArray);

                // var divisionCodeString = null;
                // var productLineCodeString = null;
                // var productGroupString = null;



                // if (editVendor.divisionCode == null || editVendor.divisionCode == '') {
                //   divisionCodeString = selectedDivisionArray.map(division => division.divisionCode).join(',');
                // }
                // else {
                //   divisionCodeString = Array.isArray(editVendor.divisionCode) ? editVendor.divisionCode.map(division => division.divisionCode).join(',') : editVendor.divisionCode;
                // }

                // if (editVendor.productLineCode == null || editVendor.productLineCode == '') {
                //   productLineCodeString = selectedProductLineArray.map(productLine => productLine.parameterTypeId).join(',');
                // }
                // else {
                //   productLineCodeString = Array.isArray(editVendor.productLineCode) ? editVendor.productLineCode.map(productLine => productLine.parameterTypeId).join(',') : editVendor.productLineCode;
                // }
                // if (editVendor.productGroupCode == null || editVendor.productGroupCode == '') {
                //   productGroupString = selectedProductGroupArray.map(pgrp => pgrp.parameterTypeId).join(',');
                // }
                // else {
                //   productGroupString = Array.isArray(editVendor.productGroupCode) ? editVendor.productGroupCode.map(pgrp => pgrp.parameterTypeId).join(',') : editVendor.productGroupCode;
                // }












                let divisionString = editVendor?.divisionCode?.map(item => item.value).toString()
                let productLineString = editVendor?.productLineCode?.map(item => item.value).toString()
                let productGroupString = editVendor?.productGroupCode?.map(item => item.value).toString()








                let n = {
                  ...editVendor,
                  divisionCode: divisionString,
                  productLineCode: productLineString,
                  productGroupCode: productGroupString
                };

                console.log(n);


                // const vendorCode = addvendor.vendorCode;
                // const vendorCodeRegex = /^[a-zA-Z0-9\s]+$/;
                // if (!vendorCode || !vendorCode.match(vendorCodeRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Sap vendor Code is required and must contain only alphabets & number!"
                //   });
                //   return;
                // }

                const vendorName = editVendor.vendorName;
                if (!vendorName) {
                  Swal.fire({
                    icon: "error",
                    title: "Vendor name is required"
                  });
                  return;
                }

                // const mobileNo = addvendor.mobileNo;
                // // Check if mobileNo is provided
                // if (!mobileNo) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Mobile number is required."
                //   });
                //   return;
                // }

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


                const emailId = editVendor.emailId;
                if (!emailId) {
                  Swal.fire({
                    icon: "error",
                    title: "Email address is required."
                  });
                  return;
                }

                // // Check if emailId matches the regex pattern
                // if (!emailId.match(emailIdRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Invalid email address"
                //   });
                //   return;
                // }




                const panNumber = addvendor.aadharNo;
                const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                // Assuming aadharNumber is the variable containing Aadhar card number input value
                if (panNumber && !panNumber.match(panRegex)) {
                  Swal.fire({
                    icon: "error",
                    title: "Please enter a Valid Aadhar card number consisting of 12 digits."
                  });
                  return;
                }

                const isValidationRequired = editVendor.isGstApplicable; // Assuming checkboxState indicates whether validation is required
                const gstNumber = editVendor.gstNo;
                const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

                // Check if validation is required
                if (isValidationRequired) {
                  // Perform validation only if checkbox is checked
                  if (!gstNumber || !gstNumber.match(gstRegex)) {
                    Swal.fire({
                      icon: "error",
                      title: "GST number is required and enter a valid GST number."
                    });
                    return;
                  }
                }

                const msmeCodeRequired = editVendor.isMSME; // Assuming checkboxState indicates whether validation is required
                const msmeCode = editVendor.msmeCode;
                const msmeRegex = /^[A-Z\d]{15}$/;
                if (msmeCodeRequired) {
                  // Perform validation only if checkbox is checked
                  if (!msmeCode || !msmeCode.match(msmeRegex)) {
                    Swal.fire({
                      icon: "error",
                      title: "MSME is required and enter a valid MSME number."
                    });
                    return;
                  }
                }







                const divisionCodes = n.divisionCode;
                if (!divisionCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  })
                  return;
                }

                const productLineCodes = n.productLineCode;
                if (!productLineCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Product line is required"
                  });
                  return;
                }
                const productGroupCode = n.productGroupCode;
                if (!productGroupCode) {
                  Swal.fire({
                    icon: "error",
                    title: "Product Group is required"
                  });
                  return;
                }



                setLoading(true)

                fetch(addVendorUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(n)
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
                          setLoading(false)

                        }
                      }
                      if (res.status == 200 && r != "VENDOREXISTS" && r != 'INVALIDPINCODE') {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"
                        })
                        handleClose1()
                        fetchdata()
                        setLoading(false)

                      }
                      if (res.status == 200 && r == "VENDOREXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Vendor already exists!"
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
                  })
              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>




          {/* -------------------------Delete------------------ */}



          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Vendor?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/DeleteVendor?vendorId=${VendorId}&isActive=${0}`;







                fetch(deleteVendorUrl, {
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
                        fetchdata()

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
              <Modal.Title className='mdl-title'>Activate Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Vendor?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/DeleteVendor?vendorId=${activeID}&isActive=${1}`;





                fetch(deleteVendorUrl, {
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
              <Modal.Title className='mdl-title'>De-activate Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Vendor?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteVendorUrl = `${process.env.REACT_APP_API_URL}Vendor/DeleteVendor?vendorId=${activeID}&isActive=${0}`;
                fetch(deleteVendorUrl, {
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

                    // }
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
export default Vendor