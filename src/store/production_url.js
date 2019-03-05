let production_url;
// const local_api_url = 'http://192.168.1.175:3000';
const deployed_api_url = 'https://landlord-app-ruby-api.herokuapp.com';

// production_url = local_api_url + '/v1/tenant_applications/';
production_url = deployed_api_url + '/v1/tenant_applications/';

export default production_url;