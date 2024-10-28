import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal, Accordion } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaPlus, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Multiselect from 'multiselect-react-dropdown';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";

import { IoSave } from "react-icons/io5";

import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { MultiSelect } from 'react-multi-select-component';
import { add } from 'lodash';
import { BsFillClipboard2CheckFill } from 'react-icons/bs';
import Loader from '../../loader';
function ASC() {
  const [show, setShow] = useState(false);
  const [allSkills, setallSkills] = useState([]);
  const [selectedAscCode, setSelectedAscCode] = useState("")
  const [selectedAscName, setSelectedAscName] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadings, setLoadings] = useState(false)



  let loginRole = localStorage.getItem("RoleName");


  const [showASCMappingSaveIcon, setShowASCMappingSaveIcon] = useState(false);
  const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false)


  const [addTechnician, setaddTechnician] = useState({
    technicianId: 0,
    technicianName: "",
    ascCode: "",
    mobile: "",
    technicianEmail: "",
    divisionCode: [],
    productLineCode: [],
    productGroupCode: '',
    skillId: [],
    isActive: true,
    phoneNo: ""
  })

  const handleTechnicianChange = (e) => {
    const newdata = { ...addTechnician };
    newdata[e.target.name] = e.target.value;
    setaddTechnician(newdata);
    console.log(newdata);
  }

  const handleOpenAddTechnicianModal = (ascCode, name) => {
    setaddTechnician(prevTechnician => ({
      ...prevTechnician,
      ascCode: ascCode
    }));
    setSelectedAscCode(ascCode);
    setSelectedAscName(name);
    setShowAddTechnicianModal(true);
    GetAllDivision()
    AllSkill()


  }


  const handleCloseAddTechnicianModal = () => {
    setShowAddTechnicianModal(false);
    setaddTechnician({
      technicianId: 0,
      technicianName: "",
      ascCode: "",
      mobile: "",
      technicianEmail: "",
      divisionCode: [],
      productLineCode: [],
      productGroupCode: '',
      skillId: [],
      isActive: true,
      phoneNo: ""
    })




  }





  const [productLine, setAllproductLine] = useState([]);

  const [allProductGroups, setallProductGroups] = useState([])






  // const [show, setShow] = useState(false);

  // const handleClose = () =>  {
  //   setShow(false);
  //   setShowASCMappingSaveIcon(false); // Set setShowASCMappingSaveIcon to false
  // };
  const handleShow = () => {
    setShow(true);
    setActiveKey("0")
    GetAllRole()
    DocumentType()
    AllBraches()
    GetAllDivision()
    StateURL()
    AllSkill()
    setShowASCMappingSaveIcon(false); // Set setShowASCMappingSaveIcon to false
  };


  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);




  const [showApprove, setshowApprove] = useState(false);
  // const handleCloseApprove = () => setshowApprove(false);
  // const handleShowApprove = () => setshowApprove(true);
  const handleCloseApprove = () => setshowApprove(false);
  const handleShowApprove = () => setshowApprove(true);

  let token = localStorage.getItem("UserToken")


  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  const [data, setdata] = useState([]);

  const [show1, setShow1] = useState(false);

  const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [isActive, setisActive] = useState("")


  const fetchAllASC = () => {
    fetch(`${process.env.REACT_APP_API_URL}Asc/GetAllAsc`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setdata(result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Optionally, you can set an error state here or handle the error in another way
      });
  }

  useEffect(() => {
    fetchAllASC();
  }, []);


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








  const [insertASC, setinsertASC] = useState({
    ascId: 0,
    ascCode: "",
    custCode: "",
    name: "",
    emailId: "",
    mobileNo: "",
    contactPersonName: "",
    aadharNo: "",
    isGSTApplicable: false,
    panNo: "",
    stateId: 0,
    cityId: 0,
    pinId: 0,
    ascAddress: "",
    gstNo: "",
    agreementStartDate: "",
    agreementEndDate: "",
    securityDeposit: 0,
    hyAuditDate: "",
    noOfTechnicians: 0,
    availableMachines: 0,
    documentType: 0,
    documentPath: [],
    isActive: true,
    productLineCode: [],
    divisionCode: [],
    branchCode: "",
    typeOfTicketTobeHandeled:"",
    // branchName: '',
  })

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };

  const handleClose = () => {
    setShow(false)
    setShowASCMappingSaveIcon(false);
    // Set setShowASCMappingSaveIcon to false
    setinsertASC({
      ascId: 0,
      ascCode: "",
      custCode: "",
      name: "",
      emailId: "",
      mobileNo: "",
      contactPersonName: "",
      aadharNo: "",
      isGSTApplicable: false,
      panNo: "",
      stateId: '',
      cityId: '',
      pinId: '',
      ascAddress: "",
      gstNo: "",
      agreementStartDate: "",
      agreementEndDate: "",
      securityDeposit: 0,
      hyAuditDate: "",
      noOfTechnicians: 0,
      availableMachines: 0,
      documentType: 0,
      documentPath: [],
      isActive: true,
      productLineCode: [],
      divisionCode: [],
      branchCode: "",
      typeOfTicketTobeHandeled:"",
      // branchName: '',


    });

  };




  const handleChange = (e) => {
    const newdata = { ...insertASC };
    newdata[e.target.name] = e.target.value;
    setinsertASC(newdata);
    console.log(newdata);








    // let GST=document.getElementById("isGst");

    // if(GST?.checked){
    //   setinsertASC((pre)=>{
    //     return{
    //       ...pre,
    //       isGSTApplicable:true
    //     }
    //   })
    // }
    // else{
    //   setinsertASC((pre)=>{
    //     return{
    //       ...pre,
    //       isGSTApplicable:false
    //     }
    //   }) 
    // }

  }



  const handleChangeASCUser = (e) => {
    const newdata = { ...user };
    newdata[e.target.name] = e.target.value;
    setuser(newdata);
    console.log(newdata);
  }







  const [editASC, seteditASC] = useState({
    ascId: 0,
    ascCode: "",
    custCode: "",
    name: "",
    emailId: "",
    mobileNo: "",
    contactPersonName: "",
    aadharNo: "",
    isGSTApplicable: false,
    panNo: "",
    stateId: 0,
    cityId: 0,
    pinId: 0,
    ascAddress: "",
    gstNo: "",
    agreementStartDate: "",
    agreementEndDate: "",
    securityDeposit: 0,
    hyAuditDate: [],
    noOfTechnicians: 0,
    availableMachines: 0,
    documentType: 0,
    documentPath: [],
    isActive: true,
    divisionCode: [],
    productLineCode: [],
    branchCode: [],
    typeOfTicketTobeHandeled:"",
    // branchName:""
  })




  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    seteditASC((prevAsc) => ({
      ...prevAsc,
      [name]: value
    }));
  };


  const [documentType, setdocumentType] = useState([])

  const DocumentType = () => {
    const documentTypeUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=DocumentType`;
    fetch(documentTypeUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdocumentType(result)
      })

  }






  const [user, setuser] = useState({
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





  const [edituser, setedituser] = useState({
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





  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])
  const [stateId, setstateId] = useState("");
  const [activeKey, setActiveKey] = useState("0");


  // ----------------------------------------approval---------------------


  const [AscApproval, setAscApproval] = useState({
    AscCode: "",
    WFAutoId: ""
  })



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


  const AllSkill = () => {
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

      `${process.env.REACT_APP_API_URL}Asc/GetAllAsc`,

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
  const [filterAscMob, setFilterAscMob] = useState('')
  const [filterAscCode, setFilterAscCode] = useState('')

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

      `${process.env.REACT_APP_API_URL}Asc/GetAllAsc`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterAscName || filterAscMob) {
      url.searchParams.set('AscName',`${filterAscName || filterAscMob}`);
        }
    if (filterAscCode) {url.searchParams.set('AscCode',`${filterAscCode}`);}

        

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

    setinsertASC(prevState => ({
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

    setinsertASC(prevState => ({
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

    setinsertASC(prevState => ({
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

    seteditASC(prevState => ({
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

    seteditASC(prevState => ({
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

    seteditASC(prevState => ({
      ...prevState,
      pinId: value
    }));
  };


  const techhandleMobileChange = (e) => {
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

  const techhandleEmailChange = (e) => {
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


  const [machineError, setMachineError] = useState('')
  const availableHandleChange = (e) => {
    // if()
    const { name, value } = e.target;
    // Validate if the input value is a number

    if (!isNaN(value)) {
      setinsertASC({ ...insertASC, [name]: value });
      setMachineError(''); // Reset error if input is valid
    } else {
      setMachineError('Only Digit Number'); // Set error message for invalid input
    }
  };
  // if (!isNaN(value)) {


  //   setaddTechnician(prevState => ({
  //     ...prevState,
  //     availableMachines: value
  //   }));

  // }









  const columns = useMemo(
    () => [

      {
        accessorKey: "ascCode",
        header: "Asc Code",
        size: "50"

      },
      {
        accessorKey: "name",
        header: "Asc Name",
        size: "50"

      },
      {
        accessorKey: "emailId",
        header: "Asc Email",
        size: "50"

      },
      {
        accessorKey: "mobileNo",
        header: "Asc Mobile",
        size: "300"

      },
      {
        accessorKey: "noOfTechnicians",
        header: "No. of Technicians",
        size: "50",
        Cell: ({ cell }) => {
          return (
            <>
              <p className='text-center'>{cell.getValue()} <span style={{ textDecoration: "underline", cursor: "pointer" }} className='mx-3' onClick={() => handleOpenAddTechnicianModal(cell.row.original.ascCode, cell.row.original.name)}><FaPlus fontSize={12} />Add</span></p>
            </>
          )
        }

      },
      {
        accessorKey: "contactPersonName",
        header: "Contact Person Name",
        size: "50"

      },
      /* {
         accessorKey: "AscPhone",
         header: "Asc Phone",
         size: "50"
 
       },*/
      // {
      //   accessorKey: "ascAddress",
      //   header: "Asc Address",
      //   size: "50"

      // },
      {
        accessorKey: "pinCode",
        header: "PinCode",
        size: "50",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),

      },
      {
        accessorKey: "noOfDivision",
        header: "No. Of Div",
        size: "50",
        Cell: ({ cell }) => (
          <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
        ),

      },
      {
        accessorKey: "noOfProductLine",
        header: "No. Of PL",
        size: "180"

      },
      {
        accessorKey: "panNo",
        header: "Asc PAN",
        size: "180"

      },
      {
        accessorKey: "gstNo",
        header: "Asc GST",
        size: "180"

      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        Cell: ({ cell }) => (
          <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        ),
      },
      {

        accessorKey: "workFlowStatus",
        header: "Workflow Status",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          return (
            <p className={`${data == "Pending With RSM" ? `approve1` : data == "Pending With AISH" ? `approve2` : `approve3`}`}>{data}</p>
          )
        },
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
                          console.log(cell.row.original.ascId);
                          setascId(cell.row.original.ascId)
                          handleShow1()
                          GetAllRole()
                          DocumentType()
                          StateURL()
                          AllSkill()


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
                        console.log(cell.row.original.ascId);
                        setactiveID(cell.row.original.ascId);
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
                        console.log(cell.row.original.ascId);
                        setactiveID(cell.row.original.ascId);
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
                  (Permissions?.isApproved && loginRole == cell.row.original?.approvalRoleCode && cell.row.original?.workFlowStatus != "Approved") ?
                    <Tooltip title="Approve">
                      <IconButton>
                        <BsFillClipboard2CheckFill color='green' onClick={() => {
                          setAscApproval((pre) => {
                            return {
                              ...pre,
                              AscCode: cell.row.original?.ascCode,
                              WFAutoId: cell.row.original?.wfAutoId
                            }
                          })

                          handleShowApprove()

                        }} />

                      </IconButton>
                    </Tooltip> : ""
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

    // onPaginationChange: setPagination,
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







  const [branchData, setbranchData] = useState([]);

  const [allDivisions, setallDivisions] = useState([]);


  const [allproductLines, setallproductLines] = useState([])







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




  const [ascId, setascId] = useState("");


  const AllBraches = () => {
    const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;

    fetch(getAllBranches, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("-------uuuuuuuuuuuuuuuuuuuuuuuu")


        console.log(result);
        setbranchData(result)
      })

  }










  // useEffect(()=>{
  //   fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscById?AscId=${ascId?ascId:0}`,{
  //     headers:{
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //   .then((res)=>res.json())
  //   .then((result)=>{
  //     console.log(result);
  //   })



  // },[ascId])

  // Function to format date from "MM/DD/YYYY HH:mm:ss" to "YYYY-MM-DD"
  function formatDate(dateString) {
    if (!dateString) return ''; // Handle case where dateString is undefined
    // Split the dateString by space to separate date and time
    const parts = dateString.split(" ");
    // Split the date part by '/' to get month, day, and year
    const dateParts = parts[0].split("/");
    // Rearrange the parts to format it as "YYYY-MM-DD"
    const formattedDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
    return formattedDate;
  }



  // Example usage:
  // const formattedDate = formatDate(result?.hyAuditDate);



  const [userID, setuserID] = useState("")


  // useEffect(()=>{},[])




  useEffect(() => {
    if (ascId) {
      fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscById?AscId=${ascId ? ascId : 0}`, {

        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          let branchCode = result.branchCodeList?.map(i => i.parameterTypeId).toString();
          let gstNumber = result.gstNo === null ? result.gstNo : result.gstNo;

          console.log(branchCode, "------------------------------8I------------------------------")


          seteditASC((pre) => {
            return {
              ...pre,
              ascId: result?.ascId,
              ascCode: result?.ascCode,
              custCode: result?.custCode,
              name: result?.name,
              emailId: result?.emailId,
              mobileNo: result?.mobileNo,
              contactPersonName: result?.contactPersonName,
              aadharNo: result?.aadharNo,
              isGSTApplicable: result?.isGSTApplicable,
              panNo: result?.panNo,
              stateId: result?.stateId,
              cityId: result?.cityId,
              pinId: result?.pinId,
              ascAddress: result?.ascAddress,
              gstNo: gstNumber,
              agreementStartDate: formatDate(result?.agreementStartDate),
              agreementEndDate: formatDate(result?.agreementEndDate),
              securityDeposit: result?.securityDeposit,
              hyAuditDate: formatDate(result?.hyAuditDate),
              noOfTechnicians: result?.noOfTechnicians,
              availableMachines: result?.availableMachines,
              documentType: result?.documentType,
              documentPath: result?.documentPath?.name,
              isActive: true,
              productLineCode: result.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
              divisionCode: result.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
              branchCode: branchCode,
              typeOfTicketTobeHandeled:result?.typeOfTicketTobeHandeled
              // branchName: result?.branchName,


            }
          })

          setuserID(result?.ascCode)

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

          const getAllBranches = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=20&Id=0&Code=0`;

          fetch(getAllBranches, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("-------uuuuuuuuuuuuuuuuuuuuuuuu")


              console.log(result);
              setbranchData(result)
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
  }

    , [ascId])


  const handleClose1 = () => {
    setShow1(false);
    fetch(`${process.env.REACT_APP_API_URL}Asc/GetAscById?AscId=${ascId ? ascId : 0}`, {

      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        let branchCode = result.branchCodeList?.map(i => i.parameterTypeId).toString();

        console.log(branchCode, "------------------------------8I------------------------------")


        seteditASC((pre) => {
          return {
            ...pre,
            ascId: result?.ascId,
            ascCode: result?.ascCode,
            custCode: result?.custCode,
            name: result?.name,
            emailId: result?.emailId,
            mobileNo: result?.mobileNo,
            contactPersonName: result?.contactPersonName,
            aadharNo: result?.aadharNo,
            isGSTApplicable: result?.isGSTApplicable,
            panNo: result?.panNo,
            stateId: result?.stateId,
            cityId: result?.cityId,
            pinId: result?.pinId,
            ascAddress: result?.ascAddress,
            gstNo: result?.gstNo,
            agreementStartDate: formatDate(result?.agreementStartDate),
            agreementEndDate: formatDate(result?.agreementEndDate),
            securityDeposit: result?.securityDeposit,
            hyAuditDate: formatDate(result?.hyAuditDate),
            noOfTechnicians: result?.noOfTechnicians,
            availableMachines: result?.availableMachines,
            documentType: result?.documentType,
            documentPath: result?.documentPath?.name,
            isActive: true,
            productLineCode: result.productLineCodeList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
            divisionCode: result.divisionCodeList.map((division) => ({ value: division.parameterTypeId, label: division.parameterType })),
            branchCode: branchCode,

            // branchName: result?.branchName,


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





        setuserID(result?.ascCode)
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
        console.log("-----rrr")

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
            divisionCode: result?.divisionCodeList,
            productLineCode: result?.productLineCodeList,





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
          console.log("-----rrr")

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
              divisionCode: result?.divisionCodeList,
              productLineCode: result?.productLineCodeList,


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








        })
    }
  }, [userID])



  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue)
    if (inputValue) {
      setFilterAscName(inputValue);
      setFilterAscMob("");
    } else {
      setFilterAscName("");
      setFilterAscMob(inputValue);
    }
  };




  const customHeaders = {
    // ascCode: 'Asc Code',
    name: 'Asc Name',
    emailId: 'Asc Email',
    mobileNo: 'Asc Mobile',
    noOfTechnicians: 'No. of Technicians',
    contactPersonName: 'Contact Person Name',
    pinCode: 'PinCode',
    aadharNo: 'Aadhar Number',
    ascAddress: 'ASC Address',
    agreementStartDate: 'Aggreement Start Date',
    agreementEndDate: 'Aggreement End Date',
    securityDeposit: 'Security Deposit',
    hyAuditDate: 'Hy Audit Date',
    availableMachines: 'Available Machines',
    // documentType:'Document Type',
    divisionCode: 'Division Code',
    branchCode: 'Branch Code',
    ascCode: 'ASC Code',
    // noOfDivision: 'No.of Division',
    // noOfProductLine: "No. of Product Line",
    panNo: 'Asc PAN',
    gstNo: 'Asc GST',
    workFlowStatus: 'Workflow Status'







  }





  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>ASC Master</p>
            {Permissions?.isAdd ? <Row className=' text-end'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New ASC</Button></Col></Row> : ""}

          </div>
          <hr />



          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3" >
            <Col md={3}>
              <Form.Group>
                <Form.Label>ASC Name/ASC Mobile</Form.Label>
                <Form.Control type='text'
                  value={filterAscName || filterAscMob}
                  onChange={handleInputChange}

                />
              </Form.Group>
            </Col>

            <Col md={3} className=''>
              <Form.Group>
                <Form.Label>ASC Code</Form.Label>
                <Form.Control
                  type="text"
                  value={filterAscCode}
                  onChange={(e) => {
                    setFilterAscCode(e.target.value)
                  }}
                  placeholder=''
                />
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
                    setFilterAscCode('')
                    setFilterAscMob('')
                    setFilterAscName('')
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
                //               console.log(cell.row.original.ascId);
                //               setascId(cell.row.original.ascId)
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
                //               setascId(cell.row.original.ascId)
                //               setisActive(cell.row.original.ascId)
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

                              "documentPath",
                              'noOfProductLine',
                              "noOfDivision",
                              "noOfBranch",
                              "totalRows",
                              "divisionCodeList",
                              "productLineCodeList",
                              "branchCodeList",
                              "approvalRoleCode",
                              "wfAutoId",
                              "ascId",
                              "custCode",
                              "isGSTApplicable",
                              "cityId",
                              "pinId",
                              "documentType",
                              "isActive",
                              "stateId"

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

          {/* Add Technician*/}
          <Modal show={showAddTechnicianModal} onHide={handleCloseAddTechnicianModal} backdrop="static" centered size='xl'>
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
                        const skillsString = addTechnician?.skillId?.map(skill => skill.value).join(',');



                        let n = {
                          ...addTechnician,
                          divisionCode: divisionCodeString,
                          productLineCode: prodLineCodeString,
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
                                  setLoading(false)
                                  handleCloseAddTechnicianModal()
                                  //fetchAllTechnicians()

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
                              <Form.Control type='text' name='' value={selectedAscName} readOnly />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Technician Name <span className='req-t'>*</span></Form.Label>

                              <Form.Control type='text' name='technicianName' onChange={handleTechnicianChange} />

                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Mobile <span className='req-t'>*</span></Form.Label>
                              <Form.Control type='tel' name='mobile' onChange={techhandleMobileChange} />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>

                        </Row><Row className='mt-3'>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='tel' name='phoneNo' onChange={handleTechnicianChange} />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='technicianEmail' onChange={techhandleEmailChange} />
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
                                            console.log(filteredProdGroupCodes.toString(), '------------------------------')


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
                                  // value={addTechnician.productGroupCode}
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
                                  <option value="">Select</option>
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
          </Modal>



          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New ASC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Accordion activeKey={activeKey}>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>  <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>ASC Information</p><span> 
                      
                      <Button disabled={machineError} style={{backgroundColor:'transparent'}}>
                        <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      const addASCUrl = `${process.env.REACT_APP_API_URL}Asc/UpsertAsc`;

                      let divisionString = insertASC?.divisionCode?.map(item => item.value).toString()
                      let productLineString = insertASC?.productLineCode?.map(item => item.value).toString()

                      let n = {
                        ...insertASC,
                        divisionCode: divisionString,
                        productLineCode: productLineString,
                      };

                      // console.log("========================")
                      console.log(n);

                      const startDateObj = new Date(insertASC?.agreementStartDate);
                      const endDateObj = new Date(insertASC?.agreementEndDate);




                      // if (insertASC?.ascCode === "" || insertASC?.custCode === "" || insertASC?.name === "" || insertASC?.contactPersonName === "" || insertASC?.mobileNo === "" || insertASC?.emailId === "" || insertASC?.panNo === "" || insertASC?.agreementStartDate === "" || insertASC?.agreementEndDate === "" || insertASC?.securityDeposit === "" || insertASC?.hyAuditDate === "" || insertASC?.documentType == "" || insertASC?.ascAddress === "" || insertASC?.stateId === "" || insertASC?.cityId === "" || insertASC?.pinId === "") {
                      // if (insertASC?.ascCode === "" || insertASC?.custCode === "" || insertASC?.name === "" || insertASC?.contactPersonName === "" || insertASC?.mobileNo === "" || insertASC?.emailId === "" || insertASC?.aadharNo === "" || insertASC?.panNo === "" || insertASC?.agreementStartDate === "" || insertASC?.agreementEndDate === "" || insertASC?.securityDeposit === "" || insertASC?.hyAuditDate === "" || insertASC?.documentType == "" || insertASC?.ascAddress === "" || insertASC?.stateId === "" || insertASC?.cityId === "" || insertASC?.pinId === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill all the fields marked with red *!"
                      //   })
                      // }
                      // else if (insertASC?.divisionCode == [] || insertASC?.productLineCode == [] || insertASC?.branchCode === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill ASC Mapping data!"
                      //   })
                      // }

                      const ascCode = insertASC.ascCode;
                      if (!ascCode) {
                        Swal.fire({
                          icon: "error",
                          title: "Sap Asc Code is required."
                        });
                        return;
                      }
                      // const ascCodeRegex = /^[0-9]{3,20}$/;
                      // if (!ascCode.match(ascCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap asc Code must contain  between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      // else if (startDateObj > endDateObj) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Agreement end date cannot be lesser than Agreement start date!"
                      //   })
                      // }


                      // const sapCustCode = insertASC.custCode;
                      // if (!sapCustCode) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap Customer Code is required"
                      //   });
                      //   return;
                      // }
                      // const sapCustCodeRegex = /^[0-9]{3,20}$/;
                      // if (!sapCustCode.match(sapCustCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: " customer code must contain  only and be between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      const ascName = insertASC.name;
                      if (!ascName) {
                        Swal.fire({
                          icon: "error",
                          title: "ASC Name is required"
                        });
                        return;
                      }
                      const personalName = insertASC.contactPersonName;
                      if (!personalName) {
                        Swal.fire({
                          icon: "error",
                          title: "Personal Name is required"
                        });
                        return;
                      }

                      const mobileNo = insertASC.mobileNo;
                      // Check if mobileNo is provided
                      if (!mobileNo) {
                        Swal.fire({
                          icon: "error",
                          title: "Mobile number is required."
                        });
                        return;
                      }

                      const mobileNoRegex = /^\d{10}$/;

                      // Check if mobileNo matches the regex pattern
                      if (!mobileNoRegex.test(mobileNo)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter Correct Mobile Number."
                        });
                        return;
                      }


                      const emailId = insertASC.emailId;
                      const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

                      // Check if emailId is provided
                      if (!emailId) {
                        Swal.fire({
                          icon: "error",
                          title: "Email address is required."
                        });
                        return;
                      }

                      // Check if emailId matches the regex pattern
                      if (!emailId.match(emailIdRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid email address"
                        });
                        return;
                      }


                      const aadharNumber = insertASC.aadharNo; // Assuming aadharNumber is the variable containing Aadhar card number input value
                      const aadharRegex = /^\d{12}$/; // Regular expression for 12 digits
                      if (aadharNumber && !aadharNumber.match(aadharRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a Valid Aadhar card number consisting of 12 digits."
                        });
                        return;
                      }

                      const panNumber = insertASC.panNo;

                      // Check if PAN number is provided
                      if (!panNumber) {
                        Swal.fire({
                          icon: "error",
                          title: "PAN Number is required"
                        });
                        return;
                      }

                      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

                      // Check if PAN number matches the regex pattern
                      if (!panRegex.test(panNumber)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a valid PAN number"
                        });
                        return;
                      }









                      const isValidationRequired = insertASC.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                      const gstNumber = insertASC.gstNo;
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


                      const agreementStartDate = insertASC.agreementStartDate;
                      if (!agreementStartDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Agreement Start Date is required"
                        });
                        return;
                      }
                      const agreementEndDate = insertASC.agreementEndDate;
                      if (!agreementEndDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Aggrement End Date is required"
                        });
                        return;
                      }

                      const SequirityNu = insertASC.securityDeposit;

                      // Check if PAN number is provided
                      if (!SequirityNu) {
                        Swal.fire({
                          icon: "error",
                          title: "Security number is required"
                        });
                        return;
                      }

                      const SeqRegex = /[0-9]$/;

                      // Check if PAN number matches the regex pattern
                      if (!SeqRegex.test(SequirityNu)) {
                        Swal.fire({
                          icon: "error",
                          title: "Security Deposit should contain only numbers"

                        });
                        return;
                      }








                      const hyAuditDate = insertASC.hyAuditDate;
                      if (!hyAuditDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Audit Date is required"
                        });
                        return;
                      }

                      const typeofTicket =insertASC.typeOfTicketTobeHandeled;
                      if (!typeofTicket) {
                        Swal.fire({
                          icon: "error",
                          title: " Type of ticket to be handled is required."
                        });
                        return;
                      }


                      // const documentPath = insertASC.documentPath?.name;
                      // if (!documentPath) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please select a document"
                      //   });
                      // return;
                      // }

                      const address = insertASC.ascAddress;
                      if (!address) {
                        Swal.fire({
                          icon: "error",
                          title: "Address is required"
                        });
                        return;
                      }

                      const pinCode = insertASC.pinId;
                      const pinCodeRegex = /^\d{6}$/;
                      if (!pinCode || !pinCode.match(pinCodeRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a valid PIN code consisting of 6 digits."
                        });
                        return;
                      }

                      const stateName = insertASC.stateId; // Assuming stateId actually represents the state name

                      if (!stateName) {
                        Swal.fire({
                          icon: "error",
                          title: "State name is required"
                        });
                        return;
                      }

                      const cityName = insertASC.cityId; // Assuming stateId actually represents the state name
                      if (!cityName) {
                        Swal.fire({
                          icon: "error",
                          title: "city name is required"
                        });
                        return;
                      }



                      // const division = n.divisionCode;
                      // if (!division || division ===  'Select') {
                      //   Swal.fire({
                      //     icon: 'error',
                      //     title: 'Division is required',
                      //   });
                      //   return;
                      // }

                      // const productLineCodes = n.productLineCode
                      // if (!productLineCodes || productLineCodes === 'Select' ) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Product Line is required"
                      //   });
                      //   return;
                      // }

                      // const ascBranch = insertASC.branchCode;
                      // if (!ascBranch) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Branch is required"
                      //   });
                      //   return;
                      // }



                      else {

                        const formData = new FormData();
                        Object.keys(n).forEach(key => {
                          if (key === 'documentPath') {
                            formData.append(key, n[key]);
                          } else {
                            formData.append(key, n[key]);
                          }
                        });


                        (async () => {
                          try {
                            setLoading(true)
                            const response = await fetch(addASCUrl, {
                              method: "POST",
                              headers: {
                                // "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                              },
                              body: formData
                            });

                            if (response.ok) {
                              if (response.status === 200) {
                                const responseData = await response.text();
                                if (responseData === "ASCEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Asc already exists!"
                                  });
                                  setLoading(false)


                                }
                                else if (responseData === 'INVALIDPINCODE') {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Invalid pin code"
                                  });
                                  setLoading(false)


                                }
                                else {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  });
                                  // handleClose()
                                  fetchAllASC();
                                  setActiveKey('1')

                                  setShowASCMappingSaveIcon(true);
                                  setLoading(false)



                                  setuser((pre) => {
                                    return {
                                      ...pre,
                                      userId: editASC?.ascCode,
                                      userTypeCode: editASC?.custCode,
                                      userName: editASC?.name,
                                      branchCode: editASC?.branchCode,
                                      divisionCode: editASC?.divisionCode,
                                      productLineCode: editASC?.productLineCode,
                                      userEmailId: editASC?.emailId
                                    }
                                  })
                                }
                              }
                            } else {
                              const errorData = await response.json();
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
                              } else {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                              }
                              setLoading(false)

                            }
                          } catch (error) {
                            console.error('Error:', error);
                            Swal.fire({
                              icon: "error",
                              title: "Network error occurred!"
                            });
                            setLoading(false)

                          }
                        })();
                      }



                      // fetch(addASCUrl, {
                      //   method: "POST",
                      //   headers: {
                      //     // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                      //     "Authorization": `Bearer ${token}`
                      //   },
                      //   body: formData
                      // })
                      //   .then((res) => {
                      //     let resp = res.text()
                      //     resp.then((r) => {
                      //       console.log(r);
                      //       if (res.status == 200 && r != "ASCEXISTS") {
                      //         Swal.fire({
                      //           icon: "success",
                      //           title: "Saved successfully!"
                      //         })
                      //         // window.location.reload()
                      //         fetchAllASC()
                      //         console.log(insertASC?.ascCode);
                      //         setuser((pre) => {
                      //           return {
                      //             ...pre,
                      //             userId: insertASC?.ascCode,
                      //             userTypeCode: insertASC?.custCode,
                      //             userName: insertASC?.name,
                      //             branchCode: insertASC?.branchCode,
                      //             divisionCode: insertASC?.divisionCode,
                      //             productLineCode: insertASC?.productLineCode,
                      //             userEmailId: insertASC?.emailId
                      //           }
                      //         })

                      //         // console.log(insertASC?.productLineCode);

                      //       }
                      //       else if (res.status == 200 && r == "ASCEXISTS") {
                      //         Swal.fire({
                      //           icon: "warning",
                      //           title: "ASC already exists!"
                      //         })

                      //       }
                      //     })
                      //   })

                    }} />
                      </Button>

                    </span>

                  </div></Accordion.Header>
                  {
                    loading ? (<Loader />) : (

                      <Accordion.Body>
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>SAP ASC Code <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='ascCode'
                                onChange={handleChange}
                                placeholder=''
                                maxLength={12}

                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>SAP Customer Code <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='custCode'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>ASC Name <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='name'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Contact Person Name <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='contactPersonName'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Mobile No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='mobileNo'
                                onChange={handleMobileChange}

                                placeholder=''
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='emailId'
                                onChange={handleEmailChange}
                                placeholder=''
                                maxLength={100}
                              />
                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>AAdhar No.</Form.Label>
                              <Form.Control
                                type="number"
                                name='aadharNo'
                                onChange={handleChange}
                                placeholder=''
                                maxLength={20}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>PAN No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='panNo'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check type='checkbox' label="Is GST Applicable" onChange={(e) => {
                                console.log(e.target.checked);
                                setinsertASC((pre) => {
                                  return {
                                    ...pre,
                                    isGSTApplicable: e.target.checked
                                  }
                                })
                              }}

                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='emailId'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col> */}
                          {/* <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>AAdhar No.</Form.Label>
                              <Form.Control
                                type="number"
                                name='aadharNo'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col> */}
                          {/* <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>PAN No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='panNo'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col> */}
                          {/* <Col md={4} className='mt-4'>
                            <Form.Group className='mt-4'>
                              <Form.Check type='checkbox' label="Is GST Applicable" onChange={(e) => {
                                console.log(e.target.checked);
                                setinsertASC((pre) => {
                                  return {
                                    ...pre,
                                    isGSTApplicable: e.target.checked
                                  }
                                })
                              }} />

                            </Form.Group>
                          </Col> */}
                          {insertASC?.isGSTApplicable == true ? <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>GST No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='gstNo'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col> : ""}
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Agreement Start Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='agreementStartDate'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Agreement End Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='agreementEndDate'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Security Deposit <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='securityDeposit'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>HY Audit Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='hyAuditDate'
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>No.of technicians</Form.Label>
                              <Form.Control
                                type="number"
                                readOnly
                                value={0}
                                name='noOfTechnicians'
                                // onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                          <Form.Group>
                              <Form.Label>Type Of ticket to be handeled <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='typeOfTicketTobeHandeled' onChange={handleChange}>
                                <option value="">Select</option>
                               <option value="In Warranty">In Warranty</option>
                               <option value="Out of warranty">Out of warranty</option>
                               <option value="Both">Both</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Available Machines</Form.Label>
                              <Form.Control
                                type="text"
                                name='availableMachines'
                                onChange={availableHandleChange}
                                placeholder=''
                              />
                              {machineError && <div className="text-danger">{machineError}</div>}

                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>

                            <Form.Group>
                              <Form.Label>Document Type</Form.Label>
                              <Form.Select name='documentType' onChange={handleChange}>
                                <option value="">Select</option>
                                {
                                  documentType?.map((document, index) => {
                                    return (
                                      <>
                                        <option value={document?.parameterValId}>{document?.parameterText}</option>
                                      </>
                                    )
                                  })
                                }
                                {/* <option value="">Aadhar</option>
       <option value="">PAN</option>
       <option value="">GST</option>
       <option value="">Agreement Copy</option>
       <option value="">HY Audit report</option> */}
                              </Form.Select>
                            </Form.Group>


                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Select Document</Form.Label>
                              <Form.Control type='file'
                                accept=".png, .webp, .svg, .jpg, .jpeg, .gif, .pdf, .doc" // Specify accepted file types

                                onChange={(e) => {
                                  setinsertASC((pre) => {
                                    return {
                                      ...pre,
                                      documentPath: e.target.files[0]
                                    }
                                  })
                                  console.log(e.target.files[0]);
                                }} />
                            </Form.Group>

                          </Col>
                          <p className='mt-4'
                            style={{
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >ASC Address
                            <hr />
                          </p>

                          <Col md={12} className=''>
                            <Form.Group>
                              <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                as="textarea"
                                name='ascAddress'
                                onChange={handleChange}
                                rows={1}

                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Pin Code  <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="number"
                                name='pinId '
                                value={insertASC.pinId}
                                onChange={(e) => {
                                  const pinId = e.target.value;
                                  handlePinCodeChange(e)
                                  if (e.target.value && e.target.value?.length == 6) {
                                    setinsertASC(prevBranch => ({
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

                                          setinsertASC(prevBranch => ({
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
                                                  setinsertASC(prevBranch => ({
                                                    ...prevBranch,
                                                    // cityId: citiesResult[0]?.parameterTypeId
                                                  }));
                                                }
                                              }
                                            });
                                        } else {
                                          // Reset state and cities if pin code doesn't match
                                          setinsertASC(prevBranch => ({
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
                                            setinsertASC(prevBranch => ({
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
                                    setinsertASC((pre) => {
                                      return {
                                        ...pre,
                                        stateId: 0,
                                        cityId: 0
                                      }
                                    })
                                  }
                                }}
                                placeholder=''
                              />
                              {pinError && <span style={{ color: 'red' }}>{pinError}</span>}

                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>State <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='stateId' value={insertASC?.stateId} onChange={(e) => {
                                setinsertASC((pre) => {
                                  return {
                                    ...pre,
                                    stateId: e.target.value,
                                    pinId: ''

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
                              <Form.Select name='cityId' disabled value={insertASC?.cityId}
                                onChange={(e) => {
                                  setinsertASC((pre) => {
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
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>



                        </Row>
                      </Accordion.Body>
                    )}
                </Accordion.Item>

                <Accordion.Item eventKey='1'>
                  <Accordion.Header>  <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>ASC Mapping</p><span> <IoSave color='#7bc143' fontSize={20} style={{ display: showASCMappingSaveIcon ? 'none' : 'none' }} onClick={(e) => {

                      e.stopPropagation();
                      e.preventDefault();

                      const addASCUrl = `${process.env.REACT_APP_API_URL}Asc/UpsertAsc`;

                      let divisionString = insertASC?.divisionCode?.map(item => item.value).toString()
                      let productLineString = insertASC?.productLineCode?.map(item => item.value).toString()

                      let n = {
                        ...insertASC,
                        divisionCode: divisionString,
                        productLineCode: productLineString,
                      };

                      // console.log("========================")
                      console.log(n);




                      // if (insertASC?.ascCode === "" || insertASC?.custCode === "" || insertASC?.name === "" || insertASC?.contactPersonName === "" || insertASC?.mobileNo === "" || insertASC?.emailId === "" || insertASC?.aadharNo === "" || insertASC?.panNo === "" || insertASC?.agreementStartDate === "" || insertASC?.agreementEndDate === "" || insertASC?.securityDeposit === "" || insertASC?.hyAuditDate === "" || insertASC?.documentType == "" || insertASC?.ascAddress === "" || insertASC?.stateId === "" || insertASC?.cityId === "" || insertASC?.pinId === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill all the fields marked with red * in ASC Information!"
                      //   })
                      // }
                      // else if (insertASC?.divisionCode == [] || insertASC?.productLineCode == [] || insertASC?.branchCode === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill ASC Mapping data!"
                      //   })
                      // }

                      const ascCode = insertASC.ascCode;
                      if (!ascCode) {
                        Swal.fire({
                          icon: "error",
                          title: "Sap Asc Code is required."
                        });
                        return;
                      }
                      // const ascCodeRegex = /^[0-9]{3,20}$/;
                      // if (!ascCode.match(ascCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap asc Code must contain  between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      // else if (startDateObj > endDateObj) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Agreement end date cannot be lesser than Agreement start date!"
                      //   })
                      // }


                      // const sapCustCode = insertASC.custCode;
                      // if (!sapCustCode) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap Customer Code is required"
                      //   });
                      //   return;
                      // }
                      // const sapCustCodeRegex = /^[0-9]{3,20}$/;
                      // if (!sapCustCode.match(sapCustCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: " customer code must contain  only and be between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      const ascName = insertASC.name;
                      if (!ascName) {
                        Swal.fire({
                          icon: "error",
                          title: "ASC Name is required"
                        });
                        return;
                      }
                      const personalName = insertASC.contactPersonName;
                      if (!personalName) {
                        Swal.fire({
                          icon: "error",
                          title: "Personal Name is required"
                        });
                        return;
                      }

                      const mobileNo = insertASC.mobileNo;
                      // Check if mobileNo is provided
                      if (!mobileNo) {
                        Swal.fire({
                          icon: "error",
                          title: "Mobile number is required."
                        });
                        return;
                      }

                      const mobileNoRegex = /^\d{10}$/;

                      // Check if mobileNo matches the regex pattern
                      if (!mobileNoRegex.test(mobileNo)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter Correct Mobile Number."
                        });
                        return;
                      }


                      const emailId = insertASC.emailId;
                      const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

                      // Check if emailId is provided
                      if (!emailId) {
                        Swal.fire({
                          icon: "error",
                          title: "Email address is required."
                        });
                        return;
                      }

                      // Check if emailId matches the regex pattern
                      if (!emailId.match(emailIdRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid email address"
                        });
                        return;
                      }


                      const aadharNumber = insertASC.aadharNo; // Assuming aadharNumber is the variable containing Aadhar card number input value
                      const aadharRegex = /^\d{12}$/; // Regular expression for 12 digits
                      if (aadharNumber && !aadharNumber.match(aadharRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a Valid Aadhar card number consisting of 12 digits."
                        });
                        return;
                      }

                      const panNumber = insertASC.panNo;

                      // Check if PAN number is provided
                      if (!panNumber) {
                        Swal.fire({
                          icon: "error",
                          title: "PAN Number is required"
                        });
                        return;
                      }

                      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

                      // Check if PAN number matches the regex pattern
                      if (!panRegex.test(panNumber)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a valid PAN number"
                        });
                        return;
                      }









                      const isValidationRequired = insertASC.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                      const gstNumber = insertASC.gstNo;
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


                      const agreementStartDate = insertASC.agreementStartDate;
                      if (!agreementStartDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Agreement Start Date is required"
                        });
                        return;
                      }
                      const agreementEndDate = insertASC.agreementEndDate;
                      if (!agreementEndDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Aggrement End Date is required"
                        });
                        return;
                      }

                      const SequirityNu = insertASC.securityDeposit;

                      // Check if PAN number is provided
                      if (!SequirityNu) {
                        Swal.fire({
                          icon: "error",
                          title: "Security number is required"
                        });
                        return;
                      }

                      const SeqRegex = /[0-9]$/;

                      // Check if PAN number matches the regex pattern
                      if (!SeqRegex.test(SequirityNu)) {
                        Swal.fire({
                          icon: "error",
                          title: "Security Deposit should contain only numbers"

                        });
                        return;
                      }








                      const hyAuditDate = insertASC.hyAuditDate;
                      if (!hyAuditDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Audit Date is required"
                        });
                        return;
                      }

                      // const documentType = insertASC.documentType;
                      // if (!documentType) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: " DocumentType is required"
                      //   });
                      //   return;
                      // }

                      // const documentPath = insertASC.documentPath?.name;
                      // if (!documentPath) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please select a document"
                      //   });
                      // return;
                      // }

                      const address = insertASC.ascAddress;
                      if (!address) {
                        Swal.fire({
                          icon: "error",
                          title: "Address is required"
                        });
                        return;
                      }

                      const pinCode = insertASC.pinId;
                      const pinCodeRegex = /^\d{6}$/;
                      if (!pinCode || !pinCode.match(pinCodeRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a valid PIN code consisting of 6 digits."
                        });
                        return;
                      }

                      const stateName = insertASC.stateId; // Assuming stateId actually represents the state name

                      if (!stateName) {
                        Swal.fire({
                          icon: "error",
                          title: "State name is required"
                        });
                        return;
                      }

                      const cityName = insertASC.cityId; // Assuming stateId actually represents the state name
                      if (!cityName) {
                        Swal.fire({
                          icon: "error",
                          title: "city name is required"
                        });
                        return;
                      }












                      else {
                        const formData = new FormData();
                        Object.keys(n).forEach(key => {
                          if (key === 'documentPath') {
                            formData.append(key, n[key]);
                          } else {
                            formData.append(key, n[key]);
                          }
                        });

                        (async () => {
                          try {
                            setLoadings(true)
                            const response = await fetch(addASCUrl, {
                              method: "POST",
                              headers: {
                                // "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                              },
                              body: formData
                            });

                            if (response.ok) {
                              if (response.status === 200) {
                                const responseData = await response.text();
                                if (responseData === "ASCEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Asc already exists!"
                                  });
                                  setLoadings(false)

                                } else {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  });


                                  fetchAllASC();
                                  handleClose();
                                  setLoadings(false)
                                  setActiveKey('0')



                                  setuser((pre) => {
                                    return {
                                      ...pre,
                                      userId: editASC?.ascCode,
                                      userTypeCode: editASC?.custCode,
                                      userName: editASC?.name,
                                      branchCode: editASC?.branchCode,
                                      divisionCode: editASC?.divisionCode,
                                      productLineCode: editASC?.productLineCode,
                                      userEmailId: editASC?.emailId
                                    }
                                  })
                                }
                              }
                            } else {
                              const errorData = await response.json();
                              if (errorData && errorData.title === "One or more validation errors occurred.") {
                                // Construct error message from the error object
                                let errorMessage = "";
                                for (const key in errorData.errors) {
                                  errorMessage += `${errorData.errors[key][0]}\n`;
                                  Swal.fire({
                                    icon: "error",
                                    title: errorMessage
                                  });
                                }
                                setLoadings(false)



                              } else {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                              }
                            }
                          } catch (error) {
                            console.error('Error:', error);
                            Swal.fire({
                              icon: "error",
                              title: "Network error occurred!"
                            });
                            setLoadings(false)

                          }
                        })();
                      }












                      // else {


                      //   const formData = new FormData();
                      //   Object.keys(n).forEach(key => {
                      //     if (key === 'documentPath') {
                      //       formData.append(key, n[key]);
                      //     } else {
                      //       formData.append(key, n[key]);
                      //     }
                      //   });
                      //   fetch(addASCUrl, {
                      //     method: "POST",
                      //     headers: {
                      //       // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                      //       "Authorization": `Bearer ${token}`
                      //     },
                      //     body: formData
                      //   })
                      //     .then((res) => {
                      //       let resp = res.text()
                      //       resp.then((r) => {
                      //         console.log(r);
                      //         if (res.status == 200 && r != "ASCEXISTS") {
                      //           Swal.fire({
                      //             icon: "success",
                      //             title: "Saved successfully!"
                      //           })
                      //           // window.location.reload()
                      //           fetchAllASC()

                      //           setuser((pre) => {
                      //             return {
                      //               ...pre,
                      //               userId: insertASC?.ascCode,
                      //               userTypeCode: insertASC.custCode,
                      //               userName: insertASC?.name,
                      //               branchCode: insertASC?.branchCode,
                      //               divisionCode: insertASC?.divisionCode,
                      //               productLineCode: insertASC?.productLineCode,
                      //               userEmailId: insertASC?.emailId
                      //             }
                      //           })


                      //           // console.log(insertASC?.productLineCode);
                      //         }
                      //         else if (res.status == 200 && r == "ASCEXISTS") {
                      //           Swal.fire({
                      //             icon: "warning",
                      //             title: "ASC already exists!"
                      //           })

                      //         }
                      //       })
                      //     })
                      // }
                    }} /></span>

                  </div></Accordion.Header>
                  {
                    loadings ? (<Loader />) : (

                      <Accordion.Body>
                        <Row>
                          <Col md={4} className='mt-3'>

                            <Form.Group>
                              <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allDivisions}
                                disabled
                                value={insertASC.divisionCode}


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
                                      console.log(result);
                                      let prodLines = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));

                                      let filteredProdLineCodes = insertASC.productLineCode.filter((singleCode) => {
                                        if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                      })
                                      setinsertASC((pre) => {
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
                                disabled
                                value={insertASC.productLineCode}
                                onChange={function noRefCheck(e) {
                                  console.log(e);
                                  setinsertASC((pre) => {
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
                              {/* <Multiselect
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
            key: 'LT AC Motor'
        },
        {
            cat: 'Group 1',
            key: 'M3 Alternator'
    },
   
]}
showCheckbox
/> */}
                              <Form.Select name='branchCode' disabled onChange={handleChange}>
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
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          

                        </Row>
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                readOnly
                                value={user?.userId}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='' disabled onChange={(e) => {
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


                              </Form.Select>
                            </Form.Group>
                          </Col>

                        </Row>
                      </Accordion.Body>
                    )}
                </Accordion.Item>

                {/* <Accordion.Item eventKey="2">

                  <Accordion.Header>
                    <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                    >
                      <p className='m-0'>User Creation</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();



                        const addUserUrl = `${process.env.REACT_APP_API_URL}User/UpsertUser`;

                        let divisionString = insertASC?.divisionCode?.map(item => item.parameterTypeId).toString()
                        let productLineString = insertASC?.productLineCode?.map(item => item.parameterTypeId).toString()

                        let n = {
                          ...user,
                          divisionCode: divisionString,
                          productLineCode: productLineString,
                        };

                        // console.log("========================")
                        console.log(n);









                        //  console.log(user);



                        // if (user?.userId === "" || user?.roleCode === "") {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "Please fill all the fields marked with red *!"
                        //   })
                        // } 


                        const userTypeCode = user.userId;
                        if (!userTypeCode) {
                          Swal.fire({
                            icon: "error",
                            title: "please Enter UserID"
                          });
                          return;
                        }

                        // const roleName = user.roleCode;
                        // const roleNameRegex = /^[a-zA-Z\s]+$/;
                        // if (!roleName) {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: "User Role  is required!"
                        //   });
                        //   return;
                        // }
                        // if (!roleName.match(roleNameRegex)) {
                        //   Swal.fire({
                        //     icon: "error",
                        //     title: " User Role  must contain only alphabets!"
                        //   });
                        //   return;
                        // }








                        else {
                          // console.log(data);
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
                                if (res.status == 200 && r != "UEXISTS") {
                                  Swal.fire({
                                    icon: "success",
                                    title: "Saved successfully!"
                                  })
                                  handleClose()
                                  fetchAllASC()

                                }
                                else if (res.status == 200 && r == "UEXISTS") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "User already exists!"
                                  })

                                }
                              })
                            })
                        }



                      }} /></span>

                    </div>

                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                   
                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={user?.userId}
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className='mt-3'>
                        <Form.Group>
                          <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                          <Form.Select name='' onChange={(e) => {
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
                          

                          </Form.Select>
                        </Form.Group>
                      </Col>

                    </Row>
                  </Accordion.Body>
                </Accordion.Item> */}



              </Accordion>





              {/* <Row>
               
               
               
                <Col md={4}>
                <Form.Group>
                <Form.Label>Email</Form.Label>
        <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
            <Col md={4}>
                <Form.Group>
                <Form.Label>Mobile</Form.Label>
        <Form.Control
        type="tel"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Contact Person Name</Form.Label>
                <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>ASC Phone</Form.Label>
        <Form.Control
        type="tel"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
            <Col md={4}>
    <Form.Group>
  <Form.Label>ASC Address</Form.Label>
  <Form.Control
        as="textarea"
        rows={1}
        
        placeholder=''
        />
</Form.Group>
    </Col>

    <Col md={4}>
    <Form.Group>
  <Form.Label>PinCode</Form.Label>
  <Form.Control
       type='text'
        
        placeholder=''
        />
</Form.Group>
    </Col>
    <Col md={4}>
    <Form.Group>
  <Form.Label>Division</Form.Label>
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
  <Form.Label>Product Line</Form.Label>
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
  <Form.Label>PAN No.</Form.Label>
  <Form.Control
       type='text'
        
        placeholder=''
        />
</Form.Group>
    </Col>
    <Col md={4}>
    <Form.Group>
  <Form.Label>GST No.</Form.Label>
  <Form.Control
       type='text'
        
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








          {/* --------------------------------------------------------Edit--------------------------------------------------------------- */}






          <Modal show={show1} onHide={handleClose1} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit ASC</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>  <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>ASC Information</p><span> <IoSave color='#7bc143' fontSize={20} onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      const addASCUrl = `${process.env.REACT_APP_API_URL}Asc/UpsertAsc`;


                      let divisionString = editASC?.divisionCode?.map(item => item.value).toString()
                      let productLineString = editASC?.productLineCode?.map(item => item.value).toString()

                      let n = {
                        ...editASC,
                        divisionCode: divisionString,
                        productLineCode: productLineString,
                      };

                      // console.log("========================")
                      console.log(n);



                      const startDateObj = new Date(editASC?.agreementStartDate);
                      const endDateObj = new Date(editASC?.agreementEndDate);

                      // if (editASC?.ascCode === "" || editASC?.custCode === "" || editASC?.name === "" || editASC?.contactPersonName === "" || editASC?.mobileNo === "" || editASC?.emailId === "" || editASC?.panNo === "" || editASC?.agreementStartDate === "" || editASC?.agreementEndDate === "" || editASC?.securityDeposit === "" || editASC?.hyAuditDate === "" || editASC?.documentType == "" || editASC?.ascAddress === "" || editASC?.stateId === "" || editASC?.cityId === "" || editASC?.pinId === "") {
                      // if (insertASC?.ascCode === "" || insertASC?.custCode === "" || insertASC?.name === "" || insertASC?.contactPersonName === "" || insertASC?.mobileNo === "" || insertASC?.emailId === "" || insertASC?.aadharNo === "" || insertASC?.panNo === "" || insertASC?.agreementStartDate === "" || insertASC?.agreementEndDate === "" || insertASC?.securityDeposit === "" || insertASC?.hyAuditDate === "" || insertASC?.documentType == "" || insertASC?.ascAddress === "" || insertASC?.stateId === "" || insertASC?.cityId === "" || insertASC?.pinId === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill all the fields marked with red *!"
                      //   })
                      // }
                      // else if (insertASC?.divisionCode == [] || insertASC?.productLineCode == [] || insertASC?.branchCode === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill ASC Mapping data!"
                      //   })
                      // }


                      const ascCode = editASC.ascCode;
                      if (!ascCode) {
                        Swal.fire({
                          icon: "error",
                          title: "Sap Asc Code is required."
                        });
                        return;
                      }
                      // const ascCodeRegex = /^[0-9]{3,20}$/;
                      // if (!ascCode.match(ascCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap asc Code must contain  between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      // else if (startDateObj > endDateObj) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Agreement end date cannot be lesser than Agreement start date!"
                      //   })
                      // }


                      // const sapCustCode = insertASC.custCode;
                      // if (!sapCustCode) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Sap Customer Code is required"
                      //   });
                      //   return;
                      // }
                      // const sapCustCodeRegex = /^[0-9]{3,20}$/;
                      // if (!sapCustCode.match(sapCustCodeRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: " customer code must contain  only and be between 3 to 20 characters long."
                      //   });
                      //   return;
                      // }
                      const ascName = editASC.name;
                      if (!ascName) {
                        Swal.fire({
                          icon: "error",
                          title: "ASC Name is required"
                        });
                        return;
                      }
                      const personalName = editASC.contactPersonName;
                      if (!personalName) {
                        Swal.fire({
                          icon: "error",
                          title: "Personal Name is required"
                        });
                        return;
                      }

                      const mobileNo = editASC.mobileNo;
                      // Check if mobileNo is provided
                      if (!mobileNo) {
                        Swal.fire({
                          icon: "error",
                          title: "Mobile number is required."
                        });
                        return;
                      }

                      const mobileNoRegex = /^\d{10}$/;

                      // Check if mobileNo matches the regex pattern
                      if (!mobileNoRegex.test(mobileNo)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter Correct Mobile Number."
                        });
                        return;
                      }


                      const emailId = editASC.emailId;
                      const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

                      // Check if emailId is provided
                      if (!emailId) {
                        Swal.fire({
                          icon: "error",
                          title: "Email address is required."
                        });
                        return;
                      }

                      // Check if emailId matches the regex pattern
                      if (!emailId.match(emailIdRegex)) {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid email address"
                        });
                        return;
                      }


                      // const aadharNumber = editASC.aadharNo; // Assuming aadharNumber is the variable containing Aadhar card number input value
                      // const aadharRegex = /^\d{12}$/; // Regular expression for 12 digits
                      // if (aadharNumber && !aadharNumber.match(aadharRegex)) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please enter a Valid Aadhar card number consisting of 12 digits."
                      //   });
                      //   return;
                      // }

                      const panNumber = editASC.panNo;

                      // Check if PAN number is provided
                      if (!panNumber) {
                        Swal.fire({
                          icon: "error",
                          title: "PAN Number is required"
                        });
                        return;
                      }

                      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

                      // Check if PAN number matches the regex pattern
                      if (!panRegex.test(panNumber)) {
                        Swal.fire({
                          icon: "error",
                          title: "Please enter a valid PAN number"
                        });
                        return;
                      }

                      const isValidationRequired = editASC.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                      const gstNumber = editASC.gstNo;
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









                      // const isValidationRequired = editASC.isGSTApplicable; // Assuming checkboxState indicates whether validation is required
                      // const gstNumber = insertASC.gstNo;
                      // const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

                      // // Check if validation is required
                      // if (isValidationRequired) {
                      //   // Perform validation only if checkbox is checked
                      //   if (!gstNumber || !gstNumber.match(gstRegex)) {
                      //     Swal.fire({
                      //       icon: "error",
                      //       title: "GST number is required and enter a valid GST number."
                      //     });
                      //     return;
                      //   }
                      // }


                      const agreementStartDate = editASC.agreementStartDate;
                      if (!agreementStartDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Agreement Start Date is required"
                        });
                        return;
                      }
                      const agreementEndDate = editASC.agreementEndDate;
                      if (!agreementEndDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Aggrement End Date is required"
                        });
                        return;
                      }

                      const SequirityNu = editASC.securityDeposit;

                      // Check if PAN number is provided
                      if (!SequirityNu) {
                        Swal.fire({
                          icon: "error",
                          title: "Security number is required"
                        });
                        return;
                      }

                      const SeqRegex = /[0-9]$/;

                      // Check if PAN number matches the regex pattern
                      if (!SeqRegex.test(SequirityNu)) {
                        Swal.fire({
                          icon: "error",
                          title: "Security Deposit should contain only numbers"

                        });
                        return;
                      }








                      const hyAuditDate = editASC.hyAuditDate;
                      if (!hyAuditDate) {
                        Swal.fire({
                          icon: "error",
                          title: " Audit Date is required"
                        });
                        return;
                      }

                      const typeofTicket =editASC.typeOfTicketTobeHandeled;
                      if (!typeofTicket) {
                        Swal.fire({
                          icon: "error",
                          title: " Type of ticket to be handled is required."
                        });
                        return;
                      }


                      // const documentPath = insertASC.documentPath?.name;
                      // if (!documentPath) {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please select a document"
                      //   });
                      // return;
                      // }

                      const address = editASC.ascAddress;
                      if (!address) {
                        Swal.fire({
                          icon: "error",
                          title: "Address is required"
                        });
                        return;
                      }

                      const pinCode = editASC.pinId;
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





                      const stateName = editASC.stateId; // Assuming stateId actually represents the state name

                      if (!stateName) {
                        Swal.fire({
                          icon: "error",
                          title: "State name is required"
                        });
                        return;
                      }

                      const cityName = editASC.cityId; // Assuming stateId actually represents the state name
                      if (!cityName) {
                        Swal.fire({
                          icon: "error",
                          title: "city name is required"
                        });
                        return;
                      }





                      const formData = new FormData();
                      Object.keys(n).forEach(key => {
                        if (key === 'documentPath') {
                          formData.append(key, n[key]);
                        } else {
                          formData.append(key, n[key]);
                        }
                      });
                      (async () => {
                        try {
                          setLoading(true)
                          const response = await fetch(addASCUrl, {
                            method: "POST",
                            headers: {
                              // "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: formData
                          });

                          if (response.ok) {
                            if (response.status === 200) {
                              const responseData = await response.text();
                              if (responseData === "ASCEXISTS") {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Asc already exists!"
                                });
                                setLoading(false)

                              }
                              else if (responseData === 'INVALIDPINCODE') {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Invalid pin code"
                                });
                                setLoading(false)


                              }
                              else {
                                Swal.fire({
                                  icon: "success",
                                  title: "Update successfully!"
                                });
                                handleClose1();
                                fetchAllASC();
                                setLoading(false)


                                setedituser((pre) => {
                                  return {
                                    ...pre,
                                    userId: editASC?.ascCode,
                                    userTypeCode: editASC?.custCode,
                                    userName: editASC?.name,
                                    branchCode: editASC?.branchCode,
                                    divisionCode: editASC?.divisionCode,
                                    productLineCode: editASC?.productLineCode,
                                    userEmailId: editASC?.emailId
                                  }
                                })
                              }
                            }
                          } else {
                            const errorData = await response.json();
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

                            } else {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                          }
                        } catch (error) {
                          console.error('Error:', error);
                          Swal.fire({
                            icon: "error",
                            title: "Network error occurred!"
                          });
                          setLoading(false)

                        }
                      })();


                    }} />
                    </span>

                  </div></Accordion.Header>
                  {
                    loading ? (<Loader />) : (

                      <Accordion.Body>
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>SAP ASC Code <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='ascCode'

                                readOnly
                                value={editASC?.ascCode}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>SAP Customer Code</Form.Label>
                              <Form.Control
                                type="text"
                                name='custCode'
                                readOnly
                                value={editASC.custCode}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>ASC Name <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='name'
                                value={editASC?.name}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Contact Person Name <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='contactPersonName'
                                value={editASC?.contactPersonName}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Mobile No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='mobileNo'
                                value={editASC?.mobileNo}
                                onChange={EdithandleMobileChange}

                                placeholder=''
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Email <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="email"
                                name='emailId'
                                value={editASC?.emailId}
                                onChange={EdithandleEmailChange}
                                placeholder=''
                              />

                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>

                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>AAdhar No.</Form.Label>
                              <Form.Control
                                type="number"
                                name='aadharNo'
                                readOnly

                                value={editASC?.aadharNo}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>PAN No. <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='panNo'
                                readOnly
                                value={editASC?.panNo}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-4 pt-2'>
                            <Form.Group className='mt-3'>
                              <Form.Check
                                type='checkbox'
                                label="Is GST Applicable"
                                name='isGSTApplicable'
                                disabled

                                checked={editASC?.isGSTApplicable}
                                onChange={(e) => {
                                  console.log("Checkbox checked:", e.target.checked);
                                  console.log("Previous editASC:", editASC);
                                  seteditASC((prev) => ({
                                    ...prev,
                                    isGSTApplicable: e.target.checked,
                                    gstNo: e.target.checked ? prev.gstNo : '' // Clear gstNo if isGSTApplicable is false
                                  }));
                                }}
                              />
                            </Form.Group>
                          </Col>


                          {console.log("editASC.isGSTApplicable:", editASC.isGSTApplicable)} {/* Log the value of editASC.isGSTApplicable */}
                          {editASC.isGSTApplicable && (
                            <Col md={4} className='mt-3'>
                              <Form.Group>
                                <Form.Label>GST No. <span className='req-t'>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name='gstNo'
                                  readOnly
                                  value={editASC?.gstNo}
                                  onChange={handleChangeEdit}
                                  placeholder=''
                                />
                              </Form.Group>
                            </Col>
                          )}

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Agreement Start Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='agreementStartDate'
                                value={editASC?.agreementStartDate}
                                onChange={(e) => {
                                  const newDate = e.target.value;
                                  console.log(newDate, "***********************************");
                                  seteditASC(prevState => ({
                                    ...prevState,
                                    agreementStartDate: newDate // Update the hyAuditDate field in the state with the new date
                                  }));
                                }}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Agreement End Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='agreementEndDate'
                                value={editASC?.agreementEndDate}
                                onChange={(e) => {
                                  const newDate = e.target.value;
                                  console.log(newDate, "***********************************");
                                  seteditASC(prevState => ({
                                    ...prevState,
                                    agreementEndDate: newDate // Update the hyAuditDate field in the state with the new date
                                  }));
                                }}

                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Security Deposit <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name='securityDeposit'
                                value={editASC.securityDeposit}
                                onChange={handleChangeEdit}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>HY Audit Date <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name='hyAuditDate'
                                value={editASC?.hyAuditDate}
                                onChange={(e) => {
                                  const newDate = e.target.value;
                                  console.log(newDate, "***********************************");
                                  seteditASC(prevState => ({
                                    ...prevState,
                                    hyAuditDate: newDate // Update the hyAuditDate field in the state with the new date
                                  }));
                                }}
                              />





                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>No.of technicians</Form.Label>
                              <Form.Control
                                type="number"
                                readOnly
                                value={0}
                                name='noOfTechnicians'
                                // onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                          <Form.Group>
                              <Form.Label>Type Of ticket to be handeled <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='typeOfTicketTobeHandeled' value={editASC?.typeOfTicketTobeHandeled} onChange={(e)=>{
                                seteditASC((pre)=>{
                                  return{
                                    ...pre,
                                    typeOfTicketTobeHandeled:e.target.value
                                  }
                                })
                              }}>
                                <option value="">Select</option>
                               <option value="In Warranty">In Warranty</option>
                               <option value="Out of warranty">Out of warranty</option>
                               <option value="Both">Both</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Available Machines</Form.Label>
                              <Form.Control
                                type="text"
                                name='availableMachines'
                                value={editASC.availableMachines}
                                onChange={handleChange}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>

                            <Form.Group>
                              <Form.Label>Document Type</Form.Label>
                              <Form.Select name='documentType' value={editASC.documentType} onChange={handleChangeEdit}>
                                <option value="">Select</option>
                                {
                                  documentType?.map((document, index) => {
                                    return (
                                      <>
                                        <option value={document?.parameterValId}>{document?.parameterText}</option>
                                      </>
                                    )
                                  })
                                }
                                {/* <option value="">Aadhar</option>
       <option value="">PAN</option>
       <option value="">GST</option>
       <option value="">Agreement Copy</option>
       <option value="">HY Audit report</option> */}
                              </Form.Select>
                            </Form.Group>


                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Select Document</Form.Label>
                              <Form.Control type='file' name='documentPath'
                                accept=".png, .webp, .svg, .jpg, .jpeg, .gif, .pdf, .doc" // Specify accepted file types

                                onChange={(e) => {
                                  seteditASC((pre) => {
                                    return {
                                      ...pre,
                                      documentPath: e.target.files[0]
                                    }
                                  })
                                  console.log(e.target.files[0]);
                                }} />
                            </Form.Group>

                          </Col>
                          <p className='mt-4'
                            style={{
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >ASC Address
                            <hr />
                          </p>

                          <Col md={12} className=''>
                            <Form.Group>
                              <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                as="textarea"
                                name='ascAddress'
                                value={editASC.ascAddress}
                                onChange={handleChangeEdit}
                                rows={1}

                                placeholder=''
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>Pin Code  <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="number"
                                name='pinId '
                                value={editASC.pinId}
                                onChange={(e) => {
                                  EdithandlePinCodeChange(e)
                                  if (e.target.value && e.target.value?.length == 6) {
                                    seteditASC((pre) => {
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
                                        seteditASC((pre) => {
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
                                                seteditASC(prevBranch => ({
                                                  ...prevBranch,
                                                  // cityId:result[0]?.parameterTypeId
                                                }));
                                              }
                                            }
                                            else {
                                              // Reset state and cities if pin code doesn't match
                                              seteditASC(prevBranch => ({
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
                                            seteditASC(prevBranch => ({
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
                                    seteditASC((pre) => {
                                      return {
                                        ...pre,
                                        stateId: 0,
                                        cityId: 0
                                      }
                                    })
                                  }



                                }}
                                placeholder=''
                              />
                              {pinError && <span style={{ color: 'red' }}>{pinError}</span>}

                            </Form.Group>
                          </Col>



                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>State <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='stateId' value={editASC?.stateId} onChange={(e) => {
                                seteditASC((pre) => {
                                  return {
                                    ...pre,
                                    stateId: e.target.value,
                                    pinId: ''

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
                              <Form.Select name='cityId' disabled value={editASC?.cityId}
                                onChange={(e) => {
                                  seteditASC((pre) => {
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
                                {/* <option value=""></option> */}
                              </Form.Select>
                            </Form.Group>
                          </Col>



                        </Row>
                      </Accordion.Body>
                    )}
                </Accordion.Item>

                <Accordion.Item eventKey='1'>
                  <Accordion.Header>  <div className='d-flex w-100 justify-content-between align-items-center m-2 mt-0 mb-0 ms-0'
                  >
                    <p className='m-0'>ASC Mapping</p><span> <IoSave style={{ display: 'none' }} color='#7bc143' fontSize={20} onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      const addASCUrl = `${process.env.REACT_APP_API_URL}Asc/UpsertAsc`;
                      let divisionString = editASC?.divisionCode?.map(item => item.value).toString()
                      let productLineString = editASC?.productLineCode?.map(item => item.value).toString()

                      let n = {
                        ...editASC,
                        divisionCode: divisionString,
                        productLineCode: productLineString,
                      };

                      // console.log("========================")
                      console.log(n);

                      // if (insertASC?.ascCode === "" || insertASC?.custCode === "" || insertASC?.name === "" || insertASC?.contactPersonName === "" || insertASC?.mobileNo === "" || insertASC?.emailId === "" || insertASC?.aadharNo === "" || insertASC?.panNo === "" || insertASC?.agreementStartDate === "" || insertASC?.agreementEndDate === "" || insertASC?.securityDeposit === "" || insertASC?.hyAuditDate === "" || insertASC?.documentType == "" || insertASC?.ascAddress === "" || insertASC?.stateId === "" || insertASC?.cityId === "" || insertASC?.pinId === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill all the fields marked with red * in ASC Information!"
                      //   })
                      // }
                      // else if (insertASC?.divisionCode == [] || insertASC?.productLineCode == [] || insertASC?.branchCode === "") {
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Please fill ASC Mapping data!"
                      //   })
                      // }












                      const formData = new FormData();
                      Object.keys(n).forEach(key => {
                        if (key === 'documentPath') {
                          formData.append(key, n[key]);
                        } else {
                          formData.append(key, n[key]);
                        }
                      });

                      (async () => {
                        try {
                          setLoadings(true)
                          const response = await fetch(addASCUrl, {
                            method: "POST",
                            headers: {
                              // "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: formData
                          });

                          if (response.ok) {
                            if (response.status === 200) {
                              const responseData = await response.text();
                              if (responseData === "ASCEXISTS") {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Asc already exists!"
                                });
                                setLoadings(false)

                              }
                              else if (responseData === 'INVALIDPINCODE') {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Invalid pin code"
                                });
                                setLoadings(false)


                              }
                              else {
                                Swal.fire({
                                  icon: "success",
                                  title: "Update successfully!"
                                });
                                handleClose();
                                fetchAllASC();
                                setLoadings(false)


                                setedituser((pre) => {
                                  return {
                                    ...pre,
                                    userId: editASC?.ascCode,
                                    userTypeCode: editASC?.custCode,
                                    userName: editASC?.name,
                                    branchCode: editASC?.branchCode,
                                    divisionCode: editASC?.divisionCode,
                                    productLineCode: editASC?.productLineCode,
                                    userEmailId: editASC?.emailId
                                  }
                                })
                              }
                            }
                          } else {
                            const errorData = await response.json();
                            if (errorData && errorData.title === "One or more validation errors occurred.") {
                              // Construct error message from the error object
                              let errorMessage = "Validation Error: ";
                              for (const key in errorData.errors) {
                                errorMessage += `${errorData.errors[key][0]}\n`;
                              }
                              Swal.fire({
                                icon: "error",
                                title: errorMessage
                              });
                              setLoadings(false)

                            } else {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                              setLoadings(false)

                            }
                          }
                        } catch (error) {
                          console.error('Error:', error);
                          Swal.fire({
                            icon: "error",
                            title: "Network error occurred!"
                          });
                          setLoadings(false)

                        }
                      })();






                      // try {
                      //   fetch(addASCUrl, {
                      //     method: "POST",
                      //     headers: {
                      //       // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                      //       "Authorization": `Bearer ${token}`
                      //     },
                      //     body: formData
                      //   })
                      //     .then((res) => {
                      //       if (!res.ok) {
                      //         throw new Error("Network response was not ok");
                      //       }
                      //       return res.text();
                      //     })
                      //     .then((r) => {
                      //       console.log(r);
                      //       let res = r.text
                      //       if (res.status === 200 && res !== "ASCEXISTS") {
                      //         Swal.fire({
                      //           icon: "success",
                      //           title: "Saved successfully!"
                      //         });
                      //         // window.location.reload()
                      //         handleClose();
                      //         fetchAllASC();

                      //         setedituser((pre) => ({
                      //           ...pre,
                      //           userId: editASC?.ascCode,
                      //           userTypeCode: editASC?.custCode,
                      //           userName: editASC?.name,
                      //           branchCode: editASC?.branchCode,
                      //           divisionCode: editASC?.divisionCode,
                      //           productLineCode: editASC?.productLineCode,
                      //           userEmailId: editASC?.emailId
                      //         }));
                      //       } else if (res.status === 200 && r === "ASCEXISTS") {
                      //         Swal.fire({
                      //           icon: "warning",
                      //           title: "ASC already exists!"
                      //         });
                      //       }
                      //     });
                      // } catch (error) {
                      //   console.error("Error:", error);
                      //   Swal.fire({
                      //     icon: "error",
                      //     title: "Error"
                      //   });
                      //   // Handle the error here, e.g., display a message to the user or log it
                      // }


                    }} /></span>

                  </div></Accordion.Header>
                  {
                    loadings ? (<Loader />) : (

                      <Accordion.Body>
                        <Row>
                          <Col md={4} className='mt-3'>

                            <Form.Group>
                              <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                              <MultiSelect
                                options={allDivisions}
                                disabled
                                value={editASC.divisionCode}
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
                                      console.log("-----------ppp-----", result);
                                      let prodLines = result.map(division => ({ value: division.parameterTypeId, label: division.parameterType }));

                                      let filteredProdLineCodes = editASC.productLineCode.filter((singleCode) => {
                                        if (prodLines.find((pl) => pl.value === singleCode.value)) { return true }
                                      })
                                      seteditASC((pre) => {
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
                                disabled
                                value={editASC.productLineCode}
                                onChange={function noRefCheck(e) {
                                  console.log(e);
                                  seteditASC((pre) => {
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

                              <Form.Select value={editASC?.branchCode} name='branchName' disabled onChange={(e) => {
                                seteditASC((pre) => {
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
                        <Row>
                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User ID <span className='req-t'>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                readOnly
                                value={edituser?.userId}
                                placeholder=''
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className='mt-3'>
                            <Form.Group>
                              <Form.Label>User Role <span className='req-t'>*</span></Form.Label>
                              <Form.Select name='' disabled value={edituser.roleCode} onChange={(e) => {
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


                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    )}
                </Accordion.Item>

              </Accordion>





              {/* <Row>
               
               
               
                <Col md={4}>
                <Form.Group>
                <Form.Label>Email</Form.Label>
        <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
            <Col md={4}>
                <Form.Group>
                <Form.Label>Mobile</Form.Label>
        <Form.Control
        type="tel"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>Contact Person Name</Form.Label>
                <Form.Control
        type="text"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                <Form.Label>ASC Phone</Form.Label>
        <Form.Control
        type="tel"
        
        placeholder=''
        />
        </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
            <Col md={4}>
    <Form.Group>
  <Form.Label>ASC Address</Form.Label>
  <Form.Control
        as="textarea"
        rows={1}
        
        placeholder=''
        />
</Form.Group>
    </Col>

    <Col md={4}>
    <Form.Group>
  <Form.Label>PinCode</Form.Label>
  <Form.Control
       type='text'
        
        placeholder=''
        />
</Form.Group>
    </Col>
    <Col md={4}>
    <Form.Group>
  <Form.Label>Division</Form.Label>
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
  <Form.Label>Product Line</Form.Label>
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
  <Form.Label>PAN No.</Form.Label>
  <Form.Control
       type='text'
        
        placeholder=''
        />
</Form.Group>
    </Col>
    <Col md={4}>
    <Form.Group>
  <Form.Label>GST No.</Form.Label>
  <Form.Control
       type='text'
        
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
              <Modal.Title className='mdl-title'>Delete ASC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this ASC?


            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}Asc/DeleteAsc?ascId=${ascId}&isActive=${0}`;







                fetch(deleteAscUrl, {
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
                        fetchAllASC()

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
              <Modal.Title className='mdl-title'>Activate ASC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this ASC?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}Asc/DeleteAsc?ascId=${activeID}&isActive=${1}`;

                fetch(deleteAscUrl, {
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
                        fetchAllASC()


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
              <Modal.Title className='mdl-title'>De-activate ASC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this ASC?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}Asc/DeleteAsc?ascId=${activeID}&isActive=${0}`;

                fetch(deleteAscUrl, {
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
                      fetchAllASC()

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
                    //     fetchAllASC()

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




          <Modal show={showApprove} onHide={handleCloseApprove} backdrop="static" centered size='md'>
            <Modal.Header className='mdl-title'>Confirm Approval</Modal.Header>
            <Modal.Body>
              Do you want to approve this ASC?
            </Modal.Body>
            <Modal.Footer>
              <Button variant='' onClick={handleCloseApprove} className='cncl-Btn'>No</Button>
              <Button variant='' className='add-Btn' onClick={(e) => {
                e.preventDefault();

                let url = `${process.env.REACT_APP_API_URL}Asc/UpsertApprovalAsc`;


                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(AscApproval)
                })
                  .then((res) => {
                    if (res.status == 200) {
                      Swal.fire({
                        icon: "success",
                        title: "Approved Successfully!"
                      })
                      handleCloseApprove()
                      fetchAllASC()
                    }
                    else {
                      Swal.fire({
                        icon: "error",
                        title: "Something went wrong!"
                      })
                    }
                  })



              }}>Yes</Button>
            </Modal.Footer>
          </Modal>




        </Card>
    </>
  )
}

export default ASC