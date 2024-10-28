// PrintComponent.js
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PrintableComponent from './PrintableComponent';
import JobSheet from './JobSheet';
import FHP from './FHP';
import FHPEmpty from './FHPEmpty';

const PrintFHP = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <PrintableComponent ref={componentRef} sheet={<FHPEmpty/>}/>
    </div>
  );
};

export default PrintFHP;
