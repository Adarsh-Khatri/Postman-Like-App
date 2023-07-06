import React, { Component } from 'react'
import Dashboard from './Dashboard'
import LeftPanel from './LeftPanel';
import { post } from '../services/httpServices';

export default class MainComponent extends Component {

  state = {
    methodArr: ['GET', 'POST', 'PUT', 'DELETE'],
    bodyTypeArr: ['none', 'form-data', 'x-www--form-url-encoded', 'raw', 'binary', 'GraphQL'],
    optionsArr: ['Query-Params', 'Headers', 'Body'],
    response: {}
  }


  fetchData = async (payload) => {
    try {
      let response = await post(payload);
      this.setState({ response })
      console.log(response);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  handleSubmit = (obj) => {
    console.log(obj);
    this.fetchData({ ...obj })
  }


  render() {
    let { methodArr, bodyTypeArr, optionsArr, response } = this.state;
    return (
      <div className="container">
        <div className="row my-3" >
          <div className="col-sm-1"><LeftPanel /></div>
          <div className="col-sm-11">
            <Dashboard methodArr={methodArr} response={response} bodyTypeArr={bodyTypeArr} optionsArr={optionsArr} onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    )
  }
}
