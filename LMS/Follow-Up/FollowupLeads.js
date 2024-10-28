import React,{useState,useEffect,useMemo} from 'react';
import Sidebar from '../../Sidebar';
import { Card, Col, Row ,Form, Button, Spinner, Modal} from "react-bootstrap";
import TestReport,{handleExportRows,handleExportRowsPdf} from '../../CG/TestReport';
import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { BiSolidFilePdf } from "react-icons/bi";


import { Box, IconButton, Tooltip } from '@mui/material';
import { usePathName } from '../../../constants';
function FollowupLeads() {
  const pathName = usePathName()
    const [loading, setloading] = useState(true);
    // const navigate=useNavigate();
    const navigate=useNavigate();

    const [AllLeads, setAllLeads] = useState([])

    let token = localStorage.getItem("UserToken")
let LoginRoleName=localStorage.getItem("RoleName");

let Permissions=JSON.parse(localStorage.getItem("ChildAccess"));


let filterLostLeads=localStorage.getItem("filterLostLeads");
let filterConverted = localStorage.getItem("filterConvertedLeads");


let filterNew = localStorage.getItem("filterNewLeads");
let filterInProgress = localStorage.getItem("filterInProgressLeads");
let filterFollowup = localStorage.getItem("filterFollowupLeads");
let todayFollowup=localStorage.getItem("filterTodaysFollowup");
let filterOverdue=localStorage.getItem("filterOverdueFollowup");



    useEffect(()=>{
        setloading(false)
        },[])


        const data=[
            {
                // "LeadsNo":"1",
                "SourceId":"Dealer",
                "LeadDate":"25 Jan 2024",
                "ProductSrNo":"5527543717",
                "CompanyName":"L&T",
                // "CompanyAddress":"dummy address",
                "PinCode":"432141",
                "MobileNo":"9087453211",
                "EmailId":"test@gmail.com",
                // "ContactPersonName":"test",
                // "ContactPersonNo":"7664775378",
                // "ContactPersonEmail":"contact@gmail.com",
                // "Conversation":"conversation details",
                "TotalBudget":"200000",
                "VisitDate":"",
                // "InterestLavel":"Warm",
                "StatusId":"Open",
                "CreatedOn":"",

                
            },
            {
                // "LeadsNo":"2",
                "SourceId":"Website",
                "LeadDate":"12 Jan 2024",
                "ProductSrNo":"86534754848",
                "CompanyName":"Reliance",
                // "CompanyAddress":"dummy address2",
                "PinCode":"432141",
                "MobileNo":"9087453265",
                "EmailId":"test1@gmail.com",
                // "ContactPersonName":"test1",
                // "ContactPersonNo":"7664775908",
                // "ContactPersonEmail":"contact1@gmail.com",
                // "Conversation":"conversation details1",
                "TotalBudget":"200080",
                "VisitDate":"",

                // "InterestLavel":"Warm",
                "StatusId":"Closed",
                "CreatedOn":"",

                
            },
            {
                // "LeadsNo":"21",
                "SourceId":"By Consultant",
                "LeadDate":"21 Jan 2024",
                "ProductSrNo":"978273731",
                "CompanyName":"Reliance",
                // "CompanyAddress":"dummy address2",
                "PinCode":"432141",
                "MobileNo":"9087453211",
                "EmailId":"test2@gmail.com",
                // "ContactPersonName":"test2",
                // "ContactPersonNo":"7664711378",
                // "ContactPersonEmail":"contact2@gmail.com",
                // "Conversation":"conversation details2",
                "TotalBudget":"300000",
                "VisitDate":"",

                // "InterestLavel":"Warm",
                "StatusId":"Follow-up",
                "CreatedOn":"",

                
            },
            {
                // "LeadsNo":"33",
                "SourceId":"By Email Enquiry",
                "LeadDate":"18 Jan 2024",
                "ProductSrNo":"5347543717",
                "CompanyName":"L&T",
                // "CompanyAddress":"dummy address3",
                "PinCode":"432141",
                "MobileNo":"9088853211",
                "EmailId":"test3@gmail.com",
                // "ContactPersonName":"test3",
                // "ContactPersonNo":"7664775388",
                // "ContactPersonEmail":"contact3@gmail.com",
                // "Conversation":"conversation details3",
                "TotalBudget":"400000",
                "VisitDate":"",

                // "InterestLavel":"Warm",
                "StatusId":"Open",
                "CreatedOn":"",

                
            },
           
        ]


        const [activity, setActivity] = useState([])



        const fetchActivityUrl = () => {
          fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=28&Id=0&Code=0`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setActivity(result)
            })
        }
        
        useEffect(() => {
          fetchActivityUrl()
          
        }, [])
  


        const [getAllFollowUps, setgetAllFollowUps] = useState([])



        const fetchAllFollowups=()=>{
          const getFollowUpUrl=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup`;

          fetch(getFollowUpUrl,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          .then((res)=>res.json())
          .then((result)=>{
            console.log(result);
            setgetAllFollowUps(result)
          })
        }

        // useEffect(()=>{


        //  fetchAllFollowups()

        // },[])




















// const [AllLeads,setAllLeads]=useState([])



        const [selectedRegion, setselectedRegion] = useState(null)

        const [allDivisions, setallDivisions] = useState([]);


        const [allRegions, setallRegions] = useState([])

        const [allBranches, setallBranches] = useState([])
      
        const fetchAllRegions=()=>{
          fetch(`${process.env.REACT_APP_API_URL}Region/GetAllRegions`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          .then((res)=>res.json())
          .then((result)=>{
            console.log(result);
            setallRegions(result)
          })
        }


        useEffect(()=>{
          fetch(`${process.env.REACT_APP_API_URL}Branch/GetAllUserWiseBranch${selectedRegion? `?Code=`+selectedRegion:""}`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          .then((res)=>res.json())
          .then((result)=>{
            console.log(result);
            setallBranches(result)
          })
        },[selectedRegion])

      

        const fetchAllDivisions = () => {
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
      
      
        

        

        useEffect(()=>{
          fetchAllRegions()
          fetchAllDivisions()
      
        },[])









        const [allStatus, setallStatus] = useState([])



        useEffect(() => {
            const statusUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=24&Id=0&Code=0`;
            fetch(statusUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setallStatus(result)
                })
        }, [])
        

const [filterDivision, setfilterDivision] = useState("");
const [filterRegion, setfilterRegion] = useState("");
const [filterBranch, setfilterBranch] = useState("");
const [filterFromDate, setfilterFromDate] = useState("");
const [filterToDate, setfilterToDate] = useState("");
const [filterStatus, setfilterStatus] = useState("");
const [filterLeadStatus, setfilterLeadStatus] = useState("")






    
        const columns=useMemo(
            () => [
             

                {
                  accessorKey: "leadsCode",
                  header: "Lead Followup Details",
                  Cell: ({ cell }) => {
                    let followupData=cell.row?.original;
                    return(
                      <>
                         <Row>
                                    <Col lg={3} md={4} sm={6}>

                                        <p className='ticketInfoLabel'>Lead Code : <span className='ticketInfoData'>{followupData?.leadsCode ? followupData?.leadsCode : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Lead Date : <span className='ticketInfoData'>{followupData?.leadDate?.split(" ")[0] ? followupData?.leadDate?.split(" ")[0] : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Expected Date : <span className='ticketInfoData'>{followupData?.expectedConversionDate?.split(" ")[0] ? followupData?.expectedConversionDate?.split(" ")[0] : "-"}</span></p>
                                      
                                        {/* <p className='ticketInfoLabel'>Company Name : <span className='ticketInfoData'>{followupData?.companyContactName ? followupData?.companyContactName : "-"}</span></p> */}


                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    <p className='ticketInfoLabel'>Region : <span className='ticketInfoData'>{followupData?.regionName ? followupData?.regionName : "-"}</span></p>

                                        <p className='ticketInfoLabel'>Lead Status : <span className={`ticketInfoData text-center m-0 ${followupData?.statusName=="New"?"newStatus":followupData?.statusName=="Closed"?"closedStatus":followupData?.statusName=="Cancel"?"cancelledStatus":""}`}>{followupData?.statusName ? followupData?.statusName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Followup Date : <span className='ticketInfoData'>{followupData?.nextDateOfFollowup?.split(" ")[0] ? followupData?.nextDateOfFollowup?.split(" ")[0] : "-"}</span></p>
                                      
                                      
                                      
                                      
                                        {/* <p className='ticketInfoLabel'>Source : <span className='ticketInfoData'>{followupData?.sourceName ? followupData?.sourceName : "-"}</span></p> */}

                                      

                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                        <p className='ticketInfoLabel'>Branch : <span className='ticketInfoData'>{followupData?.branchName ? followupData?.branchName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Activity Status : <span className='ticketInfoData'>{followupData?.leadStatus ? followupData?.leadStatus : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Contact Details : <span className='ticketInfoData'>{followupData?.contactDetails ? followupData?.contactDetails : "-"}</span></p>
                                       
                                       
                                       
                                        {/* <p className='ticketInfoLabel'>Lead Type : <span className='ticketInfoData'>{followupData?.leadTypeName ? followupData?.leadTypeName : "-"}</span></p>
                                        <p className='ticketInfoLabel'>Username : <span className='ticketInfoData'>{followupData?.userName ? followupData?.userName : "-"}</span></p> */}

                                      

                                    </Col>
                                    <Col lg={3} md={4} sm={6}>
                                    <p className='ticketInfoLabel'>Company Name : <span className='ticketInfoData'>{followupData?.companyContactName ? followupData?.companyContactName : "-"}</span></p>
                                    <p className='ticketInfoLabel'>Total Budget : <span className='ticketInfoData'>{followupData?.totalBudget ? followupData?.totalBudget : "-"}</span></p>





                                        {/* <p className='ticketInfoLabel'>Lead Status : <span className={`ticketInfoData text-center m-0 ${followupData?.status == "New"
               ? "newStatus"
               : followupData?.status == "Closed"
                 ? "closedStatus"
                 : followupData?.status == "Cancel"
                   ? "cancelledStatus"
                   : ""
             }`}>{followupData?.status ? followupData?.status : "-"}</span></p> */}
                                      

                                    </Col>
                                    </Row>
                      </>
                    )
                  },
                },
        //         {
        //           accessorKey: "regionName",
        //           header: "Region Name",
        //           Cell: ({ cell }) => (
        //             <p className='text-center m-0'>{cell.getValue()}</p>
        //           ),
        //         },
        //         {
        //           accessorKey: "branchName",
        //           header: "Branch Name",
        //           Cell: ({ cell }) => (
        //             <p className='text-center m-0'>{cell.getValue()}</p>
        //           ),
        //         },
        //         {
        //           accessorKey: "companyContactName",
        //           header: "Company Name",
        //           Cell: ({ cell }) => (
        //             <p className='text-center m-0'>{cell.getValue()}</p>
        //           ),
        //         },
        //         {
        //           accessorKey: "leadDate",
        //           header: "Lead Date",
        //           Cell: ({ cell }) => {
        //             let value=cell.getValue()?.toLocaleString().split(" ")[0];

        //             let date=value?.split("/");
        //             let dd=date[1];
        //             let dm=date[0];
        //             let dy=date[2];
        //             let newform=dd+"/"+dm+"/"+dy
        //             return(
        //             <p className='text-center m-0'>{newform}</p>
        //           )},
        //         },
        //         {
        //           accessorKey: "statusName",
        //           header: "Lead Status",
        //           size:50,
        //           Cell: ({ cell }) => {
        //             let value=cell.getValue()
        //             return(
        //             <p className={`text-center m-0 ${value=="New"?"newStatus":value=="Closed"?"closedStatus":value=="Cancel"?"cancelledStatus":""}`}>{value}</p>
        // )},
        //         },
        //         {
        //           accessorKey: "leadStatus",
        //           header: "Activity Status",
        //           size:50,
                 
        //         },
        //         {
        //           accessorKey: "totalBudget",
        //           header: "Total Budget",
        //           Cell: ({ cell }) => (
        //             <p className='text-end m-0'>{cell.getValue()?.toLocaleString()}</p>
        //           ),
        //         },
        //         {
        //           accessorKey: "expectedConversionDate",
        //           header: "Expected Date",
        //           Cell: ({ cell }) => {
        //             let value=cell.getValue()?.toLocaleString()?.split(" ")[0];
  
        //             let date=value?.split("/");
        //             let dd=date?date[1]:"";
        //             let dm=date?date[0]:"";
        //             let dy=date?date[2]:"";
        //             let newform=date?dd+"/"+dm+"/"+dy:""
        //             return(
        //             <p className='text-center m-0'>{newform}</p>
        //           )},
        //         },
        //         {
        //           accessorKey: "nextDateOfFollowup",
        //           header: "FollowUp Date",
        //           Cell: ({ cell }) => {
        //             let value=cell.getValue()?.toLocaleString()?.split(" ")[0];
  
        //             let date=value?.split("/");
        //             let dd=date?date[1]:"";
        //             let dm=date?date[0]:"";
        //             let dy=date?date[2]:"";
        //             let newform=date?dd+"/"+dm+"/"+dy:""
        //             return(
        //             <p className='text-center m-0'>{newform}</p>
        //           )},
        //         },
               
        //         {
        //             accessorKey: "contactDetails",
        //             header: "Contact details",
        //             Cell: ({ cell }) => (
        //               <p className='text-center m-0'>{cell.getValue()}</p>
        //             ),
        //           },




               
                // {
                //     accessorKey: "ProductSrNo",
                //     header: "Product Sr No",
                //     Cell: ({ cell }) => (
                //       <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
                //     ),
                //   },
              
            
                // {
                //     accessorKey: "PinCode",
                //     header: "PinCode",
                //     Cell: ({ cell }) => (
                //       <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
                //     ),
                //   },
                // {
                //     accessorKey: "mobileNo",
                //     header: "Mobile No",
                //     Cell: ({ cell }) => (
                //       <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
                //     ),
                //   },
                // {
                //     accessorKey: "emailId",
                //     header: "Email Id",
                //   },
              
               
     
              
            ]
        );
        // if(loading) return <Spinner animation='border'/>


        const fixedColumnWidths = {
          leadsCode: '100%',
          // assignTech: 'fit-content',
      
      };     

        let todaysDate=new Date()?.toISOString();
        // useEffect(() => {

          
        
        //   let url2=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup`
          
                          
          
           
          
        //  if( todayFollowup || filterOverdue){
        //   fetch(filterOverdue?url2:urllfup,{
        //     headers:{
        //       "Authorization": `Bearer ${token}`
        //     }
        //   })
        //   .then((res)=>res.json())
        //   .then((result)=>{
        //     console.log(result);

        //     if(filterOverdue){
        //       let overDueData=result?.filter(i=>i?.leadOverDueStatus=="Overdue")


        //       console.log(overDueData);
        //       setgetAllFollowUps(overDueData)
        //     }
        //     else{

        //       setgetAllFollowUps(result)
        //     }

        //            localStorage.removeItem("filterTodaysFollowup");
        //            localStorage.removeItem("filterOverdueFollowup");

        //   })
        
        //  }
        // }, [])











        
 let filterByDivision= localStorage.getItem("dashDivFilter")
 let filterByBranch= localStorage.getItem("dashBranchFilter")
 let filterByRegion= localStorage.getItem("dashRegionFilter")
 let filterByFromDate= localStorage.getItem("dashFromFilter")
 let filterByToDate= localStorage.getItem("dashToFilter")


  useEffect(() => {

let overUrl=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup`;
    let defaultUrl=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup`;
    let urllfup=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup${todayFollowup ?"?":""}`;

    let url=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup${filterByDivision || filterByBranch || filterByRegion || filterByFromDate || filterByToDate || filterNew || filterConverted || filterLostLeads || filterInProgress || filterFollowup?"?":""}`;

    if (filterByDivision !== '') {
      url += `DivisionCode=${filterByDivision}&`;
    }
if (filterByBranch !== '') {
url += `BranchCode=${filterByBranch}&`;
}

if (filterByRegion !== '') {
url += `RegionCode=${filterByRegion}&`;
}
if(filterByFromDate !== ''){
url += `FromDate=${filterByFromDate}&`;

}
if(filterByToDate !== ''){
url += `ToDate=${filterByToDate}&`;

}

if(filterConverted || filterLostLeads || filterFollowup){
  url+=`StatusId=${filterFollowup?"5":filterConverted?"6":filterLostLeads?"7":""}&`
}

if(filterInProgress){
  url+=`isStatus=${filterInProgress?"1":""}&`
}

if(filterNew ){
  url+=`ActivityStatusId=${filterNew?"46":""}&`
}

if(todayFollowup !==''){
  urllfup += `FromDate=${todaysDate}&ToDate=${todaysDate}&`;

}
    
   if(filterByDivision || filterByBranch || filterByRegion || filterByFromDate || filterByToDate || filterConverted || filterLostLeads || filterNew || filterInProgress || filterFollowup){
    fetch(url,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);

    

      setgetAllFollowUps(result)
      
  
     localStorage.removeItem("dashDivFilter");
     localStorage.removeItem("dashBranchFilter");
     localStorage.removeItem("dashRegionFilter");
             localStorage.removeItem("dashFromFilter");
             localStorage.removeItem("dashToFilter");

             localStorage.removeItem("filterLostLeads");
             localStorage.removeItem("filterConvertedLeads");
             localStorage.removeItem("filterNewLeads");
                     localStorage.removeItem("filterInProgressLeads");
                     localStorage.removeItem("filterFollowupLeads");
                   localStorage.removeItem("filterTodaysFollowup");
                   localStorage.removeItem("filterOverdueFollowup");
            

    })
  
   }

   else if(todayFollowup){
    fetch(urllfup,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);

    

      setgetAllFollowUps(result)
      
  
     localStorage.removeItem("dashDivFilter");
     localStorage.removeItem("dashBranchFilter");
     localStorage.removeItem("dashRegionFilter");
             localStorage.removeItem("dashFromFilter");
             localStorage.removeItem("dashToFilter");

             localStorage.removeItem("filterLostLeads");
             localStorage.removeItem("filterConvertedLeads");
             localStorage.removeItem("filterNewLeads");
                     localStorage.removeItem("filterInProgressLeads");
                     localStorage.removeItem("filterFollowupLeads");
                   localStorage.removeItem("filterTodaysFollowup");
                   localStorage.removeItem("filterOverdueFollowup");
            

    })
   }
   else if(filterOverdue){
    fetch(overUrl,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);

    

      if(filterOverdue){
              let overDueData=result?.filter(i=>i?.leadOverDueStatus=="Overdue")


              console.log(overDueData);
              setgetAllFollowUps(overDueData)
            }



            localStorage.removeItem("dashDivFilter");
            localStorage.removeItem("dashBranchFilter");
            localStorage.removeItem("dashRegionFilter");
                    localStorage.removeItem("dashFromFilter");
                    localStorage.removeItem("dashToFilter");
       
                    localStorage.removeItem("filterLostLeads");
                    localStorage.removeItem("filterConvertedLeads");
                    localStorage.removeItem("filterNewLeads");
                            localStorage.removeItem("filterInProgressLeads");
                            localStorage.removeItem("filterFollowupLeads");
                          localStorage.removeItem("filterTodaysFollowup");
                          localStorage.removeItem("filterOverdueFollowup");
            
    })
   }
   else{
    fetch(defaultUrl,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);

    

      setgetAllFollowUps(result)
      
  
     localStorage.removeItem("dashDivFilter");
     localStorage.removeItem("dashBranchFilter");
     localStorage.removeItem("dashRegionFilter");
             localStorage.removeItem("dashFromFilter");
             localStorage.removeItem("dashToFilter");

             localStorage.removeItem("filterLostLeads");
             localStorage.removeItem("filterConvertedLeads");
             localStorage.removeItem("filterNewLeads");
                     localStorage.removeItem("filterInProgressLeads");
                     localStorage.removeItem("filterFollowupLeads");
                   localStorage.removeItem("filterTodaysFollowup");
                   localStorage.removeItem("filterOverdueFollowup");
            

    })
   }
  }, [])


  

















        const customHeaders = {
          serviceTicketNo:'Service Ticket No.',
          leadsCode: 'Leads Code',
          companyContactName: 'Company Contact Name',
          statusName: 'Lead Status',
          leadStatus:'Activity Status',
          leadTypeName:'Lead Type',
          customerCategoryName:'Customer Category',
          customerTypeName:'Customer Type',
          leadDate:'Lead Date',
          actualQuote:"Actual Quote",
          reviseQuote:"Revised Quote",
          expectedConversionDate:"Expected Conversion Date",
          customerType:"Customer Type",
          totalBudget:'Total Budget',
          nextDateOfFollowup:'Next Followup',
          divisionName:'Division Name',
          contactDetails:'Contact Details',
          leadOverDueStatus:'Lead Overdue Status',
          branchName:"Branch Name",
          regionName:"Region Name",
          activityRemark:"Activity Remarks",
          activityFollowupDate:"Activity Updation Date",
          leadNumber:"Lead Number",
          customerName:"Customer Name",
          visitDate:"Visit Date",
          followupMode:"Followup Mode",
          totalBudget:"Total Budget",
          reviseQuoteAmount:"Revised Quote Amount",
          conversationDetails:"Conversation Details",
          reasonsOfLeasLost:"Lead Lost Reason",
          nextFollowupDate:"Next Followup Date",
          activityName:"Activity Name",
          remarks:"Remarks",
          createdOn:"Last Activity Date"
      
        };
  return (
   <>
   <Card
              className="border-0 p-3 m-4"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
              style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
              <p className='pg-label m-0'>Opportunity  Details</p>
             <hr />


             <Row style={{boxShadow:"0px 0px 3px 3px #d4d4d4"}} className='m-3 p-3'>
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Division</Form.Label>
        <Form.Select aria-label="Default select example" value={filterDivision}
         onChange={(e)=>{
          setfilterDivision(e.target.value)
        }}
        >
      <option value="">Select</option>
      {
                              allDivisions?.map((division, index) => {
                                return (
                                  <option key={index} value={division?.parameterTypeId}> {division?.parameterType}</option>
                                );
                              })
                            }
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
                {
                  LoginRoleName=="AS8"?"":
                  <>
                  <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Region</Form.Label>
        <Form.Select aria-label="Default select example" value={filterRegion} onChange={(e)=>{
          setfilterRegion(e.target.value)
          setselectedRegion(e.target.value)
        }}>
      <option value="">Select</option>
      {
        allRegions?.map((region,index)=>{
          return(
            <>
            
            <option value={region?.regionCode}>{region?.regionName}</option>
            </>
          )
        })
      }
     
    </Form.Select>
              </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Branch</Form.Label>
        <Form.Select aria-label="Default select example" value={filterBranch} onChange={(e)=>{
          setfilterBranch(e.target.value)
        }}>
      <option value="">Select</option>
      {
        allBranches?.map((branch,index)=>{
          return(
            <>
            
            <option value={branch?.branchCode}>{branch?.branchName}</option>
            </>
          )
        })
      }
    </Form.Select>
              </Form.Group>
                </Col>
                  </>
                }
                
                {/* <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Customer company name</Form.Label>
              <Form.Control type="text" placeholder="" />
              </Form.Group>
                </Col> */}
                <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>From date</Form.Label>
              <Form.Control type="date" placeholder="" value={filterFromDate} onChange={(e)=>setfilterFromDate(e.target.value)}/>
              </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>To date</Form.Label>
              <Form.Control type="date" placeholder="" value={filterToDate} onChange={(e)=>setfilterToDate(e.target.value)}/>
              </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Lead Status</Form.Label>
        <Form.Select aria-label="Default select example" value={filterStatus}  onChange={(e)=>{setfilterStatus(e.target.value)}}>
      <option value="">Select</option>
      {
                                                            allStatus?.map((status, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={status?.parameterTypeId}>{status?.parameterType}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }

     
    </Form.Select>
              </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Activity Status</Form.Label>
        <Form.Select aria-label="Default select example" value={filterLeadStatus}
         onChange={(e)=>{
          setfilterLeadStatus(e.target.value)
        }}
        >
       <option value="">Select</option>

{
    activity?.map((status, index) => {
        return (
            <>
                <option value={status?.parameterTypeId} code={status}>{status?.parameterType}</option>
            </>
        )
    })
}
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
                <Col md={2}><div className="pt-3"><Button variant='' className='add-Btn mt-3 mb-3' onClick={(e)=>{
                  e.preventDefault()


                  let url=`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadFollowup${filterDivision || filterBranch || filterRegion || filterFromDate || filterToDate || filterStatus || filterLeadStatus?"?":""}`;

                  if (filterDivision !== '') {
                    url += `DivisionCode=${filterDivision}&`;
                  }

    if (filterBranch !== '') {
      url += `BranchCode=${filterBranch}&`;
    }   

    if (filterRegion !== '') {
      url += `RegionCode=${filterRegion}&`;
    }

    if(filterFromDate !== ''){
      url += `FromDate=${filterFromDate}&`;

    }   


    if(filterToDate !== ''){
      url += `ToDate=${filterToDate}&`;

    }


    if(filterStatus !== ''){
      url += `ActivityStatusId=${filterStatus}&`;
    }


    if(filterLeadStatus !== ''){
      url += `StatusId=${filterLeadStatus}&`;
    }



   

                  

                  fetch(url,{
                    headers:{
                      "Authorization": `Bearer ${token}`
                    }
                  })
                  .then((res)=>res.json())
                  .then((result)=>{
                    console.log(result);
                    setgetAllFollowUps(result)
                  })
                }}>Search</Button>
                 <Button variant="" className="m-2 mt-2" style={{ backgroundColor: "#005bab", color: "white", height: "fit-content",fontSize:"12px" }} onClick={()=>{
                
                  fetchAllFollowups()

                  setfilterDivision("")
                  setfilterBranch("")
                  setfilterRegion("")
                  setfilterFromDate("")
                  setfilterToDate("")
                  setfilterStatus("")
                  setfilterLeadStatus("")
                }}>Reset</Button>
                </div></Col>
                 
              </Row>
            
{
  Permissions?.isView?
  <MaterialReactTable
  columns={columns}
  data={getAllFollowUps}
  initialState={{ showColumnFilters: false }} //show filters by default
  
  muiTableHeadCellFilterTextFieldProps={{
    sx: { m: "0.5rem 0", width: "100%" },
    variant: "outlined",
  }}
  enableEditing
  // onEditingRowSave={handleSaveRowEdits}
  // onEditingRowCancel={handleCancelRowEdits}
  muiTableBodyRowProps={({row})=>({
    sx:{
      backgroundColor:row?.original?.leadOverDueStatus=="Overdue"?"#ff000033":"white",
  
    }
  })}
  
  
  muiTableBodyCellProps={({ cell }) => ({
    style: {
        width: fixedColumnWidths[cell.column.id],
        minWidth: fixedColumnWidths[cell.column.id],
        maxWidth: fixedColumnWidths[cell.column.id],
        border:"1px solid black"

    },
})}
  renderRowActions={({ cell,row, table }) => (
    
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip arrow placement="left" title="View">
        <IconButton 
        className="edit-btn"
        onClick={() => {
          localStorage.setItem("FupLeadId",cell.row.original?.leadId)
          navigate(`${pathName}/view-fup`)
        }}
        
        >
          <FaEye color='green'/>
        </IconButton>
      </Tooltip>
      {
        (cell.row.original?.statusName=="Closed" || cell.row.original?.statusName=="Cancel")?"":
        Permissions?.isAdd?
        <Tooltip arrow placement="left" title="Follow-up">
        <IconButton 
        className="edit-btn"
        onClick={() => {
          console.log(cell.row.original.leadId);
localStorage.setItem("FupLeadId",cell.row.original?.leadId)                          
          navigate(`${pathName}/add-fup`)}
        }
        
        >
          <MdCall color='#005bab'/>
        </IconButton>
      </Tooltip>:""
      }
     
    
    </Box>
  )}
 
renderTopToolbarCustomActions={({table})=>(
<>
<div style={{
display: 'flex',
gap: '16px',
padding: '10px',
flexWrap: 'wrap',
}}>

{Permissions?.isDownload?<Button variant=''
disabled={table.getPrePaginationRowModel().rows.length === 0}
//export all rows, including from the next page, (still respects filtering and sorting)
onClick={() =>
{
  // console.log(table.getPrePaginationRowModel().rows);
  handleExportRows(table.getPrePaginationRowModel().rows,customHeaders,['leadId','leadContactList','leadFollowupList','uploadDocuments','orderNo','documentType','followupId','followupModeId','documentTypeId','statusId','activityId'],[],"leadFollowupList","Followup Details","Activity-wise Details",true)

}
}
//   startIcon={}
>

<LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV'/>
</Button>:""}
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

/>:""
}
           

</Card> 

   </>
  )
}

export default FollowupLeads