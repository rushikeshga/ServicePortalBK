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
import { usePathName } from '../../../constants';

let date = new Date();
let d = date.getDate();
let m = date.getMonth() + 1;
let y = date.getFullYear();

export let today = d + "-" + m + "-" + y
const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

console.log(currentDate);
// const [visitDate, setVisitDate] = useState(moment().format("YYYY-MM-DD")); // Initializing state with current date



function AddFollowupEntry() {
    const pathName =usePathName()
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


    const [followupmodes, setfollowupmodes] = useState([])

    useEffect(() => {
        const fmodesUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=FollowupMode`;

        fetch(fmodesUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setfollowupmodes(result)
            })
    }, [])


    const [documentType, setdocumentType] = useState([])

    useEffect(() => {
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
    }, [])



    const [allStatus, setallStatus] = useState([])


    const [listOfReasons, setlistOfReasons] = useState([])



    useEffect(() => {
        const statusUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=27&Id=0&Code=0
        `;

        if(folloupData?.ActivityId){

        fetch(statusUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
setallStatus(result)



if(folloupData?.ActivityId==6 || folloupData?.ActivityId==7){

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
        
    setFollowupData((pre)=>{
        return{
            ...pre,
            StatusId:44
        }
    })
   
    
}
else{
    setFollowupData((pre)=>{
        return{
            ...pre,
            StatusId:0
        }
    })
}



                if( folloupData?.ActivityId!=6 || folloupData?.ActivityId!=7){
                    let notToShow=result?.find(i=>i?.parameterType=="Closed")  

console.log("below is list");
console.log(result?.filter(i=>i!=notToShow))

let filteredList=result?.filter(i=>i!=notToShow)
setallStatus(filteredList)
                }
                
              
            })
        }
    }, [folloupData?.ActivityId])


    
    useEffect(() => {
        const statusUrl = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Reasons%20Of%20Lead%20Lost`;
        fetch(statusUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setlistOfReasons(result)
            })
    }, [])


    // const fetchActivityUrl = `${process.env.REACT_APP_API_URL}api/LeadFollowup/GetAllLeadActivity`;

    // fetch(fetchActivityUrl, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })
    //     .then((res) => res.json())
    //     .then((result) => {
    //         console.log(result, "---------------------");
    //         setActivity(result)
    //     })

    const fetchActivityUrl = () => {
        fetch(`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadActivity`, {
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


    const [data, setData] = useState([

        {
            DateOfFollowup: "10 Jan 2022",
            // enquiry: "001",
            FollowupModeId: "Call",
            FinalQuote: "100000",
            DiscountValue: "10000",
            DocumentTypeId: "https://www.africau.edu/images/default/sample.pdf",
            ConversationDetails: "dummy",
            StatusId: "open",
            NextFollowupDate: ""


        },
        {
            DateOfFollowup: "10 Jan 2022",
            // enquiry: "001",
            FollowupModeId: "Call",
            FinalQuote: "100000",
            DiscountValue: "10000",
            DocumentTypeId: "https://www.africau.edu/images/default/sample.pdf",
            ConversationDetails: "dummy",
            StatusId: "open",
            NextFollowupDate: "10 Feb 2024"


        },

    ],
        []
    );




    // const downloadFile = (url, filename) => {
    //     fetch(url)
    //       .then(response => response.blob())
    //       .then(blob => {
    //         const blobUrl = window.URL.createObjectURL(new Blob([blob]));
    //         const link = document.createElement('a');
    //         link.href = blobUrl;
    //         link.setAttribute('download', filename);
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //       })
    //       .catch(error => console.error('Error downloading file:', error));
    //   };




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
                    let cdate = cell.getValue()
                    return (
                        <>
                            <div className='text-center'>{cdate.split(" ")[0]}</div>
                        </>
                    )
                }
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
                header: "Lead Status",
            },
            {
                accessorKey: "nextFollowupDate",
                header: "Next Follow-up Date",
                Cell: ({ cell }) => {
                    let val = cell.getValue()
                    return (
                        <>
                            <div className='text-center'>{val ? val?.split(" ")[0] : "-"}</div>
                        </>
                    )
                }
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
                                <LiaDownloadSolid fontSize={20} color='green' style={{cursor:"pointer"}}
                                 onClick={(e) => {
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
                                }} 
                                /> {fileName}  
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


    const customHeaders = {
        visitDate: "Contact Date",
        // followupModeId: "Followup Mode",
        totalBudget: "Total Budget",
        actualQuote: "Actual Quote",
        reviseQuoteAmount: "Revised Quote",
        conversationDetails: "Conversation Details",
        remarks: "Remarks",
        activityName: "Status of lead",
        statusName: "Activity Status",
    
        leadNumber:"Lead Number",
        customerName:"Customer Name",
        nextFollowupDate: "Next Followup",
       
      };
    


    // useEffect(()=>{
      
        
    // },[folloupData?.ActivityId])

const [activities, setactivities] = useState([])





const [AQError, setAQError] = useState('')
const [RQError, setRQError] = useState('')

const validateBudget = (budget) => {
    // Basic mobile number validation regex
    const regex = /^\d{0,12}$/;
    return regex.test(budget);
  };



const handleAQChange = (e) => {
    const value = e.target.value;
    setFollowupData((pre) => {
      return {
        ...pre,
        ActualQuote: value
      }
    })
    if (!validateBudget(value) && value != "") {
      setAQError('Invalid input. It must be maximum of 12 digits only');
    } else {
      setAQError('');
    }
  };

  const handleRQChange = (e) => {
    const value = e.target.value;
    setFollowupData((pre) => {
      return {
        ...pre,
        ReviseQuoteAmount: value
      }
    })
    if (!validateBudget(value) && value != "") {
      setRQError('Invalid input. It must be maximum of 12 digits only');
    } else {
      setRQError('');
    }
  };



  
    return (
        <>
                <Card
                    className="border-0 p-3 m-4"
                    //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                >






<Row className="mt-2">
                                <Col>
                                   <div className='d-flex'>
                                       <p><IoIosArrowRoundBack className='me-3' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} /></p> <p className="text-center pt-1" style={{ fontWeight: "bold", fontSize: "18px" }}>Today’s Opportunity  Information</p>
                                   </div>
                                    <hr />

                                    <Form id='followup'>
                                        <Row>
                                            {/* <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Opportunity  ID</Form.Label>
        <Form.Control type="number" placeholder="" />
       
      </Form.Group>
                    </Col> */}



                                            {/* <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Contact Date</Form.Label>
                                                    <Form.Control type="date" placeholder="" name="VisitDate" defaultValue={moment((today))?.format("YYYY-DD-MM")} onChange={handleChange} />


                                                </Form.Group>
                                            </Col> */}

                                            <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Contact Date <span className='req-t'>*</span></Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        placeholder=""
                                                        name="VisitDate"
                                                        value={folloupData.VisitDate}
                                                        onChange={handleChange}
                                                        min={followupLeadDate} // Set min attribute to current date
                                                        max={currentDate}

                                                    />
                                                </Form.Group>
                                            </Col>



                                            <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Mode of Contact <span className='req-t'>*</span></Form.Label>
                                                    <Form.Select aria-label="Default select example" name='FollowupModeId' onChange={handleChange}>
                                                        <option>Select</option>
                                                        {
                                                            followupmodes?.map((fModes, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={fModes?.parameterValId}>{fModes?.parameterText}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                        {/* <option value="3">Three</option> */}
                                                    </Form.Select>

                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Conversation Details <span className='req-t'>*</span></Form.Label>
                                                    <Form.Control as="textarea" rows={1} name='ConversationDetails' onChange={handleChange} />

                                                </Form.Group>
                                            </Col>


                                            {/* } */}
                                        </Row>
                                        <Row className='mt-2'>
                                            
                                        <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Activity Status <span className='req-t'>*</span></Form.Label>

                                                    <Form.Select aria-label="Default select example" name="ActivityId" onChange={(e) =>{ 




if(e.target.value!=6 || e.target.value!=7){
let notToShow=allStatus?.find(i=>i?.parameterType=="Closed")  

console.log("below is list");
console.log(allStatus?.filter(i=>i!=notToShow))

let filteredList=allStatus?.filter(i=>i!=notToShow)


setallStatus(filteredList)
}
                                                        
                                                        
                                                        if(
                                                            e.target.value==6 || e.target.value==7
                                                        ){
                                                            setFollowupData((pre)=>{
                                                                return{
                                                                    ...pre,
                                                                    ActualQuote:InternalfollowupList[0]?.actualQuote,
                                                                    ReviseQuoteAmount:InternalfollowupList[0]?.reviseQuoteAmount
                                                                }
                                                            })
                                                        }
                                                        else{
                                                            setFollowupData((pre)=>{
                                                                return{
                                                                    ...pre,
                                                                    ActualQuote:0,
                                                                    ReviseQuoteAmount:0
                                                                }
                                                            })
                                                        }
                                                        
                                                        setFollowupData((pre) => {
                                                        // const selectedIndex = e.target.selectedIndex;
                                                        // const selectedOptionCode = e.target.options[selectedIndex].getAttribute("code");
                            

                                                        // console.log(selectedOptionCode);

                                                        

                                                        

                                                        fetch(`${process.env.REACT_APP_API_URL}LeadFollowup/GetAllLeadActivity?activityId=${e.target.value}`, {
                                                            headers: {
                                                              "Authorization": `Bearer ${token}`
                                                            }
                                                          })
                                                            .then((res) => res.json())
                                                            .then((result) => {
                                                                console.log("----------------------activities-------------------------------");
                                                              console.log(result);
                                                              setactivities(result)
                                                           
                                                            })
                                                        console.log(e.target.value);
                                                        return {
                                                            ...pre,
                                                            ActivityId: e.target.value
                                                        }
                                                    })}
                                                }
                                                    >
                                                        <option>Select</option>

                                                        {
                                                            activity?.map((status, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={status?.activityId} code={status}>{status?.activityName}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            {
                                                folloupData?.ActivityId=="7" && activities[0]?.isReasons==true?
                                                <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Reason</Form.Label>
                                                    <Form.Select name='reasonsOfLeasLostId' onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        {
                                                            listOfReasons?.map((reason, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={reason?.parameterValId}>{reason?.parameterText}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </Form.Select>

                                                </Form.Group>
                                            </Col>:""
                                            }
                                            {activities[0]?.isActualQuote==true?<Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Actual Quote</Form.Label>
                                                    <Form.Control type="text" placeholder="" name="ActualQuote" value={folloupData?.ActualQuote} onChange={handleAQChange}/>
                                                    {AQError && <span style={{ color: 'red' }}>{AQError}</span>}

                                                </Form.Group>
                                            </Col>:""}

                                            {/* {fup?.FollowUpStatus == "1" ? "" :  */}
                                           {activities[0]?.isRevisedQuote==true? <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Revise Quote Amount</Form.Label>
                                                    <Form.Control type="text" placeholder="" name="ReviseQuoteAmount" value={folloupData?.ReviseQuoteAmount} onChange={handleRQChange} />
                                                    {RQError && <span style={{ color: 'red' }}>{RQError}</span>}

                                                </Form.Group>
                                            </Col>:""}
                                            {
                                                activities[0]?.isOrderNo==true?      <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Purches No/Sales Order No</Form.Label>
                                                    <Form.Control type="text" name='OrderNo' onChange={handleChange} placeholder="" />

                                                </Form.Group>
                                            </Col>:""
                                            }

                                       

                                            
                                           
                                           {
                                            activities[0]?.isRemarks==true?  <Col md={3}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Remarks</Form.Label>
                                                <Form.Control type="text" name='Remarks' onChange={handleChange} placeholder="" />

                                            </Form.Group>

                                        </Col>:""
                                           }
                                          


                                      
                                          
                                      

                                            <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Document Type</Form.Label>
                                                    <Form.Select aria-label="Default select example" name="DocumentTypeId" onChange={handleChange}>
                                                        <option value="0">Select</option>

                                                        {
                                                            documentType?.map((dTypes, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={dTypes?.parameterValId}>{dTypes?.parameterText}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </Form.Select>

                                                </Form.Group>
                                            </Col>


                                            <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Upload Document</Form.Label>
                                                    <Form.Control type="file" placeholder="" name="UploadDocuments" onChange={(e) => {
                                                        setFollowupData((pre) => {
                                                            return {
                                                                ...pre,
                                                                UploadDocuments: e.target.files[0]
                                                            }
                                                        })
                                                    }} />


                                                </Form.Group>
                                            </Col>




                                            <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Lead Status <span className='req-t'>*</span></Form.Label>

                                                    <Form.Select aria-label="Default select example" name="" disabled={folloupData?.ActivityId==6 || folloupData?.ActivityId==7} value={folloupData?.StatusId} onChange={(e) =>{ 
                                                        
                                                      


                                                        setFollowupData((pre) => {
                                                        return {
                                                            ...pre,
                                                            StatusId: e.target.value
                                                        }
                                                    })}}>
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
                                            {
                                                activities[0]?.isNextFollowupDate==true? <Col md={3}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Next Follow-up Date</Form.Label>
                                                    <Form.Control type="date" placeholder="" min={currentDate} name='NextFollowupDate' onChange={handleChange} // Set min attribute to current date
                                                    />

                                                </Form.Group>
                                            </Col>:""
                                            }
                                           
                                        </Row>

                                        <Row className="mt-4">
                                            <Col>
                                                <Button variant="" type="submit" className="add-Btn add-Btn-float" disabled={folloupData?.StatusId=="" || AQError || RQError} onClick={(e) => {
                                                    e.preventDefault()


                                                    const addFupUrl = `${process.env.REACT_APP_API_URL}LeadFollowup/UpsertLeadFollowup`;


                                                    let actualQuote=folloupData?.ActualQuote;
                                                    let revisedQuote=folloupData?.ReviseQuoteAmount;

                                                    let aQ=/^\d+$/;
                                                    let eQ=/^\d+$/;



                                                    if(folloupData?.VisitDate=="" || folloupData?.FollowupModeId=="" || folloupData?.ConversationDetails=="" || folloupData?.ActivityId=="" || folloupData?.StatusId==""){
                                                        Swal.fire({
                                                            icon:"error",
                                                            title:"Please fill all the fields marked with red *!"
                                                        })
                                                    }
                                                    else if((folloupData?.ActivityId=="2" || folloupData?.ActivityId=="3" || folloupData?.ActivityId=="4" || folloupData?.ActivityId=="6")&& !actualQuote=="" && (actualQuote?.length>0 && !actualQuote?.match(aQ))){
                                                            Swal.fire({
                                                                icon:"error",
                                                                title:"Actual quote should contain digits only!"
                                                            })
                                                    }
                                                    else if((folloupData?.ActivityId=="2" || folloupData?.ActivityId=="3" || folloupData?.ActivityId=="4" || folloupData?.ActivityId=="6")&& !revisedQuote=="" && (revisedQuote?.length>0 && !revisedQuote?.match(eQ))){
                                                        Swal.fire({
                                                            icon:"error",
                                                            title:"Revised quote should contain digits only!"
                                                        })  
                                                    }
                                                    else{


                                                    const formData = new FormData();
                                                    Object.keys(folloupData).forEach(key => {
                                                        if (key === 'UploadDocuments') {
                                                            formData.append(key, folloupData[key]);
                                                        } else {
                                                            formData.append(key, folloupData[key]);
                                                        }
                                                    });
                                                    fetch(addFupUrl, {
                                                        method: "POST",
                                                        headers: {
                                                            // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                            "Authorization": `Bearer ${token}`
                                                        },
                                                        body: formData
                                                    })
                                                        .then((res) => {
                                                            let resp = res.text()
                                                            resp.then((r) => {
                                                                console.log(r);
                                                                if (res.status == 200) {
                                                                    Swal.fire({
                                                                        icon: "success",
                                                                        title: "Saved successfully!"
                                                                    })

                                                                    document.getElementById("followup")?.reset();
                                                                    fetchAllInternalData()


                                                                    if(folloupData?.ActivityId==6 || folloupData?.ActivityId==7){
                                                                        navigate(`${pathName}/fup-leads`)
                                                                    }
                                                                    setFollowupData({
        
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

                                                                    setactivities([])
                                                                }
                                                            })
                                                        })

                                                    }

                                                }}>Submit</Button>
                                            </Col>
                                            <Col>
                                                <Button variant="" type="reset" className="cncl-Btn">Reset</Button>

                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>

                            <p className='pg-label m-0 mt-3'>Opportunity  Details</p>
                    <hr />
                            <Row className='mt-2'>
                                <Col>

                                    <MaterialReactTable
                                        columns={columns}
                                        data={InternalfollowupList}

                                        initialState={{ showColumnFilters: false }} //show filters by default

                                        muiTableHeadCellFilterTextFieldProps={{
                                            sx: { m: "0.5rem 0", width: "100%" },
                                            variant: "outlined",

                                        }}

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
                                                {/* {Permissions?.isDownload ? ( */}
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
                                                          "documentTypeId",
                                                          "leadId",
                                                          "followupId",
                                                          "statusId",
                                                          "uploadDocuments",
                                                          "activityId",
                                                          "followupModeId"
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
                                                {/* ) : (
                                                  ""
                                                )} */}
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







<p className='mt-3 dash-titles'>Contact Person details</p>

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

export default AddFollowupEntry