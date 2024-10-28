import React, { useMemo, useState, useEffect } from 'react'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEdit, FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';


function ProductCustomerDetails() {
    let token = localStorage.getItem("UserToken")


    const [allProducts, setallProducts] = useState([])

const [filtering, setfiltering] = useState(false)

      // -----------Pagination code------------------------

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
  const fetchDataPaginate = async () => {
    if (!allProducts.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustDetails`,

    );
    url.searchParams.set(
      'PageNumber',
      `${pagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${pagination?.pageSize}`);

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    
    if(!filtering){

    try {
      const response = await fetch(url.href, {
        headers: headers
      });
      const json = await response?.json();
      console.log(json);
      console.log(json[0]?.totalRows);
      setallProducts(json);
      setRowCount(json[0]?.totalRows);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
}
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };
  useEffect(() => {


    fetchDataPaginate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination?.pageIndex,
    pagination?.pageSize,
    // sorting,
  ]);








    const [filterSrNo, setfilterSrNo] = useState("")
    const [filterProductCode, setfilterProductCode] = useState("")
    const [filterDivision, setfilterDivision] = useState("")
    const [filterMobileNo, setfilterMobileNo] = useState("")
    const [filterFromDate, setfilterFromDate] = useState("")
    const [filterToDate, setfilterToDate] = useState("")
    const [filterRole, setfilterRole] = useState("")
    const [filterExtended, setfilterExtended] = useState("")


    const [filterPagination, setfilterPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
    })
    






  const fetchDataPaginateFiltered = async () => {
    if (!allProducts.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}ProdCustInfo/GetProdCustDetails`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    if (filterSrNo) { url.searchParams.set('SerialNo', `${filterSrNo}`) }
    if (filterProductCode) { url.searchParams.set('ProductCode', `${filterProductCode}`) }
    if (filterDivision) { url.searchParams.set('Division', `${filterDivision}`) }
    if (filterMobileNo) { url.searchParams.set('CustomerMobile', `${filterMobileNo}`) }
    if (filterFromDate) { url.searchParams.set('FromDate', `${filterFromDate}`) }
    if (filterToDate) { url.searchParams.set('ToDate', `${filterToDate}`) }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    try {
      const response = await fetch(url.href, {
        headers: headers
      });
      const json = await response?.json();
      console.log(json);
      console.log(json[0]?.totalRows);
      setallProducts(json);
      setRowCount(json[0]?.totalRows);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
    setfiltering(false)

  };



  useEffect(() => {








    fetchDataPaginateFiltered();


  }, [filterPagination?.pageIndex, filterPagination?.pageSize])



  const [allDivisions, setallDivisions] = useState([])



  useEffect(()=>{

    if(token){


    const getAllDivisions = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Id=0&Code=0`;

    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallDivisions(result)
      })
    }

  },[])

  

    const columns = useMemo(() => [
        {
            accessorKey: "serialNo",
            header: "Sr No.",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
        {
            accessorKey: "divisionName",
            header: "Division",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()} kw</p>,
        },
        {
            accessorKey: "customerName",
            header: "Customer Name",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
        {
            accessorKey: "contactPerson",
            header: "Contact Person",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
        {
            accessorKey: "primaryMobileNo",
            header: "Mobile No.",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
        {
            accessorKey: "emailId",
            header: "Email Id",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
        {
            accessorKey: "siteAddress",
            header: "Site Address",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
        },
       
     
        {
            accessorKey: "invoiceNo",
            header: "Invoice No.",
            Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()} kw</p>,
        },
     
       

        {
            accessorKey: "invoiceDate",
            header: "Invoice Date",
            Cell: ({ cell }) => {
                let value = cell.getValue()?.toLocaleString()?.split(" ")[0];

                let date = value?.split("/");
                let dd = date ? date[1] : "";
                let dm = date ? date[0] : "";
                let dy = date ? date[2] : "";
                let newform = date ? dd + "/" + dm + "/" + dy : "";
                return <p className="text-center m-0">{newform}</p>;
            },
        },
       
      
        {
            accessorKey: "warrantyStatus",
            header: "Warranty Status",
            Cell: ({ cell }) => (
                <p className="text-end m-0">{cell.getValue()?.toLocaleString()}</p>
            ),
        },
      

    ]);



    // const [allRoles, setallRoles] = useState([])


    // useEffect(()=>{
    //     fetch(`${process.env.REACT_APP_API_URL}Role/GetAllRoles`,{
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //           }
    //     })
    //     .then((res)=>res.json())
    //     .then((result)=>{
    //         console.log(result);
    //         setallRoles(result)
    //     })
    // },[])

  return (
    <>
     <Card
                className="border-0 p-3 m-4"
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
                <div className='d-flex justify-content-between'>

                    <p className='pg-label m-0'>Product Customer Details Report</p>

                </div>
                <hr />

                <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
                    className="m-3 p-3" >

                    <Col md={3} className=''>
                        <Form.Group>
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterSrNo}
                               onChange={(e)=>{
                                setfilterSrNo(e.target.value)
                               }}
                                placeholder=''
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className=''>
                        <Form.Group>
                            <Form.Label>Product Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterProductCode}

                                onChange={(e)=>{
                                    setfilterProductCode(e.target.value)
                                   }}
                                placeholder=''
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className=''>
                        <Form.Group>
                            <Form.Label>Division</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={filterDivision}

 onChange={(e)=>{
    setfilterDivision(e.target.value)
   }}
                            >
                                <option value="">Select</option>
                                {
                                    allDivisions?.map((division,index)=>{
                                        return(
                                            <>
                                            <option value={division?.parameterTypeId}>{division?.parameterType}</option>
                                            </>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3} className=''>
                        <Form.Group>
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterMobileNo}

                                onChange={(e)=>{
                                    setfilterMobileNo(e.target.value)
                                   }}
                                placeholder=''
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control type='date'
                                value={filterFromDate}

                             onChange={(e)=>{
                                setfilterFromDate(e.target.value)
                               }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control type='date'
                                value={filterToDate}

                             onChange={(e)=>{
                                setfilterToDate(e.target.value)
                               }}
                            />
                        </Form.Group>
                    </Col>
                    {/* <Col md={3}>
                        <Form.Group>
                            <Form.Label>Role Code
                            </Form.Label>
                            <Form.Select
                                value={filterRole}

                             onChange={(e)=>{
                                setfilterRole(e.target.value)
                               }}
                            >
                                <option value="">Select</option>
                                {
                                    allRoles?.map((role,i)=>{
                                        return(
                                            <>
                                            
                                            <option value={role?.roleCode}>{role?.roleName}</option>
                                            </>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col> */}
                    {/* <Col md={3}>
                        <Form.Group>
                            <Form.Label>Extended Warranty</Form.Label>
                            <Form.Control type='text'
                                value={filterExtended}

                             onChange={(e)=>{
                                setfilterExtended(e.target.value)
                               }}
                            />
                        </Form.Group>
                    </Col> */}
                    <Col md={3}>
                        <div style={{ paddingTop: '0.5rem' }}>
                            <Button
                                variant=""
                                className="add-Btn mt-3"
                                onClick={(e) => {
                                    setfiltering(true)
                                    setfilterPagination({
                                      pageIndex: 0,
                                      pageSize: 10
                                    })
                                    setPagination({
                                      pageIndex: 0,
                                      pageSize: 10
                                    })
              
              
                                    fetchDataPaginateFiltered()


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
                                    fontSize: '12px'
                                }}
                                onClick={() => {
                                    // fetchAllLeads
                                    setfilterPagination({
                                      pageIndex: 0,
                                      pageSize: 10
                                    })
                                    setPagination({
                                      pageIndex: 0,
                                      pageSize: 10
                                    })
                                    fetchDataPaginate()
              
                                    setfilterSrNo('');
                                    setfilterProductCode('')
                                    setfilterDivision('')
                                    setfilterMobileNo('')
                                    setfilterFromDate('')
                                    setfilterToDate('')
                                    // setfilterRole('')
                                    // setfilterDivision("");
                                    // setfilterBranch("");
                                    // setfilterRegion("");
                                    // setfilterFromDate("");
                                    // setfilterToDate("");
                                    // setfilterStatus("");
                                  }}
                            >
                                Reset
                            </Button>
                        </div>
                    </Col>



                </Row>
                <MaterialReactTable

                    columns={columns}
                    data={allProducts}
                    initialState={{ showColumnFilters: false }} //show filters by default
                    muiTableHeadCellFilterTextFieldProps={{
                        sx: { m: "0.5rem 0", width: "100%" },
                        variant: "outlined",
                    }}
                    // enableEditing
                    // onEditingRowSave={handleSaveRowEdits}
                    // onEditingRowCancel={handleCancelRowEdits}

                    // muiTableBodyRowProps={({ row }) => ({
                    //     sx: {
                    //         backgroundColor:
                    //             row?.original?.leadOverDueStatus == "Overdue"
                    //                 ? "#ff000033"
                    //                 : "",
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
                    onPaginationChange={setfilterPagination || setPagination}
                    onSortingChange={setSorting}
                    rowCount={rowCount}
                    state={
                      {
                        columnFilters,
                        globalFilter,
                        isLoading,
                        pagination: filterPagination || pagination,
                        showAlertBanner: isError,
                        showProgressBars: isRefetching,
                        sorting,
                      }
                    }

                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    padding: "10px",
                                    flexWrap: "wrap",
                                }}
                            >
                                {Permissions?.isDownload ? (
                                    <Button
                                        variant=""
                                        disabled={
                                            table.getPrePaginationRowModel().rows.length === 0
                                        }
                                        onClick={() =>
                                            handleExportRows(
                                                table.getPrePaginationRowModel().rows,

                                            )
                                        }
                                    >
                                        <LiaDownloadSolid fontSize={25} />{" "}
                                        <FaFileCsv
                                            fontSize={25}
                                            color="green"
                                            title="Download CSV"
                                        />
                                    </Button>
                                ) : (
                                    ""
                                )}

                            </div>
                        </>
                    )}


                    
                    positionActionsColumn="last"
                />




            </Card>
    </>
  )
}

export default ProductCustomerDetails