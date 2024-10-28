import React,{useMemo,useState,useEffect} from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row ,Form, Button, Spinner, Modal} from "react-bootstrap";
import TestReport,{handleExportRows,handleExportRowsPdf} from '../../CG/TestReport';
import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { FaEye, FaFileCsv, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash} from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import Multiselect from 'multiselect-react-dropdown';


import { Box, IconButton, Tooltip } from '@mui/material';
function UserProductLineMapping() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data=[
        {
            "UserId":"Mehul",
            "ProductLineID":"Admin",
  
        },
        {
            "UserId":"Mehul",
            "ProductLineID":"Admin",
  
        },
        
    
       
        
       
 
       
    ]
    const columns=useMemo(
        () => [
            {
                accessorKey: "UserId",
                header: "User Name",
              },
            {
                accessorKey: "ProductLineID",
                header: "Product-Line",
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
              <p className='pg-label m-0'>User Product-Line Mapping Master</p>
              <hr />


              <Row className='mb-2'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New User Product-Line Mapping</Button></Col></Row>

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



<Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
<Modal.Header closeButton>
<Modal.Title className='mdl-title'>Add New User Product-Line Mapping</Modal.Title>
</Modal.Header>
<Modal.Body>

<Row>
  <Col md={6}>
  <Form.Group>
  <Form.Label>User</Form.Label>
  <Form.Select aria-label="Default select example">
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
</Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group>
  <Form.Label>Product-Line</Form.Label>
  <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
    {
      cat: 'Group 1',
      key: 'Option 1'
    },
    {
      cat: 'Group 1',
      key: 'Option 2'
    },
    {
      cat: 'Group 1',
      key: 'Option 3'
    },
   
  ]}
  showCheckbox
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
</Modal>
              </Card>
    </>
  )
}

export default UserProductLineMapping