import React from 'react';

const MyTable = ({ tableData }) => {
  return (
    <div className="table-container">
      <table>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex} className="cell">
                  <div className="circle" style={{ borderColor: cellData.color }}>
                    {/* Màu trắng mặc định cho hình tròn */}
                  </div>
                  {cellData.hasDiagonal && <div className="diagonal"></div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default MyTable;