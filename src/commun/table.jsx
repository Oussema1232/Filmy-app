import React, { Component } from "react";
import TbaleHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { columns, onSort, sortColumn, data } = this.props;
    return (
      <table className="table table-primary ">
        <TbaleHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
