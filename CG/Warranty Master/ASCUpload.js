import React,{useRef,useState,useMemo, useEffect} from 'react'
import { MaterialReactTable } from 'material-react-table';
import { Form,Card,Row,Col,Button} from 'react-bootstrap'
import { FaCross } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import * as xlsx from "xlsx";
import sampleFormat from "../../../Assets/sampleFormat.xlsx";
import { HiDownload, HiUpload } from 'react-icons/hi';
import Swal from 'sweetalert2';

function ASCUpload() {
    let token = localStorage.getItem("UserToken");


    const [xlFileName, setxlFileName] = useState("");
const xlInput=useRef(null);

const [fileContent, setfileContent] = useState([])


const readUploadFile = (e) => {
    let newob={
     ObjLeads:[],
    //  CreatedBy:UserId
    }
   //  let flatar=flatob

   
    
     e.preventDefault();
     if(e.target.files[0]){

     let xlfile=e.target.files[0]?.name
    setxlFileName(xlfile);
     console.log(e.target.files[0]?.name);
     if (e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) => {
             const data = e.target.result;
             const workbook = xlsx.read(data, { type: "array" });
             const sheetName = workbook.SheetNames[0];
             const worksheet = workbook.Sheets[sheetName];
             const json = xlsx.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'mm-dd-yyyy' });
           //  setnewObj((pre)=>{
           //   return{
           //     ...pre,
           //     ObjLeads:json
           //   }
           //  })
           setfileContent(json)
           newob.ObjLeads.push(json)
   newob.ObjLeads=newob.ObjLeads[0]

             console.log(json);
             console.log(newob);
             sessionStorage.setItem("excel",JSON.stringify(newob));
// console.log("parsed");
             // let d=sessionStorage.getItem("excel");
             // let pd=JSON.parse(d);
             // console.log(pd);
         
             // console.log(e.target);
         };
         reader.readAsArrayBuffer(e.target.files[0]);
     }
    }

 }


 const [data, setdata] = useState([])

// const fetchAllData=()=>{
//     fetch(`${process.env.REACT_APP_API_URL}PincodeMappingUser/GetAllPincodeMappingUser`,{
//         headers: {
           
//             "Authorization": `Bearer ${token}`
//           },
//     })
//     .then((res)=>res.json())
//     .then((result)=>{
//         console.log(result);
//         setdata(result)
//     })
// }



// -----------Pagination------------------------

const [isError, setIsError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isRefetching, setIsRefetching] = useState(false);
const [rowCount, setRowCount] = useState(0);
const [columnFilters, setColumnFilters] = useState([]);
const [globalFilter, setGlobalFilter] = useState('');
const [sorting, setSorting] = useState([]);
const [ascFetchname, setAscFetchname] = useState('')
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

    `${process.env.REACT_APP_API_URL}PincodeMappingUser/GetAllPincodeMappingUser`,

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

// const [filterAscName, setFilterAscName] = useState('')
// const [filterTechName, setFilterTechName] = useState('')

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

      `${process.env.REACT_APP_API_URL}PincodeMappingUser/GetAllPincodeMappingUser`,

    );
    url.searchParams.set(
      'PageNumber',
      `${filterPagination?.pageIndex}`,
    );
    url.searchParams.set('PageSize', `${filterPagination?.pageSize}`);
    // if (filterAscName) {url.searchParams.set('AscCode',`${filterAscName}`);}
    // if (filterTechName) { url.searchParams.set('TechnicianName',`${filterTechName}`) };

    // if (filterUserType) { url.searchParams.set('UserTypeCode', `${filterUserType}`) }
    // if (filterUserRole) { url.searchParams.set('RoleCode', `${filterUserRole}`) }
    // if (filterUserName) { url.searchParams.set('UserName', `${filterUserName}`) }

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

  }, [filterPagination?.pageIndex, filterPagination?.pageSize]);






 const columns = useMemo(
    () => [
        {
            accessorKey: "pincode",
            header: "Pincode",
        },

        {
            accessorKey: "district",
            header: "District",
        },
        {
            accessorKey: "talukaName",
            header: "Taluka",
        },
        {
            accessorKey: "branch",
            header: "Branch",
        },
        {
            accessorKey: "ascDistance",
            header: "ASC Distance (Km)",
        },
        // {
        //     accessorKey: "businessLineName",
        //     header: "BusinessLine Name",
        // },
        {
            accessorKey: "mapFor",
            header: "Map For",
        },
        {
            accessorKey: "ascName",
            header: "Partner Name",
        },

      
        // {
        //     accessorKey: "isActive",
        //     header: "Actions",
        //     size: "20",
        //     Cell: ({ cell }) => {
        //         let data = cell.getValue()
        //         // console.log(cell.row.original);
        //         return (
        //             <>
        //                 <Box sx={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
        //                     {
        //                         cell.row.original.isActive == false ? "" :
        //                             <Tooltip arrow placement="left" title="Edit">
        //                                 <IconButton
        //                                     className="edit-btn"
        //                                     onClick={() => {
        //                                         console.log(cell.row.original.templateId);
        //                                         settemplateID(cell.row.original.templateId)
        //                                         handleModalShow()
        //                                         TypeURL()

        //                                     }}

        //                                 >
        //                                     <FaRegEdit color='#005bab' />
        //                                 </IconButton>
        //                             </Tooltip> 
        //                  }
        //                     {/* {
        //               cell.row.original.isActive == false ? "" :
        //                 <Tooltip arrow placement="right" title="Delete">
        //                   <IconButton
        //                     color="error"
        //                     onClick={() => {
        //                       setroleID(cell.row.original.roleId)
        //                       setisActive(cell.row.original.isActive)
        //                       handleShowDel()
        //                     }}
      
      
        //                   >
        //                     <HiOutlineTrash color='red' />
        //                   </IconButton>
        //                 </Tooltip>
        //             } */}


        //                     {/* {
        //                         cell.row.original.isActive === false ? (
        //                             <Tooltip>
        //                                 <IconButton>
        //                                     <FaUserXmark
        //                                         className="user-btn"
        //                                         style={{ color: 'red' }} // Style for the new icon
        //                                         onClick={() => {
        //                                             console.log(cell.row.original.templateId);
        //                                             setactiveID(cell.row.original.templateId);
        //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
        //                                         }}
        //                                     />
        //                                 </IconButton>
        //                             </Tooltip>
        //                         ) : (
        //                             <Tooltip>
        //                                 <IconButton>
        //                                     <FaUserCheck
        //                                         className="user-btn"
        //                                         style={{ color: 'blue' }}
        //                                         onClick={() => {
        //                                             console.log(cell.row.original.templateId);
        //                                             setactiveID(cell.row.original.templateId);
        //                                             cell.row.original.isActive === true ? handleShowIsActive1() : handleShowIsActive();
        //                                         }}
        //                                     />
        //                                 </IconButton>
        //                             </Tooltip>
        //                         )
        //                     } */}




        //                 </Box>

        //             </>
        //         )
        //     }
        // },




    ]
);

  return (
    <>
        
        <Card
                    className="border-0 p-3 m-4"
                    style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                >
                    <div className='d-flex justify-content-between'>

                        <p className='pg-label m-0'>Upload ASC Excel <span className='mx-3' style={{fontWeight:"400",fontSize:"14px"}}><u><span className='req-t'>*</span> Note: Please use the provided <a href={sampleFormat} download="Excel Format" target='_blank'>Excel template </a> to upload your data! <span className='req-t'>*</span></u></span></p>

                        <Row><Col> <input
                                             type="file"
                                             name="upload"
                                             id="upload"
                                             onChange={readUploadFile}
                                            ref={xlInput}
                                            hidden
                                          
                                            
                                          />
          {!xlFileName &&  (<Button
                      // color="secondary"
                      className="add-Btn mx-2"
                      // onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-access")
                      
                      // }}
                      onClick={() =>
                        xlInput.current.click()
                      }
                      variant=""
                    >
                    <HiUpload/> Select Excel
                    </Button>)}  <span>{xlFileName}</span> {xlFileName && <span><RxCross2 fontSize={20} fontWeight={500} color='red' style={{cursor:"pointer"}} onClick={()=>{
                        setxlFileName('')
                    }}/></span>}</Col>
                    
                    <Col>
                  {xlFileName &&  <Button variant="" className='up-Btn' onClick={(e)=>{
                    e.preventDefault()

                    if(xlFileName.endsWith(".xls") || xlFileName.endsWith(".xlsx")){

                    fetch(`${process.env.REACT_APP_API_URL}PincodeMappingUser/AddPincodeMappingUser`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(fileContent)
      
                      })
                      .then((res) => {
                        console.log(res.status);
                        let resp = res.text();
                        resp.then((r) => {
                            let regextest = /^[0-9]*$/;
                            if (res.status==200 && r.match(regextest)) {
                                Swal.fire({
                                    icon:"success",
                                    title:"Uploaded successfully!"
                                })
                                setxlFileName('')
                            }
                            else{
                                Swal.fire({
                                    icon:"error",
                                    title:"Something went wrong!"
                                })
                            }
                        })

                   } )
                }
                else{
                    Swal.fire({
                        icon:"error",
                        title:"Incorrect file type!",
                    })
                }
                   
                  }}>Upload</Button>}
                    </Col>
                    {/* <Col>
            <a href={sampleFormat} download="Excel Format" target='_blank'>
   <Button variant='' className="cncl-Btn"><HiDownload fontSize={15} className="" />Excel Format</Button>
</a>

            </Col> */}
                    </Row>




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

                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting,
                  }
                }
                            // muiToolbarAlertBannerProps={isError
                            //     ? {
                            //         color: 'error',
                            //         children: 'Error loading data',
                            //     }
                            //     : undefined}

                        />


                    }
              

                </Card>
    </>
  )
}

export default ASCUpload