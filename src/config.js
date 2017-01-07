var env = process.env.NODE_ENV || 'development';


var config = {
    development: {
        api: 'http://localhost:3001/api/v1',
        client_root_url: 'http://localhost:3000'
    },
    production: {
        api: 'https://warrantycheckapi.herokuapp.com/api/v1',
        client_root_url: 'http://localhost:3000'
    }
};


module.exports = config[env];
