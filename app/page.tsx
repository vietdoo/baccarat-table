'use client';

import MyTable from '@/components/table'; // Đảm bảo đường dẫn đúng
import ScoreBoardOne from '@/components/one_scoreboard'; 
import LineChart from '@/components/linechart';
import React, { useState, useEffect } from 'react';

export interface ButtonProps {
  color: string;
  value: string;
}

const PlayButton = ({ color, value, text, setOneDimensionalData }) => {
  const buttonStyle = {
    backgroundColor: color,
    color: 'black',
  };

  const handleButtonClick = () => {
    console.log(value);
      setOneDimensionalData(prevData => [...prevData, parseInt(value)]);
  };

  return (
    <button className="play-button" style={buttonStyle} onClick={handleButtonClick}>
      {text}
    </button>
  );
};

function random_numbers(min = 40, max = 80, n = 10) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return arr;

}
const App = () => {

  const [oneDimensionalData, setOneDimensionalData] = useState([]); 
  useEffect(() => {
    setOneDimensionalData(generateRandomData(50, 70));
  }, []); 
  
  const [tableData, setTableData] = useState([]);
  const [oneTableData, setOneTableData] = useState([]);
  const [predictData, setPredictData] = useState([]);
  const [riskData, setRiskData] = useState([]);
  useEffect(() => {
    console.log('useEffect has been called!');
    setTableData(convertToTableData(oneDimensionalData));
    setOneTableData(convertToOneTableData(oneDimensionalData));
    setPredictData(random_numbers());
    setRiskData(random_numbers(0, 30));
  }, [oneDimensionalData]);

  const yourLabels = [1,2,3,4,5,6,7,8,9,10];
  const yourDatasets = [
    {
      data: predictData,
      label: "Dự đoán",
      borderColor: "rgb(62,149,205)",
      backgroundColor: "rgb(62,149,205,0.1)",
    },
    {
      data: riskData,
      label: "Rủi ro",
      borderColor: "rgb(255,165,0)",
      backgroundColor: "rgb(255,165,0,0.1)",
    },
  ];


  return (
    <div>
      <MyTable tableData={tableData} />
      <div className = "center-container">
          <ScoreBoardOne tableData={oneTableData} />
          <LineChart labels={yourLabels} datasets={yourDatasets} />;
      </div>
      
      <div className="button-container">
        <PlayButton color="blue" value = "1" text = "Player" tableData={tableData} setOneDimensionalData={setOneDimensionalData} />
        <PlayButton color="yellow" value = "0"  text = "Tie" tableData={tableData} setOneDimensionalData={setOneDimensionalData}/>
        <PlayButton color="red" value = "2"  text = "Banker" tableData={tableData} setOneDimensionalData={setOneDimensionalData}/>
      </div>
    </div>
  );
};

function generateRandomData(min, max) {
  const data = [];
  for (let i = 0; i < min + Math.floor(Math.random() * (max - min + 1)); i++) {
    const rand = Math.random();
    const value = rand < 0.1 ? 0 : rand < 0.55 ? 1 : 2; // 0: 10%, 1 và 2: 45% mỗi cái
    data.push(value);
  }
  return data;
}

function convertToTableData(arr) {
  const numRows = 10;
  const numColumns = 44;
  const initialCellValue = { color: 'white', hasDiagonal: false };

  const tableData = Array.from({ length: numRows }, () =>
    Array.from({ length: numColumns }, () => initialCellValue)
  );
  
  let current_row = 0;
  let current_col = 0;
  let col_tail = 0;
  let prev_color = arr[0];
  var color_map = {0: 'yellow', 1: 'blue', 2: 'red'};
  var last_winner = arr[0];
  tableData[current_row][current_col] = { color: color_map[prev_color], hasDiagonal: false };
  
  
  var TIE = 0;
  var PLAYER = 1;
  var BANKER = 2;
  
  for (let i = 1; i < arr.length; i++) {
    let cur_color = arr[i];
    if (cur_color == TIE) {
      if (current_row == numRows - 1) {
        col_tail += 1;
        current_row -= 1;
      } else {
        col_tail = 0;
      }
      tableData[current_row + 1][current_col + col_tail] = { color: color_map[last_winner], hasDiagonal: true };
      current_row += 1;
    } else if (prev_color == TIE) {
      if (cur_color == last_winner || last_winner == 0) {
        if (current_row == numRows - 1) {
          col_tail += 1;
          current_row -= 1;
        } else {
          col_tail = 0;
        }
        tableData[current_row + 1][current_col + col_tail] = { color: color_map[cur_color], hasDiagonal: false };
        current_row += 1;
      } else {
        tableData[0][current_col + 1] = { color: color_map[cur_color], hasDiagonal: false };
        current_col += 1;
        current_row = 0
      }
      last_winner = cur_color;
    }
    else if (cur_color == prev_color) {
      
      if (current_row == numRows - 1) {
        col_tail += 1;
        current_row -= 1;
      } else {
        col_tail = 0;
      }
      tableData[current_row + 1][current_col + col_tail] = { color: color_map[cur_color], hasDiagonal: false};
      current_row += 1;
      last_winner = cur_color;
    } else {
      tableData[0][current_col + 1] = { color: color_map[cur_color], hasDiagonal: false };
      current_col += 1;
      current_row = 0
      last_winner = cur_color;
    }
    prev_color = cur_color;
  }
  return tableData;
}


function convertToOneTableData(arr) {
  const numRows = 6;
  const numColumns = 25;
  const initialCellValue = { color: 'white', hasDiagonal: false };

  const tableData = Array.from({ length: numRows }, () =>
    Array.from({ length: numColumns }, () => initialCellValue)
  );
  
  let current_row = 0;
  let current_col = 0;
  let col_tail = 0;
  let prev_color = arr[0];
  var color_map = {0: 'yellow', 1: 'blue', 2: 'red'};
  var last_winner = arr[0];
  tableData[current_row][current_col] = { color: color_map[prev_color], hasDiagonal: false };

  var x = 0;
  var y = 0;

  for (let i = 0; i < arr.length; i++) {
    x = i / numRows | 0;
    y = i - x * numRows;
    if (x % 2) {
      y = numRows - 1 - y;
    }
    tableData[y][x] = { color: color_map[arr[i]], hasDiagonal: false };
    console.log(x, y);
  }
  return tableData;
}

export default App;