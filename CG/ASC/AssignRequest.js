import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Accordion,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { CgArrowsExchange, CgFileDocument } from "react-icons/cg";
import {
  FaCircle,
  FaDownload,
  FaEye,
  FaPrint,
  FaUserCircle,
} from "react-icons/fa";
import {
  FaCircleCheck,
  FaCircleMinus,
  FaCirclePlus,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosDownload, IoMdSave } from "react-icons/io";
import {
  IoArrowUpOutline,
  IoCallOutline,
  IoMail,
  IoSave,
  IoSyncOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GenericModal from "../GenericModal";
import { MdVerifiedUser } from "react-icons/md";
import { Input } from "antd";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsInfoCircleFill } from "react-icons/bs";
import { IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import moment from "moment";
import { MultiSelect } from "react-multi-select-component";
import { ReactSearchAutocomplete } from "react-search-autocomplete";


const AssignRequest = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const [Image, setImage] = useState("")
  const [NewImage, setNewImage] = useState("")
  const [ImageInstallationCondition, setImageInstallationCondition] = useState("")
  
  let token = localStorage.getItem("UserToken");
  let asc = localStorage.getItem("UID");
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format

  let serTicId = localStorage.getItem("ViewEditRequest");

  let pageLabel = localStorage.getItem("TicketInfoLabel");
  const [active, setactive] = useState(null);
  const [activeKeyEdit, setactiveKeyEdit] = useState("0");
  const ViewTic = localStorage.getItem("viewTicket");
  const [saved, setSaved] = useState(false);
  const [requestForSiteVisit, setRequestForSiteVisit] = useState(false);
  const [requestForProduct, setRequestForProduct] = useState(false);
  const [warrantyAccordion, setWarrantyAccodrion] = useState(false);
  const [warrantyDecision, setwarrantyDecision] = useState(false);
  const [serviceTasks, setServiceTasks] = useState(false);
  const [requestForyesWarranty, setRequestForYesWarranty] = useState(false);
  const [requestFornoWarranty, setRequestForNoWarranty] = useState(false);
  const [requestForCGInvoice, setRequestForCGInvoice] = useState(false);
  const [requestForSubmit, setRequestForSubmit] = useState(false);
  const [customerData, setCustomerData] = useState(false);
  const [serialNo, setserialNo] = useState("");
  const [selectedValueTicket, setSelectedValueTicket] = useState("");

  const [dateshow, setDateshow] = useState(false);

  const [showProductInfo, setProductInfo] = useState(false);

  const handleShowProductInfo = () => {
    setProductInfo(true);
  };
  const handleCloseProductinfo = () => {
    setProductInfo(false);
  };

  const [ticketInfo, setticketInfo] = useState([]);

  // const [ascNoOfDays, setascNoOfDays] = useState("")

  const [ascNoOfDays, setascNoOfDays] = useState("");

  const [tab3Data, settab3Data] = useState({
    SerialNo: "",
    DivisionCode: "",
    ProductLineCode: "",
    ProductGroupCode: "",
    ProductCode: "",
    ProductDescription: "",
    PurchasedFrom: "",
    InvoiceNo: "",
    InvoiceDate: "",
    InvoiceFile: "",
    BatchNo: "",
    Frame: "",
    Voltage: "",
    Pole: "",
    ComplaintType: "",
    WarrantyStatus: "",
    DefectObj: [],
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${serTicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setticketInfo(result);

        settab3Data((pre) => {
          return {
            ...pre,
            SerialNo: result[0]?.sernr,
            DivisionCode: result[0]?.divisionCode,
            ProductLineCode: result[0]?.productLineCode,
            ProductGroupCode: result[0]?.productGroupCode,
            ProductCode: result[0]?.matnr,
            ProductDescription: result[0]?.productDescription,
          };
        });

        const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result[0]?.divisionCode}`;

        fetch(getAllProductLines, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setallproductLines(result);
          });

        const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${result[0]?.productLineCode}`;
        fetch(productGroupURl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setallproductGroup(result);
            // Set default productLineCode if result is not empty
          });

        if (result[0]?.matnr) {
          fetch(
            `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceRequestNoOfDays?productCode=${result[0]?.matnr}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => {
            let resp = res.text();
            resp.then((r) => {
              console.log(r);
              setascNoOfDays(r);
            });
          });
        }

        setAddContacted((pre) => {
          return {
            ...pre,
            SerialNo: result[0]?.sernr ? result[0]?.sernr : "",
            ProductCode: result[0]?.matnr ? result[0]?.matnr : "",
          };
        });
      });
  }, []);

  useEffect(() => {
    setactive(null);
  }, []);
  const handleSaveData = () => {
    setSaved(true);
    setactiveKeyEdit("2");
  };

  const [customerConnected, setcustomerConnected] = useState(false);
  const [alreadyWorkshoop, setalreadyWorkshoop] = useState(false);

  const [workshopremarks, setworkshopremarks] = useState("");

  const handleRadioCustomerChange = (event) => {
    const { value } = event.target;

    if (value === "customer") {
      setcustomerConnected(true);
      setalreadyWorkshoop(false);
      setserialNo("");
      // setVerifiedProduct(false)
    } else if (value === "workshop") {
      setcustomerConnected(false);
      setalreadyWorkshoop(true);
      setserialNo("");
      // setVerifiedProduct(false)
    } else {
    }
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;

    if (value === "site") {
      setRequestForSiteVisit(true);
      setRequestForProduct(false);
      setDateshow(false);
    } else if (value === "Product") {
      setRequestForSiteVisit(false);
      setRequestForProduct(true);
      setVerifiedWork(false);
    } else {
    }
  };
  const handleRadioYesChange = (event) => {
    const { value } = event.target;
    if (value === "yes") {
      setRequestForYesWarranty(true);
      setRequestForNoWarranty(false);
    } else if (value === "no") {
      setRequestForNoWarranty(false);
      setRequestForYesWarranty(true);
    } else {
    }
  };
  const handleRadioInvoiceChange = (event) => {
    const { value } = event.target;

    if (value === "yes") {
      setRequestForCGInvoice(true);
      setRequestForSubmit(false);
    } else if (value === "no") {
      setRequestForSubmit(false);
      setRequestForCGInvoice(true);
    } else {
    }
  };
  const [workShop, setworkShop] = useState(false);
  const [closeTic, setcloseTic] = useState(false);
  const handleRadioWorkshopChange = (event) => {
    const { value } = event.target;

    if (value === "recevied") {
      setworkShop(true);
      setcloseTic(false);
    } else if (value === "close") {
      setworkShop(false);
      setcloseTic(true);
    } else {
    }
  };

  const getCurrentDate = () => {
    const date = new Date().toISOString().substr(0, 10);
    return date;
  };
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedDateSite, setSelectedDateSite] = useState(getCurrentDate());
  const [selectedDateContact, setSelectedDateContact] = useState(
    getCurrentDate()
  );
  const [selectedDateWorkShop, setSelectedDateWorkShop] = useState(
    getCurrentDate()
  );

  const [workCompleted, setworkCompleted] = useState(false);
  const [productWork, setproductWork] = useState(false);
  const [showRadioButtons, setShowRadioButtons] = useState(false); // State to control visibility of radio buttons

  const handleRadioWorkChange = (event) => {
    const { value } = event.target;
    if (value === "Work Completed") {
      setworkCompleted(true);
      // setproductWork(false);
    } else if (value === "ProductWork ") {
      setworkCompleted(false);
      // setproductWork(true);
    } else {
    }
  };

  const productInfo = [
    {
      contactDate: "",
      serialNumber: "123",
      InvoiceNo: "CG6757",
      InvoiceDate: "2024-06-19",
      uploadInvoice:
        "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf",
      
      warranty: "In Warranty",
      remarks: "",
    },
    
  ];

  const [StStatus, setStStatus] = useState([]);
  const [StSubStatus, setStSubStatus] = useState([]);

  const [addContacted, setAddContacted] = useState({
    AscCustomerContactedId: 0,
    ServiceTicketId: "",
    TypeService: "",
    ContactDate: selectedDateContact,
    SerialNo: "",
    ProductCode: "",
    InvoiceDate: "",
    InvoiceNo: "",
    Remarks: "",
    ServiceRequestStatusId: "",
    ServiceRequestSubStatusId: "",
    InvoiceDocFile: "",
    ServiceTicketStatus: "",
    AscActivitiesName: [],
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}STStatus/GetAllSTStatus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (addContacted?.TypeService == "Customer Contacted") {
          let filteredDataCustomer = result?.filter(
            (i) => i.stStatusName != "PRODUCT ALREADY RECEIVED AT WORKSHOP"
          );
          console.log(filteredDataCustomer);
          setStStatus(filteredDataCustomer);
        } else if (
          addContacted?.TypeService == "Product already received at workshop"
        ) {
          let filteredData = result?.filter(
            (i) =>
              i.stStatusName != "SITE VISIT" &&
              i.stStatusName != "PRODUCT TO BE RECEIVED AT WORKSHOP"
          );
          console.log(filteredData);
          setStStatus(filteredData);
        } else {
          setStStatus([]);
        }
      });
  }, [addContacted?.TypeService]);

  const [addSaveContacted, setAddSaveContacted] = useState({
    contactDate: "",
    serialNumber: "",
    InvoiceDate: "",
    InvoiceNo: "",
    uploadInvoice: null,
    serviceRequestStatus: "",
    warranty: "",
    remarks: "",
  });
  const [verifiedProduct, setVerifiedProduct] = useState(false);
  const [verifiedWork, setVerifiedWork] = useState(false);

  const customerhandleChange = (e) => {
    const { name, value } = e.target;
    setAddContacted((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(addContacted);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Assuming single file selection
    setAddContacted((prevState) => ({
      ...prevState,
      uploadInvoice: file,
    }));
  };

  const [verifiedWarrantyStatus, setverifiedWarrantyStatus] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    // let infoProduct = productInfo.filter(info => info.serialNumber === serialNo);
    // console.log(infoProduct)
    // if (!serialNo) {
    //     alert(`Enter serial number`);
    //     setVerifiedProduct(false)
    //     return;

    // }
    // setAddContacted({
    //     InvoiceDate: infoProduct[0]?.InvoiceDate || '',
    //     InvoiceNo: infoProduct[0]?.InvoiceNo || '',
    //     uploadInvoice: infoProduct[0]?.uploadInvoice || null,
    //     serviceRequestStatus: infoProduct[0]?.serviceRequestStatus || '',
    //     warranty: infoProduct[0]?.warranty || '',
    //     remarks: infoProduct[0]?.remarks || ''
    // });

    if (
      addContacted?.SerialNo == "" ||
      addContacted?.ProductCode == "" ||
      addContacted?.InvoiceDate == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill Serial No. , Product Code & Invoice date ",
      });
    } else {
      fetch(
        `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${addContacted?.SerialNo}&ProductCode=${addContacted?.ProductCode}&InvoiceDate=${addContacted?.InvoiceDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0]?.warrantyStatus);

          setverifiedWarrantyStatus(result[0]?.warrantyStatus);

          setAddContacted((pre) => {
            return {
              ...pre,
              ServiceTicketId: result[0]?.serviceTicketId,
              ServiceTicketStatus: result[0]?.ticketStateus,
            };
          });

          setVerifiedProduct(true);
        });
    }
  };

  const calculateDateAfterAddDays = () => {
    const selected = new Date(selectedDate);
    selected.setDate(selected.getDate() + parseInt(ascNoOfDays));

    const year = selected.getFullYear();
    let month = (selected.getMonth() + 1).toString();
    let day = selected.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    if (day.length === 1) {
      day = "0" + day;
    }
    return `${day}/${month}/${year}`;
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
  const getFileNameFromURL = (url) => {
    const path = url.split("/"); // Split URL by '/'
    return path[path.length - 1]; // Get the last part of the URL as filename
  };

  const [selectedRequest, setSelectedRequest] = useState("");
  const [serviceRequestFirst, setServiceRequestFirst] = useState("");
  const [serviceRequestSecond, setServiceRequestSecond] = useState("");
  const [serviceRequestThird, setServiceRequestThird] = useState("");

  const ServiceRequest = {
    Close: "Close",
    Cancelled: "Cancelled",
    CUSTOMER_NEGLIGENCE: "CUSTOMER NEGLIGENCE",
  };

  // let token = localStorage.getItem("UserToken");

  const [allproductLines, setallproductLines] = useState([]);

  const [sapProductCodes, setsapProductCodes] = useState([]);

  const [allproductGroup, setallproductGroup] = useState([]);

  const [allDivisions, setallDivisions] = useState([]);

  const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

  useEffect(() => {
    fetch(getAllDivisions, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result);
      });
  }, []);

  const [complaintTypes, setcomplaintTypes] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ServiceClaimType`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setcomplaintTypes(result);
      });
  }, []);

  const [ASCWiseTecnicians, setASCWiseTecnicians] = useState([]);

  useEffect(() => {
    // console.log(data);

    fetch(
      `${process.env.REACT_APP_API_URL}Technician/GetAscWiseTechnician?ascCode=${asc}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setASCWiseTecnicians(result);
      });
  }, []);

  const [tab2Data, settab2Data] = useState({
    ASCSiteVisitAndProductReceivedId: 0,
    ServiceTicketId: serTicId,
    TypeService: "",
    ServiceDate: "",
    AssignTechician: "0",
    ProductReceivedDate: "",
    ProductReceviedASCDate: "",
    ProductReceviedType: "",
    Remarks: "",
    AscActivitiesName: [],
  });

  // const [tab2Submitted, settab2Submitted] = useState(false)

  // const [ASCWiseTecnicians, setASCWiseTecnicians] = useState([])

  useEffect(() => {
    // console.log(data);

    fetch(
      `${process.env.REACT_APP_API_URL}Technician/GetAscWiseTechnician?ascCode=${asc}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setASCWiseTecnicians(result);
      });
  }, []);

  // const [tab2Data, settab2Data] = useState({
  //     ASCSiteVisitAndProductReceivedId:0,
  //     ServiceTicketId:serTicId,
  //     TypeService:"",
  //     ServiceDate:"",
  //     AssignTechician:"",
  //     ProductReceivedDate:"",
  //     ProductReceviedType:"",
  //     Remarks:""
  // })

  const [tab2Submitted, settab2Submitted] = useState(false);

  const [getDataOfTicket, setgetDataOfTicket] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/GetServiceTicketTaskDetailsByIdAsync?ServiceTicketId=${serTicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setgetDataOfTicket(result);

        if (result?.ascServiceTicketCustomer?.length >= 1) {
          setAddContacted((pre) => {
            return {
              ...pre,
              AscCustomerContactedId:
                result?.ascServiceTicketCustomer[0]?.ascCustomerContactedId,
              ServiceTicketId:
                result?.ascServiceTicketCustomer[0]?.serviceTicketId,
              ContactDate:
                result?.ascServiceTicketCustomer[0]?.contactDate?.split(" ")[0],
              SerialNo: result?.ascServiceTicketCustomer[0]?.serialNo,
              TypeService: result?.ascServiceTicketCustomer[0]?.typeService,
              ProductCode: result?.ascServiceTicketCustomer[0]?.productCode,
              InvoiceDate:
                result?.ascServiceTicketCustomer[0]?.invoiceDate?.split(" ")[0],
              InvoiceNo: result?.ascServiceTicketCustomer[0]?.invoiceNo,
              InvoiceDocFile:
                result?.ascServiceTicketCustomer[0]?.invoiceDocFile,
              ServiceTicketStatus:
                result?.ascServiceTicketCustomer[0]?.serviceTicketStatus,
              Remarks: result?.ascServiceTicketCustomer[0]?.remarks,
              ServiceRequestStatusId:
                result?.ascServiceTicketCustomer[0]?.serviceRequestStatusId,
              ServiceRequestSubStatusId:
                result?.ascServiceTicketCustomer[0]?.serviceRequestSubStatusId,
              // AscActivitiesName:result?.ascServiceTicketCustomer[0]?.ascActivitiesName?.map(activity => ({ value: activity.activityId, label: activity.activityName }))
            };
          });

          fetch(
            `${process.env.REACT_APP_API_URL}STSubStatus/GetSTSubStatusByStatus?stStatusId=${result?.ascServiceTicketCustomer[0]?.serviceRequestStatusId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setStSubStatus(result);
            });


          if (result?.ascServiceTicketCustomer[0]?.serviceRequestStatusId == "10") {
            settab2Data((pre) => {
              return {
                ...pre,
                TypeService: "Product to be received at workshop"
              }
            })
          }
          else {
            settab2Data((pre) => {
              return {
                ...pre,
                TypeService: ""
              }
            })
          }

        }

        if (result?.ascSiteVisitAndProductReceived?.length >= 1) {
          // --------------------------Setting tab 2 Data to edit--------------------

          settab2Data((pre) => {
            return {
              ...pre,
              ASCSiteVisitAndProductReceivedId:
                result?.ascSiteVisitAndProductReceived[0]
                  ?.ascSiteVisitAndProductReceivedId,
              ServiceTicketId:
                result?.ascSiteVisitAndProductReceived[0]?.serviceTicketId,
              TypeService:
                result?.ascSiteVisitAndProductReceived[0]?.typeService,
              ServiceDate:
                result?.ascSiteVisitAndProductReceived[0]?.serviceDate?.split(
                  " "
                )[0],
              AssignTechician:
                result?.ascSiteVisitAndProductReceived[0]?.assignTechician,
              ProductReceivedDate:
                result?.ascSiteVisitAndProductReceived[0]?.productReceivedDate?.split(
                  " "
                )[0],
              ProductReceviedType:
                result?.ascSiteVisitAndProductReceived[0]?.productReceviedType,
              ProductReceviedASCDate:
                result?.ascSiteVisitAndProductReceived[0]
                  ?.productReceviedASCDate,
              Remarks: result?.ascSiteVisitAndProductReceived[0]?.remarks,
            };
          });
        }

        if (result?.ascServiceTicketCustomer?.length >= 1) {
          setactiveKeyEdit("1");
        }

        if (
          result?.ascSiteVisitAndProductReceived[0]?.productReceviedType ==
          "Work Completed" ||
          result?.ascSiteVisitAndProductReceived[0]?.productReceviedType ==
          "Product to be received at workshop" ||
          result?.ascServiceTicketCustomer[0]?.typeService ==
            "Product already received at workshop" || 
            result?.ascSiteVisitAndProductReceived[0]?.typeService ==
            "Product to be received at workshop"
        ) {
          setactiveKeyEdit("2");
        }
      });
  }, []);

  const calculateDateAfterAddDays2 = () => {
    const selected = new Date(
      getDataOfTicket?.ascSiteVisitAndProductReceived[0]?.typeService ==
        "Site Visit"
        ? moment(
          getDataOfTicket?.ascSiteVisitAndProductReceived[0]?.serviceDate?.split(
            " "
          )[0]
        )?.format("YYYY-MM-DD")
        : getDataOfTicket?.ascSiteVisitAndProductReceived[0]?.typeService ==
          "Product to be received at workshop"
          ? moment(
            getDataOfTicket?.ascSiteVisitAndProductReceived[0]?.productReceivedDate?.split(
              " "
            )[0]
          )?.format("YYYY-MM-DD")
          : ""
    );
    selected.setDate(selected.getDate() + parseInt(ascNoOfDays));

    const year = selected.getFullYear();
    let month = (selected.getMonth() + 1).toString();
    let day = selected.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    if (day.length === 1) {
      day = "0" + day;
    }
    return `${day}/${month}/${year}`;
  };

  const [addDefectCategoryOption, setAddDefectCategoryOption] = useState({
    defectCategoryItem: "",
    defectItem: "",
  });
  const [defectList, setDefectList] = useState([]);

  const handleAddDefect = () => {
    if (
      addDefectCategoryOption.defectCategoryItem &&
      addDefectCategoryOption.defectItem
    ) {
      setDefectList([...defectList, addDefectCategoryOption]);

      setAddDefectCategoryOption({
        defectCategoryItem: "",
        defectItem: "",
      });
    }
    console.log(defectList);
  };
  const handleRemoveButtonClick = (index) => {
    const updatedData = [...defectList];
    updatedData.splice(index, 1);
    setDefectList(updatedData);
  };

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };
  const options = [
    { label: "Spare consumption", value: "Spare consumption" },
    {
      label: "Bearing replacement at Site / ASC",
      value: "Bearing replacement at Site / ASC",
    },
    { label: "Only Site visit", value: "Only Site visit" },
    { label: "Site visit & Repair ", value: "Site visit & Repair " },
    {
      label: "Include site visit charges alongwith workshop charges",
      value: "Include site visit charges alongwith workshop charges",
    },
    { label: "Repair at ASC", value: "Repair at ASC" },
    // { label: "First level repair", value: "First level repair" },
    // { label: "Second level repair", value: "Second level repair" },
  ];

  const optionsypeWorkDone = [
    { label: "Spare consumption", value: "Spare consumption" },
    // { label: "Bearing replacement at Site / ASC", value: "Bearing replacement at Site / ASC" },
    { label: "Only Site visit", value: "Only Site visit" },
    { label: "Site visit & Repair ", value: "Site visit & Repair " },
    { label: "Include site visit charges alongwith workshop charges", value: "Include site visit charges alongwith workshop charges" },
    { label: "Repair at ASC", value: "Repair at ASC" },
    // { label: "First level repair", value: "First level repair" },
    // { label: "Second level repair", value: "Second level repair" },
  ];

  const [uploadPhoto, setUploadPhoto] = useState([{
    label: '',
    file: ""
  }]);
  const [fileInputs, setfileInputs] = useState([]);

  const [typeSelected, setTypeSelected] = useState('')


  const addFileInput = () => {
    setfileInputs([...fileInputs, uploadPhoto]);
    console.log(...fileInputs, uploadPhoto, '----------add')

  };
  const handleRemovefile = (index) => {
    const updatedfile = [...fileInputs];
    updatedfile.splice(index, 1);
    setfileInputs(updatedfile);
    console.log(index)
  };
  const [spareList, setSpareList] = useState([]);
  const [typeSelectedSpare, setTypeSelectedSpare] = useState('')


  const handleRemoveSpare = (index) => {
    const updatedSpare = [...spareList];
    updatedSpare.splice(index, 1);
    setSpareList(updatedSpare);
    console.log(index)
  };

  const [activityList, setActivityList] = useState([]);
  const [activityUpload, setActiviityUpload] = useState([{
    desc: '',
    qun: "",
    activity: ''
  }]);
  const activityAdd = () => {
    if (typeSelected) {
      setActivityList([
        ...activityList,
        { type: typeSelected, desc: '', quantity: 1 }
      ]);
      setTypeSelected(''); // Clear selection after adding
    } else {
      alert('Please select an activity type');
    }
  };

  const spareAdd = () => {
    if (selectedSpare) {
      setSpareList([
        ...spareList,
        { type: selectedSpare?.name, desc: '', quantity: 1 }
      ]);
      setSelectedSpare(null); // Clear selection after adding
    } else {
      alert('Please select an spare type');
    }
  };
  const handleRemoveActivity = (index) => {
    const updatedActivity = [...activityList];
    updatedActivity.splice(index, 1);
    setActivityList(updatedActivity);
    console.log(index)
  };

  // const [file, setFile] = useState();
  const handleFIRSubmit = () => {
    if (addFirdata?.productSrNumber === '' || addFirdata?.division === '' || addFirdata?.productLine == '' || addFirdata?.productGroup == '' || addFirdata?.productCode == '' || addFirdata?.productDescription == '' || addFirdata?.batchNo == '' || addFirdata?.invoiceNo == '' || addFirdata?.invoiceDate == '' || addFirdata?.warrantyDate == '' || addFirdata?.typeofApplication == '' || addFirdata?.totalNoHours == '' || addFirdata?.failureObservation == '' || addFirdata?.serialNumberSticker == '' || addFirdata?.installtionCondition == '' || addFirdata?.electricalCondition == '' || addFirdata?.clousurStatus == '' || addFirdata?.detailsWorkDone == '' || addFirdata?.typeOfworkDone == '') {
      Swal.fire({
        icon: "error",
        title: "Please fill all the fields marked with red *!"
      })
    }
    else if (defectList.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Please add defect   "
      })

    }
    else {
      alert('data saved suceefull')



    }
  }

  const [addFirdata, setAddFirData] = useState({
    productSrNumber: '',
    division: '',
    productLine: "",
    productGroup: "",
    productCode: '',
    productDescription: "",
    batchNo: "",
    invoiceNo: '',
    invoiceDate: '',
    warrantyDate: '',
    invoiceCopy: "",
    typeofApplication: "",
    totalNoHours: '',
    failureObservation: "",
    defectCategory: '',
    subDefect: '',
    serialNumberSticker: '',
    installtionCondition: "",
    electricalCondition: '',
    clousurStatus: '',
    replaceTag: "",
    detailsWorkDone: '',
    typeOfworkDone: [],
    spare: '',
    repairASC: ''
  })
  const handleChange = (e) => {
    const newdata = { ...addFirdata };
    newdata[e.target.name] = e.target.value;
    setAddFirData(newdata);
    console.log(newdata);
  };

  const initialActivities = [
    { id: 0, name: '130021029W	FAN M/CED CI D/E 112-147C Q652 OLD' },
    { id: 1, name: '130021401W	BRG. COVER M/CED C112-140' },
    { id: 2, name: '130021502W	STATOR M/CED E112M-122,HW2403' },
    { id: 3, name: '130041582	KEY OER EN8 10X8X60 MM' },
    { id: 4, name: '130121017	BEARING BALL 6210-2Z C3' }
  ];
  const [selectedSpare, setSelectedSpare] = useState([]);

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }
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
    setSelectedSpare(item);

  }

  const handleOnFocus = () => {
    console.log('Focused')
  }
  return (
    <>
      <Row>
        <Col>
          <Card
            className="border-0 pt-0 px-2"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="m-0 mdl-title"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <CgFileDocument fontSize={14} color="#000" className="mr-2" />
                  {pageLabel}
                </p>

                {/* <span style={{
                                    fontSize: '18px',
                                    fontWeight: '600'
                                }} className="text-start  m-0">
                                    Open Request
                                </span> */}
              </div>
              <div className="d-flex gap-1">
                {/* <Button variant='' className='add-Btn' onClick={handleShowProductInfo}>
                                </Button> */}
                <Tooltip arrow placement="left" title="back">
                  <IconButton
                    className=" m-0 p-0 "
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <IoIosArrowRoundBack
                      style={{ cursor: "pointer" }}
                      fontSize={30}
                      color="#005bab"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="left" title="print jobsheet">
                  <IconButton className=" m-0 p-0 ">
                    <FaPrint fontSize={20} color="#005bab" />
                  </IconButton>
                </Tooltip>
                {ticketInfo ? (
                  <Tooltip arrow placement="left" title="view product info">
                    <IconButton
                      className=" m-0 p-0 "
                      onClick={handleShowProductInfo}
                    >
                      <BsInfoCircleFill fontSize={20} color="#005bab" />
                      {/* <BiEdit fontSize={20} color='#005bab' /> */}
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                <Tooltip arrow placement="left" title="mail">
                  <IconButton className=" m-0 p-0 ">
                    <IoMail fontSize={20} color="#005bab" />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="left" title="refresh">
                  <IconButton className=" m-0 p-0 ">
                    <IoSyncOutline fontSize={20} color="#005bab" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {/* <hr /> */}

            <Row className="justify-content-start pt-0">
              <Row className="p-1">
                <Col lg={12} md={12} sm={12}>
                  <>
                    <div className="customAccordion">
                      <Accordion activeKey={activeKeyEdit}>
                        <Form id="assignForm">
                          <Accordion.Item
                            className="breakdowan-accor"
                            eventKey="0"
                          >
                            <Accordion.Header>
                              <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                                <p className="m-0">
                                  {customerData ||
                                    activeKeyEdit == "1" ||
                                    activeKeyEdit == "2" ? (
                                    <FaCircleCheck
                                      color="#58a718"
                                      fontSize={20}
                                      className="mr-2"
                                    />
                                  ) : (
                                    <strong className="mr-2">1</strong>
                                  )}
                                  Customer Contacted
                                </p>
                                <span>
                                  <Button
                                    variant=""
                                    type="submit"
                                    style={{
                                      outline: "none",
                                      border: "none",
                                    }}
                                  >
                                    <IoMdSave
                                      color="#7bc143"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        if (
                                          addContacted?.SerialNo == "" ||
                                          addContacted?.ProductCode == "" ||
                                          addContacted?.InvoiceDate == "" ||
                                          addContacted?.InvoiceNo == "" ||
                                          addContacted?.Remarks == "" ||
                                          addContacted?.ServiceRequestStatusId ==
                                          "" ||
                                          addContacted?.ServiceRequestSubStatusId ==
                                          ""
                                        ) {
                                          Swal.fire({
                                            icon: "error",
                                            title:
                                              "Please fill all the fields marked with red *!",
                                          });
                                        } else if (
                                          getDataOfTicket
                                            ?.ascServiceTicketCustomer
                                            ?.length >= 1
                                        ) {
                                          console.log("Updating Data");

                                          let n = {
                                            ...addContacted,
                                            AscActivitiesName:
                                              addContacted?.AscActivitiesName?.map(
                                                (i) => i.value?.toString()
                                              ),
                                          };
                                          const formData = new FormData();
                                          Object.keys(addContacted).forEach(
                                            (key) => {
                                              if (key === "InvoiceDocFile") {
                                                formData.append(key, n[key]);
                                              } else {
                                                formData.append(key, n[key]);
                                              }
                                            }
                                          );
                                          fetch(
                                            `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertAscServiceTicketCustomer`,
                                            {
                                              method: "POST",
                                              headers: {
                                                // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                Authorization: `Bearer ${token}`,
                                              },
                                              body: formData,
                                            }
                                          ).then((res) => {
                                            let resp = res.text();
                                            resp.then((r) => {
                                              console.log(r);
                                              let regextest = /^[0-9]*$/;
                                              if (
                                                r.match(regextest) &&
                                                addContacted?.TypeService ==
                                                "Customer Contacted"
                                              ) {
                                                setCustomerData(true);
                                                setSaved(true); // Ensure saved is false when workCompleted is true

                                                setactiveKeyEdit("1");
                                              } else if (
                                                r.match(regextest) &&
                                                addContacted?.TypeService ==
                                                "Product already received at workshop"
                                              ) {
                                                setCustomerData(true);
                                                setactiveKeyEdit("2");
                                                setServiceTasks(true);
                                              } else {
                                                Swal.fire({
                                                  icon: "error",
                                                  title:
                                                    "Something went wrong!",
                                                });
                                              }
                                            });
                                          });
                                        } else {
                                          let n = {
                                            ...addContacted,
                                            AscActivitiesName:
                                              addContacted?.AscActivitiesName?.map(
                                                (i) => i.value?.toString()
                                              ),
                                          };
                                          const formData = new FormData();
                                          Object.keys(addContacted).forEach(
                                            (key) => {
                                              if (key === "InvoiceDocFile") {
                                                formData.append(key, n[key]);
                                              } else {
                                                formData.append(key, n[key]);
                                              }
                                            }
                                          );
                                          fetch(
                                            `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertAscServiceTicketCustomer`,
                                            {
                                              method: "POST",
                                              headers: {
                                                // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                Authorization: `Bearer ${token}`,
                                              },
                                              body: formData,
                                            }
                                          ).then((res) => {
                                            let resp = res.text();
                                            resp.then((r) => {
                                              console.log(r);
                                              let regextest = /^[0-9]*$/;
                                              if (
                                                r.match(regextest) &&
                                                addContacted?.TypeService ==
                                                "Customer Contacted"
                                              ) {
                                                setCustomerData(true);
                                                setSaved(true); // Ensure saved is false when workCompleted is true

                                                setactiveKeyEdit("1");
                                              } else if (
                                                r.match(regextest) &&
                                                addContacted?.TypeService ==
                                                "Product already received at workshop"
                                              ) {
                                                setCustomerData(true);
                                                setactiveKeyEdit("2");
                                                setServiceTasks(true);
                                              } else {
                                                Swal.fire({
                                                  icon: "error",
                                                  title:
                                                    "Something went wrong!",
                                                });
                                              }
                                            });
                                          });
                                        }

                                        // else if (addContacted?.TypeService=="Product already received at workshop") {
                                        //     if (addContacted?.Remarks == "") {
                                        //         alert("Please fill remarks");
                                        //     } else {

                                        //     }
                                        // }
                                      }}
                                      fontSize={20}
                                    />
                                  </Button>
                                </span>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body className="accordion-btn pt-0 pb-1">
                              <Row>
                                <Col>
                                  <Row className="justify-content-center text-center">
                                    <Col lg={12} md={6} sm={12}>
                                      <Form.Check
                                        type="radio"
                                        label="Customer Contacted"
                                        name="radioGroup"
                                        value="customer"
                                        checked={
                                          addContacted?.TypeService ==
                                          "Customer Contacted"
                                        }
                                        style={{
                                          color: "#000",
                                          fontWeight: "400",
                                          fontSize: "12px",
                                          textAlign: "left",
                                          margin: "15px 15px 0px 0px",
                                          display: "inline-block",
                                        }}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setAddContacted((pre) => {
                                              return {
                                                ...pre,
                                                TypeService:
                                                  "Customer Contacted",
                                                  ContactDate: selectedDateContact,

                                              };
                                            });
                                          } else {
                                            setAddContacted((pre) => {
                                              return {
                                                ...pre,
                                                TypeService: "",
                                                ContactDate: selectedDateContact,

                                              };
                                            });
                                          }

                                          setAddContacted((pre) => {
                                            return {
                                              ...pre,
                                              ServiceRequestStatusId: "",
                                              ContactDate:selectedDateContact,

                                            };
                                          });
                                        }}
                                      />
                                      <Form.Check
                                        type="radio"
                                        label="Product already received at workshop"
                                        name="radioGroup"
                                        checked={
                                          addContacted?.TypeService ==
                                          "Product already received at workshop"
                                        }
                                        value="workshop"
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setAddContacted((pre) => {
                                              return {
                                                ...pre,
                                                TypeService:
                                                  "Product already received at workshop",
                                                  ContactDate: selectedDateContact,

                                              };
                                            });
                                          } else {
                                            setAddContacted((pre) => {
                                              return {
                                                ...pre,
                                                TypeService: "",
                                                ContactDate: selectedDateContact,
                                              };
                                            });
                                          }
                                          setAddContacted((pre) => {
                                            return {
                                              ...pre,
                                              ServiceRequestStatusId: "",
                                              ContactDate: selectedDateContact,

                                            };
                                          });
                                        }}
                                        style={{
                                          color: "#000",
                                          fontWeight: "400",
                                          fontSize: "12px",
                                          textAlign: "left",
                                          margin: "15px 15px 0px 0px",
                                          display: "inline-block",
                                        }}
                                      />
                                    </Col>
                                  </Row>

                                  {addContacted?.TypeService ? (
                                    <Row className=" mt-1 align-items-center justofy-content-center  ">
                                      <Col
                                        md={2}
                                        style={{
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <Form.Group className="text-start">
                                          <Form.Label>
                                            {addContacted?.TypeService ==
                                              "Customer Contacted"
                                              ? "Contact date"
                                              : "Product received date"}
                                          </Form.Label>
                                          <Form.Control
                                            type="date"
                                            value={moment(
                                              addContacted?.ContactDate
                                            )?.format("YYYY-MM-DD")}
                                            onChange={(e) => {
                                              setSelectedDateContact(
                                                e.target.value
                                              );
                                              setAddContacted((pre) => {
                                                return {
                                                  ...pre,
                                                  ContactDate: e.target.value,
                                                };
                                              });
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col
                                        md={2}
                                        style={{
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <Form.Group>
                                          <Form.Label className="text-start">
                                            Serial No{" "}
                                            <span className="req-t">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="SerialNo"
                                            id="srlNo"
                                            value={addContacted?.SerialNo}
                                            onChange={(e) => {
                                              setAddContacted((pre) => {
                                                return {
                                                  ...pre,
                                                  SerialNo: e.target.value,
                                                };
                                              });
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={2}>
                                        <Form.Label>
                                          Product Code{" "}
                                          <span className="req-t">*</span>
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="prCode"
                                          value={addContacted?.ProductCode}
                                          onChange={(e) => {
                                            setAddContacted((pre) => {
                                              return {
                                                ...pre,
                                                ProductCode: e.target.value,
                                              };
                                            });
                                          }}
                                        />
                                      </Col>
                                      <Col
                                        md={2}
                                        style={{
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <Form.Group className="text-start">
                                          <Form.Label>
                                            Invoice date{" "}
                                            <span className="req-t">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="date"
                                            max={currentDate}
                                            value={moment(
                                              addContacted?.InvoiceDate
                                            )?.format("YYYY-MM-DD")}
                                            onChange={(e) => {
                                              setAddContacted((pre) => {
                                                return {
                                                  ...pre,
                                                  InvoiceDate: e.target.value,
                                                };
                                              });
                                              console.log(addContacted);
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>

                                      {getDataOfTicket?.ascServiceTicketCustomer
                                        ?.length < 1 ? (
                                        <Col md={2} className="mt-4">
                                          <Button
                                            variant=""
                                            disabled={verifiedProduct}
                                            onClick={handleVerify}
                                            className="add-Btn"
                                          >
                                            <MdVerifiedUser fontSize={20} />
                                          </Button>
                                        </Col>
                                      ) : (
                                        ""
                                      )}
                                    </Row>
                                  ) : (
                                    ""
                                  )}

                                  {(getDataOfTicket?.ascServiceTicketCustomer
                                    ?.length > 0 ||
                                    verifiedProduct) && (
                                      <>
                                        <Row className="mt-2">
                                          <Col
                                            md={3}
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <Form.Group className="text-start">
                                              <Form.Label>
                                                Invoice No{" "}
                                                <span className="req-t">*</span>
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                name="InvoiceNo"
                                                value={addContacted.InvoiceNo}
                                                onChange={customerhandleChange}
                                              />
                                            </Form.Group>
                                          </Col>
                                          {/* {(addContacted.uploadInvoice && verifiedProduct) ? (
                                                                                                <Col md={3} style={{ whiteSpace: 'nowrap' }}>
                                                                                                    <Form.Group className="text-start">
                                                                                                        <Form.Label>Download Invoice :</Form.Label>
                                                                                                        <a className='ml-2 ' style={{
                                                                                                            fontSize: '12px'
                                                                                                        }} href={addContacted.uploadInvoice} target="_blank" rel="noopener noreferrer"><IoIosDownload fontSize={25} color='#58a718' />
                                                                                                        </a>
                                                                                                    </Form.Group>
                                                                                                </Col>)
                                                                                                : (<Col md={3} style={{ whiteSpace: 'nowrap' }}>
                                                                                                    <Form.Group className="text-start">
                                                                                                        <Form.Label>Upload Invoice :</Form.Label>
                                                                                                        <Form.Control type='file' />
                                                                                                    </Form.Group>
                                                                                                </Col>)

                                                                                            } */}
                                          <Col
                                            md={3}
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <Form.Group className="text-start">
                                              <Form.Label>
                                                Upload/Download Invoice
                                              </Form.Label>
                                              <InputGroup className="">
                                                <Form.Control
                                                  type="file"
                                                  onChange={async (e) => {
                                                    console.log(
                                                      e.target.files[0]
                                                    );
                                                    if (
                                                      e.target.files.length > 0
                                                    ) {
                                                      let data = await getBase64(
                                                        e.target.files[0]
                                                      );
                                                      console.log(
                                                        data,
                                                        "---------"
                                                      );
                                                      setAddContacted((pre) => {
                                                        return {
                                                          ...pre,
                                                          InvoiceDocFile: data,
                                                        };
                                                      });
                                                      // localStorage.setItem("InvoiceFilePath", data)
                                                      setFile(
                                                        URL.createObjectURL(
                                                          e.target.files[0]
                                                        )
                                                      );
                                                    } else {
                                                      setAddContacted((pre) => {
                                                        return {
                                                          ...pre,
                                                          InvoiceDocFile: "",
                                                        };
                                                      });
                                                    }
                                                  }}
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                          </Col>
                                          <Col
                                            md={1}
                                            style={{
                                              marginTop: "30px",
                                            }}
                                          >
                                            <InputGroup className="">
                                              {addContacted?.InvoiceDocFile !=
                                                "" ? (
                                                <InputGroup.Text>
                                                  <a
                                                    className=" "
                                                    style={{
                                                      fontSize: "12px",
                                                      cursor: "pointer",
                                                    }}
                                                    href={
                                                      addContacted.InvoiceDocFile
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    <FaDownload
                                                      fontSize={20}
                                                      color="#58a718"
                                                    />
                                                  </a>
                                                </InputGroup.Text>
                                              ) : (
                                                ""
                                              )}
                                            </InputGroup>
                                          </Col>
                                          {verifiedWarrantyStatus && (
                                            <Col md={2}>
                                              {/* <p style={{
                                                                                                            fontWeight: '600',
                                                                                                            fontSize: '11px'
                                                                                                        }} className='p-0 m-0 '>Warranty Status
                                                                                                        </p> */}
                                              <Form.Label>
                                                Warranty Status
                                              </Form.Label>

                                              <p className="m-0">
                                                {verifiedWarrantyStatus ==
                                                  "In Warranty" ||
                                                  verifiedWarrantyStatus ==
                                                  "In Progress" ? (
                                                  <span
                                                    style={{
                                                      backgroundColor: "#7bc143",
                                                      padding: "5px",
                                                      borderRadius: "5px",
                                                      color: "#fff",
                                                      marginLeft: "4px",
                                                      fontSize: "11px",
                                                    }}
                                                  >
                                                    {verifiedWarrantyStatus}
                                                  </span>
                                                ) : (
                                                  <span
                                                    style={{
                                                      backgroundColor: "red",
                                                      padding: "5px",
                                                      borderRadius: "5px",
                                                      color: "#fff",
                                                      marginLeft: "4px",
                                                      fontSize: "11px",
                                                    }}
                                                  >
                                                    {verifiedWarrantyStatus}
                                                  </span>
                                                )}
                                              </p>
                                            </Col>
                                          )}
                                          <Col md={3}>
                                            <Form.Group className="">
                                              <Form.Label>
                                                Remarks{" "}
                                                <span className="req-t">*</span>
                                              </Form.Label>
                                              <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name="Remarks"
                                                value={addContacted.Remarks}
                                                onChange={customerhandleChange}
                                              />
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col
                                            md={3}
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <Form.Group>
                                              <Form.Label className="text-start">
                                                Service request status{" "}
                                                <span className="req-t">*</span>
                                              </Form.Label>
                                              <Form.Select
                                                value={
                                                  addContacted?.ServiceRequestStatusId
                                                }
                                                onChange={(e) => {
                                                  setSelectedRequest(
                                                    e.target.value
                                                  );

                                                  setAddContacted((pre) => {
                                                    return {
                                                      ...pre,
                                                      ServiceRequestStatusId:
                                                        e.target.value,
                                                    };
                                                  });

                                                  fetch(
                                                    `${process.env.REACT_APP_API_URL}STSubStatus/GetSTSubStatusByStatus?stStatusId=${e.target.value}`,
                                                    {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`,
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      console.log(result);
                                                      setStSubStatus(result);
                                                    });
                                                }}
                                              >
                                                <option value="Select">
                                                  Select
                                                </option>
                                                {StStatus?.map((status, i) => {
                                                  return (
                                                    <>
                                                      <option
                                                        value={status?.stStatusId}
                                                      >
                                                        {status?.stStatusName}
                                                      </option>
                                                    </>
                                                  );
                                                })}
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>

                                          <Col
                                            md={3}
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <Form.Group>
                                              <Form.Label className="text-start">
                                                Service request sub status{" "}
                                                <span className="req-t">*</span>
                                              </Form.Label>
                                              <Form.Select
                                                value={
                                                  addContacted?.ServiceRequestSubStatusId
                                                }
                                                onChange={(e) => {
                                                  // setServiceRequestFirst(e.target.value)
                                                  setAddContacted((pre) => {
                                                    return {
                                                      ...pre,
                                                      ServiceRequestSubStatusId:
                                                        e.target.value,
                                                    };
                                                  });
                                                }}
                                              >
                                                <option value="Select">
                                                  Select
                                                </option>
                                                {StSubStatus?.map((status, i) => {
                                                  return (
                                                    <>
                                                      <option
                                                        value={
                                                          status?.stSubStatusId
                                                        }
                                                      >
                                                        {status?.stSubStatusName}
                                                      </option>
                                                    </>
                                                  );
                                                })}
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>
                                          {addContacted?.TypeService ==
                                            "Product already received at workshop" ? (
                                            <Col md={3}>
                                              <Form.Group>
                                                <Form.Label>
                                                  Activities
                                                </Form.Label>

                                                <MultiSelect
                                                  value={
                                                    addContacted?.AscActivitiesName
                                                  }
                                                  options={[
                                                    {
                                                      label: "Rewinding",
                                                      value: "Rewinding",
                                                    },
                                                    {
                                                      label:
                                                        "Repair done at Workshop",
                                                      value:
                                                        "Repair done at Workshop",
                                                    },
                                                  ]}
                                                  onChange={function noRefCheck(
                                                    e
                                                  ) {
                                                    console.log(e);
                                                    setAddContacted((pre) => {
                                                      return {
                                                        ...pre,
                                                        AscActivitiesName: e,
                                                      };
                                                    });
                                                  }}
                                                  valueRenderer={
                                                    customValueRenderer
                                                  }
                                                  labelledBy={"Select"}
                                                />
                                              </Form.Group>
                                            </Col>
                                          ) : (
                                            ""
                                          )}
                                        </Row>
                                      </>
                                    )}
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Form>

                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                              <p className="m-0">
                                {saved || activeKeyEdit == "2" ? (
                                  <FaCircleCheck
                                    color="#58a718"
                                    fontSize={20}
                                    className="mr-2"
                                  />
                                ) : (
                                  <strong className="mr-2">2</strong>
                                )}
                                Site Visit or Product to be received at workshop{" "}
                              </p>
                              <span>
                                <Button
                                  variant=""
                                  type="submit"
                                  style={{
                                    outline: "none",
                                    border: "none",
                                  }}
                                >
                                  <IoMdSave
                                    color="#7bc143"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      // if (requestForSiteVisit) {
                                      //     setVerifiedWork(true);
                                      //     setSaved(true);
                                      //     setServiceTasks(true)

                                      //     // Ensure saved is false when workCompleted is true
                                      // } else {
                                      //     // setVerifiedWork(true);
                                      //     setSaved(true)
                                      //     setactiveKeyEdit('2');
                                      //     setServiceTasks(true)

                                      // }
                                      // if (verifiedWork) {
                                      //     setSaved(true);
                                      //     setServiceTasks(true)

                                      //     // Ensure saved is false when workCompleted is true
                                      //     setactiveKeyEdit('2')

                                      // }

                                      // if (
                                      //   (tab2Data?.TypeService == "") &&
                                      //  ( tab2Data?.ServiceDate == "" ||
                                      //   tab2Data?.AssignTechician == "" ||
                                      //   tab2Data?.Remarks == "")
                                      // ) {
                                      //   console.log("1");
                                      //   Swal.fire({
                                      //     icon: "error",
                                      //     title:
                                      //       "Please fill all the fields marked with red *!",
                                      //   });
                                      // } else if (
                                      //   (tab2Data?.TypeService ==
                                      //   "Product to be received at workshop") &&
                                      //  ( tab2Data?.ProductReceivedDate == "" ||
                                      //   tab2Data?.ProductReceviedType == "" ||
                                      //   tab2Data?.Remarks == "")
                                      // ) {
                                      //   console.log("2");
                                      //   Swal.fire({
                                      //     icon: "error",
                                      //     title:
                                      //       "Please fill all the fields marked with red *!",
                                      //   });
                                      // } else
                                      
                                      
                                      if (
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived
                                          ?.length >= 1
                                      ) {
                                        let n = {
                                          ...tab2Data,
                                          AscActivitiesName:
                                            tab2Data?.AscActivitiesName?.map(
                                              (i) => i.value
                                            ).toString(),
                                        };
                                        console.log("Update tab 2");
                                        fetch(
                                          `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertASCSiteVisitAndProductReceived`,
                                          {
                                            method: "POST",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                              Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(n),
                                          }
                                        ).then((res) => {
                                          let resp = res.text();
                                          resp.then((r) => {
                                            console.log(r);
                                            let regextest = /^[a-zA-Z0-9]+$/;
                                            if (r.match(regextest)) {
                                              // setactiveKeyEdit('2');
                                              //     setServiceTasks(true)
                                              settab2Submitted(true);
                                              if (
                                                tab2Data?.ProductReceviedType ==
                                                "Work Completed" ||
                                                tab2Data?.ProductReceviedType ==
                                                "Product to be received at workshop" ||
                                                (tab2Data?.ProductReceviedType &&
                                                  tab2Data?.ProductReceviedASCDate) || tab2Data?.TypeService=="Work Completed" || tab2Data?.TypeService=="Revisit Required" 
                                              ) {
                                                setactiveKeyEdit("2");
                                              }
                                            } else {
                                              Swal.fire({
                                                icon: "error",
                                                title: "Something went wrong",
                                              });
                                            }
                                          });
                                        });
                                      } else if (
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived
                                          ?.length < 1
                                      ) {
                                        let n = {
                                          ...tab2Data,
                                          AscActivitiesName:
                                            tab2Data?.AscActivitiesName?.map(
                                              (i) => i.value
                                            ).toString(),
                                        };
                                        console.log(tab2Data);
                                        console.log("new data");
                                        fetch(
                                          `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertASCSiteVisitAndProductReceived`,
                                          {
                                            method: "POST",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                              Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(n),
                                          }
                                        ).then((res) => {
                                          let resp = res.text();
                                          resp.then((r) => {
                                            console.log(r);
                                            console.log(tab2Data);
                                            let regextest = /^[a-zA-Z0-9]+$/;
                                            if (r.match(regextest)) {
                                              // setactiveKeyEdit('2');
                                              //     setServiceTasks(true)
                                              settab2Submitted(true);

                                              if (
                                                tab2Data?.ProductReceviedType ==
                                                "Work Completed" ||
                                                tab2Data?.ProductReceviedType ==
                                                "Product to be received at workshop" ||
                                                (tab2Data?.ProductReceviedType &&
                                                  tab2Data?.ProductReceviedASCDate) || tab2Data?.TypeService=="Work Completed" || tab2Data?.TypeService=="Revisit Required"
                                              ) {
                                                setactiveKeyEdit("2");
                                              }
                                            } else {
                                              Swal.fire({
                                                icon: "error",
                                                title: "Something went wrong!",
                                              });
                                            }
                                          });
                                        });
                                      }

                                      // setShowRadioButtons(true)
                                    }}
                                    fontSize={20}
                                  />
                                </Button>
                                <span>
                                  <Button
                                    style={{
                                      outline: "none",
                                      border: "none",
                                    }}
                                    variant=""
                                  // disabled={getDataOfTicket?.ascServiceTicketCustomer?.typeService=="Product already received at workshop"}
                                  >
                                    {" "}
                                    <IoArrowUpOutline
                                      fontSize={15}
                                      color="#fff"
                                      onClick={() => {
                                        setactiveKeyEdit("0");
                                      }}
                                    />
                                  </Button>
                                </span>
                              </span>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0 pb-1">
                            <Row>
                              <Col>
                                {addContacted?.ServiceRequestStatusId != "" ||
                                  getDataOfTicket?.ascServiceTicketCustomer
                                    ?.serviceRequestStatusId ? (
                                  <>
                                    <Row className=" mt-2 justify-content-center align-items-center">
                                      <Col md={3}>
                                        <Form.Group className="text-start">
                                          <Form.Label>
                                            {" "}
                                            Select{" "}
                                            {addContacted?.ServiceRequestStatusId ==
                                              "8" &&
                                              tab2Data?.TypeService !=
                                              "Product to be received at workshop"
                                              ? "site visit"
                                              : addContacted?.ServiceRequestStatusId ==
                                                "10" ||
                                                tab2Data?.TypeService ==
                                                "Product to be received at workshop"
                                                ? " expected "
                                                : ""}{" "}
                                            date
                                          </Form.Label>
                                          <Form.Control
                                            type="date"
                                            min={currentDate}
                                            value={
                                              (addContacted?.ServiceRequestStatusId ==
                                                "8" &&
                                                tab2Data?.TypeService ==
                                                "") || (addContacted?.ServiceRequestStatusId=="8")
                                                ? moment(
                                                  tab2Data?.ServiceDate
                                                )?.format("YYYY-MM-DD")
                                                : (addContacted?.ServiceRequestStatusId ==
                                                  "10" ||
                                                  tab2Data?.TypeService ==
                                                  "Product to be received at workshop")
                                                  ? moment(
                                                    tab2Data?.ProductReceivedDate
                                                  )?.format("YYYY-MM-DD")
                                                  : ""
                                            }
                                            // disabled={verifiedWork}

                                            onChange={(e) => {
                                              setSelectedDate(e.target.value);
                                              if (
                                                addContacted?.ServiceRequestStatusId ==
                                                "8" || tab2Data?.TypeService == ""
                                              ) {
                                                settab2Data((pre) => {
                                                  return {
                                                    ...pre,
                                                    ServiceDate: e.target.value,
                                                    ProductReceivedDate: "",
                                                  };
                                                });
                                              } else if (
                                                addContacted?.ServiceRequestStatusId ==
                                                "10"
                                              ) {
                                                settab2Data((pre) => {
                                                  return {
                                                    ...pre,
                                                    ProductReceivedDate:
                                                      e.target.value,
                                                    ServiceDate: "",
                                                  };
                                                });
                                              }
                                              else if (
                                                tab2Data?.TypeService == "Product to be received at workshop"
                                              ) {
                                                settab2Data((pre) => {
                                                  return {
                                                    ...pre,
                                                    ProductReceivedDate:
                                                      e.target.value,
                                                    ServiceDate: "",
                                                  };
                                                });
                                              }

                                              if (
                                                addContacted?.ServiceRequestStatusId ==
                                                "10" ||
                                                getDataOfTicket
                                                  ?.ascServiceTicketCustomer[0]
                                                  ?.serviceRequestStatusId ==
                                                "10" ||
                                                tab2Data?.TypeService ==
                                                "Product to be received at workshop"
                                              ) {
                                                calculateDateAfterAddDays();
                                              }

                                              console.log(tab2Data);
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>
                                      {addContacted?.ServiceRequestStatusId ==
                                        "8" &&
                                        tab2Data?.TypeService !=
                                        "Product to be received at workshop" ? (
                                        <Col md={3}>
                                          <Form.Group>
                                            <Form.Label className="text-start">
                                              Assign technician{" "}
                                              <span className="req-t">*</span>
                                            </Form.Label>
                                            <Form.Select
                                              value={tab2Data?.AssignTechician}
                                              // disabled={verifiedWork}
                                              onChange={(e) => {
                                                settab2Data((pre) => {
                                                  return {
                                                    ...pre,
                                                    AssignTechician:
                                                      e.target.value,
                                                  };
                                                });

                                                console.log(tab2Data);
                                              }}
                                            >
                                              <option value="Select">
                                                Select
                                              </option>
                                              {ASCWiseTecnicians?.map(
                                                (technician, i) => {
                                                  return (
                                                    <>
                                                      <option
                                                        value={
                                                          technician?.technicianId
                                                        }
                                                      >
                                                        {
                                                          technician?.technicianName
                                                        }
                                                      </option>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </Form.Select>
                                          </Form.Group>
                                        </Col>
                                      ) : (
                                        ""
                                      )}

                                      {(tab2Data?.TypeService ==
                                        "Product to be received at workshop" || addContacted?.ServiceRequestStatusId == "10") ? (
                                        <Col md={3}>
                                          <Form.Group>
                                            <Form.Label>Activities</Form.Label>

                                            <MultiSelect
                                              value={
                                                tab2Data?.AscActivitiesName
                                              }
                                              options={[
                                                {
                                                  label: "Rewinding",
                                                  value: "Rewinding",
                                                },
                                                {
                                                  label:
                                                    "Repair done at Workshop",
                                                  value:
                                                    "Repair done at Workshop",
                                                },
                                              ]}
                                              onChange={function noRefCheck(e) {
                                                console.log(e);
                                                settab2Data((pre) => {
                                                  return {
                                                    ...pre,
                                                    AscActivitiesName: e,
                                                  };
                                                });
                                              }}
                                              valueRenderer={
                                                customValueRenderer
                                              }
                                              labelledBy={"Select"}
                                            />
                                          </Form.Group>
                                        </Col>
                                      ) : (
                                        ""
                                      )}
                                      <Col md={3}>
                                        <Form.Group className="">
                                          <Form.Label>
                                            Remarks{" "}
                                            <span className="req-t">*</span>
                                          </Form.Label>
                                          <Form.Control
                                            as="textarea"
                                            value={tab2Data?.Remarks}
                                            rows={2}
                                            name="Remarks"
                                            onChange={(e) => {
                                              settab2Data((pre) => {
                                                return {
                                                  ...pre,
                                                  Remarks: e.target.value,
                                                };
                                              });

                                              console.log(tab2Data);
                                            }}
                                          // disabled={verifiedWork}
                                          />
                                        </Form.Group>
                                      </Col>
                                      {/* <Col md={2} className="mt-4 text-center">
                                        <p className="m-0 p-0">Print job sheet</p>
                                        <FaPrint fontSize={25} style={{
                                          cursor:'pointer'
                                        }}  />



                                      </Col> */}
                                    </Row>

                                    {(addContacted?.ServiceRequestStatusId ==
                                      "10" ||
                                      getDataOfTicket
                                        ?.ascServiceTicketCustomer[0]
                                        ?.serviceRequestStatusId == "10" ||
                                      tab2Data?.TypeService ==
                                      "Product to be received at workshop") && (
                                        <>
                                          <Row className="mt-1">
                                            <p
                                              className="m-0"
                                              style={{
                                                color: "red",
                                                fontSize: "11px",
                                              }}
                                            >
                                              Product Should be received by ASC
                                              within {ascNoOfDays} days -{" "}
                                              {selectedDate
                                                ? calculateDateAfterAddDays()
                                                : getDataOfTicket
                                                  ?.ascSiteVisitAndProductReceived
                                                  ?.length >= 1
                                                  ? calculateDateAfterAddDays2()
                                                  : ""}{" "}
                                            </p>
                                          </Row>
                                          <Row className=" text-left ">
                                            <Col lg={12} md={6} sm={12}>
                                              <Form.Check
                                                type="radio"
                                                label="Product received at workshop"
                                                name="radioGrouptype"
                                                value="recevied"
                                                checked={
                                                  tab2Data?.ProductReceviedType ==
                                                  "Product received at workshop"
                                                }
                                                // disabled={verifiedWork}
                                                style={{
                                                  color: "#000",
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                  margin: "2px 15px 0px 0px",
                                                  display: "inline-block",
                                                }}
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    settab2Data((pre) => {
                                                      return {
                                                        ...pre,
                                                        ProductReceviedType:
                                                          "Product received at workshop",
                                                      };
                                                    });
                                                  } else {
                                                    settab2Data((pre) => {
                                                      return {
                                                        ...pre,
                                                        ProductReceviedType: "",
                                                      };
                                                    });
                                                  }

                                                  console.log(tab2Data);
                                                }}
                                              />

                                              <Form.Check
                                                type="radio"
                                                label="Product not  received at workshop (Ticket to be closed)"
                                                name="radioGrouptype"
                                                value="close"
                                                checked={
                                                  tab2Data?.ProductReceviedType ==
                                                  "Product not  received at workshop (Ticket to be closed)"
                                                }
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    settab2Data((pre) => {
                                                      return {
                                                        ...pre,
                                                        ProductReceviedType:
                                                          "Product not  received at workshop (Ticket to be closed)",
                                                      };
                                                    });
                                                  } else {
                                                    settab2Data((pre) => {
                                                      return {
                                                        ...pre,
                                                        ProductReceviedType: "",
                                                      };
                                                    });
                                                  }

                                                  console.log(tab2Data);
                                                }}
                                                style={{
                                                  color: "#000",
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                  margin: "2px 15px 0px 0px",
                                                  display: "inline-block",
                                                }}
                                              />
                                            </Col>

                                            {tab2Data?.ProductReceviedType ==
                                              "Product received at workshop" && (
                                                <>
                                                  <Col md={3}>
                                                    <Form.Group className="text-start">
                                                      <Form.Label>
                                                        {" "}
                                                        Select date
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="date"
                                                        min={currentDate}
                                                        value={moment(
                                                          tab2Data?.ProductReceviedASCDate
                                                        )?.format("YYYY-MM-DD")}
                                                        onChange={(e) => {
                                                          // setSelectedDateWorkShop(e.target.value)

                                                          settab2Data((pre) => {
                                                            return {
                                                              ...pre,
                                                              ProductReceviedASCDate:
                                                                e.target.value,
                                                            };
                                                          });
                                                        }}
                                                      />
                                                    </Form.Group>
                                                  </Col>
                                                </>
                                              )}
                                          </Row>
                                        </>
                                      )}

                                    {(tab2Submitted &&
                                      addContacted?.ServiceRequestStatusId ==
                                      "8") ||
                                      (getDataOfTicket
                                        ?.ascServiceTicketCustomer[0]
                                        ?.serviceRequestStatusId == "8" &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived
                                          ?.length >= 1) ||
                                      ((addContacted?.ServiceRequestStatusId ==
                                        "8" ||
                                        getDataOfTicket
                                          ?.ascServiceTicketCustomer[0]
                                          ?.serviceRequestStatusId == "8") &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived[0]
                                          ?.productReceviedType ==
                                        "Work Completed") ||
                                      ((addContacted?.ServiceRequestStatusId ==
                                        "8" ||
                                        getDataOfTicket
                                          ?.ascServiceTicketCustomer[0]
                                          ?.serviceRequestStatusId == "8") &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived[0]
                                          ?.productReceviedType ==
                                        "Product to be received at workshop") ||
                                      (getDataOfTicket
                                        ?.ascSiteVisitAndProductReceived[0]
                                        ?.typeService == "Site Visit" &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived[0]
                                          ?.serviceDate &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived[0]
                                          ?.assignTechician &&
                                        getDataOfTicket
                                          ?.ascSiteVisitAndProductReceived[0]
                                          ?.remarks) ? (
                                      tab2Data?.TypeService ==
                                        "Product to be received at workshop" ? (
                                        ""
                                      ) : (
                                        <Row className="justify-content-center">
                                          <Col lg={8} md={8}>
                                            <Row className="justify-content-center text-center">
                                              <Col>
                                                <Form.Check
                                                  type="radio"
                                                  label="Revisit Required"
                                                  name="radioGroupWorkStatus"
                                                  value="Revisit Required"
                                                  style={{
                                                    color: "#000",
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    textAlign: "left",
                                                    margin: "15px 15px 0px 0px",
                                                    display: "inline-block",
                                                  }}
                                                  checked={
                                                    tab2Data?.TypeService ==
                                                    "Revisit Required"
                                                  }
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService:
                                                            "Revisit Required",
                                                        };
                                                      });
                                                    } else {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService: "",
                                                        };
                                                      });
                                                    }
                                                  }}
                                                />
                                              </Col>
                                              <Col>
                                                <Form.Check
                                                  type="radio"
                                                  label="Work Completed"
                                                  name="radioGroupWorkStatus"
                                                  value="Work Completed"
                                                  style={{
                                                    color: "#000",
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    textAlign: "left",
                                                    margin: "15px 15px 0px 0px",
                                                    display: "inline-block",
                                                  }}
                                                  checked={
                                                    tab2Data?.TypeService ==
                                                    "Work Completed"
                                                  }
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService:
                                                            "Work Completed",
                                                        };
                                                      });
                                                    } else {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService: "",
                                                        };
                                                      });
                                                    }
                                                  }}
                                                />
                                              </Col>

                                              <Col>
                                                <Form.Check
                                                  type="radio"
                                                  label="Product to be received at workshop"
                                                  name="radioGroupWorkStatus"
                                                  value="Product to be received at workshop"
                                                  checked={
                                                    tab2Data?.TypeService ==
                                                    "Product to be received at workshop"
                                                  }
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService:
                                                            "Product to be received at workshop",
                                                          ServiceDate: "",
                                                          AssignTechician: "0",
                                                          Remarks: "",
                                                        };
                                                      });
                                                    } else {
                                                      settab2Data((pre) => {
                                                        return {
                                                          ...pre,
                                                          TypeService: "",
                                                        };
                                                      });
                                                    }
                                                  }}
                                                  style={{
                                                    color: "#000",
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    textAlign: "left",
                                                    margin: "15px 15px 0px 0px",
                                                    display: "inline-block",
                                                  }}
                                                />
                                              </Col>
                                            </Row>

                                            {tab2Data?.TypeService ==
                                              "Revisit Required" ||
                                              tab2Data?.TypeService ==
                                              "Work Completed" ? (
                                              <Row className="justify-content-center mt-3">
                                                <Col md={4}>
                                                  <Form.Group>
                                                    <Form.Label>
                                                      {tab2Data?.TypeService ==
                                                        "Revisit Required"
                                                        ? `Revisit`
                                                        : tab2Data?.TypeService ==
                                                          "Work Completed"
                                                          ? `Work completion`
                                                          : ""}{" "}
                                                      Date
                                                    </Form.Label>
                                                    <Form.Control type="date" />
                                                  </Form.Group>
                                                </Col>
                                                {tab2Data?.TypeService ==
                                                  "Revisit Required" ? (
                                                  <Col md={4}>
                                                    <Form.Group>
                                                      <Form.Label>
                                                        Remarks
                                                      </Form.Label>
                                                      <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                      />
                                                    </Form.Group>
                                                  </Col>
                                                ) : (
                                                  ""
                                                )}
                                              </Row>
                                            ) : (
                                              ""
                                            )}
                                          </Col>
                                        </Row>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </Col>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                              <p className="m-0">
                                {serviceTasks ? (
                                  <FaCircleCheck
                                    color="#58a718"
                                    fontSize={20}
                                    className="mr-2"
                                  />
                                ) : (
                                  <strong className="mr-2">3</strong>
                                )}
                                Service activity/field information report
                              </p>
                              <span>
                                <Button
                                  disabled={!serviceTasks}
                                  variant=""
                                  style={{
                                    outline: "none",
                                    border: "none",
                                  }}
                                >
                                  <IoMdSave
                                    onClick={() => {
                                      setServiceTasks(true);
                                      setactiveKeyEdit("5");
                                    }}
                                    color="#7bc143"
                                    fontSize={20}
                                  />
                                </Button>
                                <span>
                                  <Button
                                    style={{
                                      outline: "none",
                                      border: "none",
                                    }}
                                    variant=""
                                  >
                                    {" "}
                                    <IoArrowUpOutline
                                      fontSize={15}
                                      color="#fff"
                                      onClick={() => {
                                        // setactiveKeyEdit('1')
                                        if (alreadyWorkshoop) {
                                          setactiveKeyEdit("0");
                                        } else {
                                          setactiveKeyEdit("1");
                                        }
                                      }}
                                    />
                                  </Button>
                                </span>
                              </span>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0 pb-1">
                            <Row>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Product Serial No</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="SerialNo"
                                    value={tab3Data?.SerialNo}
                                    onChange={(e) => {
                                      settab3Data((pre) => {
                                        return {
                                          ...pre,
                                          SerialNo: e.target.value
                                        }
                                      })
                                    }}

                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Division</Form.Label>
                                  <Form.Select
                                    name="DivCode"
                                    value={tab3Data?.DivisionCode}
                                    onChange={(e) => {
                                      settab3Data((pre) => {
                                        return {
                                          ...pre,
                                          DivisionCode: e.target.value
                                        }
                                      })

                                      const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;
                                      fetch(getAllProductLines, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          console.log(result);
                                          setallproductLines(result);
                                        });
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {allDivisions?.map((division, i) => {
                                      return (
                                        <>
                                          <option
                                            value={division?.parameterTypeId}
                                          >
                                            {division?.parameterType}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Product Line</Form.Label>
                                  <Form.Select
                                    name="ProductType"
                                    value={tab3Data?.ProductLineCode}
                                    onChange={(e) => {
                                      settab3Data((pre) => {
                                        return {
                                          ...pre,
                                          ProductLineCode: e.target.value
                                        }
                                      })
                                      const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                                      fetch(productGroupURl, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          console.log(result);
                                          setallproductGroup(result);
                                          // Set default productLineCode if result is not empty
                                        });
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {allproductLines.map((productLine) => (
                                      <option
                                        key={productLine.productLineCode}
                                        value={productLine.parameterTypeId}
                                      >
                                        {productLine.parameterType}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Product Group</Form.Label>
                                  <Form.Select
                                    name="ProductCode"
                                    value={tab3Data?.ProductGroupCode}
                                  >
                                    <option value="">Select</option>
                                    {allproductGroup.map((productLine) => (
                                      <option
                                        key={productLine.productGroupCode}
                                        value={productLine.parameterTypeId}
                                      >
                                        {productLine.parameterType}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Product Code</Form.Label>

                                  {/* <Select
                                    aria-labelledby="aria-label"
                                    inputId="aria-example-input"
                                    name=""
                                    value={tab3Data?.ProductCode}
                                    loadingMessage="Loading"
                                    onChange={(e) => {
                                      console.log(e);
                                    }}
                                    options={sapProductCodes.map((option) => ({
                                      value: option.productCode,
                                      label: option.productDescription,
                                    }))}
                                  /> */}
                                  <Form.Control
                                    type="text"
                                    value={tab3Data?.ProductCode}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2} className="mt-3">
                                <Form.Group>
                                  <Form.Label>Product Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={tab3Data?.ProductDescription}
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mt-2">
                              <Col md={2} >
                                <Form.Group>
                                  <Form.Label>Batch no</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={tab3Data?.ProductDescription}
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>Invoice Date <span className="req-t">*</span></Form.Label>
                                  <Form.Control
                                    type="date"
                                    name='invoiceDate'
                                    value={addFirdata?.invoiceDate}
                                    onChange={(e) => {
                                      setAddFirData((pre) => {
                                        return {
                                          ...pre,
                                          invoiceDate: e.target.value
                                        }
                                      })
                                    }}

                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>Warranty Date <span className="req-t">*</span></Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="warrantyDate"

                                    value={addFirdata?.warrantyDate}
                                    onChange={handleChange}

                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>Upload Invoice Copy <span className="req-t">*</span></Form.Label>
                                  <Form.Control
                                    type="file"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>Type of application <span className="req-t">*</span></Form.Label>
                                  <Form.Select
                                    name="typeofApplication"
                                    value={addFirdata?.typeofApplication}
                                    onChange={handleChange}
                                  >
                                    <option value=''>Select</option>
                                    <option value='Aircurtain'>Aircurtain</option>
                                    <option value='ATM Machine'>ATM Machine</option>
                                    <option value='Atta Chakki'>Atta Chakki</option>
                                    <option value='Biotoilet'>Biotoilet</option>


                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>Total no of hours run <span className="req-t">*</span> </Form.Label>
                                  <Form.Control type='number'
                                    name="totalNoHours"
                                    value={addFirdata?.totalNoHours}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mt-2">
                              <Col md={12}>
                                <Form.Group>
                                  <Form.Label>Failure observation <span className="req-t">*</span></Form.Label>
                                  <Form.Control as='textarea' rows={3}
                                    name="failureObservation"
                                    value={addFirdata?.failureObservation}
                                    onChange={handleChange} />
                                </Form.Group>
                              </Col>
                            </Row>




                            <Row className="gap-3 mt-3 " >

                              <Col md={6} sm={12} style={{
                                boxShadow: "0px 0px 3px 3px #d4d4d4"

                              }} >
                                <p className="m-0 p-0 pg-label pl-2">Defect </p>
                                <Row className="mb-2">
                                  <Col md={5}>
                                    <Form.Group>
                                      <Form.Label>Defect Category <span className="req-t">*</span></Form.Label>
                                      <Form.Select
                                        value={
                                          addDefectCategoryOption?.defectCategoryItem
                                        }
                                        onChange={(e) =>
                                          setAddDefectCategoryOption({
                                            ...addDefectCategoryOption,
                                            defectCategoryItem: e.target.value,
                                          })
                                        }

                                      >

                                        <option value=''>Select</option>
                                        <option value='Paint Issue '>Paint Issue</option>
                                        <option value='Winding Burnt-Main Stator	'>Winding Burnt-Main Stator	</option>
                                        <option value='TB Broken	'>TB Broken	</option>

                                      </Form.Select>
                                    </Form.Group>
                                  </Col>

                                  <Col md={5}>
                                    <Form.Group>
                                      <Form.Label>Sub defect <span className="req-t">*</span> </Form.Label>
                                      <Form.Select
                                        value={
                                          addDefectCategoryOption?.defectItem
                                        }
                                        onChange={(e) =>
                                          setAddDefectCategoryOption({
                                            ...addDefectCategoryOption,
                                            defectItem: e.target.value,
                                          })
                                        }

                                      >
                                        <option value="">Select</option>
                                        <option value="Paint damage">Paint damage</option>
                                        <option value="Failed due to overload">Failed due to overload
                                        </option>
                                        <option value="terminal board broken">Terminal board broken
                                        </option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>

                                  <Col md={1} className="mt-4">
                                    <Tooltip
                                      arrow
                                      placement="right"
                                      title="add defect"
                                    >
                                      <IconButton
                                        className="edit-btn"
                                        onClick={handleAddDefect}
                                      >
                                        <FaCirclePlus
                                          color="green"
                                          fontSize={15}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Col>
                                  {defectList.length == 0 ? (
                                    ""
                                  ) : (
                                    <div style={{
                                      maxHeight: '200px',
                                      overflowY: 'scroll'
                                    }}>

                                      <Row className='m-0 p-0'>
                                        <Col md={12} className='m-0 p-0'>
                                          <Table responsive bordered className="mt-1 m-0 p-0">
                                            <thead>
                                              <tr
                                                style={{
                                                  fontSize: "12px",
                                                }}
                                              >
                                                <th className='m-0 pl-1 py-1 align-content-center'>Defect category</th>
                                                <th className='m-0 pl-1 py-1 align-content-center'>Sub defect</th>
                                                <th className='m-0 pl-1 py-1 align-content-center'>Actions</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {defectList?.map((add, index) => {
                                                return (
                                                  <tr
                                                    style={{
                                                      fontSize: "12px",
                                                    }}
                                                    key={index}
                                                  >
                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectCategoryItem}</td>
                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectItem}</td>
                                                    <td className='m-0 pl-1 py-0 align-content-center'>
                                                      {" "}
                                                      <Tooltip
                                                        arrow
                                                        placement="right"
                                                        title="remove"
                                                      >
                                                        <IconButton
                                                          className="edit-btn"
                                                          onClick={() =>
                                                            handleRemoveButtonClick(
                                                              index
                                                            )
                                                          }
                                                        >
                                                          <FaCircleMinus
                                                            color="red"
                                                            fontSize={20}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                            </tbody>
                                          </Table>
                                        </Col>
                                      </Row>
                                    </div>
                                  )}

                                </Row>

                              </Col>
                              <div style={{
                                boxShadow: "0px 0px 3px 3px #d4d4d4",
                                maxWidth: '48%'

                              }}>
                                <Row>

                                  <Col md={6} sm={12}>
                                    <Form.Group>
                                      <Form.Label>Type of activity<span className="req-t">*</span> </Form.Label>
                                      <Form.Select
                                        value={typeSelected}
                                        onChange={(e) => {
                                          setTypeSelected(e.target.value)
                                        }}
                                      >
                                        <option value="">Select</option>
                                        <option value="Local Repair">Local Repair</option>
                                        <option value="Outstation Repair">Outstation Repair</option>
                                        <option value="Outstation allowance">Outstation allowance</option>
                                        <option value="Travel Charges">Travel Charges</option>
                                        <option value="Repair Charges-IWH & SWH">Repair Charges-IWH & SWH</option>
                                        <option value="Outstation allowance">Outstation allowance</option>





                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                  <Col md={1} className='m-0 p-0 d-flex  ' style={{
                                    flexDirection: 'column-reverse'
                                  }}> <Tooltip
                                    arrow
                                    placement="right"
                                    title="activity add"
                                  >
                                      <IconButton
                                        className="edit-btn"
                                        onClick={activityAdd}
                                      >
                                        <FaCirclePlus
                                          color="green"
                                          fontSize={15}
                                        />
                                      </IconButton>
                                    </Tooltip></Col>

                                  {activityList.length == 0 ? (
                                    ""
                                  ) : (
                                    <div style={{
                                      maxHeight: '200px',
                                      overflowY: 'scroll'
                                    }}>

                                      <Row className='m-0 p-0'>
                                        <Col md={12} sm={12} className='m-0 p-0'>
                                          <Table responsive bordered className="m-0 mt-1 ">
                                            <thead>
                                              <tr
                                                style={{
                                                  fontSize: "12px",
                                                }}
                                              >
                                                <th className='m-0 pl-1 py-1 align-content-center'>Activity</th>
                                                <th className='m-0 pl-1 py-1 align-content-center'>Activity desc</th>
                                                <th className='m-0 pl-1 py-1 align-content-center'>Quantity</th>
                                                <th className='m-0 pl-1 py-1 align-content-center'>Action</th>

                                              </tr>
                                            </thead>
                                            <tbody className='p-0 m-0'>

                                              {activityList?.map((add, index) => {
                                                return (
                                                  <>
                                                    <tr
                                                      style={{
                                                        fontSize: "12px"
                                                      }}
                                                      key={index}
                                                    >
                                                      <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control value={add?.type}
                                                        type="text" /></Form.Group></td>
                                                      <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="text" /></Form.Group></td>
                                                      <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="number" /></Form.Group></td>
                                                      <td className='m-0 pl-1 py-0 align-content-center'>
                                                        {" "}
                                                        <Tooltip
                                                          arrow
                                                          placement="right"
                                                          title="remove"
                                                        >
                                                          <IconButton
                                                            className="edit-btn"
                                                            onClick={() =>
                                                              handleRemoveActivity(
                                                                index
                                                              )
                                                            }
                                                          >
                                                            <FaCircleMinus
                                                              color="red"
                                                              fontSize={15}
                                                            />
                                                          </IconButton>
                                                        </Tooltip>
                                                      </td>
                                                    </tr>


                                                  </>
                                                );
                                              })}

                                            </tbody>
                                          </Table>
                                        </Col>
                                      </Row>
                                    </div>
                                  )}
                                </Row>
                              </div>




                            </Row>





                            {/* <Col md={6}>
                        <Row className='mt-2'>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Type of activity<span className="req-t">*</span> </Form.Label>
                                    <Form.Select

                                    >
                                        <option value="">Select</option>


                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={1} className="mt-4">
                                <Tooltip
                                    arrow
                                    placement="right"
                                    title="add activity"
                                >
                                    <IconButton
                                        className="edit-btn"
                                        onClick={handleAddDefect}
                                    >
                                        <FaCirclePlus
                                            color="green"
                                            fontSize={25}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col> */}





                            <Row className='gap-3 mt-3 ' style={{
                              flexWrap: 'wrap'


                            }}>
                              <Col md={6} sm={12} style={{
                                boxShadow: "0px 0px 3px 3px #d4d4d4"

                              }}>
                                <Row className="mr-1">
                                  <Col md={11} className='m-0 p-0'>
                                    <p className="m-0 mt-2 p-0 pg-label pl-2">Photo upload </p>

                                    <Table responsive bordered className="m-0 mt-1 ">
                                      <thead>
                                        <tr
                                          style={{
                                            fontSize: "12px",
                                          }}
                                        >
                                          <th className='m-0 pl-1 py-1 align-content-center'>Document label</th>
                                          <th className='m-0 pl-1 py-1 align-content-center'>Upoad photo</th>
                                          {/* <th >Actions</th> */}
                                        </tr>
                                      </thead>
                                      <tbody className='p-0 m-0'>
                                        <tr>
                                          <td style={{ fontSize: '12px ', whiteSpace: 'nowrap' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label>Product name plate <span className="req-t">*</span> </Form.Label>
                                          </td>
                                          <td className='m-0 p-0 align-content-center'>
                                            <Form.Group>
                                              <InputGroup >
                                                <Form.Control
                                                  type="file"
                                                  accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                  onChange={(e) => {
                                                    if (e.target.files.length > 0) {
                                                      const file = e.target.files[0];
                                                      if (file) {
                                                        // Check if the file type is allowed
                                                        if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                          setAddFirData(prev => ({ ...prev, serialNumberSticker: file })
                                                          );
                                                          setFile(URL.createObjectURL(e.target.files[0]));
                                                        } else {
                                                          alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                          e.target.value = null;
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      addFirdata?.serialNumberSticker('')
                                                      setFile(null)
                                                    }

                                                  }}
                                                />
                                                {addFirdata?.serialNumberSticker != "" ?
                                                  <InputGroup.Text onClick={(e) => {
                                                    //setPreviewfile(!previewfile);
                                                    if (file) {
                                                      window.open(file, '_blank');
                                                    }
                                                    console.log("helo")
                                                  }}>
                                                    <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                  </InputGroup.Text> : ""

                                                }
                                              </InputGroup>

                                            </Form.Group></td>
                                        </tr>
                                        <tr>


                                          <td style={{ fontSize: '12px ', whiteSpace: 'nowrap' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label> Product photo prior to reparing <span className="req-t" style={{
                                            whiteSpace: "nowrap"
                                          }}>*</span> </Form.Label>
                                          </td>
                                          <td className='m-0 p-0 align-content-center'>
                                            <Form.Group>
                                              <InputGroup >
                                                <Form.Control
                                                  type="file"
                                                  accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                  onChange={(e) => {
                                                    if (e.target.files.length > 0) {
                                                      const file = e.target.files[0];
                                                      if (file) {
                                                        // Check if the file type is allowed
                                                        if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                          setAddFirData(prev => ({ ...prev, installtionCondition: file })
                                                          );
                                                          setFile(URL.createObjectURL(e.target.files[0]));
                                                        } else {
                                                          alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                          e.target.value = null;
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      setImageInstallationCondition('')
                                                    }

                                                  }}
                                                />
                                                {addFirdata?.installtionCondition != "" ?
                                                  <InputGroup.Text onClick={(e) => {
                                                    //setPreviewfile(!previewfile);
                                                    if (file) {
                                                      window.open(file, '_blank');
                                                    }
                                                    console.log("helo")
                                                  }}>
                                                    <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                  </InputGroup.Text> : ""

                                                }
                                              </InputGroup>

                                            </Form.Group></td>
                                        </tr>
                                        <tr>
                                          <td style={{ fontSize: '12px ' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label>Product photos after reparing/correction <span className="req-t" style={{
                                            whiteSpace: 'nowrap'
                                          }}>*</span> </Form.Label>
                                          </td>
                                          <td className='m-0 p-0 align-content-center'>
                                            <Form.Group>
                                              {/* <Form.Control type='file' onChange={handleFileChange}
                                                /> */}
                                              <InputGroup>
                                                <Form.Control
                                                  type="file"
                                                  accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                  onChange={(e) => {
                                                    if (e.target.files.length > 0) {
                                                      const file = e.target.files[0];
                                                      if (file) {
                                                        // Check if the file type is allowed
                                                        if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                          setAddFirData(prev => ({ ...prev, electricalCondition: file })
                                                          );
                                                          setFile(URL.createObjectURL(e.target.files[0]));
                                                        } else {
                                                          alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                          e.target.value = null;
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      setImage('')
                                                    }

                                                  }}
                                                />
                                                {addFirdata?.electricalCondition != "" ?
                                                  <InputGroup.Text onClick={(e) => {
                                                    //setPreviewfile(!previewfile);
                                                    if (file) {
                                                      window.open(file, '_blank');
                                                    }
                                                    console.log("helo")
                                                  }}>
                                                    <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                  </InputGroup.Text> : ""

                                                }
                                              </InputGroup>


                                            </Form.Group>
                                            {/* {image && (
                                                <img
                                                    src={image}
                                                    alt="Image preview"
                                                    style={{
                                                        display: 'block',
                                                        maxWidth: '200%',
                                                        maxHeight: '300px',
                                                        marginTop: '10px',
                                                    }}
                                                />
                                            )} */}
                                          </td>
                                        </tr>


                                        {fileInputs?.map((add, index) => {
                                          return (
                                            <>
                                              <tr
                                                style={{
                                                  fontSize: "12px"
                                                }}
                                                key={index}
                                              >
                                                <td style={{ fontSize: '12px ' }}
                                                  onChange={(e) => {
                                                    console.log('Current value:', e.target.value);
                                                    setUploadPhoto({ label: e.target.value });
                                                  }} className='m-0 py-0 pl-1 p-0  align-content-center'>

                                                  <Form.Control type='text' className='m-0   p-0  align-content-center' style={{
                                                    border: 'none',
                                                    color: '#005bab',
                                                    fontSize: '11px',
                                                    fontWeight: '700'


                                                  }} />

                                                </td>
                                                <td className='m-0 p-0  align-content-center'>
                                                  <Form.Group>
                                                    <InputGroup className='p-0 m-0'>
                                                      <Form.Control
                                                        type="file"
                                                        accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                        onChange={(e) => {
                                                          if (e.target.files.length > 0) {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                              // Check if the file type is allowed
                                                              if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                // setNewImage(file);
                                                                setUploadPhoto(prev => ({ ...prev, file: file })
                                                                );

                                                                setFile(URL.createObjectURL(e.target.files[0]));
                                                              } else {
                                                                alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                e.target.value = null;
                                                              }
                                                            }
                                                          }
                                                          else {
                                                            setNewImage('')
                                                          }

                                                        }}
                                                      />
                                                      {uploadPhoto?.file != "" ?
                                                        <InputGroup.Text onClick={(e) => {
                                                          //setPreviewfile(!previewfile);
                                                          if (file) {
                                                            window.open(file, '_blank');
                                                          }
                                                          console.log("helo")
                                                        }}>
                                                          <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                                        </InputGroup.Text> : ""

                                                      }
                                                      <InputGroup.Text className='p-0 m-0'>
                                                        <Tooltip
                                                          arrow
                                                          placement="right"
                                                          title="remove"
                                                        >
                                                          <IconButton
                                                            className="edit-btn"
                                                            onClick={() =>
                                                              handleRemovefile(
                                                                index
                                                              )
                                                            }
                                                          >
                                                            <FaCircleMinus
                                                              color="red"
                                                              fontSize={15}
                                                            />
                                                          </IconButton>
                                                        </Tooltip>

                                                      </InputGroup.Text>
                                                    </InputGroup>
                                                  </Form.Group>
                                                </td>


                                              </tr >


                                            </>
                                          );
                                        })}

                                      </tbody>
                                    </Table>
                                  </Col>
                                  <Col md={1} className='m-0 p-0 d-flex  ' style={{
                                    flexDirection: 'column-reverse'
                                  }}> <Tooltip
                                    arrow
                                    placement="right"
                                    title="Upload other documents"
                                  >
                                      <IconButton
                                        className="edit-btn"
                                        onClick={addFileInput}
                                      >
                                        <FaCirclePlus
                                          color="green"
                                          fontSize={15}
                                        />
                                      </IconButton>
                                    </Tooltip></Col>

                                </Row>
                              </Col>
                              <div style={{
                                boxShadow: "0px 0px 3px 3px #d4d4d4",
                                maxWidth: '48%'

                              }}>
                                <Row className='mt-1 '>
                                  <p className='pg-label p-0 m-0 pl-2'>Closure</p>
                                  <Col md={4}>
                                    <Form.Group>
                                      <Form.Label>Closure Status <span className="req-t">*</span></Form.Label>
                                      <Form.Select
                                        name="clousurStatus"
                                        value={addFirdata?.clousurStatus}
                                        onChange={handleChange}
                                      >
                                        <option value=''>Select</option>
                                        <option value='Replacement from dealer'>Replacement from dealer</option>
                                        <option value='Complaint resolved and completed'>Complaint resolved and completed</option>
                                        <option value='Resolving by programming_Drives'>Resolving by programming_Drives</option>
                                        <option value='Resolved by repair with replacement of spare'>Resolved by repair with replacement of spare</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                  {
                                    addFirdata?.clousurStatus === "Replacement from dealer" && (
                                      <Col md={4}>
                                        <Form.Group>
                                          <Form.Label style={{
                                            whiteSpace: 'nowrap'
                                          }}>Replacement tag applied <span className="req-t">*</span></Form.Label>
                                          <Form.Control type='text' />

                                        </Form.Group>
                                      </Col>
                                    )
                                  }
                                  <Col md={4}>
                                    <Form.Group>
                                      <Form.Label>Details of work done <span className="req-t">*</span></Form.Label>
                                      <Form.Control type='text' name="detailsWorkDone"
                                        value={addFirdata?.detailsWorkDone}
                                        onChange={handleChange} />
                                    </Form.Group>
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group>
                                      <Form.Label>Type of work done <span className="req-t">*</span></Form.Label>
                                      <MultiSelect
                                        options={optionsypeWorkDone}
                                        value={addFirdata?.typeOfworkDone}
                                        onChange={function noRefCheck(e) {
                                          setAddFirData(prev => ({ ...prev, typeOfworkDone: e }));
                                        }}

                                        valueRenderer={customValueRenderer}
                                        labelledBy={"Select"}
                                      />
                                    </Form.Group>
                                  </Col>
                                  {addFirdata?.typeOfworkDone.some(item => item.value === "Spare consumption") && (
                                    <Row>
                                      <Col md={12}>
                                        <Row>
                                          <Col md={6}>
                                            <Form.Group>
                                              <Form.Label>Spare  <span className="req-t">*</span> </Form.Label>
                                              {/* <Form.Select name="spare"
                                                 value={typeSelectedSpare}
                                                 onChange={(e) => {
                                                   setTypeSelectedSpare(e.target.value)
                                                 }}
                                                >
                                                <option value=''>Select</option>
                                                <option value='S-102'>S-102</option>
                                                <option value='S-101'>S-101</option>
                                              </Form.Select> */}
                                              <ReactSearchAutocomplete
                                                items={initialActivities}
                                                onSearch={handleOnSearch}
                                                onHover={handleOnHover}
                                                onSelect={handleOnSelect}
                                                onFocus={handleOnFocus}
                                                autoFocus
                                                formatResult={formatResult}
                                              />

                                            </Form.Group>

                                          </Col>
                                          <Col md={1} className='m-0 p-0 d-flex  ' style={{
                                            flexDirection: 'column-reverse'
                                          }}> <Tooltip
                                            arrow
                                            placement="right"
                                            title="spare add"
                                          >
                                              <IconButton
                                                className="edit-btn"
                                                onClick={spareAdd}
                                              >
                                                <FaCirclePlus
                                                  color="green"
                                                  fontSize={15}
                                                />
                                              </IconButton>
                                            </Tooltip></Col>
                                        </Row>



                                        {spareList.length == 0 ? (
                                          ""
                                        ) : (
                                          <div style={{
                                            maxHeight: '200px',
                                            overflowY: 'scroll'
                                          }}>

                                            <Row className='m-0 p-0'>
                                              <Col md={12} className='m-0 p-0'>
                                                <Table responsive bordered className="m-0 mt-1 ">
                                                  <thead>
                                                    <tr
                                                      style={{
                                                        fontSize: "12px",
                                                      }}
                                                    >
                                                      <th className='m-0 pl-1 py-1 align-content-center'>Spare</th>
                                                      <th className='m-0 pl-1 py-1 align-content-center'>Spare desc</th>
                                                      <th className='m-0 pl-1 py-1 align-content-center'>Quantity</th>
                                                      <th className='m-0 pl-1 py-1 align-content-center'>Action</th>

                                                    </tr>
                                                  </thead>
                                                  <tbody className='p-0 m-0'>

                                                    {spareList?.map((add, index) => {
                                                      return (
                                                        <>
                                                          <tr
                                                            style={{
                                                              fontSize: "12px"
                                                            }}
                                                            key={index}
                                                          >
                                                            <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control value={add?.type} type="text" /></Form.Group></td>
                                                            <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="text" /></Form.Group></td>
                                                            <td className='m-0 py-2 pl-1 p-0  align-content-center'><Form.Group><Form.Control type="number" /></Form.Group></td>
                                                            <td className='m-0 pl-1 py-0 align-content-center'>
                                                              {" "}
                                                              <Tooltip
                                                                arrow
                                                                placement="right"
                                                                title="remove"
                                                              >
                                                                <IconButton
                                                                  className="edit-btn"
                                                                  onClick={() =>
                                                                    handleRemoveSpare(
                                                                      index
                                                                    )
                                                                  }
                                                                >
                                                                  <FaCircleMinus
                                                                    color="red"
                                                                    fontSize={15}
                                                                  />
                                                                </IconButton>
                                                              </Tooltip>
                                                            </td>
                                                          </tr>


                                                        </>
                                                      );
                                                    })}

                                                  </tbody>
                                                </Table>
                                              </Col>
                                            </Row>
                                          </div>
                                        )}
                                      </Col>
                                    </Row>
                                  )
                                  }

                                  {/* {addFirdata?.typeOfworkDone.some(item => item.value === "Bearing replacement at Site / ASC") ? (
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Bearing make & serial Number</Form.Label>
                                <Form.Control type='text' />

                            </Form.Group>
                        </Col>) : ''

                    } */}
                                  {addFirdata?.typeOfworkDone.some(item => item.value === "Repair at ASC") && (
                                    <Col md={6} className="mb-2">
                                      <Form.Group>
                                        <Form.Label>Repair at ASC </Form.Label>
                                        <Form.Select>
                                          <option value=''>Select</option>
                                          <option value='First level repair at workshop '>First level repair at workshop </option>
                                          <option value='Second level repair at workshop '>Second level repair at workshop </option>


                                        </Form.Select>

                                      </Form.Group>
                                    </Col>
                                  )
                                  }
                                </Row>
                              </div>





                            </Row>

                            {/* <Row className=' mt-3  text-center justify-content-center align-items-center'>
                    <Col md={3}>
                        <Button variant='' className='add-Btn' onClick={handleFIRSubmit}  >Submit</Button>
                    </Col>
                </Row> */}



                          </Accordion.Body>
                        </Accordion.Item>

                        {/* <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                              <p className="m-0">
                                {" "}
                                {serviceTasks ? (
                                  <FaCircleCheck
                                    color="#58a718"
                                    fontSize={20}
                                    className="mr-2"
                                  />
                                ) : (
                                  <strong className="mr-2">4</strong>
                                )}
                                Claim Submission
                              </p>
                              <span>
                                <Button
                                  disabled={!serviceTasks}
                                  variant=""
                                  style={{
                                    outline: "none",
                                    border: "none",
                                  }}
                                >
                                  <IoMdSave
                                    onClick={() => {
                                      setServiceTasks(true);
                                      setactiveKeyEdit("5");
                                    }}
                                    color="#7bc143"
                                    fontSize={20}
                                  />
                                </Button>
                                <span>
                                  <Button
                                    style={{
                                      outline: "none",
                                      border: "none",
                                    }}
                                    variant=""
                                  >
                                    {" "}
                                    <IoArrowUpOutline
                                      fontSize={15}
                                      color="#fff"
                                      onClick={() => {}}
                                    />
                                  </Button>
                                </span>
                              </span>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0 pb-1"></Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header>
                            <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                              <p className="m-0">
                                {serviceTasks ? (
                                  <FaCircleCheck
                                    color="#58a718"
                                    fontSize={20}
                                    className="mr-2"
                                  />
                                ) : (
                                  <strong className="mr-2">5</strong>
                                )}
                                Claim Status
                              </p>
                              <span>
                                <Button
                                  disabled={!serviceTasks}
                                  variant=""
                                  style={{
                                    outline: "none",
                                    border: "none",
                                  }}
                                >
                                  <IoMdSave
                                    onClick={() => {
                                      setServiceTasks(true);
                                      setactiveKeyEdit("5");
                                    }}
                                    color="#7bc143"
                                    fontSize={20}
                                  />
                                </Button>
                                <span>
                                  <Button
                                    style={{
                                      outline: "none",
                                      border: "none",
                                    }}
                                    variant=""
                                  >
                                    {" "}
                                    <IoArrowUpOutline
                                      fontSize={15}
                                      color="#fff"
                                      onClick={() => {
                                        // setactiveKeyEdit('1')
                                      }}
                                    />
                                  </Button>
                                </span>
                              </span>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0 pb-1"></Accordion.Body>
                        </Accordion.Item> */}
                      </Accordion>
                    </div>
                  </>
                </Col>
              </Row>
            </Row>
          </Card>
        </Col>

        <GenericModal
          show={showProductInfo}
          handleClose={handleCloseProductinfo}
          size="l"
          IsCentered="centered"
          className="mdl-title"
          title="Product Info"
          body={
            <>
              <Card className="p-3">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Card
                      style={{ backgroundColor: "grey" }}
                      className="p-2 m-0"
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                        }}
                        className="p-3"
                      >
                        <Row>
                          <Col lg={3} md={6} sm={6}>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                              width={40}
                              height={40}
                              alt=""
                              srcset=""
                            />
                          </Col>
                          <Col lg={4} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Product model
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.matnr}
                            </p>
                          </Col>
                          <Col lg={4} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Product SN
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.sernr}
                            </p>
                          </Col>
                          <Col lg={3} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Product type
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.productLineName}
                            </p>
                          </Col>
                          <Col lg={3} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Frame size
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.frame}
                            </p>
                          </Col>
                          <Col
                            lg={3}
                            md={6}
                            sm={6}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Pole
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.pole}P
                            </p>
                          </Col>
                          <Col
                            lg={3}
                            md={6}
                            sm={6}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Voltage
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.kw} Kw
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Date Created
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.requestDate?.split(" ")[0]}
                            </p>
                          </Col>
                          <Col lg={4} md={6} sm={6}>
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Warranty Type
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.warrantyStatus}
                            </p>
                          </Col>
                          <Col
                            lg={4}
                            md={6}
                            sm={6}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Service type
                            </p>
                            <p
                              className="mt-1"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {"-"}
                            </p>
                          </Col>
                        </Row>

                        <Card
                          style={{
                            width: "max-content",
                            background: "white",
                            boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",
                          }}
                          className="p-2 m-0"
                        >
                          <Row className="align-items-center">
                            <Col md={2}>
                              <FaUserCircle fontSize={50} />
                            </Col>
                            <Col className="ml-2">
                              <p className="m-0 " style={{ fontSize: "11px" }}>
                                Customer Name
                              </p>
                              <p
                                className="m-0 "
                                style={{ fontWeight: "500", fontSize: "11px" }}
                              >
                                {ticketInfo[0]?.customerName}
                              </p>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <p className="m-0" style={{ fontSize: "11px" }}>
                              Location
                            </p>
                            <p
                              className="m-0"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              {ticketInfo[0]?.siteAddress}{" "}
                            </p>
                          </Row>
                          <Row className="mt-3">
                            <p
                              className="m-0"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              <IoMail fontSize={18} />{" "}
                              <span className="ml-2">
                                {ticketInfo[0]?.emailId}
                              </span>{" "}
                            </p>
                            <p
                              className="m-0"
                              style={{ fontWeight: "500", fontSize: "11px" }}
                            >
                              <IoCallOutline fontSize={18} />{" "}
                              <span className="ml-2">
                                {ticketInfo[0]?.primaryMobileNo}
                              </span>{" "}
                            </p>
                          </Row>
                        </Card>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </>
          }
          footer={
            <>
              <Button
                variant=""
                className="cncl-Btn"
                onClick={handleCloseProductinfo}
              >
                Closed
              </Button>
            </>
          }
        />
      </Row>
    </>
  );
};

export default AssignRequest;
