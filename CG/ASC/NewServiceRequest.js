import { Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react'
import { Button, Row, Col, Card, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCallOutline, IoMail } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import { usePathName } from '../../../constants';

const NewServiceRequest = () => {
    const navigate = useNavigate()
    const pathName = usePathName()
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [showAcknowledgemnet, setShowAcknowledgemnet] = useState(false)
    const [requestforYes, setrequestforYes] = useState(false)
    const [requestforNo, setrequestforNo] = useState(false)
    const [showViewEditButton, setShowViewEditButton] = useState(false); // State to control visibility of View/Edit button

    const handleShowAcknowledgemnet = () => {
        setShowAcknowledgemnet(true)
    }
    const handleCloseAcknowledgemnet = () => {
        setShowAcknowledgemnet(false)



        // Set showViewEditButton to true after saving


    }
    const [data, setdata] = useState([
        {
            productSerial: 'WC123456',
            serialRequest: '208978979',
            requestDate: '11/07/2024',
            location: 'Yashodha Nagar, Chennai',
            companyName: 'Rajesh',
            productLine: 'LT',
            status: 'OOW',
            natureOfComplaint: 'prventive',
            ageOfpendency: '1',
            distnace: '2',
            issueType: 'open',
            assignTech: 'No',
            isAcknowledgment: ''



        },
    ])

    const columns =
        useMemo(

            () => [



                // {
                //     accessorKey: "productSerial",
                //     header: "Product Sr No",
                // },
                {
                    accessorKey: "serialRequest",
                    header: "Service Request No",
                },
                {
                    accessorKey: "requestDate",
                    header: "Request Date",
                    Cell: ({ cell }) => {
                        let value = cell.getValue()
                        return (
                            <>
                                <p>{value?.split(" ")[0]}</p>
                            </>
                        )
                    }

                },
                {
                    accessorKey: "companyName",
                    header: "Customer/firm name",

                },
                {
                    accessorKey: "location",
                    header: "Location",

                },
                {
                    accessorKey: "productLine",
                    header: "Product Line",
                    size: '4'

                },
                {
                    accessorKey: "status",
                    header: "Warranty",
                    size: '4',
                    Cell: ({ cell }) => {
                        let value = cell.getValue();
                        return (
                            <p
                                className={`text-center m-0 ${value == "OOW"
                                    ? "OOWStatus"
                                    : value == "W"
                                        ? "WStatus"
                                        : ""
                                    }`}
                            >
                                {value}
                            </p>
                        );
                    },
                },
                {
                    accessorKey: "natureOfComplaint",
                    header: "Nature Of Complaint",

                },
                {
                    accessorKey: "ageOfpendency",
                    header: "Age of Pendency",


                },
                {
                    accessorKey: "distnace",
                    header: "Distance (in Km)",

                },
                {
                    accessorKey: "issueType",
                    header: "Issue Status",

                },
                {
                    accessorKey: "isAcknowledgment",
                    header: "Acknowledgement",
                    Cell: ({ cell }) => {
                        let data = cell.getValue()
                        // console.log(cell.row.original);
                        return (
                            <>
                                <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

                                    {

                                        <>

                                            {
                                                cell.row.original.isAcknowledgment == '1' ? (


                                                    <Button variant='' className='add-Btn'
                                                        onClick={() => {
                                                            navigate(`${pathName}/new-assign-request`);
                                                        }}
                                                    >view/edit</Button>
                                                ) : ("")
                                            }



                                            {cell.row.original?.isAcknowledgment == "" ? <Button variant='' className='add-Btn' onClick={() => {
                                                handleShowAcknowledgemnet()

                                            }}>Acknowledge</Button> : cell.row.original?.isAcknowledgment == "1" ? <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button> : ""}
                                        </>

                                    }







                          </Box >
                           </>
                         )
                    }

                 },









             ]
       );
   

    const ServiceRequest = {
        ressign: "Ressigned to CG",
        Close: "Close with phone assistance",
        Not_in_my_territory: "Not in my territory",
        Cancel_sr: "Cancel service request",
    };
    const ServiceCancel = {
        NOT_CG: "Not a CG product",
        Problem: "Problem not related to CG Product",
        OOW: "Out Of Warranty-Customer not ready to pay",

    }
    const [selectedServiceRequest, setSelectedServiceRequest] = useState('select');
    const [selectedCancelRequest, setSelectedCancelRequest] = useState('');


    const handleServiceRequestChange = (event) => {
        const selectedValue = event.target.value;
        // setdata((pre) => {
        //     return [
        //         ...pre,
        //         issueType = selectedValue<Sp
        //     ]
        // })
        setSelectedServiceRequest(selectedValue);
        console.log(selectedValue, '-------------')
    };
    const handleServiceCancelChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCancelRequest(selectedValue);
        console.log(selectedValue, '-------------')
    };



    return (

        <>
            <Row>
                <span> <IoIosArrowRoundBack className='m-0' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} />
                    Back</span> <p className='pg-label m-0 p-1'>Open Request</p>
            </Row >
            <MaterialReactTable
                columns={columns}
                data={data}

                initialState={{ showColumnFilters: false }} //show filters by default
                muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                }}



                // enableEditing
                // onEditingRowSave={handleSaveRowEdits}
                // onEditingRowCancel={handleCancelRowEdits}
                //     renderRowActions={({ cell, row, table }) => (

                //       <Box sx={{ display: "flex", gap: "1rem" }}>
                //         {/* <Tooltip arrow placement="left" title="View">
                //   <IconButton 
                //   className="edit-btn"
                //   // onClick={() => table.setEditingRow(row)}
                //   disabled
                //   >
                //     <FaEye color='green'/>
                //   </IconButton>
                // </Tooltip> */}
                //         {
                //           cell.row.original.isActive == false ? "" :
                //             <Tooltip arrow placement="left" title="Edit">
                //               <IconButton
                //                 className="edit-btn"
                //                 onClick={() => {
                //                   console.log(cell.row.original.divisionID);
                //                   setdivisionID(cell.row.original.divisionId)
                //                   handleModalShow()
                //                 }}

                //               // disabled
                //               >

                //                 <FaRegEdit color='#005bab' />
                //               </IconButton>
                //             </Tooltip>
                //         }
                //         {
                //           cell.row.original.isActive == false ? "" :
                //             <Tooltip arrow placement="right" title="Delete">
                //               <IconButton
                //                 color="error"
                //                 onClick={() => {
                //                   setdivisionID(cell.row.original.divisionId)
                //                   console.log(cell.row.original.divisionId)
                //                   handleShowDel()
                //                 }}


                //               // disabled
                //               >
                //                 {/* {divisionData.map(division => (
                //               <div key={division.id}>
                //                 <p>{division.name}</p>
                //                 <button onClick={() => handleDelete(division.id)}>Delete</button>
                //               </div>
                //             ))} */}
                //                 <HiOutlineTrash color='red' />
                //               </IconButton>
                //             </Tooltip>
                //         }
                //       </Box>
                //     )}
                enableTopToolbar={false}

                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                state={
                    {
                        columnFilters,
                        globalFilter,
                        isLoading,
                        pagination: pagination,
                        showAlertBanner: isError,
                        showProgressBars: isRefetching,
                        sorting,
                    }
                }

                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            padding: '10px',
                            flexWrap: 'wrap',
                        }}>


                        </div>
                    </>

                )}


                positionActionsColumn="first"



            />

            <GenericModal show={showAcknowledgemnet} handleClose={handleCloseAcknowledgemnet} size='xl' IsCentered='centered' className='mdl-title' title="Acknowledgement"
                body={
                    <>

                        <Row>
                            <Col lg={12} md={12} sm={12}>

                                <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                                    <div
                                        style={{ backgroundColor: "white", borderRadius: "8px" }}
                                        className="p-3"
                                    >
                                        <div className='d-flex justify-content-between align-items-center flex-wrap'>

                                            <div  >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Product model
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    LT
                                                </p>
                                            </div>
                                            <div  >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Product SN
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    123XXX
                                                </p>
                                            </div>
                                            <div >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Product type
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    LT Motor
                                                </p>
                                            </div>
                                            <div>
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Frame size
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    12
                                                </p>
                                            </div>
                                            <div >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Pole
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >

                                                    3
                                                </p>
                                            </div>
                                            <div  >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Voltage
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    6 Kw
                                                </p>
                                            </div>

                                            <div >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Date Created
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    12/06/2024
                                                </p>
                                            </div>
                                            <div >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Warranty Type
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    W
                                                </p>
                                            </div>
                                            {/* <div >
                                                <p className="m-0" style={{ fontSize: "11px" }}>
                                                    Service type
                                                </p>
                                                <p
                                                    className="mt-1"
                                                    style={{ fontWeight: "500", fontSize: "11px" }}
                                                >
                                                    -
                                                </p>
                                            </div> */}
                                        </div>
                                        {/* <Row>

                                                        <Col >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Product type
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                LT Product
                                                            </p>
                                                        </Col>
                                                        <Col>
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Frame size
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                80
                                                            </p>
                                                        </Col>
                                                        <Col  style={{
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Pole
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >

                                                                2P
                                                            </p>
                                                        </Col>
                                                    </Row> */}
                                        {/* <div>

                                                        <div  >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Voltage
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                5 Kw
                                                            </p>
                                                        </div>

                                                        <div >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Date Created
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                24/04/2024
                                                            </p>
                                                        </div>
                                                        <div >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Warranty Type
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                W
                                                            </p>
                                                        </div>
                                                        <div >
                                                            <p className="m-0" style={{ fontSize: "11px" }}>
                                                                Service type
                                                            </p>
                                                            <p
                                                                className="mt-1"
                                                                style={{ fontWeight: "500", fontSize: "11px" }}
                                                            >
                                                                Breakdown
                                                            </p>
                                                        </div>
                                                    </div> */}

                                        <div style={{
                                            width: 'max-content',
                                            margin: 'auto',
                                            boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",
                                            borderRadius: '10px'
                                        }} className='d-flex align-items-center justify-content-center p-3'>
                                            <div>

                                                <div className='d-flex align-items-center '  >

                                                    <div md={2}>
                                                        <FaUserCircle fontSize={50} />

                                                    </div>
                                                    <div className='ml-2'>
                                                        <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                        <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Rajesh</p>
                                                    </div>

                                                </div>
                                                <div className='mt-3'>
                                                    <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> Shiwaji NagarPune </p>
                                                </div>
                                                <div className='mt-3'>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>rajesh@gmail.com</span> </p>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                        fontSize={18} /> <span className='ml-2'>9878988789</span> </p>


                                                </div>

                                            </div>

                                        </div>



                                    </div>
                                </Card>

                            </Col>


                            <Col lg={12} md={12} sm={12}>


                                {/* <Row className='justify-content-center text-center'>
                                    <p className='m-0'>Please Select Acknowledge</p>

                                    <Col lg={12} md={6} sm={12}>
                                        <Form.Check
                                            type='radio'
                                            label="Yes"
                                            name="radioGroup"
                                            value="Yes"
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '5px 15px 0px 0px',
                                                display: 'inline-block'
                                            }}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setrequestforYes(true)
                                                    setrequestforNo(false)

                                                }

                                            }} />
                                        <Form.Check
                                            type='radio'
                                            label="No"
                                            name="radioGroup"
                                            value='No'
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setrequestforNo(true)
                                                    setrequestforYes(false)

                                                }

                                            }}
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                margin: '5px 15px 0px 0px',
                                                display: 'inline-block'

                                            }} />
                                    </Col>

                                </Row> */}
                                {
                                    (requestforNo) && (
                                        <Row className=' m-0 p-0 align-items-center justify-content-center'>

                                            <Col md={6}>
                                                <Form.Group className="">
                                                    <Form.Label>
                                                        Remarks
                                                    </Form.Label>
                                                    <Form.Control as="textarea"
                                                        rows={2} name="Remarks"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )
                                }


                            </Col>


                        </Row>
                        <Row className='justify-content-center align-items-center'>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Service request rejection</Form.Label>
                                    <Form.Select onChange={handleServiceRequestChange}>
                                        <option value=''>Select</option>
                                        {Object.keys(ServiceRequest).map(key => (
                                            <option key={key} value={key}>{ServiceRequest[key]}</option>
                                        ))}

                                    </Form.Select>

                                </Form.Group>
                            </Col>
                            {selectedServiceRequest === 'Cancel_sr' && (

                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Cancellation reason</Form.Label>
                                        <Form.Select onChange={handleServiceCancelChange}>
                                            <option value=''>Select</option>

                                            {Object.keys(ServiceCancel).map(key => (
                                                <option key={key} value={key}>{ServiceCancel[key]}</option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>

                    </>
                }
                footer={<>
                    <Button variant="" className='cncl-Btn' onClick={handleCloseAcknowledgemnet}>
                        Close
                    </Button>
                    <Button variant="" className='add-Btn'
                        onClick={(e) => {
                            if (selectedServiceRequest === 'select') {
                                setdata((pre) => {
                                    return [
                                        ...pre,
                                        data[0].isAcknowledgment = "1"
                                    ]
                                })
                                handleCloseAcknowledgemnet()
                            }
                            if (selectedServiceRequest === 'Close') {

                                alert("Your ticket has been closed")

                                handleCloseAcknowledgemnet()



                            }
                            if (selectedCancelRequest) {
                                alert("Your service request has been cancel")
                                handleCloseAcknowledgemnet()



                            }




                            e.preventDefault()


                        }}

                    >
                        Save
                    </Button>
                </>} />
        </>

    )
}

export default NewServiceRequest