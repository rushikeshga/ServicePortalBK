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
import { HiOutlineTrash } from "react-icons/hi";
import { FaEdit } from 'react-icons/fa';
import { usePathName } from '../../../constants';


function EditLead() {
  const pathName = usePathName()
  const [isEditing, setisEditing] = useState(false)
  const [isEditingDivTab, setisEditingDivTab] = useState(false)
const [editIndex, seteditIndex] = useState(null)
  const navigate = useNavigate();
  let token = localStorage.getItem("UserToken")

  let leadId = localStorage.getItem("LeadId")

  const [allDivisions, setallDivisions] = useState([]);
// const [LeadData, setLeadData] = useState([])

  const [allproductLines, setallproductLines] = useState([])

  const [selectedPL, setselectedPL] = useState([])

  const [allProductGroups, setallProductGroups] = useState([])
  const [division, setDivision] = useState('');
  const [productLine, setproductLine] = useState([])
  const [productGroup, setProductGroup] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [serviceOffering, setServiceOffering] = useState('0')
  const [allserviceOffering, setAllServiceOffering] = useState([])
  const [tableData, setTableData] = useState([]);
  const [payloadData, setpayloadData] = useState([])


  const [EditLeadData, setEditLeadData] = useState({
    leadId: leadId,
    isNewlead:0,
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


  const handleChange = (e) => {
    const newdata = { ...EditLeadData };
    newdata[e.target.name] = e.target.value;
    setEditLeadData(newdata);
    console.log(newdata);
  }








  // let products=document.getElementById("pCheck");

  // let quantity=document.getElementById("qty");


  // if(!products.checked){

  // }



  const [getSources, setgetSources] = useState([])


  const [getLeadTypes, setgetLeadTypes] = useState([])
  const [leadSubtitle, setLeadSubtitle] = useState([])


  const [getAllRoles, setgetAllRoles] = useState([]);




const [LeadData,setLeadData]=useState([])

  const fetchAllSources = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=LeadSource`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setgetSources(result)
      })
  }

  const fetchAllLeadtypes = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Lead%20Type`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setgetLeadTypes(result)
      })
  }


  const fetchAllRoles = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=LeadRole`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setgetAllRoles(result)
      })
  }
  useEffect(() => {
  // const fetchAllLeadSubtitle = () => {
    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=22&Id=${EditLeadData?.leadTypeId}&Code=0`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLeadSubtitle(result)
        setAllServiceOffering(result)

      })
  // }
}, [EditLeadData?.leadTypeId])


  // const fetchServeice = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=21&Id=0&Code=0`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setAllServiceOffering(result)
  //     })
  // }




  useEffect(() => {
    fetchAllSources()
    fetchAllLeadtypes()
    fetchAllRoles()
    // fetchServeice()
    // fetchAllLeadSubtitle()
  }, [])


  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])

  const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=3&Id=0&Code=0`;


  useEffect(() => {

    fetch(stateUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result)
      })
  }, [])









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





  useEffect(() => {
    fetchAllDivisions()
  }, [])





  const [AllCustomerTypes, setAllCustomerTypes] = useState([])

  const [AllCustomerCategories, setAllCustomerCategories] = useState([])


  const [AllSegments, setAllSegments] = useState([])




  const fetchAllCustomerTypes = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=CustomerType`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCustomerTypes(result)
      })
  }



  const fetchAllCustomerCategories = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Customer%20Category`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCustomerCategories(result)
      })
  }



  const fetchAllSegments = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Segment`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllSegments(result)
      })
  }



  useEffect(() => {
    fetchAllCustomerTypes()
    fetchAllCustomerCategories()
    fetchAllSegments()
  }, [])















  const pGrp = {
    one: [
      {
        id: "1",
        pName: "xyz"
      },
      {
        id: "2",
        pName: "pqr"
      },
      {
        id: "3",
        pName: "test"
      },
      {
        id: "4",
        pName: "dummy"
      },
    ],
    two: [
      {
        id: "5",
        pName: "dummy"
      },
      {
        id: "6",
        pName: "pqr"
      },
      {
        id: "7",
        pName: "xyz"
      },
      {
        id: "8",
        pName: "dummy"
      },
    ],
    three: [
      {
        id: "9",
        pName: "xyz"
      },
      {
        id: "10",
        pName: "dummy"
      },
      {
        id: "11",
        pName: "pqr"
      },
      {
        id: "12",
        pName: "dummy"
      },
    ]
  }

  const [divisionName, setDivisionName] = useState([])
  const [serviceOfferingName, setserviceOfferingName] = useState('')


  useEffect(() => {
    console.log(pGrp);
  }, [])









  const multiselectRef = useRef();
  const multiselectRef1 = useRef();


  const handleAddData = () => {
    // console.log(tableData);
    // if (!division || productGroup.length === 0 || !quantity || isNaN(quantity) || quantity <= 0) {
    //   alert("Please fill all fields correctly.");
    //   return;
    // }

    const newData = {
      divisionCode: division,
      productLineCode: productLine.map(line => line.parameterTypeId).join(','),
      // productGroupCode: productGroup.map(group => group.parameterTypeId).join(','),
      serviceOffering: serviceOffering,
      totalNoOfProducts: quantity
    };
    const newData1 = {
      divisionName: divisionName,
      productLineName: productLine.map(line => line.parameterType).join(','),
      // productGroupName: productGroup.map(group => group.parameterType).join(','),
      serviceOfferingName: serviceOfferingName,
      totalNoOfProducts: quantity
    }


    let qnty=newData?.totalNoOfProducts;
    let qnty2=newData1?.totalNoOfProducts;


    let quantreg=/^\d+$/;



    if((qnty || qnty2) && (!qnty?.match(quantreg) || !qnty2?.match(quantreg))){
      Swal.fire({
        icon:"error",
        title:"Quantity should contain digits only!"
      })
    }
    else if(newData?.divisionCode=="" || newData?.productLineCode==""  || newData?.totalNoOfProducts==""){
      Swal.fire({
        icon:"error",
        title:"Please fill all the data in order to add"
      })
          }
          else if(newData1?.divisionCode=="" || newData1?.productLineName=="" || newData1?.totalNoOfProducts==""){
            Swal.fire({
              icon:"error",
              title:"Please fill all the data in order to add"
            })
                }
    else{

    setTableData([...tableData, newData1]);
    setpayloadData([...tableData,newData])


    console.log("========================================ds=========================");
    console.log(payloadData);


    setEditLeadData(((pre) => {
      return {
        ...pre,
        leadsDivisionProductList: [...EditLeadData?.leadsDivisionProductList, newData]
      }
    }))

    // Clear input fields
    setDivision('');
    // setproductLine([])
    // setProductGroup([]);
    // setServiceOffering('')
    setQuantity('');

    multiselectRef.current.resetSelectedValues();
    // multiselectRef1.current.resetSelectedValues();

    setallproductLines([])
    setallProductGroups([])
  }
  };







  const [tableData2, settableData2] = useState([])
  const [payloadData2, setpayloadData2] = useState([])
  
  const [roleName, setroleName] = useState("")
  
  
  
  const [contactPersonName, setcontactPersonName] = useState("");
  const [mobileNo, setmobileNo] = useState("")
  const [emailId, setemailId] = useState("")
  const [roleId, setroleId] = useState(0)
  const [designation, setdesignation] = useState("")
  const [primaryContact, setprimaryContact] = useState(0)
  


  const handleDelete = (index) => {
    const newdata=[...tableData]
    const newData1=[...payloadData]
    
 
    newdata.splice(index,1)
    newData1.splice(index,1)
 
    setTableData(newdata)

    setpayloadData(newData1)
 
    setEditLeadData((pre)=>{
     return{
       ...pre,
       leadsDivisionProductList:newData1
     }
    })
 
 
 
 
   
    console.log(tableData);
    console.log("-----------------------------------------Logging Lead-------------------------");
    console.log(LeadData);
 
   }
 

  
  const handleAddDataLeadDetail = () => {


    const newDataContact = {
      contactPersonName: contactPersonName,
      mobileNo: mobileNo,
      emailId: emailId,
      roleId: parseInt(roleId),
      roleName:roleName,
      designation: designation,
      isPrimaryContact:primaryContact
    };


    const newData1 = {
      contactPersonName: contactPersonName,
      mobileNo: mobileNo,
      emailId: emailId,
      roleId: parseInt(roleId),
      roleName:roleName,
      designation:designation,
      isPrimaryContact:primaryContact
    }
    // console.log(tableData2, "--------------------")

    // console.log(tableData2);


    let contact=newDataContact?.mobileNo;
    let contact2=newData1?.mobileNo;


    let emailVal=newDataContact?.emailId;
    let email2Val=newData1?.emailId;


    let mobile=/^\d+$/;
    let email=/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if(newDataContact?.contactPersonName=="" || newDataContact?.mobileNo=="" || newDataContact?.emailId=="" || newDataContact?.roleId=="" || newDataContact?.designation==""){
      Swal.fire({
        icon:"error",
        title:"Please fill all the fields of Contact person details marked with red *!"
      })
    }
    else if(newData1?.contactPersonName=="" || newData1?.mobileNo=="" || newData1?.emailId=="" || newData1?.roleId=="" || newData1?.designation==""){
      Swal.fire({
        icon:"error",
        title:"Please fill all the fields of Contact person details marked with red *!"
      })
    }
    else if(!contact?.match(mobile) || !contact2?.match(mobile)){
      Swal.fire({
        icon:"error",
        title:"Contact No. should contain digits only!"
      })
    }
   else if(!emailVal?.match(email) || !email2Val?.match(email)){
    Swal.fire({
      icon:"error",
      title:"Please enter a proper email Id!"
    })
   }
    else{
    settableData2([...tableData2, newData1]);

  setpayloadData2([...payloadData2,newDataContact])

    setEditLeadData(((pre) => {
      return {
        ...pre,
        leadContactList: [...payloadData2, newDataContact]
      }
    }))

 

setcontactPersonName("")
setmobileNo("")
setemailId("")
setroleId("")
setroleName("")
setdesignation("")
setprimaryContact(0)

  }

  };







    const handleUpdateDataLeadDetail = (indexToUpdate) => {
      // Create a copy of the array to modify
      const updatedTableData2 = [...EditLeadData?.leadContactList];

      const updatedpayloadData2=[...EditLeadData?.leadContactList];
    
      // Identify the index of the object you want to update
      if (indexToUpdate >= 0 && indexToUpdate < updatedTableData2.length) {
        // Update the object at the identified index
        updatedTableData2[indexToUpdate] = {
          contactPersonName: contactPersonName,
          mobileNo: mobileNo,
          emailId: emailId,
          roleId: parseInt(roleId),
          roleName: roleName,
          designation: designation,
          isPrimaryContact:primaryContact
        };
    



   
          // Update the object at the identified index
          updatedpayloadData2[indexToUpdate] = {
            contactPersonName: contactPersonName,
            mobileNo: mobileNo,
            emailId: emailId,
            roleId: parseInt(roleId),
            roleName: roleName,
            designation: designation,
            isPrimaryContact:primaryContact
          };
      
        // Update the state with the modified array
        settableData2(updatedTableData2);

        setpayloadData2(updatedTableData2)


        setEditLeadData((pre)=>{
          return{
            ...pre,
            leadContactList:updatedpayloadData2
          }
        })


        setisEditing(false)
        setcontactPersonName("")
setmobileNo("")
setemailId("")
setroleId("")
setroleName("")
setdesignation("")
setprimaryContact(0)
    
        // You might also need to update payloadData2 and LeadData here if required
      } else {
        console.error("Invalid index provided for update.");
      }
    };






 const handleUpdateDataDivisionTab = (indexToUpdate) => {
      // Create a copy of the array to modify
      const updatedTableData = [...EditLeadData?.leadsDivisionProductList];

      const updatedpayloadData=[...EditLeadData?.leadsDivisionProductList];
    
      // Identify the index of the object you want to update
      if (indexToUpdate >= 0 && indexToUpdate < updatedTableData.length) {
        // Update the object at the identified index
        updatedTableData[indexToUpdate] = {
          divisionCodeName: divisionName,
      divisionCode: division,
      productLineCode: productLine.map(line => line.parameterType).join(','),
      productLineCodeID: productLine,
      serviceOfferingName: serviceOfferingName,
      serviceOfferingId: serviceOffering,
      totalNoOfProducts: quantity
        };
    



   
          // Update the object at the identified index
          updatedpayloadData[indexToUpdate] = {
            divisionCode: division,
            productLineCode: productLine.map(line => line.parameterTypeId).join(','),
            // productGroupCode: productGroup.map(group => group.parameterType).join(','),
            serviceOfferingId: serviceOffering,
            totalNoOfProducts: quantity
          };
      
        // Update the state with the modified array
        setTableData(updatedTableData);

        setpayloadData(updatedTableData)


        setLeadData((pre)=>{
          return{
            ...pre,
            leadsDivisionProductList:updatedpayloadData
          }
        })

        setisEditingDivTab(false)
        setDivision('');
        setDivisionName("")
        setselectedPL([])
setproductLine([])
        // setServiceOffering("")
        setQuantity('');
    
        multiselectRef.current?.resetSelectedValues();
        // multiselectRef1.current.resetSelectedValues();
    
        setallproductLines([])
        // setallProductGroups([])
    
        // You might also need to update payloadData2 and LeadData here if required
      } else {
        console.error("Invalid index provided for update.");
      }
    };










  const [ticketNos, setticketNos] = useState([
    {
      "Name": "1236254"
    },
    {
      "Name": "66543288"
    },
    {
      "Name": "3324166"
    },
    {
      "Name": "99002376"
    }
  ])


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

    setEditLeadData((pre)=>{
      return{
        ...pre,
        serviceTicketNo:item.Name
      }
    })
    // sessionStorage.setItem("collectionPatient",item.PatientID);

  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.Name}</span>
      </>
    )
  }












  const handleOnSearch1 = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover1 = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect1 = (item) => {
    // the item selected
    console.log(item)
    // sessionStorage.setItem("collectionPatient",item.PatientID);

  }

  const handleOnFocus1 = () => {
    console.log('Focused')
  }

  const formatResult1 = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.Name}</span>
      </>
    )
  }





  const [activeTab, setactiveTab] = useState('0');
















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
            sourceId: result?.sourceId,
            leadTypeId: result?.leadTypeId,
            subLeadTypeId:result?.subLeadTypeId,
            customerTypeId: result?.customerTypeId,
            segmentId: result?.segmentId,
            customerCategoryId: result?.customerCategoryId,
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
            projectStateId: result?.projectStateId,
            projectCityId: result?.projectCityId,
            projectPincodeId: result?.projectPincodeId,
            conversation: result?.conversation,
            branchCode: result?.branchCode,
            divisionCode: result?.divisionCode,
            regionCode: result?.divisionCode,
            leadsDivisionProductList: result?.leadsDivisionProductDisplay,
            leadContactList:result?.leadContactList,
            serviceTicketNo:result?.serviceTicketNo,
            isNewlead:result?.isNewlead,
            expectedConversionDate:result?.expectedConversionDate,  
          }
        })


        setTableData(result?.leadsDivisionProductDisplay)
        setpayloadData(result?.leadsDivisionProductDisplay)
        settableData2(result?.leadContactList)
        setpayloadData2(result?.leadContactList)



        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result?.projectStateId}&Code=0`;
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
      })
  }, [])

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format






  const handleDelete2 = (index) => {

    console.log(index);
    const newdata=[...tableData2]
    const newdata1=[...payloadData2]
 
    newdata.splice(index,1)
    newdata1.splice(index,1)
 
    settableData2(newdata)

    setpayloadData2(newdata1)
 
    setEditLeadData((pre)=>{
     return{
       ...pre,
       leadContactList:newdata1
     }
    })


    setisEditing(false)
    setcontactPersonName("")
setmobileNo("")
setemailId("")
setroleId("")
setroleName("")
setdesignation("")
setprimaryContact(0)

    console.log(tableData2);
    console.log("-----------------------------------------Logging Lead contact list-------------------------");
    console.log(LeadData);
  }











  // --------------------------tabbing--------------------------


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





  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [pinError, setpinError] = useState('')
  const [budgetError, setbudgetError] = useState('')
  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setemailId(value)
    if (!validateEmail(value) && value!="") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validateMobile = (mobile) => {
    // Basic mobile number validation regex
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };


  const validatePincode = (pincode) => {
    // Basic mobile number validation regex
    const regex = /^\d{6}$/;
    return regex.test(pincode);
  };


  const validateBudget = (budget) => {
    // Basic mobile number validation regex
    const regex = /^\d{0,10}$/;
    return regex.test(budget);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setmobileNo(value)
    if (!validateMobile(value) && value!="") {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }
  };



  const handlePinCodeChange = (e) => {
    const value = e.target.value;
   setEditLeadData((pre)=>{
    return{
      ...pre,
      projectPincodeId:value
    }
   })
    if (!validatePincode(value) && value!="") {
      setpinError('Invalid PinCode. It must be 6 digits only');
    } else {
      setpinError('');
    }
  };


  
  const handleBudgetChange = (e) => {
    const value = e.target.value;
   setEditLeadData((pre)=>{
    return{
      ...pre,
      totalBudget:value
    }
   })
    if (!validateBudget(value) && value!="") {
      setbudgetError('Invalid input. It must be maximum of 10 digits only');
    } else {
      setbudgetError('');
    }
  };

  return (
    <>
        <Card
          className="border-0 p-3 m-3"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <p className='pg-label m-0'> 
          {/* <IoIosArrowRoundBack className='me-3' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} /> */}
          Edit Lead</p>
          <hr />

          <Form>

            <Row>
              {/* <Col>
          <Nav variant="pills" justify>
            <Nav.Item>
              <Nav.Link eventKey="first">Lead</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Division & Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Contact person details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Other details</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col> */}
              <Col>
             
                <Tabs variant="pills" activeKey={activeTab}
                //  onSelect={(key) => {
                //   if (key == 0) {
                //     console.log(`${key} tab selected`);
                //   }
                //   else if (key == 1) {
                //     console.log(`${key} tab selected`);

                //   }
                //   else if (key == 2) {
                //     console.log(`${key} tab selected`);

                //   }
                //   else {
                //     return ""
                //   }
                // }}
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
                          <Form.Label>Date <span className='req-t'>*</span></Form.Label>
                          <Form.Control type="date" name='leadDate' placeholder="" value={moment((EditLeadData?.leadDate))?.format("YYYY-MM-DD")} onChange={handleChange} max={currentDate} />
                        </Form.Group>

                      </Col>
                      {/* <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Lead No.</Form.Label>
        <Form.Control type="number" placeholder="" name='LeadNo' disabled onChange={handleChange}/>
      </Form.Group>
                </Col> */}
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Source <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name='sourceId' value={EditLeadData?.sourceId} onChange={handleChange}>
                            <option>Select</option>
                            {
                              getSources?.map((source, index) => {
                                return (
                                  <>
                                    <option value={source?.parameterValId}>{source?.parameterText}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Lead Type <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name='leadTypeId' value={EditLeadData?.leadTypeId} onChange={handleChange}>
                            <option>Select</option>
                            {
                              getLeadTypes?.map((leadType, index) => {
                                return (
                                  <>
                                    <option value={leadType?.parameterValId}>{leadType?.parameterText}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>

                        </Form.Group>

                      </Col>

                      {
                        EditLeadData.leadTypeId != "97" ?
                          <Col md={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Lead Sub Type</Form.Label>
                              <Form.Select aria-label="Default select example" value={EditLeadData?.subLeadTypeId} name='subLeadTypeId' onChange={handleChange}>
                                <option>Select</option>
                                {
                                  leadSubtitle?.map((leadType, index) => {
                                    return (
                                      <>
                                        <option value={leadType?.parameterTypeId}>{leadType?.parameterType}</option>
                                      </>
                                    )
                                  })
                                }
                              </Form.Select>

                            </Form.Group>

                          </Col> : ""

                      }
                      {
                        EditLeadData.leadTypeId == "97" ?
                          <Col md={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Service Ticket No. <span className='req-t'>*</span></Form.Label>
                              <ReactSearchAutocomplete
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
                              />
                            </Form.Group>
                          </Col> : ""
                      }
                    </Row>



                    <Row className='mt-3'>

                      

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
                      {/* <Col md={3}>
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
                </Col> */}
                    </Row>


                    <p className='mt-3 dash-titles'>Company profile</p>



<Row className='mt-3'>

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Company / Firm Name <span className='req-t'>*</span></Form.Label>
      <Form.Control type="text" placeholder="" name='companyContactName' value={EditLeadData?.companyContactName} autoComplete='off' onChange={handleChange} />

    </Form.Group>
  </Col>

 

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>PinCode <span className='req-t'>*</span></Form.Label>
      <Form.Control type='number' name='projectPincodeId' value={EditLeadData?.projectPincodeId} onChange={(e) => {
        handlePinCodeChange(e)


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


{pinError && <span style={{ color: 'red' }}>{pinError}</span>}

    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>State <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='stateId' disabled value={EditLeadData?.projectStateId} onChange={(e) => {
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
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>City <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='projectCityId' disabled value={EditLeadData?.projectCityId} onChange={handleChange}>
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
 

  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Address <span className='req-t'>*</span></Form.Label>
      <Form.Control as="textarea" rows={1} placeholder="" name='customerAddress' value={EditLeadData?.customerAddress} onChange={handleChange} />


    </Form.Group>
  </Col>

  
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Customer Type <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='customerTypeId' value={EditLeadData?.customerTypeId} onChange={handleChange}>
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
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Customer Category <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='customerCategoryId' value={EditLeadData?.customerCategoryId} onChange={handleChange}>
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
   <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Segment <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='segmentId' value={EditLeadData?.segmentId} onChange={handleChange}>
        <option>Select</option>
        {
          AllSegments?.map((segment, index) => {
            return (
              <>
                <option value={segment?.parameterValId}>{segment?.parameterText}</option>
              </>
            )
          })
        }
      </Form.Select>


    </Form.Group>
  </Col>

</Row>

<p className='mt-3 dash-titles'>Contact Person details</p>


<Row className='mt-3'>

<Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Name of Person <span className='req-t'>*</span></Form.Label>
      <Form.Control type="text" placeholder="" name='contactPersonName' autoComplete='off' value={contactPersonName} onChange={(e)=>{
                            setcontactPersonName(e.target.value)
                          }} />


    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Contact No. <span className='req-t'>*</span></Form.Label>
      <Form.Control type="tel" placeholder="" name='mobileNo' autoComplete='off' value={mobileNo} onChange={handleMobileChange} />

{mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

    </Form.Group>
  </Col>
  <Col md={3}> 
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Email Id <span className='req-t'>*</span></Form.Label>
      <Form.Control type="email" placeholder="" name='emailId' autoComplete='off' value={emailId} onChange={handleEmailChange}  />

      {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

    </Form.Group>
  </Col>
   <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Role <span className='req-t'>*</span></Form.Label>
      <Form.Select aria-label="Default select example" name='roleId' value={roleId} onChange={(e)=>{
                           setroleId(e.target.value)

                            const selectedIndex = e.target.selectedIndex;
                            const selectedOptionCode = e.target.options[selectedIndex].getAttribute("code");
                            // Check if selectedOptionCode is not undefined before setting divisionName
                            // if (selectedOptionCode !== undefined) {
                            // }
                            setroleName(selectedOptionCode);
                          }}>
        <option>Select</option>
        {
          getAllRoles?.map((role, index) => {
            return (
              <>
                <option value={role?.parameterValId} code={role?.parameterText}>{role?.parameterText}</option>
              </>
            )
          })
        }
      </Form.Select>


    </Form.Group>
  </Col>
  <Col md={3}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Designation <span className='req-t'>*</span></Form.Label>
      <Form.Control type="text" placeholder="" name='designation' autoComplete='off' value={designation} onChange={(e)=>{
                            setdesignation(e.target.value)
                          }} />

    </Form.Group>
  </Col>
  {
                        EditLeadData?.leadContactList?.filter(item=>item?.isPrimaryContact==true)?.length>=1?"":
                        <Col md={2} className='pt-3'>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                          {/* <Form.Label>Designation</Form.Label> */}
                          <Form.Check type="checkbox" checked={primaryContact} label="Is primary contact?" onChange={(e)=>{
                            if(e.target.checked){

                              setprimaryContact(1)
                            }
                            else{
                              setprimaryContact(0)

                            }
                          }} />


                        </Form.Group>
                      </Col>
                      }
                        
  <Col md={3} className='pt-3'>
                        <div className='mt-3'><Button variant='' className='add-Btn' disabled={emailError || mobileError} onClick={()=>isEditing?handleUpdateDataLeadDetail(editIndex):handleAddDataLeadDetail()}>{isEditing?"Update":"Add"}</Button></div>

  </Col>


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
                <th>Actions</th>
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
                <td><div className='d-flex gap-5'>
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
                <HiOutlineTrash fontSize={20} color="red" onClick={()=>handleDelete2(index)}/></div></td>
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
                          <Form.Select aria-label="Default select example" name='customerTypeId' value={EditLeadData?.customerTypeId} onChange={handleChange}>
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
                          <Form.Select aria-label="Default select example" name='customerCategoryId' value={EditLeadData?.customerCategoryId} onChange={handleChange}>
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
                          <Form.Select aria-label="Default select example" name='projectCityId' value={EditLeadData?.projectCityId} onChange={handleChange}>
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
                    <Row className='mt-3'>
                      <Col md={2}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name='divisionCode' value={division} onChange={(e) => {
                            setDivision(e.target.value)


                            const selectedIndex = e.target.selectedIndex;
                            const selectedOptionCode = e.target.options[selectedIndex].getAttribute("code");
                            // Check if selectedOptionCode is not undefined before setting divisionName
                            // if (selectedOptionCode !== undefined) {
                            // }
                            setDivisionName(selectedOptionCode);
                            multiselectRef.current?.resetSelectedValues();
                            let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;

                            fetch(getAllProductLines1, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setallproductLines(result)
                              })

                          }}>
                            <option>Select</option>
                            {
                              allDivisions?.map((division, index) => {
                                return (
                                  <>
                                    <option value={division?.parameterTypeId} code={division?.parameterType}>{division?.parameterType}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select>


                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                          <Multiselect
                            displayValue="parameterType"
                            selectedValues={isEditing?selectedPL:""}
                            ref={multiselectRef}
                            onKeyPressFn={function noRefCheck() { }}
                            onRemove={function noRefCheck(e) {
                              console.log(e);

                            }}
                            onSearch={function noRefCheck() { }}
                            onSelect={function noRefCheck(e) {
                              setproductLine(e);
                              console.log(JSON.stringify(e));


                              let productLineCodes = e?.map(item => item?.parameterTypeId).toString();




                              const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${productLineCodes}`;

                              fetch(getAllProductGroup, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setallProductGroups(result)
                                })
                            }}
                            options={allproductLines}
                            showCheckbox
                          />


                        </Form.Group>
                      </Col>
                      {/* <Col md={4}>
                       

                        <Form.Label>Product-Group</Form.Label>
                     



                        <Multiselect
                          displayValue="parameterType"
                          ref={multiselectRef1}
                          onKeyPressFn={function noRefCheck() { }}
                          onRemove={function noRefCheck(e) {
                            console.log(e);

                          }}
                          onSearch={function noRefCheck() { }}
                          onSelect={function noRefCheck(e) {
                            setProductGroup(e);
                            console.log(JSON.stringify(e));
                          }}
                          options={allProductGroups}
                          showCheckbox
                        />

                      </Col> */}

{/* <Col md={2}>
                        <Form.Group>
                          <Form.Label>Service Offering <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="" value={serviceOffering} onChange={(e) => {
                            
                            setServiceOffering(e.target.value)

                            const selectedIndex = e.target.selectedIndex;
                            const selectedOptionCode = e.target.options[selectedIndex].getAttribute("code");

                            setserviceOfferingName(selectedOptionCode)
                          }}>
                            <option>Select</option>
                            {
                              allserviceOffering?.map((document, index) => {
                                return (
                                  <>
                                    <option value={document?.parameterTypeId} code={document?.parameterType}>{document?.parameterType}</option>
                                  </>
                                )
                              })
                            }


                          </Form.Select>
                        </Form.Group>

                      </Col> */}

                      <Col md={2}>
                        <Form.Group>
                          <Form.Label>Quantity <span className='req-t'>*</span></Form.Label>
                          <Form.Control type="text" placeholder="" style={{textAlign:"right"}} id='qty' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <div className='pt-2'><Button variant='' className='add-Btn mt-4' onClick={()=>
                          isEditingDivTab?handleUpdateDataDivisionTab(editIndex):
                          handleAddData()}>{isEditingDivTab?"Update":"Add"}</Button></div>
                      </Col>

                    </Row>
                   


                    <Table responsive co className='mt-3'>
                      <thead>
                        <tr>
                          <th>Division</th>
                          <th>Product Line</th>
                          {/* <th>Product Group</th> */}
                          {/* <th>Service Offering</th> */}
                          <th>Quantity</th>
                          <th>Action</th>
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
                            <td>
                             {/* {tableData[index].hasOwnProperty('productLineCodeList')?"": <FaEdit fontSize={20} onClick={()=>{
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

        //                             console.log(data?.productLineCodeID);
        //  setproductLine(data?.productLineCodeID)
                // setselectedPL(data?.productLineCodeID)
                  setDivision(data?.divisionCode);
                  setDivisionName(data?.divisionCodeName)
                              setserviceOfferingName(data?.serviceOfferingName)
                  setServiceOffering(data?.serviceOfferingId)
                  setQuantity(data?.totalNoOfProducts);
              
                
              
                  // setallproductLines()
                
                }}/> 
              } */}
                 <HiOutlineTrash color='red' fontSize={20}  onClick={()=>handleDelete(index)}/></td>
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
                          <Form.Label>Total Budget (in INR) <span className='req-t'>*</span></Form.Label>
                          <Form.Control type="text" placeholder="" name='totalBudget' style={{textAlign:"right"}} value={EditLeadData?.totalBudget} onChange={handleBudgetChange} />
                          {budgetError && <span style={{ color: 'red' }}>{budgetError}</span>}


                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Interest Level <span className='req-t'>*</span></Form.Label>
                          <Row>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Cold" value="Cold" checked={EditLeadData?.rating == "Cold"} onChange={handleChange} /></Col>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Warm" value="Warm" checked={EditLeadData?.rating == "Warm"} onChange={handleChange} /></Col>
                            <Col><Form.Check type="radio" name="rating" aria-label="option 1" label="Hot" value="Hot" checked={EditLeadData?.rating == "Hot"} onChange={handleChange} /></Col>
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
                          <Form.Label>Probability of win <span className='req-t'>*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name='probabilityOfWin' value={EditLeadData?.probabilityOfWin} onChange={handleChange}>
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
                      <Form.Control type='date' name='expectedConversionDate' value={EditLeadData?.expectedConversionDate} onChange={handleChange} min={currentDate}/>


                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Conversation <span className='req-t'>*</span></Form.Label>
                          <Form.Control as="textarea" value={EditLeadData?.conversation} rows={1} name='conversation' onChange={handleChange} />

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
<Button variant='' className='add-Btn' onClick={(e) => {
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



  let n={};
                
  if(activeTab==2 && EditLeadData?.isNewlead==0){
     n = {
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
      isNewlead:1


    }
  }
  else{

   n = {
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

          activeTab==2?navigate(`${pathName}/leads`):handleNextTab()

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

}}>{activeTab==0 || activeTab==1?"Update & Next":"Update"}</Button>
{/* <Button variant='' type='reset' className='' style={{ backgroundColor: "#005bab", color: "white" }}>Reset</Button> */}
</div>
        </Card>
    </>
  )
}

export default EditLead