import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../Sidebar';
import { Card, Col, Row, Form, Button, Spinner, Modal, Table } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";



import { Box, IconButton, Switch, Tooltip } from '@mui/material';

function ParameterValueMaster() {
  let token = localStorage.getItem("UserToken")
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [commonparatype, setAllCommonType] = useState([]);

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  // const navigate=useNavigate();

  useEffect(() => {
    setloading(false)
  }, [])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    ParameterType()
    setaddBranch({
      parameterValId: 0,
      parameterTypeId: 0,
      parameterType: '',
      parameterText: "",
      parameterCode: "",
      sequenceNo: "",
      isActive: true
    })


  }
  const handleModalShow = () => setShowModal(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);



  const [showIsActive, setIsActive] = useState(false);

  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);


  const [showIsActive1, setIsActive1] = useState(false);

  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);

  const [activeID, setactiveID] = useState(0)


  // -----------Pagination------------------------

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(

        `${process.env.REACT_APP_API_URL}ParaVal/GetAllParaVal`,

      );
      url.searchParams.set(
        'PageNumber',
        `${pagination.pageIndex}`,
      );
      url.searchParams.set('PageSize', `${pagination.pageSize}`);

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      try {
        const response = await fetch(url.href, {
          headers: headers
        });
        const json = await response?.json();
        console.log(json);
        setdata(json);
        setRowCount(json[0]?.totalRows);
        console.log(json[0]?.totalRows);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);




  // useEffect(() => {


  // }, [user?.divisionCode])



























  const [AllCommonTypeEdit, setAllCommonTypeEdit] = useState([])


  const ParameterTypeForEdit = () => {
    const AllCommonParaType = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=26&Id=0&Code=0`;
    fetch(AllCommonParaType, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCommonTypeEdit(result)
      })

  }







  const columns = useMemo(
    () => [



      {
        accessorKey: "parameterType",
        header: "Parameter Type",
        size: "50"
      },
      {
        accessorKey: "noOfParameterValues",
        header: "No. of Records",
        size: "50"

      },
      // {
      //   accessorKey: "parameterCode",
      //   header: "Parameter Code",
      //   size: "50"

      // },
      // {
      //   accessorKey: "sequenceNo",
      //   header: "Sequence No",
      //   size: "50",
      //   Cell: ({ cell }) => (
      //     <p className='text-center m-0'>{cell.getValue().toLocaleString()}</p>
      //   ),
      // },
      // {
      //   accessorKey: "isActive",
      //   header: "Active",
      //   Cell: ({ cell }) => (
      //     <p>{cell.getValue() === true ? "Yes" : "No"}</p>
      //   ),
      // },
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
                    Permissions?.isEdit ?
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton
                          className="edit-btn"
                          onClick={() => {
                            console.log(cell.row.original?.parameterTypeId);
                            setparaValID(cell.row.original?.parameterTypeId)
                            // alert(EditPvData[0]?.parameterTypeId)
                            setpTypeIdEdit(cell.row.original?.parameterTypeId)

                            handleModalShow()
                            ParameterType()

                            ParameterTypeForEdit()

                          }}

                        >
                          <FaRegEdit color='#005bab' />
                        </IconButton>
                      </Tooltip> : ""
                }
                {/* { */}
                  {/* cell.row.original.isActive == false ? "" : */}
                    {/* <Tooltip arrow placement="right" title="Delete"> */}
                      {/* <IconButton */}
                        {/* // color="error" */}
                        {/* onClick={() => { */}
                          {/* setparaValID(cell.row.original.parameterTypeId) */}
                          {/* setisActive(cell.row.original.isActive) */}
                          {/* handleShowDel() */}
                        {/* }} */}


                      {/* > */}
                        {/* <HiOutlineTrash color='red' /> */}
                        {/* <FaUserCheck */}

                          {/* style={{ color: 'blue' }} */}

                        {/* /> */}
                      {/* </IconButton> */}
                    {/* </Tooltip> */}
                {/* } */}

                {/* {
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.parameterValId);
                        setactiveID(cell.row.original.parameterValId);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>


                        <FaUserXmark
                          style={{ color: 'red' }} // Style for the new icon
                        />

                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.parameterTypeId);
                        setactiveID(cell.row.original.parameterTypeId);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>



                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                } */}

                {/* <Switch checked={data === true} onClick={(e) => {
                  console.log(cell.row.original?.parameterValId);
                  setactiveID(cell.row.original?.parameterValId)
                  cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive()
                }} /> */}

              </Box>

            </>
          )
        }
      },


    ]
  );
  const table = useMaterialReactTable({
    columns,
    data,
    // enableRowSelection: true,
    // getRowId: (row) => row.phoneNumber,
    initialState: { showColumnFilters: true },
    // manualFiltering: true,
    manualPagination: true,
    // manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    // rowCount=rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  const ParameterType = () => {
    const AllCommonParaType = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=1&Id=0&Code=0`;
    fetch(AllCommonParaType, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCommonType(result)
      })

  }







  const fetchAllParaVals = () => {
    const fetchdataOption = `${process.env.REACT_APP_API_URL}ParaVal/GetAllParaVal`;

    fetch(fetchdataOption, {
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
    fetchAllParaVals()

  }, [])


  const [addBranch, setaddBranch] = useState({
    parameterValId: 0,
    parameterText: "",
    parameterCode: "",
    sequenceNo: "",
    isActive: true
  })


  const [pTypeId, setpTypeId] = useState("")
  const [pTypeIdEdit, setpTypeIdEdit] = useState("")

  const [PvData, setPvData] = useState([])


  const handleChange = (e) => {
    const newdata = { ...addBranch };
    newdata[e.target.name] = e.target.value;
    setaddBranch(newdata);
    console.log(newdata);
  }

  const [editBranch, seteditBranch] = useState({
    parameterValId: 0,
    parameterTypeId: 0,
    parameterType: '',
    parameterText: "",
    parameterCode: "",
    sequenceNo: "",
    isActive: true

  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editBranch };
    newdata[e.target.name] = e.target.value;
    seteditBranch(newdata)
    console.log(newdata);
  }

  const [parameterValId, setparaValID] = useState("")

  const [EditPvData, setEditPvData] = useState([])

  const getSingleBranch = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValById?paraValId=${parameterValId}`;


  useEffect(() => {
    if (parameterValId) {
      fetch(getSingleBranch, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          // seteditBranch((pre) => {
          //   return {
          //     ...pre,
          //     parameterValId: result?.parameterValId,
          //     parameterTypeId: result?.parameterTypeId,
          //     parameterType: result?.parameterType,
          //     parameterText: result?.parameterText,
          //     parameterCode: result?.parameterCode,
          //     sequenceNo: result?.sequenceNo
          //   }
          // })

          setEditPvData(result)
        })
    }

  }, [parameterValId])

  const handleModalClose = () => {
    setShowModal(false)
    fetch(getSingleBranch, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // seteditBranch((pre) => {
        //   return {
        //     ...pre,
        //     parameterValId: result?.parameterValId,
        //     parameterTypeId: result?.parameterTypeId,
        //     parameterType: result?.parameterType,
        //     parameterText: result?.parameterText,
        //     parameterCode: result?.parameterCode,
        //     sequenceNo: result?.sequenceNo
        //   }
        // })
        setEditPvData(result)

      })


  }










  const [inputList, setInputList] = useState([{ parameterValId: 0, parameterTypeId: 0, parameterType: "", parameterText: "", parameterCode: "", sequenceNo: "", isActive: true }]);



  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];


    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
    setPvData(inputList)

  };



  const handleInputChangeEdit = (e, index) => {
    const { name, value } = e.target;
    const list = [...EditPvData];
    list[index][name] = value;
    setEditPvData(list);
    console.log(EditPvData);
    // setPvData(EditPvData)  change editstate

  };



  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log(index);
    console.log(list);
  };



  const handleRemoveClickEdit = index => {
    const list = [...EditPvData];
    list.splice(index, 1);
    setEditPvData(list);
    console.log(index);
    console.log(list);
  };



  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { parameterValId: 0, parameterTypeId: pTypeId, parameterType: "", parameterText: "", parameterCode: "", sequenceNo: "", isActive: true }]);
  };
  const handleAddClickEdit = () => {
    setEditPvData([...EditPvData, { parameterValId: 0, parameterTypeId: EditPvData[0]?.parameterTypeId ? EditPvData[0]?.parameterTypeId : pTypeIdEdit, parameterType: "", parameterText: "", parameterCode: "", sequenceNo: "", isActive: true }]);
  };

  const customHeaders = {
    parameterType: 'Parameter Type',

  }



  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>
            <p className='pg-label m-0'>Parameter Value Master</p>
            {Permissions?.isAdd ? <Row className=''><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Parameter Value</Button></Col></Row> : ""}
          </div>
          <hr />



          {
            Permissions?.isView ?
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
                // renderRowActions={({ cell, row, table }) => (

                //   <Box sx={{ display: "flex", gap: "1rem" }}>
                //     {/* <Tooltip arrow placement="left" title="View">
                //             <IconButton 
                //             className="edit-btn"
                //             // onClick={() => table.setEditingRow(row)}
                //             disabled
                //             >
                //               <FaEye color='green'/>
                //             </IconButton>
                //           </Tooltip> */}

                //     {
                //       cell.row.original.isActive == false ? "" :

                //         <Tooltip arrow placement="left" title="Edit">
                //           <IconButton
                //             className="edit-btn"
                //             onClick={() => {
                //               setparaValID(cell.row.original.parameterValId)
                //               console.log(cell.row.original.parameterValId)
                //               handleModalShow()
                //             }}
                //           >
                //             <FaRegEdit color='#005bab' />
                //           </IconButton>
                //         </Tooltip>
                //     }
                //     {
                //       cell.row.original.isActive == false ? "" :
                //         <Tooltip arrow placement="right" title="Delete">
                //           <IconButton
                //             color="error"
                //             onClick={() => {
                //               setparaValID(cell.row.original.parameterValId)
                //               console.log(cell.row.original.parameterValId)
                //               handleShowDel()

                //             }}

                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }
                //   </Box>
                // )}

                muiExpandButtonProps={({ row, table }) => ({
                  onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
                  sx: {
                    transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s',
                  },
                })}
                enableExpandAll={false}
                renderDetailPanel={({ row }) => {
                  // console.log('---row---',row.original.branchCode)
                  let list = row.original?.paraValList;

                  // console.log(list1);

                  return (

                    (row.original.paraValList) ? (
                      <Box
                      // sx={{
                      //   display: 'grid',
                      //   margin: 'auto',
                      //   gridTemplateColumns: '1fr 1fr',
                      //   width: '100%',
                      // }}
                      >
                        {/* <Typography>Address: {row.original.address}</Typography> */}
                        {/* <Row className='justify-content-end'>
  <Col md={4} sm={4} xs={4}> */}


                        <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
                          {list ?

                            <div className='p-3' style={{ borderRight: "1px solid" }}>
                              {/* <p style={{ fontSize: "16px", fontWeight: "600" }}>Branches</p> */}

                              <Table bordered responsive>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Parameter Text</th>
                                    <th>Parameter Code</th>
                                    <th>Sequence No.</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    list?.map((pv, index) => {
                                      return (
                                        <>
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{pv?.parameterText}</td>
                                            <td>{pv?.parameterCode}</td>
                                            <td>{pv?.sequenceNo}</td>
                                          </tr>


                                        </>
                                      )
                                    })
                                  }
                                </tbody>
                              </Table>




                            </div> : ""
                          }

                        </div>

                        {/* <Col>
      </Col> */}

                        {/* </Col>
</Row> */}
                      </Box>
                    ) : null
                  )

                }

                }

                // manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
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
                            customHeaders,
                            [

                              "parameterTypeId",
                              "noOfParameterValues",
                              "paraValList",
                              "totalRows",
                              "isActive",


                              // {
                              //     "parameterValId": 1,
                              //     "parameterTypeId": 0,
                              //     "parameterText": "Quotation copy",
                              //     "parameterCode": "Quotation copy",
                              //     "sequenceNo": 1,
                              //     "isActive": false,
                              //     "userId": null,
                              //     "totalRows": null
                              // },


                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button> : ""}

                    </div>
                  </>

                )}


                positionActionsColumn="first"



              /> : ""
          }

          {/*------------------- Add Parameter value----------------- */}

          <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Add New Parameter Value</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parameter Type <span className='req-t'>*</span></Form.Label>
                    <Form.Select
                      name='parameterTypeId'

                      onChange={(e) => setpTypeId(e.target.value)}
                    >

                      <option value="Select">Select</option>
                      {
                        commonparatype?.map((common, index) => {
                          return (
                            <>

                              <option value={common?.parameterTypeId} key={index}>{common?.parameterType}</option>
                            </>
                          )
                        })
                      }


                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Parameter Type</th> */}
                    <th>Parameter Text</th>
                    <th>Parameter Code</th>
                    <th>Sequence No.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>


                  {inputList.map((x, i) => {
                    return (
                      <>
                        {/* <Row>
          <Col xs={12} md={6}>


          <Row>
                             
                              <Col>
        <Form.Label className="mt-2">Meal</Form.Label>
        <Form.Control as="textarea" rows={2}  name="Meal"
              placeholder=""
              value={x.Meal}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>

          <Col xs={12} md={6}>

          <Row>
                           
                              <Col>
        <Form.Label style={{whiteSpace:"nowrap"}} className="mt-2">Diet Details</Form.Label>
        <Form.Control as="textarea" rows={2} className="ml10"
              name="DietDetails"
              placeholder=""
              value={x.DietDetails}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>
          <Col>
          
              
          </Col>

         
         </Row> */}



                        <tr key={i}>
                          <td>{i}</td>

                          <td>


                            <Form.Group className="mb-3">
                              {/* <Form.Label>Parameter Text <span className='req-t'>*</span></Form.Label> */}
                              <Form.Control
                                type="text"
                                name='parameterText'
                                value={x.parameterText}
                                onChange={e => handleInputChange(e, i)}

                                placeholder='Text'
                              />
                            </Form.Group>
                          </td>

                          <td>
                            <Form.Group className="mb-3">
                              {/* <Form.Label>Parameter Code</Form.Label> */}

                              <Form.Control
                                type="text"
                                name='parameterCode'
                                value={x.parameterCode}
                                onChange={e => handleInputChange(e, i)}
                                placeholder='Code'
                              />
                            </Form.Group>
                          </td>


                          <td>
                            <Form.Group className="mb-3">
                              {/* <Form.Label>Sequence No.</Form.Label> */}
                              <Form.Control
                                type="text"
                                name='sequenceNo'
                                value={x.sequenceNo}
                                onChange={e => handleInputChange(e, i)}

                                placeholder='Digit No'
                              />
                            </Form.Group>
                          </td>

                          <td>


                            {inputList.length !== 1 && <button
                              className="mr10"
                              style={{ color: "red", backgroundColor: "transparent", border: "1px solid red", borderRadius: "3px" }}
                              onClick={() => handleRemoveClick(i)}>Remove</button>}





                          </td>
                        </tr>






                      </>
                    );
                  })}


                </tbody>
              </Table>
              <Button variant="" className="" style={{ float: "right", color: "white", backgroundColor: "blue" }} onClick={handleAddClick}>Add</Button>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const addBranchUrl = `${process.env.REACT_APP_API_URL}ParaVal/UpsertParaVal?ParameterTypeId=${pTypeId}`;

                // if (editBranch.parameterTypeId === "" || editBranch.parameterText === "" || editBranch.parameterCode === "" || editBranch.sequenceNo === '') {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill in all required fields"
                //   });
                // }


                // const parameterTypeId = addBranch.parameterTypeId;
                // if (!parameterTypeId || parameterTypeId === 'Select') {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please select the Parameter Type"
                //   });
                //   return;
                // }

                // const parameterText = addBranch.parameterText;
                // // const parameterTextRegex = /^[a-zA-Z\s]+$/;
                // if (!parameterText) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Parameter Text is required"
                //   });
                //   return;
                // }

                // const parameterCode = addBranch.parameterCode;
                // // const parameterCodeRegex = /^[0-9a-zA-Z\s]+$/;
                // if (!parameterCode) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Parameter Code is required"
                //   });
                //   return;
                // }

                // const sequenceNo = addBranch.sequenceNo;
                // const sequenceNoRegex = /^[0-9\s]+$/;
                // if (!sequenceNo || !sequenceNo.match(sequenceNoRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Sequence number is required only number"
                //   });
                //   return;
                // }





                fetch(addBranchUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(PvData)
                })
                  .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);

                      if (res.status == 200) {
                        // const responseData =  response.text();
                        // if (responseData === "BREXISTS") {
                        //   Swal.fire({
                        //     icon: "warning",
                        //     title: "Parameter value already exists!"
                        //   });
                        // } else {
                        Swal.fire({
                          icon: "success",
                          title: "Saved successfully!"
                        });
                        handleClose()
                        fetchAllParaVals()
                        setInputList([])
                        // }
                      }

                    })
                  })




                // else {
                //   const errorData =  response?.json();
                //   if (errorData && errorData.title === "One or more validation errors occurred.") {
                //     // Construct error message from the error object
                //     let errorMessage = "";
                //     for (const key in errorData.errors) {
                //       errorMessage += `${errorData.errors[key][0]}\n`;
                //       Swal.fire({
                //         icon: "error",
                //         title: errorMessage
                //       });
                //     }
                //   }
                //   else {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                //   }
                // }

                // } catch (error) {
                //   console.error('Error:', error);
                //   Swal.fire({
                //     icon: "error",
                //     title: "An error occurred while saving data"
                //   });
                // }
                // })();
                // }


              }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/*------------------- Edit Parameter value----------------- */}

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Parameter Value Master</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parameter Type <span className='req-t'>*</span></Form.Label>
                    <Form.Select

                      value={EditPvData[0]?.parameterTypeId}
                      onChange={(e) => setpTypeIdEdit(e.target.value)}
                      disabled
                    >

                      <option value="Select">Select</option>
                      {
                        AllCommonTypeEdit?.map((common, index) => {
                          return (
                            <>

                              <option value={common?.parameterTypeId} key={index}>{common?.parameterType}</option>
                            </>
                          )
                        })
                      }


                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Parameter Type</th> */}
                    <th>Parameter Text</th>
                    <th>Parameter Code</th>
                    <th>Sequence No.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>


                  {EditPvData.map((x, i) => {
                    return (
                      <>
                        {/* <Row>
          <Col xs={12} md={6}>


          <Row>
                             
                              <Col>
        <Form.Label className="mt-2">Meal</Form.Label>
        <Form.Control as="textarea" rows={2}  name="Meal"
              placeholder=""
              value={x.Meal}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>

          <Col xs={12} md={6}>

          <Row>
                           
                              <Col>
        <Form.Label style={{whiteSpace:"nowrap"}} className="mt-2">Diet Details</Form.Label>
        <Form.Control as="textarea" rows={2} className="ml10"
              name="DietDetails"
              placeholder=""
              value={x.DietDetails}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>
          <Col>
          
              
          </Col>

         
         </Row> */}



                        <tr key={i}>
                          <td>{i}</td>

                          <td>


                            <Form.Group className="mb-3">
                              {/* <Form.Label>Parameter Text <span className='req-t'>*</span></Form.Label> */}
                              <Form.Control
                                type="text"
                                name='parameterText'
                                value={x.parameterText}
                                onChange={e => handleInputChangeEdit(e, i)}

                                placeholder='Text'
                              />
                            </Form.Group>
                          </td>

                          <td>
                            <Form.Group className="mb-3">
                              {/* <Form.Label>Parameter Code</Form.Label> */}

                              <Form.Control
                                type="text"
                                name='parameterCode'
                                value={x.parameterCode}
                                onChange={e => handleInputChangeEdit(e, i)}
                                placeholder='Code'
                              />
                            </Form.Group>
                          </td>


                          <td>
                            <Form.Group className="mb-3">
                              {/* <Form.Label>Sequence No.</Form.Label> */}
                              <Form.Control
                                type="text"
                                name='sequenceNo'
                                value={x.sequenceNo}
                                onChange={e => handleInputChangeEdit(e, i)}

                                placeholder='Digit No'
                              />
                            </Form.Group>
                          </td>

                          <td>


                            {EditPvData.length !== 1 && <button
                              className="mr10"
                              style={{ color: "red", backgroundColor: "transparent", border: "1px solid red", borderRadius: "3px" }}
                              onClick={() => handleRemoveClickEdit(i)}>Remove</button>}





                          </td>
                        </tr>






                      </>
                    );
                  })}


                </tbody>
              </Table>
              <Button variant="" className="" style={{ float: "right", color: "white", backgroundColor: "blue" }} onClick={handleAddClickEdit}>Add</Button>




            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editBranchUrl = `${process.env.REACT_APP_API_URL}ParaVal/UpsertParaVal?ParameterTypeId=${pTypeIdEdit}`;
                // let data = {
                //   ...editBranch
                // }


                // if (editBranch.parameterTypeId === "" || editBranch.parameterText === "" || editBranch.parameterCode === "" || editBranch.sequenceNo === '') {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }


                // const parameterTypeId = editBranch.parameterTypeId;
                // if (!parameterTypeId) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "parameter Type  is required"
                //   });
                //   return;
                // }

                // const parameterText = editBranch.parameterText;
                // const parameterTextRegex = /^[a-zA-Z\s]+$/;
                // if (!parameterText || !parameterText.match(parameterTextRegex)) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Parameter Text is required and must contain only alphabets!"
                //   });
                //   return;
                // }




                // const sequenceNo = editBranch.sequenceNo;
                // const sequenceNoRegex = /^[0-9\s]+$/;
                // if (!sequenceNo) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "please fill sequence number"
                //   });
                //   return;
                // }

                // const sequenceNo = editBranch.sequenceNo;

                // // Check if longLastingTickitHour is empty
                // if (!sequenceNo) {
                //   console.error("Validation failed. sequenceNo is empty");
                //   Swal.fire({
                //     icon: "error",
                //     title: "Sequence no is required"
                //   });
                //   return;
                // }
                // Check if longLastingTickitHour is not a number or contains spaces within the number
                // if (typeof sequenceNo !== 'number' && !/^[0-9]+$/.test(sequenceNo.toString())) {
                //   // console.error("Sequence no:", sequenceNo);
                //   Swal.fire({
                //     icon: "error",
                //     title: "Sequence no Require only digiit number"
                //   });
                //   return;
                // }




                console.log(pTypeIdEdit);
                // else {
                //   (async () => {
                //     try {
                fetch(editBranchUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(EditPvData)
                })
                  .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);

                      if (res.status == 200) {
                        // const responseData =  response.text();
                        // if (responseData === "BREXISTS") {
                        //   Swal.fire({
                        //     icon: "warning",
                        //     title: "Parameter value already exists!"
                        //   });
                        // } else {
                        Swal.fire({
                          icon: "success",
                          title: "Updated successfully!"
                        });
                        handleModalClose()
                        fetchAllParaVals()
                        // }
                      }

                    })
                  })

              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Parameter Value</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this Parameter Value?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}ParaVal/DeleteParaVal?paraValId=${parameterValId}`;

                fetch(deleteBranchUrl, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },

                })
                  .then((res) => {
                    // res.json()
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);
                      if (res.status == 200) {
                        Swal.fire({
                          icon: "success",
                          title: "Deleted successfully!"
                        })
                        handleCloseDel()
                        fetchAllParaVals()

                      }
                      else {
                        Swal.fire({
                          icon: "error",
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









          {/* ----------------------------------Active--------------------------------------- */}



          <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Parameter Value</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Parameter Value?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteParaValUrl = `${process.env.REACT_APP_API_URL}ParaVal/DeleteParaVal?paraValId=${activeID}&isActive=${1}`;





                fetch(deleteParaValUrl, {
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
                        fetchAllParaVals()

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
              <Modal.Title className='mdl-title'>De-activate Parameter Value</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Parameter Value?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteParaValUrl = `${process.env.REACT_APP_API_URL}ParaVal/DeleteParaVal?paraValId=${activeID}&isActive=${0}`;





                fetch(deleteParaValUrl, {
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
                      fetchAllParaVals()

                    }

                    //   let resp = res.text()
                    //   resp.then((r) => {
                    //     console.log(r);
                    //     if (res.status == 200) {
                    //       Swal.fire({
                    //         icon: "success",
                    //         title: "De-activated successfully!"
                    //       })
                    //       handleCloseIsActive1()
                    //       fetchAllParaVals()

                    //     }
                    //     else {
                    //       Swal.fire({
                    //         icon: "warning",
                    //         title: "Something went wrong!"
                    //       })

                    //     }
                    //   })
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

export default ParameterValueMaster