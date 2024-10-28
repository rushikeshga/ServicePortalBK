import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import NavBar from '../Navbar'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { usePathName } from '../../../constants'
import { IoAlertCircle } from 'react-icons/io5'
import moment from 'moment'

function WarrantyVerification({ natureFlag }) {
  const navigate = useNavigate()
  const pathName = usePathName()

  let verifyId = localStorage.getItem("verifyId");

  let token = localStorage.getItem("UserToken")

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format



  let productDetails = JSON.parse(localStorage.getItem("productDetails"))


  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [data, setdata] = useState({
    extended: ""

  })

  const [VerificationData, setVerificationData] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProductCustomerDeviationInfoById?ProdRegAutoId=${verifyId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        setVerificationData(result)

        setdeviation((pre) => {
          return {
            ...pre,
            batchDate: result?.batchStartDate?.split(" ")[0],
            batchEndDate: result?.batchEndDate?.split(" ")[0],
            invoiceDate: result?.invoiceDate?.split(" ")[0],
            warrantyDate: result?.warrantyDate?.split(" ")[0],
          }
        })
      })
  }, [])



  const lastUnderscoreIndex = VerificationData?.invoceFilePath?.lastIndexOf("_");
  const fileNameWithExt = VerificationData?.invoceFilePath?.slice(lastUnderscoreIndex + 1);


  const handleDownload = (blob, fileNameWithExt) => {
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




  const [deviation, setdeviation] = useState({
    prodDevAutoId: 0,
    ticketAutoId: verifyId,
    batchDate: "",
    batchEndDate: "",
    invoiceDate: "",
    warrantyDate: "",
    prodDeviationDate: "",
    remarks: "",
  });

  const minDate = moment((VerificationData?.batchEndDate?.split(" ")[0]))?.format("YYYY-MM-DD")



  return (
    <>
      <Container fluid>
        {/* <NavBar/> */}
        <Row className='justify-content-start pt-0'>
          <Col>
            <p className='m-0 text-start'>
              <IoIosArrowRoundBack className='me-3' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} />
              Back</p>
          </Col>

          <p className='text-start pg-label-warranty pt-3'>Warranty Verification (Branch service engineer screen for reference)</p>

          <Card className='pt-3'>
            <Row>
              <Col lg={4} md={12} sm={12}>
                <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                  <Card style={{ backgroundColor: 'grey' }} className='p-3 m-0'>
                    <div style={{ backgroundColor: "white", borderRadius: '8px' }} className='p-3'>

                      {/* <Row className='text-end m-0'>
  <Col>
  <Button variant=''><FaEdit/></Button>
  </Col>
</Row> */}
                      <Row>
                        <Col lg={4} md={6} sm={6}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s" width={40} height={40} alt="" srcset="" />
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Product model</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.productCode}</p>
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Product SN</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.serialNo}</p>
                        </Col>
                        <Col lg={3} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Product type</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.productType}</p>
                        </Col>
                        <Col lg={3} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Frame size</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.frameSize}</p>
                        </Col>
                        <Col lg={3} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Pole</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.pole}</p>
                        </Col>
                        <Col lg={3} md={6} sm={6}>
                          <p className='m-0' style={{ fontSize: "12px" }}>Voltage</p>
                          <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{VerificationData?.voltage} kw</p>
                        </Col>

                      </Row>
                    </div>

                  </Card>
                </Card>


                <Card className='p-3 mt-4' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>

                  <Row className='text-start'>
                    <Col>
                      <Form.Group style={{ width: "50%" }}>
                        <Form.Label>Warranty as per batch date</Form.Label>
                        <Form.Control type='date' readOnly value={moment((VerificationData?.batchEndDate?.split(" ")[0]))?.format("YYYY-MM-DD")} />
                      </Form.Group>
                      <Form.Group className='mt-4' style={{ width: "50%" }}>
                        <Form.Label>Warranty as per invoice date</Form.Label>
                        <Form.Control type='date' readOnly value={moment((VerificationData?.warrantyDate?.split(" ")[0]))?.format("YYYY-MM-DD")} />
                      </Form.Group>
                      <p style={{ color: "#005bab" }} className='mt-4'>Warranty to be extended</p>

                      <Form id="deviationForm">

                        <div className='d-flex'>
                          <Form.Check type='radio' name='extend' onChange={(e) => {
                            setdata((pre) => {
                              return {
                                ...pre,
                                extended: "1"
                              }
                            })

                            // setdeviation((pre)=>{
                            //   return{
                            //     ...pre,
                            //     remarks:""
                            //   }
                            // })
                          }} label="Yes" />


                          <Form.Check type='radio' name='extend' className='mx-5' label="No" onChange={(e) => {
                            setdata((pre) => {
                              return {
                                ...pre,
                                extended: "0"
                              }
                            })


                            setdeviation((pre) => {
                              return {
                                ...pre,
                                prodDeviationDate: "",
                                // remarks:''
                              }
                            })
                          }} />

                        </div>
                        <div style={{ width: "50%" }} className='mt-2'>{data?.extended == "1" ? <>
                          <Form.Label>New warranty date<span className='req-t'>*</span></Form.Label>
                          <Form.Control
                            type='date'
                            // max={currentDate}
                            min={minDate}
                            onChange={(e) => {
                              setdeviation((pre) => {
                                return {
                                  ...pre,
                                  prodDeviationDate: e.target.value
                                }
                              })
                            }} /></> : ""}</div>

                        {data?.extended == "0" ? <div style={{ width: "100%" }}>

                          <Form.Label>Comments <span className='req-t'>*</span></Form.Label>
                          <Form.Control as="textarea" rows={2} onChange={(e) => {
                            setdeviation((pre) => {
                              return {
                                ...pre,
                                remarks: e.target.value
                              }
                            })
                            console.log(deviation);
                          }

                          } />

                        </div> : ""}


                        <Row className='text-center m-0 mt-3'>
                          <Col>
                            <Button variant='' className='add-Btn' onClick={(e) => {
                              e.preventDefault()
                              let postUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/UpsertProdDeviation`;
                              if (data?.extended == 1 && deviation?.prodDeviationDate == "") {
                                Swal.fire({
                                  icon: "error",
                                  title: `"Date to be extended" field is mandatory!`
                                })
                              }
                              else if (data?.extended == '0' && deviation?.remarks == '') {
                                Swal.fire({
                                  icon: "error",
                                  title: `"Comments" field is mandatory!`
                                })
                              }
                              else {
                                fetch(postUrl, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                  },
                                  body: JSON.stringify(deviation)
                                })
                                  .then((res) => {
                                    let resp = res.text()
                                    resp.then((r) => {
                                      console.log(r);
                                      let digitregex = /^\d+$/;
                                      if (res.status == 200) {
                                        handleShow1()
                                        if (data?.extended == '0' && r.match(digitregex)) {
                                          handleShow1()
                                          document.getElementById("deviationForm").reset()
                                        }
                                        setdata((pre) => {
                                          return {
                                            ...pre,
                                            extended: ""
                                          }
                                        })
                                      }
                                    })
                                  })
                              }

                            }}>Submit</Button>

                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>


                </Card>
              </Col>
              <Col lg={8} md={12} sm={12}>
                <Card style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }} className='p-4 pb-3'>
                  <Row className='text-start'>

                    <p className='pg-label mt-3'>Customer/Firm Details</p>

                    

                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Customer/Firm Name</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.customerName} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Contact Person Name</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.contactPerson} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Primary Mobile No.</Form.Label>
                        <Form.Control type='tel' readOnly value={VerificationData?.primaryMobileNo} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control type='email' readOnly value={VerificationData?.emailId} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Alternate contact No.</Form.Label>
                        <Form.Control type='tel' readOnly value={VerificationData?.altContactNo} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Alternate email Id</Form.Label>
                        <Form.Control type='email' readOnly value={VerificationData?.altEmailId} />
                      </Form.Group>
                    </Col>


                    <Col md={6}>
                      <Form.Group className="mt-2">
                        <Form.Label>
                          Site Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={VerificationData?.siteAddress}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group className="mt-2">
                        <Form.Label>
                          PinCode
                        </Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.pinCode} />

                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mt-2">
                        <Form.Label>
                          State
                        </Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.stateName} />

                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mt-2">
                        <Form.Label>
                          City
                        </Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.cityName} />

                      </Form.Group>
                    </Col>


                    <div className='d-flex'>
                      <p className='pg-label mt-3'>Site details</p>
                      {/* <Form.Check type='checkbox' onChange={(e)=>{
    if(e.target.checked){

    
    setdata((pre)=>{
      return{
        ...pre,
        sameAsFirmDetails:1
      }
    })
  }
  else{
    setdata((pre)=>{
      return{
        ...pre,
        sameAsFirmDetails:0
      }
    })
  }


  
   }} className='mt-3 mx-4' disabled label="Same as Customer/Firm Details"/> */}
                    </div>
                    {
                      data?.sameAsFirmDetails == 1 ? "" :
                        <>
                          <Col md={3}>
                            <Form.Group className='mt-2'>
                              <Form.Label>Name of SPOC</Form.Label>
                              <Form.Control type='text' readOnly value={VerificationData?.nameOfSpoc} />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className='mt-2'>
                              <Form.Label>SPOC mobile No.</Form.Label>
                              <Form.Control type='tel' readOnly value={VerificationData?.spocMobileNo} />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className='mt-2'>
                              <Form.Label>SPOC email Id</Form.Label>
                              <Form.Control type='email' readOnly value={VerificationData?.spocEmailId} />
                            </Form.Group>
                          </Col>
                        </>
                    }
                    {/* <p className='mt-3'>Site Details</p> */}


                    <Col md={6}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.address1} />
                      </Form.Group>
                    </Col>
                    {/* <Col md={6}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Address line 2</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.address2} />
                      </Form.Group>
                    </Col> */}
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>PinCode</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.prodInstallationPinCode} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.prodInstallationStateName} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.prodInstallationCityName} />
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className='text-start mt-3'>
                    <p className='pg-label mt-3'>Purchase Info</p>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>  Purchased From</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.purchaseFrom} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type='date' readOnly value={moment((VerificationData?.invoiceDate?.split(" ")[0]))?.format("YYYY-MM-DD")} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label> Invoice Number</Form.Label>
                        <Form.Control type='text' readOnly value={VerificationData?.invoiceNo} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className='mt-2'>
                        <Form.Label>Download Invoice Copy</Form.Label>
                        {VerificationData?.invoceFilePath ? <p style={{ cursor: "pointer" }} onClick={(e) => {
                          e.preventDefault();

                          // let url = `${process.env.REACT_APP_API_URL+val}`
                          // saveAs(url, "File");

                          // ------------------------------Calling API to get File--------------------------------------



                          const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${VerificationData?.invoceFilePath}`;


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

                              // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                              console.log("File Name:", fileNameWithExt);
                              // console.log("Extension:", extension);
                              //    console.log(ext);
                              let resp = res.blob()
                              resp.then((r) => {
                                console.log(r);
                                if (r instanceof Blob) {
                                  handleDownload(r, fileNameWithExt);
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
                        }}  >{fileNameWithExt} <FaDownload fontSize={20} color='green' className='mx-4' /></p> : <p>No file available</p>}
                      </Form.Group>
                    </Col>

                  </Row>

                </Card>
              </Col>



              {/* <Col lg={2} md={4}>
                  <Card className='p-3 ' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                    <Row className='text-start'>
                      <Form.Group
                        className=""
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nature of complaint</Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                        >
                          <option value="">Select</option>

                        </Form.Select>
                      </Form.Group>


                    </Row>


                  </Card>
                </Col> */}





            </Row>
          </Card>
        </Row>













        {/* --------------------------------No extension------------------------ */}


        <Modal show={show1} onHide={handleClose1} size='xl' centered>
          {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
          <Modal.Body>
            <Row className='text-center'>
              <Col>
                <IoAlertCircle color='orange' fontSize={30} />
              </Col>
            </Row>
            <p className='text-center mt-3' style={{ fontWeight: "500" }}>
              In case warranty extension date is not mentioned, system  will consider warranty end date as based on batch date only.
            </p>
            <p className='text-center mt-3' style={{ fontWeight: "500" }}>
              Are you sure you want to continue?
            </p>
          </Modal.Body>
          <Modal.Footer>

            <Row className='text-center'>
              <Col>
                <Button variant="" className='add-Btn' onClick={() => {
                  // handleClose1()
                  navigate(`${pathName}/prod-deviation`);

                }}>
                  Ok
                </Button>
              </Col>
              <Col>
                <Button variant="" className='cncl-Btn' onClick={() => {
                  handleClose1()
                }}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>







      </Container>
    </>
  )
}

export default WarrantyVerification