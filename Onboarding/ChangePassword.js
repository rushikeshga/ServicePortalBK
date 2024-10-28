import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Form, Button, InputGroup } from 'react-bootstrap'
// import Navigate from './Navigate'
// import Sidebar from './Sidebar'
import logo from "../../Assets/logo.png";
import AOS from 'aos';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Swal from 'sweetalert2';



import 'aos/dist/aos.css';
function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setoldPassword] = useState("");
    const [userPassword, setNewuserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newshowPassword, setNewShowPassword] = useState(false);
    const [confirmshowPassword, setConfirmShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickNewPassword = () => {
        setNewShowPassword(!newshowPassword);
    };
    const handleClickConfirmPassword = () => {
        setConfirmShowPassword(!confirmshowPassword);
    };



    const Rule = (userPassword, rule) => {
        switch (rule) {
            case "MinLength": // Min 8 characters
                return userPassword.length >= 8;
            case "MaxLength": // Max 10 characters
                return userPassword.length <= 10;
            case "UpperCase": // Contains at least one uppercase letter
                return /[A-Z]/.test(userPassword);
            case "LowerCase": // Contains at least one lowercase letter
                return /[a-z]/.test(userPassword);
            case "Number": // Contains at least one number
                return /\d/.test(userPassword);
            case "Match": // Passwords match
                return userPassword === confirmPassword && userPassword !== '';

            default:
                return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!oldPassword) {
            Swal.fire({
                icon: "error",
                title: "Please fill all fields"
            }); return;
        }

        // if (userPassword !== confirmPassword) {
        //     setMessage("New password and confirm password do not match.");
        //     return;
        // }

        if (!Rule(userPassword, "MinLength")) {
            Swal.fire({
                icon: "error",
                title: "Password must be at least 8 characters long."
            });
            return;
        } else if (!Rule(userPassword, "MaxLength")) {
            Swal.fire({
                icon: "error",
                title: "Password must not exceed 10 characters."
            });
            return;
        } else if (!Rule(userPassword, "UpperCase")) {
            Swal.fire({
                icon: "error",
                title: "Password must contain at least one uppercase letter."
            });
            return;
        } else if (!Rule(userPassword, "LowerCase")) {
            Swal.fire({
                icon: "error",
                title: "Password must contain at least one lowercase letter."
            });
            return;
        } else if (!Rule(userPassword, "Number")) {
            Swal.fire({
                icon: "error",
                title: "Password must contain at least one number."
            });
            return;
        } else if (!Rule(userPassword, "Match")) {
            Swal.fire({
                icon: "error",
                title: "New password and confirm password do not match."
            });
            return;
        }


        try {
            setLoading(true);
            let token = localStorage.getItem("UserToken")
            let userId = localStorage.getItem("UID")
            const response = await fetch(`${process.env.REACT_APP_API_URL}Auth/ChangePassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token in the Authorization header
                },
                body: JSON.stringify({
                    userId: userId,
                    oldPassword: oldPassword,
                    userPassword: userPassword,
                }),
            });

            // const responseData = await response.json(); // Parse response data as JSON
            // console.log("Response:", responseData); 

            const responseData = await response.text();
            console.log("----------------res", responseData);
            if (responseData === 'Old password is incorrect') {
                Swal.fire({
                    icon: "error",
                    title: "Old password is incorrect"
                })
            }
            else {
                Swal.fire({
                    icon: "sucess",
                    title: "Password changed successfully"
                });
                setoldPassword("");
                setNewuserPassword("");
                setConfirmPassword("");
                navigate('/')

            }
            // setMessage("Password changed successfully.");



        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again later.");
        }


    };






    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);


    return (
        <>
            <Container fluid className='forgot-bg vh-100 d-flex align-items-center'>
                <Row className='justify-content-center flex-fill'>
                    <Col md={6} sm={10}>
                        <div data-aos="fade-down" data-aos-once="true">
                            <Card className='border-0 p-1 p-md-0 pt-md-5 pb-md-5  lgnCrd'>
                                <Row className=' justify-content-center text-start m-0'>
                                    <Col className='m-0' lg={10}>
                                        <div className='d-flex justify-content-between align-items-center '><div className='m-auto'><Card className='border-0'><img style={{
                                            height: '60px'
                                        }} src={logo} alt="" srcset="" className='CGlogo p-1 pb-2 m-0' /></Card></div></div>

                                        <p className='text-center ' style={{ fontSize: "16px", color: "#005BAB", fontWeight: "500" }}>Change Password</p>
                                        <Form className='' >
                                            <Form.Group className="mt-2" controlId="exampleForm.ControlInput1" >
                                                <Form.Label
                                                    style={{
                                                        fontSize: "10px"

                                                    }}
                                                >Old Password</Form.Label>
                                                <InputGroup >
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder=""
                                                        autoComplete='off'

                                                        value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} className='p-2' />

                                                    <InputGroup.Text
                                                        id="basic-addon2"
                                                        className="pass-icon"
                                                    >
                                                        <Button variant="" className='p-0' onClick={(e) => { handleClickShowPassword() }}>{showPassword ? <AiFillEye fontSize={20} /> : <AiFillEyeInvisible fontSize={20} />}</Button>

                                                    </InputGroup.Text>
                                                </InputGroup>


                                            </Form.Group>



                                            <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                                <Form.Label
                                                    style={{
                                                        fontSize: "12px"

                                                    }}
                                                > New password</Form.Label>
                                                <InputGroup >
                                                    <Form.Control type={newshowPassword ? "text" : "password"}
                                                        placeholder="" autoComplete='off' value={userPassword} onChange={(e) => setNewuserPassword(e.target.value)} className='p-2' />
                                                    <InputGroup.Text
                                                        id="basic-addon2"
                                                        className="pass-icon"
                                                    >
                                                        <Button variant=""  className='p-0'  onClick={(e) => { handleClickNewPassword() }}>{newshowPassword ? <AiFillEye fontSize={20} /> : <AiFillEyeInvisible fontSize={20} />}</Button>

                                                    </InputGroup.Text>
                                                </InputGroup>




                                            </Form.Group>



                                            <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                                <Form.Label style={{
                                                    fontSize: "12px"

                                                }}>Confirm New password</Form.Label>
                                                <InputGroup >
                                                    <Form.Control type={confirmshowPassword ? "text" : "password"}
                                                        placeholder="" autoComplete='off' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='p-2' />
                                                    <InputGroup.Text
                                                        id="basic-addon2"
                                                        className="pass-icon"
                                                    >
                                                        <Button variant=""  className='p-0'  onClick={(e) => { handleClickConfirmPassword() }}>{confirmshowPassword ? <AiFillEye fontSize={20} /> : <AiFillEyeInvisible fontSize={20} />}</Button>

                                                    </InputGroup.Text>


                                                </InputGroup>

                                            </Form.Group>
                                            <Row className='mt-2'>
                                                <p className='m-0 ' style={{ color: "red", fontWeight: "bold" }}>Rules</p>
                                                <Col>
                                                    <p style={{
                                                        fontSize: "12px"

                                                    }} className=' m-0'>
                                                        {Rule(userPassword, "MinLength") && Rule(userPassword, "MaxLength") ?
                                                            <AiOutlineCheckCircle style={{ color: 'green' }} /> :
                                                            <AiOutlineCloseCircle style={{ color: 'red' }} />}
                                                        Min 8 & Max 10 characters
                                                    </p>
                                                    <p style={{
                                                        fontSize: "12px"

                                                    }} className=' m-0'>
                                                        {Rule(userPassword, "UpperCase") ? <AiOutlineCheckCircle style={{ color: 'green' }} /> : <AiOutlineCloseCircle style={{ color: 'red' }} />}
                                                        One Uppercase Letter
                                                    </p>

                                                    <p style={{
                                                        fontSize: "12px"

                                                    }} className=' m-0'>
                                                        {Rule(userPassword, "Match") ? <AiOutlineCheckCircle style={{ color: 'green' }} /> : <AiOutlineCloseCircle style={{ color: 'red' }} />}
                                                        Password Match
                                                    </p>
                                                </Col>
                                                <Col>
                                                    <p style={{
                                                        fontSize: "12px"

                                                    }} className=' m-0'>
                                                        {Rule(userPassword, "LowerCase") ? <AiOutlineCheckCircle style={{ color: 'green' }} /> : <AiOutlineCloseCircle style={{ color: 'red' }} />}
                                                        One Lowercase Letter
                                                    </p>

                                                    <p
                                                        style={{
                                                            fontSize: "12px"

                                                        }}

                                                        className=' m-0'>
                                                        {Rule(userPassword, "Number") ? <AiOutlineCheckCircle style={{ color: 'green' }} /> : <AiOutlineCloseCircle style={{ color: 'red' }} />}
                                                        One Number
                                                    </p>
                                                </Col>
                                            </Row>




                                            <Row className='text-center'>
                                                <Col>
                                                    <Button variant="" type="submit" className='signinBtn px-3 mt-2 p-2' onClick={handleSubmit} style={{
                                                        fontSize: "12px"

                                                    }}>
                                                        Change Password
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


            </Container >
        </>
    )
}

export default ChangePassword