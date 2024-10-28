import React,{useMemo,useState,useEffect} from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row ,Form, Button, Spinner, Modal} from "react-bootstrap";
import TestReport,{handleExportRows,handleExportRowsPdf} from '../../CG/TestReport';
import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash} from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";


import { Box, IconButton, Tooltip } from '@mui/material';
function ServiceGroupMaster() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data=[
        {
            "No":"1",
            "ServiceGroup":"test",
           
            
        },
        {
            "No":"2",
            "ServiceGroup":"test 1",
           
            
        },
 
       
    ]
    const columns=useMemo(
        () => [
            {
                accessorKey: "No",
                header: "Sr No.",
              },
            {
                accessorKey: "ServiceGroup",
                header: "Service Group",
              },
            
        ]
    );

  return (
    <>
   <Card
              className="border-0 p-3 m-4"
            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
              style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
            >
              <p className='pg-label m-0'>Service Group Master</p>
              <hr />


              <Row className='mb-2'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Service Group</Button></Col></Row>

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


<Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className='mdl-title'>Add New Service Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control
        type="text"
        autoFocus
      placeholder='Service Group Name'
      />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='cncl-Btn' onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='add-Btn' onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
              </Card>
    </>
  )
}

export default ServiceGroupMaster