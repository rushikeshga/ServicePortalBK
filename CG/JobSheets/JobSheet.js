import React, { useEffect, useState } from 'react';
import logoSmall from "../../../Assets/CGLogo.jpg";
import { Result } from 'antd';
import moment from 'moment';


const JobSheet = (props) => {
    // const [custData, setCustData]  = useState({});
    const styles = {
        body: {
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            margin: "0",
            padding: "20px"
        },
        header: {
            textAlign: "center",
            border: "1px solid #000"
        },
        headerImg: {
            width: "100px"
        },
        bottomSectionTable: {
            width: "100%",
            borderCollapse: "collapse"
        },
        bottomSectionTableElements: {
            border: "1px solid #000"
        },
        bottomSectionTableText: {
            textAlign: "left"
        },
        page: {
            size: "A4"
        },
        sectionTable: {
            width: "100%",
            borderCollapse: "collapse",
            border: '1px solid #000'
        },
        sectionTableElements: {
            border: "1px solid #000"
        },
        sectionTableText: {
            padding: "8px",
            textAlign: "left"
        },
        threeColumns: {
            display: "flex",
            border: "1px solid #000"
        },
        threeColumnsDiv: {
            boxSizing: "border-box"
        },
        serviceNeeds: {
            width: "40%",
            borderRight: "1px solid #000"
        },
        noSpacingTd: {
            padding: "0"
        },
        authorizedBy: {
            display: "flex"
        },
        paddingTop100: {
            paddingTop: "100px"
        },
        ticketNo: {
            display: "flex",
            width: "40%"
        },
        soc: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between"
        },
        customerDetails: {
            width: "50%",border: '1px solid #000'
        },
        company: {
            paddingBottom: "5px",
            paddingTop: "5px"
        },
        spacing: {
            display: "flex"
        },
        charges: {
            paddingBottom: "5px",
            paddingTop: "5px"
        }
    };
    let custData = props.custData;

    let token = localStorage.getItem("UserToken");
    let ticInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    // console.log("ticInfo[0]")

    // console.log(ticInfo[0])
    // console.log(ticInfo[0].sernr)
    // useEffect(()=>{
    //   fetch(`${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${ticInfo[0].sernr}&ProductCode=${ticInfo[0].matnr}&InvoiceDate=${props?.invDate}&DivisionCode=${ticInfo[0]?.divisionCode}`,{
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => res.json())
    //   .then((result)=>{
    //     setCustData(result[0]);
    //   })
    // },[])
  return (
    
    <>
    <div style={styles.body} className='sectionCP'>
  <div style={styles.header}>
    <div style={{padding: 10}}><strong>Job Sheet</strong></div>
  </div>
  <div style={styles.threeColumns}>
    <div style={styles.serviceNeeds}>
      <div style={{padding: 10}}>
        <img src={logoSmall} alt="CG Logo" />
      </div>
      <div style={{marginLeft:'3px'}}>
          <strong>For Product Service Needs</strong><br />
          Call Toll Free - 18002670505<br />
          WhatsApp Number - 9152670505
      </div>
      
    </div>
    <div  style={{borderRight: '1px solid #000', width: '35%',display: "flex"}}>
      <table style={{border: 'none', borderCollapse: 'collapse'}}>
        <tbody><tr>
            <td colSpan={2}><strong>Authorized By:</strong> CG Power and Industrial Solutions Limited</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Manage By:</strong>{custData?.ascName}</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Service Technician:</strong>{custData?.technicianName}</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Address:</strong>{custData?.ascAddress}</td>
          </tr>
          {/* <tr>
            <td colSpan={2}><strong>Place:</strong> </td>
          </tr> */}
          <tr>
            <td colSpan={2}><strong>State:</strong> {custData?.ascState}</td>
          </tr>
          <tr>
            <td style={{width: '70%'}}><strong>Working Time:</strong> 9:30 AM to 5:30 PM</td>
            <td><strong>Weekly Closed:</strong> Sunday</td>
          </tr>
        </tbody></table>
    </div>
    <div style={styles.ticketNo}>
      <table style={{border: 'none', borderCollapse: 'collapse', width: '100%'}}>
        <tbody><tr>
            <td colSpan={2}><strong>Ticket No:</strong> {custData.serviceTicketNumber}</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Log Date:</strong>{custData?.requestDate && moment((custData?.requestDate.trim()?.split(" ")[0])).format("DD-MM-YYYY")} </td>
          </tr>
          <tr>
            <td style={{width: '30%'}}><strong>Field:</strong> </td>
            <td><strong>Workshop:</strong> </td>
          </tr>
          <tr>
            <td><strong>Warranty:</strong>{custData.warrantyStatus == "Out Of Warranty"?"No":"Yes"}</td>
            <td><strong>Outside Warranty:</strong> </td>
          </tr>
          <tr>
            <td><strong>Service:</strong> </td>
            <td><strong>Installation/Comm.:</strong> </td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Source of Complaint:</strong>{custData?.defectDesc}</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Medium of complaint:</strong> </td>
          </tr>
          <tr>
            <td style={{width: '70%'}} colSpan={2}><strong>Visit Scheduled:</strong> 
            {custData?.customerContactDate && moment((custData?.customerContactDate.trim()?.split(" ")[0])).format("DD-MM-YYYY")}
            </td>
            {/* 4/3/2024 2:50:27 PM */}
          </tr>
        </tbody></table>
    </div>
  </div>
  <div >
    <div >
    {/* no-spacing */}
      <table style={styles.sectionTable}>
        <tbody><tr>
            <td colSpan={2} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Customer Details</strong>
            </td>
            <td colSpan={2} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Purchase Details</strong>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={styles.customerDetails}>
              <table style={{border: 'none', borderCollapse: 'collapse', width: '100%'}}>
                <tbody><tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Company Name:</strong> {custData?.customerName}</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Customer Name:</strong> {custData?.contactPerson}</div></td>
                  </tr>
                  <tr>
                    <td style={{width: '30%', border: 'none'}}><div style={styles.company}><strong>Mobile:</strong>{custData.primaryMobileNo} </div></td>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Email:</strong>{custData.emailId}</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Site Address:</strong> {custData?.siteAddress}</div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Landmark:</strong></div></td>
                  </tr>
                </tbody></table>
            </td>
            <td colSpan={2} style={styles.customerDetails}>
              <div style={styles.company}><strong>Dealer Name:</strong>{custData.purchaseFrom}</div>
              <div style={styles.company}><strong>Invoice Number:</strong>{custData?.invoiceNo}</div>
              <div style={styles.company}><strong>Invoice Date:</strong>
              {(custData?.invoiceDate) ? moment((custData?.invoiceDate.trim()?.split(" ")[0])).format("DD-MM-YYYY"):""}
              </div>
              
            </td>
          </tr>
        </tbody></table>
    </div>
    <div >
    {/* no-spacing */}
      <table style={styles.sectionTable}>
        <tbody><tr>
            <td colSpan={2} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Product Details</strong>
            </td>
            <td colSpan={2} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Issue Reported/Action Taken</strong>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={styles.customerDetails}>
              <div>
              </div><table style={{border: 'none'}}>
                <tbody><tr>
                    <td style={{border: 'none', width: '45%'}}><div style={styles.company}><strong>Product Condition:</strong></div></td>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>New [&nbsp;&nbsp;&nbsp;] Used [&nbsp;&nbsp;&nbsp;] Tampered [&nbsp;&nbsp;&nbsp;] Broken [&nbsp;&nbsp;&nbsp;]</strong></div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Product Division:</strong>{custData?.divisionName}</div></td>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Product Line:</strong>{custData?.productLineName}</div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Product Model:</strong>{custData?.productCode}</div></td>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Model:</strong></div></td>
                  </tr>
                  {/* <tr>
                            
                            <td class={styles.company} style="border: none;"></td>
                        </tr> */}
                  <tr>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Additional Information:</strong></div></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Accessories Received:</strong></div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>KVA/KW:</strong>{custData.kva}</div></td>
                    <td style={{border: 'none'}}>
                      <table style={{border: 'none', width:'100%'}}>
                        <tbody><tr>
                            <td style={{border: 'none', width:'50%'}}><strong>RPM:</strong></td>
                            <td style={{border: 'none'}}><strong>Frame:</strong>{custData.frame}</td>
                            </tr>
                        </tbody></table>
                    </td>
                  </tr>
                  <tr>
                      <td style={{border: 'none'}}><div style={styles.company}><strong>Serial No.:</strong>{custData.serialNo}</div></td>
                      <td style={{border: 'none'}}>
                      <table style={{border: 'none'}}>
                        <tbody><tr>
                            <td style={{border: 'none'}}><strong>Hour Run:</strong>{custData.noOfHours}</td>
                          </tr>
                        </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
            </td>
            <td colSpan={2} style={styles.customerDetails}>
              <table style={{border: 'none', borderCollapse: 'collapse'}}>
                <tbody><tr>
                    <td style={{border: 'none', width: '45%'}} colSpan={3}><div style={styles.company}><strong>Fault Reported:</strong> </div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Defect Observed:</strong>{custData.defectObserved}</div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Site Condition (Volt/Amp):</strong></div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Status of Installation:</strong></div></td>
                    <td style={{border: 'none'}}><strong>OK [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</strong></td>
                    <td style={{border: 'none'}}><strong>Not OK [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</strong></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Cable Used:</strong></div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Whether Starter Used:</strong></div></td>
                  </tr>
                  <tr>
                    <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Action Taken:</strong>{custData.closureRemarks}</div></td>
                  </tr>
                  
                </tbody></table>
            </td>
          </tr>
        </tbody></table>
    </div>
    <div >
      <table style={styles.sectionTable}>
        <tbody><tr >
            <td colSpan={6} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Part Used</strong>
            </td>
          </tr>
          <tr>
            <th style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>S.No</th>
            <th style={{width: 180, textAlign: 'center', border: '1px solid #000'}}>Spare Code</th>
            <th style={{width: 270, textAlign: 'center', border: '1px solid #000'}}>Description</th>
            <th style={{width: 80, textAlign: 'center', border: '1px solid #000'}}>Qty</th>
            <th style={{textAlign: 'center', border: '1px solid #000'}}>Serial Number</th>
          </tr>
          {custData.spareDetails.map((x, i) => {
                                                          return (
                                                              <>
                                                                  <tr key={i}>
                                                                      
                                                    

                                                                      
                                                                      <td style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>
                                                                      {i+1}


                                                                      </td>
                                                                      <td style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>
                                                                      {x.spareCode}
                                                                    
                                                                      </td>
                                                                      <td style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>
                                                                      {x.spareDescription}
                                                                    
                                                                      </td>
                                                                      <td style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>
                                                                      {x.qty}
                                                                    
                                                                      </td>
                                                                      <td style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>
                                                                      {x.spareSerialNumber}
                                                                    
                                                                      </td>
                                                                      
                                                                      

                                                                      
                                                                      
                                                                      



                                                                      

                                                                  </tr>








                                                              </>
                                                          )

                                                      })}

          {/* {
            custData.spareDetails.map((obj,i)=>{
              return 
                (<>
                <tr key={i}>
                  <th style={{width: 150, textAlign: 'center', border: '1px solid #000'}}>{i+1}</th>
                  <th style={{width: 180, textAlign: 'center', border: '1px solid #000'}}>{obj.spareCode}</th>
                  <th style={{width: 270, textAlign: 'center', border: '1px solid #000'}}>{obj.spareDescription}</th>
                  <th style={{width: 80, textAlign: 'center', border: '1px solid #000'}}>{obj.qty}</th>
                  <th style={{textAlign: 'center', border: '1px solid #000'}}>{obj.spareSerialNumber}</th>
          
                </tr></>)
            })
          } */}
          
        </tbody></table>
    </div>
    <div >
      <table style={styles.sectionTable}>
        <tbody><tr>
            <td colSpan={2} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Provisional Receipt</strong>
            </td>
          </tr>
          <tr>
            <td style={{width: '50%', border: '1px solid #000'}}>
              <div style={styles.charges}><strong>Service Charges [A]:</strong></div> 
              <div style={styles.charges}> <strong>GST:</strong></div> 
              <div style={styles.charges}> <strong>Total:</strong></div> 
            </td>
            <td style={{width: '50%', border: '1px solid #000'}}>
              <div style={styles.charges}><strong>Material Charges [B]:</strong></div> 
              <div style={styles.charges}><strong>GST:</strong></div> 
              <div style={styles.charges}><strong>Total:</strong></div> 
            </td>
          </tr>
          <tr>
            <td style={{border: '1px solid #000'}}>
              <div style={{textAlign: 'center'}}> <strong>Total Amount [A+B] (INR)</strong></div>
            </td>
            <td>
            </td>
          </tr>
        </tbody></table>
    </div>
    <div >
      <table style={styles.sectionTable}>
        <tbody><tr>
            <td style={{width: '15%', border: '1px solid #000'}}>
              <strong>Happy Code</strong>
            </td>
            <td />
            <td style={{width: '15%', border: '1px solid #000'}}>
              <strong>Replacement Tag</strong>
            </td>
            <td >
              {custData?.replacementTagApplied}
              </td>
          </tr>
        </tbody></table>
    </div>
    <div>
      <table style={styles.sectionTable}>
        <tbody><tr>
            <td colSpan={4} style={{textAlign: 'center', border: '1px solid #000'}}>
              <strong>Acknowledgement</strong>
            </td>
          </tr>
          <tr>
            <td style={{height: 100, width: '30%', border: '1px solid #000'}} />
            <td style={{height: 100, width: '30%', border: '1px solid #000'}} />
            <td rowSpan={2} style={{width: '40%', textAlign: 'center', border: '1px solid #000'}}>
              <div style={{paddingTop: 80}}>
                <strong>
                  _______________________________________<br />
                  Customer Signature &amp; Date:<br />
                  I hereby acknowledge that I am satisfied with the repair/installation of my equipment</strong>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{textAlign: 'center', border: '1px solid #000'}}> <strong>ASC Signature &amp; Date</strong><br /> </td>
            <td style={{textAlign: 'center', border: '1px solid #000'}}> <strong>Technician Name, Signature &amp; Date</strong><br /> </td>
          </tr>
        </tbody></table>
    </div>
    <div >
      <table  style={styles.bottomSectionTable}>
        <tbody><tr>
            <td style={{width: '30%', textAlign: 'center', border: '1px solid #000'}}>
              <strong>Registered Office Address</strong> 
            </td>
            <td style={{border: '1px solid #000'}}>
              {custData?.branchAddress}
              <p><strong>Website: </strong><a href="https://www.cgglobal.com/">https://www.cgglobal.com/</a></p>
            </td>
          </tr>
        </tbody></table>
    </div>
</div>
</div>
        </>
    
  );
};

export default JobSheet;
