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
import { IoSave } from "react-icons/io5";
import Select from 'react-select';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6"



import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { MultiSelect } from 'react-multi-select-component';
import Loader from '../../loader';
function Dealer() {
  const [show, setShow] = useState(false);

  const [gstError, setgstError] = useState("")


  const [loading, setLoading] = useState(false)
  const handleShow = () => {
    setShow(true)
    GetALLSAP()
    GetAllRole()
    StateUrl()
    GetAllDivision()
    AllBraches()
    DealerType()
  }










  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  const [show1, setShow1] = useState(false);

  const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [isActive, setisActive] = useState("")
  const [data, setdata] = useState([]);

  let token = localStorage.getItem("UserToken")

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));



  const [addDealer, setaddDealer] = useState({
    dealerId: 0,
    dealerCode: "",
    dealerTypeId: 0,
    dealerName: "",
    dealerEmail: "",
    mobileNo: "",
    gstNo: "",
    workingDays: "",
    address: "",
    stateId: '',
    cityId: '',
    pinCode: "",
    isActive: true,
    isIndustryCustomer: false,
    isGSTApplicable: false
  })


  const handleChange = (e) => {
    const newdata = { ...addDealer };
    newdata[e.target.name] = e.target.value;
    setaddDealer(newdata);
    console.log(newdata);
  }



  const [editDealer, seteditDealer] = useState({
    dealerId: 0,
    dealerCode: "",
    dealerTypeId: 0,
    dealerName: "",
    dealerEmail: "",
    mobileNo: "",
    gstNo: "",
    workingDays: "",
    address: "",
    stateId: '',
    cityId: '',
    pinCode: "",
    isActive: true,
    isIndustryCustomer: false,
    isGSTApplicable: false
  })



  // const handleChangeEdit = (e) => {
  //   const newdata = { ...editDealer };
  //   newdata[e.target.name] = e.target.value;
  //   seteditDealer(newdata);
  //   console.log(newdata);
  // }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    seteditDealer((prevDealer) => ({
      ...prevDealer,
      [name]: value
    }));
  };

  const [user, setuser] = useState({
    userAutoId: 0,
    userId: "",
    userPassword: "",
    userTypeCode: "",
    userEmailId: "",
    userName: "",
    roleCode: "",
    mappingId: 0,
    branchCode: "",
    divisionCode: [],
    productLineCode: [],
    isActive: true
  })

  const handleClose = () => {
    setShow(false);
    setaddDealer({
      dealerId: 0,
      dealerCode: "",
      dealerTypeId: 0,
      dealerName: "",
      dealerEmail: "",
      mobileNo: "",
      gstNo: "",
      workingDays: "",
      address: "",
      stateId: '',
      cityId: '',
      pinCode: "",
      isActive: true,
      isIndustryCustomer: false,
      isGSTApplicable: false
    });

    setuser({
      userAutoId: 0,
      userId: "",
      userPassword: "",
      userTypeCode: "",
      userEmailId: "",
      userName: "",
      roleCode: "",
      mappingId: 0,
      branchCode: "",
      divisionCode: [],
      productLineCode: [],
      isActive: true
    });
  }








  const handleChangeASCUser = (e) => {
    const newdata = { ...user };
    newdata[e.target.name] = e.target.value;
    setuser(newdata);
    console.log(newdata);
  }





  const [edituser, setedituser] = useState({
    userAutoId: 0,
    userId: "",
    userPassword: "",
    userTypeCode: "",
    userEmailId: "",
    userName: "",
    roleCode: "",
    mappingId: 0,
    branchCode: "",
    divisionCode: [],
    productLineCode: [],
    isActive: true
  })


  const handleChangeASCUserEdit = (e) => {
    const newdata = { ...edituser };
    newdata[e.target.name] = e.target.value;
    setedituser(newdata);
    console.log(newdata);
  }



  const [activeID, setactiveID] = useState(0)

  // -----------Pagination------------------------
  const [filteringState, setFilteringState] = useState(false)

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

      `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`,

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


  const [filterDealerType, setFilterDealerType] = useState('0')
  const [filterRetailerName, setfilterRetailerName] = useState('')
  const [filterDealerName, setfilterDealerName] = useState('')
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

      `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterDealerName || filterRetailerName) {
      url.searchParams.set('DealerName',`${filterDealerName || filterRetailerName}`);
        }
    if (filterDealerType) {url.searchParams.set('DealerTypeId',`${filterDealerType}`);}

        
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

      {
        accessorKey: "dealerCode",
        header: "Dealer/OEM/Retailer Code",
        size: "50"
      },
      {
        accessorKey: "dealerType",
        header: "Dealer/OEM/Retailer Type",
        size: "50"

      },
      {
        accessorKey: "dealerName",
        header: "Dealer/OEM/Retailer Name",
        size: "50"

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
                          console.log(cell.row.original.dealerId);
                          setdealerId(cell.row.original.dealerId)
                          handleShow1()
                          GetALLSAP()
                          GetAllRole()
                          StateUrl()
                          DealerType()
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
                        console.log(cell.row.original.dealerId);
                        setactiveID(cell.row.original.dealerId);
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
                        console.log(cell.row.original.dealerId);
                        setactiveID(cell.row.original.dealerId);
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
    onPaginationChange: setFilterPagination || setPagination,
    onSortingChange: setSorting,
    // rowCount=rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination: filterPagination || pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });






  const fetchAllDealers = () => {
    const getAllDealersUrl = `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`;

    fetch(getAllDealersUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "--------pppp");
        setdata(result)
      })
  }

  useEffect(() => {
    fetchAllDealers()
  }, [])





  const [DealerTypes, setDealerTypes] = useState([]);



  const DealerType = () => {
    const getDealerTypesUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=DealerType`;
    fetch(getDealerTypesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDealerTypes(result)
      })


  }
  useEffect(() => {
    DealerType()
  }, [])



  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])
  const [stateId, setstateId] = useState("");



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


  const [dealerId, setdealerId] = useState("");


  const [branchData, setbranchData] = useState([]);

  const [allDivisions, setallDivisions] = useState([]);


  const [allproductLines, setallproductLines] = useState([])

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };




  const GetAllDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;
    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })))
      })


  }





  const [Roles, setRoles] = useState([])

  const GetAllRole = () => {
    const GetAllRolesUrl = `${process.env.REACT_APP_API_URL}Role/GetAllRoles`;
    fetch(GetAllRolesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRoles(result)
      })
  }






  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${addDealer?.pinCode}&Code=0`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result[0]);
  //       setaddDealer((pre) => {
  //         return {
  //           ...pre,
  //           stateId: result[0]?.parameterTypeId
  //         }
  //       })

  //       if (addDealer?.stateId != undefined) {



  //         const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${addDealer?.stateId}&Code=0`;
  //         fetch(cityUrl, {
  //           headers: {
  //             "Authorization": `Bearer ${token}`
  //           }
  //         })
  //           .then((res) => res.json())
  //           .then((result) => {
  //             console.log(result);
  //             setcities(result)
  //           })
  //       }
  //     })


  // }, [addDealer?.pinCode])


  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${addDealer?.pinCode}&Code=0`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result[0]);
  //       setaddDealer((pre) => {
  //         return {
  //           ...pre,
  //           cityId: result[0]?.parameterTypeId
  //         }
  //       })
  //     })
  // }, [addDealer?.pinCode])



  const AllBraches = () => {
    const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;
    fetch(getAllBranches, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setbranchData(result)
      })


  }




  const [getAllSApDealers, setgetAllSApDealers] = useState([])

  const GetALLSAP = () => {
    fetch(`${process.env.REACT_APP_API_URL}DealerSAP/GetAllSAPDealer`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setgetAllSApDealers(result)
      })

  }


  const [mobileError, setMobileError] = useState('')
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

    setaddDealer(prevState => ({
      ...prevState,
      mobileNo: value
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    // console.log(value);

    const validateEmail = (dealerEmail) => {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(dealerEmail);
    };

    if (!validateEmail(value) && value !== "") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    setaddDealer(prevState => ({
      ...prevState,
      dealerEmail: value
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

    setaddDealer(prevState => ({
      ...prevState,
      pinCode: value
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

    seteditDealer(prevState => ({
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

    seteditDealer(prevState => ({
      ...prevState,
      dealerEmail: value
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

    seteditDealer(prevState => ({
      ...prevState,
      pinCode: value
    }));
  };



  const [userID, setuserID] = useState("")



  useEffect(() => {
    if (dealerId) {
      fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerById?dealerId=${dealerId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditDealer((pre) => {
            return {
              ...pre,
              dealerId: result?.dealerId,
              dealerTypeId: result?.dealerTypeId,
              dealerName: result?.dealerName,
              dealerCode: result?.dealerCode,
              mobileNo: result?.mobileNo,
              dealerEmail: result?.dealerEmail,
              isGSTApplicable: result?.isGSTApplicable,
              gstNo: result?.gstNo,
              workingDays: result?.workingDays,
              isIndustryCustomer: result?.isIndustryCustomer,
              address: result?.address,
              pinCode: result?.pinCode,
              stateId: result?.stateId,
              cityId: result?.cityId,
              // divisionCode: result?.divisionCodeList,
              // productLineCode: result?.productLineCodeList,
            }
          })

          setuserID(result?.dealerCode)

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
  }, [dealerId])




  const handleClose1 = () => {
    setShow1(false);
    fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerById?dealerId=${dealerId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        seteditDealer((pre) => {
          return {
            ...pre,
            dealerId: result?.dealerId,
            dealerTypeId: result?.dealerTypeId,
            dealerName: result?.dealerName,
            dealerCode: result?.dealerCode,
            mobileNo: result?.mobileNo,
            dealerEmail: result?.dealerEmail,
            isGSTApplicable: result?.isGSTApplicable,
            gstNo: result?.gstNo,
            workingDays: result?.workingDays,
            isIndustryCustomer: result?.isIndustryCustomer,
            address: result?.address,
            pinCode: result?.pinCode,
            stateId: result?.stateId,
            cityId: result?.cityId,
            // divisionCode: result?.divisionCodeList,
            // productLineCode: result?.productLineCodeList,
          }
        })

        setuserID(result?.dealerCode)

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

    const getSingleUserByIdUrl = `${process.env.REACT_APP_API_URL}User/GetUserById?userId=${userID ? userID : 0}`;
    fetch(getSingleUserByIdUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        let branchCode = result.branchCodeList?.map(i => i.parameterTypeId).toString();

        // console.log("------fdsf------");
        //  / console.log(branchCode);

        setedituser((pre) => {

          return {
            ...pre,
            userAutoId: result?.userAutoId,
            userId: result?.userId,
            userTypeCode: result?.userTypeCode,
            userEmailId: result?.userEmailId,
            userName: result?.userName,
            roleCode: result?.roleCode,
            branchCode: branchCode,
            divisionCode: result?.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
            productLineCode: result?.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),

          }
        })
      })


  }




  useEffect(() => {
    if (userID) {
      const getSingleUserByIdUrl = `${process.env.REACT_APP_API_URL}User/GetUserById?userId=${userID ? userID : 0}`;
      fetch(getSingleUserByIdUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          let branchCode = result.branchCodeList?.map(i => i.parameterTypeId).toString();

          // console.log("------fdsf------");
          //  / console.log(branchCode);

          setedituser((pre) => {

            return {
              ...pre,
              userAutoId: result?.userAutoId,
              userId: result?.userId,
              userTypeCode: result?.userTypeCode,
              userEmailId: result?.userEmailId,
              userName: result?.userName,
              roleCode: result?.roleCode,
              branchCode: branchCode,
              divisionCode: result?.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
              productLineCode: result?.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),


              // userAutoId: 0,
              // userId: "",
              // userPassword: "",
              // userTypeCode: "",
              // userEmailId: "",
              // userName: "",
              // roleCode: "",
              // mappingId: 0,
              // branchCode: "",
              // divisionCode: [],
              // productLineCode: [],
              // isActive: true


            }
          })
          console.log(result);



          const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;
          fetch(getAllBranches, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result)
              setbranchData(result)
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
              setallproductLines(result.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })))
            })
        })

    }
  }, [userID])
  const [activeKey, setActiveKey] = useState("0");





  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      setfilterDealerName(inputValue);
      setfilterRetailerName(""); // Reset filterMobileName if filterCustomerName is being set
    } else {
      setfilterDealerName("");
      setfilterRetailerName(inputValue);
    }
  };


  const customHeaders = {

    dealerType: 'Dealer/OEM/Retailer Type',
    dealerName: 'Dealer/OEM/Retailer Name',
    dealerCode: 'Dealer/OEM/Retailer Code',
    dealerEmail: "Dealer Email",
    mobileNo: 'Mobile Number',
    gstNo: 'GST Number',
    address: "Address",
    stateName: "State",
    cityName: 'City',








  }



  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Dealer / OEM / Retailer Master</p>
            {Permissions?.isAdd ? <Row className=' text-end'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Dealer / OEM / Retailer</Button></Col></Row> : ""}

          </div>
          <hr />


          <Row
            style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3" >

            <Col md={3} className='mt-3'>
              <Form.Group>
                <Form.Label>Customer Type</Form.Label>
                <Form.Select name='dealerTypeId'
                  value={filterDealerType}
                  onChange={(e) => {
                    setFilterDealerType(e.target.value)
                  }}

                >
                  <option value="0">Select</option>
                  {
                    DealerTypes?.map((dealer, index) => {
                      return (
                        <>
                          <option value={dealer?.parameterValId}>{dealer?.parameterText}</option>
                        </>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className='mt-3'>
              <Form.Group>
                <Form.Label>Dealer Name/Retailer Name</Form.Label>
                <Form.Control
                  type="text"
                  name='dealerCode'
                  value={filterDealerName || filterRetailerName}
                  onChange={handleInputChange}
                  maxLength={12}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <div className="pt-4">
                <Button
                  variant=""
                  className="add-Btn mt-3"


                  onClick={(e) => {
                    setFilterPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    setPagination({
                      pageIndex: 0,
                      pageSize: 10
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
                      pageIndex: 0,
                      pageSize: 10
                    })
                    setPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    fetchData()
                    setFilterDealerType('')
                    setfilterRetailerName('')
                    setfilterDealerName('')

                  }}
                >
                  Reset
                </Button>
              </div>
            </Col>











          </Row>


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
                //               console.log(cell.row.original.dealerId);
                //               setdealerId(cell.row.original.dealerId)
                //               handleShow1()
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
                //               setdealerId(cell.row.original.dealerId)
                //               setisActive(cell.row.original.dealerId)
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
                // onPaginationChange={setPagination}
                onPaginationChange={setFilterPagination || setPagination}



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

                      {Permissions?.isDownload ? <Button variant=''
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            customHeaders,
                            [
                              'dealerId',
                              'dealerTypeId',
                              "workingDays",
                              "isActive",
                              "isIndustryCustomer",
                              "isGSTApplicable",
                              'totalRows',
                              'stateId',
                              'cityId'

                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button> : ""}

                    </div>
                  </>

                )}


                positionActionsColumn="first"

              />
              : ""
          }



          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Dealer / OEM / Retailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Accordion activeKey={activeKey}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>Dealer / OEM / Retailer Information</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addDealerUrl = `${process.env.REACT_APP_API_URL}Dealer/UpsertDealer`;


                        // const dealerCode = addDealer.dealerCode;
                        // const dealerCodeRegex = /^[a-zA-Z\s]+$/;
                        // if (!dealerCode.match(dealerCodeRegex)) {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Dealer Code must contain only alphabets"
                        //   });
                        //   return;
                        // }

                        let n = {
                          ...addDealer,
                          dealerTypeId: addDealer?.dealerTypeId.toString(),
                          stateId: addDealer?.stateId.toString(),
                          cityId: addDealer?.cityId.toString(),
                          pinCode: addDealer?.pinCode.toString()
                        }

                        const dealerTypeId = addDealer.dealerTypeId;

                        // Check if dealerTypeId is empty or 'Select'
                        if (!dealerTypeId || dealerTypeId === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Please select customer type"
                          });
                          return;
                        }

                        const dCode = n.dealerCode;

                        // Check if dealerTypeId is empty or 'Select'
                        if (!dCode) {
                          Swal.fire({
                            icon: "error",
                            title: "Code is required"
                          });
                          return;
                        }
                        const dName = n.dealerName;

                        // Check if dealerTypeId is empty or 'Select'
                        if (!dName) {
                          Swal.fire({
                            icon: "error",
                            title: "Name is required"
                          });
                          return;
                        }


                        // function validateField(value, label) {
                        //   if (!value) {
                        //     Swal.fire({
                        //       icon: "error",
                        //       title: `${label} is required`
                        //     });
                        //     return false;
                        //   }
                        //   return true;
                        // }

                        // const dealerName = n.dealerCode;
                        // let label;
                        // switch (addDealer?.dealerTypeId) {
                        //   case "A":
                        //     label = "OEM";
                        //     break;
                        //   case "B":
                        //     label = "Dealer";
                        //     break;
                        //   default:
                        //     label = "Retailer";
                        // }

                        // if (!validateField(dealerName, label)) return;
                        // // console.log("--lllllllllll",dealerName)









                        const mobileNo = addDealer.mobileNo;
                        // Check if mobileNo is provided
                        if (!mobileNo) {
                          Swal.fire({
                            icon: "error",
                            title: "Mobile number is required."
                          });
                          return;
                        }

                        // // Regular expression to match exactly 10 digits
                        // const mobileNoRegex = /^\d{10}$/;

                        // // Check if mobileNo matches the regex pattern
                        // if (!mobileNoRegex.test(mobileNo)) {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Please enter Correct Mobile Number."
                        //   });
                        //   return;
                        // }


                        const emailId = addDealer.dealerEmail;
                        if (!emailId) {
                          Swal.fire({
                            icon: "error",
                            title: "Email address is required."
                          });
                          return;
                        }
                        const isValidationRequired = addDealer.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                        const gstNumber = addDealer.gstNo;
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




                        const address = addDealer.address;
                        if (!address) {
                          Swal.fire({
                            icon: "error",
                            title: "Address is required"
                          });
                          return;
                        }

                        const pinCode = addDealer.pinCode;
                        const pinCodeRegex = /^\d{6}$/;
                        if (!pinCode || !pinCode.match(pinCodeRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please enter a valid PIN code consisting of 6 digits."
                          });
                          return;
                        }

                        const stateName = addDealer.stateId; // Assuming stateId actually represents the state name

                        if (!stateName) {
                          Swal.fire({
                            icon: "error",
                            title: "State name is required"
                          });
                          return;
                        }

                        const cityName = addDealer.cityId; // Assuming stateId actually represents the state name
                        if (!cityName) {
                          Swal.fire({
                            icon: "error",
                            title: "city name is required"
                          });
                          return;
                        }















                        else {

                          setLoading(true)

                          fetch(addDealerUrl, {
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
                                if (res.status == 200 && r != "DEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  })
                                  // handleClose()
                                  fetchAllDealers()
                                  setLoading(false)

                                  // window.location.reload()
                                  setActiveKey("1")

                                  setuser((pre) => {
                                    return {
                                      ...pre,
                                      userId: addDealer?.dealerCode,
                                      userTypeCode: "D",
                                      userName: addDealer?.dealerName,
                                      userEmailId: addDealer?.dealerEmail
                                    }
                                  })
                                  setActiveKey("1")



                                }
                                else if (res.status == 200 && r == "DEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Dealer already exists!"
                                  })
                                  setLoading(false)


                                }
                              })
                            })
                        }
                      }} /></span>

                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {
                      loading ? (<Loader />) : (
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Customer Type <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='dealerTypeId' onChange={handleChange}>
                                <option value="Select">Select</option>
                                {
                                  DealerTypes?.map((dealer, index) => {
                                    return (
                                      <>
                                        <option value={dealer?.parameterValId}>{dealer?.parameterText}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          {/* <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{addDealer?.dealerTypeId == "68" || addDealer?.dealerTypeId == "7" ? "OEM Code" : addDealer?.dealerTypeId == "69" || addDealer?.dealerTypeId == "8" ? "Dealer Code" : addDealer?.dealerTypeId == "70" || addDealer?.dealerTypeId == "9" ? "Retailer Code" : "Customer Code"}<span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='dealerCode'
                                value={addDealer?.dealerCode}
                                onChange={handleChange}
                                placeholder=''
                                readOnly
                              />
                            </Form.Group>
                          </Col> */}


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{addDealer?.dealerTypeId == "68" || addDealer?.dealerTypeId == "7" ? "OEM Name" : addDealer?.dealerTypeId == "69" || addDealer?.dealerTypeId == "8" ? "Dealer Name" : addDealer?.dealerTypeId == "70" || addDealer?.dealerTypeId == "9" ? "Retailer Name" : "Customer Name"}<span className='req-t'>*</span></Form.Label>
                              <Select
                                aria-labelledby="aria-label"
                                inputId="aria-example-input"
                                name=""
                                onChange={(e) => {
                                  setaddDealer((pre) => {
                                    return {
                                      ...pre,
                                      dealerName: e.label
                                    }
                                  })



                                  const getDealerFromSAPUrl = `${process.env.REACT_APP_API_URL}DealerSAP/GetAllSAPDealer?Name=${e.value}`;

                                  fetch(getDealerFromSAPUrl, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result);
                                      setaddDealer((pre) => {
                                        return {
                                          ...pre,
                                          dealerCode: result[0]?.dealerCode,
                                          mobileNo: result[0]?.mobileNumber,
                                          dealerEmail: result[0]?.email,
                                          address: result[0]?.address,
                                          pinCode: result[0]?.pinCode

                                        }

                                      })
                                      fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${result[0]?.pinCode}&Code=0`, {
                                        headers: {
                                          "Authorization": `Bearer ${token}`
                                        }
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          if (result && result.length > 0) {
                                            const stateId = result[0]?.parameterTypeId;
                                            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${stateId}&Code=0`;

                                            setaddDealer(prevBranch => ({
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
                                                    setaddDealer(prevBranch => ({
                                                      ...prevBranch,
                                                      // cityId: citiesResult[0]?.parameterTypeId
                                                    }));
                                                  }
                                                }
                                              });
                                          } else {
                                            // Reset state and cities if pin code doesn't match
                                            setaddDealer(prevBranch => ({
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

                                      fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${result[0]?.pinCode}&Code=0`, {
                                        headers: {
                                          "Authorization": `Bearer ${token}`
                                        }
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          if (Array.isArray(result)) {
                                            setcities(result);
                                            if (result.length > 0) {
                                              setaddDealer(prevBranch => ({
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





                                    })
                                }}
                                options={getAllSApDealers.map(option => ({ value: option.dealerCode, label: option.dealerName }))}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{addDealer?.dealerTypeId == "68" || addDealer?.dealerTypeId == "7" ? "OEM Code" : addDealer?.dealerTypeId == "69" || addDealer?.dealerTypeId == "8" ? "Dealer Code" : addDealer?.dealerTypeId == "70" || addDealer?.dealerTypeId == "9" ? "Retailer Code" : "Customer Code"}<span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='dealerCode'
                                value={addDealer?.dealerCode}
                                onChange={handleChange}
                                maxLength={12}
                                placeholder=''
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Mobile No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="tel"
                                name='mobileNo'
                                value={addDealer?.mobileNo}
                                onChange={handleMobileChange}
                                maxLength={15}
                                placeholder=''
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}


                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='dealerEmail'
                                value={addDealer?.dealerEmail}
                                onChange={handleEmailChange}
                                placeholder=''
                                maxLength={150}
                              />
                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check type='checkbox' label="Is GST Applicable" onChange={(e) => {
                                console.log(e.target.checked);
                                setaddDealer((pre) => {
                                  return {
                                    ...pre,
                                    isGSTApplicable: e.target.checked
                                  }
                                })
                              }} />

                            </Form.Group>
                          </Col>

                          {addDealer?.isGSTApplicable == true ? <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>GST No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='gstNo'
                                maxLength={15}
                                onChange={(e)=>{
                                  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{2}[A-Z0-9]{1}$/;


                                  const value = e.target.value
                                  // Restrict input to 15 characters
                                  if (value.length == 15) {
                                    setaddDealer((pre) => {
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
                            }}
                                placeholder=''
                               
                              />
                                 {gstError && <p style={{ color: "red" }}>{gstError}</p>}

                            </Form.Group>
                          </Col> : ""}


                          <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check type='checkbox' label="Is Industry Customer" onChange={(e) => {
                                console.log(e.target.checked);
                                setaddDealer((pre) => {
                                  return {
                                    ...pre,
                                    isIndustryCustomer: e.target.checked
                                  }
                                })
                              }} />

                            </Form.Group>
                          </Col>
                          <p className='mt-4'
                            style={{
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >Dealer Address</p>
                          <hr />

                          <Col md={12} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={1}
                                name='address'
                                value={addDealer?.address}
                                onChange={handleChange}
                                maxLength={500}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Pin Code <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="number"
                                name='pinCode '
                                value={addDealer.pinCode}
                                onChange={(e) => {
                                  const pinCode = e.target.value;
                                  handlePinCodeChange(e)
                                  if (e.target.value && e.target.value?.length == 6) {

                                    setaddDealer(prevBranch => ({
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

                                          setaddDealer(prevBranch => ({
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
                                                  setaddDealer(prevBranch => ({
                                                    ...prevBranch,
                                                    // cityId: citiesResult[0]?.parameterTypeId
                                                  }));
                                                }
                                              }
                                            });
                                        } else {
                                          // Reset state and cities if pin code doesn't match
                                          setaddDealer(prevBranch => ({
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
                                            setaddDealer(prevBranch => ({
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
                                    setaddDealer((pre) => {
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
                              <Form.Select name='stateId' value={addDealer?.stateId} onChange={(e) => {
                                setaddDealer((pre) => {
                                  return {
                                    ...pre,
                                    stateId: e.target.value,
                                    pinCode: ''
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


                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>City <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='cityId' disabled value={addDealer?.cityId}
                                onChange={(e) => {
                                  setaddDealer((pre) => {
                                    return {
                                      ...pre,
                                      cityId: e.target.value,
                                      pinCode: ''

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
                      )}

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>User Creation</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addUserUrl = `${process.env.REACT_APP_API_URL}User/UpsertUser`;


                        // Convert divisionCode array to string
                        const divisionCodeString = user.divisionCode.map(division => division.value).join(',');

                        // Convert productLineCode array to string
                        const productLineCodeString = user.productLineCode?.map(productLine => productLine.value).join(',');

                        // console.log(divisionCodeString);
                        // console.log(productLineCodeString);
                        let n = {
                          ...user,
                          divisionCode: divisionCodeString,
                          productLineCode: productLineCodeString
                        };

                        console.log(n);




                        //  console.log(user);



                        // if (user?.userId == "" || user?.roleCode == "" || user?.branchCode == "" || user?.divisionCode == "" || user?.productLineCode == "") {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Please fill all the fields marked with red *!"
                        //   })
                        // }

                        const userId = user.userId;
                        if (!userId) {
                          Swal.fire({
                            icon: "error",
                            title: "userId is required and must contain only alphabets!"
                          });
                          return;
                        }

                        const userRole = user.roleCode;
                        if (!userRole) {
                          Swal.fire({
                            icon: "error",
                            title: "Role Code is required"
                          })
                          return;
                        }


                        const division = user.divisionCode;
                        if (!division || division === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Division is required"
                          });
                          return;
                        }

                        const productLine = user.productLineCode;
                        if (!productLine || productLine.length === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Product Line is required"
                          });
                          return;
                        }

                        const userBranch = user.branchCode;
                        if (!userBranch) {
                          Swal.fire({
                            icon: "error",
                            title: "Branch is required"

                          })
                          return;
                        }












                        else {
                          // console.log(data);
                          setLoading(true)
                          fetch(addUserUrl, {
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



                                if (res.status == 200 && r != "DEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  })
                                  handleClose();
                                  fetchAllDealers()
                                  setLoading(false)
                                  setActiveKey('0')



                                }
                                else if (res.status == 200 && r == "DEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Dealer already exists!"
                                  })
                                  setLoading(false)


                                }
                              })
                            })
                        }
                      }} /></span>

                    </div>

                  </Accordion.Header>
                  <Accordion.Body>
                    {
                      loading ? (<Loader />) : (

                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={user?.userId}
                                readOnly
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                              <Form.Select onChange={(e) => {
                                setuser((pre) => {
                                  return {
                                    ...pre,
                                    roleCode: e.target.value
                                  }
                                })
                                console.log(user);
                              }}>
                                <option value="">Select</option>
                                {
                                  Roles?.map((role, index) => {
                                    return (
                                      <>
                                        <option value={role?.roleCode}>{role?.roleName}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allDivisions}
                                value={user.divisionCode}

                                onChange={function noRefCheck(e) {


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

                                      let filteredProdLineCodes = user.productLineCode.filter((singleCode) => {
                                        if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                      })

                                      setuser((pre) => {
                                        return {
                                          ...pre,
                                          divisionCode: e,
                                          productLineCode: filteredProdLineCodes
                                        }
                                      })
                                      setallproductLines(prodLines)
                                    })
                                }}
                                labelledBy={"Select"}
                                isCreatable={true}
                                valueRenderer={customValueRenderer}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allproductLines}
                                value={user.productLineCode}
                                onChange={function noRefCheck(e) {
                                  console.log(e);
                                  setuser((pre) => {
                                    return {
                                      ...pre,
                                      productLineCode: e
                                    }
                                  })
                                }}
                                labelledBy={"Select"}
                                isCreatable={true}
                                valueRenderer={customValueRenderer}
                              />
                            </Form.Group>
                          </Col>


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
                              <Form.Select value={setuser?.branchCode} name='branchName' onChange={(e) => {
                                setuser((pre) => {
                                  return {
                                    ...pre,
                                    branchCode: e.target.value
                                  }
                                })
                              }}>
                                <option value="">Select</option>

                                {
                                  branchData?.map((branch, index) => {
                                    return (
                                      <>
                                        <option value={branch?.parameterTypeId}>{branch?.parameterType}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      )}
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>

              {/* <Row className='mt-3'>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
               
                <Col md={4}>
                <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
           
                <Col md={4}>
                <Form.Group>
                <Form.Label>Branch</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Working Days</Form.Label>
        <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                </Row> */}

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






          {/* -----------------------------------------------------Edit------------------------------------------------------ */}



          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Dealer / OEM / Retailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>Dealer / OEM / Retailer Information</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addDealerUrl = `${process.env.REACT_APP_API_URL}Dealer/UpsertDealer`;

                        let n = {
                          ...editDealer,
                          dealerTypeId: editDealer?.dealerTypeId.toString(),
                          stateId: editDealer?.stateId.toString(),
                          cityId: editDealer?.cityId.toString(),
                          pinCode: editDealer?.pinCode.toString()
                        }



                        const dealerTypeId = editDealer.dealerTypeId;

                        // Check if dealerTypeId is empty or 'Select'
                        if (!dealerTypeId || dealerTypeId === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Customer type is required"
                          });
                          return;
                        }

                        // Define the validateField function
                        function validateField(value, label) {
                          if (!value) {
                            Swal.fire({
                              icon: "error",
                              title: `${label} is required`
                            });
                            return false;
                          }
                          return true;
                        }

                        // Determine the label based on the dealer type
                        let label;
                        switch (dealerTypeId) {
                          case "OEM":
                            label = "OEM Name";
                            break;
                          case "D":
                            label = "Dealer Name";
                            break;
                          case "Retailer":
                            label = "Retailer Name";
                            break;
                          default:
                            label = "ID";
                        }

                        // Validate the dealerId field
                        const dealerId = editDealer.dealerName;
                        if (!validateField(dealerId, label)) return;


                        // const userId = n.userId;
                        // let label;
                        // switch (user?.userTypeCode) {
                        //   case "Cust":
                        //     label = "Mobile No.";
                        //     break;
                        //   case "CG":
                        //     label = "Employee ID";
                        //     break;
                        //   case "D":
                        //     label = "Dealer code";
                        //     break;
                        //   case "ASC":
                        //     label = "ASC code";
                        //     break;
                        //   case "Technician":
                        //     label = "Technician code";
                        //     break;
                        //   case "Vendor":
                        //     label = "Vendor code";
                        //     break;
                        //   default:
                        //     label = "Id";
                        // }





                        const mobileNo = editDealer.mobileNo;
                        // Check if mobileNo is provided
                        if (!mobileNo) {
                          Swal.fire({
                            icon: "error",
                            title: "Mobile number is required."
                          });
                          return;
                        }

                        // // Regular expression to match exactly 10 digits
                        // const mobileNoRegex = /^\d{10}$/;

                        // // Check if mobileNo matches the regex pattern
                        // if (!mobileNoRegex.test(mobileNo)) {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Please enter Correct Mobile Number."
                        //   });
                        //   return;
                        // }


                        const emailId = editDealer.dealerEmail;
                        if (!emailId) {
                          Swal.fire({
                            icon: "error",
                            title: "Email address is required."
                          });
                          return;
                        }
                        const isValidationRequired = n.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                        const gstNumber = n.gstNo;
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



                        const address = editDealer.address;
                        if (!address) {
                          Swal.fire({
                            icon: "error",
                            title: "Address is required"
                          });
                          return;
                        }

                        const pinCode = editDealer.pinCode;
                        const pinCodeRegex = /^\d{6}$/;
                        if (!pinCode || !pinCode.match(pinCodeRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please enter a valid PIN code consisting of 6 digits."
                          });
                          return;
                        }

                        const stateName = editDealer.stateId; // Assuming stateId actually represents the state name

                        if (!stateName) {
                          Swal.fire({
                            icon: "error",
                            title: "State name is required"
                          });
                          return;
                        }

                        const cityName = editDealer.cityId; // Assuming stateId actually represents the state name
                        if (!cityName) {
                          Swal.fire({
                            icon: "error",
                            title: "city name is required"
                          });
                          return;
                        }






                        else {




                          setLoading(true)

                          fetch(addDealerUrl, {
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
                                if (res.status == 200 && r != "DEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Updated successfully!"
                                  })
                                  handleClose1()
                                  fetchAllDealers()
                                  setLoading(false)

                                  // window.location.reload()

                                  setedituser((pre) => {
                                    return {
                                      ...pre,
                                      userId: editDealer?.dealerCode,
                                      userTypeCode: "D",
                                      userName: editDealer?.dealerName,
                                      userEmailId: editDealer?.dealerEmail
                                    }
                                  })



                                }
                                else if (res.status == 200 && r == "DEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Dealer already exists!"
                                  })
                                  setLoading(false)


                                }
                              })
                            })
                        }
                      }} /></span>

                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {
                      loading ? (<Loader />) : (
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Customer Type <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='dealerTypeId' disabled value={editDealer?.dealerTypeId} onChange={handleChangeEdit}>
                                <option value="">Select</option>
                                {
                                  DealerTypes?.map((dealer, index) => {
                                    return (
                                      <>
                                        <option value={dealer?.parameterValId}>{dealer?.parameterText}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          {/* <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{editDealer?.dealerTypeId == "68" || editDealer?.dealerTypeId == "7" ? "OEM Code" : editDealer?.dealerTypeId == "69" || editDealer?.dealerTypeId == "8" ? "Dealer Code" : editDealer?.dealerTypeId == "70" || editDealer?.dealerTypeId == "9" ? "Retailer Code" : "Customer Code"}<span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='dealerCode'
                                value={editDealer?.dealerCode}
                                onChange={handleChangeEdit}
                                disabled

                                placeholder=''
                              />
                            </Form.Group>
                          </Col> */}


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{editDealer?.dealerTypeId == "68" || editDealer?.dealerTypeId == "7" ? "OEM Name" : editDealer?.dealerTypeId == "69" || editDealer?.dealerTypeId == "8" ? "Dealer Name" : editDealer?.dealerTypeId == "70" || editDealer?.dealerTypeId == "9" ? "Retailer Name" : "Customer Name"}<span className='req-t'>*</span></Form.Label>
                              <Select
                                aria-labelledby="aria-label"
                                inputId="aria-example-input"
                                name="dealerName"
                                isDisabled
                                value={{ value: editDealer?.dealerName, label: editDealer?.dealerName }} // Set the initial value here
                                onChange={(e) => {
                                  seteditDealer((pre) => {
                                    return {
                                      ...pre,
                                      dealerName: e.value
                                    }
                                  })
                                  const getDealerFromSAPUrl = `${process.env.REACT_APP_API_URL}DealerSAP/GetAllSAPDealer?Name=${e.value}`;

                                  fetch(getDealerFromSAPUrl, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result);
                                      seteditDealer((pre) => {
                                        return {
                                          ...pre,
                                          dealerCode: result[0]?.dealerCode,
                                          mobileNo: result[0]?.mobileNumber,
                                          dealerEmail: result[0]?.email,
                                          address: result[0]?.address,
                                          pinCode: result[0]?.pinCode

                                        }
                                      })
                                    })
                                }}
                                options={getAllSApDealers.map(option => ({ value: option.dealerCode, label: option.dealerName }))}

                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>{editDealer?.dealerTypeId == "68" || editDealer?.dealerTypeId == "7" ? "OEM Code" : editDealer?.dealerTypeId == "69" || editDealer?.dealerTypeId == "8" ? "Dealer Code" : editDealer?.dealerTypeId == "70" || editDealer?.dealerTypeId == "9" ? "Retailer Code" : "Customer Code"}<span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='dealerCode'
                                value={editDealer?.dealerCode}
                                onChange={handleChangeEdit}
                                disabled

                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Mobile No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="tel"
                                name='mobileNo'
                                value={editDealer?.mobileNo}
                                onChange={EdithandleMobileChange}
                                placeholder=''
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='dealerEmail'
                                value={editDealer?.dealerEmail}
                                onChange={EdithandleEmailChange}
                                placeholder=''
                              />
                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check
                                type='checkbox'
                                label="Is GST Applicable"
                                name='isGSTApplicable'
                                checked={editDealer?.isGSTApplicable}
                                onChange={(e) => {
                                  console.log("Checkbox checked:", e.target.checked);
                                  console.log("Previous editASC:", editDealer);
                                  seteditDealer((prev) => ({
                                    ...prev,
                                    isGSTApplicable: e.target.checked,
                                    gstNo: e.target.checked ? prev.gstNo : ''


                                  }));
                                }}
                              />


                            </Form.Group>
                          </Col>

                          {editDealer.isGSTApplicable && (
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>GST No. <span className='req-t'>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name='gstNo'
                                  value={editDealer.gstNo}
                                  onChange={handleChangeEdit}
                                  placeholder=''
                                />
                              </Form.Group>
                            </Col>
                          )}


                          {/* <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>Working Days <span className='req-t'>*</span></Form.Label>
                          <Form.Select name='workingDays' value={editDealer?.workingDays} onChange={handleChangeEdit}>
                            <option value="">Select</option>

                            <option value="Mon to Fri">Mon to Fri</option>
                            <option value="Mon to Sat">Mon to Sat</option>
                            <option value="Mon to Sun">Mon to Sun</option>
                            
                          </Form.Select>
                        </Form.Group>
                      </Col> */}

                          {/* {editDealer?.isGSTApplicable === true ? <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>GST No. <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name='gstNo'
                            value={editDealer?.isGSTApplicable ? editDealer.gstNo : ''} // Show value if isGSTApplicable is true, otherwise show blank
                            onChange={handleChangeEdit}
                            placeholder=''
                            maxLength={20}
                          />
                        </Form.Group>
                      </Col> : ""} */}




                          <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check
                                type='checkbox'
                                label=" Is Industry Customer"
                                name='isIndustryCustomer'
                                checked={editDealer?.isIndustryCustomer} // Ensure correct checked value
                                onChange={(e) => {
                                  console.log("Checkbox checked:", e.target.checked);
                                  console.log("Previous editDealer:", editDealer);
                                  seteditDealer((prevDealer) => ({
                                    ...prevDealer,
                                    isIndustryCustomer: e.target.checked
                                  }));
                                }}
                              />


                            </Form.Group>
                          </Col>
                          <p className='mt-4'
                            style={{
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >Dealer Address</p>
                          <hr />

                          <Col md={12} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={1}
                                name='address'
                                value={editDealer?.address}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Pin Code <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="number"
                                name='pinId '
                                value={editDealer.pinCode}
                                onChange={(e) => {
                                  EdithandlePinCodeChange(e)
                                  if (e.target.value && e.target.value?.length == 6) {
                                    seteditDealer((pre) => {
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
                                        seteditDealer((pre) => {
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
                                                seteditDealer(prevBranch => ({
                                                  ...prevBranch,
                                                  // cityId:result[0]?.parameterTypeId
                                                }));
                                              }
                                            }
                                            else {
                                              // Reset state and cities if pin code doesn't match
                                              seteditDealer(prevBranch => ({
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
                                            seteditDealer(prevBranch => ({
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
                                    seteditDealer((pre) => {
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
                              <Form.Select name='stateId' value={editDealer?.stateId} onChange={(e) => {
                                seteditDealer((pre) => {
                                  return {
                                    ...pre,
                                    stateId: e.target.value,
                                    pinCode: ''
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


                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>City <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='cityId' disabled value={editDealer?.cityId}
                                onChange={(e) => {
                                  setaddDealer((pre) => {
                                    return {
                                      ...pre,
                                      cityId: e.target.value,
                                      pinCode: ''

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
                      )
                    }
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>

                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>User Creation</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addUserUrl = `${process.env.REACT_APP_API_URL}User/UpsertUser`;



                        let divisionString = edituser?.divisionCode?.map(item => item.value).toString()
                        let productLineString = edituser?.productLineCode?.map(item => item.value).toString()

                        // console.log(divisionCodeString);
                        // console.log(productLineCodeString);
                        let n = {
                          ...edituser,
                          divisionCode: divisionString,
                          productLineCode: productLineString
                        };

                        console.log(n);




                        //  console.log(user);



                        // if (user?.userId == "" || user?.roleCode == "" || user?.branchCode == "" || user?.divisionCode == "" || user?.productLineCode == "") {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Please fill all the fields marked with red *!"
                        //   })
                        // }

                        const userId = n.userId;
                        if (!userId) {
                          Swal.fire({
                            icon: "error",
                            title: "userId is required "
                          });
                          return;
                        }

                        const userRole = edituser.roleCode;
                        if (!userRole || userRole === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Role Code is required"
                          })
                          return;
                        }


                        const division = n.divisionCode;
                        if (!division || division === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Division is required"
                          });
                          return;
                        }

                        const productLine = n.productLineCode;
                        if (!productLine || productLine.length === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "Product Line is required"
                          });
                          return;
                        }

                        const userBranch = n.branchCode;
                        if (!userBranch) {
                          Swal.fire({
                            icon: "error",
                            title: "Branch is required"

                          })
                          return;
                        }





                        // console.log(data);
                        setLoading(true)
                        fetch(addUserUrl, {
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



                              if (res.status == 200 && r != "UEXISTS") {
                                Swal.fire({
                                  icon: "success",
                                  title: "Update successfully!"
                                })
                                handleClose1();
                                fetchAllDealers()
                                setLoading(false)
                              }
                              else if (res.status == 200 && r == "UEXISTS") {
                                Swal.fire({
                                  icon: "warning",
                                  title: "User already exists!"
                                })
                                setLoading(false)

                              }
                            })
                          })

                      }} /></span>

                    </div>

                  </Accordion.Header>
                  <Accordion.Body>

                    {
                      loading ? (<Loader />) : (

                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={edituser?.userId}

                                readOnly
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                              <Form.Select value={edituser.roleCode} onChange={(e) => {
                                setedituser((pre) => {
                                  return {
                                    ...pre,
                                    roleCode: e.target.value
                                  }
                                })
                                console.log(user);
                              }}>
                                <option value="">Select</option>
                                {
                                  Roles?.map((role, index) => {
                                    return (
                                      <>
                                        <option value={role?.roleCode}>{role?.roleName}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allDivisions}
                                value={edituser.divisionCode}

                                onChange={function noRefCheck(e) {


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

                                      let filteredProdLineCodes = edituser.productLineCode.filter((singleCode) => {
                                        if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                      })

                                      setedituser((pre) => {
                                        return {
                                          ...pre,
                                          divisionCode: e,
                                          productLineCode: filteredProdLineCodes
                                        }
                                      })
                                      setallproductLines(prodLines)
                                    })
                                }}
                                labelledBy={"Select"}
                                isCreatable={true}
                                valueRenderer={customValueRenderer}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allproductLines}
                                value={edituser.productLineCode}



                                onChange={function noRefCheck(e) {
                                  console.log(e);
                                  setedituser((pre) => {
                                    return {
                                      ...pre,
                                      productLineCode: e
                                    }
                                  })
                                }}
                                labelledBy={"Select"}
                                isCreatable={true}
                                valueRenderer={customValueRenderer}
                              />
                            </Form.Group>
                          </Col>


                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
                              <Form.Select value={edituser?.branchCode} name='branchName' onChange={(e) => {
                                setedituser((pre) => {
                                  return {
                                    ...pre,
                                    branchCode: e.target.value
                                  }
                                })
                              }}>
                                <option value="">Select</option>

                                {
                                  branchData?.map((branch, index) => {
                                    return (
                                      <>
                                        <option value={branch?.parameterTypeId}>{branch?.parameterType}</option>

                                      </>
                                    )
                                  })
                                }
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      )}
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>

              {/* <Row className='mt-3'>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
               
                <Col md={4}>
                <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
           
                <Col md={4}>
                <Form.Group>
                <Form.Label>Branch</Form.Label>
                <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Working Days</Form.Label>
        <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                </Row> */}

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




          {/* -------------------------Delete------------------ */}



          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Dealer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Dealer?


            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDealerUrl = `${process.env.REACT_APP_API_URL}Dealer/DeleteDealer?dealerId=${dealerId}&isActive=${0}`;







                fetch(deleteDealerUrl, {
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
                        fetchAllDealers()

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
              <Modal.Title className='mdl-title'>Activate Dealer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Dealerr?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDealerUrl = `${process.env.REACT_APP_API_URL}Dealer/DeleteDealer?dealerId=${activeID}&isActive=${1}`;

                fetch(deleteDealerUrl, {
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
                        fetchAllDealers()


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
              <Modal.Title className='mdl-title'>De-activate Dealer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Dealer?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDealerUrl = `${process.env.REACT_APP_API_URL}Dealer/DeleteDealer?dealerId=${activeID}&isActive=${0}`;

                fetch(deleteDealerUrl, {
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
                      fetchAllDealers()

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
                    //     fetchAllDealers()


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

export default Dealer