import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import Multiselect from 'multiselect-react-dropdown';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";



import { Box, IconButton, Tooltip, Switch } from '@mui/material';
import { result } from 'lodash';
import Loader from '../../loader';
function Defect() {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [product, setAllproduct] = useState([]);
  const [defectCategory, setAllDefectCategory] = useState([]);
  const [productGroup, setAllproductGroup] = useState([]);
  const [productLine, setAllproductLine] = useState([]);
  const [allproductLines, setallproductLines] = useState([])
  const [allproductGroup, setallproductGroup] = useState([])
  const [allproductName, setallproductName] = useState([])
  const [defectCategoryOptions, setDefectCategoryOptions] = useState([])
  const [defectFilterCategoryOptions, setFilterDefectCategoryOptions] = useState([])

  const [allDivisions, setallDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedProductLine, setSelectedProductLine] = useState('');
  const [selectedProductGroup, setSelectedProductGroup] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [loading, setLoading] = useState(false)



  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [showIsActive, setIsActive] = useState(false);
  const handleCloseIsActive = () => setIsActive(false);
  const handleShowIsActive = () => setIsActive(true);
  const [showIsActive1, setIsActive1] = useState(false);
  const handleCloseIsActive1 = () => setIsActive1(false);
  const handleShowIsActive1 = () => setIsActive1(true);
  const [isActive, setisActive] = useState("")










  const handleShow = () => {
    setShow(true)
    ALLDivision()
  }
  const handleModalShow = () => setShowModal(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  let token = localStorage.getItem("UserToken")

  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  const [activeID, setactiveID] = useState(0)
  // -----------Pagination------------------------
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

      `${process.env.REACT_APP_API_URL}Defect/GetAllDefect`,

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
  }, [
    pagination?.pageIndex,
    pagination?.pageSize,

  ]);
  //--------------------------filter Code------------------------//
  const [filterDivisionName, setFilterDivisionName] = useState('')
  const [filterProductLineName, setFilterProductLineName] = useState('')
  const [filterProductGroup, setFilterProductGroup] = useState('')
  const [filterProductCategory, setFilterProductcategory] = useState('')
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

      `${process.env.REACT_APP_API_URL}Defect/GetAllDefect`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    
    if (filterDivisionName) {url.searchParams.set('DivisionCode',`${filterDivisionName}`);}
    if (filterProductLineName) {url.searchParams.set('ProductLineCode',`${filterProductLineName}`);}
    if (filterProductGroup) {url.searchParams.set('ProductGroupCode',`${filterProductGroup}`);}
    if (filterProductCategory) {url.searchParams.set('DefectCategoryId',`${filterProductCategory}`);}




        
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
        accessorKey: "defectCategoryName",
        header: "Defect Category",
      },
      {
        accessorKey: "defectDesc",
        header: "Defect Description",
      },
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
                    Permissions?.isEdit ? <Tooltip arrow placement="left" title="Edit">
                      <IconButton
                        className="edit-btn"
                        onClick={() => {
                          console.log(cell.row.original.defectId);
                          setdefectID(cell.row.original.defectId)
                          handleModalShow()
                          ALLDivision()


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
                        console.log(cell.row.original.defectId);
                        setactiveID(cell.row.original.defectId);
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
                        console.log(cell.row.original.defectId);
                        setactiveID(cell.row.original.defectId);
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
    initialState: { showColumnFilters: true },
    manualPagination: true,
    muiToolbarAlertBannerProps: isError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    onPaginationChange: filteringState ? setFilterPagination : setPagination,

    // onPaginationChange: setFilteringState ? setFilterPagination : setPagination,
    onSortingChange: setSorting,
    // rowCount=rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination: filteringState ? filterPagination : pagination,

      // pagination: filteringState ? filterPagination : pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

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
        setallDivisions(result)
      })

  }
  const [filterALLProductLine, setFilterAllProductLine] = useState([])
  const [filterALLProductGroup, setFilterAllProductGroup] = useState([])

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
  const ALLProductGroup = () => {
    const getAllDivisions = `${process.env.REACT_APP_API_URL}ProductGroup/GetAllProductGroup`;

    fetch(getAllDivisions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFilterAllProductGroup(result)
      })

  }
  useEffect(() => {
    ALLDivision()
    ALLProductLine()
    ALLProductGroup()

  }, [])

  // useEffect(() => {
  //   const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=M3`;

  //   fetch(getAllProductLine, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setAllproductLine(result)
  //     })
  // }, [])
  // useEffect(() => {
  //   const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=DB`;
  //   fetch(getAllProductLine, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setAllproductGroup(result)
  //     })
  // }, [])

  // useEffect(() => {
  //   const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=12&Code=PV`;

  //   fetch(getAllProductLine, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setAllproduct(result)
  //     })
  // }, [])





  const fetchAllDefects = () => {
    const fetchDefectOptions = `${process.env.REACT_APP_API_URL}Defect/GetAllDefect`;

    fetch(fetchDefectOptions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('datttttttttttttaaaa--', result);
        setdata(result)
      })
  }




  useEffect(() => {
    fetchAllDefects()
  }, [])



  const [addBranch, setaddBranch] = useState({
    defectId: 0,
    divisionCode: '',
    productLineCode: "",
    productGroupCode: "",
    productCode: "",
    defectCategoryId: '',
    defectDesc: "",
    isActive: true
  })

  const handleClose = () => {
    setShow(false);
    setaddBranch({
      defectId: 0,
      divisionCode: '',
      productLineCode: "",
      productGroupCode: "",
      productCode: "",
      defectCategoryId: 1,
      defectDesc: "",
      isActive: true
    });
  }



  const handleChange = (e) => {
    const newdata = { ...addBranch };
    newdata[e.target.name] = e.target.value;
    setaddBranch(newdata);
    console.log(newdata);
  }

  const [editBranch, seteditBranch] = useState({
    defectId: 0,
    divisionCode: [],
    productLineCode: "",
    productGroupCode: "",
    productCode: "",
    defectCategoryId: 1,
    defectDesc: "",
    isActive: true
  })


  const handleChangeEdit = (e) => {
    const newdata = { ...editBranch };
    newdata[e.target.name] = e.target.value;
    seteditBranch(newdata);
    console.log(newdata);
  }
  const [defectId, setdefectID] = useState("")
  const getSingleBranch = `${process.env.REACT_APP_API_URL}Defect/GetDefectById?defectId=${defectId}`;


  useEffect(() => {
    if (defectId) {
      fetch(getSingleBranch, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          seteditBranch((pre) => {
            return {
              ...pre,
              defectId: result?.defectId,
              divisionCode: result?.divisionCode,
              productLineCode: result?.productLineCode,
              productGroupCode: result?.productGroupCode,
              productCode: result?.productCode,
              defectCategoryId: result?.defectCategoryId,
              defectDesc: result?.defectDesc,
            }
          })

          const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=${result.divisionCode}`;

          fetch(getAllProductLine, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setAllproductLine(result)
            })

          const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${result.productLineCode}`;

          fetch(getAllProductGroup, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              setAllproductGroup(result)
            })
        })
    }

  }, [defectId])


  const handleModalClose = () => {
    setShowModal(false);
    fetch(getSingleBranch, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        seteditBranch((pre) => {
          return {
            ...pre,
            defectId: result?.defectId,
            divisionCode: result?.divisionCode,
            productLineCode: result?.productLineCode,
            productGroupCode: result?.productGroupCode,
            productCode: result?.productCode,
            defectCategoryId: result?.defectCategoryId,
            defectDesc: result?.defectDesc,
          }
        })
        const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=${result.divisionCode}`;

        fetch(getAllProductLine, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setAllproductLine(result)
          })

        const getAllProductGroup = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${result.productLineCode}`;

        fetch(getAllProductGroup, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setAllproductGroup(result)
          })


      })

  }

  // const handleFilterDivisionChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setFilterDivisionName(selectedValue)
  //   if (selectedValue === '') {
  //     setFilterDivisionName((pre) => ({
  //       ...pre,
  //       productLineCode: '',
  //       productGroupCode: ''
  //     }));

  //   }
  //   setSelectedDivision(selectedValue);
  //   // setFilterDivisionName((pre) => ({
  //   //   ...pre,
  //   //   divisionCode: selectedValue
  //   // }));


  //   let divisionCodeString = selectedValue;
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

  // const handleFilterProductLineChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setFilterProductLineName(selectedValue)
  //   setSelectedProductLine(selectedValue);
  //   // Update state with the selected product line code


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

  // const handleFilterProductGroupChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setFilterProductGroup(selectedValue)
  //   setSelectedProductGroup(selectedValue);
  //   // Update state with the selected product line code

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


  const handleDivisionChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === '') {
      setaddBranch((pre) => ({
        ...pre,
        productLineCode: '',
        productGroupCode: ''
      }));

    }
    setSelectedDivision(selectedValue);
    setaddBranch((pre) => ({
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

  const handleProductLineChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProductLine(selectedValue);
    // Update state with the selected product line code
    setaddBranch((pre) => ({
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
    setaddBranch((pre) => ({
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

  const handleProductNameChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProductName(selectedValue);
    // Update state with the selected product line code
    setaddBranch((pre) => ({
      ...pre,
      productCode: selectedValue
    }));


    let divisionCodeString_four = selectedValue;
    console.log("divString", divisionCodeString_four);


  };








  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    // sessionStorage.setItem("collectionPatient",item.PatientID);
    setaddBranch((pre) => {
      return {
        ...pre,
        userName: item?.displayName,
        userEmailId: item?.email,
        userId: item?.userId
      }
    })

  }


  useEffect(() => {
    const fetchDefectCategoryOptions = `${process.env.REACT_APP_API_URL}DefectCategory/GetAllDefectCategoryByProduct?divisionCode=${addBranch?.divisionCode ? addBranch?.divisionCode : 0}&productLineCode=${addBranch?.productLineCode ? addBranch?.productLineCode : 0}&productGroupCode=${addBranch?.productGroupCode ? addBranch?.productGroupCode : 0}`;
    fetch(fetchDefectCategoryOptions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDefectCategoryOptions(result)
      })

  }, [addBranch?.divisionCode, addBranch?.productLineCode, addBranch?.productGroupCode])

  useEffect(() => {
    const fetchFilterDefectCategoryOptions = `${process.env.REACT_APP_API_URL}DefectCategory/GetAllDefectCategory`;
    fetch(fetchFilterDefectCategoryOptions, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFilterDefectCategoryOptions(result)
      })

  }, [])







  const customHeaders = {
    divisionName: 'Division',
    productLineName: 'Product Line',
    productGroupName: 'Product Group',
    defectCategoryName: 'Defect Category',
    defectDesc: "Defect Description",
    divisionCode:'Division Code',
    productLineCode:'Product Line Code',
    productGroupCode:'Product Group Code',
    




  }


  console.log(filteringState)

  return (
    <>
        <Card
          className="border-0 p-3 m-4"
          //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
          style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
        >
          <div className='d-flex justify-content-between'>

            <p className='pg-label m-0'>Defect Master</p>
            {Permissions?.isAdd ? <Row className=' text-end'><Col><Button variant='' className='add-Btn ' onClick={handleShow}>Add New Defect</Button></Col></Row> : ""}

          </div>
          <hr />



          <Row style={{ boxShadow: "0px 0px 3px 3px #d4d4d4" }}
            className="m-3 p-3" >
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
              <Form.Group>
                <Form.Label>Product Group</Form.Label>
                <Form.Select
                  name='productGroupCode'
                  value={filterProductGroup}
                  onChange={(e) => {
                    setFilterProductGroup(e.target.value)
                  }}>
                  <option value="">Select Product Group</option>
                  {filterALLProductGroup.map((productLine) => (
                    <option key={productLine.productGroupCode} value={productLine.productGroupCode}>
                      {productLine.productGroupName}
                    </option>
                  ))}
                </Form.Select>

              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Defect Category</Form.Label>
                <Form.Select
                  name='defectCategoryId'
                  value={filterProductCategory}
                  onChange={(e) => {
                    setFilterProductcategory(e.target.value)

                  }}
                  placeholder=''
                >
                  <option value="" >Select</option>
                  {
                    defectFilterCategoryOptions?.map((defect, index) => (
                      <>
                        <option value={defect?.defectCategoryId} key={index}>{defect?.defectCategoryName}</option>
                      </>
                    )
                    )
                  }
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <div className="pt-4">
                <Button
                  variant=""
                  className="add-Btn mt-3"
                  // disabled={filteringState}
                  onClick={(e) => {
                    setFilterPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    setPagination({
                      pageIndex: 0,
                      pageSize: 10
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
                      pageIndex: 0,
                      pageSize: 10
                    })

                    setPagination({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    fetchData();


                    // fetchAllDefects()
                    setFilterDivisionName('')
                    setFilterProductLineName('')
                    setFilterProductGroup('')
                    setFilterProductcategory('')

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
                // renderRowActions={({ cell, row, table }) => (

                //   <Box sx={{ display: "flex", gap: "1rem" }}>
                //     {
                //       cell.row.original.isActive == false ? "" :
                //         <Tooltip arrow placement="left" title="Edit">
                //           <IconButton
                //             className="edit-btn"
                //             onClick={() => {
                //               console.log(cell.row.original.defectId);
                //               setdefectID(cell.row.original.defectId)
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
                //               setdefectID(cell.row.original.defectId)
                //               setisActive(cell.row.original.defectId)
                //               handleShowDel()
                //             }}


                //           >
                //             <HiOutlineTrash color='red' />
                //           </IconButton>
                //         </Tooltip>
                //     }

                //   </Box>
                // )}
                manualPagination={true}
                muiToolbarAlertBannerProps={isError
                  ? {
                    color: 'error',
                    children: 'Error loading data',
                  }
                  : undefined}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setFilterPagination || setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                state={
                  {
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination: filterPagination || pagination,

                    // pagination: filteringState ? filterPagination : pagination,
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
                              "productName",
                              "totalRows",
                              "defectId",
                              "productCode",
                              "defectCategoryId",
                              "isActive"

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
              <Modal.Title className='mdl-title'>Add New Defect</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              {
                loading ? (<Loader />) : (

                  <><Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Division<span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='divisionCode'
                          onChange={handleDivisionChange}>
                          <option value="">Select Division</option>
                          {allDivisions.map((division) => (
                            <option key={division.divisionCode} value={division.divisionCode}>
                              {division.divisionName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Product Line<span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productLineCode'
                          onChange={handleProductLineChange}>
                          <option value="">Select Product Line</option>
                          {allproductLines.map((productLine) => (
                            <option key={productLine.productLineCode} value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Product Group</Form.Label>
                        <Form.Select
                          name='productGroupCode'
                          onChange={handleProductGroupChange}>
                          <option value="">Select Product Group</option>
                          {allproductGroup.map((productLine) => (
                            <option key={productLine.productGroupCode} value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>

                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>


                      {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Product Name<span className='req-t'>*</span></Form.Label>
        <Form.Select value={selectedProductName}
          name='productCode'
          onChange={handleProductNameChange}>
          <option value="">Select Product Name</option>
          {allproductName.map((productLine) => (
            <option key={productLine.productCode} value={productLine.parameterTypeId}>
              {productLine.parameterType}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col> */}

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Defect Category<span className='req-t'>*</span></Form.Label>
                          <Form.Select
                            name='defectCategoryId'
                            onChange={handleChange}
                            placeholder=''
                          >
                            <option value="" >Select</option>
                            {
                              defectCategoryOptions?.map((defect, index) => (
                                <>
                                  <option value={defect?.defectCategoryId} key={index}>{defect?.defectCategoryName}</option>
                                </>
                              )
                              )
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Defect Description<span className='req-t'>*</span></Form.Label>
                          <Form.Control as="textarea" rows={1} maxLength={200} name='defectDesc'
                            onChange={handleChange} />
                        </Form.Group>
                      </Col>


                    </Row></>
                )}



              {/* <Row className='mt-3'>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status<span className='req-t'>*</span></Form.Label>
                    <Form.Select
                      name='isActive'
                      onChange={handleChange}

                      placeholder=''
                    >
                      <option value="">Active</option>

                    </Form.Select>
                  </Form.Group>
                </Col>

              </Row> */}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const addBranchUrl = `${process.env.REACT_APP_API_URL}Defect/UpsertDefect`;
                let data = {
                  ...addBranch
                }

                // if (editBranch.defectDesc === "" || editBranch.divisionName === "" || editBranch.productLineName === "" || editBranch.productGroupCode === "" || editBranch.productCode === "" || editBranch.defectCategoryName === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   })
                // }

                const divisionName = addBranch.divisionCode;
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }
                const productLineName = addBranch.productLineCode;
                if (!productLineName || productLineName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Line required"
                  });
                  return;
                }



                // const productGroupCode = addBranch.productGroupCode;
                // if (!productGroupCode || productGroupCode === 'Select') {
                //   Swal.fire({
                //     icon: "error",
                //     title: "please select product group"
                //   });
                //   return;
                // }
                const defectCategory = addBranch.defectCategoryId;
                if (!defectCategory || defectCategory === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Defect Category is required"
                  });
                  return;
                }

                const defectDesc = addBranch.defectDesc;
                if (!defectDesc) {
                  Swal.fire({
                    icon: "error",
                    title: "Defect Description is required"
                  });
                  return;
                }



                else {
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

                        if (res.status == 200 && r != "DEFECTEXISTS") {
                          Swal.fire({
                            icon: "success",
                            title: "Saved successfully!"
                          })
                          handleClose()
                          fetchAllDefects()
                          setLoading(false)


                        }
                        else if (res.status == 200 && r == "DEFECTEXISTS") {
                          Swal.fire({
                            icon: "warning",
                            title: "Defect already exists!"
                          })
                          setLoading(false)


                        }
                      })
                    })
                }
              }}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>


          {/* -------------------------------------edit-------------------------------------- */}


          <Modal show={showModal} onHide={handleModalClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Edit Defect</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              {
                loading ? (<Loader />) : (

                  <><Row>
                    {/* <Col md={4}>
      <Form.Group>
        <Form.Label>Defect Name</Form.Label>
        <Form.Control
          type="text"
          name='defectDesc'
          value={editBranch.defectDesc}
          onChange={handleChangeEdit}
          placeholder=''
        />
      </Form.Group>
    </Col> */}
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Division<span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='divisionCode'
                          value={editBranch.divisionCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                divisionCode: e.target.value
                              };
                            });


                            const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=10&Code=${e.target.value}`;

                            fetch(getAllProductLine, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setAllproductLine(result);
                              });

                          }}
                          placeholder=''
                        >
                          <option value="">Select</option>
                          {allDivisions?.map((defect, index) => {
                            return (
                              <>
                                <option value={defect?.divisionCode} key={index}>{defect?.divisionName}</option>
                              </>
                            );
                          })}

                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Product Line<span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productLineCode'
                          value={editBranch.productLineCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                productLineCode: e.target.value
                              };
                            });


                            const getAllProductLine = `${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=11&Code=${e.target.value}`;

                            fetch(getAllProductLine, {
                              headers: {
                                "Authorization": `Bearer ${token}`
                              }
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                console.log(result);
                                setAllproductGroup(result);
                              });


                          }}
                          placeholder=''
                        >
                          <option value="">Select</option>
                          {productLine?.map((defect, index) => {
                            return (
                              <>
                                <option value={defect?.parameterTypeId} key={index}>{defect?.parameterType}</option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Product Group<span className='req-t'>*</span></Form.Label>
                        <Form.Select
                          name='productGroupCode'
                          value={editBranch.productGroupCode}
                          disabled
                          onChange={(e) => {
                            seteditBranch((pre) => {
                              return {
                                ...pre,
                                productGroupCode: e.target.value
                              };
                            });
                          }}
                          placeholder=''
                        >
                          <option value="">Select</option>
                          {productGroup.map((productLine) => (
                            <option value={productLine.parameterTypeId}>
                              {productLine.parameterType}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                  </Row><Row className='mt-3'>



                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Defect Category<span className='req-t'>*</span></Form.Label>
                          <Form.Select
                            name='defectCategoryId'
                            value={editBranch.defectCategoryId}
                            disabled
                            onChange={handleChangeEdit}
                            placeholder=''
                          >
                            <option value="">Select</option>
                            {defectCategoryOptions?.map((defect, index) => {
                              return (
                                <>
                                  <option value={defect?.defectCategoryId} key={index}>{defect?.defectCategoryName}</option>
                                </>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Defect Description<span className='req-t'>*</span></Form.Label>
                          <Form.Control as="textarea" rows={1} name='defectDesc'
                            value={editBranch.defectDesc}
                            onChange={handleChangeEdit} />
                        </Form.Group>
                      </Col>


                    </Row></>
                )}

            </Modal.Body>

            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();
                const editBranchUrl = `${process.env.REACT_APP_API_URL}Defect/UpsertDefect`;

                // if (editBranch.defectDesc === "" || editBranch.divisionName === "" || editBranch.productLineName === "" || editBranch.productGroupCode === "" || editBranch.productCode === "" || editBranch.defectCategoryName === "") {
                //   Swal.fire({
                //     icon: "error",
                //     title: "Please fill all the fields marked with red *"
                //   });
                // } else {


                const divisionName = editBranch.divisionCode;
                if (!divisionName || divisionName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Division is required"
                  });
                  return;
                }
                const productLineName = editBranch.productLineCode;
                if (!productLineName || productLineName === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Product Line required"
                  });
                  return;
                }



                // const productGroupCode = addBranch.productGroupCode;
                // if (!productGroupCode || productGroupCode === 'Select') {
                //   Swal.fire({
                //     icon: "error",
                //     title: "please select product group"
                //   });
                //   return;
                // }
                const defectCategory = editBranch.defectCategoryId;
                if (!defectCategory || defectCategory === 'Select') {
                  Swal.fire({
                    icon: "error",
                    title: "Defect Category is required"
                  });
                  return;
                }


                const defectDesc = editBranch.defectDesc;
                if (!defectDesc) {
                  Swal.fire({
                    icon: "error",
                    title: "Defect Description is required"
                  });
                  return;
                }











                setLoading(true)
                fetch(editBranchUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(editBranch)
                })
                  .then((res) => {
                    let resp = res.text();
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

                      if (res.status == 200 && r != "DEFECTEXISTS") {
                        Swal.fire({
                          icon: "success",
                          title: "Updated successfully!"
                        });
                        handleModalClose()
                        fetchAllDefects()
                        setLoading(false)

                        // window.location.reload(); // Reload the page after successful update
                      } else if (res.status == 200 && r == "DEFECTEXISTS") {
                        Swal.fire({
                          icon: "warning",
                          title: "Defect already exists!"
                        });
                        setLoading(false)

                      }
                    });
                  });
                // }
              }}>
                Update
              </Button>

            </Modal.Footer>
          </Modal>


          <Modal show={showDel} onHide={handleCloseDel} backdrop="static" centered size='md'>
            <Modal.Header closeButton>
              <Modal.Title className='mdl-title'>Delete defect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this defect?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseDel}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteBranchUrl = `${process.env.REACT_APP_API_URL}Defect/DeleteDefect?defectId=${defectId}&isActive=${0}`;

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
                        // fetchAllDefects() // Reload the page after successful deletion
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
              <Modal.Title className='mdl-title'>Activate Defect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to activate this Defect?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDefectUrl = `${process.env.REACT_APP_API_URL}Defect/DeleteDefect?defectId=${activeID}&isActive=${1}`;

                fetch(deleteDefectUrl, {
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
                        fetchAllDefects()
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
              <Modal.Title className='mdl-title'>De-activate Defect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to de-activate this Defect?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                No
              </Button>
              <Button variant="" className='add-Btn' onClick={(e) => {
                e.preventDefault();

                const deleteDefectUrl = `${process.env.REACT_APP_API_URL}Defect/DeleteDefect?defectId=${activeID}&isActive=${0}`;

                fetch(deleteDefectUrl, {
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
                      fetchAllDefects()

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
                    //     fetchAllDefects()


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









        </Card>
    </>
  )
}

export default Defect