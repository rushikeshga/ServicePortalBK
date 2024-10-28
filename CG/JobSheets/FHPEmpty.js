import React from 'react'
import { Table } from 'react-bootstrap'
// import '../../../../App.css'
import JSlogo from "../../../Assets/jsLogo.jpg"
import logoSmall from "../../../Assets/logo.png";

function FHPEmpty() {
    return (
        <div className='section' style={{margin:'25px',marginTop:'50px',marginBottom:'50px'}}>
         <div style={{display:"flex"}}>
             <div style={{marginBottom:'5px'}}>
                 <img src={logoSmall} alt="CG Logo" />
             </div>
             <div>
                 <div style={{marginLeft:'350px',marginTop:'10px', fontSize:"23px"}}>
                     <p >
                             <div>
                             <strong><>FHP JobSheet</></strong> 
                             
                             </div>
                             
                         </p>
                 </div>
                 </div>
         </div>
        <table bordered style={{backgroundColor:"white",borderCollapse:"collapse"}} >
     <tr>
         <th>Sr.No</th>
         <th colSpan={3}>
             <div className='d-flex justify-content-between' 
             style={{marginTop:"20px",marginBottom:"20px",fontSize: "18px"}}>
                 <p className='m-0'>DETAILS OF PRODUCT / MOTORs RECEIVED</p>                         
                 <p className='m-0'>_______________________________________</p></div>
         </th>
     </tr>
         <tr>
             <td style={{width: '5%'}} className={`text-center m-0`}>1</td>
             <td style={{width: '30%'}}><b>ASCs SRF (Service Record From) & DATE</b></td>
             <td style={{width: '30%'}}></td>
             <td style={{width: '35%'}}><b>DATE  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;/</b></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>2</td>
             <td><b>NAME OF PERSON /Customer/OEM</b></td>
             <td> </td>
             <td><b>Mobile No.  </b>           </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>3</td>
             <td><b>Service Ticket Number</b></td>
             <td></td>
             <td><b>DATE </b> 
             </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>4</td>
             <td><b>KW / HP</b></td>
             <td></td>
             <td><b>Product Code </b> 
            
               </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>5</td>
             <td><b>MODEL NO /CG CAT REF</b></td>
             <td></td>
             <td><b>Product Line </b> 
             </td>
         </tr>
         {/* <tr>
             <td>6</td>
             <td><b> FRAME SIZE</b></td>
             <td></td>
             <td></td>
         </tr> */}
         <tr>
             <td className={`text-center m-0`}>6</td>
             <td><b>MACHINE /Serial No</b></td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>7</td>
             <td><b>FAULT REPORTED</b></td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>8</td>
             <td><b>RPM</b></td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>9</td>
             <td><b>VOLTS </b>( Voltage at terminals ) </td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>10</td>
             <td><b>AMPERES  /Current</b></td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>11</td>
             <td><b>WDGS PHOTOGRAPHS --- YES / NO</b></td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>12</td>
             <td style={{borderCollapse:"collapse"}}>
             <table>
                 <tr style={{borderCollapse:"collapse",width:"100%"}}>
                     <td><b>ASCs- OBSERVATIONS / INVESTIGATIONS</b></td>
                 </tr>
                 <tr><td><b>Mfg Fault </b></td></tr>
                 <tr><td> <b>Application Fault / APPLICATION DETAILS </b></td></tr>
                 <tr><td> <b>Customers Fault</b></td></tr>
             </table>  
                
                </td>
             <td><b></b></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>13</td>
             <td>
                 <b>STATOR WDG MEGGER VALUE </b>
                
                
             </td>
             <td style={{borderCollapse:"collapse"}}>
                 <table>
                     <tr style={{borderCollapse:"collapse",width:"100%"}}>
                         <td>MW/MW1  …………………….Ohms</td>
                     </tr>
                     <tr><td>MW2  …………………….Ohms </td></tr>
                     <tr><td>AW/M3  …………………….Ohms </td></tr>
                 </table>
                
                </td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>14</td>
             
             <td style={{borderCollapse:"collapse"}}>
                 
             <b> Capacitor value</b>
                 
                 
                
                </td>
             <td style={{borderCollapse:"collapse"}}>
     
                 RUN CapmF/V
                 
                </td>
             <td >
                 START CapmF/V    
                     
                
                </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>15</td>
             
             <td style={{borderCollapse:"collapse"}}>
             <b> Current value </b>
                
                </td>
             <td style={{borderCollapse:"collapse"}}>
             No Load Current 
                
                </td>
             <td >
                 Full Load Current
                </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>16</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>Bearings Nos DE/NDE</b>  &nbsp; &nbsp; &nbsp; &nbsp;   <b>OK/Def</b>
                
                
                </td>
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>17</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>CHALLAN NO & DATE</b>
      
             </td>
             
             <td></td><td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>18</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>BILL NO & DATE </b>
                
                
                </td>
             
             <td><b>Invoice no. </b></td>
             <td><b>Date :- </b>
             </td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>19</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>CUSTOMERs NAME & MOBILE NUMBER </b>
                
                
                </td>
             
             <td></td>
             <td><b>E Mail ID </b></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>20</td>
             <td style={{borderCollapse:"collapse"}}>
                 <div style={{marginTop:"25px",marginBottom:"25px"}}>
                 <b>CUSTOMERs ADDRESS</b>
             </div>
             
                
                </td>
             
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>21</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>DEALERs NAME & MOBILE NUMBER & e
                 Mail ID</b>
             
             
                
                </td>
             
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>22</td>
             <td style={{borderCollapse:"collapse"}}>
             <b> DEALERs ADDRESS </b>
             
             
                
                </td>
             
             <td></td>
             <td></td>
         </tr>
         <tr>
             <td className={`text-center m-0`}>23</td>
             <td style={{borderCollapse:"collapse"}}>
             <b>Action to be Taken Or Remarks If Any<br/>
             Findings if any </b>
             
             
                
                </td>
             
             <td></td>
             <td><b>By CGL</b></td>
         </tr>
         <tr>
             <td></td>
             <td colSpan={3} style={{borderCollapse:"collapse"}}>
                 <div style={{display: "flex"}}>
                     <div style={{marginTop:"50px"}}>
                     <b>NAME & SIGNATURE OF CUSTOMER </b>
                        
                     </div>
                     <div style={{marginTop:"50px", marginLeft:"450px"}}>
                     <b> NAME & SIGNATURE OF ASC ENGINEER</b>
                     </div>
                 </div>
             
             </td>
             
             
         </tr>
        </table>
        </div>
       )
}

export default FHPEmpty