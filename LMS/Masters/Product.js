import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import { handleResponse } from '../../../Components/Generic/utility';



import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import { each } from 'lodash';
import { MultiSelect } from 'react-multi-select-component';
import Loader from '../../loader';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
function Product() {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [commonparatype, setAllCommonType] = useState([]);
  const [productlineCommonparatype, setProductlineCommonparatype] = useState([]);
  const [allproductLines, setallproductLines] = useState([])
  const [allproductGroup, setallproductGroup] = useState([])
  const [allproductName, setallproductName] = useState([])
  const [defectCategoryOptions, setDefectCategoryOptions] = useState([])
  const [serviceGroup, setServiceGroup] = useState([])
  const [vendor, setallVendor] = useState([])


  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));



  const [allDivisions, setallDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedProductLine, setSelectedProductLine] = useState('');
  const [selectedProductGroup, setSelectedProductGroup] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductLineArray, setselectedProductLineArray] = useState([]);











  // --------------------------------filters------------------------------------------

  const [allDivsForFilters, setallDivsForFilters] = useState([])
  const [allPlForFilters, setallPlForFilters] = useState([])
  const [allPgFilters, setallPgFilters] = useState([])
  const [allSgFilters, setallSgFilters] = useState([])


  const fetchFiltDivs = () => {
    fetch(`${process.env.REACT_APP_API_URL}Division/GetAllDivision`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setallDivsForFilters(result)
      })
  }

  const fetchFiltPl = () => {

  }


  const fetchFiltPg = () => {

  }


  const fetchFiltSg = () => {
    fetch(`${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Service%20Group`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setallSgFilters(result)
      })
  }


  useEffect(() => {
    fetchFiltDivs()
    // fetchFiltPg()
    // fetchFiltPl()
    fetchFiltSg()
  }, [])



  const handleClose = () => {
    setShow(false)
    setaddProduct({
      productId: 0,
      productCode: "",
      divisionCode: "",
      productLineCode: "",
      productGroupCode: "",
      productDescription: "",
      serviceGroupId: 0,
      warrantyFromBatch: '',
      warrantyFromDOI: '',
      hp: "",
      kilowatt: '',
      rewindingGroup: "",
      frameSize: "",
      isActive: true,
      vendorId: []
    })
  }
  const handleShow = () => {
    setShow(true)
    ServiceGroup()
    AllDivision()
    SapCodeProduct()




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
  const [loading, setLoading] = useState(false)











  const [filteringState, setfilteringState] = useState(false)


  // -----------Pagination------------------------

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState("0");
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

      `${process.env.REACT_APP_API_URL}Product/GetAllProduct`,

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



  const [filterdiv, setfilterdiv] = useState("")
  const [filterPl, setfilterPl] = useState("")
  const [filterpg, setfilterpg] = useState("")
  const [filtersg, setfiltersg] = useState("")

  const [pCodeFilter, setPCodeFilter] = useState('')




  const [filterPagination, setfilterPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })



  const fetchDataFiltered = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}Product/GetAllProduct`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination.pageSize}`);
    if (filterdiv) { url.searchParams.set('DivisionCode', `${filterdiv}`) }
    if (filterPl) { url.searchParams.set('ProductLineCode', `${filterPl}`) }
    if (filterpg) { url.searchParams.set('ProductGroupCode', `${filterpg}`) }
    if (filtersg) { url.searchParams.set('ServiceGroupId', `${filtersg}`) }
        if (pCodeFilter) { url.searchParams.set('ProductCode', `${pCodeFilter}`) }



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


  const fetchDataFilteredProduct = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL(

      `${process.env.REACT_APP_API_URL}Product/GetAllProduct`,

    );
    // url.searchParams.set(
    //   'PageNumber',
    //   `${filterPagination.pageIndex}`,
    // );
    // url.searchParams.set('PageSize', `${filterPagination.pageSize}`);
    // if (filterdiv) { url.searchParams.set('DivisionCode', `${filterdiv}`) }
    // if (filterPl) { url.searchParams.set('ProductLineCode', `${filterPl}`) }
    // if (filterpg) { url.searchParams.set('ProductGroupCode', `${filterpg}`) }
    // if (filtersg) { url.searchParams.set('ServiceGroupId', `${filtersg}`) }
    if (pCodeFilter) { url.searchParams.set('ProductCode', `${pCodeFilter}`) }

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


  // useEffect(() => {
  //   fetchDataFilteredProduct()
  // }), [data]
  useEffect(() => {
    fetchDataFiltered();

  }, [filterPagination?.pageIndex, filterPagination?.pageSize])







  const columns = useMemo(
    () => [

      {
        accessorKey: "divisionName",
        header: "Division",
      },

      {
        accessorKey: "productLineName",
        header: "Product Line",
      },

      {
        accessorKey: "productGroupName",
        header: "Product Group",
      },

      {
        accessorKey: "serviceGroupName",
        header: "Service Group",
      },

      {
        accessorKey: "productCode",
        header: "Product Code",
      },

      // {
      //     accessorKey: "ProductDesc",
      //     header: "Product Description",
      //   },

      {
        accessorKey: "warrantyFromBatch",
        header: "Warranty From Batch (In months)",
      },
      {
        accessorKey: "warrantyFromDOI",
        header: "Warranty From DOI (In months)",
      },
      {
        accessorKey: "hp",
        header: "HP",
      },
      {
        accessorKey: "rewindingGroup",
        header: "Rewinding Group",
      },
      {
        accessorKey: "frameSize",
        header: "Frame Size",
      },
      {
        accessorKey: "ascDays",
        header: "ASC (No of Days)",
      },
      // {
      //   accessorKey: "deviationMonth",
      //   header: "Deviation (In Months)",
      // },
      // {
      //   accessorKey: "deviationUpto",
      //   header: "Deviation upto (In Months)",
      // },
      {
        accessorKey: "noOfVendor",
        header: "vendor",
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        Cell: ({ cell }) => (
          <p>{cell.getValue() === true ? "Yes" : "No"}</p>
        ),
      },

      {
        accessorKey: "Actions",
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
                    Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
                      <IconButton
                        className="edit-btn"
                        onClick={() => {
                          console.log("-----------id-----------", cell.row.original.productId);
                          setProductID(cell.row.original.productId)
                          handleModalShow()
                          ServiceGroup()
                          AllDivision()
                          SapCodeProduct()

                        }}

                      >
                        <FaRegEdit color='#005bab' />
                      </IconButton>
                    </Tooltip> : ""
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
                    Permissions?.isDelete ? <Tooltip>
                      <IconButton className="user-btn" onClick={() => {
                        console.log(cell.row.original.productId);
                        setactiveID(cell.row.original.productId);
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
                        console.log(cell.row.original.productId);
                        setactiveID(cell.row.original.productId);
                        cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
                      }}>

                        <FaUserCheck

                          style={{ color: 'blue' }}

                        />

                      </IconButton>
                    </Tooltip> : ""
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

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label).join(", ")
      : "Select...";
  };

  const allcommonsapi = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&code=0`;
  useEffect(() => {
    fetch(allcommonsapi, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("UserToken")}`,
        "content-type": 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(rew)
      })
  }, [])










  let token = localStorage.getItem("UserToken")


  // const AllCommonParaType = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=14&Code=0
  // `;
  // useEffect(() => {

  //   fetch(AllCommonParaType, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setGlobalFilter(result)
  //     })
  // }, [])
  // const ProductLineCommonParaType = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=M3,AL`;
  // useEffect(() => {

  //   fetch(ProductLineCommonParaType, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setProductlineCommonparatype(result)
  //     })
  // }, [])



  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10, //customize the default page size
  // });



  const fetchAllProducts = () => {
    const fetchRegionOption = `${process.env.REACT_APP_API_URL}Product/GetAllProduct`;
    fetch(fetchRegionOption, {
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

  // useEffect(() => {
  //   fetchAllProducts()
  // }, [])

  const ServiceGroup = () => {

    const fetchService = `${process.env.REACT_APP_API_URL}ParaVal/GetParaValByType?parameterType=Service%20Group`;
    fetch(fetchService, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setServiceGroup(result)
      })

  }






  const [addProduct, setaddProduct] = useState({
    productId: 0,
    productCode: "",
    divisionCode: "",
    productLineCode: "",
    productGroupCode: "",
    productDescription: "",
    serviceGroupId: 0,
    warrantyFromBatch: '',
    warrantyFromDOI: '',
    hp: "",
    kilowatt: '',
    rewindingGroup: "",
    frameSize: "",
    isActive: true,
    deviationMonth: '',
    deviationUpto: "",
    vendorId: [],
    ascDays: ""
  })


  const handleChange = (e) => {
    const newdata = { ...addProduct };
    newdata[e.target.name] = e.target.value;
    setaddProduct(newdata);
    console.log(newdata);
  }

  const [editProduct, seteditProduct] = useState({
    productId: 0,
    productCode: "",
    divisionCode: "",
    productLineCode: "",
    productGroupCode: "",
    productDescription: "",
    serviceGroupId: 0,
    warrantyFromBatch: '',
    warrantyFromDOI: '',
    hp: "",
    kilowatt: '',
    rewindingGroup: "",
    frameSize: "",
    isActive: true,
    deviationMonth: '',
    deviationUpto: "",
    vendorId: [],
    ascDays: ""
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editProduct };
    newdata[e.target.name] = e.target.value;
    seteditProduct(newdata);
    console.log(newdata);
  }
  const [productId, setProductID] = useState("")

  const getSingleProduct = `${process.env.REACT_APP_API_URL}Product/GetProductById?productId=${productId}`;

  const AllDivision = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}Division/GetAllDivision`;
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




  // const [editedingProd, seteditedingProd] = useState({
  //   prodline:""
  // })


  const [selectedVendors, setselectedVendors] = useState([]);



  const [preselectedVendors, setpreselectedVendors] = useState([])

  const [editAllVendor, setEditAllVendor] = useState([])


  useEffect(() => {
    if (productId) {
      fetch(getSingleProduct, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          console.log("---------------------------");
          console.log(result?.vendorId?.split(","));
          console.log(result.vendorId);
          setselectedVendors(result?.vendorId?.split(","))
          seteditProduct((pre) => {
            return {
              ...pre,
              productId: result?.productId,
              productCode: result?.productCode,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productGroupCode: result?.productGroupCode,
              productDescription: result?.productDescription,
              serviceGroupId: result?.serviceGroupId,
              warrantyFromBatch: result?.warrantyFromBatch,
              warrantyFromDOI: result?.warrantyFromDOI,
              hp: result?.hp,
              kilowatt: result?.kilowatt,
              rewindingGroup: result?.rewindingGroup,
              frameSize: result?.frameSize,
              deviationMonth: result?.deviationMonth,
              deviationUpto: result?.deviationUpto,
              ascDays: result?.ascDays,
              vendorId: result?.vendorList.map(division => ({
                value: division.parameterTypeId,
                label: division.parameterType,

              })) || [],


            }
          })


          // const VendorObjects = result?.vendorId?.split(",")?.map(vendorID => ({ vendorId: vendorID }));
          // console.log(VendorObjects);
          // console.log(vendor);
          // const matchingVendorNames = vendor?.filter(item => VendorObjects?.some(vendors => vendors.vendorId === item.vendorId.toString()))
          //   .map(item => ({ vendorName: item.vendorName, vendorId: item.vendorId }));


          // console.log(matchingVendorNames);

          // setpreselectedVendors(matchingVendorNames)


          const fetchVendorOption = `${process.env.REACT_APP_API_URL}Vendor/GetAllVendorAsyncByProduct?divisionCode=${result.divisionCode}&productLineCode=${result.productLineCode}&productGroupCode=${result.productGroupCode}`;
          fetch(fetchVendorOption, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log('rrrrrrrrrp------------', result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })));
              setEditAllVendor(result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })))
            })


          const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${result.divisionCode}`;

          fetch(getAllProductLines, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallproductLines(result);



            })


          const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${result.productLineCode}`;
          fetch(productGroupURl, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setallproductGroup(result);
              // Set default productLineCode if result is not empty

            });

        })
    }
  }, [productId])

  const handleModalClose = () => {
    setShowModal(false)

    fetch(getSingleProduct, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log("---------------------------");
        console.log(result?.vendorId?.split(","));
        console.log(result.vendorId);
        seteditProduct((pre) => {
          return {
            ...pre,
            productId: result?.productId,
            productCode: result?.productCode,
            divisionCode: result?.divisionCode,
            productLineCode: result?.productLineCode,
            productGroupCode: result?.productGroupCode,
            productDescription: result?.productDescription,
            serviceGroupId: result?.serviceGroupId,
            warrantyFromBatch: result?.warrantyFromBatch,
            warrantyFromDOI: result?.warrantyFromDOI,
            hp: result?.hp,
            rewindingGroup: result?.rewindingGroup,
            frameSize: result?.frameSize,
            vendorId: result?.vendorList.map(division => ({ value: division.parameterTypeId, label: division.parameterType })),


          }
        })
      })


  }




  // useEffect(()=>{
  //   const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${editProduct?.divisionCode ? editProduct?.divisionCode : 0}`;

  //   fetch(getAllProductLines, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallproductLines(result);



  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product lines:', error);
  //     });
  // },[])

  const handleDivisionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDivision(selectedValue);
    setaddProduct((pre) => ({
      ...pre,
      divisionCode: selectedValue
    }));


    let divisionCodeString = selectedValue;
    console.log("divString", divisionCodeString);
    const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

    fetch(getAllProductLines, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallproductLines(result);
      })
      .catch((error) => {
        console.error('Error fetching product lines:', error);
      });
  };

  const handleProductLineChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProductLine(selectedValue);
    // Update state with the selected product line code
    setaddProduct((pre) => ({
      ...pre,
      productLineCode: selectedValue
    }));

    let divisionCodeString_two = selectedValue;
    console.log("divString", divisionCodeString_two);
    const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${divisionCodeString_two ? divisionCodeString_two : 0}`;

    fetch(getAllProductGroup, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallproductGroup(result);
      })
      .catch((error) => {
        console.error('Error fetching product lines:', error);
      });
  };
  const handleProductGroupChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProductGroup(selectedValue);
    // Update state with the selected product line code
    setaddProduct((pre) => ({
      ...pre,
      productGroupCode: selectedValue
    }));

    let divisionCodeString_three = selectedValue;
    console.log("divString", divisionCodeString_three);
    const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=12&Id=0&Code=${divisionCodeString_three ? divisionCodeString_three : 0}`;

    fetch(getAllProductGroup, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setallproductName(result);
      })
      .catch((error) => {
        console.error('Error fetching product lines:', error);
      });

  };

  // const handleProductNameChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedProductName(selectedValue);
  //   // Update state with the selected product line code
  //   setaddProduct((pre) => ({
  //     ...pre,
  //     productGroupName: selectedValue
  //   }));


  //   let divisionCodeString_four = selectedValue;
  //   console.log("divString", divisionCodeString_four);


  // };


  // const handleeditDivisionChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedDivision(selectedValue);
  //   seteditProduct((pre) => ({
  //     ...pre,
  //     divisionCode: selectedValue
  //   }));

  //   let divisionCodeString = selectedValue;
  //   console.log(divisionCodeString);
  //   console.log("divString", divisionCodeString);
  //   const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${divisionCodeString ? divisionCodeString : 0}`;

  //   fetch(getAllProductLines, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallproductLines(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product lines:', error);
  //     });
  // };
  // const handleeditProductLineChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedProductLine(selectedValue);
  //   // Update state with the selected product line code
  //   seteditProduct((pre) => ({
  //     ...pre,
  //     divisionCode: selectedValue
  //   }));

  //   let divisionCodeString_two = selectedValue;
  //   console.log("divString", divisionCodeString_two);
  //   const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${divisionCodeString_two ? divisionCodeString_two : 0}`;

  //   fetch(getAllProductGroup, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallproductGroup(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product lines:', error);
  //     });
  // };
  // const handleeditProductGroupChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedProductGroup(selectedValue);
  //   // Update state with the selected product line code
  //   seteditProduct((pre) => ({
  //     ...pre,
  //     productGroupCode: selectedValue
  //   }));

  //   let divisionCodeString_three = selectedValue;
  //   console.log("divString", divisionCodeString_three);
  //   const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=12&Id=0&Code=${divisionCodeString_three ? divisionCodeString_three : 0}`;

  //   fetch(getAllProductGroup, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setallproductName(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product lines:', error);
  //     });

  // };

  // const handleeditProductNameChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedProductName(selectedValue);
  //   // Update state with the selected product line code
  //   seteditProduct((pre) => ({
  //     ...pre,
  //     productGroupName: selectedValue
  //   }));


  //   let divisionCodeString_four = selectedValue;
  //   console.log("divString", divisionCodeString_four);


  // };





  const [sapProductCodes, setsapProductCodes] = useState([])


  const SapCodeProduct = () => {
    const getproductCodesUrl = `${process.env.REACT_APP_API_URL}SAP/GetAllSAPData?Mode=5`;
    fetch(getproductCodesUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('ssssss---', result);
        setsapProductCodes(result)
      })

  }







  useEffect(() => {
    if (addProduct && addProduct?.divisionCode, addProduct?.productLineCode, addProduct?.productGroupCode) {

      const fetchVendorOption = `${process.env.REACT_APP_API_URL}Vendor/GetAllVendorAsyncByProduct?divisionCode=${addProduct.divisionCode}&productLineCode=${addProduct.productLineCode}&productGroupCode=${addProduct.productGroupCode}`;
      fetch(fetchVendorOption, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('rrrrrrrrrp------------', result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })));
          setallVendor(result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })))
        })
    }
  }, [addProduct?.divisionCode, addProduct?.productLineCode, addProduct?.productGroupCode]


  )
  useEffect(() => {
    // if ( editProduct?.divisionCode, editProduct?.productLineCode, editProduct?.productGroupCode) {

    const fetchVendorOption = `${process.env.REACT_APP_API_URL}Vendor/GetAllVendorAsyncByProduct?divisionCode=${editProduct.divisionCode}&productLineCode=${editProduct.productLineCode}&productGroupCode=${editProduct.productGroupCode}`;
    fetch(fetchVendorOption, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('rrrrrrrrrp------------', result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })));
        setEditAllVendor(result.map((vendor) => ({ value: vendor.vendorId, label: vendor.vendorName })))
      })
    // }
  }, [editProduct?.divisionCode, editProduct?.productLineCode, editProduct?.productGroupCode]


  )


  const customHeaders = {
    divisionName: 'Division',
    productLineName: 'Product Line ',
    productGroupName: 'Product Group',
    serviceGroupName: 'Service Group',
    warrantyFromBatch: 'Warranty From Batch (In Months)',
    warrantyFromDOI: 'Warranty From DOI (In Months)',
    frameSize: 'Frame Size',
    rewindingGroup: 'Rewinding Group',
    hp: 'HP',
    divisionCode: 'Division Code',
    productLineCode: 'Product Line Code',
    productGroupCode: 'Product Group Code',
    productCode: 'Product Code',
    productDescription: "Product Description",




  }

  return (
    <>
      <Card
        className="border-0 p-3 m-4"
        //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
        style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
      >
        <div className='d-flex justify-content-between'>

          <p className='pg-label m-0'>Product Master</p>
          {Permissions?.isAdd ? <Row className=''><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Product</Button></Col></Row> : ""}

        </div>
        <hr />



        <Form>

          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3">

            <Col md={2}>
              <Form.Group>
                <Form.Label>Division</Form.Label>
                <Form.Select
                  name='divisionCode'

                  onChange={(e) => {
                    setfilterdiv(e.target.value)
                    setallPlForFilters([])
                    setallPgFilters([])

                    fetch(`${process.env.REACT_APP_API_URL}ProductLine/GetAllProductLine?DivisionCode=${e.target.value}`, {
                      headers: {
                        "Authorization": `Bearer ${token}`
                      }
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        setallPlForFilters(result)
                      })
                  }}
                >
                  <option value='0'>Select</option>
                  {
                    allDivsForFilters?.map((division, index) => {
                      return (
                        <>
                          <option value={division?.divisionCode}>{division?.divisionName}</option>
                        </>
                      )
                    })
                  }

                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Product Line</Form.Label>
                <Form.Select
                  name='productLineCode'
                  onChange={(e) => {
                    setfilterPl(e.target.value)
                    setallPgFilters([])


                    fetch(`${process.env.REACT_APP_API_URL}ProductGroup/GetAllProductGroup?ProductLineCode=${e.target.value}`, {
                      headers: {
                        "Authorization": `Bearer ${token}`
                      }
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        setallPgFilters(result)
                      })
                  }}
                >
                  <option value="">Select</option>
                  {
                    allPlForFilters?.map((pl, i) => {
                      return (
                        <>
                          <option value={pl?.productLineCode}>{pl?.productLineName}</option>
                        </>
                      )
                    })
                  }

                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Product Group</Form.Label>
                <Form.Select
                  name='productGroupCode'
                  onChange={(e) => setfilterpg(e.target.value)}
                >
                  <option>Select</option>
                  {
                    allPgFilters?.map((pg, i) => {
                      return (
                        <>
                          <option value={pg?.productGroupCode}>{pg?.productGroupName}</option>
                        </>
                      )
                    })
                  }

                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Service Group</Form.Label>
                <Form.Select
                  name='productGroupCode'
                  onChange={(e) => setfiltersg(e.target.value)}
                >
                  <option>Select</option>
                  {
                    allSgFilters?.map((sg, i) => {
                      return (
                        <>
                          <option value={sg?.parameterValId}>{sg?.parameterText}</option>
                        </>
                      )
                    })
                  }

                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Product Code</Form.Label>
                <Form.Control type='text' onChange={(e) => setPCodeFilter(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <div className="pt-2">
                <Button
                  variant=""
                  className="add-Btn mt-3"
                  onClick={(e) => {

                    if (pCodeFilter) {
                      fetchDataFilteredProduct()

                    }
                    else {
                      setfilterPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })
                      setPagination({
                        pageIndex: 0,
                        pageSize: 10
                      })


                      fetchDataFiltered()
                    }


                  }}


                >
                  Search
                </Button>
                <Button
                  variant=""
                  type='reset'
                  className="m-2 mt-4"
                  style={{
                    backgroundColor: "#005bab",
                    color: "white",
                    height: "fit-content",
                    fontSize: "12px"
                  }}
                  onClick={() => {
                    setfilterPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    setPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    fetchData()

                    setfilterdiv("")
                    setfilterPl("")
                    setfilterpg("")
                    setfiltersg("")


                  }}
                >
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>


        {
          Permissions?.isView ?

            <MaterialReactTable
              columns={columns}
              data={data}

              initialState={{ showColumnFilters: false }} //show filters by default
              // enablePagination

              muiExpandButtonProps={({ row, table }) => ({
                onClick: () => { table.setExpanded({ [row.id]: !row.getIsExpanded() }) }, //only 1 detail panel open at a time
                sx: {
                  transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.2s',
                },
              })}

              enableExpandAll={false}
              renderDetailPanel={({ row }) => {
                let list1 = row.original.vendorId?.split(",")

                // console.log(list1);

                return (

                  (row.original.vendorId) ? (
                    <Box
                    >
                      <div className='d-flex' style={{ border: "1px solid", width: "max-content" }}>
                        {list1 ?

                          <div className='p-3' style={{ borderRight: "1px solid" }}>
                            <p style={{ fontSize: "16px", fontWeight: "600" }}>Vendor</p>
                            <ul>
                              {
                                list1?.map((Vendor, index) => {
                                  return (
                                    <>
                                      <li>{Vendor}</li>

                                    </>
                                  )
                                })
                              }

                            </ul>
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

              // initialState={{ showColumnFilters: false }}
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
              // {
              //                   cell.row.original.isActive==false?"":
              //         <Tooltip arrow placement="left" title="Edit">
              //           <IconButton
              //             className="edit-btn"
              //             onClick={() => {
              //               console.log(cell.row.original.productId);
              //               setProductID(cell.row.original.productId)
              //               handleModalShow()
              //             }}
              //           >
              //             <FaRegEdit color='#005bab' />
              //           </IconButton>
              //         </Tooltip>
              //     }
              //     {
              //                   cell.row.original.isActive==false?"":
              //         <Tooltip arrow placement="right" title="Delete">
              //           <IconButton
              //             color="error"
              //             onClick={() => {
              //               setProductID(cell.row.original.productId)
              //               console.log(cell.row.original.productId)
              //               handleShowDel()

              //             }}

              //           >
              //             <HiOutlineTrash color='red' />
              //           </IconButton>
              //         </Tooltip>
              //     }
              //       </Box>
              //     )}

              manualPagination={true}
              muiToolbarAlertBannerProps={isError
                ? {
                  color: 'error',
                  children: 'Error loading data',
                }
                : undefined}
              onColumnFiltersChange={setColumnFilters}
              onGlobalFilterChange={setGlobalFilter}
              // onGlobalFilterChange={() => {
              //   fetch(
              //     `${process.env.REACT_APP_API_URL}Product/GetAllProduct?DivisionCode=CP&ProductLineCode=C2&PageSize=10&PageNumber=0`,
              //     {
              //       headers: {
              //         Authorization: `Bearer ${token}`,
              //       },
              //     }
              //   )
              //     .then((res) => res.json())
              //     .then((result) => {
              //       console.log(result)
              //       // setGlobalFilter(result)

              //     })
              // }}
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


                            "noOfVendor",
                            "totalRows",
                            "vendorList",
                            "productId",

                            "serviceGroupId",
                            "isActive",
                            "vendorId",
                            "kilowatt"




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


              positionActionsColumn="first"
            /> : ""
        }


        <Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
          <Modal.Header closeButton>

            <Modal.Title className='mdl-title'>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            {
              loading ? (<Loader />) : (

                <><Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                      <Form.Select
                        name='divisionCode'
                        onChange={(e) => {
                          if (e.target.value === 0)
                            setallVendor([]);
                          setallproductLines([])
                          setallproductGroup([])
                          {
                            setaddProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: [],
                                productLineCode: '',
                                productGroupCode: ''
                              };
                            });

                          }
                          setaddProduct((pre) => {
                            return {
                              ...pre,
                              divisionCode: e.target.value
                            };
                          });


                          const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;

                          fetch(getAllProductLines, {
                            headers: {
                              "Authorization": `Bearer ${token}`
                            }
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setallproductLines(result);
                            });
                          const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                          fetch(productGroupURl, {
                            headers: {
                              "Authorization": `Bearer ${token}`
                            }
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setallproductGroup(result);
                              // Set default productLineCode if result is not empty
                            });

                        }}>
                        <option value='0'>Select</option>
                        {allDivisions.map((division) => (
                          <option key={division.divisionCode} value={division.divisionCode}>
                            {division.divisionName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                      <Form.Select
                        name='productLineCode'
                        onChange={(e) => {
                          if (e.target.value === 0)
                            setallVendor([]);
                          {
                            setaddProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: []
                              };
                            });

                          }
                          setaddProduct((pre) => {
                            return {
                              ...pre,
                              productLineCode: e.target.value
                            };
                          });

                          const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                          fetch(productGroupURl, {
                            headers: {
                              "Authorization": `Bearer ${token}`
                            }
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setallproductGroup(result);
                              // Set default productLineCode if result is not empty
                            });
                        }}>
                        <option>Select</option>
                        {allproductLines.map((productLine) => (
                          <option key={productLine.productLineCode} value={productLine.parameterTypeId}>
                            {productLine.parameterType}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Product Group <span className='req-t'>*</span></Form.Label>
                      <Form.Select
                        name='productGroupCode'
                        onChange={(e) => {
                          if (e.target.value === 0)
                            setallVendor([]);
                          {
                            setaddProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: []
                              };
                            });

                          }
                          setaddProduct((pre) => {
                            return {
                              ...pre,
                              productGroupCode: e.target.value
                            };
                          });
                        }}>
                        <option>Select</option>
                        {allproductGroup.map((productLine) => (
                          <option key={productLine.productGroupCode} value={productLine.parameterTypeId}>
                            {productLine.parameterType}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>SAP Product Code <span className='req-t'>*</span></Form.Label>
                      <Select
                        aria-labelledby="aria-label"

                        inputId="aria-example-input"
                        name=""
                        onChange={(e) => {
                          console.log(e);
                          setaddProduct((pre) => {
                            return {
                              ...pre,
                              productCode: e.value,
                              productDescription: e.label
                            };
                          });
                        }}
                        options={sapProductCodes.map(option => ({ value: option.sapCode, label: option.sapName }))} />
                    </Form.Group>
                  </Col>



                </Row>

                  <Row className='mt-3'>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Product Description <span className='req-t'>*</span></Form.Label>
                        <Form.Control as="textarea"
                          name='productDescription'
                          value={addProduct?.productDescription}
                          readOnly
                          onChange={handleChange}
                          maxLength={300}

                          rows={1} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Service Group </Form.Label>
                        <Form.Select aria-label="Default select example"
                          name='serviceGroupId'
                          onChange={handleChange}
                        >
                          <option>Select</option>
                          {serviceGroup.map((service) => (
                            <option key={service.parameterTypeId} value={service.parameterValId}>
                              {service.parameterText}
                            </option>
                          ))}

                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Warranty From Batch <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='text'
                          name='warrantyFromBatch'
                          onChange={handleChange}
                          placeholder='in months' />
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>
                    {/* warranty from DOI cannot be greater than warranty from batch  */}
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Warranty From DOI <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='text'
                          name='warrantyFromDOI'
                          onChange={handleChange}

                          placeholder='in months' />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>HP</Form.Label>
                        <Form.Control type='text'
                          name='hp'
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Rewinding Group</Form.Label>
                        <Form.Control type='text'
                          name='rewindingGroup'
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Frame Size</Form.Label>
                        <Form.Control type='text'
                          name='frameSize'
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>KW</Form.Label>
                        <Form.Control type='text'
                          name='kilowatt'
                          onChange={handleChange}


                        />
                      </Form.Group>
                    </Col>



                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Vendor</Form.Label>
                        <MultiSelect
                          options={vendor}
                          value={addProduct?.vendorId}
                          onChange={function noRefCheck(e) {
                            console.log('vvvv', e);
                            setaddProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: e
                              };
                            });


                          }}
                          labelledBy={"Select"}
                          isCreatable={true}
                          valueRenderer={customValueRenderer} />
                      </Form.Group>
                    </Col>

                    {/* <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>ASC (No of Days) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='ascDays'
                          value={editProduct.productCode}
                          onChange = { handleChange }
                          
                        {(s(addProduct?.deviationMonth !="") && (parseInt(addProduct?.warrantyFromBatch) > parseInt(addProduct?.deviationMonth)))?<p className='req-t'>Deviation month should be equal or greater than warranty from batch</p>:""}
                      </Form.Group>
                    </Col> */}

                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Deviation (In Months) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='deviationMonth'
                          // value={editProduct.productCode}
                          onChange={handleChange}

                        // disabled
                        />
                        {((addProduct?.deviationMonth != "") && (parseInt(addProduct?.warrantyFromBatch) > parseInt(addProduct?.deviationMonth))) ? <p className='req-t'>Deviation month should be equal or greater than warranty from batch</p> : ""}
                      </Form.Group>
                    </Col>




                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Deviation upto (In Months) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='deviationUpto'
                          value={((addProduct?.deviationMonth && addProduct?.warrantyFromBatch) && (addProduct?.deviationMonth - addProduct?.warrantyFromBatch > 0)) ? addProduct?.deviationMonth - addProduct?.warrantyFromBatch : 0}
                          onChange={handleChange}

                        // disabled
                        />
                      </Form.Group>
                    </Col>

                  </Row></>
              )}



          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='cncl-Btn' onClick={handleClose}>
              Close
            </Button>
            <Button variant="" className='add-Btn' disabled={(addProduct?.deviationMonth != "" && addProduct?.deviationMonth < addProduct?.warrantyFromBatch)} onClick={(e) => {
              e.preventDefault();
              const addBranchUrl = `${process.env.REACT_APP_API_URL}Product/UpsertProduct`;
              const productCodeString = addProduct.vendorId.map(product => product.value).join(',')

              let data = {
                ...addProduct,
                vendorId: productCodeString,
              }

              // if (addProduct.productCode === "" || addProduct.divisionCode === "" || addProduct.productLineCode === "" || addProduct.productGroupCode === "" || addProduct.productDescription === "" ||  addProduct.warrantyFromBatch === "" || addProduct.warrantyFromDOI === "") {
              //   Swal.fire({
              //     icon: "error",
              //     title: "Please fill all the fields marked with red *"
              //   })
              // }



              const divisionName = data.divisionCode;
              if (!divisionName || divisionName === '0') {
                Swal.fire({
                  icon: "error",
                  title: "Division is required "
                });
                return;
              }

              const productLineCode = data.productLineCode;
              if (!productLineCode || productLineCode === '') {
                Swal.fire({
                  icon: "error",
                  title: "Product Line is required"
                });
                return;
              }

              console.log(divisionName)
              const productGroupCode = data.productGroupCode;
              if (divisionName != "M7" && (!productGroupCode || productGroupCode === '')) {
                Swal.fire({
                  icon: "error",
                  title: "Product group is required"
                });
                return;
              }

              const productCode = data.productCode;
              if (!productCode) {
                Swal.fire({
                  icon: "error",
                  title: "Sap product code is required"
                });
                return;
              }

              const productDescription = data.productDescription;
              if (!productDescription) {
                Swal.fire({
                  icon: "error",
                  title: "product Descriptionis required "
                });
                return;
              }

              const warrantyFromBatch = addProduct.warrantyFromBatch;
              const warrantyFromBatchRegex = /^[0-9/s]+$/;

              if (!warrantyFromBatch) {
                Swal.fire({
                  icon: "error",
                  title: "Warranty From Batch is required"
                });
                return;
              } else if (!warrantyFromBatch.match(warrantyFromBatchRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "Warranty From Batch must contain only digits number"
                });
                return;
              }

              const warrantyFromDOI = addProduct.warrantyFromDOI;
              const warrantyFromDOIRegex = /^[0-9/s]+$/;

              if (!warrantyFromDOI) {
                Swal.fire({
                  icon: "error",
                  title: "Warranty From DOI is required"
                });
                return;
              } else if (!warrantyFromDOI.match(warrantyFromDOIRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "Warranty From DOI must contain only digits number"
                });
                return;
              }
              const hp = addProduct.hp;
              const hpRegex = /^[a-zA-Z0-9]+$/; // This regex ensures hp contains only alphanumeric characters

              if (hp && !hp.match(hpRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "HP must contain only alphanumeric characters"
                });
                return;
              }
              const KW = addProduct.kilowatt;
              const KWRegex = /^[a-zA-Z0-9]+$/; // This regex ensures hp contains only alphanumeric characters

              if (KW && !KW.match(KWRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "KW must contain only alphanumeric characters"
                });
                return;
              }


              // const ascDays = data.ascDays;
              // if (!ascDays) {
              //   Swal.fire({
              //     icon: "error",
              //     title: "ASC (No of Days) is required "
              //   });
              //   return;
              // }

              const deviation = data.deviationMonth;
              if (!deviation) {
                Swal.fire({
                  icon: "error",
                  title: "Deviation is required "
                });
                return;
              }


              const deviationUpto = data.deviationUpto;

              if (!deviationUpto) {
                Swal.fire({
                  icon: "error",
                  title: "Deviation Upto is required"
                });
              }


              setLoading(true)

              fetch(addBranchUrl, {
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





                    if (res.status == 200 && r != "PRODCODEEXISTS") {
                      Swal.fire({
                        icon: "success",
                        title: "Saved successfully!"
                      })
                      handleClose()
                      fetchAllProducts()
                      setLoading(false)


                    }
                    else if (res.status == 200 && r == "PRODCODEEXISTS") {
                      Swal.fire({
                        icon: "warning",
                        title: "Product already exists!"
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






        {/* ----------------------------------------edit-------------------------------------- */}



        <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='xl'>
          <Modal.Header closeButton>
            <Modal.Title className='mdl-title'>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            {
              loading ? (<Loader />) : (

                <><Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Division <span className='req-t'>*</span></Form.Label>
                      <Form.Select
                        name='divisionCode'
                        value={editProduct.divisionCode}
                        disabled
                        // onChange={(e) => {
                        //   seteditProduct((pre) => {
                        //     return {
                        //       ...pre,
                        //       divisionCode: e.target.value,

                        //     };
                        //   });
                        onChange={(e) => {


                          seteditProduct((pre) => {
                            return {
                              ...pre,
                              divisionCode: e.target.value
                            }
                          })
                          if (e.target.value === 0)
                            setEditAllVendor([]);
                          {
                            seteditProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: [],
                                productLineCode: '',
                                productGroupCode: ''
                              };
                            });

                          }



                          const getAllProductLines = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Id=0&Code=${e.target.value}`;

                          fetch(getAllProductLines, {
                            headers: {
                              "Authorization": `Bearer ${token}`
                            }
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setallproductLines(result);



                            });

                        }}
                      >
                        <option value='0'>Select</option>
                        {allDivisions.map((division) => (
                          <option value={division.divisionCode}>
                            {division.divisionName}
                          </option>
                        ))}


                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Product Line <span className='req-t'>*</span></Form.Label>
                      <Form.Select aria-label="Default select example" disabled name='productLineCode'
                        value={editProduct?.productLineCode}
                        onChange={(e) => {
                          console.log(e.target.value);
                          if (e.target.value === 0)
                            setEditAllVendor([])
                          {
                            seteditProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: [],
                              }
                            })

                          }
                          seteditProduct((pre) => ({
                            ...pre,
                            productLineCode: e.target.value,
                            vendorId: [],

                          }));

                          // let divisionCodeString_two = e.target.value;
                          // console.log("divString", divisionCodeString_two);
                          const productGroupURl = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Id=0&Code=${e.target.value}`;
                          fetch(productGroupURl, {
                            headers: {
                              "Authorization": `Bearer ${token}`
                            }
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              console.log(result);
                              setallproductGroup(result);
                              // Set default productLineCode if result is not empty
                            });
                        }}>
                        <option>Select</option>
                        {allproductLines?.map((state, index) => (
                          <option value={state?.parameterTypeId}>{state?.parameterType}</option>
                        ))}
                      </Form.Select>


                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Product Group
                        {addProduct.divisionCode != "M7" && <span className='req-t'>*</span>}
                      </Form.Label>
                      <Form.Select aria-label="Default select example"
                        name='productGroupCode'
                        disabled
                        value={editProduct.productGroupCode}
                        onChange={(e) => {
                          if (e.target.value === 0)
                            setEditAllVendor([])
                          {
                            seteditProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: [],
                              }
                            })

                          }

                          seteditProduct((pre) => {
                            return {
                              ...pre,
                              productGroupCode: e.target.value,
                              vendorId: [],


                            }
                          })
                        }}
                      >
                        <option>Select</option>
                        {allproductGroup.map((productLine) => (
                          <option value={productLine.parameterTypeId}>
                            {productLine.parameterType}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Product Code <span className='req-t'>*</span></Form.Label>
                      <Form.Control
                        type='text'
                        name='productCode'
                        value={editProduct.productCode}
                        onChange={handleChangeEdit}
                        disabled
                      />
                    </Form.Group>
                  </Col>



                </Row>

                  <Row className='mt-3'>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Product Description <span className='req-t'>*</span></Form.Label>
                        <Form.Control as="textarea"
                          name='productDescription'
                          value={editProduct.productDescription}
                          onChange={handleChangeEdit}
                          maxLength={300}
                          rows={1}
                          disabled />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Service Group </Form.Label>
                        <Form.Select aria-label="Default select example"
                          name='serviceGroupId'
                          value={editProduct.serviceGroupId}
                          onChange={handleChangeEdit}
                        >
                          <option>Select</option>
                          {serviceGroup.map((service) => (
                            <option value={service.parameterValId}>
                              {service.parameterText}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Warranty From Batch <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='text'
                          name='warrantyFromBatch'
                          value={editProduct.warrantyFromBatch}
                          onChange={handleChangeEdit}
                          placeholder='in months' />
                      </Form.Group>
                    </Col>

                  </Row>


                  <Row className='mt-3'>
                    {/* warranty from DOI cannot be greater than warranty from batch  */}
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Warranty From DOI <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='text'
                          name='warrantyFromDOI'
                          value={editProduct.warrantyFromDOI}
                          onChange={handleChangeEdit}
                          placeholder='in months'
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>HP</Form.Label>
                        <Form.Control type='text'
                          name='hp'
                          value={editProduct.hp}
                          onChange={handleChangeEdit}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Rewinding Group</Form.Label>
                        <Form.Control type='text'
                          name='rewindingGroup'
                          value={editProduct.rewindingGroup}
                          onChange={handleChangeEdit}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Frame Size</Form.Label>
                        <Form.Control type='text'
                          name='frameSize'
                          value={editProduct.frameSize}
                          onChange={handleChangeEdit}

                        />
                      </Form.Group>
                    </Col>
                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>KW</Form.Label>
                        <Form.Control type='text'
                          name='kilowatt'
                          value={editProduct.kilowatt}
                          onChange={handleChangeEdit}

                        />
                      </Form.Group>
                    </Col>


                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Vendor</Form.Label>
                        <MultiSelect
                          options={editAllVendor}
                          value={editProduct?.vendorId}
                          onChange={function noRefCheck(e) {
                            console.log('eeeeeeeeeeeeee', e);
                            seteditProduct((pre) => {
                              return {
                                ...pre,
                                vendorId: e
                              };
                            });


                          }}
                          labelledBy={"Select"}
                          isCreatable={true}
                          valueRenderer={customValueRenderer} />
                      </Form.Group>
                    </Col>

                    {/* <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>ASC (No of Days) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='ascDays'
                          value={editProduct?.ascDays}
                          onChange={handleChangeEdit} */}
                    {/* disabled */}
                    {/* /> */}
                    {/* {(editProduct?.deviationMonth !="" && editProduct?.deviationMonth<editProduct?.warrantyFromBatch)?<p className='req-t'>Deviation month should be equal or greater than warranty from batch</p>:""} */}

                    {/* </Form.Group> */}
                    {/* </Col> */}

                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Deviation (In Months) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='deviationMonth'
                          value={editProduct?.deviationMonth}
                          onChange={handleChangeEdit}
                        // disabled
                        />
                        {(editProduct?.deviationMonth != "" && editProduct?.deviationMonth < editProduct?.warrantyFromBatch) ? <p className='req-t'>Deviation month should be equal or greater than warranty from batch</p> : ""}

                      </Form.Group>
                    </Col>

                    <Col md={3} className='mt-3'>
                      <Form.Group>
                        <Form.Label>Deviation upto (In Months) <span className='req-t'>*</span></Form.Label>
                        <Form.Control
                          type='number'
                          name='deviationUpto'
                          value={editProduct?.deviationUpto}

                          onChange={handleChangeEdit}
                        // disabled
                        />
                      </Form.Group>
                    </Col>

                  </Row></>
              )}



          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="" className='add-Btn' /*disabled={(editProduct?.deviationMonth !="" && editProduct?.deviationMonth<editProduct?.warrantyFromBatch)}*/ onClick={async (e) => {
              e.preventDefault();
              const editProductUrl = `${process.env.REACT_APP_API_URL}Product/UpsertProduct`;

              const productCodeString = editProduct.vendorId?.map(product => product.value).join(',') || '0'
              // console.log(productCodeString,'------------------------------ppp')

              let data = {
                ...editProduct,
                vendorId: productCodeString,
              }
              console.log(e);

              //  console.log(user);



              // if (editProduct.productCode === "" || editProduct.divisionCode === "" || editProduct.editLineCode === "" || editProduct.productGroupCode === "" || editProduct.productDescription === "" || editProduct.serviceGroupId === "" || editProduct.warrantyFromBatch === "" || editProduct.warrantyFromDOI === "" || editProduct.hp === "" || editProduct.rewindingGroup === "" || editProduct.frameSize === "" || editProduct.vendorId === "") {
              //   Swal.fire({
              //     icon: "error",
              //     title: "Please fill all the fields marked with red *!"
              //   })


              const divisionName = editProduct.divisionCode;
              if (!divisionName || divisionName === 'Select') {
                Swal.fire({
                  icon: "error",
                  title: "Division is required "
                });
                return;
              }

              const productLineCode = editProduct.productLineCode;
              if (!productLineCode || productLineCode === 'Select') {
                Swal.fire({
                  icon: "error",
                  title: "Product line is required"
                });
                return;
              }


              const productGroupCode = editProduct.productGroupCode;
              if (!productGroupCode || productGroupCode === 'Select') {
                Swal.fire({
                  icon: "error",
                  title: "Product Group is required"
                });
                return;
              }

              const productCode = editProduct.productCode;
              if (!productCode) {
                Swal.fire({
                  icon: "error",
                  title: "Sap product code is required"
                });
                return;
              }

              const productDescription = editProduct.productDescription;
              if (!productDescription) {
                Swal.fire({
                  icon: "error",
                  title: "product Descriptionis required"
                });
                return;
              }
              const warrantyFromBatch = editProduct.warrantyFromBatch;
              if (!warrantyFromBatch) {
                console.error("Validation failed. warrantyFromBatch is empty");
                Swal.fire({
                  icon: "error",
                  title: "warrantyFromBatch is required"
                });
                return;
              }
              // Check if longLastingTickitHour is not a number or contains spaces within the number
              if (typeof warrantyFromBatch !== 'number' && !/^[0-9]+$/.test(warrantyFromBatch.toString())) {
                console.error("sequenceNo:", warrantyFromBatch);
                Swal.fire({
                  icon: "error",
                  title: "Warranty From Batch Require only digiit number"
                });
                return;
              }

              const warrantyFromDOI = editProduct.warrantyFromDOI;

              // Check if longLastingTickitHour is empty
              if (!warrantyFromDOI) {
                console.error("Validation failed. warrantyFromDOI is empty");
                Swal.fire({
                  icon: "error",
                  title: "Warranty From DOI is required"
                });
                return;
              }
              if (typeof warrantyFromDOI !== 'number' && !/^[0-9]+$/.test(warrantyFromDOI.toString())) {
                console.error("Warranty From DOI:", warrantyFromDOI);
                Swal.fire({
                  icon: "error",
                  title: "Warranty From DOI Require only digiit number"
                });
                return;
              }


              const hp = editProduct.hp;
              const hpRegex = /^[a-zA-Z0-9]+$/; // This regex ensures hp contains only alphanumeric characters

              if (hp && !hp.match(hpRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "HP must contain only alphanumeric characters"
                });
                return;
              }
              const KW = editProduct.kilowatt;
              const KWRegex = /^[a-zA-Z0-9]+$/; // This regex ensures hp contains only alphanumeric characters

              if (KW && !KW.match(KWRegex)) {
                Swal.fire({
                  icon: "error",
                  title: "KW must contain only alphanumeric characters"
                });
                return;
              }

              // const ascDays = editProduct.ascDays;
              // if (!ascDays) {
              //   Swal.fire({
              //     icon: "error",
              //     title: "ASC (No of Days) is required "
              //   });
              //   return;
              // }
              // const  deviation=editProduct.deviationMonth;
              // if (!deviation) {
              //   Swal.fire({
              //     icon: "error",
              //     title: "Deviation is required "
              //   });
              //   return;
              // }
              console.log(data);
              setLoading(true)
              fetch(editProductUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
              })
                .then((res) => {
                  let resp = res.text()
                  resp.then((r) => {
                    console.log(r);
                    setLoading(false)


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


                    if (res.status == 200 && r != "UEXISTS") {
                      Swal.fire({
                        icon: "success",
                        title: "Update successfully!"
                      })
                      handleModalClose()
                      fetchAllProducts()
                      setLoading(false)


                    }
                    else if (res.status == 200 && r == "UEXISTS") {
                      Swal.fire({
                        icon: "warning",
                        title: "User already exists!"
                      })
                      setLoading(false)


                    }
                  })
                })

            }}>
              Update

            </Button>
          </Modal.Footer>
        </Modal>








        {/* --------------------------------------------delete-------------------------------------------- */}

        <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
          <Modal.Header closeButton>
            <Modal.Title className='mdl-title'>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure, you want to delete this Product?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
              No
            </Button>
            <Button variant="" className='add-Btn' onClick={(e) => {
              e.preventDefault();

              const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Product/DeleteProduct?productId=${productId}&isActive=${0}`;

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
                      fetchAllProducts()

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
            <Modal.Title className='mdl-title'>Activate Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to activate this Product?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
              No
            </Button>
            <Button variant="" className='add-Btn' onClick={(e) => {
              e.preventDefault();

              const deleteProductUrl = `${process.env.REACT_APP_API_URL}Product/DeleteProduct?productId=${activeID}&isActive=${1}`;





              fetch(deleteProductUrl, {
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
                      fetchAllProducts()

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
            <Modal.Title className='mdl-title'>De-activate Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to de-activate this Product?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
              No
            </Button>
            <Button variant="" className='add-Btn' onClick={(e) => {
              e.preventDefault();

              const deleteProductUrl = `${process.env.REACT_APP_API_URL}Product/DeleteProduct?productId=${activeID}&isActive=${0}`;





              fetch(deleteProductUrl, {
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
                    fetchAllProducts()
                  }



                  //  let resp = res.text()
                  //   resp.then((r) => {
                  //     console.log(r);
                  //     if (res.status == 200) {
                  //       Swal.fire({
                  //         icon: "success",
                  //         title: "De-activated successfully!"
                  //       })
                  //       handleCloseIsActive1()
                  //       fetchAllProducts()

                  //     }
                  //     else{
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

export default Product