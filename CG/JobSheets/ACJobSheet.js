import moment from 'moment';
import React, { useEffect, useState } from 'react'

const ACJobSheet = (props) => {
  // const [custData, setCustData]  = useState({});
  let custData = props.custData;
  
    let token = localStorage.getItem("UserToken");
    // let ticInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    // console.log("custData")
    // console.log(custData)

    // console.log(ticInfo[0])
    // console.log(ticInfo[0].sernr)
  // useEffect(()=>{
  //   console.log("props");
  //   console.log(props);
  //   fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${props.sernNo}&ProductCode=${props.prodCode}&InvoiceDate=&DivisionCode=${props.divCode}`,{
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => res.json())
  //   .then((result)=>{
  //     setCustData(result[0]);
  //   })
  // },[props.sernNo])
  // console.log("acjobsheet")
  return (
    <div style={ {padding: "20px"}}>
      <p style={{marginLeft:"250px"}}>
            <div>
            <strong><><u style={{fontSize:"23px"}}>First Investigatory Report on AC Motor at Site</u></></strong> FIR
            Date :
            </div>
            
        </p>
        <p>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{marginLeft:"140px"}}>
                        CG Complaint Number:&nbsp;{custData?.serviceTicketNumber}
                    </div>
                <div style={{marginRight:"200px"}}>
                    Complaint Date :
                    {custData?.ticketGenerationDate && moment((custData?.ticketGenerationDate.trim()?.split(" ")[0])).format("DD-MM-YYYY")}
                </div>
            </div>
            
        </p>
        <div className='sectionAlt'>
        <table border={1} cellSpacing={0} cellPadding={0} width={0}>
  <tbody>
    <tr>
      <td style={{width: "132px"}} nowrap valign="top">
        <p>
          Machine Number
        </p>
      </td>
      <td width={89} nowrap valign="top">
      </td>
      <td width={65} valign="top">
        <p>
          Serial Number
        </p>
      </td>
      <td style={{width: "132px"}} nowrap valign="top">
      {custData?.serialNo}
      </td>
      <td width={125} valign="top">
        <p>
          Motor Rating- KW
        </p>
      </td>
      <td width={56} valign="top">
      {custData?.kw}
      </td>
      <td width={198} colSpan={3} valign="top">
        <p>
          Pole: &nbsp;{custData?.pole}
        </p>
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Customer Name
        </p>
      </td>
      <td style={{width: "232px"}} nowrap colSpan={2} valign="top">
      {custData?.customerName}
      </td>
      <td width={469} nowrap colSpan={6} valign="top">
        <p>
          Site address: &nbsp; {custData?.siteAddress}
        </p>
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Customer Contact Name
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
      {custData?.contactPerson}
      </td>
      <td width={89} nowrap valign="top">
        <p>
          Mob Number
        </p>
      </td>
      <td style={{width: "125px"}} valign="top">
      {custData?.primaryMobileNo}
      </td>
      <td width={82} nowrap colSpan={2} valign="top">
        <p>
          Application
        </p>
      </td>
      <td width={173} colSpan={2} valign="top">
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
      </td>
      <td width={622} nowrap colSpan={8} valign="top">
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          ASC Name
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
      {custData?.ascName}
      </td>
      <td width={214} nowrap colSpan={2} valign="top">
        <p>
          Asc address:
        </p>
      </td>
      <td width={255} nowrap colSpan={4} valign="top">
        {custData?.ascAddress}
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Contact no/email
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
      {custData?.ascMobileNo}/{custData?.ascEmailId}
      </td>
      <td width={214} nowrap colSpan={2} valign="top">
        <p>
          CG Service Engineer
        </p>
      </td>
      <td width={255} nowrap colSpan={4} valign="top">
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Dealer/OEM Name
        </p>
      </td>
      <td width={622} nowrap colSpan={8} valign="top">
        {custData?.purchaseFrom}
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Date of Commissioning
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
      {custData?.dateOfCommissioning && moment((custData?.dateOfCommissioning.trim()?.split(" ")[0])).format("DD-MM-YYYY")}
        
      </td>
      <td width={374} nowrap colSpan={5} valign="top">
        <p>
          Pre-commissioning check    records available:
        </p>
      </td>
      <td width={95} valign="top">
        <p>
          Yes / No
        </p>
      </td>
    </tr>
  </tbody>
</table>


    <table border={1} cellSpacing={0} cellPadding={0} width={0}>
      <tbody>
        <tr>
          <td width={249} valign="top">
            <p>
              Type of complaint reported
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
          {custData?.defectDesc}
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              working hours from installation
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p>
              Avg running hours /Day
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Type of load
            </p>
          </td>
          <td width={332} colSpan={2} valign="top">
            <p>
              Continuous  / intermittent
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Coupling Type (Direct/Pulley etc.)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Pulley Size :
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p>
              Belt size
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Belt tension (kg)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          Cable length (from Panel to motor)
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Method of starting ( DOL/Star-Delta/Soft Starter/VFD)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p>
              In case of Soft starter or VFD <br/>- Make &amp; Model number
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              Foundation (Concrete/Fab steel)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p>
              Anti Vib Mt Pad ( Yes/No)
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Protection Device (Overload Relay/contactor/Fuse)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} rowSpan={2} valign="top">
            <p>
              Make &amp; Rating
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Relay setting/ contactor / fuse rating
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Application in Details</strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
          </td>
          <td width={145} valign="top">
            <p align="center">
              UV
            </p>
          </td>
          <td width={187} valign="top">
            <p align="center">
              VW
            </p>
          </td>
          <td width={175} valign="top">
            <p align="center">
              WU
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Winding Resistance</strong>
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Insulation resistance ( M Ohms )</strong>
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Phase to Phase
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Phase to Earth
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
       
        <tr>
          <td width={249} valign="top">
            <p>
              Speed (RPM)- ( Measured)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p align="center">
              Frequency (Measured)
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Ambient Deg C  ( Measured)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Motor body temperature
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
            <p align="center">
              Bearing Temp
            </p>
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
          </td>
          <td width={145} valign="top">
            <p align="center">
              UV
            </p>
          </td>
          <td width={187} valign="top">
            <p align="center">
              VW
            </p>
          </td>
          <td width={175} valign="top">
            <p align="center">
              WU
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Voltage at motor terminals</strong>
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Current Drawn (Measured)</strong>
            </p>
          </td>
          <td width={145} valign="top">
            <p align="center">
              U
            </p>
          </td>
          <td width={187} valign="top">
            <p align="center">
              V
            </p>
          </td>
          <td width={175} valign="top">
            <p align="center">
              W
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              No Load
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Loaded
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              Power consumed.
            </p>
            <p>
              (Where possible from Panel or Meter)
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Winding Resistance</strong>
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Insulation resistance (M Ohms )</strong>
            </p>
          </td>
          <td width={145} valign="top">
          </td>
          <td width={187} valign="top">
          </td>
          <td width={175} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Phase to Phase
            </p>
          </td>
          <td width={145} valign="top">
            <p>
              UV :
            </p>
          </td>
          <td width={187} valign="top">
            <p>
              VW :
            </p>
          </td>
          <td width={175} valign="top">
            <p>
              WU:
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              Phase to Earth
            </p>
          </td>
          <td width={145} valign="top">
            <p>
              U :
            </p>
          </td>
          <td width={187} valign="top">
            <p>
              V :
            </p>
          </td>
          <td width={175} valign="top">
            <p>
              W :
            </p>
          </td>
        </tr>
        
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Terminal Connection</strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
            <p>
              Loose nut/crimp or tightened properly
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Terminal Box cover</strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
            <p>
              Properly covered with gasket /       Partially open / Open
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>Cables</strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
            <p>
              Properly routed through gland or just passed through conduit
              opening
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong />
            </p>
            <p>
              <strong>Earthing Connection</strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
            <p>
              Motor Earthing (Yes / No )
            </p>
            <p>
              Driven Equipment (Yes/ No)
            </p>
          </td>
        </tr>
        <tr>
          <td width={249} valign="top" height={200}>
            <p>
              <strong>
                Additional Remarks by ASC    person on Site condition
              </strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
          </td>
        </tr>
        <tr>
          <td width={249} valign="top">
            <p>
              <strong>
                Photos to be captured ( If needed take customer
                permission /    request customer to click photos as
                required)
              </strong>
            </p>
          </td>
          <td width={507} colSpan={3} valign="top">
            
            <ul>
            <li>
              The area of concern/complaint (Example –
              Box/Foot/ Body Paint etc)
              </li>
              <li>
                Additional photos of
              </li>
            </ul>
            <p>
              Coupling    arrangement
            </p>
            <p>
              Motor terminal    box – Outer &amp; connection
            </p>
            <p>
              Motor mounting    related
            </p>
            <p>
              Fan cover side    ( NDE side) view
            </p>
            <p>
              Mounting    arrangement
            </p>
            <p>
              Winding failure    photo of stator both overhang, rotor, TB
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  
  )
}

export default ACJobSheet