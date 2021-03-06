import axios from 'axios';
import { api_url } from './production_url';

import { GET_APPLICATIONS, CREATE_APPLICATION, UPDATE_APPLICATION, DELETE_APPLICATION } from './action_constants';

const getApplications = tenant_applications => ({ type: GET_APPLICATIONS, tenant_applications });
const createApplication = tenant_application => ({ type: CREATE_APPLICATION, tenant_application });
const updateApplication = tenant_application => ({ type: UPDATE_APPLICATION, tenant_application });
const deleteApplication = id => ({ type: DELETE_APPLICATION, id });

export const getApplicationsFromServer = () => {
  return dispatch => {
    return axios.get(api_url)
      .then(res => res.data)
      .then(tenant_applications => dispatch(getApplications(tenant_applications)))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

export const createApplicationOnServer = (application_type) => {
  return dispatch => {
    const token = Math.random().toString(32).slice(2);
    return axios.post(api_url, { token, application_type })
      .then(res => res.data)
      .then(tenant_application => dispatch(createApplication(tenant_application)))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

export const updateApplicationOnServer = (tenant_application, history) => {
  return dispatch => {
    const { token } = tenant_application;
    return axios.put(api_url + token, tenant_application)
      .then(res => res.data)
      .then(tenant_application => dispatch(updateApplication(tenant_application)))
      .then(() => history.push('/applications/thank-you'))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

export const deleteApplicationFromServer = id => {
  return dispatch => {
    return axios.delete(api_url + id)
      .then(() => dispatch(deleteApplication(id)))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

const store = (state = [], action) => {
  let applications;
  switch(action.type) {
    case GET_APPLICATIONS:
      return action.tenant_applications;
    case CREATE_APPLICATION:
      return [ ...state, action.tenant_application ];
    case UPDATE_APPLICATION:
      applications = state.filter(app => app.id !== action.tenant_application.id);
      return [ ...applications, action.tenant_application ];
    case DELETE_APPLICATION:
      applications = state.filter(app => app.id !== action.id);
      return applications;
    default:
      return state;
  }
}

export default store;