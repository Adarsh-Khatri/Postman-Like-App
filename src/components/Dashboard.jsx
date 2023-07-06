import React, { Component } from 'react'

export default class Dashboard extends Component {

  state = {
    request: { method: 'GET', fetchURL: '', body: '', headerKey1: '', headerKey2: '', headerKey3: '', headerValue1: '', headerValue2: '', headerValue3: '' },
    bodyType: '', response: {}, option: 'Body'
  }

  fetchData = () => {
    let { response } = this.props;
    console.log(response);
    this.setState({ response });
  }

  componentDidUpdate(preProps, preState) {
    if (preProps != this.props) {
      this.fetchData()
    }
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState(pre => ({ request: { ...pre.request, [name]: value } }))
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.request)
  }

  handleOptions = (opt) => {
    this.setState({ option: opt })
  }


  makeOptions = (arr) => {
    return (
      <div className='fw-bold'>
        {
          arr.map(opt => <a class="link-offset-2 link-underline link-underline-opacity-0 text-danger me-5" href="#" onClick={() => this.handleOptions(opt)}>{opt}</a>)
        }
      </div>
    )
  }

  makeInputField = (name, value, placeH, isReadOnly) => {
    return (
      <>
        <input type="text" className='form-control' placeholder={`${placeH}`} name={name} value={value} onChange={this.handleChange} readOnly={isReadOnly} />
      </>
    )
  }

  makeKeyValueDescriptionFields = (headerKey1, headerKey2, headerKey3, headerValue1, headerValue2, headerValue3) => {
    return (
      <>
        <div className="row justify-content-center border border-3 p-0 pb-3 m-0 mt-3">
          <div className="row my-3 fw-bold">
            <div className="col-sm-3">Key</div>
            <div className="col-sm-6">Value</div>
            <div className="col-sm-3">Description</div>
          </div>
          <div className="row">
            <div className="col-sm-3 p-0">{this.makeInputField('headerKey1', headerKey1, 'Key', false)}</div>
            <div className="col-sm-6 p-0">{this.makeInputField('headerValue1', headerValue1, 'Value', false)}</div>
            <div className="col-sm-3 p-0">{this.makeInputField('', '', 'Description', true)}</div>
          </div>
          <div className="row">
            <div className="col-sm-3 p-0">{this.makeInputField('headerKey2', headerKey2, 'Key', false)}</div>
            <div className="col-sm-6 p-0">{this.makeInputField('headerValue2', headerValue2, 'Value', false)}</div>
            <div className="col-sm-3 p-0">{this.makeInputField('', '', 'Description', true)}</div>
          </div>
          <div className="row">
            <div className="col-sm-3 p-0">{this.makeInputField('headerKey3', headerKey3, 'Key', false)}</div>
            <div className="col-sm-6 p-0">{this.makeInputField('headerValue3', headerValue3, 'Value', false)}</div>
            <div className="col-sm-3 p-0">{this.makeInputField('', '', 'Description', true)}</div>
          </div>
        </div>
      </>
    )
  }


  makeBodyRadios = (arr, name, selValue) => {
    return (
      <>
        <div className="d-flex my-3">
          {
            arr.map(a1 =>
              <div className='form-check form-check-inline'>
                <input className="form-check-input" type="radio" name={name} id={name} />
                <label className="form-check-label" for={name}>{a1}</label>
              </div>
            )
          }
        </div>
      </>
    )
  }

  makeRequestField = (name, method, urlName, urlValue, arr) => {
    return (
      <>
        <div class="input-group mb-3">
          <select className='form-select' name={name} value={method} onChange={this.handleChange}>
            {
              arr.map(opt => <option value={opt}>{opt}</option>)
            }
          </select>
          <input type="text" className="form-control w-75" aria-label="Text input with dropdown button" placeholder='Enter URL or place Text' name={urlName} value={urlValue} onChange={this.handleChange} />
          <div className="btn-group ms-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Send</button>
            <button type="button" className="btn btn-primary"><i className="bi bi-chevron-down"></i></button>
          </div>
        </div>
      </>
    )
  }

  makeTextAreaField = (name, value, placeH) => {
    return (
      <>
        <div>
          <textarea className="form-control bg-light" rows='9' name={name} value={value} placeholder={`${placeH}`} id="floatingTextarea" onChange={this.handleChange} />
        </div>
      </>
    )
  }

  responseInfo = (status, statusText, time) => {
    return (
      <>
        <div className="row mb-3 fw-bold">
          <div className="col-sm-6 lead fw-bold">Response</div>
          <div className="col-sm-3">Status: <span className='text-success'>{status} {statusText}</span></div>
          <div className="col-sm-3">Time: {time && time + 'ms'}</div>
        </div>
      </>
    )
  }


  render() {
    let { methodArr, bodyTypeArr, optionsArr } = this.props;
    let { request, bodyType, response: { data, status, statusText, time }, option } = this.state;
    let { method, fetchURL, body, headerKey1, headerKey2, headerKey3, headerValue1, headerValue2, headerValue3 } = request;
    return (
      <>
        <div className='border border-3 m-0 p-3'>
          <div className="row">
            {this.makeRequestField('method', method, 'fetchURL', fetchURL, methodArr)}
          </div>
          <div className="row">
            {this.makeOptions(optionsArr)}
          </div>
          {
            option === 'Body' ? (
              <>
                <div className="row">
                  {this.makeBodyRadios(bodyTypeArr, 'bodyType', bodyType)}
                </div>
                <div className="row">
                  {this.makeTextAreaField('body', body, 'Body...')}
                </div>
              </>
            ) : (
              <>
                <div className="row m-0">
                  {this.makeKeyValueDescriptionFields(headerKey1, headerKey2, headerKey3, headerValue1, headerValue2, headerValue3)}
                </div>
              </>
            )
          }
        </div>
        <div className='border border-top-0 border-3 m-0 p-3'>
          <div className="row">
            {this.responseInfo(status, statusText, time)}
            {this.makeTextAreaField('response', JSON.stringify(data), '')}
          </div>
        </div>
      </>
    )
  }
}
