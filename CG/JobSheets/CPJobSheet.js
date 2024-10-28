// PrintComponent.js
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PrintableComponent from './PrintableComponent';
import JobSheet from './JobSheet';
import EmptyJobSheet from './EmptyJobSheet';

const CPJobSheet = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <PrintableComponent ref={componentRef} sheet={<JobSheet/>}/>
    </div>
  );
};

export default CPJobSheet;
