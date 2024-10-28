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
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";


import Select from 'react-select';


import { Box, IconButton, Switch, Tooltip, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { MultiSelect } from 'react-multi-select-component';
import Loader from '../../loader';
function Technician() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleShow = () => setShow(true);







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
  const [productLine, setAllproductLine] = useState([]);

  let token = localStorage.getItem("UserToken")



  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));


  const [addTechnician, setaddTechnician] = useState({
    technicianId: 0,
    technicianName: "",
    ascCode: "",
    mobile: "",
    technicianEmail: "",
    divisionCode: [],
    productLineCode: [],
    productGroupCode: '',
    productGroupName: '',
    skillId: [],
    isActive: true,
    phoneNo: ""
  })







  const handleChange = (e) => {
    const newdata = { ...addTechnician };
    newdata[e.target.name] = e.target.value;
    setaddTechnician(newdata);
    console.log(newdata);
  }




  const [editTechnician, seteditTechnician] = useState({
    technicianId: 0,
    technicianName: "",
    ascCode: "",
    mobile: "",
    technicianEmail: "",
    divisionCode: [],
    productLineCode: [],
    productGroupCode: [],
    skillId: [],
    isActive: true,
    phoneNo: ""
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editTechnician };
    newdata[e.target.name] = e.target.value;
    seteditTechnician(newdata);
    console.log(newdata);
  }

  const [data, setdata] = useState([]);
  const fetchAllTechnicians = () => {
    const getAllTechnicians = `${process.env.REACT_APP_API_URL}Technician/GetAllTechnician`;

    fetch(getAllTechnicians, {
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
    fetchAllTechnicians()
  }, [])
  const [allDivisions, setallDivisions] = useState([]);
  const [allproductLines, setallproductLines] = useState([])
  const [allProductGroups, setallProductGroups] = useState([])


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
        setallDivisions(result.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })))
      })
  }, [])

  // useEffect(() => {
  //   const getAllProductLine = `${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine`;

  //   fetch(getAllProductLine, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallproductLines(result)
  //     })
  // }, [addTechnician?.divisionCode])
  // useEffect(() => {
  //   const getAllProductGroup = `${process.env.REACT_APP_API_URL}ProductGroup/GetAllProductGroup`;

  //   fetch(getAllProductGroup, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallProductGroups(result)
  //     })
  // }, [])

  const [allSkills, setallSkills] = useState([]);


  const [activeID, setactiveID] = useState(0)


  
  // -----------Pagination------------------------

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [ascFetchname, setAscFetchname] = useState('')
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

      `${process.env.REACT_APP_API_URL}Technician/GetAllTechnician`,

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

  const [filterAscName, setFilterAscName] = useState('')
  const [filterTechName, setFilterTechName] = useState('')

  const [filterPagination, setFilterPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })



  // const fetchFilterPagination = async () => {
  //   if (data && data.length) {
  //     setIsLoading(false);
  //   } else {
  //     setIsRefetching(true);
  //   }

  //   const queryParams = [];
  //   if (filterAscName) {
  //     queryParams.push(`AscCode=${filterAscName}`);
  //   }

  //   if (filterTechName) { queryParams.push(`TechnicianName=${filterTechName}`) };

  //   if (filterPagination) {
  //     queryParams.push(`PageNumber=${filterPagination.pageIndex}`);
  //     queryParams.push(`PageSize=${filterPagination.pageSize}`);
  //   }


  //   console.log(queryParams);
  //   const url = `${process.env.REACT_APP_API_URL}Technician/GetAllTechnician`;
  //   try {
  //     const response = await fetch(`${url}?${queryParams.join("&")}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //     setdata(json);
  //     setRowCount(json[0]?.totalRows);
  //     console.log(json[0]?.totalRows);
  //   } catch (error) {
  //     setIsError(true);
  //     console.error(error);
  //   }
  //   setIsError(false);
  //   setIsLoading(false);
  //   setIsRefetching(false);
  // };

  const fetchFilterPagination = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}Technician/GetAllTechnician`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterAscName) {url.searchParams.set('AscCode',`${filterAscName}`);}
    if (filterTechName) { url.searchParams.set('TechnicianName',`${filterTechName}`) };

    // if (filterUserType) { url.searchParams.set('UserTypeCode', `${filterUserType}`) }
    // if (filterUserRole) { url.searchParams.set('RoleCode', `${filterUserRole}`) }
    // if (filterUserName) { url.searchParams.set('UserName', `${filterUserName}`) }

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

  }, [filterPagination?.pageIndex, filterPagination?.pageSize]);

  const columns = useMemo(
    () => [

      {
        accessorKey: "technicianName",
        header: "Name",
      },
      {
        accessorKey: "ascCode",
        header: "ASC Name",
      },
      {
        accessorKey: "mobile",
        header: "Mobile",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),
      },
      {
        accessorKey: "phoneNo",
        header: "Phone",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),
      },
      {
        accessorKey: "technicianEmail",
        header: "Email",
      },
      {
        accessorKey: "noOfDivision",
        header: "Division",
      },
      {
        accessorKey: "noOfProductLine",
        header: "Product Line",
        // Cell: ({ cell }) => (
        //   <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
        // ),
      },
      {
        accessorKey: "noOfSkill",
        header: "Skills",

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
                          console.log(cell.row.original.technicianId);
                          settechnicianId(cell.row.original.technicianId)
                          handleShow1()


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
                        console.log(cell.row.original.technicianId);
                        setactiveID(cell.row.original.technicianId);
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
                        console.log(cell.row.original.technicianId);
                        setactiveID(cell.row.original.technicianId);
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

  useEffect(() => {
    const getAllSkills = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=19&Id=0&Code=0`;
    fetch(getAllSkills, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("--------------9999999999999999999999999999999999")
        console.log(result);
        setallSkills(result.map((skill) => ({ value: skill.parameterTypeId, label: skill.parameterType })))
      })

  }, [])



  const [technicianId, settechnicianId] = useState('')




  const [allASCs, setallASCs] = useState([])



  const getAllASCUrl = `${process.env.REACT_APP_API_URL}Asc/GetAllAsc`;

  useEffect(() => {
    fetch(getAllASCUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallASCs(result)
      })
  }, [])

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };

  const handleClose = () => {
    setShow(false);
    setaddTechnician({
      technicianId: 0,
      technicianName: "",
      ascCode: "",
      mobile: "",
      technicianEmail: "",
      divisionCode: [],
      productLineCode: [],
      productGroupCode: '',
      productGroupName: '',
      skillId: [],
      isActive: true,
      phoneNo: ""
    })



  }





  useEffect(() => {
    if (technicianId) {




      fetch(`${process.env.REACT_APP_API_URL}Technician/GetTechnicianById?technicianId=${technicianId ? technicianId : 0}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          seteditTechnician((pre) => {
            return {
              ...pre,
              technicianId: result?.technicianId,
              ascCode: result?.ascCode,
              technicianName: result?.technicianName,
              mobile: result?.mobile,
              phoneNo: result?.phoneNo,
              technicianEmail: result?.technicianEmail,
              divisionCode: result?.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
              productLineCode: result?.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
              productGroupCode: result?.productGroupCode,
              skillId: result?.skillList.map((skill) => ({ value: skill.parameterTypeId, label: skill.parameterType }))

            }
          })




          // console.log("logging here");
          let ascName = allASCs.filter(i => i.ascCode == result?.ascCode)
          setAscFetchname(ascName[0]?.name);

          console.log(allASCs.filter(i => i.ascCode == result?.ascCode));


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

          let productLineCodes = result?.productLineCodeList?.map(item => item?.parameterTypeId).toString();

          console.log("---------------------dyty----------------------------");
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
              setallProductGroups(result)
            })


          let skillId = result?.skillList?.map(item => item?.parameterTypeId).toString();

          // console.log(skillId,"+++++++++++++++++++++++++++++++++++++")

          console.log("---------------------dyty----------------------------");
          console.log(divisionCodes);

          const getAllSkills = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=19&Id=0&Code=${skillId ? skillId : 0}`;
          fetch(getAllSkills, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("--------------9999999999999999999999999999999999")
              console.log(result);
              setallSkills(result.map((skill) => ({ value: skill.parameterTypeId, label: skill.parameterType })))
            })




        })




    }





  }, [technicianId])


  const handleClose1 = () => {
    setShow1(false);
    fetch(`${process.env.REACT_APP_API_URL}Technician/GetTechnicianById?technicianId=${technicianId ? technicianId : 0}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('techhh------------------', result);
        seteditTechnician((pre) => {
          return {
            ...pre,
            technicianId: result?.technicianId,
            ascCode: result?.ascCode,
            technicianName: result?.technicianName,
            mobile: result?.mobile,
            phoneNo: result?.phoneNo,
            technicianEmail: result?.technicianEmail,
            divisionCode: result?.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
            productLineCode: result?.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
            productGroupCode: result?.productGroupCode,
            skillId: result?.skillList.map((skill) => ({ value: skill.parameterTypeId, label: skill.parameterType }))

          }
        })
      })

  }
  const [mobileError, setMobileError] = useState('')
  const [emailError, setEmailError] = useState('')


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

    setaddTechnician(prevState => ({
      ...prevState,
      mobile: value
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

    setaddTechnician(prevState => ({
      ...prevState,
      technicianEmail: value
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

    seteditTechnician(prevState => ({
      ...prevState,
      mobile: value
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

    seteditTechnician(prevState => ({
      ...prevState,
      technicianEmail: value
    }));
  };

  const customHeaders = {
    technicianName: ' Technician  Name',
    ascCode: 'Asc Name',
    mobile: 'Mobile',
    phoneNo: 'Phone',
    technicianEmail: 'Email',
    divisionName: 'Division',
    productLineName: 'Product Line',
    divisionCode: 'Division Code',
    productLineCode: 'Product Line Code',
    productGroupCode: 'Product Group Code',

    // noOfSkill: 'Skills',


  }




  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Technician Master</p>

            {Permissions?.isAdd ? <Row className=''><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Technician</Button></Col></Row> : ""}

          </div>
          <hr />
          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3">

            <Col md={4}>
              <Form.Group>
                <Form.Label>ASC Name </Form.Label>

                <Select
                  aria-labelledby="aria-label"
                  value={filterAscName.label}
                  inputId="aria-example-input"
                  name=""
                  onChange={(e) => {
                    console.log(e)
                    setFilterAscName((pre) => {
                      return {
                        ...pre,
                        ascCode: e.value,
                        ascName: e.label
                      };
                    });
                    setFilterAscName(e.value)
                  }}
                  options={allASCs.map(option => ({ value: option.ascCode, label: option.name }))} />
              </Form.Group>

            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Technician Name </Form.Label>

                <Form.Control type='text' name='technicianName' maxLength={200} value={filterTechName} onChange={(e) => {
                  setFilterTechName(e.target.value)
                }} />

              </Form.Group>
            </Col>

            <Col md={3}>
              <div style={{ paddingTop: '0.5rem' }}>
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
                    setFilterAscName((prevFilterAscName) => ({
                      ...prevFilterAscName,
                      label: ""
                    }));
                    // setFilterAscName('')
                    setFilterTechName('')
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
                // enableExpandAll="false"
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
                  // console.log('---row---', row.original.skillId)
                  let list1 = row.original.skillId?.split(",")
                  let list2 = row.original.divisionCode?.split(",")
                  let list3 = row.original.productLineCode?.split(",")

                  // console.log(list1);

                  return (

                    (row.original.skillId || row.original.divisionCode || row.original.productLineCode) ? (
                      <Box

                      >



                        <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
                          {list1 ?

                            <div className='p-3' style={{ borderRight: "1px solid" }}>
                              <p style={{ fontSize: "16px", fontWeight: "600" }}>Skills</p>
                              <ul>


                                {
                                  list1?.map((skillId, index) => {
                                    return (
                                      <>
                                        <li>{skillId}</li>

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

                renderRowActions={({ cell, row, table }) => (
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="left" title="Edit">
                          <IconButton
                            className="edit-btn"
                            onClick={() => {
                              console.log(cell.row.original);
                              settechnicianId(cell.row.original.technicianId)
                              handleShow1()
                            }}

                          >
                            <FaRegEdit color='#005bab' />
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
                              "noOfProductLine",
                              "noOfDivision",
                              "totalRows",
                              "divisionCodeList",
                              "productLineCodeList",
                              "productGroupCodeList",
                              "skillList",
                              "technicianId",

                              "skillId",
                              "isActive",
                              "phoneNo",
                              'noOfSkill'
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
              <Modal.Title className='mdl-title'>Add New Technician</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>Technician Details</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addTechnicianUrl = `${process.env.REACT_APP_API_URL}Technician/UpsertTechnician`
                        const divisionCodeString = addTechnician?.divisionCode?.map(division => division.value).join(',');
                        const prodLineCodeString = addTechnician?.productLineCode?.map(Pl => Pl.value).join(',');
                        // const prodGrpCodeString = addTechnician?.productGroupCode?.map(pg => pg.value);
                        const skillsString = addTechnician?.skillId?.map(skill => skill.value).join(',');


                        let n = {
                          ...addTechnician,
                          divisionCode: divisionCodeString,
                          productLineCode: prodLineCodeString,
                          // productGroupCode: prodGrpCodeString,
                          skillId: skillsString
                        }

                        console.log(n);


                        // if (addTechnician?.ascCode == "" || addTechnician?.technicianName == "" || addTechnician?.mobile == "" || addTechnician?.divisionCode == "" || addTechnician?.productLineCode == "") {
                        //     Swal.fire({
                        //         icon: "error",
                        //         title: "Please fill all the fields marked with red *!"
                        //     })
                        // }


                        const ascCode = addTechnician.ascCode;
                        // Check if userId is manually set
                        if (!ascCode || ascCode === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "ASC is required"
                          });
                          return;
                        }

                        const technicianName = addTechnician.technicianName;
                        if (!technicianName) {
                          Swal.fire({
                            icon: "error",
                            title: "Technician Name is rquired"
                          });
                          return;
                        }

                        const mobileNo = addTechnician.mobile;
                        if (!mobileNo) {
                          Swal.fire({
                            icon: "error",
                            title: "Mobile number is required."
                          });
                          return;
                        }

                        const mobile = addTechnician.mobile;
                        const mobileRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)
                        if (mobile && !mobile.match(mobileRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please Enter Correct Mobile Number."
                          });
                          return;
                        }




                        const phone = addTechnician.phoneNo;
                        const phoneRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)

                        // Check if phone is provided and if it matches the regex pattern
                        if (phone && !phone.match(phoneRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please Enter Correct Phone number."
                          });
                          return;
                        }

                        const emailId = addTechnician.technicianEmail;
                        const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

                        // Check if emailId matches the regex pattern
                        if (emailId.length > 0 && !emailId.match(emailIdRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Invalid email address"
                          });
                          return;
                        }




                        const division = n.divisionCode;
                        if (!division) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Division is required',
                          });
                          return;
                        }

                        const productLineCodes = n.productLineCode
                        if (!productLineCodes) {
                          Swal.fire({
                            icon: "error",
                            title: "Product Line is required"
                          });
                          return;
                        }

                        // const productGroupCode = addTechnician.productGroupCode;
                        // if (!productGroupCode || productGroupCode === 'Select') {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Product Group is required"
                        //   });
                        //   return;
                        // }


















                        else {
                          setLoading(true)
                          fetch(addTechnicianUrl, {
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






                                if (res.status == 200 && r != "TECHEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  })
                                  handleClose()
                                  fetchAllTechnicians()
                                  setLoading(false)


                                  // setuser((pre)=>{
                                  //   return{
                                  //     ...pre,
                                  //     userId:insertASC?.ascCode,
                                  //     userTypeCode:insertASC?.custCode,
                                  //     userName:insertASC?.name,
                                  //     branchCode:insertASC?.branchCode,
                                  //     divisionCode:insertASC?.divisionCode,
                                  //     productLineCode:insertASC?.productLineCode,
                                  //     userEmailId:insertASC?.emailId
                                  //   }
                                  // })



                                }
                                else if (res.status == 200 && r == "TECHEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Technician already exists!"
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


                        <><Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>ASC <span className='req-t'>*</span></Form.Label>
                              <Select
                                aria-labelledby="aria-label"

                                inputId="aria-example-input"
                                name=""
                                onChange={(e) => {
                                  setaddTechnician((pre) => {
                                    return {
                                      ...pre,
                                      ascCode: e.value,
                                    };
                                  });
                                }}
                                options={allASCs.map(option => ({ value: option.ascCode, label: option.name }))} />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Technician Name <span className='req-t'>*</span></Form.Label>

                              <Form.Control type='text' name='technicianName' maxLength={200} onChange={handleChange} />

                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Mobile <span className='req-t'>*</span></Form.Label>
                              <Form.Control type='tel' name='mobile' maxLength={15} onChange={handleMobileChange} />

                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>

                        </Row>
                          <Row className='mt-3'>
                            <Col md={4} >
                              <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='tel' name='phoneNo' maxLength={20} onChange={handleChange} />

                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='technicianEmail' maxLength={100} onChange={handleEmailChange} />
                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allDivisions}
                                  value={addTechnician.divisionCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);

                                    if (e.length === 0) {
                                      setallProductGroups([]);
                                      setaddTechnician((pre) => {
                                        return {
                                          ...pre,
                                          productLineCode: [],
                                          productGroupCode: '',
                                          productLineName: "",
                                        };
                                      });

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
                                        console.log("-----p----", prodLines);
                                        console.log("------add----", addTechnician.productLineCode);

                                        let filteredProdLineCodes = addTechnician.productLineCode.filter((singleCode) => {
                                          console.log("------filter-------", singleCode);
                                          console.log("---productl------", prodLines.find((pl) => pl.value === singleCode.value));
                                          if (prodLines.find((pl) => pl.value === singleCode.value)) { return true; }
                                        });

                                        console.log(filteredProdLineCodes, "0----------------------");

                                        // ------------------product group on change------------------------------- 
                                        let productLineString = filteredProdLineCodes?.map(productLine => productLine.value)?.join(',');
                                        console.log("PLString----------------lllllllll", productLineString);

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
                                            let filteredProdGroupCodes = allProductGroups.filter((singleCode) => {
                                              console.log("------filter-------", singleCode)
                                              if (produGroup.find((pl) => pl.value === singleCode.value)) { return true }
                                            })

                                            setallProductGroups(result)
                                            setaddTechnician((pre) => {
                                              return {
                                                ...pre,
                                                productLineCode: filteredProdLineCodes,
                                                productGroupCode: filteredProdGroupCodes.toString(),
                                                divisionCode: e
                                              }
                                            })

                                          });

                                        setaddTechnician((pre) => {
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

                          </Row><Row className='mt-3'>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allproductLines}
                                  value={addTechnician.productLineCode}
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
                                        let produGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));
                                        let filteredProdGroupCodes = allProductGroups.filter((singleCode) => {
                                          console.log("------filter-------", singleCode);
                                          if (produGroup.find((pl) => pl.value === singleCode.value)) { return true; }
                                        });


                                        setallProductGroups(result)
                                        setaddTechnician((pre) => {
                                          return {
                                            ...pre,
                                            productLineCode: e,
                                            productGroupCode: filteredProdGroupCodes.toString()
                                          }
                                        })

                                      })
                                  }}
                                  valueRenderer={customValueRenderer}



                                />
                              </Form.Group>
                            </Col>
                            <Col md={4} >
                              <Form.Group>
                                <Form.Label>Product Group</Form.Label>
                                <Form.Select
                                  name='productGroupCode'
                                  onChange={(e) => {
                                    setaddTechnician((pre) => {
                                      return {
                                        ...pre,
                                        productGroupCode: e.target.value
                                      }
                                    })
                                  }}
                                  placeholder=''
                                >
                                  <option value="0">Select</option>
                                  {allProductGroups.map((productLine) => (
                                    <option value={productLine.parameterTypeId}>
                                      {productLine.parameterType}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Skills</Form.Label>
                                <MultiSelect
                                  options={allSkills}
                                  value={addTechnician.skillId}

                                  onChange={function noRefCheck(e) {
                                    console.log(e);

                                    setaddTechnician((pre) => {
                                      return {
                                        ...pre,
                                        skillId: e
                                      };
                                    });
                                  }}
                                  valueRenderer={customValueRenderer} />
                              </Form.Group>
                            </Col>


                          </Row></>
                      )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">

                  <Accordion.Header >
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0 '
                    >
                      <p className='m-0'>User Creation (Maybe activated in future)</p><span> <IoSave color='#7bc143' fontSize={20} /></span>

                    </div>

                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {/* <Col md={4} className='mt-3'>
                                                <Form.Group>
                                                    <Form.Label>User Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=''
                                                    />
                                                </Form.Group>
                                            </Col> */}
                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                          <Form.Select>
                            {/* <option value="">Select</option> */}
                            <option value="Technician">Technician</option>
                            {/* <option value="">ASC</option>
                                                        <option value=""></option> */}

                          </Form.Select>
                        </Form.Group>
                      </Col>

                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>



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










          {/* -------------------------------------------------------Edit-------------------------------------------- */}



          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Technician</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>Technician Details</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const addTechnicianUrl = `${process.env.REACT_APP_API_URL}Technician/UpsertTechnician`

                        let divisionString = editTechnician?.divisionCode?.map(item => item.value).join(',')
                        let productLineString = editTechnician?.productLineCode?.map(item => item.value).toString() || '';
                        // let productGroupString = editTechnician?.productGroupCode?.map(item => item.parameterTypeId).toString() || '';
                        const skillsString = editTechnician?.skillId?.map(skill => skill.value).join(',') || '';








                        let n = {
                          ...editTechnician,
                          divisionCode: divisionString,
                          productLineCode: productLineString,
                          // productGroupCode: productGroupString,
                          skillId: skillsString
                        }
                        console.log("--999998888888888888888888888*******************")
                        console.log(n);


                        // if (addTechnician?.ascCode == "" || addTechnician?.technicianName == "" || addTechnician?.mobile == "" || addTechnician?.divisionCode == "" || addTechnician?.productLineCode == "") {
                        //     Swal.fire({
                        //         icon: "error",
                        //         title: "Please fill all the fields marked with red *!"
                        //     })
                        // }


                        const ascCode = editTechnician.ascCode;
                        // Check if userId is manually set
                        if (!ascCode || ascCode === 'Select') {
                          Swal.fire({
                            icon: "error",
                            title: "ASC is required"
                          });
                          return;
                        }

                        const technicianName = editTechnician.technicianName;
                        if (!technicianName) {
                          Swal.fire({
                            icon: "error",
                            title: "Technician Name is rquired"
                          });
                          return;
                        }

                        const mobileNo = editTechnician.mobile;
                        if (!mobileNo) {
                          Swal.fire({
                            icon: "error",
                            title: "Mobile number is required."
                          });
                          return;
                        }

                        const mobile = editTechnician.mobile;
                        const mobileRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)
                        if (mobile && !mobile.match(mobileRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please Enter Correct Mobile Number."
                          });
                          return;
                        }




                        const phone = editTechnician.phoneNo;
                        const phoneRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)

                        // Check if phone is provided and if it matches the regex pattern
                        if (phone && !phone.match(phoneRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Please Enter Correct Phone number."
                          });
                          return;
                        }

                        const emailId = editTechnician.technicianEmail;
                        const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

                        // Check if emailId matches the regex pattern
                        if (emailId.length > 0 && !emailId.match(emailIdRegex)) {
                          Swal.fire({
                            icon: "error",
                            title: "Invalid email address"
                          });
                          return;
                        }




                        const division = n.divisionCode;
                        if (!division) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Division is required',
                          });
                          return;
                        }

                        const productLineCodes = n.productLineCode
                        if (!productLineCodes) {
                          Swal.fire({
                            icon: "error",
                            title: "Product Line is required"
                          });
                          return;
                        }



                        else {
                          setLoading(true)
                          fetch(addTechnicianUrl, {
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
                                if (res.status == 200 && r != "TECHEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Update successfully!"
                                  })
                                  handleClose1()
                                  fetchAllTechnicians()
                                  setLoading(false)


                                  // setuser((pre)=>{
                                  //   return{
                                  //     ...pre,
                                  //     userId:insertASC?.ascCode,
                                  //     userTypeCode:insertASC?.custCode,
                                  //     userName:insertASC?.name,
                                  //     branchCode:insertASC?.branchCode,
                                  //     divisionCode:insertASC?.divisionCode,
                                  //     productLineCode:insertASC?.productLineCode,
                                  //     userEmailId:insertASC?.emailId
                                  //   }
                                  // })



                                }
                                else if (res.status == 200 && r == "TECHEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Technician already exists!"
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

                        <><Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>ASC <span className='req-t'>*</span></Form.Label>
                              <Select
                                aria-labelledby="aria-label"
                                value={({ label: ascFetchname })}
                                // isDisabled
                                inputId="aria-example-input"
                                name="ascCode"
                                onChange={(selectedOption) => {

                                  if (selectedOption) {
                                    const { value, label } = selectedOption;
                                    seteditTechnician((prev) => ({
                                      ...prev,
                                      ascCode: value,
                                    }));
                                    setAscFetchname(label);

                                  }



                                }}
                                options={allASCs.map(option => ({ value: option.ascCode, label: option.name }))} />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Technician Name <span className='req-t'>*</span></Form.Label>

                              <Form.Control type='text' name='technicianName' maxLength={200} value={editTechnician?.technicianName} onChange={handleChangeEdit} />

                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Mobile <span className='req-t'>*</span></Form.Label>
                              <Form.Control type='tel' name='mobile' maxLength={15} value={editTechnician?.mobile} onChange={EdithandleMobileChange} />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>

                        </Row>
                          <Row className='mt-3'>
                            <Col md={4} >
                              <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='tel' name='phoneNo' maxLength={20} value={editTechnician?.phoneNo} onChange={handleChangeEdit} />

                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='technicianEmail' maxLength={100} value={editTechnician?.technicianEmail} onChange={EdithandleEmailChange} />
                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allDivisions}
                                  value={editTechnician.divisionCode}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);

                                    if (e.length === 0) {
                                      setallProductGroups([]);
                                      seteditTechnician((pre) => {
                                        return {
                                          ...pre,
                                          productLineCode: [],
                                          productGroupCode: '',
                                          productLineName: "",
                                        };
                                      });

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
                                        console.log("-----p----", prodLines);
                                        console.log("------add----", addTechnician.productLineCode);

                                        let filteredProdLineCodes = editTechnician.productLineCode.filter((singleCode) => {
                                          console.log("------filter-------", singleCode);
                                          console.log("---productl------", prodLines.find((pl) => pl.value === singleCode.value));
                                          if (prodLines.find((pl) => pl.value === singleCode.value)) { return true; }
                                        });

                                        console.log(filteredProdLineCodes, "0----------------------");

                                        // ------------------product group on change------------------------------- 
                                        let productLineString = filteredProdLineCodes?.map(productLine => productLine.value)?.join(',');
                                        console.log("PLString----------------lllllllll", productLineString);

                                        const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineString ? productLineString : 0}`;

                                        fetch(getAllProductGroup, {
                                          headers: {
                                            "Authorization": `Bearer ${token}`
                                          }
                                        })
                                          .then((res) => res.json())
                                          .then((result) => {
                                            console.log(result);
                                            let produGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));
                                            let filteredProdGroupCodes = allProductGroups.filter((singleCode) => {
                                              console.log("------filter-------", singleCode);
                                              if (produGroup.find((pl) => pl.value === singleCode.value)) { return true; }
                                            });

                                            setallProductGroups(result);
                                            seteditTechnician((pre) => {
                                              return {
                                                ...pre,
                                                productLineCode: filteredProdLineCodes,
                                                productGroupCode: filteredProdGroupCodes,
                                                divisionCode: e
                                              };
                                            });

                                          });

                                        seteditTechnician((pre) => {
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

                          </Row><Row className='mt-3'>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                                <MultiSelect
                                  options={allproductLines}
                                  value={editTechnician.productLineCode}

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
                                        let produGroup = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));

                                        let filteredProdGroupCodes = allProductGroups.filter((singleCode) => {
                                          console.log("------filter-------", singleCode);
                                          if (produGroup.find((pl) => pl.value === singleCode.value)) { return true; }
                                        });

                                        setallProductGroups(result);
                                        seteditTechnician((pre) => {
                                          return {
                                            ...pre,
                                            productLineCode: e,
                                            productGroupCode: filteredProdGroupCodes
                                          };
                                        });

                                      });
                                  }}
                                  valueRenderer={customValueRenderer} />


                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Product Group</Form.Label>
                                <Form.Select
                                  name='productGroupCode'
                                  value={editTechnician.productGroupCode}
                                  onChange={(e) => {
                                    seteditTechnician((pre) => {
                                      return {
                                        ...pre,
                                        productGroupCode: e.target.value
                                      };
                                    });
                                  }}
                                  placeholder=''
                                >
                                  <option value="0">Select</option>
                                  {allProductGroups.map((productLine) => (
                                    <option value={productLine.parameterTypeId}>
                                      {productLine.parameterType}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Skills</Form.Label>
                                <MultiSelect
                                  options={allSkills}
                                  value={editTechnician.skillId}
                                  onChange={function noRefCheck(e) {
                                    console.log(e);
                                    seteditTechnician((pre) => {
                                      return {
                                        ...pre,
                                        skillId: e
                                      };
                                    });
                                  }}
                                  valueRenderer={customValueRenderer} />
                              </Form.Group>
                            </Col>


                          </Row></>

                      )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">

                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>User Creation (Maybe activated in future)</p><span> <IoSave color='#7bc143' fontSize={20} /></span>

                    </div>

                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {/* <Col md={4} className='mt-3'>
                                                <Form.Group>
                                                    <Form.Label>User Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=''
                                                    />
                                                </Form.Group>
                                            </Col> */}
                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                          <Form.Select>
                            {/* <option value="">Select</option> */}
                            <option value="Technician">Technician</option>
                            {/* <option value="">ASC</option>
                                                        <option value=""></option> */}

                          </Form.Select>
                        </Form.Group>
                      </Col>

                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>



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
              <Modal.Title className='mdl-title'>Delete Technician</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Technician?

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteTechnicianUrl = `${process.env.REACT_APP_API_URL}Technician/DeleteTechnician?technicianId=${technicianId}&isActive=${0}`;




                fetch(deleteTechnicianUrl, {
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
                        fetchAllTechnicians()

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
              <Modal.Title className='mdl-title'>Activate Technician</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Technician?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteTechnicianUrl = `${process.env.REACT_APP_API_URL}Technician/DeleteTechnician?technicianId=${activeID}&isActive=${1}`;

                fetch(deleteTechnicianUrl, {
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
                        fetchAllTechnicians()



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
              <Modal.Title className='mdl-title'>De-activate Technician</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Technician?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteTechnicianUrl = `${process.env.REACT_APP_API_URL}Technician/DeleteTechnician?technicianId=${activeID}&isActive=${0}`;

                fetch(deleteTechnicianUrl, {
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
                      fetchAllTechnicians()

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
                    //     fetchAllTechnicians()


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

export default Technician