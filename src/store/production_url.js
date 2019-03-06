let deployed = true;

const local_api_url = 'http://192.168.1.175:3000';
const deployed_api_url = 'https://landlord-app-ruby-api.herokuapp.com';
const api = '/v1/tenant_applications/';

const production_url = (deployed ? deployed_api_url : local_api_url) + api;

export default production_url;