import NavBar from "../Navbar";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { usePathName } from "../../../constants";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import Footer from "../footer";

function ProductNotUnderWarrantyRegistered() {
  const navigate = useNavigate();
  const pathName = usePathName();
  const [textColor, setTextColor] = useState("");

  let RedirectionSrValue = localStorage.getItem("SrValue");
  let RedirectionProductValue = localStorage.getItem("ProductValue");

  // console.log(RedirectionSrValue,'----------------')
  let productDetails = JSON.parse(localStorage.getItem("productDetails"));

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
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
              }}
              className="text-start  m-0"
            >
              Book your service request
            </p>

            <Row
              className="mt-3"
              style={{
                justifyContent: "center",
              }}
            >
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
                      <Row className="text-end m-0">
                        <Col>
                          <Button variant="">
                            <FaEdit />
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={6} sm={6}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                            width={40}
                            height={40}
                            alt=""
                            srcset=""
                          />
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <p className="m-0" style={{ fontSize: "12px" }}>
                            Product model
                          </p>
                          <p
                            className="mt-1"
                            style={{ fontWeight: "500", fontSize: "12px" }}
                          >
                            {productDetails[0]?.matnr}
                          </p>
                        </Col>
                        <Col lg={4} md={6} sm={6}>
                          <p className="m-0" style={{ fontSize: "12px" }}>
                            Product SN
                          </p>
                          <p
                            className="mt-1"
                            style={{ fontWeight: "500", fontSize: "12px" }}
                          >
                            {productDetails[0]?.sernr}
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
                            {productDetails[0]?.productLineName}
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
                                                        {productDetails[0]?.frame}

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
                                                                                    {productDetails[0]?.pole}

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
                                                                                                                {productDetails[0]?.kw} kw

                          </p>
                        </Col>

                        <p style={{ fontSize: "14px" }}>
                          Warranty Status :
                          <span
                            style={{ fontWeight: "500", fontSize: "14px",color:'red' }}
                            className="text-start mt-3"
                          >
                            {productDetails[0].warrantyStatus}
                          </span>
                        </p>
                      </Row>
                    </div>
                  </Card>
                </Card>
              </Col>
              <Col md={6}>
                <Card
                  className="p-3 "
                  style={{
                    // height:'300px',

                    // boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",

                    borderRadius: "5px",
                  }}
                >
                  <Row
                    className="text-start mt-3"
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Product In Warranty{" "}
                      <strong
                        style={{
                          color: `${(productDetails[0]?.warrantyStatus=="Out Of Warranty" || productDetails[0]?.warrantyStatus=="In Progress")?"red":'green'}`,
                        }}
                      >
                    {(productDetails[0]?.warrantyStatus=="Out Of Warranty" || productDetails[0]?.warrantyStatus=="In Progress")?"No":'In Progress'}
                      </strong>
                    </h3>

                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                    {(productDetails[0]?.warrantyStatus=="Out Of Warranty" || productDetails[0]?.warrantyStatus=="In Progress")?
                    "Since Product is out of warranty you might incur a visit charges of our service center. If agreed, please continue to register the complaint."
                    :
                    'Your request is in process is in CGPISL team. you will get notification once process will be completed by CGPISL team.'}

                     
                    </p>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row
              style={{
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Col
                style={{
                  display: "contents",
                }}
              >
                <Button
                  variant=""
                  className="add-Btn"
                  onClick={() => {
                    localStorage.removeItem('ProductDataProdRegAutoId');
                    navigate(`${pathName}/not-reg-for-warranty`);
                  }}
                >
                {(productDetails[0]?.warrantyStatus=="Out Of Warranty" || productDetails[0]?.warrantyStatus=="In Progress")?
                "Accept and continue"
                :
                'Continue'}

                  
                </Button>
              </Col>
              <Col
                style={{
                  display: "contents",
                }}
              >
                <Button
                  variant=""
                  className="add-Btn"
                  onClick={() => {
                    localStorage.clear();
                    navigate(`${pathName}/home`);
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Footer/>
    </>
  );
}

export default ProductNotUnderWarrantyRegistered;
