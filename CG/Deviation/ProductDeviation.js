import React, { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row, Form, Button, Spinner, Modal } from "react-bootstrap";
import TestReport, { handleExportRows, handleExportRowsPdf } from '../../CG/TestReport';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEdit, FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Swal from 'sweetalert2';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Select from 'react-select';
import { Box, IconButton, Switch, Tooltip } from '@mui/material';
import { handleResponse } from '../../../Components/Generic/utility';
import { FaUserCheck } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import Loader from '../../loader';
import { useNavigate } from 'react-router-dom';
import { usePathName } from '../../../constants';

function ProductDeviation() {
  const navigate = useNavigate()
  const pathName = usePathName()

  let token = localStorage.getItem("UserToken")


  let Permissions = JSON.parse(localStorage.getItem("ChildAccess"));

  let LoginRoleName = localStorage.getItem("RoleName");

  const [AllProducts, setAllProducts] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}ProdCustInfo/GetProductDeviation`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllProducts(result)
      })
  }, [])



  const columns = useMemo(() => [
    {
      accessorKey: "serialNo",
      header: "Sr No.",
      Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    },
    {
      accessorKey: "divisionName",
      header: "Division",
      Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      Cell: ({ cell }) => (
        <p className="text-center m-auto">{cell.getValue()}</p>
      ),
    },
    {
      accessorKey: "siteAddress",
      header: "Site Address",
      Cell: ({ cell }) => (
        <p className="text-center m-auto">{cell.getValue()}</p>
      ),
    },
    {
      accessorKey: "pinCode",
      header: "PinCode",
      Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    },
    {
      accessorKey: "stateName",
      header: "State",
      Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    },
    {
      accessorKey: "cityName",
      header: "City",
      Cell: ({ cell }) => <p className="text-center m-0">{cell.getValue()}</p>,
    },
    // {
    //   accessorKey: "leadDate",
    //   header: "Lead Date",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue()?.toLocaleString().split(" ")[0];

    //     let date = value?.split("/");
    //     let dd = date[1];
    //     let dm = date[0];
    //     let dy = date[2];
    //     let newform = dd + "/" + dm + "/" + dy;
    //     return <p className="text-center m-0">{newform}</p>;
    //   },
    // },

    // {
    //   accessorKey: "expectedConversionDate",
    //   header: "Expected Date",
    //   Cell: ({ cell }) => {
    //     let value = cell.getValue()?.toLocaleString()?.split(" ")[0];

    //     let date = value?.split("/");
    //     let dd = date ? date[1] : "";
    //     let dm = date ? date[0] : "";
    //     let dy = date ? date[2] : "";
    //     let newform = date ? dd + "/" + dm + "/" + dy : "";
    //     return <p className="text-center m-0">{newform}</p>;
    //   },
    // },

    {
      accessorKey: "primaryMobileNo",
      header: "Primary Contact",
      Cell: ({ cell }) => (
        <p className="text-end m-0">{cell.getValue()?.toLocaleString()}</p>
      ),
    },
    {
      accessorKey: "invoiceNo",
      header: "invoice No.",
      //   Cell: ({ cell }) => {
      //     let value = cell.getValue();
      //     return (
      //       <p
      //         className={`text-center m-0 ${
      //           value == "New"
      //             ? "newStatus"
      //             : value == "Closed"
      //             ? "closedStatus"
      //             : ""
      //         }`}
      //       >
      //         {value}
      //       </p>
      //     );
      //   },
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
      Cell: ({ cell }) => {
        let value = cell.getValue();
        return <p>{value}</p>;
      },
    },
    // {
    //     accessorKey: "divisionCode",
    //     header: "Division",
    //   },
    // {
    //     accessorKey: "productSrNo",
    //     header: "Product Sr No",
    //     Cell: ({ cell }) => (
    //       <p className='text-center m-0'>{cell.getValue()?.toLocaleString()}</p>
    //     ),
    //   },

    // {
    //     accessorKey: "CompanyAddress",
    //     header: "Company Address",
    //   },
    // {
    //     accessorKey: "pincodeId",
    //     header: "PinCode",
    //     Cell: ({ cell }) => (
    //       <p className='text-center m-0'>{cell.getValue()}</p>
    //     ),
    //   },
    // {
    //   accessorKey: "contactDetails",
    //   header: "Contact details",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },

    // {
    //   accessorKey: "userName",
    //   header: "User Name",
    //   Cell: ({ cell }) => (
    //     <p className="text-center m-auto">{cell.getValue()}</p>
    //   ),
    // },
    // {
    //     accessorKey: "emailId",
    //     header: "Email Id",
    //   },
    // {
    //     accessorKey: "ContactPersonName",
    //     header: "Contact Person Name",
    //   },
    // {
    //     accessorKey: "ContactPersonNo",
    //     header: "Contact Person No",
    //   },
    // {
    //     accessorKey: "ContactPersonEmail",
    //     header: "Contact Person Email",
    //   },
    // {
    //     accessorKey: "Conversation",
    //     header: "Conversation",
    //   },

    // {
    //     accessorKey: "InterestLavel",
    //     header: "Interest Level",
    //   },
  ]);

  return (
    <>
      <Card
        className="border-0 p-3 m-4"
        //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
        style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
      >
        <div className='d-flex justify-content-between'>



          <p className='pg-label m-0'>Product deviation</p>


          {/* {Permissions?.isAdd ? <Row><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Division</Button></Col></Row> : ""} */}
        </div>
        <hr />



        <MaterialReactTable
          columns={columns}
          data={AllProducts}
          initialState={{ showColumnFilters: false }} //show filters by default
          muiTableHeadCellFilterTextFieldProps={{
            sx: { m: "0.5rem 0", width: "100%" },
            variant: "outlined",
          }}
          enableEditing
          // onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}

          muiTableBodyRowProps={({ row }) => ({
            sx: {
              backgroundColor:
                row?.original?.leadOverDueStatus == "Overdue"
                  ? "#ff000033"
                  : "",
            },
          })}
          renderRowActions={({ cell, row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="View">
                <IconButton
                  className="edit-btn"
                  onClick={() => {
                    localStorage.setItem(
                      "verifyId",
                      cell.row.original?.prodRegAutoId
                    );

                    navigate(`${pathName}/warranty-verification`);
                  }}
                >
                  <FaEdit color="#005bab" />
                </IconButton>
              </Tooltip>
              {/* {LoginRoleName == "AI10" ||
                  LoginRoleName == "BD19" ||
                  LoginRoleName == "NS20" ||
                  LoginRoleName == "RS9" ? (
                    ""
                  ) : cell.row.original?.status == "Closed" ? (
                    ""
                  ) : Permissions?.isEdit ? (
                    <Tooltip arrow placement="left" title="Edit">
                      <IconButton
                        className="edit-btn"
                        onClick={() => {
                          console.log(cell.row.original?.leadId);
                          localStorage.setItem(
                            "LeadId",
                            cell.row.original?.leadId
                          );

                          navigate(`${pathName}/edit-lead`);
                        }}
                      >
                        <FaRegEdit color="#005bab" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )} */}

              {/* <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          // onClick={() => handleDeleteRow(row)}
                        disabled

                        >
                          <HiOutlineTrash color='red'/>
                        </IconButton>
                      </Tooltip> */}
            </Box>
          )}
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
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                      handleExportRows(
                        table.getPrePaginationRowModel().rows,
                        // customHeaders,
                        // [
                        //   "leadId",
                        //   "sourceId",
                        //   "leadTypeId",
                        //   "subLeadTypeId",
                        //   "segmentId",
                        //   "customerTypeId",
                        //   "customerTypeId",
                        //   "customerCategoryId",
                        //   "productSrNo",
                        //   "serviceTicketNo",
                        //   "isActive",
                        //   "projectStateId",
                        //   "projectCityId",
                        //   "projectPincodeId",
                        //   "leadsDivisionProductList",
                        //   "leadContactList",
                        //   "leadsDivisionProductDisplay",
                        //   "divisionCode",
                        //   "branchCode",
                        //   "regionCode",
                        //   "isNewlead",
                        // ]
                      )
                    }
                  //   startIcon={}
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
                {/* <Button variant=''
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
        }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF'/>


        </Button> */}
              </div>
            </>
          )}
          positionActionsColumn="last"
        />




      </Card>
    </>
  )
}

export default ProductDeviation