import React, { useEffect, useState } from "react";

import "./Sidebar.css";
import logo from "../Assets/logo2.svg";
import logoSmall from "../Assets/logo.png";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import { FaCircleUser, FaCross, FaUsers } from "react-icons/fa6";
import {
  MdArrowDropDown,
  MdDashboard,
  MdPersonSearch,
  MdSubdirectoryArrowLeft,
  MdSubdirectoryArrowRight,
} from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { RiChatFollowUpLine, RiCustomerServiceFill } from "react-icons/ri";
import {
  FaBars,
  FaCircle,
  FaHamburger,
  FaRegListAlt,
  FaUserFriends,
} from "react-icons/fa";

import {
  BsShield,
  BsShieldLock,
  BsShieldLockFill,
  BsXLg,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import $ from "jquery";

import { usePathName } from "../constants/index";
import { IoIosArrowDown, IoIosListBox, IoIosPower } from "react-icons/io";
import { HiDocumentReport } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { Box, IconButton, Tooltip } from "@mui/material";
import Login from "./Onboarding/Login";
import { GiBoxUnpacking } from "react-icons/gi";
import { GrServices } from "react-icons/gr";

function Sidebar({ children, special }) {
  const pathName = usePathName();

  const navigate = useNavigate();

  let token = localStorage.getItem("UserToken");

  let LMS = localStorage.getItem("UID");

  let CGAdmin = localStorage.getItem("CGAdmin");

  let UserName = localStorage.getItem("UserName");

  let RoleCode = localStorage.getItem("RoleName");

  let userType = localStorage.getItem("UserType");

  // function w3_open() {
  //     document.getElementById("mySidebar").style.display = "block";
  //   }

  //   function w3_close() {
  //     document.getElementById("mySidebar").style.display = "none";
  //   }

  //     const [sideopen, setsideopen] = useState(true)

  //     useEffect(()=>{
  // if(sideopen){
  //   document.getElementById("mySidenav").style.width = "18%";
  //   document.getElementById("main").style.marginLeft = "18%";
  //   document.getElementById("hambur").style.display="none";
  //   document.getElementById("closico").style.display="inline";
  // }
  //     },[])


  const [openstate, setopenstate] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState({});

  const handleClickSidebar = (menuText) => {
    setSidebarOpen((prevState) => ({
      ...prevState,
      [menuText]: !prevState[menuText],
    }));
  };

  const [GetAllMenu, setGetAllMenu] = useState([]);
  // console.log(GetAllMenu,'-----------------')
  const storeData = JSON.parse(localStorage.getItem("menuData"));
  useEffect(() => {
    if (storeData) {
      setGetAllMenu(storeData);
    }
  }, []);

  console.log("----------", storeData);

  useEffect(() => {
    if (!storeData && token) {
      fetch(
        `${process.env.REACT_APP_API_URL}RoleWiseMenu/GetRoleWiseMenuByUser?roleCode=${RoleCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setGetAllMenu(result);
          localStorage.setItem("menuData", JSON.stringify(result));
          // console.log("----------",storeData)
        });
    }
  }, []);

  // useEffect(() => {
  //   const storedMenuData = JSON.parse(localStorage.getItem('menuData'));
  //   if (storedMenuData) {
  //     setGetAllMenu(storedMenuData);
  //   }
  // }, []);

  function MenuItem({ menu }) {
    if (menu.parentId === 0 || menu.parentId === 1) {
      return (
        <li
          className={`nav-item ${
            sidebarOpen[menu.menuText] ? "menu-open" : ""
          }`}
          onClick={() => handleClickSidebar(menu.menuText)}
        >
          <a
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              // e.stopPropagation()
              // e.preventDefault();

              localStorage.setItem("ParentAccess", JSON.stringify(menu));
              if (menu?.menuUrl == "#") {
                return null;
              } else {
                navigate(`/${menu?.menuUrl}`);
              }
            }}
          >
            {menu.menuText == "DashBoard" ? (
              <MdDashboard fontSize={20} />
            ) : menu?.menuText == "LMS" ? (
              <FaUsers fontSize={20} />
            ) : menu?.menuText == "Security" ? (
              <BsShieldLockFill fontSize={20} />
            ) : menu?.menuText == "Masters" ? (
              <IoIosListBox fontSize={20} />
            ) : menu?.menuText == "Report" ? (
              <HiDocumentReport fontSize={20} />
            ) : menu?.menuText == "Warranty  Deviation" ? (

              <GiBoxUnpacking fontSize={20} />
            ) :menu?.menuText == "Service Request"?(
            <GrServices />
            ): menu?.menuText == "Call Center" ? (
              <RiCustomerServiceFill fontSize={20}/>
            ) : (
              ""
            )}
            <p className=""> {menu.menuText}</p>{" "}
            {menu.parentId == 1 ? (
              ""
            ) : (
             openstate? <span className="float-right">
                <IoIosArrowDown />
              </span>:""
            )}
          </a>
          {menu?.parentId == 1 ? (
            ""
          ) : (
            <ul className="nav nav-treeview">
              {GetAllMenu.filter((item) => item.parentId == menu.menuId).map(
                (childMenu) => (
                  <li
                    className="nav-item"
                    key={childMenu.menuId}
                    onClick={(e) => {
                      e.stopPropagation();
                      // e.preventDefault();

                      localStorage.setItem(
                        "ChildAccess",
                        JSON.stringify(childMenu)
                      );
                      navigate(`/${childMenu?.menuUrl}`);
                    }}
                  >
                    <a
                      // href="#"
                      className="nav-link"
                      onClick={(e) => {
                        // e.stopPropagation()
                      }}
                    >
                      <MdSubdirectoryArrowRight
                        fontSize={15}
                        className="mx-3"
                      />
                      <p>{childMenu.menuText}</p>
                    </a>
                  </li>
                )
              )}
              {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Getting Started</p>
            </a>
          </li> */}
            </ul>
          )}
        </li>
      );
    } else {
      return null; // Only render top-level menu items
    }
  }

  // useEffect(() => {
  //   const checkActiveMenuItem = () => {
  //     const pathtaken = window.location.pathname;
  //     $(".nav-item").removeClass("active");
  //     $(`.nav-item a[href="${pathtaken}"]`)
  //       .closest(".nav-item")
  //       .addClass("active");
  //   };

  //   checkActiveMenuItem();
  // }, []);

  return (
    <>
      <div className={`wrapper `}>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item d-flex">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
                onClick={()=>setopenstate(!openstate)}
              >
                <FaBars/>
              </a>   <span className="m-auto" style={{color:"#005bab"}}>Welcome, {UserName}</span>

            </li>
          </ul>

          {/* Right navbar links */}

          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fas fa-th-large"></i>
            </a>
          </li> */}
            {userType == "CG" || userType == "CG1" ? (
              ""
            ) : (
              <li className="nav-item">
                <a className="nav-link" role="button">
                  <Tooltip arrow placement="right" title="Change password">
                    <IconButton>
                      <TbPasswordUser
                        fontSize={20}
                        color="#004887"
                        onClick={() => {
                          navigate(`${pathName}/change-password`);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" role="button">
                <Tooltip arrow placement="right" title="Logout">
                  <IconButton>
                    <IoIosPower
                      fontSize={20}
                      color="#004887"
                      onClick={() => {
                        localStorage.clear();
                        setGetAllMenu([]);
                        navigate(`${pathName}`);
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="#" className="brand-link">
            <span className="brand-text font-weight-light">
              <img src={logo} alt="" srcset="" />
            </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add sidebar items here */}
                {/* <li className="nav-item" onClick={()=>navigate("/")}>
                <a  className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Contact</p>
                </a>
              </li>
              <li className="nav-item" onClick={()=>navigate("/about")}>
                <a  className="nav-link">
                  <i className="nav-icon fas fa-book"></i>
                  <p>About</p>
                </a>

              
              </li> */}

                {GetAllMenu?.filter(
                  (menu) => menu.parentId == 0 || menu.parentId == 1
                )?.map((menu) => (
                  <MenuItem key={menu.menuId} menu={menu} />
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Content Wrapper */}
        <div className="content-wrapper collapsed-content">
          {/* Content Header (Page header) */}
          {/* <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Documentation</h1>
              </div>
            </div>
          </div>
        </div> */}

          {/* Main content */}
          <section className="content py-3">
            <div className="container-fluid">
              {/* Add documentation content here */}
              {children}
            </div>
          </section>
        </div>

        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
          <div className="p-3">
            <h5>Title</h5>
            <p>Sidebar content</p>
          </div>
        </aside>
        {/* Main Footer */}

        {/* <footer className="main-footer"> */}
        {/* To the right */}
        {/* <div className="float-right d-none d-sm-inline">
          Anything you want
        </div> */}

        {/* Default to the left */}
        {/* <strong>Footer &copy; 2024</strong>
      </footer> */}
      </div>
    </>
  );
}

export default Sidebar;
