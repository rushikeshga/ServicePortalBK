import React from 'react'

const DCJobsheetEmpty = () => {
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
                        CG Complaint Number:&nbsp;
                    </div>
                <div style={{marginRight:"200px"}}>
                    Complaint Date :
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
      
      </td>
      <td width={125} valign="top">
        <p>
          Motor Rating- KW
        </p>
      </td>
      <td width={56} valign="top">
      </td>
      <td width={198} colSpan={3} valign="top">
        <p>
        Mounting: 
        </p>
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
        Frame
        </p>
      </td>
      <td  nowrap colSpan={2} valign="top">
      
      </td>
      <td width={469} nowrap colSpan={6} valign="top">
        <p>
        Armature Voltage/Current
        </p>
      </td>
      <td  nowrap colSpan={2} valign="top">
      
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
        Field Voltage/Current
        </p>
      </td>
      <td  nowrap colSpan={2} valign="top">
      
      </td>
      <td width={469} nowrap colSpan={6} valign="top">
        <p>
        Speed
        </p>
      </td>
      <td  nowrap colSpan={2} valign="top">
      
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Customer Name
        </p>
      </td>
      <td style={{width: "232px"}} nowrap colSpan={2} valign="top">
      
      </td>
      <td width={469} nowrap colSpan={6} valign="top">
        <p>
          Site address: 
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
      
      </td>
      <td width={89} nowrap valign="top">
        <p>
          Mob Number
        </p>
      </td>
      <td style={{width: "125px"}} valign="top">
      
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
      
      </td>
      <td width={214} nowrap colSpan={2} valign="top">
        <p>
          Asc address:
        </p>
      </td>
      <td width={255} nowrap colSpan={4} valign="top">
        
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Contact no/email
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
      
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
        
      </td>
    </tr>
    <tr>
      <td width={132} nowrap valign="top">
        <p>
          Date of Commissioning
        </p>
      </td>
      <td width={154} nowrap colSpan={2} valign="top">
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
  <table border={1} cellSpacing={0} cellPadding={0} width={0} style={{border: '1px solid #000', margin: "0",padding: "20px",width:'100%'}}>
    <tbody>
      <tr >
        <td width={249} valign="top" style={{border: '1px solid #000'}}>
          <p>
            Type of complaint reported
          </p>
        </td>
        <td width={499} colSpan={3} valign="top" style={{border: '1px solid #000'}}>
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
          <p>
            ·            The area of concern/complaint (Example –
            Box/Foot/ Body Paint etc)
          </p>
          <ul>
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

export default DCJobsheetEmpty
