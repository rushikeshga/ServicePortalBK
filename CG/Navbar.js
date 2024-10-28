
import logoCG from '../../Assets/logoCG.png'
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState } from 'react';
import { Card, Col, Row, Accordion, Form, Button, Spinner, Modal } from "react-bootstrap";


import '../CG/Navbar.css'
import { usePathName } from '../../constants';
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";



function NavBar({ children }) {
    const navigate = useNavigate();
    const pathName = usePathName();


    const [activeSection, setActiveSection] = useState('home');
    const handleNavClick = (section) => {
        setActiveSection(section);
    };
    // console.log(activeSection, '-p')
    return (
        <>
            <section>
                {/* <div className='header_part  logo-top '>
                    <div>
                        <img src={logoCG} alt="CG-Global_logo" className='logo_CG' />
                    </div>
                    <div>
                        <Navbar expand="lg" className="bg-body-tertiary nav-mob " >
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav d-flex align-center-center p-0 " className='' style={{ flexGrow: '0' }} >
                                <Nav className="me-auto navBar  p-0" activeKey="/home">
                                    <Nav.Link href="#home" onClick={() => handleNavClick('home')} className={activeSection === 'home' ? 'activeBar' : 'navLink'}>Home</Nav.Link>
                                    <Nav.Link href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about ' ? 'activeBar' : 'navLink'} >About</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('our business')} className={activeSection === 'our business ' ? 'activeBar' : 'navLink'} >Our Business</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('investors')} className={activeSection === 'investors ' ? 'activeBar' : 'navLink'}>Investors</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('carrers')} className={activeSection === 'carrers ' ? 'activeBar' : 'navLink'} >Careers</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('resources')} className={activeSection === 'resources' ? 'activeBar' : 'navLink'}>Resources</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('product')} className={activeSection === 'product' ? 'activeBar' : 'navLink'} >Product Search </Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('services')} className={activeSection === 'services ' ? 'activeBar' : 'navLink'} >Services</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('contact')} className={activeSection === 'contact' ? 'activeBar' : 'navLink'} >Contact</Nav.Link>
                                    <Nav.Link href="#link" onClick={() => handleNavClick('login')} className={activeSection === 'login' ? 'activeBar' : 'navLink'}>MYCG Login</Nav.Link>


                                </Nav>
                            </Navbar.Collapse>

                        </Navbar>

                    </div>
                   
                </div> */}
                <Navbar expand="lg" className="nav-mob " >
                    <Navbar.Brand href="#home" className='Responsive-show-logo' ><img src={logoCG} alt="CG-Global_logo" className='logo_CG' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'  >
                        {/* <Nav className="me-auto navBar  p-0" activeKey="/home">
                            <Nav.Link href=""
                                onClick={() => {
                                    navigate(`${pathName}/home`);

                                }}
                                className={activeSection === 'home' ? 'activeBar' : 'navLink'}>Home</Nav.Link>
                            <Nav.Link href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about ' ? 'activeBar' : 'navLink'} >About</Nav.Link>




                        </Nav> */}
                        <Nav className='gap-4 align-items-center '>
                            <Nav.Link href=""
                                onClick={() => {
                                    localStorage.removeItem("otpVerified");
                                    localStorage.removeItem("otp");
                                    localStorage.removeItem("allProducts");
                                    navigate(`${pathName}/home`);

                                }}
                                className={activeSection === 'home' ? 'activeBar' : 'navLink'}>Home</Nav.Link>
                            <Nav.Link href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about ' ? 'activeBar' : 'navLink'} >About</Nav.Link>

                            <div className='navLinkClass'>
                                <Nav.Link className='p-2 px-4'  href="" onClick={() => {
                                    navigate(`${pathName}`);
                                }} >Login
                                </Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

                {children}

            </section>


        </>


    )
}


export default NavBar