import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, Accordion, Form, InputGroup, Table } from 'react-bootstrap';
import { CgArrowsExchange, CgFileDocument } from 'react-icons/cg';
import { FaCircle, FaDownload, FaEye, FaUserCircle } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus, FaCirclePlus, FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosArrowRoundBack, IoIosDownload, IoMdSave } from 'react-icons/io';
import { IoArrowUpOutline, IoCallOutline, IoMail, IoSave, IoSyncOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';

import { BsInfoCircleFill } from 'react-icons/bs';
import { IconButton, Tooltip } from '@mui/material';

import moment from 'moment';
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';

const FirScreen = () => {
    let token = localStorage.getItem("UserToken");
    const navigate = useNavigate();
    const [selectedClousureStatus, setSelectedClousureStatus] = useState('')
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => label).join(", ")
            : "Select...";
    };
    const options = [
        { label: "Spare consumption", value: "Spare consumption" },
        // { label: "Bearing replacement at Site / ASC", value: "Bearing replacement at Site / ASC" },
        { label: "Only Site visit", value: "Only Site visit" },
        { label: "Site visit & Repair ", value: "Site visit & Repair " },
        { label: "Include site visit charges alongwith workshop charges", value: "Include site visit charges alongwith workshop charges" },
        { label: "Repair at ASC", value: "Repair at ASC" },
        // { label: "First level repair", value: "First level repair" },
        // { label: "Second level repair", value: "Second level repair" },
    ];

    const [addActivityIten, setaddActivityIten] = useState([])
    const [addActivity, setAddActivity] = useState({
        typeOfActivity: []
    });

    useEffect(() => {
        if (addActivity?.typeOfActivity.length > 0) {
            console.log(addActivity?.typeOfActivity.map(item => item.value));
        } else {
            console.log('No items selected');
        }
    }, [addActivity?.typeOfActivity]);

    const [addDefectCategoryOption, setAddDefectCategoryOption] = useState({
        defectCategoryItem: "",
        defectItem: "",
    });
    const [defectList, setDefectList] = useState([]);

    const [addActivityItem, setAddActivityItem] = useState({
        description: "",
    });
    const [addDesclist, setaddDesclist] = useState([])

    const addDescriptionList = () => {
        setaddDesclist([...addDesclist, addActivityItem])

    }

    const handleAddDefect = () => {
        if (
            addDefectCategoryOption.defectCategoryItem &&
            addDefectCategoryOption.defectItem
        ) {
            setDefectList([...defectList, addDefectCategoryOption]);

            setAddDefectCategoryOption({
                defectCategoryItem: "",
                defectItem: "",
            });
        }
        console.log(defectList);
    };
    const handleRemoveButtonClick = (index) => {
        const updatedData = [...defectList];
        updatedData.splice(index, 1);
        setDefectList(updatedData);
    };

    useEffect(() => {
        console.log(addActivityIten); // Log updated addActivityIten whenever it changes
    }, [addActivityIten]);

    const [uploadPhoto, setUploadPhoto] = useState([{
        label: '',
        file: ""
    }]);
    const [fileInputs, setfileInputs] = useState([]);

    const [typeSelected, setTypeSelected] = useState('')


    const addFileInput = () => {
        setfileInputs([...fileInputs, uploadPhoto]);
        console.log(...fileInputs, uploadPhoto, '----------add')
    };
    const handleRemovefile = (index) => {
        const updatedfile = [...fileInputs];
        updatedfile.splice(index, 1);
        setfileInputs(updatedfile);
        console.log(index)

    };

    const [image, setImage] = useState('');
    const [imageInstallationCondition, setImageInstallationCondition] = useState('')
    const [imageSerialNo, setImageSerialNo] = useState('')
    const [newImage, setNewImage] = useState('')
    const [file, setFile] = useState();


    const [addFirdata, setAddFirData] = useState({
        productSrNumber: '',
        division: '',
        productLine: "",
        productGroup: "",
        productCode: '',
        productDescription: "",
        batchNo: "",
        invoiceNo: '',
        invoiceDate: '',
        warrantyDate: '',
        invoiceCopy: "",
        typeofApplication: "",
        totalNoHours: '',
        failureObservation: "",
        defectCategory: '',
        subDefect: '',
        serialNumberSticker: '',
        installtionCondition: "",
        electricalCondition: '',
        clousurStatus: '',
        replaceTag: "",
        detailsWorkDone: '',
        typeOfworkDone: [],
        spare: '',
        repairASC: ''
    })
    const handleChange = (e) => {
        const newdata = { ...addFirdata };
        newdata[e.target.name] = e.target.value;
        setAddFirData(newdata);
        console.log(newdata);
    };

    const handleFIRSubmit = () => {
        if (addFirdata?.productSrNumber === '' || addFirdata?.division === '' || addFirdata?.productLine == '' || addFirdata?.productGroup == '' || addFirdata?.productCode == '' || addFirdata?.productDescription == '' || addFirdata?.batchNo == '' || addFirdata?.invoiceNo == '' || addFirdata?.invoiceDate == '' || addFirdata?.warrantyDate == '' || addFirdata?.typeofApplication == '' || addFirdata?.totalNoHours == '' || addFirdata?.failureObservation == '' || addFirdata?.serialNumberSticker == '' || addFirdata?.installtionCondition == '' || addFirdata?.electricalCondition == '' || addFirdata?.clousurStatus == '' || addFirdata?.detailsWorkDone == '' || addFirdata?.typeOfworkDone == '') {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            })
        }
        else if (defectList.length == 0) {
            Swal.fire({
                icon: "error",
                title: "Please add defect   "
            })

        }
        else {
            alert('data saved suceefull')



        }
    }
    const [allproductLines, setallproductLines] = useState([]);
    const [allDivisions, setallDivisions] = useState([]);

    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

    useEffect(() => {
        fetch(getAllDivisions, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setallDivisions(result);
            });
    }, []);






    return (
        <>
            <Row>

                <Row>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Product Serial No <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="productSrNumber"
                                value={addFirdata?.productSrNumber}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            productSrNumber: e.target.value
                                        }
                                    })
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Division <span className="req-t">*</span></Form.Label>
                            {/* <Form.Select
                                name="division"
                                value={addFirdata?.division}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            division: e.target.value
                                        }
                                    })
                                }}
                            >




                            </Form.Select> */}
                            <Form.Select
                                name="division"
                                value={addFirdata?.division}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            division: e.target.value
                                        }
                                    })
                                    const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;
                                    fetch(getAllProductLines, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    })
                                        .then((res) => res.json())
                                        .then((result) => {
                                            console.log(result);
                                            setallproductLines(result);
                                        });
                                }}
                            >
                                <option value="">Select</option>
                                {allDivisions?.map((division, i) => {
                                    return (
                                        <>
                                            <option
                                                value={division?.parameterTypeId}
                                            >
                                                {division?.parameterType}
                                            </option>
                                        </>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2} >

                    
                        <Form.Group>
                            <Form.Label>Product Line <span className="req-t">*</span></Form.Label>
                            <Form.Select
                                name="productLine"
                                value={addFirdata?.productLine}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            productLine: e.target.value
                                        }
                                    })
                                }}

                            >
                                <option value="select">Select</option>
                                <option value="LT">LT</option>


                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Product Group <span className="req-t">*</span></Form.Label>
                            <Form.Select name="productGroup"
                                value={addFirdata?.productGroup}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            productGroup: e.target.value
                                        }
                                    })
                                }}
                            >
                                <option value="select">Select</option>
                                <option value="LT">LT</option>


                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Product Code <span className="req-t">*</span></Form.Label>
                            <Form.Control type="text"
                                name='productCode'
                                value={addFirdata?.productCode}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            productCode: e.target.value
                                        }
                                    })
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Product Description <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                name='productDescription'
                                value={addFirdata?.productDescription}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            productDescription: e.target.value
                                        }
                                    })
                                }}

                            // readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Batch No <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="batchNo"
                                value={addFirdata?.batchNo}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            batchNo: e.target.value
                                        }
                                    })
                                }}
                            // readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} >
                        <Form.Group>
                            <Form.Label>Invoice No <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="invoiceNo"
                                value={addFirdata?.invoiceNo}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            invoiceNo: e.target.value
                                        }
                                    })
                                }}

                            />
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Invoice Date <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                name='invoiceDate'
                                value={addFirdata?.invoiceDate}
                                onChange={(e) => {
                                    setAddFirData((pre) => {
                                        return {
                                            ...pre,
                                            invoiceDate: e.target.value
                                        }
                                    })
                                }}

                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Warranty Date <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                name="warrantyDate"

                                value={addFirdata?.warrantyDate}
                                onChange={handleChange}

                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Upload Invoice Copy <span className="req-t">*</span></Form.Label>
                            <Form.Control
                                type="file"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Type of application <span className="req-t">*</span></Form.Label>
                            <Form.Select
                                name="typeofApplication"
                                value={addFirdata?.typeofApplication}
                                onChange={handleChange}
                            >
                                <option value=''>Select</option>
                                <option value='Aircurtain'>Aircurtain</option>
                                <option value='ATM Machine'>ATM Machine</option>
                                <option value='Atta Chakki'>Atta Chakki</option>
                                <option value='Biotoilet'>Biotoilet</option>


                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Total no of hours run <span className="req-t">*</span> </Form.Label>
                            <Form.Control type='number'
                                name="totalNoHours"
                                value={addFirdata?.totalNoHours}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={9}>
                        <Form.Group>
                            <Form.Label>Failure observation <span className="req-t">*</span></Form.Label>
                            <Form.Control as='textarea' rows={2}
                                name="failureObservation"
                                value={addFirdata?.failureObservation}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>







                </Row>
                {/* <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Failure observation</Form.Label>
                            <Form.Control type='text' />
                        </Form.Group>
                    </Col>
                </Row> */}




                <Row className=''>

                    <p className=" mt-2 m-0 p-0 pg-label pl-2">Defect </p>
                    <Row>

                        <Col md={6}>
                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Defect Category <span className="req-t">*</span></Form.Label>
                                        <Form.Select
                                            value={
                                                addDefectCategoryOption?.defectCategoryItem
                                            }
                                            onChange={(e) =>
                                                setAddDefectCategoryOption({
                                                    ...addDefectCategoryOption,
                                                    defectCategoryItem: e.target.value,
                                                })
                                            }

                                        >

                                            <option value=''>Select</option>
                                            <option value='Paint Issue '>Paint Issue</option>
                                            <option value='Winding Burnt-Main Stator	'>Winding Burnt-Main Stator	</option>
                                            <option value='TB Broken	'>TB Broken	</option>

                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Sub defect <span className="req-t">*</span> </Form.Label>
                                        <Form.Select
                                            value={
                                                addDefectCategoryOption?.defectItem
                                            }
                                            onChange={(e) =>
                                                setAddDefectCategoryOption({
                                                    ...addDefectCategoryOption,
                                                    defectItem: e.target.value,
                                                })
                                            }

                                        >
                                            <option value="">Select</option>
                                            <option value="Paint damage">Paint damage</option>
                                            <option value="Failed due to overload">Failed due to overload
                                            </option>
                                            <option value="terminal board broken">Terminal board broken

                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={1} className="mt-4">
                                    <Tooltip
                                        arrow
                                        placement="right"
                                        title="add defect"
                                    >
                                        <IconButton
                                            className="edit-btn"
                                            onClick={handleAddDefect}
                                        >
                                            <FaCirclePlus
                                                color="green"
                                                fontSize={25}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Col>
                                {defectList.length == 0 ? (
                                    ""
                                ) : (
                                    <div style={{
                                        maxHeight: '200px',
                                        overflowY: 'scroll'
                                    }}>

                                        <Row className='m-0 p-0'>
                                            <Col md={12} className='m-0 p-0'>
                                                <Table responsive bordered className="mt-1 m-0 p-0">
                                                    <thead>
                                                        <tr
                                                            style={{
                                                                fontSize: "12px",
                                                            }}
                                                        >
                                                            <th className='m-0 pl-1 py-1 align-content-center'>Defect category</th>
                                                            <th className='m-0 pl-1 py-1 align-content-center'>Sub defect</th>
                                                            <th className='m-0 pl-1 py-1 align-content-center'>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {defectList?.map((add, index) => {
                                                            return (
                                                                <tr
                                                                    style={{
                                                                        fontSize: "12px",
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectCategoryItem}</td>
                                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectItem}</td>
                                                                    <td className='m-0 pl-1 py-0 align-content-center'>
                                                                        {" "}
                                                                        <Tooltip
                                                                            arrow
                                                                            placement="right"
                                                                            title="remove"
                                                                        >
                                                                            <IconButton
                                                                                className="edit-btn"
                                                                                onClick={() =>
                                                                                    handleRemoveButtonClick(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <FaCircleMinus
                                                                                    color="red"
                                                                                    fontSize={20}
                                                                                />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

                            </Row>

                        </Col>
                        <Col md={6}>
                            <Row>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Type of activity<span className="req-t">*</span> </Form.Label>
                                        <Form.Select
                                            value={typeSelected}
                                            onChange={(e) => {
                                                setTypeSelected(e.target.value)
                                            }}
                                        >
                                            <option value="">Select</option>
                                            <option value="Local reparing">Local reparing</option>
                                            <option value="Local reparing 2">Local reparing 2</option>

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                {
                                    typeSelected && (
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Description <span className="req-t">*</span></Form.Label>
                                                <Form.Control type='text' />
                                            </Form.Group>



                                        </Col>
                                    )
                                }
                                {/* <Col md={1} className="mt-4">
                                    <Tooltip
                                        arrow
                                        placement="right"
                                        title="add activity"
                                    >
                                        <IconButton
                                            className="edit-btn"
                                            onClick={addDescriptionList}
                                        >
                                            <FaCirclePlus
                                                color="green"
                                                fontSize={25}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Col> */}
                                {/* {addDesclist.length == 0 ? (
                                    ""
                                ) : (
                                    <div >

                                        <Row className='m-0 p-0'>
                                            <Col md={10} className='m-0 p-0'>
                                                <Form.Group>
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control type='text' />
                                                </Form.Group>

                                            </Col>
                                        </Row>
                                    </div>
                                )} */}
                            </Row>
                        </Col>




                    </Row>





                    {/* <Col md={6}>
                        <Row className='mt-2'>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Type of activity<span className="req-t">*</span> </Form.Label>
                                    <Form.Select

                                    >
                                        <option value="">Select</option>


                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={1} className="mt-4">
                                <Tooltip
                                    arrow
                                    placement="right"
                                    title="add activity"
                                >
                                    <IconButton
                                        className="edit-btn"
                                        onClick={handleAddDefect}
                                    >
                                        <FaCirclePlus
                                            color="green"
                                            fontSize={25}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col> */}



                </Row>

                <Row className='mt-1'>
                    <Col md={5} className='m-0 p-0'>
                        <p className="m-0 mt-2 p-0 pg-label pl-2">Photo upload </p>

                        <Table responsive bordered className="m-0 mt-1 ">
                            <thead>
                                <tr
                                    style={{
                                        fontSize: "12px",
                                    }}
                                >
                                    <th className='m-0 pl-1 py-1 align-content-center'>Document label</th>
                                    <th className='m-0 pl-1 py-1 align-content-center'>Upoad photo</th>
                                    {/* <th >Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className='p-0 m-0'>
                                <tr>
                                    <td style={{ fontSize: '12px ', whiteSpace: 'nowrap' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label>Product name plate <span className="req-t">*</span> </Form.Label>
                                    </td>
                                    <td className='m-0 p-0 align-content-center'>
                                        <Form.Group>
                                            <InputGroup >
                                                <Form.Control
                                                    type="file"
                                                    accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                    onChange={(e) => {
                                                        if (e.target.files.length > 0) {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                // Check if the file type is allowed
                                                                if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                    setAddFirData(prev => ({ ...prev, serialNumberSticker: file })
                                                                    );
                                                                    setFile(URL.createObjectURL(e.target.files[0]));
                                                                } else {
                                                                    alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                    e.target.value = null;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            addFirdata?.serialNumberSticker('')
                                                            setFile(null)
                                                        }

                                                    }}
                                                />
                                                {addFirdata?.serialNumberSticker != "" ?
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

                                        </Form.Group></td>
                                </tr>
                                <tr>


                                    <td style={{ fontSize: '12px ', whiteSpace: 'nowrap' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label> Product photo prior to reparing <span className="req-t" style={{
                                        whiteSpace: "nowrap"
                                    }}>*</span> </Form.Label>
                                    </td>
                                    <td className='m-0 p-0 align-content-center'>
                                        <Form.Group>
                                            <InputGroup >
                                                <Form.Control
                                                    type="file"
                                                    accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                    onChange={(e) => {
                                                        if (e.target.files.length > 0) {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                // Check if the file type is allowed
                                                                if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                    setAddFirData(prev => ({ ...prev, installtionCondition: file })
                                                                    );
                                                                    setFile(URL.createObjectURL(e.target.files[0]));
                                                                } else {
                                                                    alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                    e.target.value = null;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            setImageInstallationCondition('')
                                                        }

                                                    }}
                                                />
                                                {addFirdata?.installtionCondition != "" ?
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

                                        </Form.Group></td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px ' }} className='m-0 pl-1 py-1  align-content-center'> <Form.Label>Product photos after reparing/correction <span className="req-t" style={{
                                        whiteSpace: 'nowrap'
                                    }}>*</span> </Form.Label>
                                    </td>
                                    <td className='m-0 p-0 align-content-center'>
                                        <Form.Group>
                                            {/* <Form.Control type='file' onChange={handleFileChange}
                                                /> */}
                                            <InputGroup>
                                                <Form.Control
                                                    type="file"
                                                    accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                    onChange={(e) => {
                                                        if (e.target.files.length > 0) {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                // Check if the file type is allowed
                                                                if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                    setAddFirData(prev => ({ ...prev, electricalCondition: file })
                                                                    );
                                                                    setFile(URL.createObjectURL(e.target.files[0]));
                                                                } else {
                                                                    alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                    e.target.value = null;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            setImage('')
                                                        }

                                                    }}
                                                />
                                                {addFirdata?.electricalCondition != "" ?
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


                                        </Form.Group>
                                        {/* {image && (
                                                <img
                                                    src={image}
                                                    alt="Image preview"
                                                    style={{
                                                        display: 'block',
                                                        maxWidth: '200%',
                                                        maxHeight: '300px',
                                                        marginTop: '10px',
                                                    }}
                                                />
                                            )} */}
                                    </td>
                                </tr>


                                {fileInputs?.map((add, index) => {
                                    return (
                                        <>
                                            <tr
                                                style={{
                                                    fontSize: "12px"
                                                }}
                                                key={index}
                                            >
                                                <td style={{ fontSize: '12px ' }}
                                                    onChange={(e) => {
                                                        console.log('Current value:', e.target.value);
                                                        setUploadPhoto({ label: e.target.value });
                                                    }} className='m-0 py-0 pl-1 p-0  align-content-center'>

                                                    <Form.Control type='text' className='m-0   p-0  align-content-center' style={{
                                                        border: 'none',
                                                        color: '#005bab',
                                                        fontSize: '11px',
                                                        fontWeight: '700'


                                                    }} />

                                                </td>
                                                <td className='m-0 p-0  align-content-center'>
                                                    <Form.Group>
                                                        <InputGroup className='p-0 m-0'>
                                                            <Form.Control
                                                                type="file"
                                                                accept=".jpg, .jpeg, .doc, .docx" // Specify accepted file types
                                                                onChange={(e) => {
                                                                    if (e.target.files.length > 0) {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            // Check if the file type is allowed
                                                                            if (/\.(doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                                                                                // setNewImage(file);
                                                                                setUploadPhoto(prev => ({ ...prev, file: file })
                                                                                );

                                                                                setFile(URL.createObjectURL(e.target.files[0]));
                                                                            } else {
                                                                                alert("Please select a valid file type (JPG, JPEG, DOC, DOCX).");
                                                                                e.target.value = null;
                                                                            }
                                                                        }
                                                                    }
                                                                    else {
                                                                        setNewImage('')
                                                                    }

                                                                }}
                                                            />
                                                            {uploadPhoto?.file != "" ?
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
                                                            <InputGroup.Text className='p-0 m-0'>
                                                                <Tooltip
                                                                    arrow
                                                                    placement="right"
                                                                    title="remove"
                                                                >
                                                                    <IconButton
                                                                        className="edit-btn"
                                                                        onClick={() =>
                                                                            handleRemovefile(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaCircleMinus
                                                                            color="red"
                                                                            fontSize={20}
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </InputGroup.Text>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </td>


                                            </tr >


                                        </>
                                    );
                                })}

                            </tbody>
                        </Table>
                    </Col>
                    <Col md={1} className='m-0 p-0 d-flex  ' style={{
                        flexDirection: 'column-reverse'
                    }}> <Tooltip
                        arrow
                        placement="right"
                        title="Upload other documents"
                    >
                            <IconButton
                                className="edit-btn"
                                onClick={addFileInput}
                            >
                                <FaCirclePlus
                                    color="green"
                                    fontSize={25}
                                />
                            </IconButton>
                        </Tooltip></Col>





                </Row>
                <Row className='mt-1 '>
                    <p className='pg-label p-0 m-0 pl-2'>Closure</p>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Closure Status <span className="req-t">*</span></Form.Label>
                            <Form.Select
                                name="clousurStatus"
                                value={addFirdata?.clousurStatus}
                                onChange={handleChange}
                            >
                                <option value=''>Select</option>
                                <option value='Replacement from dealer'>Replacement from dealer</option>


                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {
                        addFirdata?.clousurStatus === "Replacement from dealer" && (
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label style={{
                                        whiteSpace:'nowrap'
                                    }}>Replacement tag applied <span className="req-t">*</span></Form.Label>
                                    <Form.Control type='text' />

                                </Form.Group>
                            </Col>
                        )
                    }
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Details of work done <span className="req-t">*</span></Form.Label>
                            <Form.Control type='text' name="detailsWorkDone"
                                value={addFirdata?.detailsWorkDone}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Type of work done <span className="req-t">*</span></Form.Label>
                            <MultiSelect
                                options={options}
                                value={addFirdata?.typeOfworkDone}
                                onChange={function noRefCheck(e) {
                                    setAddFirData(prev => ({ ...prev, typeOfworkDone: e }));
                                }}

                                valueRenderer={customValueRenderer}
                                labelledBy={"Select"}
                            />
                        </Form.Group>
                    </Col>
                    {addFirdata?.typeOfworkDone.some(item => item.value === "Spare consumption") && (
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Spare  <span className="req-t">*</span> </Form.Label>
                                <Form.Select>
                                    <option value=''>Select</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                    )
                    }

                    {/* {addFirdata?.typeOfworkDone.some(item => item.value === "Bearing replacement at Site / ASC") ? (
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Bearing make & serial Number</Form.Label>
                                <Form.Control type='text' />

                            </Form.Group>
                        </Col>) : ''

                    } */}
                    {addFirdata?.typeOfworkDone.some(item => item.value === "Repair at ASC") && (
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Repair at ASC </Form.Label>
                                <Form.Select>
                                    <option value=''>Select</option>
                                    <option value='First level repair at workshop '>First level repair at workshop </option>
                                    <option value='Second level repair at workshop '>Second level repair at workshop </option>


                                </Form.Select>

                            </Form.Group>
                        </Col>
                    )
                    }
                </Row>
                <Row className=' mt-3  text-center justify-content-center align-items-center'>
                    <Col md={3}>
                        <Button variant='' className='add-Btn' onClick={handleFIRSubmit}  >Submit</Button>
                    </Col>
                </Row>







            </Row >



        </>
    )
}

export default FirScreen