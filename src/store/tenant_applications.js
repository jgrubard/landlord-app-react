import axios from 'axios';

import { GET_APPLICATIONS, CREATE_APPLICATION, DELETE_APPLICATION } from './action_constants';

const getApplications = tenant_applications => ({ type: GET_APPLICATIONS, tenant_applications });
const createApplication = tenant_application => ({ type: CREATE_APPLICATION, tenant_application });
const deleteApplication = id => ({ type: DELETE_APPLICATION, id });

export const getApplicationsFromServer = () => {
  return dispatch => {
    return axios.get('http://192.168.1.175:3000/v1/tenant_applications')
      .then(res => res.data)
      .then(tenant_applications => dispatch(getApplications(tenant_applications)))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

export const createApplicationOnServer = () => {
  return dispatch => {
    const token = Math.random().toString(32).slice(2);
    return axios.post('http://192.168.1.175:3000/v1/tenant_applications', { token })
      .then(res => res.data)
      .then(tenant_application => dispatch(createApplication(tenant_application)))
      .catch(err => console.log('ERR0R!!', { err }));
  }
}

export const deleteApplicationFromServer = id => {
  return dispatch => {
    return axios.delete(`http://192.168.1.175:3000/v1/tenant_applications/${id}`)
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
    case DELETE_APPLICATION:
      applications = state.filter(app => app.id !== action.id);
      return applications;
    default:
      return state;
  }
}

export default store;