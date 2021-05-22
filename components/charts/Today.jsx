import React, { Component,useRef,useState } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["React", "Node", "Java", "MongoDB"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50]
        },
        {
          name: "series-1",
          data: [30, 40, 45, 50]
        },
        {
          name: "series-1",
          data: [30, 40, 45, 50]
        }
      ]
    };
  }

  render() {
    return (
        <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="100%"
        height="300px"
      />
    );
  }
}

export default App;