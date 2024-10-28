import React,{useState,useMemo,useEffect} from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaExternalLinkSquareAlt, FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";


import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../loader';


function Deviation() {
    let token = localStorage.getItem("UserToken")
    let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false)
        
    
      };
      const handleShow = () => {
        setShow(true)
      
    
    
      };




  const [showModal, setShowModal] = useState(false);


  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);


    const [showIsActive, setIsActive] = useState(false);
    const handleCloseIsActive = () => setIsActive(false);
    const handleShowIsActive = () => setIsActive(true);
    const [showIsActive1, setIsActive1] = useState(false);
    const handleCloseIsActive1 = () => setIsActive1(false);
    const handleShowIsActive1 = () => setIsActive1(true);

    const [allDeviations, setallDeviations] = useState([])


    const [pdId, setpdId] = useState("")

    const columns = useMemo(
        () => [
    
          {
            accessorKey: "divisionName",
            header: "Division",
            size: "50"
    
          },
          {
            accessorKey: "productCode",
            header: "Product Code",
            size: "50"
    
          },
          {
            accessorKey: "roleCode",
            header: "Role Code",
            size: "50"
          },
          {
            accessorKey: "noOfDevMonth",
            header: "Deviation (in months)",
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
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="left" title="Edit">
                          <IconButton
                            className="edit-btn"
                            onClick={() => {
                              console.log(cell.row.original);
                              setpdId(cell.row.original.prodDevAutoId)
                              handleModalShow()
                              
      
                            }}
      
                          >
                            <FaRegEdit color='#005bab' />
                          </IconButton>
                        </Tooltip> 
                    }
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
      
      
                    {
                      cell.row.original.isActive === false ? (
                        // Render a different icon when isActive is false
                       
                         <Tooltip>
                          <IconButton className="user-btn" onClick={() => {
                            console.log(cell.row.original);
                            setpdId(cell.row.original.prodDevAutoId);
                            cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                          }}>
      
      
                            <FaUserXmark
      
                              style={{ color: 'red' }} // Style for the new icon
      
                            />
      
                          </IconButton>
                        </Tooltip> 
                      ) : (
                        <Tooltip>
                          <IconButton className="user-btn" onClick={() => {
                            console.log(cell.row.original);
                            setpdId(cell.row.original.prodDevAutoId);
                            cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                          }}>
      
      
                            <FaUserCheck
      
                              style={{ color: 'blue' }}
      
                            />
                          </IconButton>
                        </Tooltip> 
                      )
                    }
      
      
                    {/* <Switch checked={data === true} onClick={(e) => {
                      console.log(cell.row.original?.divisionId);
                      setactiveID(cell.row.original?.divisionId)
                      cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
                    }} /> */}
      
                  </Box>
      
                </>
              )
            }
          },
    
    
        ]
      );

      const fetchAllDeviations=()=>{
        fetch(`${process.env.REACT_APP_API_URL}ProductDeviation/GetAllProductDeviation`,{
            headers: {
                "Authorization": `Bearer ${token}`
              }
        })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
        setallDeviations(result)
    })
      }

      useEffect(()=>{
           fetchAllDeviations()
      },[])




      const [addProductDeviation, setaddProductDeviation] = useState({
        prodDevAutoId: 0,
        divisionCode: "",
        productCode: "",
        roleCode: "",
        noOfDevMonth: 0,
        isActive: true,
      });
      


      
  const handleChange = (e) => {
    const newdata = { ...addProductDeviation };
    newdata[e.target.name] = e.target.value;
    setaddProductDeviation(newdata);
    console.log(newdata);
  }





  const [AllRoles, setAllRoles] = useState([])
  const [divisions, setdivisions] = useState([])


  const GetRolesUrl = `${process.env.REACT_APP_API_URL}Role/GetAllRoles`;

  const getAllDivisionsUrl = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;

      useEffect(()=>{
        fetch(GetRolesUrl, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setAllRoles(result)
            })




            fetch(getAllDivisionsUrl, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setdivisions(result)
              })


      },[])



      const [editProductDeviation, seteditProductDeviation] = useState({
        prodDevAutoId: pdId,
        divisionCode: "",
        productCode: "",
        roleCode: "",
        noOfDevMonth: 0,
        isActive: true,
      })


      const handleChangeEdit = (e) => {
        const newdata = { ...editProductDeviation };
        newdata[e.target.name] = e.target.value;
        seteditProductDeviation(newdata);
        console.log(newdata);
      }


      useEffect(()=>{
        if(pdId){

        fetch(`${process.env.REACT_APP_API_URL}ProductDeviation/GetProductDeviationById?productDeviationId=${pdId}`,{
           
                    headers: {
                  
                      "Authorization": `Bearer ${token}`
                    },
                 
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            seteditProductDeviation((pre)=>{
                return{
                    ...pre,
                    prodDevAutoId:result?.prodDevAutoId,
                    divisionCode:result?.divisionCode,
                    productCode:result?.productCode,
                    roleCode:result?.roleCode,
                    noOfDevMonth:result?.noOfDevMonth
                }
            })
        })
    }

      },[pdId])



  return (
    <>
      <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Product Deviation Master</p>

            {/* {Permissions?.isAdd ?  */}
            <Row><Col><Button variant='' className='add-Btn'
             onClick={handleShow}
             >Add New</Button></Col></Row> 
            {/* // : ""} */}

          </div>
          <hr />

          <MaterialReactTable
                columns={columns}
                data={allDeviations}

                initialState={{ showColumnFilters: false }} //show filters by default

                muiTableHeadCellFilterTextFieldProps={{
                  sx: { m: "0.5rem 0", width: "100%" },
                  variant: "outlined",
                }}
                // enableEditing
                // onEditingRowSave={handleSaveRowEdits}
                // onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ cell, row, table }) => (

                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="left" title="Edit">
                          <IconButton
                            className="edit-btn"
                            onClick={() => {
                            //   console.log(cell.row.original.branchId);
                            //   setbarnchID(cell.row.original.branchId)
                            //   handleShow1()
                            }}

                          >
                            <FaRegEdit color='#005bab' />
                          </IconButton>
                        </Tooltip>
                    }
                    {
                      cell.row.original.isActive == false ? "" :
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => {
                            //   setbarnchID(cell.row.original.branchId)
                            //   setisActive(cell.row.original.branchId)
                            //   handleShowDel()
                            }}


                          >
                            <HiOutlineTrash color='red' />
                          </IconButton>
                        </Tooltip>
                    }

                  </Box>
                )}

                // manualPagination={true}
                // muiToolbarAlertBannerProps={isError
                //   ? {
                //     color: 'error',
                //     children: 'Error loading data',
                //   }
                //   : undefined}
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

                renderTopToolbarCustomActions={({ table }) => (
                  <>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '10px',
                      flexWrap: 'wrap',
                    }}>

                      {Permissions?.isDownload ? <Button variant=''
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            // customHeaders,
                            [
                              'branchId',
                              'totalRows',
                              'countryId',
                              'stateId',
                              'cityId',
                              'isActive',
                              'remarks'
                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button> : ""}
                      {/* <Button variant=''
                      disabled={table.getPrePaginationRowModel().rows.length === 0}
                      onClick={() =>
                        handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                      }
  
                    >
                      <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF' />
  
  
                    </Button> */}
                    </div>
                  </>

                )}


              // positionActionsColumn="first"

              /> 



<Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Product Deviation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select name='divisionCode' onChange={handleChange}>
                            <option value="">Select</option>
                            {
                                divisions?.map((division,i)=>{
                                    return(
                                        <>
                                        <option value={division?.divisionCode}>{division?.divisionName}</option>
                                        </>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Product Code <span className='req-t'>*</span></Form.Label>
                    <Form.Control type='text' name='productCode' onChange={handleChange}/>
                   </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Role Code <span className='req-t'>*</span></Form.Label>
                        <Form.Select name='roleCode' onChange={handleChange}>
                            <option value="">Select</option>
                            {
                                AllRoles?.map((role,i)=>{
                                    return(
                                        <>
                                        <option value={role?.roleCode}>{role?.roleName}</option>
                                        </>
                                    )
                                })
                            }
                        </Form.Select>
                   </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>No. Of Deviation Months <span className='req-t'>*</span></Form.Label>
                    <Form.Control type='text' name='noOfDevMonth' onChange={handleChange}/>
                   </Form.Group>
                    </Col>
                </Row>
                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn '
               onClick={(e) => {
                e.preventDefault();

                const addPDUrl = `${process.env.REACT_APP_API_URL}ProductDeviation/UpsertProductDeviation`;

                // let data = {
                //   ...addBranch,
                //   countryId: parseInt(addBranch.countryId),
                //   stateId: parseInt(addBranch.stateId),
                //   cityId: parseInt(addBranch.cityId),
                //   pinCode: parseInt(addBranch.pinCode)
                // }


                // if (addBranch.branchCode === "" || addBranch.branchName === "" || addBranch.remarks === "" || addBranch.regionCode === "" || addBranch.branchAddress === "" || addBranch.countryId === "" || addBranch.stateId === "" || addBranch.cityId === "" || addBranch.pinCode === "" || addBranch.phone === "" || addBranch.email === "") {
                //     Swal.fire({
                //       icon:"error",
                //       title:"Please fill all the fields marked with red *"
                //     })
                // }

               






if(addProductDeviation?.divisionCode=="" || addProductDeviation?.productCode=="" || addProductDeviation?.roleCode=="" || addProductDeviation?.noOfDevMonth==""){

    Swal.fire({
        icon:"error",
        title:"Please fill all the fields marked with red *!"
    })
}
else{

              
                  fetch(addPDUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(addProductDeviation)
                  })
                    .then((res) => {
                      // res.json()
                      let resp = res.text()
                      resp.then((r) => {
                        console.log(r);
                        let regextest = /^[a-zA-Z0-9]+$/;
                        if (!r.match(regextest)) {
                          const errorData = JSON.parse(r);
                          console.log('errorData-------------', errorData);
                          if (errorData && errorData.title === "One or more validation errors occurred.") {
                            // Construct error message from the error object
                            let errorMessage = "";
                            for (const key in errorData.errors) {
                              errorMessage += `${errorData.errors[key][0]}\n`;
                            }
                            Swal.fire({
                              icon: "error",
                              title: errorMessage
                            });
                            // setLoading(false)

                          }
                        }

                        // const errorData = JSON.parse(r);
                        //     console.log('errorData-------------', errorData);
                        //     if (errorData && errorData.title === "One or more validation errors occurred.") {
                        //       // Construct error message from the error object
                        //       let errorMessage = "";
                        //       for (const key in errorData.errors) {
                        //         errorMessage += `${errorData.errors[key][0]}\n`;
                        //       }
                        //       Swal.fire({
                        //         icon: "error",
                        //         title: errorMessage
                        //       });
                        //     }



                        if (res.status == 200) {
                          Swal.fire({
                            icon: "success",
                            title: "Saved successfully!"
                          })
                          handleClose()
           fetchAllDeviations()
                    


                        }
                        // if (res.status == 200 && r == "BREXISTS") {
                        //   Swal.fire({
                        //     icon: "warning",
                        //     title: "Branch already exists!"
                        //   });
                        //   setLoading(false)

                        // } else if (res.status === 200 && r == 'INVALIDPINCODE') {
                        //   Swal.fire({
                        //     icon: "warning",
                        //     title: "InValid Pin Code"
                        //   });
                        //   setLoading(false)

                        // }
                      })



                      // if(res"BREXISTS"){
                      //   alert("got it")
                      // }
                    })
                }

                // window.location.reload()
                // else if(res.body)
                // .then((result)=>{
                //   console.log(result);

                // })
              }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>



{/* -------------------------------------------------Edit-------------------------------------------------- */}



<Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Product Deviation</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Row>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                        <Form.Select name='divisionCode' value={editProductDeviation?.divisionCode} onChange={handleChangeEdit}>
                            <option value="">Select</option>
                            {
                                divisions?.map((division,i)=>{
                                    return(
                                        <>
                                        <option value={division?.divisionCode}>{division?.divisionName}</option>
                                        </>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Product Code <span className='req-t'>*</span></Form.Label>
                    <Form.Control type='text' name='productCode' value={editProductDeviation?.productCode} onChange={handleChangeEdit}/>
                   </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>Role Code <span className='req-t'>*</span></Form.Label>
                        <Form.Select name='roleCode' value={editProductDeviation?.roleCode} onChange={handleChangeEdit}>
                            <option value="">Select</option>
                            {
                                AllRoles?.map((role,i)=>{
                                    return(
                                        <>
                                        <option value={role?.roleCode}>{role?.roleName}</option>
                                        </>
                                    )
                                })
                            }
                        </Form.Select>
                   </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='mt-3'>
                    <Form.Group>
                        <Form.Label>No. Of Deviation Months <span className='req-t'>*</span></Form.Label>
                    <Form.Control type='text' name='noOfDevMonth' value={editProductDeviation?.noOfDevMonth} onChange={handleChangeEdit}/>
                   </Form.Group>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                Close
              </Button>

              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editDivisionUrl = `${process.env.REACT_APP_API_URL}ProductDeviation/UpsertProductDeviation`;
               
                     fetch(editDivisionUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(editProductDeviation)
                      })
                      .then(res=>{
                        
                     console.log(res);

                    //  let response=

                      if (res.status === 200) {
                        
                          Swal.fire({
                            icon: "success",
                            title: "Update successfully!"
                          });
                          handleModalClose()
                          fetchAllDeviations();
                        //   SapDivision();
                          // window.location.reload();
                        //   setLoading(false)

                        
                      }
                      else {
                        const errorData =  res.json();
                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                          // Construct error message from the error object
                          let errorMessage = "";
                          for (const key in errorData.errors) {
                            errorMessage += `${errorData.errors[key][0]}\n`;
                            Swal.fire({
                              icon: "error",
                              title: errorMessage
                            });
                          }
                        }
                        else {
                          throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        // setLoading(false)

                      }
                    })


              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>






        
          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Product deviation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Product deviation?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePDUrl = `${process.env.REACT_APP_API_URL}ProductDeviation/DeleteProductDeviation?productDeviationId=${pdId}&isActive=${1}`;





                fetch(deletePDUrl, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                })
                  .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);
                      if (res.status == 200) {
                        Swal.fire({
                          icon: "success",
                          title: "Activated successfully!"
                        })
                        handleCloseIsActive()
                        fetchAllDeviations()

                      }
                      else {
                        Swal.fire({
                          icon: "warning",
                          title: "Something went wrong!"
                        })

                      }
                    })
                  })

              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>






          {/* ----------------------------------InActive--------------------------------------- */}



          <Modal show={showIsActive1} onHide={handleCloseIsActive1} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>De-activate Product deviation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Product deviation?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deletePDUrl = `${process.env.REACT_APP_API_URL}ProductDeviation/DeleteProductDeviation?productDeviationId=${pdId}&isActive=${0}`;





                fetch(deletePDUrl, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                })
                  .then((res) => {


                    let retResult = handleResponse(res);
                    if (retResult) {
                      handleCloseIsActive1()
                      fetchAllDeviations()

                    }

                    // let resp = res.text()
                    // resp.then((r) => {
                    //   console.log(r);
                    //   if (res.status == 200) {
                    //     Swal.fire({
                    //       icon: "success",
                    //       title: "De-activated successfully!"
                    //     })
                    //     handleCloseIsActive1()
                    //     fetchAllDivisions()

                    //   }
                    //   else {
                    //     Swal.fire({
                    //       icon: "warning",
                    //       title: "Something went wrong!"
                    //     })

                    //   }
                    // })
                  })

              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default Deviation