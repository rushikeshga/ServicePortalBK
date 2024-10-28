import moment from 'moment';
import React, { useEffect, useState } from 'react'

const DCJobsheet = (props) => {
    // const [custData, setCustData]  = useState({});
    let custData = props.custData;
    let token = localStorage.getItem("UserToken");
    let ticInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    console.log("ticInfo[0]")

    // console.log(ticInfo[0])
    // console.log(ticInfo[0].sernr)
    // useEffect(()=>{
    //     fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${ticInfo[0].sernr}&ProductCode=${ticInfo[0].matnr}&InvoiceDate=${props?.invDate}&DivisionCode=${ticInfo[0]?.divisionCode}`,{
    //         headers: {
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
            <strong><><u style={{fontSize:"23px"}}>First Investigatory Report on DC Motor at Site</u></></strong> FIR
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
            <td border={1} width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Machine Number
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}> 
            </td>
            <td width={236} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Serial Number
            </p>
            </td>
            <td width={170} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
                {custData?.serialNo}
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Motor Rating- KW
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            {custData?.kw}
            </td>
            <td width={236} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Mounting
            </p>
            </td>
            <td width={170} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Frame
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
                {custData?.frame}
            </td>
            <td width={236} nowrap colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Armature    Voltage/Current
            </p>
            </td>
            <td width={170} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            {/* {custData?.kva} */}
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Field Voltage/Current
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={236} nowrap colSpan={2} valign="top">
            <p>
                Speed
            </p>
            </td>
            <td width={170} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Customer Name
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            {custData?.customerName} 
            </td>
            <td width={406} nowrap colSpan={4} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Site address:&nbsp;  {custData?.siteAddress} 
            </p>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Customer Contact Name
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={101} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Mob Number
            </p>
            </td>
            <td width={306} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            {custData?.primaryMobileNo}
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Application
            </p>
            </td>
            <td width={593} nowrap colSpan={5} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                ASC Name
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            {custData?.ascName}
            </td>
            <td width={101} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Contact no
            </p>
            </td>
            <td width={306} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            {custData?.ascMobileNo}
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                CG Service Engineer
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={101} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                email
            </p>
            </td>
            <td width={306} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Dealer/OEM Name
            </p>
            </td>
            <td width={593} nowrap colSpan={5} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={153} nowrap valign="top" style={{border: '1px solid #000'}}>
            <p>
                Date of Commissioning
            </p>
            </td>
            <td width={187} nowrap valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={279} nowrap colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Pre-commissioning check records available:
            </p>
            </td>
            <td width={127} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Yes / No
            </p>
            </td>
        </tr>
        
        </tbody>
    </table>
    <table border={1} cellSpacing={0} cellPadding={0} width={0} style={{border: '1px solid #000', margin: "0",padding: "20px",width:'100%'}}>
        <tbody>
        <tr >
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Type of complaint reported
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
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
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Type of load
            </p>
            </td>
            <td width={332} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Continuous  / intermittent
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Coupling Type (Direct/Pulley etc.)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Pulley Size :
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Belt size
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Belt tension (kg)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Method of starting (Starter/VFD)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p>
                In case of Soft starter or VFD – Make &amp; Model number
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Cable length (from Panel to motor)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Foundation (Concrete/Fab steel)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Anti Vib Mt Pad ( Yes/No)
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Protection Device (Overload Relay/contactor/Fuse)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} rowSpan={2} valign="top">
            <p>
                Make &amp; Rating
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Relay setting/ contactor / fuse rating
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Application in Details</strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
                &nbsp;
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                IP and Armature
            </p>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Series
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Field
            </p>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Winding Resistance</strong>
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Insulation resistance ( M Ohms )</strong>
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                MP to IP/Armature
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}> 
            <p>
                Armature to earth
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Field (MP) to Earth
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Speed (RPM)- ( Measured)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Ambient Deg C  ( Measured)
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Motor body temperature
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Bearing Temp
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Armature
            </p>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Field
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Voltage at motor terminals</strong>
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Current Drawn (Measured)</strong>
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Armature
            </p>
            </td>
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            <p align="center">
                Field
            </p>
            </td>
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                No Load condition
            </p>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td> 
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td> 
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td> 
        </tr> 
        <tr> 
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p> 
                Load condition 
            </p> 
            </td> 
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td> 
            <td width={187} valign="top" style={{border: '1px solid #000'}}>
            </td> 
            <td width={166} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={748} colSpan={4} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Is there any sign of foreign material inside motor
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                What type of protection is    provided? Is there
                interlocking of blower supply with armature supply?
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Vibration of motor at    foundation, bearing side, blower
                mounting &amp; structure
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                What is blower condition –    filter cleaned or not
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Blower Mounting &amp;    vibration-
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                What type of brushes used    in all brush holder pockets?
                Check freeness of the brushes in packets.
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Is the brush rocker ring is    at MNA position?
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                What is the field current    setting &amp; RPM of motor
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={394} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            <p>
                What is the fault history    reported in drive?
            </p>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={145} valign="top" style={{border: '1px solid #000'}}>
            </td>
            <td width={354} colSpan={2} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Terminal Connection</strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Loose nut/crimp or tightened properly
            </p>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Terminal Box cover</strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Properly covered with gasket /       Partially open / Open
            </p>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>Cables</strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Properly routed through gland or just passed through conduit
                opening
            </p>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top"style={{border: '1px solid #000'}}>
            <p>
                <strong />
            </p>
            <p>
                <strong>Earthing Connection</strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Motor Earthing (Yes / No )
            </p>
            <p>
                Driven Equipment (Yes/ No)
            </p>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                Additional Remarks by ASC person on Site condition
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            </td>
        </tr>
        <tr>
            <td width={249} valign="top" style={{border: '1px solid #000'}}>
            <p>
                <strong>
                Photos to be captured ( If needed take customer
                permission /    request customer to click photos as
                required)
                </strong>
            </p>
            </td>
            <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
            
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
                Motor terminal box – Outer &amp; connection
            </p>
            <p>
                Motor mounting related
            </p>
            <p>
                Fan cover side ( NDE side) view
            </p>
            <p>
                DE Side View
            </p>
            <p>
                Mounting arrangement
            </p>
            <p>
                Complete photographs of winding – Armature and Field winding
            </p>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</div>
  )
}

export default DCJobsheet
