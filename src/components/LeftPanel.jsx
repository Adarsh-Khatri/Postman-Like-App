import React, { Component } from 'react'

export default class LeftPanel extends Component {

  makeOptions = (type, label) => {
    return (
      <div className='d-flex flex-column align-items-center fw-bold btn btn-outline-secondary btn-sm border-0 rounded-0'>
        <i className={`bi bi-${type} fs-4`}></i>
        <div>{label}</div>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="row border border-3 h-100">
          <div className='col-sm-12 m-0 p-0'>
            {this.makeOptions('collection', 'Collections')}
            {this.makeOptions('boxes', 'APIs')}
            {this.makeOptions('calendar3-range', 'Environments')}
            {this.makeOptions('hdd-rack', 'Mock Servers')}
            {this.makeOptions('tv', 'Monitors')}
            {this.makeOptions('clock-history', 'History')}
          </div>
        </div>
      </>
    )
  }
}
