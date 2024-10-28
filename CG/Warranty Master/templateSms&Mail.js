import { MaterialReactTable } from 'material-react-table';
import { Card, Col, Row, Form, Button, Spinner, Modal, Accordion } from "react-bootstrap";
import Sidebar from '../../Sidebar'
import { useState, useMemo, useEffect } from 'react';
import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { handleResponse } from '../../../Components/Generic/utility';
import Loader from '../../loader';










function TemplateSms() {
    let token = localStorage.getItem("UserToken")
    const [isError, setIsError] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
        TypeURL()
    };
    const [showModal, setShowModal] = useState(false);
    const [data, setdata] = useState([])
    const [showIsActive, setIsActive] = useState(false);
    const handleCloseIsActive = () => setIsActive(false);
    const handleShowIsActive = () => setIsActive(true);
    const [showIsActive1, setIsActive1] = useState(false);
    const handleCloseIsActive1 = () => setIsActive1(false);
    const handleShowIsActive1 = () => setIsActive1(true);
    const [loading, setLoading] = useState(false)



    const handleClose = () => {
        setShow(false)

        setAddTemplate({
            typeId: '',
            templateName: '',
            templateSubject: '',
            templateBody: '',
            remarks: '',
            isHTML: true
        })

    }
    const handleModalShow = () => setShowModal(true);

    const handleModalClose = () => {
        setShowModal(false);
    }


    const fetchTemplate = () => {
        const fetchOption = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/GetAllTemplate`;
        fetch(fetchOption, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setdata(result)
            })
    }

    useEffect(() => {
        fetchTemplate()
    }, [])

    const [activeID, setactiveID] = useState(0)


    const columns = useMemo(
        () => [
            {
                accessorKey: "typeName",
                header: "Type Name",
            },

            {
                accessorKey: "templateName",
                header: "Template Name",
            },
            {
                accessorKey: "templateSubject",
                header: "Template Subject",
            },
            // {
            //     accessorKey: "templateBody",
            //     header: "Template Body",
            // },

            {
                accessorKey: "isActive",
                header: "Is Active",
                Cell: ({ cell }) => (
                    <p>{cell.getValue() === true ? "Yes" : "No"}</p>
                ),
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
                                                    console.log(cell.row.original.templateId);
                                                    settemplateID(cell.row.original.templateId)
                                                    handleModalShow()
                                                    TypeURL()

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
                                        <Tooltip>
                                            <IconButton>
                                                <FaUserXmark
                                                    className="user-btn"
                                                    style={{ color: 'red' }} // Style for the new icon
                                                    onClick={() => {
                                                        console.log(cell.row.original.templateId);
                                                        setactiveID(cell.row.original.templateId);
                                                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip>
                                            <IconButton>
                                                <FaUserCheck
                                                    className="user-btn"
                                                    style={{ color: 'blue' }}
                                                    onClick={() => {
                                                        console.log(cell.row.original.templateId);
                                                        setactiveID(cell.row.original.templateId);
                                                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }




                            </Box>

                        </>
                    )
                }
            },




        ]
    );

    const [addTemplate, setAddTemplate] = useState({
        typeId: '',
        templateId: 0,
        templateName: '',
        templateSubject: '',
        templateBody: '',
        remarks: '',
        isHTML: true,
        isActive: true



    })
    // const handleCheckboxChange = (event) => {
    //     setIsHtmlChecked(event.target.checked);
    // };

    // const handleTemplateEditorChange = (event, editor) => {
    //     let data = editor.getData();
    //     if (!isHtmlChecked) {
    //         const tempDiv = document.createElement('div');
    //         tempDiv.innerHTML = data;
    //         data = tempDiv.textContent || tempDiv.innerText || '';
    //     }
    //     console.log(data)
    //     setEditorData(data);
    // };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target.checked;
        setAddTemplate(prevState => ({
            ...prevState,
            // [name]: checked,
            isHTML: checked
        }));
    };

    const handleTemplateEditorChange = (event, editor) => {
        let data = editor.getData();
        // if (!addTemplate?.isHTML) {
        //     const tempDiv = document.createElement('div');
        //     tempDiv.innerHTML = data;
        //     data = tempDiv.textContent || tempDiv.innerText || '';
        // }
        console.log(data);
        setAddTemplate(prevState => ({
            ...prevState,
            templateBody: data
        }));
    };


    // const handleAddInputChange = (event) => {
    //     console.log(event.target.value)
    //     const { name, value } = event.target;
    //     setAddTemplate(prevState => ({
    //         ...prevState,
    //         [name]: value

    //     }));
    //     console.log(addTemplate)
    // };
    const handleAddInputChange = (e) => {
        const newdata = { ...addTemplate };
        newdata[e.target.name] = e.target.value;
        setAddTemplate(newdata);
        console.log(newdata);
    }


    const [editTemplate, setEditTemplate] = useState({
        typeId: '',
        templateId: 0,
        templateName: '',
        templateSubject: '',
        templateBody: '',
        remarks: '',
        isHTML: true,
        isActive: true


    })

    const handleEditInputChange = (e) => {
        const newdata = { ...editTemplate };
        newdata[e.target.name] = e.target.value;
        setEditTemplate(newdata);
        console.log(newdata);
    }
    const handleEditTemplateEditorChange = (event, editor) => {
        let data = editor.getData();

      
        console.log(data);

        setEditTemplate(prevState => ({
            ...prevState,
            templateBody: data
        }));
    };



    const [templateId, settemplateID] = useState("")

    const getSingleTemplate = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/GetTemplateById?templateId=${templateId}`;
    useEffect(() => {
        if (templateId) {
            fetch(getSingleTemplate, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setEditTemplate((pre) => {
                        return {
                            ...pre,
                            typeId: result?.typeId,
                            templateId: result?.templateId,
                            templateName: result?.templateName,
                            templateSubject: result?.templateSubject,
                            templateBody: result?.templateBody,
                            remarks: result?.remarks,
                            isHTML: result?.isHTML


                        }
                    })
                })
        }

    }, [templateId])
    const [typeName, setTypeName] = useState([])
    const TypeURL = () => {
        const typeUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=30&Id=0&Code=0`;
        fetch(typeUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTypeName(result)
            })

    }

    return (
        <>
                <Card
                    className="border-0 p-3 m-4"
                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                >
                    <div className='d-flex justify-content-between'>

                        <p className='pg-label m-0'>Sms & Mail Template</p>

                        <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Sms/Mail </Button></Col></Row>

                    </div>
                    <hr />

                    {

                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            initialState={{ showColumnFilters: false }} //show filters by default
                            muiTableHeadCellFilterTextFieldProps={{
                                sx: { m: "0.5rem 0", width: "100%" },
                                variant: "outlined",
                            }}
                            muiToolbarAlertBannerProps={isError
                                ? {
                                    color: 'error',
                                    children: 'Error loading data',
                                }
                                : undefined}

                        />


                    }
                    {/*----------------------- Add Modal SMS/MAIL----------------------- */}

                    <Modal show={show} onHide={handleClose} backdrop="static" size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Add New Mail & Sms Template</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                loading ? (<Loader />) : (

                                    <><Row>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Type <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Select
                                                    name='typeId'
                                                    onChange={handleAddInputChange}
                                                    placeholder=''
                                                    value={addTemplate?.typeId}

                                                >
                                                    <option>Select</option>
                                                    {
                                                        typeName?.map((list, index) => {
                                                            return (
                                                                <>
                                                                    <option value={list?.parameterTypeId}>{list?.parameterType}</option>

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>


                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Template Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Control
                                                    value={addTemplate.templateName}
                                                    type="text"
                                                    placeholder=''
                                                    name="templateName"
                                                    onChange={handleAddInputChange} />

                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Template Subject <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=''
                                                    name="templateSubject"
                                                    value={addTemplate.templateSubject}
                                                    onChange={handleAddInputChange} />

                                            </Form.Group>
                                        </Col>



                                    </Row><Row>
                                            <Col className='mt-3'>
                                                <Form.Label>Template Body <span style={{ color: 'red' }}>*</span></Form.Label>


                                                <CKEditor
                                                    className='CKE'
                                                    style={{
                                                        height: '170px'
                                                    }}
                                                    editor={ClassicEditor}
                                                    data={addTemplate.templateBody}
                                                    onChange={handleTemplateEditorChange} />
                                            </Col>


                                        </Row><Row>


                                            <Col className='mt-3' md={6}>
                                                <Form.Group>
                                                    <Form.Label>Remarks</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        type="text"
                                                        value={addTemplate.remarks}
                                                        name='remarks'
                                                        onChange={handleAddInputChange}
                                                        placeholder='' />

                                                </Form.Group>
                                            </Col>
                                            {/* <Col md={4} className='mt-3'>
                                                <Form.Group className='mt-4'>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label="IS HTML"
                                                        name='isHTML'
                                                        disabled
                                                        checked={addTemplate.isHTML}
                                                        onChange={(e) => {
                                                            setAddTemplate((prev) => ({
                                                                ...prev,
                                                                isHTML: e.target.checked,
                                                            }));
                                                        }} />
                                                </Form.Group>
                                            </Col> */}

                                        </Row></>
                                )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="" className='add-Btn' onClick={(e) => {
                                e.preventDefault();
                                const addTemplateUrl = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/UpsertTemplate`;
                                let data = {
                                    ...addTemplate
                                }


                                const typeName = data.typeId;
                                if (!typeName || typeName === 'Select') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Type is required."
                                    });
                                    return;
                                }
                                const tempName = addTemplate.templateName;
                                if (!tempName) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Name is required."
                                    });
                                    return;
                                }
                                const tempSub = addTemplate.templateSubject;
                                if (!tempSub) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Subject is required."
                                    });
                                    return;
                                }
                                const tempBody = addTemplate.templateBody;
                                if (!tempBody) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Body is required."
                                    });
                                    return;
                                }



                                setLoading(true)

                                fetch(addTemplateUrl, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(data)
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

                                                }
                                            }

                                            if (res.status == 200 && r != "") {
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "Saved successfully!"
                                                })
                                                handleClose();
                                                fetchTemplate();
                                                setLoading(false)




                                            }

                                            else if (res.status == 200 && r == "") {
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Template already exists!"
                                                })
                                                setLoading(false)



                                            }

                                        })
                                    })


                            }}>
                            Save
                            </Button>


                        </Modal.Footer>
                    </Modal>

                    {/*----------------------- Edit Modal SMS/MAIL----------------------- */}


                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Edit Mail & Sms Template</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {
                                loading ? (<Loader />) : (
                                    <><Row>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Type <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Select
                                                    name='typeId'
                                                    onChange={handleEditInputChange}
                                                    placeholder=''
                                                    disabled
                                                    value={editTemplate?.typeId}
                                                >
                                                    <option>Select</option>
                                                    {
                                                        typeName?.map((list, index) => {
                                                            return (
                                                                <>
                                                                    <option value={list?.parameterTypeId}>{list?.parameterType}</option>

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>


                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Template Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Control
                                                    value={editTemplate.templateName}
                                                    type="text"
                                                    placeholder=''
                                                    
                                                    name="templateName"
                                                    onChange={handleEditInputChange} />

                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Template Subject <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=''
                                                    name="templateSubject"
                                                    value={editTemplate.templateSubject}
                                                    onChange={handleEditInputChange} />

                                            </Form.Group>
                                        </Col>



                                    </Row><Row>
                                            <Col className='mt-3'>
                                                <Form.Label>Template Body <span style={{ color: 'red' }}>*</span></Form.Label>


                                                <CKEditor
                                                    className='CKE'
                                                    style={{
                                                        height: '170px'
                                                    }}
                                                    editor={ClassicEditor}
                                                    data={editTemplate.templateBody}
                                                    onChange={handleEditTemplateEditorChange} />
                                            </Col>


                                        </Row><Row>


                                            <Col className='mt-3' md={6}>
                                                <Form.Group>
                                                    <Form.Label>Remarks</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        type="text"
                                                        value={editTemplate.remarks}
                                                        name='remarks'
                                                        onChange={handleEditInputChange}
                                                        placeholder='' />

                                                </Form.Group>
                                            </Col>
                                            {/* <Col md={4} className='mt-3'>
                                                <Form.Group className='mt-4'>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label="IS HTML"
                                                        name='isHTML'
                                                        disabled
                                                        checked={editTemplate.isHTML}
                                                        onChange={(e) => {
                                                            setEditTemplate((prev) => ({
                                                                ...prev,
                                                                isHTML: e.target.checked,
                                                            }));
                                                        }} />
                                                </Form.Group>
                                            </Col> */}

                                        </Row></>
                                )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                                Close
                            </Button>

                            <Button variant="" className='add-Btn' onClick={(e) => {
                                e.preventDefault();
                                const editTemplateUrl = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/UpsertTemplate`;
                                let data = {
                                    ...editTemplate
                                }
                                console.log(data)
                                const typeName = data.typeId;
                                if (!typeName || typeName === 'Select') {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Type is required."
                                    });
                                    return;
                                }
                                const tempName = editTemplate.templateName;
                                if (!tempName) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Name is required."
                                    });
                                    return;
                                }
                                const tempSub = editTemplate.templateSubject;
                                if (!tempSub) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Subject is required."
                                    });
                                    return;
                                }
                                const tempBody = editTemplate.templateBody;
                                if (!tempBody) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Template Body is required."
                                    });
                                    return;
                                }




                                else {
                                    setLoading(true)
                                    fetch(editTemplateUrl, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${token}`
                                        },
                                        body: JSON.stringify(data)
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
                                                        setLoading(false)

                                                    }
                                                }

                                                if (res.status == 200 && r != "") {
                                                    Swal.fire({
                                                        icon: "success",
                                                        title: "Updated successfully!"
                                                    })
                                                    handleModalClose()
                                                    fetchTemplate()
                                                    setLoading(false)






                                                }

                                                else if (res.status == 200 && r == "") {
                                                    Swal.fire({
                                                        icon: "warning",
                                                        title: "Template already exists!"
                                                    })
                                                    setLoading(false)



                                                }

                                            })
                                        })
                                }


                            }}>
                                Update
                            </Button>


                        </Modal.Footer>
                    </Modal>




                    {/* ----------------------------------Active--------------------------------------- */}



                    <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
                        <Modal.Header closeButton>
                            <Modal.Title className='mdl-title'>Activate Template</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to activate this Template?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                                No
                            </Button>
                            <Button variant="" className='add-Btn' onClick={(e) => {
                                e.preventDefault();

                                const deleteTemplUrl = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/DeleteTemplate?templateId=${activeID}&isActive=${1}`;

                                fetch(deleteTemplUrl, {
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
                                                fetchTemplate()

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
                            <Modal.Title className='mdl-title'>De-activate Template</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to de-activate this Temp?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                                No
                            </Button>
                            <Button variant="" className='add-Btn' onClick={(e) => {
                                e.preventDefault();

                                const deleteTempUrl = `${process.env.REACT_APP_API_URL}TemplateMailAndSms/DeleteTemplate?templateId=${activeID}&isActive=${0}`;

                                fetch(deleteTempUrl, {
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
                                            fetchTemplate()

                                        }

                                    })

                            }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>




































                </Card>








        </>

    )

}
export default TemplateSms