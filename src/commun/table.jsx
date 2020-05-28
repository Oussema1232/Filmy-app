import React, { Component } from "react";
import TbaleHeader from "./tableHeader";
import TableBody from "./tableBody";
import  ThemeContext  from "./context/themeContext";

class Table extends Component {
  render() {
    const { columns, onSort, sortColumn, data } = this.props;
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <table className={`table table-${theme.tableColor}`}>
            <TbaleHeader
              columns={columns}
              onSort={onSort}
              sortColumn={sortColumn}
            />
            <TableBody data={data} columns={columns} />
          </table>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Table;
