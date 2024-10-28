

import React, { useMemo, useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, {
  handleExportRows,
  handleExportRowsPdf,
} from "../../CG/TestReport";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

import { BiSolidFilePdf } from "react-icons/bi";
import { handleResponse } from "../../../Components/Generic/utility";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";

import Multiselect from "multiselect-react-dropdown";

import { Box, IconButton, Switch, Tooltip } from "@mui/material";
import { json } from "react-router-dom";
import Swal from "sweetalert2";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

function ASCWisePincode() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleModalShow = () => setShowModal(true);
  const [showDel, setShowDel] = useState(false);
  const handleShowDel = () => setShowDel(true);



  const handleCloseDel = () => setShowDel(false);


  const [ascCode, setascCode] = useState('')
  const [ascFetchname, setAscFetchname] = useState('')
  const [ascFetchCode, setASCFetchCode] = useState('')




  const getSinglePinId = `${process.env.REACT_APP_API_URL}ASCWisePinCode/GetASCWisePinCodeById?ascCode=${ascCode}`;
  useEffect(() => {
    if (ascCode) {
      fetch(getSinglePinId, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("rrrrr-------------rrrrrrr", result);
          setEditData((pre) => {
            return {
              ...pre,
              ascId: result?.ascId,
              ascCode: result?.ascCode,
              divisionCode: result?.divisionCode,
              productLineCode: result.productLineNameList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
              pincodeList: result?.pincodeList.map((PC) => ({ value: PC.parameterTypeId, label: PC.parameterType })),

            }
          })

          let ascName = allASCs.filter(i => i.parameterTypeId == result?.ascCode)
          setAscFetchname(ascName[0]?.parameterType);
          setASCFetchCode(ascName[0]?.parameterTypeId)
          console.log(ascName, "--------------------")
          // console.log(allASCs.filter(i => i.parameterTypeId == result?.ascCode));


          const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

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


          let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.divisionCode}`;

          fetch(getAllProductLines1, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setAllproductLine(result.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })))
            })


          const getAllPincodes = `${process.env.REACT_APP_API_URL}Asc/GetAscWisePinCode?ascCode=${result.ascCode}`;

          fetch(getAllPincodes, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("---------------rp-------------", result);
              setallPincodes(result.map((Pin) => ({ value: Pin.parameterTypeId, label: Pin.parameterType })));
              console.log("---------------allp-------------", allPincodes);

            });





        })
    }

  }, [ascCode])

  const handleModalClose = () => {
    setShowModal(false);
    // useEffect(() => {
    //   if (ascCode) {
    fetch(getSinglePinId, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("rrrrr-------------rrrrrrr", result);
        setEditData((pre) => {
          return {
            ...pre,
            ascId: result?.ascId,
            ascCode: result?.ascCode,
            divisionCode: result?.divisionCode,
            productLineCode: result.productLineNameList.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })),
            pincodeList: result?.pincodeList.map((PC) => ({ value: PC.parameterTypeId, label: PC.parameterType })),

          }
        })

        // // console.log(data.filter(i => i.ascCode == result?.ascCode));

        const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

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


        let getAllProductLines1 = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.divisionCode}`;

        fetch(getAllProductLines1, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setAllproductLine(result.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })))
          })


        const getAllPincodes = `${process.env.REACT_APP_API_URL}Asc/GetAscWisePinCode?ascCode=${result.ascCode}`;

        fetch(getAllPincodes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log("---------------rp-------------", result);
            setallPincodes(result.map((Pin) => ({ value: Pin.parameterTypeId, label: Pin.parameterType })));
            console.log("---------------allp-------------", allPincodes);

          });





      })




  }
  let token = localStorage.getItem("UserToken");

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));



  const [data, setdata] = useState([])



  const fetchAllPinCodes = () => {
    let allpinCodesUrl = `${process.env.REACT_APP_API_URL}ASCWisePinCode/GetAllASCWisePinCode`
    fetch(allpinCodesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("-----pn-------------", result);
        setdata(result);
        setData({
          ascId: 0,
          ascCode: "",
          divisionCode: "",
          productLineCode: [],
          isActive: true,
          pincodeList: [],
        });
      });
  }


  useEffect(() => {
    fetchAllPinCodes()
  }, [])

  const [adddata, setData] = useState({
    ascId: 0,
    ascCode: "",
    divisionCode: "",
    productLineCode: [],
    isActive: true,
    pincodeList: [],
  });

  const [Editdata, setEditData] = useState({
    ascId: 0,
    ascCode: "",
    divisionCode: "",
    productLineCode: [],
    isActive: true,
    pincodeList: [],
  });

  const handleChangeEdit = (e) => {
    const newdata = { ...Editdata };
    newdata[e.target.name] = e.target.value;
    setEditData(newdata);
    console.log(newdata);
  }








  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };
  const editcustomValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };

  const [allDivisions, setallDivisions] = useState([]);

  const [productLine, setAllproductLine] = useState([]);

  const [allPincodes, setallPincodes] = useState([]);

  const [selectedAscCode, setselectedAscCode] = useState("");

  const handleClose = () => {
    setShow(false)
    setData({
      ascId: 0,
      ascCode: "",
      divisionCode: "",
      productLineCode: [],
      isActive: true,
      pincodeList: [],
    });
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

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

  const [allASCs, setallASCs] = useState([]);

  const getAllASCUrl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=25&Id=0&Code=0`;

  useEffect(() => {
    fetch(getAllASCUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallASCs(result);
      });
  }, []);


  const columns = useMemo(
    () => [

      {
        accessorKey: "ascName",
        header: "ASC Name",
        size: "50"

      },
      {
        accessorKey: "divisionName",
        header: "Division Name",
        size: "50"

      },
      {
        accessorKey: "pincodeName",
        header: "PinCodes",
        size: "50"

      },
      {
        accessorKey: "productLineName",
        header: "ProductLine Name",
        size: "50"
      },

      // {
      //   accessorKey: "isActive",
      //   header: "Is Active",
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

          return (
            <>
              <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
                {
                  cell.row.original.isActive == true ? "" :
                    Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
                      <IconButton
                        className="edit-btn"
                        onClick={() => {
                          console.log(cell.row.original.ascCode);
                          setascCode(cell.row.original.ascCode);
                          handleModalShow()


                        }}

                      >
                        <FaRegEdit color='#005bab' />
                      </IconButton>
                    </Tooltip> : ""
                }
                {
                  cell.row.original.isActive == true ? "" :
                    <Tooltip arrow placement="right" title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setascCode(cell.row.original.ascCode)
                          // setisActive(cell.row.original.isActive)
                          handleShowDel()
                        }}


                      >
                        <HiOutlineTrash color='red' />
                      </IconButton>
                    </Tooltip>
                }




                {/* {
                  cell.row.original.isActive === false ? (
                    // Render a different icon when isActive is false
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn"
                       onClick={() => {
                        console.log(cell.row.original.ascCode);
                        setactiveID(cell.row.original.ascCode);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}
                      >


                        <FaUserXmark

                          style={{ color: 'red' }} // Style for the new icon

                        />
                      </IconButton>
                    </Tooltip> : ""
                  ) : (
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn"
                       onClick={() => {
                        console.log(cell.row.original.ascCode);
                        setactiveID(cell.row.original.ascCode);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}
                      >


                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />
                      </IconButton>
                    </Tooltip> : ""
                  )
                } */}




              </Box>

            </>
          )
        }
      },


    ]
  );




  const [filterALLProductLine, setFilterAllProductLine] = useState([])
  const [filterallDivisions, setFilterallDivisions] = useState([]);


  const ALLDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;

    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFilterallDivisions(result)
      })

  }


  const ALLProductLine = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine`;

    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFilterAllProductLine(result)
      })

  }

  useEffect(() => {
    ALLDivision()
    ALLProductLine()

  }, [])



  const [filteringState, setFilteringState] = useState(false)
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
  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }
    const url = new URL(

      `${process.env.REACT_APP_API_URL}ASCWisePinCode/GetAllASCWisePinCode`,

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
  useEffect(() => {
    
      fetchData();

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,

    // sorting,
  ]);

  const [filterAscCode, setFilterAscCode] = useState('')
  const [filterDivisionName, setFilterDivisionName] = useState('')
  const [filterProductLineName, setFilterProductLineName] = useState('')

  const [filterPagination, setFilterPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchFilterPagination = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}ASCWisePinCode/GetAllASCWisePinCode`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterAscCode) {url.searchParams.set('AscCode',`${filterAscCode}`);}

    if (filterDivisionName) {url.searchParams.set('DivisionCode',`${filterDivisionName}`);}
    if (filterProductLineName) {url.searchParams.set('ProductLineCode',`${filterProductLineName}`);}




        
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    try {
      const response = await fetch(url.href, {
        headers: headers
      });
      const json = await response?.json();
      console.log(json);
      console.log(json[0]?.totalRows);
      setdata(json);
      setRowCount(json[0]?.totalRows);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };
  useEffect(() => {
    fetchFilterPagination();

  }, [filterPagination?.pageIndex, filterPagination?.pageSize])

  

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
    onPaginationChange:  setFilterPagination || setPagination,
    onSortingChange: setSorting,
    // rowCount=rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination:  filterPagination || pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });


  const customHeaders = {
    productLineName: "Product Line Name",
    divisionName: 'Division Name',
    ascName: "ASC Name",
    pincodeName: 'Pin Codes',
  }








  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
                    <div className='d-flex justify-content-between'>

          <p className="pg-label m-0">ASCwise Pincode Master</p>
          {Permissions?.isAdd ? (
            <Row className=" text-end">
              <Col>
                <Button variant="" className="add-Btn" onClick={handleShow}>
                  Add ASC Wise Pincode Master
                </Button>
              </Col>
            </Row>
          ) : (
            ""
          )}
          </div>
          <hr />


          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3" >



            <Col md={3} className=''>
              <Form.Group>
                <Form.Label>ASC Code</Form.Label>
                <Form.Control
                  type="text"
                  value={filterAscCode}
                  onChange={(e) => {
                    setFilterAscCode(e.target.value)
                  }}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Division</Form.Label>
                <Form.Select
                  name='divisionCode'
                  value={filterDivisionName}
                  onChange={(e) => {
                    setFilterDivisionName(e.target.value)
                  }}
                >
                  <option value="">Select Division</option>
                  {filterallDivisions.map((division) => (
                    <option key={division.divisionCode} value={division.divisionCode}>
                      {division.divisionName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Product Line</Form.Label>
                <Form.Select
                  name='productLineCode'
                  value={filterProductLineName}
                  onChange={(e) => {
                    setFilterProductLineName(e.target.value)
                  }}
                >
                  <option value="">Select Product Line</option>
                  {filterALLProductLine.map((productLine) => (
                    <option key={productLine.productLineCode} value={productLine.productLineCode}>
                      {productLine.productLineName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <div style={{ paddingTop: '0.5rem' }}>
                <Button
                  variant=""
                  className="add-Btn mt-3"
                  disabled={filteringState}
                  onClick={(e) => {
                    
                    setFilterPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    setPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    fetchFilterPagination()
                  }}

                >
                  Search
                </Button>
                <Button
                  variant=""
                  className="m-2 mt-4"
                  style={{
                    backgroundColor: "#005bab",
                    color: "white",
                    height: "fit-content",
                  }}
                  onClick={() => {
                    setFilterPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    setPagination({
                      pageIndex:0,
                      pageSize:10
                    })
                    fetchData()
          
                    setFilterAscCode('')
                    setFilterDivisionName('')
                    setFilterProductLineName('')

                  }}
                >
                  Reset
                </Button>
              </div>
            </Col>

          </Row>

         






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


                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                // onPaginationChange={setPagination}
                onPaginationChange={ setFilterPagination || setPagination}

                onSortingChange={setSorting}
                rowCount={rowCount}
                state={
                  {
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination:  filterPagination || pagination,
                    // pagination,
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

                      <Button variant=''
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() =>
                          handleExportRows(
                            table.getPrePaginationRowModel().rows,
                            customHeaders,
                            [
                              "productLineNameList",
                              "ascId",
                              "ascCode",
                              "divisionCode",
                              "productLineCode",
                              "isActive",
                              "pincodeList"
                            ]
                          )
                        }
                      >
                        <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV' />
                      </Button>

                    </div>
                  </>

                )}


              // positionActionsColumn="first"

              />
              : ""
          }

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            size="xl"
          >
            <Modal.Header closeButton>
              <Modal.Title className="mdl-title">Add New</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>ASC <span className="req-t">*</span></Form.Label>

                    <Select
                      aria-labelledby="aria-label"
                      // value={({ label: ascFetchname })}
                      // isDisabled
                      inputId="aria-example-input"
                      name="ascCode"
                      onChange={(e) => {
                        console.log(e.value)
                        if (e.value) {
                          setallPincodes([])
                          setData((pre) => {
                            return {
                              ...pre,
                              ascCode: e.value,
                              pincodeList: []
                            }
                          })


                        }


                        const getAllPincodes = `${process.env.REACT_APP_API_URL}Asc/GetAscWisePinCode?ascCode=${e.value ? e.value : 0}`;
                        fetch(getAllPincodes, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            console.log("---------------rp-------------", result);
                            setallPincodes(result.map((Pin) => ({ value: Pin.parameterTypeId, label: Pin.parameterType })));
                            console.log("---------------allp-------------", allPincodes);

                          });
                        setData((pre) => {
                          return {
                            ...pre,
                            ascCode: e.value,
                            ascName: e.label
                          }
                        })



                      }}
                      options={allASCs.map(option => ({ value: option.parameterTypeId, label: option.parameterType }))} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Division <span className="req-t">*</span></Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        if (e.target.value === 0)
                          setAllproductLine([])
                        {
                          setData((pre) => {
                            return {
                              ...pre,
                              productLineCode: [],
                            }
                          })


                        }



                        const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=${e.target.value ? e.target.value : 0}`;

                        fetch(getAllProductLine, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            console.log("-----------------r-----", result);
                            setAllproductLine(result.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })));
                            console.log("PL______________", productLine)
                          });
                        setData((pre) => {
                          return {
                            ...pre,
                            divisionCode: e.target.value
                          }
                        })
                      }}
                    >
                      <option value="0">Select</option>
                      {allDivisions?.map((documnet, index) => {
                        return (
                          <>
                            <option
                              value={documnet?.parameterTypeId}
                              key={index}
                            >
                              {documnet?.parameterType}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      Product Line <span className="req-t">*</span>
                    </Form.Label>
                    <MultiSelect
                      options={productLine}
                      value={adddata?.productLineCode}
                      onChange={function noRefCheck(e) {
                        setData((pre) => {
                          return {
                            ...pre,
                            productLineCode: e
                          }
                        })
                      }}
                      labelledBy={"Select"}
                      isCreatable={true}
                      valueRenderer={customValueRenderer}

                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      PinCodes<span className="req-t">*</span>
                    </Form.Label>
                    <MultiSelect
                      options={allPincodes}
                      value={adddata.pincodeList}
                      onChange={function noRefCheck(e) {
                        setData((pre) => {
                          return {
                            ...pre,
                            pincodeList: e
                          }
                        })
                      }}
                      labelledBy={"Select"}
                      // isCreatable={true}
                      valueRenderer={editcustomValueRenderer}



                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className="cncl-Btn" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant=""
                className="add-Btn"
                onClick={(e) => {
                  e.preventDefault();

                  const addAscPinCode = `${process.env.REACT_APP_API_URL}ASCWisePinCode/UpsertASCWisePinCode`;



                  let n = {
                    ...adddata,
                    productLineCode: adddata?.productLineCode?.map(i => i?.value)?.toString(),
                    pincodeList: adddata?.pincodeList?.map(i => ({ parameterTypeId: i.value, parameterType: i.label }))

                  }
                  console.log(n)

                  const ASC = adddata.ascCode;
                  if (!ASC) {
                    Swal.fire({
                      icon: "error",
                      title: "Please Select the ASC"
                    });
                    return;
                  }

                  const division = adddata.divisionCode;
                  if (!division || division === '0') {
                    Swal.fire({
                      icon: "error",
                      title: "Please Select the Division"
                    });
                    return;
                  }
                  const PL = n.productLineCode;
                  if (!PL || PL === '0') {
                    Swal.fire({
                      icon: "error",
                      title: "Please Select the Product Line"
                    });
                    return;
                  }

                  const PC = n?.pincodeList;
                  if (!PC || PC.length === 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Please Select the Pin Codes"
                    });
                    return;
                  }

                  else {
                    fetch(addAscPinCode, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      },
                      body: JSON.stringify(n)
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



                          if (res.status == 200 && r != "BREXISTS") {
                            Swal.fire({
                              icon: "success",
                              title: "Saved successfully!"
                            })
                            handleClose()
                            fetchAllPinCodes()


                          }
                          else if (res.status == 200 && r == "BREXISTS") {
                            Swal.fire({
                              icon: "warning",
                              title: "ASC Pin already exists!"
                            })

                          }
                        })

                      })
                  }
                }
                }
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>


          {/* -------------------------Edit ------------------ */}

          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size="xl"
          >
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit ASC Wise Pincode Master
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col md={3} >
                  <Form.Group className="mb-3">
                    <Form.Label>ASC <span className="req-t">*</span></Form.Label>
                    {/* <Form.Select
                      value={Editdata.ascCode}

                      onChange={(e) => {
                        const selectedIndex = e.target.selectedIndex;
                        if (selectedIndex === 0)
                          setallPincodes([])
                        {
                          setEditData((pre) => {
                            return {
                              ...pre,
                              pincodeList: [],
                            }
                          })

                        }
                        // setEditData((pre) => {
                        //   return {
                        //     ...pre,
                        //     ascCode: e,
                        //   }
                        // })


                        const selectedOptionCode =
                          e.target.options[selectedIndex]?.getAttribute("code");
                        setEditData((pre) => {
                          return {
                            ...pre,
                            ascId: e.target.value,
                            ascCode: selectedOptionCode
                          }
                        })
                        setselectedAscCode(selectedOptionCode);
                        const getAllPincodes = `${process.env.REACT_APP_API_URL}Asc/GetAscWisePinCode?ascCode=${selectedOptionCode ? selectedOptionCode : 0}`;

                        fetch(getAllPincodes, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            console.log("---------------rp-------------", result);
                            setallPincodes(result.map((Pin) => ({ value: Pin.parameterTypeId, label: Pin.parameterType })));
                            console.log("---------------allp-------------", allPincodes);

                          });
                        setEditData((pre) => {
                          return {
                            ...pre,
                            ascId: e.target.value,
                          }
                        })
                      }}
                    >
                      <option value="">Select</option>
                      {allASCs?.map((asc, index) => {
                        return (
                          <>
                            <option
                              value={asc?.ascCode}
                              key={index}
                              code={asc?.ascCode}
                            >
                              {asc?.name}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select> */}
                    <Select
                      aria-labelledby="aria-label"
                      value={{ label: ascFetchname }}
                      inputId="aria-example-input"
                      name="ascCode"
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          const { value, label } = selectedOption;
                          setallPincodes([]);
                          setEditData((prev) => ({
                            ...prev,
                            ascCode: value,
                            pincodeList: []
                          }));
                          setAscFetchname(label);

                          const getAllPincodes = `${process.env.REACT_APP_API_URL}Asc/GetAscWisePinCode?ascCode=${value ? value : 0}`;
                          fetch(getAllPincodes, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log("---------------rp-------------", result);
                              setallPincodes(result.map((Pin) => ({ value: Pin.parameterTypeId, label: Pin.parameterType })));
                              console.log("---------------allp-------------", allPincodes);
                            });
                        }
                      }}
                      options={allASCs.map(option => ({ value: option.parameterTypeId, label: option.parameterType }))}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Division <span className="req-t">*</span></Form.Label>
                    <Form.Select
                      value={Editdata.divisionCode}
                      onChange={(e) => {
                        if (e.target.value === 0)
                          setAllproductLine([])
                        {
                          setEditData((pre) => {
                            return {
                              ...pre,
                              productLineCode: [],
                            }
                          })


                        }


                        const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=${e.target.value ? e.target.value : 0}`;
                        fetch(getAllProductLine, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            console.log("-----------------r-----", result);
                            setAllproductLine(result.map((PL) => ({ value: PL.parameterTypeId, label: PL.parameterType })));
                            console.log("PL______________", productLine)
                          });
                        setEditData((pre) => {
                          return {
                            ...pre,
                            divisionCode: e.target.value
                          }
                        })
                      }}
                    >
                      <option value="0">Select</option>
                      {allDivisions?.map((documnet, index) => {
                        return (
                          <>
                            <option
                              value={documnet?.parameterTypeId}
                              key={index}
                            >
                              {documnet?.parameterType}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      Product Line<span className="req-t">*</span>
                    </Form.Label>
                    <MultiSelect
                      options={productLine}
                      value={Editdata?.productLineCode}
                      onChange={function noRefCheck(e) {
                        setEditData((pre) => {
                          return {
                            ...pre,
                            productLineCode: e
                          }
                        })
                      }}
                      labelledBy={"Select"}
                      isCreatable={true}
                      valueRenderer={customValueRenderer}

                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      PinCodes<span className="req-t">*</span>
                    </Form.Label>
                    <MultiSelect
                      options={allPincodes}
                      value={Editdata.pincodeList}
                      onChange={function noRefCheck(e) {
                        setEditData((pre) => {
                          return {
                            ...pre,
                            pincodeList: e
                          }
                        })
                      }}
                      labelledBy={"Select"}
                      isCreatable={true}
                      valueRenderer={editcustomValueRenderer}



                    />
                  </Form.Group>
                </Col>
              </Row>



              {/* 
<Row className='mt-3'>
</Row> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editDataUrl = `${process.env.REACT_APP_API_URL}ASCWisePinCode/UpsertASCWisePinCode`;

                let n = {
                  ...Editdata,
                  productLineCode: Editdata?.productLineCode?.map(i => i?.value)?.toString(),
                  pincodeList: Editdata?.pincodeList?.map(i => ({ parameterTypeId: i.value, parameterType: i.label }))


                }
                console.log(n)

                const ASC = Editdata.ascCode;
                if (!ASC) {
                  Swal.fire({
                    icon: "error",
                    title: "Please Select the ASC"
                  });
                  return;
                }

                const division = Editdata.divisionCode;
                if (!division || division === '0') {
                  Swal.fire({
                    icon: "error",
                    title: "Please Select the Division"
                  });
                  return;
                }
                const PL = n.productLineCode;
                if (!PL || PL === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Please Select the Product Line"
                  });
                  return;
                }



                const PC = n?.pincodeList;
                if (!PC || PC.length === 0) {
                  Swal.fire({
                    icon: "error",
                    title: "Please Select the Pin Codes"
                  });
                  return;
                }






                fetch(editDataUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(n)
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

                      if (res.status == 200 && r != "BREXISTS") {
                        Swal.fire({
                          icon: "success",
                          title: "Updated successfully!"
                        })
                        handleModalClose()
                        fetchAllPinCodes()

                      }

                      else if (res.status == 200 && r == "BREXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "ascpin code already exists!"
                        })

                      }

                    })
                  })


              }
              }
              >
                Update
              </Button>

            </Modal.Footer>
          </Modal>










          {/* -------------------------Delete------------------ */}

          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this ASC Pin?


            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}ASCWisePinCode/DeleteASCWisePinCode?ascCode=${ascCode}&isActive=${0}`;

                fetch(deleteAscUrl, {
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
                        fetchAllPinCodes()

                      }
                      else {
                        Swal.fire({
                          icon: "error",
                          title: "Something went wrong!"
                        })
                      }
                    })



                    // if(res"BREXISTS"){
                    //   alert("got it")
                    // }
                  })


                // window.location.reload()
                // else if(res.body)
                // .then((result)=>{
                //   console.log(result);

                // })
              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* ----------------------------------Active--------------------------------------- */}


          {/* <Modal show={showIsActive} onHide={handleCloseIsActive} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Activate Asc PIn Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Asc Pin Code?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}ASCWisePinCode/DeleteASCWisePinCode?ascCode=${activeID}&isActive=${1}`;

                fetch(deleteAscUrl, {
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
                        fetchAllPinCodes()




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
          </Modal> */}

          {/* ----------------------------------InActive--------------------------------------- */}

          {/* <Modal show={showIsActive1} onHide={handleCloseIsActive1} backdrop="static" centered>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>De-activate Asc PinCode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this AscPin Code?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteAscUrl = `${process.env.REACT_APP_API_URL}ASCWisePinCode/DeleteASCWisePinCode?ascCode=${activeID}&isActive=${0}`;

                fetch(deleteAscUrl, {
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
                      fetchAllPinCodes()
                    }
                    let resp = res.text()
                    resp.then((r) => {
                      console.log(r);
                      if (res.status == 200) {
                        Swal.fire({
                          icon: "success",
                          title: "De-activated successfully!"
                        })
                        handleCloseIsActive1()



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
          </Modal> */}
        </Card>
    </>
  );
}

export default ASCWisePincode;
