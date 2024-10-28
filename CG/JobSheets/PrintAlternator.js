// PrintComponent.js
import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import PrintableComponent from './PrintableComponent';
import AlternatorSheet from './AlternatorSheet';
import AlternatorSheetEmpty from './AlternatorSheetEmpty';

const PrintAlternator = () => {
  const componentRef = useRef();
  const[hide, setHide] = useState(true);

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div style={{ /*position: 'absolute', top: '-9999px', left: '-9999px' */}}>  
        <PrintableComponent ref={componentRef} sheet={<AlternatorSheet/>}/>
      </div>
    </div>
  );
};

export default PrintAlternator;
