import React,{useState,useEffect,useMemo} from 'react';
import Sidebar from '../../Sidebar';
import { Card, Col, Row ,Form, Button, Spinner, Modal} from "react-bootstrap";
import TestReport,{handleExportRows,handleExportRowsPdf} from '../../CG/TestReport';
import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash} from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

import { Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePathName } from '../../../constants';

function AllRoleMappings() {
  const pathName =usePathName()
const navigate=useNavigate();

    const data=[
        {
            srNo: 1,
            Roles: "Admin",
            MenuName:"Leads",
            Adds: "True",
            Edits: "True",
            Deletes: "True",
            Views: "True",
            Download: "True",
            Upload:"True"
           
          },
          {
            srNo: 2,
            Roles: "User",
            MenuName:"Leads",
            Adds: "True",
            Edits: "True",
            Deletes: "True",
            Views:"False",
            Download:"False",
            Upload:"False"
            
          },
 
       
    ]
    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "srNo",
          //   header: "Sr No.",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
            
          // },
          {
            accessorKey: "Roles",
            header: "Role",
          },
          {
            accessorKey: "MenuName",
            header: "Menu",
          },
          {
            accessorKey: "Adds",
            header: "Add",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
          {
            accessorKey: "Edits",
            header: "Edit",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
          {
            accessorKey: "Deletes",
            header: "Delete",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
          {
            accessorKey: "Views",
            header: "view",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
          {
            accessorKey: "Download",
            header: "Download",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
          {
            accessorKey: "Upload",
            header: "Upload",
            Cell:({cell})=>{
              let a=cell.getValue();
              return(
              a==="True"?<BsCheckCircle fontSize={30} color="#00df00"/>:<RxCrossCircled fontSize={35} color="red"/>
            )          }
          },
        //   {
        //     accessorKey: "address",
        //     header: "Address",
        //   },
        //   {
        //     accessorKey: "location",
        //     header: "Location",
        //   },
        //   {
        //     accessorKey: "phoneNo",
        //     header: "Phone No.",
        //   },
        //   {
        //     accessorKey: "responsiblePerson",
        //     header: "Responsible Person",
        //   },
          // {
          //   accessorKey: 'gender',
          //   header: 'Gender',
          //   filterFn: 'equals',
          //   filterSelectOptions: [
          //     { text: 'Male', value: 'Male' },
          //     { text: 'Female', value: 'Female' },
          //     { text: 'Other', value: 'Other' },
          //   ],
          //   filterVariant: 'select',
          // },
          // {
          //   accessorKey: 'age',
          //   header: 'Age',
          //   filterVariant: 'range',
          // },
          // {
          //   accessorKey: 'actions',
          //   header: 'Actions',
    
          // },
        ],
        []
      );

  return (
    <>
    <Card
              className="border-0 p-3 m-4"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
              style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
              <p className='pg-label m-0'>All Role Mappings</p>
              <hr />


              <Row className='mb-2'><Col><Button variant='' className='add-Btn' onClick={()=>navigate(`${pathName}/role-map`)}>Add New Role Mapping</Button></Col></Row>

<MaterialReactTable
                  columns={columns}
                  data={data}
                  
                  initialState={{ showColumnFilters: false }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ cell,row, table }) => (
                
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      {/* <Tooltip arrow placement="left" title="View">
                        <IconButton 
                        className="edit-btn"
                        // onClick={() => table.setEditingRow(row)}
                        disabled
                        >
                          <FaEye color='green'/>
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton 
                        className="edit-btn"
                        // onClick={() => table.setEditingRow(row)}
                        disabled
                        >
                          <FaRegEdit color='#005bab'/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          // onClick={() => handleDeleteRow(row)}
                        disabled

                        >
                          <HiOutlineTrash color='red'/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                 
renderTopToolbarCustomActions={({table})=>(
    <>
    <div style={{
          display: 'flex',
          gap: '16px',
          padding: '10px',
          flexWrap: 'wrap',
        }}>

    <Button variant=''
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> <FaFileCsv fontSize={25} color='green' title='Download CSV'/>
        </Button>
    <Button variant=''
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
        }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> <BiSolidFilePdf fontSize={30} color='red' title='Download PDF'/>


        </Button>
            </div>
        </>

)}


                  positionActionsColumn="first"
                
                />

{/* 
<Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='mdl-title'>Add New Parameter Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={4}>
                <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select >
            <option value=""></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control
        type="text"
        
      placeholder='Text'
      />
      </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
        <Form.Label>Code</Form.Label>
                
        <Form.Control
        type="text"
        
      placeholder='Code'
      />
      </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
        <Form.Label>No.</Form.Label>
        <Form.Control
        type="text"
        
      placeholder='No.'
      />
      </Form.Group>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='cncl-Btn' onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='add-Btn' onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal> */}
              </Card>
    </>
  )
}

export default AllRoleMappings