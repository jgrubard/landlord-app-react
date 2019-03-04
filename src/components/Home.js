import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApplicationOnServer, deleteApplicationFromServer } from '../store';

class Home extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { tenant_applications, createApplication, deleteApplication } = this.props;
    return (
      <div>
        <h1>Landlord App</h1>
        <button onClick={createApplication}>new app</button>
        {
          !this.props.tenant_applications.length ?
            <p>There are currently ZERO applications</p> :
            tenant_applications.map(app => {
              const { id, token } = app;
              return (
                <div key={id}>
                  <h4>Application ID#{id}</h4>
                  {
                    !!token ? (
                      <p>Link (send to applicant):
                        <a href={`http://localhost:3001/#/applications/${token}`}>
                        http://localhost:3001/#/applications/{token}
                        </a>
                      </p>
                    ) : (
                      <p>No Link to send -- applicant has submitted application</p>
                    )
                  }

                  <button onClick={() => deleteApplication(id) }>delete Application {id}</button>
                </div>
              );
            })
        }
      </div>
    );
  }
}

const mapState = ({ tenant_applications }) => ({ tenant_applications });

const mapDispatch = dispatch => {
  return {
    createApplication: () => dispatch(createApplicationOnServer()),
    deleteApplication: id => dispatch((deleteApplicationFromServer(id)))
  }
};

export default connect(mapState, mapDispatch)(Home);