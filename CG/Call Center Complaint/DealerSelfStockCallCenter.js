import NavBar from "../Navbar"
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Tab,
    Table,
    Tabs,

} from "react-bootstrap";
import ProductListFormat from "../../../Assets/ProductListFormat.xlsx";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaCircleMinus, FaEye } from "react-icons/fa6";
import { IoAlertCircle, IoLocation } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { BsDot, BsEyeFill } from "react-icons/bs";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { usePathName } from "../../../constants";
import { Box, IconButton, Tooltip } from "@mui/material";
import { data, map } from "jquery";
import Loader from "../../loader";
import moment from "moment";
import '../../../App.css';
import Footer from "../footer";
import { MaterialReactTable } from "material-react-table";
import * as xlsx from "xlsx";
import { HiDownload, HiUpload } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
import { LineString } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";








function DealerSelfStockCallCenter() {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [serialNo, setserialNo] = useState('');
    const [productCode, setProductCode] = useState('');
    const [defectId, setdefectId] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const pathName = usePathName()
    const [showCustomerTic, setShowCustomerTic] = useState(false);
    const [existingTicketDetails, setExistingTicketDetails] = useState({});
    const handleCloseCustomerTic = () => setShowCustomerTic(false);

    const [prevSrNoOnBlur, setPrevSrNoOnBlur] = useState("");
    const [prevProductCodeOnBlur, setPrevProductCodeOnBlur] = useState("");

    const [SrNoOnBlur, setSrNoOnBlur] = useState("");
    const [ProductCodeOnBlur, setProductCodeOnBlur] = useState("");
    const [disableInvoiceDate, setDisableInvoiceDate] = useState(false);
    const [minInvoiceDate, setMinInvoiceDate] = useState();
    

    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);
    const [pinError, setpinError] = useState('')
    const [defectsByPL, setdefectsByPL] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [productTypes, setproductTypes] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [dealerRaisedTicketDetails, setdealerRaisedTicketDetails] = useState([]);
    const [productLineId, setProductLineId] = useState("");
    let fileInputRef = useRef(null);
    let DealerDetails = JSON.parse(localStorage.getItem("DealerDetails"));
    const currentDate = new Date().toISOString().split('T')[0];
    const [isError, setIsError] = useState(false);
    const [xlFileName, setxlFileName] = useState("");
    let token = localStorage.getItem("UserToken");
    const [columns, setColumns] = useState([

        {
          accessorKey: "serialNo",
          header: "Product Sr",
          size: "80"
        },
        
        {
            accessorKey: "productCode",
            header: "Product Code/ Model",
            size: "120"
        },
        {
            accessorKey: "defectName",
            header: "Issue",
            size: "80"
        },
        {
            accessorKey: "prodInstallationPinId",
            header: "PinCode",
            size: "80"
        },
        {
            accessorKey: "prodInstallationCityName",
            header: "City",
            size: "100"
        },
        {
            accessorKey: "invoiceNo",
            header: "InVoice No",
            size: "80"
        },
        {
            accessorKey: "invoiceDate",
            header: "InVoice date",
            size: "100"
        },
        {
            accessorKey: "remarks",
            header: "Brief of complaint",
            size: "300"
        },
        {
          accessorKey: "isActive",
          header: "Actions",
          size: "20",
          Cell: ({ cell }) => {
            let data = cell.getValue()
            // console.log(cell.row.original);
            return (
              <>
                <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
                {/* <Tooltip arrow placement="left" title="Edit">
                        <IconButton
                          className="edit-btn"
                          onClick={() => {
                            console.log(cell.row.original.stStatusId);
                            // fetchAllStatus();
                            // setEditSubStatusName((pre)=>{
                            //   return {
                            //   ...pre,
                            //   stStatusId: cell.row.original.stStatusId,
                            //   stStatusName: cell.row.original.stStatusName,
                            //   stSubStatusName: cell.row.original.stSubStatusName,
                            //   stSubStatusId: cell.row.original.stSubStatusId
                            //     }
                            // })
                            // handleModalShow()
                            // SapDivision()
    
                          }}
    
                        >
                          <FaEye color="#7bc143" fontSize={20} />
                        </IconButton>
                      </Tooltip> */}
                      {
                    cell.row.original.msg === "Service Ticket Available" ? 
                <Tooltip arrow placement="left" title="view ticket">
                    <IconButton
                        variant=""
                        onClick={()=>{
                            handleShowCustomerTic(cell)}}
                    >
                        <FaEye color="#7bc143" fontSize={20} />
                    </IconButton>
                </Tooltip> :
                       ""
                  }
                <Tooltip arrow placement="right" title="remove">
                    <IconButton
                        className="edit-btn"
                        onClick={() =>{
                            // const updatedData = [...addedData];
                            // updatedData.splice(cell.row.index, 1);
                             setAddedData(prevData => {
                                const updatedData = [...prevData];
                                updatedData.splice(cell.row.index, 1);
                                return updatedData;
                              });
                            // setAddedData(updatedData) 
                            // handleRemoveButtonClick(cell)
                         }
                        }>
                        <FaCircleMinus color="red" fontSize={20} />

                    </IconButton>
                </Tooltip>
                  
                  {/* {
                    cell.row.original.isActive == false ? "" :
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setroleID(cell.row.original.roleId)
                            setisActive(cell.row.original.isActive)
                            handleShowDel()
                          }}
    
    
                        >
                          <HiOutlineTrash color='red' />
                        </IconButton>
                      </Tooltip>
                  } */}
    
    
                  
    
    
                  {/* <Switch checked={data === true} onClick={(e) => {
                    console.log(cell.row.original?.stStatusId);
                    setactiveID(cell.row.original?.stStatusId)
                    cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
                  }} /> */}
    
                </Box>
    
              </>
            )
          }
        }
      ]);
    const [msgToDisplay, setmsgToDisplay] = useState("");
      const [fileContent, setfileContent] = useState([]);
      const [showRegistered, setShowRegistered] = useState(false);
      const handleRegisteredClose = () => setShowRegistered(false);
      const handleRegisteredShow = () => setShowRegistered(true);
      const xlInput=useRef(null);
      const [repeatedProducts, setRepeatedProducts] = useState([]);
      const [InvalidSerialNo, setInvalidSerialNo] = useState([]);
      const [exstingTickets, setexstingTickets] = useState([]);


    

    const handlePinCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        // const value = e.target.value;
        setFormData((pre) => {
            return {
                ...pre,
                PinId: value
            }
        })
        if (!validatePincode(value) && value != "") {
            setpinError('Invalid PinCode. It must be 6 digits only');
        } else {
            setpinError('');
        }
    };
    const validatePincode = (pincode) => {
        // Basic mobile number validation regex
        const regex = /^\d{6}$/;
        return regex.test(pincode);
    };



    const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=3&Id=0&Code=0`;

    useEffect(() => {
        fetch(stateUrl,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setstates(result);
            });
    }, []);
    let RoleName = localStorage.getItem("RoleName");
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "Division/GetAllProductTypeAuthorize",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => res.json())
            .then(result => {
                if(RoleName == "AS8"){
                    let filterResults = result.filter(obj => (obj.divisionCode == "DR" || obj.divisionCode == "M7"))
                    setproductTypes(filterResults);
                }
                else{
                    setproductTypes(result);
                }
                

                
            });
    }, []);
    const handleSelectChange = (event) => {
        const { value } = event.target;
        if (value == "") {
            setSelectedOption("");
            setProductLineId("");
            handleBlur(event, "");
        }
        else {
            let divisionName = productTypes.filter(obj => obj.productLineId == value);
            setSelectedOption(divisionName[0].divisionCode);
            setProductLineId(value);
            handleBlur(event, divisionName[0].divisionCode);
        }

        //setSelectedOption(value);
        //setShowForm(value !== ''); // Show the form field if an option is selected
    };

    // const handleAddButtonClick = () => {
    //     setShowSecondRow(!showSecondRow);
    // }
    const [addedData, setAddedData] = useState([]);
    const [firstTabNext, setfirstTabNext] = useState(false);

    const handleShowCustomerTic = (cell) => {
        // let row = e.target.closest("tr")
        // let serNo = row.firstChild.textContent;
        // let existingTicketProduct = addedData[parseInt(serNo)];
        console.log(addedData);
        const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketById?ServiceTickeId=${cell?.row?.original?.msgCode}`;
        fetch(getProdDetailUrl,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
                //localStorage.setItem("ticketDetails", JSON.stringify(result));
                setExistingTicketDetails(result[0]);
                // console.log(result);
                setShowCustomerTic(true);
            });

    };
    const [formData, setFormData] = useState({
        serialNo: '',
        ProductLine: '',
        productCode: '',
        defectId: '',
        invoiceNo: '',
        invoiceDate:"",
        // description: '',
        // prodInstallationPinId: '',
        // prodInstallationCityId: '',
        // invoiceNo: '',
        // invoiceDate: '',
        // nameOfSpoc: '',
        // spocMobileNo: '',
        // spocEmailId: '',
        // address1: '',
        // address1: '',
        // prodInstallationStateId: '',
        remarks: "",
        invoceFilePath: "",
        retailerInvoiceCopy: ""
    });

    const [addInstallDetails, setaddInstallDetails] = useState({
        nameOfSpoc: localStorage.getItem("RedirectedField") == "RetailerField" ? localStorage.getItem("RetailerName") : localStorage.getItem("TicketCreateName"),
        spocMobileNo: localStorage.getItem("RedirectedField") == "RetailerField" ? DealerDetails?.mobileNo : localStorage.getItem("TicketCreateNumber"),
        spocEmailId: DealerDetails?.dealerEmail,
        address1: DealerDetails?.address,
        address2: '',
        prodInstallationPinId: DealerDetails?.pinCode,
        prodInstallationStateId: DealerDetails?.stateId,
        prodInstallationCityId: DealerDetails?.cityId,
        prodInstallationCityName: DealerDetails?.cityName
    });

    useEffect(() => {
        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${DealerDetails?.stateId}&Code=0`;
        fetch(cityUrl,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let findCityName = result.filter(obj => obj.parameterTypeId == DealerDetails?.cityId);
                if(findCityName.length != 0){
                    setaddInstallDetails((pre) => {
                        return {
                            ...pre,
                            prodInstallationCityName: findCityName[0].parameterType,
                        };
                    });
                }

                setcities(result);
            });
    }, [])
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = reject
        })
    }

    const readUploadFile = (e) => {
        
        let newob={
         ObjLeads:[],
        //  CreatedBy:UserId
        }
       //  let flatar=flatob
    
       
        
         e.preventDefault();
         if(e.target.files[0]){
    
         let xlfile=e.target.files[0]?.name
        // setxlFileName(xlfile);
         console.log(e.target.files[0]?.name);
         if (e.target.files[0]) {
             const reader = new FileReader();
             reader.onload = async (e) => {
                 const data = e.target.result;
                 const workbook = xlsx.read(data, { type: "array" });
                 const sheetName = workbook.SheetNames[0];
                 const worksheet = workbook.Sheets[sheetName];
                 const json = xlsx.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'mm-dd-yyyy' });
               //  setnewObj((pre)=>{
               //   return{
               //     ...pre,
               //     ObjLeads:json
               //   }
               //  })
               let dataList =[];
               let InvalidSerialNo =[];
               let exstingTickets =[];
               let repeatedProducts = [];
               let isIvalidRec=false;
               for(let i=0;i<json.length;i++){
                let prodData = json[i];
                let getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetServiceTicketProdSerialNoAuthorize?ProductSerialNo=${prodData["Product Sr"]}&${(prodData["Product Code/ Model"] && prodData["Product Code/ Model"] != 0) ? `ProductCode=${prodData["Product Code/ Model"]}` : ""}`;
                if(!prodData["Product Sr"] || !prodData["Product Code/ Model"] || !prodData["InVoice No"] || !prodData["InVoice date"] || !prodData["Brief of complaint"] ||
                    prodData["Product Sr"].trim() == "" || prodData["Product Code/ Model"].trim() == "" || prodData["InVoice No"].trim() == "" || prodData["InVoice date"].trim() == "" || prodData["Brief of complaint"].trim() == "" ){
                    continue;
                }
                let findRepeatedProducts = addedData.filter(obj => obj.serialNo == prodData["Product Sr"].trim() &&
                                                     obj.productCode == prodData["Product Code/ Model"].trim()
                                                     );
                let repeatedProductsinExcel =  dataList.filter(obj => obj.serialNo == prodData["Product Sr"].trim() &&
                                            obj.productCode == prodData["Product Code/ Model"].trim()
                                            );                                   
                if(findRepeatedProducts.length > 0){
                    repeatedProducts.push(findRepeatedProducts[0].serialNo);
                    isIvalidRec=true;
                }
                else if(repeatedProductsinExcel.length > 0){
                    repeatedProducts.push(findRepeatedProducts[0].serialNo);
                    isIvalidRec=true;
                }
                else{
                    try {
                        const res = await fetch(getProdDetailUrl,{
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          });
                        const result = await res.json();
                        if (result?.msgCode === "SAP404") {
                            // Swal.fire({
                            //     icon: "error",
                            //     title: "Serial no / product code not matching, for Serial numbers: "
                            // });
                            InvalidSerialNo.push(prodData["Product Sr"]);
                            setloading(false);
                            isIvalidRec=true;
                            
                        }
                        else if (result?.msg =="Service Ticket Available") {
                            // Swal.fire({
                            //     icon: "error",
                            //     title: "Service ticket is already raised for some product."+InvalidSerialNo.join(", ")
                            // });
                            exstingTickets.push(prodData["Product Sr"]);
                            setloading(false);
                            isIvalidRec=true;
    
                        } else if (result?.msg) {
                            // setTimeout(() => {
                            setloading(false)
    
    
                            // }, 4000);
    
                            let Data = {
                                productCode: prodData["Product Code/ Model"].trim(),
                                serialNo: prodData["Product Sr"].trim(),
                                productLine: result?.prodSerialNoWarrantyList[0]?.productLineName,
                                productLineCode: result?.prodSerialNoWarrantyList[0]?.productLineCode,
                                productType: result?.prodSerialNoWarrantyList[0]?.productLineName,
                                divCode: result?.prodSerialNoWarrantyList[0]?.divisionCode,
                                defectId: "0",
                                defectName: "",
                                frameSize: result?.prodSerialNoWarrantyList[0]?.frame,
                                pole: result?.prodSerialNoWarrantyList[0]?.pole,
                                voltage: result?.prodSerialNoWarrantyList[0]?.kw,
                                prodInstallationPinId: addInstallDetails?.prodInstallationPinId,
                                prodInstallationCityId: addInstallDetails?.prodInstallationCityId,
                                prodInstallationCityName: addInstallDetails?.prodInstallationCityName,
                                invoiceNo: prodData["InVoice No"].trim(),
                                invoiceDate:moment((prodData["InVoice date"].trim()?.split(" ")[0])).format("YYYY-MM-DD") ,
                                kva: result?.prodSerialNoWarrantyList[0]?.kva,
                                sapWarrantyDate: result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch?.split(" ")[0],
                                hp: "",
                                efficiency: result?.prodSerialNoWarrantyList[0]?.effe,
                                flp: result?.prodSerialNoWarrantyList[0]?.flps,
                                remarks: prodData["Brief of complaint"].trim(),
                                purchaseFrom: "",
                                batchStartDate: result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate,
                                batchEndDate: result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch,
                                warrantyDate: "",
                                inWarranty: true,
                                isDeviation: false,
                                msg: result?.msg,
                                invoceFilePath: "",
                                retailerInvoiceCopy: "",
                                msgCode: result?.msgCode,
                                nameOfSpoc: addInstallDetails?.nameOfSpoc.trim(),
                                spocMobileNo: addInstallDetails?.spocMobileNo.trim(),
                                spocEmailId: addInstallDetails?.spocEmailId.trim(),
                                address1: addInstallDetails?.address1.trim(),
                                address2 : addInstallDetails?.address2.trim(),
                                prodInstallationStateId : addInstallDetails?.prodInstallationStateId,
                                productGroup: "",
                                complaintType: "",
                                requestType: ""
                            };
                            let updatedData = Data;
                            if(Data.msg !="Service Ticket Available"){
                                updatedData = await getAllASCpinCodewise(Data, Data.prodInstallationPinId);
                                // updatedData = await setASCAndASMNames(Data, Data.prodInstallationCityId, Data.prodInstallationPinId);
                            }
                            
                            dataList.push(updatedData);
                            // Combine form data with static data
                            //let combinedData = { ...formData, ...addInstallDetails, ...updatedData };
                            // Push the combined data to the array
                            
    
    
                            // Reset form fields
                            
                            
                            
    
                            // setShowSecondRow(true);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: result?.Message
                            });
                            setloading(false)
                        }
                    } catch (error) {
                        console.error('Error fetching product details:', error);
                        setloading(false)
    
                    }
                }
                
               }
               let newAddedData = [...addedData, ...dataList];
               if(isIvalidRec){
                let msgToDisplay;
                if(repeatedProducts.length > 0){
                    setRepeatedProducts(repeatedProducts);
                    // msgToDisplay = "Serial Number/s: "+ repeatedProducts.join(", ")+" is already added in the system.";
                }
                else{
                    setRepeatedProducts([]);
                }
                if(InvalidSerialNo.length != 0){
                    setInvalidSerialNo(InvalidSerialNo);
                    // msgToDisplay = msgToDisplay + "\n Serial no / product code not matching, for Serial number/s: "+ InvalidSerialNo.join(", ");
                }
                else{
                    setInvalidSerialNo([])
                }
                if(exstingTickets.length != 0){
                    setexstingTickets(exstingTickets);
                    // msgToDisplay = msgToDisplay+ "\n Service ticket is already raised for Serial number/s: "+ exstingTickets.join(", ");
                }
                else{
                    setexstingTickets([]);
                }
                // Swal.fire({
                //     icon: "error",
                //     title: msgToDisplay
                // });
                handleRegisteredShow();
               }
                setAddedData(newAddedData);
                setxlFileName("")
                xlInput.current.value="";
            //    setfileContent(json)
            //    newob.ObjLeads.push(json)
            //     newob.ObjLeads=newob.ObjLeads[0]
    
            //      console.log(json);
            //      console.log(newob);
            //      sessionStorage.setItem("excel",JSON.stringify(newob));
    // console.log("parsed");
                 // let d=sessionStorage.getItem("excel");
                 // let pd=JSON.parse(d);
                 // console.log(pd);
             
                 // console.log(e.target);
             };
             reader.readAsArrayBuffer(e.target.files[0]);
         }
        }
    
     }
     
    useEffect(() => {
        // Check if addedData is empty
        if (addedData.length === 0) {
            setfirstTabNext(false); // If addedData is empty, disable the Next button
        } else {
            let filteredData = addedData.filter(obj => obj?.msg != "Service Ticket Available");
            if (filteredData.length == 0) {
                setfirstTabNext(false);
            }
            else {
                setfirstTabNext(true);
            }

        }
    }, [addedData]);

    async function getAllASCpinCodewise(data, p_pinCode){
        try{
            let updatedData;
            let response = await fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${p_pinCode}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            let resultingNearestASCs = await response.json();
            data.nearestAsmUserCode = "";
            // data.nearestPinCode = "";
            if(resultingNearestASCs.length == 0){
                data.nearestAscUserCode = "";
                
                return data;
            }
            else{
                data.nearestAscUserCode =  resultingNearestASCs[0].userCode;
                data.nearestPinCode = resultingNearestASCs[0].pinCode;
                if(data.nearestPinCode == p_pinCode){
                    data.distance = "10";
                    console.log("distance" + data.distance)
                    return data;
                }
                updatedData = calculateRoute(p_pinCode, data.nearestPinCode, data)
                async function getCoordinates(address) {
                    try {
                      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
                      const data = await response.json();
                      if (data.length > 0) {
                        return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                      } else {
                        throw new Error(`No coordinates found for address: ${address}`);
                      }
                    } catch (error) {
                      console.error('Error in getCoordinates:', error.message);
                    //   setDistance(error.message)
                      throw new Error(`Error fetching coordinates for address: ${address}`);
                    }
                  }
                   
                  async function calculateRoute(startAddress, endAddress, addData) {
                    try {
                      console.log("calculateRoute called with:", startAddress, endAddress);
                      const startCoords = await getCoordinates(startAddress);
                      const endCoords = await getCoordinates(endAddress);
                   
                      console.log("Start Coordinates:", startCoords);
                      console.log("End Coordinates:", endCoords);
                   
                      const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key
                      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;
                   
                      console.log("Fetching route from URL:", url);
                   
                      const response = await fetch(url);
                      const data = await response.json();
                   
                      if (data.error) {
                        throw new Error(data.error.message);
                      }
                   
                      const route = data.features[0];
                      const distanceInMeters = route.properties.summary.distance; // Distance in meters
                      let distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers
                   
                      console.log("Distance in Kilometers:");
                      console.log(distanceInKilometers);
                      console.log("Distance in meters:");
                      console.log(distanceInMeters);
                      addData.distance = distanceInKilometers.toString();
                   
                      // Assuming map is defined and configured
                      map.getLayers().forEach(layer => {
                        if (layer instanceof VectorLayer) {
                          map.removeLayer(layer);
                        }
                      });
                   
                      const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
                      const routeFeature = new Feature({
                        geometry: new LineString(coordinates),
                      });
                      const routeLayer = new VectorLayer({
                        source: new VectorSource({
                          features: [routeFeature],
                        }),
                        style: new Style({
                          stroke: new Stroke({
                            color: 'blue',
                            width: 2,
                          }),
                        }),
                      });
                      map.addLayer(routeLayer);
                      return addData;
                   
                    } catch (error) {
                      console.error('Error calculating route:', error);
                      addData.distance = "";
                      return addData;
                    }
                  }
                   
            }
            console.log(resultingNearestASCs);
            return updatedData;
        }
        catch (error) {
            console.error('Error in getAllASCpinCodewise:', error);
            throw error;
        }
        
    }
    
    async function setASCAndASMNames(data, p_cityID, p_pinCode) {
        try {
            // Fetching nearest ASCs
            let response = await fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${p_cityID}&DivisionCode=${data.divCode}&Mode=1`);
            let resultingNearestASCs = await response.json();
            console.log(resultingNearestASCs);

            // Function to get coordinates from a pincode
            async function getCoordinates(pincode, country) {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                const data = await response.json();
                if (data.length > 0) {
                    return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                } else {
                    throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                }
            }

            const apiKey = process.env.REACT_APP_ORS_API_KEY;

            // Function to calculate the nearest route
            async function calculateRoute(pincodeArray, startPincode, resultingNearest) {
                setloading(true)
                try {
                    const startCoords = await getCoordinates(startPincode, 'IN');
                    console.log(startCoords);

                    let nearestPincode = null;
                    let shortestDistance = Infinity;

                    for (const pincode of pincodeArray) {
                        const endCoords = await getCoordinates(pincode, 'IN');

                        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;
                        const response = await fetch(url);
                        const data = await response.json();

                        if (data.error) {
                            throw new Error(data.error.message);
                        }

                        const route = data.features[0];
                        const distanceInMeters = route.properties.summary.distance; // Distance in meters
                        const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                        if (distanceInKilometers < shortestDistance) {
                            shortestDistance = distanceInKilometers;
                            nearestPincode = pincode;
                        }
                    }

                    setloading(false)

                    let obj = resultingNearest.filter(i => i.pinCode == nearestPincode);
                    console.log(obj);
                    return {
                        nearestPincode,
                        nearestUserCode: obj[0]?.userCode
                    };
                } catch (error) {
                    console.error('Error calculating route:', error);
                    throw error;
                }
            }

            // Calculate route for ASCs
            const pincodeArrayASCs = resultingNearestASCs?.map(i => i.pinCode);
            const ascRouteResult = await calculateRoute(pincodeArrayASCs, p_pinCode, resultingNearestASCs);

            // Update data with ASC information
            data.nearestPinCode = ascRouteResult.nearestPincode;
            data.nearestAscUserCode = ascRouteResult.nearestUserCode;
            data.nearestAsmUserCode = "ASM"; // You can update this later if needed

            // Fetching nearest ASMs
            let responseASM = await fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${p_cityID}&DivisionCode=${data.divCode}&Mode=2`);
            let resultingNearestASMs = await responseASM.json();
            console.log(resultingNearestASMs);

            // Calculate route for ASMs
            const pincodeArrayASMs = resultingNearestASMs?.map(i => i.pinCode);
            const asmRouteResult = await calculateRoute(pincodeArrayASMs, p_pinCode, resultingNearestASMs);

            // Update data with ASM information
            data.nearestAsmUserCode = asmRouteResult.nearestUserCode;

            // Return updated data if necessary
            return data;
        } catch (error) {
            console.error('Error in setASCAndASMNames:', error);
            throw error;
        }
    }

    // Calling the function in handleAddButtonClic
    const handleAddButtonClick = async () => {
        let findRepeatedProducts = addedData.filter(obj => obj.serialNo == formData.serialNo.trim() &&
                                                     obj.productCode == formData.productCode.trim() && 
                                                     obj.divCode == selectedOption);
        if (addInstallDetails.nameOfSpoc === '' || addInstallDetails.spocMobileNo === '' || addInstallDetails.address1 === ''  || addInstallDetails.prodInstallationPinId === '' || addInstallDetails.prodInstallationStateId === '' || addInstallDetails.prodInstallationCityId === '' || formData.serialNo.trim() === '' || formData.productCode.trim() === '' || formData.invoiceNo.trim() === '' || formData.invoiceDate === '' || formData.defectId === '' || formData.remarks.trim() === '' || productLineId =="" ||
        !addInstallDetails.nameOfSpoc || !addInstallDetails.spocMobileNo  || !addInstallDetails.address1  || !addInstallDetails.prodInstallationPinId  || !addInstallDetails.prodInstallationStateId || !addInstallDetails.prodInstallationCityId ) {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            });
        }
        else if (formData?.defectName == "Transit damage" && formData?.invoceFilePath === '') {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            });
        }
        else if (findRepeatedProducts.length >= 1) {
            Swal.fire({
                icon: "error",
                title: "Selected Product is already added."
            });
        }
        else {
            // Fetch product details
            setloading(true)
            const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetServiceTicketProdSerialNoAuthorize?ProductSerialNo=${formData.serialNo}&${(formData.productCode && formData.productCode != 0) ? `ProductCode=${formData.productCode}` : ""}&DivisionCode=${selectedOption}`;

            try {
                const res = await fetch(getProdDetailUrl,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                const result = await res.json();
                if (result?.msgCode === "SAP404") {
                    Swal.fire({
                        icon: "error",
                        title: result?.msg
                    });
                    setloading(false)

                }
                else if (result?.msg =="Service Ticket Available") {
                    Swal.fire({
                        icon: "error",
                        title: "Service ticket is already raised for given product."
                    });
                    setloading(false)

                } else if (result?.msg) {
                    // setTimeout(() => {
                    setloading(false)


                    // }, 4000);

                    let Data = {
                        productCode: formData.productCode.trim(),
                        serialNo: formData.serialNo.trim(),
                        productLine: result?.prodSerialNoWarrantyList[0]?.productLineName,
                        productLineCode: result?.prodSerialNoWarrantyList[0]?.productLineCode,
                        productType: result?.prodSerialNoWarrantyList[0]?.productLineName,
                        divCode: selectedOption,
                        defectId: formData.defectId,
                        defectName: formData.defectName,
                        frameSize: result?.prodSerialNoWarrantyList[0]?.frame,
                        pole: result?.prodSerialNoWarrantyList[0]?.pole,
                        voltage: result?.prodSerialNoWarrantyList[0]?.kw,
                        prodInstallationPinId: addInstallDetails?.prodInstallationPinId,
                        prodInstallationCityId: addInstallDetails?.prodInstallationCityId,
                        prodInstallationCityName: addInstallDetails?.prodInstallationCityName,
                        invoiceNo: formData?.invoiceNo.trim(),
                        invoiceDate: formData?.invoiceDate,
                        kva: result?.prodSerialNoWarrantyList[0]?.kva,
                        sapWarrantyDate: result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch?.split(" ")[0],
                        hp: "",
                        efficiency: result?.prodSerialNoWarrantyList[0]?.effe,
                        flp: result?.prodSerialNoWarrantyList[0]?.flps,
                        remarks: formData?.remarks.trim(),
                        purchaseFrom: "",
                        batchStartDate: result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate,
                        batchEndDate: result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch,
                        warrantyDate: "",
                        inWarranty: true,
                        isDeviation: false,
                        msg: result?.msg,
                        invoceFilePath: formData?.invoceFilePath,
                        retailerInvoiceCopy: formData?.retailerInvoiceCopy,
                        msgCode: result?.msgCode,
                        nameOfSpoc: addInstallDetails?.nameOfSpoc.trim(),
                        spocMobileNo: addInstallDetails?.spocMobileNo.trim(),
                        spocEmailId: addInstallDetails?.spocEmailId.trim(),
                        address1: addInstallDetails?.address1.trim(),
                        address2 : addInstallDetails?.address2.trim(),
                        prodInstallationStateId : addInstallDetails?.prodInstallationStateId,
                        productGroup: "",
                        complaintType: "",
                        requestType: ""
                    };
                    let updatedData = Data;
                    if(Data.msg !="Service Ticket Available"){
                        updatedData = await getAllASCpinCodewise(Data, Data.prodInstallationPinId);
                        // updatedData = await setASCAndASMNames(Data, Data.prodInstallationCityId, Data.prodInstallationPinId);
                    }
                    // Combine form data with static data
                    //let combinedData = { ...formData, ...addInstallDetails, ...updatedData };
                    // Push the combined data to the array
                    let newAddedData = [...addedData, updatedData];
                    setAddedData(newAddedData);


                    // Reset form fields
                    let resetFormData = { ...formData };
                    resetFormData.productCode = "";
                    resetFormData.serialNo = "";
                    resetFormData.invoiceNo = "";
                    resetFormData.invoiceDate = "";
                    resetFormData.defectId = "";
                    resetFormData.remarks = "";
                    if (localStorage.getItem("RedirectedField") == "RetailerField") {
                        fileInputRef.current.value = '';
                    }
                    setSelectedOption("");
                    setProductLineId("");
                    setFormData(resetFormData);

                    setShowSecondRow(true);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: result?.Message
                    });
                    setloading(false)
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setloading(false)

            }
        }
    };

    
    const handleRemoveButtonClick = (cell) => {
        const updatedData = [...addedData];
        updatedData.splice(cell.row.index, 1);
        setAddedData(updatedData);
    };




    const [activeTab, setactiveTab] = useState('0');



    const handleNextTab = () => {
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
    const validateMobile = (mobile) => {
        // Basic mobile number validation regex
        const regex = /^[5-9]{1}[0-9]{9}$/;
        return regex.test(mobile);
    };
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        // const value = e.target.value;
        const newAddInstallDetails = { ...addInstallDetails };
        newAddInstallDetails[e.target.name] = value;
        setaddInstallDetails(newAddInstallDetails);
        if ((!validateMobile(value) && value != "")  || parseInt(value).toString().length <10) {
            setMobileError('Invalid mobile number');
        } else {
            setMobileError('');
        }
    };

    const handleInstallChange = (e) => {
        if (e.target.name in formData) {
            const newFormData = { ...formData };
            newFormData[e.target.name] = e.target.value;
            setFormData(newFormData);
        } else if (e.target.name in addInstallDetails) {
            const newAddInstallDetails = { ...addInstallDetails };
            newAddInstallDetails[e.target.name] = e.target.value;
            setaddInstallDetails(newAddInstallDetails);
        }
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        const newAddInstallDetails = { ...addInstallDetails };
        newAddInstallDetails[e.target.name] = e.target.value;
        setaddInstallDetails(newAddInstallDetails);
        if (!validateEmail(value) && value != "") {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    useEffect(() => {
        setPrevSrNoOnBlur(formData.serialNo);
        setPrevProductCodeOnBlur(formData.productCode);
    }, [SrNoOnBlur, ProductCodeOnBlur]);
    
    const handleBlur = (e, productType)=>{
        if(e.target.name == "srNo"){
            setMinimumInvoiceDate(true, false ,false, e.target.value);
            setSrNoOnBlur( e.target.value);
        }
        else if(e.target.name == "productCode"){
            setMinimumInvoiceDate(false, true, false, e.target.value); 
            setProductCodeOnBlur(e.target.value);
        }
        else{
            setMinimumInvoiceDate(false, false, true, productType); 
        }
        //console.log(event.target.value);
    };

    const setMinimumInvoiceDate = (isSrNo, isProductCode, isProductType, value) => {

        let productType = selectedOption;
        if (isSrNo && prevSrNoOnBlur == value) {
            return;
        }
        else if (isProductCode && prevProductCodeOnBlur == value) {
            return;
        }
        else if (isProductType) {
            productType = value;
        }
        if (formData.serialNo.length != "" && formData.productCode.length != "" && productType != "") {
            setDisableInvoiceDate(true);
            const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdSerialNoAuthorize?ProductSerialNo=${formData.serialNo}&${(formData.productCode && formData.productCode != 0) ? `ProductCode=${formData.productCode}` : ""}&DivisionCode=${productType}`;
            fetch(getProdDetailUrl,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    //setsrNoDetails(result)



                    // if (result?.msgCode == "SP001") {
                    //     navigate(`${pathName}/not-reg-for-warranty`);
                    // }
                    // else
                    if (result.status == 404) {
                        Swal.fire({
                            icon: 'error',
                            title: result?.title
                        })
                    }
                    else if (result?.msgCode == "SAP404") {
                        Swal.fire({
                            icon: "error",
                            title: result?.msg
                        })
                        setloading(false)
                        setDisableInvoiceDate(false);


                    }
                    else {
                        let a = result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate;
                        if (result?.msgCode == "SP200") {
                            a = moment(a).format("YYYY-MM-DD")
                        }
                        let d1 = new Date(a);
                        let d2 = new Date(formData.invoiceDate);
                        fetch(`${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${result?.prodSerialNoWarrantyList[0].productLineCode}`,{
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })
                            .then((res) => res.json())
                            .then((result) => {
                                console.log(result);
                                setdefectsByPL(result)
                        })
                        setMinInvoiceDate(a);
                        setDisableInvoiceDate(false);
                        if (d1 > d2) {
                            setFormData((pre) => {
                                return {
                                    ...pre,
                                    invoiceDate: ""
                                }
                            }
                            )
                        }
                    }
                    // else {

                    //     Swal.fire({
                    //         icon: "error",
                    //         title: result?.Message
                    //     })
                    // }


                    // else if(result?.msgCode=="SP200" && result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="Out Of Warranty"){
                    //   // navigate(`${pathName}/not-reg-for-warranty`);

                    // }
                    // // else if(result?.prodSerialNoWarrantyList[0]?.warrantyStatus=="0"){

                    // }
                })
        }
    }

    function useDebounce(callback, delay) {
        const [timeoutId, setTimeoutId] = useState(null);

        return function debouncedCallback(...args) {
            clearTimeout(timeoutId);
            const id = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimeoutId(id);
        };
    }

  //   const handleBlur = useDebounce((e, productType) => {
    //     // console.log(event.target.value);
    //     if (e.target.name == "srNo") {
    //         setMinimumInvoiceDate(true, false, false, e.target.value);
    //         setSrNoOnBlur(e.target.value);
    //     }
    //     else if (e.target.name == "productCode") {
    //         setMinimumInvoiceDate(false, true, false, e.target.value);
    //         setProductCodeOnBlur(e.target.value);
    //     }
    //     else {
    //         setMinimumInvoiceDate(false, false, true, productType);
    //     }
    //     //setfilterVendorName(event.target.value);
    //     // Your logic here
  //   }, 500); // Adjust delay as needed

    const handleSubmit = () => {
        //UpsertProductCustomerDealer 
        let filteredData = addedData.filter(obj => obj?.msg != "Service Ticket Available");
        //const form = new FormData();
        // form.append('lstProdDeal', JSON.stringify(filteredData)); 
        // form.append("invoceFilePath",formData?.invoceFilePath);

        let dealerRaiseTicketIP = {
            "lstProdDeal": filteredData,
            //"invoceFilePath":[""],
            "objProdCustDeal": {
                "prodRegAutoId": 0,
                "custVerificationId": 0,
                "customerName": DealerDetails?.dealerName,
                "contactPerson": DealerDetails?.dealerName,
                "primaryMobileNo": DealerDetails?.mobileNo,
                "emailId": DealerDetails?.dealerEmail,
                "custAddess": DealerDetails?.address,
                "altContactNo": DealerDetails?.mobileNo,
                "altEmailId": DealerDetails?.dealerEmail,
                "siteAddress": DealerDetails?.address,
                "pinId": 1,//DealerDetails?.pinCode,
                "cityId": DealerDetails?.cityId,
                "stateId": DealerDetails?.stateId,
                "isActive": true,
                "redirectingFrom": "RaiseServiceTicket",
                "userCode": localStorage.getItem("RedirectedField") == "RetailerField" ? localStorage.getItem("RetailerCode") : DealerDetails?.dealerCode,
                "ticketCreateName":  localStorage.getItem("RedirectedField") == "RetailerField"? "" : localStorage.getItem("TicketCreateName"),
                "ticketCreateNumber": localStorage.getItem("RedirectedField") == "RetailerField"? "" :localStorage.getItem("TicketCreateNumber"),
                "userType": localStorage.getItem("RedirectedField") == "RetailerField" ? "136" : "137",
                "dealerCode": localStorage.getItem("RedirectedField") == "RetailerField" ? "" : DealerDetails?.dealerCode,
                "retailerCode": localStorage.getItem("RedirectedField") == "RetailerField" ? localStorage.getItem("RetailerCode") : "",
              "oemCode":localStorage.getItem("RedirectedField") == "RetailerField"? "":localStorage.getItem("DealerOrOEMCode")
            }
        }

        //         let objProdCustDeall;

        // form.append("objProdCustDeal",JSON.stringify(objProdCustDeal));

        const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/UpsertProductCustomerDealerAuthorize`;

        fetch(getProdDetailUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dealerRaiseTicketIP)
        }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result?.Key == 500) {
                    Swal.fire({
                        icon: "error",
                        title: result?.Message
                    })
                }
                else {
                    //RetailerCode //DealerOrOEMCode

                    fetch(process.env.REACT_APP_API_URL + "ServiceTicket/GetServiceTicketById?ServiceTickeId=" + result,{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                        .then((res) => res.json())
                        .then((result) => {
                            if (result?.Key == 500) {
                                Swal.fire({
                                    icon: "error",
                                    title: result?.Message
                                })
                            }
                            else {
                                if (localStorage.getItem("RedirectedField") == "RetailerField") {
                                    localStorage.removeItem("DealerOrOEMCode");
                                    localStorage.removeItem("RetailerCode");
                                }
                                console.log(result);
                                setdealerRaisedTicketDetails(result);
                                handleNextTab();
                            }

                        })
                }



                //handleNextTab();
            })

    }

    // const handleInstallChange = (e) => {
    //     const newdata = { ...formData };
    //     newdata[e.target.name] = e.target.value;
    //     setFormData(newdata);
    //     console.log(newdata);
    // }

    const dealername = localStorage.getItem('DealerOrOEMName')
    const dealerAdd = localStorage.getItem('DealerOrOEMAdd')

    let RedirectionRouteSelfStock = localStorage.getItem("RedirectedSelfStock");
    localStorage.setItem("RedirectedField","DealerField")
    let RedirectionRouteField = localStorage.getItem("RedirectedField");



    const issueType = {
        'Product Shutdown': "Product Shutdown",
        'Product Overheating': "Product Overheating",
        'Transit damage': "Transit damage",
    };


    const [loading, setloading] = useState(false)

    return (

        <>
           
            <Row>
                <Col>
                    {/* <Card className="border-0 p-3 m-4"
                        //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                        // style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                        > */}

                        
                        <Tabs variant="pills" activeKey={activeTab} defaultActiveKey={'0'} onSelect={(k) => {
                            setactiveTab(k)
                            console.log(k)
                        }}
                        >
                            <Tab eventKey={'0'}>
                                <Row className="justify-content-start m-0  " >



                                    {/* <Row className="m-0"><p className="m-0">Please enter details of concern motor(list of motor single install)</p></Row> */}

                                    {/* <hr /> */}
                                    <p className="text-left pg-label-warranty pt-3" >
                                        <span style={{fontWeight: '750'}}>Placing request for self stock {localStorage.getItem("RedirectedField") == "RetailerField" ? "Retailer" : "Dealer/OEM"} </span>
                                    </p>

                                    <Row className="mt-2 text-start">
                                        <p style={{
                                            color: '#000',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }} className="text-left  pt-2">
                                            Product Location details
                                        </p>

                                        {localStorage.getItem("RedirectedField") == "RetailerField"?
                                        ""
                                        :
                                            <>
                                                <Col md={2}>
                                                <Form.Group >
                                                    <Form.Label>
                                                        Dealer Name <span className="req-t">*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        readOnly
                                                        autocomplete="new-password"
                                                        name="nameOfSpoc"
                                                        value={DealerDetails?.dealerName}
                                                        onChange={handleInstallChange}
                                                    />
                                                </Form.Group>
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Group >
                                                        <Form.Label>
                                                        Dealer Mobile No <span className="req-t">*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                        readOnly
                                                            type="text"
                                                            autocomplete="new-password"
                                                            name="nameOfSpoc"
                                                            value={DealerDetails?.mobileNo}
                                                            onChange={handleInstallChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </>}
                                        

                                        <Col md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                    Name of Person to be contacted details <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autocomplete="new-password"
                                                    name="nameOfSpoc"
                                                    value={addInstallDetails.nameOfSpoc}
                                                    onChange={handleInstallChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                Person to be contacted Mobile No<span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autocomplete="new-password"
                                                    name="spocMobileNo"
                                                    value={addInstallDetails?.spocMobileNo}
                                                    onChange={handleMobileChange}
                                                />
                                                {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                Person to be contacted Email
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="spocEmailId"
                                                    autocomplete="new-password"
                                                    value={addInstallDetails?.spocEmailId}
                                                    onChange={handleEmailChange}
                                                />
                                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                                            </Form.Group>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Group className="">
                                                <Form.Label>
                                                    Address <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address1"
                                                    autocomplete="new-password"
                                                    value={addInstallDetails?.address1}
                                                    onChange={handleInstallChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        {/* <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                    Address line 2 <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address2"
                                                    autocomplete="new-password"
                                                    value={addInstallDetails?.address2}
                                                    onChange={handleInstallChange}
                                                />
                                            </Form.Group>
                                        </Col> */}
                                        <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                    PinCode
                                                </Form.Label><span className="req-t">*</span>
                                                <Form.Control
                                                    type="text"
                                                    name="prodInstallationPinId"
                                                    autocomplete="new-password"
                                                    value={addInstallDetails?.prodInstallationPinId}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                                        setaddInstallDetails({ ...addInstallDetails, prodInstallationPinId: value })
                                                        handlePinCodeChange(e);
                                                        
                                                        if (
                                                            value &&
                                                            value?.length == 6
                                                        ) {
                                                            fetch(
                                                                `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=9&Id=${value}&Code=0`,{
                                                                    headers: {
                                                                      Authorization: `Bearer ${token}`,
                                                                    },
                                                                  }
                                                            )
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log(result[0]);
                                                                    setaddInstallDetails((pre) => {
                                                                        return {
                                                                            ...pre,
                                                                            prodInstallationStateId: result[0]?.parameterTypeId ? result[0]?.parameterTypeId : "",
                                                                        };
                                                                    });

                                                                    // if(result[0]?.parameterTypeId)

                                                                    if (result[0] != undefined) {
                                                                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
                                                                        fetch(cityUrl,{
                                                                            headers: {
                                                                              Authorization: `Bearer ${token}`,
                                                                            },
                                                                          })
                                                                            .then((res) => res.json())
                                                                            .then((result) => {
                                                                                console.log(result);
                                                                                setcities(result);
                                                                            });
                                                                    }
                                                                });

                                                            fetch(
                                                                `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=5&Id=${value}&Code=0`,{
                                                                    headers: {
                                                                      Authorization: `Bearer ${token}`,
                                                                    },
                                                                  }
                                                            )
                                                                .then((res) => res.json())
                                                                .then((result) => {
                                                                    console.log(result[0]);
                                                                    setaddInstallDetails((pre) => {
                                                                        return {
                                                                            ...pre,
                                                                            prodInstallationCityId: result[0]?.parameterTypeId ? result[0]?.parameterTypeId : "",
                                                                            prodInstallationCityName: result[0]?.parameterType ? result[0]?.parameterType : ""
                                                                        };
                                                                    });



                                                                });
                                                        } else {
                                                            setaddInstallDetails((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    prodInstallationStateId: "",
                                                                    prodInstallationCityId: "",
                                                                    prodInstallationCityName: ""
                                                                };
                                                            });
                                                        }


                                                    }}

                                                />
                                                {pinError && <span style={{ color: 'red' }}>{pinError}</span>}
                                            </Form.Group>
                                        </Col>



                                        <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                    State
                                                </Form.Label> <span className="req-t">*</span>

                                                <Form.Select
                                                    disabled
                                                    value={addInstallDetails?.prodInstallationStateId}
                                                    onChange={(e) => {
                                                        setaddInstallDetails((pre) => {
                                                            return {
                                                                ...pre,
                                                                prodInstallationStateId: e.target.value,
                                                            };
                                                        });

                                                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=4&Id=${e.target.value}&Code=0`;
                                                        fetch(cityUrl,{
                                                            headers: {
                                                              Authorization: `Bearer ${token}`,
                                                            },
                                                          })
                                                            .then((res) => res.json())
                                                            .then((result) => {
                                                                console.log(result);
                                                                setcities(result);
                                                            });
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {states?.map((state, index) => {
                                                        return (
                                                            <>
                                                                <option
                                                                    value={state?.parameterTypeId}
                                                                    key={index}
                                                                >
                                                                    {state?.parameterType}
                                                                </option>
                                                            </>
                                                        );
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md={2}>
                                            <Form.Group >
                                                <Form.Label>
                                                    City
                                                </Form.Label> <span className="req-t">*</span>
                                                <Form.Select
                                                    disabled
                                                    value={addInstallDetails?.prodInstallationCityId}
                                                    onChange={(e) => setaddInstallDetails({ ...addInstallDetails, prodInstallationCityId: e.target.value })}
                                                >
                                                    <option value="">Select</option>
                                                    {cities &&
                                                        cities?.map((city, index) => {
                                                            return (
                                                                <>
                                                                    <option
                                                                        value={city?.parameterTypeId}
                                                                        key={index}
                                                                    >
                                                                        {city?.parameterType}
                                                                    </option>
                                                                </>
                                                            );
                                                        })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                    </Row>



                                    <Row className="text-left mt-3">
                                        <p style={{
                                            color: '#000',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }} className="text-left  pt-2">
                                            Product Info
                                        </p>



                                        <Col md={3}>
                                            <Form.Group className="mt-2">
                                                <Form.Label >
                                                    Product Type <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Select
                                                    onChange={handleSelectChange} value={productLineId}
                                                >
                                                    <option value="">Select</option>
                                                    {productTypes.map((obj) => {
                                                        return <option key={obj.productLineId} value={obj.productLineId}>{obj.productLineName}</option>
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mt-2">
                                                <Form.Label >
                                                    Enter Sr No <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autocomplete="new-password"
                                                    name="srNo"
                                                    value={formData.serialNo}
                                                    onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                                                    onBlur={handleBlur}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mt-2">
                                                <Form.Label >
                                                    Enter {selectedOption == "CP" || selectedOption == "CP" || selectedOption == "CP" ? "Model No." : "Product code"} <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autocomplete="new-password"
                                                    name="productCode"
                                                    value={formData.productCode}
                                                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                                                    onBlur={handleBlur}

                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={3}>
                                            <Form.Group className="mt-2">
                                                <Form.Label >
                                                    {RedirectionRouteField === "DealerField" ? "CG Invoice No" : "Dealer Invoice No"}
                                                    <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autocomplete="new-password"
                                                    value={formData.invoiceNo}
                                                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}

                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="text-left mt-3">
                                        <Col md={3}>
                                            <Form.Group className="">

                                                <Form.Label>
                                                    {RedirectionRouteField === "DealerField" ? "CG Invoice date" : "Dealer Invoice date"}
                                                    <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    max={currentDate}
                                                    min={minInvoiceDate}
                                                    value={formData.invoiceDate}
                                                    onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                                                />


                                            </Form.Group>
                                        </Col>
                                        {RedirectionRouteField === "DealerField" ? "" : <Col md={3}>
                                            < Form.Group className="">
                                                <Form.Label >
                                                    Retailer Invoice Copy <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    ref={fileInputRef}
                                                    // value={formData.serialNo}
                                                    onChange={async (e) => {
                                                        let data = await getBase64(e.target.files[0]);

                                                        setFormData({ ...formData, retailerInvoiceCopy: data })
                                                    }
                                                    }

                                                />
                                            </Form.Group>
                                        </Col>}

                                        <Col md={3}>
                                            <Form.Group className="">
                                                <Form.Label>
                                                    Select Issue <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Select
                                                    value={formData.defectId}
                                                    onChange={(e) => {
                                                        if (e.target.value == "") {
                                                            setFormData({ ...formData, defectId: "", defectName: "" })   
                                                        }
                                                        else{
                                                            let defectName = defectsByPL.filter((obj) => obj.issueTypeId == e.target.value)
                                                            setFormData({ ...formData, defectId: e.target.value, defectName: defectName[0].issueTypeName })    
                                                        }
                                                    }
                                                    }
                                                >
                                                    <option value="">Select</option>
                                                    {defectsByPL?.map((defect, index) => {
                                                        return (
                                                            <>
                                                                <option value={defect?.issueTypeId}>{defect?.issueTypeName}</option>
                                                            </>
                                                        );
                                                    })}




                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        {(formData.defectId && formData.defectName === 'Transit damage') && <Col md={3}>
                                            <Form.Group className="">
                                                <Form.Label >
                                                    Upload LR Copy <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    // id="FileLRCopy"
                                                    onChange={async (e) => {
                                                        let data = await getBase64(e.target.files[0]);
                                                        setFormData({ ...formData, invoceFilePath: data })
                                                    }
                                                    }

                                                />
                                            </Form.Group>
                                        </Col>}
                                        {formData.defectId && <Col md={3}>
                                            <Form.Group className=" ">
                                                <Form.Label >
                                                    Brief of complaint<span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control as="textarea"
                                                    value={formData?.remarks}
                                                    rows={2} name="remarks"
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        remarks: e.target.value
                                                    })}
                                                />
                                            </Form.Group>
                                        </Col>}


                                        {/* <Col md={2}>
                                            <Form.Group className="mt-2">
                                                <Form.Label >
                                                    Description <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col> */}
                                        <Col md={1} style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} className="mt-2">
                                            <Button
                                                variant=""
                                                className="mt-4"
                                                disabled={mobileError || emailError || pinError || disableInvoiceDate}
                                                // readOnly={!handleAddButtonClick}
                                                onClick={handleAddButtonClick}

                                            >
                                                <FaPlusCircle color="#7bc143" fontSize={20} />
                                            </Button>
                                        </Col>
                                        
                                    </Row>
                                    



                                    {/* <Col >
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                                    width={40}
                                    height={40}
                                    alt=""
                                    srcset=""
                                />
                            </Col> */}
                                    {/* {addedData.map((add, index) => ( */}

                                    {
                                        loading ? <Loader /> : ""}
                                    {addedData.length == 0 ? "" :
                                    <div style={{marginTop:'10px'}}>
                                    <MaterialReactTable
                                    columns={columns}
                                    data={addedData}
                                    initialState={{ showColumnFilters: false }} //show filters by default
                                    // muiTableHeadCellFilterTextFieldProps={{
                                    //   sx: { m: "0.5rem 0", width: "100%" },
                                    //   variant: "outlined",
                                    // }}
                                    // enableEditing
                                    // onEditingRowSave={handleSaveRowEdits}
                                    // onEditingRowCancel={handleCancelRowEdits}
                                    //     renderRowActions={({ cell, row, table }) => (
                    
                                    //       <Box sx={{ display: "flex", gap: "1rem" }}>
                                    //         {/* <Tooltip arrow placement="left" title="View">
                                    //   <IconButton 
                                    //   className="edit-btn"
                                    //   // onClick={() => table.setEditingRow(row)}
                                    //   disabled
                                    //   >
                                    //     <FaEye color='green'/>
                                    //   </IconButton>
                                    // </Tooltip> */}
                                    //         {
                                    //           cell.row.original.isActive == false ? "" :
                                    //             <Tooltip arrow placement="left" title="Edit">
                                    //               <IconButton
                                    //                 className="edit-btn"
                                    //                 onClick={() => {
                                    //                   console.log(cell.row.original.stStatusId);
                                    //                   setstStatusId(cell.row.original.stStatusId)
                                    //                   handleModalShow()
                                    //                 }}
                    
                                    //               // disabled
                                    //               >
                    
                                    //                 <FaRegEdit color='#005bab' />
                                    //               </IconButton>
                                    //             </Tooltip>
                                    //         }
                                    //         {
                                    //           cell.row.original.isActive == false ? "" :
                                    //             <Tooltip arrow placement="right" title="Delete">
                                    //               <IconButton
                                    //                 color="error"
                                    //                 onClick={() => {
                                    //                   setstStatusId(cell.row.original.stStatusId)
                                    //                   console.log(cell.row.original.stStatusId)
                                    //                   handleShowDel()
                                    //                 }}
                    
                    
                                    //               // disabled
                                    //               >
                                    //                 {/* {divisionData.map(division => (
                                    //               <div key={division.id}>
                                    //                 <p>{division.name}</p>
                                    //                 <button onClick={() => handleDelete(division.id)}>Delete</button>
                                    //               </div>
                                    //             ))} */}
                                    //                 <HiOutlineTrash color='red' />
                                    //               </IconButton>
                                    //             </Tooltip>
                                    //         }
                                    //       </Box>
                                    //     )}
                    
                                    // manualPagination={true}
                                    muiToolbarAlertBannerProps={isError
                                      ? {
                                        color: 'error',
                                        children: 'Error loading data',
                                      }
                                      : undefined}
                                    // onColumnFiltersChange={setColumnFilters}
                                    // onGlobalFilterChange={setGlobalFilter}
                                    // onPaginationChange={setPagination}
                                    // onSortingChange={setSorting}
                                    // rowCount={rowCount}
                                    // state={
                                    //   {
                                    //     columnFilters,
                                    //     globalFilter,
                                    //     isLoading,
                                    //     pagination,
                                    //     showAlertBanner: isError,
                                    //     showProgressBars: isRefetching,
                                    //     sorting,
                                    //   }
                                    // }
                    enableTopToolbar={false}
                                    // renderTopToolbarCustomActions={({ table }) => (
                                    //   <>
                                    //     <div style={{
                                    //       display: 'flex',
                                    //       gap: '16px',
                                    //       padding: '10px',
                                    //       flexWrap: 'wrap',
                                    //     }}>
                    
                                          
                                    //       {/* <Button variant=''
                                    //       disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //       onClick={() =>
                                    //         handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                                    //       }
                      
                                    //     >
                                    //       <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />
                      
                      
                                    //     </Button> */}
                                    //     </div>
                                    //   </>
                    
                                    // )}
                
                                    
                                    positionActionsColumn="first"
                    
                    
                    
                                  /></div>
                                        // <Table responsive bordered className="mt-3">

                                        //     <thead>
                                        //         <tr style={{
                                        //             fontSize: '12px'
                                        //         }}><th className="hide-column">Index</th>
                                        //             <th>Product Sr</th>
                                        //             {/* <th>Product Line</th> */}
                                        //             <th>Product Code/ Model</th>
                                        //             {/* <th>Product Type</th>
                                        //                 <th>Frame Size</th>
                                        //                 <th>Pole</th>
                                        //                 <th>Voltage</th> */}
                                        //             <th>Issue</th>
                                        //             <th>PinCode</th>
                                        //             <th>City</th>
                                        //             <th>InVoice No</th>
                                        //             <th>InVoice date</th>
                                        //             <th>Brief of complaint</th>



                                        //             <th>Actions</th>
                                        //         </tr>
                                        //     </thead>



                                        //     <tbody >
                                        //         {
                                        //             addedData?.map((add, index) => {
                                        //                 return (

                                        //                     <tr style={{
                                        //                         fontSize: '12px'
                                        //                     }} key={index}>
                                        //                         <td className="hide-column">{index}</td>
                                        //                         <td>{add?.serialNo ? add?.serialNo : "-"}</td>
                                        //                         {/* <td>{add?.productLine}</td> */}
                                        //                         <td>{add?.productCode ? add?.productCode : "-"}</td>
                                        //                         {/* <td>{add?.productType? add?.productType : "-"}</td>
                                        //                                 <td>{add?.frameSize ? add?.frameSize: "-"}</td>
                                        //                                 <td>{add?.pole ? add?.pole : "-"}</td>
                                        //                                 <td>{add?.voltage ? add?.voltage: "-"}</td> */}
                                        //                         <td>{add?.defectName ? add?.defectName : "-"}</td>
                                        //                         <td>{add?.prodInstallationPinId ? add?.prodInstallationPinId : "-"}</td>
                                        //                         <td>{add?.prodInstallationCityName ? add?.prodInstallationCityName : "-"}</td>
                                        //                         <td>{add?.invoiceNo ? add?.invoiceNo : "-"}</td>
                                        //                         <td>{add?.invoiceDate ? add?.invoiceDate : "-"}</td>
                                        //                         <td>{add?.remarks ? add?.remarks : "-"}</td>

                                        //                         <td >
                                        //                             {add?.msg === "Service Ticket Available" ?
                                                                        // <Tooltip arrow placement="left" title="view ticket">
                                                                        //     <Button
                                                                        //         variant=""
                                                                        //         onClick={handleShowCustomerTic}
                                                                        //     >
                                                                        //         <FaEye color="#7bc143" fontSize={20} />
                                                                        //     </Button>
                                                                        // </Tooltip> : <></>
                                        //                             }
                                                                    // <Tooltip arrow placement="right" title="remove">
                                                                    //     <IconButton
                                                                    //         className="edit-btn"
                                                                    //         onClick={() => handleRemoveButtonClick(index)}>
                                                                    //         <FaCircleMinus color="red" fontSize={20} />

                                                                    //     </IconButton>
                                                                    // </Tooltip>
                                        //                         </td>
                                        //                     </tr >

                                        //                 )
                                        //             })
                                        //         }




                                        //     </tbody>
                                        // </Table>
                                    }









                                    {/* ))} */}







                                </Row>
                                <Row className=" text-center mt-5" style={{
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}>
                                    

                                    <Col style={{
                                        display: 'contents'
                                    }}><Button variant=""
                                        disabled={!firstTabNext || addedData?.length == 0}
                                        className="add-Btn " onClick={() => {


                                            handleSubmit()

                                        }}
                                    >Save & Next</Button></Col>
                                </Row>



                                <Modal show={showCustomerTic} onHide={handleCloseCustomerTic} backdrop="static" size="xl" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title className='mdl-title'>Existing open ticket against the mentioned serial number:</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Card
                                            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                                        >

                                            <Row className="mt-3"
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: '15px'
                                                }}
                                            >
                                                <h2 style={{
                                                    margin: '0px',
                                                    fontSize: '16px',
                                                    textAlign: 'center',
                                                }}>Service Request</h2>


                                                <Col style={{
                                                    display: 'contents'
                                                }} className="mt-3">
                                                    <Form.Group
                                                        className="md:ml-2"


                                                    >
                                                        <Form.Label>
                                                            Service Request No
                                                        </Form.Label>
                                                        <p style={{
                                                            fontSize: '12px'
                                                        }}>{existingTicketDetails.serviceTicketNumber}</p>
                                                        {/* <Form.Control className="border-0"
                                                    type="text"
                                                    maxLength={15}
                                                    value='98YHTY'
                                                    readOnly

                                                /> */}
                                                    </Form.Group>

                                                </Col>
                                                <Col style={{
                                                    display: 'contents'
                                                }} className="mt-3">
                                                    <Form.Group


                                                    >
                                                        <Form.Label>
                                                            Request date
                                                        </Form.Label>
                                                        <p style={{
                                                            fontSize: '12px'
                                                        }}>{
                                                                moment((existingTicketDetails.RequestDate?.split(" ")[0])).format("YYYY-MM-DD")}</p>
                                                        {/* <Form.Control className="border-0"
                                                    type="date"
                                                    value='17/05/2024'
                                                    readOnly
                                                /> */}
                                                    </Form.Group>

                                                </Col>


                                            </Row>


                                            <Row className="text-start">
                                                <Row className="mt-3">
                                                    <Col
                                                        className="br"
                                                    >
                                                        <h2 style={{
                                                            fontSize: '16px',
                                                            textAlign: 'center'
                                                        }}>Customers Details</h2>
                                                        <Col style={{
                                                            gap: '20px',
                                                            justifyContent: 'center'
                                                        }} className="d-flex mt-3 p-0">
                                                            <Form.Group
                                                            >
                                                                <Form.Label>
                                                                    Company Name
                                                                </Form.Label>
                                                                <p
                                                                    style={{
                                                                        fontSize: '12px'
                                                                    }}
                                                                >{existingTicketDetails.customerName}</p>

                                                            </Form.Group>
                                                            <Form.Group
                                                            >
                                                                <Form.Label>
                                                                    Contact No
                                                                </Form.Label>
                                                                <p style={{
                                                                    fontSize: '12px'
                                                                }}>{existingTicketDetails.primaryMobileNo}</p>

                                                            </Form.Group>
                                                        </Col>
                                                    </Col>

                                                    <Col className="br">
                                                        <h2 style={{
                                                            fontSize: '16px',
                                                            textAlign: 'center'
                                                        }}>Assigned Service Center details</h2>
                                                        <Col style={{
                                                            gap: '20px',
                                                            justifyContent: 'center'


                                                        }} className="d-flex mt-3 p-0">
                                                            <Form.Group

                                                            >
                                                                <Form.Label>
                                                                    ASC Name
                                                                </Form.Label>
                                                                <p style={{
                                                                    fontSize: '12px'
                                                                }}>{existingTicketDetails.ascName}</p>
                                                                {/* <Form.Control className="border-0"
                                                        type="text"
                                                        value='Editior ASC'
                                                        readOnly

                                                        maxLength={15}
                                                    /> */}
                                                            </Form.Group>


                                                            <Form.Group

                                                            >
                                                                <Form.Label>
                                                                    Contact No
                                                                </Form.Label>
                                                                <p style={{
                                                                    fontSize: '12px'
                                                                }}>{existingTicketDetails.ascMobileNo}</p>
                                                                {/* <Form.Control className="border-0"
                                                        type="text"
                                                        value='5456765676'
                                                        readOnly

                                                        maxLength={15}
                                                    /> */}
                                                            </Form.Group>
                                                        </Col>
                                                    </Col>
                                                    <Col >
                                                        <h2 style={{
                                                            fontSize: '16px',
                                                            textAlign: 'center'
                                                        }}> CG Branch Area Service Manager</h2>
                                                        <Col className="d-flex mt-3 "
                                                            style={{
                                                                gap: '20px',
                                                                justifyContent: 'center'

                                                            }}
                                                        >
                                                            <Form.Group

                                                            >
                                                                <Form.Label>
                                                                    ASM  Name
                                                                </Form.Label>
                                                                <p style={{
                                                                    fontSize: '12px'
                                                                }}>{existingTicketDetails.asmName}</p>
                                                                {/* <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='GH23212'
                                                        readOnly

                                                    /> */}
                                                            </Form.Group>
                                                            <Form.Group

                                                            >
                                                                <Form.Label>
                                                                    Contact No
                                                                </Form.Label>
                                                                <p style={{
                                                                    fontSize: '12px'
                                                                }}>{existingTicketDetails.asmMobileNo}</p>
                                                                {/* <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='908789786'
                                                        readOnly

                                                    /> */}
                                                            </Form.Group>
                                                        </Col>
                                                    </Col>


                                                </Row>






                                            </Row>


                                        </Card>



                                    </Modal.Body>
                                    <Modal.Footer style={{
                                        justifyContent: 'center'
                                    }}>
                                        <Button variant="" className='add-Btn' onClick={handleCloseCustomerTic} >
                                            OK
                                        </Button>
                                    </Modal.Footer>

                                </Modal>
                                <Modal show={showRegistered} onHide={handleRegisteredClose} size="lg" centered >
                                    <Modal.Body>
                                        <p className="text-center"><IoAlertCircle color="orange" fontSize={22} /></p>
                                        {repeatedProducts.length !=0 && <p >Serial Number/s: {repeatedProducts.join(", ")} is already added in the list.</p>}
                                        {InvalidSerialNo.length !=0 && <p > Serial no / product code not matching, for Serial number/s: {InvalidSerialNo.join(", ")}</p>}
                                        {exstingTickets.length !=0 && <p> Service request is already raised for Serial number/s: {exstingTickets.join(", ")}</p>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="" className="add-Btn" onClick={handleRegisteredClose}>Ok</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Tab>


                            <Tab eventKey={'1'} >

                                <Row className="justify-content-start m-0">
                                    {/* <p className="m-0 text-left">
                                            <IoIosArrowRoundBack
                                                className="me-3"
                                                style={{ cursor: "pointer" }}
                                                fontSize={35}
                                                color="#005bab"
                                                onClick={() => setactiveTab((prev) => prev - 1)}

                                            />
                                            Back
                                        </p> */}








                                    <Row className="justify-content-center">
                                        <Row className="m-2"><p className="m-0"></p></Row>


                                        <Col lg={12} md={12}>
                                            <h2 style={{
                                                fontSize: '18px',
                                                color: '#005bab'
                                            }} className="text-left m-2">Confirmation of service request generation</h2>
                                            <Row className="mt-3"><p className="m-0">Please find below service request numbers against your products</p></Row>


                                            <Table responsive bordered className="mt-2">
                                                <thead>
                                                    <tr style={{
                                                        fontSize: '12px',
                                                        padding: '0px',
                                                        // textAlign: 'left'
                                                    }}>
                                                        {/* <th className="p-2 py-2">Type of complaint</th> */}
                                                        <th className="p-2 py-2">Serial No</th>
                                                        <th className="p-2 py-2">Product Code</th>
                                      
                                                        <th className="p-2 py-2">Type of complaint</th>
                                                        {/* <th className="p-2 py-2">Assigned ASC</th> */}
                                                        <th className="p-2 py-2">Service request No</th>
                                                        <th className="p-2 py-2">Assigned ASC </th>
                                                        <th className="p-2 py-2">Assigned ASM </th>

                                                       
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {dealerRaisedTicketDetails.map((obj) => {
                                                        return <tr key={obj.serviceTicketNumber}>
                                                            {/* <td><Form.Group className="mt-2">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="Companyname"
                                                                    value={obj.productLineName}
                                                                    readOnly
                                                                // onChange={handleChange}
                                                                />
                                                            </Form.Group></td> */}

                                                            <td>{obj.sernr}
                                                                
                                                            </td>
                                                            <td>{obj.productCode}
                                                                
                                                            </td>
                                                            

                                                            <td>{obj.defectDesc}
                                                                
                                                            </td>

                                                            <td>{obj.serviceTicketNumber}
                                                                
                                                            </td>



                                                            <td> {obj.ascName}
                                                               
                                                            </td>
                                                            <td>{obj.asmName} </td>
                                                            
                                                        </tr>
                                                    })} 

                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>






                                    {/* <Row style={{
                                        justifyContent: 'center'
                                    }} className="text-center mt-5">
                                        <p className="m-0">Service Center <strong>Aone Electrical's</strong> has been assigned.</p>
                                        <Row className="justify-content-center">
                                            <Col md={8}>

                                                <div className="d-flex justify-content-between">
                                                    <RiCheckboxBlankCircleFill color="#7bc143" />
                                                    <RiCheckboxBlankCircleFill color="#7bc143" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: '600'
                                        }}>Aone Electrical's</h3>
                                        <p>Mundhwa-khardi Rd, Mundhwa, Pune, Maharashtra</p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '20px',
                                            fontSize: '14px'
                                        }}>
                                            <div> <CiLocationOn fontSize={18}
                                                color="#005bab" />
                                                Get Direction</div>
                                            <div> <IoCallOutline fontSize={18}
                                                color="#005bab" /> 9897989879</div>

                                        </div>





                                    </Row> */}





                                </Row>

                                {/* <Row>
                        <Col><Button variant=""
                            className="add-Btn mb-3" onClick={() => {
                                navigate(`${pathName}/home`)
                            }}>Home Page</Button></Col>
                    </Row> */}



                            </Tab >



                        </Tabs >



                    {/* </Card> */}
                </Col >
            </Row >

            










        </>



    )
}

export default DealerSelfStockCallCenter