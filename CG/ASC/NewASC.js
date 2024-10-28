// import { Box, Tooltip } from '@mui/material';
// import { MaterialReactTable } from 'material-react-table';
// import React, { useMemo, useState } from 'react'
// import { Button, Row, Col, Card, Form } from 'react-bootstrap';
// import { FaUserCircle } from 'react-icons/fa';
// import { IoIosArrowRoundBack } from 'react-icons/io';
// import { IoCallOutline, IoMail } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import GenericModal from '../GenericModal';
// import { usePathName } from '../../../constants';
// import { TbEyeEdit } from "react-icons/tb";



// const NewASC = () => {
//     const navigate = useNavigate()
//     const pathName = usePathName()
//     const [isError, setIsError] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isRefetching, setIsRefetching] = useState(false);
//     const [rowCount, setRowCount] = useState(0);
//     const [columnFilters, setColumnFilters] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState('');
//     const [sorting, setSorting] = useState([]);
//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 10,
//     });




//     const [showAcknowledgemnet, setShowAcknowledgemnet] = useState(false)
//     const [requestforYes, setrequestforYes] = useState(false)
//     const [requestforNo, setrequestforNo] = useState(false)
//     const [showViewEditButton, setShowViewEditButton] = useState(false); // State to control visibility of View/Edit button

//     const handleShowAcknowledgemnet = () => {
//         setShowAcknowledgemnet(true)
//     }
//     const handleCloseAcknowledgemnet = () => {
//         setShowAcknowledgemnet(false)



//         // Set showViewEditButton to true after saving


//     }
//     const [showList, setShowList] = useState(false)

//     const showUpdatedList = () => {
//         setShowList(true)
//     }
//     const handleCloseUpdatedList = () => {
//         setShowList(false)


//     }
//     const [data, setdata] = useState([
//         {
//             productSerial: 'UDGM25354',
//             serialRequest: '208978979',
//             requestDate: '11/07/2024',
//             location: 'Mumbai, Mahashtra',
//             companyName: 'Reliance Industry',
//             divisionName: 'LT Motors',
//             productLine: 'M1 MOTORS NAGAR-UNIT 1',
//             status: 'In Warranty',
//             natureOfComplaint: 'Breakdown',
//             ageOfpendency: '1',
//             distnace: '2',
//             issueType: 'open',
//             assignTech: 'No',
//             ascName: 'Patil Electric Works',
//             branch: 'Mumbai',
//             isAcknowledgment: ''

//         },
//         // {
//         //     productSerial: 'WC123456',
//         //     serialRequest: '208978979',
//         //     requestDate: '11/07/2024',
//         //     location: 'Yashodha Nagar, Chennai',
//         //     companyName: 'Rajesh',
//         //     divisionName: 'LT Motors',
//         //     productLine: 'M1 MOTORS NAGAR-UNIT 1',
//         //     status: 'Out Of Warranty',
//         //     natureOfComplaint: 'prventive',
//         //     ageOfpendency: '54',
//         //     distnace: '2',
//         //     issueType: 'open',
//         //     assignTech: 'No',
//         //     branch: 'Mumbai',
//         //     isAcknowledgment: ''

//         // },
//     ])
//     console.log(data, '-----------------')

//     // const columns =
//     //     useMemo(

//     //         () => [



//     //             // {
//     //             //     accessorKey: "productSerial",
//     //             //     header: "Product Sr No",
//     //             // },
//     //             {
//     //                 accessorKey: "serialRequest",
//     //                 header: "Service Request No",
//     //             },
//     //             {
//     //                 accessorKey: "requestDate",
//     //                 header: "Request Date",
//     //                 Cell: ({ cell }) => {
//     //                     let value = cell.getValue()
//     //                     return (
//     //                         <>
//     //                             <p>{value?.split(" ")[0]}</p>
//     //                         </>
//     //                     )
//     //                 }

//     //             },
//     //             {
//     //                 accessorKey: "companyName",
//     //                 header: "Customer/firm name",

//     //             },
//     //             {
//     //                 accessorKey: "location",
//     //                 header: "Location",

//     //             },
//     //             {
//     //                 accessorKey: "productLine",
//     //                 header: "Product Line",
//     //                 size: '4'

//     //             },
//     //             {
//     //                 accessorKey: "status",
//     //                 header: "Warranty",
//     //                 size: '4',
//     //                 Cell: ({ cell }) => {
//     //                     let value = cell.getValue();
//     //                     return (
//     //                         <p
//     //                             className={`text-center m-0 ${value == "OOW"
//     //                                 ? "OOWStatus"
//     //                                 : value == "W"
//     //                                     ? "WStatus"
//     //                                     : ""
//     //                                 }`}
//     //                         >
//     //                             {value}
//     //                         </p>
//     //                     );
//     //                 },
//     //             },
//     //             {
//     //                 accessorKey: "natureOfComplaint",
//     //                 header: "Nature Of Complaint",

//     //             },
//     //             {
//     //                 accessorKey: "ageOfpendency",
//     //                 header: "Age of Pendency",


//     //             },
//     //             {
//     //                 accessorKey: "distnace",
//     //                 header: "Distance (in Km)",

//     //             },
//     //             {
//     //                 accessorKey: "issueType",
//     //                 header: "Issue Status",

//     //             },
//     //             {
//     //                 accessorKey: "isAcknowledgment",
//     //                 header: "Acknowledgement",
//     //                 Cell: ({ cell }) => {
//     //                     let data = cell.getValue()
//     //                     // console.log(cell.row.original);
//     //                     return (
//     //                         <>
//     //                             <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

//     //                                 {

//     //                                     <>

//     //                                         {
//     //                                             cell.row.original.isAcknowledgment == '1' ? (


//     //                                                 <Button variant='' className='add-Btn'
//     //                                                     onClick={() => {
//     //                                                         navigate(`${pathName}/new-assign-request`);
//     //                                                     }}
//     //                                                 >view/edit</Button>
//     //                                             ) : ("")
//     //                                         }



//     //                                         {cell.row.original?.isAcknowledgment == "" ? <Button variant='' className='add-Btn' onClick={() => {
//     //                                             handleShowAcknowledgemnet()

//     //                                         }}>Acknowledge</Button> : cell.row.original?.isAcknowledgment == "1" ? <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button> : ""}
//     //                                     </>

//     //                                 }







//     //                       </Box >
//     //                        </>
//     //                      )
//     //                 }

//     //              },









//     //          ]
//     //    );


//     const columns =
//         useMemo(

//             () => [
//                 {
//                     accessorKey: "productSerial",
//                     header: "Request Details",
//                     size: "50",

//                     Cell: ({ cell }) => {
//                         let cellData = cell?.row?.original;
//                         console.log(cellData, 'cellDta-------------');
//                         return (
//                             <>
//                                 <Row>
//                                     <Col lg={3} md={4} sm={6}>
//                                         <p className='ticketInfoLabel'>Service request type: <span className='ticketInfoData'>In warranty</span></p>
//                                         <p className='ticketInfoLabel'>Division: <span className='ticketInfoData'>{cell.row.original?.divisionName ? cell.row.original?.divisionName : "-"}</span></p>
//                                         <p className='ticketInfoLabel'>Company Name: <span className='ticketInfoData'>{cell.row.original?.companyName ? cell.row.original?.companyName : "-"}</span></p>



//                                         <p className='ticketInfoLabel'>Technician: <span className='ticketInfoData'>{cell.row.original?.technician ? cell.row.original?.technician + " hrs." : "-"}</span></p>
//                                         <p className='ticketInfoLabel' >Claim status:-</p>






//                                     </Col>
//                                     <Col lg={3} md={4} sm={6}>
//                                         <p className='ticketInfoLabel'>Service Request No: <span className='ticketInfoData'>{cell.row.original?.serialRequest}</span></p>
//                                         <p className='ticketInfoLabel'>Product Line: <span className='ticketInfoData'>{cell.row.original?.productLine}</span></p>
//                                         <p className='ticketInfoLabel'>Location: <span className='ticketInfoData'>{cell.row.original?.location}</span></p>




//                                         <p className='ticketInfoLabel'>ASC Name: <span className='ticketInfoData'>{cell.row.original?.ascName ? cell.row.original?.ascName : "-"}</span></p>
//                                         <p className='ticketInfoLabel'>Remarks: <span className='ticketInfoData'>{cell.row.original?.remarks ? cell.row.original?.remarks + " hrs." : "-"}</span></p>


//                                     </Col>
//                                     <Col lg={3} md={4} sm={6}>
//                                         <p className='ticketInfoLabel'>Request Date: <span className='ticketInfoData'>{cell.row.original?.requestDate?.split(" ")[0] ? cell.row.original?.requestDate?.split(" ")[0] : "-"}</span></p>
//                                         <p className='ticketInfoLabel'>Product Sr no: <span className='ticketInfoData'>{cell.row.original?.productSerial ? cell.row.original?.productSerial : "-"}</span></p>
//                                         <p className='ticketInfoLabel'>Age of Pendency: <span className='ticketInfoData'>{cell.row.original?.ageOfpendency ? cell.row.original?.ageOfpendency + " hrs." : "-"}</span></p>

//                                         <p className='ticketInfoLabel'>ASC Distance (in Km): <span className='ticketInfoData'>{cell.row.original?.distnace ? cell.row.original?.distnace : "-"}</span></p>


//                                         {/* <p className='ticketInfoLabel'>Issue Status: <span className='ticketInfoData'>{cell.row.original?.issueStatus ? cell.row.original?.issueStatus : "-"}</span></p> */}




//                                     </Col>
//                                     <Col lg={3} md={4} sm={6}>
//                                         <p className='ticketInfoLabel'>Nature Of Complaint: <span className='ticketInfoData'>{cell.row.original?.natureOfComplaint ? cell.row.original?.natureOfComplaint : "-"}</span></p>
//                                         <p className='ticketInfoLabel'>Warranty status: <span className={`m-0  ${cell.row.original?.status == "Out Of Warranty"
//                                             ? "OOWStatus"
//                                             : cell.row.original?.status == "In Warranty"
//                                                 ? "InWarranty"
//                                                 : ""
//                                             }`}>{cell.row.original?.status ? cell.row.original?.status : "-"}</span></p>


//                                         <p className='ticketInfoLabel'>Branch: <span className='ticketInfoData'>{cell.row.original?.branch ? cell.row.original?.branch : "-"}</span></p>

//                                         <p className='ticketInfoLabel' >Complain status:<u><Button variant='' style={{ color: "black", fontSize: "10px", fontWeight: "600", background: '#FDFF32' }}>{cell.row.original?.isAcknowledgment == "1" ? "Open" : "Open"}</Button></u></p>



//                                     </Col>
//                                 </Row>
//                             </>
//                         )
//                     }
//                 },

//                 {
//                     accessorKey: "isAcknowledgment",
//                     header: "Action",
//                     size: '4',


//                     Cell: ({ cell }) => {
//                         // let data = cell.getValue()
//                         // console.log(cell.row.original);
//                         return (
//                             <>
//                                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>

//                                     {

//                                         <>

//                                             {
//                                                 cell.row.original.isAcknowledgment[0] === '1' ? (
//                                                     <Tooltip arrow placement="left" title="view/edit">
//                                                         <Button variant='' className='add-Btn' onClick={() => {
//                                                             navigate(`${pathName}/New-assign`);
//                                                             // handleCloseAcknowledgemnet()
//                                                         }}><TbEyeEdit fontSize="20" />
//                                                         </Button>
//                                                     </Tooltip>

//                                                 ) : ""}
//                                             {cell.row.original?.isAcknowledgment == "1" ? (<Button variant='' className='add-Btn ' onClick={showUpdatedList}>Status update</Button>) : ""}

//                                             {cell.row.original?.isAcknowledgment == "" ?
//                                                 <Button variant='' className='add-Btn' onClick={() => {
//                                                     handleShowAcknowledgemnet()
//                                                     console.log(data, '-----------------')

//                                                 }}>Acknowledge</Button>
//                                                 // : cell.row.original?.isAcknowledgment == "1" ? <Button variant='' className='cncl-Btn' disabled >Acknowledged</Button> 
//                                                 : ""}
//                                         </>

//                                     }







//                                 </Box >
//                             </>
//                         )
//                     }

//                 },









//             ]
//         );

//     const fixedColumnWidths = {
//         productSerial: '100%',
//         // assignTech: 'fit-content',

//     };


//     const ServiceRequest = {
//         customer: "Customer contact",
//         Product_required: "Product recevied at workshop",
//         // cancel: "Cancelled",
//         // Customer: "Customer negligence",
//         // Revisit: "Revisit date",

//     };
//     const Cancel = {
//         // OOW: "Out of warranty – customer not ready to pay",
//         // Problem: "Problem not related to CG product",
//         tech_not_allowed: 'Technician not available'

//     }

//     const ServiceCancel = {
//         Product: "Product already at workshop",


//     }
//     const [selectedServiceRequest, setSelectedServiceRequest] = useState('');
//     // const [selectedCancelRequest, setSelectedCancelRequest] = useState('');


//     const handleServiceRequestChange = (event) => {
//         const selectedValue = event.target.value;

//         setSelectedServiceRequest(selectedValue);
//         console.log(selectedValue, '-------------')
//     };
//     // const handleServiceCancelChange = (event) => {
//     //     const selectedValue = event.target.value;
//     //     setSelectedCancelRequest(selectedValue);

//     //     console.log(selectedValue, '-------------')
//     // };
//     // const handleServiceCancellChange = (event) => {
//     //     const selectedValue = event.target.value;
//     //     setSelectedCancelRequest(selectedValue);

//     //     console.log(selectedValue, '-------------')
//     // };



//     return (

//         <>
//             <Row>
//                 <span> <IoIosArrowRoundBack className='m-0' style={{ cursor: "pointer" }} fontSize={35} color='#005bab' onClick={() => navigate(-1)} />
//                     Back</span> <p className='pg-label m-0 p-1'>Open Request</p>
//             </Row >
//             <Row className='mt-2 mb-2' >
//                 <Col>
//                     <div style={{ backgroundColor: "#9edf96", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
//                         await fetchData();
//                         let green = AllRequestsForFilter?.filter(i => i?.ageOfPendency < 23)
//                         setRowCount(green?.length)
//                         setAllOpenRequests(green)
//                     }}>{`less than 23 hrs.`}</div>
//                 </Col>
//                 <Col>
//                     <div style={{ backgroundColor: "#facd4f", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
//                         await fetchData();

//                         let orange = AllRequestsForFilter?.filter(i => (i?.ageOfPendency >= 23 && i?.ageOfPendency <= 48))
//                         setRowCount(orange?.length)

//                         setAllOpenRequests(orange)
//                     }}>{`23 to 48 hrs.`}</div>
//                 </Col>
//                 <Col>
//                     <div style={{ backgroundColor: "#f9a8a8", height: "fit-content", fontSize: "12px", textAlign: "center", borderRadius: "10px", cursor: 'pointer' }} onClick={async (e) => {
//                         await fetchData();

//                         let red = AllRequestsForFilter?.filter(i => i?.ageOfPendency > 48)
//                         setRowCount(red?.length)

//                         setAllOpenRequests(red)
//                     }}>{`more than 48 hrs.`}</div>
//                 </Col>
//             </Row>
//             <MaterialReactTable
//                 columns={columns}
//                 data={data}

//                 initialState={{ showColumnFilters: false }} //show filters by default
//                 muiTableHeadCellFilterTextFieldProps={{
//                     sx: { m: "0.5rem 0", width: "100%" },
//                     variant: "outlined",
//                 }}

//                 muiTableBodyCellProps={({ cell }) => ({
//                     style: {
//                         width: fixedColumnWidths[cell.column.id],
//                         minWidth: fixedColumnWidths[cell.column.id],
//                         maxWidth: fixedColumnWidths[cell.column.id],
//                         border: "1px solid black"

//                     },
//                 })}
//                 muiTableBodyRowProps={({ row }) => ({
//                     sx: {
//                         backgroundColor: (row?.original?.ageOfpendency) < 23 ? "#9edf96" : (row?.original?.ageOfpendency >= 23 && row?.original?.ageOfpendency <= 48) ? "#facd4f" : (row?.original?.ageOfpendency) > 48 ? "#f9a8a8" : "",

//                     }
//                 })}



//                 // enableEditing
//                 // onEditingRowSave={handleSaveRowEdits}
//                 // onEditingRowCancel={handleCancelRowEdits}
//                 //     renderRowActions={({ cell, row, table }) => (

//                 //       <Box sx={{ display: "flex", gap: "1rem" }}>
//                 //         {/* <Tooltip arrow placement="left" title="View">
//                 //   <IconButton 
//                 //   className="edit-btn"
//                 //   // onClick={() => table.setEditingRow(row)}
//                 //   disabled
//                 //   >
//                 //     <FaEye color='green'/>
//                 //   </IconButton>
//                 // </Tooltip> */}
//                 //         {
//                 //           cell.row.original.isActive == false ? "" :
//                 //             <Tooltip arrow placement="left" title="Edit">
//                 //               <IconButton
//                 //                 className="edit-btn"
//                 //                 onClick={() => {
//                 //                   console.log(cell.row.original.divisionID);
//                 //                   setdivisionID(cell.row.original.divisionId)
//                 //                   handleModalShow()
//                 //                 }}

//                 //               // disabled
//                 //               >

//                 //                 <FaRegEdit color='#005bab' />
//                 //               </IconButton>
//                 //             </Tooltip>
//                 //         }
//                 //         {
//                 //           cell.row.original.isActive == false ? "" :
//                 //             <Tooltip arrow placement="right" title="Delete">
//                 //               <IconButton
//                 //                 color="error"
//                 //                 onClick={() => {
//                 //                   setdivisionID(cell.row.original.divisionId)
//                 //                   console.log(cell.row.original.divisionId)
//                 //                   handleShowDel()
//                 //                 }}


//                 //               // disabled
//                 //               >
//                 //                 {/* {divisionData.map(division => (
//                 //               <div key={division.id}>
//                 //                 <p>{division.name}</p>
//                 //                 <button onClick={() => handleDelete(division.id)}>Delete</button>
//                 //               </div>
//                 //             ))} */}
//                 //                 <HiOutlineTrash color='red' />
//                 //               </IconButton>
//                 //             </Tooltip>
//                 //         }
//                 //       </Box>
//                 //     )}
//                 enableTopToolbar={false}

//                 manualPagination={true}
//                 muiToolbarAlertBannerProps={isError
//                     ? {
//                         color: 'error',
//                         children: 'Error loading data',
//                     }
//                     : undefined}
//                 onColumnFiltersChange={setColumnFilters}
//                 onGlobalFilterChange={setGlobalFilter}
//                 onPaginationChange={setPagination}
//                 onSortingChange={setSorting}
//                 rowCount={rowCount}
//                 state={
//                     {
//                         columnFilters,
//                         globalFilter,
//                         isLoading,
//                         pagination: pagination,
//                         showAlertBanner: isError,
//                         showProgressBars: isRefetching,
//                         sorting,
//                     }
//                 }

//                 renderTopToolbarCustomActions={({ table }) => (
//                     <>
//                         <div style={{
//                             display: 'flex',
//                             gap: '16px',
//                             padding: '10px',
//                             flexWrap: 'wrap',
//                         }}>


//                         </div>
//                     </>

//                 )}


//                 positionActionsColumn="first"



//             />

//             <GenericModal show={showAcknowledgemnet} handleClose={handleCloseAcknowledgemnet} size='l' IsCentered='centered' className='mdl-title' title="Acknowledgement"
//                 body={
//                     <>

//                         <Row>
//                             {/* <Col lg={4} md={12} sm={12}>

//                                 <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
//                                     <div
//                                         style={{ backgroundColor: "white", borderRadius: "8px" }}
//                                         className="p-3"
//                                     >
//                                         <div className='d-flex justify-content-between align-items-center flex-wrap'>

//                                             <div  >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Product model
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     LT
//                                                 </p>
//                                             </div>
//                                             <div  >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Product SN
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     123XXX
//                                                 </p>
//                                             </div>
//                                             <div >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Product type
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     LT Motor
//                                                 </p>
//                                             </div>
//                                             <div>
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Frame size
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     12
//                                                 </p>
//                                             </div>
//                                             <div >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Pole
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >

//                                                     3
//                                                 </p>
//                                             </div>
//                                             <div  >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Voltage
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     6 Kw
//                                                 </p>
//                                             </div>

//                                             <div >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Date Created
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     12/06/2024
//                                                 </p>
//                                             </div>
//                                             <div >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Warranty Type
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     W
//                                                 </p>
//                                             </div>
//                                             <div >
//                                                 <p className="m-0" style={{ fontSize: "11px" }}>
//                                                     Service type
//                                                 </p>
//                                                 <p
//                                                     className="mt-1"
//                                                     style={{ fontWeight: "500", fontSize: "11px" }}
//                                                 >
//                                                     -
//                                                 </p>
//                                             </div>
//                                         </div>
                                        
//                                         <div style={{
//                                             width: 'max-content',
//                                             margin: 'auto',
//                                             boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)",
//                                             borderRadius: '10px'
//                                         }} className='d-flex align-items-center justify-content-center p-3'>
//                                             <div>

//                                                 <div className='d-flex align-items-center '  >

//                                                     <div md={2}>
//                                                         <FaUserCircle fontSize={50} />

//                                                     </div>
//                                                     <div className='ml-2'>
//                                                         <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
//                                                         <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Rajesh</p>
//                                                     </div>

//                                                 </div>
//                                                 <div className='mt-3'>
//                                                     <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
//                                                     <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> Shiwaji NagarPune </p>
//                                                 </div>
//                                                 <div className='mt-3'>
//                                                     <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>rajesh@gmail.com</span> </p>
//                                                     <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
//                                                         fontSize={18} /> <span className='ml-2'>9878988789</span> </p>


//                                                 </div>

//                                             </div>

//                                         </div>



//                                     </div>
//                                 </Card>

//                             </Col> */}
//                             <Col lg={12} md={12} sm={12}>
//                                 <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
//                                     <Row>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Service request no</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>208978979</p>
//                                         </Col>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Date created</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>11/07/2024</p>
//                                         </Col>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px" }}>Nature of complaint</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>Breakdown</p>
//                                         </Col>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Division</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>LT-Motor</p>
//                                         </Col>

//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Product line</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>M1 MOTORS NAGAR-UNIT 1</p>
//                                         </Col>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px" }}>Product Sr no</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>UDGM25354
//                                             </p>
//                                         </Col>





//                                     </Row>
//                                     <Row>
//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px" }}>Warranty status</p>
//                                             <Button variant='' className='mt-1 add-Btn' style={{ fontWeight: "500", fontSize: "12px" }} >In warranty</Button>
//                                         </Col>


//                                         <Col lg={4} md={6} sm={6}>
//                                             <p className='m-0' style={{ fontSize: "12px" }}>Service request type</p>
//                                             <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>In warranty</p>
//                                         </Col>


//                                     </Row>
//                                     <hr />

//                                     <div>

//                                         <div className='d-flex align-items-center '  >

//                                             <div md={2}>
//                                                 <FaUserCircle fontSize={50} />

//                                             </div>
//                                             <div className='ml-2'>
//                                                 <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
//                                                 <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Reliance Industry</p>
//                                             </div>

//                                         </div>
//                                         <div className='mt-1'>
//                                             <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
//                                             <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> Shiwaji Nagar Pune </p>
//                                         </div>
//                                         <div className='mt-1'>
//                                             <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>rajesh@gmail.com</span> </p>
//                                             <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
//                                                 fontSize={18} /> <span className='ml-2'>9878988789</span> </p>


//                                         </div>

//                                     </div>


//                                 </Card>



//                             </Col>





//                         </Row>
//                         <Row>
//                             <Col lg={12} md={12} sm={12}>


//                                 <Row className='justify-content-center text-center'>
//                                     <p className='m-0'>Please Select Acknowledge</p>

//                                     <Col lg={4} md={6} sm={12}>
//                                         <Form.Check
//                                             type='radio'
//                                             label="Yes"
//                                             name="radioGroup"
//                                             value="Yes"
//                                             style={{
//                                                 color: '#000',
//                                                 fontWeight: '400',
//                                                 fontSize: '14px',
//                                                 textAlign: 'left',
//                                                 margin: '5px 15px 0px 0px',
//                                                 display: 'inline-block'
//                                             }}
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     setrequestforYes(true)
//                                                     setrequestforNo(false)

//                                                 }

//                                             }} />
//                                         <Form.Check
//                                             type='radio'
//                                             label="No"
//                                             name="radioGroup"
//                                             value='No'
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     setrequestforNo(true)
//                                                     setrequestforYes(false)

//                                                 }

//                                             }}
//                                             style={{
//                                                 color: '#000',
//                                                 fontWeight: '400',
//                                                 fontSize: '14px',
//                                                 textAlign: 'left',
//                                                 margin: '5px 15px 0px 0px',
//                                                 display: 'inline-block'

//                                             }} />
//                                     </Col>

//                                 </Row>
//                                 {
//                                     (requestforYes) && (
//                                         <Row className='justify-content-center align-items-center'>


//                                             <Col md={6}>
//                                                 <Form.Group>
//                                                     <Form.Label>Service request status</Form.Label>
//                                                     <Form.Select onChange={handleServiceRequestChange}>
//                                                         <option value=''>Select</option>
//                                                         {Object.keys(ServiceRequest).map(key => (
//                                                             <option key={key} value={key}>{ServiceRequest[key]}</option>
//                                                         ))}

//                                                     </Form.Select>

//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>


//                                     )
//                                 }
//                                 {
//                                     (requestforNo) && (
//                                         <Row className=' m-0 p-0 '>

//                                             <Col md={12}>
//                                                 <Form.Group className="">
//                                                     <Form.Label>
//                                                         Remarks
//                                                     </Form.Label>
//                                                     <Form.Control as="textarea"
//                                                         rows={2} name="Remarks"
//                                                     />
//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>
//                                     )
//                                 }


//                             </Col>
//                         </Row>
//                         {/* <Row className='justify-content-center align-items-center'>
//                             <Col md={3}>
//                                 <Form.Group>
//                                     <Form.Label>Service request rejection</Form.Label>
//                                     <Form.Select onChange={handleServiceRequestChange}>
//                                         <option value=''>Select</option>
//                                         {Object.keys(ServiceRequest).map(key => (
//                                             <option key={key} value={key}>{ServiceRequest[key]}</option>
//                                         ))}

//                                     </Form.Select>

//                                 </Form.Group>
//                             </Col>
//                             { selectedServiceRequest === 'Customer'   && (
//                                 <Col md={3}>
//                                     <Form.Group>
//                                         <Form.Label>Cancellation reason</Form.Label>
//                                         <Form.Select onChange={handleServiceCancelChange}>
//                                             <option value=''>Select</option>
//                                             {Object.keys(Cancel).map(key => (
//                                                 <option key={key} value={key}>{Cancel[key]}</option>
//                                             ))
//                                             }
//                                         </Form.Select>
//                                     </Form.Group>
//                                 </Col>
//                             )}
//                         </Row> */}

//                     </>
//                 }
//                 footer={<>
//                     <Button variant="" className='cncl-Btn' onClick={handleCloseAcknowledgemnet}>
//                         Close
//                     </Button>
//                     <Button variant="" className='add-Btn'
//                         onClick={(e) => {
//                             if (requestforYes) {
//                                 setdata((pre) => {
//                                     // Create a new copy of the first item with updated acknowledgment
//                                     const updatedData = data.map((item, index) =>
//                                         index === 0 ? { ...item, isAcknowledgment: "1" } : item
//                                     );

//                                     // Merge the new updated data with the previous state
//                                     const combinedData = [...pre, ...updatedData];

//                                     // Remove duplicates based on a unique property, e.g., 'id'
//                                     const uniqueData = Array.from(new Map(combinedData.map(item => [item.id, item])).values());
//                                     console.log(uniqueData, '----')

//                                     return uniqueData;
//                                 });
//                                 handleCloseAcknowledgemnet()



//                                 console.log(data, '----p');
//                             }
//                             handleCloseAcknowledgemnet()





//                             e.preventDefault()

//                         }}

//                     >
//                         Save
//                     </Button>
//                 </>} />


//             <GenericModal show={showList} handleClose={handleCloseUpdatedList} size='l' IsCentered='centered' className='mdl-title' title="Request status"
//                 body={
//                     <>
//                         <Row className=''>
//                             <Col md={6}>
//                                 <Form.Group>
//                                     <Form.Label>Service request status</Form.Label>
//                                     <Form.Select onChange={handleServiceRequestChange}>
//                                         <option value=''>Select</option>
//                                         {Object.keys(ServiceRequest).map(key => (
//                                             <option key={key} value={key}>{ServiceRequest[key]}</option>
//                                         ))}

//                                     </Form.Select>

//                                 </Form.Group>
//                             </Col>
//                             {/* {selectedServiceRequest === 'Customer' && (
//                                 <Col md={6}>
//                                     <Form.Group>
//                                         <Form.Label>Cancellation reason</Form.Label>
//                                         <Form.Select onChange={handleServiceCancelChange}>
//                                             <option value=''>Select</option>
//                                             {Object.keys(ServiceCancel).map(key => (
//                                                 <option key={key} value={key}>{ServiceCancel[key]}</option>
//                                             ))
//                                             }
//                                         </Form.Select>
//                                     </Form.Group>
//                                 </Col>
//                             )} */}
//                             {(selectedServiceRequest === 'cancel') && (
//                                 <Col md={6}>
//                                     <Form.Group>
//                                         <Form.Label>Service request sub status</Form.Label>
//                                         <Form.Select onChange={handleServiceCancellChange}>
//                                             <option value=''>Select</option>
//                                             {Object.keys(Cancel).map(key => (
//                                                 <option key={key} value={key}>{Cancel[key]}</option>
//                                             ))
//                                             }
//                                         </Form.Select>
//                                     </Form.Group>
//                                 </Col>
//                             )}
//                         </Row>




//                     </>
//                 }
//                 footer={<>
//                     <Button variant="" className='cncl-Btn' onClick={handleCloseUpdatedList}>
//                         Close
//                     </Button>
//                     <Button variant="" className='add-Btn'


//                     >
//                         Save
//                     </Button>
//                 </>} />
//         </>

//     )
// }

// export default NewASC