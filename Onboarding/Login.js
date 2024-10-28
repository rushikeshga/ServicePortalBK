import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Form, Button, InputGroup } from 'react-bootstrap'
// import Navigate from './Navigate'
// import Sidebar from './Sidebar'
import logo from "../../Assets/logo.png";
import bgImg from "../../Assets/cgbg.png";
import AOS from 'aos';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Loader from '../loader';
import 'aos/dist/aos.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { usePathName } from '../../constants';
import Sidebar from '../Sidebar';

function Login() {
  const pathName = usePathName()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  const [loginCredentials, setloginCredentials] = useState({
    UserId: "",
    UserPassword: ""
  })



  const handleChange = (e) => {
    const newdata = { ...loginCredentials };
    newdata[e.target.name] = e.target.value;
    setloginCredentials(newdata);
    console.log(newdata);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = `${process.env.REACT_APP_API_URL}Auth/Login`;

    // await axios.post(`${process.env.REACT_API_BASE_URL}Auth/Login`,loginCredentials,{
    //   // baseURL:process.env.REACT_API_BASE_URL,
    //   headers:{
    //     "Content-Type":"application/json"
    //   }
    // }).then((res)=>{
    //   // res.data
    // console.log(res.data);
    // })
    setLoading(true)
    fetch(loginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials)
    })
      .then((res) => res.json())
      .then((result) => {

        console.log(result);
        localStorage.setItem("UID", result?.userId)
        localStorage.setItem("UserToken", result.token)
        localStorage.setItem("RoleName", result?.roleName)
        localStorage.setItem("UserName", result?.userName)
        localStorage.setItem("isFirstLogin", result?.isFirstLogin)
        localStorage.setItem("expiryTime", result?.refreshToken?.expireAt)
        localStorage.setItem("UserType", result?.userType)
        if (result.token) {
          // Swal.fire({
          //   icon:"success",
          //   title:"Login successful!",
          //   showConfirmButton:false,
          //   timer:2000
          // })
          if (result.isFirstLogin) {
            navigate(`${pathName}/change-password`); // Navigate to change password page
          } else {
            navigate(`${pathName}/dashboard`); // Navigate to dashboard
          }
          setLoading(false); // Set loading to true on form submission

        }
        else {
          Swal.fire({
            icon: "error",
            title: "User id or password is not correct"
          })
          setLoading(false); // Set loading to true on form submission

        }


      })

  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      {/* <Sidebar special/> */}






      <Container fluid className='login-bg'>
        <Row className='text-start'>
          <Col>
            <p style={{ color: 'white', fontSize: "16px", fontWeight: "500", textDecoration: "underline", cursor: "pointer" }} onClick={() => {

              localStorage.removeItem("SrValue")
              localStorage.removeItem("ProductValue")
              localStorage.removeItem("productDetails")
              localStorage.clear()
              navigate(`${pathName}/home`)}}>Link from website</p>
          </Col>
        </Row>
        {loading ? (
          <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className='loader'>
              <Loader />
            </div>
          </div>
        ) : (
          <div className='vh-100 d-flex align-items-center'>

            <Row className='justify-content-center flex-fill'>
              <Col lg={3} md={6} sm={10}>
                <div data-aos="fade-up" data-aos-once="true">
                  <Card className='border-0 p-3 p-md-0 pt-md-5 pb-md-5  lgnCrd'>
                    <Row className=' justify-content-center text-start m-0'>
                      <Col className='m-0' lg={10}>
                        <div className='d-flex justify-content-between align-items-center p-1'><div className='m-auto'><Card className='border-0'><img src={logo} alt="" srcset="" className='CGlogo p-1 m-0' /></Card> </div></div>

                        <Form className='pt-5'>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name='UserId' onChange={handleChange} className='p-4' id='uName' />
                            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                // value={data.Passwords}
                                aria-label="Recipient's username"
                                name="UserPassword"
                                onChange={handleChange}
                                aria-describedby="basic-addon2"
                                className="pass-ip p-4"
                              // onChange={(e)=>handleChange(e)}
                              />
                              <InputGroup.Text
                                id="basic-addon2"
                                className="pass-icon p-0"
                              >
                                <Button variant="" onClick={(e) => { handleClickShowPassword() }}>{showPassword ? <AiFillEye fontSize={20} /> : <AiFillEyeInvisible fontSize={20} />}</Button>

                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <p className='text-end' style={{ fontSize: "0.95rem", cursor: "pointer", color: "#005BAB" }} onClick={() => navigate(`${pathName}/forgot-password`)}>Forgot password?</p>
                          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                          <Row className='text-center'>
                            <Col>

                              <Button variant="" type="submit" className='signinBtn px-5 mt-2 p-2' onClick={handleSubmit}>
                                Login
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
          </div>
        )}

      </Container>

    </>
  )
}

export default Login