import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({
  columns,
  data,
  title,
  expandableRowsComponent,
}) => {
  const customStyles = {
    table: {
      style: {
        border: "1px solid lightgray",
        // color: "white",
        // backgroundColor: "#1e293b",
        padding: "8px 20px",
      },
    },
    header: {
      style: {
        // color: "white",
        // backgroundColor: "#1e293b",
        padding: "0 20px",
      },
    },
    headRow: {
      style: {
        // color: "white",
        // backgroundColor: "#1e293b",
        fontSize: "15px",
        padding: "20px 0px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    rows: {
      style: {
        // color: "white",
        // borderBottom: "1px solid black",
        // backgroundColor: "#1e293b",
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
    expanderCell: {
      style: {
        flex: "0 0 48px",
      },
    },
    expanderRow: {
      style: {
        // backgroundColor: "#1e293b",
        width: "100%",
      },
    },
    expanderButton: {
      style: {
        // backgroundColor: "#1e293b",
        // color: "white",
      },
    },
  };

  return (
    <div className=" ">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        expandableRows={expandableRowsComponent && true}
        expandableRowsComponent={expandableRowsComponent}
        customStyles={customStyles}
      />
    </div>
  );
};

export default DataTableComponent;
