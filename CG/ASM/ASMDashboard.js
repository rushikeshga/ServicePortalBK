
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { CgSandClock } from "react-icons/cg";
import { FaArrowUpRightDots, FaUsers } from "react-icons/fa6";
import { usePathName } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";




function DashboardASM() {
    const pathName = usePathName();
    const navigate = useNavigate();
    let token = localStorage.getItem("UserToken");
    let LMS = localStorage.getItem("UID");
    let CGAdmin = localStorage.getItem("CGAdmin");
    let LoginRoleName = localStorage.getItem("RoleName");
    const [dashbaordCounts, setDashbaordCounts] = useState({});
    const [allDivisions, setallDivisions] = useState([]);

    const [filterDivision, setfilterDivision] = useState("");
  const [filterRegion, setfilterRegion] = useState("");
  const [filterBranch, setfilterBranch] = useState("");
  const [filterFromDate, setfilterFromDate] = useState("");
  const [filterToDate, setfilterToDate] = useState("");
  const [filterStatus, setfilterStatus] = useState("");

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
  const fetchData = ()=>{
    fetch(`${process.env.REACT_APP_API_URL}ServiceTicketDashboard/GetAllRolesServiceTicketDashboard`, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  }).then(res=>res.json())
  .then((result)=>{
      console.log(result);
      setDashbaordCounts(result);
  })
  }

    useEffect(()=>{
      fetchData();
    },[])

    return (
        <>
            {/* {
                LoginRoleName && LoginRoleName == "AS8" || LoginRoleName == "RS9" || LoginRoleName == "AI10" || LoginRoleName == "BD" || LoginRoleName == "NSH" ? */}
                    <Row className="p-1">
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
    
    
                    let url = `${process.env.REACT_APP_API_URL}ServiceTicketDashboard/GetAllRolesServiceTicketDashboard${filterDivision || filterBranch || filterRegion || filterFromDate || filterToDate || filterStatus ? "?" : ""}`;
    
                    if (filterDivision !== '') {
                      url += `DivisionCode=${filterDivision}&`;
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
                        setDashbaordCounts(result)
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
    
              
    
            </Col>
          </Row>
                        <Col>
                        <Row>
                            <p className="p-label  m-0" style={{
                                fontWeight:'500'
                            }}>ASM Dashboard</p>
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
                                            localStorage.setItem("asmdashDivFilter", filterDivision)
                                            // localStorage.setItem("dashBranchFilter", filterBranch)
                                            // localStorage.setItem("dashRegionFilter", filterRegion)
                                            localStorage.setItem("asmdashFromFilter", filterFromDate)
                                            localStorage.setItem("asmdashToFilter", filterToDate)
                                        }}

                                    >

                                        <div className="d-flex justify-content-center" >
                                            {/* <FaArrowUpRightDots fontSize={25} color="black" /> */}
                                            <p className="dash-titles mx-3" >Complaints registered</p>
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
                                                {dashbaordCounts?.totalNoOfOpenComplaints}
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
                                            localStorage.setItem("filterReq", "suspense");
                                            navigate(`${pathName}/service-request`);
                                        }}

                                    >
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                {/* <FaUsers fontSize={25} color="black" /> */}
                                                <p className="dash-titles mx-3">Assignment pending for ASC & ASM (LIM & Drives)</p>
                                            </div>
                                            <div className="">
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>
                                                {dashbaordCounts?.totalNoOfComplaintsSuspense}
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
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>{dashbaordCounts?.technicianNotAssignedCount}</p>
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
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>{dashbaordCounts?.totalNoOfComplaintsClosed}</p>
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
                                                <p className="dash-count text-center m-0" style={{ color: "black" }}>{dashbaordCounts?.totalNoOfComplaintsCancelled}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            {/* <Row>
                            </Row> */}
                        </Col>
                    </Row>
                     {/* : ""
            } */}
        </>
    );
}

export default DashboardASM;
