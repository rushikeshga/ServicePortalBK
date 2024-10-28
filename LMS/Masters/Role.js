import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal, Accordion } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { IoSave } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";




import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { handleResponse } from '../../../Components/Generic/utility';
import Loader from '../../loader';

function Role() {
  const [activeKey, setActiveKey] = useState("0");
  const [activeKey1, setActiveKey1] = useState("0");
  const [loading, setLoading] = useState(false);

  const [show, setShow] =
    useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reportingTo, setReportingTo] = useState('');
  const [rightType, setRightType] = useState('');

  const handleShow = () => {
    setShow(true)
    GetUserType()

  };
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);

  const [RoleCode, setRoleCode] = useState("")





  let token = localStorage.getItem("UserToken");


  let RoleCodeUser = localStorage.getItem("RoleName");



  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));
  // console.log("---------permission",Permissions);


  const [data, setData] = useState([])

  const [roleID, setroleID] = useState("");

  const [isActive, setisActive] = useState("")

  const GetAllRolesUrl = `${process.env.REACT_APP_API_URL}Role/GetAllRoles`;







  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(

        `${process.env.REACT_APP_API_URL}Role/GetAllRoles`,

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
        setData(json);
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
  const GetUserType = () => {
    const GetAllUserTypesUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=UserType`;


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

  const [activeID, setactiveID] = useState(0)
  // let idActive=0;
  const columns = useMemo(
    () => [

      /* {
         accessorKey: "isActive",
         header: "Active",
         size: "20",
         Cell: ({ cell }) => {
           let data = cell.getValue()
           // console.log(cell.row.original);
           return (
             <>
               <Box sx={{ display: "flex", gap: "1rem" }}>
                 {
                   cell.row.original.isActive == false ? "" :
                     <Tooltip arrow placement="left" title="Edit">
                       <IconButton
                         className="edit-btn"
                         onClick={() => {
                           console.log(cell.row.original.roleId);
                           setroleID(cell.row.original.roleId)
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
                           setroleID(cell.row.original.roleId)
                           setisActive(cell.row.original.isActive)
                           handleShowDel()
                         }}
 
 
                       >
                         <HiOutlineTrash color='red' />
                       </IconButton>
                     </Tooltip>
                 }
 
               </Box>
               <Switch checked={data === true} onClick={(e) => {
                 console.log(cell.row.original?.roleId);
                 setactiveID(cell.row.original?.roleId)
                 cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
               }} />
             </>
           )
         }
       },*/
      {
        accessorKey: "userTypeName",
        header: "User Type",

      },
      {
        accessorKey: "roleName",
        header: "Role Name",
      },
      {
        accessorKey: "isMultipleBranch",
        header: "Multiple Branch",
        Cell: ({ cell }) => (
          <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        ),
      },
      {
        accessorKey: "isMultipleDivision",
        header: "Multiple Division",
        Cell: ({ cell }) => (
          <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        ),
      },
      // {
      //   accessorKey: "roleDesc",
      //   header: "Role Desc",
      // },
      // {
      //   accessorKey: "ReportingTo",
      //   header: "Reporting To",
      // },
      // {
      //   accessorKey: "RightTypeId",
      //   header: "Right Type",
      // },
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

          return (
            <>
              <Box sx={{ display: "flex", alignItems: 'center', gap: "0.5rem" }}>
                {
                  cell.row.original.isActive == false ? "" :
                    Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
                      <IconButton
                        className="edit-btn"

                        onClick={() => {
                          console.log(cell.row.original.roleId);
                          setroleID(cell.row.original.roleId)
                          setRoleCode(cell.row.original?.roleCode)
                          handleShow1()
                          GetUserType()
                        }}

                      >
                        <FaRegEdit color='#005bab' />
                      </IconButton>
                    </Tooltip> : ""
                }

                {
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    Permissions?.isDelete ? <Tooltip arrow placement="right" title="In Active">
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.roleId);
                        setactiveID(cell.row.original.roleId);
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
                        console.log(cell.row.original.roleId);
                        setactiveID(cell.row.original.roleId);
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
                  console.log(cell.row.original?.roleId);
                  setactiveID(cell.row.original?.roleId)
                  cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
                }} /> */}



              </Box>

            </>
          )
        }
      }


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
















  const fetchAllRoles = () => {
    fetch(GetAllRolesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result)
      })
  }



  // useEffect(()=>{
  // fetchAllRoles();
  // },[])


  const [role, setrole] = useState({
    roleId: 0,
    roleName: "",
    roleDesc: "",
    // roleCode:"",
    IsDeviation:false,
    reportingTo: 0,
    isActive: true,
    rightTypeId: 0,
    IsMultipleDivision: false,
    IsMultipleBranch: false,
    UserTypeId: 0,

  })


  const handleChange = (e) => {
    const newdata = { ...role };
    newdata[e.target.name] = e.target.value;
    setrole(newdata);
    console.log(newdata);
  }
  const [editRole, setEditRole] = useState({
    roleId: 0,
    roleName: "",
    roleDesc: "",
    roleCode: "",
    IsDeviation:false,
    reportingTo: 0,
    isActive: true,
    rightTypeId: 0,
    IsMultipleDivision: false,
    IsMultipleBranch: false,
    UserTypeId: 0,
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editRole };
    newdata[e.target.name] = e.target.value;
    setEditRole(newdata);
    console.log(newdata);
  }

  const GetRoleByIdUrl = `${process.env.REACT_APP_API_URL}Role/GetRoleById?roleId=${roleID}`;




  const [selectedMenus, setselectedMenus] = useState([])






  const fetchRoleById = () => {
    fetch(GetRoleByIdUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setEditRole((pre) => {
          return {
            ...pre,
            roleId: result?.roleId,
            roleCode: result?.roleCode,
            roleName: result?.roleName,
            roleDesc: result?.roleDesc,
            UserTypeId: result?.userTypeId,
            IsMultipleBranch: result?.isMultipleBranch,
            IsMultipleDivision: result?.isMultipleDivision,
            IsDeviation:result?.isDeviation
          }
        })




        fetch(`${process.env.REACT_APP_API_URL}RoleWiseMenu/GetRoleWiseMenuSelect?roleCode=${result?.roleCode}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setselectedMenus(result)
          })
      })
  }

  useEffect(() => {
    if (roleID) {

      fetchRoleById()
    }
  }, [roleID])


  const handleClose1 = () => {
    setShow1(false);
    fetch(GetRoleByIdUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, '-----------------');
        setEditRole((pre) => {
          return {
            ...pre,
            roleId: result?.roleId,
            roleCode: result?.roleCode,
            roleName: result?.roleName,
            roleDesc: result?.roleDesc,
            UserTypeId: result?.userTypeId,
            IsMultipleBranch: result?.isMultipleBranch,
            IsMultipleDivision: result?.isMultipleDivision,
            IsDeviation:result?.isDeviation
          }
        })
      })

  }



  const handleClose = () => {
    setActiveKey('0')
    setShow(false)
    setrole({
      roleId: 0,
      roleName: "",
      roleDesc: "",
      // roleCode:"",
      reportingTo: 0,
      isActive: true,
      rightTypeId: 0,
      IsMultipleDivision: false,
      IsMultipleBranch: false,
      UserTypeId: 0,

    })


  };





  const [UserTypes, setUserTypes] = useState([]);





















  const [GetAllMenu, setGetAllMenu] = useState([])


  const [dashboardMenu, setdashboardMenu] = useState([])

  const [ParentMenu, setParentMenu] = useState([])

  const [LMSMenu, setLMSMenu] = useState([])


  const [Securitymenu, setSecuritymenu] = useState([])


  const [MastersMenu, setMastersMenu] = useState([])


  const [ReportsMenu, setReportsMenu] = useState([])



  useEffect(() => {
    const getMenuUrl = `${process.env.REACT_APP_API_URL}RoleWiseMenu/GetRoleWiseMenu?roleCode=${RoleCode}`;

    if (RoleCode) {

      fetch(getMenuUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setGetAllMenu(result)

          // setParentMenu(result?.filter((parent) => parent.parentId === 0))

          // setdashboardMenu(result?.filter((dashboard) => dashboard.menuId === 9))

          // setLMSMenu(result?.filter((lms) => lms.parentId === 10))

          // setSecuritymenu(result?.filter((security) => security.parentId === 13))

          // setMastersMenu(result?.filter((masters) => masters.parentId === 17))

          // setReportsMenu(result?.filter((report) => report.parentId === 32))

        })
    }

  }, [RoleCode])







  const [menuStates, setMenuStates] = useState([]);

  const handleMenuCheckboxChange = (menuId, isChecked) => {
    if (isChecked) {
      // If the checkbox is checked, add the corresponding menu to the state
      const menuToAdd = GetAllMenu.find(menu => menu.menuId === menuId);
      setMenuStates(prevStates => [...prevStates, { ...menuToAdd }]);
    } else {
      // If the checkbox is unchecked, remove the corresponding menu from the state
      setMenuStates(prevStates => prevStates.filter(menu => menu.menuId !== menuId));
    }
  };





  const handleSelectAllChange = (menuId, isChecked) => {
    setMenuStates(prevStates =>
      prevStates.map(menu => {
        if (menu.menuId === menuId) {
          return {
            ...menu,
            isAdd: isChecked,
            isEdit: isChecked,
            isDelete: isChecked,
            isView: isChecked,
            isDownload: isChecked,
            isUpload: isChecked,
            isApproved: isChecked
          };
        }
        return menu;
      })
    );
  };







  // ---------------------------------------------------------




  const handleMenuCheckboxChangeEdit = (menuId, isChecked) => {
    if (isChecked) {
      // If the checkbox is checked, add the corresponding menu to the state
      const menuToAdd = GetAllMenu.find(menu => menu.menuId === menuId);
      setselectedMenus(prevStates => [...prevStates, { ...menuToAdd }]);
    } else {
      // If the checkbox is unchecked, remove the corresponding menu from the state
      setselectedMenus(prevStates => prevStates.filter(menu => menu.menuId !== menuId));
    }
  };





  const handleSelectAllChangeEdit = (menuId, isChecked) => {
    setselectedMenus(prevStates =>
      prevStates.map(menu => {
        if (menu.menuId === menuId) {
          return {
            ...menu,
            isAdd: isChecked,
            isEdit: isChecked,
            isDelete: isChecked,
            isView: isChecked,
            isDownload: isChecked,
            isUpload: isChecked,
            isApproved: isChecked
          };
        }
        return menu;
      })
    );
  };




  // Logging menuStates whenever it changes
  console.log('Menu States:', menuStates);




  console.log('Edit Menus:', selectedMenus);






  useEffect(() => {
    // const MenuGeyUrl=`${process.env.REACT_APP_API_URL}RoleWiseMenu/GetRoleWiseMenuByUser?roleCode=${}`
  }, [])

  const customHeaders = {
    userTypeName: 'User Type',
    roleName: 'Role Name',
    isMultipleDivision: 'Multiple Division',
    isMultipleBranch: 'Multiple Branch',
  }
  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>
            <p className='pg-label m-0'>Role Master</p>
            {Permissions?.isAdd ? <Row className='text-end '><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Role</Button></Col></Row> : ""}

          </div>
          <hr />





          {/* <Row
            style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3"
          >
    <Col md={2}>
      <Form.Group>
        <Form.Label>User Type</Form.Label>
        <Form.Select>
          <option value="">Select</option>
          
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group>
        <Form.Label>Role Name</Form.Label>
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
    </Col>
            <Col md={2}>
              <div className="pt-2">
                <Button
                  variant=""
                  className="add-Btn mt-3"
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
                  className="m-2 mt-4"
                  style={{
                    backgroundColor: "#005bab",
                    color: "white",
                    height: "fit-content",
                  }}
                  onClick={() => {
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
          </Row> */}











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

                // renderRowActions={({ cell, row, table }) => (

                //   <Box sx={{ display: "flex", gap: "1rem" }}>
                //     {
                //       cell.row.original.isActive == false ? "" :
                //         <Tooltip arrow placement="left" title="Edit">
                //           <IconButton
                //             className="edit-btn"
                //             onClick={() => {
                //               console.log(cell.row.original.roleId);
                //               setroleID(cell.row.original.roleId)
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
                //               setroleID(cell.row.original.roleId)
                //               setisActive(cell.row.original.isActive)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}




                // initialState= { showColumnFilters: true }
                // manualFiltering: true,
                // manualPagination=true
                // manualSorting: true,
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
                              "roleId",
                              "roleDesc",
                              "roleCode",
                              "reportingTo",
                              "isActive",
                              "rightTypeId",
                              "userTypeId",
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





              />

              : ""
          }
          {/* <MaterialReactTable table={table} /> */}




          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>



              <Accordion activeKey={activeKey}>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>Role Information</p><span> <IoSave color='#7bc143' fontSize={20}
                      onClick={(e) => {
                        e.preventDefault();
                        const addRoleUrl = `${process.env.REACT_APP_API_URL}Role/UpsertRole`;

                        // Validate role name field
                        const userTypeCode = role.UserTypeId;
                        if (!userTypeCode) {
                          Swal.fire({
                            icon: "error",
                            title: "Please select the userType"
                          });
                          return;
                        }

                        const roleName = role.roleName;
                        const roleNameRegex = /^[a-zA-Z0-9\s]+$/;
                        if (!roleName) {
                          Swal.fire({
                            icon: "error",
                            title: "Role name is required!"
                          });
                          return;
                        } else if (!roleNameRegex.test(roleName)) {
                          Swal.fire({
                            icon: "error",
                            title: "Role name should contain only alphanumeric characters!"
                          });
                          return;
                        }




                        // Proceed with the form submission if no errors
                        setLoading(true)
                        fetch(addRoleUrl, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                          },
                          body: JSON.stringify(role)
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
                              else {
                                setRoleCode(r)
                                if (res.status == 200 && r != "REXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  })
                                  // handleClose()
                                  fetchAllRoles()
                                  setActiveKey("1")
                                  setLoading(false)
                                  document.getElementById("roleForm").reset();

                                }
                                else if (res.status == 200 && r == "REXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Role already exists!"
                                  })
                                  setLoading(false)


                                }
                              }






                            })
                          })
                      }}
                    />
                    </span>

                  </div></Accordion.Header>
                  <Accordion.Body>
                    <Form id='roleForm'>
                      {
                        loading ? (<Loader />) : (

                          < Row >
                            <Col>

                              <Form.Group>
                                <Form.Label>User Type <span className='req-t'>*</span></Form.Label>
                                <Form.Select

                                  name='UserTypeId'
                                  onChange={handleChange}
                                  placeholder=''
                                >
                                  <option>Select</option>
                                  {
                                    UserTypes?.map((userlist, index) => {
                                      return (
                                        <>
                                          <option value={userlist?.parameterCode}>{userlist?.parameterText}</option>

                                        </>
                                      )
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className=''>
                                <Form.Label>Role Name <span className='req-t'>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name='roleName'
                                  onChange={handleChange}

                                  placeholder=''
                                />
                              </Form.Group>
                            </Col>


                           



                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'
                                name='IsMultipleBranch'
                                onChange={(e) => {
                                  setrole((pre) => {
                                    return {
                                      ...pre,
                                      IsMultipleBranch: e.target.checked
                                    }
                                  })
                                }}

                                label="Is Multiple Branch?"
                              />
                            </Col>
                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'
                                name='IsMultipleDivision'
                                onChange={(e) => {
                                  setrole((pre) => {
                                    return {
                                      ...pre,
                                      IsMultipleDivision: e.target.checked
                                    }
                                  })
                                }}

                                label="Is Multiple Division?"
                              />



                            </Col>


                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'
                                name='IsDeviation'
                                onChange={(e) => {
                                  setrole((pre) => {
                                    return {
                                      ...pre,
                                      IsDeviation: e.target.checked
                                    }
                                  })
                                }}

                                label="Is Deviation?"
                              />



                            </Col>
                          </Row>
                        )
                      }



                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>Role Menu Mapping</p><span> <IoSave color='#7bc143' fontSize={20}
                      onClick={(e) => {
                        // setActiveKey("0")

                        const MenuMappingUrl = `${process.env.REACT_APP_API_URL}RoleWiseMenu/AddRoleWiseMenu?roleCode=${RoleCode}`;


                        fetch(MenuMappingUrl, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                          },
                          body: JSON.stringify(menuStates)
                        })
                          .then((res) => {
                            let resp = res.text()
                            resp.then((r) => {
                              console.log(r);

                              if (res.status == 200) {
                                Swal.fire({
                                  icon: "success",
                                  title: "Saved successfully!"
                                })
                                handleClose()
                                fetchAllRoles()
                                setActiveKey("0")


                                setMenuStates([])


                              }
                              else if (res.status == 200) {
                                Swal.fire({
                                  icon: "warning",
                                  title: r
                                })

                              }
                            })
                          })

                      }}
                    />
                    </span>

                  </div></Accordion.Header>
                  <Accordion.Body>
                    <div className="">
                      {
                        GetAllMenu.filter(menu => menu.parentId === 0 || menu.parentId === 1)?.map((parent, index) => {
                          return (
                            <>
                              <div className='d-block'>
                                <Accordion>
                                  <Accordion.Item eventKey={index}>
                                    <Accordion.Header>  {parent?.menuText}</Accordion.Header>
                                    <Accordion.Body>


                                      <div className='d-block'>
                                        {GetAllMenu.filter(menu => GetAllMenu.some(item => menu.parentId === (item.menuId && parent.menuId))).map(menu => (
                                          <div key={menu.menuId} className='d-flex justify-content-between'>
                                            <label className='mt-2'>
                                              <input
                                                type="checkbox"
                                                checked={menuStates.some(item => item.menuId === menu.menuId)}
                                                onChange={e => handleMenuCheckboxChange(menu.menuId, e.target.checked)}
                                              />
                                              <span className='px-2'>{menu.menuText}</span>
                                            </label>
                                            {menuStates.some(item => item.menuId === menu.menuId) && (
                                              <div className='mt-2'>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isAdd && menuStates.find(item => item.menuId === menu.menuId)?.isEdit && menuStates.find(item => item.menuId === menu.menuId)?.isDelete && menuStates.find(item => item.menuId === menu.menuId)?.isView && menuStates.find(item => item.menuId === menu.menuId)?.isDownload && menuStates.find(item => item.menuId === menu.menuId)?.isUpload && menuStates.find(item => item.menuId === menu.menuId)?.isApproved || false}
                                                    onChange={e => handleSelectAllChange(menu.menuId, e.target.checked)}
                                                  />
                                                  <span className='mx-2'>Select All</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isAdd || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isAdd: !item.isAdd };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Add</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isEdit || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isEdit: !item.isEdit };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Edit</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isDelete || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isDelete: !item.isDelete };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Delete</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isView || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isView: !item.isView };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>View</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isDownload || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isDownload: !item.isDownload };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Download</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isUpload || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isUpload: !item.isUpload };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Upload</span>
                                                </label>
                                                <label className='mx-2'>
                                                  <input
                                                    type="checkbox"
                                                    checked={menuStates.find(item => item.menuId === menu.menuId)?.isApproved || false}
                                                    onChange={() => setMenuStates(prevStates => prevStates.map(item => {
                                                      if (item.menuId === menu.menuId) {
                                                        return { ...item, isApproved: !item.isApproved };
                                                      }
                                                      return item;
                                                    }))}
                                                  />
                                                  <span className='px-2'>Approved</span>
                                                </label>
                                              </div>
                                            )}
                                          </div>
                                        ))

                                        }
                                      </div>
                                    </Accordion.Body>

                                  </Accordion.Item>
                                </Accordion>
                              </div>

                            </>
                          )
                        })
                      }
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>


            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn'
             
              >

                Save
              </Button>


            </Modal.Footer> */}
          </Modal>











          {/* --------------------------------------------------------Edit------------------------------------------------------------------------ */}

          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit New Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>






              <Accordion defaultActiveKey={'0'}>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>Role Information</p><span> <IoSave color='#7bc143' fontSize={20}
                      onClick={(e) => {
                        e.preventDefault();

                        const editRoleUrl = `${process.env.REACT_APP_API_URL}Role/UpsertRole`;






                        const userTypeCode = editRole.UserTypeId;
                        if (!userTypeCode) {
                          Swal.fire({
                            icon: "error",
                            title: "please select the userType"
                          });
                          return;
                        }

                        const roleName = editRole.roleName;
                        const roleNameRegex = /^[a-zA-Z0-9\s]+$/;
                        if (!roleName) {
                          Swal.fire({
                            icon: "error",
                            title: "Role name is required!"
                          });
                          return;
                        } else if (!roleNameRegex.test(roleName)) {
                          Swal.fire({
                            icon: "error",
                            title: "Role name should contain only alphanumeric characters!"
                          });
                          return;
                        }




                        setLoading(true)
                        fetch(editRoleUrl, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                          },
                          body: JSON.stringify(editRole)
                        })
                          .then((res) => {
                            let resp = res.text()
                            resp.then((r) => {
                              console.log(r);
                              if (res.status == 200 && r != "REXISTS") {
                                Swal.fire({
                                  icon: "success",
                                  title: "Updated successfully!"
                                })
                                handleClose1()
                                fetchAllRoles()
                                setLoading(false)

                              }
                              else if (res.status == 200 && r == "REXISTS") {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Role already exists!"
                                })
                                setLoading(false)
                              }

                            })

                            // setActiveKey1("1")
                          })

                      }}
                    />
                    </span>

                  </div></Accordion.Header>
                  <Accordion.Body>
                    <Form id='roleForm'>
                      {
                        loading ? (<Loader />) : (

                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Label>User Type <span className='req-t'>*</span></Form.Label>
                                <Form.Select

                                  name='UserTypeId'
                                  value={editRole?.UserTypeId}
                                  onChange={handleChangeEdit}
                                  placeholder=''
                                  disabled
                                >
                                  <option>Select</option>
                                  {
                                    UserTypes?.map((userlist, index) => {
                                      return (
                                        <>
                                          <option value={userlist?.parameterCode}>{userlist?.parameterText}</option>

                                        </>
                                      )
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <Form.Label>Role Name <span className='req-t'>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name='roleName'
                                  value={editRole?.roleName}
                                  readOnly
                                  onChange={handleChangeEdit}

                                  placeholder=''
                                />
                              </Form.Group>
                            </Col>
                            {/* <Form.Group className='mt-3'>
                    <Form.Label>Role Description <span className='req-t'>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name='roleDesc'
                      onChange={handleChange}
                      placeholder=''
                    />
                  </Form.Group> */}


                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'

                                name='IsMultipleBranch'
                                onChange={(e) => {
                                  setEditRole((pre) => {
                                    return {
                                      ...pre,
                                      IsMultipleBranch: e.target.checked
                                    }
                                  })
                                }}
                                checked={editRole?.IsMultipleBranch === true}
                                label="Is Multiple Branch?"
                              />
                            </Col>
                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'

                                name='IsMultipleDivision'
                                onChange={(e) => {
                                  setEditRole((pre) => {
                                    return {
                                      ...pre,
                                      IsMultipleDivision: e.target.checked
                                    }
                                  })
                                }}
                                checked={editRole?.IsMultipleDivision === true}

                                label="Is Multiple Division?"
                              />


                              {/* <Form.Group className='mt-3'>
                    <Form.Label>Reporting To</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Select</option>
                      <option value="1">EIC 1</option>
                      <option value="2">ASC 1</option>
                      <option value="3">ASC 2</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Right Type</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Select</option>
                      <option>Company</option>
                      <option>Service Contractor</option>

                    </Form.Select>
                  </Form.Group> */}



                  
                            </Col>


                            <Col className='pt-3'>
                              <Form.Check
                                type="checkbox"
                                className='mt-3'
                                name='IsDeviation'
                                checked={editRole?.IsDeviation === true}
                                onChange={(e) => {
                                  setEditRole((pre) => {
                                    return {
                                      ...pre,
                                      IsDeviation: e.target.checked
                                    }
                                  })
                                }}

                                label="Is Deviation?"
                              />



                            </Col>
                          </Row>
                        )}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header><div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>Role Menu Mapping</p><span> <IoSave color='#7bc143' fontSize={20}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        // setActiveKey("0")

                        const MenuMappingUrl = `${process.env.REACT_APP_API_URL}RoleWiseMenu/AddRoleWiseMenu?roleCode=${editRole?.roleCode}`;



                        fetch(MenuMappingUrl, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                          },
                          body: JSON.stringify(selectedMenus)
                        })
                          .then((res) => {
                            let resp = res.text()
                            resp.then((r) => {
                              console.log(r);


                              // let regextest = /^[a-zA-Z0-9]+$/;
                              // if (!r.match(regextest)) {
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
                              // }
                              if (res.status == 200) {
                                Swal.fire({
                                  icon: "success",
                                  title: "Updated successfully!"
                                })
                                handleClose1()
                                fetchAllRoles()
                                // setActiveKey("1")


                                // setselectedMenus([])


                              }
                              else if (res.status == 200) {
                                Swal.fire({
                                  icon: "warning",
                                  title: r
                                })

                              }
                            })
                          })

                      }}
                    />
                    </span>

                  </div></Accordion.Header>
                  <Accordion.Body>
                    <div className="">
                      {
                        GetAllMenu.filter(menu => menu.parentId === 0 || menu.parentId === 1)?.map((parent, index) => {
                          return (
                            <>
                              <div className='d-block'>
                                <Accordion>
                                  <Accordion.Item eventKey={index}>
                                    <Accordion.Header>  {parent?.menuText}</Accordion.Header>
                                    <Accordion.Body>


                                      <div className='d-block'>
                                        {
                                          GetAllMenu.filter(menu => GetAllMenu.some(item => menu.parentId === (item.menuId && parent.menuId))).map(menu => (
                                            <div key={menu.menuId} className='d-flex justify-content-between'>
                                              <label className='mt-2'>
                                                <input
                                                  type="checkbox"
                                                  checked={selectedMenus.some(item => item.menuId === menu.menuId)}
                                                  onChange={e => handleMenuCheckboxChangeEdit(menu.menuId, e.target.checked)}
                                                />
                                                <span className='px-2'>{menu.menuText}</span>
                                              </label>
                                              {selectedMenus.some(item => item.menuId === menu.menuId) && (
                                                <div className='mt-2'>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isAdd && selectedMenus.find(item => item.menuId === menu.menuId)?.isEdit && selectedMenus.find(item => item.menuId === menu.menuId)?.isDelete && selectedMenus.find(item => item.menuId === menu.menuId)?.isView && selectedMenus.find(item => item.menuId === menu.menuId)?.isDownload && selectedMenus.find(item => item.menuId === menu.menuId)?.isUpload && selectedMenus.find(item => item.menuId === menu.menuId)?.isApproved || false}
                                                      onChange={e => handleSelectAllChangeEdit(menu.menuId, e.target.checked)}
                                                    />
                                                    <span className='mx-2'>Select All</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isAdd || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isAdd: !item.isAdd };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Add</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isEdit || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isEdit: !item.isEdit };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Edit</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isDelete || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isDelete: !item.isDelete };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Delete</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isView || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isView: !item.isView };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>View</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isDownload || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isDownload: !item.isDownload };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Download</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isUpload || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isUpload: !item.isUpload };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Upload</span>
                                                  </label>
                                                  <label className='mx-2'>
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedMenus.find(item => item.menuId === menu.menuId)?.isApproved || false}
                                                      onChange={() => setselectedMenus(prevStates => prevStates.map(item => {
                                                        if (item.menuId === menu.menuId) {
                                                          return { ...item, isApproved: !item.isApproved };
                                                        }
                                                        return item;
                                                      }))}
                                                    />
                                                    <span className='px-2'>Approved</span>
                                                  </label>
                                                </div>
                                              )}
                                            </div>
                                          ))

                                        }
                                      </div>
                                    </Accordion.Body>

                                  </Accordion.Item>
                                </Accordion>
                              </div>

                            </>
                          )
                        })
                      }
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose1}>
                Close
              </Button>
              <Button variant="" className='add-Btn' 
              
           
              >
                Update
              </Button>
            </Modal.Footer> */}
          </Modal>



          {/* ---------------------delete--------- */}


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this role?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteRoleUrl = `${process.env.REACT_APP_API_URL}Role/DeleteRole?roleId=${roleID}&isActive=${0}`;


                fetch(deleteRoleUrl, {
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
                          title: "Delted successfully!"
                        })
                        handleCloseDel()
                        fetchAllRoles()
                      }
                      else {
                        Swal.fire({
                          icon: "warning",
                          title: "Something went wrong!"
                        })

                      }
                      // else if (res.status == 200 && r == "DPEXISTS") {
                      //   Swal.fire({
                      //     icon: "warning",
                      //     title: "Role do not deactivet !"
                      //   })

                      // }
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
              <Modal.Title className='mdl-title'>Activate Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Role?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteRoleUrl = `${process.env.REACT_APP_API_URL}Role/DeleteRole?roleId=${activeID}&isActive=${1}`;





                fetch(deleteRoleUrl, {
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
                        fetchAllRoles()

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
              <Modal.Title className='mdl-title'>De-activate Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Role?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteRoleUrl = `${process.env.REACT_APP_API_URL}Role/DeleteRole?roleId=${activeID}&isActive=${0}`;





                fetch(deleteRoleUrl, {
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
                      fetchAllRoles()
                    }
                    /* let resp = res.text()
                     resp.then((r) => {
                       console.log(r);
                       if (res.status == 200 && r != "DPEXISTS") {
                         Swal.fire({
                           icon: "success",
                           title: "De-activated successfully!"
                         })
                         handleCloseIsActive1()
                         fetchAllRoles()
   
                       }
                       else if (res.status == 200 && r == "DPEXISTS") {
                         Swal.fire({
                           icon: "warning",
                           title: "You are not authorized to de-activate this record, some transaction records are still exists"
                         })
                         handleCloseIsActive1()
                         fetchAllRoles() 
                       }
                     })*/
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

export default Role