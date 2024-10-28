import React from 'react';
import logoSmall from "../../../Assets/CGLogo.jpg";


const EmptyJobSheet = () => {
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
            <td colSpan={2}><strong>Manage By:</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Service Technician:</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Address:</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Place:</strong> </td>
          </tr>
          <tr>
            <td colSpan={2}><strong>State:</strong> </td>
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
            <td colSpan={2}><strong>Ticket No:</strong> </td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Log Date:</strong> </td>
          </tr>
          <tr>
            <td style={{width: '30%'}}><strong>Field:</strong> </td>
            <td><strong>Workshop:</strong> </td>
          </tr>
          <tr>
            <td><strong>Warranty:</strong> </td>
            <td><strong>Outside Warranty:</strong> </td>
          </tr>
          <tr>
            <td><strong>Service:</strong> </td>
            <td><strong>Installation/Comm.:</strong> </td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Source of Complaint:</strong> </td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Medium of complaint:</strong> </td>
          </tr>
          <tr>
            <td style={{width: '70%'}} colSpan={2}><strong>Visit Scheduled:</strong></td>
          </tr>
        </tbody></table>
    </div>
  </div>
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
                  <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Company Name:</strong> </div></td>
                </tr>
                <tr>
                  <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Customer Name:</strong> </div></td>
                </tr>
                <tr>
                  <td style={{width: '30%', border: 'none'}}><div style={styles.company}><strong>Mobile:</strong>  </div></td>
                  <td style={{border: 'none'}}><div style={styles.company}><strong>Email:</strong></div></td>
                </tr>
                <tr>
                  <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Address:</strong> </div></td>
                </tr>
                <tr>
                  <td colSpan={2} style={{border: 'none'}}><div style={styles.company}><strong>Landmark:</strong></div></td>
                </tr>
              </tbody></table>
          </td>
          <td colSpan={2} style={styles.customerDetails}>
            <div style={styles.company}><strong>Dealer Name:</strong></div>
            <div style={styles.company}><strong>Invoice Number:</strong></div>
            <div style={styles.company}><strong>Invoice Date:</strong> </div>
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
                  <td style={{border: 'none'}}><div style={styles.company}><strong>New [&nbsp; ] Used [&nbsp; ] Tampered [&nbsp; ] Broken [&nbsp; ]</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company}><strong>Product Division:</strong></div></td>
                  <td style={{border: 'none'}}><div style={styles.company}><strong>Product Line:</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company}><strong>Product Model:</strong></div></td>
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
                  <td style={{border: 'none'}}><div style={styles.company}><strong>KVA/KW:</strong></div></td>
                  <td style={{border: 'none'}}>
                    <table style={{border: 'none'}}>
                      <tbody><tr>
                          <td style={{border: 'none'}}><strong>RPM:</strong></td>
                          <td style={{border: 'none'}}><strong>Frame:</strong></td>
                          <td style={{border: 'none'}}><strong>Hour Run:</strong></td>
                        </tr>
                      </tbody></table>
                  </td>
                  
                </tr>
                <tr>
                    <td style={{border: 'none'}}><div style={styles.company}><strong>Serial No.:</strong></div></td>
                </tr>
              </tbody></table>
          </td>
          <td colSpan={2} style={styles.customerDetails}>
            <table style={{border: 'none', borderCollapse: 'collapse'}}>
              <tbody><tr>
                  <td style={{border: 'none', width: '45%'}} colSpan={3}><div style={styles.company}><strong>Fault Reported:</strong> </div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Defect Observed:</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Site Condition (Volt/Amp):</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company}><strong>Status of Installation:</strong></div></td>
                  <td style={{border: 'none'}}><strong>OK [ &nbsp;]</strong></td>
                  <td style={{border: 'none'}}><strong>Not OK [ &nbsp;]</strong></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Cable Used:</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Whether Starter Used:</strong></div></td>
                </tr>
                <tr>
                  <td style={{border: 'none'}}><div style={styles.company} colSpan={3}><strong>Action Taken:</strong></div></td>
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
          <th style={{textAlign: 'center', border: '1px solid #000'}}>Unit Price</th>
          <th style={{textAlign: 'center', border: '1px solid #000'}}>Total</th>
        </tr>
        <tr>
          <td colSpan={5} style={{textAlign: 'center', border: '1px solid #000'}}>Grand Total</td>
          <td>0</td>
        </tr>
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
          <p style={{marginBottom:"10px"}}><strong>Happy Code</strong></p>
          </td>
          <td />
          <td style={{width: '15%', border: '1px solid #000'}}>
            <p style={{marginBottom:"10px"}}><strong>Replacement Tag</strong></p>
          </td>
          <td />
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
            Saran Chambers II 3rd Floor, 5 Park Road Lucknow Uttar Pradesh 226001
            <p><strong>Website: </strong><a href="https://www.cgglobal.com/">https://www.cgglobal.com/</a></p>
          </td>
        </tr>
      </tbody></table>
  </div>
</div>
        </>
    
  );
};

export default EmptyJobSheet;
