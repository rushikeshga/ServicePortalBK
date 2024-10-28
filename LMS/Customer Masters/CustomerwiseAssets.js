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
function CustomerwiseAssets() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data=[
        {
            "CustAutoId":"Mehul",
            "DivisionCode":"LT motors",
            "ProductLineCode":"Motors",
            "ProductGroupCode":"AC motors",
            "ProductCode":"rwvs5422",
            "ProductSerialNo":"6442yyrwqtern",
            "Batch":"1",
            "WarrantyStartDateBatch":"22 Jan 2024",
            "WarrantyEndDateBatch":"22 Jan 2025",
            "InvoiceNo":"2",
            "InvoiceDate":"22 Jan 2024",
            "WarrantyStartDateInvoice":"22 Jan 2024",
            "WarrantyEndDateInvoice":"22 Jan 2025",
            "WarrantyStatus":"In-warranty",
            "InformationSource":"Google"
           
           
            
        },
        {
            "CustAutoId":"Shailesh",
            "DivisionCode":"Switchgear-S1",
            "ProductLineCode":"Motors",
            "ProductGroupCode":"Brake",
            "ProductCode":"dhsgdtfyw8762",
            "ProductSerialNo":"dhgtwr45426",
            "Batch":"2",
            "WarrantyStartDateBatch":"10 Jan 2024",
            "WarrantyEndDateBatch":"10 Jan 2025",
            "InvoiceNo":"4",
            "InvoiceDate":"10 Jan 2024",
            "WarrantyStartDateInvoice":"10 Jan 2024",
            "WarrantyEndDateInvoice":"10 Jan 2025",
            "WarrantyStatus":"In-Warranty",
            "InformationSource":"Website"
           
           
            
        },
        
    
       
        
       
 
       
    ]
    const columns=useMemo(
        () => [
            // {
            //     accessorKey: "CustAutoId",
            //     header: "Customer Code",
            //   },
            {
                accessorKey: "DivisionCode",
                header: "Division Code",
              },
            {
                accessorKey: "ProductLineCode",
                header: "Product Line",
              },
            {
                accessorKey: "ProductGroupCode",
                header: "Product Group",
              },
            {
                accessorKey: "ProductCode",
                header: "Product",
              },
            {
                accessorKey: "ProductSerialNo",
                header: "Product Serial No",
              },
            {
                accessorKey: "Batch",
                header: "Batch",
              },
            {
                accessorKey: "WarrantyStartDateBatch",
                header: "Warranty Start-Date Batch",
              },
            {
                accessorKey: "WarrantyEndDateBatch",
                header: "Warranty End-Date Batch",
              },
            {
                accessorKey: "InvoiceNo",
                header: "Invoice No",
              },
            {
                accessorKey: "InvoiceDate",
                header: "Invoice Date",
              },
            {
                accessorKey: "WarrantyStartDateInvoice",
                header: "Warranty Start-Date Invoice",
              },
            {
                accessorKey: "WarrantyEndDateInvoice",
                header: "Warranty End-Date Invoice",
              },
            {
                accessorKey: "WarrantyStatus",
                header: "Warranty Status",
              },
            {
                accessorKey: "InformationSource",
                header: "Information Source",
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
              <p className='pg-label m-0'>Customer-wise Assets Master</p>
              <hr />


              <Row className='mb-2'><Col><Button variant='' className='add-Btn' onClick={handleShow}>Add New Customer-wise Asset</Button></Col></Row>

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



<Modal show={show} onHide={handleClose} backdrop="static" centered size='xl'>
<Modal.Header closeButton>
<Modal.Title className='mdl-title'>Add New Customer-wise Asset</Modal.Title>
</Modal.Header>
<Modal.Body>

<Row>
  <Col md={3}>
  <Form.Group>
  <Form.Label>Customer Mobile No.</Form.Label>
<Form.Control
type='tel'

placeholder=''
/>
    {/* <option value=""></option> */}
{/* </Form.Select> */}
</Form.Group>
  </Col>
  <Col md={3}>
  <Form.Group>
  <Form.Label>Division</Form.Label>
<Form.Select


placeholder=''
>
    <option value=""></option>
</Form.Select>
</Form.Group>
  </Col>
  <Col md={3}>
  <Form.Group>
  <Form.Label>Product Line</Form.Label>
<Form.Select


placeholder=''
>
    <option value=""></option>
</Form.Select>
</Form.Group>
  </Col>
  <Col md={3}>
  <Form.Group>
  <Form.Label>Product Group</Form.Label>
<Form.Select


placeholder=''
>
    <option value=""></option>
</Form.Select>
</Form.Group>
  </Col>
</Row>

<Row className='mt-3'>
    <Col md={3}>
    <Form.Group>
  <Form.Label>Product</Form.Label>
<Form.Control
type="text"

placeholder=''
/>
</Form.Group>
    </Col>
   
    <Col md={3}>
    <Form.Group>
  <Form.Label>Product Serial No</Form.Label>
  <Form.Control
type="text"

placeholder=''
/>
</Form.Group>
    </Col>
    <Col md={3}>
    <Form.Group>
  <Form.Label>Batch</Form.Label>
  <Form.Control
type="text"

placeholder=''
/>
</Form.Group>
    </Col>
    <Col md={3}>
    <Form.Group>
  <Form.Label>Warranty Start-Date Batch</Form.Label>
  <Form.Control
type="date"

placeholder=''
/>
</Form.Group>
    </Col>
</Row>


<Row className='mt-3'>
<Col md={3}>
    <Form.Group>
  <Form.Label>Warranty End-Date Batch</Form.Label>
<Form.Control
type="date"

placeholder=''
/>
</Form.Group>
    </Col>

    <Col md={3}>
    <Form.Group>
  <Form.Label>Invoice No</Form.Label>
  <Form.Control
type="text"

placeholder=''
/>
</Form.Group>
    </Col>
    <Col md={3}>
    <Form.Group>
  <Form.Label>Invoice Date</Form.Label>
  <Form.Control
type="date"

placeholder=''
/>
</Form.Group>
    </Col>
    <Col md={3}>
    <Form.Group>
  <Form.Label>Warranty Start-Date Invoice</Form.Label>
  <Form.Control
type="date"

placeholder=''
/>
</Form.Group>
    </Col>
</Row>
<Row className='mt-3'>
<Col md={3}>
<Form.Group>
  <Form.Label>Warranty End-Date Invoice</Form.Label>
  <Form.Control
type="date"

placeholder=''
/>
</Form.Group>
    </Col>

    <Col md={3}>
    <Form.Group>
  <Form.Label>Warranty Status</Form.Label>
  <Form.Control
type="text"

placeholder=''
/>
</Form.Group>
    </Col>
    {/* <Col md={3}>
    <Form.Group>
  <Form.Label>Information Source</Form.Label>
<Form.Control type='text'/>
</Form.Group>
    </Col> */}
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

export default CustomerwiseAssets