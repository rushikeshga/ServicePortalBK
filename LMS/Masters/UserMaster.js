import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Multiselect from 'multiselect-react-dropdown';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { Box, IconButton, Pagination, Switch, Tooltip, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { handleResponse } from '../../../Components/Generic/utility';
import { MultiSelect } from 'react-multi-select-component';
import { MdPlaylistAdd } from 'react-icons/md';
import { IoSave } from 'react-icons/io5';
import Loader from '../../loader';

function UserMaster() {
  const [userIDAR, setuserIDAR] = useState("")
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [initialUserData, setInitialUserData] = useState({ userName: '', userEmailId: '' });

  const handleClose = () => {
    setuser(initialUserData);
    setShow(false);
    setuser({
      userAutoId: 0,
      userId: "",
      userPassword: "",
      userTypeCode: "",
      userEmailId: "",
      userName: "",
      roleCode: "",
      mappingId: 0,
      branchCode: [],
      divisionCode: [],
      productLineCode: [],
      isActive: true
    })



  }


  useEffect(() => {
    if (show) {
      setInitialUserData({ ...user });
    }
  }, [show]);

  const handleShow = () => {
    setShow(true)
    fetchAllUserTypes();

  }
    ;
  const [show1, setShow1] = useState(false);


  const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);


  const [showIsActiveAR, setIsActiveAR] = useState(false);
  const handleCloseIsActiveAR = () => setIsActiveAR(false);
  const handleShowIsActiveAR = () => setIsActiveAR(true);
  const [showIsActive1AR, setIsActive1AR] = useState(false);
  const handleCloseIsActive1AR = () => setIsActive1AR(false);
  const handleShowIsActive1AR = () => setIsActive1AR(true);



  const [showDel, setShowDel] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);



  const [showAR, setshowAR] = useState(false);

  const handleCloseAR = () => setshowAR(false)
  const handleShowAR = () => setshowAR(true)


  let token = localStorage.getItem("UserToken")



  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));





  const [selectedBranchArray, setselectedBranchArray] = useState([]);

  const [selectedDivisionArray, setselectedDivisionArray] = useState([]);

  const [selectedProductLineArray, setselectedProductLineArray] = useState([]);



  const [user, setuser] = useState({
    userAutoId: 0,
    userId: "",
    userPassword: "",
    userTypeCode: "",
    userEmailId: "",
    userName: "",
    mobileNo:"",
    roleCode: "",
    mappingId: 0,
    branchCode: [],
    divisionCode: [],
    productLineCode: [],
    isActive: true
  })
  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };



  const handleChange = (e) => {
    const newdata = { ...user };
    newdata[e.target.name] = e.target.value;
    setuser(newdata);
    console.log(newdata);
  }


  const [branches, setbranches] = useState([])


  const [editUser, seteditUser] = useState({
    userAutoId: 0,
    userId: "",
    userPassword: "",
    userTypeCode: "",
    userEmailId: "",
    userName: "",
    mobileNo:"",
    roleCode: "",
    mappingId: 0,
    branchCode: [],
    divisionCode: [],
    productLineCode: [],
    isActive: true
  })


  const [userID, setuserID] = useState("")


  const [userAutoId, setuserAutoId] = useState("")






  const [AdditionalRights, setAdditionalRights] = useState({
    uAddAutoId: 0,
    userCode: "",
    divisionCode: "",
    plCode: [],
    branchCode: "",
    isActive: true,
  });


  const [selectedDivString, setselectedDivString] = useState("")

  const [selectedBranchString, setselectedBranchString] = useState("")

  const [selectedProductLineString, setselectedProductLineString] = useState("")





  useEffect(() => {
    const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;
    fetch(getAllBranches, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setbranches(result)
        setbranchData(result.map(branch => ({ value: branch.parameterTypeId, label: branch.parameterType })))
      })


  }, [])








  const [editBranchdata, setEditbranchData] = useState([])

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
          console.log("----------", result);

          seteditUser((pre) => {
            return {
              ...pre,
              userAutoId: result?.userAutoId,
              userId: result?.userId,
              userTypeCode: result?.userTypeCode,
              userEmailId: result?.userEmailId,
              userName: result?.userName,
              mobileNo:result?.mobileNo,
              roleCode: result?.roleCode,
              branchCode: result.branchCodeList.map(branch => ({ value: branch.parameterTypeId, label: branch.parameterType })),
              divisionCode: result.divisionCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
              productLineCode: result.productLineCodeList.map(PL => ({ value: PL.parameterTypeId, label: PL.parameterType })),
            }
          })
          console.log(result);

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





          const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;

          fetch(getAllBranches, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              setEditbranchData(result.map(branch => ({ value: branch.parameterTypeId, label: branch.parameterType })))
            })
          let divisionCodes = result?.divisionCodeList?.map(item => item?.parameterTypeId).toString();
          let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodes ? divisionCodes : 0}`;

          fetch(getAllProductLines1, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallproductLines(result.map(PL => ({ value: PL.parameterTypeId, label: PL.parameterType })))
            })

        })
    }
  }, [userID])


  const handleClose1 = () => {
    setShow1(false)
    const getSingleUserByIdUrl = `${process.env.REACT_APP_API_URL}User/GetUserById?userId=${userID ? userID : 0}`;
    fetch(getSingleUserByIdUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        seteditUser((pre) => {
          return {
            ...pre,
            userAutoId: result?.userAutoId,
            userId: result?.userId,
            userTypeCode: result?.userTypeCode,
            userEmailId: result?.userEmailId,
            userName: result?.userName,
            roleCode: result?.roleCode,
            branchCode: result.branchCodeList.map(branch => ({ value: branch.parameterTypeId, label: branch.parameterType })),
            divisionCode: result.divisionCodeList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),
            productLineCode: result.productLineCodeList.map(PL => ({ value: PL.parameterTypeId, label: PL.parameterType }))

          }
        })
      })


  }




  const handleChangeEdit = (e) => {
    const newdata = { ...editUser };
    newdata[e.target.name] = e.target.value;
    seteditUser(newdata);
    console.log(newdata);
  }

  const [data, setdata] = useState([]);

  const [UserTypes, setUserTypes] = useState([]);

  const [Roles, setRoles] = useState([])
  const [isActive, setisActive] = useState("")
  const [isDisabled, setIsDisabled] = useState(true);



  const [usersByID, setusersByID] = useState([])
  const [usersByID2, setusersByID2] = useState([])

  const [activeID, setactiveID] = useState(0)

  const [AllRoles, setAllRoles] = useState([])

  const GetdataUrl = `${process.env.REACT_APP_API_URL}User/GetAllUser`;
  const GetRolesUrl = `${process.env.REACT_APP_API_URL}Role/GetAllRoles`;
  const GetAllUserTypesUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=UserType`;
  const GetAllRolesUrl = `${process.env.REACT_APP_API_URL}Role/GetAllRolesByUserType?userTypeid=${user?.userTypeCode ? user?.userTypeCode : 0}`;
  const GetAllRolesUrl1 = `${process.env.REACT_APP_API_URL}Role/GetAllRolesByUserType?userTypeid=${editUser?.userTypeCode ? editUser?.userTypeCode : 0}`;
  const GetUserByUserIDUrl = `${process.env.REACT_APP_API_URL}UserGetByUserType/GetUserGetByUserType?UserTypeId=${user.userTypeCode}`
  const GetUserByUserIDUrlEdit = `${process.env.REACT_APP_API_URL}UserGetByUserType/GetUserGetByUserType?UserTypeId=${editUser.userTypeCode}`


  const fetchdata = () => {
    fetch(GetdataUrl, {
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
  const fetchRoles = () => {
    fetch(GetRolesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllRoles(result)
      })
  }


  const fetchAllUserTypes = () => {
    fetch(GetAllUserTypesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserTypes(result)
      })
  }



  const [AllUserTypesforFilter, setAllUserTypesforFilter] = useState([])
  useEffect(() => {
    fetch(GetAllUserTypesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllUserTypesforFilter(result)
      })
  }, [])






  const fetchAllRoles = () => {
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

  const fetchAllRoles1 = () => {
    fetch(GetAllRolesUrl1, {
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


  const fetchUsersByUserId = () => {
    fetch(GetUserByUserIDUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setusersByID(result)
      })
  }
  const fetchUsersByUserId2 = () => {
    fetch(GetUserByUserIDUrlEdit, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setusersByID2(result)
      })
  }


  useEffect(() => {
    if (user && user.userTypeCode) {
      fetchAllRoles();
    }

  }, [user?.userTypeCode])

  useEffect(() => {
    if (editUser && editUser.userTypeCode) {
      fetchAllRoles1();
    }

  }, [editUser?.userTypeCode])

  useEffect(() => {
    fetchdata();
    fetchRoles()
  }, [])

  useEffect(() => {

    if (user && user.userTypeCode) {
      fetchUsersByUserId();

    }
  }, [user.userTypeCode])


  useEffect(() => {
    if (editUser && editUser.userTypeCode) {
      fetchUsersByUserId2();
    }


  }, [editUser?.userTypeCode])




  const [branchData, setbranchData] = useState([]);

  const [allDivisions, setallDivisions] = useState([]);


  const [allproductLines, setallproductLines] = useState([])
  const [allARproductLines, setallARproductLines] = useState([])



  const [allDivs, setallDivs] = useState([])

  useEffect(() => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivs(result)
        setallDivisions(result.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })))
      })



  }, [])




  const [filteringState, setfilteringState] = useState(false)
  // -----------Pagination code------------------------

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const fetchDataPaginate = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}User/GetAllUser`,

    );
    url.searchParams.set(
      'PageNumber',
      `${pagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${pagination?.pageSize}`);

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


    fetchDataPaginate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);



  const [filterUserType, setfilterUserType] = useState('')
  const [filterUserName, setfilterUserName] = useState('')
  const [filterUserRole, setfilterUserRole] = useState('')
  const [filterIsActive, setfilterIsActive] = useState('')

  const [filterPagination, setfilterPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  })



  const fetchDataPaginateFiltered = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}User/GetAllUser`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterUserType) { url.searchParams.set('UserTypeCode', `${filterUserType}`) }
    if (filterUserRole) { url.searchParams.set('RoleCode', `${filterUserRole}`) }
    if (filterUserName) { url.searchParams.set('UserName', `${filterUserName}`) }

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




    // fetchDataPaginate();



    fetchDataPaginateFiltered();


  }, [filterPagination?.pageIndex, filterPagination?.pageSize])




  const columns = useMemo(
    () => [


      {
        accessorKey: "userTypeName",
        header: "User Type",
      },
      {
        accessorKey: "userId",
        header: "User Id",
      },
      {
        accessorKey: "userName",
        header: "User Name",
      },
      {
        accessorKey: "userEmailId",
        header: "User Email",
      },
      {
        accessorKey: "mobileNo",
        header: "User Mobile No.",
      },
      {
        accessorKey: "roleName",
        header: "User Role",
      },
      {
        accessorKey: "noOfBranch",
        header: "User Branch",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),
      },
      {
        accessorKey: "noOfDivision",
        header: "User Division",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),
      },
      {
        accessorKey: "noOfProductLine",
        header: "User Product Line",
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
                          console.log("pp", cell.row.original.userId);
                          setuserID(cell.row.original.userId)
                          handleShow1()
                          fetchAllUserTypes();

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
                    Permissions?.isDelete ? <Tooltip arrow placement="right" title="In Active">
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.userAutoId);
                        setactiveID(cell.row.original.userAutoId);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>
                        <FaUserXmark

                          style={{ color: 'red' }} // Style for the new icon

                        />
                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip arrow placement="right" title="Active">
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.userAutoId);
                        setactiveID(cell.row.original.userAutoId);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>
                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                }
                {
                  cell.row.original.isActive == false ? "" :
                    (Permissions?.isEdit && cell.row.original.userTypeCode == "CG") ? <Tooltip arrow placement="right" title="Additional Rights">
                      <IconButton className="user-btn" onClick={() => {
                        setAdditionalRights((pre) => {
                          return {
                            ...pre,
                            userCode: cell.row.original?.userId,
                          }
                        })

                        setuserIDAR(cell.row.original?.userId)
                        handleShowAR()
                      }}>
                        <MdPlaylistAdd

                          style={{ color: 'green' }}

                        />
                      </IconButton>
                    </Tooltip> : ""

                }

                {/* <Switch checked={data === true} onClick={(e) => {
                  console.log(cell.row.original?.userAutoId);
                  setactiveID(cell.row.original?.userAutoId)
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





  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    // sessionStorage.setItem("collectionPatient",item.PatientID);
    setuser((pre) => {
      return {
        ...pre,
        userName: item?.displayName,
        userEmailId: item?.email,
        userId: item?.userId,
        mobileNo:item?.mobileNo
      }
    })

  }
  const handleClear = (item) => {
    // the item selected
    // console.log(item)
    // sessionStorage.setItem("collectionPatient",item.PatientID);
    setuser((pre) => {
      return {
        ...pre,
        userName: "",
        userEmailId: "",
        userId: "",
        mobileNo:""
      }
    })

  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.userName}</span>
      </>
    )
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
    // sessionStorage.setItem("collectionPatient",item.PatientID);
    seteditUser((pre) => {
      return {
        ...pre,
        userName: item?.displayName,
        userEmailId: item?.email,
        userId: item?.userId,
        mobileNo:item?.mobileNo
      }
    })

  }
  const handleClear1 = (item) => {
    // the item selected
    // console.log(item)
    // sessionStorage.setItem("collectionPatient",item.PatientID);
    seteditUser((pre) => {
      return {
        ...pre,
        userName: "",
        userEmailId: "",
        userId: ""
      }
    })

  }

  const handleOnFocus1 = () => {
    console.log('Focused')
  }

  const formatResult1 = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.userName}</span>
      </>
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUserUrl = `${process.env.REACT_APP_API_URL}User/UpsertUser`;



    const branchCodeString = user.branchCode.map(branch => branch.value).join(',');

    // Convert divisionCode array to string
    const divisionCodeString = user.divisionCode.map(division => division.value).join(',');

    // Convert productLineCode array to string
    const productLineCodeString = user.productLineCode.map(productLine => productLine.value).join(',');

    console.log(productLineCodeString);

    let n = {
      ...user,
      branchCode: branchCodeString,
      divisionCode: divisionCodeString,
      productLineCode: productLineCodeString,
    };

    console.log(n);




    //  console.log(user);



    // if (user?.userTypeCode === "" || user?.userId === "" || user?.roleCode === "" || user.branchCode === "" || user?.divisionCode === "" || user?.productLineCode === "") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Please fill all the fields marked with red *!"
    //   })
    // }
    const userTypeCode = n.userTypeCode;
    if (!userTypeCode || userTypeCode === 'Select') {
      Swal.fire({
        icon: "error",
        title: "Please select the User Type"
      });
      return;
    }


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

    const userId = n.userId;
    let label;
    switch (user?.userTypeCode) {
      case "Cust":
        label = "Mobile No.";
        break;
      case "CG":
        label = "Employee ID";
        break;
      case "D":
        label = "Dealer code";
        break;
      case "ASC":
        label = "ASC code";
        break;
      case "Technician":
        label = "Technician code";
        break;
      case "Vendor":
        label = "Vendor code";
        break;
      default:
        label = "Id";
    }

    // Validate userId field
    if (!validateField(userId, label)) return;






    // const userEmailId = n.userEmailId;
    // const userEmailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    // if (!userEmailId || !userEmailId.match(userEmailIdRegex)) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid email address"
    //   });
    //   return;
    // }

    const roleCode = n.roleCode;
    // Check if roleCode is empty or not provided
    if (!roleCode || roleCode === "Select") {
      Swal.fire({
        icon: "error",
        title: "User Role is required"
      });
      return;
    }



    const branchCodes = n.branchCode;
    if (!branchCodes) {
      Swal.fire({
        icon: "error",
        title: "Branch is required"
      });
      return;
    }



    const divisionCodes = n.divisionCode;
    if (!divisionCodes) {
      Swal.fire({
        icon: "error",
        title: "Division is required"
      });
      return;
    }
    // Validate each division code individually
    // const divisionCodeRegex = /^[a-zA-Z\s]+$/; // Regular expression allowing alphabets and spaces
    // for (const divisionCode of divisionCodes) {
    //   if (!divisionCode.match(divisionCodeRegex)) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "division code must contain only alphabets"
    //     });
    //     return;
    //   }
    // }

    const productLineCodes = n.productLineCode
    if (!productLineCodes) {
      Swal.fire({
        icon: "error",
        title: "Product line is required"
      });
      return;
    }
    // console.log(data);
    setLoading(true)
    await fetch(addUserUrl, {
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
            // setLoading(false)
          }

          if (res.status == 200 && r != "UEXISTS") {
            Swal.fire({
              icon: "success",
              title: "Saved successfully!"
            })
            handleClose()
            fetchdata()
            setLoading(false)

          }
          else if (res.status == 200 && r === "UEXISTS") {
            Swal.fire({
              icon: "warning",
              title: "User already exists!"
            })
            setLoading(false)


          }
        })
      })
  }


  const [ARrights, setARrights] = useState([])

  const [activeIDAR, setactiveIDAR] = useState("")


  const fetchAR = () => {
    fetch(`${process.env.REACT_APP_API_URL}UAddRights/GetAllUAddRights?UserCode=${userIDAR}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setARrights(result)
      })
  }


  useEffect(() => {
    if (userIDAR) {
      fetchAR()

    }

  }, [userIDAR])








  const columnsAR = useMemo(
    () => [


      {
        accessorKey: "divisionCode",
        header: "Division",
      },

      {
        accessorKey: "plCode",
        header: "Product Line",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),
      },
      {
        accessorKey: "branchCode",
        header: "Branch",
        // Cell: ({ cell }) => (
        //   <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        // ),
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
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    Permissions?.isDelete ? <Tooltip arrow placement="right" title="In Active">
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original?.uAddAutoId);
                        setactiveIDAR(cell.row.original?.uAddAutoId);
                        cell.row.original.isActive == true ? handleShowIsActive1AR() : handleShowIsActiveAR();
                      }}>
                        <FaUserXmark

                          style={{ color: 'red' }} // Style for the new icon

                        />
                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip arrow placement="right" title="Active">
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original?.uAddAutoId);
                        setactiveIDAR(cell.row.original?.uAddAutoId);
                        cell.row.original.isActive == true ? handleShowIsActive1AR() : handleShowIsActiveAR();
                      }}>
                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                }


              </Box>

            </>
          )
        }
      },





    ]
  );




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
    setfilterUserName(event.target.value);
    // Your logic here
  }, 500); // Adjust delay as needed


  const customHeaders = {
    userTypeName: 'User Type',
    userName: 'User Name',
    userEmailId: 'User Email',
    roleName: 'User Role',
  }
  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>
            <p className='pg-label m-0'>User Master</p>
            {Permissions?.isAdd ? <Row className='text-end'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New User</Button></Col></Row> : ""}

          </div>
          <hr />
          







          <Form>
            <Row
              style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
              className="m-3 p-3"
            >
              <Col md={2}>
                <Form.Group>
                  <Form.Label>User Type</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={e => setfilterUserType(e.target.value)}>
                    <option value=''>Select</option>
                    {AllUserTypesforFilter?.map((userlist, index) => {
                      return (
                        <>
                          <option value={userlist?.parameterCode}>{userlist?.parameterText}</option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type='text' onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>User Role</Form.Label>
                  <Form.Select value={filterUserRole} onChange={e => setfilterUserRole(e.target.value)}>
                    <option value="">Select</option>
                    {AllRoles?.map((role, index) => {
                      return (
                        <>
                          <option value={role?.roleCode}>{role?.roleName}</option>
                        </>
                      );
                    })}
                    {/* <option value=""></option> */}
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* <Col md={2}>
        <Form.Group>
          <Form.Label>Is Active</Form.Label>
          <Form.Select>
            <option value="">Select</option>
            <option value="all">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Select>
        </Form.Group>
      </Col> */}
              <Col md={2}>
                <div className="pt-2">
                  <Button
                    variant=""
                    className="add-Btn mt-3"
                    onClick={(e) => {
                      setfilterPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      setPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })


                      fetchDataPaginateFiltered()
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
                      // fetchAllLeads
                      setfilterPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      setPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      fetchDataPaginate()

                      setfilterUserType('');
                      setfilterUserName('')
                      setfilterUserRole('')
                      setisActive('')
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
                initialState={{ showColumnFilters: false }} //show filters by default

                // enableExpandAll="false"
                muiDetailPanelProps={() => ({
                  sx: (theme) => ({
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,210,244,0.1)'
                        : 'rgba(0,0,0,0.1)',
                  }),
                })}


                // initialState={{ showColumnFilters: false }} //show filters by default

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
                //               console.log(cell.row.original.userId);
                //               setuserID(cell.row.original.userId)
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
                //               setuserID(cell.row.original.userId)
                //               setisActive(cell.row.original.userAutoId)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}

                muiExpandButtonProps={({ row, table }) => ({
                  onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
                  sx: {
                    transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s',
                  },
                })}
                enableExpandAll={false}
                renderDetailPanel={({ row }) => {
                  // console.log('---row---',row.original.branchCode)
                  let list1 = row.original.branchCode?.split(",")
                  let list2 = row.original.divisionCode?.split(",")
                  let list3 = row.original.productLineCode?.split(",")

                  // console.log(list1);

                  return (

                    (row.original.branchCode || row.original.divisionCode || row.original.productLineCode) ? (
                      <Box
                      // sx={{
                      //   display: 'grid',
                      //   margin: 'auto',
                      //   gridTemplateColumns: '1fr 1fr',
                      //   width: '100%',
                      // }}
                      >
                        {/* <Typography>Address: {row.original.address}</Typography> */}
                        {/* <Row className='justify-content-end'>
  <Col md={4} sm={4} xs={4}> */}


                        <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
                          {list1 ?

                            <div className='p-3' style={{ borderRight: "1px solid" }}>
                              <p style={{ fontSize: "16px", fontWeight: "600" }}>Branches</p>
                              <ul>


                                {
                                  list1?.map((branch, index) => {
                                    return (
                                      <>
                                        <li>{branch}</li>

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
                                <p style={{ fontSize: "16px", fontWeight: "600" }}>Division</p>
                                <ul>
                                  {
                                    list2?.map((division, index) => {
                                      return (

                                        <li>{division}</li>
                                      )
                                    })
                                  }
                                  {/* <li>Pune</li> */}
                                </ul>
                              </div> : ""
                          }
                          {list3 ?

                            <div className='p-3'>
                              <p style={{ fontSize: "16px", fontWeight: "600" }}>Product Line</p>
                              <ul>
                                {
                                  list3?.map((pLine, index) => {
                                    return (

                                      <li>{pLine}</li>
                                    )
                                  })
                                }
                              </ul>
                            </div> : ""
                          }
                        </div>

                        {/* <Col>
      </Col> */}

                        {/* </Col>
</Row> */}
                      </Box>
                    ) : null
                  )

                }

                }

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

                      {Permissions?.isDownload ? <Button variant=''
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            customHeaders,
                            [
                              "noOfBranch",
                              "noOfDivision",
                              "noOfProductLine",
                              "totalRows",
                              "divisionCodeList",
                              "productLineCodeList",
                              "branchCodeList",
                              "userAutoId",
                              "userId",
                              "mappingId",
                              "userPassword",
                              "userTypeCode",
                              "roleCode",
                              "branchCode",
                              "divisionCode",
                              "productLineCode",
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


              // positionActionsColumn="first"





              /> : ""

          }

          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                loading ? (<Loader />) : (
                  <><Row>
                    <Col md={4} className='mt-3'>
                      <Form.Group>
                        <Form.Label>User Type <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='userTypeCode' value={user.userTypeCode} onChange={handleChange}>
                          <option>Select</option>
                          {UserTypes?.map((userlist, index) => {
                            return (
                              <>
                                <option value={userlist?.parameterCode}>{userlist?.parameterText}</option>

                              </>
                            );
                          })}

                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/* {user.Type==="2"? <Col md={4} className='mt-3'>
<Form.Group>
<Form.Label>User Code <span className='req-t'>*</span></Form.Label>
<Form.Control type='text'/>
</Form.Group>
</Col>:""} */}
                    <Col md={4} className='mt-3'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>{user?.userTypeCode == "Cust" ? "Mobile No." : user?.userTypeCode == "CG" ? "Employee ID" : user?.userTypeCode == "D" ? "Dealer code" : user?.userTypeCode == "ASC" ? "ASC code" : user?.userTypeCode == "Technician" ? "Technician code" : user?.userTypeCode == "Vendor" ? "Vendor code" : "Id"}<span className='req-t'>*</span></Form.Label>
                        <ReactSearchAutocomplete
                          items={usersByID}
                          onSearch={handleOnSearch}
                          onClear={handleClear}
                          onHover={handleOnHover}
                          onSelect={handleOnSelect}
                          onFocus={handleOnFocus}
                          formatResult={formatResult}
                          // value={user?.userName} // Set the initial value for the search input

                          fuseOptions={{ keys: ["userName"] }}
                          // necessary, otherwise the results will be blank
                          resultStringKeyName="userName" />



                      </Form.Group>
                    </Col>
                    <Col md={4} className='mt-3'>
                      <Form.Group>
                        <Form.Label>User Name <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='text' value={user?.userName} onChange={handleChange} readOnly />
                      </Form.Group>
                    </Col>
                  </Row><Row>


                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Email <span className='req-t'>*</span></Form.Label>
                          <Form.Control type='email' value={user?.userEmailId} onChange={handleChange} readOnly />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Mobile No. <span className='req-t'>*</span></Form.Label>
                          <Form.Control type='tel' value={user?.mobileNo} onChange={handleChange} readOnly />
                        </Form.Group>
                      </Col>

                    
                      {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
        <Multiselect
          displayValue="parameterType"
          // selectedValues={user?.branchCode}

          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck(e) {
            console.log(e);
            setuser((pre) => {
              return {
                ...pre,
                branchCode: e
              }
            })
          }}
          onSearch={function noRefCheck() { }}
          onSelect={function noRefCheck(e) {
            console.log(e);
            setuser((pre) => {
              return {
                ...pre,
                branchCode: e
              }
            })
          }}
          options={branchData}
          showCheckbox
        />
      </Form.Group>
    </Col> */}
      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                          <Form.Select name='roleCode' value={user?.roleCode} onChange={handleChange}>
                            <option value="">Select</option>
                            {Roles?.map((role, index) => {
                              return (
                                <>

                                  <option value={role?.roleCode}>{role?.roleName}</option>
                                </>
                              );
                            })}

                            {/* <option value=""></option> */}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    
                    </Row><Row className='mt-3'>

                      {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
        <Multiselect
          displayValue="parameterType"
          // selectedValues={user?.divisionCode}
          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck(e) {

            console.log("0000000000000000000000000")
            console.log(e);
            setuser((pre) => {
              return {
                ...pre,
                divisionCode: e
              }
            })



            let divisionCodeString = e?.map(division => division.parameterTypeId)?.join(',');
            console.log("divString", divisionCodeString);
            const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${(selectedDivString && divisionCodeString) ? selectedDivString + "," + divisionCodeString : 0}`;

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



          onSearch={function noRefCheck() { }}
          onSelect={function noRefCheck(e) {
            console.log(e);
            console.log("000000000000000------------0000000000")

            setuser((pre) => {
              return {
                ...pre,
                divisionCode: e
              }
            })


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
                          <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
                          <MultiSelect
                            options={branchData}
                            value={user.branchCode}
                            onChange={function noRefCheck(e) {
                              console.log(e);
                              setuser((pre) => {
                                return {
                                  ...pre,
                                  branchCode: e
                                };
                              });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
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
                                    if (prodLines.find((pl) => pl.value === singleCode.value)) { return true; }
                                  });

                                  setuser((pre) => {
                                    return {
                                      ...pre,
                                      divisionCode: e,
                                      productLineCode: filteredProdLineCodes
                                    };
                                  });
                                  setallproductLines(prodLines);
                                });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                                };
                              });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>

                    </Row></>
                )}


            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={handleSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>






          {/* ----------------------------------Edit----------------------------------- */}



          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header>
              <Modal.Title className='mdl-title'>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {
                loading ? (<Loader />) : (
                  <><Row>
                    <Col md={4} className='mt-3'>
                      <Form.Group>
                        <Form.Label>User Type <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='userTypeCode' disabled value={editUser.userTypeCode} onChange={handleChangeEdit}>
                          <option>Select</option>
                          {UserTypes?.map((userlist, index) => {
                            return (
                              <>
                                <option value={userlist?.parameterCode}>{userlist?.parameterText}</option>

                              </>
                            );
                          })}

                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/* {user.Type==="2"? <Col md={4} className='mt-3'>
<Form.Group>
<Form.Label>User Code <span className='req-t'>*</span></Form.Label>
<Form.Control type='text'/>
</Form.Group>
  </Col>:""} */}
                    <Col md={4} className='mt-3'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>{editUser?.userTypeCode == "Cust" ? "Mobile No." : editUser?.userTypeCode == "CG" ? "Employee ID" : editUser?.userTypeCode == "D" ? "Dealer code" : editUser?.userTypeCode == "ASC" ? "ASC code" : editUser?.userTypeCode == "Technician" ? "Technician code" : editUser?.userTypeCode == "Vendor" ? "Vendor code" : "Id"}<span className='req-t'>*</span></Form.Label>

                        <ReactSearchAutocomplete

                          items={usersByID2}
                          placeholder={editUser.userId}
                          // onSearch={handleOnSearch1}
                          // onClear={handleClear1}
                          // onHover={handleOnHover1}
                          onSelect={handleOnSelect1}
                        // onFocus={handleOnFocus1}
                        // formatResult={formatResult1}
                        // fuseOptions={{ keys: ["userName"] }}
                        // resultStringKeyName="userName"

                        />



                      </Form.Group>
                    </Col>
                    <Col md={4} className='mt-3'>
                      <Form.Group>
                        <Form.Label>User Name </Form.Label>
                        <Form.Control type='text' value={editUser?.userName} readOnly />
                      </Form.Group>
                    </Col>
                  </Row><Row>


                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Email <span className='req-t'>*</span></Form.Label>
                          <Form.Control type='email' value={editUser?.userEmailId} readOnly />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Mobile No. <span className='req-t'>*</span></Form.Label>
                          <Form.Control type='tel' value={editUser?.mobileNo} onChange={handleChange} readOnly />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                          <Form.Select name='roleCode' value={editUser?.roleCode}
                            onChange={(e) => {
                              // setEditbranchData([])
                              seteditUser((pre) => {
                                return {
                                  ...pre,
                                  roleCode: e.target.value,
                                  branchCode: [],
                                  divisionCode: [],
                                  productLineCode: []
                                };
                              });

                            }}>
                            <option value="">Select</option>
                            {Roles?.map((role, index) => {
                              return (
                                <>

                                  <option value={role?.roleCode}>{role?.roleName}</option>
                                </>
                              );
                            })}

                            {/* <option value=""></option> */}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
        <Multiselect
          displayValue="parameterType"
          onKeyPressFn={function noRefCheck() { }}
          selectedValues={editUser?.branchCode}

          onRemove={function noRefCheck(e) {
            console.log(e);
            seteditUser((pre) => {
              return {
                ...pre,
                branchCode: e
              }
            })
          }}
          onSearch={function noRefCheck() { }}
          onSelect={function noRefCheck(e) {
            console.log(e);
            seteditUser((pre) => {
              return {
                ...pre,
                branchCode: e
              }
            })
          }}
          options={branchData}
          showCheckbox
        />
      </Form.Group>
    </Col> */}

                   
                    </Row><Row className='mt-3'>

                      {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
        <Multiselect
          displayValue="parameterType"
          selectedValues={editUser?.divisionCode}
          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck(e) {
            console.log(e);
            seteditUser((pre) => ({
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
            seteditUser((prev) => ({
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

    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
        <Multiselect
          displayValue="parameterType"
          selectedValues={editUser?.productLineCode}
          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck(e) {
            console.log(e);
            seteditUser((pre) => ({
              ...pre,
              productLineCode: e
            }));
          }}
          onSearch={function noRefCheck() { }}
          onSelect={function noRefCheck(e) {
            console.log("below is division");
            console.log(e);
            seteditUser((prev) => ({
              ...prev,
              productLineCode: e
            }));
          }}


          options={allproductLines}
          showCheckbox
        />
      </Form.Group>
    </Col> */}
   <Col md={4}>
                        <Form.Group>
                          <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
                          <MultiSelect
                            options={editBranchdata}
                            value={editUser.branchCode}
                            onChange={function noRefCheck(e) {
                              console.log(e);
                              seteditUser((pre) => {
                                return {
                                  ...pre,
                                  branchCode: e
                                };
                              });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                          <MultiSelect
                            options={allDivisions}
                            value={editUser.divisionCode}

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

                                  let filteredProdLineCodes = editUser.productLineCode.filter((singleCode) => {
                                    if (prodLines.find((pl) => pl.value === singleCode.value)) { return true; }
                                  });

                                  seteditUser((pre) => {
                                    return {
                                      ...pre,
                                      divisionCode: e,
                                      productLineCode: filteredProdLineCodes
                                    };
                                  });
                                  setallproductLines(prodLines);
                                });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                          <MultiSelect
                            options={allproductLines}
                            value={editUser.productLineCode}



                            onChange={function noRefCheck(e) {
                              console.log(e);
                              seteditUser((pre) => {
                                return {
                                  ...pre,
                                  productLineCode: e
                                };
                              });
                            }}
                            labelledBy={"Select"}
                            isCreatable={true}
                            valueRenderer={customValueRenderer} />
                        </Form.Group>
                      </Col>

                    </Row></>
                )}



            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={async (e) => {
                e.preventDefault();
                const editUserUrl = `${process.env.REACT_APP_API_URL}User/UpsertUser`;

                // console.log(editUser);
                // console.log(selectedBranchArray);
                // console.log(selectedDivisionArray);
                // console.log(selectedProductLineArray);


                const divisionCodeString = editUser?.divisionCode?.map(division => division.value).join(',');
                const prodLineCodeString = editUser?.productLineCode?.map(Pl => Pl.value).join(',');
                const branchCodeString = editUser?.branchCode?.map(pg => pg.value).join(',');



                let n = {
                  ...editUser,
                  divisionCode: divisionCodeString,
                  productLineCode: prodLineCodeString,
                  branchCode: branchCodeString
                };

                console.log(n);





                const userTypeCode = n.userTypeCode;
                if (!userTypeCode || userTypeCode === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Please select the User Type"
                  });
                  return;
                }


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

                const userId = n.userId;
                let label;
                switch (user?.userTypeCode) {
                  case "Cust":
                    label = "Mobile No.";
                    break;
                  case "CG":
                    label = "Employee ID";
                    break;
                  case "D":
                    label = "Dealer code";
                    break;
                  case "ASC":
                    label = "ASC code";
                    break;
                  case "Technician":
                    label = "Technician code";
                    break;
                  case "Vendor":
                    label = "Vendor code";
                    break;
                  default:
                    label = "Id";
                }

                // Validate userId field
                if (!validateField(userId, label)) return;





                // const userEmailId = n.userEmailId;
                // const userEmailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
                // if (!userEmailId || !userEmailId.match(userEmailIdRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Invalid email address"
                //   });
                //   return;
                // }


                const roleCode = n.roleCode;
                // Check if roleCode is empty or not provided
                if (!roleCode || roleCode === "Select") {
                  Swal.fire({
                    icon: "error",
                    title: "User Role is required"
                  });
                  return;
                }


                const branchCodes = n.branchCode;
                if (!branchCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch is required"
                  });
                  return;
                }

                const divisionCodes = n.divisionCode;
                if (!divisionCodes) {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
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
                else {
                  setLoading(true)
                  await fetch(editUserUrl, {
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
                        if (res.status == 200 && r != "UEXISTS") {
                          Swal.fire({
                            icon: "success",
                            title: "Update successfully!"
                          })
                          handleClose1()
                          fetchdata()
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
                }
              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>



          {/* ----------------------delete--------------------- */}

          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this User?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteUserUrl = `${process.env.REACT_APP_API_URL}User/DeleteUser?userAutoId=${userAutoId}&isActive=${0}`;





                fetch(deleteUserUrl, {
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
              <Modal.Title className='mdl-title'>Activate User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this User?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteUserUrl = `${process.env.REACT_APP_API_URL}User/DeleteUser?userAutoId=${activeID}&isActive=${1}`;

                fetch(deleteUserUrl, {
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
              <Modal.Title className='mdl-title'>De-activate User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this User?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteUserUrl = `${process.env.REACT_APP_API_URL}User/DeleteUser?userAutoId=${activeID}&isActive=${0}`;

                fetch(deleteUserUrl, {
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






                    //   let resp = res.text()
                    //   resp.then((r) => {
                    //     console.log(r);
                    //     if (res.status == 200) {
                    //       Swal.fire({
                    //         icon: "success",
                    //         title: "De-activated successfully!"
                    //       })
                    //       handleCloseIsActive1()
                    //       fetchdata()

                    //     }
                    //     else {
                    //       Swal.fire({
                    //         icon: "warning",
                    //         title: "Something went wrong!"
                    //       })

                    //     }
                    //   })
                  })

              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>






          {/* -------------------------------------------------------------Additional Rights--------------------------------------------------------- */}


          <Modal show={showAR} onHide={handleCloseAR} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>

              <div className='d-flex w-100 justify-content-between align-items-center'><p className='m-0 mdl-title'>Add Additional Rights</p><span><IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                e.preventDefault();


                const Url = `${process.env.REACT_APP_API_URL}UAddRights/UpsertUAddRights`;

                let n = {
                  ...AdditionalRights,
                  plCode: AdditionalRights?.plCode?.map(i => i.value)?.toString()
                }




                const division = n.divisionCode;
                if (!division) {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }
                const productLine = n.plCode;
                if (!productLine) {
                  Swal.fire({
                    icon: "error",
                    title: "Product Line is required"
                  });
                  return;
                }

                const branch = n.branchCode;
                if (!branch) {
                  Swal.fire({
                    icon: "error",
                    title: "Branch is required"
                  });
                  return;
                }






                fetch(Url, {
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

                      if (res.status == 200 && r != "UADDRIGHTSEXISTS") {
                        Swal.fire({
                          icon: 'success',
                          title: "Added Successfully!"
                        })

                        fetchAR()

                        setAdditionalRights({
                          uAddAutoId: 0,
                          userCode: "",
                          divisionCode: "",
                          plCode: [],
                          branchCode: "",
                          isActive: true,
                        })
                        // handleCloseAR()
                      }
                      else if (res.status == 200 && r == "UADDRIGHTSEXISTS") {
                        Swal.fire({
                          icon: 'warning',
                          title: "Already exists!"
                        })
                      }
                      else {
                        Swal.fire({
                          icon: 'error',
                          title: "Something went wrong!"
                        })
                      }
                    })
                  })

















                console.log(AdditionalRights);







              }} /></span></div>

            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Division<span className='req-t'>*</span></Form.Label>
                    <Form.Select
                      name='divisionCode'
                      value={AdditionalRights?.divisionCode}
                      onChange={(e) => {
                        console.log(e.target.value, "---------------------ccccccccccc")
                        // if (e.target.value == 0) {
                        //   setallproductLines([])
                        //   setAdditionalRights((pre) => {
                        //     return {
                        //       ...pre,
                        //       plCode: []

                        //     }
                        //   })
                        // }
                        setallARproductLines([]);
                        setAdditionalRights((pre) => {
                          return {
                            ...pre,
                            divisionCode: e.target.value,
                            plCode: []

                          }
                        })
                        // let divisionCodes = result?.divisionCodeList?.map(item => item?.parameterTypeId).toString();
                        let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value ? e.target.value : 0}`;


                        fetch(getAllProductLines1, {
                          headers: {
                            "Authorization": `Bearer ${token}`
                          }
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            console.log(result);
                            let prodARLines = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));
                            setallARproductLines(prodARLines)
                          })
                      }}
                    >
                      <option value="">Select Division</option>
                      {allDivs.map((division) => (
                        <option key={division.parameterTypeId} value={division.parameterTypeId}>
                          {division.parameterType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className='' md={4}>
                  <Form.Group>
                    <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                    <MultiSelect
                      options={allARproductLines}
                      value={AdditionalRights.plCode}
                      onChange={function noRefCheck(e) {
                        console.log(e);
                        setAdditionalRights((pre) => {
                          return {
                            ...pre,
                            plCode: e
                          };
                        });
                      }}
                      labelledBy={"Select"}
                      isCreatable={true}
                      valueRenderer={customValueRenderer} 
                      // optionContainer={
                      //   z-index:'2 !important'
                      // }
                      // style={{ Zindex: '#005aab' }}
                      className='dropdown-container'
                      // style={{
                      //   zIndex: '2' 
                      // }}

                     
                      />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Branch <span className='req-t'>*</span></Form.Label>
                    <Form.Select name='branchName' value={AdditionalRights?.branchCode} onChange={(e) => {
                      setAdditionalRights((pre) => {
                        return {
                          ...pre,
                          branchCode: e.target.value
                        }
                      })
                    }}>
                      <option value="">Select</option>

                      {
                        branches?.map((branch, index) => {
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


              <MaterialReactTable
                columns={columnsAR}
                data={ARrights}
                initialState={{ showColumnFilters: false }} //show filters by default

                // enableExpandAll="false"
                // muiDetailPanelProps={() => ({
                //   sx: (theme) => ({
                //     backgroundColor:
                //       theme.palette.mode === 'dark'
                //         ? 'rgba(255,210,244,0.1)'
                //         : 'rgba(0,0,0,0.1)',
                //   }),
                // })}


                // initialState={{ showColumnFilters: false }} //show filters by default

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
                //               console.log(cell.row.original.userId);
                //               setuserID(cell.row.original.userId)
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
                //               setuserID(cell.row.original.userId)
                //               setisActive(cell.row.original.userAutoId)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}

                muiExpandButtonProps={({ row, table }) => ({
                  onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
                  sx: {
                    transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s',
                  },
                })}
                enableExpandAll={false}


                // manualPagination={true}
                // muiToolbarAlertBannerProps={isError
                //   ? {
                //     color: 'error',
                //     children: 'Error loading data',
                //   }
                //   : undefined}
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
                          handleExportRows(table.getPrePaginationRowModel().rows)
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





              />
            </Modal.Body>

          </Modal>





          {/* ----------------------------------Active AR--------------------------------------- */}



          <Modal show={showIsActiveAR} onHide={handleCloseIsActiveAR} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate User Access Rights</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this User Access Rights?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActiveAR}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteUserUrl = `${process.env.REACT_APP_API_URL}UAddRights/DeleteUAddRights?UAddAutoId=${activeIDAR}&isActive=${1}`;

                fetch(deleteUserUrl, {
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
                        handleCloseIsActiveAR()
                        fetchAR()

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

          {/* ----------------------------------InActive AR--------------------------------------- */}



          <Modal show={showIsActive1AR} onHide={handleCloseIsActive1AR} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>De-activate User Access Rights</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this User Access Rights?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1AR}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteUserUrl = `${process.env.REACT_APP_API_URL}UAddRights/DeleteUAddRights?UAddAutoId=${activeIDAR}&isActive=${0}`;

                fetch(deleteUserUrl, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                })
                  .then((res) => {

                    let retResult = handleResponse(res);
                    if (retResult) {
                      handleCloseIsActive1AR()
                      fetchAR()

                    }






                    //   let resp = res.text()
                    //   resp.then((r) => {
                    //     console.log(r);
                    //     if (res.status == 200) {
                    //       Swal.fire({
                    //         icon: "success",
                    //         title: "De-activated successfully!"
                    //       })
                    //       handleCloseIsActive1()
                    //       fetchdata()

                    //     }
                    //     else {
                    //       Swal.fire({
                    //         icon: "warning",
                    //         title: "Something went wrong!"
                    //       })

                    //     }
                    //   })
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

export default UserMaster