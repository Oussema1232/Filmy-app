import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  getElement = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.key || column.path);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr  key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.getElement(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
