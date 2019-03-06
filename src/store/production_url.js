let deployed = true;

const local_api_url = 'http://192.168.1.175:3000';
const deployed_api_url = 'https://landlord-app-ruby-api.herokuapp.com';
const api = '/v1/tenant_applications/';

const local_app = 'http://localhost:3001';
const deployed_app = 'https://landlord-app-jg.herokuapp.com';
const ext = '/applications';

export const api_url = (deployed ? deployed_api_url : local_api_url) + api;

export const application_url = (deployed ? deployed_app : local_app) + ext;