import React, { useState, useMemo, useEffect } from "react";
// import { MaterialReactTable } from 'material-react-table';
import { LiaDownloadSolid } from "react-icons/lia";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { Button as Btn, Form, Table } from "react-bootstrap";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import * as XLSX from "xlsx";

import * as XLSXStyle from 'xlsx-js-style';

import { Link, NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";

// import React, { useState } from 'react';
import { Collapse, Checkbox, Button } from "antd";
import { saveAs } from "file-saver";
import Spinner from "./Spinner";
// import 'antd/dist/antd.css';

const { Panel } = Collapse;

const columns = [
  // {
  //   accessorKey: "UserID",
  //   header: "User ID",
  //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },

  // },
  {
    accessorKey: "Name",
    header: "Name",
    // Cell:({cell})=>{
    //   let imurl=cell.getValue();

    //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
    // }
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  //   {
  //     accessorKey: "DoctorName",
  //     header: "Doctor Name",
  //   },
  //   {
  //     accessorKey: "PatientName",
  //     header: "Name",
  //   },

  //   {
  //     accessorKey: "InvoiceNo",
  //     header: "Invoice No.",
  //     // Cell:({cell})=>{
  //     //   let date=cell.getValue();
  //     //   return <div>{date.split(" ")[0]}</div>
  //     // }
  //   },
  //   {
  //     accessorKey: "AmountPaid",
  //     header: "Paid Amount",
  //   },
  //   {
  //     accessorKey: "PayDate",
  //     header: "Paid Date",
  //     Cell:({cell})=>{
  //       let date=cell.getValue();
  //       return <div>{date.split(" ")[0]}</div>
  //     },
  //     filterFn: (row, id, filterValue) =>
  // row.getValue(id).startsWith(filterValue),
  //   },
  //   {
  //     accessorKey: "PaymentMode",
  //     header: "Payment Mode",
  //   },
];

export const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

///for CSV download and the columns having array
// export const handleExportRows = (rows, ignoredColumns) => {
//   const rowData = rows.map((row) => {
//     const filteredRow = Object.keys(row.original)
//       .filter((key) => !ignoredColumns.includes(key))
//       .reduce((obj, key) => {
//         if (Array.isArray(row.original[key])) {
//           // If column value is an array, stringify each object within the array
//           obj[key] = row.original[key].map((item) => JSON.stringify(item)).join(', ');
//         } else {
//           obj[key] = row.original[key];
//         }
//         return obj;
//       }, {});
//     return filteredRow;
//   });

//   const csv = generateCsv(csvConfig)(rowData);
//   download(csvConfig)(csv);
// };

// for CSV download and the columns having array also to remove keys from that array

// export const handleExportRows = (rows, ignoredColumns, keysToRemove) => {
//   const rowData = rows.map((row) => {
//     const filteredRow = Object.keys(row.original)
//       .filter((key) => !ignoredColumns.includes(key))
//       .reduce((obj, key) => {
//         if (Array.isArray(row.original[key])) {
//           // If column value is an array, stringify each object within the array
//           obj[key] = row.original[key].map((item) => {
//             // Remove keys specified in keysToRemove
//             const filteredItem = { ...item };
//             keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
//             return JSON.stringify(filteredItem); // Stringify the object
//           }).join(', '); // Join the stringified objects with a delimiter
//         } else {
//           obj[key] = row.original[key];
//         }
//         return obj;
//       }, {});
//     return filteredRow;
//   });

//   const csv = generateCsv(csvConfig)(rowData);
//   download(csvConfig)(csv);
// };

// and to remove null columns

// export const handleExportRows = (rows, ignoredColumns = [], keysToRemove = []) => {
//   const rowData = rows?.map((row) => {
//     const filteredRow = Object.keys(row?.original)
//       .filter((key) => {
//         // Ensure ignoredColumns is an array and check if the column is not in ignoredColumns
//         return Array.isArray(ignoredColumns) && !ignoredColumns.includes(key);
//       })
//       .reduce((obj, key) => {
//         // Ignore columns with null data
//         if (row.original[key] !== null && row.original[key] !== undefined) {
//           if (Array.isArray(row.original[key])) {
//             // If column value is an array, stringify each object within the array
//             obj[key] = row.original[key].map((item) => {
//               // Remove keys specified in keysToRemove
//               const filteredItem = { ...item };
//               keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
//               return JSON.stringify(filteredItem); // Stringify the object
//             }).join(', '); // Join the stringified objects with a delimiter
//           } else {
//             obj[key] = row.original[key];
//           }
//         }
//         return obj;
//       }, {});
//     return filteredRow;
//   });

//   const csv = generateCsv(csvConfig)(rowData);
//   download(csvConfig)(csv);
// };

// with date format

// export const handleExportRows = (rows, ignoredColumns = [], keysToRemove = []) => {
//   const rowData = rows?.map((row) => {
//     const filteredRow = Object.keys(row?.original)
//       .filter((key) => {
//         // Ensure ignoredColumns is an array and check if the column is not in ignoredColumns
//         return Array.isArray(ignoredColumns) && !ignoredColumns.includes(key);
//       })
//       .reduce((obj, key) => {
//         // Format date columns
//         if (row.original[key] instanceof Date) {
//           const date = row.original[key];
//           const day = date.getDate().toString().padStart(2, '0');
//           const month = (date.getMonth() + 1).toString().padStart(2, '0');
//           const year = date.getFullYear();
//           obj[key] = `${day}/${month}/${year}`; // Format date in "DD--MM--YYYY" format
//         } else if (typeof row.original[key] === 'string' && row.original[key].match(/^\d{2}\/\d{2}\/\d{4}/)) {
//           const parts = row.original[key].split('/');
//           const day = parts[1].padStart(2, '0');
//           const month = parts[0].padStart(2, '0');
//           const year = parts[2];
//           obj[key] = `${day}/${month}/${year}`; // Format date in "DD--MM--YYYY" format
//         } else if (row.original[key] !== null && row.original[key] !== undefined) {
//           if (Array.isArray(row.original[key])) {
//             // If column value is an array, stringify each object within the array
//             obj[key] = row.original[key].map((item) => {
//               // Remove keys specified in keysToRemove
//               const filteredItem = { ...item };
//               keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
//               return JSON.stringify(filteredItem); // Stringify the object
//             }).join(', '); // Join the stringified objects with a delimiter
//           } else {
//             obj[key] = row.original[key];
//           }
//         }
//         return obj;
//       }, {});

//     return filteredRow;
//   });

//   const csv = generateCsv(csvConfig)(rowData);
//   download(csvConfig)(csv);
// };
// // -----working-------
// export const handleExportRows = (rows,customHeaders = {}, ignoredColumns = [], keysToRemove = []) => {
//   const rowData = rows?.map((row) => {
//     const filteredRow = Object.keys(row?.original)
//       .filter((key) => {
//         // Ensure ignoredColumns is an array and check if the column is not in ignoredColumns
//         return Array.isArray(ignoredColumns) && !ignoredColumns.includes(key);
//       })
//       .reduce((obj, key) => {
//         // Format date columns
//         if (row.original[key] instanceof Date) {
//           const date = row.original[key];
//           const day = date.getDate().toString().padStart(2, '0');
//           const month = (date.getMonth() + 1).toString().padStart(2, '0');
//           const year = date.getFullYear();
//           obj[key] = `${day}/${month}/${year}`; // Format date in "DD--MM--YYYY" format
//         } else if (typeof row.original[key] === 'string' && row.original[key].match(/^\d{2}\/\d{2}\/\d{4}/)) {
//           const parts = row.original[key].split('/');
//           const day = parts[1].padStart(2, '0');
//           const month = parts[0].padStart(2, '0');
//           const year = parts[2];
//           obj[key] = `${day}/${month}/${year}`; // Format date in "DD--MM--YYYY" format
//         } else if (row.original[key] !== null && row.original[key] !== undefined) {
//           if (Array.isArray(row.original[key])) {
//             // If column value is an array, stringify each object within the array
//             obj[key] = row.original[key].map((item) => {
//               // Remove keys specified in keysToRemove
//               const filteredItem = { ...item };
//               keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
//               return JSON.stringify(filteredItem); // Stringify the object
//             }).join(', '); // Join the stringified objects with a delimiter
//           } else {
//             obj[key] = row.original[key];
//           }
//         }
//         return obj;
//       }, {});

//     // Reorder the keys of filteredRow to match the order of columns in the table
//     const reorderedRow = {};
//     Object.keys(row.original).forEach((key) => {
//       if (filteredRow.hasOwnProperty(key)) {
//         reorderedRow[customHeaders[key] || key] = filteredRow[key];
//       }
//     });

//     return reorderedRow;
//   });

//   const csv = generateCsv(csvConfig)(rowData);
//   download(csvConfig)(csv);
// };
// // -------------working---------

// ------------------new updated for sheet2---------------

export const handleExportRows = (
  rows,
  customHeaders = {},
  ignoredColumns = [],
  keysToRemove = [],
arrayKeyForSheet2 = 'leadFollowupList',
sheet1Name="Sheet1",
  additionalSheetName = "AdditionalData",
  includeAdditionalSheet=false
) => {

 // Ensure keysToRemove is always an array
 if (!Array.isArray(keysToRemove)) {
  keysToRemove = [];
}


 // Function to process row data
 const processRowData = (row) => {
  const filteredRow = Object.keys(row?.original)
    .filter((key) => {
      // Ensure ignoredColumns is an array and check if the column is not in ignoredColumns
      return Array.isArray(ignoredColumns) && !ignoredColumns.includes(key);
    })
    .reduce((obj, key) => {
      // Format date columns
      if (row.original[key] instanceof Date) {
        const date = row.original[key];
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        obj[key] = `${day}/${month}/${year}`; // Format date in "DD-MM-YYYY" format
      } else if (typeof row.original[key] === 'string' && row.original[key].match(/^\d{2}\/\d{2}\/\d{4}/)) {
        const parts = row.original[key].split('/');
        const day = parts[1].padStart(2, '0');
        const month = parts[0].padStart(2, '0');
        const year = parts[2];
        obj[key] = `${day}/${month}/${year}`; // Format date in "DD-MM-YYYY" format
      } else if (row.original[key] !== null && row.original[key] !== undefined) {
        if (Array.isArray(row.original[key])) {
          // If column value is an array, stringify each object within the array
          obj[key] = row.original[key].map((item) => {
            // Remove keys specified in keysToRemove
            const filteredItem = { ...item };
            keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
            return JSON.stringify(filteredItem); // Stringify the object
          }).join(', '); // Join the stringified objects with a delimiter
        } else {
          obj[key] = row.original[key];
        }
      }
      return obj;
    }, {});

  // Reorder the keys of filteredRow to match the order of columns in the table
  const reorderedRow = {};
  Object.keys(row.original).forEach((key) => {
    if (filteredRow.hasOwnProperty(key)) {
      reorderedRow[customHeaders[key] || key] = filteredRow[key];
    }
  });

  return reorderedRow;
};

const rowData = rows?.map((row) => processRowData(row));

const worksheet = XLSX.utils.json_to_sheet(rowData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, sheet1Name);




const applyHeaderStyles = (worksheet) => {
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + '1';
    if (!worksheet[address]) continue;
    worksheet[address].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "005bab" } 
      },
      font: {
        bold: true,
        color: { rgb: "ffffff" } 
      }
    };
  }
};



if (includeAdditionalSheet) {
  // Extract and process data for the second sheet
  const additionalData = rows?.flatMap((row) => row.original[arrayKeyForSheet2]?.map((item) => ({
    original: item // Wrap item in an object with an 'original' key
  })) || []);

  const processedAdditionalData = additionalData.map((item) => processRowData(item));

  const additionalWorksheet = XLSX.utils.json_to_sheet(processedAdditionalData);
  XLSX.utils.book_append_sheet(workbook, additionalWorksheet, additionalSheetName);
  applyHeaderStyles(additionalWorksheet); // Apply styles to the additional worksheet
}

// ---------------backup start-----------
  // const rowData = rows?.map((row) => {
  //   const filteredRow = Object.keys(row?.original)
  //     .filter((key) => {
  //       // Ensure ignoredColumns is an array and check if the column is not in ignoredColumns
  //       return Array.isArray(ignoredColumns) && !ignoredColumns.includes(key);
  //     })
  //     .reduce((obj, key) => {
  //       // Format date columns
  //       if (row.original[key] instanceof Date) {
  //         const date = row.original[key];
  //         const day = date.getDate().toString().padStart(2, "0");
  //         const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //         const year = date.getFullYear();
  //         obj[key] = `${day}/${month}/${year}`; // Format date in "DD-MM-YYYY" format
  //       } else if (
  //         typeof row.original[key] === "string" &&
  //         row.original[key].match(/^\d{2}\/\d{2}\/\d{4}/)
  //       ) {
  //         const parts = row.original[key].split("/");
  //         const day = parts[1].padStart(2, "0");
  //         const month = parts[0].padStart(2, "0");
  //         const year = parts[2];
  //         obj[key] = `${day}/${month}/${year}`; // Format date in "DD-MM-YYYY" format
  //       } else if (
  //         row.original[key] !== null &&
  //         row.original[key] !== undefined
  //       ) {
  //         if (Array.isArray(row.original[key])) {
  //           // If column value is an array, stringify each object within the array
  //           obj[key] = row.original[key]
  //             .map((item) => {
  //               // Remove keys specified in keysToRemove
  //               const filteredItem = { ...item };
  //               keysToRemove.forEach(
  //                 (removeKey) => delete filteredItem[removeKey]
  //               );
  //               return JSON.stringify(filteredItem); // Stringify the object
  //             })
  //             .join(", "); // Join the stringified objects with a delimiter
  //         } else {
  //           obj[key] = row.original[key];
  //         }
  //       }
  //       return obj;
  //     }, {});

  //   // Reorder the keys of filteredRow to match the order of columns in the table
  //   const reorderedRow = {};
  //   Object.keys(row.original).forEach((key) => {
  //     if (filteredRow.hasOwnProperty(key)) {
  //       reorderedRow[customHeaders[key] || key] = filteredRow[key];
  //     }
  //   });

  //   return reorderedRow;
  // });



  // // ----------------------Sheet2 data--------------------------


  // // Extract data for the second sheet
  // const additionalData = rows?.flatMap((row) => row.original[arrayKeyForSheet2]?.map((item) => {
  //   const filteredItem = { ...item };
  //   keysToRemove.forEach((removeKey) => delete filteredItem[removeKey]);
  //   return filteredItem;
    
  // })) || [];


  // // -------------------------end Sheet2 data--------------------------

  // const worksheet = XLSX.utils.json_to_sheet(rowData);
  // const additionalWorksheet = XLSX.utils.json_to_sheet(additionalData);

  // const workbook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // XLSX.utils.book_append_sheet(
  //   workbook,
  //   additionalWorksheet,
  //   additionalSheetName
  // );

  // ----------------backup end----

  // XLSX.writeFile(workbook, "exported_data.xlsx"); to directly save without asking filename
 // Apply styles to headers


  applyHeaderStyles(worksheet);
  


  // Create a Blob from the workbook
  const wbout = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  // Prompt user for file name
  const fileName = prompt('Enter the file name for the exported data:', 'exported_data');
  if (fileName) {
    saveAs(blob, `${fileName}.xlsx`);
  }
};

// ------------------end new updated for sheet2---------------














export const handleExportRowsPdf = (rows) => {
  const doc = new jsPDF();
  const tableData = rows.map((row) => Object.values(row.original));
  const tableHeaders = rows.map((row) => Object.keys(row.original));
  let a = tableHeaders.filter((value, index, self) => {
    return (
      index ===
      self.findIndex(
        (t) =>
          t[0] === value[0] &&
          t[1] === value[1] &&
          t[2] === value[2] &&
          t[3] === value[3]
      )
    );
  });

  autoTable(doc, {
    head: a,
    body: tableData,
  });

  // let originalKeys=rows.map((row)=>Object.keys(row.original));

  console.log(a);

  doc.save("data.pdf");
};

function TestReport({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) {
  // const [data, setData] = useState([
  //   {
  //     Name: "Mehul Rana",
  //     Address: "Gujarat"
  //   },
  //   {
  //     Name: "Shailesh Vora",
  //     Address: "Surat"
  //   },
  //   {
  //     Name: "Sandip Mewada",
  //     Address: "Gujarat"
  //   },
  //   {
  //     Name: "Chintan Sampat",
  //     Address: "Mumbai"
  //   },
  // ])

  // -------------------------------------------------------------------------------RBAC--------------------------------------------------

  const [menuData, setMenuData] = useState([
    { id: 1, name: "Menu 1" },
    { id: 2, name: "Menu 2", children: [{ id: 4, name: "Submenu 2.1" }] },
    {
      id: 3,
      name: "Menu 3",
      children: [
        { id: 5, name: "Submenu 3.1" },
        { id: 6, name: "Submenu 3.2" },
      ],
    },
  ]);

  const [allRoles, setAllRoles] = useState(["Admin", "Manager", "User"]);

  const [rolePermissions, setRolePermissions] = useState({
    Admin: {
      1: { add: false, delete: false, update: false, read: false },
      2: { add: false, delete: false, update: false, read: false },
      3: { add: false, delete: false, update: false, read: false },
      4: { add: false, delete: false, update: false, read: false },
      5: { add: false, delete: false, update: false, read: false },
      6: { add: false, delete: false, update: false, read: false },
    },
    Manager: {
      1: { add: false, delete: false, update: false, read: false },
      2: { add: false, delete: false, update: false, read: false },
      3: { add: false, delete: false, update: false, read: false },
      4: { add: false, delete: false, update: false, read: false },
      5: { add: false, delete: false, update: false, read: false },
      6: { add: false, delete: false, update: false, read: false },
    },
    User: {
      1: { add: false, delete: false, update: false, read: false },
      2: { add: false, delete: false, update: false, read: false },
      3: { add: false, delete: false, update: false, read: false },
      4: { add: false, delete: false, update: false, read: false },
      5: { add: false, delete: false, update: false, read: false },
      6: { add: false, delete: false, update: false, read: false },
    },
  });

  const handleMenuCheckboxChange = (role, menuId, checked) => {
    const updatedPermissions = { ...rolePermissions[role] };
    const menuPermission = updatedPermissions[menuId];
    menuPermission.add = checked;
    menuPermission.delete = checked;
    menuPermission.update = checked;
    menuPermission.read = checked;

    if (menuData.find((menu) => menu.id === menuId)?.children) {
      menuData
        .find((menu) => menu.id === menuId)
        ?.children.forEach((subMenu) => {
          updatedPermissions[subMenu.id] = {
            add: checked,
            delete: checked,
            update: checked,
            read: checked,
          };
        });
    }

    setRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: updatedPermissions,
    }));
  };

  const handleSubMenuCheckboxChange = (role, menuId, checked) => {
    const updatedPermissions = { ...rolePermissions[role] };
    const submenuPermission = updatedPermissions[menuId];
    submenuPermission.add = checked;
    submenuPermission.delete = checked;
    submenuPermission.update = checked;
    submenuPermission.read = checked;

    setRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: updatedPermissions,
    }));
  };

  const handlePermissionCheckboxChange = (role, menuId, action, checked) => {
    setRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [menuId]: {
          ...prevPermissions[role][menuId],
          [action]: checked,
        },
      },
    }));
  };

  const handleRoleCheckboxChange = (role, checked) => {
    const updatedPermissions = { ...rolePermissions };
    Object.keys(updatedPermissions[role]).forEach((menuId) => {
      updatedPermissions[role][menuId].add = checked;
      updatedPermissions[role][menuId].delete = checked;
      updatedPermissions[role][menuId].update = checked;
      updatedPermissions[role][menuId].read = checked;
    });
    setRolePermissions(updatedPermissions);
  };

  const handleSubmit = () => {
    console.log("Role permissions:", rolePermissions);
    // You can add your logic to submit the data to the server here
  };

  // -----------------------------------------------server pagination------------------------------------------------

  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL("https://dummyapi.io/data/v1/user");
      url.searchParams.set("page", `${pagination.pageIndex}`);
      url.searchParams.set("limit", `${pagination.pageSize}`);
      // url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      // url.searchParams.set('globalFilter', globalFilter ?? '');
      // url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      const headers = new Headers();
      headers.append("app-id", "65e68da7231d09b08a1ceb05");

      try {
        const response = await fetch(url.href, {
          headers: headers,
        });
        const json = await response.json();
        console.log(json);
        setData(json.data);
        setRowCount(json.total);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // columnFilters,
    // globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    // sorting,
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      //column definitions...
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    // getRowId: (row) => row.phoneNumber,
    initialState: { showColumnFilters: true },
    // manualFiltering: true,
    manualPagination: true,
    // manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });



  const [loadingState, setloadingState] = useState(false)
  return (
    <>
      {/* <div className='ele'>div</div> */}
      {/* ---------------------------------grid POC-------------------------------------- */}
      {/* <MaterialReactTable  
                  columns={columns}
                  data={data}
                  initialState={{ showColumnFilters: false }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="Edit">
                  //       <IconButton 
                  //       className="edit-btn"
                  //       onClick={() => table.setEditingRow(row)}
                  //       disabled
                  //       >
                  //         <FaRegEdit/>
                  //       </IconButton>
                  //     </Tooltip>
                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         // onClick={() => handleDeleteRow(row)}
                  //       disabled

                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
                 
renderTopToolbarCustomActions={({table})=>(
    <>
    <div style={{
          display: 'flex',
          gap: '16px',
          padding: '10px',
          flexWrap: 'wrap',
        }}>

    <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> Export To CSV
        </Button>
    <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
        }
        //   startIcon={}
        >
         <LiaDownloadSolid fontSize={25} /> Export To PDF
        </Button>
            </div>
        </>

)}


                  positionActionsColumn="last"
                
                /> */}

      {/* -----------------------------------------------vertical tab POC----------------------------------- */}

      {/* 
<div class="d-flex align-items-start p-5">
  <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
  </div>
  <div class="tab-content" id="v-pills-tabContent">
    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">jgdyagdwidwhdnwdjhjeufeeeeeuefgweuifwefgjhfkehihixjndwidhwdb</div>
    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
  </div>
</div> */}

      {/* --------------------------------------------------------------role-based access control POC------------------------------------------------------ */}

      {/* <div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Roles</th>
            <th>Menu</th>
            <th>Add</th>
            <th>Delete</th>
            <th>Update</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
          {allRoles.map(role => (
            <React.Fragment key={role}>
              {menuData.map(menuItem => (
                <tr key={`${role}-${menuItem.id}`}>
                  <td>{menuItem.id === 1 ? role : null}</td>
                  <td>{menuItem.name}</td>
                  <td>
                    <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.add} onChange={(e) => handleCheckboxChange(role, menuItem.id, 'add', e.target.checked)} />
                  </td>
                  <td>
                    <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.delete} onChange={(e) => handleCheckboxChange(role, menuItem.id, 'delete', e.target.checked)} />
                  </td>
                  <td>
                    <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.update} onChange={(e) => handleCheckboxChange(role, menuItem.id, 'update', e.target.checked)} />
                  </td>
                  <td>
                    <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handleCheckboxChange(role, menuItem.id, 'read', e.target.checked)} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div> */}

      {/* <div>



      <Table responsive bordered>
        <thead>
          <tr>
            <th>Roles</th>
            <th>Menu</th>
            <th>Add</th>
            <th>Delete</th>
            <th>Update</th>
            <th>Read</th>
          </tr>
        </thead>
        
        <tbody>    
          
          {allRoles.map(role => (
            <React.Fragment key={role}>
              {menuData.map(menuItem => (
                <React.Fragment key={`${role}-${menuItem.id}`}>
                  <tr>
                    <td>{menuItem.id === 1 ? role : null}</td>
                    <td>
                      <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.add && rolePermissions[role]?.[menuItem.id]?.delete && rolePermissions[role]?.[menuItem.id]?.update && rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handleMenuCheckboxChange(role, menuItem.id, e.target.checked)} />
                      {menuItem.name}
                    </td>
                    {
                     menuItem?.children?.length>0?"":
                      <>
                      
                    <td>
                      <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.add} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'add', e.target.checked)} />
                    </td>
                    <td>
                      <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.delete} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'delete', e.target.checked)} />
                    </td>
                    <td>
                      <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.update} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'update', e.target.checked)} />
                    </td>
                    <td>
                      <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'read', e.target.checked)} />
                    </td>
                      </>
                    }
                  </tr>
                  {menuItem.children && menuItem.children.map(submenuItem => (
                    <tr key={`${role}-${submenuItem.id}`} className='px-5'>
                      <td>{null}</td>
                      <td className='text-end'>
                        <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.add && rolePermissions[role]?.[submenuItem.id]?.delete && rolePermissions[role]?.[submenuItem.id]?.update && rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handleSubMenuCheckboxChange(role, submenuItem.id, e.target.checked)} />
                        {submenuItem.name}
                      </td>
                      <td>
                        <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.add} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'add', e.target.checked)} />
                      </td>
                      <td>
                        <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.delete} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'delete', e.target.checked)} />
                      </td>
                      <td>
                        <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.update} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'update', e.target.checked)} />
                      </td>
                      <td>
                        <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'read', e.target.checked)} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div> */}

      {/* <div>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Roles</th>
              <th>Menu</th>
              <th>Add</th>
              <th>Delete</th>
              <th>Update</th>
              <th>Read</th>
            </tr>
          </thead>

          <tbody>

            {allRoles.map(role => (
              <React.Fragment key={role}>
                <tr>
                  <td>
                    <input type="checkbox" checked={Object.values(rolePermissions[role]).every(perm => perm.add && perm.delete && perm.update && perm.read)} onChange={(e) => handleRoleCheckboxChange(role, e.target.checked)} />
                    {role}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {menuData.map(menuItem => (
                  <React.Fragment key={`${role}-${menuItem.id}`}>
                    <tr>
                      <td>
                       
                        </td>
                      <td>
                        <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.add && rolePermissions[role]?.[menuItem.id]?.delete && rolePermissions[role]?.[menuItem.id]?.update && rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handleMenuCheckboxChange(role, menuItem.id, e.target.checked)} />
                        {menuItem.name}
                      </td>
                      {
                        menuItem?.children?.length > 0 ? "" :
                          <>
                            <td>
                              <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.add} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'add', e.target.checked)} />
                            </td>
                            <td>
                              <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.delete} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'delete', e.target.checked)} />
                            </td>
                            <td>
                              <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.update} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'update', e.target.checked)} />
                            </td>
                            <td>
                              <input type="checkbox" checked={rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handlePermissionCheckboxChange(role, menuItem.id, 'read', e.target.checked)} />
                            </td>
                          </>
                      }
                    </tr>
                    {menuItem.children && menuItem.children.map(submenuItem => (
                      <tr key={`${role}-${submenuItem.id}`} className='px-5'>
                        <td>{null}</td>
                        <td className='text-end'>
                          <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.add && rolePermissions[role]?.[submenuItem.id]?.delete && rolePermissions[role]?.[submenuItem.id]?.update && rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handleSubMenuCheckboxChange(role, submenuItem.id, e.target.checked)} />
                          {submenuItem.name}
                        </td>
                        <td>
                          <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.add} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'add', e.target.checked)} />
                        </td>
                        <td>
                          <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.delete} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'delete', e.target.checked)} />
                        </td>
                        <td>
                          <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.update} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'update', e.target.checked)} />
                        </td>
                        <td>
                          <input type="checkbox" checked={rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handlePermissionCheckboxChange(role, submenuItem.id, 'read', e.target.checked)} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div> */}

      {/* 
<div>
            <Collapse accordion>
                {allRoles.map(role => (
                    <Panel header={role} key={role}>
                        <div class="d-flex">
                          <div>
                            <Checkbox checked={Object.values(rolePermissions[role]).every(perm => perm.add && perm.delete && perm.update && perm.read)} onChange={(e) => handleRoleCheckboxChange(role, e.target.checked)}>
                              Select All
                              </Checkbox>
                          </div>
                          <div className='mx-3 d-flex'>
                            {menuData.map(menuItem => (
                                <div key={`${role}-${menuItem.id}`}>
                                    <Checkbox checked={rolePermissions[role]?.[menuItem.id]?.add && rolePermissions[role]?.[menuItem.id]?.delete && rolePermissions[role]?.[menuItem.id]?.update && rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handleMenuCheckboxChange(role, menuItem.id, e.target.checked)}>
                                        {menuItem.name}
                                    </Checkbox>
                                    {menuItem.children && menuItem.children.map(submenuItem => (
                                        <div key={`${role}-${submenuItem.id}`} style={{ marginLeft: '50px' }}>
                                            <Checkbox checked={rolePermissions[role]?.[submenuItem.id]?.add && rolePermissions[role]?.[submenuItem.id]?.delete && rolePermissions[role]?.[submenuItem.id]?.update && rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handleSubMenuCheckboxChange(role, submenuItem.id, e.target.checked)}>
                                                {submenuItem.name}
                                            </Checkbox>
                                        </div>
                                    ))}
                                </div>
                                                    ))}
                          </div>
                        </div>
                    </Panel>
                ))}
            </Collapse>
            <div style={{ marginTop: '20px' }}>
                <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div> */}

      {/* ---------------------------------------------------------------server pagination----------------------------------------------------- */}

      <MaterialReactTable table={table} />

      {/* --------------------------------------------------------------- */}

      <div>
        <table style={{ color: "black", margin: "50px" }}>
          <thead>
            <tr>
              <th>Roles</th>
              <th>Menu</th>
              <th>Add</th>
              <th>Delete</th>
              <th>Update</th>
              <th>Read</th>
            </tr>
          </thead>

          <tbody>
            {allRoles.map((role) => (
              <React.Fragment key={role}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={Object.values(rolePermissions[role]).every(
                        (perm) =>
                          perm.add && perm.delete && perm.update && perm.read
                      )}
                      onChange={(e) =>
                        handleRoleCheckboxChange(role, e.target.checked)
                      }
                    />
                    {role}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {menuData.map((menuItem) => (
                  <React.Fragment key={`${role}-${menuItem.id}`}>
                    <tr>
                      <td>{menuItem.id === 1 ? role : null}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            rolePermissions[role]?.[menuItem.id]?.add &&
                            rolePermissions[role]?.[menuItem.id]?.delete &&
                            rolePermissions[role]?.[menuItem.id]?.update &&
                            rolePermissions[role]?.[menuItem.id]?.read
                          }
                          onChange={(e) =>
                            handleMenuCheckboxChange(
                              role,
                              menuItem.id,
                              e.target.checked
                            )
                          }
                        />
                        {menuItem.name}
                      </td>
                      {menuItem?.children?.length > 0 ? (
                        <>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[menuItem.id]?.add
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  menuItem.id,
                                  "add",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[menuItem.id]?.delete
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  menuItem.id,
                                  "delete",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[menuItem.id]?.update
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  menuItem.id,
                                  "update",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[menuItem.id]?.read
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  menuItem.id,
                                  "read",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        </>
                      ) : null}
                    </tr>
                    {menuItem.children &&
                      menuItem.children.map((submenuItem) => (
                        <tr key={`${role}-${submenuItem.id}`} className="px-5">
                          <td>{null}</td>
                          <td className="text-end">
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[submenuItem.id]?.add &&
                                rolePermissions[role]?.[submenuItem.id]
                                  ?.delete &&
                                rolePermissions[role]?.[submenuItem.id]
                                  ?.update &&
                                rolePermissions[role]?.[submenuItem.id]?.read
                              }
                              onChange={(e) =>
                                handleSubMenuCheckboxChange(
                                  role,
                                  submenuItem.id,
                                  e.target.checked
                                )
                              }
                            />
                            {submenuItem.name}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[submenuItem.id]?.add
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  submenuItem.id,
                                  "add",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[submenuItem.id]?.delete
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  submenuItem.id,
                                  "delete",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[submenuItem.id]?.update
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  submenuItem.id,
                                  "update",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                rolePermissions[role]?.[submenuItem.id]?.read
                              }
                              onChange={(e) =>
                                handlePermissionCheckboxChange(
                                  role,
                                  submenuItem.id,
                                  "read",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      {/* {loadingState?<Spinner/>:""}

      <Form.Check type="checkbox" onChange={(e)=>{
if(e.target.checked){
  setloadingState(true)
}
else{
  setloadingState(false)
}
      }}/> */}
    </>
  );
}

export default TestReport;
