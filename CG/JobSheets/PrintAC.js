// PrintComponent.js
import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import PrintableComponent from './PrintableComponent';
import ACJobSheet from './ACJobSheet';
import ACJobSheetEmpty from './ACJobSheetEmpty';

const PrintAC = () => {
  const componentRef = useRef();
  const[hide, setHide] = useState(true);

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div style={{ /*position: 'absolute', top: '-9999px', left: '-9999px' */}}>  
        <PrintableComponent ref={componentRef} sheet={<ACJobSheet/>}/>
      </div>
    </div>
  );
};

export default PrintAC;
