import React, { useState, useMemo, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { MdCall } from "react-icons/md";

import { BiSolidFilePdf } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";


import { Box, IconButton, Tooltip } from '@mui/material';

import { saveAs } from "file-saver";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewFup() {
    const navigate = useNavigate();

    let token = localStorage.getItem("UserToken")



    let fleadid = localStorage.getItem("FupLeadId");


    const [leadData, setleadData] = useState([]);
    const [activity, setActivity] = useState([])


    const [folloupData, setFollowupData] = useState({
        
        FollowupId: 0,
        LeadId: 0,
        VisitDate: moment().format("YYYY-MM-DD"), // Initialize VisitDate with current date
        DateOfFollowup: "2024-03-14",
        ActualQuote: 0,
        ReviseQuoteAmount: 0,
        FollowupModeId: "",
        ConversationDetails: "",
        UploadDocuments: "",
        DocumentTypeId: 0,
        NextFollowupDate: "",
        Remarks:"",
        OrderNo:0,
        reasonsOfLeasLostId:0,
        ActivityId:0,
        StatusId: 0
    })


    const handleChange = (e) => {
        const newdata = { ...folloupData };
        newdata[e.target.name] = e.target.value;
        setFollowupData(newdata);
        console.log(newdata);
    }



    const [InternalfollowupList, setInternalfollowupList] = useState([])

const [followupLeadDate, setfollowupLeadDate] = useState(null)

    const fetchAllInternalData = () => {
        const url = `${process.env.REACT_APP_API_URL}LeadFollowup/GetLeadFollowupById?leadId=${fleadid}`;

        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setleadData(result)
                setInternalfollowupList(result?.leadFollowupList)
                setFollowupData((pre) => {
                    return {
                        ...pre,
                       
                      
                        LeadId: result?.leadId

                    }
                })

console.log("-------------------------------Date----------------------------");
console.log(result?.leadDate?.split(" ")[0]);
let ldate=result?.leadDate?.split(" ")[0]
let ldateMod=ldate?.split("/")
let ldateY=ldateMod[2];
let lDateM=ldateMod[0];
let lDateD=ldateMod[1]


let leadDateFormat=ldateY+"-"+lDateM+"-"+lDateD;
console.log(leadDateFormat);
                setfollowupLeadDate(leadDateFormat)

            })
    }


    useEffect(() => {
        fetchAllInternalData()
    }, [])










    const handleDownload = (blob,fileNameWithExt) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;


        link.setAttribute('download', `${fileNameWithExt}`); // Specify the desired file name and extension
        // link.setAttribute('download',fileName); // omitting extension
        document.body.appendChild(link);
        link.click();
        // Clean up resources
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      };



 



    const columns = useMemo(
        () => [

            {
                accessorKey: "visitDate",
                header: "Contact Date",
                Cell: ({ cell }) => {
                    let value=cell.getValue()?.toLocaleString()?.split(" ")[0];
  
                    let date=value?.split("/");
                    let dd=date[1];
                    let dm=date[0];
                    let dy=date[2];
                    let newform=dd+"/"+dm+"/"+dy
                    return(
                    <p className='text-center m-0'>{newform}</p>
                  )},
            },
            {
                accessorKey: "followupMode",
                header: "Mode of Contact ",
            },
            {
                accessorKey: "totalBudget",
                header: "Total Budget",
                Cell: ({ cell }) => (
                  <p className='text-end m-0'>{cell.getValue()?.toLocaleString()}</p>
                ),
              },
            {
                accessorKey: "actualQuote",
                header: "Actual Quote",
                Cell: ({ cell }) => (
                    <p className='text-end m-0'>{cell.getValue()?.toLocaleString()}</p>
                  ),
            },
            {
                accessorKey: "reviseQuoteAmount",
                header: "Revise Quote Amount",
                Cell: ({ cell }) => (
                    <p className='text-end m-0'>{cell.getValue()?.toLocaleString()}</p>
                  ),
            },
           
            {
                accessorKey: "conversationDetails",
                header: "Conversation Details",
                size:180
            },
            {
                accessorKey: "remarks",
                header: "Remarks ",
            },
            
            {
                accessorKey: "activityName",
                header: "Status of Lead",
            },
            {
                accessorKey: "statusName",
                header: "Activity Status",
            },
            {
                accessorKey: "nextFollowupDate",
                header: "Next Follow-up Date",
                Cell: ({ cell }) => {
                    let value=cell.getValue()?.toLocaleString()?.split(" ")[0];
  
                    let date=value?.split("/");
                    let dd=date?date[1]:"";
                    let dm=date?date[0]:"";
                    let dy=date?date[2]:"";
                    let newform=dd+"/"+dm+"/"+dy
                    return(
                    <p className='text-center m-0'>{newform}</p>
                  )},
            },
            {
                accessorKey: "uploadDocuments",
                header: "Document",
                Cell: ({ cell }) => {
                    let val = cell.getValue()
                    const lastUnderscoreIndex = val.lastIndexOf("_");

                    const fileName = val.slice(lastUnderscoreIndex+1);
                    return (
                        <>
                            {val?<div>
                                <LiaDownloadSolid fontSize={20} color='green' style={{cursor:"pointer"}} onClick={(e) => {
                                    e.preventDefault();

                                    // let url = `${process.env.REACT_APP_API_URL+val}`
                                    // saveAs(url, "File");

// ------------------------------Calling API to get File--------------------------------------



const downloadUrl=`${process.env.REACT_APP_API_URL}LeadFollowup/download?FilePath=${val}`;


fetch(downloadUrl, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },

  })
    .then((res) => {
        console.log("logging file response");
        console.log(res);
        const lastDotIndex = res.url.lastIndexOf(".");
        const lastUnderscoreIndex = res.url.lastIndexOf("_");
        const fileNameWithExt = res.url.slice(lastUnderscoreIndex+1);
        // const extension = res.url.slice(lastDotIndex + 1);//to get ext
        
        console.log("File Name:", fileNameWithExt);
        // console.log("Extension:", extension);
    //    console.log(ext);
      let resp = res.blob()
      resp.then((r) => {
        console.log(r);
        if (r instanceof Blob) {
            handleDownload(r,fileNameWithExt);
          } else {
            // Handle non-Blob responses
            console.error('Response is not a Blob');
          }

      })
    })








                                    // const link = document.createElement('a');
                                    // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                    // link.download = 'downloaded_image.jpeg';
                                    // document.body.appendChild(link);
                                    // link.click();
                                    // document.body.removeChild(link);
                                }} /> {fileName}  
                            </div>:""}
                        </>
                    )
                }
            },
            //   {
            //     accessorKey: "NextFollowUpDate",
            //     header: "Next Follow-up Date",
            //     Cell:({cell})=>{
            //       let cdate=cell.getValue()
            //       return(
            //         <>
            //         <div>{cdate.split(" ")[0]}</div>
            //         </>
            //       )
            //     }
            //   },


        ],
        []
    );



const [activities, setactivities] = useState([])



  return (
    <>
                <Card
                    className="border-0 p-3 m-4"
                    //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                >


                                   <div className='d-flex'>
                                       <p><IoIosArrowRoundBack className='me-3' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} /></p> <p className='pg-label m-0 mt-1'>Opportunity  Details</p>
                                   </div>

                            
                    <hr />
                            <Row className=''>
                                <Col>

                                    <MaterialReactTable
                                        columns={columns}
                                        data={InternalfollowupList}

                                        initialState={{ showColumnFilters: false }} //show filters by default

                                        muiTableHeadCellFilterTextFieldProps={{
                                            sx: { m: "0.5rem 0", width: "100%" },
                                            variant: "outlined",

                                        }}

                                    />
                                </Col>
                            </Row>



                 
                    <Row>
                        <Col>


                            <Row>
                                <Col>
                                    {/* <Card style={{ backgroundColor: "rgb(0 91 171)", color: "white" }} className="p-4">

                                        <Table borderless responsive className='fup-tbl-frm'>
                                            <tr>
                                                <th style={{ color: "white" }}>Name</th>
                                                <td><Form.Control className="px-2 fup-fc" type='text' name='Name' value={folloupData?.Name} onChange={handleChange} /></td>
                                                <th style={{ color: "white" }}>Enquiry Date</th>
                                                <td><Form.Control className="px-2 fup-fc" type='date' value={moment((leadData?.leadDate?.split(" ")[0]))?.format("YYYY-MM-DD")} disabled /></td>


                                            </tr>
                                            <div className='m-2'></div>
                                            <tr>
                                                <th style={{ color: "white" }}>Address</th>
                                                <td><Form.Control className="px-2 fup-fc" as="textarea" name='Address' rows={2} value={folloupData?.Address} onChange={handleChange} /></td>
                                                <th style={{ color: "white" }}>Mobile Number</th>
                                                <td><Form.Control className="px-2 fup-fc" type="tel" name='MobileNo' value={folloupData?.MobileNo} onChange={handleChange} /></td>
                                            </tr>
                                            <div className='m-2'></div>

                                            <tr>
                                                <th style={{ color: "white" }}>Source</th>
                                                <td><Form.Control className="px-2 fup-fc" type='text' value={leadData?.source} disabled /></td>
                                               
                                                <th style={{ color: "white" }}>Email</th>
                                                <td><Form.Control className="px-2 fup-fc" type='email' name='EmailId' value={folloupData?.EmailId} onChange={handleChange} /></td>
                                            </tr>
                                           
                                        </Table>
                                     
                                    </Card> */}







<p className='mt-3 fs-5'>Contact Person details</p>

                                    <Table responsive bordered>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Designation</th>
                                                <th>Mobile No.</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                leadData?.leadContactList?.map((data,index)=>{
                                                    return(
                                                        <>
                                                          <tr>
                                                <td>{data?.contactPersonName} <span>{data?.isPrimaryContact==1? <span className='px-2 p-1' style={{fontSize:"12px",backgroundColor:"red",color:"white",borderRadius:"12px",fontWeight:"500"}}>primary</span>:""}</span></td>
                                                <td>{data?.designation}</td>
                                                <td>{data?.mobileNo}</td>
                                                <td>{data?.emailId}</td>
                                                <td>{data?.mobileNo}</td>
                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                          
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>


                       


                           


                        </Col>
                    </Row>
                </Card>
    </>
  )
}

export default ViewFup