import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../Sidebar";
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import TestReport, {
  handleExportRows,
  handleExportRowsPdf,
} from "../../CG/TestReport";
import { MaterialReactTable } from "material-react-table";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { usePathName } from "../../../constants";
import { handleResponse } from "../../Generic/utility";
import { FaUserCheck, FaUserXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

function Leads() {
  const pathName = usePathName();
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();


  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);


  const [showIsActive1, setIsActive1] = useState(false);

  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);


  let token = localStorage.getItem("UserToken");

  let LoginRoleName = localStorage.getItem("RoleName");

  // let filterConverted = localStorage.getItem("filterConvertedLeads");

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  const [allDivisions, setallDivisions] = useState([]);

  const [allRegions, setallRegions] = useState([]);

  const [allBranches, setallBranches] = useState([]);

  const [selectedRegion, setselectedRegion] = useState(null);

  const fetchAllRegions = () => {
    fetch(`${process.env.REACT_APP_API_URL}Region/GetAllRegions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallRegions(result);
      });
  };

  const fetchAllDivisions = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

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
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}Branch/GetAllUserWiseBranch${selectedRegion ? `?Code=` + selectedRegion : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallBranches(result);
      });
  }, [selectedRegion]);

  const [AllLeads, setAllLeads] = useState([]);

  const fetchAllLeads = () => {
    fetch(`${process.env.REACT_APP_API_URL}Lead/GetAllLead`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllLeads(result);
      });
  };

  useEffect(() => {
    fetchAllRegions();
    fetchAllDivisions();

    // if (

    //   !filterNew ||
    //   !filterInProgress ||
    //   !filterFollowup
    // ) {
    // fetchAllLeads();
    // }
  }, []);
  useEffect(() => {
    setloading(false);
  }, []);

  const [activity, setActivity] = useState([]);

  const fetchActivityUrl = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=28&Id=0&Code=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setActivity(result);
      });
  };

  useEffect(() => {
    fetchActivityUrl();
  }, []);

  const [allStatus, setallStatus] = useState([]);

  useEffect(() => {
    const statusUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=24&Id=0&Code=0`;
    fetch(statusUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallStatus(result);
      });
  }, []);

  const [filterDivision, setfilterDivision] = useState("");
  const [filterRegion, setfilterRegion] = useState("");
  const [filterBranch, setfilterBranch] = useState("");
  const [filterFromDate, setfilterFromDate] = useState("");
  const [filterToDate, setfilterToDate] = useState("");
  const [filterStatus, setfilterStatus] = useState("");
  const [filterLeadStatus, setfilterLeadStatus] = useState("");

  const data = [
    {
      // "LeadsNo":"1",
      SourceId: "Dealer",
      LeadDate: "25 Jan 2024",
      LeadType: "AMC",
      LeadNo: "12",
      "Opportunity Name": "fdga",
      DivisionId: "LT motor",
      ProductSrNo: "5527543717",
      CompanyName: "L&T",
      PinCode: "432141",
      MobileNo: "9087453211",
      EmailId: "test@gmail.com",

      TotalBudget: "200000",
      // "InterestLavel":"Warm",
      StatusId: "Open",
    },
    {
      // "LeadsNo":"2",
      SourceId: "Website",
      LeadDate: "12 Jan 2024",
      LeadType: "Job Work",
      LeadNo: "43",
      "Opportunity Name": "ttfge",
      DivisionId: "LT motor",

      ProductSrNo: "86534754848",
      CompanyName: "Reliance",
      PinCode: "432141",
      MobileNo: "9087453265",
      EmailId: "test1@gmail.com",

      TotalBudget: "200080",
      // "InterestLavel":"Warm",
      StatusId: "Closed",
    },
    {
      // "LeadsNo":"21",
      SourceId: "By Consultant",
      LeadDate: "21 Jan 2024",
      LeadType: "ARC Service",
      LeadNo: "34",
      "Opportunity Name": "xyz",
      DivisionId: "LT motor",

      ProductSrNo: "978273731",
      CompanyName: "L&T",
      PinCode: "432141",
      MobileNo: "9087453211",
      EmailId: "test2@gmail.com",

      TotalBudget: "300000",
      StatusId: "Follow-up",
    },
    {
      // "LeadsNo":"33",
      SourceId: "By Email Enquiry",
      LeadDate: "18 Jan 2024",
      LeadType: "ARC Spare",
      LeadNo: "32",
      "Opportunity Name": "pqr",
      ProductSrNo: "5347543717",
      CompanyName: "Reliance",
      PinCode: "432141",
      MobileNo: "9088853211",
      EmailId: "test3@gmail.com",
      DivisionId: "LT motor",

      TotalBudget: "400000",
      // "InterestLavel":"Warm",
      StatusId: "Follow-up",
    },
  ];

  const columns = useMemo(() => [
    {
      accessorKey: "leadsCode",
      header: "Leads",
      Cell: ({ cell }) => {
        let leadData=cell.row?.original;
        return(
          <>
        
          <Row>
                                    <Col lg={3} md={4} sm={6}>

                                        <p className='ticketInfoLabel'>Lead Code : <span className='ticketInfoData'>{leadData?.leadsCode ? leadData?.leadsCode : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Company Name : <span className='ticketInfoData'>{leadData?.companyContactName ? leadData?.companyContactName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Expected Date : <span className='ticketInfoData'>{leadData?.expectedConversionDate?.split(" ")[0] ? leadData?.expectedConversionDate?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Activity Status : <span className='ticketInfoData'>{leadData?.leadStatus ? leadData?.leadStatus : "-"}</span></p>


                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabel'>Division : <span className='ticketInfoData'>{leadData?.divisionName ? leadData?.divisionName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Source : <span className='ticketInfoData'>{leadData?.sourceName ? leadData?.sourceName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Followup Date : <span className='ticketInfoData'>{leadData?.nextFollowupDate?.split(" ")[0] ? leadData?.nextFollowupDate?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Contact Details : <span className='ticketInfoData'>{leadData?.contactDetails ? leadData?.contactDetails : "-"}</span></p>

                                      

                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabel'>Branch : <span className='ticketInfoData'>{leadData?.branchName ? leadData?.branchName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Lead Type : <span className='ticketInfoData'>{leadData?.leadTypeName ? leadData?.leadTypeName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Total Budget : <span className='ticketInfoData'>{leadData?.totalBudget ? leadData?.totalBudget : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Username : <span className='ticketInfoData'>{leadData?.userName ? leadData?.userName : "-"}</span></p>

                                      

                                    </Col>
                                    <Col lg={3} md={4} sm={6}>

                                        <p className='ticketInfoLabel'>Region : <span className='ticketInfoData'>{leadData?.regionName ? leadData?.regionName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Lead Date : <span className='ticketInfoData'>{leadData?.leadDate?.split(" ")[0] ? leadData?.leadDate?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Lead Status : <span className={`ticketInfoData text-center m-0 ${leadData?.status == "New"
               ? "newStatus"
               : leadData?.status == "Closed"
                 ? "closedStatus"
                 : leadData?.status == "Cancel"
                   ? "cancelledStatus"
                   : ""
             }`}>{leadData?.status ? leadData?.status : "-"}</span></p>
                                      

                                    </Col>
                                    </Row>
          </>
        )
      },
    },
    // {
    //   accessorKey: "divisionName",
    //   header: "Division",
    //   Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    // },
    // {
    //   accessorKey: "branchName",
    //   header: "Branch Name",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },
    // {
    //   accessorKey: "regionName",
    //   header: "Region Name",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },
    // {
    //   accessorKey: "companyContactName",
    //   header: "Company Name",
    //   Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    // },
    // {
    //   accessorKey: "sourceName",
    //   header: "Source",
    //   Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    // },
    // {
    //   accessorKey: "leadTypeName",
    //   header: "Lead Type",
    //   Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    // },
    // {
    //   accessorKey: "leadDate",
    //   header: "Lead Date",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue()?.toLocaleString().split(" ")[0];

    //     let date = value?.split("/");
    //     let dd = date[1];
    //     let dm = date[0];
    //     let dy = date[2];
    //     let newform = dd + "/" + dm + "/" + dy;
    //     return <p className="text-center m-0">{newform}</p>;
    //   },
    // },

    // {
    //   accessorKey: "expectedConversionDate",
    //   header: "Expected Date",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue()?.toLocaleString()?.split(" ")[0];

    //     let date = value?.split("/");
    //     let dd = date ? date[1] : "";
    //     let dm = date ? date[0] : "";
    //     let dy = date ? date[2] : "";
    //     let newform = date ? dd + "/" + dm + "/" + dy : "";
    //     return <p className="text-center m-0">{newform}</p>;
    //   },
    // },
    // {
    //   accessorKey: "nextFollowupDate",
    //   header: "Followup Date",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue()?.toLocaleString()?.split(" ")[0];

    //     let date = value?.split("/");
    //     let dd = date ? date[1] : "";
    //     let dm = date ? date[0] : "";
    //     let dy = date ? date[2] : "";
    //     let newform = date ? dd + "/" + dm + "/" + dy : "";
    //     return <p className="text-center m-0">{newform}</p>;
    //   },
    // },
    // {
    //   accessorKey: "totalBudget",
    //   header: "Total Budget",
    //   Cell: ({ cell }) => (
    //     <p className="text-end m-0">{cell.getValue()?.toLocaleString()}</p>
    //   ),
    // },
    // {
    //   accessorKey: "status",
    //   header: "Lead Status",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue();
    //     return (
    //       <p
    //         className={`text-center m-0 ${value == "New"
    //             ? "newStatus"
    //             : value == "Closed"
    //               ? "closedStatus"
    //               : value == "Cancel"
    //                 ? "cancelledStatus"
    //                 : ""
    //           }`}
    //       >
    //         {value}
    //       </p>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "leadStatus",
    //   header: "Activity Status",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue();
    //     return <p>{value}</p>;
    //   },
    // },
    // {
    //     accessorKey: "divisionCode",
    //     header: "Division",
    //   },
    // {
    //     accessorKey: "productSrNo",
    //     header: "Product Sr No",
    //     Cell: ({ cell }) => (
    //       <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
    //     ),
    //   },

    // {
    //     accessorKey: "CompanyAddress",
    //     header: "Company Address",
    //   },
    // {
    //     accessorKey: "pincodeId",
    //     header: "PinCode",
    //     Cell: ({ cell }) => (
    //       <p className='text-center m-0'>{cell.getValue()}</p>
    //     ),
    //   },
    // {
    //   accessorKey: "contactDetails",
    //   header: "Contact details",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },

    // {
    //   accessorKey: "userName",
    //   header: "User Name",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },
    // {
    //     accessorKey: "emailId",
    //     header: "Email Id",
    //   },
    // {
    //     accessorKey: "ContactPersonName",
    //     header: "Contact Person Name",
    //   },
    // {
    //     accessorKey: "ContactPersonNo",
    //     header: "Contact Person No",
    //   },
    // {
    //     accessorKey: "ContactPersonEmail",
    //     header: "Contact Person Email",
    //   },
    // {
    //     accessorKey: "Conversation",
    //     header: "Conversation",
    //   },

    // {
    //     accessorKey: "InterestLavel",
    //     header: "Interest Level",
    //   },
  ]);
  // if(loading) return <Spinner animation='border'/>

  
  const fixedColumnWidths = {
    leadsCode: '100%',
    // assignTech: 'fit-content',

};



  const customRowStyle = (rowData, key, targetValue) => {
    console.log(rowData);
    console.log(key);
    console.log(targetValue);
    if (rowData[key] === targetValue) {
      return {
        backgroundColor: "lightblue", // Set your desired color here
      };
    }
    return {};
  };

  let todayLead = localStorage.getItem("filterTodaysLeads");

  let todaysDate = new Date()?.toISOString();

  // useEffect(() => {


  //   if (todayLead) {
  //     fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         setAllLeads(result);

  //         // localStorage.removeItem("filterConvertedLeads");
  //         localStorage.removeItem("filterTodaysLeads");
  //       });
  //   }
  // }, [todayLead]);

  let filterByDivision = localStorage.getItem("dashDivFilter");
  let filterByBranch = localStorage.getItem("dashBranchFilter");
  let filterByRegion = localStorage.getItem("dashRegionFilter");
  let filterByFromDate = localStorage.getItem("dashFromFilter");
  let filterByToDate = localStorage.getItem("dashToFilter");

  let filterCancelled = localStorage.getItem("filterCancelledLeads")

  useEffect(() => {
    let urlltdy = `${process.env.REACT_APP_API_URL}Lead/GetAllLead${todayLead ? "?" : ""
      }`;


    let defaultUrl = `${process.env.REACT_APP_API_URL}Lead/GetAllLead`;

    let cancelledUrl = `${process.env.REACT_APP_API_URL}Lead/GetAllLead`;

    let url = `${process.env.REACT_APP_API_URL}Lead/GetAllLead${filterByDivision ||
        filterByBranch ||
        filterByRegion ||
        filterByFromDate ||
        filterByToDate
        ? "?"
        : ""
      }`;

    if (filterByDivision !== "") {
      url += `DivisionCode=${filterByDivision}&`;
    }
    if (filterByBranch !== "") {
      url += `BranchCode=${filterByBranch}&`;
    }

    if (filterByRegion !== "") {
      url += `RegionCode=${filterByRegion}&`;
    }
    if (filterByFromDate !== "") {
      url += `FromDate=${filterByFromDate}&`;
    }
    if (filterByToDate !== "") {
      url += `ToDate=${filterByToDate}&`;
    }




    if (todayLead !== "") {
      urlltdy += `FromDate=${todayLead ? todaysDate : ""}&ToDate=${todayLead ? todaysDate : ""
        }`;
    }



    if (
      filterByDivision ||
      filterByBranch ||
      filterByRegion ||
      filterByFromDate ||
      filterByToDate
    ) {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          setAllLeads(result);

          localStorage.removeItem("dashDivFilter");
          localStorage.removeItem("dashBranchFilter");
          localStorage.removeItem("dashRegionFilter");
          localStorage.removeItem("dashFromFilter");
          localStorage.removeItem("dashToFilter");
          localStorage.removeItem("filterTodaysLeads");
          localStorage.removeItem("filterCancelledLeads");

        });
    }
    else if (todayLead) {
      fetch(urlltdy, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          setAllLeads(result);

          localStorage.removeItem("dashDivFilter");
          localStorage.removeItem("dashBranchFilter");
          localStorage.removeItem("dashRegionFilter");
          localStorage.removeItem("dashFromFilter");
          localStorage.removeItem("dashToFilter");
          localStorage.removeItem("filterTodaysLeads");
          localStorage.removeItem("filterCancelledLeads");

        });
    }
    else if (filterCancelled) {
      fetch(cancelledUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result?.filter(i => i.isActive == false));


          let filteredResult = result?.filter(i => i.isActive == false)

          setAllLeads(filteredResult);

          localStorage.removeItem("dashDivFilter");
          localStorage.removeItem("dashBranchFilter");
          localStorage.removeItem("dashRegionFilter");
          localStorage.removeItem("dashFromFilter");
          localStorage.removeItem("dashToFilter");
          localStorage.removeItem("filterTodaysLeads");
          localStorage.removeItem("filterCancelledLeads");

        })
    }
    else {
      fetch(defaultUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          setAllLeads(result);

          localStorage.removeItem("dashDivFilter");
          localStorage.removeItem("dashBranchFilter");
          localStorage.removeItem("dashRegionFilter");
          localStorage.removeItem("dashFromFilter");
          localStorage.removeItem("dashToFilter");
          localStorage.removeItem("filterTodaysLeads");
          localStorage.removeItem("filterCancelledLeads");

        });
    }
  }, []);

  const customHeaders = {
    sourceName: "Source Name",
    leadsCode: "Leads Code",
    companyContactName: "Contact Person (Primary)",
    status: "Lead Status",
    leadStatus: "Activity Status",
    leadTypeName: "Lead Type",
    customerCategoryName: "Customer Category",
    customerTypeName: "Customer Type",
    leadDate: "Lead Date",
    expectedConversionDate: "Expected Conversion Date",
    actualQuote: "Actual Quote",
    reviseQuote: "Revised Quote",
    totalBudget: "Total Budget",
    nextFollowupDate: "Next Followup",
    divisionName: "Division Name",
    branchName: "Branch Name",
    userName: "User Name",
    regionName: "Region Name",
    customerAddress: "Customer Address",
    probabilityOfWin: "Probability of Win",
    branchCode: "Branch Code",
    divisionCode: "Division Code",
    regionCode: "Region Code",
    contactDetails: "Contact Details (Primary)",
    leadOverDueStatus: "Lead Overdue Status",
    deleteRemark: "Cancellation Remarks",
    createdOn: "Actual Date of Lead Creation",
    activityRemark: "Activity Remark",
    lostLeadReasonDetails: "Lost Lead Reason",
    purchaseNo: "Purchase No.",
    conversation: "Lead Conversation",
    followupConversationDetails: "Followup Conversation Details",
    rating: "Lead Rating",
    subLeadTypeName: "Lead Sub Type",
    projectStateName: "Customer's State",
    projectCityIdName: "Customer's City"

  };



  const [delLead, setdelLead] = useState({
    leadId: "",
    DeleteRemark: "",
    isActive: true
  })



  const [getDelData, setgetDelData] = useState({
    leadNo: "",
    division: "",
    companyName: "",
    branchName: "",
    Region: ""

  })
  return (
    <>

      <Card
        className="border-0 p-3 m-3"
        //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
        style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
      >
        <div className="d-flex justify-content-between">
          <p className="pg-label m-0 p-0">Leads</p>
          {Permissions?.isAdd ? (
            <Row className="">
              <Col>
                <Button
                  variant=""
                  onClick={() => navigate(`${pathName}/add-lead`)}
                  className="add-Btn m-0"
                >
                  Add New Lead
                </Button>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </div>
        <hr />

        {/* <Form>

              <Row className='mt-3'>
                <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Lead No.</Form.Label>
        <Form.Control type="number" placeholder="" />
      </Form.Group>
                </Col>
                <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Source</Form.Label>
        <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
      </Form.Group>
                </Col>
                <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Lead Date</Form.Label>
        <Form.Control type="date" placeholder="" />
</Form.Group>
                </Col>
                <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product Sr No.</Form.Label>
        <Form.Control type="number" placeholder="" />

      </Form.Group>
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" placeholder="" />

      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Company Address</Form.Label>
        <Form.Control as="textarea" rows={1} />

      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>PinCode</Form.Label>
        <Form.Control type="number" placeholder="" />


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control type="tel" placeholder="" />


      </Form.Group>
                </Col>
              </Row>


              <Row className='mt-3'>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email Id</Form.Label>
        <Form.Control type="email" placeholder="" />


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Contact Person Name</Form.Label>
        <Form.Control type="text" placeholder="" />


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Contact Person No.</Form.Label>
        <Form.Control type="tel" placeholder="" />


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Contact Person Email</Form.Label>
        <Form.Control type="email" placeholder="" />


      </Form.Group>
                </Col>
              </Row>


              <Row className='mt-3'>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Conversation</Form.Label>
        <Form.Control as="textarea" rows={1} />

      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Total Budget</Form.Label>
        <Form.Control type="number" placeholder="" />


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Interest Level</Form.Label>
       <Row>
        <Col><Form.Check type="radio" name="InterestLavel" aria-label="option 1" label="Cold" value="Cold"/></Col>
        <Col><Form.Check type="radio" name="InterestLavel" aria-label="option 1" label="Warm" value="Warm"/></Col>
        <Col><Form.Check type="radio" name="InterestLavel" aria-label="option 1" label="Hot" value="Hot"/></Col>
       </Row>


      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>


      </Form.Group>
                </Col>
              </Row>

              <Row className='text-center mt-4'>
                <Col>
                <Button variant='' type='submit' className='sub-Btn px-4'>Submit</Button>
                </Col>
              </Row>
              </Form> */}

        {/* <div className="d-flex justify-content-between flex-wrap m-4 mt-1"> */}

        <Row
          style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
          className="m-3 p-3"
        >
          {/* <Col md={3}>
                
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Division</Form.Label>
        <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
              </Form.Group>
                </Col> */}

          <Col md={2}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Division</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={filterDivision}
                onChange={(e) => {
                  setfilterDivision(e.target.value);
                }}
              >
                <option value="">Select</option>
                {allDivisions?.map((division, index) => {
                  return (
                    <option key={index} value={division?.parameterTypeId}>
                      {" "}
                      {division?.parameterType}
                    </option>
                  );
                })}
                {/* {
        allRegions?.map((region,index)=>{
          return(
            <>
            
            <option value={region?.regionCode}>{region?.regionName}</option>
            </>
          )
        })
      } */}
              </Form.Select>
            </Form.Group>
          </Col>
          {LoginRoleName == "AS8" || LoginRoleName == "RS9" || LoginRoleName=="EI29" ? (
            ""
          ) : (
            <>
              <Col md={2}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={filterRegion}
                    onChange={(e) => {
                      setfilterRegion(e.target.value);
                      setselectedRegion(e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    {allRegions?.map((region, index) => {
                      return (
                        <>
                          <option value={region?.regionCode}>
                            {region?.regionName}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </>
          )}

          {LoginRoleName == "AS8" || LoginRoleName=="EI29" ? (
            ""
          ) : (
            <Col md={2}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={filterBranch}
                  onChange={(e) => {
                    setfilterBranch(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {allBranches?.map((branch, index) => {
                    return (
                      <>
                        <option value={branch?.branchCode}>
                          {branch?.branchName}
                        </option>
                      </>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          )}

          {/* <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Customer company name</Form.Label>
              <Form.Control type="text" placeholder="" />
              </Form.Group>
                </Col> */}
          <Col md={2}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>From date</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                value={filterFromDate}
                onChange={(e) => setfilterFromDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>To date</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                value={filterToDate}
                onChange={(e) => setfilterToDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Lead Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={filterStatus}
                onChange={(e) => {
                  setfilterStatus(e.target.value);
                }}
              >
                <option value="">Select</option>
                {allStatus?.map((status, index) => {
                  return (
                    <>
                      <option value={status?.parameterTypeId}>
                        {status?.parameterType}
                      </option>
                    </>
                  );
                })}
                {/* {
        allRegions?.map((region,index)=>{
          return(
            <>
            
            <option value={region?.regionCode}>{region?.regionName}</option>
            </>
          )
        })
      } */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Activity Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={filterLeadStatus}
                onChange={(e) => {
                  setfilterLeadStatus(e.target.value);
                }}
              >
                <option value="">Select</option>

                {activity?.map((status, index) => {
                  return (
                    <>
                      <option value={status?.parameterTypeId} code={status}>
                        {status?.parameterType}
                      </option>
                    </>
                  );
                })}
                {/* {
        allRegions?.map((region,index)=>{
          return(
            <>
            
            <option value={region?.regionCode}>{region?.regionName}</option>
            </>
          )
        })
      } */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <div className="pt-4">
              <Button
                variant=""
                className="add-Btn"
                onClick={(e) => {
                  e.preventDefault();

                  let url = `${process.env.REACT_APP_API_URL}Lead/GetAllLead${filterDivision ||
                      filterBranch ||
                      filterRegion ||
                      filterFromDate ||
                      filterToDate ||
                      filterStatus ||
                      filterLeadStatus
                      ? "?"
                      : ""
                    }`;

                  if (filterDivision !== "") {
                    url += `DivisionCode=${filterDivision}&`;
                  }
                  if (filterBranch !== "") {
                    url += `BranchCode=${filterBranch}&`;
                  }

                  if (filterRegion !== "") {
                    url += `RegionCode=${filterRegion}&`;
                  }
                  if (filterFromDate !== "") {
                    url += `FromDate=${filterFromDate}&`;
                  }
                  if (filterToDate !== "") {
                    url += `ToDate=${filterToDate}&`;
                  }
                  if (filterStatus !== "") {
                    url += `ActivityStatusId=${filterStatus}&`;
                  }
                  if (filterLeadStatus !== "") {
                    url += `StatusId=${filterLeadStatus}&`;
                  }

                  fetch(url, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((result) => {
                      console.log(result);
                      setAllLeads(result);
                    });
                }}
              >
                Search
              </Button>
              <Button
                variant=""
                className="m-2 mt-2"
                style={{
                  backgroundColor: "#005bab",
                  color: "white",
                  height: "fit-content",
                  fontSize: "12px",
                }}
                onClick={() => {
                  fetchAllLeads();

                  setfilterDivision("");
                  setfilterBranch("");
                  setfilterRegion("");
                  setfilterFromDate("");
                  setfilterToDate("");
                  setfilterStatus("");
                  setfilterLeadStatus("");
                }}
              >
                Reset
              </Button>
            </div>
          </Col>
        </Row>

        {/* </div> */}

        {Permissions?.isView ? (
          <MaterialReactTable
            columns={columns}
            data={AllLeads}
            initialState={{ showColumnFilters: false }} //show filters by default
            muiTableHeadCellFilterTextFieldProps={{
              sx: { m: "0.5rem 0", width: "100%" },
              variant: "outlined",
            }}
            enableEditing
            // onEditingRowSave={handleSaveRowEdits}
            // onEditingRowCancel={handleCancelRowEdits}

            muiTableBodyRowProps={({ row }) => ({
              sx: {
                backgroundColor:
                  row?.original?.leadOverDueStatus == "Overdue"
                    ? "#ff000033"
                    : "",
              },
            })}

            muiTableBodyCellProps={({ cell }) => ({
              style: {
                  width: fixedColumnWidths[cell.column.id],
                  minWidth: fixedColumnWidths[cell.column.id],
                  maxWidth: fixedColumnWidths[cell.column.id],
                  border:"1px solid black"

              },
          })}


            renderRowActions={({ cell, row, table }) => (

              cell.row.original?.status == "Cancel" ? <Tooltip arrow placement="left" title="View">
                <IconButton
                  className="edit-btn"
                  onClick={() => {
                    localStorage.setItem(
                      "leadId",
                      cell.row.original?.leadId
                    );

                    navigate(`${pathName}/view-lead`);
                  }}
                >
                  <FaEye color="green" />
                </IconButton>
              </Tooltip> : <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="View">
                  <IconButton
                    className="edit-btn"
                    onClick={() => {
                      localStorage.setItem(
                        "leadId",
                        cell.row.original?.leadId
                      );

                      navigate(`${pathName}/view-lead`);
                    }}
                  >
                    <FaEye color="green" />
                  </IconButton>
                </Tooltip>
                {LoginRoleName == "AI10" ||
                  LoginRoleName == "BD19" ||
                  LoginRoleName == "NS20" ||
                  LoginRoleName == "RS9" || LoginRoleName == "NS30" ? (
                  ""
                ) : cell.row.original?.status == "Closed" ? (
                  ""
                ) : Permissions?.isEdit ? (
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      className="edit-btn"
                      onClick={() => {
                        console.log(cell.row.original?.leadId);
                        localStorage.setItem(
                          "LeadId",
                          cell.row.original?.leadId
                        );

                        navigate(`${pathName}/edit-lead`);
                      }}
                    >
                      <FaRegEdit color="#005bab" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}

                {/* {Permissions?.isDelete?<Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
console.log(cell.row.original);
                            setdelLead((pre)=>{
                              return{
                                ...pre,
                                leadId:cell.row.original?.leadId,
                                isActive:cell.row.original?.isActive
                              }
                            })
                            handleShow()
                           


                          }}
                        

                        >
                          <HiOutlineTrash color='red'/>
                        </IconButton>
                      </Tooltip>:""} */}



                {
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    // Permissions?.isDelete ? <Tooltip>
                    //   <IconButton className="user-btn" onClick={() => {
                    //     console.log(cell.row.original);
                    //     setdelLead((pre)=>{
                    //       return{
                    //         ...pre,
                    //         leadId:cell.row.original?.leadId,
                    //         isActive:cell.row.original?.isActive
                    //       }
                    //     })

                    //     cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                    //   }}>


                    //     <FaUserXmark

                    //       style={{ color: 'red' }} // Style for the new icon

                    //     />
                    //   </IconButton>
                    // </Tooltip> : ""
                    ""
                  ) : (
                    (Permissions?.isDelete && cell.row.original?.status != "Closed") ? <Tooltip>
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original);
                        setdelLead((pre) => {
                          return {
                            ...pre,
                            leadId: cell.row.original?.leadId,
                            isActive: cell.row.original?.isActive
                          }
                        })

                        setgetDelData((pre) => {
                          return {
                            ...pre,
                            leadNo: cell.row.original?.leadsCode,
                            division: cell.row.original?.divisionName,
                            companyName: cell.row.original?.companyContactName,
                            branchName: cell.row.original?.branchName,
                            Region: cell.row.original?.regionName
                          }
                        })

                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>


                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                }
              </Box>
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {Permissions?.isDownload ? (
                    <Button
                      variant=""
                      disabled={
                        table.getPrePaginationRowModel().rows.length === 0
                      }
                      //export all rows, including from the next page, (still respects filtering and sorting)
                      onClick={() =>
                        handleExportRows(
                          table.getPrePaginationRowModel().rows,
                          customHeaders,
                          [
                            "leadId",
                            "sourceId",
                            "leadTypeId",
                            "subLeadTypeId",
                            "segmentId",
                            "customerTypeId",
                            "customerTypeId",
                            "customerCategoryId",
                            "productSrNo",
                            "serviceTicketNo",
                            "isActive",
                            "projectStateId",
                            "projectCityId",
                            "projectPincodeId",
                            "leadsDivisionProductList",
                            "leadContactList",
                            "leadsDivisionProductDisplay",
                            "divisionCode",
                            "branchCode",
                            "regionCode",
                            "isNewlead",
                          ]
                        )
                      }
                    //   startIcon={}
                    >
                      <LiaDownloadSolid fontSize={25} />{" "}
                      <FaFileCsv
                        fontSize={25}
                        color="green"
                        title="Download CSV"
                      />
                    </Button>
                  ) : (
                    ""
                  )}
                  {/* <Button variant=''
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
        }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF'/>


        </Button> */}
                </div>
              </>
            )}
            positionActionsColumn="last"
          />
        ) : (
          ""
        )}
      </Card>



      {/* <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='mdl-title'>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="cncl-Btn" onClick={handleClose}>
            No
          </Button>
          <Button variant="" className="add-Btn" disabled={!delLead?.DeleteRemark} onClick={(e)=>{
             e.preventDefault()

                           let delLeadUrl=`${process.env.REACT_APP_API_URL}Lead/DeleteLead?leadId=${delLead?.leadId}&isActive=${0}&DeleteRemark=${delLead?.DeleteRemark}`;


                           fetch(delLeadUrl, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                          })
                          .then((res)=>{
                            console.log(res);

                            let Result = handleResponse(res);
                    if (Result) {
                      handleClose()
                      fetchAllLeads()


                    }
                          })


          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}





      {/* ----------------------------------Active--------------------------------------- */}



      <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className='mdl-title'>Activate Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to activate this Lead?

        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
            No
          </Button>
          <Button variant="" className='add-Btn' onClick={(e) => {
            e.preventDefault();

            const deleteLeadUrl = `${process.env.REACT_APP_API_URL}Lead/DeleteLead?leadId=${delLead?.leadId}&isActive=${1}&DeleteRemark=${''}`;





            fetch(deleteLeadUrl, {
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
                    fetchAllLeads()


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



      <Modal show={showIsActive1} onHide={handleCloseIsActive1} backdrop="static" centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='mdl-title'>Cancellation Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 flex-wrap">
            <p style={{ fontWeight: "500" }}>Lead No. : <span style={{ fontWeight: "300" }}>{getDelData?.leadNo}</span></p>
            <p style={{ fontWeight: "500" }}>Division : <span style={{ fontWeight: "300" }}>{getDelData?.division}</span></p>
            <p style={{ fontWeight: "500" }}>Company Name : <span style={{ fontWeight: "300" }}>{getDelData?.companyName}</span></p>
            {/* </div>
              <div className=""> */}
            <p style={{ fontWeight: "500" }}>Branch Name : <span style={{ fontWeight: "300" }}>{getDelData?.branchName}</span></p>
            <p style={{ fontWeight: "500" }}>Region : <span style={{ fontWeight: "300" }}>{getDelData?.Region}</span></p>
          </div>
          <Form.Group>
            <Form.Label>Remarks <span className="req-t">*</span></Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => {
              setdelLead((pre) => {
                return {
                  ...pre,
                  DeleteRemark: e.target.value
                }
              })
            }} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
            No
          </Button>
          <Button variant="" className='add-Btn' disabled={!delLead?.DeleteRemark} onClick={(e) => {
            e.preventDefault();

            const deleteLeadUrl = `${process.env.REACT_APP_API_URL}Lead/DeleteLead?leadId=${delLead?.leadId}&isActive=${0}&DeleteRemark=${delLead?.DeleteRemark}`;





            fetch(deleteLeadUrl, {
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
                  fetchAllLeads()


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
                //     fetchAllProductdata()

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

    </>
  );
}

export default Leads;
