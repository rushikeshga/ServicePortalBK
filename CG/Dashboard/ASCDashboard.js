import React, { useEffect, useRef } from "react";
import Sidebar from "../../Sidebar";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
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
import { usePathName } from "../../../constants/index";

function ASCDashboard() {
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
  let a='60%';


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
  const [dashbaordCounts, setDashbaordCounts] = useState({});
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}ServiceTicketDashboard/GetAllRolesServiceTicketDashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(res=>res.json())
    .then((result)=>{
        console.log(result);
        setDashbaordCounts(result);
    })
},[])

useEffect(()=>{
  fetchTATData();
},[])
const [TATDashbaordCounts, setTATDashbaordCounts] = useState({})
const fetchTATData = ()=>{
  fetch(`${process.env.REACT_APP_API_URL}ServiceTicketDashboard/GetAscTatPerformance`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
    }).then(res=>res.json())
    .then((result)=>{
        console.log(result);
        // let tatData = [];
        // if(result?.)
        if(result?.m4Pending != null){
          result["m4Done"] = 100- parseFloat(result?.m4Pending)
        }
        console.log(result?.m4Pending, result["m4Done"])
        if(result?.cpPending != null){
          result["cpDone"] = 100- parseFloat(result?.cpPending)
        }
        if(result?.drPending != null){
          result["drDone"] = 100- parseFloat(result?.drPending)
        }
        if(result?.m3Pending != null){
          result["m3Done"] = 100- parseFloat(result?.m3Pending)
        }
        if(result?.m7Pending != null){
          result["m7Done"] = 100- parseFloat(result?.m7Pending)
        }
        // result["m4Pending"]
        setTATDashbaordCounts(result);
        
    })
}
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
      
          <Row className="p-4">
            <Col>

              <div className="d-flex justify-content-end flex-wrap">
                <Form.Group className="mb-3 m-2" controlId="exampleForm.ControlInput1">
                  <Form.Label>Type of Ticket</Form.Label>
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

              {/* <p className="fs-5">Financial Year {currentFinancialYear} (Amount in lakhs.)</p> */}
              <Row className="p-1">
                        <Col>
                        <Row>
                            <p className="p-label  m-0" style={{
                                fontWeight:'500'
                            }}>ASC Dashboard</p>
                        </Row>
                            <Row>
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalLeads border-0"
                                        // style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)", cursor: "pointer" }}
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        data-aos-delay="200"
                                        onClick={(e)=>{
                                          localStorage.removeItem("filterReq");
                                          navigate(`${pathName}/service-request`);
                                      }}

                                    >

                                        <div className="d-flex justify-content-center">
                                            {/* <FaArrowUpRightDots fontSize={25} color="black" /> */}
                                            <p className="dash-titles mx-3">Complaints registered</p>
                                        </div>
                                        <div className="">
                                            <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                            {dashbaordCounts?.totalNoOfComplaintsRegistered}
                                            </p>
                                        </div>

                                    </Card>
                                </Col>
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalCustomers border-0"
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        // data-aos-delay="400"
                                        style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(181,230,162)", cursor: "pointer" }}
                                        onClick={(e)=>{
                                          localStorage.setItem("filterReq", "RejectedComplaints");
                                          navigate(`${pathName}/service-request`);
                                      }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Complaints Rejected</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                {dashbaordCounts?.totalNoOfTicketsRejectedByAsc}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalCustomers border-0"
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        // data-aos-delay="400"
                                        style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(247,199,172)", cursor: "pointer" }}
                                        onClick={(e)=>{
                                          localStorage.setItem("filterReq", "OpenComplaints");
                                          navigate(`${pathName}/service-request`);
                                      }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Open complaints</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                  {dashbaordCounts?.totalNoOfOpenComplaints}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                
                                
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalCustomers border-0"
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        // data-aos-delay="400"
                                        style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(255,255,0)", cursor: "pointer" }}
                                        onClick={(e)=>{
                                          localStorage.setItem("filterReq", "techNotAssign");
                                          navigate(`${pathName}/service-request`);
                                      }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Technician not assigned</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                {dashbaordCounts?.technicianNotAssignedCount}
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </Card>
                                </Col>
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalCustomers border-0"
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        // data-aos-delay="400"
                                        style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(202,237,251)", cursor: "pointer" }}
                                        onClick={(e)=>{
                                          localStorage.setItem("filterReq", "closedComplaints");
                                          navigate(`${pathName}/service-request`);
                                      }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Complaints closed</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                {dashbaordCounts?.totalNoOfComplaintsClosed}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col lg={2} md={2} sm={6}>
                                    <Card className="p-4 mt-4 totalCustomers border-0"
                                        data-aos="fade-right"
                                        data-aos-once="true"
                                        // data-aos-delay="400"
                                        style={{ boxShadow: "0px 0px 3px 3px black", backgroundColor: "rgb(181,230,162)", cursor: "pointer" }}
                                        onClick={(e)=>{
                                          localStorage.setItem("filterReq", "cancelledComplaints");
                                          navigate(`${pathName}/service-request`);
                                      }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Complaints cancelled</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                {dashbaordCounts?.totalNoOfComplaintsCancelled}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            
                            {/* <Row>
                            </Row> */}
                        </Col>
                    </Row>

            </Col>
          </Row> 
          {/* <Row className="pl-4 pt-2 pr-4">
            { TATDashbaordCounts?.m3Tat3Day != null &&
            <>
              <Col lg={7} sm={12}
                >
                  <div
                  style={{
                    backgroundColor:"white",
                    boxShadow: "0px 0px 5px 0px black",
                    borderRadius:'5px',
                    
                  }}>
                    <p className="p-label  m-0 pl-3 pt-3"><b>TAT performance of close tickets - (LT)</b></p>
                      <div className="d-flex">
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          1 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.m3Tat1Day}
                          </div>
                        
                        </div>
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          3 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.m3Tat3Day}
                          </div>
                        
                        </div>
                    <div className="pl-2 pr-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#756e58',
                                fontWeight:'600'
                              }}>
                            Delayed
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-4 mr-1" style={{
                              backgroundColor:"#ede6d1",
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'10px',
                              // paddingRight:'10px',
                              borderRadius: '30px'
                            }}>
                            {TATDashbaordCounts?.m3Delayed}
                            </div>

                          </div>
                          
                        
                        </div>

                            <div
                              style={{
                                borderLeft: '2px solid #8d9396',
                                height: '90px',
                                // position: 'absolute',
                                left: '50%',
                                marginLeft: '50px',
                                // top: '0'
                                marginBottom: '5px'

                              }}>



                            </div>

                        <div className="pl-2 pr-5 ml-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#595c5e',
                                fontWeight:'600'
                              }}>
                            Total
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-3" style={{
                              backgroundColor:"#48a0cf",
                              color:'white',
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'9px',
                              paddingRight:'2px',
                              borderRadius: '30px'
                            }}>
                            100%
                            </div>

                          </div>
                          
                        
                        </div>
                        
                      </div>

                  </div>
                      
              </Col>
              <Col lg={5}
              style={{
                backgroundColor:"white",
                boxShadow: "0px 0px 5px 0px black",
                borderRadius:'5px',
                
              }}>
              <p className="pl-5 pt-3"><b>Open Request Type</b></p>
              <div className="d-flex" >
                
                    <div className="p-3">
                      LT
                    </div>
                    <div className="d-flex" style={{
                      width:"80%"
                    }}>
                      <div style={{width:TATDashbaordCounts?.m3Done+"%",
                        backgroundColor:'#004c88',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                        <p className="mt-2">
                        {TATDashbaordCounts?.m3Done+"%"}</p>
                      </div>
                      <div style={{width:TATDashbaordCounts?.m3Pending+"%",
                        backgroundColor:'#b8211a',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                          <p className="mt-2">
                          {TATDashbaordCounts?.m3Pending+"%"}</p>
                      </div>
                    </div>
                
              </div>
              </Col>
            </>
}
          </Row>
          <Row className="pl-4 pt-2 pr-4">
          { TATDashbaordCounts?.m7Tat1Day != null &&
            <>
              <Col lg={7} sm={12}
                >
                  <div
                  style={{
                    backgroundColor:"white",
                    boxShadow: "0px 0px 5px 0px black",
                    borderRadius:'5px',
                    
                  }}>
                    <p className="p-label  m-0 pl-3 pt-3"><b>TAT performance of close tickets- (HT)</b></p>
                      <div className="d-flex">
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          1 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.m7Tat1Day}
                          </div>
                        
                        </div>
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          3 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                           {TATDashbaordCounts?.m7Tat3Day}
                          </div>
                        
                        </div>
                    <div className="pl-2 pr-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#756e58',
                                fontWeight:'600'
                              }}>
                            Delayed
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-4 mr-1" style={{
                              backgroundColor:"#ede6d1",
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'10px',
                              // paddingRight:'10px',
                              borderRadius: '30px'
                            }}>
                            {TATDashbaordCounts?.m7Delayed}
                            </div>

                          </div>
                          
                        
                        </div>

                            <div
                              style={{
                                borderLeft: '2px solid #8d9396',
                                height: '90px',
                                // position: 'absolute',
                                left: '50%',
                                marginLeft: '50px',
                                // top: '0'
                                marginBottom: '5px'

                              }}>



                            </div>

                        <div className="pl-2 pr-5 ml-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#595c5e',
                                fontWeight:'600'
                              }}>
                            Total
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-3" style={{
                              backgroundColor:"#48a0cf",
                              color:'white',
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'9px',
                              paddingRight:'2px',
                              borderRadius: '30px'
                            }}>
                            100%
                            </div>

                          </div>
                          
                        
                        </div>
                        
                      </div>

                  </div>
                      
              </Col>
              <Col lg={5}
              style={{
                backgroundColor:"white",
                boxShadow: "0px 0px 5px 0px black",
                borderRadius:'5px',
                
              }}>
              <p className="pl-5 pt-3"><b>Open Request Type</b></p>
              <div className="d-flex" >
                
                    <div className="p-3">
                      HT
                    </div>
                    <div className="d-flex" style={{
                      width:"80%"
                    }}>
                      <div style={{width:TATDashbaordCounts?.m7Done+"%",
                        backgroundColor:'#004c88',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                        <p className="mt-2">
                        {TATDashbaordCounts?.m7Done+"%"}</p>
                      </div>
                      <div style={{width:TATDashbaordCounts?.m7Pending+"%",
                        backgroundColor:'#b8211a',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                          <p className="mt-2">
                          {TATDashbaordCounts?.m7Pending+"%"}</p>
                      </div>
                    </div>
                
              </div>
              </Col>
            </>
          }
          </Row>
          <Row className="pl-4 pt-2 pr-4">
          { TATDashbaordCounts?.m4Tat1Day != null &&
            <>
              <Col lg={7} sm={12}
                >
                  <div
                  style={{
                    backgroundColor:"white",
                    boxShadow: "0px 0px 5px 0px black",
                    borderRadius:'5px',
                    
                  }}>
                    <p className="p-label  m-0 pl-3 pt-3"><b>TAT performance of close tickets- (FHP)</b></p>
                      <div className="d-flex">
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          1 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.m4Tat1Day}
                          </div>
                        
                        </div>
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          3 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                           {TATDashbaordCounts?.m4Tat3Day}
                          </div>
                        
                        </div>
                    <div className="pl-2 pr-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#756e58',
                                fontWeight:'600'
                              }}>
                            Delayed
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-4 mr-1" style={{
                              backgroundColor:"#ede6d1",
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'10px',
                              // paddingRight:'10px',
                              borderRadius: '30px'
                            }}>
                            {TATDashbaordCounts?.m4Delayed}
                            </div>

                          </div>
                          
                        
                        </div>

                            <div
                              style={{
                                borderLeft: '2px solid #8d9396',
                                height: '90px',
                                // position: 'absolute',
                                left: '50%',
                                marginLeft: '50px',
                                // top: '0'
                                marginBottom: '5px'

                              }}>



                            </div>

                        <div className="pl-2 pr-5 ml-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#595c5e',
                                fontWeight:'600'
                              }}>
                            Total
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-3" style={{
                              backgroundColor:"#48a0cf",
                              color:'white',
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'9px',
                              paddingRight:'2px',
                              borderRadius: '30px'
                            }}>
                            100%
                            </div>

                          </div>
                          
                        
                        </div>
                        
                      </div>

                  </div>
                      
              </Col>
              <Col lg={5}
              style={{
                backgroundColor:"white",
                boxShadow: "0px 0px 5px 0px black",
                borderRadius:'5px',
                
              }}>
              <p className="pl-5 pt-3"><b>Open Request Type</b></p>
              <div className="d-flex" >
                
                    <div className="p-3">
                      FHP
                    </div>
                    <div className="d-flex" style={{
                      width:"80%"
                    }}>
                      <div style={{width:TATDashbaordCounts?.m4Done+"%",
                        backgroundColor:'#004c88',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                        <p className="mt-2">
                        {TATDashbaordCounts?.m4Done+"%"}</p>
                      </div>
                      <div style={{width:TATDashbaordCounts?.m4Pending+"%",
                        backgroundColor:'#b8211a',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                          <p className="mt-2">
                          {TATDashbaordCounts?.m4Pending+"%"}</p>
                      </div>
                    </div>
                
              </div>
              </Col>
            </>
          }
          </Row>
          <Row className="pl-4 pt-2 pr-4">
          { TATDashbaordCounts?.cpTat1Day != null &&
            <>
              <Col lg={7} sm={12}
                >
                  <div
                  style={{
                    backgroundColor:"white",
                    boxShadow: "0px 0px 5px 0px black",
                    borderRadius:'5px',
                    
                  }}>
                    <p className="p-label  m-0 pl-3 pt-3"><b>TAT performance of close tickets- (CPD)</b></p>
                      <div className="d-flex">
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          1 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.cpTat1Day}
                          </div>
                        
                        </div>
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          3 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                           {TATDashbaordCounts?.cpTat3Day}
                          </div>
                        
                        </div>
                    <div className="pl-2 pr-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#756e58',
                                fontWeight:'600'
                              }}>
                            Delayed
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-4 mr-1" style={{
                              backgroundColor:"#ede6d1",
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'10px',
                              // paddingRight:'10px',
                              borderRadius: '30px'
                            }}>
                            {TATDashbaordCounts?.cpDelayed}
                            </div>

                          </div>
                          
                        
                        </div>

                            <div
                              style={{
                                borderLeft: '2px solid #8d9396',
                                height: '90px',
                                // position: 'absolute',
                                left: '50%',
                                marginLeft: '50px',
                                // top: '0'
                                marginBottom: '5px'

                              }}>



                            </div>

                        <div className="pl-2 pr-5 ml-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#595c5e',
                                fontWeight:'600'
                              }}>
                            Total
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-3" style={{
                              backgroundColor:"#48a0cf",
                              color:'white',
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'9px',
                              paddingRight:'2px',
                              borderRadius: '30px'
                            }}>
                            100%
                            </div>

                          </div>
                          
                        
                        </div>
                        
                      </div>

                  </div>
                      
              </Col>
              <Col lg={5}
              style={{
                backgroundColor:"white",
                boxShadow: "0px 0px 5px 0px black",
                borderRadius:'5px',
                
              }}>
              <p className="pl-5 pt-3"><b>Open Request Type</b></p>
              <div className="d-flex" >
                
                    <div className="p-3">
                      CPD
                    </div>
                    <div className="d-flex" style={{
                      width:"80%"
                    }}>
                      <div style={{width:TATDashbaordCounts?.cpDone+"%",
                        backgroundColor:'#004c88',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                        <p className="mt-2">
                        {TATDashbaordCounts?.cpDone+"%"}</p>
                      </div>
                      <div style={{width:TATDashbaordCounts?.cpPending+"%",
                        backgroundColor:'#b8211a',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                          <p className="mt-2">
                          {TATDashbaordCounts?.cpPending+"%"}</p>
                      </div>
                    </div>
                
              </div>
              </Col>
            </>
          }
          </Row>
          <Row className="pl-4 pt-2 pr-4">
          { TATDashbaordCounts?.drTat1Day != null &&
            <>
              <Col lg={7} sm={12}
                >
                  <div
                  style={{
                    backgroundColor:"white",
                    boxShadow: "0px 0px 5px 0px black",
                    borderRadius:'5px',
                    
                  }}>
                    <p className="p-label  m-0 pl-3 pt-3"><b>TAT performance of close tickets- (Drives)</b></p>
                      <div className="d-flex">
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          1 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                          {TATDashbaordCounts?.drTat1Day}
                          </div>
                        
                        </div>
                        <div className="pl-2 pr-5">
                          <div className="pt-2 pb-2 pl-3 pt-3"
                            style={{color:'#756e58',
                              fontWeight:'600'
                            }}>
                          3 day
                          </div>
                          <div className="mb-3 ml-2" style={{
                            backgroundColor:"#ede6d1",
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            paddingLeft:'10px',
                            paddingRight:'10px',
                            borderRadius: '30px'
                          }}>
                           {TATDashbaordCounts?.drTat3Day}
                          </div>
                        
                        </div>
                    <div className="pl-2 pr-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#756e58',
                                fontWeight:'600'
                              }}>
                            Delayed
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-4 mr-1" style={{
                              backgroundColor:"#ede6d1",
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'10px',
                              // paddingRight:'10px',
                              borderRadius: '30px'
                            }}>
                            {TATDashbaordCounts?.drDelayed}
                            </div>

                          </div>
                          
                        
                        </div>

                            <div
                              style={{
                                borderLeft: '2px solid #8d9396',
                                height: '90px',
                                // position: 'absolute',
                                left: '50%',
                                marginLeft: '50px',
                                // top: '0'
                                marginBottom: '5px'

                              }}>



                            </div>

                        <div className="pl-2 pr-5 ml-5">
                          <div>
                            <div className="pt-2 pb-2 pl-3 pt-3"
                              style={{color:'#595c5e',
                                fontWeight:'600'
                              }}>
                            Total
                            </div>
                          </div>
                          <div>
                            <div className="mb-3 ml-3" style={{
                              backgroundColor:"#48a0cf",
                              color:'white',
                              paddingTop:'10px',
                              paddingBottom:'10px',
                              paddingLeft:'9px',
                              paddingRight:'2px',
                              borderRadius: '30px'
                            }}>
                            100%
                            </div>

                          </div>
                          
                        
                        </div>
                        
                      </div>

                  </div>
                      
              </Col>
              <Col lg={5}
              style={{
                backgroundColor:"white",
                boxShadow: "0px 0px 5px 0px black",
                borderRadius:'5px',
                
              }}>
              <p className="pl-5 pt-3"><b>Open Request Type</b></p>
              <div className="d-flex" >
                
                    <div className="p-3">
                      Drives
                    </div>
                    <div className="d-flex" style={{
                      width:"80%"
                    }}>
                      <div style={{width:TATDashbaordCounts?.drDone+"%",
                        backgroundColor:'#004c88',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                        <p className="mt-2">
                        {TATDashbaordCounts?.drDone+"%"}</p>
                      </div>
                      <div style={{width:TATDashbaordCounts?.drPending+"%",
                        backgroundColor:'#b8211a',
                        height: '40px',
                        textAlign: 'center',
                        color:'white'
                      }}>
                          <p className="mt-2">
                          {TATDashbaordCounts?.drPending+"%"}</p>
                      </div>
                    </div>
                
              </div>
              </Col>
            </>
          }
          </Row> */}
      
    </>
  );
}

export default ASCDashboard;
