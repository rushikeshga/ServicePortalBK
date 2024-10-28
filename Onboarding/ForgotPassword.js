import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Form, Button, InputGroup } from 'react-bootstrap'
// import Navigate from './Navigate'
// import Sidebar from './Sidebar'
import logo from "../../Assets/logo.png";
import AOS from 'aos';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import 'aos/dist/aos.css';
import { usePathName } from '../../constants';
function ForgotPassword() {
    const pathName =usePathName()
    const navigate = useNavigate();


    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <>
            <Container fluid className='forgot-bg vh-100 d-flex align-items-center'>
                <Row className='justify-content-center flex-fill'>
                    <Col lg={3} md={6} sm={10}>
                        <div data-aos="fade-down" data-aos-once="true">
                            <Card className='border-0 p-3 p-md-0 pt-md-5 pb-md-5  lgnCrd'>
                                <Row className=' justify-content-center text-start m-0'>
                                    <Col className='m-0' lg={10}>
                                        <div className='d-flex justify-content-between align-items-center p-1'><div className='m-auto'><Card className='border-0'><img src={logo} alt="" srcset="" className='CGlogo p-1 pb-2 m-0' /></Card></div></div>

                                        <p className='text-center mt-3' style={{ fontSize: "20px", color: "#005BAB", fontWeight: "500" }}>Recover Password</p>
                                        <Form className='pt-2'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="" className='p-2' />

                                            </Form.Group>

                                            <p className='text-center'>Or</p>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Mobile No.</Form.Label>
                                                <Form.Control type="tel" placeholder="" className='p-2' />

                                            </Form.Group>
                                            <Row className='text-center'>
                                                <Col>

                                                    <Button variant="" type="submit" className='signinBtn px-5 mt-2 p-2' onClick={() => navigate(`${pathName}`)}>
                                                        Submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>


            </Container>
        </>
    )
}

export default ForgotPassword