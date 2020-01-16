import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import config from '../src/config/config';
import { ToastContainer, toast } from 'react-toastify';


export default class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastmonth: 6,
      state_records: [],
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: 'Transaction',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(233, 8, 141)',
            borderColor: 'rgb(233, 8, 141)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(233, 8, 141)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(233, 8, 141)',
            pointHoverBorderColor: 'rgb(233, 8, 141)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  }
  componentDidMount() {
    fetch(`${config.Url}api/dashoardforadmin?dateframe=${this.state.lastmonth}`).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          console.log(res.dashoardforadmin.graph);
          var testing = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: 'Transaction',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(233, 8, 141)',
                borderColor: 'rgb(233, 8, 141)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(233, 8, 141)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(233, 8, 141)',
                pointHoverBorderColor: 'rgb(233, 8, 141)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [
                  res.dashoardforadmin.graph[0].g1,
                  res.dashoardforadmin.graph[1].g2,
                  res.dashoardforadmin.graph[2].g3,
                  res.dashoardforadmin.graph[3].g4,
                  res.dashoardforadmin.graph[4].g5,
                  res.dashoardforadmin.graph[5].g6,
                  res.dashoardforadmin.graph[6].g7,
                  res.dashoardforadmin.graph[7].g8,
                  res.dashoardforadmin.graph[8].g9,
                  res.dashoardforadmin.graph[9].g10,
                  res.dashoardforadmin.graph[10].g11,
                  res.dashoardforadmin.graph[11].g12
                ]
              }
            ]
          }
          this.setState({ data: testing });
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });
  }
  render() {
    return (
      <div className="Line">
        <Line data={this.state.data} />
      </div>
    );
  }
}