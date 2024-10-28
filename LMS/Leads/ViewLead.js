import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { useNavigate } from 'react-router-dom';

import { Card, Col, Row, Form, Button, Table, Tab, Nav, Tabs } from "react-bootstrap";
// import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown';
import { useRef } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Swal from 'sweetalert2';
import moment from 'moment';
import { usePathName } from '../../../constants';
function ViewLead() {
  const pathName =usePathName()
    const navigate = useNavigate();
    let token = localStorage.getItem("UserToken")
    let leadId=localStorage.getItem("leadId");


    const [EditLeadData, setEditLeadData] = useState({
      leadId: leadId,
      sourceId: 0,
      leadTypeId: 0,
      subLeadTypeId: 0,
      productSrNo: "",
      customerTypeId: 0,
      segmentId: 0,
      customerCategoryId: 0,
      serviceTicketNo: "",
      leadDate: moment().format("YYYY-MM-DD"),
      companyContactName: "",
      isActive: true,
      customerAddress: "",
      rating: "",
      totalBudget: "0",
      probabilityOfWin: "",
      projectStateId: 0,
      projectCityId: 0,
      projectPincodeId: 0,
      conversation: "",
      branchCode: "",
      divisionCode: "",
      regionCode: "",
      leadsDivisionProductList: [],
      leadContactList:[],
      expectedConversionDate:""
    });


  const [activeTab, setactiveTab] = useState('0');

const [tableData, setTableData] = useState([])


const [tableData2, settableData2] = useState([])


    const getLeadByIdUrl = `${process.env.REACT_APP_API_URL}Lead/GetLeadById?leadId=${leadId}`
    useEffect(() => {
      fetch(getLeadByIdUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setEditLeadData((pre) => {
            return {
              ...pre,
              sourceId: result?.sourceName,
              leadTypeId: result?.leadTypeName,
              subLeadTypeId:result?.subLeadTypeName,
              customerTypeId: result?.customerTypeName,
              segmentId: result?.segmentName,
              customerCategoryId: result?.customerCategoryName,
              productSrNo: result?.productSrNo,
              serviceTicketNo: result?.serviceTicketNo,
              leadDate: result?.leadDate?.split(" ")[0],
              industryType:result?.industryType,
              companyContactName: result?.companyContactName,
              contactPersonName: result?.contactPersonName,
              customerAddress: result?.customerAddress,
              cityId:result?.cityId,
              stateId: result?.stateId,
              pincodeId: result?.pincodeId,
              designation: result?.designation,
              mobileNo: result?.mobileNo,
              emailId: result?.emailId,
              roleId: result?.roleId,
              rating: result?.rating,
              totalBudget: result?.totalBudget,
              probabilityOfWin: result?.probabilityOfWin,
              projectStateId: result?.projectStateName,
              projectCityId: result?.projectCityIdName,
              projectPincodeId: result?.projectPincodeId,
              conversation: result?.conversation,
              branchCode: result?.branchCode,
              divisionCode: result?.divisionCode,
              regionCode: result?.divisionCode,
              leadsDivisionProductList: result?.leadsDivisionProductDisplay,
              leadContactList:result?.leadContactList,
              serviceTicketNo:result?.serviceTicketNo,
              expectedConversionDate:result?.expectedConversionDate?.split(" ")[0]
               
            }
          })
  
  
          setTableData(result?.leadsDivisionProductDisplay)
          // setpayloadData(result?.leadsDivisionProductDisplay)
          settableData2(result?.leadContactList)
          // setpayloadData2(result?.leadContactList)
  
  
  
          // const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.projectStateId}&Code=0`;
          // fetch(cityUrl, {
          //   headers: {
          //     "Authorization": `Bearer ${token}`
          //   }
          // })
          //   .then((res) => res.json())
          //   .then((result) => {
          //     console.log(result);
          //     setcities(result)
          //   })
        })
    }, [])
  
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
  
  
  

    const handleNextTab = () => {

      // Logic to determine the next tab
  
      // For simplicity, I'm just moving to the next tab in order
  
      const tabOrder = ['0', '1', '2'];
  
      const currentIndex = tabOrder.indexOf(activeTab);
      let nextIndex = currentIndex + 1;
    
      console.log(currentIndex);
      console.log(nextIndex);
      // If the next index is greater than or equal to the length of tabOrder, reset to the first tab
      if (nextIndex >= tabOrder.length) {
        nextIndex = 0;
      }
    
      // If the next tab index is less than the current index, it means the user navigated back to the first tab
      // In that case, set the next index to the current index + 1
      if (nextIndex <= currentIndex) {
        nextIndex = currentIndex + 1;
      }
    setactiveTab(tabOrder[nextIndex]);
  
    };
  return (
    <>
        <Card
          className="border-0 p-3 m-4"
        
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <p className='pg-label m-0'> <IoIosArrowRoundBack className='me-3' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} />View Lead</p>
          <hr />

          <Form>

            <Row>
           
              <Col>
             
                <Tabs variant="pills" activeKey={activeTab}
              
                defaultActiveKey={'0'}

                onSelect={(k) => {
                  setactiveTab(k)
                   console.log(k)
                  }}

                justify style={{ border: "1px solid #005bab", borderRadius: "5px" }}>
                  <Tab eventKey={'0'} title="Leads">
                    <p className='mt-3 dash-titles'>Lead Type</p>

                    <Row className='mt-3'>
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Date </Form.Label>
                          <Form.Control type="date" name='leadDate' placeholder="" disabled value={moment((EditLeadData?.leadDate))?.format("YYYY-MM-DD")} max={currentDate} />
                        </Form.Group>

                      </Col>
                    
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Source </Form.Label>
                     
                          <Form.Control type='text' disabled value={EditLeadData?.sourceId}/>
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Lead Type </Form.Label>
                        
                          <Form.Control type='text' disabled value={EditLeadData?.leadTypeId}/>

                        </Form.Group>

                      </Col>

                      {
                        EditLeadData.leadTypeId != "97" ?
                          <Col md={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Lead Sub Type</Form.Label>
                            


                              <Form.Control type='text' disabled value={EditLeadData?.subLeadTypeId}/>

                            </Form.Group>

                          </Col> : ""

                      }
                      {
                        EditLeadData.leadTypeId == "97" ?
                          <Col md={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Service Ticket No. </Form.Label>
                              {/* <ReactSearchAutocomplete
                                items={ticketNos}
                                placeholder={EditLeadData?.serviceTicketNo}
                                onSearch={handleOnSearch}
                                onHover={handleOnHover}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                              
                                formatResult={formatResult}
                                fuseOptions={{ keys: ["Name"] }}
                                // necessary, otherwise the results will be blank
                                resultStringKeyName="Name"
                              /> */}
                            </Form.Group>
                          </Col> : ""
                      }
                    </Row>


{/* 
                    <Row className='mt-3'>

                      

                   
                    </Row> */}


                    <p className='mt-3 dash-titles'>Company profile</p>



<Row className='mt-3'>

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Company / Firm Name </Form.Label>
      <Form.Control type="text" placeholder="" disabled name='companyContactName' value={EditLeadData?.companyContactName} autoComplete='off' />

    </Form.Group>
  </Col>

 

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>PinCode </Form.Label>
      <Form.Control type='number' name='projectPincodeId' disabled value={EditLeadData?.projectPincodeId}
      
      />


{/* {pinError && <span style={{ color: 'red' }}>{pinError}</span>} */}

    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>State </Form.Label>
   

<Form.Control type='text' disabled value={EditLeadData?.projectStateId}/>
    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>City </Form.Label>
  
<Form.Control type='text' disabled value={EditLeadData?.projectCityId}/>



    </Form.Group>
  </Col>
 

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Address </Form.Label>
      <Form.Control as="textarea" rows={1} placeholder="" disabled name='customerAddress' value={EditLeadData?.customerAddress} />


    </Form.Group>
  </Col>

  
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Customer Type </Form.Label>
  

      <Form.Control type='text' disabled value={EditLeadData?.customerTypeId}/>

    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Customer Category </Form.Label>
     
      <Form.Control type='text' disabled value={EditLeadData?.customerCategoryId}/>


    </Form.Group>
  </Col>
   <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Segment </Form.Label>
     
      <Form.Control type='text' disabled  value={EditLeadData?.segmentId}/>


    </Form.Group>
  </Col>

</Row>

<p className='mt-3 fs-5'>Contact Person details</p>


<Row className='mt-3'>


  {
                        EditLeadData?.leadContactList?.filter(item=>item?.isPrimaryContact==true)?.length>=1?"":
                        <Col md={2} className='pt-3'>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                          {/* <Form.Label>Designation</Form.Label> */}
                          <Form.Check type="checkbox"  label="Is primary contact?"
                          //  onChange={(e)=>{
                          //   if(e.target.checked){

                          //     setprimaryContact(1)
                          //   }
                          //   else{
                          //     setprimaryContact(0)

                          //   }
                          // }}
                           />


                        </Form.Group>
                      </Col>
                      }
{/*                         
  <Col md={3} className='pt-3'>
                        <div className='mt-3'><Button variant='' className='add-Btn' disabled={emailError || mobileError} onClick={()=>isEditing?handleUpdateDataLeadDetail(editIndex):handleAddDataLeadDetail()}>{isEditing?"Update":"Add"}</Button></div>

  </Col> */}


</Row>


<Row>
  <Col>
  <Table responsive bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Role</th>
                <th>Designation</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {
                EditLeadData?.leadContactList?.map((data,index)=>{
                  return(
                    <>
                     <tr>
                <td>{data?.contactPersonName} <span className='m-0 p-0'>{data?.isPrimaryContact?<span className='px-2 p-1' style={{fontSize:"12px",backgroundColor:"red",color:"white",borderRadius:"12px",fontWeight:"500"}}>primary</span>:""}</span></td>
                <td>{data?.mobileNo}</td>
                <td>{data?.emailId}</td>
                <td>{data?.roleName}</td>
                <td>{data?.designation}</td>
                {/* <td><div className='d-flex gap-5'>
                  {data?.isPrimaryContact?"":<FaEdit fontSize={20} onClick={()=>{
                  setisEditing(true);
                  seteditIndex(index)
                  setcontactPersonName(data?.contactPersonName)
                  setmobileNo(data?.mobileNo)
                  setemailId(data?.emailId)
                  setroleId(data?.roleId)
                  setroleName(data?.roleName)
                  setdesignation(data?.designation)
                  setprimaryContact(data?.isPrimaryContact)
                }}/>}
                <HiOutlineTrash fontSize={20} color="red" onClick={()=>handleDelete2(index)}/></div></td> */}
              </tr>
                    </>
                  )
                })
              }
             
             
            </tbody>
  </Table>
  </Col>
</Row>

                    {/* <p className='mt-3 dash-titles'>Project Details </p>
                    <Row className='mt-3'>

                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Customer Type</Form.Label>
                          <Form.Select aria-label="Default select example" name='customerTypeId' value={EditLeadData?.customerTypeId}>
                            <option>Select</option>
                            {
                              AllCustomerTypes?.map((customerType, index) => {
                                return (
                                  <>
                                    <option value={customerType?.parameterValId}>{customerType?.parameterText}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>


                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Customer Category</Form.Label>
                          <Form.Select aria-label="Default select example" name='customerCategoryId' value={EditLeadData?.customerCategoryId}>
                            <option>Select</option>
                            {
                              AllCustomerCategories?.map((customerCategory, index) => {
                                return (
                                  <>
                                    <option value={customerCategory?.parameterValId}>{customerCategory?.parameterText}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>


                        </Form.Group>
                      </Col>
                     

                    </Row>

                    <Row className='mt-3'>

                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Pincode</Form.Label>
                          <Form.Control type='number' name='projectPincodeId' value={EditLeadData?.projectPincodeId} onChange={(e) => {
                            setEditLeadData((pre) => {
                              return {
                                ...pre,
                                projectPincodeId: e.target.value
                              }
                            })


                            if (e.target.value && e.target.value?.length == 6) {


                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${e.target.value}&Code=0`, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result[0]);
                                  setEditLeadData((pre) => {
                                    return {
                                      ...pre,
                                      projectStateId: result[0]?.parameterTypeId
                                    }
                                  })



                                  // if(result[0]?.parameterTypeId)

                                  if (result[0] != undefined) {


                                    const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
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
                                  }
                                })


                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${e.target.value}&Code=0`, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result[0]);
                                  setEditLeadData((pre) => {
                                    return {
                                      ...pre,
                                      projectCityId: result[0]?.parameterTypeId
                                    }
                                  })
                                })

                            }
                            else {
                              setEditLeadData((pre) => {
                                return {
                                  ...pre,
                                  projectStateId: 0,
                                  projectCityId: 0
                                }
                              })
                            }


                          }} />




                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Project State</Form.Label>
                          <Form.Select aria-label="Default select example" name='projectStateId' value={EditLeadData?.projectStateId} onChange={(e) => {
                            setEditLeadData((pre) => {
                              return {
                                ...pre,
                                projectStateId: e.target.value
                              }
                            })






                            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${e.target.value}&Code=0`;
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
                            <option>Select</option>
                            {
                              states?.map((state, index) => {
                                return (
                                  <>
                                    <option value={state?.parameterTypeId} key={index}>{state?.parameterType}</option>

                                  </>
                                )
                              })
                            }
                          </Form.Select>


                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Project City</Form.Label>
                          <Form.Select aria-label="Default select example" name='projectCityId' value={EditLeadData?.projectCityId}>
                            <option>Select</option>
                            {
                              cities && cities?.map((city, index) => {
                                return (
                                  <>
                                    <option value={city?.parameterTypeId} key={index}>{city?.parameterType}</option>

                                  </>
                                )
                              })
                            }
                          </Form.Select>


                        </Form.Group>
                      </Col>


                    </Row> */}


                    {/* <Row className='text-center mt-4'>
                      <Col>
                        <Button variant='' className='add-Btn' disabled={pinError} onClick={(e) => {
                          e.preventDefault();






                          if(EditLeadData?.leadDate=="" || EditLeadData?.sourceId=="" || EditLeadData?.leadTypeId=="" || EditLeadData?.companyContactName=="" || EditLeadData?.projectPincodeId=="" || EditLeadData?.projectStateId=="" || EditLeadData?.projectCityId=="" || EditLeadData?.customerAddress=="" || EditLeadData?.customerTypeId=="" || EditLeadData?.customerCategoryId=="" || EditLeadData?.segmentId==""){
                            Swal.fire({
                              icon:"error",
                              title:"Please fill all the fields marked with red *!"
                            })
                          }
                          else if(EditLeadData?.leadTypeId=="97" && EditLeadData?.serviceTicketNo==""){
                            Swal.fire({
                              icon:"error",
                              title:"Please fill all the fields marked with red *!"
                            })
                          }
                          else{

                          const addLeadUrl = `${process.env.REACT_APP_API_URL}Lead/UpsertLead`;

                          let n = {
                            ...EditLeadData,
                            sourceId: parseInt(EditLeadData?.sourceId),
                            leadTypeId: parseInt(EditLeadData?.leadTypeId),
                            customerTypeId: parseInt(EditLeadData?.customerTypeId),
                            segmentId: parseInt(EditLeadData?.segmentId),
                            customerCategoryId: parseInt(EditLeadData?.customerCategoryId),
                            stateId: parseInt(EditLeadData?.stateId),
                            pincodeId: parseInt(EditLeadData?.pincodeId),
                            roleId: parseInt(EditLeadData?.roleId),




                          }

                          fetch(addLeadUrl, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(n)

                          })
                            .then((res) => {
                              let resp = res.text()
                              resp.then((r) => {
                                console.log(r);
                                setEditLeadData((pre) => {
                                  return {
                                    ...pre,
                                    leadId: r
                                  }
                                })
                                if (res.status == 200) {
                                  // Swal.fire({
                                  //   icon: "success",
                                  //   title: "Saved successfully!"
                                  // })


                                  setactiveTab((pre) => pre + 1)

                                }
                                else {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong!",
                                    text: "Try again later!"

                                  })
                                }
                              })
                            })


                          }
                        }}>Save & Next</Button>
                      </Col>
                 
                    </Row> */}
                  </Tab>
                  <Tab eventKey={'1'} title="Division & Products">
                 
                   


                    <Table responsive co className='mt-3'>
                      <thead>
                        <tr>
                          <th>Division</th>
                          <th>Product Line</th>
                          {/* <th>Product Group</th> */}
                          {/* <th>Service Offering</th> */}
                          <th>Quantity</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {tableData?.map((data, index) => (
                          <tr key={index}>
                            <td>{data.divisionName}</td>
                            <td>{data.productLineName}</td>
                            {/* <td>{data.productGroupName}</td> */}
                            {/* <td>{data.serviceOfferingName}</td> */}
                            <td>{data.totalNoOfProducts}</td>
                            {/* <td>
                             {tableData[index].hasOwnProperty('productLineCodeList')?"": <FaEdit fontSize={20} onClick={()=>{
                                        setisEditing(true);
                                        seteditIndex(index)
                      
                                                      
                      let pl=data?.productLineCode?.split(",")

                      const PlObj = pl?.map(productLine => ({ parameterTypeId: productLine }));
                      console.log(PlObj);
                      // setselectedPL(data.productLineCodeID)
                                  let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${data?.divisionCode}`;

                                  fetch(getAllProductLines1, {
                                    headers: {
                                      "Authorization": `Bearer ${token}`
                                    }
                                  })
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result);
                                      setallproductLines(result);
                                      const matchingBranchNames = result?.filter(item => PlObj?.some(branch => branch.parameterType === item.parameterType))
                                      .map(item => ({parameterType:item.parameterType,parameterTypeId:item.parameterTypeId}));


                                     setselectedPL(matchingBranchNames)
                                     console.log(matchingBranchNames);
                                    });

        
                  setDivision(data?.divisionCode);
                  setDivisionName(data?.divisionCodeName)
                              setserviceOfferingName(data?.serviceOfferingName)
                  setServiceOffering(data?.serviceOfferingId)
                  setQuantity(data?.totalNoOfProducts);
              
                
              
            
                
                }}/> 
              }
                 <HiOutlineTrash color='red' fontSize={20}  onClick={()=>handleDelete(index)}/></td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    {/* <Row className='mt-4'>
                      <Col>
                        <Button variant='' className='cncl-Btn add-Btn-float' onClick={() => setactiveTab((prev) => prev - 1)}>Previous</Button>
                      </Col>
                      <Col>
                        <Button variant="" className="add-Btn" onClick={(e) => {
                          e.preventDefault();

                          const addLeadUrl = `${process.env.REACT_APP_API_URL}Lead/UpsertLead`;

                          let n = {
                            ...EditLeadData,
                            sourceId: parseInt(EditLeadData?.sourceId),
                            leadTypeId: parseInt(EditLeadData?.leadTypeId),
                            customerTypeId: parseInt(EditLeadData?.customerTypeId),
                            segmentId: parseInt(EditLeadData?.segmentId),
                            customerCategoryId: parseInt(EditLeadData?.customerCategoryId),
                            stateId: parseInt(EditLeadData?.stateId),
                            pincodeId: parseInt(EditLeadData?.pincodeId),
                            roleId: parseInt(EditLeadData?.roleId),




                          }

                          fetch(addLeadUrl, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(n)

                          })
                            .then((res) => {
                              let resp = res.text()
                              resp.then((r) => {
                                console.log(r);
                                setEditLeadData((pre) => {
                                  return {
                                    ...pre,
                                    leadId: r
                                  }
                                })
                                if (res.status == 200) {
                                  // Swal.fire({
                                  //   icon: "success",
                                  //   title: "Saved successfully!"
                                  // })


                                  setactiveTab((pre) => pre + 1)

                                }
                                else {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong!",
                                    text: "Try again later!"

                                  })
                                }
                              })
                            })

                        }}>Save & Next</Button>

                      </Col>
                    </Row> */}
                  </Tab>

                  <Tab eventKey={'2'} title="Budget and Probability">
                    <Row className='mt-3'>
                      {/* <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Assign to</Form.Label>
       
        <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>

      </Form.Group>
             
                </Col> */}
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Total Budget (in INR) </Form.Label>
                          <Form.Control type="text" placeholder="" name='totalBudget' style={{textAlign:"right"}} disabled value={EditLeadData?.totalBudget}  />
                          {/* {budgetError && <span style={{ color: 'red' }}>{budgetError}</span>} */}


                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Interest Level </Form.Label>
                          <Row>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Cold" value="Cold" disabled checked={EditLeadData?.rating == "Cold"} /></Col>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Warm" value="Warm" disabled checked={EditLeadData?.rating == "Warm"} /></Col>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Hot" value="Hot" disabled checked={EditLeadData?.rating == "Hot"} /></Col>
                          </Row>


                        </Form.Group>
                      </Col>
                      {/* <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>


      </Form.Group>
                </Col> */}
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Probability of win </Form.Label>
                          <Form.Select aria-label="Default select example" disabled name='probabilityOfWin' value={EditLeadData?.probabilityOfWin}>
                            <option>Select</option>
                            <option value="10% - 30%">10% - 30%</option>
                            <option value="30% - 60%">30% - 60%</option>
                            <option value="60% - 100%">60% - 100%</option>
                          </Form.Select>


                        </Form.Group>
                      </Col>


                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Expected Conversion Date</Form.Label>
                      <Form.Control type='date' name='expectedConversionDate' disabled value={moment((EditLeadData?.expectedConversionDate))?.format("YYYY-MM-DD")}/>


                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Conversation </Form.Label>
                          <Form.Control as="textarea" value={EditLeadData?.conversation} disabled rows={1} name='conversation' />

                        </Form.Group>
                      </Col>
                    </Row>

              
                    {/* <Row className='mt-4'>
                <Col>

                                            </Col>
                <Col>
                </Col>
                <Col>
                </Col>
              </Row> */}
                  </Tab>
                </Tabs>
              </Col>

            </Row>



            {/* <p className='m-0' style={{fontSize:"18px",fontWeight:"500"}}>Lead</p>
                  <Card className='p-3'>




             

              </Card>

              <p className='m-0 mt-4' style={{fontSize:"18px",fontWeight:"500"}}>Division & Products</p>
                  <Card className='p-3'>
               
              </Card>


              <p className='m-0 mt-4' style={{fontSize:"18px",fontWeight:"500"}}>Contact person details</p>
                  <Card className='p-3'>

            

               
                    </Card>



                    <p className='m-0 mt-4' style={{fontSize:"18px",fontWeight:"500"}}>Other details</p>
                  <Card className='p-3'>


           
</Card> */}





          </Form>
          <div className='d-flex justify-content-center gap-3 flex-wrap mt-4'>

{/* <Button variant="" className="cncl-Btn add-Btn-float" onClick={() => setactiveTab((prev) => prev - 1)}>Previous</Button> */}
{/* <Button variant='' className='add-Btn' onClick={(e) => {
  e.preventDefault();


  let budget=EditLeadData?.totalBudget;


  let budgetreg=/^\d+$/;


  if(!budget?.match(budgetreg)){
    Swal.fire({
      icon:'error',
      title:"Budget should be in digits only!"
    })
  }
  
  if(activeTab==0 && (EditLeadData?.leadDate=="" || EditLeadData?.sourceId=="" || EditLeadData?.leadTypeId=="" || EditLeadData?.companyContactName=="" || EditLeadData?.projectPincodeId=="" || EditLeadData?.projectStateId=="" || EditLeadData?.projectCityId=="" || EditLeadData?.customerAddress=="" || EditLeadData?.customerTypeId=="" || EditLeadData?.customerCategoryId=="" || EditLeadData?.segmentId=="")){
    Swal.fire({
      icon:"error",
      title:"Please fill all the fields marked with red *!"
    })
  }
  else if(activeTab==0 && (EditLeadData?.leadContactList?.filter(item=>item?.isPrimaryContact==true)?.length!=1)){
    Swal.fire({
      icon:"error",
      title:"One contact should be primary contact!"
    })
  }
  else if(activeTab==0 && ((EditLeadData?.leadTypeId=="97")  && EditLeadData?.serviceTicketNo=="")){
    Swal.fire({
      icon:"error",
      title:"Please fill all the fields marked with red *!"
    })
  }
  else if(activeTab==2 && (EditLeadData?.totalBudget=="" || EditLeadData?.rating=="" || EditLeadData?.probabilityOfWin=="" || EditLeadData?.conversation=="")){
  
  Swal.fire({
  icon:'error',
  title:"Please fill all the fields marked with red *!"
  })
  }
  else{


  const addLeadUrl = `${process.env.REACT_APP_API_URL}Lead/UpsertLead`;

  let n = {
    ...EditLeadData,
    sourceId: parseInt(EditLeadData?.sourceId),
    leadTypeId: parseInt(EditLeadData?.leadTypeId),
    customerTypeId: parseInt(EditLeadData?.customerTypeId),
    segmentId: parseInt(EditLeadData?.segmentId),
    customerCategoryId: parseInt(EditLeadData?.customerCategoryId),
    stateId: parseInt(EditLeadData?.stateId),
    pincodeId: parseInt(EditLeadData?.pincodeId),
    roleId: parseInt(EditLeadData?.roleId),
    projectStateId: parseInt(EditLeadData?.projectStateId),
    projectCityId: parseInt(EditLeadData?.projectCityId),
    projectPincodeId: parseInt(EditLeadData?.projectPincodeId),



  }

  fetch(addLeadUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(n)

  })
    .then((res) => {
      let resp = res.text()
      resp.then((r) => {
        console.log(r);
        setEditLeadData((pre) => {
          return {
            ...pre,
            leadId: r
          }
        })
        if (res.status == 200) {
          if(activeTab==2){
            Swal.fire({
            icon: "success",
            title: "Updated successfully!"
          })
        }

          activeTab==2?navigate("/SP/leads"):handleNextTab()

        }
        else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Try again later!"

          })
        }
      })
    })
  }

}}>{activeTab==0 || activeTab==1?"Update & Next":"Update"}</Button> */}
</div>
{/* <Button variant='' type='reset' className='' style={{ backgroundColor: "#005bab", color: "white" }}>Reset</Button> */}
        </Card>
    </>
  )
}

export default ViewLead