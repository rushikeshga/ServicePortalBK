import moment from 'moment';
import React, { useEffect, useState } from 'react'

const AlternatorSheet = (props) => {
  // const [custData, setCustData]  = useState({});
    let token = localStorage.getItem("UserToken");
    let ticInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    let custData = props.custData;

    // console.log("ticInfo[0]")

    // console.log(ticInfo[0])
    // useEffect(()=>{
    //   fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${ticInfo[0].sernr}&ProductCode=${ticInfo[0].matnr}&InvoiceDate=${props?.invDate}&DivisionCode=${ticInfo[0]?.divisionCode}`,{
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => res.json())
    //     .then((result)=>{
    //       setCustData(result[0]);
    //     })
    //   },[])
  return (
    <div style={ {padding: "20px"}}>
        <p style={{marginLeft:"250px"}}>
            <div>
            <strong><><u style={{fontSize:"23px"}}>First Investigatory Report on Alternator Motor at Site</u></></strong> FIR
            Date :
            </div>
            
        </p>
        <p>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{marginLeft:"140px"}}>
                        CG Complaint Number:&nbsp;{custData?.serviceTicketNumber}
                    </div>
                <div style={{marginRight:"200px"}}>
                    Complaint Date :{custData?.requestDate && moment((custData?.requestDate.trim()?.split(" ")[0])).format("YYYY-MM-DD")}
                </div>
            </div>
            
        </p>
        <div className='sectionAlt'>
  <table border={1} cellSpacing={0} cellPadding={0} width={0} style={{border: '1px solid #000', margin: "0",padding: "20px",width:'100%'}}>
    <tbody>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Machine Number
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={249} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Serial Number
          </p>
        </td>
        <td width={180} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        {custData?.serialNo}
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Alternator Rating- kVA
          </p>
        </td>
        <td width={99} nowrap valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={99} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Pole &nbsp; {custData?.pole}
          </p>
        </td>
        <td width={249} nowrap colSpan={2} valign="top"style={{border: '1px solid #000'}}>
          <p>
            Mounting
          </p>
        </td>
        <td width={249} nowrap colSpan={2}  valign="top"style={{border: '1px solid #000'}}>
          
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Customer Name
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        {custData?.customerName}
        </td>
        <td width={430} nowrap colSpan={4} valign="top" style={{border: '1px solid #000'}} height={80}>
          <p>
            Site address: &nbsp;  {custData?.siteAddress}
          </p>
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Customer Contact Name
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        {/* {custData?.siteAddress} */}
        </td>
        <td width={106} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Mob Number
          </p>
        </td>
        <td width={323} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
        {custData?.primaryMobileNo}
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Application
          </p>
        </td>
        <td width={628} nowrap colSpan={6} valign="top" style={{border: '1px solid #000'}}>
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            ASC Name
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
          {custData?.ascName}
        </td>
        <td width={106} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Contact no
          </p>
        </td>
        <td width={323} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
        {custData?.ascMobileNo}
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            CG Service Engineer
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={106} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            email
          </p>
        </td>
        <td width={323} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Dealer/OEM Name
          </p>
        </td>
        <td width={628} nowrap colSpan={6} valign="top" style={{border: '1px solid #000'}}>
        </td>
        
      </tr>
      <tr>
        <td width={162} nowrap valign="top" style={{border: '1px solid #000'}}>
          <p>
            Date of Commissioning
          </p>
        </td>
        <td width={198} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={295} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Pre-commissioning check records available:
          </p>
        </td>
        <td width={134} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Yes / No
          </p>
        </td>
        
      </tr>
      <tr height={0}>
        <td width={162} style={{border: '1px solid #000'}}>
        </td>
        <td width={99} style={{border: '1px solid #000'}}>
        </td>
        <td width={99} style={{border: '1px solid #000'}}>
        </td>
        <td width={106} style={{border: '1px solid #000'}}>
        </td>
        <td width={143} style={{border: '1px solid #000'}}>
        </td>
        <td width={46} style={{border: '1px solid #000'}}>
        </td>
        <td width={134} style={{border: '1px solid #000'}}>
        </td>
        
      </tr>
    </tbody>
  </table>
  <table border={1} cellSpacing={0} cellPadding={0} width={0}>
    <tbody>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Type of complaint reported
          </p>
        </td>
        <td width={507} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
          {custData?.defectDesc}
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            working hours from installation
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Avg running hours /Day
          </p>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            <strong>Type of load</strong>
          </p>
        </td>
        <td width={332} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            <strong>Details of load</strong>
          </p>
        </td>
        <td width={507} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            <strong>Alternator &amp; Engine    Vibration</strong>
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          &nbsp;
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
        &nbsp;
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            <strong>Winding Resistance</strong>
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
          <p align="center">
            UV
          </p>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
          <p align="center">
            VW
          </p>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
          <p align="center">
            WU
          </p>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Winding Resistance -Stator
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Winding Resistance –Main    Rotor
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Winding Resistance – Ex    Stator <strong />
          </p>
        </td>
        <td width={145} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={187} valign="top" style={{border: '1px solid #000'}}>
        </td>
        <td width={175} valign="top" style={{border: '1px solid #000'}}>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top">
          <p>
            Winding Resistance –Ex Rotor <strong />
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
            <strong />
          </p>
          <p>
            <strong>Insulation resistance ( M Ohms )</strong>
          </p>
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
            Main Rotor to earth
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
            Ex Rotor to earth
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
            Ex Stator to earth
          </p>
        </td>
        <td width={145} valign="top" height={20}>
          
        </td>
        <td width={187} valign="top">
        </td>
        <td width={175} valign="top">
        </td>
      </tr>
      <tr>
        <td width={756} colSpan={4} valign="top" height={70}>
        
        </td>
      </tr>
      <tr>
        <td width={249} valign="top">
          <p>
            Ambient Deg C  ( Measured)
          </p>
        </td>
        <td width={507} colSpan={3} valign="top">
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" height={90}>
          <p>
            Alternator  body temperature
          </p>
        </td>
        <td width={507} colSpan={3} valign="top">
        </td>
      </tr>
      
      <tr>
        <td width={756} colSpan={4} valign="top">
          <p>
            <strong>No load and Load Test</strong>
          </p>
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
            <strong>Voltage at Alternator Terminals</strong>
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
        <td width={249} valign="top" height={90}>
          <p>
            Ex voltage
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
        <td width={756} colSpan={4} valign="top">
          &nbsp;
        </td>
      </tr>
      <tr>
        <td width={394} colSpan={2} valign="top">
          <p>
            Overload Protection – Y/N
          </p>
        </td>
        <td width={362} colSpan={2} valign="top">
        </td>
      </tr>
      <tr>
        <td width={394} colSpan={2} valign="top">
          <p>
            Event history in controller
          </p>
        </td>
        <td width={362} colSpan={2} valign="top">
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
            <strong />
          </p>
          <p>
            <strong>Earthing Connection</strong>
          </p>
        </td>
        <td width={507} colSpan={3} valign="top">
          <p>
            Alternator Earthing (Yes / No )
          </p>
          <p>
            Driven Equipment (Yes/ No)
          </p>
        </td>
      </tr>
      <tr>
        <td width={249} valign="top" height={90}>
          <p>
            Additional Remarks by ASC person on Site condition
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
            Coupling arrangement
          </p>
          <p>
            Alternator terminal box – Outer &amp; connection
          </p>
          <p>
            Alternator mounting related
          </p>
          <p>
            Fan cover side ( NDE side) view
          </p>
          <p>
            Mounting arrangement
          </p>
          <p>
            Winding failure photo –Both winding overhang, main rotor,
            Ex. Stator    &amp; Ex.Rotor
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</div>

  )
}

export default AlternatorSheet