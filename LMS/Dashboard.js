import React, { useEffect, useRef ,lazy,Suspense} from "react";
import Sidebar from "../Sidebar";
import { Button, Card, Col, Row, Form, Tabs, Tab } from "react-bootstrap";
import { CgArrowLongRight, CgCalendarDue, CgSandClock } from "react-icons/cg";
import { FaArrowUpRightDots, FaMoneyBillTrendUp, FaPeopleArrows, FaUserXmark, FaUsers } from "react-icons/fa6";
import { BsCalendar2Event, BsFire } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { TbClockExclamation } from "react-icons/tb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';
import { MdCall, MdFiberNew, MdToday } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiPhoneMissedCall } from "react-icons/hi";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

import Chart from 'chart.js/auto';
import { useNavigate } from "react-router-dom";
import { usePathName } from '../../constants/index';


const AISHDashboard=lazy(()=>import("../CG/Dashboard/AISHDashboard"))
const ASCDashboard=lazy(()=>import("../CG/Dashboard/ASCDashboard"))
const ASMDashboard=lazy(()=>import("../CG/ASM/ASMDashboard"))
const RSMDashboard=lazy(()=>import("../CG/Dashboard/RSMDashboard"))
const CommonDashboard=lazy(()=>import("../CG/Dashboard/CommonDashboard"))

function Dashboard() {
  const pathName = usePathName()
  const navigate = useNavigate();
  const data = [
    {
      name: '2020',
      uv: 4000,
      leads: 8400,
      amt: 2400,
    },
    {
      name: '2021',
      uv: 3000,
      leads: 3398,
      amt: 2210,
    },
    {
      name: '2022',
      uv: 2000,
      leads: 9800,
      amt: 2290,
    },
    {
      name: '2023',
      uv: 2780,
      leads: 3908,
      amt: 2000,
    },
    {
      name: '2024',
      uv: 1890,
      leads: 4200,
      amt: 2181,
    },

  ];
  const data1 = [
    {
      name: '2020',
      uv: 4000,
      customer: 4400,
      amt: 2400,
    },
    {
      name: '2021',
      uv: 3000,
      customer: 4989,
      amt: 2210,
    },
    {
      name: '2022',
      uv: 2000,
      customer: 8800,
      amt: 2290,
    },
    {
      name: '2023',
      uv: 2780,
      customer: 3308,
      amt: 2000,
    },
    {
      name: '2024',
      uv: 1890,
      customer: 2200,
      amt: 2181,
    },

  ];


  let token = localStorage.getItem("UserToken");

  let LMS = localStorage.getItem("UID");

  let CGAdmin = localStorage.getItem("CGAdmin");
  let LoginRoleName = localStorage.getItem("RoleName");


  const [filterDivision, setfilterDivision] = useState("");
  const [filterRegion, setfilterRegion] = useState("");
  const [filterBranch, setfilterBranch] = useState("");
  const [filterFromDate, setfilterFromDate] = useState("");
  const [filterToDate, setfilterToDate] = useState("");
  const [filterStatus, setfilterStatus] = useState("");


  const [DashboardData, setDashboardData] = useState([])
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}Lead/GetAllLeadsDashboard`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result[0]);
        setDashboardData(result[0])
      })
  }
  useEffect(() => {
    if (token) {

      fetchData()
    }
  }, [])

  const [BarGraph, setBarGraph] = useState([])

  useEffect(() => {
    if (token) {

      fetch(`${process.env.REACT_APP_API_URL}Lead/GetMonthWishLeadsLineChartDashboard`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setBarGraph(result)
        })
    }

  }, [])



  const [pieChart, setpieChart] = useState([]);

  useEffect(() => {
    if (token) {

      fetch(`${process.env.REACT_APP_API_URL}Lead/GetLeadActivityStatusPieChartDashboard`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setpieChart(result)
        })
    }

  }, [])


  const [allDivisions, setallDivisions] = useState([]);


  const [allRegions, setallRegions] = useState([])

  const [allBranches, setallBranches] = useState([])


  const [selectedRegion, setselectedRegion] = useState(null)

  useEffect(() => {
    if (token) {

      fetch(`${process.env.REACT_APP_API_URL}Region/GetAllRegions`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setallRegions(result)
        })
    }

  }, [])


  // const fetchAllDivisions = () => {
  useEffect(() => {

    if (token) {


      const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

      fetch(getAllDivisions, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setallDivisions(result)
        })
    }

  }, [])
  // }

  useEffect(() => {
    if (token) {

      fetch(`${process.env.REACT_APP_API_URL}Branch/GetAllUserWiseBranch${selectedRegion ? `?Code=` + selectedRegion : ""}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setallBranches(result)
        })
    }

  }, [selectedRegion])




  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      // Generate random colors
      const colors = generateRandomColors(pieChart.length);

      // Create chart
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChart.map(entry => entry.leadActivityStatus),
          datasets: [{
            data: pieChart.map(entry => entry.noOfLeads),
            backgroundColor: colors
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            annotation: {
              annotations: data.map((entry, index) => ({
                type: 'text',
                font: {
                  size: 18
                },
                label: {
                  content: ` ${entry.noOfLeads}`, // Customize label content as needed
                },
                x: '50%',
                y: '50%',
                backgroundColor: colors[index], // Color of the label background
                borderRadius: 10,
                textAlign: 'center',
                onClick: function () { } // Empty onClick function to prevent interaction
              }))
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [pieChart]);

  // Function to generate random colors
  const generateRandomColors = (numColors) => {
    const randomColors = [];
    for (let i = 0; i < numColors; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      randomColors.push(color);
    }
    return randomColors;
  };


  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are zero-based (0 = January)
    const currentYear = today.getFullYear();

    // Financial year starts from April 1st
    if (currentMonth >= 4) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  };

  const currentFinancialYear = getCurrentFinancialYear();



  let RoleCode = localStorage.getItem("RoleName");





  const [GetAllMenu, setGetAllMenu] = useState([])

  useEffect(() => {

    if (token) {

      fetch(`${process.env.REACT_APP_API_URL}RoleWiseMenu/GetRoleWiseMenuByUser?roleCode=${RoleCode}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setGetAllMenu(result)




        })
    }

  }, [])






  return (
    <>
        <Tabs
        defaultActiveKey="Home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Home" title="Home">
         {
          LoginRoleName=="AI10" || LoginRoleName=="NS30"?
          <Suspense fallback={<p>Loading....</p>}>
            <AISHDashboard/>
          </Suspense>:
          LoginRoleName=="Au5"?
          <Suspense fallback={<p>Loading....</p>}>
          <ASCDashboard/>
        </Suspense>:
        LoginRoleName=="AS8" || LoginRoleName=="EI29"?
        <Suspense fallback={<p>Loading....</p>}>
        <ASMDashboard/>
      </Suspense>:
      LoginRoleName=="RS9"?
      <Suspense fallback={<p>Loading....</p>}>
      <RSMDashboard/>
    </Suspense>:
    LoginRoleName=="SYSADMIN"?
    <Suspense fallback={<p>Loading....</p>}>
    <CommonDashboard/>
  </Suspense>:""
         }

         
        </Tab>

        {
          LoginRoleName=="Au5"?"":
          <Tab eventKey="LMS" title="LMS">
        
          {
            LoginRoleName && LoginRoleName == "AS8" || LoginRoleName == "RS9" || LoginRoleName == "AI10" || LoginRoleName == "BD19" || LoginRoleName == "NS20" || LoginRoleName=="EI29" || LoginRoleName=="NS30" ?
          
            <Row className="p-4">
              <Col>
      
                <div className="d-flex justify-content-end flex-wrap">
                  <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Division</Form.Label>
                    <Form.Select value={filterDivision} onChange={(e) => {
                      setfilterDivision(e.target.value)
                    }}>
                      <option value="">Select Division</option>
                      {
                        allDivisions?.map((division, index) => {
                          return (
                            <option key={index} value={division?.parameterTypeId}> {division?.parameterType}</option>
                          );
                        })
                      }
                    </Form.Select>
                  </Form.Group>
                  {
                    LoginRoleName == "AS8" || LoginRoleName=="EI29" ? "" :
                      <>
                        <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                          <Form.Label>Region</Form.Label>
                          <Form.Select value={filterRegion} onChange={(e) => {
                            setfilterRegion(e.target.value)
                            setselectedRegion(e.target.value)
                          }}>
                            <option value="">Select Region</option>
                            {
                              allRegions?.map((region, index) => {
                                return (
                                  <>
      
                                    <option value={region?.regionCode}>{region?.regionName}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                          <Form.Label>Branch</Form.Label>
                          <Form.Select value={filterBranch} onChange={(e) => {
                            setfilterBranch(e.target.value)
                          }}>
                            <option value="">Select Branch</option>
                            {
                              allBranches?.map((branch, index) => {
                                return (
                                  <>
      
                                    <option value={branch?.branchCode}>{branch?.branchName}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>
                        </Form.Group>
                      </>
                  }
                  <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" value={filterFromDate} placeholder="" onChange={e => setfilterFromDate(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" value={filterToDate} placeholder="" onChange={e => setfilterToDate(e.target.value)} />
                  </Form.Group>
      
                  <div className="pt-3"><Button variant="" className="m-2 mt-4" style={{ backgroundColor: "#7bc143", color: "white", height: "fit-content" }}
                    onClick={(e) => {
                      e.preventDefault()
      
      
                      let url = `${process.env.REACT_APP_API_URL}Lead/GetAllLeadsDashboard${filterDivision || filterBranch || filterRegion || filterFromDate || filterToDate || filterStatus ? "?" : ""}`;
      
                      if (filterDivision !== '') {
                        url += `DivisionCode=${filterDivision}&`;
                      }
                      if (filterBranch !== '') {
                        url += `BranchCode=${filterBranch}&`;
                      }
      
                      if (filterRegion !== '') {
                        url += `RegionCode=${filterRegion}&`;
                      }
                      if (filterFromDate !== '') {
                        url += `FromDate=${filterFromDate}&`;
      
                      }
                      if (filterToDate !== '') {
                        url += `ToDate=${filterToDate}&`;
      
                      }
                      // if(filterStatus !== ''){
                      //   url += `StatusId=${filterStatus}&`;
      
                      // }
      
                      fetch(url, {
                        headers: {
                          "Authorization": `Bearer ${token}`
                        }
                      })
                        .then((res) => res.json())
                        .then((result) => {
                          console.log(result);
                          setDashboardData(result[0])
                        })
                    }}>Search</Button>
                    <Button variant="" className="m-2 mt-4" style={{ backgroundColor: "#005bab", color: "white", height: "fit-content" }} onClick={() => {
                      fetchData()
      
                      setfilterDivision("")
                      setfilterBranch("")
                      setfilterRegion("")
                      setfilterFromDate("")
                      setfilterToDate("")
                    }}>Reset</Button>
                  </div>
                </div>
      
                <p className="fs-5">Financial Year {currentFinancialYear} (Amount in lakhs.)</p>
                <Row>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalLeads border-0"
                      // style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)", cursor: "pointer" }}
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      onClick={() => {
                        navigate(`${pathName}/leads`)
      
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
      
                      <div className="d-flex justify-content-center">
                        <FaArrowUpRightDots fontSize={25} color="black" />
                        <p className="dash-titles mx-3">Total Leads</p>
                      </div>
                      <div className="">
                        <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalLeads}</p>
                      </div>
      
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalCustomers border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      // data-aos-delay="400"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(181,230,162)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("filterConvertedLeads", DashboardData?.totalConvertedLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Followup leads")))
                      }}
                    >
                      <div>
                        <div className="d-flex justify-content-center">
                          <FaUsers fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Converted Leads</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalConvertedLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalHL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
      
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(247,199,172)", cursor: "pointer" }}
      
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("filterLostLeads", DashboardData?.totalLostLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Followup leads")))
      
                      }}
                    >
                      <div className="">
                        <div className="d-flex justify-content-center">
                          <RxCrossCircled fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Lost Leads</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalLostLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalUL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(255,255,0)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("filterNewLeads", DashboardData?.totalNewLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="">
                        <div className="d-flex justify-content-center">
                          <MdFiberNew fontSize={25} color="black" />
                          <p className="dash-titles mx-3">New Leads</p>
      
      
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalNewLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
      
      
      
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalUL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("filterInProgressLeads", DashboardData?.totalInProgressLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="">
                        <div className="d-flex justify-content-center">
                          <CgSandClock fontSize={25} color="black" />
                          <p className="dash-titles mx-3">In-Progress Leads</p>
      
      
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalInProgressLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalHL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
      
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(255,192,0)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("dashDivFilter", filterDivision)
                        localStorage.setItem("dashBranchFilter", filterBranch)
                        localStorage.setItem("dashRegionFilter", filterRegion)
                        localStorage.setItem("dashFromFilter", filterFromDate)
                        localStorage.setItem("dashToFilter", filterToDate)
                        localStorage.setItem("filterFollowupLeads", DashboardData?.totalFollowupLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="">
                        <div className="d-flex justify-content-center">
                          <MdCall fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Followup Leads</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalFollowupLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg={2} md={3} sm={6} className="position-sticky">
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)" }}
      
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <GiReceiveMoney fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Total Quote</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(DashboardData?.totalQuotationValueSubmitted)}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6} className="position-sticky">
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(181,230,162)" }}
      
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <GiTakeMyMoney fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Closed Quote</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(DashboardData?.totalOpportunityWonQuote)}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6} className="position-sticky">
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(247,199,172)" }}
      
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <GiPayMoney fontSize={25} color="black" className="mt-1" />
                          <p className="dash-titles mx-3">Lost Quote</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(DashboardData?.totalOpportunityLostQuote)}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6} className="position-sticky">
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(255,192,0)" }}
      
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <FaMoneyBillTrendUp fontSize={20} color="black" className="mt-1" />
                          <p className="dash-titles mx-3">Followup Quote</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(DashboardData?.totalQuotationValueFollowupAndInprogress)}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/leads`)
                        localStorage.setItem("filterTodaysLeads", DashboardData?.totalTodaysLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <MdToday fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Today's Leads</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalTodaysLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={2} md={3} sm={6} className="position-sticky">
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(255,255,0)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("filterTodaysFollowup", DashboardData?.totalTodaysFollowupLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <BsCalendar2Event fontSize={20} color="black" />
                          <p className="dash-titles mx-3">Today's Followups</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalTodaysFollowupLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
      
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(247,199,172)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/fup-leads`)
                        localStorage.setItem("filterOverdueFollowup", DashboardData?.totalOverdueLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <CgCalendarDue fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Overdue Followups</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalOverdueLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
      
      
      
      
                </Row>
                <Row>
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)" }}
      
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <FaPeopleArrows fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Total Customers</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalCustomers}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
      
                  <Col lg={2} md={3} sm={6}>
                    <Card className="p-4 mt-4 totalOL border-0"
                      data-aos="fade-right"
                      data-aos-once="true"
                      data-aos-delay="200"
                      style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(181,230,162)", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`${pathName}/leads`)
                        localStorage.setItem("filterCancelledLeads", DashboardData?.totalCancelLeads)
                        localStorage.setItem("ChildAccess", JSON.stringify(GetAllMenu?.find(i => i.menuText == "Leads")))
      
                      }}
                    >
                      <div className="p-auto">
                        <div className="d-flex justify-content-center">
                          <FaUserXmark fontSize={25} color="black" />
                          <p className="dash-titles mx-3">Cancelled Leads</p>
                        </div>
                        <div className="">
                          <p className="dash-count text-center m-0" style={{ color: "black" }}>{DashboardData?.totalCancelLeads}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
      
                  {/* <Col lg={2} md={3} sm={6}>
                  <Card className="p-4 mt-4 totalOL border-0"
                    data-aos="fade-up"
                    data-aos-once="true"
                    style={{ boxShadow: "0px 0px 3px 3px #ff9275" }}
      
                  >
                    <div className="p-auto">
                      <div className="d-flex justify-content-center">
                        <HiPhoneMissedCall fontSize={25} color="#ff9275" />
                        <p className="dash-titles mx-3">Pending opportunities</p>
                      </div>
                      <div className="">
                        <p className="dash-count text-center m-0" style={{ color: "#ff9275" }}>{DashboardData?.totalPendingLeads}</p>
                      </div>
                    </div>
                  </Card>
                </Col> */}
                  {/* <Col lg={2} md={3} sm={6}>
                  <Card className="p-4 mt-4 totalOL border-0"
                    data-aos="fade-up"
                    data-aos-once="true"
                    style={{ boxShadow: "0px 0px 3px 3px green" }}
      
                  >
                    <div className="p-auto">
                      <div className="d-flex justify-content-center">
                        <AiOutlineFileDone fontSize={25} color="green" />
                        <p className="dash-titles mx-3">Closed Leads</p>
                      </div>
                      <div className="">
                        <p className="dash-count text-center m-0" style={{ color: "green" }}>{DashboardData?.totalCloseLeads}</p>
                      </div>
                    </div>
                  </Card>
                </Col> */}
      
      
      
      
                </Row>
      
      
      
                <Row className="mt-5">
                  <Col>
                    <Card className="p-4 border-0" style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}>
                      <p className="dash-titles">Statistics</p>
      
      
                      <Row>
                        <Col lg={6} md={8} xs={12} sm={12}>
                          <p className="text-center">Activity Status</p>
                          {/* <ResponsiveContainer width="100%" height={300}>
                        <PieChart width={1000} height={400}>
                        {pieChart.map((data, index) => (
        <Pie
        key={`pie-${index}`}
          dataKey="noOfLeads"
          data={pieChart}
          isAnimationActive={false}
      
          cx={400}
          cy={150}
          innerRadius={50}
          outerRadius={120}
          fill={colors[index % colors.length]}
          nameKey="leadActivityStatus"
          // color={colors}
      
        />
        ))}
        <Tooltip />
      </PieChart>
                        </ResponsiveContainer> */}
                          <div style={{ width: "600px", height: "400px", overflow: 'hidden' }}>
      
                            <canvas ref={chartContainer} width={1000} height={400} />
                          </div>
                        </Col>
                        <Col lg={6} md={8} xs={12} sm={12}>
                          <p className="text-center">Leads</p>
                          <ResponsiveContainer width="100%" height={450}>
                            <BarChart
                              width={400}
                              data={BarGraph}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="monthName" label="Months" />
                              <YAxis label="Leads" />
                              <Tooltip />
      
                              <Bar dataKey="noOfLeads" fill="#8884d8" activeBar={<Rectangle fill="green" stroke="blue" />} />
      
                            </BarChart>
                          </ResponsiveContainer>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
      
              </Col>
            </Row> : ""
        }
          </Tab>
        }
      
      
      </Tabs>
    </>
  );
}

export default Dashboard;
