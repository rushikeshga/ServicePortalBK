import React, { useState, useEffect } from "react";
import NavBar from "../Navbar";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Tab,
  Tabs,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePathName } from "../../../constants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Swal from "sweetalert2";
import Footer from "../footer";

const Retailer = () => {
  const navigate = useNavigate();
  const pathName = usePathName();
  const [activeTab, setactiveTab] = useState("0");

  const handleNextTab = () => {
    const tabOrder = ["0", "1", "2"];
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

  const [dealerUser, setDealerUser] = useState("");
  const [isRetailerSet, setRetailerName] = useState(false);
  const handleDealerCodeChange = (e) => {
    setDealerUser(e.target.value);
    // setShowError(false);

    // setDealerCode('')
  };

  console.log(dealerUser, "--------------");
  // const itemUser = JSON.stringify(dealerUser);

  const items = [
    {
      id: 0,
      name: "989-Sachin",
    },
    {
      id: 1,
      name: "678-Parth",
    },
    {
      id: 2,
      name: "369-Pavan",
    },
    {
      id: 3,
      name: "002-Hritik",
    },
  ];

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    // setDealerUser(e.target.value)
    setDealerUser((pre) => {
      return {
        ...pre,
        dealerName: item?.name,
        // dealerId: item?.id
      };
    });
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span> */}
      </>
    );
  };

  const [requestForCustomer, setRequestForCustomer] = useState(false);
  const [requestForOEM, setRequestForOEM] = useState(false);
  const [radioSelected, setRadioSelected] = useState(false);
  const [requestForSelf, setRequestForSelf] = useState(false);
  const [showDealerCode, setShowDealerCode] = useState(false);

  const [showError, setShowError] = useState(false);
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setRadioSelected(true);

    if (value === "customer") {
      setRequestForCustomer(true);
      setRequestForOEM(false);
      setRequestForSelf(false);
    }
    if (value === "Self") {
      setRequestForCustomer(false);
      setRequestForOEM(false);
      setRequestForSelf(true);
    } else if (value === "oem") {
      setRequestForCustomer(false);
      setRequestForSelf(false);
      setRequestForOEM(true);
    }
  };

  // console.log(requestForSelf, '----------------')

  const [dealerName, setDealerName] = useState("");
  const [dealerAddress, setDealerAddress] = useState("");


  const handleNextButtonClick = () => {
    // if (requestForSelf && !dealerName.trim()) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Dealer Code is required",
    //   });
    //   return;
    // }

    // if (requestForCustomer) {
    //   localStorage.setItem("RedirectedFrom", "Retailer")
    //   navigate(`${pathName}/reg-prod-Warranty`);
    // }

    if (requestForCustomer) {
      navigate(`${pathName}/reg-prod-Warranty`);
    }
    if (requestForSelf) {
      // fetch(`${process.env.REACT_APP_API_URL}Dealer/GetDealerByName?DealerName=${dealerName}`)
      //   .then((res) => res.json())
      //   .then((result) => {


      //     if (result?.msg === 'NOTEXISTS') {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Dealer name does not exists!'
      //       })


      //     }

      //     else if (result.status != 404) {
      //       setShowDealerCode(true);
      //       //setShowFirstDealerCode(false)
      //       localStorage.setItem("DealerOrOEMCode", result?.dealerCode)
      //       localStorage.setItem("DealerOrOEMName", result?.dealerName)
      //       setShowError(false);
      //       navigate(`${pathName}/dealer-self-stock`);
      //     }
      //     else {
      //       Swal.fire({
      //         icon: 'error',
      //         title: result?.title
      //       })
      //     }




      //   })

        handleNextTab();


    }

    // else if (requestForOEM) {
    //     setShowFirstDealerCode(false);
    //     setShowDealerCode(true)

    //     setDealerCode('')
    //     setRadioSelected(false)
    // }
    // }
    else {
      // Handle if the radio button is not selected
      // You can show an error message or handle it as per your requirement
    }
  };

  const [addRetailer, setaddretailer] = useState({
    dealerId: 0,
    dealerCode: "a0",
    dealerTypeId: 0,
    dealerName: "",
    dealerEmail: "",
    mobileNo: "",
    gstNo: "",
    workingDays: "0",
    address: "test",
    stateId: 0,
    cityId: 0,
    pinCode: "",
    isActive: true,
    isIndustryCustomer: true,
    isGSTApplicable: true,
  });

  const handleRetailerChange = (e) => {
    const newdata = { ...addRetailer };
    newdata[e.target.name] = e.target.value;
    setaddretailer(newdata);
    console.log(newdata);
  };

  const [dealerInfo, setdealerInfo] = useState([]);

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);

  const stateUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=3&Id=0&Code=0`;

  useEffect(() => {
    fetch(stateUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setstates(result);
      });
  }, []);

  const [mobileError, setMobileError] = useState("");
  const [mobileError1, setMobileError1] = useState("");

  const [emailError, setEmailError] = useState("");
  const [emailError1, setEmailError1] = useState("");

  const [pinError, setpinError] = useState("");

  const validatePincode = (pincode) => {
    // Basic mobile number validation regex
    const regex = /^\d{6}$/;
    return regex.test(pincode);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobile = (mobile) => {
    // Basic mobile number validation regex
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setaddretailer((pre) => {
      return {
        ...pre,
        dealerEmail: value,
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
    setaddretailer((pre) => {
      return {
        ...pre,
        alterNateEmailId: value,
      };
    });
    if (!validateEmail(value) && value != "") {
      setEmailError1("Invalid email format");
    } else {
      setEmailError1("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setaddretailer((pre) => {
      return {
        ...pre,
        mobileNo: value,
      };
    });
    if ((!validateMobile(value) && value != "") || parseInt(value).toString().length <10) {
      setMobileError("Invalid mobile number");
    } else {
      setMobileError("");
    }
  };
  const handleMobileChange1 = (e) => {
    const value = e.target.value;
    setaddretailer((pre) => {
      return {
        ...pre,
        alterNateContactNumber: value,
      };
    });
    if (!validateMobile(value) && value != "") {
      setMobileError1("Invalid mobile number");
    } else {
      setMobileError1("");
    }
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    setaddretailer((pre) => {
      return {
        ...pre,
        pinCode: value,
      };
    });
    if (!validatePincode(value) && value != "") {
      setpinError("Invalid PinCode. It must be 6 digits only");
    } else {
      setpinError("");
    }
  };

  return (
    <>
      <NavBar />

      
          <Card
            className="border-0 p-2  mt-0 mx-3"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                  className="text-start m-0"
                >
                  {/* Raise Service Request */}
                  Book your service request
                </p>
              </div>
              {isRetailerSet && <div>
                <h4 > Welcome {addRetailer?.dealerName} Retailer </h4>
              </div>}



            </div>


            <hr />

            <Tabs
              variant="pills"
              activeKey={activeTab}
              defaultActiveKey={"0"}
              onSelect={(k) => {
                setactiveTab(k);
                console.log(k);
              }}
            >
              <Tab eventKey={"1"}>
                <Row className="justify-content-center m-0 p-0">
                  <Row className="m-0">
                    <p className="m-0">Enter retailer details</p>
                  </Row>

                  {/* <p className="m-0 text-start p-0">
                                        <IoIosArrowRoundBack
                                            className="me-3"
                                            style={{ cursor: "pointer" }}
                                            fontSize={35}
                                            color="#005bab"
                                            onClick={() => navigate(-1)}
                                        />
                                        Back
                                    </p> */}
                  <p className="text-left pg-label-warranty pt-3">
                    Retailer Address
                  </p>
                  <Row>
                    <Col md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          Retailer Name
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="dealerName"
                          value={addRetailer.dealerName}
                          onChange={handleRetailerChange}
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col md={3}>
                                            <Form.Group style={{
                                                textAlign: 'left'
                                            }}>
                                                <Form.Label
                                                >
                                                    Contact Person
                                                    <span className="req-t">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name='alterNateretailerName'
                                                    onChange={handleRetailerChange}
                                                    value={addRetailer.alterNateretailerName}

                                                />

                                            </Form.Group>

                                        </Col> */}
                    <Col md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          Retailer Mobile No
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="mobileNo"
                          onChange={handleMobileChange}
                          value={addRetailer.mobileNo}
                        />
                        {mobileError && (
                          <span style={{ color: "red" }}>{mobileError}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          Email ID
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="dealerEmail"
                          onChange={handleEmailChange}
                          value={addRetailer.dealerEmail}
                        />
                        {emailError && (
                          <span style={{ color: "red" }}>{emailError}</span>
                        )}
                      </Form.Group>
                    </Col>
                    {/* </Row>
                                    <Row > */}
                    {/* <Col className='mt-3' md={3}>
                                            <Form.Group style={{
                                                textAlign: 'left'
                                            }}>
                                                <Form.Label
                                                >
                                                    Alternate Contact Number

                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name='alterNateContactNumber'
                                                    onChange={handleMobileChange1}
                                                    value={addRetailer.alterNateContactNumber}


                                                />
                              {mobileError1 && <span style={{ color: 'red' }}>{mobileError1}</span>}

                                            </Form.Group>

                                        </Col> */}
                    {/* <Col className='mt-3' md={3}>
                                            <Form.Group style={{
                                                textAlign: 'left'
                                            }}>
                                                <Form.Label
                                                >
                                                    Alternate Email Id
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name='alterNateEmailId'
                                                    onChange={handleEmailChange1}
                                                    value={addRetailer.alterNateEmailId}


                                                />
                              {emailError1 && <span style={{ color: 'red' }}>{emailError1}</span>}

                                            </Form.Group>

                                        </Col> */}
                    <Col className="" md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          PinCode
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="pinCode"
                          onChange={(e) => {
                            handlePinCodeChange(e);

                            setaddretailer((pre) => {
                              return {
                                ...pre,
                                pinCode: e.target.value,
                              };
                            });

                            if (e.target.value && e.target.value?.length == 6) {
                              fetch(
                                `${process.env.REACT_APP_API_URL}Common/GetAllCommonUnauthorize?mode=9&Id=${e.target.value}&Code=0`
                              )
                                .then((res) => res.json())
                                .then((result) => {
                                  console.log(result[0]);
                                  setaddretailer((pre) => {
                                    return {
                                      ...pre,
                                      stateId: result[0]?.parameterTypeId,
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
                                  setaddretailer((pre) => {
                                    return {
                                      ...pre,
                                      cityId: result[0]?.parameterTypeId,
                                    };
                                  });
                                });
                            } else {
                              setaddretailer((pre) => {
                                return {
                                  ...pre,
                                  stateId: 0,
                                  cityId: 0,
                                };
                              });
                            }
                          }}
                          value={addRetailer.pinCode}
                        />
                        {pinError && (
                          <span style={{ color: "red" }}>{pinError}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="mt-3" md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          State
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Select
                          type="text"
                          name="stateId"
                          disabled
                          onChange={handleRetailerChange}
                          value={addRetailer.stateId}
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
                    <Col className="mt-3" md={3}>
                      <Form.Group
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Form.Label>
                          City
                          <span className="req-t">*</span>
                        </Form.Label>
                        <Form.Select
                          type="text"
                          name="cityId"
                          disabled
                          onChange={handleRetailerChange}
                          value={addRetailer.cityId}
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
                </Row>
                <Row
                  className=" text-center mt-5"
                  style={{
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Col
                    style={{
                      display: "contents",
                    }}
                  >
                    <Button
                      variant=""
                      className="cncl-Btn"
                      // onClick={() => setactiveTab((prev) => prev - 1)}
                      onClick={() =>setactiveTab((prev) => prev - 1)}
                      style={{
                        // color: '#fff',
                        fontWeight: "500",
                        // borderColor: '#fff'
                      }}
                    >
                      Back
                    </Button>
                  </Col>

                  <Col style={{
                    display: 'contents'
                  }}><Button variant=""
                    className="add-Btn" disabled={mobileError || emailError || pinError} onClick={() => {
                      if (addRetailer.dealerName.trim() === '' || addRetailer.mobileNo.trim() === '' || addRetailer.dealerEmail.trim() === '' || addRetailer.pinCode.trim() === '' || addRetailer.stateId.trim() === '' || addRetailer.cityId.trim() === '') {
                        Swal.fire({
                          icon: "error",
                          title: "Please fill all the fields marked with red *!"
                        });

                      }

                      else {

                        fetch(`${process.env.REACT_APP_API_URL}Dealer/UpsertRetailer`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify(addRetailer),
                        })
                          .then((res) => {
                            console.log(res);
                            let resp = res.text()
                            resp.then((r) => {
                              console.log(r);

                              if (res.status == 200) {
                                Swal.fire({
                                  icon: "success",
                                  title: "Saved successfully!"
                                })
                                localStorage.setItem("DealerDetails", JSON.stringify(addRetailer));
                                localStorage.setItem("RetailerName", addRetailer?.dealerName)
                                localStorage.setItem("RetailerCode", r)
                                setRetailerName(true)
                                // handleNextTab()
                                navigate(`${pathName}/dealer-self-stock`);


                              }
                            })
                          })
                      }
                    }}>Save & Next</Button></Col>
                </Row>


              </Tab>
              <Tab eventKey={0}>
                <>
                  <Row>
                    <Col>
                      <Form.Group style={{
                        textAlign: 'center'
                      }}>
                        <Form.Label

                        >

                        </Form.Label>
                        {/* <h4 > Welcome {addRetailer?.dealerName} Retailer </h4> */}

                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col lg={6}>
                      {/* <p className="text-left pg-label-warranty pt-3">
                                            Fill Out service request Dealer/OEM
                                        </p> */}
                      <Row className="mt-2 text-start">
                        <p>
                          Please select applicable option to proceed with
                          complaint registration.
                        </p>
                      </Row>

                      <Card className="p-4 add-style">
                        <Row>
                          {/* <Col lg={6} md={6} sm={12}>
                                        <Form.Group style={{
                                            textAlign: 'left'
                                        }}>
                                            <Col>
                                            </Col> <Form.Label
                                            >
                                                Enter Dealer/OEM code
                                                <span className="req-t">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dealerCode}
                                                readOnly
                                                onChange={handleDealerCodeChange} />
                                        </Form.Group>
                                    </Col> */}
                          <Col lg={12} md={6} sm={12}>
                            <Form.Check
                              type="radio"
                              label="Placing service request for Self  stock"
                              name="radioGroup"
                              value="Self"
                              onClick={handleRadioChange}
                              style={{
                                color: "#fff",
                                fontWeight: "400",
                                fontSize: "14px",
                                textAlign: "left",
                                margin: "15px 15px 0px 0px",
                              }}
                            />
                            <Form.Check
                              type="radio"
                              label="Placing service request on behalf of customer"
                              name="radioGroup"
                              value="customer"
                              style={{
                                color: "#fff",
                                fontWeight: "400",
                                fontSize: "14px",
                                textAlign: "left",
                                margin: "15px 15px 0px 0px",
                              }}
                              onClick={handleRadioChange}
                            />
                            {/* <Form.Check
                                            type='radio'
                                            label="Placing request for OEM customer"
                                            name="radioGroup"
                                            value="oem"
                                            style={{
                                                // color: '#fff',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '15px 15px 0px 0px'
                                            }}
                                            onChange={handleRadioChange} /> */}

                          </Col>
                        </Row>
                        {/* {requestForSelf && (
                          <Row className="mt-3 text-left">
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label
                                  style={{
                                    color: "#fff",
                                    fontWeight: "400",
                                  }}
                                >
                                  Dealer Name <span className="req-t">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="yourName"
                                  //   value={dealerCode}
                                  onChange={(e) => {
                                    setDealerName(e.target.value);
                                  }}
                                  placeholder=""
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )} */}

                        <Row
                          className="text-center mt-5 "
                          style={{
                            gap: "10px",
                            justifyContent: "center",
                          }}
                        >
                          <Col
                            style={{
                              display: "contents",
                            }}
                          >
                            <Button
                              variant=""
                              className="add-Btnn"
                              onClick={() => navigate(-1)}
                            >
                              Back
                            </Button>
                          </Col>
                          <Col
                            style={{
                              display: "contents",
                            }}
                          >
                            <Button
                              variant=""
                              className="add-Btnn"
                              onClick={handleNextButtonClick}
                              disabled={!radioSelected}
                            >
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </>
              </Tab>

              {/* <Tab eventKey={'2'}>
                                <Row >
                                    <Row className="m-2"><p className="m-0">Please enter dealer information</p></Row>
                                    <Row style={{
                                        justifyContent: 'center'
                                    }}>
                                        <Col md={3}>
                                            <Form.Group style={{
                                                textAlign: 'left'
                                            }}>
                                                <Col>
                                                </Col> <Form.Label
                                                >
                                                    Dealer info
                                                    <span className="req-t">*</span>
                                                </Form.Label>
                                                <ReactSearchAutocomplete
                                                    items={items}
                                                    onSearch={handleOnSearch}
                                                    onHover={handleOnHover}
                                                    onSelect={handleOnSelect}
                                                    onFocus={handleOnFocus}
                                                    autoFocus
                                                    formatResult={formatResult}



                                                />

                                            </Form.Group>
                                        </Col>
                                    </Row>






                                </Row>


                                <Row className=" text-center mt-5" style={{
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}>
                                    <Col style={{
                                        display: 'contents'
                                    }} >
                                        <Button
                                            variant=""
                                            className="cncl-Btn"
                                            onClick={() => setactiveTab((prev) => prev - 1)}

                                            // onClick={() => navigate(-1)}
                                            style={{
                                                // color: '#fff',
                                                fontWeight: '500',
                                                // borderColor: '#fff'

                                            }}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                    <Col style={{
                                        display: 'contents'
                                    }}><Button variant=""
                                        className="add-Btn " onClick={() => {
                                            // if (dealerUser.trim() === '') {
                                            //     Swal.fire({
                                            //         icon: "error",
                                            //         title: "Please fill all the fields marked with red *!"
                                            //     });
                                            // }
                                            // else {
                                            handleNextTab()
                                            // }
                                        }}>Save & Next</Button></Col>
                                </Row>



                            </Tab> */}

              {/* <Tab eventKey={'2'}>
                                <>
                                    <Row className='justify-content-center'>
                                        <Col md={8}>
                                            <p className="text-left pg-label-warranty pt-3">
                                                Dealer Info
                                            </p>
                                            <Col style={{
                                                padding: '20px',
                                                boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",
                                                borderRadius: '5px',

                                            }}>

                                                <Row>
                                                    <Col lg={6} md={6} sm={12}>
                                                        <Form.Group style={{
                                                            textAlign: 'left'
                                                        }}>
                                                            <Col>
                                                            </Col> <Form.Label
                                                            >
                                                                Enter Dealer/OEM code
                                                                <span className="req-t">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={dealerUser?.dealerName}
                                                                readOnly
                                                            // onChange={handleDealerCodeChange} 
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={12}>
                                                        <Form.Check
                                                            type='radio'
                                                            label="Placing service request on behalf of customer"
                                                            name="radioGroup"
                                                            value="customer"
                                                            style={{
                                                                // color: '#fff',
                                                                fontWeight: '500',
                                                                fontSize: '14px',
                                                                textAlign: 'left',
                                                                margin: '15px 15px 0px 0px'
                                                            }}
                                                            onChange={handleRadioChange} />

                                                        <Form.Check
                                                            type='radio'
                                                            label="Placing request for Self  stock"
                                                            name="radioGroup"
                                                            value='Self'
                                                            onChange={handleRadioChange}
                                                            style={{
                                                                // color: '#fff',
                                                                fontWeight: '500',
                                                                fontSize: '14px',
                                                                textAlign: 'left',
                                                                margin: '15px 15px 0px 0px'
                                                            }} />
                                                    </Col>
                                                </Row>
                                            </Col>




                                            <Row className="text-center mt-5 "
                                                style={{
                                                    gap: '10px',
                                                    justifyContent: 'center'
                                                }}


                                            >
                                                <Col style={{
                                                    display: 'contents'
                                                }} >
                                                    <Button
                                                        variant=""
                                                        className="cncl-Btn"
                                                        onClick={() => setactiveTab((prev) => prev - 1)}

                                                    >
                                                        Back
                                                    </Button>
                                                </Col>
                                                <Col style={{
                                                    display: 'contents'
                                                }}>
                                                    <Button
                                                        variant=""
                                                        className="add-Btn"
                                                        onClick={handleNextButtonClick}
                                                    // disabled={!radioSelected}
                                                    >
                                                        Next
                                                    </Button>
                                                </Col>

                                            </Row>




                                        </Col>
                                    </Row>
                                </>

                            </Tab> */}
            </Tabs>
          </Card>
          <Footer/>
      
    </>
  );
};

export default Retailer;
