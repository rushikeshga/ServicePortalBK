import Multiselect from "multiselect-react-dropdown";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Accordion,
  Form,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import TestReport, {
  handleExportRows,
  handleExportRowsPdf,
} from "../CG/TestReport";
import { MaterialReactTable } from "material-react-table";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEdit, FaEye, FaFileCsv, FaRegEdit, FaSave } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { Box, IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import Select from "rc-select";
import Loader from "../loader";
import { usePathName } from "../../constants";
import OtpInput from "react-otp-input";
import moment from "moment";
import NavBar from "../CG/Navbar";
import { IoTicket } from "react-icons/io5";
import { TbDeviceMobileMessage } from "react-icons/tb";
import Footer from "../CG/footer";


function AddCustomer() {
  const navigate = useNavigate();
  const pathName = usePathName();
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

  const [CUSTResponse, setCUSTResponse] = useState("");

  // const [serialNo, setserialNo] = useState("")
  const [showDel, setShowDel] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);
  const [loading, setLoading] = useState(false);

  const [custAssetId, setcustAssetId] = useState("");

  const [custPhone, setCustPhone] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [customer, setAllCustomer] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [division, setDivision] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [allDivisions, setallDivisions] = useState([]);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [showEsclation, setShowEsclation] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({});
  const [showExistingTicket, setshowExistingTicket] = useState(false);
  const handleEsclationShow = () => {
    setShowEsclation(true);
  };
  //const [isNavigateToRegNewProduct,setIsNavigateToRegNewProduct] = useState(false);
  if (localStorage.getItem("isNavigateToRegNewProduct") == null) {
    localStorage.setItem("isNavigateToRegNewProduct", "refresh");
  }
  localStorage.setItem("isPageRefreshed", true);
  let token = localStorage.getItem("UserToken");



  // const [first, setfirst] = useState(second)
  // useEffect(() => {
  //   if (custPhone && custPhone.trim() !== '') {
  //     fetchData();
  //   }
  // }, [custPhone]);

  const [formData, setFormData] = useState({
    custAutoId: 0,
    custName: "",
    custPhone: "",
    custPhone2: "",
    custEmail: "",
    custAddess: "",
    stateId: 0,
    cityId: 0,
    stateName: "",
    cityName: "",
    pinId: "",
    isActive: true,
  });
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    // Update formData directly with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [addProductCustomer, setaddProductCustomer] = useState({
    custWiseAssetId: 0,
    custAutoId: 0,
    divisionCode: "",
    productLineCode: "",
    productGroupCode: "",
    productCode: "",
    productSerialNo: "",
    batch: "",
    warrantyStartDateBatch: "",
    warrantyEndDateBatch: "",
    invoiceNo: "",
    invoiceDate: "",
    warrantyStartDateInvoice: "2024-03-04",
    warrantyEndDateInvoice: "2025-03-04",
    warrantyStatus: false,
    informationSource: 0,
    dealerInvoiceNo: "",
    dealerInvoiceDate: "",
    isActive: true,
  });

  const handleShowExistingTicket = (msgCode) => {
    const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketByIdUnauthorize?ServiceTickeId=${msgCode}`;
    fetch(getProdDetailUrl)
      .then((res) => res.json())
      .then((result) => {
        //localStorage.setItem("ticketDetails", JSON.stringify(result));
        setTicketDetails(result[0]);
        console.log(result);
      });
    setshowExistingTicket(true);

  };
  const handleCloseExistingTicket = () => setshowExistingTicket(false);
  const handleEsclationClose = () => setShowEsclation(false);
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://idserviceportal.cgglobal.com:86/api/Customer/GetAllCustomer?CustPhone=${custPhone}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch customer details');
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     if (data.length > 0) {
  //       const customer = data[0];
  //       const { custName, custPhone, custPhone2, custEmail, custAddess, stateName, cityName, pinId, stateId, cityId, custAutoId } = customer;
  //       console.log(data, "------------")

  //       setcustAutoId(data[0]?.custAutoId)
  //       setFormData((pre) => {
  //         return {
  //           ...pre,
  //           custName: custName,
  //           custAutoId: custAutoId,
  //           custPhone: custPhone,
  //           custPhone2: custPhone2,
  //           custEmail: custEmail,
  //           custAddess: custAddess,
  //           stateId: stateId,
  //           cityId: cityId,
  //           stateName: stateName,
  //           cityName: cityName,
  //           pinId: pinId
  //         }
  //       });

  //       console.log("------", activeKey)

  //     } else {
  //       setShowErrorModal(true);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching customer details:', error);
  //     setShowErrorModal(true);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // if (custPhone?.length > 10 || custPhone?.length < 10) {
  //   //   Swal.fire({
  //   //     icon: "error",
  //   //     title: "Invalid Phone Number",
  //   //     text: "It should be of 10 digits!"
  //   //   })
  //   // }
  //   // else {
  //   //   setLoading(true)
  //   //   fetch(`http://idserviceportal.cgglobal.com:86/api/Customer/GetAllCustomer?CustPhone=${custPhone}`, {
  //   //     headers: {
  //   //       'Authorization': `Bearer ${token}`
  //   //     }
  //   //   })
  //   //     .then((res) => res.json())
  //   //     .then((result) => {
  //   //       console.log(result);

  //   //       if (result.length > 0) {
  //   //         setFormData((pre) => {
  //   //           return {
  //   //             ...pre,
  //   //             custName: result[0]?.custName,
  //   //             custAutoId: result[0]?.custAutoId,
  //   //             custPhone: result[0]?.custPhone,
  //   //             custPhone2: result[0]?.custPhone2,
  //   //             custEmail: result[0]?.custEmail,
  //   //             custAddess: result[0]?.custAddess,
  //   //             stateId: result[0]?.stateId,
  //   //             cityId: result[0]?.cityId,
  //   //             stateName: result[0]?.stateName,
  //   //             cityName: result[0]?.cityName,
  //   //             pinId: result[0]?.pinId
  //   //           }
  //   //         })
  //   //         setLoading(false)

  //   //       }
  //   //       else {
  //   //         setFormData((pre) => {
  //   //           return {
  //   //             ...pre,
  //   //             custName: "",
  //   //             custPhone: custPhone,
  //   //             custPhone2: "",
  //   //             custEmail: "",
  //   //             custAddess: "",
  //   //             stateId: "",
  //   //             cityId: "",
  //   //             stateName: "",
  //   //             cityName: "",
  //   //             pinId: ""
  //   //           }
  //   //         })
  //   //       }
  //   //       setActiveKey("1")
  //   //       setLoading(false)
  //   //       console.log(activeKey);

  //   //     })

  //   // }

  //   // else{
  //   setotpSent(true);
  //   const currentTime = new Date();
  //   const expiry = new Date(currentTime.getTime() + 15 * 60000); // 15 minutes in milliseconds
  //   setExpiryTime(expiry);

  //   // }
  // };
  const [MobileNo, setMobileNo] = useState('')
  const [verificationError, setVerificationError] = useState("");
  const [allProducts, setallProducts] = useState([])


  const handleSubmit = () => {
    // Validate mobile number

    localStorage.setItem("CustomerMobile", MobileNo)
    if (!MobileNo) {
      setMobileError("Please enter a mobile number.");
      return;
    }
    fetch(`http://idserviceportal.cgglobal.com:9095/api/ProdCustInfo/UpsertCustVerification?MobileNo=${MobileNo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ MobileNo }),
    })
      .then((response) => response.json())
      // console.log(response,"----------")
      .then((data) => {
        // Handle successful response
        console.log(data)

        // setMobileNo(data)
        setotpSent(true);
        const currentTime = new Date();
        const expiry = new Date(currentTime.getTime() + 15 * 60000); // 15 minutes in milliseconds
        setExpiryTime(expiry);
      })
      .catch((error) => {
        // Handle error
        setVerificationError("Failed to send OTP. Please try again.");
      });
  };
  let isalreadyVerified = localStorage.getItem("otpVerified");
  const [otpVerified, setOtpVerified] = useState(isalreadyVerified);
  // const history = useHistory();

  useEffect(() => {

    if (localStorage.getItem("otpVerified")) {
      setallProductsData();
    }

    //localStorage.setItem(JSON.stringify(data));
  }, [])

  const location = useLocation();
  const isInitialMount = useRef(true);

  // useEffect(() => {
  //   const removeotpKeys = () => {
  //     // Handle back button click
  //     console.log('Back button clicked');
  //     localStorage.removeItem("otpVerified");
  //     localStorage.removeItem("otp");
  //     localStorage.removeItem("allProducts");
  //   };

  //   const handlePopState = () => {
  //     // Handle back button click
  //     if(localStorage.getItem("isNavigateToRegNewProduct") == "regNewProd"){
  //       localStorage.setItem("isNavigateToRegNewProduct","refresh");
  //     }
  //     else{
  //       window.removeEventListener('popstate', handlePopState);
  //       removeotpKeys();
  //     }


  //   };

  //   if (isInitialMount.current) {
  //     window.addEventListener('popstate', handlePopState);
  //     isInitialMount.current = false;
  //   }


  //   return () => {
  //     // if(localStorage.getItem("isNavigateToRegNewProduct") != "regNewProd"){
  //     //   removeotpKeys();
  //     // }
  //     //isInitialMount.current = false;
  //     //window.removeEventListener('popstate', handlePopState);

  //   };
  // }, []);
  const setallProductsData = () => {

    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfo?MobileNo=${localStorage.getItem("CustomerMobile")}&VerificationOTP=${localStorage.getItem("otp")}&mode=1`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0 && data[0].msgCode === "002") {
          Swal.fire({
            icon: "warning",
            title: "Invalid OTP. Please try again.",
          });
          setLoading(false)
        } else {
          // Swal.fire({
          //   icon: "success",
          //   title: "OTP Verified",
          // });
          setLoading(false)

          setallProducts(data);
          //localStorage.setItem("allProducts",JSON.stringify(data));
          localStorage.setItem("otp", otp);

          setOtpVerified(true);
          localStorage.setItem("otpVerified", true);
          // setActiveKey("1");
          setRemainingTime(null);
          // setotpSent(false);


          // setVerificationError(""); 
          // Clear any previous error message
          // You can redirect the user to the next step or show a success message
        }
      })
      .catch((error) => {
        setVerificationError("Invalid OTP. Please try again.");
        setLoading(false)
      });
  };
  const handleVerifyOTP = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfo?MobileNo=${MobileNo}&VerificationOTP=${otp}&mode=1`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0 && data[0].msgCode === "002") {
          Swal.fire({
            icon: "warning",
            title: "Invalid OTP. Please try again.",
          });
          setLoading(false)

        } else {
          // Swal.fire({
          //   icon: "success",
          //   title: "OTP Verified",
          // });
          setLoading(false)

          setallProducts(data);
          //localStorage.setItem("allProducts",JSON.stringify(data));
          localStorage.setItem("otp", otp);
          setOtpVerified(true);
          localStorage.setItem("otpVerified", true);
          // setActiveKey("1");
          setRemainingTime(null);
          // setotpSent(false);


          // setVerificationError(""); 
          // Clear any previous error message
          // You can redirect the user to the next step or show a success message
        }
      })
      .catch((error) => {
        setVerificationError("Invalid OTP. Please try again.");
        setLoading(false)

      });
  };
  const handleFetch = () => {
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfo?MobileNo=${MobileNo}&VerificationOTP=${0}&mode=2`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setallProducts(data);

      })
      .catch((error) => {
        setVerificationError("Invalid OTP. Please try again.");
      });
  };



  const handleChange = (e) => {
    setCustPhone(e.target.value);
    // setFormData((pre) => {
    //   return {
    //     ...pre,
    //     custPhone: e.target.value
    //   }
    // })
    // setSelectedState(e.target.value);
  };

  const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=3&Id=0&Code=0`;

  useEffect(() => {
    fetch(stateUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result);
      });
  }, []);
  useEffect(() => {
    const fetchCustomerOption = `${process.env.REACT_APP_API_URL}Customer/GetAllCustomer`;

    fetch(fetchCustomerOption, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCustomer(result);
      });
  }, []);



  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pinError, setpinError] = useState("");

  const handleMobileChange = (e) => {
    // const { value } = e.target
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);

    console.log(value)
    setMobileNo(value);

    // console.log(value);
    const validateMobile = (mobile) => {
      // Basic mobile number validation regex
      const regex = /^[5-9]{1}[0-9]{9}$/;
      return regex.test(mobile);
  };


    if ((!validateMobile(value) && value !== "") || parseInt(value).toString().length <10) {
      setMobileError("Invalid mobile number");
    } else {
      setMobileError("");
    }


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
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    setFormData((prevState) => ({
      ...prevState,
      custEmail: value,
    }));
  };
  const handlePinCodeChange = (e) => {
    // const { value } = e.target;
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);

    // console.log(value);

    const validatePincode = (pinCode) => {
      // Basic mobile number validation regex
      const regex = /^\d{6}$/;
      return regex.test(pinCode);
    };

    if (!validatePincode(value) && value !== "") {
      setpinError("Invalid PinCode. It must be 6 digits only");
    } else {
      setpinError("");
    }

    setproductData((prevState) => ({
      ...prevState,
      pinCode: value,
      pinId: value
    }));
  };

  const handleSubmitForm = (e) => {
    console.log(CUSTResponse);
    e.preventDefault();

    const addUserUrl = `${process.env.REACT_APP_API_URL}Customer/UpsertCustomer`;

    let n = {
      ...formData,
    };

    console.log(n);

    setaddProductCustomer((pre) => {
      return {
        ...pre,
        custAutoId: n?.custAutoId,
      };
    });

    //  console.log(user);

    if (
      formData?.custName === "" ||
      formData.custEmail === "" ||
      formData?.custAddess === "" ||
      formData?.pinId === "" ||
      formData?.stateId === "" ||
      formData?.cityId === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill all the fields marked with red *!",
      });
    }

    const custName = formData.custName; // Assuming stateId actually represents the state name

    if (!custName) {
      Swal.fire({
        icon: "error",
        title: "Customer Name is required",
      });
      return;
    }

    const mobileNo = formData.custPhone;
    if (!mobileNo) {
      Swal.fire({
        icon: "error",
        title: "Mobile number is required.",
      });
      return;
    }

    const mobile = formData.custPhone;
    const mobileRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)
    if (mobile && !mobile.match(mobileRegex)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Correct Mobile Number.",
      });
      return;
    }

    const SecondaryMOb = formData.custPhone2;
    const mobileeRegex = /^\d{10}$/; // This regex ensures phone contains exactly 10 digits (0-9)
    if (SecondaryMOb && !SecondaryMOb.match(mobileeRegex)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Correct Secondary Mobile Number.",
      });
      return;
    }

    const address = formData.custAddess; // Assuming stateId actually represents the state name
    if (!address) {
      Swal.fire({
        icon: "error",
        title: "Address is required",
      });
      return;
    }

    const pinCode = formData.pinId;
    if (!pinCode) {
      Swal.fire({
        icon: "error",
        title: "Pin Code is required",
      });
      return;
    }
    const pinCodeRegex = /^\d{6}$/;
    if (typeof pinCode !== "number" && !pinCodeRegex.test(pinCode.toString())) {
      console.error("Invalid PIN code:", pinCode);
      Swal.fire({
        icon: "error",
        title: "Please enter a valid PIN code consisting of 6 digits.",
      });
      return;
    }

    const stateName = formData.stateId; // Assuming stateId actually represents the state name

    if (!stateName) {
      Swal.fire({
        icon: "error",
        title: "State name is required",
      });
      return;
    }

    const cityName = formData.cityId; // Assuming stateId actually represents the state name
    if (!cityName) {
      Swal.fire({
        icon: "error",
        title: "city name is required",
      });
      return;
    }

    // console.log(data);

    if (CUSTResponse == "") {
      setLoading(true);
      fetch(addUserUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(n),
      }).then((res) => {
        let resp = res.text();
        resp.then((r) => {
          console.log(r);
          setCUSTResponse(r);
          if (res.status == 200 && r != "CUEXISTS") {
            Swal.fire({
              icon: "success",
              title: "Saved successfully!",
            });
            setLoading(false);

            setActiveKey("2");
          } else if (res.status == 200 && r == "CUEXISTS") {
            Swal.fire({
              icon: "warning",
              title: "Customer already exists!",
            });
            setActiveKey("2");
            setLoading(false);
          }
        });
      });
    } else {
      setActiveKey("2");
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=14&Code=0`;
  //   fetch(getAllDivisions, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallDivisions(result)
  //     })
  // }, [])

  useEffect(() => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=14&Code=0`;
    fetch(getAllDivisions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result);
      });
  }, []);

  useEffect(() => {
    if (serialNumber) {
      // Define your headers here
      const headers = {
        Authorization: `Bearer ${token}`, // Example: Bearer token
        // Add any other headers as needed
      };

      // Make API call to retrieve division based on serial number
      fetch(
        `${process.env.REACT_APP_API_URL}CustomerAssets/GetCustomerAssestBySerialNo?SerialNo=${serialNumber}`,
        {
          method: "GET",
          headers: headers, // Include headers here
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Assuming API response contains division
          setDivision(data.divisionCode);

          // setaddProductCustomer((pre)=>{
          //   return{
          //     ...pre,

          //   }
          // })
          console.log(",,,,,,,,,,", data);
          console.log(data.title);

          // if(data.title==="Not Found"){
          //   Swal.fire({
          //     icon:"warning",
          //     title:"Does not exist"
          //   })
          // }

          setaddProductCustomer((pre) => {
            return {
              ...pre,
              divisionCode: data?.divisionCode,
              productLineCode: data?.productLineCode,
              productGroupCode: data?.productGroupCode,
              productCode: data?.productCode,
              productSerialNo: data?.productSerialNo,
              batch: data?.batch,
              warrantyStartDateBatch:
                data?.warrantyStartDateBatch?.split("T")[0],
              warrantyEndDateBatch: data?.warrantyEndDateBatch?.split("T")[0],
              // warrantyStartDateInvoice:data?.warrantyStartDateInvoice?.split("T")[0],
              // warrantyEndDateInvoice:data?.warrantyEndDateInvoice?.split("T")[0],
              dealerInvoiceNo: data?.dealerInvoiceNo,
              dealerInvoiceDate: data?.dealerInvoiceDate?.split("T")[0],
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle error
        });
    }
  }, [serialNumber]);

  const handleSerialNumber = (event) => {
    console.log(event, "------------------event-----------");
    // setaddProductCustomer((pre) => {
    //   return {
    //     ...pre,
    //     setSerialNumber: event.target.value
    //   }

    // })
    setSerialNumber(event.target.value);
  };
  const handleDivisionChange = (event) => {
    setDivision(event.target.value);
  };

  const handleInvoiceNumberChange = (event) => {
    setInvoiceNumber(event.target.value);
  };

  const handleSubmitSerialNumber = async (e) => {
    e.preventDefault();

    // if (!serialNumber || !division || !invoiceNumber) {
    //   // Validation: Ensure required fields are filled
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Please fill all the fields marked with red *!.'
    //   });
    //   return;
    // }

    // const data = {

    //   serialNumber: serialNumber,
    //   divisionCode: division,
    //   invoiceNumber: invoiceNumber
    // };

    // try {
    // const response = await

    const serialNumberr = serialNumber; // Assuming stateId actually represents the state name
    if (!serialNumberr) {
      Swal.fire({
        icon: "error",
        title: "Serial number is required",
      });
      return;
    }

    const divisionn = division; // Assuming stateId actually represents the state name

    if (!divisionn || divisionn === "Select") {
      Swal.fire({
        icon: "error",
        title: "Division is required",
      });
      return;
    }

    // const Invoice = addProductCustomer.dealerInvoiceNo; // Assuming stateId actually represents the state name

    // if (!Invoice) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invoice is required"
    //   });
    //   return;
    // }
    else {
      setLoading(true);

      fetch(
        `${process.env.REACT_APP_API_URL}CustomerAssets/UpsertCustomerAsset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include any authorization header if required
          },
          body: JSON.stringify(addProductCustomer),
        }
      ).then((res) => {
        let resp = res.text();
        resp.then((r) => {
          // console.log(r.includes(null));
          if (res.status == 200 && r != "CUSTASSETEXISTS") {
            Swal.fire({
              icon: "success",
              title: "Saved successfully!",
            });
            // window.location.reload()
            getAllAssets();
            // setActiveKey("2")
          }
          if (res.status == 200 && r == "CUSTASSETEXISTS") {
            Swal.fire({
              icon: "warning",
              title: "Customer Asset already exists!",
            });
            getAllAssets();
            // setActiveKey("2")
            setLoading(false);
          } else if (res.status == 200 && r == "INVALIDPINCODE") {
            Swal.fire({
              icon: "warning",
              title: "Invalid pin code",
            });
            getAllAssets();
            // setActiveKey("2")
            setLoading(false);
          } else if (res.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Not Found!",
            });
            getAllAssets();
            // setActiveKey("2")
            setLoading(false);
          }
        });
      });
    }

    // const r = await response.text();
    // if (response.ok) {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: 'Data saved successfully!'
    //   });
    //   // Optionally reset the form fields after successful submission
    //   setSerialNumber('');
    //   setDivision('');
    //   setInvoiceNumber('');
    // }
    //   else if (response.status === 200 && r === "UEXISTS") {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Warning',
    //       text: 'User already exists!'
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: 'Failed to save data. Please try again later.'
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error saving data:", error);
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'An error occurred while saving data. Please try again later.'
    //   });
    // }
  };

  const [allAssets, setallAssets] = useState([]);

  const [custAutoId, setcustAutoId] = useState("");

  const getAllAssets = () => {
    const getAllCustAssetUrl = `${process.env.REACT_APP_API_URL
      }CustomerAssets/GetAllCustomerAssest?CustAutoId=${custAutoId}&ProductSerialNo=${0}`;

    fetch(getAllCustAssetUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallAssets(result);
      });
  };

  useEffect(() => {
    getAllAssets();
  }, [custAutoId]);


  const [otp, setOtp] = useState("");

  const [otpSent, setotpSent] = useState(false);

  const [expiryTime, setExpiryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // const handleButtonClick = () => {

  // };

  useEffect(() => {
    let intervalId;

    if (expiryTime) {
      intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= expiryTime) {
          clearInterval(intervalId);
          setExpiryTime(null);
          setotpSent(false);
          setCustPhone("");
          setRemainingTime(null);
        } else {
          const remaining = Math.floor((expiryTime - currentTime) / 1000);
          setRemainingTime(remaining);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [expiryTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes & ${seconds < 10 ? "0" : ""}${seconds} seconds`;
  };


  const [isEditing, setisEditing] = useState(false)
  const [editIndex, seteditIndex] = useState(null)

  // const [allProducts, setallProducts] = useState([
  //   {
  //     srNo: "1234",
  //     division: "LT Motors",
  //     custName: "Mehul R",
  //     siteAddress: "Pune",
  //     pinCode: "411001",
  //     state: "20",
  //     city: "353",
  //     mobile: "9099960633",
  //     invoiceNumber: "INV76527",
  //     invoiceDate: "07-05-2024",

  //     quantity: "1",
  //     warrantystatus: true,
  //   },
  //   {
  //     srNo: "32121",
  //     division: "FHP Motors",
  //     custName: "Pawan",
  //     siteAddress: "Mumbai",
  //     pinCode: "401203",
  //     state: "20",
  //     city: "346",
  //     mobile: "8625288387",
  //     invoiceNumber: "INV867283",
  //     invoiceDate: "04-05-2024",

  //     quantity: "1",
  //     warrantystatus: true,
  //   }
  // ])

  const handleProductChangeEdit = (e) => {
    const newdata = { ...productData };
    newdata[e.target.name] = e.target.value;
    setproductData(newdata);
    console.log(newdata);
  }


  const [productData, setproductData] = useState({
    prodRegAutoId: 0,
    ticketAutoId: 0,
    customerName: "",
    contactPerson: "",
    primaryMobileNo: "",
    altEmailId: "",
    siteAddress: '',
    cityName: "",
    pinId: "",
    pinCode: '',
    stateName: "",
    serialNo: "",
    divCode: "",
    invoiceNo: "",
    invoiceDate: moment().format("YYYY-MM-DD"),
    divisionName: "",
    cityId: 0,
    stateId: 0,
    warrantyStatus: ""

  });
  // console.log('productData:', productData);

  const [cityID, setCityID] = useState('')
  // useEffect(() => {
  //   const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize/GetAll?mode=4&Id=${productData.stateId ? productData.stateId : 0}&Code=0`;
  //   fetch(cityUrl, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setcities(result)
  //     })



  //   // setCityID(productData.cityId)
  // }, []);

  // console.log(cityID)

  const handleEditClick = (id, i) => {
    setProdRegAutoID(id); // Set ProdRegAutoId state with the ID of the product being edited
    setisEditing(true);
    seteditIndex(i);

    // Fetch product data for the specified ID
    const getSingleBranch = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfoById?ProdRegAutoId=${id}`;
    fetch(getSingleBranch, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        // Update productData state with the fetched data
        setproductData((pre) => ({
          ...pre,
          prodRegAutoId: result?.prodRegAutoId,
          ticketAutoId: result?.ticketAutoId,
          customerName: result?.customerName,
          contactPerson: result?.contactPerson,
          divCode: result?.divCode,
          serialNo: result?.serialNo,
          siteAddress: result?.siteAddress,
          pinCode: result?.pinCode,
          pinId: result?.pinCode,
          // pinCode:res
          stateId: result?.stateId,
          cityId: result?.cityId,
          primaryMobileNo: result?.primaryMobileNo,
          altEmailId: result?.altEmailId,
          invoiceNo: result?.invoiceNo,
          warrantyStatus: result?.warrantyStatus,
          invoiceDate: result?.invoiceDate
          // remarks: result?.remarks,
        }));

        // Fetch city data based on the stateId
        if (result?.stateId) {
          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.stateId}&Code=0`;
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
                  setproductData(prevBranch => ({
                    ...prevBranch,
                    // cityId:result[0]?.parameterTypeId
                  }));
                }
              }
              else {
                // Reset state and cities if pin code doesn't match
                setproductData(prevBranch => ({
                  ...prevBranch,
                  stateId: 0,
                  cityId: 0
                }));
                setcities('');
              }

              // setcities(result)
            });





          // fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value}&Code=0`, {
          //   headers: {
          //     "Authorization": `Bearer ${token}`
          //   }
          // })
          //   .then((res) => res.json())
          //   .then((result) => {
          //     console.log(result[0]);
          //     if (Array.isArray(result)) {
          //       setcities(result);
          //       if (result.length > 0) {
          //         setproductData(prevBranch => ({
          //           ...prevBranch,
          //           cityId: result[0]?.parameterTypeId
          //         }));
          //       }
          //     }
          //     else {
          //       setcities([]);
          //     }
          //   });


        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };


  const [prodRegAutoId, setProdRegAutoID] = useState("")

  // useEffect(() => {
  //   if (ProdRegAutoId) {
  //     const getSingleBranch = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfoById?ProdRegAutoId=${ProdRegAutoId}`;
  //     fetch(getSingleBranch, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         setproductData(result); // Update productData state with the fetched data
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //       });
  //   }
  // }, [ProdRegAutoId]);





  const handleSaveClick = () => {
    const updatedProductData = { ...productData, prodRegAutoId: prodRegAutoId };
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/UpdateProdCustInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedProductData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data updated successfully:', data);
        Swal.fire({
          icon: "success",
          title: "Updated successfully!"
        })
        setisEditing(false);

        // setallProducts(data)

        handleFetch()

        setproductData({
          prodRegAutoId: 0,
          ticketAutoId: 0,
          customerName: "",
          contactPerson: "",
          primaryMobileNo: "",
          altEmailId: "",
          siteAddress: '',
          cityName: "",
          pinId: "",
          stateName: "",
          serialNo: "",
          divCode: "",
          invoiceNo: "",
          invoiceDate: "",
          divisionName: "",
          pinCode: '',
          cityId: 0,
          stateId: 0,
          msg: "",
          msgCode: "",
          warrantystatus: ''

        });
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };



  // function formatDate(date) {
  //   if (!date) return ''; // Return empty string if date is not provided
  //   const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //     month: '2-digit',
  //     day: '2-digit',
  //     year: 'numeric'
  //   });
  //   return formattedDate;
  // }

  function formatDate(dateString) {
    if (!dateString) return ''; // Handle case where dateString is undefined
    const parts = dateString.split(" ");
    const dateParts = parts[0].split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
    return formattedDate;
  }

  // const invoiceDate = "05/13/2024 00:00:00";
  // const dateWithoutTime = formatDate(new Date(invoiceDate));
  // (dateWithoutTime); // Output: 05/13/2024

  // console.log(intialStateId,'--------------')

  // useEffect(() => {
  //   if (productData.stateId) {
  //     // Fetch product data based on stateId
  //     const getSingleBranch = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustInfoById?ProdRegAutoId=${id}`;
  //     fetch(getSingleBranch, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);

  //         // Update productData state with the fetched data
  //         setproductData((prevData) => ({
  //           ...prevData,
  //           cityId: result.cityId
  //           // Update with the fields you want to set based on the fetched data
  //         }));

  //         // Fetch city data based on the stateId
  //         const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.stateId ? result?.stateId : 0}&Code=0`;
  //         fetch(cityUrl, {
  //           headers: {
  //             "Authorization": `Bearer ${token}`
  //           }
  //         })
  //           .then((res) => res.json())
  //           .then((cityResult) => {
  //             console.log(cityResult);
  //             setcities(cityResult);
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching cities:", error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching product data:', error);
  //       });
  //   }
  // }, [productData.stateId]);






  const columns = useMemo(
    () => [

      {
        accessorKey: "serialNo",
        header: "Serial No",
        size: "50"

      },
      {
        accessorKey: "divisionName",
        header: "Division ",
        size: "50"

      },
      {
        accessorKey: "customerName",

        header: "Company Name",
        size: "50"

      },
      {
        accessorKey: "siteAddress",
        header: "Site address",
        size: "50"
      },
      {
        accessorKey: "pinCode",
        header: "Pin Code",
        size: "50"
      },
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
        accessorKey: "primaryMobileNo",
        header: "Mobile No",
        size: "50"
      },
      {
        accessorKey: "invoiceNo",
        header: "Invoice No",
        size: "50"
      },
      {
        accessorKey: "invoiceDate",
        header: "Invoice date",
        size: "50",
        Cell: ({ cell }) => {
          let data = cell.getValue()
          let formattedDate = moment(data, "MM/DD/YYYY").format("DD-MM-YYYY");
          return formattedDate;

        }

      },

      {
        accessorKey: "warrantyStatus",
        header: "Status",
        size: "50"
      },
      {
        accessorKey: "isActive",
        header: "Actions",
        size: "20",
        Cell: ({ cell }) => {
          let data = cell.getValue()

          return (
            <>
              <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
                {
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      className="edit-btn"
                      onClick={() => {
                        console.log(cell.row.original.prodRegAutoId);
                        handleEditClick(cell.row.original.prodRegAutoId) // Pass product ID and index to handleEditClick

                        // setproductData(cell.row.original.prodRegAutoId);


                      }}
                    >
                      <FaRegEdit color='#005bab' />
                    </IconButton>
                  </Tooltip>
                }

                {

                  <Tooltip arrow placement="left" title="Create ticket">
                    <IconButton


                      onClick={() => {
                        if (allProducts) {

                          localStorage.setItem("ProductDataProdRegAutoId", JSON.stringify(cell.row.original?.prodRegAutoId))

                        }
                        if (cell.row.original.isGeneratedTicket == "NO") {
                          navigate(`${pathName}/not-reg-for-warranty`);
                          localStorage.removeItem("ProductWarrentyMsg")
                          localStorage.setItem("RedirectedFrom", "RaiseServiceTicket")
                        }
                        else {
                          handleShowExistingTicket(cell.row.original.serviceTicketId);
                        }

                      }}
                    >
                      <IoTicket color='#005bab' />
                    </IconButton>
                  </Tooltip>

                }





                {/* {
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn"
                       onClick={() => {
                        console.log(cell.row.original.ascCode);
                        setactiveID(cell.row.original.ascCode);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}
                      >


                        <FaUserXmark

                          style={{ color: 'red' }} // Style for the new icon

                        />
                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn"
                       onClick={() => {
                        console.log(cell.row.original.ascCode);
                        setactiveID(cell.row.original.ascCode);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}
                      >


                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                } */}




              </Box >

            </>
          )
        }
      },


    ]
  );



  return (
    <>
      <NavBar />
     
       
          <Card
            className="border-0 p-2  mt-0 mx-3"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
            <p style={{
              fontSize: '18px',
              fontWeight: '600'
            }} className="text-start  m-0">
              {/* <IoIosArrowRoundBack
                className="me-3"
                style={{ cursor: "pointer" }}
                fontSize={35}
                color="#005bab"
                onClick={() => navigate(-1)}
              /> */}
              Register Product warranty
            </p>
            <hr />



            <Accordion activeKey={activeKey}>

              {!otpVerified && (
                <Accordion.Item eventKey="0">

                  <Accordion.Header>{!otpVerified && !otpSent ? 'Enter user mobile number' : 'OTP verification'}</Accordion.Header>
                  <Accordion.Body>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <Row className="justify-content-center">
                          <Col md={6}>
                            <Card className="p-4 add-style">
                              <Row className="text-start justify-content-center">
                                {!otpSent && (
                                  <Col md={6}>

                                    <Form.Group>
                                      <Form.Label style={{ color: '#fff', fontWeight: '400' }}>
                                        Mobile No <span className="req-t">*</span>
                                      </Form.Label>
                                      <Form.Control
                                        type="tel"
                                        value={MobileNo}
                                        readOnly={otpSent}
                                        onChange={handleMobileChange}
                                        maxLength={15}
                                      />
                                      {mobileError && (
                                        <span style={{ color: "red" }}>
                                          {mobileError}
                                        </span>
                                      )}
                                    </Form.Group>

                                    <Row className="text-center">
                                      <Col>
                                        <Button
                                          variant=""
                                          disabled={otpSent || mobileError}
                                          onClick={handleSubmit}
                                          className="add-Btnn mt-3"
                                        >
                                          Get OTP
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                )}


                                {!otpVerified && otpSent && (
                                  <>
                                    <Col md={8} sm={12} className="otpCol">
                                      <Row className="justify-content-center p-3"
                                      // style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}

                                      >
                                        <Col>
                                          <Form.Label style={{
                                            fontSize: '16px',
                                            color: '#fff',
                                            fontWeight: '400'

                                          }} className="sty "
                                          >
                                            OTP verification
                                            <span className="req-t">*</span>
                                          </Form.Label>
                                          <p style={{
                                            fontSize: '12px',
                                            color: '#fff'

                                          }}>Please enter OTP (One-Time Password) sent to  your register  phone number complete your verification</p>
                                          <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            inputType="tel"
                                            renderSeparator={<span style={{ color: '#fff' }}> - </span>}
                                            renderInput={(props) => (
                                              <input {...props} />
                                            )}
                                          />
                                          <Row className="mt-2">
                                            {/* {remainingTime !== null && otpSent && (
                                      <p className="req-t"
                                        style={{
                                          fontSize: '12px'
                                        }}
                                      >
                                        Remaining time: <u>{formatTime(remainingTime)}</u>
                                      </p>
                                    )} */}
                                            {remainingTime !== null && otpSent && !otpVerified && (
                                              <p className="req-t" style={{ fontSize: '12px' }}>
                                                Remaining time: <u>{formatTime(remainingTime)}</u>
                                              </p>
                                            )}
                                          </Row>

                                          <Row className="text-center justify-content-center">
                                            <Col md={5}>
                                              <Button
                                                variant=""
                                                className="add-Btnn mt-3"
                                                disabled={otp?.length < 6 || otpVerified} // Disable button if OTP is less than 6 digits or if OTP is already verified

                                                // disabled={ otp?.length < 6}
                                                // onClick={() => {
                                                //   // setActiveKey("1");
                                                //   // setRemainingTime(null);
                                                //   // setotpSent(false);
                                                //   // setOtp("");
                                                //   // setCustPhone("");
                                                // }}
                                                onClick={handleVerifyOTP}

                                              >
                                                {otpVerified ? "Verified" : "Verify OTP"}

                                              </Button>
                                            </Col>
                                            {verificationError && (
                                              <span style={{ color: "red" }}>{verificationError}</span>
                                            )}
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </>
                    )}

                    {/* {remainingTime !== null && otpSent && (
                    <p className="req-t">
                      The OTP is valid for: <u>{formatTime(remainingTime)}</u>
                    </p>
                  )} */}
                  </Accordion.Body>
                </Accordion.Item>)}
              {/* <Accordion.Item eventKey="1">
                <Accordion.Header>Customer details</Accordion.Header>
                <Accordion.Body>
                  {
                    loading ? (<Loader />) : (
                  
                  <><Row className='text-start'>

                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>Customer Name <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name='custName'
                              value={formData.custName}
                              onChange={handleChangeEdit}
                              placeholder=''
                              maxLength={100} />
                          </Form.Group>
                        </Col>
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>Customer Mobile No. <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="custPhone"
                              readOnly
                              value={formData.custPhone}
                              onChange={handleMobileChange}
                              placeholder=''
                              maxLength={15} />
                            {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                          </Form.Group>
                        </Col>
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>Secondary Contact No.</Form.Label>
                            <Form.Control
                              type="text"
                              name='custPhone2'
                              value={formData.custPhone2}
                              onChange={handleChangeEdit}
                              max={15}
                              placeholder='' />
                          </Form.Group>

                        </Col>
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>Address <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              as="textarea"
                              name='custAddess'
                              value={formData.custAddess}
                              onChange={handleChangeEdit}
                              rows={1}
                              placeholder=''
                              maxLength={500} />
                          </Form.Group>

                        </Col>
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>Email <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="email"
                              name='custEmail'
                              value={formData.custEmail}
                              onChange={handleEmailChange}
                              placeholder=''
                              maxLength={100} />
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                          </Form.Group>

                        </Col>
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>PinCode <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="number"
                              name='pinId'
                              value={formData.pinId}
                              onChange={(e) => {
                                handlePinCodeChange(e);
                                if (e.target.value && e.target.value?.length == 6) {

                                  setFormData((pre) => {
                                    return {
                                      ...pre,
                                      pinId: e.target.value
                                    };
                                  });
                                  fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value}&Code=0`, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result[0]);
                                      setFormData((pre) => {
                                        return {
                                          ...pre,
                                          stateId: result[0]?.parameterTypeId
                                        };
                                      });



                                      // if(result[0]?.parameterTypeId)
                                      const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
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
                                              setFormData(prevBranch => ({
                                                ...prevBranch,
                                                // cityId:result[0]?.parameterTypeId
                                              }));
                                            }
                                          }
                                          else {
                                            // Reset state and cities if pin code doesn't match
                                            setFormData(prevBranch => ({
                                              ...prevBranch,
                                              stateId: 0,
                                              cityId: 0
                                            }));
                                            setcities('');
                                          }

                                          // setcities(result)
                                        });

                                    });



                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value}&Code=0`, {
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
                                      setFormData(prevBranch => ({
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
                              setFormData((pre) => {
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
                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>State <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" value={formData.stateId} onChange={(e) => {
                          setFormData((pre) => {
                            return {
                              ...pre,
                              stateId: e.target.value,
                              pinId: ''
                            }
                          })
                          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value ? e.target.value : 0}&Code=0`;
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
                        <Col md={3} className='mt-3'>
                          <Form.Group>
                            <Form.Label>City <span className='req-t'>*</span></Form.Label>
                            <Form.Select aria-label="Default select example" name='cityId' value={formData.cityId}
                              onChange={(e) => {
                                setFormData((pre) => {
                                  return {
                                    ...pre,
                                    cityId: e.target.value,
                                    pinId: ''
                                  };
                                });
                              } }

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


                      </Row><Row>

                          <Col>

                            <Button variant='' onClick={handleSubmitForm} className='mt-3' style={{ backgroundColor: "#7bc143", color: "white", float: "right" }}>Submit</Button>
                          </Col>
                          <Col>

                            <Button variant='' onClick={() => {
                              setCUSTResponse("");
                              setActiveKey("0");
                            } } className='mt-3' style={{ backgroundColor: "transparent", color: "#005bab", borderColor: "#005bab", float: "left" }}>Back</Button>
                          </Col>
                        </Row></>
                    )}

                </Accordion.Body>
              </Accordion.Item> */}


              <>
                {isEditing && (
                  <><Row className="text-start">
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>
                          Serial No.
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={productData?.serialNo}
                          maxLength={15}
                          readOnly />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>
                          Division
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={productData?.divCode}
                          // readOnly={!isEditing}
                          disabled
                          onChange={handleChange}
                        >
                          <option value="">Select </option>

                          {allDivisions.map((division) => (
                            <option
                              key={division.parameterTypeId}
                              value={division.parameterTypeId}
                            >
                              {division.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>Company name</Form.Label>

                        <Form.Control
                          type="text"
                          //readOnly={!isEditing}
                          readOnly


                          value={productData?.customerName}
                          onChange={(e) => {
                            setproductData((pre) => {
                              return {
                                ...pre,
                                customerName: e.target.value
                              };
                            });
                          }} />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label> Site Address</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly={!isEditing}
                          name="siteAddress"
                          value={productData?.siteAddress}
                          onChange={handleProductChangeEdit} />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>PinCode</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly={!isEditing}
                          maxLength={15}
                          value={productData?.pinCode}
                          onChange={(e) => {
                            handlePinCodeChange(e);
                            if (e.target.value && e.target.value?.length == 6) {
                              setproductData((pre) => {
                                return {
                                  ...pre,
                                  pinId: e.target.value,
                                  pinCode: e.target.value
                                };
                              });
                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value}&Code=0`, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result[0]);
                                  if (result[0]?.parameterTypeId) {
                                    setproductData((pre) => {
                                      return {
                                        ...pre,
                                        stateId: result[0]?.parameterTypeId
                                      };
                                    });

                                  }
                                  else {
                                    setproductData((pre) => {
                                      return {
                                        ...pre,
                                        stateId: 0
                                      };
                                    });

                                  }




                                  // if(result[0]?.parameterTypeId)
                                  const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
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
                                          setproductData(prevBranch => ({
                                            ...prevBranch,
                                            // cityId:result[0]?.parameterTypeId
                                          }));
                                        }
                                      }
                                      else {
                                        // Reset state and cities if pin code doesn't match
                                        setproductData(prevBranch => ({
                                          ...prevBranch,
                                          stateId: 0,
                                          cityId: 0
                                        }));
                                        setcities('');
                                      }

                                      // setcities(result)
                                    });

                                });



                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value}&Code=0`, {
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
                                      setproductData(prevBranch => ({
                                        ...prevBranch,
                                        cityId: result[0]?.parameterTypeId
                                      }));
                                    }
                                  }
                                  else {
                                    setcities([]);
                                  }
                                });



                            }

                            else {
                              setproductData((pre) => {
                                return {
                                  ...pre,
                                  stateId: 0,
                                  cityId: 0
                                };
                              });
                            }
                          }}
                          placeholder='' />

                        {pinError && <span style={{ color: 'red' }}>{pinError}</span>}

                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Select
                          value={productData?.stateId}
                          name="stateId"
                          disabled
                          onChange={(e) => {
                            setproductData((pre) => {
                              return {
                                ...pre,
                                stateId: e.target.value
                              };
                            });
                            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value ? e.target.value : 0}&Code=0`;
                            fetch(cityUrl, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setcities(result);
                              });
                          }}
                        >
                          <option value="">Select</option>
                          {states?.map((state, index) => {
                            return (
                              <>
                                <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Select
                          name="cityId"
                          value={productData.cityId}
                          disabled
                          onChange={(e) => {
                            setproductData((pre) => {
                              return {
                                ...pre,
                                cityId: e.target.value
                              };
                            });
                          }}
                        >
                          <option value="">Select</option>
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
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control
                          type="tel"
                          value={productData?.primaryMobileNo}

                          readOnly />
                      </Form.Group>
                    </Col>

                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>Invoice No.</Form.Label>
                        <Form.Control
                          type="text"
                          value={productData?.invoiceNo}

                          maxLength={15}
                          readOnly />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="mt-3">
                      <Form.Group>
                        <Form.Label>Invoice Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={moment(productData?.invoiceDate).format("YYYY-MM-DD")}

                          // value={moment((productData?.invoiceDate))?.format("YYYY-MM-DD")}
                          readOnly />
                      </Form.Group>
                    </Col>
                    {/* <Col md={2} className="mt-3">
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number"
            value={productData?.quantity}
          readOnly />
        </Form.Group>
      </Col> */}
                    <Col md={2} className="mt-4">
                      <Form.Group className="mt-4">
                        <Form.Check
                          type="checkbox"
                          checked={productData?.warrantyStatus === "In Warranty" ? "checked" : ""}
                          disabled
                          label="In-warranty" />
                      </Form.Group>
                    </Col>
                    {/* {isEditing && editIndex == i ? <FaSave style={{ cursor: "pointer", color: "green" }} onClick={handleSaveClick}
      /> } */}

                    <Col md={2}>
                      <Button
                        variant=""
                        className="add-Btn mt-5"
                        onClick={handleSaveClick}
                      >
                        Update
                      </Button>

                    </Col>



                  </Row>
                  </>

                )}





                {otpVerified ?
                  (!loading ?
                    <Row className="text-end">
                      {/* <Row> */}

                      <Col>
                        <Button
                          variant=""
                          className="add-Btn mt-2"
                          onClick={() => {
                            localStorage.setItem("RedirectedFrom", "RegisterProduct")
                            localStorage.removeItem("RedirectedName");
                            localStorage.setItem("isNavigateToRegNewProduct", "regNewProd");
                            localStorage.setItem("isPageRefreshed", false);
                            //setIsNavigateToRegNewProduct(true);
                            navigate(`${pathName}/reg-prod-Warranty`);
                          }}
                        >
                          Register New Product
                        </Button>
                      </Col>
                      {/* <Col md={2}>
                        <Button
                          variant=""
                          className="add-Btn mt-2"
                          onClick={() => {
                            navigate(`${pathName}/raise-request`);
                          }}
                        >
                          Raise Service Ticket
                        </Button>
                      </Col> */}

                      {/* </Row> */}




                    </Row> : <Loader />)
                  : ""}
                {
                  allProducts.length === 0 ? (
                    ""
                  ) : (
                    <><MaterialReactTable
                      columns={columns}
                      data={allProducts}

                      initialState={{ showColumnFilters: false }} //show filters by default

                      muiTableHeadCellFilterTextFieldProps={{
                        sx: { m: "0.5rem 0", width: "100%" },
                        variant: "outlined",
                      }}



                      // manualPagination={true}
                      muiToolbarAlertBannerProps={isError
                        ? {
                          color: 'error',
                          children: 'Error loading data',
                        }
                        : undefined}



                      renderTopToolbarCustomActions={({ table }) => (
                        <>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // gap: '16px',
                            // padding: '10px',
                            flexWrap: 'wrap',
                          }}>

                            <Button variant=''
                              disabled={table.getPrePaginationRowModel().rows.length === 0}

                            >
                              <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                            </Button>

                            {
                              allProducts.length === 0 ? (
                                ""
                              ) :
                                (<Col>

                                  <p className="text-start pg-label m-0"> List of registered products
                                  </p>
                                </Col>
                                )}


                          </div>
                        </>

                      )} /></>
                  )}







                {/* <Row className="justify-content-center">
                    
                      <Col>
                        <Button
                          variant=""
                          onClick={() => {
                            setActiveKey("0");
                          }}
                          className="mt-3"
                          style={{
                            backgroundColor: "transparent",
                            color: "#005bab",
                            borderColor: "#005bab",
                            fontSize: "12px",
                          }}
                        >
                          Back
                        </Button>
                      </Col>
                    </Row> */}
              </>







            </Accordion>




          </Card>
      

        <Modal show={showExistingTicket} onHide={handleCloseExistingTicket} backdrop="static" size="xl" centered>
          <Modal.Header>
            <Modal.Title className='mdl-title' style={{
              fontSize: '20px'
            }}>Your existing open Service Request:
              <p className="m-0" style={{ fontSize: '16px', color: '#000' }}> Please contact our ASC / ASM for further assistance </p></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Card
              style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
              <Row className="text-start">
                <Row className="mt-3">
                  <Col
                    className="br"
                  >
                    <h2 style={{
                      fontSize: '16px',
                      textAlign: 'center'
                    }}>Customers Details</h2>
                    <Col style={{
                      gap: '20px',
                      justifyContent: 'center'
                    }} className="d-flex mt-3 p-0">
                      <Form.Group
                      >
                        <Form.Label>
                          Company Name
                        </Form.Label>
                        <p
                          style={{
                            fontSize: '12px'
                          }}
                        >{ticketDetails.customerName}</p>

                      </Form.Group>
                      <Form.Group
                      >
                        <Form.Label>
                          Contact No
                        </Form.Label>
                        <p style={{
                          fontSize: '12px'
                        }}>{ticketDetails.primaryMobileNo}</p>

                      </Form.Group>
                    </Col>
                  </Col>
                  {/* {ticketDetails.ascName != "" || ticketDetails.ascMobileNo != "" ? */}
                  <Col className="br">
                    <h2 style={{
                      fontSize: '16px',
                      textAlign: 'center'
                    }}>Assigned Service Center details</h2>
                    <Col style={{
                      gap: '20px',
                      justifyContent: 'center'


                    }} className="d-flex mt-3 p-0">
                      <Form.Group

                      >
                        <Form.Label>
                          ASC Name
                        </Form.Label>
                        <p style={{
                          fontSize: '12px'
                        }}>{ticketDetails.ascName}</p>
                        {/* <Form.Control className="border-0"
                                            type="text"
                                            value='Editior ASC'
                                            disabled

                                            maxLength={15}
                                        /> */}
                      </Form.Group>


                      <Form.Group
                      // style={{
                      //     width: "50%"
                      // }}
                      >
                        <Form.Label>
                          Contact No
                        </Form.Label>
                        <p style={{
                          fontSize: '12px'
                        }}>{ticketDetails.ascMobileNo}</p>
                        {/* <Form.Control className="border-0"
                                            type="text"
                                            value='5456765676'
                                            disabled

                                            maxLength={15}
                                        /> */}
                      </Form.Group>
                    </Col>
                  </Col>
                  {/* <></> */}
                  {/* } */}

                  {/* {ticketDetails.asmName != "" || ticketDetails.asmMobileNo != "" ? */}
                  <Col >
                    <h2 style={{
                      fontSize: '16px',
                      textAlign: 'center'
                    }}> CG Branch Area Service Manager</h2>
                    <Col className="d-flex mt-3 "
                      style={{
                        gap: '20px',
                        justifyContent: 'center'

                      }}
                    >
                      <Form.Group
                      // style={{
                      //     width: '50%'
                      // }}
                      >
                        <Form.Label>
                          ASM  Name
                        </Form.Label>
                        <p style={{
                          fontSize: '12px'
                        }}>{ticketDetails.asmName}</p>
                        {/* <Form.Control className="border-0"
                                            type="text"
                                            maxLength={15}
                                            value='GH23212'
                                            disabled

                                        /> */}
                      </Form.Group>
                      <Form.Group
                      // style={{
                      //     width: '50%'
                      // }}
                      >
                        <Form.Label>
                          Contact No
                        </Form.Label>
                        <p style={{
                          fontSize: '12px'
                        }}>{ticketDetails.asmMobileNo}</p>
                        {/* <Form.Control className="border-0"
                                            type="text"
                                            maxLength={15}
                                            value='908789786'
                                            disabled

                                        /> */}
                      </Form.Group>
                    </Col>
                  </Col>
                  {/* <></> */}
                  {/* } */}



                </Row>
                {/* <Row className="mt-3">
                        <Col lg={6} className="">
                            <h2 style={{
                                fontSize: '16px',
                                textAlign: 'center'
                            }}> CG Branch Area Service Manager:</h2>
                            <Col className="d-flex mt-3 "
                                style={{
                                    gap: '10px',
                                }}
                            >
                                <Form.Group
                                    style={{
                                        width: '50%'
                                    }}
                                >
                                    <Form.Label>
                                        ASM against the ticket
                                    </Form.Label>
                                    <Form.Control className="border-0"
                                        type="text"
                                        maxLength={15}
                                        value='GH23212'
                                        disabled

                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        width: '50%'
                                    }}
                                >
                                    <Form.Label>
                                        Phone number's the ASM
                                    </Form.Label>
                                    <Form.Control className="border-0"
                                        type="text"
                                        maxLength={15}
                                        value='908789786'
                                        disabled

                                    />
                                </Form.Group>
                            </Col>
                        </Col>




                    </Row> */}
                <Row className="mt-3"
                  style={{
                    padding: '0px 0px 0px 20px'
                  }}
                >
                  <h2 style={{
                    margin: '0px',
                    fontSize: '16px',
                    textAlign: 'left',
                    textAlign: 'underline'
                    // borderBottom:'1px solid'
                  }}>Service Request</h2>
                </Row>

                <Row style={{
                  padding: '0px 25px 0px 25px'
                }}>
                  <Col className="mt-3">
                    <Form.Group
                      className="md:ml-2"

                    >
                      <Form.Label>
                        Service Request No
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.serviceTicketNumber}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    maxLength={15}
                                    value='98YHTY'
                                    disabled

                                /> */}
                    </Form.Group>

                  </Col>
                  <Col className="mt-3">
                    <Form.Group


                    >
                      <Form.Label>
                        Request date
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{moment((ticketDetails.RequestDate?.split(" ")[0])).format("YYYY-MM-DD")}</p>
                      {/* <Form.Control className="border-0"
                                    type="date"
                                    value='17/05/2024'
                                    disabled
                                /> */}
                    </Form.Group>

                  </Col>


                  <Col className="mt-3">
                    <Form.Group

                    >
                      <Form.Label>
                        Issue type
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.defectDesc}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='None'
                                    disabled
                                /> */}
                    </Form.Group>
                  </Col>
                  <Col className="mt-3">
                    <Form.Group

                    >
                      <Form.Label>
                        Location
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.siteAddress}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='MUMBAI'
                                    disabled

                                /> */}
                    </Form.Group>
                  </Col>
                  <Col className="mt-3">
                    <Form.Group
                      className="md:ml-2"


                    >
                      <Form.Label>
                        Product Type
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.productLineName}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='PLASTIC'
                                    disabled

                                /> */}
                    </Form.Group>
                  </Col>
                  <Col className="mt-3">
                    <Form.Group

                    >
                      <Form.Label>
                        Product Sr No
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.sernr}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='8767'
                                    disabled

                                /> */}
                    </Form.Group>
                  </Col>
                  <Col className="mt-3">
                    <Form.Group

                    >
                      <Form.Label>
                        Warranty status
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.warrantyDateStatus}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='In Warranty'
                                    disabled



                                /> */}
                    </Form.Group>
                  </Col>

                  <Col className="mt-3">
                    <Form.Group>
                      <Form.Label>
                        Status
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails.ticketStateus}</p>
                      {/* <Form.Control className="border-0"
                                    type="text"
                                    value='In Warranty'
                                    disabled

                                /> */}
                    </Form.Group>
                  </Col>


                </Row>



              </Row>


            </Card>



          </Modal.Body>
          <Modal.Footer style={{
            justifyContent: 'center'
          }}>
            <Button variant="" className='add-Btn' onClick={() => {
              handleCloseExistingTicket()
              //navigate(`${pathName}/home`)
            }} >
              OK
            </Button>
            <Button variant="" className='add-Btn' onClick={handleEsclationShow} >
              ESCLATE
            </Button>




          </Modal.Footer>

        </Modal>
        <Modal show={showEsclation} onHide={handleEsclationClose} size="l" centered >
          <Modal.Body>

            Your request for escalation of service request has been received, we will get back to you soon.


          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='add-Btn' onClick={handleEsclationClose} >
              OK
            </Button>


          </Modal.Footer>

        </Modal>
   
      <Footer />
    </>
  );
}

export default AddCustomer;
