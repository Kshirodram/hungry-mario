import React, { Component } from "react";
import "./home.css";

import { generateRandomNumbers, arraysEqual } from "../../utils/index";

import marioImg from "./mario.png";
import mashroomImg from "./mashroom.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      columns: 0,
      allocatedCell: undefined,
      stepCount: 0,
      currentPosition: [0, 0]
    };
    this.postionOfMario = {
      rowPos: 1,
      colPos: 1
    };
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress, false);
  };

  componentWillMount = () => {
    const rows = prompt("Please enter number of rows", "");
    const columns = prompt("Please enter number of columns", "");

    // min 1 row and 1 cell is required for the game
    if (!(rows && columns) || rows < 1 || columns <= 1) {
      alert("Minimum 1 row and two columns are required to start the game.");
      window.location.reload();
    }

    let randomNumbers = generateRandomNumbers(2, rows * columns, rows);
    const cordinates = [];
    const maxNum = rows >= columns ? rows : columns;
    randomNumbers.forEach(num => {
      const x = parseInt((num - 1) / maxNum);
      const y = (num - 1) % maxNum;
      cordinates.push(`${x}${y}`);
    });
    this.setState({
      rows,
      columns,
      allocatedCell: cordinates,
      isGameStarted: false,
      totalSteps: 0
    });
  };

  handleKeyPress = e => {
    e.preventDefault();
    const keyCode = e.keyCode;

    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      this.startHunting(keyCode);
    } else {
      clearInterval(this.intervalInstance);
    }
  };

  startHunting = key => {
    clearInterval(this.intervalInstance);
    this.intervalInstance = setInterval(() => {
      const {
        currentPosition,
        rows,
        columns,
        allocatedCell,
        totalSteps
      } = this.state;
      let tempPosition = currentPosition;

      switch (key) {
        case 37:
          if (currentPosition[1] === 0) {
            tempPosition = [currentPosition[0], 0];
            this.startHunting(39);
          } else {
            tempPosition = [currentPosition[0], currentPosition[1] - 1];
          }
          break;

        case 38:
          if (currentPosition[0] === 0) {
            tempPosition = [0, currentPosition[1]];
            this.startHunting(40);
          } else {
            tempPosition = [currentPosition[0] - 1, currentPosition[1]];
          }

          break;

        case 39:
          if (currentPosition[1] === columns - 1) {
            tempPosition = [currentPosition[0], columns - 1];
            this.startHunting(37);
          } else {
            tempPosition = [currentPosition[0], currentPosition[1] + 1];
          }
          break;

        case 40:
          if (currentPosition[0] === rows - 1) {
            tempPosition = [rows - 1, currentPosition[1]];
            this.startHunting(38);
          } else {
            tempPosition = [currentPosition[0] + 1, currentPosition[1]];
          }
          break;

        default:
          break;
      }

      const matchedIndex = allocatedCell.indexOf(tempPosition.join(""));
      if (matchedIndex !== -1) {
        allocatedCell.splice(matchedIndex, 1);
      }
      this.setState(
        {
          currentPosition: tempPosition,
          allocatedCell,
          totalSteps: totalSteps + 1
        },
        () => {
          if (allocatedCell.length === 0) {
            clearInterval(this.intervalInstance);
            setTimeout(() => {
              alert(`Wow!!! you have completed with ${totalSteps} steps.`);
            }, 0);
          }
        }
      );
    }, 300);
  };

  createTable = () => {
    const { rows, columns, allocatedCell, currentPosition } = this.state;
    console.log(this.state.currentPosition, allocatedCell);

    const rowHtml = [];
    for (let rowCounter = 0; rowCounter < rows; rowCounter++) {
      const columnHtml = [];
      for (let colCounter = 0; colCounter < columns; colCounter++) {
        columnHtml.push(
          <li
            key={`${rowCounter}${colCounter}`}
            className={
              allocatedCell.indexOf(`${rowCounter}${colCounter}`) > -1
                ? "cell allocatedCell"
                : arraysEqual(currentPosition, [rowCounter, colCounter])
                ? "cell mario"
                : "cell"
            }
          >
            {allocatedCell.indexOf(`${rowCounter}${colCounter}`) > -1 ? (
              <img src={mashroomImg} alt="mashroom" />
            ) : arraysEqual(currentPosition, [rowCounter, colCounter]) ? (
              <img src={marioImg} alt="mario" />
            ) : (
              ""
            )}
          </li>
        );
      }
      rowHtml.push(<ul key={rowCounter}>{columnHtml}</ul>);
    }
    return rowHtml;
  };

  render() {
    return <div className="App">{this.createTable()}</div>;
  }
}

export default Home;
