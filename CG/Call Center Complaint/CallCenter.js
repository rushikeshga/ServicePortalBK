import React, { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Spinner,
} from "react-bootstrap";
import { BiArrowBack, BiPlusCircle } from "react-icons/bi";
import Customer from "../../LMS/Customer Masters/Customer";
import moment from "moment";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePathName } from "../../../constants";
import Swal from "sweetalert2";
import Select from 'react-select';

import { useDebounce } from "use-debounce";
import { MaterialReactTable } from "material-react-table";
import { IoMdSave } from "react-icons/io";
import DealerSelfAndStock from "../Service Raise Ticket/DealerSelfStock";
import DealerSelfStockCallCenter from "./DealerSelfStockCallCenter";
import { IconButton, Tooltip } from "@mui/material";
import { IoTicket } from "react-icons/io5";
import { map } from "jquery";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { LineString } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import { ReactSearchAutocomplete } from "react-search-autocomplete";



const CallCenter = () => {
  const navigate = useNavigate();
  const pathName = usePathName();
  const [activeKey, setactiveKey] = useState("0");
  const [mobileNo, setMobileNo] = useState("");
  const [srNo, setSrNo] = useState("");
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

  const [selectedOption, setSelectedOption] = useState(null);

  const [loading, setloading] = useState(false);
  let RoleName = localStorage.getItem("RoleName");


  let token = localStorage.getItem("UserToken");
  const [showCustomer, setShowCustomer] = useState(false);
  const handleCloseCustomer = () => setShowCustomer(false);
  const handleShowCustomer = () => setShowCustomer(true);


  const [ticketSubmissionDetails, setticketSubmissionDetails] = useState([])


  const [showpg, setShowpg] = useState(false);

  const handleClosepg = () => setShowpg(false);
  const handleShowpg = () => setShowpg(true);
  const [showSelfStock, setShowSelfStock] = useState(false);

  const [showDeviation, setShowDeviation] = useState(false);

  const handleCloseDeviation = () => setShowDeviation(false);
  const handleShowDeviation = () => setShowDeviation(true);







  const [showExistingTicket, setshowExistingTicket] = useState(false);

  const [ticketDetails, setTicketDetails] = useState({});
  const [yourName, setYourName] = useState('')


















  function handleProdPinCodeChange(e) {
    handlePinCodeChange1(e);




    if (e.target.value.length == 6) {
      fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resPin) => resPin.json())
        .then((response) => {
          console.log("response");
          console.log(response);
          if (response.length != 0) {
            setdata((pre) => {
              return {
                ...pre,
                NearestPinCode: response[0]?.pinCode,
                NearestAscUserCode: response[0]?.userCode
              }
            })
          }



          // data.nearestAscUserCode =  resultingNearestASCs[0].userCode;
          // data.nearestPinCode = resultingNearestASCs[0].pinCode;
          if (response[0]?.pinCode == e.target.value) {
            // data.distance = "10";
            // console.log("distance" + data.distance);
            setdata((pre) => {
              return {
                ...pre,
                distance: '10',
                // NearestAscUserCode: response[0]?.userCode
              }
            })
            // return data;
          }
          else {
            calculateRoute(e.target.value, response[0]?.pinCode, data)
          }
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
              // addData.distance = distanceInKilometers.toString();
              setdata((pre) => {
                return {
                  ...pre,
                  distance: distanceInKilometers.toString(),
                  // NearestAscUserCode: response[0]?.userCode
                }
              })
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
              // return addData;

            } catch (error) {
              console.error('Error calculating route:', error);
              // addData.distance = "";
              // return addData;
            }
          }



        })
    }

    if (e.target.value && e.target.value?.length == 6) {
      fetch(
        `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value ? e.target.value : '0'}&Code=0`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0]);
          setdata((pre) => {
            return {
              ...pre,
              ProdInstallationStateId:
                result[0]?.parameterTypeId,
            };
          });

          // if(result[0]?.parameterTypeId)

          if (result[0] != undefined) {
            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
            fetch(cityUrl)
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setcities2(result);
              });
          }
        });

      fetch(
        `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value ? e.target.value : "0"}&Code=0`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0]);
          setdata((pre) => {
            return {
              ...pre,
              ProdInstallationCityId:
                result[0]?.parameterTypeId,
            };
          });





          //  setloading(true)
          // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result[0]?.parameterTypeId}&DivisionCode=${data?.DivCode}&Mode=${1}`)
          //               .then((res) => res.json())
          //               .then((resultingNearestASCs) => {
          //                 console.log(resultingNearestASCs);



          //                 // -------------------------------------------nearest pincode-------------------------------------


          //                 async function getCoordinates(pincode, country) {
          //                   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
          //                   const data = await response.json();
          //                   if (data.length > 0) {
          //                     return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
          //                   } else {
          //                     throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
          //                   }
          //                 }


          //                 const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


          //                 async function calculateRoute() {
          //                   // const inputPincode = document.getElementById('inputPincode').value;
          //                   // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes

          //                   try {
          //                     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes
          //                     const startCoords = await getCoordinates(e.target.value, 'IN');
          //                     console.log(startCoords);

          //                     let nearestPincode = "";
          //                     let shortestDistance = Infinity;

          //                     for (const pincode of pincodeArray) {
          //                       const endCoords = await getCoordinates(pincode, 'IN');

          //                       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

          //                       const response = await fetch(url);
          //                       const data = await response.json();

          //                       if (data.error) {
          //                         throw new Error(data.error.message);
          //                       }

          //                       const route = data.features[0];
          //                       const distanceInMeters = route.properties.summary.distance; // Distance in meters
          //                       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

          //                       if (distanceInKilometers < shortestDistance) {
          //                         shortestDistance = distanceInKilometers;
          //                         nearestPincode = pincode;
          //                       }
          //                     }

          //                     let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
          //                     console.log(obj);
          //                     if(shortestDistance == Infinity){
          //                       shortestDistance = "";
          //                     }
          //                     console.log("nearestPincode="+nearestPincode+" shortestDistance"+shortestDistance);
          //                     setdata((pre) => {
          //                        setloading(false);
          //                       return {
          //                         ...pre,
          //                         NearestPinCode: nearestPincode,
          //                         // NearestAscUserCode: obj[0]?.userCode,
          //                         // NearestAsmUserCode: "ASM",
          //                         shortestDistance : shortestDistance
          //                       }
          //                     })


          //                     // setdata((pre) => {
          //                     //   return {
          //                     //     ...pre,

          //                     //   }
          //                     // })
          //                     setNearestPincode(nearestPincode);
          //                     setDistance(shortestDistance);


          //                     // Display nearest route on map
          //                     // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
          //                     // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
          //                     // const routeResponse = await fetch(routeUrl);
          //                     // const routeData = await routeResponse.json();

          //                     // const nearestRoute = routeData.features[0];
          //                     // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
          //                     // const routeFeature = new Feature({
          //                     //   geometry: new LineString(coordinates),
          //                     // });
          //                     // const routeLayer = new VectorLayer({
          //                     //   source: new VectorSource({
          //                     //     features: [routeFeature],
          //                     //   }),
          //                     //   style: new Style({
          //                     //     stroke: new Stroke({
          //                     //       color: 'blue',
          //                     //       width: 2,
          //                     //     }),
          //                     //   }),
          //                     // });
          //                     // map.getLayers().forEach(layer => {
          //                     //   if (layer instanceof VectorLayer) {
          //                     //     map.removeLayer(layer);
          //                     //   }
          //                     // });
          //                     // map.addLayer(routeLayer);

          //                   } catch (error) {
          //                     console.error('Error calculating route:', error);
          //                     setDistance("");
          //                     setloading(false);
          //                   }
          //                 }




          //                 // Dummy functions to simulate React state setting
          //                 function setNearestPincode(pincode) {
          //                   if (document.getElementById('nearestPincode')) {

          //                     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


          //                     pincode = ""
          //                   }
          //                 }

          //                 function setDistance(distance) {
          //                   if (document.getElementById('distance')) {
          //                     setdata((pre) => {
          //                       return {
          //                         ...pre,
          //                         shortestDistance:distance,
          //                       };
          //                     });
          //                     document.getElementById('distance').textContent = `Distance: ${distance} km`;
          //                     distance = ""
          //                   }
          //                 }




          //                 calculateRoute()

          //               })




          //             // -------------------------------------------------ASM--------------------------------------------------









          //             fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result[0]?.parameterTypeId}&DivisionCode=${data?.DivCode}&Mode=${2}`)
          //               .then((res) => res.json())
          //               .then((resultingNearestASCs) => {
          //                 console.log(resultingNearestASCs);







          //                 // -------------------------------------------nearest pincode-------------------------------------








          //                 async function getCoordinates(pincode, country) {
          //                   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
          //                   const data = await response.json();
          //                   if (data.length > 0) {
          //                     return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
          //                   } else {
          //                     throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
          //                   }
          //                 }


          //                 const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


          //                 async function calculateRoute() {
          //                   // const inputPincode = document.getElementById('inputPincode').value;
          //                   // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
          //                   const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

          //                   try {
          //                     const startCoords = await getCoordinates(e.target.value, 'IN');
          //                     console.log(startCoords);

          //                     let nearestPincode = null;
          //                     let shortestDistance = Infinity;

          //                     for (const pincode of pincodeArray) {
          //                       const endCoords = await getCoordinates(pincode, 'IN');

          //                       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

          //                       const response = await fetch(url);
          //                       const data = await response.json();

          //                       if (data.error) {
          //                         throw new Error(data.error.message);
          //                       }

          //                       const route = data.features[0];
          //                       const distanceInMeters = route.properties.summary.distance; // Distance in meters
          //                       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

          //                       if (distanceInKilometers < shortestDistance) {
          //                         shortestDistance = distanceInKilometers;
          //                         nearestPincode = pincode;
          //                       }
          //                     }

          //                     let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
          //                     console.log(obj);
          //                     setdata((pre) => {
          //                       return {
          //                         ...pre,
          //                         // NearestPinCode: nearestPincode,
          //                         // NearestAscUserCode: obj[0]?.userCode,
          //                         NearestAsmUserCode: obj[0]?.userCode
          //                       }
          //                     })


          //                     // setdata((pre) => {
          //                     //   return {
          //                     //     ...pre,

          //                     //   }
          //                     // })
          //                     // setNearestPincode(nearestPincode);
          //                     // setDistance(shortestDistance);


          //                     // Display nearest route on map
          //                     // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
          //                     // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
          //                     // const routeResponse = await fetch(routeUrl);
          //                     // const routeData = await routeResponse.json();

          //                     // const nearestRoute = routeData.features[0];
          //                     // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
          //                     // const routeFeature = new Feature({
          //                     //   geometry: new LineString(coordinates),
          //                     // });
          //                     // const routeLayer = new VectorLayer({
          //                     //   source: new VectorSource({
          //                     //     features: [routeFeature],
          //                     //   }),
          //                     //   style: new Style({
          //                     //     stroke: new Stroke({
          //                     //       color: 'blue',
          //                     //       width: 2,
          //                     //     }),
          //                     //   }),
          //                     // });
          //                     // map.getLayers().forEach(layer => {
          //                     //   if (layer instanceof VectorLayer) {
          //                     //     map.removeLayer(layer);
          //                     //   }
          //                     // });
          //                     // map.addLayer(routeLayer);

          //                   } catch (error) {
          //                     console.error('Error calculating route:', error);
          //                     // setDistance(null);
          //                   }
          //                 setloading(false)

          //                 }




          //                 // Dummy functions to simulate React state setting
          //                 // function setNearestPincode(pincode) {
          //                 //   if(document.getElementById('nearestPincode')){

          //                 //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


          //                 //     pincode = ""
          //                 //   }
          //                 // }

          //                 // function setDistance(distance) {
          //                 //   if(document.getElementById('distance')){

          //                 //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
          //                 //     distance = ""
          //                 //   }
          //                 // }




          //                 calculateRoute()

          //               })
          // 
        });
    }
    else {
      setdata((pre) => {
        return {
          ...pre,
          ProdInstallationStateId: 0,
          ProdInstallationCityId: 0,
        };
      });
    }






















  }



  const handleShowExistingTicket = (msgCode) => {
    const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketById?ServiceTickeId=${msgCode}`;
    fetch(getProdDetailUrl, {
      headers: {
        // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
        "Authorization": `Bearer ${token}`
      },
    })

      .then((res) => res.json())
      .then((result) => {
        //localStorage.setItem("ticketDetails", JSON.stringify(result));
        let filterTicketBySerNo = result.filter((obj) => obj.sernr == data.SerialNo);
        setTicketDetails(filterTicketBySerNo[0]);
        console.log(filterTicketBySerNo);
      });
    setshowExistingTicket(true);

  };
  const handleCloseExistingTicket = () => setshowExistingTicket(false);

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [cities2, setcities2] = useState([]);

  const [customerType, setcustomerType] = useState([]);

  const [sources, setsources] = useState([])

  const [callModes, setcallModes] = useState([])



  const [sapProductCodes, setsapProductCodes] = useState([])











  useEffect(() => {




    fetch(
      `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=CustomerType`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setcustomerType(result);
      });




    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=TelecallerSource`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setsources(result)
      })





  }, []);

  const [serviceRequestTypee, setServiceRequestType] = useState([])
  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=33&Code=0`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setServiceRequestType(result)
      })





  }, [])

  const [distanceCalculated, setdistanceCalculated] = useState(false)



  const [data, setdata] = useState({
    ProdRegAutoId: 0,
    ServiceRequestTypeName: 'In Warranty',
    CustVerificationId: 0,
    CustomerName: "",
    ContactPerson: "",
    PrimaryMobileNo: "",
    EmailId: "",
    CustAddess: "",
    AltContactNo: "",
    AltEmailId: "",
    SiteAddress: "",
    PinId: "",
    CityId: 0,
    StateId: 0,
    NameOfSpoc: "",
    SpocMobileNo: "",
    SpocEmailId: "",
    callerName: '',
    Address1: "",
    Address2: "",
    ProdInstallationPinId: "",
    ProdInstallationCityId: 0,
    ProdInstallationStateId: 0,
    SerialNo: "",
    DivCode: "",
    divisionName: '',
    productLineName: '',
    ProductType: '',
    ProductCode: "",
    ProductDescription: "",
    PurchaseFrom: "",
    InvoiceDate: "",
    InvoiceNo: "",

    InvoceFilePath: "",
    InWarranty: false,

    ProductGroup: "",
    FrameSize: "",
    Voltage: "",
    Pole: "",
    Kva: "",


    HP: "",
    Efficiency: "",
    Flp: "",
    IsDeviation: false,
    BatchStartDate: "",
    BatchEndDate: "",
    IsActive: true,
    DefectId: "",
    Remarks: "",
    RedirectingFrom: "RaiseServiceTicket",
    sameAsFirmDetails: 0,
    NearestPinCode: "",
    NearestAscUserCode: "",
    NearestAsmUserCode: "",
    UserCode: "",
    TicketCreateName: "",
    TicketCreateNumber: "",
    UserType: "",
    DealerCode: "",
    RetailerCode: "",
    OEMCode: "",
    CallModeId: 0,
    IsPriority: "",
    SourceId: 142,
    ComplaintType: "",
    RequestType: "",
    AssignAgent: "",
    distance: "",
    Isreceived: 0,
    ManufacturingDate: "",
    DateOfDispatch: ""
    // NearestPinCode:"",
  });



  const [selectedNature, setselectedNature] = useState("")


  console.log(data);

  const [debouncedValue] = useDebounce(data?.SerialNo, 1000);


  const [ASCs, setASCs] = useState([])

  const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=3&Id=0&Code=0`;

  useEffect(() => {
    fetch(stateUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result);
      });




  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}Asc/GetProductlineWiseASC?ProductlineCode=${0}`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setASCs(result)
  //     })





  // }, [])


  const handleMobileChange = (e) => {
    setMobileNo(e.target.value);


  };
  const [yourContactDetails, setYourCntactDetails] = useState('')

  const handleMobileChangeDealer = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setYourCntactDetails(value);
    if ((!validateMobile(value) && value != "") || parseInt(value).toString().length < 10) {
      setMobileErrorDealer('Invalid mobile number');
    } else {
      setMobileErrorDealer('');
    }
  }

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");



  const handleSerailNoChange = (e) => {
    const value = e.target.value;

    setSrNo(value);

    console.log(e.target.value)

    if (value.length === 0) {
      setinfolog([]);
    }
    setdata((pre) => {
      return {
        ...pre,
        SerialNo: value
      }
    })



    // const regex = /^[a-zA-Z0-9\-\/]*$/;
    // if (regex.test(e.target.value) || e.target.value === "") {
    //   setdata((pre) => {
    //     return {
    //       ...pre,
    //       SerialNo: e.target.value
    //     }
    //   })
    //   setErrorMessage("");
    // } else {
    //   setErrorMessage(
    //     "Only alphabets, digits, hyphen (-), and slash (/) are allowed."
    //   );
    // }





  };


  const handleChangeProductCode = (event) => {
    const { value } = event.target;
    localStorage.setItem("ProductValue", value); // Set the actual value
    // Regular expression to allow alphabets, digits, hyphen (-), and slash (/)

  };



  useEffect(() => {
    const getproductCodesUrl = `${process.env.REACT_APP_API_URL}Product/GetAllProduct?DivisionCode=${data?.DivCode}&ProductLineCode=${data?.ProductType}&ProductGroupCode=${data?.ProductGroup}`;
    fetch(getproductCodesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('ssssss---', result);
        setsapProductCodes(result)
      })



  }, [data?.DivCode && data?.ProductType && data?.ProductGroup])

  const CustomerInfo = [
    {
      companyName: "Test",
      ContactPersonName: "Ashutosh",
      ticstatus: 'progress',

      MobileNo: "8888888888",
      emailId: "ashu@hmail.com",
      address: "Mumbai Mahashtra",
      PinCode: "400001",
      state: "Maharashtra",
      City: "Mumbai",
      productSerialNo: "UCAM6431",
      division: "LT Motor",
      productType: "M3-M1 Motors(M3)",
      productModel: "160TEFC",
      invoiceNo: "CG6757",
      invoiceDate: "19/06/2024",
      batchNo: "2",
      voltage: "9.7",
      Frame: "12",
      pole: "6",
      Issu: "Product Shoutdown",
      status: "1",
    },
    {
      companyName: "Test 2",
      ContactPersonName: "Sachin",
      ticstatus: 'open',

      MobileNo: "7777777777",
      emailId: "sachin@hmail.com",
      address: "Kalyan Mahashtra",
      PinCode: "400001",
      state: "Maharashtra",
      City: "Mumbai",
      productSerialNo: "UCAM6439",
      division: "LT Motor",
      productType: "M3-M1 Motors(M3)",
      productModel: "160TEFC",
      invoiceNo: "CG6758",
      invoiceDate: "01/06/2024",
      batchNo: "2",
      voltage: "9.7",
      pole: "6",
      // issue:''
      Frame: "18",
      Issu: "transits damage",
      status: "0",
    },
  ];
  const productInfo = [
    {
      ContactPersonName: "Hunney",
      MobileNo: "11111111111",
      ticstatus: 'progress',

      emailId: "honey@hmail.com",
      address: "Mumbai Mahashtra",
      PinCode: "400062",
      state: "Mahashtra",
      City: "Mumbai",
      productSerialNo: "XAMM6431",
      division: "LT Motor",
      productType: "M3-M1 Motors(M3)",
      productModel: "160TEFC",
      invoiceNo: "CG6757",
      invoiceDate: "19/06/2024",
      batchNo: "2",
      voltage: "9.7",
      Frame: "12",
      pole: "6",
      Issu: "Product Shoutdown",
      status: "0",
    },
    {
      productSerialNo: "XZMM6431",
      ticstatus: 'open',
      division: "LT Motor",
      productType: "M3-M1 Motors(M3)",
      productModel: "160TEFC",
      invoiceNo: "CG6757",
      invoiceDate: "12/06/2024",
      batchNo: "2",
      voltage: "9.7",
      Frame: "12",
      pole: "6",
      Issu: "Product Shoutdown",
      status: "1",
    },
  ];
  const [showError, setShowError] = useState(false);
  const [showDealerCode, setShowDealerCode] = useState(true);
  const [validDealer, setValidDealer] = useState(false);
  const [showProductType, setShowProductType] = useState(false);

  // const [dealername, setDealername] = useState([])
  // useEffect(() => {
  //   const getAllDealer = `${process.env.REACT_APP_API_URL}Dealer/GetAllDealer`;
  //   fetch(getAllDealer, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result);
  //       setDealername(result);
  //     });
  // }, [token]);

  const formatResult = (item) => (
    <span style={{ display: 'block', textAlign: 'left' }}>{item.dealerName}</span>
  );

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    // setSelectedSpare(item);
    if (data?.UserType == "136") {
      setdata((pre) => {
        return {
          ...pre,
          OEMCode: item.dealerCode
        }
      })
    }
    else if (data?.UserType == "137") {
      setdata((pre) => {
        return {
          ...pre,
          DealerCode: item.dealerCode
        }
      })
    }
    else {
      setdata((pre) => {
        return {
          ...pre,
          UserCode: item.dealerCode
        }
      })
    }
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };


  const verifyDealer = () => {
    if (data?.UserType == "136" && data.OEMCode.trim() === '') {
      setShowError('Please fill the field');
    }
    if (data?.UserType == "137" && data.DealerCode.trim() === '') {
      setShowError('Please fill the field');
      // setShowDealerCode(false);

    } else {
      let code = data?.UserType == "136" ? data.OEMCode.trim() : data.DealerCode.trim();
      fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerByCode?DealerCode=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          localStorage.setItem("DealerOrOEMCode", code);
          localStorage.setItem("DealerOrOEMName", result?.dealerName)
          localStorage.setItem("DealerOrOEMAdd", result?.address)
          localStorage.setItem("DealerDetails", JSON.stringify(result));
          console.log(result);
          if (result?.msg === 'NOTEXISTS') {
            let codeType = data?.UserType == "136" ? "OEM" : "Dealer";
            Swal.fire({
              icon: 'error',
              title: codeType + ' Code  does not exists!'
            })


          }

          else if (result.status != 404) {
            setValidDealer(true);
            setShowDealerCode(false);
            setShowError(false);
            setShowProductType(false);
            setShowDealerDetails(true);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: result?.title
            })
          }
          // setDealerOrOEMInfo(result)
        })

    }
  }
  const HandleNextDealer = () => {
    if (!yourName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Your Name"
      });
      return;
    }
    if (!yourContactDetails.trim()) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Your contact no"
      });
      return;
    }
    localStorage.setItem("TicketCreateName", yourName);
    localStorage.setItem("TicketCreateNumber", yourContactDetails);
    console.log(data.RequestType);
    if (data.RequestType == "Customer") {
      setShowProductType(true);
    }
    else {
      setShowSelfStock(true);
      setShowProductType(false);
    }
    setShowDealerCode(false)
    setValidDealer(false);
  };
  const [addInfo, setaddInfo] = useState({
    companyName: "",
    ContactPersonName: "",
    MobileNo: "",
    emailId: "",
    address: "",
    PinCode: "",
    state: "",
    City: "",
    SPOCName: "",
    SPOCMobile: "",
    SPOCEmail: "",
    SPOCAddress: "",
    SPOCPincode: "",
    SPOCState: "",
    SPOCCity: "",
    productSerialNo: "",
    division: "",
    productType: "",
    productModel: "",
    invoiceNo: "",
    invoiceDate: "",
    batchNo: "",
    voltage: "",
    pole: "",
    Frame: "",
    Issu: "",
    sameAsFirmDetails: 0,
    status: "",
    DefectId: "",
  });

  const [allDivisions, setallDivisions] = useState([]);

  const [allproductGroup, setallproductGroup] = useState([])
  const [allproductLines, setallproductLines] = useState([])

  const [productType, setproductType] = useState([]);
  const [showDealerDetails, setShowDealerDetails] = useState(false);
  const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;
  let DealerDetails = JSON.parse(localStorage.getItem("DealerDetails"));
  useEffect(() => {

    fetch(getAllDivisions, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result);
      });
  }, []);

  const [minInvoiceDate, setMinInvoiceDate] = useState('');
  const customerhandleChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setdata(newdata);


    console.log("-------------changing data----");

    console.log(newdata);
  };



  const [infolog, setinfolog] = useState([]);

  console.log(infolog, '----------------')





  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // let infolog = CustomerInfo?.filter((info, i) => info?.MobileNo === mobileNo);
  //   if (!mobileNo) {
  //     alert(`Enter Mobine No`);
  //   } else {
  //     fetch(
  //       `${process.env.REACT_APP_API_URL
  //       }TelecallerServiceTicket/GetTelecallerProdSerialNo?SerialNo=${srNo}&MobileNo=${mobileNo}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         setinfolog(result);



  //         if (result?.msg == "Service Ticket Available") {


  //           handleShowExistingTicket(result?.msgCode);
  //           // setloading(false)

  //         }

  //         else {


  //           if (result?.prodInstallationCityId) {


  //             // -----------------------------------------------------------Nearest Pinocde,ASc,Asm-------------------------------------



  //             fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${1}`)
  //               .then((res) => res.json())
  //               .then((resultingNearestASCs) => {
  //                 console.log(resultingNearestASCs);







  //                 // -------------------------------------------nearest pincode-------------------------------------








  //                 async function getCoordinates(pincode, country) {
  //                   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
  //                   const data = await response.json();
  //                   if (data.length > 0) {
  //                     return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
  //                   } else {
  //                     throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
  //                   }
  //                 }


  //                 const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


  //                 async function calculateRoute() {
  //                   // const inputPincode = document.getElementById('inputPincode').value;
  //                   // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
  //                   const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

  //                   try {
  //                     const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
  //                     console.log(startCoords);

  //                     let nearestPincode = null;
  //                     let shortestDistance = Infinity;

  //                     for (const pincode of pincodeArray) {
  //                       const endCoords = await getCoordinates(pincode, 'IN');

  //                       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

  //                       const response = await fetch(url);
  //                       const data = await response.json();

  //                       if (data.error) {
  //                         throw new Error(data.error.message);
  //                       }

  //                       const route = data.features[0];
  //                       const distanceInMeters = route.properties.summary.distance; // Distance in meters
  //                       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

  //                       if (distanceInKilometers < shortestDistance) {
  //                         shortestDistance = distanceInKilometers;
  //                         nearestPincode = pincode;
  //                       }
  //                     }

  //                     let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
  //                     console.log(obj);
  //                     setdata((pre) => {
  //                       return {
  //                         ...pre,
  //                         NearestPinCode: nearestPincode,
  //                         NearestAscUserCode: obj[0]?.userCode,
  //                         NearestAsmUserCode: "ASM"
  //                       }
  //                     })


  //                     // setdata((pre) => {
  //                     //   return {
  //                     //     ...pre,

  //                     //   }
  //                     // })
  //                     setNearestPincode(nearestPincode);
  //                     setDistance(shortestDistance);


  //                     // Display nearest route on map
  //                     // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
  //                     // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
  //                     // const routeResponse = await fetch(routeUrl);
  //                     // const routeData = await routeResponse.json();

  //                     // const nearestRoute = routeData.features[0];
  //                     // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
  //                     // const routeFeature = new Feature({
  //                     //   geometry: new LineString(coordinates),
  //                     // });
  //                     // const routeLayer = new VectorLayer({
  //                     //   source: new VectorSource({
  //                     //     features: [routeFeature],
  //                     //   }),
  //                     //   style: new Style({
  //                     //     stroke: new Stroke({
  //                     //       color: 'blue',
  //                     //       width: 2,
  //                     //     }),
  //                     //   }),
  //                     // });
  //                     // map.getLayers().forEach(layer => {
  //                     //   if (layer instanceof VectorLayer) {
  //                     //     map.removeLayer(layer);
  //                     //   }
  //                     // });
  //                     // map.addLayer(routeLayer);

  //                   } catch (error) {
  //                     console.error('Error calculating route:', error);
  //                     setDistance(null);
  //                   }
  //                 }




  //                 // Dummy functions to simulate React state setting
  //                 function setNearestPincode(pincode) {
  //                   if (document.getElementById('nearestPincode')) {

  //                     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


  //                     pincode = ""
  //                   }
  //                 }

  //                 function setDistance(distance) {
  //                   if (document.getElementById('distance')) {

  //                     document.getElementById('distance').textContent = `Distance: ${distance} km`;
  //                     distance = ""
  //                   }
  //                 }




  //                 calculateRoute()

  //               })




  //             // -------------------------------------------------ASM--------------------------------------------------





  //             fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${2}`)
  //               .then((res) => res.json())
  //               .then((resultingNearestASCs) => {
  //                 console.log(resultingNearestASCs);







  //                 // -------------------------------------------nearest pincode-------------------------------------








  //                 async function getCoordinates(pincode, country) {
  //                   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
  //                   const data = await response.json();
  //                   if (data.length > 0) {
  //                     return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
  //                   } else {
  //                     throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
  //                   }
  //                 }


  //                 const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


  //                 async function calculateRoute() {
  //                   // const inputPincode = document.getElementById('inputPincode').value;
  //                   // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
  //                   const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

  //                   try {
  //                     const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
  //                     console.log(startCoords);

  //                     let nearestPincode = null;
  //                     let shortestDistance = Infinity;

  //                     for (const pincode of pincodeArray) {
  //                       const endCoords = await getCoordinates(pincode, 'IN');

  //                       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

  //                       const response = await fetch(url);
  //                       const data = await response.json();

  //                       if (data.error) {
  //                         throw new Error(data.error.message);
  //                       }

  //                       const route = data.features[0];
  //                       const distanceInMeters = route.properties.summary.distance; // Distance in meters
  //                       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

  //                       if (distanceInKilometers < shortestDistance) {
  //                         shortestDistance = distanceInKilometers;
  //                         nearestPincode = pincode;
  //                       }
  //                     }

  //                     let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
  //                     console.log(obj);
  //                     setdata((pre) => {
  //                       return {
  //                         ...pre,
  //                         // NearestPinCode: nearestPincode,
  //                         // NearestAscUserCode: obj[0]?.userCode,
  //                         NearestAsmUserCode: obj[0]?.userCode
  //                       }
  //                     })


  //                     // setdata((pre) => {
  //                     //   return {
  //                     //     ...pre,

  //                     //   }
  //                     // })
  //                     // setNearestPincode(nearestPincode);
  //                     // setDistance(shortestDistance);


  //                     // Display nearest route on map
  //                     // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
  //                     // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
  //                     // const routeResponse = await fetch(routeUrl);
  //                     // const routeData = await routeResponse.json();

  //                     // const nearestRoute = routeData.features[0];
  //                     // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
  //                     // const routeFeature = new Feature({
  //                     //   geometry: new LineString(coordinates),
  //                     // });
  //                     // const routeLayer = new VectorLayer({
  //                     //   source: new VectorSource({
  //                     //     features: [routeFeature],
  //                     //   }),
  //                     //   style: new Style({
  //                     //     stroke: new Stroke({
  //                     //       color: 'blue',
  //                     //       width: 2,
  //                     //     }),
  //                     //   }),
  //                     // });
  //                     // map.getLayers().forEach(layer => {
  //                     //   if (layer instanceof VectorLayer) {
  //                     //     map.removeLayer(layer);
  //                     //   }
  //                     // });
  //                     // map.addLayer(routeLayer);

  //                   } catch (error) {
  //                     console.error('Error calculating route:', error);
  //                     // setDistance(null);
  //                   }
  //                   setloading(false)

  //                 }




  //                 // Dummy functions to simulate React state setting
  //                 // function setNearestPincode(pincode) {
  //                 //   if(document.getElementById('nearestPincode')){

  //                 //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


  //                 //     pincode = ""
  //                 //   }
  //                 // }

  //                 // function setDistance(distance) {
  //                 //   if(document.getElementById('distance')){

  //                 //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
  //                 //     distance = ""
  //                 //   }
  //                 // }




  //                 calculateRoute()

  //               })




  //           }




  //           // -------------------------------------------------------------------------------------------------------------------------





  //           // else  {
  //           //     // alert(`No customer info found for MobileNo ${mobileNo}`);

  //           //     setaddInfo((prev) => ({
  //           //         ...prev,
  //           //         ContactPersonName: '',
  //           //         MobileNo: '',
  //           //         emailId: '',
  //           //         address: '',
  //           //         PinCode: '',
  //           //         state: '',
  //           //         City: '',
  //           //         productSerialNo: '',
  //           //         division: '',
  //           //         productType: '',
  //           //         productModel: '',
  //           //         invoiceNo: '',
  //           //         invoiceDate: '',
  //           //         batchNo: '',
  //           //         voltage: '',
  //           //         pole: '',
  //           //         status: ''
  //           //     }));
  //           //     return;
  //           // }

  //           setactiveKey("1");

  //           if (result?.msgCode != "SP404") {

  //             if (srNo != "") {


  //               setdata((prev) => {
  //                 return {
  //                   ...prev,
  //                   ProdRegAutoId: result?.prodRegAutoId,
  //                   CustVerificationId: result?.custVerificationId,
  //                   CustomerName: result?.customerName || "",
  //                   ContactPerson: result?.contactPerson || "",
  //                   PrimaryMobileNo: result?.primaryMobileNo || "",
  //                   EmailId: result?.emailId || "",
  //                   AltContactNo: result?.altContactNo,
  //                   AltEmailId: result?.altEmailId,
  //                   Address1: result?.address1,
  //                   PinId: result?.pinId,
  //                   StateId: result?.stateId,
  //                   CityId: result?.cityId,
  //                   NameOfSpoc: result?.nameOfSpoc,
  //                   SpocMobileNo: result?.spocMobileNo,
  //                   SpocEmailId: result?.spocMobileNo,
  //                   SiteAddress: result?.siteAddress,
  //                   ProdInstallationPinId: result?.prodInstallationPinCode,
  //                   ProdInstallationStateId: result?.prodInstallationStateId,
  //                   ProdInstallationCityId: result?.prodInstallationCityId,
  //                   SerialNo: result?.serialNo,
  //                   DivCode: result?.divCode,
  //                   ProductType: result?.productType.substring(0, 10),
  //                   ProductCode: result?.productCode,
  //                   PurchaseFrom: result?.purchaseFrom,
  //                   InvoiceNo: result?.invoiceNo,
  //                   InvoiceDate: result?.invoiceDate?.split(" ")[0],
  //                   InvoceFilePath: result?.invoceFilePath,
  //                   FrameSize: result?.frameSize,
  //                   Voltage: result?.voltage,
  //                   Pole: result?.pole,
  //                   InWarranty: result?.inWarranty == "In Warranty" ? true : false,
  //                   ProductDescription: result?.productDescription
  //                   // DefectId: result?.defectId,
  //                 };
  //               });
  //               setMobileNo(result?.primaryMobileNo)

  //             }
  //             else {
  //               setdata((prev) => {
  //                 return {
  //                   ...prev,
  //                   ProdRegAutoId: result?.prodRegAutoId,
  //                   CustVerificationId: result?.custVerificationId,
  //                   CustomerName: result?.customerName || "",
  //                   ContactPerson: result?.contactPerson || "",
  //                   PrimaryMobileNo: result?.primaryMobileNo || "",
  //                   EmailId: result?.emailId || "",
  //                   AltContactNo: result?.altContactNo,
  //                   AltEmailId: result?.altEmailId,
  //                   Address1: result?.address1,
  //                   PinId: result?.pinId,
  //                   StateId: result?.stateId,
  //                   CityId: result?.cityId,
  //                   NameOfSpoc: result?.nameOfSpoc,
  //                   SpocMobileNo: result?.spocMobileNo,
  //                   SpocEmailId: result?.spocMobileNo,
  //                   SiteAddress: result?.siteAddress,
  //                   ProdInstallationPinId: result?.prodInstallationPinCode,
  //                   ProdInstallationStateId: result?.prodInstallationStateId,
  //                   ProdInstallationCityId: result?.prodInstallationCityId,
  //                   // SerialNo: result?.serialNo,
  //                   // DivCode: result?.divCode,
  //                   // ProductType: result?.productType,
  //                   // ProductCode: result?.productCode,
  //                   // PurchaseFrom: result?.purchaseFrom,
  //                   // InvoiceNo: result?.invoiceNo,
  //                   // InvoiceDate: result?.invoiceDate?.split(" ")[0],
  //                   // InvoceFilePath: result?.invoceFilePath,
  //                   // FrameSize: result?.frameSize,
  //                   // Voltage: result?.voltage,
  //                   // Pole: result?.pole,
  //                   // InWarranty: result?.inWarranty,
  //                   // DefectId: result?.defectId,
  //                 };
  //               });
  //             }






  //             if (
  //               data?.NameOfSpoc == data?.ContactPerson &&
  //               data?.SpocMobileNo == data?.PrimaryMobileNo &&
  //               data?.SpocEmailId == data?.EmailId &&
  //               data?.SiteAddress == data?.Address1 &&
  //               data?.ProdInstallationPinId == data?.PinId &&
  //               data?.ProdInstallationStateId == data?.StateId &&
  //               data?.ProdInstallationCityId == data?.CityId
  //             ) {
  //               setdata((pre) => {
  //                 return {
  //                   ...pre,
  //                   sameAsFirmDetails: 1,
  //                 };
  //               });
  //             }
  //             else {
  //               setdata((pre) => {
  //                 return {
  //                   ...pre,
  //                   sameAsFirmDetails: 0,
  //                 };
  //               });
  //             }



  //             fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllDivisionWiseProductLine?divisionCode=${result?.divCode}`, {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             })
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 console.log(result);
  //                 setproductType(result);
  //               });



  //             fetch(
  //               `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${result?.productLineCode}`, {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //             )
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 console.log(result);
  //                 setdefectsByPL(result);
  //               });


  //           }


  //           if (result?.stateId) {

  //             const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result.stateId}&Code=0`;
  //             fetch(cityUrl)
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 console.log(result);
  //                 setcities(result);
  //               });
  //           }


  //           if (result?.prodInstallationStateId) {

  //             const cityUrl2 = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.prodInstallationStateId}&Code=0`;
  //             fetch(cityUrl2)
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 console.log(result);
  //                 setcities2(result);
  //               });
  //           }

  //           // setMobileNo('')


  //         }

  //       });


  //   }
  // };

  const [selectedRole, setSelectedRole] = useState("");
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update selectedRole state on role selection change
  };

  const Custtype = {
    Customer: "Customer",
    Dealer: "Dealer",
    OEM: "OEM",
    Retailer: "Retailer",
  };

  const [defectsByPL, setdefectsByPL] = useState([]);

  useEffect(() => {
    // if(productDetails){
    // }
  }, []);

  const [emailError, setEmailError] = useState("");
  const [emailError1, setEmailError1] = useState("");
  const [emailError2, setEmailError2] = useState("");
  const [mobileErrorVerify, setMobileErrorVerify] = useState("");
  const [mobileErrorDealer, setMobileErrorDealer] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [mobileError1, setMobileError1] = useState("");
  const [mobileError2, setMobileError2] = useState("");
  const [pinError, setpinError] = useState("");
  const [pinError1, setpinError1] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        EmailId: value,
      };
    });
    if (!validateEmail(value) && value != "") {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange1 = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        AltEmailId: value,
      };
    });
    if (!validateEmail(value) && value != "") {
      setEmailError1("Invalid email format");
    } else {
      setEmailError1("");
    }
  };

  const handleEmailChange2 = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        SpocEmailId: value,
      };
    });
    if (!validateEmail(value) && value != "") {
      setEmailError2("Invalid email format");
    } else {
      setEmailError2("");
    }
  };

  const validateMobile = (mobile) => {
    // Basic mobile number validation regex
    const regex = /^[5-9]{1}[0-9]{9}$/;
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



  const handleMobileChangeVerify = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (value.startsWith('0')) {
      value = value.slice(1); // Remove the leading zero
    }
    e.target.value = value;

    setMobileNo(e.target.value)
    if ((!validateMobile(e.target.value) && e.target.value != "") || parseInt(e.target.value).toString().length < 10) {
      setMobileErrorVerify("Invalid mobile number");
    } else {
      setMobileErrorVerify("");
    }
  };

  const handleMobileChange0 = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (value.startsWith('0')) {
      value = value.slice(1); // Remove the leading zero
    }
    e.target.value = value;
    setdata((pre) => {
      return {
        ...pre,
        AltContactNo: e.target.value,
      };
    });
    if (!validateMobile(e.target.value) && e.target.value != "") {
      setMobileError("Invalid mobile number");
    } else {
      setMobileError("");
    }
  };

  let handleMobileChange1 = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (value.startsWith('0')) {
      value = value.slice(1); // Remove the leading zero
    }
    e.target.value = value;
    setdata((pre) => {
      return {
        ...pre,
        SpocMobileNo: e.target.value,
      };
    });
    if (!validateMobile(e.target.value) && e.target.value != "") {
      setMobileError1("Invalid mobile number");
    } else {
      setMobileError1("");
    }
  };

  const handleMobileChange2 = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (value.startsWith('0')) {
      value = value.slice(1); // Remove the leading zero
    }
    e.target.value = value;
    setdata((pre) => {
      return {
        ...pre,
        PrimaryMobileNo: e.target.value,
      };
    });
    if (!validateMobile(e.target.value) && e.target.value != "") {
      setMobileError2("Invalid mobile number");
    } else {
      setMobileError2("");
    }
  };
  // const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setprodType(true)
    // setShowForm(value !== ''); // Show the form field if an option is selected
    // handleBlur(event)
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
    setdata((pre) => {
      return {
        ...pre,
        PinId: e.target.value,
      };
    });
    if (!validatePincode(e.target.value) && e.target.value != "") {
      setpinError("Invalid PinCode. It must be 6 digits only");
    } else {
      setpinError("");
    }
  };




  const handlePinCodeChange1 = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
    setdata((pre) => {
      return {
        ...pre,
        ProdInstallationPinId: e.target.value,
      };
    });
    if (!validatePincode(e.target.value) && e.target.value != "") {
      setpinError1("Invalid PinCode. It must be 6 digits only");
    } else {
      setpinError1("");
    }
  };


  const [complaintTypes, setcomplaintTypes] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=ServiceClaimType`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setcomplaintTypes(result)
      })
  }, [])


  const [callingNumber, setcallingNumber] = useState("")

  const [prodType, setprodType] = useState("")

  const [ProductList, setProductList] = useState([])

  const [productDisivion, setProductDisivion] = useState([])
  const [showForm, setShowForm] = useState(false);



  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "Division/GetAllProductType")
      .then(res => res.json())
      .then(result => {
        setProductDisivion(result);
        console.log(result)
      });
  }, []);

  const handleShowExistingTickett = (msgCode) => {
    const getProdDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketById?ServiceTickeId=${msgCode}`;
    fetch(getProdDetailUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //localStorage.setItem("ticketDetails", JSON.stringify(result));
        setTicketDetails(result[0]);
        console.log(result);
      });
    setshowExistingTicket(true);

  }

  useEffect(() => {
    if (data?.DivCode) {  // Ensure divisionCode is available before making the request
      fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllDivisionWiseProductLine?divisionCode=${data.DivCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setproductType(result);
        });
    }
  }, [data?.DivCode, token]);  // Dependency array includes `data.divisionCode` and `token`

  useEffect(() => {
    if (data?.ProductType) {  // Ensure productLineCode is available before making the request
      fetch(`${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${data.productLineName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);



          setdefectsByPL(result);

        });
    }
  }, [data?.productLineName, token]);  // Dependency array includes `data.productLineCode` and `token`




  const columns =
    useMemo(
      () => [

        {
          accessorKey: "customerName",
          header: "List of registered product",


          Cell: ({ cell }) => {
            let cellData = cell.row.original;
            console.log(cellData)

            return (
              <>




                <div className="listCard p-1">

                  <p className='ticketInfoLabel m-0'>Serail No: <span className='ticketInfoData'>{cellData?.serialNo}</span></p>
                  <p className='ticketInfoLabel m-0'>Product Code: <span className='ticketInfoData'>{cellData?.productCode ? cellData?.productCode : "-"}</span></p>
                  <p className='ticketInfoLabel m-0'>Ticket Status: <span className='ticketInfoData'>{cellData?.ticstatus ? cellData?.ticstatus : "-"}</span></p>




                  <p className='ticketInfoLabel m-0'>Customer/Firm Name: <span className='ticketInfoData'>{cellData?.customerName}</span></p>
                  <p className='ticketInfoLabel m-0'>Contact person name: <span className='ticketInfoData'>{cellData?.contactPerson ? cellData?.contactPerson : "-"}</span></p>

                  <p className='ticketInfoLabel m-0'>Primary Mobile No: <span className='ticketInfoData'>{cellData?.contactPerson ? cellData?.primaryMobileNo : "-"}</span></p>



                  <p className='ticketInfoLabel m-0'>Email id: <span className='ticketInfoData'>{cellData?.emailId ? cellData?.emailId : "-"}</span></p>
                  <p className='ticketInfoLabel m-0'>Alternate Contact No: <span className='ticketInfoData'>{cellData?.siteAddress ? cellData?.siteAddress : "-"}</span></p>

                  <p className='ticketInfoLabel m-0'>Alternate email id: <span className='ticketInfoData'>{cellData?.altEmailId ? cellData?.altEmailId : "-"}</span></p>
                  {/* <p className='ticketInfoLabel m-0'>Pin Code: <span className='ticketInfoData'>{cellData?.PinCode ? cellData?.PinCode : "-"}</span></p>
                    <p className='ticketInfoLabel m-0'>State: <span className='ticketInfoData'>{cellData?.stateName ? cellData?.stateName : "-"}</span></p>
                    <p className='ticketInfoLabel m-0'>City: <span className='ticketInfoData'>{cellData?.cityName ? cellData?.cityName : "-"}</span></p> */}


                  <p className='ticketInfoLabel m-0'>Address: <span className='ticketInfoData'>{cellData?.siteAddress ? cellData?.siteAddress : "-"}</span></p>
                  <p className='ticketInfoLabel m-0'>Warranty Status: <span style={{
                    color: `${cellData?.warrantyStatus == "In Warranty" ? "green" : cellData?.warrantyStatus == "Out Of Warranty" ? "red" : cellData?.warrantyStatus == "In progress" ? "orange" : ""}`
                  }}>{cellData?.warrantyStatus == "In Warranty" ? "IW" : cellData?.warrantyStatus == "Out Of Warranty" ? "OOW" : cellData?.warrantyStatus == "In progress" ? "IP" : ""}</span></p>
                </div>


              </>
            )
          }
        },


        {
          accessorKey: "isAcknowledgment",
          header: "Action",
          Cell: ({ cell }) => {
            let value = cell.getValue();
            console.log(cell.row.original.serviceTicketId, '----------------------roww')
            return (
              <p className='m-auto p-2 text-center'
              // className={`text-center m-0 ${value == "Acknowledgement"
              //     ? "OOWStatus"
              //     : value == "Acknowledged"
              //         ? "WStatus"
              //         : ""
              //     }`}
              >
                <Tooltip arrow placement="left" title="Create ticket">
                  <IconButton
                    onClick={(e) => {
                      handleShowExistingTickett(cell.row.original.serviceTicketId);
                    }}




                  >
                    <IoTicket color='#005bab' />
                  </IconButton>
                </Tooltip>
              </p >
            );
          },

        },







      ]
    );

  const fixedColumnWidths = {
    customerName: '100%',
    // assignTech: '100px',

  };

  // --------------------------division wise prodectline select
  const [productGroupInsert, setproductGroupInsert] = useState({
    productGroupId: 0,
    productLineCode: "",
    divisionCode: "",
    productGroupCode: "",
    productLineName: '',
    productGroupName: "",
    productGroupDesc: "",
    isActive: true
  })

  console.log(productGroupInsert)
  const [divisions, setdivisions] = useState([])
  const [prodctLines, setproductLines] = useState([])
  const handleChange = (e) => {
    const newdata = { ...productGroupInsert };
    newdata[e.target.name] = e.target.value;
    setproductGroupInsert(newdata);
    console.log(newdata);
  }

  const ALLDivision = () => {
    const getAllDivisionsUrl = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;

    fetch(getAllDivisionsUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let filterResults;
        if (RoleName == "AS8") {
          filterResults = result.filter(obj => (obj.divisionCode == "DR" || obj.divisionCode == "M7"));
          setdivisions(filterResults)
        }
        else {
          setdivisions(result)
        }

      })


  }

  useEffect(() => {
    ALLDivision()
  }, [data?.DivCode])

  const ServiceRequestType = {
    InWarranty: "In Warranty",
    Outofwarranty: "Out of warranty",
    Installation: "Installation/Commissioning",
    AMC: "AMC",
    ARC: 'ARC'

  };

  const [isChecked, setIsChecked] = useState(false)
  useEffect(() => {
    if (isChecked) {
      fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllAscByTicketCountASM?DivCode=${data?.DivCode ? data?.DivCode : "0"}&ProLineCode=${data?.productLineName ? data?.productLineName : "0"}&PinCode=${data?.PinId ? data?.PinId : "0"}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setASCs(result);
        })
        .catch((error) => {
          console.error('Error fetching ASC data:', error);
        });
    }
  }, [isChecked, infolog, token]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setdata((pre) => {
      return {
        ...pre,
        Isreceived: e.target.checked ? "1" : '0',
        NearestAscUserCode: ""

      }
    })

    console.log(e.target.checked, 'ch-----------------')
  };


  return (
    <>

      <Accordion defaultActiveKey='0'>
        {/* <Accordion.Item eventKey="0">
          <Accordion.Header>Register Complaint</Accordion.Header>
          <Accordion.Body>
         

            <div className="d-flex justify-content-center mt-4">
              <Button variant="" className="add-Btn"  onClick={handleClick}>
                Verify
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {" "}
            <p className="m-0">
              {" "}
              {/* <BiArrowBack
                fontSize={20}
                onClick={() => {
                  setactiveKey("0");
                }}
              />{" "} */}
              Information
            </p>
          </Accordion.Header>
          <Accordion.Body>

            <Form id="RegForm" >
              {/* <Row>
                <p className="pg-label">Customer Information</p>
              </Row> */}
              <Row>
                <Col md={2} >
                  <Form.Group>
                    <Form.Label className="text-start">Service request type<span className="req-t">*</span></Form.Label>
                    <Form.Select name="ServiceRequestTypeName" disabled value={data?.ServiceRequestTypeName}
                    // onChange={()=>{
                    //   setdata((pre) => {
                    //     return {
                    //       ...pre,
                    //       ServiceRequestTypeName: e.target.value
                    //     }
                    //   })

                    // }}  
                    >
                      <option value="In Warranty">In Warranty</option>
                      {/* {serviceRequestTypee?.map((SType, i) => {
                        return (
                          <>
                            <option value={SType?.parameterType}>
                              {SType?.parameterType}
                            </option>
                          </>
                        );
                      })} */}


                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={2} >
                  <Form.Group >
                    <Form.Label className="text-start">Customer Type <span className="req-t">*</span></Form.Label>
                    <Form.Select name="UserType" value={data?.UserType} onChange={(e) => {

                      console.log(e.target.value)
                      customerhandleChange(e);
                      if (e.target.value == "136" || e.target.value == "137") {
                        setValidDealer(false);
                        setShowDealerCode(true);
                        setShowSelfStock(false);
                        setShowError(false);
                        setShowProductType(false);
                        setYourCntactDetails("");
                        setYourName("");
                        setdata((pre) => {
                          return {
                            ...pre,
                            OEMCode: "",
                            DealerCode: "",
                            RequestType: ""
                          }
                        })
                        setMobileErrorDealer("");
                        setShowDealerDetails(false);
                      }

                      // setinfolog([])

                      setprodType("")
                      setdata((pre) => {
                        return {
                          ...pre,
                          DealerCode: "",
                          OEMCode: "",
                          UserCode: "",
                          SerialNo: "",
                          ProductCode: ""
                        }
                      })
                    }}>
                      <option value="">Select</option>
                      {customerType?.map((cType, i) => {
                        return (
                          <>
                            <option value={cType?.parameterValId}>
                              {cType?.parameterText}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} >
                  <Form.Group>
                    <Form.Label className="text-start">Source</Form.Label>
                    <Form.Select name="SourceId" disabled={RoleName != "AS8"} value={data?.SourceId} onChange={customerhandleChange}>

                      {sources?.map((srcs, i) => {
                        return (
                          <>
                            <option value={srcs?.parameterValId}>
                              {srcs?.parameterText}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>


                {/* <Col md={3} >
                  <Form.Group>
                    <Form.Label className="text-start">
                      Calling mobile No
                    </Form.Label>
                    <Form.Control type="text" value={callingNumber} onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setcallingNumber(value)
                    }
                    } />

                  </Form.Group>
                </Col> */}
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="text-start">
                      Calling mobile No <span className="req-t">*</span>
                    </Form.Label>
                    <Form.Control
                      autoComplete="new-password"
                      type="text"
                      value={mobileNo}
                      readOnly={!data?.UserType}
                      onBlur={() => {
                        setdata((pre) => {
                          return {
                            ...pre,
                            PrimaryMobileNo: mobileNo
                          }
                        })
                      }}
                      onChange={(e) => {
                        handleMobileChangeVerify(e)
                        // let Info = CustomerInfo?.filter((info, i) => info?.MobileNo === mobileNo);
                        // console.log(Info)
                        if (e.target.value.length == 10) {
                          fetch(
                            `${process.env.REACT_APP_API_URL
                            }TelecallerServiceTicket/GetProdCustInfo?MobileNo=${e.target.value}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setProductList(result)
                            })

                          //     if(!mobileErrorVerify){


                          //   setdata((pre) => {
                          //     return {
                          //       ...pre,
                          //       PrimaryMobileNo: e.target.value
                          //     }
                          //   })
                          // }


                        }
                        else if (e.target.value.length < 10) {
                          setProductList([])
                          setdata((pre) => {
                            return {
                              ...pre,
                              PrimaryMobileNo: ""
                            }
                          })
                        }




                      }}
                    // onChange={(e) => {
                    //   handleMobileChangeVerify(e)
                    //   if (e.target.value.length == 10) {
                    //     fetch(
                    //       `${process.env.REACT_APP_API_URL
                    //       }TelecallerServiceTicket/GetTelecallerProdSerialNo?SerialNo=${0}&MobileNo=${e.target.value}`,
                    //       {
                    //         headers: {
                    //           Authorization: `Bearer ${token}`,
                    //         },
                    //       }
                    //     )
                    //       .then((res) => res.json())
                    //       .then((result) => {
                    //         console.log(result);
                    //         setinfolog(result);



                    //         if (result?.msg == "Service Ticket Available") {


                    //           handleShowExistingTicket(result?.msgCode);
                    //           // setloading(false)

                    //         }

                    //         else {


                    //           //           if(result?.prodInstallationCityId){


                    //           // // -----------------------------------------------------------Nearest Pinocde,ASc,Asm-------------------------------------



                    //           // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${1}`)
                    //           // .then((res) => res.json())
                    //           // .then((resultingNearestASCs) => {
                    //           //   console.log(resultingNearestASCs);







                    //           //   // -------------------------------------------nearest pincode-------------------------------------








                    //           //   async function getCoordinates(pincode, country) {
                    //           //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                    //           //     const data = await response.json();
                    //           //     if (data.length > 0) {
                    //           //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                    //           //     } else {
                    //           //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                    //           //     }
                    //           //   }


                    //           //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


                    //           //   async function calculateRoute() {
                    //           //     // const inputPincode = document.getElementById('inputPincode').value;
                    //           //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                    //           //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

                    //           //     try {
                    //           //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                    //           //       console.log(startCoords);

                    //           //       let nearestPincode = null;
                    //           //       let shortestDistance = Infinity;

                    //           //       for (const pincode of pincodeArray) {
                    //           //         const endCoords = await getCoordinates(pincode, 'IN');

                    //           //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

                    //           //         const response = await fetch(url);
                    //           //         const data = await response.json();

                    //           //         if (data.error) {
                    //           //           throw new Error(data.error.message);
                    //           //         }

                    //           //         const route = data.features[0];
                    //           //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                    //           //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                    //           //         if (distanceInKilometers < shortestDistance) {
                    //           //           shortestDistance = distanceInKilometers;
                    //           //           nearestPincode = pincode;
                    //           //         }
                    //           //       }

                    //           //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                    //           //       console.log(obj);
                    //           //       setdata((pre) => {
                    //           //         return {
                    //           //           ...pre,
                    //           //           NearestPinCode: nearestPincode,
                    //           //           NearestAscUserCode: obj[0]?.userCode,
                    //           //           NearestAsmUserCode: "ASM"
                    //           //         }
                    //           //       })


                    //           //       // setdata((pre) => {
                    //           //       //   return {
                    //           //       //     ...pre,

                    //           //       //   }
                    //           //       // })
                    //           //       setNearestPincode(nearestPincode);
                    //           //       setDistance(shortestDistance);


                    //           //       // Display nearest route on map
                    //           //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                    //           //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                    //           //       // const routeResponse = await fetch(routeUrl);
                    //           //       // const routeData = await routeResponse.json();

                    //           //       // const nearestRoute = routeData.features[0];
                    //           //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                    //           //       // const routeFeature = new Feature({
                    //           //       //   geometry: new LineString(coordinates),
                    //           //       // });
                    //           //       // const routeLayer = new VectorLayer({
                    //           //       //   source: new VectorSource({
                    //           //       //     features: [routeFeature],
                    //           //       //   }),
                    //           //       //   style: new Style({
                    //           //       //     stroke: new Stroke({
                    //           //       //       color: 'blue',
                    //           //       //       width: 2,
                    //           //       //     }),
                    //           //       //   }),
                    //           //       // });
                    //           //       // map.getLayers().forEach(layer => {
                    //           //       //   if (layer instanceof VectorLayer) {
                    //           //       //     map.removeLayer(layer);
                    //           //       //   }
                    //           //       // });
                    //           //       // map.addLayer(routeLayer);

                    //           //     } catch (error) {
                    //           //       console.error('Error calculating route:', error);
                    //           //       setDistance(null);
                    //           //     }
                    //           //   }




                    //           //   // Dummy functions to simulate React state setting
                    //           //   function setNearestPincode(pincode) {
                    //           //     if (document.getElementById('nearestPincode')) {

                    //           //       document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


                    //           //       pincode = ""
                    //           //     }
                    //           //   }

                    //           //   function setDistance(distance) {
                    //           //     if (document.getElementById('distance')) {

                    //           //       document.getElementById('distance').textContent = `Distance: ${distance} km`;
                    //           //       distance = ""
                    //           //     }
                    //           //   }




                    //           //   calculateRoute()

                    //           // })




                    //           // // -------------------------------------------------ASM--------------------------------------------------





                    //           // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${2}`)
                    //           // .then((res) => res.json())
                    //           // .then((resultingNearestASCs) => {
                    //           //   console.log(resultingNearestASCs);







                    //           //   // -------------------------------------------nearest pincode-------------------------------------








                    //           //   async function getCoordinates(pincode, country) {
                    //           //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                    //           //     const data = await response.json();
                    //           //     if (data.length > 0) {
                    //           //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                    //           //     } else {
                    //           //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                    //           //     }
                    //           //   }


                    //           //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


                    //           //   async function calculateRoute() {
                    //           //     // const inputPincode = document.getElementById('inputPincode').value;
                    //           //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                    //           //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

                    //           //     try {
                    //           //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                    //           //       console.log(startCoords);

                    //           //       let nearestPincode = null;
                    //           //       let shortestDistance = Infinity;

                    //           //       for (const pincode of pincodeArray) {
                    //           //         const endCoords = await getCoordinates(pincode, 'IN');

                    //           //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

                    //           //         const response = await fetch(url);
                    //           //         const data = await response.json();

                    //           //         if (data.error) {
                    //           //           throw new Error(data.error.message);
                    //           //         }

                    //           //         const route = data.features[0];
                    //           //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                    //           //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                    //           //         if (distanceInKilometers < shortestDistance) {
                    //           //           shortestDistance = distanceInKilometers;
                    //           //           nearestPincode = pincode;
                    //           //         }
                    //           //       }

                    //           //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                    //           //       console.log(obj);
                    //           //       setdata((pre) => {
                    //           //         return {
                    //           //           ...pre,
                    //           //           // NearestPinCode: nearestPincode,
                    //           //           // NearestAscUserCode: obj[0]?.userCode,
                    //           //           NearestAsmUserCode: obj[0]?.userCode
                    //           //         }
                    //           //       })


                    //           //       // setdata((pre) => {
                    //           //       //   return {
                    //           //       //     ...pre,

                    //           //       //   }
                    //           //       // })
                    //           //       // setNearestPincode(nearestPincode);
                    //           //       // setDistance(shortestDistance);


                    //           //       // Display nearest route on map
                    //           //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                    //           //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                    //           //       // const routeResponse = await fetch(routeUrl);
                    //           //       // const routeData = await routeResponse.json();

                    //           //       // const nearestRoute = routeData.features[0];
                    //           //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                    //           //       // const routeFeature = new Feature({
                    //           //       //   geometry: new LineString(coordinates),
                    //           //       // });
                    //           //       // const routeLayer = new VectorLayer({
                    //           //       //   source: new VectorSource({
                    //           //       //     features: [routeFeature],
                    //           //       //   }),
                    //           //       //   style: new Style({
                    //           //       //     stroke: new Stroke({
                    //           //       //       color: 'blue',
                    //           //       //       width: 2,
                    //           //       //     }),
                    //           //       //   }),
                    //           //       // });
                    //           //       // map.getLayers().forEach(layer => {
                    //           //       //   if (layer instanceof VectorLayer) {
                    //           //       //     map.removeLayer(layer);
                    //           //       //   }
                    //           //       // });
                    //           //       // map.addLayer(routeLayer);

                    //           //     } catch (error) {
                    //           //       console.error('Error calculating route:', error);
                    //           //       // setDistance(null);
                    //           //     }
                    //           //   setloading(false)

                    //           //   }




                    //           //   // Dummy functions to simulate React state setting
                    //           //   // function setNearestPincode(pincode) {
                    //           //   //   if(document.getElementById('nearestPincode')){

                    //           //   //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


                    //           //   //     pincode = ""
                    //           //   //   }
                    //           //   // }

                    //           //   // function setDistance(distance) {
                    //           //   //   if(document.getElementById('distance')){

                    //           //   //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
                    //           //   //     distance = ""
                    //           //   //   }
                    //           //   // }




                    //           //   calculateRoute()

                    //           // })




                    //           // }


                    //           if (result?.prodInstallationPinCode) {
                    //             fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${result?.prodInstallationPinCode}`, {
                    //               headers: {
                    //                 Authorization: `Bearer ${token}`,
                    //               },
                    //             })
                    //               .then((resPin) => resPin.json())
                    //               .then((response) => {
                    //                 console.log(response);
                    //                 setdata((pre) => {
                    //                   return {
                    //                     ...pre,
                    //                     NearestPinCode: response[0]?.pinCode,
                    //                     NearestAscUserCode: response[0]?.userCode
                    //                   }
                    //                 })
                    //               })
                    //           }

                    //           // -------------------------------------------------------------------------------------------------------------------------





                    //           // else  {
                    //           //     // alert(`No customer info found for MobileNo ${mobileNo}`);

                    //           //     setaddInfo((prev) => ({
                    //           //         ...prev,
                    //           //         ContactPersonName: '',
                    //           //         MobileNo: '',
                    //           //         emailId: '',
                    //           //         address: '',
                    //           //         PinCode: '',
                    //           //         state: '',
                    //           //         City: '',
                    //           //         productSerialNo: '',
                    //           //         division: '',
                    //           //         productType: '',
                    //           //         productModel: '',
                    //           //         invoiceNo: '',
                    //           //         invoiceDate: '',
                    //           //         batchNo: '',
                    //           //         voltage: '',
                    //           //         pole: '',
                    //           //         status: ''
                    //           //     }));
                    //           //     return;
                    //           // }

                    //           // setactiveKey("1");
                    //           if (result.msg == "Already Register in System") {
                    //             setdata((prev) => {
                    //               return {
                    //                 ...prev,
                    //                 ProdRegAutoId: result?.prodRegAutoId,
                    //                 CustVerificationId: result?.custVerificationId,
                    //                 CustomerName: result?.customerName || "",
                    //                 ContactPerson: result?.contactPerson || "",
                    //                 PrimaryMobileNo: result?.primaryMobileNo || "",
                    //                 EmailId: result?.emailId || "",
                    //                 AltContactNo: result?.altContactNo,
                    //                 AltEmailId: result?.altEmailId,
                    //                 Address1: result?.address1,
                    //                 PinId: result?.pinId,
                    //                 StateId: result?.stateId,
                    //                 CityId: result?.cityId,
                    //                 NameOfSpoc: result?.nameOfSpoc,
                    //                 SpocMobileNo: result?.spocMobileNo,
                    //                 SpocEmailId: result?.spocMobileNo,
                    //                 SiteAddress: result?.siteAddress,
                    //                 ProdInstallationPinId: result?.prodInstallationPinCode,
                    //                 ProdInstallationStateId: result?.prodInstallationStateId,
                    //                 ProdInstallationCityId: result?.prodInstallationCityId,
                    //                 // SerialNo: result?.serialNo,
                    //                 // DivCode: result?.divCode,
                    //                 // ProductType: result?.productType,
                    //                 // ProductCode: result?.productCode,
                    //                 // PurchaseFrom: result?.purchaseFrom,
                    //                 // InvoiceNo: result?.invoiceNo,
                    //                 // InvoiceDate: result?.invoiceDate?.split(" ")[0],
                    //                 // InvoceFilePath: result?.invoceFilePath,
                    //                 // FrameSize: result?.frameSize,
                    //                 // Voltage: result?.voltage,
                    //                 // Pole: result?.pole,
                    //                 // InWarranty: result?.inWarranty,
                    //                 // DefectId: result?.defectId,
                    //               };
                    //             });
                    //           }


                    //           // if(result.msgCode=="SP404"){
                    //           //   Swal.fire({
                    //           //     icon:"error",
                    //           //     title:result.msg
                    //           //   })
                    //           // }

                    //           else {



                    //             if (srNo != "") {


                    //               setdata((prev) => {
                    //                 return {
                    //                   ...prev,
                    //                   ProdRegAutoId: result?.prodRegAutoId,
                    //                   CustVerificationId: result?.custVerificationId,
                    //                   CustomerName: result?.customerName || "",
                    //                   ContactPerson: result?.contactPerson || "",
                    //                   PrimaryMobileNo: result?.primaryMobileNo || "",
                    //                   EmailId: result?.emailId || "",
                    //                   AltContactNo: result?.altContactNo,
                    //                   AltEmailId: result?.altEmailId,
                    //                   Address1: result?.address1,
                    //                   PinId: result?.pinId,
                    //                   StateId: result?.stateId,
                    //                   CityId: result?.cityId,
                    //                   NameOfSpoc: result?.nameOfSpoc,
                    //                   SpocMobileNo: result?.spocMobileNo,
                    //                   SpocEmailId: result?.spocMobileNo,
                    //                   SiteAddress: result?.siteAddress,
                    //                   ProdInstallationPinId: result?.prodInstallationPinCode,
                    //                   ProdInstallationStateId: result?.prodInstallationStateId,
                    //                   ProdInstallationCityId: result?.prodInstallationCityId,
                    //                   SerialNo: result?.serialNo,
                    //                   DivCode: result?.divCode,
                    //                   ProductType: result?.productType,
                    //                   ProductCode: result?.productCode,
                    //                   PurchaseFrom: result?.purchaseFrom,
                    //                   InvoiceNo: result?.invoiceNo,
                    //                   InvoiceDate: result?.invoiceDate?.split(" ")[0],
                    //                   InvoceFilePath: result?.invoceFilePath,
                    //                   FrameSize: result?.frameSize,
                    //                   Voltage: result?.voltage,
                    //                   Pole: result?.pole,
                    //                   InWarranty: result?.inWarranty == "In Warranty" ? true : false,
                    //                   ProductDescription: result?.productDescription
                    //                   // DefectId: result?.defectId,
                    //                 };
                    //               });
                    //               setMobileNo(result?.primaryMobileNo)

                    //             }
                    //             else {
                    //               setdata((prev) => {
                    //                 return {
                    //                   ...prev,
                    //                   ProdRegAutoId: result?.prodRegAutoId,
                    //                   CustVerificationId: result?.custVerificationId,
                    //                   CustomerName: result?.customerName || "",
                    //                   ContactPerson: result?.contactPerson || "",
                    //                   PrimaryMobileNo: result?.primaryMobileNo || "",
                    //                   EmailId: result?.emailId || "",
                    //                   AltContactNo: result?.altContactNo,
                    //                   AltEmailId: result?.altEmailId,
                    //                   Address1: result?.address1,
                    //                   PinId: result?.pinId,
                    //                   StateId: result?.stateId,
                    //                   CityId: result?.cityId,
                    //                   NameOfSpoc: result?.nameOfSpoc,
                    //                   SpocMobileNo: result?.spocMobileNo,
                    //                   SpocEmailId: result?.spocMobileNo,
                    //                   SiteAddress: result?.siteAddress,
                    //                   ProdInstallationPinId: result?.prodInstallationPinCode,
                    //                   ProdInstallationStateId: result?.prodInstallationStateId,
                    //                   ProdInstallationCityId: result?.prodInstallationCityId,
                    //                   // SerialNo: result?.serialNo,
                    //                   // DivCode: result?.divCode,
                    //                   // ProductType: result?.productType,
                    //                   // ProductCode: result?.productCode,
                    //                   // PurchaseFrom: result?.purchaseFrom,
                    //                   // InvoiceNo: result?.invoiceNo,
                    //                   // InvoiceDate: result?.invoiceDate?.split(" ")[0],
                    //                   // InvoceFilePath: result?.invoceFilePath,
                    //                   // FrameSize: result?.frameSize,
                    //                   // Voltage: result?.voltage,
                    //                   // Pole: result?.pole,
                    //                   // InWarranty: result?.inWarranty,
                    //                   // DefectId: result?.defectId,
                    //                 };
                    //               });
                    //             }






                    //             if (
                    //               data?.NameOfSpoc == data?.ContactPerson &&
                    //               data?.SpocMobileNo == data?.PrimaryMobileNo &&
                    //               data?.SpocEmailId == data?.EmailId &&
                    //               data?.SiteAddress == data?.Address1 &&
                    //               data?.ProdInstallationPinId == data?.PinId &&
                    //               data?.ProdInstallationStateId == data?.StateId &&
                    //               data?.ProdInstallationCityId == data?.CityId
                    //             ) {
                    //               setdata((pre) => {
                    //                 return {
                    //                   ...pre,
                    //                   sameAsFirmDetails: 1,
                    //                 };
                    //               });
                    //             }
                    //             else {
                    //               setdata((pre) => {
                    //                 return {
                    //                   ...pre,
                    //                   sameAsFirmDetails: 0,
                    //                 };
                    //               });
                    //             }



                    //             fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllDivisionWiseProductLine?divisionCode=${result?.divCode}`, {
                    //               headers: {
                    //                 Authorization: `Bearer ${token}`,
                    //               },
                    //             })
                    //               .then((res) => res.json())
                    //               .then((result) => {
                    //                 console.log(result);
                    //                 setproductType(result);
                    //               });



                    //             fetch(
                    //               `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${result?.productCode}`, {
                    //               headers: {
                    //                 Authorization: `Bearer ${token}`,
                    //               },
                    //             }
                    //             )
                    //               .then((res) => res.json())
                    //               .then((result) => {
                    //                 console.log(result);
                    //                 setdefectsByPL(result);
                    //               });


                    //           }


                    //           if (result?.stateId) {

                    //             const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result.stateId}&Code=0`;
                    //             fetch(cityUrl)
                    //               .then((res) => res.json())
                    //               .then((result) => {
                    //                 console.log(result);
                    //                 setcities(result);
                    //               });
                    //           }


                    //           if (result?.prodInstallationStateId) {

                    //             const cityUrl2 = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.prodInstallationStateId}&Code=0`;
                    //             fetch(cityUrl2)
                    //               .then((res) => res.json())
                    //               .then((result) => {
                    //                 console.log(result);
                    //                 setcities2(result);
                    //               });
                    //           }

                    //           // setMobileNo('')


                    //         }

                    //       });


                    //   }
                    //   else {
                    //     setdata((pre) => {
                    //       return {
                    //         ...pre,
                    //         ProdRegAutoId: 0,
                    //         CustVerificationId: 0,
                    //         CustomerName: "",
                    //         ContactPerson: "",
                    //         PrimaryMobileNo: "",
                    //         EmailId: "",
                    //         AltContactNo: "",
                    //         AltEmailId: "",
                    //         Address1: "",
                    //         PinId: "",
                    //         StateId: "",
                    //         CityId: "",
                    //         NameOfSpoc: "",
                    //         SpocMobileNo: "",
                    //         SpocEmailId: "",
                    //         SiteAddress: "",
                    //         ProdInstallationPinId: 0,
                    //         ProdInstallationStateId: 0,
                    //         ProdInstallationCityId: 0,
                    //       }
                    //     })
                    //   }
                    // }}
                    ></Form.Control>
                    {mobileErrorVerify && (
                      <span style={{ color: "red" }}>{mobileErrorVerify}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Caller name</Form.Label>
                    <Form.Control type="text" name="callerName" value={data?.callerName} onChange={customerhandleChange} />
                  </Form.Group>
                </Col>


                {/* {(ProductList?.length > 0 && data?.UserType == "138") ?
                  < Row className="mt-3" style={{
                    minHeight: 'max-content',
                    maxHeight: "300px",
                    overflowY: 'scroll'
                  }}>
                    <MaterialReactTable
                      columns={columns}
                      data={ProductList}

                      initialState={{ showColumnFilters: false }} //show filters by default
                      // muiTableHeadCellFilterTextFieldProps={{
                      //   sx: { m: "0.5rem 0", width: "100%" },
                      //   variant: "outlined",
                      // }}



                      muiTableBodyCellProps={({ cell }) => ({
                        style: {
                          borderBottom: "1px solid black",
                          width: fixedColumnWidths[cell.column.id],
                          minWidth: fixedColumnWidths[cell.column.id],
                          maxWidth: fixedColumnWidths[cell.column.id],

                        },
                      })}
                      manualPagination={true}
                      muiToolbarAlertBannerProps={isError
                        ? {
                          color: 'error',
                          children: 'Error loading data',
                        }
                        : undefined}
                      onColumnFiltersChange={setColumnFilters}
                      onGlobalFilterChange={setGlobalFilter}
                      // onPaginationChange={setPagination}
                      onSortingChange={setSorting}
                      rowCount={rowCount}
                      state={
                        {
                          columnFilters,
                          globalFilter,
                          isLoading,
                          // pagination: pagination,
                          showAlertBanner: isError,
                          showProgressBars: isRefetching,
                          sorting,
                        }
                      }




                      enableTopToolbar={false}
                      enablePagination={false}
                      enableBottomToolbar={false}
                      positionActionsColumn="first"



                    />
                  </Row> : ""} */}


                {(data?.UserType == "136" || data?.UserType == "137") && (
                  <>

                    {/* <Col md={3} >
                      <Form.Group>
                        <Form.Label >
                          {data?.UserType == "136" ? "OEM" : "Dealer"} Name<span className="req-t">*</span>
                        </Form.Label>
                        {data?.UserType == "136" ?
                          <Form.Control
                            type="text"
                            name=""
                            autocomplete="new-password"
                            value={data.OEMCode}
                            readOnly={showDealerDetails}
                            onChange={(e) => {
                              if (data?.UserType == "136") {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    OEMCode: e.target.value
                                  }
                                })
                              }
                              else if (data?.UserType == "137") {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    DealerCode: e.target.value
                                  }
                                })
                              }
                              else {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    UserCode: e.target.value
                                  }
                                })
                              }
                            }}
                            placeholder=""
                          />
                          : <Form.Control
                            type="text"
                            name=""
                            autocomplete="new-password"
                            readOnly={showDealerDetails}
                            value={data.DealerCode}
                            onChange={(e) => {
                              if (data?.UserType == "136") {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    OEMCode: e.target.value
                                  }
                                })
                              }
                              else if (data?.UserType == "137") {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    DealerCode: e.target.value
                                  }
                                })
                              }
                              else {
                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    UserCode: e.target.value
                                  }
                                })
                              }
                            }}
                            placeholder=""
                          />}


                      </Form.Group>
                      {showError && (
                        <p style={{ color: "red", textAlign: 'left' }}>{showError}</p>
                      )}
                    </Col> */}





                    {
                      !showDealerDetails && (
                        <Col md={3} >
                          <Form.Group>
                            <Form.Label >
                              {data?.UserType == "136" ? "OEM" : "Dealer"} Code<span className="req-t">*</span>
                            </Form.Label>
                            {data?.UserType == "136" || data?.UserType == "137" ? (
                              <Form.Control
                                type="text"
                                value={data?.DealerCode}
                                // readOnly
                                onChange={(e) => {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      DealerCode: e.target.value
                                    }
                                  })
                                }} />
                            ):""

                            }


                          </Form.Group>
                          {showError && (
                            <p style={{ color: "red", textAlign: 'left' }}>{showError}</p>
                          )}
                        </Col>
                      )
                    }










                    {!showDealerDetails &&
                      <Col>
                        <Button variant="" className="add-Btn " style={{
                          marginTop: '28px'
                        }} disabled={errorMessage || errorMessage1} onClick={() => {
                          verifyDealer()
                        }}>Verify</Button>
                      </Col>}

                    {showDealerDetails ?
                      <>
                        <Col md={3}>
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
                            // onChange={handleInstallChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group >
                            <Form.Label>
                              Dealer Address <span className="req-t">*</span>
                            </Form.Label>
                            <Form.Control
                              readOnly
                              type="text"
                              autocomplete="new-password"
                              name="nameOfSpoc"
                              value={DealerDetails?.address}
                            // onChange={handleInstallChange}
                            />
                          </Form.Group>
                        </Col>
                      </> : ""}

                    <Row>
                      {validDealer && <>
                        <Col md={5} >
                          <Form.Label className="m-0">Request type</Form.Label>
                          <div className="">
                            <Row>
                              <Col>
                                <Form.Check
                                  type="radio"
                                  label="Placing request for Self stock"
                                  name="RequestType"

                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          RequestType: "Self"
                                        }
                                      })
                                    }
                                    else {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          RequestType: ""
                                        }
                                      })
                                    }
                                  }}
                                  style={{
                                    color: "#000",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    textAlign: "left",
                                    margin: "15px 15px 0px 0px",
                                  }}
                                /></Col>
                              <Col>
                                <Form.Check
                                  type="radio"
                                  label="Placing service request on behalf of customer"
                                  name="RequestType"

                                  style={{
                                    color: "#000",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    textAlign: "left",
                                    margin: "15px 15px 0px 0px",
                                  }}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          RequestType: "Customer"
                                        }
                                      })
                                    }
                                    else {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          RequestType: ""
                                        }
                                      })
                                    }
                                  }}
                                /></Col>
                            </Row>
                          </div>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label style={{
                              // color: '#fff',
                              // fontWeight: '400'
                            }}>Your Name <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name='yourName'
                              autocomplete="new-password"
                              onChange={(e) => {
                                setYourName(e.target.value);
                              }}
                              placeholder=''

                            />
                          </Form.Group>


                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label style={{
                              // color: '#fff',
                              // fontWeight: '400'
                            }}>Your contact no <span className='req-t'>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name='yourcontactName'
                              autocomplete="new-password"
                              value={yourContactDetails}
                              onChange={(e) => {
                                handleMobileChangeDealer(e);
                              }}
                              placeholder=''

                            />
                            {mobileErrorDealer && <span style={{ color: 'red' }}>{mobileErrorDealer}</span>}
                          </Form.Group>


                        </Col>
                        <Col>
                          <Button variant="" className="add-Btn " style={{
                            marginTop: '28px'
                          }} disabled={mobileErrorDealer || data.RequestType == ""} onClick={() => {
                            HandleNextDealer()
                          }}>Submit</Button>
                        </Col>

                      </>}
                    </Row>
                  </>
                )}



                {data?.UserType == "" ? "" :
                  <Row className="mt-2 ">

                    {(data?.UserType == "136" || data?.UserType == "137") && !showProductType ? ""
                      :
                      <>
                        {/* <Col className="" lg={3} sm={12} md={4}>
                          <Form.Group className="mt-2">
                            <Form.Label
                            >

                              Product Division
                            </Form.Label><span className="req-t">*</span>
                            <Form.Select
                              // disabled={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select</option>
                              {productDisivion?.map((ptype, i) => {
                                return (
                                  <>
                                    <option value={ptype?.divisionCode}>{ptype?.productLineName}</option>

                                  </>
                                );
                              })}

                            </Form.Select>
                          </Form.Group>
                        </Col><Col className="" lg={3} sm={12} md={4}>
                          <Form.Group className="mt-2">
                            <Form.Label
                            >

                              Product Line
                            </Form.Label><span className="req-t">*</span>
                            <Form.Select
                              // disabled={(RedirectionRoute == "RegisterProduct" && (srNoDetails?.msgCode == "SP001"))}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select</option>
                              {productDisivion?.map((ptype, i) => {
                                return (
                                  <>
                                    <option value={ptype?.divisionCode}>{ptype?.productLineName}</option>

                                  </>
                                );
                              })}

                            </Form.Select>
                          </Form.Group>
                        </Col> */}

                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                            <Form.Select aria-label="Default select example" name='divisionName' value={data?.DivCode} onChange={(e) => {
                              // setprodType(true)
                              // console.log(e,'e----------------')
                              const selectedOption = e.target.options[e.target.selectedIndex];
                              const DivCode = e.target.value;
                              const divisionCode = selectedOption.text;


                              setdata((pre) => {
                                return {
                                  ...pre,
                                  DivCode,
                                  divisionCode,
                                  productLineCode: ''
                                };
                              });



                              fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${DivCode ? DivCode : 0}`, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setproductLines(result);
                                });
                            }}>
                              <option value=''>Select</option>
                              {divisions?.map((division, index) => {
                                return (
                                  <>

                                    <option value={division?.divisionCode} name={division?.divisionName}>{division?.divisionName}</option>
                                  </>
                                );
                              })}
                              {/* <option value="3">Three</option> */}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>Product-Line <span className='req-t'>*</span></Form.Label>
                            <Form.Select aria-label="Default select example" name='productLineName' value={data?.productLineName} onChange={(e) => {
                              const selectedOption = e.target.options[e.target.selectedIndex];
                              const ProductType = selectedOption.text;
                              const productLineName = e.target.value;
                              setdata((pre) => {
                                return {
                                  ...pre,
                                  ProductType,
                                  productLineName

                                }
                              })


                              const selectedIndex = e.target.selectedIndex;
                              const selectedOptionCode = e.target.options[selectedIndex].getAttribute("isReq");


                              console.log(selectedOptionCode);


                              // setisProdGroupReq(selectedOptionCode)

                            }}>
                              <option>Select</option>
                              {prodctLines?.map((productLine, index) => {
                                return (
                                  <>
                                    <option value={productLine?.parameterTypeId} isReq={productLine?.isRequired}>{productLine?.parameterType}</option>

                                  </>
                                );
                              })}
                              {/* <option value="3">Three</option> */}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label className="text-start">Serial No {prodType == "FHP Motor 1Ph, LT-3Ph, HT, DC Motor, EV Motors, Alternator, Drives" ? <span className="req-t">*</span> : ""}</Form.Label>
                            <Form.Control
                              type="text"
                              value={data?.SerialNo}
                              onChange={handleSerailNoChange}
                            // readOnly={infolog?.length != 0}
                            ></Form.Control>
                          </Form.Group>
                          {/* {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                          )} */}

                        </Col>
                        <Col md={2}>
                          <Form.Group style={{
                            // marginTop: '10px'
                          }}>
                            <Form.Label
                              style={{
                                // fontSize: '14px',
                                // color: '#fff',
                                // fontWeight: '400'
                              }}
                            >
                              Enter product code
                              {/* <span className="req-t">*</span> */}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              // name="ProductCode"
                              value={data.ProductCode}
                              // readOnly={infolog?.length != 0}
                              onChange={(e) => {
                                const value = e.target.value;



                                console.log(value)

                                if (value.length === 0) {
                                  setinfolog([]);
                                }




                                setdata((pre) => {
                                  return {
                                    ...pre,
                                    ProductCode: value
                                  };
                                });

                                // const regex = /^[a-zA-Z0-9\-\_\.]*$/;

                                // if (regex.test(e.target.value) || e.target.value === "") {
                                //   setdata((pre) => {
                                //     return {
                                //       ...pre,
                                //       ProductCode: e.target.value
                                //     };
                                //   });
                                //   setErrorMessage1("");
                                // } else {
                                //   setErrorMessage1(
                                //     "Only alphabets, digits, hyphen (-), and Underscore (_) are allowed."
                                //   );
                                // }

                              }} />
                            {/* {errorMessage1 && (
                              <p style={{ color: "red" }}>{errorMessage1}</p>
                            )} */}
                          </Form.Group>
                        </Col>

                        {
                          (data?.DivCode != 'M7' ? (data.SerialNo || data.ProductCode) : '') ? (
                            <Col md={1}>
                              <Button variant="" className="add-Btn " style={{
                                marginTop: '28px'
                              }} disabled={errorMessage || errorMessage1 || mobileErrorVerify} onClick={() => {
                                if (data?.DivCode == "") {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Division  is required!"
                                  });
                                }
                                // else
                                // if (prodType == "FHP Motor 1Ph, LT-3Ph, HT, DC Motor, EV Motors, Alternator, Drives" && (data?.SerialNo == "" || data?.ProductCode == "")) {
                                //   Swal.fire({
                                //     icon: "error",
                                //     title: "Serial No. & Product code is mandatory!"
                                //   });
                                // }
                                else {

                                  fetch(
                                    `${process.env.REACT_APP_API_URL}TelecallerServiceTicket/GetServiceTicketTelecallerProdSerialNo?ProductSerialNo=${data?.SerialNo ? data?.SerialNo : ''}&ProductCode=${data?.ProductCode ? data?.ProductCode : 0}&productLineCode=${data?.productLineName}&DivisionCode=${data?.DivCode}&MobileNo=${mobileNo}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                    .then((res) => res.json())
                                    .then((result) => {
                                      console.log(result);
                                      // setinfolog(result);
                                      setinfolog(result?.prodSerialNoWarrantyList);
                                      console.log(result?.prodSerialNoWarrantyList)

                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          ProductCode: result?.prodSerialNoWarrantyList[0]?.matnr ? result?.prodSerialNoWarrantyList[0]?.matnr : "",
                                          BatchStartDate: result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate ? result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate : '',
                                          BatchEndDate: result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch ? result?.prodSerialNoWarrantyList[0]?.warrantyEndBatch : '',
                                          ProductType: result?.prodSerialNoWarrantyList[0]?.productLineName ? result?.prodSerialNoWarrantyList[0]?.productLineName : '',
                                          productLineName: result?.prodSerialNoWarrantyList[0]?.productLineCode ? result?.prodSerialNoWarrantyList[0]?.productLineCode : '',
                                          ManufacturingDate: result?.prodSerialNoWarrantyList[0]?.manufacturingDate ? result?.prodSerialNoWarrantyList[0]?.manufacturingDate : '',
                                          DateOfDispatch: result?.prodSerialNoWarrantyList[0]?.dateOfDispatch ? result?.prodSerialNoWarrantyList[0]?.dateOfDispatch : '',

                                        };
                                      });




                                      console.log(data, 'daate----------------')

                                      let a = result?.prodSerialNoWarrantyList[0]?.warrantyStartBatchDate;
                                      // if (ProductWarrentyMsg?.msgCode == "SP200") {
                                      //   a = moment(a).format("YYYY-MM-DD")
                                      // }
                                      console.log(a, '11111111111111')
                                      a = moment(a).format("YYYY-MM-DD")
                                      let d1 = new Date(a);
                                      let d2 = new Date(data?.InvoiceDate);
                                      console.log(a, 'a---------')
                                      setMinInvoiceDate(a);
                                      if (d1 > d2) {
                                        setdata((pre) => {
                                          return {
                                            ...pre,
                                            InvoiceDate: ""
                                          }
                                        }
                                        )
                                      }



                                      if (result?.msg == "Service Ticket Available") {
                                        handleShowExistingTicket(result?.msgCode);
                                        // setinfolog([]);
                                        // setloading(false)
                                      }



                                      else {

                                        if (result?.prodInstallationPinCode) {
                                          fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${result?.prodInstallationPinCode}`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          })
                                            .then((resPin) => resPin.json())
                                            .then((response) => {
                                              console.log(response);
                                              setdata((pre) => {
                                                return {
                                                  ...pre,
                                                  NearestPinCode: response[0]?.pinCode,
                                                  NearestAscUserCode: response[0]?.userCode
                                                };
                                              });
                                            });
                                        }
                                        //           if(result?.prodInstallationCityId){
                                        // // -----------------------------------------------------------Nearest Pinocde,ASc,Asm-------------------------------------
                                        // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${1}`)
                                        // .then((res) => res.json())
                                        // .then((resultingNearestASCs) => {
                                        //   console.log(resultingNearestASCs);
                                        //   // -------------------------------------------nearest pincode-------------------------------------
                                        //   async function getCoordinates(pincode, country) {
                                        //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                                        //     const data = await response.json();
                                        //     if (data.length > 0) {
                                        //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                                        //     } else {
                                        //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                                        //     }
                                        //   }
                                        //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key
                                        //   async function calculateRoute() {
                                        //     // const inputPincode = document.getElementById('inputPincode').value;
                                        //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                                        //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes
                                        //     try {
                                        //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                                        //       console.log(startCoords);
                                        //       let nearestPincode = null;
                                        //       let shortestDistance = Infinity;
                                        //       for (const pincode of pincodeArray) {
                                        //         const endCoords = await getCoordinates(pincode, 'IN');
                                        //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;
                                        //         const response = await fetch(url);
                                        //         const data = await response.json();
                                        //         if (data.error) {
                                        //           throw new Error(data.error.message);
                                        //         }
                                        //         const route = data.features[0];
                                        //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                                        //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers
                                        //         if (distanceInKilometers < shortestDistance) {
                                        //           shortestDistance = distanceInKilometers;
                                        //           nearestPincode = pincode;
                                        //         }
                                        //       }
                                        //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                                        //       console.log(obj);
                                        //       setdata((pre) => {
                                        //         return {
                                        //           ...pre,
                                        //           NearestPinCode: nearestPincode,
                                        //           NearestAscUserCode: obj[0]?.userCode,
                                        //           NearestAsmUserCode: "ASM"
                                        //         }
                                        //       })
                                        //       // setdata((pre) => {
                                        //       //   return {
                                        //       //     ...pre,
                                        //       //   }
                                        //       // })
                                        //       setNearestPincode(nearestPincode);
                                        //       setDistance(shortestDistance);
                                        //       // Display nearest route on map
                                        //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                                        //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                                        //       // const routeResponse = await fetch(routeUrl);
                                        //       // const routeData = await routeResponse.json();
                                        //       // const nearestRoute = routeData.features[0];
                                        //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                                        //       // const routeFeature = new Feature({
                                        //       //   geometry: new LineString(coordinates),
                                        //       // });
                                        //       // const routeLayer = new VectorLayer({
                                        //       //   source: new VectorSource({
                                        //       //     features: [routeFeature],
                                        //       //   }),
                                        //       //   style: new Style({
                                        //       //     stroke: new Stroke({
                                        //       //       color: 'blue',
                                        //       //       width: 2,
                                        //       //     }),
                                        //       //   }),
                                        //       // });
                                        //       // map.getLayers().forEach(layer => {
                                        //       //   if (layer instanceof VectorLayer) {
                                        //       //     map.removeLayer(layer);
                                        //       //   }
                                        //       // });
                                        //       // map.addLayer(routeLayer);
                                        //     } catch (error) {
                                        //       console.error('Error calculating route:', error);
                                        //       setDistance(null);
                                        //     }
                                        //   }
                                        //   // Dummy functions to simulate React state setting
                                        //   function setNearestPincode(pincode) {
                                        //     if (document.getElementById('nearestPincode')) {
                                        //       document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;
                                        //       pincode = ""
                                        //     }
                                        //   }
                                        //   function setDistance(distance) {
                                        //     if (document.getElementById('distance')) {
                                        //       document.getElementById('distance').textContent = `Distance: ${distance} km`;
                                        //       distance = ""
                                        //     }
                                        //   }
                                        //   calculateRoute()
                                        // })
                                        // // -------------------------------------------------ASM--------------------------------------------------
                                        // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${2}`)
                                        // .then((res) => res.json())
                                        // .then((resultingNearestASCs) => {
                                        //   console.log(resultingNearestASCs);
                                        //   // -------------------------------------------nearest pincode-------------------------------------
                                        //   async function getCoordinates(pincode, country) {
                                        //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                                        //     const data = await response.json();
                                        //     if (data.length > 0) {
                                        //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                                        //     } else {
                                        //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                                        //     }
                                        //   }
                                        //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key
                                        //   async function calculateRoute() {
                                        //     // const inputPincode = document.getElementById('inputPincode').value;
                                        //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                                        //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes
                                        //     try {
                                        //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                                        //       console.log(startCoords);
                                        //       let nearestPincode = null;
                                        //       let shortestDistance = Infinity;
                                        //       for (const pincode of pincodeArray) {
                                        //         const endCoords = await getCoordinates(pincode, 'IN');
                                        //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;
                                        //         const response = await fetch(url);
                                        //         const data = await response.json();
                                        //         if (data.error) {
                                        //           throw new Error(data.error.message);
                                        //         }
                                        //         const route = data.features[0];
                                        //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                                        //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers
                                        //         if (distanceInKilometers < shortestDistance) {
                                        //           shortestDistance = distanceInKilometers;
                                        //           nearestPincode = pincode;
                                        //         }
                                        //       }
                                        //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                                        //       console.log(obj);
                                        //       setdata((pre) => {
                                        //         return {
                                        //           ...pre,
                                        //           // NearestPinCode: nearestPincode,
                                        //           // NearestAscUserCode: obj[0]?.userCode,
                                        //           NearestAsmUserCode: obj[0]?.userCode
                                        //         }
                                        //       })
                                        //       // setdata((pre) => {
                                        //       //   return {
                                        //       //     ...pre,
                                        //       //   }
                                        //       // })
                                        //       // setNearestPincode(nearestPincode);
                                        //       // setDistance(shortestDistance);
                                        //       // Display nearest route on map
                                        //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                                        //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                                        //       // const routeResponse = await fetch(routeUrl);
                                        //       // const routeData = await routeResponse.json();
                                        //       // const nearestRoute = routeData.features[0];
                                        //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                                        //       // const routeFeature = new Feature({
                                        //       //   geometry: new LineString(coordinates),
                                        //       // });
                                        //       // const routeLayer = new VectorLayer({
                                        //       //   source: new VectorSource({
                                        //       //     features: [routeFeature],
                                        //       //   }),
                                        //       //   style: new Style({
                                        //       //     stroke: new Stroke({
                                        //       //       color: 'blue',
                                        //       //       width: 2,
                                        //       //     }),
                                        //       //   }),
                                        //       // });
                                        //       // map.getLayers().forEach(layer => {
                                        //       //   if (layer instanceof VectorLayer) {
                                        //       //     map.removeLayer(layer);
                                        //       //   }
                                        //       // });
                                        //       // map.addLayer(routeLayer);
                                        //     } catch (error) {
                                        //       console.error('Error calculating route:', error);
                                        //       // setDistance(null);
                                        //     }
                                        //   setloading(false)
                                        //   }
                                        //   // Dummy functions to simulate React state setting
                                        //   // function setNearestPincode(pincode) {
                                        //   //   if(document.getElementById('nearestPincode')){
                                        //   //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;
                                        //   //     pincode = ""
                                        //   //   }
                                        //   // }
                                        //   // function setDistance(distance) {
                                        //   //   if(document.getElementById('distance')){
                                        //   //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
                                        //   //     distance = ""
                                        //   //   }
                                        //   // }
                                        //   calculateRoute()
                                        // })
                                        // }
                                        // -------------------------------------------------------------------------------------------------------------------------
                                        // else  {
                                        //     // alert(`No customer info found for MobileNo ${mobileNo}`);
                                        //     setaddInfo((prev) => ({
                                        //         ...prev,
                                        //         ContactPersonName: '',
                                        //         MobileNo: '',
                                        //         emailId: '',
                                        //         address: '',
                                        //         PinCode: '',
                                        //         state: '',
                                        //         City: '',
                                        //         productSerialNo: '',
                                        //         division: '',
                                        //         productType: '',
                                        //         productModel: '',
                                        //         invoiceNo: '',
                                        //         invoiceDate: '',
                                        //         batchNo: '',
                                        //         voltage: '',
                                        //         pole: '',
                                        //         status: ''
                                        //     }));
                                        //     return;
                                        // }
                                        // setactiveKey("1");
                                        if (result?.msgCode != "SAP404") {

                                          // if (data?.SerialNo != "") {

                                          setdata((prev) => {
                                            return {
                                              ...prev,
                                              // warrantyStartBatchDate: infolog[0]?.warrantyStartBatchDate,
                                              // warrantyEndBatch: infolog[0]?.warrantyEndBatch

                                              // CustomerName: result[0]?.customerName || "",
                                              // ContactPerson: result[0]?.contactPerson || "",
                                              // PrimaryMobileNo: result[0]?.primaryMobileNo || "",
                                              // EmailId: result[0]?.emailId || "",
                                              // AltContactNo: result[0]?.altContactNo,
                                              // AltEmailId: result[0]?.altEmailId,
                                              // Address1: result[0]?.address1,
                                              // PinId: result[0]?.pinId,
                                              // StateId: result[0]?.stateId,
                                              // CityId: result[0]?.cityId,
                                              // NameOfSpoc: result[0]?.nameOfSpoc,
                                              // SpocMobileNo: result[0]?.spocMobileNo,
                                              // SpocEmailId: result[0]?.spocMobileNo,
                                              // SiteAddress: result[0]?.siteAddress,
                                              // ProdInstallationPinId: result[0]?.prodInstallationPinCode,
                                              // ProdInstallationStateId: result[0]?.prodInstallationStateId,
                                              // ProdInstallationCityId: result[0]?.prodInstallationCityId,
                                              // SerialNo: result?.prodSerialNoWarrantyList?.serialNo,
                                              // DivCode: result?.prodSerialNoWarrantyList?.divisionCode,
                                              // ProductType: result?.prodSerialNoWarrantyList.productLineCode,
                                              // ProductCode: result[0]?.productCode,
                                              // PurchaseFrom: result[0]?.purchaseFrom,
                                              // InvoiceNo: result[0]?.invoiceNo,
                                              // InvoiceDate: result[0]?.invoiceDate?.split(" ")[0],
                                              // InvoceFilePath: result[0]?.invoceFilePath,
                                              // FrameSize: result[0]?.frameSize,
                                              // Voltage: result[0]?.voltage,
                                              // Pole: result[0]?.pole,
                                              // InWarranty: result[0]?.inWarranty == "In Warranty" ? true : false,
                                              // ProductDescription: result[0]?.productDescription,
                                              // BatchStartDate: result[0]?.batchStartDate,
                                              // BatchEndDate: result[0]?.batchEndDate,
                                              // DefectId: result?.defectId,
                                            };
                                          });
                                          // if (result?.primaryMobileNo != "") {
                                          //   setMobileNo(result?.primaryMobileNo)
                                          // }
                                          // }
                                          // else {
                                          //   setdata((prev) => {
                                          //     return {
                                          //       ...prev,
                                          //       ProdRegAutoId: result?.prodRegAutoId,
                                          //       CustVerificationId: result?.custVerificationId,
                                          //       CustomerName: result?.customerName || "",
                                          //       ContactPerson: result?.contactPerson || "",
                                          //       PrimaryMobileNo: result?.primaryMobileNo || "",
                                          //       EmailId: result?.emailId || "",
                                          //       AltContactNo: result?.altContactNo,
                                          //       AltEmailId: result?.altEmailId,
                                          //       Address1: result?.address1,
                                          //       PinId: result?.pinId,
                                          //       StateId: result?.stateId,
                                          //       CityId: result?.cityId,
                                          //       NameOfSpoc: result?.nameOfSpoc,
                                          //       SpocMobileNo: result?.spocMobileNo,
                                          //       SpocEmailId: result?.spocMobileNo,
                                          //       SiteAddress: result?.siteAddress,
                                          //       ProdInstallationPinId: result?.prodInstallationPinCode,
                                          //       ProdInstallationStateId: result?.prodInstallationStateId,
                                          //       ProdInstallationCityId: result?.prodInstallationCityId,
                                          //       // SerialNo: result?.serialNo,
                                          //       // DivCode: result?.divCode,
                                          //       // ProductType: result?.productType,
                                          //       // ProductCode: result?.productCode,
                                          //       // PurchaseFrom: result?.purchaseFrom,
                                          //       // InvoiceNo: result?.invoiceNo,
                                          //       // InvoiceDate: result?.invoiceDate?.split(" ")[0],
                                          //       // InvoceFilePath: result?.invoceFilePath,
                                          //       // FrameSize: result?.frameSize,
                                          //       // Voltage: result?.voltage,
                                          //       // Pole: result?.pole,
                                          //       // InWarranty: result?.inWarranty,
                                          //       // DefectId: result?.defectId,
                                          //     };
                                          //   });
                                          // }




                                          // if (data?.NameOfSpoc == data?.ContactPerson &&
                                          //   data?.SpocMobileNo == data?.PrimaryMobileNo &&
                                          //   data?.SpocEmailId == data?.EmailId &&
                                          //   data?.SiteAddress == data?.Address1 &&
                                          //   data?.ProdInstallationPinId == data?.PinId &&
                                          //   data?.ProdInstallationStateId == data?.StateId &&
                                          //   data?.ProdInstallationCityId == data?.CityId) {
                                          //   setdata((pre) => {
                                          //     return {
                                          //       ...pre,
                                          //       sameAsFirmDetails: 1,
                                          //     };
                                          //   });
                                          // }
                                          // else {
                                          //   setdata((pre) => {
                                          //     return {
                                          //       ...pre,
                                          //       sameAsFirmDetails: 0,
                                          //     };
                                          //   });
                                          // }



                                          fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllDivisionWiseProductLine?divisionCode=${data?.DivCode}`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          })
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result);
                                              setproductType(result);
                                            });



                                          fetch(
                                            `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${data?.productLineName}`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                          )
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result);


                                              setdefectsByPL(result);

                                            });


                                        }








                                        // else if(result?.msgCode=="SAP404"){
                                        //   Swal.fire({
                                        //     icon:"error",
                                        //     title:result?.msg
                                        //   })
                                        // }
                                        else if (result?.stateId) {

                                          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result.stateId ? result.stateId : '0'}&Code=0`;
                                          fetch(cityUrl)
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result);
                                              setcities(result);
                                            });
                                        }


                                        if (result?.prodInstallationStateId) {

                                          const cityUrl2 = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.prodInstallationStateId ? result?.prodInstallationStateId : "0"}&Code=0`;
                                          fetch(cityUrl2)
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result);
                                              setcities2(result);
                                            });
                                        }


                                        const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result?.divCode}`;

                                        fetch(getAllProductLines, {
                                          headers: {
                                            "Authorization": `Bearer ${token}`
                                          }
                                        })
                                          .then((res) => res.json())
                                          .then((result) => {
                                            console.log(result);
                                            setallproductLines(result);



                                          });






                                        // setMobileNo('')
                                      }


                                      if (result?.msgCode == "SAP404") {
                                        Swal.fire({
                                          icon: "error",
                                          title: result?.msg
                                        });

                                        // setinfolog([]);
                                      }
                                      if (result?.msgCode == "SAP1001") {
                                        Swal.fire({
                                          icon: "error",
                                          title: result?.msg
                                        });

                                        // setinfolog([]);
                                      }
                                      if (result?.msgCode == "SAP009") {
                                        Swal.fire({
                                          icon: "error",
                                          title: result?.msg
                                        });

                                        // setinfolog([]);
                                      }


                                    });
                                }




                              }}>Verify</Button>

                            </Col>
                          ) : ""
                        }



                      </>
                    }

                  </Row>}

                {/* <div className="d-flex justify-content-between" >


                    </div> */}

                {/* {prodType &&} */}





















                {/* <Col md={3} >
                  <Form.Group>
                    <Form.Label className="text-start">Serial No</Form.Label>
                    <Form.Control
                      type="text"
                      value={data?.SerialNo}
                      onChange={handleSerailNoChange}
                      onBlur={() => {

                        // alert("blured")
                        fetch(
                          `${process.env.REACT_APP_API_URL
                          }TelecallerServiceTicket/GetTelecallerProdSerialNo?SerialNo=${srNo}&MobileNo=${0}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((result) => {
                            console.log(result);
                            setinfolog(result);



                            if (result?.msg == "Service Ticket Available") {


                              handleShowExistingTicket(result?.msgCode);
                              // setloading(false)

                            }

                            else {

                              if (result?.prodInstallationPinCode) {
                                fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${result?.prodInstallationPinCode}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((resPin) => resPin.json())
                                  .then((response) => {
                                    console.log(response);
                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NearestPinCode: response[0]?.pinCode,
                                        NearestAscUserCode: response[0]?.userCode
                                      }
                                    })
                                  })
                              }
                              //           if(result?.prodInstallationCityId){


                              // // -----------------------------------------------------------Nearest Pinocde,ASc,Asm-------------------------------------



                              // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${1}`)
                              // .then((res) => res.json())
                              // .then((resultingNearestASCs) => {
                              //   console.log(resultingNearestASCs);







                              //   // -------------------------------------------nearest pincode-------------------------------------








                              //   async function getCoordinates(pincode, country) {
                              //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                              //     const data = await response.json();
                              //     if (data.length > 0) {
                              //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                              //     } else {
                              //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                              //     }
                              //   }


                              //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


                              //   async function calculateRoute() {
                              //     // const inputPincode = document.getElementById('inputPincode').value;
                              //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                              //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

                              //     try {
                              //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                              //       console.log(startCoords);

                              //       let nearestPincode = null;
                              //       let shortestDistance = Infinity;

                              //       for (const pincode of pincodeArray) {
                              //         const endCoords = await getCoordinates(pincode, 'IN');

                              //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

                              //         const response = await fetch(url);
                              //         const data = await response.json();

                              //         if (data.error) {
                              //           throw new Error(data.error.message);
                              //         }

                              //         const route = data.features[0];
                              //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                              //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                              //         if (distanceInKilometers < shortestDistance) {
                              //           shortestDistance = distanceInKilometers;
                              //           nearestPincode = pincode;
                              //         }
                              //       }

                              //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                              //       console.log(obj);
                              //       setdata((pre) => {
                              //         return {
                              //           ...pre,
                              //           NearestPinCode: nearestPincode,
                              //           NearestAscUserCode: obj[0]?.userCode,
                              //           NearestAsmUserCode: "ASM"
                              //         }
                              //       })


                              //       // setdata((pre) => {
                              //       //   return {
                              //       //     ...pre,

                              //       //   }
                              //       // })

                              //       setNearestPincode(nearestPincode);
                              //       setDistance(shortestDistance);


                              //       // Display nearest route on map
                              //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                              //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                              //       // const routeResponse = await fetch(routeUrl);
                              //       // const routeData = await routeResponse.json();

                              //       // const nearestRoute = routeData.features[0];
                              //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                              //       // const routeFeature = new Feature({
                              //       //   geometry: new LineString(coordinates),
                              //       // });
                              //       // const routeLayer = new VectorLayer({
                              //       //   source: new VectorSource({
                              //       //     features: [routeFeature],
                              //       //   }),
                              //       //   style: new Style({
                              //       //     stroke: new Stroke({
                              //       //       color: 'blue',
                              //       //       width: 2,
                              //       //     }),
                              //       //   }),
                              //       // });
                              //       // map.getLayers().forEach(layer => {
                              //       //   if (layer instanceof VectorLayer) {
                              //       //     map.removeLayer(layer);
                              //       //   }
                              //       // });
                              //       // map.addLayer(routeLayer);

                              //     } catch (error) {
                              //       console.error('Error calculating route:', error);
                              //       setDistance(null);
                              //     }
                              //   }




                              //   // Dummy functions to simulate React state setting
                              //   function setNearestPincode(pincode) {
                              //     if (document.getElementById('nearestPincode')) {

                              //       document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


                              //       pincode = ""
                              //     }
                              //   }

                              //   function setDistance(distance) {
                              //     if (document.getElementById('distance')) {

                              //       document.getElementById('distance').textContent = `Distance: ${distance} km`;
                              //       distance = ""
                              //     }
                              //   }




                              //   calculateRoute()

                              // })




                              // // -------------------------------------------------ASM--------------------------------------------------





                              // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result?.prodInstallationCityId}&DivisionCode=${result?.divCode}&Mode=${2}`)
                              // .then((res) => res.json())
                              // .then((resultingNearestASCs) => {
                              //   console.log(resultingNearestASCs);







                              //   // -------------------------------------------nearest pincode-------------------------------------








                              //   async function getCoordinates(pincode, country) {
                              //     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
                              //     const data = await response.json();
                              //     if (data.length > 0) {
                              //       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
                              //     } else {
                              //       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
                              //     }
                              //   }


                              //   const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


                              //   async function calculateRoute() {
                              //     // const inputPincode = document.getElementById('inputPincode').value;
                              //     // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
                              //     const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

                              //     try {
                              //       const startCoords = await getCoordinates(result?.prodInstallationPinCode, 'IN');
                              //       console.log(startCoords);

                              //       let nearestPincode = null;
                              //       let shortestDistance = Infinity;

                              //       for (const pincode of pincodeArray) {
                              //         const endCoords = await getCoordinates(pincode, 'IN');

                              //         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

                              //         const response = await fetch(url);
                              //         const data = await response.json();

                              //         if (data.error) {
                              //           throw new Error(data.error.message);
                              //         }

                              //         const route = data.features[0];
                              //         const distanceInMeters = route.properties.summary.distance; // Distance in meters
                              //         const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

                              //         if (distanceInKilometers < shortestDistance) {
                              //           shortestDistance = distanceInKilometers;
                              //           nearestPincode = pincode;
                              //         }
                              //       }

                              //       let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
                              //       console.log(obj);
                              //       setdata((pre) => {
                              //         return {
                              //           ...pre,
                              //           // NearestPinCode: nearestPincode,
                              //           // NearestAscUserCode: obj[0]?.userCode,
                              //           NearestAsmUserCode: obj[0]?.userCode
                              //         }
                              //       })


                              //       // setdata((pre) => {
                              //       //   return {
                              //       //     ...pre,

                              //       //   }
                              //       // })
                              //       // setNearestPincode(nearestPincode);
                              //       // setDistance(shortestDistance);


                              //       // Display nearest route on map
                              //       // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
                              //       // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
                              //       // const routeResponse = await fetch(routeUrl);
                              //       // const routeData = await routeResponse.json();

                              //       // const nearestRoute = routeData.features[0];
                              //       // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
                              //       // const routeFeature = new Feature({
                              //       //   geometry: new LineString(coordinates),
                              //       // });
                              //       // const routeLayer = new VectorLayer({
                              //       //   source: new VectorSource({
                              //       //     features: [routeFeature],
                              //       //   }),
                              //       //   style: new Style({
                              //       //     stroke: new Stroke({
                              //       //       color: 'blue',
                              //       //       width: 2,
                              //       //     }),
                              //       //   }),
                              //       // });
                              //       // map.getLayers().forEach(layer => {
                              //       //   if (layer instanceof VectorLayer) {
                              //       //     map.removeLayer(layer);
                              //       //   }
                              //       // });
                              //       // map.addLayer(routeLayer);

                              //     } catch (error) {
                              //       console.error('Error calculating route:', error);
                              //       // setDistance(null);
                              //     }
                              //   setloading(false)

                              //   }




                              //   // Dummy functions to simulate React state setting
                              //   // function setNearestPincode(pincode) {
                              //   //   if(document.getElementById('nearestPincode')){

                              //   //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


                              //   //     pincode = ""
                              //   //   }
                              //   // }

                              //   // function setDistance(distance) {
                              //   //   if(document.getElementById('distance')){

                              //   //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
                              //   //     distance = ""
                              //   //   }
                              //   // }




                              //   calculateRoute()

                              // })




                              // }




                              // -------------------------------------------------------------------------------------------------------------------------





                              // else  {
                              //     // alert(`No customer info found for MobileNo ${mobileNo}`);

                              //     setaddInfo((prev) => ({
                              //         ...prev,
                              //         ContactPersonName: '',
                              //         MobileNo: '',
                              //         emailId: '',
                              //         address: '',
                              //         PinCode: '',
                              //         state: '',
                              //         City: '',
                              //         productSerialNo: '',
                              //         division: '',
                              //         productType: '',
                              //         productModel: '',
                              //         invoiceNo: '',
                              //         invoiceDate: '',
                              //         batchNo: '',
                              //         voltage: '',
                              //         pole: '',
                              //         status: ''
                              //     }));
                              //     return;
                              // }

                              // setactiveKey("1");

                              if (result?.msgCode != "SAP404") {

                                if (srNo != "") {


                                  setdata((prev) => {
                                    return {
                                      ...prev,
                                      ProdRegAutoId: result?.prodRegAutoId,
                                      CustVerificationId: result?.custVerificationId,
                                      CustomerName: result?.customerName || "",
                                      ContactPerson: result?.contactPerson || "",
                                      PrimaryMobileNo: result?.primaryMobileNo || "",
                                      EmailId: result?.emailId || "",
                                      AltContactNo: result?.altContactNo,
                                      AltEmailId: result?.altEmailId,
                                      Address1: result?.address1,
                                      PinId: result?.pinId,
                                      StateId: result?.stateId,
                                      CityId: result?.cityId,
                                      NameOfSpoc: result?.nameOfSpoc,
                                      SpocMobileNo: result?.spocMobileNo,
                                      SpocEmailId: result?.spocMobileNo,
                                      SiteAddress: result?.siteAddress,
                                      ProdInstallationPinId: result?.prodInstallationPinCode,
                                      ProdInstallationStateId: result?.prodInstallationStateId,
                                      ProdInstallationCityId: result?.prodInstallationCityId,
                                      SerialNo: result?.serialNo,
                                      DivCode: result?.divCode,
                                      ProductType: result?.productType,
                                      ProductCode: result?.productCode,
                                      PurchaseFrom: result?.purchaseFrom,
                                      InvoiceNo: result?.invoiceNo,
                                      InvoiceDate: result?.invoiceDate?.split(" ")[0],
                                      InvoceFilePath: result?.invoceFilePath,
                                      FrameSize: result?.frameSize,
                                      Voltage: result?.voltage,
                                      Pole: result?.pole,
                                      InWarranty: result?.inWarranty == "In Warranty" ? true : false,
                                      ProductDescription: result?.productDescription
                                      // DefectId: result?.defectId,
                                    };
                                  });
                                  if (result?.primaryMobileNo != "") {

                                    setMobileNo(result?.primaryMobileNo)
                                  }

                                }
                                else {
                                  setdata((prev) => {
                                    return {
                                      ...prev,
                                      ProdRegAutoId: result?.prodRegAutoId,
                                      CustVerificationId: result?.custVerificationId,
                                      CustomerName: result?.customerName || "",
                                      ContactPerson: result?.contactPerson || "",
                                      PrimaryMobileNo: result?.primaryMobileNo || "",
                                      EmailId: result?.emailId || "",
                                      AltContactNo: result?.altContactNo,
                                      AltEmailId: result?.altEmailId,
                                      Address1: result?.address1,
                                      PinId: result?.pinId,
                                      StateId: result?.stateId,
                                      CityId: result?.cityId,
                                      NameOfSpoc: result?.nameOfSpoc,
                                      SpocMobileNo: result?.spocMobileNo,
                                      SpocEmailId: result?.spocMobileNo,
                                      SiteAddress: result?.siteAddress,
                                      ProdInstallationPinId: result?.prodInstallationPinCode,
                                      ProdInstallationStateId: result?.prodInstallationStateId,
                                      ProdInstallationCityId: result?.prodInstallationCityId,
                                      // SerialNo: result?.serialNo,
                                      // DivCode: result?.divCode,
                                      // ProductType: result?.productType,
                                      // ProductCode: result?.productCode,
                                      // PurchaseFrom: result?.purchaseFrom,
                                      // InvoiceNo: result?.invoiceNo,
                                      // InvoiceDate: result?.invoiceDate?.split(" ")[0],
                                      // InvoceFilePath: result?.invoceFilePath,
                                      // FrameSize: result?.frameSize,
                                      // Voltage: result?.voltage,
                                      // Pole: result?.pole,
                                      // InWarranty: result?.inWarranty,
                                      // DefectId: result?.defectId,
                                    };
                                  });
                                }






                                if (
                                  data?.NameOfSpoc == data?.ContactPerson &&
                                  data?.SpocMobileNo == data?.PrimaryMobileNo &&
                                  data?.SpocEmailId == data?.EmailId &&
                                  data?.SiteAddress == data?.Address1 &&
                                  data?.ProdInstallationPinId == data?.PinId &&
                                  data?.ProdInstallationStateId == data?.StateId &&
                                  data?.ProdInstallationCityId == data?.CityId
                                ) {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      sameAsFirmDetails: 1,
                                    };
                                  });
                                }
                                else {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      sameAsFirmDetails: 0,
                                    };
                                  });
                                }



                                fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllDivisionWiseProductLine?divisionCode=${result?.divCode}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setproductType(result);
                                  });



                                fetch(
                                  `${process.env.REACT_APP_API_URL}Issue/GetAllIssue?ProductLineCode=${result?.productCode}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                                )
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setdefectsByPL(result);
                                  });


                              }
                              // else if(result?.msgCode=="SAP404"){
                              //   Swal.fire({
                              //     icon:"error",
                              //     title:result?.msg
                              //   })
                              // }


                              else if (result?.stateId) {

                                const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result.stateId}&Code=0`;
                                fetch(cityUrl)
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setcities(result);
                                  });
                              }


                              if (result?.prodInstallationStateId) {

                                const cityUrl2 = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.prodInstallationStateId}&Code=0`;
                                fetch(cityUrl2)
                                  .then((res) => res.json())
                                  .then((result) => {
                                    console.log(result);
                                    setcities2(result);
                                  });
                              }


                              const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result?.divCode}`;

                              fetch(getAllProductLines, {
                                headers: {
                                  "Authorization": `Bearer ${token}`
                                }
                              })
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result);
                                  setallproductLines(result);



                                })






                              // setMobileNo('')


                            }

                          });



                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col> */}

              </Row>

              {/* 
              <Row className="justify-content-center mt-2">

              </Row> */}

              {data?.UserType == "" ? "" :
                <Row className="mt-2 justify-content-center">

                  {(data?.UserType == "136" || data?.UserType == "137") && !showProductType ? "" : (
                    <Card className="mt-3">
                      <Row>
                        <Col lg={4} md={12} sm={12}>
                          <Card
                            className="p-2"
                            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                          >
                            <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                              <div
                                style={{ backgroundColor: "white", borderRadius: "8px" }}
                                className="p-3"
                              >

                                <Row>

                                  {/* <Col lg={4} md={6} sm={6}>
                                  <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                                    width={40}
                                    height={40}
                                    alt=""
                                    srcset=""
                                  />
                                </Col> */}

                                  <Col lg={4} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      Product Serial no
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.sernr}
                                    </p>
                                  </Col>
                                  <Col lg={4} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      Product code
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.matnr}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>
                                      Product type
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {/* {productGroupInsert?.divisionName} */}
                                      {infolog[0]?.productLineName}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      Frame size
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.frame}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      Pole
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.pole}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      Voltage
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.kw}{infolog[0]?.kw ? "KW" : ''}
                                    </p>
                                  </Col>
                                  {infolog[0]?.divisionCode == "M4" ? <Col lg={3} md={6} sm={6}>
                                    <p className="m-0" style={{ fontSize: "12px" }}>
                                      HP
                                    </p>
                                    <p
                                      className="mt-1"
                                      style={{ fontWeight: "500", fontSize: "12px" }}
                                    >
                                      {infolog[0]?.hp}
                                    </p>
                                  </Col> : ""}
                                  <p className="text-start mt-3">Warranty Status :


                                    {infolog[0]?.warrantyStatus}</p>

                                </Row>
                              </div>
                            </Card>
                          </Card>
                        </Col>
                        <Col lg={8} md={12} sm={12}>
                          <Card
                            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                            className="p-4 pb-3"
                          >
                            <Row>
                              <p className="pg-label mt-2">Complaint Details</p>
                            </Row>
                            <Row className="text-start ">
                              {/* <p className="pg-label mt-3">Nature Complaint</p> */}


                              <Col md={4}>
                                <Form.Group className="">
                                  <Form.Label >
                                    Nature of Complaint (Customers Voice){" "}
                                    <span className="req-t">*</span>
                                  </Form.Label>
                                  <Form.Select
                                    name="DefectId"
                                    value={data?.DefectId}
                                    onChange={(e) => {

                                      customerhandleChange(e)
                                      const selectedIndex = e.target.selectedIndex

                                      let a = e.target.options[selectedIndex].getAttribute("code");
                                      // setselectedNature(a)


                                      fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=TelecallerCallMode`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((result) => {
                                          console.log(result);

                                          if (data?.DivCode == "DR" && a == "Commissioning or Installation") {
                                            let filtered = result?.filter(i => i?.parameterValId != "146" && i?.parameterValId != "148")
                                            console.log(filtered);
                                            let sortedArray = filtered.sort((a, b) => a.parameterValId - b.parameterValId);

                                            setcallModes(sortedArray)
                                          }
                                          // else if(data?.DivCode!="DR"){
                                          //   console.log(result)
                                          //   setcallModes(result) 
                                          // }
                                          else if (data?.productLineName == "C1") {
                                            let filtered = result?.filter(i => i?.parameterValId != "145")
                                            console.log(filtered);
                                            // let sortedArray = filtered.sort((a, b) => a.parameterValId - b.parameterValId);

                                            // console.log(sortedArray)

                                            setcallModes(filtered)
                                          }
                                          else {
                                            console.log(result);
                                            setcallModes(result)

                                          }

                                          // if(data?.DivCode=="DR" && a!="Commissioning or Installation"){
                                          //   // let filtered=result?.filter(i=>i?.parameterValId!="145" && i?.parameterValId!="147")
                                          //   // console.log(filtered);
                                          //   setcallModes(filtered) 

                                          // }





                                        })
                                    }}
                                  //disabled = {isDisabled}
                                  // onChange={(e) => {
                                  //   setdata((pre) => {
                                  //     return {
                                  //       ...pre,
                                  //       DefectId: e.target.value
                                  //     }
                                  //   })
                                  // }}
                                  //value={data?.defect}
                                  >
                                    <option value="">Select</option>

                                    {defectsByPL?.map((issue, index) => {
                                      return (
                                        <>
                                          <option value={issue?.issueTypeId} code={issue?.issueTypeName}>
                                            {issue?.issueTypeName}
                                          </option>
                                        </>
                                      );
                                    })}

                                    <option value="0">Others</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>

                              {data?.DefectId == "0" ? (
                                <Col md={3}>
                                  <Form.Group className="">
                                    <Form.Label>
                                      Remarks
                                    </Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      value={data?.Remarks}
                                      // rows={1}
                                      name="Remarks"
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              ) : (
                                ""
                              )}
                              <Col md={4} >
                                <Form.Group>
                                  <Form.Label className="text-start">Call Type</Form.Label>
                                  <Form.Select name="CallModeId" value={data?.CallModeId} onChange={customerhandleChange}>
                                    {data?.DivCode == "DR" && data?.DefectId != 0 ? "" : <option value="">Select</option>}

                                    {callModes?.map((modes, i) => {
                                      return (
                                        <>
                                          <option value={modes?.parameterValId}>
                                            {modes?.parameterText}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>



                            </Row>

                            <Row className='text-start'>
                              <Row>
                                <p className="pg-label mt-3">Customer/Firm Details</p>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label className="text-start">
                                      Customer/Firm Name <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"
                                      type="text"
                                      name="CustomerName"
                                      value={data?.CustomerName}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Contact Person Name <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"
                                      type="text"
                                      name="ContactPerson"
                                      value={data?.ContactPerson}
                                      onChange={(e) => {
                                        customerhandleChange(e)
                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Primary Mobile No <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="tel"
                                      name="PrimaryMobileNo"
                                      value={data?.PrimaryMobileNo}
                                      onChange={(e) => {
                                        handleMobileChange2(e)


                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    />

                                    {mobileError2 && (
                                      <span style={{ color: "red" }}>{mobileError2}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Email Id
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="email"
                                      name="EmailId"
                                      value={data?.EmailId}
                                      onChange={(e) => {
                                        handleEmailChange(e)
                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    />

                                    {emailError && (
                                      <span style={{ color: "red" }}>{emailError}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>

                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>Alternate Contact No</Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="tel"
                                      name="AltContactNo"
                                      value={data?.AltContactNo}
                                      onChange={handleMobileChange0}
                                    />

                                    {mobileError && (
                                      <span style={{ color: "red" }}>{mobileError}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>Alternate Email Id</Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="email"
                                      name="AltEmailId"
                                      value={data?.AltEmailId}
                                      onChange={handleEmailChange1}
                                    />

                                    {emailError1 && (
                                      <span style={{ color: "red" }}>{emailError1}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Address <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      as="textarea"
                                      rows={1}
                                      name="Address1"
                                      value={data?.Address1}
                                      onChange={(e) => {
                                        customerhandleChange(e)
                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      PinCode <span className="req-t">*</span>
                                    </Form.Label>
                                    {/* <Form.Select
                                    >
                                        <option value={data?.PinCode} >
                                            {data?.PinCode}
                                        </option>

                                    </Form.Select> */}
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="PinId"
                                      value={data?.PinId}
                                      onChange={(e) => {
                                        handlePinCodeChange(e);

                                        if (e.target.value && e.target.value?.length == 6) {
                                          fetch(
                                            `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value}&Code=0`
                                          )
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result[0]);
                                              setdata((pre) => {
                                                return {
                                                  ...pre,
                                                  StateId: result[0]?.parameterTypeId,
                                                };
                                              });

                                              // if(result[0]?.parameterTypeId)

                                              if (result[0] != undefined) {
                                                const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId ? result[0]?.parameterTypeId : "0"}&Code=0`;
                                                fetch(cityUrl)
                                                  .then((res) => res.json())
                                                  .then((result) => {
                                                    console.log(result);
                                                    setcities(result);
                                                  });
                                              }
                                            });

                                          fetch(
                                            `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value}&Code=0`
                                          )
                                            .then((res) => res.json())
                                            .then((result) => {
                                              console.log(result[0]);
                                              setdata((pre) => {
                                                return {
                                                  ...pre,
                                                  CityId: result[0]?.parameterTypeId,
                                                };
                                              });
                                            });
                                        } else {
                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              StateId: 0,
                                              CityId: 0,
                                            };
                                          });
                                        }


                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    />
                                    {pinError && <span style={{ color: "red" }}>{pinError}</span>}
                                  </Form.Group>
                                </Col>

                              </Row>


                              <Row >

                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      State <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Select
                                      value={data?.StateId}
                                      onChange={(e) => {
                                        setdata((pre) => {
                                          return {
                                            ...pre,
                                            StateId: e.target.value,
                                          };
                                        });

                                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value ? e.target.value : "0"}&Code=0`;
                                        fetch(cityUrl)
                                          .then((res) => res.json())
                                          .then((result) => {
                                            console.log(result);
                                            setcities(result);
                                          });


                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                      disabled
                                    >
                                      {/* <option value={data?.state} >
                                            {data?.state}
                                        </option> */}

                                      <option value="">Select</option>
                                      {states?.map((state, index) => {
                                        return (
                                          <>
                                            <option value={state?.parameterTypeId} key={index}>
                                              {state?.parameterType}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      City <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Select
                                      value={data?.CityId}
                                      disabled
                                      onChange={(e) => {
                                        customerhandleChange(e)
                                        if (data?.sameAsFirmDetails == 1) {

                                          setdata((pre) => {
                                            return {
                                              ...pre,
                                              NameOfSpoc: "",
                                              SpocMobileNo: "",
                                              SpocEmailId: "",
                                              SiteAddress: "",
                                              ProdInstallationPinId: "",
                                              ProdInstallationCityId: "",
                                              ProdInstallationStateId: "",
                                              sameAsFirmDetails: 0

                                            };
                                          });
                                        }
                                      }}
                                    >
                                      {/* <option value="">Select</option> */}
                                      {/* <option value={data?.City} >
                                            {data?.City}
                                        </option> */}
                                      <option value="">Select</option>
                                      {cities &&
                                        cities?.map((city, index) => {
                                          return (
                                            <>
                                              <option value={city?.parameterTypeId} key={index}>
                                                {city?.parameterType}
                                              </option>
                                            </>
                                          );
                                        })}
                                      {/* {data.map((city) => (
                                            <option
                                                key={city.city}
                                                value={city.city}
                                            >
                                                value={city.city}
                                            </option>
                                        ))} */}
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>


                              <div className="d-flex">
                                <p className="pg-label mt-4">Site details</p>
                                <Form.Check
                                  type="checkbox"
                                  checked={data?.ContactPerson == data?.NameOfSpoc && data?.PrimaryMobileNo == data?.SpocMobileNo && data?.EmailId == data?.SpocEmailId && data?.SiteAddress == data?.Address1 && data?.PinId == data?.ProdInstallationPinId && data?.StateId == data?.ProdInstallationStateId && data?.CityId == data?.ProdInstallationCityId && data?.sameAsFirmDetails == 1}
                                  value={data?.sameAsFirmDetails}
                                  // readOnly={isDisabled}
                                  // disabled={isDisabled}
                                  // value={data?.sameAsFirmDetails}
                                  // onChange={(e) => {
                                  //     if (e.target.checked) {
                                  //         setaddInfo((pre) => {
                                  //             return {
                                  //                 ...pre,
                                  //                 NameOfSpoc: data?.ContactPersonName,
                                  //                 SpocMobileNo: data?.MobileNo,
                                  //                 SpocEmailId: data?.emailId
                                  //             };
                                  //         });
                                  //     } else {
                                  //         setaddInfo((pre) => {
                                  //             return {
                                  //                 ...pre,
                                  //                 NameOfSpoc: "",
                                  //                 SpocMobileNo: "",
                                  //                 SpocEmailId: ""
                                  //             };
                                  //         });
                                  //     }
                                  // }}
                                  className="mt-4 mx-4"
                                  label="Same as above"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          NameOfSpoc: data?.ContactPerson,
                                          SpocMobileNo: data?.PrimaryMobileNo,
                                          SpocEmailId: data?.EmailId,
                                          SiteAddress: data?.Address1,
                                          ProdInstallationPinId: data?.PinId,
                                          ProdInstallationStateId: data?.StateId,
                                          ProdInstallationCityId: data?.CityId,
                                          sameAsFirmDetails: 1

                                        };
                                      });

                                      const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${data?.StateId ? data?.StateId : '0'}&Code=0`;
                                      fetch(cityUrl)
                                        .then((res) => res.json())
                                        .then((result) => {
                                          console.log(result);
                                          setcities2(result);
                                        });




                                      fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserGetAsc?Pincode=${data?.PinId}`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      })
                                        .then((resPin) => resPin.json())
                                        .then((response) => {
                                          console.log(response);
                                          if (response.length != 0) {
                                            setdata((pre) => {
                                              return {
                                                ...pre,
                                                NearestPinCode: response[0]?.pinCode,
                                                NearestAscUserCode: response[0]?.userCode
                                              }
                                            })
                                          }


                                          if (response[0]?.pinCode == data?.PinId) {
                                            // data.distance = "10";
                                            // console.log("distance" + data.distance);
                                            setdata((pre) => {
                                              return {
                                                ...pre,
                                                distance: '10',
                                                // NearestAscUserCode: response[0]?.userCode
                                              }
                                            })
                                            // return data;
                                          }
                                          else {
                                            calculateRoute(data?.PinId, response[0]?.pinCode, data)
                                          }
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
                                              // addData.distance = distanceInKilometers.toString();
                                              setdata((pre) => {
                                                return {
                                                  ...pre,
                                                  distance: distanceInKilometers.toString(),
                                                  // NearestAscUserCode: response[0]?.userCode
                                                }
                                              })
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
                                              // return addData;

                                            } catch (error) {
                                              console.error('Error calculating route:', error);
                                              // addData.distance = "";
                                              // return addData;
                                            }
                                          }



                                        })

                                    } else {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          NameOfSpoc: "",
                                          SpocMobileNo: "",
                                          SpocEmailId: "",
                                          SiteAddress: "",
                                          ProdInstallationPinId: "",
                                          ProdInstallationStateId: "",
                                          ProdInstallationCityId: "",
                                          sameAsFirmDetails: 0

                                        };
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <Row>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Contact Person <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="NameOfSpoc"
                                      value={data?.NameOfSpoc}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Contact Person Mobile No <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="SpocMobileNo"
                                      value={data?.SpocMobileNo}
                                      onChange={handleMobileChange1}
                                    />

                                    {mobileError1 && (
                                      <span style={{ color: "red" }}>{mobileError1}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Contact Person Email id
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="SpocEmailId"
                                      value={data?.SpocEmailId}
                                      onChange={handleEmailChange2}
                                    />

                                    {emailError2 && (
                                      <span style={{ color: "red" }}>{emailError2}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Address <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="SiteAddress"
                                      value={data?.SiteAddress}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      PinCode <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="ProdInstallationPinId"

                                      value={data?.ProdInstallationPinId}
                                      onChange={(e) => {
                                        handleProdPinCodeChange(e);




                                      }}
                                    />
                                    {loading ? <div className="d-flex mt-2"><p style={{ color: "blue" }} className="mt-1">Please wait </p><span className="mx-2">
                                      <Spinner />
                                    </span></div> : ""}
                                    {pinError1 && (
                                      <span style={{ color: "red" }}>{pinError1}</span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      State <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Select
                                      name="ProdInstallationStateId"
                                      value={data?.ProdInstallationStateId}
                                      disabled
                                      onChange={(e) => {
                                        setdata((pre) => {
                                          return {
                                            ...pre,
                                            ProdInstallationStateId: e.target.value,
                                          };
                                        });

                                        const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value ? e.target.value : '0'}&Code=0`;
                                        fetch(cityUrl)
                                          .then((res) => res.json())
                                          .then((result) => {
                                            console.log(result);
                                            setcities2(result);
                                          });
                                      }}
                                    >
                                      {/* <option value={data?.state} >
                                            {data?.state}
                                        </option> */}

                                      <option value="">Select</option>
                                      {states?.map((state, index) => {
                                        return (
                                          <>
                                            <option value={state?.parameterTypeId} key={index}>
                                              {state?.parameterType}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      City <span className="req-t">*</span>
                                    </Form.Label>
                                    <Form.Select
                                      name="ProdInstallationCityId"
                                      value={data?.ProdInstallationCityId}
                                      disabled
                                    >
                                      {/* <option value="">Select</option> */}
                                      {/* <option value={data?.City} >
                                            {data?.City}s
                                        </option> */}
                                      {/* {data.map((city) => (
                                            <option
                                                key={city.city}
                                                value={city.city}
                                            >
                                                value={city.city}
                                            </option>
                                        ))} */}

                                      <option value="">Select</option>
                                      {cities2 &&
                                        cities2?.map((city, index) => {
                                          return (
                                            <>
                                              <option value={city?.parameterTypeId} key={index}>
                                                {city?.parameterType}
                                              </option>
                                            </>
                                          );
                                        })}
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col md={4}>
                                  <Form.Group>
                                    <Form.Label>Purchased from </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="PurchaseFrom"
                                      value={data?.PurchaseFrom}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group>
                                    <Form.Label>Invoice No </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="text"
                                      name="InvoiceNo"
                                      value={data?.InvoiceNo}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group>
                                    <Form.Label>Invoice Date </Form.Label>
                                    <Form.Control
                                      autoComplete="new-password"

                                      type="date"
                                      name="InvoiceDate"
                                      max={currentDate}
                                      min={minInvoiceDate}
                                      value={moment(data?.InvoiceDate)?.format("YYYY-MM-DD")}
                                      onChange={customerhandleChange}
                                    />
                                  </Form.Group>
                                </Col>

                              </Row>
                              {
                                data?.DivCode == 'DR' || data?.DivCode == 'M7' || data?.productLineName == 'C2' || data?.productLineName == 'FD' ? '' : (
                                  <Row className="mt-3 align-items-center">
                                    <Col md={4}>
                                      <Form.Check
                                        type="checkbox"
                                        value={data?.Isreceived}
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        label="Product received at workshop?"

                                      />

                                    </Col>

                                    {
                                      isChecked && (
                                        <Col md={4}>
                                          <Form.Group>
                                            <Form.Label>Assign ASC</Form.Label>
                                            <Form.Select name="NearestAscUserCode" value={data?.NearestAscUserCode} onChange={(e) => {
                                              setdata((pre) => {
                                                return {
                                                  ...pre,
                                                  NearestAscUserCode: e.target.value
                                                }
                                              })
                                            }}>
                                              <option value="0">Select</option>
                                              {
                                                ASCs?.map((asc, i) => {
                                                  return (
                                                    <>
                                                      <option value={asc?.ascCode}>{asc?.ascTicketCount}</option>
                                                    </>
                                                  )
                                                })
                                              }
                                            </Form.Select>
                                          </Form.Group>
                                        </Col>

                                      )
                                    }

                                  </Row>
                                )
                              }

                              <Row className="justify-content-center align-items-center text-center mt-3">
                                <Col>
                                  <Button
                                    variant=""
                                    type="submit"

                                    className="add-Btn"
                                    style={{
                                      outline: "none",
                                      border: "none",

                                    }}
                                    disabled={
                                      mobileError ||
                                      mobileError1 ||
                                      mobileError2 ||
                                      emailError ||
                                      emailError1 ||
                                      emailError2 ||
                                      mobileErrorVerify


                                    }


                                    onClick={(e) => {
                                      e.preventDefault();







                                      const addRegWUrl = `${process.env.REACT_APP_API_URL}TelecallerServiceTicket/UpsertTelecallerProductCustomerInfo`;

                                      let n = {
                                        ...data,

                                      };



                                      if (data?.DivCode == '' || data?.UserType == "" || data?.CustomerName == "" || data?.ContactPerson == "" || data?.PrimaryMobileNo == "" || data?.Address1 == "" || data?.NameOfSpoc == "" || data?.SpocMobileNo == "" || data?.SiteAddress == "" || data?.DefectId == "" || mobileNo == "" || data?.ProdInstallationStateId == '' || data?.StateId == '') {
                                        Swal.fire({
                                          icon: "error",
                                          title: "Please fill all the fields marked with red *!"
                                        })
                                      }
                                      else {


                                        const formData = new FormData();
                                        Object.keys(n).forEach((key) => {
                                          // if (key === "InvoceFilePath") {
                                          //   formData.append(key, n[key]);
                                          // } else {
                                          formData.append(key, n[key]);
                                          // }
                                        });
                                        fetch(addRegWUrl, {
                                          method: "POST",
                                          headers: {
                                            // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                            "Authorization": `Bearer ${token}`
                                          },
                                          body: formData,
                                        }).then((res) => {
                                          let resp = res.text();
                                          resp.then((r) => {
                                            console.log(r);
                                            let regextest = /^[0-9]*$/;
                                            if (r.match(regextest)) {
                                              let getDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketById?ServiceTickeId=${r}`;

                                              fetch(getDetailUrl, {
                                                headers: {

                                                  "Authorization": `Bearer ${token}`
                                                },

                                              })
                                                .then((res) => res.json())
                                                .then((result) => {
                                                  console.log(result);
                                                  setticketSubmissionDetails(result[0]);
                                                });
                                              // let d=getElementById("RegForm")
                                              handleShowCustomer();
                                              // document.getElementById("RegForm")?.reset();
                                              setdata(prev => ({
                                                ...prev,
                                                ProdRegAutoId: 0,
                                                // ServiceRequestTypeName: '',
                                                CustVerificationId: 0,
                                                CustomerName: "",
                                                ContactPerson: "",
                                                PrimaryMobileNo: "",
                                                EmailId: "",
                                                CustAddess: "",
                                                AltContactNo: "",
                                                AltEmailId: "",
                                                SiteAddress: "",
                                                PinId: "",
                                                CityId: 0,
                                                StateId: 0,
                                                NameOfSpoc: "",
                                                SpocMobileNo: "",
                                                SpocEmailId: "",
                                                Address1: "",
                                                Address2: "",
                                                ProdInstallationPinId: "",
                                                ProdInstallationCityId: 0,
                                                ProdInstallationStateId: 0,
                                                SerialNo: "",
                                                DivCode: "",
                                                divisionName: '',
                                                productLineName: '',
                                                ProductType: '',
                                                ProductCode: "",
                                                ProductDescription: "",
                                                PurchaseFrom: "",
                                                InvoiceDate: "",
                                                InvoiceNo: "",

                                                InvoceFilePath: "",
                                                InWarranty: false,

                                                ProductGroup: "",
                                                FrameSize: "",
                                                Voltage: "",
                                                Pole: "",
                                                Kva: "",


                                                HP: "",
                                                Efficiency: "",
                                                Flp: "",
                                                IsDeviation: false,
                                                BatchStartDate: "",
                                                BatchEndDate: "",
                                                IsActive: true,
                                                DefectId: "",
                                                Remarks: "",
                                                sameAsFirmDetails: 0,
                                                NearestPinCode: "",
                                                NearestAscUserCode: "",
                                                NearestAsmUserCode: "",
                                                UserCode: "",
                                                TicketCreateName: "",
                                                TicketCreateNumber: "",
                                                UserType: "",
                                                DealerCode: "",
                                                RetailerCode: "",
                                                OEMCode: "",
                                                CallModeId: 0,
                                                IsPriority: "",
                                                callerName: '',
                                                SourceId: 142,
                                                ComplaintType: "",
                                                RequestType: "",
                                                AssignAgent: "",
                                                distance: "",
                                                Isreceived: 0

                                              }));
                                              setMobileNo('')
                                              setinfolog([])
                                              setIsChecked(false)
                                              setASCs([])



                                            }

                                            else if (r == "In Warranty") {
                                              handleShowpg();
                                              // document.getElementById("RegForm")?.reset();
                                              setdata([]);

                                            } else if (r == "In progress" || r == "Out Of Warranty") {
                                              // navigate(`${pathName}/warranty-verification`);
                                              handleShowDeviation();
                                              // document.getElementById("RegForm")?.reset();
                                              setdata([]);
                                            }
                                            else {
                                              Swal.fire({
                                                icon: "error",
                                                title: "Something went wrong!"
                                              })
                                            }
                                          });
                                        });
                                      }

                                    }}
                                  >
                                    Save
                                  </Button>


                                </Col>
                              </Row>


                            </Row>
                          </Card>

                        </Col>
                      </Row>
                    </Card>
                  )}

                </Row>}


              {(data?.UserType == "136" || data?.UserType == "137") && showSelfStock &&
                <DealerSelfStockCallCenter />
              }






            </Form>
          </Accordion.Body>
        </Accordion.Item>



      </Accordion >

      {/* <Modal
              show={showpg}
              onHide={handleClosepg}
              backdrop="static"
              size="xl"
              centered
            >
              <Modal.Header closeButton>

              </Modal.Header>
              <Modal.Body>
               
                <Row>
                  <Col xl={4} lg={4} sm={12}>
                    <Card
                      className="p-2"
                      style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                    >
                      <Card style={{ backgroundColor: "grey" }} className="p-3">
                        <div
                          style={{ backgroundColor: "white", borderRadius: "8px" }}
                          className="p-3"
                        >
                         
                          <Row>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product model
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.matnr : ""}
                              </p>
                            </Col>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product SN
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.sernr : ""}
                              </p>
                            </Col>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product type
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.productLineName : ""}
                              </p>
                            </Col>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Frame size
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.frame : ""}
                              </p>
                            </Col>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Pole
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.pole : ""}
                              </p>
                            </Col>
                            <Col md={4} sm={4}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Voltage
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.kw : ""} kw
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </Card>
                  </Col>
                  <Col xl={8} lg={8} sm={12}>
                    <Card
                      style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                      className="p-5"
                    >
                      <p
                        className="text-center"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        Welcome to the CG family and thank you for being a valuable
                        customer
                      </p>
                      <hr />
                      <p
                        className="text-center mt-2"
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        Your product warranty is valid upto <u>{moment((productDetails ? productDetails[0]?.warrantyEndBatch?.split(" ")[0] : "")).format("DD-MM-YYYY")}</u> , Click below
                        to get List of Service offering CGPISL.
                      </p>
                      <Row className="text-center">
                        <Col>
                          <Button variant="" className="add-Btn">
                            <a
                              href="https://somcg.mzservices.net/landingpage/landingpage"
                              target="_blank"
                            >
                              Click here
                            </a>
                          </Button>
                        </Col>
                      </Row>
                      <p
                        className="text-center mt-5"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "red",
                        }}
                      >
                        For any assistance required for your CG product, please call
                        our customer care number 1800 267 0505 OR CLICK below to
                        raise a Service Request.
                      </p>
                      <Row className="text-center">
                        <Col>
                          <Button variant="" className="add-Btn"
                            onClick={() => {
                              navigate(`${pathName}/raise-request`);
                            }}
                          >
                            Click here
                          </Button>
                        </Col>
                      </Row>{" "}
                      
                    </Card>
                  </Col>
                </Row>
              </Modal.Body>
           
            </Modal> */}

      {/* -----------------------------Deviation/out of warranty--------------------- */}


      <Modal show={showDeviation} onHide={handleCloseDeviation} size='xl' centered>

        <Modal.Body>
          <Row className='text-center'>
            <Col>
              <FaCheckCircle color='green' fontSize={30} />
            </Col>
          </Row>
          <p className='text-center mt-3' style={{ fontWeight: "500" }}>Your warranty request is registered successfully. You will get notification by SMS once verification will be completed by CGPISL team. Please bear with us.</p>
        </Modal.Body>
        <Modal.Footer>

          <Row className='text-center'>
            <Col>
              <Button variant="" className='add-Btn' onClick={() => {
                //  handleCloseDeviation()
                navigate(`${pathName}/reg-prod-Warranty`)
              }}>
                Continue
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>




      <Modal show={showCustomer} onHide={handleCloseCustomer} size='xl' backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Complaint number & ASC / ASM contact details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
            <Row
              className='text-start p-2'>
              <Col className="mt-3" md={12}>
                <h3 style={{
                  fontSize: '16px'
                }}>Complaint has been registered with SR number :
                  <span className="text-left pg-label-warranty " style={{
                    fontStyle: '500'
                  }}>
                    {ticketSubmissionDetails?.serviceTicketNumber}</span>
                </h3>
                {/* <h3 style={{
                        fontSize: '16px'
                      }}>                         Complaint will be attended by our team shortly
                      </h3> */}
              </Col>
              <Col className="mt-3" md={12}>
                <h3 style={{
                  fontSize: '16px'
                }}> The complaint will be resolved by CG authorised service center: <span className="text-left pg-label-warranty " style={{
                  fontStyle: '500'
                }}></span></h3>
              </Col>
              <Col className="mt-3" md={6}>
                <h3 style={{
                  fontSize: '16px'
                }}>ASC Name: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}> {ticketSubmissionDetails?.ascName}</span></h3>
              </Col>
              <Col className="mt-3" md={6}>
                <h3 style={{
                  fontSize: '16px'
                }}
                >ASC Contact Number: <span className="text-left pg-label-warranty " style={{
                  // color:'gray',
                  // fontSize:'18px',
                  fontStyle: '500'
                }}> {ticketSubmissionDetails?.ascMobileNo}</span></h3>
              </Col>
              {/* <Col className="mt-3" md={6}>
                      <h3 style={{
                        fontSize: '16px'
                      }}
                      >Assigned ASC: <span className="text-left pg-label-warranty " style={{
                        color:'gray',
                        fontSize:'18px',
                        fontStyle: '500'
                      }}> {ticketSubmissionDetails?.ascMobileNo}</span></h3>
                    </Col> */}
              <Col className="mt-3" md={6}>
                <h3 style={{
                  fontSize: '16px'
                }}> CG’s ASM: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmName}</span></h3>
              </Col>
              <Col className="mt-3" md={6}>
                <h3 style={{
                  fontSize: '16px'
                }}>  ASM email id: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmEmail}</span></h3>
              </Col>



            </Row>
          </Card>
        </Modal.Body>
        <Modal.Footer>

          <Row style={{
            width: '-webkit-fill-available'
          }} className='text-center'>
            <Col>
              <Button variant="" className='add-Btn' onClick={() => {
                handleCloseCustomer()



                // navigate(`${pathName}/dashboard`)
                // document.getElementById("ccForm").reset()
              }}>
                Ok
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>




















      <Modal show={showExistingTicket} onHide={handleCloseExistingTicket} backdrop="static" size="xl" centered>
        <Modal.Header>
          <Modal.Title className='mdl-title' style={{
            fontSize: '20px'
          }}>Your existing open Service Request:
            <p className="m-0" style={{ fontSize: '16px', color: '#000' }}> Please contact our ASC / ASM for further assistance </p></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
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
                        Customer/Firm Name
                      </Form.Label>
                      <p
                        style={{
                          fontSize: '12px'
                        }}
                      >{ticketDetails?.customerName}</p>

                    </Form.Group>
                    <Form.Group
                    >
                      <Form.Label>
                        Contact No
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails?.primaryMobileNo}</p>

                    </Form.Group>
                  </Col>
                </Col>
                {/* {ticketDetails.ascName != "" || ticketDetails.ascMobileNo != "" ? */}
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
                      }}>{ticketDetails?.ascName}</p>
                      {/* <Form.Control className="border-0"
                                                            type="text"
                                                            value='Editior ASC'
                                                            disabled

                                                            maxLength={15}
                                                        /> */}
                    </Form.Group>


                    <Form.Group
                    // style={{
                    //     width: "50%"
                    // }}
                    >
                      <Form.Label>
                        Contact No
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails?.ascMobileNo}</p>
                      {/* <Form.Control className="border-0"
                                                            type="text"
                                                            value='5456765676'
                                                            disabled

                                                            maxLength={15}
                                                        /> */}
                    </Form.Group>
                  </Col>
                </Col>
                {/* <></> */}
                {/* } */}

                {/* {ticketDetails?.asmName != "" || ticketDetails?.asmMobileNo != "" ? */}
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
                    // style={{
                    //     width: '50%'
                    // }}
                    >
                      <Form.Label>
                        ASM  Name
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails?.asmName}</p>
                      {/* <Form.Control className="border-0"
                                                            type="text"
                                                            maxLength={15}
                                                            value='GH23212'
                                                            disabled

                                                        /> */}
                    </Form.Group>
                    <Form.Group
                    // style={{
                    //     width: '50%'
                    // }}
                    >
                      <Form.Label>
                        ASM email id
                      </Form.Label>
                      <p style={{
                        fontSize: '12px'
                      }}>{ticketDetails?.asmEmail}</p>
                      {/* <Form.Control className="border-0"
                                                            type="text"
                                                            maxLength={15}
                                                            value='908789786'
                                                            disabled

                                                        /> */}
                    </Form.Group>
                  </Col>
                </Col>
                {/* <></> */}
                {/* } */}



              </Row>
              {/* <Row className="mt-3">
                                        <Col lg={6} className="">
                                            <h2 style={{
                                                fontSize: '16px',
                                                textAlign: 'center'
                                            }}> CG Branch Area Service Manager:</h2>
                                            <Col className="d-flex mt-3 "
                                                style={{
                                                    gap: '10px',
                                                }}
                                            >
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        ASM against the ticket
                                                    </Form.Label>
                                                    <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='GH23212'
                                                        disabled

                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <Form.Label>
                                                        Phone number's the ASM
                                                    </Form.Label>
                                                    <Form.Control className="border-0"
                                                        type="text"
                                                        maxLength={15}
                                                        value='908789786'
                                                        disabled

                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Col>




                                    </Row> */}
              <Row className="mt-3"
                style={{
                  padding: '0px 0px 0px 20px'
                }}
              >
                <h2 style={{
                  margin: '0px',
                  fontSize: '16px',
                  textAlign: 'left',
                  textAlign: 'underline'
                  // borderBottom:'1px solid'
                }}>Service Request</h2>
              </Row>

              <Row style={{
                padding: '0px 25px 0px 25px'
              }}>
                <Col className="mt-3">
                  <Form.Group
                    className="md:ml-2"

                  >
                    <Form.Label>
                      Service Request No
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.serviceTicketNumber}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    maxLength={15}
                                                    value='98YHTY'
                                                    disabled

                                                /> */}
                  </Form.Group>

                </Col>
                <Col className="mt-3">
                  <Form.Group


                  >
                    <Form.Label>
                      Request date
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{moment((ticketDetails?.RequestDate?.split(" ")[0])).format("YYYY-MM-DD")}</p>
                    {/* <Form.Control className="border-0"
                                                    type="date"
                                                    value='17/05/2024'
                                                    disabled
                                                /> */}
                  </Form.Group>

                </Col>


                <Col className="mt-3">
                  <Form.Group

                  >
                    <Form.Label>
                      Issue type
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.defectDesc}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='None'
                                                    disabled
                                                /> */}
                  </Form.Group>
                </Col>

                <Col className="mt-3">
                  <Form.Group
                    className="md:ml-2"


                  >
                    <Form.Label>
                      Product Type
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.productLineName}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='PLASTIC'
                                                    disabled

                                                /> */}
                  </Form.Group>
                </Col>
                <Col className="mt-3">
                  <Form.Group

                  >
                    <Form.Label>
                      Product Sr No
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.sernr}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='8767'
                                                    disabled

                                                /> */}
                  </Form.Group>
                </Col>
                <Col className="mt-3">
                  <Form.Group

                  >
                    <Form.Label>
                      Warranty
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.warrantyDateStatus}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='In Warranty'
                                                    disabled



                                                /> */}
                  </Form.Group>
                </Col>
                <Col className="mt-3">
                  <Form.Group

                  >
                    <Form.Label>
                      Location
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.siteAddress}</p>

                  </Form.Group>
                </Col>

                <Col className="mt-3">
                  <Form.Group>
                    <Form.Label>
                      Status
                    </Form.Label>
                    <p style={{
                      fontSize: '12px'
                    }}>{ticketDetails?.ticketStateus}</p>
                    {/* <Form.Control className="border-0"
                                                    type="text"
                                                    value='In Warranty'
                                                    disabled

                                                /> */}
                  </Form.Group>
                </Col>


              </Row>



            </Row>


          </Card>



        </Modal.Body>
        <Modal.Footer style={{
          justifyContent: 'center'
        }}>
          <Button variant="" type="reset" className='add-Btn' onClick={() => {
            handleCloseExistingTicket()
            // document.getElementById("ccForm").reset()
            // setdata([])
            // setMobileNo("")
            // setSrNo("")
          }} >
            OK

          </Button>
          {/* <Button variant="" className='add-Btn' onClick={handleEsclationShow} >
                                    ESCLATE
                                </Button> */}




        </Modal.Footer>

      </Modal>


    </>
  );
};

export default CallCenter;
