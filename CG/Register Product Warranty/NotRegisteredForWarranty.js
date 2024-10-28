import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import NavBar from "../Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEdit, FaEye } from "react-icons/fa";
import { usePathName } from "../../../constants";
import moment from "moment";
import { FaDownload } from 'react-icons/fa6'
import Footer from "../footer";
import { map } from "jquery";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { LineString } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

function NotRegisteredForWarranty() {

  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format


  const [UploadErrorMsg, setUploadErrorMsg] = useState("")

  const pathName = usePathName();
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false)
  const [file, setFile] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [minInvoiceDate, setMinInvoiceDate] = useState('');

  let TicketCreateName = localStorage.getItem("TicketCreateName")
  let TicktCreateNumber = localStorage.getItem("TicketCreateNumber")

  let TicketUserType = localStorage.getItem("UserTypeTicket")

  // let purchasedFrom = localStorage.getItem("PurchaseFrom")
  // let invNo = localStorage.getItem("InvoiceNumber")
  // let invDate = localStorage.getItem("InvoiceDate")
  // let invFile = localStorage.getItem("InvoiceFilePath")

  // let customerMobileNo = localStorage.getItem("CustomerMobile")


  let RedirectionRoute = localStorage.getItem("RedirectedFrom");

  // if (RedirectionRoute == "RaiseServiceTicket") {
  //   customerMobileNo = "";
  // }

  const [showDeviation, setShowDeviation] = useState(false);

  const handleCloseDeviation = () => setShowDeviation(false);
  const handleShowDeviation = () => setShowDeviation(true);

  let productDetails = JSON.parse(localStorage.getItem("productDetails"));


  let dealerOEM = localStorage.getItem("DealerOrOEMCode");


  let retailerCode = localStorage.getItem("RetailerCode")

  const [showpg, setShowpg] = useState(false);

  const handleClosepg = () => setShowpg(false);
  const handleShowpg = () => setShowpg(true);

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [cities2, setcities2] = useState([]);



  const [showCustomer, setShowCustomer] = useState(false);
  const handleCloseCustomer = () => setShowCustomer(false);
  const handleShowCustomer = () => setShowCustomer(true);

  const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=3&Id=0&Code=0`;

  useEffect(() => {
    fetch(stateUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result);
      });
  }, []);
  const [mobileError3, setMobileError3] = useState("");
  const [data, setdata] = useState({
    ProdRegAutoId: 0,
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
    SerialNo: productDetails ? productDetails[0]?.sernr : "",
    DivCode: productDetails ? productDetails[0]?.divisionCode : "",
    ProductCode: productDetails ? productDetails[0]?.matnr : "",
    PurchaseFrom: "",
    InvoiceDate: "",
    InvoiceNo: "",
    ManufacturingDate: productDetails ? productDetails[0]?.manufacturingDate : "",
    DateOfDispatch: productDetails ? productDetails[0]?.dateOfDispatch : "",
    InvoceFilePath: "",
    InWarranty: true,
    ProductType: productDetails ? productDetails[0]?.productLineName : "",
    productLineCode: productDetails ? productDetails[0]?.productLineCode : "",

    FrameSize: productDetails ? productDetails[0]?.frame : "",
    Voltage: productDetails ? productDetails[0]?.kw : "",
    Pole: productDetails ? productDetails[0]?.pole : "",
    Kva: productDetails ? productDetails[0]?.kva : "",
    SAPWarrantyDate: productDetails ? productDetails[0]?.warrantyEndBatch?.split(" ")[0] : "",
    HP: "",
    Efficiency: productDetails ? productDetails[0]?.effe : "",
    Flp: productDetails ? productDetails[0]?.flps : "",
    IsDeviation: false,
    BatchStartDate: productDetails ? productDetails[0]?.warrantyStartBatchDate : "",
    BatchEndDate: productDetails ? productDetails[0]?.warrantyEndBatch : "",
    IsActive: true,
    DefectId: "",
    Remarks: "",
    RedirectingFrom: RedirectionRoute,
    sameAsFirmDetails: 0,
    NearestPinCode: "",
    NearestAscUserCode: "",
    NearestAsmUserCode: "",
    UserCode: dealerOEM ? dealerOEM : RedirectionRoute == "Retailer" ? retailerCode : "",
    TicketCreateName: TicketCreateName ? TicketCreateName : "",
    TicketCreateNumber: TicktCreateNumber ? TicktCreateNumber : "",
    UserType: TicketUserType ? TicketUserType : "",
    DealerCode: dealerOEM ? dealerOEM : "",
    RetailerCode: retailerCode ? retailerCode : "",
    distance: ""
  });

  function setValueAndTriggerChangeforState(value) {
    const fakeEvent = {
      target: { value: value }
    };
    handleStateIdChange(fakeEvent);
  }
  function setValueAndTriggerpinCodeChangeChange(value) {
    const fakeEvent = {
      target: { value: value }
    };
    handleProdPinCodeChange(fakeEvent);

  }
  function handleProdPinCodeChange(e) {
    handlePinCodeChange1(e)




    if (e.target.value.length == 6) {
      fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserUnauthorizeGetAsc?Pincode=${e.target.value}`)
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


    if (
      e.target.value &&
      e.target.value?.length == 6
    ) {
      // setloading(true)

      fetch(
        `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value}&Code=0`
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
        `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=5&Id=${e.target.value}&Code=0`
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






          // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result[0]?.parameterTypeId}&DivisionCode=${prodRegAutoId ? prodegData?.divCode : productDetails[0]?.divisionCode}&Mode=${1}`)
          //   .then((res) => res.json())
          //   .then((resultingNearestASCs) => {
          //     console.log(resultingNearestASCs);







          //     // -------------------------------------------nearest pincode-------------------------------------








          //     async function getCoordinates(pincode, country) {
          //       const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
          //       const data = await response.json();
          //       if (data.length > 0) {
          //         return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
          //       } else {
          //         throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
          //       }
          //     }


          //     const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


          //     async function calculateRoute() {
          //       // const inputPincode = document.getElementById('inputPincode').value;
          //       // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
          //       const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

          //       try {
          //         const startCoords = await getCoordinates(e.target.value, 'IN');
          //         console.log(startCoords);

          //         let nearestPincode = null;
          //         let shortestDistance = Infinity;

          //         for (const pincode of pincodeArray) {
          //           const endCoords = await getCoordinates(pincode, 'IN');

          //           const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

          //           const response = await fetch(url);
          //           const data = await response.json();

          //           if (data.error) {
          //             throw new Error(data.error.message);
          //           }

          //           const route = data.features[0];
          //           const distanceInMeters = route.properties.summary.distance; // Distance in meters
          //           const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

          //           if (distanceInKilometers < shortestDistance) {
          //             shortestDistance = distanceInKilometers;
          //             nearestPincode = pincode;
          //           }
          //         }

          //         let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
          //         console.log(obj);
          //         setdata((pre) => {
          //           return {
          //             ...pre,
          //             NearestPinCode: nearestPincode,
          //             NearestAscUserCode: obj[0]?.userCode,
          //             NearestAsmUserCode: "ASM"
          //           }
          //         })


          //         // setdata((pre) => {
          //         //   return {
          //         //     ...pre,

          //         //   }
          //         // })
          //         setNearestPincode(nearestPincode);
          //         setDistance(shortestDistance);


          //         // Display nearest route on map
          //         // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
          //         // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
          //         // const routeResponse = await fetch(routeUrl);
          //         // const routeData = await routeResponse.json();

          //         // const nearestRoute = routeData.features[0];
          //         // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
          //         // const routeFeature = new Feature({
          //         //   geometry: new LineString(coordinates),
          //         // });
          //         // const routeLayer = new VectorLayer({
          //         //   source: new VectorSource({
          //         //     features: [routeFeature],
          //         //   }),
          //         //   style: new Style({
          //         //     stroke: new Stroke({
          //         //       color: 'blue',
          //         //       width: 2,
          //         //     }),
          //         //   }),
          //         // });
          //         // map.getLayers().forEach(layer => {
          //         //   if (layer instanceof VectorLayer) {
          //         //     map.removeLayer(layer);
          //         //   }
          //         // });
          //         // map.addLayer(routeLayer);

          //       } catch (error) {
          //         console.error('Error calculating route:', error);
          //         setDistance(null);
          //       }
          //     }




          //     // Dummy functions to simulate React state setting
          //     function setNearestPincode(pincode) {
          //       if (document.getElementById('nearestPincode')) {

          //         document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


          //         pincode = ""
          //       }
          //     }

          //     function setDistance(distance) {
          //       if (document.getElementById('distance')) {

          //         document.getElementById('distance').textContent = `Distance: ${distance} km`;
          //         distance = ""
          //       }
          //     }




          //     calculateRoute()

          //   })




          // // -------------------------------------------------ASM--------------------------------------------------









          // fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllCityPincodeMapping?Cityid=${result[0]?.parameterTypeId}&DivisionCode=${prodRegAutoId ? prodegData?.divCode : productDetails[0]?.divisionCode}&Mode=${2}`)
          //   .then((res) => res.json())
          //   .then((resultingNearestASCs) => {
          //     console.log(resultingNearestASCs);







          //     // -------------------------------------------nearest pincode-------------------------------------








          //     async function getCoordinates(pincode, country) {
          //       const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
          //       const data = await response.json();
          //       if (data.length > 0) {
          //         return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
          //       } else {
          //         throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
          //       }
          //     }


          //     const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key


          //     async function calculateRoute() {
          //       // const inputPincode = document.getElementById('inputPincode').value;
          //       // const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes
          //       const pincodeArray = resultingNearestASCs?.map(i => i?.pinCode); // Replace with your array of pincodes

          //       try {
          //         const startCoords = await getCoordinates(e.target.value, 'IN');
          //         console.log(startCoords);

          //         let nearestPincode = null;
          //         let shortestDistance = Infinity;

          //         for (const pincode of pincodeArray) {
          //           const endCoords = await getCoordinates(pincode, 'IN');

          //           const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

          //           const response = await fetch(url);
          //           const data = await response.json();

          //           if (data.error) {
          //             throw new Error(data.error.message);
          //           }

          //           const route = data.features[0];
          //           const distanceInMeters = route.properties.summary.distance; // Distance in meters
          //           const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

          //           if (distanceInKilometers < shortestDistance) {
          //             shortestDistance = distanceInKilometers;
          //             nearestPincode = pincode;
          //           }
          //         }

          //         let obj = resultingNearestASCs?.filter(i => i?.pinCode == nearestPincode)
          //         console.log(obj);
          //         setdata((pre) => {
          //           return {
          //             ...pre,
          //             // NearestPinCode: nearestPincode,
          //             // NearestAscUserCode: obj[0]?.userCode,
          //             NearestAsmUserCode: obj[0]?.userCode
          //           }
          //         })


          //         // setdata((pre) => {
          //         //   return {
          //         //     ...pre,

          //         //   }
          //         // })
          //         // setNearestPincode(nearestPincode);
          //         // setDistance(shortestDistance);


          //         // Display nearest route on map
          //         // const nearestCoords = await getCoordinates(nearestPincode, 'IN');
          //         // const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
          //         // const routeResponse = await fetch(routeUrl);
          //         // const routeData = await routeResponse.json();

          //         // const nearestRoute = routeData.features[0];
          //         // const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
          //         // const routeFeature = new Feature({
          //         //   geometry: new LineString(coordinates),
          //         // });
          //         // const routeLayer = new VectorLayer({
          //         //   source: new VectorSource({
          //         //     features: [routeFeature],
          //         //   }),
          //         //   style: new Style({
          //         //     stroke: new Stroke({
          //         //       color: 'blue',
          //         //       width: 2,
          //         //     }),
          //         //   }),
          //         // });
          //         // map.getLayers().forEach(layer => {
          //         //   if (layer instanceof VectorLayer) {
          //         //     map.removeLayer(layer);
          //         //   }
          //         // });
          //         // map.addLayer(routeLayer);

          //       } catch (error) {
          //         console.error('Error calculating route:', error);
          //         // setDistance(null);
          //       }
          //     setloading(false)

          //     }




          //     // Dummy functions to simulate React state setting
          //     // function setNearestPincode(pincode) {
          //     //   if(document.getElementById('nearestPincode')){

          //     //     document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;


          //     //     pincode = ""
          //     //   }
          //     // }

          //     // function setDistance(distance) {
          //     //   if(document.getElementById('distance')){

          //     //     document.getElementById('distance').textContent = `Distance: ${distance} km`;
          //     //     distance = ""
          //     //   }
          //     // }




          //     calculateRoute()

          //   })
          // // 

        });






    }
    // else if (e.target.value < 6 || e.target.value < 6) {
    //   document.getElementById('nearestPincode').textContent = `Nearest Pincode: `;
    //   document.getElementById('distance').textContent = `Distance: _ km`;

    // }
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
  function handleStateIdChange(e) {
    {
      setdata((pre) => {
        return {
          ...pre,
          ProdInstallationStateId: e.target.value,
        };
      });

      const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value}&Code=0`;
      fetch(cityUrl)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setcities2(result);
        });
    }
  }
  const handleChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;

    setdata(newdata);

    console.log(newdata);


  };




  const [emailError, setEmailError] = useState('');
  const [emailError1, setEmailError1] = useState('');
  const [emailError2, setEmailError2] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [mobileError1, setMobileError1] = useState('');
  const [mobileError2, setMobileError2] = useState('');
  const [pinError, setpinError] = useState('')
  const [pinError1, setpinError1] = useState('')
  const [isDisabled, setDisabled] = useState(false);


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
        EmailId: value
      }
    })
    if (!validateEmail(value) && value != "") {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };



  const handleEmailChange1 = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        AltEmailId: value
      }
    })
    if (!validateEmail(value) && value != "") {
      setEmailError1('Invalid email format');
    } else {
      setEmailError1('');
    }
  };



  const handleEmailChange2 = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        SpocEmailId: value
      }
    })
    if (!validateEmail(value) && value != "") {
      setEmailError2('Invalid email format');
    } else {
      setEmailError2('');
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

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setdata((pre) => {
      return {
        ...pre,
        AltContactNo: value
      }
    })
    if ((!validateMobile(value) && value != "") || parseInt(value).toString().length < 10) {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }
  };



  const handleMobileChange1 = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setdata((pre) => {
      return {
        ...pre,
        SpocMobileNo: value
      }
    })
    if ((!validateMobile(value) && value != "") || parseInt(value).toString().length < 10) {
      setMobileError1('Invalid mobile number');
    } else {
      setMobileError1('');
    }
  };




  const handleMobileChange2 = (e) => {
    const value = e.target.value;
    setdata((pre) => {
      return {
        ...pre,
        PrimaryMobileNo: value
      }
    })
    if (!validateMobile(value) && value != "") {
      setMobileError2('Invalid mobile number');
    } else {
      setMobileError2('');
    }
  };



  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setdata((pre) => {
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



  const handlePinCodeChange1 = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setdata((pre) => {
      return {
        ...pre,
        ProdInstallationPinId: value
      }
    })
    if (!validatePincode(value) && value != "") {
      setpinError1('Invalid PinCode. It must be 6 digits only');
    } else {
      setpinError1('');
    }
  };



  const [defectsByPL, setdefectsByPL] = useState([])

  useEffect(() => {
    // if(productDetails){

    fetch(`${process.env.REACT_APP_API_URL}Issue/GetAllIssueUnauthorize?ProductLineCode=${productDetails ? productDetails[0]?.productLineCode : ""}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdefectsByPL(result)
      })
    // }

  }, [])






  const [SPOC, setSPOC] = useState({
    Name: "",
    Contact: "",
    Email: ""
  })





  const [ticketSubmissionDetails, setticketSubmissionDetails] = useState([])


  useEffect(() => {
    if (localStorage.getItem("ProductWarrentyMsg")) {
      var ProductWarrentyMsg = JSON.parse(localStorage.getItem("ProductWarrentyMsg"));
      if (ProductWarrentyMsg.msg == "Already Register in System" && localStorage.getItem("RedirectedFrom") == "RaiseServiceTicket") {
        fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProductCustomerDeviationInfoByUnauthorizeId?ProdRegAutoId=${ProductWarrentyMsg.msgCode}`)
          .then((res) => res.json())
          .then((result) => {
            var newdata = { ...data };
            newdata.CustomerName = result.customerName;
            newdata.ContactPerson = result.contactPerson;
            newdata.PrimaryMobileNo = result.primaryMobileNo;
            newdata.EmailId = result.emailId;
            newdata.AltContactNo = result.altContactNo;
            newdata.AltEmailId = result.altEmailId;
            newdata.SiteAddress = result.siteAddress;
            newdata.PinId = result.pinCode;
            newdata.StateId = result.stateId;
            newdata.CityId = result.cityId;
            newdata.sameAsFirmDetails = result.sameAsFirmDetails;
            newdata.NameOfSpoc = result.nameOfSpoc;
            newdata.SpocMobileNo = result.spocMobileNo;
            newdata.SpocEmailId = result.spocEmailId;
            newdata.Address1 = result.address1;
            newdata.Address2 = result.address2;
            newdata.ProdInstallationPinId = result.prodInstallationPinCode;
            newdata.ProdInstallationStateId = result.prodInstallationStateId;
            newdata.ProdInstallationCityId = result.prodInstallationCityId;
            newdata.PurchaseFrom = result.purchaseFrom;
            newdata.InvoiceDate = moment((result.invoiceDate?.split(" ")[0])).format("YYYY-MM-DD");
            newdata.InvoiceNo = result.invoiceNo;
            newdata.InvoceFilePath = result.invoceFilePath;
            if (result?.stateId) {

              const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result.stateId}&Code=0`;
              fetch(cityUrl)
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  setcities(result);
                });
            }
            setDisabled(true);
            setdata(newdata);
            console.log(result);







            fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserUnauthorizeGetAsc?Pincode=${result?.prodInstallationPinCode}`)
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

            //setdefectsByPL(result)
          })
      }
      let a = productDetails[0]?.warrantyStartBatchDate?.split(' ')[0];


      // console.log(a);

      console.log(a)
      if (ProductWarrentyMsg?.msgCode == "SP200") {
        a = moment.format("DD-MM-YYYY")
      }
      // let d1 = new Date(a);
      // let d2 = new Date(data.InvoiceDate);
      setMinInvoiceDate(a);
      // if (d1 > d2) {
      //   setdata((pre) => {
      //     return {
      //       ...pre,
      //       InvoiceDate: ""
      //     }
      //   }
      //   )
      // }
    }

  }, [])

  const lastUnderscoreIndex = data?.invoceFilePath?.lastIndexOf("_");
  const fileNameWithExt = data?.invoceFilePath?.slice(lastUnderscoreIndex + 1);

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





  let prodRegAutoId = localStorage.getItem("ProductDataProdRegAutoId")



  const [prodegData, setprodegData] = useState([])
  // console.log(minInvoiceDate,'minnnn')



  useEffect(() => {
    if (prodRegAutoId) {
      fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProductCustomerInfoById?ProdRegAutoId=${prodRegAutoId}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setprodegData(result)

          if (result?.stateId && prodRegAutoId) {

            const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result?.stateId}&Code=0`;
            fetch(cityUrl)
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setcities(result);
              });

          }

          setdata((pre) => {
            return {
              ...pre,
              ProdRegAutoId: result?.prodRegAutoId != null ? result?.prodRegAutoId : "",
              CustomerName: result?.customerName != null ? result?.customerName : "",
              ContactPerson: result?.contactPerson != null ? result?.contactPerson : "",
              PrimaryMobileNo: result?.primaryMobileNo != null ? result?.primaryMobileNo : "",
              EmailId: result?.emailId != null ? result?.emailId : "",
              AltContactNo: result?.altContactNo != null ? result?.altContactNo : "",
              AltEmailId: result?.altEmailId != null ? result?.altEmailId : "",
              SiteAddress: result?.siteAddress != null ? result?.siteAddress : "",
              PinId: result?.pinCode != null ? result?.pinCode : "",
              StateId: result?.stateId != null ? result?.stateId : "",
              CityId: result?.cityId != null ? result?.cityId : "",
              NameOfSpoc: result?.nameOfSpoc != null ? result?.nameOfSpoc : "",
              SpocMobileNo: result?.spocMobileNo != null ? result?.spocMobileNo : "",
              SpocEmailId: result?.spocEmailId != null ? result?.spocEmailId : "",
              Address1: result?.address1 != null ? result?.address1 : "",
              Address2: result?.address2 != null ? result?.address2 : "",
              ProdInstallationPinId: result?.prodInstallationPinCode != null ? result?.prodInstallationPinCode : "",
              ProdInstallationStateId: result?.prodInstallationStateId != null ? result?.prodInstallationStateId : "",
              ProdInstallationCityId: result?.prodInstallationCityId != null ? result?.prodInstallationCityId : "",
              ProductCode: result?.productCode != null ? result?.productCode : "",
              SerialNo: result?.serialNo != null ? result?.serialNo : "",
              ProductType: result?.productType != null ? result?.productType : "",
              FrameSize: result?.frameSize != null ? result?.frameSize : "",
              Pole: result?.pole != null ? result?.pole : "",
              Voltage: result?.voltage != null ? result?.voltage : "",
              InWarranty: result?.inWarranty != null ? result?.inWarranty : "",
              Kva: result?.kva != null ? result?.kva : "",
              HP: result?.hp != null ? result?.hp : "",
              Flp: result?.flp != null ? result?.flp : "",
              Efficiency: result?.efficiency != null ? result?.efficiency : "",
              InvoceFilePath: result?.invoceFilePath != null ? result?.invoceFilePath : "",
              SAPWarrantyDate: result?.sapWarrantyDate != null ? result?.sapWarrantyDate : "",
              BatchStartDate: result?.batchStartDate != null ? result?.batchStartDate : "",
              BatchEndDate: result?.batchEndDate != null ? result?.batchEndDate : "",
              DivCode: result?.divCode != null ? result?.divCode : "",
              PurchaseFrom: result?.purchaseFrom != null ? result?.purchaseFrom : "",
              InvoiceNo: result?.invoiceNo != null ? result?.invoiceNo : "",
              InvoiceDate: result?.invoiceDate != null ? result?.invoiceDate : "",
              InvoceFilePath: result?.invoceFilePath != null ? result?.invoceFilePath : "",
              ManufacturingDate: result?.manufacturingDate != null ? result?.manufacturingDate : "",
              DateOfDispatch: result?.dateOfDispatch != null ? result?.dateOfDispatch : ""



            }
          })
          let a = result?.batchStartDate;
          a = moment.format("DD-MM-YYYY")
          let d1 = new Date(a);
          let d2 = new Date(data.InvoiceDate);
          // setMinInvoiceDate(a);
          if (d1 > d2) {
            setdata((pre) => {
              return {
                ...pre,
                InvoiceDate: ""
              }
            }
            )
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
          if (result?.prodInstallationPinCode) {


            fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserUnauthorizeGetAsc?Pincode=${result?.prodInstallationPinCode}`)
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


          if (result?.prodInstallationPinCode) {


            fetch(`${process.env.REACT_APP_API_URL}CityPincodeMapping/GetAllPinCodeUserUnauthorizeGetAsc?Pincode=${result?.prodInstallationPinCode}`)
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


        })
    }
  }, [prodRegAutoId])





  // useEffect(() => {
  // const handlePopState = () => {
  //   localStorage.removeItem('ProductDataProdRegAutoId');  // Replace 'yourKey' with the key you want to remove
  // };

  // Add event listener for 'popstate'
  //window.addEventListener('popstate', handlePopState);

  // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, []);


  return (
    <>
      <NavBar />
      <Row>
        <Col>
          <Card
            className="border-0 p-3 m-4"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
            {/* <NavBar/> */}
            <p className="m-0 text-start">
              <IoIosArrowRoundBack
                className="me-3"
                style={{ cursor: "pointer" }}
                fontSize={35}
                color="#005bab"
                onClick={() => {
                  localStorage.removeItem("ProductDataProdRegAutoId")
                  navigate(-1)
                }}
              />
              Back
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: '600'
            }} className="text-start  m-0">
              {RedirectionRoute == "RaiseServiceTicket" ? "Book your service request" : "Register Product warranty"}
            </p>
            <hr />



            <Row className="justify-content-start pt-0">

              {/* <Col>
                <p className="m-0 text-start">
                  <IoIosArrowRoundBack
                    className="me-3"
                    style={{ cursor: "pointer" }}
                    fontSize={35}
                    color="#005bab"
                    onClick={() => navigate(-1)}
                  />
                  Back
                </p>
              </Col> */}

              {/* <p className="text-start pg-label-warranty pt-3">
                {RedirectionRoute == "RaiseServiceTicket" ? "Fill out service request" : "Register product warranty"}
              </p> */}

              <Card className="p-3">
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
                          {/* <Row className="text-end m-0">
                            <Col>
                              <Button variant="">
                                <FaEdit />
                              </Button>
                            </Col>
                          </Row> */}
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
                                Product SN
                              </p>
                              <p
                                className="mt-1"
                                style={{ fontWeight: "500", fontSize: "12px" }}
                              >
                                {prodRegAutoId ? prodegData?.serialNo : productDetails[0]?.sernr}
                              </p>
                            </Col>
                            <Col lg={4} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "12px" }}>
                                Product Code
                              </p>
                              <p
                                className="mt-1"
                                style={{ fontWeight: "500", fontSize: "12px" }}
                              >
                                {prodRegAutoId ? prodegData?.productCode : productDetails[0]?.matnr}
                              </p>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "12px" }}>
                                Product type
                              </p>
                              <p
                                className="mt-1"
                                style={{ fontWeight: "500", fontSize: "12px" }}
                              >
                                {prodRegAutoId ? prodegData?.productType : productDetails[0]?.productLineName}
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
                                {prodRegAutoId ? prodegData?.frameSize : productDetails[0]?.frame}
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
                                {prodRegAutoId ? prodegData?.pole : productDetails[0]?.pole}
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
                                {prodRegAutoId ? prodegData?.voltage : productDetails[0]?.kw} kw
                              </p>
                            </Col>
                            {
                              ((prodRegAutoId && prodegData?.divisionCode == "M4") || (productDetails && productDetails[0]?.divisionCode == "M4")) ?
                                <Col lg={3} md={6} sm={6}>
                                  <p className="m-0" style={{ fontSize: "12px" }}>
                                    HP
                                  </p>
                                  <p
                                    className="mt-1"
                                    style={{ fontWeight: "500", fontSize: "12px" }}
                                  >
                                    {prodRegAutoId ? prodegData?.hp : productDetails[0]?.hp}
                                  </p>
                                </Col> : ""
                            }
                            {RedirectionRoute == "RaiseServiceTicket" ? <p className="text-start mt-3">Warranty Status:<u>{prodRegAutoId ? prodegData?.warrantyStatus : productDetails[0]?.warrantyStatus}</u></p> : ""}

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
                      <Form id="RegForm">
                        <Row className="text-start">
                          <p className="pg-label mt-3">Customer/Firm Details</p>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Customer/Firm Name <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                disabled={isDisabled}
                                value={data.CustomerName}
                                name="CustomerName"
                                onChange={(e) => {
                                  handleChange(e)
                                  if (data?.sameAsFirmDetails == 1) {

                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NameOfSpoc: "",
                                        SpocMobileNo: "",
                                        SpocEmailId: "",
                                        Address1: "",
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
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Contact Person Name <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="ContactPerson"
                                disabled={isDisabled}
                                value={data?.ContactPerson}
                                onChange={(e) => {
                                  handleChange(e)
                                  if (data?.sameAsFirmDetails == 1) {

                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NameOfSpoc: "",
                                        SpocMobileNo: "",
                                        SpocEmailId: "",
                                        Address1: "",
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
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Primary Mobile No. <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="tel"
                                autoComplete="new-password"
                                // readOnly={RedirectionRoute != "RaiseServiceTicket"}
                                // disabled={isDisabled}
                                value={data?.PrimaryMobileNo}
                                // name="PrimaryMobileNo"
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  if (value.startsWith('0')) {
                                    value = value.slice(1); // Remove the leading zero
                                  }
                                  e.target.value = value;
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      PrimaryMobileNo: e.target.value
                                    }
                                  })
                                  if ((!validateMobile(e.target.value) && e.target.value != "") || parseInt(e.target.value).toString().length < 10) {
                                    setMobileError3('Invalid mobile number');
                                  } else {
                                    setMobileError3('');
                                  }

                                  if (data?.sameAsFirmDetails == 1) {

                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NameOfSpoc: "",
                                        SpocMobileNo: "",
                                        SpocEmailId: "",
                                        Address1: "",
                                        ProdInstallationPinId: "",
                                        ProdInstallationCityId: "",
                                        ProdInstallationStateId: "",
                                        sameAsFirmDetails: 0

                                      };
                                    });
                                  }



                                }}


                                onBlur={(e) => {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      SpocMobileNo: data?.PrimaryMobileNo
                                    }
                                  })
                                }}
                              />
                              {mobileError3 && <span style={{ color: 'red' }}>{mobileError3}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Email Id <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                autocomplete="new-password"
                                disabled={isDisabled}
                                value={data.EmailId}
                                name="EmailId"
                                onChange={(e) => {
                                  handleEmailChange(e)

                                  if (data?.sameAsFirmDetails == 1) {

                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NameOfSpoc: "",
                                        SpocMobileNo: "",
                                        SpocEmailId: "",
                                        Address1: "",
                                        ProdInstallationPinId: "",
                                        ProdInstallationCityId: "",
                                        ProdInstallationStateId: "",
                                        sameAsFirmDetails: 0

                                      };
                                    });
                                  }
                                }}
                              />
                              {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Alternate contact No.{" "}
                              </Form.Label>
                              <Form.Control
                                type="tel"
                                autocomplete="new-password"
                                disabled={isDisabled}
                                value={data.AltContactNo}
                                name="AltContactNo"
                                onChange={handleMobileChange}
                              />
                              {mobileError && <span style={{ color: 'red' }}>{mobileError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Alternate email Id
                              </Form.Label>
                              <Form.Control
                                type="email"
                                autocomplete="new-password"
                                name="AltEmailId"
                                disabled={isDisabled}
                                value={data.AltEmailId}
                                onChange={handleEmailChange1}
                              />
                              {emailError1 && <span style={{ color: 'red' }}>{emailError1}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Address <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="SiteAddress"
                                disabled={isDisabled}
                                value={data?.SiteAddress}
                                onChange={(e) => {
                                  handleChange(e)
                                  if (data?.sameAsFirmDetails == 1) {

                                    setdata((pre) => {
                                      return {
                                        ...pre,
                                        NameOfSpoc: "",
                                        SpocMobileNo: "",
                                        SpocEmailId: "",
                                        Address1: "",
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
                            <Form.Group className="mt-2">
                              <Form.Label>
                                PinCode <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="PinId"
                                autocomplete="new-password"
                                readOnly={isDisabled}
                                value={data.PinId}
                                onChange={(e) => {
                                  handlePinCodeChange(e)
                                  if (
                                    e.target.value &&
                                    e.target.value?.length == 6
                                  ) {
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
                                          const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${result[0]?.parameterTypeId}&Code=0`;
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
                                        Address1: "",
                                        ProdInstallationPinId: "",
                                        ProdInstallationCityId: "",
                                        ProdInstallationStateId: "",
                                        sameAsFirmDetails: 0

                                      };
                                    });
                                  }
                                }}
                              />
                              {pinError && <span style={{ color: 'red' }}>{pinError}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                State <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Select
                                disabled
                                value={data?.StateId}
                                onChange={(e) => {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      StateId: e.target.value,
                                    };
                                  });

                                  const cityUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=4&Id=${e.target.value}&Code=0`;
                                  fetch(cityUrl)
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
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                City <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Select
                                disabled
                                value={data?.CityId}
                                onChange={handleChange}
                              >
                                <option value="">Select</option>
                                {cities && cities?.map((city, index) => {
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



                          <div className="d-flex">
                            <p className="pg-label mt-4">
                              Site details
                            </p>{" "}
                            <Form.Check
                              type="checkbox"
                              readOnly={isDisabled}
                              disabled={isDisabled}
                              checked={data?.ContactPerson == data?.NameOfSpoc && data?.PrimaryMobileNo == data?.SpocMobileNo && data?.EmailId == data?.SpocEmailId && data?.SiteAddress == data?.Address1 && data?.PinId == data?.ProdInstallationPinId && data?.StateId == data?.ProdInstallationStateId && data?.CityId == data?.ProdInstallationCityId && data?.sameAsFirmDetails == 1}
                              value={data?.sameAsFirmDetails}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      NameOfSpoc: data?.ContactPerson,
                                      SpocMobileNo: data?.PrimaryMobileNo,
                                      SpocEmailId: data?.EmailId,
                                      Address1: data?.SiteAddress,
                                      ProdInstallationPinId: data?.PinId,
                                      ProdInstallationStateId: data?.StateId,
                                      ProdInstallationCityId: data?.CityId,
                                      sameAsFirmDetails: 1

                                    };
                                  });
                                  //setCityListAsPerState(data?.StateId);
                                  setValueAndTriggerChangeforState(data?.StateId);
                                  setValueAndTriggerpinCodeChangeChange(data?.PinId);
                                } else {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      NameOfSpoc: "",
                                      SpocMobileNo: "",
                                      SpocEmailId: "",
                                      Address1: "",
                                      ProdInstallationPinId: "",
                                      ProdInstallationCityId: "",
                                      ProdInstallationStateId: "",
                                      sameAsFirmDetails: 0

                                    };
                                  });
                                }
                              }}
                              className="mt-4 mx-4"
                              label="Same as above"
                            />
                          </div>
                          {/* {data?.sameAsFirmDetails == 1 ? (
                        ""
                      ) : (
                        <> */}
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Contact Person Name <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="NameOfSpoc"
                                readOnly={isDisabled}
                                value={data?.NameOfSpoc}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Contact Person Mobile No <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="tel"
                                autocomplete="new-password"
                                name="SpocMobileNo"
                                readOnly={isDisabled}
                                value={data?.SpocMobileNo}
                                onChange={handleMobileChange1}
                              />
                              {mobileError1 && <span style={{ color: 'red' }}>{mobileError1}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Contact Person email Id
                              </Form.Label>
                              <Form.Control
                                type="email"
                                autocomplete="new-password"
                                name="SpocEmailId"
                                readOnly={isDisabled}
                                value={data?.SpocEmailId}
                                onChange={handleEmailChange2}
                              />
                              {emailError2 && <span style={{ color: 'red' }}>{emailError2}</span>}

                            </Form.Group>
                          </Col>
                          {/* </>
                          )} */}
                          {/* <p className="mt-3">Product installation address</p> */}

                          <Col md={6}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Address <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="Address1"
                                readOnly={isDisabled}
                                value={data?.Address1}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col md={6}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Address line 2 <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="Address2"
                                readOnly={isDisabled}
                                value={data?.Address2}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col> */}
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                PinCode <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="tel"
                                autocomplete="new-password"
                                name="ProdInstallationPinId"
                                readOnly={isDisabled}
                                value={data?.ProdInstallationPinId}
                                onChange={handleProdPinCodeChange}
                              />
                              {loading ? <div className="d-flex mt-2"><p style={{ color: "blue" }} className="mt-1">Please wait </p><span className="mx-2">
                                <Spinner />
                              </span></div> : ""}
                              {pinError1 && <span style={{ color: 'red' }}>{pinError1}</span>}

                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                State <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Select
                                disabled
                                value={data?.ProdInstallationStateId}
                                onChange={handleStateIdChange}
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
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                City <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Select
                                disabled
                                value={data?.ProdInstallationCityId}
                                onChange={handleChange}
                              >
                                <option value="">Select</option>
                                {cities2 &&
                                  cities2?.map((city, index) => {
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

                        {/* <div id="nearestPincode"></div>
                      <div id="distance"></div> */}
                        {/* {localStorage.getItem("RedirectedFrom") == "RegisterProduct" || (productDetails[0]?.warrantyStatus == "In Warranty" || productDetails[0]?.warrantyStatus == "In progress") ? */}
                        {/* <> */}

                        <Row className="text-start mt-3">
                          <p className="pg-label mt-3">Purchase Info</p>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Purchased From <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                readOnly={isDisabled}
                                type="text"
                                autocomplete="new-password"
                                name="PurchaseFrom"
                                value={data?.PurchaseFrom}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Purchase Date <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="date"
                                readOnly={isDisabled}
                                name="InvoiceDate"
                                value={moment(data?.InvoiceDate)?.format("YYYY-MM-DD")}
                                min={moment(productDetails[0]?.warrantyStartBatchDate?.split(' ')[0])?.format('YYYY-MM-DD')}
                                max={currentDate}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mt-2">
                              <Form.Label>
                                Invoice Number <span className="req-t">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                autocomplete="new-password"
                                name="InvoiceNo"
                                readOnly={isDisabled}
                                value={data?.InvoiceNo}
                                onChange={(e) => {
                                  setdata((pre) => {
                                    return {
                                      ...pre,
                                      InvoiceNo: e.target.value,
                                    };
                                  });
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            {isDisabled ?
                              <>
                                <Form.Group className='mt-2'>
                                  <Form.Label>Download Invoice Copy</Form.Label>
                                  {data?.InvoceFilePath ?

                                    <p style={{ cursor: "pointer" }} onClick={(e) => {
                                      e.preventDefault();

                                      // let url = `${process.env.REACT_APP_API_URL+val}`
                                      // saveAs(url, "File");

                                      // ------------------------------Calling API to get File--------------------------------------



                                      const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFileUnauthorize?FilePath=${data?.InvoceFilePath}`;


                                      fetch(downloadUrl)
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
                                    }}  >{fileNameWithExt} <FaDownload fontSize={20} color='green' className='mx-4' /></p> : <p>No file available</p>

                                  }
                                </Form.Group>
                              </> :
                              <Form.Group className="mt-2">
                                <Form.Label>
                                  Upload Invoice Copy <span className="req-t">*</span>
                                </Form.Label>
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .doc, .docx,.png" // Specify accepted file types



                                    readOnly={isDisabled}
                                    // value={data?.InvoceFilePath}
                                    onChange={(e) => {
                                      if (e.target.files.length > 0) {
                                        const file = e.target.files[0];
                                        if (file) {
                                          // Check if the file type is allowed
                                          if (/\.(pdf|doc|docx|jpg|jpeg|PNG)$/i.test(file.name)) {
                                            setdata((prevData) => ({
                                              ...prevData,
                                              InvoceFilePath: file,
                                            }));
                                            setUploadErrorMsg("")
                                            setFile(URL.createObjectURL(e.target.files[0]));
                                          } else {
                                            setUploadErrorMsg("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                            // Optionally clear the file input
                                            e.target.value = null;
                                          }
                                        }
                                      }
                                      else {
                                        setdata((pre) => {
                                          return {
                                            ...pre,
                                            InvoceFilePath: ""
                                          }
                                        })
                                      }
                                      // setdata((pre) => {
                                      //   return {
                                      //     ...pre,
                                      //     InvoceFilePath: e.target.files[0],
                                      //   };
                                      // });
                                    }}
                                  />
                                  {(data?.InvoceFilePath != "" && !UploadErrorMsg) ?
                                    <InputGroup.Text onClick={(e) => {
                                      //setPreviewfile(!previewfile);
                                      if (file) {
                                        window.open(file, '_blank');
                                      }
                                      console.log("helo")
                                    }}>
                                      <FaEye style={{ cursor: "pointer" }} color="#7bc143" fontSize={20} />


                                    </InputGroup.Text> : ""

                                  }
                                </InputGroup>

                                {UploadErrorMsg && <span style={{ color: 'red' }}>{UploadErrorMsg}</span>}

                              </Form.Group>
                            }

                          </Col>
                        </Row>



                        {RedirectionRoute == "RaiseServiceTicket" ?
                          <>
                            <Row className="text-start mt-3">
                              <p className="pg-label mt-3">Nature Complaint</p>


                              <Col md={3}>
                                <Form.Group className="mt-2">
                                  <Form.Label>
                                    Nature of Complaint (Customers Voice) <span className="req-t">*</span>
                                  </Form.Label>
                                  <Form.Select name="DefectId"
                                    //disabled = {isDisabled}
                                    onChange={(e) => {
                                      setdata((pre) => {
                                        return {
                                          ...pre,
                                          DefectId: e.target.value
                                        }
                                      })
                                    }}
                                  //value={data?.defect}
                                  >
                                    <option value="">Select</option>
                                    {defectsByPL?.map((defect, index) => {
                                      return (
                                        <>
                                          <option value={defect?.issueTypeId}>{defect?.issueTypeName}</option>
                                        </>
                                      );
                                    })}
                                    <option value="0">Others</option>

                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              {data?.DefectId == "0" ? <Col md={6}>
                                <Form.Group className="mt-2">
                                  <Form.Label>
                                    Remarks <span className="req-t">*</span>
                                  </Form.Label>
                                  <Form.Control as="textarea"
                                    value={data?.Remarks}
                                    rows={3} name="Remarks"
                                    onChange={handleChange} />
                                </Form.Group>
                              </Col> : ""}
                            </Row >
                            <>
                            </></> : ""
                        }
                        <Row className="text-center m-0 mt-3">
                          <Col>
                            <Button
                              variant=""
                              className="add-Btn"
                              disabled={loading || mobileError3 || mobileError1}
                              onClick={(e) => {
                                e.preventDefault();

                                const addRegWUrl = `${process.env.REACT_APP_API_URL}ProdCustInfo/UpsertProductCustomerInfo`;

                                if (
                                  data?.CustomerName == "" ||
                                  data?.ContactPerson == "" ||
                                  data?.PrimaryMobileNo == "" ||
                                  data?.EmailId == "" ||
                                  data?.PinId == "" ||
                                  data?.StateId == "" ||
                                  data?.CityId == "" ||
                                  data?.Address1 == "" ||
                                  data?.ProdInstallationPinId == "" ||
                                  data?.ProdInstallationStateId == "" ||
                                  data?.ProdInstallationCityId == "" ||
                                  data?.PurchaseFrom == "" ||
                                  data?.PurchaseDate == "" ||
                                  data?.InvoiceNo == "" ||
                                  (prodRegAutoId == "" && data?.InvoceFilePath == "")
                                ) {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Please fill all the fields marked with red *!"
                                  })
                                }
                                // else if ((data?.sameAsFirmDetails == "0") && (data?.NameOfSpoc == "" || data?.SpocMobileNo == "" || data?.SpocEmailId == "")) {
                                //   Swal.fire({
                                //     icon: "error",
                                //     title: "Please fill all the fields marked with red *!"

                                //   })
                                // }
                                else if (localStorage.getItem("RedirectedFrom") == "RaiseServiceTicket" && data?.DefectId == "") {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Please fill all the fields marked with red *!"
                                  })
                                }
                                else {


                                  let n = {
                                    ...data,
                                    // NatureOfComplaint: data?.NatureOfComplaint?.toString()
                                  }

                                  const formData = new FormData();
                                  Object.keys(n).forEach((key) => {
                                    if (key === "InvoceFilePath") {
                                      formData.append(key, n[key]);
                                    } else {
                                      formData.append(key, n[key]);
                                    }
                                  });
                                  fetch(addRegWUrl, {
                                    method: "POST",
                                    // headers: {
                                    //     // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                    //     "Authorization": `Bearer ${token}`
                                    // },
                                    body: formData,
                                  }).then((res) => {
                                    let resp = res.text();
                                    resp.then((r) => {
                                      //localStorage.removeItem("ProductDataProdRegAutoId")
                                      localStorage.removeItem("UserTypeTicket")
                                      localStorage.removeItem("TicketCreateName")
                                      localStorage.removeItem("TicketCreateNumber")
                                      localStorage.removeItem("DealerOrOEMCode")
                                      localStorage.removeItem("RetailerCode")
                                      console.log(r);
                                      let regextest = /^[0-9]*$/;
                                      if (r.match(regextest)) {

                                        let getDetailUrl = `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketByIdUnauthorize?ServiceTickeId=${r}`;


                                        fetch(getDetailUrl)
                                          .then((res) => res.json())
                                          .then((result) => {
                                            console.log(result);
                                            setticketSubmissionDetails(result[0])
                                          })
                                        handleShowCustomer()
                                      }

                                      //                           if (res.status == 200) {
                                      //                             Swal.fire({
                                      //                               icon: "success",
                                      //                               title: "Saved successfully!",
                                      //                             });
                                      //                             document.getElementById("RegForm")?.reset();
                                      //                             setdata({
                                      //                               ProdRegAutoId: 0,
                                      // CustVerificationId: 0,
                                      // CustomerName: "",
                                      // ContactPerson: "",
                                      // PrimaryMobileNo: "",
                                      // EmailId: "",
                                      // CustAddess: "",
                                      // AltContactNo: "",
                                      // AltEmailId: "",
                                      // SiteAddress: "",
                                      // PinId: 0,
                                      // CityId: 0,
                                      // StateId: 0,
                                      // NameOfSpoc: "",
                                      // SpocMobileNo: "",
                                      // SpocEmailId: "",
                                      // Address1: "",
                                      // Address2: "",
                                      // ProdInstallationPinId: 0,
                                      // ProdInstallationCityId: 0,
                                      // ProdInstallationStateId: 0,
                                      // SerialNo: productDetails[0]?.sernr,
                                      // DivCode: productDetails[0]?.divisionCode,
                                      // ProductCode: productDetails[0]?.matnr,
                                      // PurchaseFrom: "",
                                      // InvoiceDate: "",
                                      // InvoiceNo: "",

                                      // InvoceFilePath: "",
                                      // InWarranty: true,
                                      // ProductType: productDetails[0]?.productLineName,
                                      // FrameSize: productDetails[0]?.frame,
                                      // Voltage: productDetails[0]?.kw,
                                      // Pole: productDetails[0]?.pole,
                                      // Kva: productDetails[0]?.kva,
                                      // SAPWarrantyDate: productDetails[0]?.warrantyEndBatch?.split(" ")[0],
                                      // HP: "",
                                      // Efficiency: productDetails[0]?.effe,
                                      // Flp: productDetails[0]?.flps,
                                      // IsDeviation: false,
                                      // BatchStartDate:productDetails[0]?.warrantyStartBatchDate,
                                      // BatchEndDate:productDetails[0]?.warrantyEndBatch,
                                      // IsActive: true,
                                      // sameAsFirmDetails: 0,
                                      //                             })

                                      //                           }
                                      // else
                                      else if (r == "In Warranty") {
                                        handleShowpg();
                                        let handleForm = document.getElementById("RegForm")
                                        handleForm.reset()
                                        setdata({})
                                      }
                                      else if (r == "In progress" || r == "Out Of Warranty") {
                                        // navigate(`${pathName}/warranty-verification`);
                                        handleShowDeviation()
                                        let handleForm = document.getElementById("RegForm")
                                        handleForm.reset()

                                        setdata({})

                                      }


                                      // else{
                                      //   document.getElementById("RegForm")?.reset();
                                      //   setdata({
                                      //                                   ProdRegAutoId: 0,
                                      //     CustVerificationId: 0,
                                      //     CustomerName: "",
                                      //     ContactPerson: "",
                                      //     PrimaryMobileNo: "",
                                      //     EmailId: "",
                                      //     CustAddess: "",
                                      //     AltContactNo: "",
                                      //     AltEmailId: "",
                                      //     SiteAddress: "",
                                      //     PinId: 0,
                                      //     CityId: 0,
                                      //     StateId: 0,
                                      //     NameOfSpoc: "",
                                      //     SpocMobileNo: "",
                                      //     SpocEmailId: "",
                                      //     Address1: "",
                                      //     Address2: "",
                                      //     ProdInstallationPinId: 0,
                                      //     ProdInstallationCityId: 0,
                                      //     ProdInstallationStateId: 0,
                                      //     SerialNo: productDetails[0]?.sernr,
                                      //     DivCode: productDetails[0]?.divisionCode,
                                      //     ProductCode: productDetails[0]?.matnr,
                                      //     PurchaseFrom: "",
                                      //     InvoiceDate: "",
                                      //     InvoiceNo: "",

                                      //     InvoceFilePath: "",
                                      //     InWarranty: true,
                                      //     ProductType: productDetails[0]?.productLineName,
                                      //     FrameSize: productDetails[0]?.frame,
                                      //     Voltage: productDetails[0]?.kw,
                                      //     Pole: productDetails[0]?.pole,
                                      //     Kva: productDetails[0]?.kva,
                                      //     SAPWarrantyDate: productDetails[0]?.warrantyEndBatch?.split(" ")[0],
                                      //     HP: "",
                                      //     Efficiency: productDetails[0]?.effe,
                                      //     Flp: productDetails[0]?.flps,
                                      //     IsDeviation: false,
                                      //     BatchStartDate:productDetails[0]?.warrantyStartBatchDate,
                                      //     BatchEndDate:productDetails[0]?.warrantyEndBatch,
                                      //     IsActive: true,
                                      //     sameAsFirmDetails: 0,
                                      //                                 })

                                      // }
                                    });
                                  });
                                }

                                // if(data?.InvoiceNo=="1234"){
                                //   handleShowpg()
                                // }
                                // else{
                                //   navigate(`${pathName}/warranty-verification`)
                                // }
                              }}
                            >
                              Submit
                            </Button>
                          </Col>
                          {/* <Col>
<Button variant='' className='add-Btn' onClick={handleShow}> (Registration Pending)</Button>
</Col> */}
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Row>

            <Modal show={show} onHide={handleClose} size="xl" centered>
              {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
              <Modal.Body>
                <Row className="text-center">
                  <Col>
                    <FaCheckCircle color="green" fontSize={30} />
                  </Col>
                </Row>
                <p className="text-center mt-3" style={{ fontWeight: "500" }}>
                  Your warranty request is registered successfully. You will get
                  notification by SMS once verification will be completed by CGPISL
                  team. Please bear with us.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Row className="text-center">
                  <Col>
                    <Button
                      variant=""
                      className="add-Btn"
                      onClick={() => {
                        navigate(`${pathName}/add-customer`);
                      }}
                    >
                      Continue
                    </Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showpg}
              onHide={handleClosepg}
              backdrop="static"
              size="xl"
              centered
            >
              <Modal.Header closeButton>

              </Modal.Header>
              <Modal.Body>
                {/* <Row className="text-end">
                  <Col>
                    <Button
                      variant=""
                      className="add-Btn"
                      onClick={() => {
                        setdata((pre) => {
                          return {
                            ...pre,
                            InvoiceNo: "",
                          };
                        });
                        document.getElementById("RegForm")?.reset();

                        handleClosepg();
                      }}
                    >
                      Register product warranty
                    </Button>
                  </Col>
                </Row>
                <hr /> */}
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
                          {/* <Row className='text-end m-0'>
  <Col>
  <Button variant=''><FaEdit/></Button>
  </Col>
</Row> */}
                          <Row>
                            <Col lg={4} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product SN
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.sernr : ""}
                              </p>
                            </Col>
                            <Col lg={4} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product Code
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.matnr : ""}
                              </p>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Product type
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.productLineName : ""}
                              </p>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Frame size
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.frame : ""}
                              </p>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Pole
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.pole : ""}
                              </p>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Voltage
                              </p>
                              <p className="mt-1" style={{ fontWeight: "500" }}>
                                {productDetails ? productDetails[0]?.kw : ""} kw
                              </p>
                            </Col>
                            {
                              productDetails[0]?.divisionCode == "M4" ?
                                <Col lg={3} md={6} sm={6}>
                                  <p className="m-0" style={{ fontSize: "14px" }}>
                                    HP
                                  </p>
                                  <p className="mt-1" style={{ fontWeight: "500" }}>
                                    {productDetails ? productDetails[0]?.hp : ""}
                                  </p>
                                </Col> : ""
                            }
                            <p className="text-start mt-3">Warranty Status :


                              {productDetails ? productDetails[0]?.warrantyStatus : ""}</p>
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
                          <Button variant="" disabled className="add-Btn">
                            <a
                              href="#"
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
                      {/* <span className="text-center">
                    in future will lead to Raise a service Request page
                  </span> */}
                    </Card>
                  </Col>
                </Row>
              </Modal.Body>
              {/* <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
            </Modal>




            {/* -----------------------------Deviation/out of warranty--------------------- */}



            <Modal show={showDeviation} onHide={handleCloseDeviation} size='xl' centered>
              {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
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

            {/* -----------------------------raise service request--------------------- */}


            <Modal show={showCustomer} onHide={handleCloseCustomer} size='xl' backdrop="static" centered>
              <Modal.Header >
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
                      <h3 style={{
                        fontSize: '16px'
                      }}>                         Complaint will be attended by our team shortly
                      </h3>
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
                    <Col className="mt-3" md={6}>
                      <h3 style={{
                        fontSize: '16px'
                      }}>CG’s ASM: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmName}</span></h3>
                    </Col>
                    <Col className="mt-3" md={6}>
                      <h3 style={{
                        fontSize: '16px'
                      }}>  ASM email id: <span className="text-left pg-label-warranty " style={{ fontStyle: '500' }}>{ticketSubmissionDetails?.asmEmail}</span></h3>
                    </Col>
                    {/* <Col className="mt-3" md={6}>
                      <h3 style={{
                        fontSize: '16px'
                      }}
                      >Assigned ASC: <span className="text-left pg-label-warranty " style={{
                        // color:'gray',
                        // fontSize:'18px',
                        fontStyle: '500'
                      }}> {ticketSubmissionDetails?.ascMobileNo}</span></h3>
                    </Col> */}



                    {/* <Col className="mt-3" style={{
                      fontSize: '16px',
                      fontWeight: '500'

                    }}><p className="text-center  mt-3">Happy Code is sent to your customer mobile number, please share the same with our technician during closure of your complaint.</p></Col> */}


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
                      navigate(`${pathName}/home`)
                    }}>
                      Ok
                    </Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>


          </Card >
        </Col >
      </Row >
      <Footer />
    </>
  );
}

export default NotRegisteredForWarranty;
