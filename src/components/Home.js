import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tenant_applications: []
    }
    // this.loadApplications = this.loadApplications.bind(this);
    this.createNewApplication = this.createNewApplication.bind(this);
  }

  componentDidMount() {
    this.loadApplications();
  }

  randomizeToken() {
    return Math.random().toString(32).slice(2);
  }

  createNewApplication() {
    const testData = { token: this.randomizeToken() }
    axios.post(`http://192.168.1.175:3000/v1/tenant_applications`, testData)
      .then(res => res.data)
      .then(app => this.setState({ tenant_applications: [ ...this.state.tenant_applications, app ] }))
  }

  loadApplications() {
    // const CORS = 'https://cors-anywhere.herokuapp.com/';
    axios.get(`http://192.168.1.175:3000/v1/tenant_applications`)
      .then(res => {
        console.log("RES:", res)
        console.log('data should log first')
        return res.data
      })
      .then(tenant_applications => {
        console.log(tenant_applications);
        this.setState({ tenant_applications })
      })
      .catch(err => {
        console.log('ERROR!!')
        console.log({ err });
      })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Landlord App</h1>
        <button onClick={this.createNewApplication}>new app</button>
        {
          !this.state.tenant_applications.length ?
            <p>There are currently ZERO applications</p> :
            this.state.tenant_applications.map(app => {
              return (
                <div key={app.id}>
                  <h4>Application {app.id}</h4>
                  <p>Link: http://192.168.1.175:3000/applications/{app.token}</p>
                </div>
              );
            })
        }
      </div>
    );
  }
}

export default Home;