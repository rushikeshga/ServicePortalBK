import React, { useMemo, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import NavBar from '../Navbar'
import { MaterialReactTable } from 'material-react-table'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { usePathName } from '../../../constants'
import Footer from '../footer'
import Swal from 'sweetalert2'
import { Result } from 'antd'
import moment from "moment";


const TrackServiceRequest = () => {
    const navigate = useNavigate();
    const pathName = usePathName();
    const [requestNumberinfo, setRequestNumberInfo] = useState('')
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
    const [confirmDetails, setconfirmDetails] = useState(false)
    const trackServiceInfo = [
        {
            serialNumber: 'UDGM25350',
            requestNumber: '20282219',
            customerName: 'Rajesh Kumar',
            customerNumber: '9878987898',
            ascName: 'Patil Works',
            ascNumber: '897898789',
            asmName: 'Vaibhav Nemade',
            asmNumber: '7687678789',
            ticStatus: 'Close',
            requestDate: '29-07-2024',
            issueType: 'BreakDown',
            location: "Kamaraj Nagar Chennai",
            warranty: 'W',
            status: 'assigned',
            productType: 'LT'
        }
    ]
    const [addInfo, setAddInfo] = useState({
        customerName: '',
        customerNumber: '',
        ascName: '',
        ascNumber: '',
        asmName: '',
        asmNumber: '',
        ticStatus: '',
        serialNumber: '',
        requestDate: '',
        issueType: '',
        location: "",
        warranty: '',
        status: '',
        productType: ''
    });


    const addConfirmDetails = () => { 
        if(requestNumberinfo.trim() == "") {
            Swal.fire({
                icon: "error",
                title: "Please Enter Product serial no/Service request no",
              })
              return;
        }
        const getProdDetailUrl = `${process.env.REACT_APP_API_URL}TrackServiceTicket/GetTrackServiceTicketDetails?SerialOrServiceTicketNo=${requestNumberinfo}`;
 
        fetch(getProdDetailUrl
        )
        .then(res => res.json())
        .then(result=>{
            if(result?.IsSuccess == false){
                Swal.fire({
                    icon: "error",
                    title: result?.Message
                })
            }
            else if(result?.status == 404){
                Swal.fire({
                    icon: "error",
                    title: "There are no Service request open against this product"
                })
            }
            else{
                setAddInfo({
                customerName: result?.customerName,
                customerNumber: result?.customerMobile,
                ascName: result?.ascName,
                ascNumber: result?.ascMobileNo,
                asmName: result?.asmName,
                asmNumber: result?.asmMobileNo,
                ticStatus: result?.ticketStatus,
                serialNumber: result?.serialNo,
                requestNumber: result?.serviceTicketNumber,
                requestDate: moment(result?.requestDate?.split(" ")[0]).format("YYYY-MM-DD"),
                issueType: result?.issueType,
                location: result?.customerAddress,
                warranty: result?.warrantyStatus,
                status: result?.ticketStatus,
                productType: result?.productType

                //customerAddress cityName  productLineName frame voltage pole
                // dateCreated ascAddress ascEmailId ascCityName
                });
                localStorage.setItem("TrackTicketDetails", JSON.stringify(result))
                setconfirmDetails(true)
            }
            
        
            
        
        })
        

    }

    const columns =
        useMemo(
            () => [

                {
                    accessorKey: "customerName",
                    header: "Track details",


                    Cell: ({ cell }) => {
                        let cellData = cell.row.original;
                        // console.log(cell)

                        return (
                            <>
                                <div className="listCard p-1">
                                    <p className='ticketInfoLabel m-0'>Serail No <span className='ticketInfoData'>{addInfo?.serialNumber}</span></p>

                                    <p className='ticketInfoLabel m-0'>Service request No: <span className='ticketInfoData'>{addInfo?.requestNumber}</span></p>

                                    {/* <p className='ticketInfoLabel m-0'>Ticket Status: <span className='ticketInfoData'>{addInfo?.ticStatus ? addInfo?.ticStatus : "-"}</span></p> */}
                                    <p className='ticketInfoLabel m-0'>Request date: <span className='ticketInfoData'>{addInfo?.requestDate ? addInfo?.requestDate : "-"}</span></p>
                                    <p className='ticketInfoLabel m-0'>Issue type: <span className='ticketInfoData'>{addInfo?.issueType ? addInfo?.issueType : "-"}</span></p>
                                    <p className='ticketInfoLabel m-0'>Location: <span className='ticketInfoData'>{addInfo.location ? addInfo?.location : "-"}</span></p>
                                    <p className='ticketInfoLabel m-0'>Product type: <span className='ticketInfoData'>{addInfo.productType ? addInfo?.productType : "-"}</span></p>
                                    <p className='ticketInfoLabel m-0'>Warranty: <span className={addInfo.warranty == "Out Of Warranty"
                                                                                            ?'ticketInfoData OOWStatus':'ticketInfoData WStatus'}>{addInfo.warranty ? addInfo?.warranty : "-"}</span></p>
                                    <p className='ticketInfoLabel m-0'>Status: <span className='ticketInfoData'>{addInfo.status ? addInfo?.status : "-"}</span></p>

                                    <p className='ticketInfoLabel m-0'><Button style={{
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }} className='m-0 py-1 add-Btn' variant=''>Get a happy code</Button></p>

                                    <p className='ticketInfoLabel m-0'><Button style={{
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }} className='m-0 py-1 add-Btn' variant=''   onClick={() => {
                                        navigate(`${pathName}/service-feedback`);
                                    }}>Service feedback</Button></p>







                                </div>


                            </>
                        )
                    }
                },










            ]
        );
    const fixedColumnWidths = {
        customerName: '100%',

    };

    return (
        <>
            <NavBar />

            <Card className="border-0 p-2 mt-0 mx-3"
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                <Row className='text-end align-items-center ' style={{
                    
                }}>
                    <Col md={9}>
                        <p style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }} className="text-start  m-0 p-2">
                            {
                                confirmDetails && (

                                    <IoIosArrowRoundBack
                                        className=""
                                        style={{ cursor: "pointer" }}
                                        fontSize={35}
                                        color="#005bab"
                                        onClick={() => {


                                            setconfirmDetails(false)

                                        }}
                                    // onClick={() => setactiveTab((prev) => prev - 1)}

                                    />
                                )
                            }
                            Track service requests status
                        </p>
                    </Col>
                    {
                        addInfo?.ticStatus === 'Close' && confirmDetails && (
                            <Col md={3} >
                                <div className='text-center'>
                                <p className='m-0 p-0'><FaHandHoldingUsd fontSize={18} /></p>
                                    <p style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }} className='m-0 p-0  '>
                                     

                                        Place a new service request</p>
                                </div>

                            </Col>
                        ) 
                    }



                </Row>
                {
                    !confirmDetails && (

                        <Row className=' text-left justify-content-center align-items-center'>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label> Product serial no/Service request no<span className="req-t">*</span> </Form.Label>
                                    <Form.Control type='text' value={requestNumberinfo} onChange={(e) => {
                                        setRequestNumberInfo(e.target.value)
                                    }} />
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Button variant='' style={{
                                    marginTop: '30px'
                                }} className="add-Btn" onClick={addConfirmDetails}>Confirm</Button>
                            </Col>


                        </Row>
                    )
                }
                {
                    confirmDetails && (

                        <><Row className=' justify-content-center align-items-center'>
                            <Col md={3}
                                className=""
                            >
                                <Card className='p-2' style={{
    boxShadow: "0px 0px 3px 3px #d4d4d4"

                                }}>

                                <h2 className='m-0 p-0' style={{
                                    fontSize: '16px',
                                    textAlign: 'center'
                                }}>Customers Details</h2>
                                <Col style={{
                                    gap: '20px',
                                    justifyContent: 'center'
                                }} className="d-flex  p-0">
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            Company Name
                                        </Form.Label>
                                        <p
                                            style={{
                                                fontSize: '12px'
                                            }}
                                        >{addInfo?.customerName}</p>

                                    </Form.Group>
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            Contact No
                                        </Form.Label>
                                        <p style={{
                                            fontSize: '12px'
                                        }}>{addInfo?.customerNumber}</p>

                                    </Form.Group>
                                </Col>
                                </Card>
                           
                            </Col>
                            <Col md={3}
                                className=""
                            >
                                <Card className='p-2' style={{
    boxShadow: "0px 0px 3px 3px #d4d4d4"

                                }}>
                                <h2 className='m-0 p-0' style={{
                                    fontSize: '16px',
                                    textAlign: 'center'
                                }}>ASC Details</h2>
                                <Col style={{
                                    gap: '20px',
                                    justifyContent: 'center'
                                }} className="d-flex  p-0">
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            ASC Name
                                        </Form.Label>
                                        <p
                                            style={{
                                                fontSize: '12px'
                                            }}
                                        >{addInfo?.ascName}</p>

                                    </Form.Group>
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            ASC contact No
                                        </Form.Label>
                                        <p style={{
                                            fontSize: '12px'
                                        }}>{addInfo?.ascNumber}</p>

                                    </Form.Group>
                                </Col>
                                </Card>
                            </Col>
                            <Col md={3}
                                className=""
                            >
                                <Card className='p-2' style={{
    boxShadow: "0px 0px 3px 3px #d4d4d4"

                                }}>
                                
                                <h2 className='m-0 p-0' style={{
                                    fontSize: '16px',
                                    textAlign: 'center'
                                }}>ASM Details</h2>
                                <Col style={{
                                    gap: '20px',
                                    justifyContent: 'center'
                                }} className="d-flex  p-0">
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            ASM Name
                                        </Form.Label>
                                        <p
                                            style={{
                                                fontSize: '12px'
                                            }}
                                        >{addInfo?.asmName}</p>

                                    </Form.Group>
                                    <Form.Group
                                    >
                                        <Form.Label className='m-0'>
                                            ASM contact No
                                        </Form.Label>
                                        <p style={{
                                            fontSize: '12px'
                                        }}>{addInfo?.asmNumber}</p>

                                    </Form.Group>
                                </Col>
                                </Card>
                            </Col>




                        </Row><Row>
                                <MaterialReactTable
                                    columns={columns}
                                    data={trackServiceInfo}

                                    initialState={{ showColumnFilters: false }} //show filters by default













                                    // muiTableBodyCellProps={({ cell }) => ({
                                    //     style: {
                                    //         borderBottom: "1px solid black",
                                    //         width: fixedColumnWidths[cell.column.id],
                                    //         minWidth: fixedColumnWidths[cell.column.id],
                                    //         maxWidth: fixedColumnWidths[cell.column.id],
                                    //     },
                                    // })}
                                    manualPagination={true}
                                    muiToolbarAlertBannerProps={isError
                                        ? {
                                            color: 'error',
                                            children: 'Error loading data',
                                        }
                                        : undefined}
                                    onColumnFiltersChange={setColumnFilters}
                                    onGlobalFilterChange={setGlobalFilter}
                                    onSortingChange={setSorting}
                                    // rowCount={rowCount}
                                    state={{
                                        columnFilters,
                                        globalFilter,
                                        isLoading,
                                        showAlertBanner: isError,
                                        showProgressBars: isRefetching,
                                        sorting,
                                    }}




                                    enableTopToolbar={false}
                                    enablePagination={false}
                                    enableBottomToolbar={false}
                                    positionActionsColumn="first" />

                            </Row></>
                    )
                }



            </Card>

            <Footer/>


        </>
    )
}

export default TrackServiceRequest