import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
// import '../../../../App.css'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import logoIBN from "../../../Assets/LogoIBN.svg"
function IBNCopy(props) {
    // const [custData, setCustData]  = useState({});
    let token = localStorage.getItem("UserToken");
    let Ibn =localStorage.getItem("IBNNumber")

    const [billData, setbillData] = useState([])
    const container = React.useRef(null);



    const [cliamList, setcliamList] = useState([])


    const exportPDFWithMethod = () => {
      let element = container.current || document.body;     
      savePDF(element, {
        paperSize: "auto", // or "Letter"
        margin: { top: 0, left: "1cm", right: "1cm", bottom: "1cm" },
        // fileName: `${billData?.ascName} ${new Date().getFullYear()}`,
        fileName: `${billData?.internetBillNo}`,
      });
    };
    
    
    useEffect(()=>{

      // if(Ibn){
      //   console.log(Ibn);
        

        fetch(`${process.env.REACT_APP_API_URL}ASMServiceTicketClaimApproval/GetIBNPdfDetails?IBNNumber=${Ibn}`,{
            headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((result)=>{
console.log(result);
setbillData(result)

setcliamList(result?.claimDetailsList)
        })
      // }

      },[Ibn])



      let GrandTotal=cliamList?.reduce((acc, curr) => {
        return acc + parseFloat(curr.totalAmount);
      }, 0);

      console.log(GrandTotal);



      let Quantity=cliamList?.reduce((acc, curr) => {
        return acc + parseFloat(curr.qty);
      }, 0);

      console.log(Quantity);
      
      


  return (


   <>
   <Button variant='' className='pdfBtn mx-2' onClick={exportPDFWithMethod}><span>Download PDF</span></Button>
   <div className='section m-2'
    // style={{margin:'25px'}}
    ref={container}>
    

   <Card className="border-0">

   <div className='logoContainer'> <img src={logoIBN} alt="" srcset="" className='ibnlogo m-auto'/></div>
   {/* <table border={1} cellSpacing={0} cellPadding={0}>
  <tbody>
    <tr>
      <td  colSpan={15} >
        <p align="center">
          <strong>Internal Bill Generation (O)</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={8} >
        <p align="center">
          <strong>Print Status</strong>
        </p>
      </td>
      <td  colSpan={7} >
        <p align="center">
          Duplicate - {billData?.printStatusCount}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={8} >
        <p align="center">
          <strong>Internal Bill No.</strong>
        </p>
      </td>
      <td  colSpan={7} >
        <p align="center">
          {billData?.internetBillNo}
        </p>
      </td>
    </tr>
    <tr>
      <td colSpan={8} >
        <p align="center">
          <strong>Type</strong>
        </p>
      </td>
      <td  colSpan={7} >
        <p align="center">
          {billData?.type}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={8} >
        <p align="center">
          <strong>ASC Details</strong>
        </p>
      </td>
      <td  colSpan={7} >
        <p align="center">
          <strong>Branch Details</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={4} >
        <p align="center">
          <strong>ASC Name</strong>
        </p>
      </td>
      <td  colSpan={4} >
        <p>
          {billData?.ascName}
        </p>
      </td>
      <td   colSpan={4} >
        <p align="center">
          <strong>Branch</strong>
        </p>
      </td>
      <td   colSpan={3} >
        <p align="center">
          {billData?.branch}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={4} >
        <p align="center">
          <strong>Address</strong>
        </p>
      </td>
      <td style={{whiteSpace: "normal",
            wordWrap: 'break-word', 
            maxWidth: "100px"}} colSpan={4} >
        <p align="center">
         {billData?.ascAddress}
        </p>
       
      </td>
      <td  
            colSpan={4} >
        <p align="center">
          <strong>Address</strong>
        </p>
      </td>
      <td style={{whiteSpace: "normal",
            wordWrap: 'break-word', 
            maxWidth: "100px"}} colSpan={3} >
        <p align="center">
        {billData?.address}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={15} >
        <p align="center">
          <strong>Summary</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={2} >
        <p>
          <strong>Product Division</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          <strong>Product Line</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          <strong>No. of Tickets</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          <strong>No. of Claims</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          <strong>Total Amount</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          <strong>Complaint (Month/Year)</strong>
        </p>
      </td>
      <td  colSpan={2} >
        <p align="center">
          <strong>IBN</strong>
        </p>
        <p align="center">
          <strong>Generated Date</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Bill Remark</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={2} >
        <p>
         {billData?.productDivision}
        </p>
      </td>
      <td  colSpan={2} >
        <p>{billData?.productLine}</p>
      </td>
      <td  colSpan={2} >
        <p align="center">
          {billData?.noOfTickets}
        </p>
      </td>
      <td  colSpan={2} >
        <p align="center">
          {billData?.noOfClaims}
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          {billData?.totalAmount}
        </p>
      </td>
      <td  colSpan={2} >
        <p align="center">
          {billData?.complaintClosedDate?.split(" ")[0]}
        </p>
      </td>
      <td  colSpan={2} >
        <p>
          {billData?.ibnGeneratedDate?.split(" ")[0]}
        </p>
      </td>
      <td  >
        <p>
          {billData?.billRemark}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={12} >
        <p align="center">
          <strong>Total No. of records</strong>
        </p>
      </td>
      <td  colSpan={3} >
        <p align="center">
          {billData?.totalNoOfRecords}
        </p>
      </td>
    </tr>
    <tr>
      <td  colSpan={15} >
        <p align="center">
          <strong>Listing</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td  >
        <p align="center">
          <strong>S.No</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Service    Request No.</strong>
        </p>
      </td>
      <td  >
        <p align="center">
          <strong>Claim Approval Date</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Approved by</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Spare</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Spare Desc.</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Activity</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Parameter</strong>
        </p>
      </td>
      <td >
        <p>
          <strong>Possible Value</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Invoice No.</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Product Serial No.</strong>
        </p>
      </td>
      <td  >
        <p align="center">
          <strong>Qty.</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Rate</strong>
        </p>
      </td>
      <td  >
        <p>
          <strong>Total Amount</strong>
        </p>
      </td>
      <td  rowSpan={4} >
      </td>
    </tr>
   


    {
      billData?.claimDetailsList?.map((list,i)=>{
        return(
          <>
          <tr>
            <td>
              <p>{i+1}</p>
            </td>

            <td>
              <p>{list?.serviceRequestNo}</p>
            </td>
            <td>
              <p>{list?.claimApprovalDate?.split(" ")[0]}</p>
            </td>
            <td>
              <p>{list?.approvedBy}</p>
            </td>
            <td>
              <p>{list?.spare}</p>
            </td>
            <td>
              <p>{list?.spareDesc}</p>
            </td>
            <td>
              <p>{list?.activity}</p>
            </td>
            <td>
              <p>{list?.parameter}</p>
            </td>
            <td>
              <p>{list?.possibleValue}</p>
            </td>
            <td>
              <p>{list?.invoiceNo}</p>
            </td>
            <td>
              <p>{list?.productSerialNo}</p>
            </td>
            <td>
              <p>{list?.qty}</p>
            </td>
            <td>
              <p>{list?.rate}</p>
            </td>
            <td>
              <p>{list?.totalAmount}</p>
            </td>
          </tr>
          </>
        )
      })
    }
     
    <tr>
      <td  colSpan={12} >
        <p align="center">
          <strong>Grand Total</strong>
        </p>
      </td>
      <td  colSpan={3} >
        <p align="center">
          {GrandTotal}
        </p>
      </td>
    </tr> 
  </tbody>
</table> */}



<table>
  
    <tr>
        {/* <td></td> */}
        <td colSpan={12} style={{textAlign:"center",backgroundColor:"#004887",color:"white"}}><strong>Internal Bill Summary </strong> For {billData?.ibnTitleDate}</td>
       
    </tr>
    <tr>
        {/* <td></td> */}
        <td style={{fontSize:"15px"}}><strong>IBN No</strong></td>
        <td style={{fontSize:"15px"}}>{billData?.internetBillNo}</td>
        <td style={{fontSize:"15px"}}><strong>IBN Date</strong></td>
        <td style={{fontSize:"15px"}}>{moment(billData?.ibnGeneratedDate?.split(" ")[0])?.format("DD-MM-YYYY")}</td>
        <td style={{fontSize:"15px"}}><strong>Type</strong></td>
        <td style={{fontSize:"15px"}}>{billData?.type}</td>
        <td style={{fontSize:"15px"}}><strong>Print Status</strong></td>
        <td colSpan={5} style={{fontSize:"15px"}}>{`${billData?.printStatusCount=="0"?`Original`:`Duplicate - ${billData?.printStatusCount}`}`}</td>
      
    </tr>
   <tr>
    <td colSpan={12}>
      <br />
    </td>
   </tr>
    <tr>
        {/* <td></td> */}
        <td style={{whiteSpace:"nowrap"}}><strong>ASC Name</strong></td>
        <td>{billData?.ascName}</td>
        <td ><strong>ASC Address</strong></td>
        <td colSpan={3}>{billData?.ascAddress}</td>
        <td><strong>Branch</strong></td>
        <td>{billData?.branch}</td>
        <td style={{whiteSpace:"nowrap"}}><strong>Branch Address</strong></td>
        <td colSpan={3}>{billData?.address}</td>
      
    </tr>
    <tr>
    <td colSpan={12} style={{borderBottomColor:"transparent"}}>
      <br />
    </td>
   </tr>
    <tr>
        {/* <td></td> */}
        <td colSpan={2} style={{borderTopColor:"transparent",borderBottomColor:"transparent"}}></td>
       
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Product Division</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Product Line</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Closed Tickets</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>No. of Claims</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}> <strong>Total Amount</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}> <strong>Complaint <br/>(Month/Year)</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>IBN Generated <br/>(Month/Year)</strong></td>
        {/* <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Remarks</strong></td> */}
        <td colSpan={2} style={{borderTopColor:"transparent",borderBottomColor:"transparent",borderRightColor:"transparent"}}></td>
        

    </tr>
    <tr>
        {/* <td></td> */}
        <td colSpan={2} style={{borderTopColor:"transparent",borderBottomColor:"transparent"}}></td>
        <td>{billData?.productDivision}</td>
        <td>{billData?.productLine}</td>
        <td style={{textAlign:"center"}}>{billData?.noOfTickets}</td>
        <td style={{textAlign:"center"}}>{billData?.noOfClaims}</td>
        <td style={{textAlign:"center"}}>{billData?.totalAmount}</td>
        <td style={{textAlign:"center"}}>{moment(billData?.complaintClosedDate?.split(" ")[0])?.format("DD-MM-YYYY")}</td>
        <td style={{textAlign:"center"}}>{moment(billData?.ibnGeneratedDate?.split(" ")[0])?.format("DD-MM-YYYY")}</td>
        {/* <td>{billData?.billRemark}</td> */}
        <td colSpan={2} style={{borderTopColor:"transparent",borderBottomColor:"transparent",borderRightColor:"transparent"}}></td>
 
    </tr>
    <tr>
    <td colSpan={12} style={{borderTopColor:"transparent",borderBottomColor:"transparent"}}>
      <br />
    </td>
   </tr>
    <tr>
        {/* <td></td> */}
        <td colSpan={12} style={{textAlign:"center",backgroundColor:"#004887",color:"white"}}><strong>Claim Details</strong></td>
       
    </tr>
    <tr style={{borderColor:"white"}}>
        {/* <td></td> */}
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>S.No</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Service Ticket No</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}> <strong>Product Serial No.</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Claim Approval Date</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Final Approved by</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Activity</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Work done</strong></td>
        <td style={{whiteSpace:"nowrap",backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Possible Value</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center",textAlign:"center"}}><strong>Invoice No.</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Quantity</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Rate</strong></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}}><strong>Total</strong></td>

    </tr>
    {
      cliamList?.map((claim,i)=>{
        return(
          <>
           <tr>
        {/* <td></td> */}
        <td style={{textAlign:"center"}}>{i+1}</td>
        <td style={{textAlign:"center"}}>{claim?.serviceRequestNo}</td>
        <td style={{textAlign:"center"}}>{claim?.productSerialNo}</td>
        <td style={{textAlign:"center"}}>{moment(claim?.claimApprovalDate?.split(" ")[0])?.format("DD-MM-YYYY")}</td>
        <td>{claim?.approvedBy}</td>
        <td>{claim?.activity}</td>
        <td>{claim?.parameter}</td>
        <td>{claim?.possibleValue}</td>
        <td style={{textAlign:"center"}}>{claim?.invoiceNo}</td>
        <td style={{textAlign:"center"}} className='pe-2'>{claim?.qty}</td>
        <td style={{textAlign:"right"}}>{claim?.rate}</td>
        <td style={{textAlign:"right"}} >{claim?.totalAmount}</td>
  
    </tr>
          </>
        )
      })
    }
   
 
   
    <tr>
        {/* <td></td> */}
        <td colSpan={9} style={{textAlign:"center",backgroundColor:"#004887",color:"white"}}><strong>Grand Total</strong></td>
        
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"center"}} className='pe-2'><strong>{Quantity}</strong></td>
        <td style={{backgroundColor:"#004887",color:"white"}}></td>
        <td style={{backgroundColor:"#004887",color:"white",textAlign:"right"}}><strong>{GrandTotal?.toFixed(2)}</strong></td>
  
    </tr>

</table>

<p className='text-center mt-3' style={{fontSize:"14px",fontWeight:"bold"}}><b>*This is a computer-generated claim summary and does not require a signature*</b></p>
</Card>

   </div>
   </>

  )
}

export default IBNCopy;