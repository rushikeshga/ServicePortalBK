// PrintableComponent.js
import React from 'react';
import JobSheet from './JobSheet';
import EmptyJobSheet from './EmptyJobSheet';

const PrintableComponent = React.forwardRef((props, ref) => {

  return (
    <div ref={ref}>
      {/* <h1>Hello, World!</h1>
      <p>This is a printable component.</p> */}
      {/* <JobSheet/> */}
      {props.sheet}
    </div>
  );
});

export default PrintableComponent;
