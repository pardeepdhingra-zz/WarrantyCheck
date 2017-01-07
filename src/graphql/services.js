import request from 'request';
import emoji from 'node-emoji';
import config from '../config';
import axios from 'axios';
import cookie from 'react-cookie';

import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from '../actions/types';

const API_URL = config.api;
const CLIENT_ROOT_URL = config.client_root_url;

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logout();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function login({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/user/sign_in`, { email, password })
    .then(response => {
      cookie.save('token', response.headers.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

export function register({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  }
}

export function protectedTest() {
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

function debugEmoji(time) {
  if (time < 100) {
    return emoji.get('rocket');
  }
  if (time < 400) {
    return emoji.get('dog');
  }
  if (time < 800) {
    return emoji.get('rabbit');
  }
  if (time < 1500) {
    return emoji.get('turtle');
  }
  return emoji.get('whale');
}
/**
 * Service Call
 *
 * Almost all calls to the external services will go through this call. This
 * function returns a promise which makes a request of type 'method' to 'url'.
 * You must pass in an authorization token
 *
 * Example:
 *
 *     let userRequest = serviceCall(token, 'GET', '..../users/3.json');
 *
 *     userRequest.then((user) => {...}, (error) => {..handle error...});
 *
 */
export function serviceCall(token, method, url, body) {
  return new Promise((resolve, reject) => {
    let start = new Date();
    let reqObj = {
      method,
      url: `${config.api}/${url}`//,
      //headers: {
//        Authorization: token
      //}
    };
    if (body) {
      reqObj.body = body;
      reqObj.json = true;
    }
    request(
      reqObj,
      function (error, response, body) {
        let time = new Date() - start;
        try {
          console.log(`${method} ${url} ${response.statusCode} ${time}ms ${debugEmoji(time)}`);
          if (!error && (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 204)) {
            // If this call returns a list put the list on edges and return the count
            if (response.headers['x-total-count']) {
              return resolve({
                edges: JSON.parse(body),
                count: response.headers['x-total-count'] || 0
              });
            }
            // Else just return the object
            if (typeof body === 'object') {
              return resolve(body);
            }
            if (method === 'DELETE') {
              return resolve('deleted');
            }
            return resolve(JSON.parse(body));
          }
          // The error messages are actually getting sent in the body
          return reject(JSON.stringify(body));
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Get Object serviceCall wrapper
 *
 * Use when you need to GET something based only on it's endpoint.
 *
 * Example:
 *
 *     let userRequest = getObject(token, 'users', 3);
 *
 *     userRequest.then((user) => {...}, (error) => {..handle error...});
 *
 */

export function getObject(token, objectType, objectID) {
  if (!objectID) {
    return false;
  }
  return serviceCall(token, 'GET', `${objectType}/${objectID}.json`);
}

/**
 * Get List Of Objects serviceCall Wrapper
 *
 * GETs an array of objects.
 */
export function getListOfObjects(token, objectType, params = {}, options = {}) {
  let url = `${objectType}.json?`;

  Object.keys(params).forEach(key => {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  });

  Object.keys(options).forEach(key => {
    if (options[key]) {
      url += `${key}=${options[key]}&`;
    }
  });
  return serviceCall(token, 'GET', url);
}

export function getListOfObjectsFromAnObject(token, objectType, parentObjectType, parentID, params = {}, options = {}) {
  let url = `${parentObjectType}/${parentID}/${objectType}.json?`;

  Object.keys(params).forEach(key => {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  });
  Object.keys(options).forEach(key => {
    if (options[key]) {
      url += `${key}=${options[key]}&`;
    }
  });

  return serviceCall(token, 'GET', url);
}

export function createObject(token, objectType, initialObject) {
  let url = `${objectType}.json`;
  return serviceCall(token, 'POST', url, initialObject);
}

export function createObjectUnderObject(token, objectType, parentObjectType, parentID, initialObject) {
  let url = `${parentObjectType}/${parentID}/${objectType}.json`;
  return serviceCall(token, 'POST', url, initialObject);
}

export function updateObject(token, objectType, objectID, updateObject) {
  let url = `${objectType}/${objectID}.json`;
  return serviceCall(token, 'PUT', url, updateObject);
}

export function removeObject(token, objectType, objectID) {
  let url = `${objectType}/${objectID}.json`;
  return serviceCall(token, 'DELETE', url);
}
